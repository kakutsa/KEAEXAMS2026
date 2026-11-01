-- KEAEXAMS2026: append-only practice history. Run before 002_test_versions.sql.
-- Browser clients get SELECT on their own attempts and EXECUTE on submit_exam_attempt.
-- No service-role key belongs in the GitHub Pages frontend.
begin;
create schema if not exists exam_private;
revoke all on schema exam_private from public, anon, authenticated;

create table if not exists exam_private.test_versions (
  test_id text not null,
  revision text not null,
  title text not null,
  config jsonb not null,
  questions jsonb not null check (jsonb_typeof(questions) = 'array' and jsonb_array_length(questions) between 1 and 500),
  primary key (test_id, revision)
);
alter table exam_private.test_versions enable row level security;

create table if not exists public.exam_attempts (
  id uuid primary key,
  student_id uuid not null references auth.users(id) on delete cascade,
  test_id text not null,
  revision text not null,
  started_at timestamptz not null,
  submitted_at timestamptz not null default now(),
  answers jsonb not null,
  review_marks jsonb not null,
  correct integer not null,
  incorrect integer not null,
  skipped integer not null,
  score numeric not null,
  maximum numeric not null,
  foreign key (test_id, revision) references exam_private.test_versions(test_id, revision)
);
create index if not exists exam_attempts_student_history_idx
  on public.exam_attempts(student_id, submitted_at desc, id desc);
alter table public.exam_attempts enable row level security;
revoke all on public.exam_attempts from public, anon, authenticated;
grant select on public.exam_attempts to authenticated;
drop policy if exists "Students read only their attempts" on public.exam_attempts;
create policy "Students read only their attempts" on public.exam_attempts
  for select to authenticated using ((select auth.uid()) = student_id);

create or replace function public.submit_exam_attempt(
  attempt_id uuid,
  test_identifier text,
  test_revision text,
  submitted_answers jsonb,
  marked_questions jsonb,
  client_started_at timestamptz
) returns public.exam_attempts
language plpgsql security definer set search_path = '' as $$
declare
  student uuid := auth.uid();
  version_row exam_private.test_versions%rowtype;
  existing public.exam_attempts%rowtype;
  saved public.exam_attempts%rowtype;
  question_count integer;
  item jsonb;
  supplied jsonb;
  idx integer;
  correct_count integer := 0;
  wrong_count integer := 0;
  skipped_count integer := 0;
  positive_marks numeric;
  negative_marks numeric;
begin
  if student is null then raise exception 'Sign in to save an attempt' using errcode = '42501'; end if;
  if attempt_id is null then raise exception 'Attempt ID is required'; end if;
  select * into version_row from exam_private.test_versions
    where test_id = test_identifier and revision = test_revision;
  if not found then raise exception 'Unknown test version. Reload the test catalog.'; end if;
  question_count := jsonb_array_length(version_row.questions);
  if submitted_answers is null or jsonb_typeof(submitted_answers) <> 'array'
    or jsonb_array_length(submitted_answers) <> question_count then
    raise exception 'Answer count does not match test';
  end if;
  if marked_questions is null or jsonb_typeof(marked_questions) <> 'array'
    or jsonb_array_length(marked_questions) <> question_count then
    raise exception 'Review marks do not match test';
  end if;
  if exists(select 1 from jsonb_array_elements(marked_questions) value
    where jsonb_typeof(value) <> 'boolean') then raise exception 'Invalid review marks'; end if;
  for idx in 0..question_count - 1 loop
    item := version_row.questions -> idx;
    supplied := submitted_answers -> idx;
    if supplied = 'null'::jsonb then skipped_count := skipped_count + 1;
    elsif supplied not in ('0'::jsonb, '1'::jsonb, '2'::jsonb, '3'::jsonb) then
      raise exception 'Invalid answer option';
    elsif supplied = item -> 'answer' then correct_count := correct_count + 1;
    else wrong_count := wrong_count + 1;
    end if;
  end loop;
  positive_marks := coalesce((version_row.config ->> 'marksPerCorrect')::numeric, 1);
  negative_marks := coalesce((version_row.config ->> 'negativeMarks')::numeric, 0);
  if client_started_at is null or client_started_at > now() + interval '1 minute' then
    raise exception 'Invalid start time';
  end if;
  insert into public.exam_attempts
    (id, student_id, test_id, revision, started_at, answers, review_marks,
     correct, incorrect, skipped, score, maximum)
    values (attempt_id, student, test_identifier, test_revision, client_started_at,
      submitted_answers, marked_questions, correct_count, wrong_count, skipped_count,
      correct_count * positive_marks - wrong_count * negative_marks,
      question_count * positive_marks)
    on conflict (id) do nothing returning * into saved;
  if saved.id is not null then return saved; end if;
  -- An upload retry returns the original row; another user cannot claim its ID.
  select * into existing from public.exam_attempts where id = attempt_id;
  if existing.student_id <> student or existing.test_id <> test_identifier
     or existing.revision <> test_revision or existing.answers <> submitted_answers
     or existing.review_marks <> marked_questions then
    raise exception 'Attempt ID already used' using errcode = '42501';
  end if;
  return existing;
end;
$$;
revoke all on function public.submit_exam_attempt(uuid,text,text,jsonb,jsonb,timestamptz) from public, anon;
grant execute on function public.submit_exam_attempt(uuid,text,text,jsonb,jsonb,timestamptz) to authenticated;

-- Resolve one owned attempt against its immutable question version.
-- Questions are stored once per version, rather than duplicated on every attempt.
create or replace function public.get_exam_attempt(attempt_id uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'attempt', to_jsonb(a),
    'snapshot', jsonb_build_object('title', v.title, 'config', v.config, 'questions', v.questions)
  )
  from public.exam_attempts a
  join exam_private.test_versions v on v.test_id = a.test_id and v.revision = a.revision
  where a.id = attempt_id and a.student_id = (select auth.uid());
$$;
revoke all on function public.get_exam_attempt(uuid) from public, anon;
grant execute on function public.get_exam_attempt(uuid) to authenticated;
commit;
