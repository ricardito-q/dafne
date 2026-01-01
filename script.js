document.addEventListener('DOMContentLoaded', () => {
  const trunk = document.getElementById('trunk');
  const hearts = Array.from(document.querySelectorAll('#hearts path'));
  const dedEl = document.getElementById('dedText');
  const leftPanel = document.querySelector('.left');
  const userAvatarImg = document.getElementById('userAvatar');
  const uploadBtn = document.getElementById('uploadBtn');
  const uploadInput = document.getElementById('uploadInput');
  const daysEl = document.getElementById('daysTogether');
  const cdEl = document.getElementById('cd');

  // Relationship start date (can be changed via UI). We'll try to load saved value from localStorage.
  let relationshipStart = null;

  // compute default as the most recent Dec 4 (this year if already passed, otherwise last year)
  function defaultDec4() {
    const now = new Date();
    let y = now.getFullYear();
    const dec4ThisYear = new Date(y, 11, 4, 0, 0, 0);
    if (dec4ThisYear <= now) return dec4ThisYear;
    return new Date(y - 1, 11, 4, 0, 0, 0);
  }

  // load saved start date if available
  (function loadStart() {
    try {
      const saved = localStorage.getItem('relationshipStartIso');
      if (saved) {
        const d = new Date(saved);
        if (!isNaN(d)) { relationshipStart = d; }
      }
    } catch (e) {}
    if (!relationshipStart) relationshipStart = defaultDec4();
  })();

  // Compute and update days together
  function updateDays() {
    const now = new Date();
    const diff = now - relationshipStart;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    daysEl.textContent = days;
  }

  // Compute countdown to next anniversary of the start date month/day
  function updateCountdown() {
    // Show time elapsed since the most recent anniversary (e.g. 27 days and X hours)
    const now = new Date();
    const month = relationshipStart.getMonth();
    const day = relationshipStart.getDate();
    // find the most recent occurrence of month/day that is <= now
    let last = new Date(now.getFullYear(), month, day, 0, 0, 0);
    if (last > now) last = new Date(now.getFullYear() - 1, month, day, 0, 0, 0);
    const diff = now - last;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const dayLabel = days === 1 ? 'día' : 'días';
    const hourLabel = hours === 1 ? 'hora' : 'horas';
    cdEl.textContent = `${days} ${dayLabel} y ${hours} ${hourLabel}`;
  }

  // Typewriter effect for dedication paragraph
  function typeWriter(element, text, delay = 20) {
    element.textContent = '';
    element.classList.add('typewriter');
    let i = 0;
    return new Promise((resolve) => {
      const t = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) { clearInterval(t); element.classList.remove('typewriter'); resolve(); }
      }, delay);
    });
  }

  // Image upload handling: read file as DataURL and persist to localStorage
  function loadSavedAvatar() {
    try {
      const data = localStorage.getItem('userAvatarData');
      if (data && userAvatarImg) {
        userAvatarImg.src = data;
        userAvatarImg.style.display = '';
      }
    } catch (e) {
      // ignore
    }
  }

  if (uploadBtn && uploadInput && userAvatarImg) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        const dataUrl = ev.target.result;
        userAvatarImg.src = dataUrl;
        userAvatarImg.style.display = '';
        try { localStorage.setItem('userAvatarData', dataUrl); } catch (err) {}
      };
      reader.readAsDataURL(file);
    });
  }

  // load saved avatar (if any)
  loadSavedAvatar();

  // Sequence: grow trunk -> pop hearts -> typewriter -> enable counters
  async function playSequence() {
    // trunk
    trunk.classList.add('trunk-grow');
    await new Promise(r => setTimeout(r, 750));

    // hearts pop in sequence
    for (let i = 0; i < hearts.length; i++) {
      const p = hearts[i];
      p.classList.add('heart-pop');
      await new Promise(r => setTimeout(r, 220));
    }

    // reveal dedication text: show left panel then type
    if (leftPanel) {
      await new Promise(r => setTimeout(r, 250));
      leftPanel.classList.remove('hidden');
      leftPanel.classList.add('visible');
      await new Promise(r => setTimeout(r, 300));
    }
    const fullText = dedEl.getAttribute('data-full') || dedEl.textContent;
    await typeWriter(dedEl, fullText, 25);
  }

  // Prepare: store full text and clear
  (function prep() {
    const txt = dedEl.textContent.trim();
    dedEl.setAttribute('data-full', txt);
    dedEl.textContent = '';
    if (leftPanel) leftPanel.classList.add('hidden');
  })();

  // Start animations and counters
  playSequence();
  updateDays();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  setInterval(updateDays, 1000 * 60 * 60 * 6);

  // No date input UI — relationshipStart is loaded from storage or defaults to Dec 4 most recent
});
