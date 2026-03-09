document.addEventListener('DOMContentLoaded', () => {

    // Reveal body when fonts are ready or after a small timeout
    const revealPage = () => document.body.classList.add('loaded');

    if (document.fonts) {
        document.fonts.ready.then(revealPage);
    } else {
        window.addEventListener('load', revealPage);
    }
    // Safety timeout (1 sec max wait)
    setTimeout(revealPage, 1000);

    // =====================
    // 1. ENVELOPE LOGIC
    // =====================
    const envelope = document.getElementById('main-envelope');
    const wrapper = document.getElementById('envelope-wrapper');

    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');

    let firstClick = true;

    envelope.addEventListener('click', () => {
        envelope.classList.add('clicked');

        // Play music on first click (browser requirement)
        if (firstClick) {
            audio.play().catch(e => console.log("Audio play failed, waiting for user interaction."));
            musicBtn.classList.add('visible', 'playing');
            firstClick = false;
        }

        setTimeout(() => {
            window.scrollTo(0, 0); // Asegurar que inicie desde arriba
            wrapper.classList.add('opened');
            // Kick-off reveal animations after heart box opens
            triggerVisibleReveals();
        }, 1300);
    });

    // Toggle Music Button
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // =====================
    // 2. COUNTDOWN
    // =====================
    const weddingDate = new Date('April 17, 2026 16:00:00').getTime();

    function pad(n) { return n < 10 ? '0' + n : n; }

    function updateCountdown() {
        const now = Date.now();
        const gap = Math.max(0, weddingDate - now);
        const d = Math.floor(gap / 86400000);
        const h = Math.floor((gap % 86400000) / 3600000);
        const m = Math.floor((gap % 3600000) / 60000);
        const s = Math.floor((gap % 60000) / 1000);

        document.getElementById('days').textContent = pad(d);
        document.getElementById('hours').textContent = pad(h);
        document.getElementById('minutes').textContent = pad(m);
        document.getElementById('seconds').textContent = pad(s);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =====================
    // 3. SCROLL REVEAL
    // =====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, { threshold: 0.12 });

    function triggerVisibleReveals() {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // If the envelope is already open on reload, reveal immediately
    if (wrapper.classList.contains('opened')) {
        triggerVisibleReveals();
    }
});
