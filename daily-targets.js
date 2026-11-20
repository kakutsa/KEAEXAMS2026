(() => {
  const plan=window.KEA_DAILY_PLAN;
  const rows=document.getElementById('dailyPlanRows');
  if (!plan||!rows) return;
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
  const today=parts.year+'-'+parts.month+'-'+parts.day;
  const day=Math.round((Date.parse(today)-Date.parse(plan.start))/86400000)+1;
  const key='keaexams2026-study-v1';
  let state;
  try { state=JSON.parse(localStorage.getItem(key)); } catch {}
  state??={start:plan.start,lessons:[],tasks:[],scores:[]};
  const active=plan.slotsFor(today).filter(slot=>!slot.science||(!plan.scienceBreaks.includes(today)&&today<='2026-12-09'));
  function render(feed,failed=false) {
    document.getElementById('dailyPlanDate').textContent=today+' · IST'+(day>=1&&day<=plan.days?' · Day '+day+' / '+plan.days+' · Round '+Math.ceil(day/15)+' / 3':'')+
      (failed?' · ಪಾಠಗಳ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ':feed?' · '+feed.lessons.filter(item=>item.date===today).length+'/'+(plan.examMode(today)==='kries'?1:3)+' ಪಾಠಗಳು ಪ್ರಕಟವಾಗಿವೆ':' · ದಿನದ ಪ್ರಕಟಣೆ ಬೆಳಗ್ಗೆ 6:00');
    if (plan.examMode(today)==='break') document.getElementById('dailyPlanDate').textContent=today+' · ಪರೀಕ್ಷಾ ವಿರಾಮ · 23–26 ನವೆಂಬರ್ KRIES ಕಂಪ್ಯೂಟರ್ ಮಾತ್ರ · 28 ನವೆಂಬರ್ FDA/SDA ಪುನರಾರಂಭ';
    rows.replaceChildren();
    if(day<1||day>plan.days) {
      rows.textContent='45 ದಿನಗಳ ಯೋಜನೆಯ ದಿನಾಂಕವನ್ನು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.';
      return;
    }
    active.forEach(slot=>{
      const entry=feed?.lessons.find(item=>item.date===today&&item.subject===slot.subject);
      const row=document.createElement('div');
      row.style.cssText='display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:12px 0;border-top:1px solid rgba(130,150,180,.2)';
      const link=document.createElement('a');
      link.href='study/#'+slot.subject;
      link.textContent=slot.time+' · '+(entry?.title??slot.title);
      const label=document.createElement('label');
      const check=document.createElement('input');
      check.type='checkbox';
      const id='daily-plan-'+today+'-'+slot.subject;
      check.checked=Boolean(state.tasks.find(task=>task.id===id)?.done);
      check.addEventListener('change',()=>{
        let task=state.tasks.find(item=>item.id===id);
        if (!task) {
          task={id,date:today,subject:slot.subject,time:slot.time,title:entry?.title??slot.title,notes:slot.notes,kind:'study',lessonId:entry?.id??'',done:false};
          state.tasks.push(task);
        }
        const previous=task.done;
        task.done=check.checked;
        try {localStorage.setItem(key,JSON.stringify(state));}
        catch {
          task.done=previous;
          check.checked=previous;
          document.getElementById('dailyPlanDate').textContent='ಪೂರ್ಣಗೊಂಡ ಗುರುತನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.';
        }
      });
      label.append(check,' ಪೂರ್ಣ');
      row.append(link,label);
      rows.append(row);
    });
  }
  render();
  window.KEA_LESSON_FEED?.ready.then(feed=>render(feed)).catch(()=>render(null,true));
})();
