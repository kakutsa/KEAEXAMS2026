/* Shared presentation helpers. Question data retains the original repository schema. */
'use strict';
window.UI = {
  uuid(){const a=crypto.getRandomValues(new Uint8Array(16));a[6]=(a[6]&15)|64;a[8]=(a[8]&63)|128;const h=Array.from(a,x=>x.toString(16).padStart(2,'0')).join('');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);},
  escape: s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  icon(name, cls='') {
    const paths = {
      grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
      chart:'<path d="M4 4v16h16M9 15v-4m5 4V7m5 8v-5"/>',
      book:'<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
      arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
      globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
      search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
      atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',
      cell:'<path d="M21 12c0 5-3 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9Z"/><circle cx="12" cy="12" r="3"/><path d="m7 8 1 1m8 6 1 1M7 15v1m9-9v1"/>',
      computer:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 9l2 2-2 2m5 0h4"/>',
      bolt:'<path d="m13 2-9 12h7l-1 8L21 9h-8l1-7Z"/>',
      flag:'<path d="M5 21V4c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
      help:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3v1"/>',
      back:'<path d="M19 12H5m6-6-6 6 6 6"/>',
      trophy:'<path d="M7 3h10v5c0 4-2 6-5 6S7 12 7 8V3Zm0 2H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4m-4 2v6m-5 1h10"/>'
    };
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
  },
  names: {
    'science10-full-test-01':['The full science challenge','Class 10 Science · Full length test','10ನೇ ತರಗತಿ ವಿಜ್ಞಾನ • ಸಂಪೂರ್ಣ ಪರೀಕ್ಷೆ','trophy','peach'],
    'computer-c-file-handling':['C programming practice','C Programming · File Handling','ಸಿ ಪ್ರೋಗ್ರಾಮಿಂಗ್ • ಫೈಲ್ ನಿರ್ವಹಣೆ','computer','lavender'],
    'science10-ch3-4':['Class 10 Science','Metals and Non-metals & Carbon and its Compounds','Chapters 3 & 4','atom','sage'],
    'geography8-ch2-ch1':['Explore our planet','Geography · Class 8 · Chapters 1 & 2','ಭೂಮಿ ನಮ್ಮ ಜೀವಂತ ಗ್ರಹ • ಶಿಲಾಗೋಳ','globe','sage'],
    "kea-pyq-gk-d1-20261026":["Learn from the real paper","KEA PYQ TEST · General Knowledge D1","KEA ಹಿಂದಿನ ಪ್ರಶ್ನೆಪತ್ರಿಕೆ • ಸಾಮಾನ್ಯ ಜ್ಞಾನ","book","lavender"],
    'science9-full-test-01':['The full science challenge','Class 9 Science · Full length test 01','9ನೇ ತರಗತಿ ವಿಜ್ಞಾನ • ಸಂಪೂರ್ಣ ಪರೀಕ್ಷೆ','trophy','peach'],
    'science9-ch3-4':['Inside the atom','Atoms & atomic structure','ಪರಮಾಣುಗಳು • ಅಣುಗಳು • ಪರಮಾಣುವಿನ ರಚನೆ','atom','lavender'],
    'science9-ch5-6':['The living world','Cells & tissues','ಜೀವದ ಮೂಲ ಘಟಕ • ಅಂಗಾಂಶಗಳು','cell','sage'],
    'science9-ch1-2':['Matter, made simple','Matter & mixtures','ದ್ರವ್ಯಗಳು • ದ್ರವ್ಯದ ಶುದ್ಧತೆ','atom','lavender'],
    'science8-full-test-01':['The full science challenge','Full length test · 01','ಸಂಪೂರ್ಣ ವಿಜ್ಞಾನ ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆ','trophy','peach'],
    'science8-ch11-12-13':['Explore the invisible','Electricity, nature & light','ವಿದ್ಯುತ್ • ನೈಸರ್ಗಿಕ ವಿದ್ಯಮಾನಗಳು • ಬೆಳಕು','bolt','butter'],
    'science8-ch9-10':['Growing & listening','Adolescence & sound','ಹದಿಹರೆಯಕ್ಕೆ ಪ್ರವೇಶ • ಶಬ್ದ','atom','lavender'],
    'science8-ch10':['The science of sound','Sound','ಶಬ್ದ','atom','sage'],
    'science8-ch9':['A new stage of life','Adolescence','ಹದಿಹರೆಯಕ್ಕೆ ಪ್ರವೇಶ','cell','peach'],
    'computer-os-test-02':['Inside the operating system','OS structures & services','ಕಾರ್ಯನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ • ಪರೀಕ್ಷೆ 02','computer','lavender'],
    'computer-os-test-01':['Meet your operating system','OS fundamentals','ಕಾರ್ಯನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ • ಪರೀಕ್ಷೆ 01','computer','butter'],
    'science8-ch7-8':['Life, in all its forms','Conservation & reproduction','ಸಂರಕ್ಷಣೆ • ಸಂತಾನೋತ್ಪತ್ತಿ','cell','sage'],
    'science8-ch5-6':['Feel the force','Force, pressure & friction','ಬಲ • ಒತ್ತಡ • ಘರ್ಷಣೆ','bolt','peach'],
    'science8-ch3-4':['Fuel your curiosity','Coal, petroleum & combustion','ಕಲ್ಲಿದ್ದಲು • ಪೆಟ್ರೋಲಿಯಂ • ದಹನ','bolt','butter'],
    'science8-ch2':['A world beyond sight','Cells & microorganisms','ಅಗೋಚರ ಜೀವ ಜಗತ್ತು','cell','lavender'],
    'science-mock-01':['A science warm-up','General science · 01','ವಿಜ್ಞಾನ ಮಾದರಿ ಪರೀಕ್ಷೆ','atom','sage']
  },
  meta(t) { return this.names[t.id] || [t.title,t.chapter,t.chapter,'book','sage']; },
  read(key, fallback=null) {try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}},
  attempt(id) {return this.read(window.Accounts ? Accounts.key('attempt:'+id) : 'kea:attempt:'+id) || (!window.Accounts?.user ? this.read('kea:attempt:'+id) : null);},
  grade(t) {return t.grade==='pyq'?'KEA PYQ TEST':t.grade==='computer'?'Computer':t.grade==='mixed'?'Mixed practice':'Class '+t.grade;}
};

/* A decorative cursor halo shared by the catalog and exam pages. */
(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let halo = null, frame = 0, initialized = false;
  let x = 0, y = 0, targetX = 0, targetY = 0;

  function hide() {
    if (halo) halo.dataset.visible = 'false';
    cancelAnimationFrame(frame);
    frame = 0;
    initialized = false;
  }

  function draw() {
    x += (targetX - x) * 0.28;
    y += (targetY - y) * 0.28;
    halo.style.transform = `translate3d(${x - 44}px, ${y - 44}px, 0)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.15
      ? requestAnimationFrame(draw) : 0;
  }

  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') {
      hide();
      return;
    }
    if (!halo) {
      halo = document.createElement('div');
      halo.className = 'cursor-glow';
      halo.setAttribute('aria-hidden', 'true');
      document.body.appendChild(halo);
    }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!initialized) {
      x = targetX;
      y = targetY;
      initialized = true;
    }
    halo.dataset.visible = 'true';
    if (!frame) frame = requestAnimationFrame(draw);
  }, {passive: true});

  document.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => {if (document.hidden) hide();});
  for (const preference of [finePointer, reducedMotion]) {
    preference.addEventListener('change', hide);
  }
})();

