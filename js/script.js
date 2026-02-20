document.addEventListener('DOMContentLoaded', function() {
    const desc = document.getElementById('desc');
    const bar = document.getElementById('bar');
    const track = document.getElementById('track');

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

    updateScroll();
    desc.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
});
