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

/* Cumulative revision published 2026-10-30. */
window.TEST_CATALOG.push({
  "id": "science8-full-test-01",
  "title": "Class 8 Science – Full Length Test 01 | 100 MCQs",
  "subject": "Science",
  "grade": "8",
  "chapter": "Cumulative revision of the uploaded Class 8 chapter sets",
  "description": "100 Kannada + English MCQs selected and adapted from our chapter practice series, plus scientific inquiry. 100 marks; 100 minutes; no negative marking.",
  "questionCount": 100,
  "durationMinutes": 100,
  "file": "tests/science8-full-test-01.js",
  "status": "active"
});

/* Class 9 mission begins: 15 questions from each chapter. */
window.TEST_CATALOG.push({
  "id": "science9-ch1-2",
  "title": "Class 9 Science – Chapters 1 & 2 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯಗಳು; ನಮ್ಮ ಸುತ್ತಲಿನ ದ್ರವ್ಯ ಶುದ್ಧವೇ / Matter in Our Surroundings; Is Matter Around Us Pure?",
  "description": "30 Kannada + English MCQs: 15 per chapter, with bilingual options and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch1-2.js",
  "status": "active"
});

/* Published 2026-11-01: Class 9 Chapters 5 & 6. */
window.TEST_CATALOG.push({
  "id": "science9-ch5-6",
  "title": "Class 9 Science – Chapters 5 & 6 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಜೀವದ ಮೂಲ ಘಟಕ; ಅಂಗಾಂಶಗಳು / The Fundamental Unit of Life; Tissues",
  "description": "30 Kannada + English MCQs: 15 per chapter, with bilingual options and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch5-6.js",
  "status": "active"
});

/* Class 9 Chapters 7 & 8: 15 questions per chapter. */
window.TEST_CATALOG.push({
  "id": "science9-ch7-8",
  "title": "Class 9 Science – Chapters 7 & 8 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಚಲನೆ; ಬಲ ಮತ್ತು ಚಲನೆಯ ನಿಯಮಗಳು / Motion; Force and Laws of Motion",
  "description": "30 Kannada + English MCQs: 15 per chapter, with bilingual options and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch7-8.js",
  "status": "active"
});

/* Class 9 Chapters 3 & 4: 15 bilingual questions per chapter. */
window.TEST_CATALOG.push({
  "id": "science9-ch3-4",
  "title": "Class 9 Science – Chapters 3 & 4 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಪರಮಾಣುಗಳು ಮತ್ತು ಅಣುಗಳು; ಪರಮಾಣುವಿನ ರಚನೆ / Atoms and Molecules; Structure of the Atom",
  "description": "30 KEA-style Kannada + English MCQs: 15 per chapter, with bilingual options and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch3-4.js",
  "status": "active"
});

/* Class 9 Chapters 11 & 12: 15 bilingual questions per chapter. */
window.TEST_CATALOG.push({
  "id": "science9-ch11-12",
  "title": "Class 9 Science - Chapters 11 & 12 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಶಬ್ದ; ಆಹಾರ ಸಂಪನ್ಮೂಲಗಳಲ್ಲಿ ಸುಧಾರಣೆ / Sound; Improvement in Food Resources",
  "description": "30 KEA-style Kannada + English MCQs: 15 per chapter, with bilingual options and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch11-12.js",
  "status": "active"
});


/* Class 9 cumulative revision: 90 minutes, quarter-mark penalty. */
window.TEST_CATALOG.push({
  "id": "science9-full-test-01",
  "title": "Class 9 Science - Full Length Test 01 | 100 MCQs",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಸಂಪೂರ್ಣ 9ನೇ ತರಗತಿ ವಿಜ್ಞಾನ - ಅಧ್ಯಾಯಗಳು 1 ರಿಂದ 12 / Complete Class 9 Science - Chapters 1 to 12",
  "description": "100 Kannada + English MCQs across all 12 chapters. 100 marks; 90 minutes; -0.25 mark for each incorrect answer.",
  "questionCount": 100,
  "durationMinutes": 90,
  "negativeMarks": 0.25,
  "file": "tests/science9-full-test-01.js",
  "status": "active"
});

/* Approved by VJ for publication. */
window.TEST_CATALOG.push({
  "id": "kea-pyq-gk-d1-20261026",
  "title": "KEA PYQ TEST - General Knowledge D1",
  "subject": "General Knowledge",
  "grade": "pyq",
  "chapter": "KEA PYQ TEST | ಸಾಮಾನ್ಯ ಜ್ಞಾನ / General Knowledge - 26 October 2026, D1",
  "description": "100 Kannada + English previous-year questions. 100 marks; 90 minutes; -0.25 per wrong answer. Scored using the supplied D1 key; explanatory review notes flag disputed wording.",
  "questionCount": 100,
  "durationMinutes": 90,
  "negativeMarks": 0.25,
  "file": "tests/kea-pyq-gk-d1-20261026.js",
  "status": "active"
});


