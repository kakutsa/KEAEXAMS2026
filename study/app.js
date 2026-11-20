'use strict';

const subjects = {
  kannada: ['ಸಾಮಾನ್ಯ ಕನ್ನಡ', 'General Kannada', 'ಕ', '#eee8ff'],
  english: ['ಸಾಮಾನ್ಯ ಇಂಗ್ಲಿಷ್', 'General English', 'En', '#e5edff'],
  computer: ['ಕಂಪ್ಯೂಟರ್ ಜ್ಞಾನ', 'Computer', '⌘', '#e1f4ed'],
  kas: ['ಕೆಎಎಸ್', 'KAS', 'K', '#fff0de'],
  fda: ['ಎಫ್‌ಡಿಎ', 'FDA', 'F', '#fbe7ef'],
  sda: ['ಎಸ್‌ಡಿಎ', 'SDA', 'S', '#e4f3fb'],
  science: ['ವಿಜ್ಞಾನ ಹಿಂದಿನ ಪ್ರಶ್ನೆಗಳು', 'Science PYQ', '✦', '#f0e9fa'],
};
const pages = {
  home: ['ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', '▦'],
  calendar: ['ಕ್ಯಾಲೆಂಡರ್', '▣'],
  revision: ['ಪುನರವಲೋಕನ', '↻'],
  scores: ['ಅಂಕಗಳು ಮತ್ತು ವಿಶ್ಲೇಷಣೆ', '▥'],
  templates: ['ಮಾದರಿಗಳು', '▤'],
};
const weekdays = ['ಸೋಮ','ಮಂಗಳ','ಬುಧ','ಗುರು','ಶುಕ್ರ','ಶನಿ','ಭಾನು'];
const clock = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Kolkata', year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function indiaTime() {
  const p = Object.fromEntries(clock.formatToParts(new Date()).map(({type,value}) => [type,value]));
  return p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute;
}
const today = () => indiaTime().slice(0,10);
const dateObj = date => new Date(date + 'T00:00:00Z');
const shift = (date, days) => new Date(dateObj(date).getTime() + days*864e5).toISOString().slice(0,10);
const daysFrom = (from,to) => Math.round((dateObj(to)-dateObj(from))/864e5);
const fmt = (date, options={day:'numeric',month:'long'}) => new Intl.DateTimeFormat('kn-IN-u-nu-latn',{...options,timeZone:'UTC'}).format(dateObj(date));
const key = 'keaexams2026-study-v1';
const example = {
  id:'example', subject:'computer', title:'ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್‌ನ ಮೂಲಭೂತ ಕಾರ್ಯಗಳು', date:today(), demo:true,
  notes:'ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ (OS) ಬಳಕೆದಾರರ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಹಾರ್ಡ್‌ವೇರ್ ನಡುವೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಇದು CPU ಸಮಯ, ಮೆಮೊರಿ, ಫೈಲ್‌ಗಳು ಮತ್ತು ಸಾಧನಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.\n\nCPU Scheduling: ಅನೇಕ ಪ್ರಕ್ರಿಯೆಗಳು ಚಾಲನೆಗೆ ಸಿದ್ಧವಾಗಿದ್ದಾಗ, ಮುಂದಿನ CPU ಸಮಯವನ್ನು ಯಾವ ಪ್ರಕ್ರಿಯೆಗೆ ಕೊಡಬೇಕು ಎಂದು OS ನಿರ್ಧರಿಸುತ್ತದೆ.\n\nಉದಾಹರಣೆ: ಬ್ರೌಸರ್ ಮತ್ತು ಸಂಗೀತ ಅಪ್ಲಿಕೇಶನ್ ಒಟ್ಟಿಗೆ ಓಡುವಾಗ, OS ಅವುಗಳಿಗೆ CPU ಸಮಯ ಹಂಚುತ್ತದೆ.',
  pyq:'', studied:false, rounds:[false,false,false], questions:[{
    text:'ಮುಂದೆ ಯಾವ ಪ್ರಕ್ರಿಯೆಗೆ CPU ಸಮಯ ನೀಡಬೇಕು ಎಂಬ ನಿರ್ಧಾರ ಯಾವ ಕಾರ್ಯಕ್ಕೆ ಸೇರಿದೆ?',
    options:['ಫೈಲ್ ನಿರ್ವಹಣೆ','CPU Scheduling','ಮೆಮೊರಿ ಹಂಚಿಕೆ','ಸಾಧನ ನಿರ್ವಹಣೆ'],
    correct:1, explanation:'CPU Scheduling ಮುಂದಿನ ಚಾಲನೆಗೆ ಸಿದ್ಧವಿರುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ.', source:''
  }]
};
let db;
try { db = JSON.parse(localStorage.getItem(key)); } catch {}
db ??= {start:window.KEA_DAILY_PLAN?.start??today(), lessons:[example], tasks:[], scores:[]};

