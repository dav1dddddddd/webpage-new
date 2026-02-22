document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

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
        },
        {
            id: 'mono',
            label: 'Mono',
            light: {
              bg: '#f5f5f5',
              text: '#1a1a1a',
              mutedText: 'rgba(26, 26, 26, 0.65)',
              accent: '#6e6e6e',
              toggleBg: '#1a1a1a',
              toggleFg: '#f5f5f5',
              border: '#1a1a1a',
              shadow: 'rgba(0, 0, 0, 0.15)'
            },
            dark: {
              bg: '#121212',
              text: '#eaeaea',
              mutedText: 'rgba(234, 234, 234, 0.70)',
              accent: '#9a9a9a',
              toggleBg: '#eaeaea',
              toggleFg: '#121212',
              border: '#dcdcdc',
              shadow: 'rgba(255, 255, 255, 0.08)'
            }
          },
          {
            id: 'yellow',
            label: 'Yellow',
            light: {
              bg: '#fff8dc',                 
              text: '#7a5c00',              
              mutedText: 'rgba(122, 92, 0, 0.65)',
              accent: '#f4b400',             
              toggleBg: '#7a5c00',
              toggleFg: '#fff8dc',
              border: '#e6c65c',
              shadow: 'rgba(244, 180, 0, 0.25)'
            },
            dark: {
              bg: '#2b2400',                
              text: '#ffe48a',               
              mutedText: 'rgba(255, 228, 138, 0.75)',
              accent: '#ffd54f',
              toggleBg: '#ffe48a',
              toggleFg: '#2b2400',
              border: '#ffdf70',
              shadow: 'rgba(255, 213, 79, 0.18)'
            }
          },
          {
            id: 'pink',
            label: 'Pink',
            light: {
              bg: '#ffeef5',                
              text: '#7a2e4f',               
              mutedText: 'rgba(122, 46, 79, 0.65)',
              accent: '#e75480',             
              toggleBg: '#7a2e4f',
              toggleFg: '#ffeef5',
              border: '#f3a8c2',
              shadow: 'rgba(231, 84, 128, 0.22)'
            },
            dark: {
              bg: '#2a0f1c',                  
              text: '#ffc7de',                
              mutedText: 'rgba(255, 199, 222, 0.75)',
              accent: '#ff6fa8',
              toggleBg: '#ffc7de',
              toggleFg: '#2a0f1c',
              border: '#ff9fc7',
              shadow: 'rgba(255, 111, 168, 0.18)'
            }
          },
          {
            id: 'petrol',
            label: 'Petrol',
            light: {
              bg: '#e6f4f4',               
              text: '#0f3d3e',               
              mutedText: 'rgba(15, 61, 62, 0.65)',
              accent: '#008b8b',             
              toggleBg: '#0f3d3e',
              toggleFg: '#e6f4f4',
              border: '#7fbcbc',
              shadow: 'rgba(0, 139, 139, 0.25)'
            },
            dark: {
              bg: '#081f1f',                
              text: '#b9f3f3',                
              mutedText: 'rgba(185, 243, 243, 0.75)',
              accent: '#00c2c2',
              toggleBg: '#b9f3f3',
              toggleFg: '#081f1f',
              border: '#4fd1d1',
              shadow: 'rgba(0, 194, 194, 0.18)'
            }
          }
    ];

    function initReveal() {
        const revealEls = document.querySelectorAll('.reveal');

        document.querySelectorAll('.reveal-stagger').forEach(group => {
            group.querySelectorAll('.reveal').forEach((el, idx) => {
                el.style.setProperty('--i', idx);
            });
        });

        if (revealEls.length === 0) return;

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
            btn.style.background = p.light.bg;

            btn.addEventListener('click', function() {
                safeSetLocalStorage('palette', p.id);
                renderSwatches();
                applyThemeVars();
            });

            paletteSwatches.appendChild(btn);
        });
    }

    initReveal();
    renderSwatches();
    initTheme();
    applyThemeVars();

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-theme');
            setTheme(!isDark);
        });
    }

    if (paletteToggle && palettePanel) {
        paletteToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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