/* Class 9 Chapters 9 and 10. */
window.TEST_CATALOG.push({
  "id": "science9-ch9-10",
  "title": "Class 9 Science - Chapters 9 & 10 TEST",
  "subject": "Science",
  "grade": "9",
  "chapter": "ಗುರುತ್ವಾಕರ್ಷಣೆ; ಕೆಲಸ ಮತ್ತು ಶಕ್ತಿ / Gravitation; Work and Energy",
  "description": "30 Kannada + English MCQs: 15 per chapter, with answers and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science9-ch9-10.js",
  "status": "active"
});

/* Class 10 Chapters 1 and 2. */
window.TEST_CATALOG.push({
  "id": "science10-ch1-2",
  "title": "Class 10 Science - Chapters 1 & 2 TEST",
  "subject": "Science",
  "grade": "10",
  "chapter": "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು / Chemical Reactions and Equations; ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು / Acids, Bases and Salts",
  "description": "30 Kannada + English MCQs, 15 per chapter, with answers and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science10-ch1-2.js",
  "status": "active"
});

/* Class 8 Geography textbook-based bilingual test: 30 Lithosphere + 20 Earth. */
window.TEST_CATALOG.push({
  id: "geography8-ch2-ch1",
  title: "Class 8 Geography - Chapters 1 & 2 | ಭೂಮಿ ಮತ್ತು ಶಿಲಾಗೋಳ",
  subject: "Geography", grade: "8",
  chapter: "ಭೂಮಿ ನಮ್ಮ ಜೀವಂತ ಗ್ರಹ / The Earth Our Living Planet; ಶಿಲಾಗೋಳ / Lithosphere",
  description: "50 Kannada + English MCQs: Chapter 2 (30) and Chapter 1 (20). Bilingual answers, textbook-based explanations. 50 marks, 50 minutes.",
  questionCount: 50, durationMinutes: 50,
  file: "tests/geography8-ch2-ch1.js?v=20261107", status: "active"
});

/* Class 10 Science: Chapters 3 and 4. */
window.TEST_CATALOG.push({
  "id": "science10-ch3-4",
  "title": "Metals and Non-metals & Carbon and its Compounds",
  "subject": "Science",
  "grade": "10",
  "chapter": "Metals and Non-metals & Carbon and its Compounds",
  "description": "30 Kannada and English MCQs: 15 from each chapter, with NCERT-based explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/science10-ch3-4.js",
  "status": "active"
});


/* C programming: bilingual file-handling practice. */
window.TEST_CATALOG.push({
  "id": "computer-c-file-handling",
  "title": "Computer MCQ – C Programming: File Handling",
  "subject": "Computer Science",
  "grade": "computer",
  "chapter": "C Programming – File Handling / C ಪ್ರೋಗ್ರಾಮಿಂಗ್ – ಫೈಲ್ ನಿರ್ವಹಣೆ",
  "description": "30 KEA-style Kannada and English questions on C file handling, with answers and explanations. 30 marks; 30 minutes; no negative marking.",
  "questionCount": 30,
  "durationMinutes": 30,
  "file": "tests/computer-c-file-handling.js",
  "status": "active"
});

/* Class 10 NCERT Science: Chapter 5 Life Processes and Chapter 6 Control and Coordination. */
window.TEST_CATALOG.push({
  id: "science10-ch5-6",
  title: "Life Processes & Control and Coordination",
  subject: "Science", grade: "10",
  chapter: "Life Processes & Control and Coordination",
  description: "30 KEA/UPSC-style Kannada + English MCQs: 15 from each chapter, with NCERT-based explanations. 30 marks, 30 minutes; no negative marking.",
  questionCount: 30, durationMinutes: 30,
  file: "tests/science10-ch5-6.js", status: "active"
});

/* NCERT Class 10 Chapters 7 and 8 */
window.TEST_CATALOG.push({id:"science10-ch7-8",title:"How do Organisms Reproduce? & Heredity",subject:"Science",grade:"10",chapter:"How do Organisms Reproduce? & Heredity",description:"30 Kannada + English NCERT-based MCQs, 15 per chapter, with detailed bilingual explanations. 30 marks; 30 minutes; no negative marking.",questionCount:30,durationMinutes:30,file:"tests/science10-ch7-8.js",status:"active"});