function syncDailyPlan() {
  const plan=window.KEA_DAILY_PLAN;
  if (!plan) return;
  for (let day=0;day<plan.days;day++) {
    const date=shift(plan.start,day);
    for (const slot of plan.slotsFor(date)) {
      if (slot.science && (plan.scienceBreaks.includes(date)||date>'2026-12-09')) continue;
      const id='daily-plan-'+date+'-'+slot.subject;
      const existing=db.tasks.find(task=>task.id===id);
      if (existing) {
        if (plan.examMode(date)==='kries' && slot.subject==='computer' && !existing.lessonId) {
          existing.title=slot.title;
          existing.notes=slot.notes;
        }
        continue;
      }
      const round=Math.floor(day/15)+1;
      db.tasks.push({id,date,subject:slot.subject,time:slot.time,title:slot.title,notes:slot.notes+'\nಸುತ್ತು '+round+' / 3 · ವಿಷಯದ ಹೆಸರು ಮತ್ತು ಫಲಿತಾಂಶವನ್ನು ದಾಖಲಿಸಿ.',kind:'study',lessonId:'',done:false});
    }
  }
  try { localStorage.setItem(key,JSON.stringify(db)); } catch {}
}
syncDailyPlan();
let selectedDate = today();
let displayedMonth = selectedDate.slice(0,7);
let toastTimer;
let feedState = "loading";
let feedUpdatedAt = null;
const $ = id => document.getElementById(id);
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => crypto.randomUUID();
const lesson = id => db.lessons.find(item=>item.id===id);
const btn = (label, action, data='', kind='') => '<button type="button" class="btn '+kind+'" data-action="'+action+'" data-id="'+esc(data)+'">'+label+'</button>';
const empty = text => '<div class="empty">'+text+'</div>';
const pill = (text,kind='') => '<span class="pill '+kind+'">'+text+'</span>';
const heading = (title,detail,actions='') => '<div class="page-head"><div><h1>'+title+'</h1><p class="muted">'+detail+'</p></div><div class="actions">'+actions+'</div></div>';
const section = (title,body,actions='') => '<section class="card"><div class="card-head"><h2>'+title+'</h2>'+actions+'</div>'+body+'</section>';
const pct = (a,b) => b ? Math.round(a/b*100) : 0;
const roundTotal = items => items.reduce((sum,item)=>sum+item.rounds.filter(Boolean).length,0);
const realLessons = () => db.lessons.filter(x=>!x.demo);
const scorePct = items => items.length ? Math.round(items.reduce((sum,item)=>sum+item.points/item.total*100,0)/items.length)+'%' : '—';
const route = () => location.hash.slice(1) || 'home';
const byDate = (a,b) => a.date.localeCompare(b.date);
const live = task => task.date+'T'+task.time<=indiaTime();
const taskKinds = {study:'ಅಧ್ಯಯನ ಗುರಿ',release:'ಪರೀಕ್ಷೆ ಬಿಡುಗಡೆ',catchup:'ಬಾಕಿ ಕೆಲಸ'};

function toast(message) {
  $('toast').textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>$('toast').textContent='',3000);
}
function save(message) {
  try { localStorage.setItem(key,JSON.stringify(db)); }
  catch { toast('ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ'); render(); return; }
  if (message) toast(message);
  render();
}
function navButton(key, title, icon, en='') {
  const active = route()===key;
  return '<button class="nav-btn '+(active?'active':'')+'" data-action="navigate" data-id="'+key+'" '+(active?'aria-current="page"':'')+'><span aria-hidden="true">'+icon+'</span>'+title+(en?'<small>'+en+'</small>':'')+'</button>';
}
function subjectIcon(id) {
  return '<span class="subject-icon" style="background:'+subjects[id][3]+'">'+subjects[id][2]+'</span>';
}
function progressRows() {
  return Object.entries(subjects).map(([id,[title,en]])=>{
    const items = realLessons().filter(x=>x.subject===id);
    const progress = pct(roundTotal(items),items.length*3);
    return '<button class="subject-row" data-action="navigate" data-id="'+id+'">'+subjectIcon(id)+'<div><strong>'+title+'</strong> <small>'+en+'</small><div class="bar"><span style="width:'+progress+'%"></span></div></div><small>'+progress+'%</small></button>';
  }).join('');
}
function taskRow(task) {
  const released = task.kind==='release' && live(task);
  return '<div class="row"><div class="detail"><h3 class="'+(task.done?'check':'')+'">'+esc(task.title)+'</h3><p>'+subjects[task.subject][0]+' · '+taskKinds[task.kind]+(task.time?' · '+task.time+' IST':'')+'</p>'+(task.notes?'<p class="task-note">'+esc(task.notes)+'</p>':'')+'</div>'+
    (task.kind==='release'?pill(released?'ಲಭ್ಯ':'ನಿಗದಿಯಾಗಿದೆ',released?'success':'warn'):'')+
    (task.lessonId&&lesson(task.lessonId)&&(task.kind!=='release'||released)?btn('ಪಾಠ ಮತ್ತು MCQ','open-lesson',task.lessonId,'small'):'')+
    '<label><input type="checkbox" data-change="task" data-id="'+task.id+'" '+(task.done?'checked':'')+'> ಪೂರ್ಣ</label>'+btn('ತಿದ್ದು','task-edit',task.id,'small')+'</div>';
}
function lessonRow(item) {
  return '<div class="row"><div class="detail"><h3>'+esc(item.title)+'</h3><p>'+subjects[item.subject][0]+' · '+fmt(item.date)+' · '+item.questions.length+' MCQ</p></div>'+
    (item.demo?pill('ಮಾದರಿ'):pill(item.studied?'ಓದಲಾಗಿದೆ':'ಓದಲು ಬಾಕಿ',item.studied?'success':''))+
    btn('ತೆರೆಯಿರಿ','open-lesson',item.id,'small')+'</div>';
}
function dateContent(date) {
  const tasks = visibleTasks().filter(x=>x.date===date).sort((a,b)=>a.time.localeCompare(b.time));
  const items = realLessons().filter(x=>x.date===date);
  return tasks.length||items.length ? tasks.map(taskRow).join('')+items.map(lessonRow).join('') : empty('ಈ ದಿನಕ್ಕೆ ಪಾಠ ಅಥವಾ ಗುರಿ ಸೇರಿಸಿ.');
}
function week() {
  const monday = shift(today(),-((dateObj(today()).getUTCDay()+6)%7));
  return '<div class="week">'+weekdays.map((day,index)=>{
    const date=shift(monday,index);
    return '<button class="'+(date===today()?'active':'')+'" data-action="date" data-id="'+date+'"><small>'+day+'</small><strong>'+Number(date.slice(-2))+'</strong></button>';
  }).join('')+'</div>';
}

