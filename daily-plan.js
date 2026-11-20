/* Shared daily schedule for the portal and study dashboard. Times are IST. */
window.KEA_DAILY_PLAN = {
  start: '2026-11-18',
  days: 45,
  scienceBreaks: ['2026-11-21','2026-11-22','2026-11-27'],
  slots: [
    {subject:'science',time:'10:00',title:'Science PYQ · ನಿಗದಿತ ಪರೀಕ್ಷೆ ಮತ್ತು ವಿವರಣೆಗಳ ಮರುಓದು',notes:'ಲಭ್ಯವಿರುವ Science PYQ ಪರೀಕ್ಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ತಪ್ಪಾದ ಉತ್ತರದ ಪರಿಕಲ್ಪನೆಯನ್ನು ಮರುಓದಿ.',science:true},
    {subject:'kannada',time:'15:00',title:'ಕನ್ನಡ · 1 ವಿಷಯದ ಪಾಠ + ಅದೇ ವಿಷಯದ PYQ',notes:'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳಿಂದ ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ. ಮೊದಲು ವಿವರವಾದ ಪಾಠ ಓದಿ, ನಂತರ ವಿಷಯಕ್ಕೆ ಹೊಂದುವ ಮೂಲ PYQ ಅಭ್ಯಾಸ ಮಾಡಿ. ಹೆಚ್ಚುವರಿ ಕನ್ನಡ ಸಾಹಿತ್ಯದ 7 MCQ.'},
    {subject:'computer',time:'18:00',title:'ಕಂಪ್ಯೂಟರ್ · 1 ವಿಷಯದ ಪಾಠ + ಅದೇ ವಿಷಯದ PYQ',notes:'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳಿಂದ ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ. ಪಾಠ → ಮೂಲ PYQ → ತಪ್ಪುಗಳ ವಿವರಣೆ. ಹೆಚ್ಚುವರಿ AI ಬೆಳವಣಿಗೆಗಳು ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಇತಿಹಾಸದ 7 MCQ.'},
    {subject:'english',time:'21:00',title:'English · 1 topic lesson + topic-matched PYQs',notes:'Choose a topic from the uploaded question papers. Study the lesson first, attempt original matching PYQs, then review errors. Add 7 vocabulary, synonym and antonym MCQs.'}
  ]
};

// Temporary KRIES exam timetable. Science follows its own challenge calendar.
window.KEA_DAILY_PLAN.examMode = date => {
  if (['2026-11-20','2026-11-21','2026-11-22','2026-11-27'].includes(date)) return 'break';
  if (date>='2026-11-23' && date<='2026-11-26') return 'kries';
  return 'normal';
};
window.KEA_DAILY_PLAN.slotsFor = date => {
  const plan=window.KEA_DAILY_PLAN;
  const mode=plan.examMode(date);
  if (mode==='normal') return plan.slots;
  const science=plan.slots.filter(slot=>slot.science);
  if (mode==='break') return science;
  const stages={
    '2026-11-23':'Pass 1 · ವಿಷಯಪಾಠ ಮತ್ತು 55 ಮೂಲ ಪ್ರಶ್ನೆಗಳು',
    '2026-11-24':'Pass 2 · ಅದೇ 55 ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ವಿವರವಾದ ವಿವರಣೆ',
    '2026-11-25':'Pass 3 · ಅದೇ 55 ಪ್ರಶ್ನೆಗಳ ಸಮಯಬದ್ಧ ಪುನರವಲೋಕನ',
    '2026-11-26':'55 ಪ್ರಶ್ನೆಗಳ Consolidation Mock ಮತ್ತು ದುರ್ಬಲ ಭಾಗಗಳು'
  };
  return [...science,{subject:'computer',time:'18:00',title:'KRIES Computer Teacher · '+stages[date],notes:'KRIESಯ 55 ಪ್ರಶ್ನೆಗಳ ಪರಿಶೀಲಿತ ಮೂಲ ಬ್ಯಾಂಕ್ ಆಧರಿಸಿದ ಗುರಿ. ಮೊದಲು ವಿಷಯದ ತ್ವರಿತ ಪುನರವಲೋಕನ, ನಂತರ ಪರೀಕ್ಷೆ. ಮೂಲ ಪಾಠ ಪ್ರಕಟವಾದಾಗ ಇಲ್ಲಿ ತೆರೆಯಬಹುದು.'}];
};
