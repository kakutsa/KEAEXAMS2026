/* Pure exam rules shared by the browser engine and validation checks. */
(function(root){
'use strict';
const core={
remaining(deadline,now=Date.now()){return Math.max(0,Math.ceil((deadline-now)/1000));},
score(questions,answers,config){const correct=questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),wrong=questions.reduce((n,q,i)=>n+(answers[i]!==null&&answers[i]!==q.answer?1:0),0),skipped=questions.length-correct-wrong,marks=Number.isFinite(config.marksPerCorrect)?config.marksPerCorrect:1,negative=Number.isFinite(config.negativeMarks)?config.negativeMarks:0,score=correct*marks-wrong*negative,maximum=questions.length*marks;return{correct,wrong,skipped,score,maximum,percentage:maximum?score/maximum*100:0};},
fingerprint(questions){let h=2166136261;for(const c of JSON.stringify(questions)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return(h>>>0).toString(16);},
validAttempt(s,n,fingerprint){return !!s&&s.fingerprint===fingerprint&&Number.isFinite(s.deadline)&&s.deadline>0&&Number.isInteger(s.current)&&s.current>=0&&s.current<n&&Array.isArray(s.answers)&&s.answers.length===n&&s.answers.every(a=>a===null||(Number.isInteger(a)&&a>=0&&a<4))&&Array.isArray(s.review)&&s.review.length===n&&s.review.every(x=>typeof x==='boolean')&&Array.isArray(s.visited)&&s.visited.length===n&&s.visited.every(x=>typeof x==='boolean')&&typeof s.finished==='boolean';}
};if(typeof module!=='undefined')module.exports=core;else root.ExamCore=core;
})(typeof window!=='undefined'?window:globalThis);
