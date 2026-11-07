/* KEAEXAMS2026: original bilingual MCQs on C file handling. */
window.EXAM_CONFIG = {
  "title": "Computer MCQ – C Programming: File Handling",
  "durationMinutes": 30,
  "marksPerCorrect": 1,
  "negativeMarks": 0,
  "shuffleQuestions": false
};
window.QUESTIONS = [
  {
    "id": 1,
    "question": "C ಭಾಷೆಯಲ್ಲಿ fopen(), fclose() ಮುಂತಾದ ಫೈಲ್ ನಿರ್ವಹಣಾ ಕಾರ್ಯಗಳ ಘೋಷಣೆ ಇರುವ ಹೆಡರ್ ಯಾವುದು?\n\nWhich header declares file-handling functions such as fopen() and fclose() in C?",
    "options": [
      "<string.h>",
      "<math.h>",
      "<stdio.h>",
      "<ctype.h>"
    ],
    "answer": 2,
    "explanation": "ಫೈಲ್ ಇನ್‌ಪುಟ್ ಮತ್ತು ಔಟ್‌ಪುಟ್ ಕಾರ್ಯಗಳು <stdio.h> ಹೆಡರ್‌ನಲ್ಲಿ ಘೋಷಿಸಲ್ಪಟ್ಟಿವೆ.\n\nThe C standard I/O header <stdio.h> declares these file functions."
  },
  {
    "id": 2,
    "question": "fopen() ಯಶಸ್ವಿಯಾದಾಗ ಅದರ ಫಲಿತಾಂಶವನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಯಾವ ರೀತಿಯ ವೇರಿಯಬಲ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುತ್ತಾರೆ?\n\nWhich variable type normally stores the result of a successful fopen() call?",
    "options": [
      "FILE *",
      "int",
      "char",
      "double *"
    ],
    "answer": 0,
    "explanation": "fopen() ಯಶಸ್ವಿಯಾದರೆ ಸ್ಟ್ರೀಮ್ ಅನ್ನು ನಿಯಂತ್ರಿಸುವ FILE ವಸ್ತುವಿನ ಪಾಯಿಂಟರ್ ಅನ್ನು ನೀಡುತ್ತದೆ.\n\nOn success, fopen() returns a FILE pointer identifying the stream."
  },
  {
    "id": 3,
    "question": "ಒಂದು ಫೈಲ್ ತೆರೆಯಲು fopen() ವಿಫಲವಾದರೆ ಅದು ಏನನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ?\n\nWhat does fopen() return when it fails to open a file?",
    "options": [
      "EOF",
      "0 ಎಂಬ ಅಕ್ಷರ / Character 0",
      "ಫೈಲ್‌ನ ಗಾತ್ರ / File size",
      "NULL ಪಾಯಿಂಟರ್ / Null pointer"
    ],
    "answer": 3,
    "explanation": "ಫೈಲ್ ತೆರೆಯಲು ವಿಫಲವಾದಾಗ fopen() NULL ಪಾಯಿಂಟರ್ ನೀಡುತ್ತದೆ; ಆದ್ದರಿಂದ ಅದನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.\n\nfopen() returns a null pointer on failure, so check it before using the stream."
  },
  {
    "id": 4,
    "question": "ಇಲ್ಲದ ಫೈಲ್‌ಗೆ fopen(\"data.txt\", \"r\") ಬಳಸಿದಾಗ ಸಾಮಾನ್ಯ C ಮಾನದಂಡದ ಪ್ರಕಾರ ಏನಾಗುತ್ತದೆ?\n\nUnder standard C, what happens if fopen(\"data.txt\", \"r\") is used for a file that does not exist?",
    "options": [
      "ಹೊಸ ಫೈಲ್ ಸೃಷ್ಟಿಯಾಗುತ್ತದೆ / A new file is created",
      "ತೆರೆಯುವುದು ವಿಫಲವಾಗಿ NULL ದೊರೆಯುತ್ತದೆ / Opening fails and NULL is returned",
      "ಖಾಲಿ ಫೈಲ್ ತೆರೆಯುತ್ತದೆ / An empty file opens",
      "ಫೈಲ್ ಸೇರಿಸುವ ಕ್ರಮದಲ್ಲಿ ತೆರೆಯುತ್ತದೆ / It opens for appending"
    ],
    "answer": 1,
    "explanation": "\"r\" ಕ್ರಮವು ಓದಲು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು ತೆರೆಯುತ್ತದೆ. ಫೈಲ್ ಇಲ್ಲದಿದ್ದರೆ ತೆರೆಯುವುದು ವಿಫಲವಾಗುತ್ತದೆ.\n\nThe \"r\" mode opens an existing file for reading; a missing file causes the open to fail."
  },
  {
    "id": 5,
    "question": "ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು \"w\" ಕ್ರಮದಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ತೆರೆದರೆ ಹಳೆಯ ವಿಷಯಕ್ಕೆ ಏನಾಗುತ್ತದೆ?\n\nWhat happens to an existing file when it is successfully opened with \"w\"?",
    "options": [
      "ಹಳೆಯ ವಿಷಯವನ್ನು ಉಳಿಸಿ ಕೊನೆಯಲ್ಲಿ ಬರೆಯುತ್ತದೆ / Old content remains and writing is at the end",
      "ಓದಲು ಮಾತ್ರ ತೆರೆಯುತ್ತದೆ / It opens for reading only",
      "ಹಳೆಯ ವಿಷಯವನ್ನು ಅಳಿಸಿ ಉದ್ದವನ್ನು ಶೂನ್ಯಕ್ಕೆ ಇಳಿಸುತ್ತದೆ / Existing content is truncated",
      "ಫೈಲ್ ಹೆಸರನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ / It renames the file"
    ],
    "answer": 2,
    "explanation": "\"w\" ಬರವಣಿಗೆಗಾಗಿ ತೆರೆಯುವಾಗ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು truncate ಮಾಡುತ್ತದೆ; ಫೈಲ್ ಇಲ್ಲದಿದ್ದರೆ ಸೃಷ್ಟಿಸಬಹುದು.\n\nOpening with \"w\" truncates an existing file and can create a missing file."
  },
  {
    "id": 6,
    "question": "ಹಳೆಯ ವಿಷಯವನ್ನು ಉಳಿಸಿಕೊಂಡು ಹೊಸ ಮಾಹಿತಿಯನ್ನು ಫೈಲ್‌ನ ಕೊನೆಯಲ್ಲಿ ಮಾತ್ರ ಬರೆಯಲು ಯಾವ ಕ್ರಮ ಸೂಕ್ತ?\n\nWhich mode is suitable for preserving existing contents and writing new data only at the end?",
    "options": [
      "\"r\"",
      "\"w\"",
      "\"r+\"",
      "\"a\""
    ],
    "answer": 3,
    "explanation": "\"a\" append ಕ್ರಮದಲ್ಲಿ ಬರಹವು ಫೈಲ್‌ನ ಕೊನೆಯಲ್ಲಿ ಸೇರುತ್ತದೆ; ಫೈಲ್ ಇಲ್ಲದಿದ್ದರೆ ಅದನ್ನು ಸೃಷ್ಟಿಸಬಹುದು.\n\nIn \"a\" mode, output is appended at the end; the file can be created if absent."
  },
  {
    "id": 7,
    "question": "ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು truncate ಮಾಡದೆ ಓದಲು ಮತ್ತು ಬರೆಯಲು ತೆರೆಯುವ ಕ್ರಮ ಯಾವುದು?\n\nWhich mode opens an existing file for both reading and writing without truncating it?",
    "options": [
      "\"w\"",
      "\"r+\"",
      "\"w+\"",
      "\"r\""
    ],
    "answer": 1,
    "explanation": "\"r+\" ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು ಓದುವ ಮತ್ತು ಬರೆಯುವ update ಕ್ರಮದಲ್ಲಿ ತೆರೆಯುತ್ತದೆ; ಆರಂಭದಲ್ಲೇ truncate ಮಾಡುವುದಿಲ್ಲ.\n\n\"r+\" opens an existing file for update (reading and writing) without initial truncation."
  },
  {
    "id": 8,
    "question": "ಓದಲು ಮತ್ತು ಬರೆಯಲು ಅವಕಾಶ ನೀಡುತ್ತಾ, ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್‌ನ ವಿಷಯವನ್ನು truncate ಮಾಡುವ ಕ್ರಮ ಯಾವುದು?\n\nWhich mode permits reading and writing but truncates an existing file when opened?",
    "options": [
      "\"w+\"",
      "\"r+\"",
      "\"a\"",
      "\"rb\""
    ],
    "answer": 0,
    "explanation": "\"w+\" ಓದುವ ಮತ್ತು ಬರೆಯುವ ಕ್ರಮ; ಇದು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು truncate ಮಾಡುತ್ತದೆ ಅಥವಾ ಹೊಸ ಫೈಲ್ ಸೃಷ್ಟಿಸುತ್ತದೆ.\n\n\"w+\" opens an update stream, truncating an existing file or creating a new one."
  },
  {
    "id": 9,
    "question": "\"a+\" ಕ್ರಮದ ಬಗ್ಗೆ ಸರಿಯಾದ ಹೇಳಿಕೆ ಯಾವುದು?\n\nWhich statement about \"a+\" mode is correct?",
    "options": [
      "ಓದಲು ಮಾತ್ರ ಅವಕಾಶ / It permits reading only",
      "ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ಅನ್ನು ಯಾವಾಗಲೂ truncate ಮಾಡುತ್ತದೆ / It always truncates an existing file",
      "ಫೈಲ್ ಇಲ್ಲದಿದ್ದರೆ ಎಂದಿಗೂ ಸೃಷ್ಟಿಸುವುದಿಲ್ಲ / It never creates a missing file",
      "ಓದಲು ಮತ್ತು ಬರೆಯಲು ಅವಕಾಶ; ಬರಹವು ಕೊನೆಯಲ್ಲಿ ಸೇರುತ್ತದೆ / It permits reading and writing; output is appended"
    ],
    "answer": 3,
    "explanation": "\"a+\" ಓದುವುದಕ್ಕೂ ಬರೆಯುವುದಕ್ಕೂ ಅವಕಾಶ ನೀಡುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಬರವಣಿಗೆಯೂ ಕೊನೆಯಲ್ಲಿ ಸೇರುತ್ತದೆ.\n\n\"a+\" permits input and output, and output is forced to the end of the file."
  },
  {
    "id": 10,
    "question": "ಬೈನರಿ ಕ್ರಮದಲ್ಲಿ ಓದಲು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಫೈಲ್ ತೆರೆಯಲು ಸರಿಯಾದ mode string ಯಾವುದು?\n\nWhich mode string opens an existing file for reading in binary mode?",
    "options": [
      "\"bw\"",
      "\"rb\"",
      "\"ab\"",
      "\"wb+\""
    ],
    "answer": 1,
    "explanation": "\"rb\" ಎಂದರೆ binary read. ಫೈಲ್ ಇಲ್ಲದಿದ್ದರೆ fopen() ವಿಫಲವಾಗುತ್ತದೆ.\n\n\"rb\" opens an existing file for binary input; it fails if the file does not exist."
  },
  {
    "id": 11,
    "question": "C ಯಲ್ಲಿ ಫೈಲ್ binary ಕ್ರಮದಲ್ಲಿ ತೆರೆಯಲ್ಪಟ್ಟಿದೆಯೇ ಎಂಬುದನ್ನು ಮುಖ್ಯವಾಗಿ ಯಾವುದು ನಿರ್ಧರಿಸುತ್ತದೆ?\n\nIn C, what primarily selects binary mode when opening a file?",
    "options": [
      "fopen() ನ mode string ನಲ್ಲಿ b ಬಳಸುವುದು / Using b in the fopen() mode string",
      "ಹೆಸರು .bin ಎಂದು ಕೊನೆಗೊಳ್ಳುವುದು / The name ending in .bin",
      "ಫೈಲ್ ಗಾತ್ರ / The file size",
      "FILE ಪಾಯಿಂಟರ್‌ನ ಹೆಸರು / The FILE pointer name"
    ],
    "answer": 0,
    "explanation": "ಬೈನರಿ ಸ್ಟ್ರೀಮ್ ತೆರೆಯಲು mode string ನಲ್ಲಿ b ಬಳಸುತ್ತಾರೆ. .bin ವಿಸ್ತರಣೆ ಕಡ್ಡಾಯವಲ್ಲ.\n\nThe b in the mode string selects a binary stream; a .bin filename extension is not required."
  },
  {
    "id": 12,
    "question": "fclose(fp) ಯಶಸ್ವಿಯಾದಾಗ ಸಾಮಾನ್ಯವಾಗಿ ಯಾವ ಮೌಲ್ಯವನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ?\n\nWhat value does fclose(fp) return on success?",
    "options": [
      "1",
      "NULL",
      "0",
      "EOF"
    ],
    "answer": 2,
    "explanation": "fclose() ಸ್ಟ್ರೀಮ್ ಮುಚ್ಚಿ, ಯಶಸ್ವಿಯಾದರೆ ಶೂನ್ಯವನ್ನು ಮತ್ತು ವಿಫಲವಾದರೆ EOF ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.\n\nfclose() closes the stream and returns zero on success, or EOF on failure."
  },
  {
    "id": 13,
    "question": "ಒಂದು ಫೈಲ್‌ನಿಂದ ಒಂದು ಅಕ್ಷರವನ್ನು ಓದಲು ಯಾವ function ಬಳಸಬಹುದು?\n\nWhich function can read a single character from a file?",
    "options": [
      "fputs()",
      "fgetc()",
      "fwrite()",
      "fprintf()"
    ],
    "answer": 1,
    "explanation": "fgetc(fp) ಮುಂದಿನ ಅಕ್ಷರವನ್ನು unsigned char ನಿಂದ int ಗೆ ಪರಿವರ್ತಿಸಿ ನೀಡುತ್ತದೆ; EOF ಅಥವಾ ದೋಷದಲ್ಲೂ EOF ನೀಡುತ್ತದೆ.\n\nfgetc(fp) reads the next character as an int, or returns EOF at end of file or on a read error."
  },
  {
    "id": 14,
    "question": "fgetc() ಫಲಿತಾಂಶವನ್ನು EOF ಜೊತೆ ಹೋಲಿಸಲು ಯಾವ ರೀತಿಯ ವೇರಿಯಬಲ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದು ಸೂಕ್ತ?\n\nWhich type should store the result of fgetc() when comparing it with EOF?",
    "options": [
      "char *",
      "unsigned char",
      "int",
      "float"
    ],
    "answer": 2,
    "explanation": "fgetc() int ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಅಕ್ಷರಗಳ ಮೌಲ್ಯ ಮತ್ತು EOF ಅನ್ನು ಬೇರ್ಪಡಿಸಲು ಫಲಿತಾಂಶವನ್ನು int ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಬೇಕು.\n\nfgetc() returns int, allowing character values and the EOF sentinel to be distinguished."
  },
  {
    "id": 15,
    "question": "ಫೈಲ್‌ಗೆ ಒಂದು ಅಕ್ಷರವನ್ನು ಬರೆಯಲು ಯಾವ function ಬಳಸುತ್ತಾರೆ?\n\nWhich function is used to write one character to a file?",
    "options": [
      "fputc()",
      "fgets()",
      "fscanf()",
      "fread()"
    ],
    "answer": 0,
    "explanation": "fputc(ch, fp) ಸ್ಟ್ರೀಮ್‌ಗೆ ಒಂದು ಅಕ್ಷರವನ್ನು ಬರೆಯುತ್ತದೆ.\n\nfputc(ch, fp) writes one character to the output stream."
  },
  {
    "id": 16,
    "question": "fgets(buffer, 10, fp) ಯಶಸ್ವಿಯಾಗಿ ಓದಿದಾಗ ಗರಿಷ್ಠ ಎಷ್ಟು input ಅಕ್ಷರಗಳನ್ನು ಸಂಗ್ರಹಿಸಬಹುದು?\n\nWhen fgets(buffer, 10, fp) succeeds, what is the maximum number of input characters stored?",
    "options": [
      "10",
      "11",
      "ಅಪರಿಮಿತ / Unlimited",
      "9"
    ],
    "answer": 3,
    "explanation": "fgets() ಗರಿಷ್ಠ n−1 ಅಕ್ಷರಗಳನ್ನು ಓದಿ ನಂತರ null terminator ಸೇರಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ಇಲ್ಲಿ ಗರಿಷ್ಠ 9.\n\nfgets() stores at most n−1 input characters and then adds a null terminator, so the maximum is 9."
  },
  {
    "id": 17,
    "question": "fputs(\"Hello\", fp) ಯಶಸ್ವಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದಾಗ ಹೊಸ ಸಾಲಿನ ಅಕ್ಷರದ ಬಗ್ಗೆ ಯಾವುದು ಸರಿ?\n\nAfter a successful fputs(\"Hello\", fp), what is true about a newline?",
    "options": [
      "ಯಾವಾಗಲೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೇರಿಸಲಾಗುತ್ತದೆ / It is always added automatically",
      "ಎರಡು ಹೊಸ ಸಾಲುಗಳು ಸೇರಿಸಲಾಗುತ್ತವೆ / Two newlines are added",
      "ಫೈಲ್ ಮುಚ್ಚಿದಾಗ ಮಾತ್ರ ಕಡ್ಡಾಯವಾಗಿ ಸೇರಿಸಲಾಗುತ್ತದೆ / It is always added on closing",
      "fputs() ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೊಸ ಸಾಲನ್ನು ಸೇರಿಸುವುದಿಲ್ಲ / fputs() does not automatically add a newline"
    ],
    "answer": 3,
    "explanation": "fputs() ನೀಡಿದ string ಅನ್ನು ಬರೆಯುತ್ತದೆ; ಅದು ಸ್ವತಃ newline ಸೇರಿಸುವುದಿಲ್ಲ. ಅಗತ್ಯವಿದ್ದರೆ string ನಲ್ಲಿ \\n ನೀಡಬೇಕು.\n\nfputs() writes the given string and does not add a newline automatically; include \\n when needed."
  },
  {
    "id": 18,
    "question": "ಫಾರ್ಮ್ಯಾಟ್ ನಿರ್ದಿಷ್ಟಪಡಿಸಿ ಫೈಲ್‌ಗೆ ಡೇಟಾ ಬರೆಯಲು ಯಾವ function ಸೂಕ್ತ?\n\nWhich function writes formatted output to a file?",
    "options": [
      "fprintf()",
      "fscanf()",
      "fgetc()",
      "rewind()"
    ],
    "answer": 0,
    "explanation": "fprintf(fp, ...) printf ನಂತೆ format ಬಳಸಿ ಸೂಚಿಸಿದ ಸ್ಟ್ರೀಮ್‌ಗೆ ಬರೆಯುತ್ತದೆ.\n\nfprintf(fp, ...) writes formatted output to the specified stream."
  },
  {
    "id": 19,
    "question": "ಫೈಲ್‌ನಿಂದ ಫಾರ್ಮ್ಯಾಟ್ ಮಾಡಿದ ಇನ್‌ಪುಟ್ ಓದಲು ಯಾವ function ಸೂಕ್ತ?\n\nWhich function reads formatted input from a file?",
    "options": [
      "fputs()",
      "fputc()",
      "fscanf()",
      "fseek()"
    ],
    "answer": 2,
    "explanation": "fscanf(fp, ...) ಫಾರ್ಮ್ಯಾಟ್ ಸ್ಟ್ರಿಂಗ್ ಪ್ರಕಾರ ಫೈಲ್‌ನಿಂದ ಮಾಹಿತಿಯನ್ನು ಓದುತ್ತದೆ.\n\nfscanf(fp, ...) reads formatted input from the specified stream."
  },
  {
    "id": 20,
    "question": "fread(buffer, sizeof(int), 5, fp) ನಲ್ಲಿ 5 ಎಂಬ ಆರ್ಗ್ಯುಮೆಂಟ್ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?\n\nIn fread(buffer, sizeof(int), 5, fp), what does the argument 5 specify?",
    "options": [
      "ಪ್ರತಿ ಅಂಶದ ಬೈಟ್ ಗಾತ್ರ / Size in bytes of each element",
      "ಓದಲು ವಿನಂತಿಸಿದ ಅಂಶಗಳ ಸಂಖ್ಯೆ / Number of elements requested",
      "ಸ್ಟ್ರೀಮ್‌ನ ಹೆಸರು / Stream name",
      "ಫೈಲ್ ಕೊನೆಯ ಸ್ಥಾನ / End position of the file"
    ],
    "answer": 1,
    "explanation": "fread() ನಲ್ಲಿ ಮೂರನೇ ಆರ್ಗ್ಯುಮೆಂಟ್ ಓದಲು ವಿನಂತಿಸಿದ ಅಂಶಗಳ ಸಂಖ್ಯೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ; ಎರಡನೇ ಆರ್ಗ್ಯುಮೆಂಟ್ ಪ್ರತಿ ಅಂಶದ ಗಾತ್ರ.\n\nThe third argument is the number of elements requested; the second is the size of each element."
  },
  {
    "id": 21,
    "question": "fwrite(data, size, count, fp) ಹಿಂದಿರುಗಿಸುವ ಮೌಲ್ಯವು ಸಾಮಾನ್ಯವಾಗಿ ಯಾವುದನ್ನು ಸೂಚಿಸುತ್ತದೆ?\n\nWhat does the return value of fwrite(data, size, count, fp) represent?",
    "options": [
      "ಯಶಸ್ವಿಯಾಗಿ ಬರೆಯಲಾದ ಸಂಪೂರ್ಣ ಅಂಶಗಳ ಸಂಖ್ಯೆ / Number of complete elements successfully written",
      "ಯಾವಾಗಲೂ ಬರೆಯಲಾದ ಬೈಟ್‌ಗಳ ಸಂಖ್ಯೆ / Always the number of bytes written",
      "ಬರೆಯಲು ತೆರೆಯಲಾದ ಫೈಲ್‌ಗಳ ಸಂಖ್ಯೆ / Number of open files",
      "ಪ್ರತಿ ಅಂಶದ ಗಾತ್ರ / Size of each element"
    ],
    "answer": 0,
    "explanation": "fwrite() ಯಶಸ್ವಿಯಾಗಿ ಬರೆದ ಅಂಶಗಳ ಸಂಖ್ಯೆಯನ್ನು ನೀಡುತ್ತದೆ. ಪ್ರತಿ ಅಂಶದ ಗಾತ್ರ ಒಂದು ಬೈಟ್ ಆಗಿದ್ದಾಗ ಮಾತ್ರ ಅದು ಬೈಟ್‌ಗಳ ಸಂಖ್ಯೆಗೆ ಸಮನಾಗುತ್ತದೆ.\n\nfwrite() returns the number of complete elements written; it equals the byte count only when each element is one byte."
  },
  {
    "id": 22,
    "question": "ಸ್ಟ್ರೀಮ್‌ನ ಫೈಲ್ ಸ್ಥಾನದ ಸೂಚಕವನ್ನು ಫೈಲ್‌ನ ಆರಂಭಕ್ಕೆ ಸರಿಸಲು ಯಾವ ಕರೆ ಸೂಕ್ತ?\n\nWhich call positions a seekable stream at the beginning of the file?",
    "options": [
      "fseek(fp, 0L, SEEK_END)",
      "fseek(fp, 1L, SEEK_CUR)",
      "fclose(fp)",
      "fseek(fp, 0L, SEEK_SET)"
    ],
    "answer": 3,
    "explanation": "SEEK_SET ಎಂದರೆ ಆರಂಭವನ್ನು ಆಧಾರವಾಗಿಟ್ಟುಕೊಳ್ಳುವುದು; ಶೂನ್ಯ offset ಆರಂಭದ ಸ್ಥಾನವನ್ನು ಸೂಚಿಸುತ್ತದೆ.\n\nSEEK_SET uses the beginning as the reference; an offset of zero selects the start."
  },
  {
    "id": 23,
    "question": "fseek() ನಲ್ಲಿ SEEK_CUR ಯಾವ ಸ್ಥಾನವನ್ನು ಆಧಾರವಾಗಿ ಬಳಸುತ್ತದೆ?\n\nIn fseek(), which position is used as the reference for SEEK_CUR?",
    "options": [
      "ಫೈಲ್‌ನ ಆರಂಭ / Beginning of the file",
      "ಪ್ರಸ್ತುತ ಫೈಲ್ ಸ್ಥಾನ / Current file position",
      "ಫೈಲ್‌ನ ಅಂತ್ಯ / End of the file",
      "ಯಾವಾಗಲೂ ಮೊದಲ ಸಾಲಿನ ಅಂತ್ಯ / Always the end of the first line"
    ],
    "answer": 1,
    "explanation": "SEEK_CUR ಪ್ರಸ್ತುತ ಫೈಲ್ ಸ್ಥಾನದಿಂದ offset ಅನ್ನು ಲೆಕ್ಕಿಸುತ್ತದೆ.\n\nSEEK_CUR specifies an offset relative to the current file position."
  },
  {
    "id": 24,
    "question": "ಪ್ರಸ್ತುತ ಫೈಲ್ ಸ್ಥಾನದ ಮೌಲ್ಯವನ್ನು ಪಡೆಯಲು ಯಾವ function ಬಳಸುತ್ತಾರೆ?\n\nWhich function obtains the current file-position value?",
    "options": [
      "fputs()",
      "fclose()",
      "ftell()",
      "fscanf()"
    ],
    "answer": 2,
    "explanation": "ftell(fp) ಪ್ರಸ್ತುತ ಸ್ಥಾನದ ಸೂಚಕದ ಮೌಲ್ಯವನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ; ದೋಷದಲ್ಲಿ −1L ನೀಡುತ್ತದೆ.\n\nftell(fp) returns the current file-position value, or −1L on error."
  },
  {
    "id": 25,
    "question": "rewind(fp) ಯ ಮುಖ್ಯ ಕಾರ್ಯ ಯಾವುದು?\n\nWhat is the primary purpose of rewind(fp)?",
    "options": [
      "ಫೈಲ್ ಅಳಿಸುವುದು / Delete the file",
      "ಸ್ಟ್ರೀಮ್ ಅನ್ನು ಮುಚ್ಚುವುದು / Close the stream",
      "ಫೈಲ್ ಸ್ಥಾನವನ್ನು ಆರಂಭಕ್ಕೆ ಮರುಹೊಂದಿಸುವುದು / Reposition the file to the beginning",
      "ಫೈಲ್ ಹೆಸರನ್ನು ಬದಲಾಯಿಸುವುದು / Rename the file"
    ],
    "answer": 2,
    "explanation": "rewind(fp) ಫೈಲ್ ಸ್ಥಾನವನ್ನು ಆರಂಭಕ್ಕೆ ಮರುಹೊಂದಿಸುತ್ತದೆ ಮತ್ತು ಸ್ಟ್ರೀಮ್‌ನ error indicator ಅನ್ನು ಸಹ ತೆರವುಗೊಳಿಸುತ್ತದೆ.\n\nrewind(fp) resets the file position to the beginning and also clears the stream error indicator."
  },
  {
    "id": 26,
    "question": "fgetc() EOF ನೀಡಿದ ನಂತರ, ಓದುವ ದೋಷ ಸಂಭವಿಸಿತೇ ಎಂದು ತಿಳಿಯಲು ಯಾವ function ಬಳಸಬಹುದು?\n\nAfter fgetc() returns EOF, which function checks whether a read error occurred?",
    "options": [
      "ftell(fp)",
      "ferror(fp)",
      "rewind(fp)",
      "fputc(fp)"
    ],
    "answer": 1,
    "explanation": "fgetc() ಫೈಲ್ ಅಂತ್ಯದಲ್ಲಾಗಲಿ ಓದುವ ದೋಷದಲ್ಲಾಗಲಿ EOF ನೀಡಬಹುದು. ferror(fp) ದೋಷ ಸೂಚಕವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.\n\nfgetc() can return EOF for end of file or a read error. ferror(fp) checks the stream error indicator."
  },
  {
    "id": 27,
    "question": "ಯಶಸ್ವಿಯಾಗಿ ತೆರೆಯಲಾದ ಖಾಲಿ text ಫೈಲ್‌ಗೆ fputs(\"Hi\", fp); fputs(\"!\", fp); ಎಂದು ಬರೆದು ಮುಚ್ಚಲಾಗಿದೆ. ಎಲ್ಲ ಕಾರ್ಯಗಳೂ ಯಶಸ್ವಿಯಾದರೆ ವಿಷಯ ಏನು?\n\nAn initially empty text file is successfully opened for writing. After fputs(\"Hi\", fp); fputs(\"!\", fp); and a successful close, what is its content?",
    "options": [
      "Hi ನಂತರ ಎರಡು newline / Hi followed by two newlines",
      "Hi! ನಂತರ ಕಡ್ಡಾಯ newline / Hi! followed by a mandatory newline",
      "Hello!",
      "Hi!"
    ],
    "answer": 3,
    "explanation": "fputs() ಸ್ವಯಂಚಾಲಿತವಾಗಿ newline ಸೇರಿಸುವುದಿಲ್ಲ. ಎರಡೂ string ಗಳನ್ನು ಕ್ರಮವಾಗಿ ಬರೆದರೆ Hi! ದೊರೆಯುತ್ತದೆ.\n\nfputs() adds no automatic newline; writing the two strings in order gives Hi!."
  },
  {
    "id": 28,
    "question": "ಫೈಲ್‌ನ ಮುಂದಿನ ಅಕ್ಷರಗಳು ABCDE ಆಗಿವೆ. char s[4]; ಗೆ fgets(s, 4, fp) ಯಶಸ್ವಿಯಾಗಿ ಓದಿದರೆ s ನಲ್ಲಿ ಯಾವ string ಇರುತ್ತದೆ?\n\nThe next file characters are ABCDE. After a successful fgets(s, 4, fp) into char s[4], which string is in s?",
    "options": [
      "ABC",
      "ABCD",
      "ABCDE",
      "AB"
    ],
    "answer": 0,
    "explanation": "ಗಾತ್ರ 4 ಇರುವ ಬಫರ್‌ಗೆ fgets() ಗರಿಷ್ಠ 3 input ಅಕ್ಷರಗಳನ್ನು ಓದಿ ಕೊನೆಯಲ್ಲಿ null terminator ಸೇರಿಸುತ್ತದೆ.\n\nFor a buffer size of 4, fgets() reads at most three input characters and terminates the string with a null character."
  },
  {
    "id": 29,
    "question": "ಒಂದು ಫೈಲ್‌ನ ವಿಷಯ CAT ಆಗಿದೆ. ಅದನ್ನು \"a\" ಕ್ರಮದಲ್ಲಿ ತೆರೆಯಲಾಗುತ್ತದೆ. fseek(fp, 0L, SEEK_SET) ಯಶಸ್ವಿಯಾದ ನಂತರ fputc('!', fp) ಮತ್ತು fclose(fp) ಯಶಸ್ವಿಯಾದರೆ ಅಂತಿಮ ವಿಷಯ ಏನು?\n\nA file contains CAT. It is opened with \"a\". After a successful fseek(fp, 0L, SEEK_SET), fputc('!', fp) and fclose(fp) both succeed. What is the final content?",
    "options": [
      "!AT",
      "CAT!",
      "!CAT",
      "CAT"
    ],
    "answer": 1,
    "explanation": "append ಕ್ರಮದಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಬರವಣಿಗೆಯೂ ಫೈಲ್‌ನ ಕೊನೆಯಲ್ಲಿ ನಡೆಯುತ್ತದೆ; fseek() ಹಿಂದಿನ ಸ್ಥಾನಕ್ಕೆ ಸರಿಸಿದರೂ ಬರಹವು ಕೊನೆಯಲ್ಲಿ ಸೇರುತ್ತದೆ.\n\nIn append mode, each output operation is forced to the end, even after repositioning with fseek()."
  },
  {
    "id": 30,
    "question": "\"w+\" update stream ನಲ್ಲಿ ಬರೆಯುವ ಕಾರ್ಯದ ನಂತರ ಆರಂಭದಿಂದ ಓದಲು ಮುನ್ನ ಯಾವ ಕ್ರಮ ಮಾನ್ಯ?\n\nAfter writing to a \"w+\" update stream, which action validly prepares it for reading from the beginning?",
    "options": [
      "rewind(fp) ಕರೆ ಮಾಡುವುದು / Call rewind(fp)",
      "ಮತ್ತೆ fopen() ಮಾಡದೆ fclose() ನಂತರ ಓದುವುದು / Read after fclose() without reopening",
      "NULL ಅನ್ನು fgetc() ಗೆ ನೀಡುವುದು / Pass NULL to fgetc()",
      "ಕೇವಲ stream ಹೆಸರನ್ನು ಬದಲಿಸುವುದು / Merely rename the stream variable"
    ],
    "answer": 0,
    "explanation": "update stream ನಲ್ಲಿ output ನಂತರ input ಗೆ ಮುನ್ನ fflush() ಅಥವಾ file positioning ಅಗತ್ಯ. rewind(fp) ಸ್ಥಾನವನ್ನು ಆರಂಭಕ್ಕೆ ಮರುಹೊಂದಿಸಿ ಓದಲು ಸಿದ್ಧಗೊಳಿಸುತ್ತದೆ.\n\nAn update stream requires fflush() or a positioning operation between output and input. rewind(fp) also positions it at the beginning."
  }
];
