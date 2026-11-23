'use strict';
(() => {
const $=id=>document.getElementById(id),{escape:e,icon}=UI,q=window.QUESTIONS,c=window.EXAM_CONFIG,test=window.SELECTED_TEST,n=q.length,key=Accounts.key('attempt:'+test.id),fp=ExamCore.fingerprint(q);
const scienceQuiz = test.id === 'biology-day06-zoology';
const instantQuiz = scienceQuiz || /^kea-current-affairs-karnataka-set-0[1-4]$/.test(test.id);
const streakMessages = {
  3: '🎯 ಲಯ ಸಿಕ್ಕಿದೆ! · In the zone!',
  5: '🔥 ಅದ್ಭುತ ಸರಣಿ! · You’re on fire!'
};
let state=null,interval=null,canSave=true;
const saved=window.REVIEW_STATE||UI.attempt(test.id);if(ExamCore.validAttempt(saved,n,fp))state=saved;
const [kicker,title,kn,im]=UI.meta(test);
const unscoredCount=q.filter(x=>x.unscored===true).length,scoredCount=n-unscoredCount;
document.body.classList.toggle('polity-exam',['polity','current-affairs'].includes(test.topic));
$('introTitle').textContent=title;$('introChapter').textContent=kn;const notes=UI.testNotes(test);$('introNotes').innerHTML=notes.map(note=>`<span>${e(note)}</span>`).join('');$('introNotes').hidden=!notes.length;$('introCount').textContent=n;$('introTime').textContent=c.durationMinutes;$('introMarks').textContent=scoredCount*(c.marksPerCorrect??1);$('introArt').innerHTML=icon(im)+`<b>${e(UI.grade(test))}<br>${test.topic==='polity'?'Polity':test.topic==='current-affairs'?'Current Affairs & Karnataka GK':test.grade==='pyq'?'General Knowledge':test.grade==='computer'?'Computer':'Science'}</b><small>KEAEXAMS2026 · PRACTISE WITH PURPOSE</small>`;
$('examTitle').textContent=title;$('examGrade').textContent=UI.grade(test)+' · '+((test.language==='kn'||test.id==='science-mock-01')?'ಕನ್ನಡ PRACTICE':'ಕನ್ನಡ + ENGLISH');$('markInstruction').textContent=`+${c.marksPerCorrect??1} for a correct answer. ${c.negativeMarks?'−'+c.negativeMarks+' for an incorrect answer.':'No negative marks.'} Unanswered questions score 0.`;if(test.language==='kn')$('languageInstruction').textContent='ಪ್ರಶ್ನೆಗಳು, ಆಯ್ಕೆಗಳು ಮತ್ತು ವಿವರಣೆಗಳು ಕನ್ನಡದಲ್ಲಿ ಇವೆ.';else if(test.id==='science-mock-01')$('languageInstruction').textContent='This legacy mock has Kannada questions, options and explanations.';if(unscoredCount)$('markInstruction').textContent+=` ${unscoredCount} ಪ್ರಶ್ನೆಗಳು ಅಂಕಕ್ಕೆ ಸೇರಿಲ್ಲ (ಮೂಲದಲ್ಲಿನ ಸಮಸ್ಯೆ ವಿವರಿಸಲಾಗುತ್ತದೆ).`;
function persist(){if(window.REVIEW_STATE)return;try{localStorage.setItem(key,JSON.stringify(state));canSave=true;}catch{canSave=false;$('storageWarning').hidden=false;}$('saveStatus').hidden=!canSave;}
function fresh(){return{attemptId:UI.uuid(),version:window.CURRENT_VERSION,fingerprint:fp,current:0,answers:Array(n).fill(null),visited:Array(n).fill(false),review:Array(n).fill(false),deadline:Date.now()+c.durationMinutes*60000,startedAt:Date.now(),finished:false};}
function show(id){['intro','exam','results'].forEach(x=>$(x).hidden=x!==id);}
function status(i){return state.review[i]?'review':state.answers[i]!==null?'answered':state.visited[i]?'unanswered':'unseen';}
function answered(){return state.answers.filter(a=>a!==null).length;}
function palette(){
$('palette').innerHTML=q.map((_,i)=>`<button type="button" data-index="${i}" class="${status(i)} ${state.answers[i]!==null?'has-answer':''} ${state.current===i?'current':''}" aria-label="Question ${i+1}, ${status(i)}${state.review[i]&&state.answers[i]!==null?', answered':''}" ${state.current===i?'aria-current="step"':''}>${i+1}</button>`).join('');
$('palette').querySelectorAll('button').forEach(b=>b.onclick=()=>go(Number(b.dataset.index)));
$('progress').textContent=`${answered()} answered · ${state.review.filter(Boolean).length} marked · ${n-answered()} unanswered`;$('paletteCount').textContent=`${answered()}/${n}`;$('progressBar').style.width=answered()/n*100+'%';
$('qStatus').textContent=state.review[state.current]?'Marked for review':state.answers[state.current]!==null?'Answered':'Not answered';$('reviewBtn').innerHTML=icon('flag')+(state.review[state.current]?'Remove review mark':'Mark for review');$('reviewBtn').setAttribute('aria-pressed',String(state.review[state.current]));
}
function updateQuizStreak(question, selected) {
  if (!scienceQuiz || question.unscored) return;
  state.quizStreak = selected === question.answer ? (state.quizStreak || 0) + 1 : 0;
}

function playQuizCelebration(message) {
  document.querySelector('.quiz-celebration-pop')?.remove();
  const popup = document.createElement('div');
  popup.className = 'quiz-celebration-pop';
  popup.setAttribute('aria-hidden', 'true');
  popup.textContent = message || '🎉  ಸರಿಯಾದ ಉತ್ತರ!  ✨';
  document.body.append(popup);
  setTimeout(() => popup.remove(), 2200);
}

function showQuizFeedback(question, selected, celebrate = false) {
  const feedback = $('quizFeedback');
  feedback.replaceChildren();
  if (!instantQuiz || selected === null) return;
  const status = document.createElement('strong');
  status.textContent = question.unscored ? 'ಪರಿಶೀಲನೆ ಬಾಕಿ · ಅಂಕವಿಲ್ಲ' :
    selected === question.answer ? '✓ ಸರಿಯಾದ ಉತ್ತರ' : '✕ ತಪ್ಪಾದ ಉತ್ತರ';
  feedback.append(status);
  if (!question.unscored && selected === question.answer) {
    const celebration = document.createElement('span');
    celebration.className = 'quiz-celebration';
    celebration.setAttribute('aria-hidden', 'true');
    celebration.textContent = '🎉 ✨';
    feedback.append(celebration);
    if (celebrate) {
      const milestone = scienceQuiz && streakMessages[state.quizStreak];
      if (milestone) {
        const streak = document.createElement('p');
        streak.textContent = milestone + ' · ' + state.quizStreak + ' correct in a row';
        feedback.append(streak);
      }
      playQuizCelebration(milestone);
    }
  }
  const options = $('options').querySelectorAll('.option');
  options[selected]?.classList.add(question.unscored ? 'quiz-selected' :
    selected === question.answer ? 'quiz-right' : 'quiz-wrong');
  if (!question.unscored) {
    options[question.answer]?.classList.add('quiz-right');
    const key = document.createElement('p');
    key.textContent = 'ಸರಿಯಾದ ಆಯ್ಕೆ: ' + 'ABCD'[question.answer] + '. ' + question.options[question.answer];
    feedback.append(key);
  }
  const provisional = question.unscored && question.options.find(option =>
    question.explanation.startsWith('ಸಂಕಲನದಲ್ಲಿ ಸೂಚಿಸಿರುವ ತಾತ್ಕಾಲಿಕ ಆಯ್ಕೆ: ' + option + '. '));
  if (provisional) {
    const key = document.createElement('p');
    key.textContent = 'PDF ಸೂಚಿಸಿದ ತಾತ್ಕಾಲಿಕ ಉತ್ತರ: ' + provisional;
    feedback.append(key);
  }
  const explanation = document.createElement('p');
  explanation.textContent = question.explanation;
  feedback.append(explanation);
}
if (instantQuiz) {
  $('languageInstruction').textContent = 'ಆಯ್ಕೆ ಮಾಡಿದ ತಕ್ಷಣ ಉತ್ತರ ಮತ್ತು ವಿವರಣೆ ಕಾಣಿಸುತ್ತವೆ. ಮೊದಲ ಆಯ್ಕೆಯೇ ಅಂಕಕ್ಕೆ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.';
  $('introChapter').textContent = scienceQuiz ? kn + ' · Quiz' : 'Quiz · ತಕ್ಷಣ ಉತ್ತರ ಮತ್ತು ವಿವರಣೆ';
  $('startBtn').textContent = 'Start quiz';
  $('clearBtn').hidden = true;
  $('submitBtn').textContent = 'Finish quiz';
  $('confirmSubmit').textContent = 'Finish quiz';
  $('confirmDialog').querySelector('h2').textContent = 'Finish this quiz?';
}
function render(){const i=state.current;state.visited[i]=true;$('questionCounter').textContent=`QUESTION ${i+1} OF ${n}`;$('questionText').textContent=q[i].question.replace(/\n\s*\[Source group:[^\]]+\]/g,'');const src=$('questionSource');src.hidden=typeof q[i].source!=='string'&&!q[i].unscored;src.textContent=[typeof q[i].source==='string'?`ಮೂಲ: ${q[i].source} · ಪ್ರಶ್ನೆ ${q[i].sourceQuestionNumber}`:'',q[i].unscored?'ಅಂಕಕ್ಕೆ ಪರಿಗಣಿಸಿಲ್ಲ':''].filter(Boolean).join(' · ');$('options').innerHTML='<legend class="sr-only">Answer options</legend>'+q[i].options.map((o,j)=>`<label class="option"><input type="radio" name="answer" value="${j}" ${state.answers[i]===j?'checked':''} ${instantQuiz&&state.answers[i]!==null?'disabled':''}><span class="option-letter">${'ABCD'[j]}</span><span class="option-content">${e(o)}</span></label>`).join('');$('options').querySelectorAll('input').forEach(el=>el.onchange=()=>{if(expired() || (instantQuiz && state.answers[i] !== null))return;
state.answers[i]=Number(el.value);
if (instantQuiz) {
  $('options').querySelectorAll('input').forEach(input => { input.disabled = true; });
  updateQuizStreak(q[i], state.answers[i]);
  showQuizFeedback(q[i], state.answers[i], true);
}
palette();persist();});showQuizFeedback(q[i], state.answers[i]);$('prevBtn').disabled=i===0;$('nextBtn').innerHTML=i===n-1?'Back to first '+icon('arrow'):'Save & next '+icon('arrow');palette();persist();}
function tick(){if(!state||state.finished)return;const remaining=ExamCore.remaining(state.deadline);$('timer').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');$('timer').parentElement.parentElement.classList.toggle('warning',remaining<=60);if(remaining===0)finish(true);}
function expired(){if(state.finished)return true;if(ExamCore.remaining(state.deadline)===0){finish(true);return true;}return false;}
function go(i){if(expired())return;state.current=i;render();$('questionText').focus({preventScroll:true});$('exam').scrollIntoView({behavior:'smooth',block:'start'});}
function start(reset=false){Accounts.locked=true;window.REVIEW_STATE=null;window.scrollTo({top:0});if(reset||!state)state=fresh();show('exam');render();tick();if(!state.finished)interval=setInterval(tick,250);}
function finish(auto){if(state.finished)return;state.finished=true;state.finishedAt=Date.now();state.auto=auto;Object.assign(state,ExamCore.score(q,state.answers,c));clearInterval(interval);$('confirmDialog').close();persist();Accounts.locked=false;archive();results();window.scrollTo({top:0,behavior:'smooth'});}
function archive(){state.attemptId??=UI.uuid();persist();Accounts.archive(state,test,q,c).catch(()=>{document.querySelector('[data-account-status]').textContent='Could not archive this result. Keep this page open and reload to retry.';});}
function review(){const filter=$('reviewFilter').value;let shown=0;$('answerKey').innerHTML=q.map((x,i)=>{const a=state.answers[i],kind=x.unscored?'unscored':a===null?'skipped':a===x.answer?'correct':'incorrect';if(filter==='marked'&&!state.review[i]||filter!=='all'&&filter!=='marked'&&filter!==kind)return '';shown++;const status=kind==='unscored'?'ಅಂಕಕ್ಕೆ ಪರಿಗಣಿಸಿಲ್ಲ':kind==='incorrect'?'Incorrect':kind==='correct'?'Correct':'Skipped',answer=x.unscored?`ಅಂಕಕ್ಕೆ ಪರಿಗಣಿಸಿಲ್ಲ${x.issue?' · '+e(x.issue):''}`:e('ABCD'[x.answer]+'. '+x.options[x.answer]),notes=Array.isArray(x.optionNotes)?`<p class="option-explanations"><b>ಪ್ರತಿ ಆಯ್ಕೆಯ ವಿವರಣೆ</b>\n${x.optionNotes.map((note,j)=>e('ABCD'[j]+'. '+note)).join('\n')}</p>`:'',source=typeof x.source==='string'?`<p class="review-source">ಮೂಲ: ${e(x.source)} · ಪ್ರಶ್ನೆ ${e(x.sourceQuestionNumber)}</p>`:'',reference=x.reference?`<p class="review-source">ಉಲ್ಲೇಖ: ${e(x.reference)}</p>`:'';return `<article class="answer-card ${kind}"><span class="review-status">Question ${i+1} · ${status}${state.review[i]?' · Marked for review':''}</span><h3>${e(x.question)}</h3>${source}<p>Your answer / ನಿಮ್ಮ ಉತ್ತರ: ${a===null?'Not answered / ಉತ್ತರಿಸಿಲ್ಲ':e('ABCD'[a]+'. '+x.options[a])}</p><p class="answer-label">${x.unscored?'ಅಂಕ ನೀಡುವಿಕೆ':'Correct answer / ಸರಿಯಾದ ಉತ್ತರ'}: ${answer}</p><p class="explanation"><b>Explanation / ವಿವರಣೆ</b>\n${e(x.explanation)}</p>${notes}${reference}</article>`;}).join('');if(!shown)$('answerKey').innerHTML='<div class="empty-state"><h3>No questions in this group.</h3><p>Choose another review filter.</p></div>';}
function results(){show('results');const r=ExamCore.score(q,state.answers,c);$('resultTestName').textContent=title+' · '+UI.grade(test);$('autoNotice').hidden=!state.auto;$('scoreValue').textContent=Number(r.score.toFixed(2));$('scoreMax').textContent='OUT OF '+r.maximum+' MARKS';$('scoreRing').style.setProperty('--pct',Math.max(0,Math.min(100,r.percentage))+'%');$('resultMessage').textContent=r.percentage>=80?'Strong work. Keep it going.':r.percentage>=50?'You’re building momentum.':'A starting point to build on.';$('resultSummary').innerHTML=[['Correct',r.correct,'correct'],['Incorrect',r.wrong,'wrong'],['Skipped',r.skipped,'skipped'],...(r.unscored?[['ಅಂಕಕ್ಕೆ ಸೇರಿಲ್ಲ',r.unscored,'']]:[]),['Score %',r.percentage.toFixed(1)+'%','']].map(([label,value,cls])=>`<div class="${cls}"><b>${e(value)}</b><small>${label}</small></div>`).join('');review();}
$('startBtn').disabled=false;$('startBtn').onclick=()=>start();$('prevBtn').onclick=()=>go(Math.max(0,state.current-1));$('nextBtn').onclick=()=>go((state.current+1)%n);$('clearBtn').onclick=()=>{if(instantQuiz || expired())return;state.answers[state.current]=null;render();};$('reviewBtn').onclick=()=>{if(expired())return;state.review[state.current]=!state.review[state.current];palette();persist();};$('submitBtn').onclick=()=>{if(expired())return;$('confirmSummary').textContent=`${answered()} of ${n} answered · ${n-answered()} unanswered · ${state.review.filter(Boolean).length} marked for review.`;$('confirmDialog').showModal();};$('closeSubmit').onclick=$('keepWorking').onclick=()=>$('confirmDialog').close();$('confirmSubmit').onclick=()=>{if(!expired())finish(false);};$('restartBtn').onclick=()=>{if(window.REVIEW_STATE){location.href='exam.html?test='+encodeURIComponent(test.id);return;}$('retakeDialog').showModal();};$('cancelRetake').onclick=()=>$('retakeDialog').close();$('confirmRetake').onclick=()=>{$('retakeDialog').close();$('reviewFilter').value='all';clearInterval(interval);start(true);window.scrollTo({top:0});};$('reviewFilter').onchange=review;document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
if(state?.finished){results();if(!window.REVIEW_STATE)archive();}else if(state)start();else show('intro');
})();
