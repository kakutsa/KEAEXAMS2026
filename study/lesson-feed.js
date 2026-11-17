'use strict';
window.KEA_LESSON_FEED = (() => {
  const validSubjects=['kannada','english','computer'];
  function validate(feed) {
    if (feed?.schemaVersion!==1 || !Array.isArray(feed.lessons)) throw new Error('Invalid lesson feed');
    const ids=new Set();
    const dates=new Set();
    for (const item of feed.lessons) {
      const pair=item.date+'-'+item.subject;
      if (!item.id || ids.has(item.id) || dates.has(pair) || !validSubjects.includes(item.subject) ||
          !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !item.title?.trim() || !item.notes?.trim() ||
          !['verified','partial','source-pending'].includes(item.sourceStatus) || !Array.isArray(item.questions)) {
        throw new Error('Invalid dated lesson');
      }
      ids.add(item.id);
      dates.add(pair);
      for (const q of item.questions) {
        if (!q.id || !q.text?.trim() || !Array.isArray(q.options) || q.options.length!==4 ||
            q.options.some(option=>typeof option!=='string'||!option.trim()) || !Number.isInteger(q.correct) ||
            q.correct<0 || q.correct>3 || !q.explanation?.trim() || !['pyq','extra'].includes(q.kind) ||
            (q.kind==='pyq'&&!q.source?.trim())) throw new Error('Invalid MCQ');
      }
    }
    return feed;
  }
  async function load() {
    const source=document.currentScript;
    const url=new URL('daily-lessons.json', source?.src || new URL('study/',location.href));
    const response=await fetch(url,{cache:'no-store'});
    if (!response.ok) throw new Error('Lesson feed unavailable');
    return validate(await response.json());
  }
  // Resolve the script-relative URL before the first asynchronous continuation.
  return {validate,ready:load()};
})();
