document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. CURSOR GLOW TRACKER (desktop only)
  // ==========================================================================
  const glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
    // Smooth follow with lerp
    (function moveGlow() {
      cx += (gx - cx) * 0.08;
      cy += (gy - cy) * 0.08;
      glow.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(moveGlow);
    })();
  }

  // ==========================================================================
  // 2. PARTICLE CANVAS
  // ==========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const MAX = Math.min(70, Math.floor(window.innerWidth / 20));
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const mouse = { x: null, y: null, r: 140 };

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    class P {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - .5) * .6;
        this.vy = (Math.random() - .5) * .6;
        this.s = Math.random() * 1.8 + .8;
      }
      draw() {
        const dark = (document.body.getAttribute('data-theme') || 'dark') === 'dark';
        ctx.fillStyle = dark ? 'rgba(0,242,254,.35)' : 'rgba(37,99,235,.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
        if (mouse.x != null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < mouse.r) {
            const f = (mouse.r - d) / mouse.r;
            this.x += (dx / d) * f * 1.5;
            this.y += (dy / d) * f * 1.5;
          }
        }
      }
    }

    function init() { particles = []; for (let i = 0; i < MAX; i++) particles.push(new P()); }
    function connect() {
      const dark = (document.body.getAttribute('data-theme') || 'dark') === 'dark';
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const d = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (d < 110) {
            const alpha = (1 - d / 110) * .12;
            ctx.strokeStyle = dark ? `rgba(219,0,255,${alpha})` : `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = .8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      requestAnimationFrame(animate);
    }
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; init(); });
    init(); animate();
  }

  // ==========================================================================
  // 3. TYPING EFFECT
  // ==========================================================================
  const typed = document.getElementById('typed-text');
  const phrases = [
    "Python Backend Engineer",
    "Django & DRF Expert",
    "AI-Enabled SaaS Builder",
    "Celery + Redis Specialist",
    "Production Systems Architect"
  ];
  let pi = 0, ci = 0;
  function typeChar() {
    if (ci < phrases[pi].length) { typed.textContent += phrases[pi][ci++]; setTimeout(typeChar, 75); }
    else setTimeout(eraseChar, 2200);
  }
  function eraseChar() {
    if (ci > 0) { typed.textContent = phrases[pi].substring(0, --ci); setTimeout(eraseChar, 35); }
    else { pi = (pi + 1) % phrases.length; setTimeout(typeChar, 400); }
  }
  if (typed) setTimeout(typeChar, 800);

  // ==========================================================================
  // 4. COUNTER ANIMATION
  // ==========================================================================
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = () => {
          current++;
          el.textContent = current;
          if (current < target) requestAnimationFrame(step);
        };
        step();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ==========================================================================
  // 5. THEME TOGGLE
  // ==========================================================================
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  body.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
  themeBtn.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ==========================================================================
  // 6. SKILL TABS
  // ==========================================================================
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.skills-content').forEach(c => {
        c.classList.toggle('active', c.id === btn.dataset.tab);
      });
    });
  });

  // ==========================================================================
  // 7. TIMELINE ACCORDION
  // ==========================================================================
  document.querySelectorAll('.timeline-content').forEach((tc, i) => {
    if (i === 0) tc.classList.add('expanded');
    tc.addEventListener('click', () => tc.classList.toggle('expanded'));
  });

  // ==========================================================================
  // 8. SCROLL REVEAL
  // ==========================================================================
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('active-reveal'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

  // ==========================================================================
  // 9. 3D TILT ON CARDS (desktop)
  // ==========================================================================
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.cyber-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((r.height / 2 - (e.clientY - r.top)) / r.height) * 8;
        const ry = (((e.clientX - r.left) - r.width / 2) / r.width) * 8;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  // ==========================================================================
  // 10. NAV ACTIVE ON SCROLL
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) cur = s.id; });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href').slice(1) === cur);
    });
  });

  // ==========================================================================
  // 11. MOBILE MENU
  // ==========================================================================
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuBtn.addEventListener('click', () => {
    const open = navMenu.style.display === 'flex';
    navMenu.style.display = open ? 'none' : 'flex';
    if (!open) {
      Object.assign(navMenu.style, {
        flexDirection:'column', position:'absolute', top:'80px', left:'0',
        width:'100%', background:'var(--bg-1)', borderBottom:'1px solid var(--border)',
        padding:'2rem 0', gap:'1.5rem', zIndex:'100'
      });
    }
  });
  navLinks.forEach(l => l.addEventListener('click', () => { if (innerWidth <= 768) navMenu.style.display = 'none'; }));
  window.addEventListener('resize', () => {
    if (innerWidth > 768) Object.assign(navMenu.style, { display:'flex', flexDirection:'row', position:'static', padding:'0', gap:'2.5rem' });
    else navMenu.style.display = 'none';
  });

  // ==========================================================================
  // 12. CONTACT FORM
  // ==========================================================================
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('success-msg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit-btn');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        msg.style.display = 'block';
        form.reset();
        setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; msg.style.display = 'none'; }, 5000);
      }, 1500);
    });
  }
});
