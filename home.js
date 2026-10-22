(() => {
  "use strict";
  const categories = {
    "8": {title: "8th Science", description: "Class 8 chapter-wise Science CBT tests"},
    "9": {title: "9th Science", description: "Class 9 chapter-wise Science CBT tests"},
    "10": {title: "10th Science", description: "Class 10 chapter-wise Science CBT tests"},
    "mixed": {title: "KEA Mega Tests", description: "Mixed syllabus and general science mock tests"}
  };
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  if (!Object.prototype.hasOwnProperty.call(categories, category)) return;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  $("categoryGrid").hidden = true;
  $("categoryView").hidden = false;
  $("categoryTitle").textContent = categories[category].title;
  $("categorySummary").textContent = categories[category].description;
  document.title = categories[category].title + " | KEAEXAMS2026";
  const tests = (Array.isArray(window.TEST_CATALOG) ? window.TEST_CATALOG : [])
    .filter(test => test.status === "active" && test.grade === category);
  function render() {
    const query = $("testSearch").value.trim().toLocaleLowerCase();
    const matching = tests.filter(test => [test.title,test.chapter,test.subject,test.description].some(
      field => String(field ?? "").toLocaleLowerCase().includes(query)
    ));
    $("testList").innerHTML = matching.map(test => `
      <article class="test">
        <h3>${esc(test.title)}</h3>
        <p>${esc(test.description || test.chapter || "")}</p>
        <div class="test-meta"><span>📝 ${Number(test.questionCount) || 0} Questions</span><span>⏱ ${Number(test.durationMinutes) || 20} Minutes</span></div>
        <a class="start" href="exam.html?test=${encodeURIComponent(test.id)}">Attend Test →</a>
      </article>`).join("");
    $("empty").hidden = matching.length > 0;
    $("empty").textContent = !tests.length
      ? "No tests published in this category yet. Chapter tests will appear here once uploaded."
      : "No matching tests. Try another search.";
  }
  $("testSearch").addEventListener("input", render);
  render();
})();