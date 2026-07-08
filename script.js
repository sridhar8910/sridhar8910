document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. DYNAMIC CURSOR GLOW TRACKER
  // ==========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      // Hardware-accelerated movement via translate3d
      cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
  }

  // ==========================================================================
  // 2. HTML5 CANVAS PARTICLE NETWORK
  // ==========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 80;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
      }

      draw() {
        const theme = document.body.getAttribute('data-theme') || 'dark';
        ctx.fillStyle = theme === 'dark' ? 'rgba(0, 242, 254, 0.4)' : 'rgba(37, 99, 235, 0.25)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (repelling force)
        if (mouse.x != null && mouse.y != null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2;
            this.y += Math.sin(angle) * force * 2;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function connect() {
      const theme = document.body.getAttribute('data-theme') || 'dark';
      const maxDistance = 120;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(219, 0, 255, ${alpha})` 
              : `rgba(121, 40, 202, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      connect();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }

  // ==========================================================================
  // 3. 3D TILT EFFECT FOR PROJECTS & SNAPS
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.cyber-card');

  if (tiltCards.length > 0 && window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Dynamic angle calculations
        const rotateX = ((centerY - y) / centerY) * 10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ==========================================================================
  // 4. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          // Unobserve after showing
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px"
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

  // ==========================================================================
  // 5. HERO TYPING SUBTITLE EFFECT
  // ==========================================================================
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    "Python Backend Engineer",
    "Django & DRF Developer",
    "Enterprise SaaS Architect",
    "Celery & Redis Async Specialist"
  ];
  const typingSpeed = 80;
  const erasingSpeed = 40;
  const newTextDelay = 2200;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 300);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  // ==========================================================================
  // 6. THEME TOGGLER (DARK / LIGHT)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================================================
  // 7. SKILLS CATEGORY FILTER
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.skills-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.getAttribute('id') === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================================
  // 8. TIMELINE ACCORDION EXPANSION
  // ==========================================================================
  const timelineContents = document.querySelectorAll('.timeline-content');

  timelineContents.forEach(content => {
    // Open the first item by default
    if (content.closest('.timeline-item') === document.querySelector('.timeline-item')) {
      content.classList.add('expanded');
    }

    content.addEventListener('click', () => {
      content.classList.toggle('expanded');
    });
  });

  // ==========================================================================
  // 9. MOBILE MENU SLIDEOUT TOGGLE
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    if (navMenu.style.display === 'flex') {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '90px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = 'var(--bg-surface)';
      navMenu.style.borderBottom = '1px solid var(--border-color)';
      navMenu.style.padding = '2rem 0';
      navMenu.style.gap = '2rem';
      navMenu.style.zIndex = '100';
    }
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'row';
      navMenu.style.position = 'static';
      navMenu.style.padding = '0';
      navMenu.style.gap = '3rem';
    } else {
      navMenu.style.display = 'none';
    }
  });

  // ==========================================================================
  // 10. SCROLL TRACKING FOR NAV FOCUS
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 150)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 11. CONTACT FORM VALIDATIONS & SEND INTERACTION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING...';

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> TRANSMISSION RECEIVED';
        successMsg.style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          successMsg.style.display = 'none';
        }, 6000);
      }, 1800);
    });
  }
});
