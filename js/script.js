document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {}
    }

    function initTheme() {
        try {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark') setTheme(true);
            else setTheme(false);
        } catch (e) {
            setTheme(false);
        }
    }

    initTheme();

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-theme');
            setTheme(!isDark);
        });
    }
});
