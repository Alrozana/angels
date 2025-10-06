 (function(){
    const root = document.getElementById('final-cta');
    if(!root) return;

    // Reveal
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          root.classList.add('is-in');
          io.disconnect();
        }
      });
    }, { threshold: .25 });
    io.observe(root);

    // Parallax (image + tagline)
    const items = Array.from(root.querySelectorAll('[data-xcta-parallax]'));
    if(!items.length) return;

    let ticking = false;
    function setParallax(){
      ticking = false;
      const vh = window.innerHeight;
      items.forEach(el=>{
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
        const r = el.getBoundingClientRect();
        const p = ((r.top + r.height/2) - vh/2) / (vh/2);
        const y = -p * (speed * 70);
        el.style.transform = 'translateY(' + y + 'px)';
      });
    }
    function onScroll(){ if(!ticking){ requestAnimationFrame(setParallax); ticking = true; } }

    const io2 = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setParallax();
          window.addEventListener('scroll', onScroll, { passive:true });
          window.addEventListener('resize', onScroll);
        } else {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      });
    }, { threshold: .15 });

    io2.observe(root);
  })();