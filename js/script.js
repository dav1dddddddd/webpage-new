document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const desc = document.getElementById('desc');
    const bar = document.getElementById('bar');
    const track = document.getElementById('track');

    const paletteToggle = document.getElementById('paletteToggle');
    const palettePanel = document.getElementById('palettePanel');
    const paletteClose = document.getElementById('paletteClose');
    const paletteSwatches = document.getElementById('paletteSwatches');

    const palettes = [
        {
            id: 'green',
            label: 'Green',
            light: {
                bg: '#c8e6c9',
                text: '#1b5e20',
                mutedText: 'rgba(27, 94, 32, 0.75)',
                accent: '#44c24c',
                toggleBg: '#1b5e20',
                toggleFg: '#c8e6c9',
                border: '#1b5e20',
                shadow: 'rgba(27, 94, 32, 0.35)'
            },
            dark: {
                bg: '#132a13',
                text: '#c5e1c5',
                mutedText: 'rgba(197, 225, 197, 0.78)',
                accent: '#44c24c',
                toggleBg: '#5a9f5a',
                toggleFg: '#132a13',
                border: '#a8d8a8',
                shadow: 'rgba(197, 225, 197, 0.25)'
            }
        },
        {
            id: 'ocean',
            label: 'Ocean',
            light: {
                bg: '#d8f3ff',
                text: '#0a3d62',
                mutedText: 'rgba(10, 61, 98, 0.72)',
                accent: '#2e86de',
                toggleBg: '#0a3d62',
                toggleFg: '#d8f3ff',
                border: '#0a3d62',
                shadow: 'rgba(10, 61, 98, 0.30)'
            },
            dark: {
                bg: '#071e2f',
                text: '#d6ecff',
                mutedText: 'rgba(214, 236, 255, 0.78)',
                accent: '#5dade2',
                toggleBg: '#5dade2',
                toggleFg: '#071e2f',
                border: '#a9d6ff',
                shadow: 'rgba(214, 236, 255, 0.22)'
            }
        },
        {
            id: 'grape',
            label: 'Grape',
            light: {
                bg: '#f3e8ff',
                text: '#4a148c',
                mutedText: 'rgba(74, 20, 140, 0.70)',
                accent: '#8e24aa',
                toggleBg: '#4a148c',
                toggleFg: '#f3e8ff',
                border: '#4a148c',
                shadow: 'rgba(74, 20, 140, 0.28)'
            },
            dark: {
                bg: '#1b0b2e',
                text: '#f1d9ff',
                mutedText: 'rgba(241, 217, 255, 0.78)',
                accent: '#ce93d8',
                toggleBg: '#ce93d8',
                toggleFg: '#1b0b2e',
                border: '#e1b7ff',
                shadow: 'rgba(241, 217, 255, 0.20)'
            }
        },
        {
            id: 'sunset',
            label: 'Sunset',
            light: {
                bg: '#fff0e5',
                text: '#7a2e2e',
                mutedText: 'rgba(122, 46, 46, 0.72)',
                accent: '#ff6b35',
                toggleBg: '#7a2e2e',
                toggleFg: '#fff0e5',
                border: '#7a2e2e',
                shadow: 'rgba(122, 46, 46, 0.26)'
            },
            dark: {
                bg: '#2a0f13',
                text: '#ffe2d6',
                mutedText: 'rgba(255, 226, 214, 0.78)',
                accent: '#ff9f80',
                toggleBg: '#ff9f80',
                toggleFg: '#2a0f13',
                border: '#ffd0bd',
                shadow: 'rgba(255, 226, 214, 0.18)'
            }
        }
    ];

    function updateScroll() {
        if (!desc || !bar || !track) return;
      
        const maxScroll = desc.scrollHeight - desc.clientHeight;
      
        if (maxScroll <= 0) {
          bar.style.height = '100%';
          bar.style.transform = 'translateY(0px)';
          return;
        }

        const trackHeight = track.getBoundingClientRect().height;
      
        const barRatio = desc.clientHeight / desc.scrollHeight;
        const barHeight = Math.max(trackHeight * barRatio, 24);
        bar.style.height = `${barHeight}px`;
      
        const travel = trackHeight - barHeight;
        const y = (desc.scrollTop / maxScroll) * travel;
        bar.style.transform = `translateY(${y}px)`;
      }

    function initReveal() {
        const revealEls = document.querySelectorAll('.reveal');
  
        document.querySelectorAll('.reveal-stagger').forEach(group => {
            group.querySelectorAll('.reveal').forEach((el, idx) => {
                el.style.setProperty('--i', idx);
            });
        });
  
        if (!('IntersectionObserver' in window)) {
            revealEls.forEach(el => el.classList.add('is-visible'));
            return;
        }
  
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  
        revealEls.forEach(el => io.observe(el));
    }

    function safeSetLocalStorage(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
    }

    function safeGetLocalStorage(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function getActivePaletteId() {
        return safeGetLocalStorage('palette') || 'green';
    }

    function setActivePaletteId(id) {
        safeSetLocalStorage('palette', id);
        renderSwatches();
        applyThemeVars();
    }

    function getPaletteById(id) {
        return palettes.find(p => p.id === id) || palettes[0];
    }

    function applyVars(vars) {
        const root = document.documentElement;
        root.style.setProperty('--bg', vars.bg);
        root.style.setProperty('--text', vars.text);
        root.style.setProperty('--muted-text', vars.mutedText);
        root.style.setProperty('--accent', vars.accent);
        root.style.setProperty('--toggle-bg', vars.toggleBg);
        root.style.setProperty('--toggle-fg', vars.toggleFg);
        root.style.setProperty('--border', vars.border);
        root.style.setProperty('--shadow', vars.shadow);
    }

    function applyThemeVars() {
        const isDark = body.classList.contains('dark-theme');
        const palette = getPaletteById(getActivePaletteId());
        applyVars(isDark ? palette.dark : palette.light);
    }

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            body.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
        safeSetLocalStorage('theme', isDark ? 'dark' : 'light');
        applyThemeVars();
    }

    function initTheme() {
        const saved = safeGetLocalStorage('theme');
        if (saved === 'dark') setTheme(true);
        else setTheme(false);
    }

    function openPalettePanel(open) {
        if (!palettePanel) return;
        if (open) palettePanel.classList.add('open');
        else palettePanel.classList.remove('open');
    }

    function renderSwatches() {
        if (!paletteSwatches) return;
        const activeId = getActivePaletteId();
        paletteSwatches.innerHTML = '';

        palettes.forEach(p => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'palette-swatch' + (p.id === activeId ? ' active' : '');
            btn.title = p.label;
            btn.setAttribute('aria-label', p.label);

            // Show the light background color as the preview
            btn.style.background = p.light.bg;

            btn.addEventListener('click', function() {
                setActivePaletteId(p.id);
            });

            paletteSwatches.appendChild(btn);
        });
    }

    initReveal();
    updateScroll();
    desc.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    renderSwatches();
    initTheme();
    applyThemeVars();

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-theme');
            setTheme(!isDark);
        });
    }

    if (paletteToggle) {
        paletteToggle.addEventListener('click', function() {
            openPalettePanel(!palettePanel.classList.contains('open'));
        });
    }
    if (paletteClose) {
        paletteClose.addEventListener('click', function() {
            openPalettePanel(false);
        });
    }

    document.addEventListener('click', function(e) {
        if (!palettePanel || !paletteToggle) return;
        const clickedInside = palettePanel.contains(e.target) || paletteToggle.contains(e.target);
        if (!clickedInside) openPalettePanel(false);
    });
});
