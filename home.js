(() => {
"use strict";
const catalog=Array.isArray(window.TEST_CATALOG)?window.TEST_CATALOG.filter(t=>t.status==="active"):[];
const $=id=>document.getElementById(id);
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
$("testCount").textContent=String(catalog.length);
$("questionCount").textContent=String(catalog.reduce((total,t)=>total+(Number(t.questionCount)||0),0));
function render(){
 const search=$("search").value.trim().toLocaleLowerCase();
 const grade=$("grade").value;
 const matches=catalog.filter(t=>(grade==="all"||t.grade===grade)&&
 [t.title,t.subject,t.chapter,t.description,t.id].some(v=>String(v??"").toLocaleLowerCase().includes(search)));
 $("tests").innerHTML=matches.map(t=>`<article class="test">
 <span class="tag">${safe(t.grade==="mixed"?"Mixed / Mega":"Class "+t.grade)} · ${safe(t.subject)}</span>
 <h3>${safe(t.title)}</h3><p>${safe(t.description)}</p>
 <div class="facts"><span>📝 ${Number(t.questionCount)||0} Questions</span><span>⏱ ${Number(t.durationMinutes)||20} Minutes</span></div>
 <a class="start" href="exam.html?test=${encodeURIComponent(t.id)}">Attend Test →</a>
 </article>`).join("");
 $("empty").style.display=matches.length?"none":"block";
}
$("search").addEventListener("input",render);
$("grade").addEventListener("change",render);
render();
})();
