(() => {
  const plan=window.KEA_DAILY_PLAN;
  const rows=document.getElementById('dailyPlanRows');
  if (!plan||!rows) return;
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
  const today=parts.year+'-'+parts.month+'-'+parts.day;
  const day=Math.round((Date.parse(today)-Date.parse(plan.start))/86400000)+1;
  document.getElementById('dailyPlanDate').textContent=today+' · IST'+(day>=1&&day<=plan.days?' · Day '+day+' / '+plan.days+' · Round '+Math.ceil(day/15)+' / 3':'');
  const active=plan.slots.filter(slot=>!slot.science||(!plan.scienceBreaks.includes(today)&&today<='2026-12-09'));
  let state={};
  try { state=JSON.parse(localStorage.getItem('keaexams2026-study-v1'))||{}; } catch {}
  if(day<1||day>plan.days) {
    rows.textContent='45 ದಿನಗಳ ಯೋಜನೆಯ ದಿನಾಂಕವನ್ನು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.';
    return;
  }
  active.forEach(slot=>{
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:12px 0;border-top:1px solid rgba(130,150,180,.2)';
    const link=document.createElement('a');
    link.href='study/#'+slot.subject;
    link.textContent=slot.time+' · '+slot.title;
    const status=document.createElement('span');
    const done=state.tasks?.find(t=>t.id==='daily-plan-'+today+'-'+slot.subject)?.done;
    status.textContent=done?'✓ ಪೂರ್ಣ':'○ ಬಾಕಿ';
    row.append(link,status);
    rows.append(row);
  });
})();