function visibleTasks() {
  const plan=window.KEA_DAILY_PLAN;
  return db.tasks.filter(task=>!task.id.startsWith('daily-plan-') ||
    plan.slotsFor(task.date).some(slot=>slot.subject===task.subject));
}
function publicationStatus() {
  const mode=window.KEA_DAILY_PLAN.examMode(today());
  if (mode==='break') return '<p class="mini-text">ಪರೀಕ್ಷಾ ವಿರಾಮ · 20–22 ಮತ್ತು 27 ನವೆಂಬರ್. 23–26 ನವೆಂಬರ್ KRIES ಕಂಪ್ಯೂಟರ್ ಮಾತ್ರ. 28 ನವೆಂಬರ್‌ನಿಂದ FDA/SDA ಪುನರಾರಂಭ.</p>';

  const published=db.lessons.filter(item=>item.published&&item.date===today());
  const stamp=feedUpdatedAt?new Intl.DateTimeFormat('kn-IN-u-nu-latn',{timeZone:'Asia/Kolkata',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(feedUpdatedAt)):'';
  const count=published.length;
  let label;
  if (feedState==='loading') label='ದಿನದ ಪಾಠಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…';
  else if (feedState==='error') label='ಹೊಸ ಪಾಠಗಳನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಉಳಿಸಿದ ಪಾಠಗಳು ಲಭ್ಯವಿವೆ.';
  else label=fmt(today())+' · '+count+'/'+(mode==='kries'?1:3)+' ಪಾಠಗಳು ಪ್ರಕಟವಾಗಿವೆ · ದಿನದ ಅಪ್‌ಡೇಟ್ ಬೆಳಗ್ಗೆ 6:00 IST'+(stamp?' · ಕೊನೆಯ ಪ್ರಕಟಣೆ '+stamp:'');
  return '<p class="mini-text" role="status">'+esc(label)+'</p>';
}
function importPublishedLessons(feed) {
  for (const incoming of feed.lessons) {
    if (incoming.date>today()) continue;
    const existing=lesson(incoming.id);
    const record={...incoming,published:true,demo:false,pyq:incoming.pyq??'',studied:existing?.studied??false,rounds:existing?.rounds??[false,false,false]};
    if (existing) db.lessons=db.lessons.map(item=>item.id===record.id?record:item);
    else db.lessons.push(record);
    const task=db.tasks.find(item=>item.id==='daily-plan-'+record.date+'-'+record.subject);
    if (task) {
      task.title=record.title;
      task.lessonId=record.id;
    }
  }
  feedState='ready';
  feedUpdatedAt=feed.updatedAt;
  save();
}
function home() {
  const items=realLessons();
  const progress=pct(roundTotal(items),items.length*3);
  const day = daysFrom(db.start,today())+1;
  const todays=visibleTasks().filter(t=>t.date===today());
  const hasToday=todays.length || items.some(x=>x.date===today());
  const stats = [['▤','ಒಟ್ಟು ಪಾಠಗಳು',items.length],['✓','ಇಂದಿನ ಗುರಿಗಳು',todays.filter(x=>x.done).length+'/'+todays.length],['↻','ಪೂರ್ಣ ಸುತ್ತುಗಳು',roundTotal(items)+'/'+items.length*3],['▥','ಸರಾಸರಿ ಅಂಕ',scorePct(db.scores.filter(x=>!x.demo))]];
  return heading('ಅಧ್ಯಯನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್','ದಿನದ ಪಾಠ, ಪರೀಕ್ಷೆ ಮತ್ತು ಪುನರವಲೋಕನ',btn('+ ಹೊಸ ಪಾಠ','lesson-new','', 'primary'))+
    '<section class="hero"><div>'+pill(day<1?'ಆರಂಭ '+fmt(db.start):day>45?'45 ದಿನಗಳ ಅವಧಿ ಮುಗಿದಿದೆ':'ದಿನ '+day+' / 45')+
    '<h2>45 ದಿನಗಳ ಪುನರವಲೋಕನ</h2><p>1 ವಿಷಯವನ್ನು ವಿವರವಾಗಿ ಓದಿ. ನಂತರ ಅದೇ ವಿಷಯದ MCQ ಅಭ್ಯಾಸ ಮಾಡಿ.</p><div class="actions" style="margin-top:12px">'+btn('3 ಸುತ್ತುಗಳನ್ನು ನೋಡಿ','navigate','revision','small')+'</div></div>'+
    '<div class="hero-ring" style="--percent:'+progress+'%"><div><strong>'+progress+'%</strong><small>ಒಟ್ಟು ಪ್ರಗತಿ</small></div></div></section>'+
    '<div class="stats">'+stats.map(([icon,label,value])=>'<div class="card stat"><span class="tile">'+icon+'</span><div><small>'+label+'</small><strong>'+value+'</strong></div></div>').join('')+'</div>'+
    '<div class="grid"><div class="stack">'+section('ಇಂದಿನ ಗುರಿ 🎯 ಮತ್ತು ವೇಳಾಪಟ್ಟಿ',publicationStatus()+ (hasToday?dateContent(today()):empty(window.KEA_DAILY_PLAN.examMode(today())==='break'?'ಇಂದು ಪರೀಕ್ಷಾ ವಿರಾಮ.':'ಇಂದಿನ ಮೊದಲ ಗುರಿಯನ್ನು ಸೇರಿಸಿ.')),btn('+ ಗುರಿ','task-new',today(),'small'))+
    section('ಈ ವಾರ',week(),btn('ಕ್ಯಾಲೆಂಡರ್ →','navigate','calendar','small'))+
    (db.lessons.some(x=>x.demo)?section('ಮಾದರಿ ಪಾಠ',lessonRow(example)):'')+'</div>'+section('ವಿಷಯವಾರು ಪ್ರಗತಿ',progressRows())+'</div>';
}
function calendar() {
  const first=displayedMonth+'-01';
  const monday=shift(first,-((dateObj(first).getUTCDay()+6)%7));
  const cells=Array.from({length:42},(_,i)=>{
    const d=shift(monday,i);
    const mark=visibleTasks().some(x=>x.date===d)||realLessons().some(x=>x.date===d);
    return '<button aria-label="'+fmt(d)+'" aria-pressed="'+(d===selectedDate)+'" class="'+(d===selectedDate?'active ':'')+(d.slice(0,7)!==displayedMonth?'outside':'')+'" data-action="date" data-id="'+d+'">'+Number(d.slice(-2))+(mark?'<i></i>':'')+'</button>';
  }).join('');
  const monthButtons=btn('‹','month','-1','small')+btn('›','month','1','small');
  return heading('ಅಧ್ಯಯನ ಕ್ಯಾಲೆಂಡರ್','ದಿನದ ಗುರಿಗಳು ಮತ್ತು ಪರೀಕ್ಷೆ ಬಿಡುಗಡೆ ಸಮಯ · IST',btn('+ ವೇಳಾಪಟ್ಟಿ','task-new',selectedDate,'primary'))+
    '<div class="grid">'+section(fmt(first,{month:'long',year:'numeric'}),'<div class="calendar-grid">'+weekdays.map(d=>'<span class="weekday">'+d+'</span>').join('')+cells+'</div>','<div class="actions">'+monthButtons+'</div>')+
    section(fmt(selectedDate,{day:'numeric',month:'long',weekday:'long'}),dateContent(selectedDate),btn('+ ಪಾಠ','lesson-date',selectedDate,'small'))+'</div>';
}
function revision() {
  const items=realLessons();
  const rounds=[0,1,2].map(i=>{
    const done=items.filter(x=>x.rounds[i]).length;
    return '<article class="card round-card"><h3>ಸುತ್ತು '+(i+1)+'</h3><p class="muted">'+fmt(shift(db.start,i*15))+' – '+fmt(shift(db.start,i*15+14))+'</p><strong>'+done+' / '+items.length+' ಪಾಠಗಳು</strong><div class="bar"><span style="width:'+pct(done,items.length)+'%"></span></div></article>';
  }).join('');
  return heading('3 ಸುತ್ತಿನ ಪುನರವಲೋಕನ','ಪ್ರತಿ ಸುತ್ತಿಗೆ 15 ದಿನಗಳು · ಒಟ್ಟು 45 ದಿನಗಳು',btn('ಆರಂಭ ದಿನ ಬದಲಿಸಿ','start','', 'primary'))+
    '<div class="template-grid" style="margin-bottom:14px">'+rounds+'</div>'+section('ಪಾಠವಾರು ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',items.length?items.map(x=>'<div class="row"><div class="detail"><h3>'+esc(x.title)+'</h3><p>'+subjects[x.subject][0]+'</p></div>'+roundsFor(x)+btn('ಬಾಕಿ ಗುರಿ','catchup',x.id,'small')+'</div>').join(''):empty('ಹೊಸ ಪಾಠ ಸೇರಿಸಿದಾಗ ಅದರ 3 ಸುತ್ತುಗಳು ಇಲ್ಲಿ ಕಾಣುತ್ತವೆ.'));
}
function roundsFor(x) {
  return '<div class="rounds">'+x.rounds.map((done,i)=>'<label><input type="checkbox" data-change="round" data-id="'+x.id+'" data-index="'+i+'" '+(done?'checked':'')+'> ಸುತ್ತು '+(i+1)+'</label>').join('')+'</div>';
}
function analytics(id) {
  const ids=id?[id]:Object.keys(subjects);
  return ids.map(subject=>{
    const attempts=db.scores.filter(x=>x.subject===subject&&!x.demo);
    const items=realLessons().filter(x=>x.subject===subject);
    return '<div class="score-row">'+subjectIcon(subject)+'<div class="detail"><strong>'+subjects[subject][0]+'</strong><p class="mini-text">'+items.filter(x=>x.studied).length+'/'+items.length+' ಓದಿದೆ · '+roundTotal(items)+'/'+items.length*3+' ಸುತ್ತುಗಳು · '+attempts.length+' ಪರೀಕ್ಷೆಗಳು</p></div><strong class="saved-score">'+scorePct(attempts)+'</strong></div>';
  }).join('');
}
function scoreRows(id) {
  const scores=db.scores.filter(x=>!x.demo&&(!id||x.subject===id)).sort((a,b)=>b.date.localeCompare(a.date));
  return scores.length?scores.map(x=>'<div class="row"><div class="detail"><h3>'+esc(x.title)+'</h3><p>'+fmt(x.date)+' · '+subjects[x.subject][0]+'</p>'+(x.weak?'<p>ಮರುಓದಬೇಕಾದ ವಿಷಯಗಳು · '+esc(x.weak)+'</p>':'')+'</div><strong class="saved-score">'+x.points+'/'+x.total+'</strong>'+btn('ತಿದ್ದು','score-edit',x.id,'small')+'</div>').join(''):empty('ಪರೀಕ್ಷೆ ಮುಗಿಸಿದಾಗ ಅಥವಾ ಅಂಕ ಸೇರಿಸಿದಾಗ ದಾಖಲೆ ಇಲ್ಲಿ ಕಾಣುತ್ತದೆ.');
}
function scores() {
  return heading('ಅಂಕಗಳು ಮತ್ತು ವಿಶ್ಲೇಷಣೆ','ಪರೀಕ್ಷಾ ಅಂಕಗಳು, ವಿಷಯವಾರು ಪ್ರಗತಿ ಮತ್ತು ಮರುಓದಬೇಕಾದ ವಿಷಯಗಳು',btn('+ ಅಂಕ ಸೇರಿಸಿ','score-new','', 'primary'))+
    '<div class="grid">'+section('ಪರೀಕ್ಷಾ ದಾಖಲೆ',scoreRows())+section('ವಿಷಯವಾರು ಸರಾಸರಿ',analytics())+'</div>';
}
function subjectPage(id) {
  const items=db.lessons.filter(x=>x.subject===id).sort(byDate);
  return heading(subjects[id][0],subjects[id][1],btn('+ ಪಾಠ ಅಥವಾ PYQ','lesson-new',id,'primary'))+
    '<div class="grid"><div class="stack">'+section('ಪಾಠಗಳು ಮತ್ತು PYQ',items.length?items.map(lessonRow).join(''):empty('ಮೊದಲ ಪಾಠ ಅಥವಾ ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಯನ್ನು ಸೇರಿಸಿ.'))+
    section('ವೇಳಾಪಟ್ಟಿ',visibleTasks().some(t=>t.subject===id)?visibleTasks().filter(t=>t.subject===id).sort(byDate).map(taskRow).join(''):empty('ಅಧ್ಯಯನ ಗುರಿ ಅಥವಾ ಪರೀಕ್ಷೆ ಬಿಡುಗಡೆ ಸಮಯ ಸೇರಿಸಿ.'),btn('+ ವೇಳಾಪಟ್ಟಿ','subject-task',id,'small'))+'</div>'+
    '<div class="stack">'+section('ವಿಷಯದ ಪ್ರಗತಿ',analytics(id))+section('ಅಂಕಗಳು ಮತ್ತು ದುರ್ಬಲ ಭಾಗಗಳು',scoreRows(id),btn('+ ಅಂಕ','score-new',id,'small'))+'</div></div>';
}
function templates() {
  const cards=[
    ['ದಿನದ ಪಾಠ','ಕಲಿಕೆಯ ಗುರಿ, ಪರಿಕಲ್ಪನೆ, ಉದಾಹರಣೆ ಮತ್ತು ಸಾರಾಂಶ','template-lesson'],
    ['MCQ ಪರೀಕ್ಷೆ','ಪ್ರಶ್ನೆ, 4 ಆಯ್ಕೆಗಳು, ಸರಿಯಾದ ಉತ್ತರ ಮತ್ತು PYQ ಮೂಲ','template-quiz'],
    ['ಉತ್ತರ ವಿವರಣೆ','ಪರಿಕಲ್ಪನೆ, ಸರಿಯಾದ ಉತ್ತರದ ಕಾರಣ ಮತ್ತು ಇತರ ಆಯ್ಕೆಗಳ ವಿಶ್ಲೇಷಣೆ','template-explain'],
    ['ಪುನರವಲೋಕನ ಸ್ಥಿತಿ','ಆರಂಭ ದಿನ ಮತ್ತು ಪ್ರತಿ ಪಾಠಕ್ಕೆ 3 ಸುತ್ತಿನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ','start'],
    ['ಬಾಕಿ ಕೆಲಸ','ಮರುಓದಬೇಕಾದ ಭಾಗ, ಆದ್ಯತೆ ಮತ್ತು ಗಡುವು','template-catchup'],
  ];
  return heading('ಮರುಬಳಕೆಯ ಮಾದರಿಗಳು','ಪಾಠ, ಪರೀಕ್ಷೆ ಮತ್ತು ಮರುಓದಿಗೆ ಸಿದ್ಧ ವಿನ್ಯಾಸಗಳು')+'<div class="template-grid">'+cards.map(([title,detail,action])=>'<article class="card"><h2>'+title+'</h2><p class="muted">'+detail+'</p><div>'+btn('ಬಳಸಿ →',action,'','small')+'</div></article>').join('')+'</div>';
}
function render() {
  const current=route();
  $('main-nav').innerHTML=Object.entries(pages).map(([id,[title,icon]])=>navButton(id,title,icon)).join('');
  $('subject-nav').innerHTML=Object.entries(subjects).map(([id,[title,en,icon]])=>navButton(id,title,icon,['kas','fda','sda'].includes(id)?en:'')).join('');
  $('crumb').textContent=(pages[current]??subjects[current]??pages.home)[0];
  $('topdate').textContent=fmt(today(),{day:'numeric',month:'long',year:'numeric'});
  const views={home,calendar,revision,scores,templates};
  $('view').innerHTML=(Object.hasOwn(subjects,current)?subjectPage(current):(Object.hasOwn(views,current)?views[current]():home()))+
    '<p class="muted footnote">ದಾಖಲೆಗಳು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತವೆ. ವೇಳಾಪಟ್ಟಿಯ ಸಮಯ ಭಾರತದ್ದಾಗಿದೆ (IST).</p>';
}

const lessonOutline='ಕಲಿಕೆಯ ಗುರಿ\n\nಮುಖ್ಯ ಪರಿಕಲ್ಪನೆ\n\nಉದಾಹರಣೆ\n\nಪರೀಕ್ಷೆಗೆ ನೆನಪಿಡಬೇಕಾದ ಅಂಶಗಳು\n';
const explanationOutline='ಪರಿಕಲ್ಪನೆ\n\nಸರಿಯಾದ ಉತ್ತರದ ಕಾರಣ\n\nಇತರ ಆಯ್ಕೆಗಳ ವಿಶ್ಲೇಷಣೆ\n';
const catchupOutline='ಮರುಓದಬೇಕಾದ ಭಾಗ\n\nಆದ್ಯತೆ\n\nಮುಂದಿನ ಕ್ರಮ\n';
const subjectSelect = value => '<label>ವಿಷಯ<select name="subject">'+Object.entries(subjects).map(([id,[title,en]])=>'<option value="'+id+'" '+(id===value?'selected':'')+'>'+title+' · '+en+'</option>').join('')+'</select></label>';
const input = (label,name,value='',extra='required') => '<label>'+label+'<input name="'+name+'" value="'+esc(value)+'" '+extra+'></label>';
const area = (label,name,value='',extra='') => '<label>'+label+'<textarea name="'+name+'" '+extra+'>'+esc(value)+'</textarea></label>';
function modal(title,body) {
  $('dialog-title').textContent=title;
  $('dialog-body').innerHTML=body;
  if (!$('dialog').open) $('dialog').showModal();
  $('dialog').scrollTop=0;
}
function submitForm(handler) {
  $('dialog-body').querySelector('form').onsubmit=event=>{
    event.preventDefault();
    handler(Object.fromEntries(new FormData(event.currentTarget)),event.currentTarget);
  };
}
function close() { $('dialog').close(); }
const submit = label => '<button class="btn primary" type="submit">'+label+'</button>';
function questionFields(q={},mode) {
  return '<fieldset class="question-fields"><legend>MCQ</legend>'+input('ಪ್ರಶ್ನೆ','question',q.text)+
    '<div class="form-grid">'+Array.from({length:4},(_,i)=>input('ಆಯ್ಕೆ '+(i+1),'option'+i,q.options?.[i])).join('')+'</div>'+
    '<label>ಸರಿಯಾದ ಆಯ್ಕೆ<select name="correct">'+Array.from({length:4},(_,i)=>'<option value="'+i+'" '+(q.correct===i?'selected':'')+'>'+(i+1)+'</option>').join('')+'</select></label>'+
    area('ಉತ್ತರ ವಿವರಣೆ','explanation',q.explanation??(mode==='explain'?explanationOutline:''),'required')+
    input('PYQ ಮೂಲ ಅಥವಾ ವರ್ಷ','source',q.source,'placeholder="ಉದಾ. KEA 2025"')+
    '<div>'+btn('ಪ್ರಶ್ನೆ ತೆಗೆದುಹಾಕಿ','question-remove','','small danger')+'</div></fieldset>';
}
function lessonForm({item,subject,date,mode}={}) {
  const template=mode==='lesson'||mode==='quiz'||mode==='explain';
  modal(item?'ಪಾಠ ತಿದ್ದು':'ಹೊಸ ಪಾಠ ಅಥವಾ PYQ',
    '<form>'+input('ಪಾಠದ ಶೀರ್ಷಿಕೆ','title',item?.title)+
    '<div class="form-grid">'+subjectSelect(item?.subject??subject)+input('ಅಧ್ಯಯನ ದಿನ','date',item?.date??date??today(),'type="date" required')+'</div>'+
    area('ವಿವರವಾದ ಪಾಠ','notes',item?.notes??(template?lessonOutline:''),'required placeholder="ಪರಿಕಲ್ಪನೆ, ಉದಾಹರಣೆ ಮತ್ತು ಮುಖ್ಯ ಅಂಶಗಳು"')+
    area('ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಮೂಲದ ಟಿಪ್ಪಣಿ','pyq',item?.pyq,'placeholder="ಪರೀಕ್ಷೆ, ವರ್ಷ ಮತ್ತು ಪ್ರಶ್ನೆ"')+
    '<div id="question-fields" class="stack">'+(item?item.questions.map(q=>questionFields(q)).join(''):mode==='quiz'||mode==='explain'?questionFields({},mode):'')+'</div>'+
    '<div class="actions">'+btn('+ MCQ','question-add','','small')+submit('ಪಾಠ ಉಳಿಸಿ')+'</div></form>');
  submitForm((f,form)=>{
    const questions=[...form.querySelectorAll('.question-fields')].map(fields=>{
      const value=name=>fields.querySelector('[name="'+name+'"]').value.trim();
      return {text:value('question'),options:[0,1,2,3].map(i=>value('option'+i)),correct:Number(value('correct')),explanation:value('explanation'),source:value('source')};
    });
    const data={id:item?.id??uid(),subject:f.subject,title:f.title.trim(),date:f.date,notes:f.notes.trim(),pyq:f.pyq.trim(),studied:item?.studied??false,rounds:item?.rounds??[false,false,false],questions};
    if (item) db.lessons=db.lessons.map(x=>x.id===item.id?data:x);
    else db.lessons.push(data);
    close();
    location.hash=data.subject;
    save('ಪಾಠ ಉಳಿಸಲಾಗಿದೆ');
  });
}
function releaseFor(item) {
  return visibleTasks().filter(t=>t.kind==='release'&&t.lessonId===item.id).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))[0];
}
function openLesson(item) {
  if (!item) return;
  const release=releaseFor(item);
  const locked=release&&!live(release);
  const quizButton=item.questions.length&&item.studied&&!locked?btn('MCQ ಪ್ರಾರಂಭಿಸಿ →','quiz',item.id,'primary'):'';
  modal(item.title,'<div class="stack"><div>'+pill(subjects[item.subject][0])+' '+(item.demo?pill('ಮಾದರಿ'):'')+'</div>'+
    (item.published?'<p class="mini-text">'+fmt(item.date)+' · '+(item.sourceStatus==='verified'?'ಮೂಲ PYQ ಪರಿಶೀಲಿಸಲಾಗಿದೆ':item.sourceStatus==='partial'?'ಕೆಲವು ಮೂಲಗಳ ಪರಿಶೀಲನೆ ಬಾಕಿ':'ಮೂಲ PYQ ಪರಿಶೀಲನೆ ಬಾಕಿ')+'</p>':'')+'<section><h3>1. ವಿವರವಾದ ಪಾಠ ಓದಿ</h3><div class="notes">'+esc(item.notes)+'</div>'+
    (item.pyq?'<h3>ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಗಳು / ಟಿಪ್ಪಣಿ</h3><div class="notes">'+esc(item.pyq)+'</div>':'')+
    (item.studied?pill('ಓದಿದೆ','success'):btn('ಓದಿದೆ ಎಂದು ಗುರುತಿಸಿ','studied',item.id,'primary'))+'</section>'+
    '<section><h3>2. ವಿಷಯಕ್ಕೆ ಹೊಂದುವ MCQ</h3><p class="muted">'+(locked?'ಬಿಡುಗಡೆ '+fmt(release.date)+' · '+release.time+' IST':item.questions.length?item.questions.length+' ಪ್ರಶ್ನೆಗಳು · ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ 1 ಅಂಕ':'ಈ ಪಾಠಕ್ಕೆ MCQ ಸೇರಿಸಿ.')+'</p>'+quizButton+'</section>'+
    (!item.demo?'<section><h3>ಪುನರವಲೋಕನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ</h3>'+roundsFor(item)+'</section><div class="actions">'+btn('ಪಾಠ ತಿದ್ದು','lesson-edit',item.id,'small')+btn('ಬಿಡುಗಡೆ ನಿಗದಿಪಡಿಸಿ','release',item.id,'small')+btn('ಅಳಿಸಿ','lesson-delete',item.id,'small danger')+'</div>':'')+'</div>');
}
function quiz(item) {
  const release=releaseFor(item);
  if (!item.studied||!item.questions.length||(release&&!live(release))) return openLesson(item);
  modal('ವಿಷಯಾಧಾರಿತ MCQ','<form><p>'+esc(item.title)+'</p>'+item.questions.map((q,i)=>
    '<fieldset class="quiz-question"><legend>'+(i+1)+'. '+(q.kind==='extra'?'[ಹೆಚ್ಚುವರಿ ಅಭ್ಯಾಸ] ':q.kind==='pyq'?'[ಮೂಲ PYQ] ':'')+esc(q.text)+'</legend>'+q.options.map((o,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'" required> '+esc(o)+'</label>').join('')+'</fieldset>').join('')+submit('ಉತ್ತರಗಳನ್ನು ಸಲ್ಲಿಸಿ')+'</form>');
  submitForm(f=>{
    let points=0;
    const missed=[];
    const explanations=item.questions.map((q,i)=>{
      const correct=Number(f['q'+i])===q.correct;
      if (correct) points++;
      else missed.push(q.text);
      return '<div class="quiz-question"><h3>'+(i+1)+'. '+esc(q.text)+'</h3>'+pill(correct?'ಸರಿ':'ತಪ್ಪು',correct?'success':'warn')+
      '<p>ನಿಮ್ಮ ಆಯ್ಕೆ · '+esc(q.options[Number(f['q'+i])])+'</p><p>ಸರಿಯಾದ ಉತ್ತರ · '+esc(q.options[q.correct])+'</p><div class="explanation">'+esc(q.explanation)+'</div>'+
      (q.source?'<p class="mini-text">'+esc(q.source)+'</p>':'')+'</div>';
    }).join('');
    const result={id:uid(),subject:item.subject,title:item.title,date:today(),points,total:item.questions.length,weak:missed.length?item.title+' · '+missed.join(' / '):'',demo:item.demo};
    db.scores.push(result);
    save('ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಿದೆ');
    modal('ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶ','<strong class="saved-score">'+points+' / '+item.questions.length+'</strong>'+explanations+btn('ಪಾಠಕ್ಕೆ ಹಿಂತಿರುಗಿ','open-lesson',item.id,'small'));
  });
}
function taskForm({item,date,subject,kind='study',from,outline=false}={}) {
  const currentKind=item?.kind??kind;
  const lessonOptions=db.lessons.filter(x=>!x.demo).map(x=>'<option value="'+x.id+'" '+((item?.lessonId??from?.id)===x.id?'selected':'')+'>'+esc(x.title)+' · '+subjects[x.subject][1]+'</option>').join('');
  modal(item?'ವೇಳಾಪಟ್ಟಿ ತಿದ್ದು':'ಹೊಸ ವೇಳಾಪಟ್ಟಿ','<form>'+
    input('ಗುರಿ ಅಥವಾ ಪರೀಕ್ಷೆಯ ಹೆಸರು','title',item?.title??(from?(kind==='catchup'?'ಮರುಓದು · ':'')+from.title:''))+
    '<div class="form-grid">'+subjectSelect(item?.subject??subject??from?.subject)+'<label>ವಿಧ<select name="kind">'+Object.entries(taskKinds).map(([id,title])=>'<option value="'+id+'" '+(currentKind===id?'selected':'')+'>'+title+'</option>').join('')+'</select></label></div>'+
    '<div class="form-grid">'+input('ದಿನಾಂಕ','date',item?.date??date??today(),'type="date" required')+input('ಸಮಯ (IST)','time',item?.time??(currentKind==='release'?'16:00':''),'type="time"')+'</div>'+
    '<label id="release-lesson">ಪರೀಕ್ಷೆಗೆ ಜೋಡಿಸುವ ಪಾಠ<select name="lessonId"><option value="">ಪಾಠ ಆಯ್ಕೆ ಮಾಡಿ</option>'+lessonOptions+'</select></label>'+
    area('ಟಿಪ್ಪಣಿ','notes',item?.notes??(outline?catchupOutline:''))+
    '<div class="actions">'+submit('ಉಳಿಸಿ')+(item?btn('ಅಳಿಸಿ','task-delete',item.id,'small danger'):'')+'</div></form>');
  const form=$('dialog-body').querySelector('form');
  const toggle=()=>{
    const isRelease=form.elements.kind.value==='release';
    $('release-lesson').style.display=isRelease?'grid':'none';
    form.elements.time.required=isRelease;
    if (isRelease&&!form.elements.time.value) form.elements.time.value='16:00';
  };
  form.elements.kind.onchange=toggle;
  form.elements.lessonId.onchange=()=>{
    const picked=lesson(form.elements.lessonId.value);
    if (picked) form.elements.subject.value=picked.subject;
  };
  toggle();
  submitForm(f=>{
    const attached=f.kind==='release'?lesson(f.lessonId):null;
    const duplicate=attached&&visibleTasks().some(t=>t.id!==item?.id&&t.kind==='release'&&t.lessonId===attached.id);
    if (duplicate) { toast('ಈ ಪಾಠಕ್ಕೆ ಈಗಾಗಲೇ ಬಿಡುಗಡೆ ಸಮಯ ನಿಗದಿಯಾಗಿದೆ.'); return; }
    const record={...f,title:f.title.trim(),subject:attached?.subject??f.subject,id:item?.id??uid(),done:item?.done??false,lessonId:attached?.id??''};
    if (item) db.tasks=db.tasks.map(t=>t.id===item.id?record:t);
    else db.tasks.push(record);
    selectedDate=f.date;
    displayedMonth=f.date.slice(0,7);
    close();
    save('ವೇಳಾಪಟ್ಟಿ ಉಳಿಸಲಾಗಿದೆ');
  });
}
function scoreForm(item,subject) {
  modal(item?'ಅಂಕದ ದಾಖಲೆ ತಿದ್ದು':'ಅಂಕ ದಾಖಲಿಸಿ','<form>'+input('ಪರೀಕ್ಷೆಯ ಹೆಸರು','title',item?.title)+
    '<div class="form-grid">'+subjectSelect(item?.subject??subject)+input('ಪರೀಕ್ಷೆ ದಿನ','date',item?.date??today(),'type="date" required')+'</div>'+
    '<div class="form-grid">'+input('ಪಡೆದ ಅಂಕ','points',item?.points,'type="number" step="any" required')+
    input('ಒಟ್ಟು ಅಂಕ','total',item?.total,'type="number" min="0.01" step="any" required')+'</div>'+
    area('ದುರ್ಬಲ ಭಾಗಗಳು / ಮರುಓದಬೇಕಾದ ವಿಷಯಗಳು','weak',item?.weak)+
    '<p class="form-error" id="score-error" role="alert"></p><div class="actions">'+submit('ಅಂಕ ಉಳಿಸಿ')+(item?btn('ಅಳಿಸಿ','score-delete',item.id,'small danger'):'')+'</div></form>');
  submitForm(f=>{
    if (Number(f.points)>Number(f.total)) {
      $('score-error').textContent='ಪಡೆದ ಅಂಕ ಒಟ್ಟು ಅಂಕಕ್ಕಿಂತ ಹೆಚ್ಚಿರಬಾರದು.';
      return;
    }
    const data={...f,id:item?.id??uid(),points:Number(f.points),total:Number(f.total)};
    if (item) db.scores=db.scores.map(x=>x.id===item.id?data:x);
    else db.scores.push(data);
    close();
    save('ಅಂಕ ಉಳಿಸಲಾಗಿದೆ');
  });
}
function startForm() {
  modal('45 ದಿನಗಳ ಆರಂಭ ದಿನ','<form>'+input('ಆರಂಭ ದಿನಾಂಕ','start',db.start,'type="date" required')+submit('ಆರಂಭ ದಿನ ಉಳಿಸಿ')+'</form>');
  submitForm(f=>{db.start=f.start;close();save('ಆರಂಭ ದಿನ ಉಳಿಸಲಾಗಿದೆ');});
}
function removeRecord(table,id,label) {
  if (!confirm(label+' ಅಳಿಸಬೇಕೇ?')) return;
  db[table]=db[table].filter(x=>x.id!==id);
  if (table==='lessons') db.tasks.forEach(t=>{if(t.lessonId===id)t.lessonId='';});
  close();
  save('ಅಳಿಸಲಾಗಿದೆ');
}
function menu(open) {
  document.querySelector('.sidebar').classList.toggle('open',open);
  $('menu').setAttribute('aria-expanded',String(open));
}
document.addEventListener('click',event=>{
  const target=event.target.closest('[data-action]');
  if (!target) return;
  event.preventDefault();
  const {action,id}=target.dataset;
  const item=lesson(id);
  switch(action) {
    case 'navigate': location.hash=id; menu(false); break;
    case 'date': selectedDate=id;displayedMonth=id.slice(0,7);location.hash='calendar';render();break;
    case 'month': {
      const d=dateObj(displayedMonth+'-01');
      d.setUTCMonth(d.getUTCMonth()+Number(id));
      displayedMonth=d.toISOString().slice(0,7);
      selectedDate=displayedMonth+'-01';
      render();
      break;
    }
    case 'lesson-new': lessonForm({subject:id});break;
    case 'lesson-date': lessonForm({date:id});break;
    case 'lesson-edit': lessonForm({item});break;
    case 'lesson-delete': removeRecord('lessons',id,'ಈ ಪಾಠವನ್ನು');break;
    case 'open-lesson': openLesson(item);break;
    case 'studied': item.studied=true;save('ಪಾಠ ಓದಲಾಗಿದೆ');openLesson(item);break;
    case 'quiz': quiz(item);break;
    case 'question-add': $('question-fields').insertAdjacentHTML('beforeend',questionFields());$('question-fields').lastElementChild.querySelector('input').focus();break;
    case 'question-remove': target.closest('fieldset').remove();break;
    case 'task-new': taskForm({date:id});break;
    case 'subject-task': taskForm({subject:id});break;
    case 'task-edit': taskForm({item:db.tasks.find(x=>x.id===id)});break;
    case 'task-delete': removeRecord('tasks',id,'ಈ ವೇಳಾಪಟ್ಟಿಯನ್ನು');break;
    case 'release': {
      const existing=releaseFor(item);
      taskForm(existing?{item:existing}:{kind:'release',from:item,date:item.date});
      break;
    }
    case 'catchup': taskForm({kind:'catchup',from:item,outline:true});break;
    case 'score-new': scoreForm(null,id);break;
    case 'score-edit': scoreForm(db.scores.find(x=>x.id===id));break;
    case 'score-delete': removeRecord('scores',id,'ಈ ಅಂಕದ ದಾಖಲೆಯನ್ನು');break;
    case 'start': startForm();break;
    case 'template-lesson': lessonForm({mode:'lesson'});break;
    case 'template-quiz': lessonForm({mode:'quiz'});break;
    case 'template-explain': lessonForm({mode:'explain'});break;
    case 'template-catchup': taskForm({kind:'catchup',outline:true});break;
  }
});
document.addEventListener('change',event=>{
  const target=event.target;
  const {change,id,index}=target.dataset;
  if (change==='task') db.tasks.find(x=>x.id===id).done=target.checked;
  if (change==='round') lesson(id).rounds[Number(index)]=target.checked;
  if (change) save();
});
$('close').onclick=close;
$('menu').onclick=()=>menu($('menu').getAttribute('aria-expanded')!=='true');
document.querySelector('.workspace').addEventListener('click',event=>{if(!event.target.closest('#menu'))menu(false);});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
let lastMinute=indiaTime();
setInterval(()=>{
  const current=indiaTime();
  if (current===lastMinute) return;
  lastMinute=current;
  render();
},15000);
render();

if (window.KEA_LESSON_FEED) {
  window.KEA_LESSON_FEED.ready.then(importPublishedLessons).catch(()=>{
    feedState='error';
    render();
  });
}
