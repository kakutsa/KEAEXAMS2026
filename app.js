'use strict';
(() => {
  const config = window.EXAM_CONFIG;
  const questions = window.QUESTIONS;
  if (!config || !Array.isArray(questions) || questions.length === 0 || questions.some(q => !Array.isArray(q.options) || q.options.length !== 4 || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3)) {
    document.body.textContent = 'Question configuration error. Check questions.js';
    return;
  }
  const $ = id => document.getElementById(id);
  const state = {current:0, answers:Array(questions.length).fill(null), visited:Array(questions.length).fill(false), review:Array(questions.length).fill(false), remaining:config.durationMinutes*60, interval:null, deadline:null, finished:false};
  $('introCount').textContent = String(questions.length);
  $('introTime').textContent = String(config.durationMinutes);
  $('examTitle').textContent = config.title;
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function formatTime(t){return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;}
  function countAnswered(){return state.answers.filter(a=>a!==null).length;}
  function status(i){return state.review[i]?'review':state.answers[i]!==null?'answered':state.visited[i]?'unanswered':'unseen';}
  function tick(){
    if(state.finished)return;
    state.remaining=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));
    $('timer').textContent=formatTime(state.remaining);
    $('timer').classList.toggle('warning',state.remaining<=60);
    if(state.remaining===0) finish(true);
  }
  function render(){
    const i=state.current,q=questions[i];state.visited[i]=true;
    $('questionCounter').textContent=`Question ${i+1} of ${questions.length}`;
    $('questionText').textContent=`Q${i+1}. ${q.question}`;
    $('qStatus').textContent=state.review[i]?'Marked for Review':state.answers[i]!==null?'Answered':'Not Answered';
    $('options').innerHTML=q.options.map((option,j)=>`<label class="option"><input type="radio" name="answer" value="${j}" ${state.answers[i]===j?'checked':''}><span>(${j+1}) ${esc(option)}</span></label>`).join('');
    $('options').querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{state.answers[state.current]=Number(el.value);renderPalette();$('qStatus').textContent=state.review[state.current]?'Marked for Review':'Answered';}));
    $('reviewBtn').textContent=state.review[i]?'★ Remove Review Mark':'☆ Mark for Review';
    $('prevBtn').disabled=i===0;
    $('nextBtn').textContent=i===questions.length-1?'Go to Question 1 ↻':'Save & Next →';
    renderPalette();
  }
  function renderPalette(){
    $('palette').innerHTML=questions.map((q,i)=>`<button type="button" data-index="${i}" class="${status(i)} ${state.current===i?'current':''}" aria-label="Question ${i+1}, ${status(i)}" ${state.current===i?'aria-current="step"':''}>${i+1}</button>`).join('');
    $('palette').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.index))));
    $('progress').textContent=`Answered: ${countAnswered()} / ${questions.length} • Review: ${state.review.filter(Boolean).length} • Unanswered: ${questions.length-countAnswered()}`;
  }
  function go(i){if(state.finished)return;state.current=i;render();window.scrollTo({top:0,behavior:'smooth'});}
  function start(){
    $('intro').classList.add('hidden');$('results').classList.add('hidden');$('exam').classList.remove('hidden');
    state.deadline=Date.now()+config.durationMinutes*60000;
    state.visited[0]=true;render();tick();state.interval=setInterval(tick,250);
  }
  function finish(auto){
    if(state.finished)return;
    state.finished=true;clearInterval(state.interval);
    $('exam').classList.add('hidden');$('results').classList.remove('hidden');
    const correct=questions.reduce((n,q,i)=>n+(state.answers[i]===q.answer?1:0),0);
    const wrong=questions.reduce((n,q,i)=>n+(state.answers[i]!==null&&state.answers[i]!==q.answer?1:0),0);
    const skipped=questions.length-correct-wrong;
    const score=correct*config.marksPerCorrect-wrong*config.negativeMarks;
    const maximum=questions.length*config.marksPerCorrect;
    const percentage=maximum>0?(score/maximum*100):0;
    $('resultSummary').innerHTML=[['Score',`${score.toFixed(2)} / ${maximum}`],['Correct',correct],['Wrong',wrong],['Skipped',skipped],['Percentage',`${percentage.toFixed(1)}%`]].map(([k,v])=>`<div><strong>${esc(v)}</strong><small>${esc(k)}</small></div>`).join('')+(auto?'<p class="muted">ಸಮಯ ಮುಗಿದ ಕಾರಣ ಪರೀಕ್ಷೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.</p>':'');
    $('answerKey').innerHTML=questions.map((q,i)=>{
      const a=state.answers[i],kind=a===null?'skipped':a===q.answer?'correct':'incorrect';
      const given=a===null?'ಉತ್ತರಿಸಿಲ್ಲ':`(${a+1}) ${esc(q.options[a])}`;
      return `<article class="answer-card ${kind}"><b>Q${i+1}. ${esc(q.question)}</b><p>ನಿಮ್ಮ ಉತ್ತರ: ${given}</p><p class="answer-label">ಸರಿಯಾದ ಉತ್ತರ: (${q.answer+1}) ${esc(q.options[q.answer])}</p><p class="explanation"><b>Explanation:</b> ${esc(q.explanation)}</p></article>`;
    }).join('');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  $('startBtn').addEventListener('click',start);
  $('prevBtn').addEventListener('click',()=>go(state.current-1));
  $('nextBtn').addEventListener('click',()=>go((state.current+1)%questions.length));
  $('clearBtn').addEventListener('click',()=>{state.answers[state.current]=null;render();});
  $('reviewBtn').addEventListener('click',()=>{state.review[state.current]=!state.review[state.current];render();});
  $('submitBtn').addEventListener('click',()=>{
    tick();if(state.finished)return;
    const d=$('confirmDialog');
    if(typeof d.showModal==='function')d.showModal();else if(window.confirm('Submit the test?'))finish(false);
  });
  $('confirmDialog').addEventListener('close',()=>{if($('confirmDialog').returnValue==='confirm')finish(false);});
  $('restartBtn').addEventListener('click',()=>window.location.reload());
  window.addEventListener('beforeunload',e=>{if(!state.finished&&state.deadline){e.preventDefault();e.returnValue='';}});
})();
