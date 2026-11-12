/* Scheduled access gate for a test. The page checks GitHub Pages time before loading it. */
'use strict';
(() => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function serverClock() {
    // A fresh same-origin HEAD response avoids trusting the student's device clock.
    const url = new URL('./', location.href);
    url.searchParams.set('_kea_clock', Math.random().toString(36).slice(2));
    const response = await fetch(url.href, {method: 'HEAD', cache: 'no-store'});
    const date = response.headers.get('Date');
    const now = Date.parse(date || '');
    if (!response.ok || !Number.isFinite(now)) throw new Error('Could not verify the time.');
    return {now, checkedAt: performance.now()};
  }

  function isOpen(opensAt, now) {
    const release = Date.parse(opensAt);
    if (!Number.isFinite(release) || !Number.isFinite(now)) throw new Error('Invalid release time.');
    return now >= release;
  }

  function remainingLabel(milliseconds) {
    const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const rest = seconds % 60;
    return `${days ? days + 'd ' : ''}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
  }

  function makePanel() {
    const intro = document.getElementById('intro');
    const panel = document.createElement('section');
    panel.className = 'intro-panel';
    panel.id = 'releaseNotice';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `<div class="intro-copy" style="grid-column:1/-1;padding:1rem">
      <span class="eyebrow">CLASS 10 SCIENCE · FULL LENGTH TEST</span>
      <h1>Test opens at 4:00 PM</h1>
      <p lang="kn">ಪರೀಕ್ಷೆ 13 ನವೆಂಬರ್ 2026 ರಂದು ಸಂಜೆ 4:00 ಗಂಟೆಗೆ ಆರಂಭವಾಗುತ್ತದೆ.</p>
      <p>Friday, 13 November 2026 · 4:00 PM IST</p>
      <p><strong>100 questions · 90 minutes · Kannada + English</strong></p>
      <p id="releaseCountdown" role="timer">Checking the opening time…</p>
      <p id="releaseStatus">The test will open automatically when it is time.</p>
      <button type="button" class="button secondary" id="releaseRetry" hidden>Retry time check</button>
      <a class="button secondary" href="./">Back to test library</a>
    </div>`;
    intro.style.display = 'none';
    intro.parentNode.insertBefore(panel, intro);
    return {intro, panel, countdown: panel.querySelector('#releaseCountdown'),
      status: panel.querySelector('#releaseStatus'), retry: panel.querySelector('#releaseRetry')};
  }

  async function waitForRetry(ui) {
    ui.countdown.textContent = 'Time check unavailable';
    ui.status.textContent = 'Please check your connection and retry. The test opens at 4:00 PM IST.';
    ui.retry.hidden = false;
    await new Promise(resolve => { ui.retry.onclick = resolve; });
    ui.retry.hidden = true;
    ui.status.textContent = 'The test will open automatically when it is time.';
  }

  async function waitUntilOpen(test) {
    const release = Date.parse(test.opensAt);
    if (!Number.isFinite(release)) throw new Error('Invalid test opening time');
    let ui = null;
    let clock = null;
    while (true) {
      try {
        if (!clock || performance.now() - clock.checkedAt >= 30000) clock = await serverClock();
        const estimatedNow = clock.now + (performance.now() - clock.checkedAt);
        // Re-check against the server at the boundary; never unlock based on an estimated time alone.
        if (estimatedNow >= release) {
          clock = await serverClock();
          if (isOpen(test.opensAt, clock.now)) break;
        }
        if (!ui) ui = makePanel();
        const remaining = release - (clock.now + performance.now() - clock.checkedAt);
        ui.countdown.textContent = 'Opens in ' + remainingLabel(remaining);
        await delay(Math.min(1000, Math.max(150, remaining)));
      } catch (_) {
        if (!ui) ui = makePanel();
        await waitForRetry(ui);
        clock = null;
      }
    }
    if (ui) { ui.panel.remove(); ui.intro.style.display = ''; }
  }

  window.ReleaseGate = {waitUntilOpen, serverClock, isOpen, remainingLabel};
})();
