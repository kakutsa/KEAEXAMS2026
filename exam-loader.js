/* Shared exam loader. Existing app.js remains the CBT engine. */
(() => {
  "use strict";
  const id = new URLSearchParams(window.location.search).get("test");
  const catalog = Array.isArray(window.TEST_CATALOG) ? window.TEST_CATALOG : [];
  const selected = catalog.find(t => t.id === id && t.status === "active");
  const intro = document.getElementById("intro");
  function error(message) {
    if (intro) {
      intro.replaceChildren();
      const heading = document.createElement("h1");
      heading.textContent = "Test unavailable";
      const detail = document.createElement("p");
      detail.textContent = message;
      const link = document.createElement("a");
      link.href = "./";
      link.textContent = "← Back to all tests";
      intro.append(heading, detail, link);
    }
  }
  if (!selected) {
    error("The requested test is not published in the KEAEXAMS2026 catalog.");
    return;
  }
  document.title = selected.title + " | KEAEXAMS2026";
  const heading = intro && intro.querySelector("h1");
  if (heading) heading.textContent = selected.title;
  const desc = intro && intro.querySelector(".muted");
  if (desc) desc.textContent = selected.description || "KEA / KPSC practice test";
  const testScript = document.createElement("script");
  testScript.src = selected.file;
  testScript.onerror = () => error("Could not load the question file. Check the catalog file path.");
  testScript.onload = () => {
    if (!window.EXAM_CONFIG || !Array.isArray(window.QUESTIONS)) {
      error("The test question file has an invalid format.");
      return;
    }
    const engineScript = document.createElement("script");
    engineScript.src = "app.js";
    engineScript.onerror = () => error("Could not load the CBT engine.");
    document.body.appendChild(engineScript);
  };
  document.body.appendChild(testScript);
})();
