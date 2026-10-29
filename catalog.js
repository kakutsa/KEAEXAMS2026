/* KEAEXAMS2026 test catalog. Add one record for each new question file.
   Grade: "8", "9", "10", or "mixed". */
window.TEST_CATALOG = [
  {
    id: "science-mock-01",
    title: "ವಿಜ್ಞಾನ ಮಾದರಿ ಪರೀಕ್ಷೆ – 01",
    subject: "Science",
    grade: "mixed",
    chapter: "General Science",
    description: "20 Kannada Science MCQs with timer, scoring and explanations.",
    questionCount: 20,
    durationMinutes: 20,
    file: "tests/science-mock-01.js",
    status: "active"
  },
{
  "id": "science8-ch2",
  "title": "8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ – ಅಧ್ಯಾಯ 2 / Class 8 Science – Chapter 2",
  "subject": "Science",
  "grade": "8",
  "chapter": "ಅಗೋಚರ ಜೀವ ಜಗತ್ತು: ನಮ್ಮ ಬರಿಗಣ್ಣಿನ ಆಚೆ",
  "description": "20 KEA-style Kannada + English MCQs on cells, microscopy and microorganisms, with bilingual options and explanations.",
  "questionCount": 20,
  "durationMinutes": 20,
  "file": "tests/science8-ch2.js",
  "status": "active"
}
,
{
  "id": "science8-ch3-4",
  "title": "Class 8 Science – Chapters 3 & 4 TEST",
  "subject": "Science",
  "grade": "8",
  "chapter": "ಕಲ್ಲಿದ್ದಲು ಮತ್ತು ಪೆಟ್ರೋಲಿಯಂ; ದಹನ ಮತ್ತು ಜ್ವಾಲೆ",
  "description": "30 KEA-style Kannada + English MCQs: Coal and Petroleum; Combustion and Flame. Bilingual options, answers and explanations.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science8-ch3-4.js?v=2",
  "status": "active"
}
,
{
  "id": "science8-ch5-6",
  "title": "Class 8 Science – Chapters 5 & 6 TEST",
  "subject": "Science",
  "grade": "8",
  "chapter": "ಬಲ ಮತ್ತು ಒತ್ತಡ; ಘರ್ಷಣೆ",
  "description": "30 Kannada + English MCQs on Force and Pressure; Friction. Bilingual options, answers and explanations. 30 minutes.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science8-ch5-6.js?v=bilingual-20261026",
  "status": "active"
}
,
{
  "id": "science8-ch7-8",
  "title": "Class 8 Science – Part 2 – Chapters 7 & 8 TEST",
  "subject": "Science",
  "grade": "8",
  "chapter": "ಸಸ್ಯಗಳು ಮತ್ತು ಪ್ರಾಣಿಗಳ ಸಂರಕ್ಷಣೆ / Conservation of Plants and Animals; ಪ್ರಾಣಿಗಳಲ್ಲಿ ಸಂತಾನೋತ್ಪತ್ತಿ / Reproduction in Animals",
  "description": "Part 2: 30 Kannada + English MCQs on conservation and reproduction in animals, with bilingual options and explanations.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science8-ch7-8.js",
  "status": "active"
},
  {id:"computer-os-test-01",title:"Computer MCQ – Operating System – Test-01",subject:"Computer Science",grade:"computer",chapter:"OS History, Batch, Multiprogramming, Time-Sharing, Distributed and RTOS",description:"25 KEA-style Operating System Fundamentals MCQs with Kannada and English questions, answers and explanations.",questionCount:25,durationMinutes:25,file:"tests/computer-os-test-01.js",status:"active"},
  {id:"computer-os-test-02",title:"Computer MCQ – Operating System – Test-02",subject:"Computer Science",grade:"computer",chapter:"Kernel, Shell, OS Structures, Services, System Calls and Programs",description:"25 KEA-style Operating System Structures and Services MCQs with Kannada and English questions, answers and explanations.",questionCount:25,durationMinutes:25,file:"tests/computer-os-test-02.js",status:"active"}
];


/* Added 2026-10-28: 30 questions per chapter; combined test repeats both sets. */
window.TEST_CATALOG.push(...[
  {
    "id": "science8-ch9",
    "title": "Class 8 Science – Chapter 9 | ಹದಿಹರೆಯಕ್ಕೆ ಪ್ರವೇಶ / Reaching the Age of Adolescence",
    "subject": "Science",
    "grade": "8",
    "chapter": "Class 8 Science – Chapter 9 | ಹದಿಹರೆಯಕ್ಕೆ ಪ್ರವೇಶ / Reaching the Age of Adolescence",
    "description": "30 Kannada + English MCQs with bilingual options and explanations. 30 minutes.",
    "questionCount": 30,
    "durationMinutes": 30,
    "file": "tests/science8-ch9.js",
    "status": "active"
  },
  {
    "id": "science8-ch10",
    "title": "Class 8 Science – Chapter 10 | ಶಬ್ದ / Sound",
    "subject": "Science",
    "grade": "8",
    "chapter": "Class 8 Science – Chapter 10 | ಶಬ್ದ / Sound",
    "description": "30 Kannada + English MCQs with bilingual options and explanations. 30 minutes.",
    "questionCount": 30,
    "durationMinutes": 30,
    "file": "tests/science8-ch10.js",
    "status": "active"
  },
  {
    "id": "science8-ch9-10",
    "title": "Class 8 Science – Chapters 9 & 10 | Adolescence and Sound",
    "subject": "Science",
    "grade": "8",
    "chapter": "Class 8 Science – Chapters 9 & 10 | Adolescence and Sound",
    "description": "60 Kannada + English MCQs with bilingual options and explanations. 60 minutes.",
    "questionCount": 60,
    "durationMinutes": 60,
    "file": "tests/science8-ch9-10.js",
    "status": "active"
  }
]);

/* Published 2026-10-29: 20 questions from each of chapters 11, 12 and 13. */
window.TEST_CATALOG.push({
  "id": "science8-ch11-12-13",
  "title": "Class 8 Science – Chapters 11, 12 & 13 TEST",
  "subject": "Science",
  "grade": "8",
  "chapter": "ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ರಾಸಾಯನಿಕ ಪರಿಣಾಮಗಳು; ಕೆಲವು ನೈಸರ್ಗಿಕ ವಿದ್ಯಮಾನಗಳು; ಬೆಳಕು / Chemical Effects of Electric Current; Some Natural Phenomena; Light",
  "description": "60 Kannada + English MCQs: 20 per chapter, with bilingual options and explanations. 60 minutes.",
  "questionCount": 60,
  "durationMinutes": 60,
  "file": "tests/science8-ch11-12-13.js",
  "status": "active"
});
