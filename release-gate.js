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

  function makePanel(test) {
    const intro = document.getElementById('intro');
    const panel = document.createElement('section');
    panel.className = 'release-panel';
    panel.id = 'releaseNotice';
    panel.setAttribute('aria-labelledby', 'releaseHeading');
    panel.innerHTML = `<div class="release-content">
      <span class="release-badge"><span aria-hidden="true"></span> Upcoming test</span>
      <p class="release-test-name" id="releaseTestName"></p>
      <h1 id="releaseHeading">Test opens at <span id="releaseTime"></span></h1>
      <p class="release-date" id="releaseDate"></p>
      <p class="release-kannada" lang="kn">ಪರೀಕ್ಷೆಯು ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತೆರೆಯುತ್ತದೆ.</p>
      <div class="release-countdown-card">
        <p class="release-countdown-label">TIME REMAINING <span lang="kn">ಉಳಿದ ಸಮಯ</span></p>
        <div id="releaseCountdown" class="release-countdown" role="timer" aria-label="Checking the opening time">
          <span class="release-unit" id="releaseDaysUnit" hidden><strong id="releaseDays">00</strong><small>Days</small></span>
          <span class="release-unit"><strong id="releaseHours">--</strong><small>Hours</small></span>
          <span class="release-colon" aria-hidden="true">:</span>
          <span class="release-unit"><strong id="releaseMinutes">--</strong><small>Minutes</small></span>
          <span class="release-colon" aria-hidden="true">:</span>
          <span class="release-unit"><strong id="releaseSeconds">--</strong><small>Seconds</small></span>
        </div>
      </div>
      <div class="release-details" aria-label="Test details">
        <div><strong id="releaseQuestions"></strong><span>Questions</span></div>
        <div><strong id="releaseDuration"></strong><span>Minutes</span></div>
        <div id="releaseLanguage"><strong>ಕನ್ನಡ + English</strong><span>Languages</span></div>
      </div>
      <p class="release-status" id="releaseStatus" role="status"><span aria-hidden="true">✦</span> The test will open automatically when it is time.</p>
      <button type="button" class="button secondary release-retry" id="releaseRetry" hidden>Retry time check</button>
      <a class="release-back" href="./"><span aria-hidden="true">←</span> Back to test library</a>
    </div>`;
    const release = new Date(test.opensAt);
    const ist = {timeZone: 'Asia/Kolkata'};
    panel.querySelector('#releaseTestName').textContent = test.title || 'Scheduled test';
    panel.querySelector('#releaseTime').textContent =
      new Intl.DateTimeFormat('en-US', {...ist, hour: 'numeric', minute: '2-digit', hour12: true}).format(release) + ' IST';
    panel.querySelector('#releaseDate').textContent =
      new Intl.DateTimeFormat('en-GB', {...ist, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(release);
    panel.querySelector('#releaseQuestions').textContent = Number.isFinite(test.questionCount) ? test.questionCount : '—';
    panel.querySelector('#releaseDuration').textContent = Number.isFinite(test.durationMinutes) ? test.durationMinutes : '—';
    const description = String(test.description || '');
    panel.querySelector('#releaseLanguage').hidden = !(/bilingual/i.test(description) || (/Kannada/i.test(description) && /English/i.test(description)));
    intro.style.display = 'none';
    intro.parentNode.insertBefore(panel, intro);
    return {intro, panel, countdown: panel.querySelector('#releaseCountdown'),
      daysUnit: panel.querySelector('#releaseDaysUnit'), days: panel.querySelector('#releaseDays'),
      hours: panel.querySelector('#releaseHours'), minutes: panel.querySelector('#releaseMinutes'),
      seconds: panel.querySelector('#releaseSeconds'), status: panel.querySelector('#releaseStatus'),
      retry: panel.querySelector('#releaseRetry')};
  }

  function renderCountdown(ui, milliseconds) {
    const total = Math.max(0, Math.ceil(milliseconds / 1000));
    const days = Math.floor(total / 86400);
    const twoDigits = number => String(number).padStart(2, '0');
    ui.daysUnit.hidden = days === 0;
    ui.days.textContent = twoDigits(days);
    ui.hours.textContent = twoDigits(Math.floor(total % 86400 / 3600));
    ui.minutes.textContent = twoDigits(Math.floor(total % 3600 / 60));
    ui.seconds.textContent = twoDigits(total % 60);
    ui.countdown.setAttribute('aria-label', 'Opens in ' + remainingLabel(milliseconds));
  }

  async function waitForRetry(ui) {
    ui.daysUnit.hidden = true;
    ui.hours.textContent = ui.minutes.textContent = ui.seconds.textContent = '--';
    ui.countdown.setAttribute('aria-label', 'Time check unavailable');
    ui.status.textContent = 'Time check unavailable. Please check your connection and retry.';
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
        if (!ui) ui = makePanel(test);
        const remaining = release - (clock.now + performance.now() - clock.checkedAt);
        renderCountdown(ui, remaining);
        await delay(Math.min(1000, Math.max(150, remaining)));
      } catch (_) {
        if (!ui) ui = makePanel(test);
        await waitForRetry(ui);
        clock = null;
      }
    }
    if (ui) { ui.panel.remove(); ui.intro.style.display = ''; }
  }

  window.ReleaseGate = {waitUntilOpen, serverClock, isOpen, remainingLabel};
})();
