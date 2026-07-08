document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. TYPING EFFECT
  // ==========================================
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    "Python Backend Engineer",
    "Django & DRF Developer",
    "Enterprise SaaS Architect",
    "Celery & Redis Async Specialist"
  ];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000;
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
      setTimeout(type, typingSpeed + 500);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, newTextDelay);
  }

  // ==========================================
  // 2. THEME TOGGLER (DARK / LIGHT)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // 3. SKILLS TABS SELECTION
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.skills-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      // Update active content
      tabContents.forEach(content => {
        if (content.getAttribute('id') === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ==========================================
  // 4. MOBILE NAVIGATION MENU TOGGLE
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    // Style toggle helper for mobile
    if (navMenu.style.display === 'flex') {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = 'var(--bg-secondary)';
      navMenu.style.borderBottom = '1px solid var(--border-color)';
      navMenu.style.padding = '1.5rem 0';
      navMenu.style.gap = '1.5rem';
      navMenu.style.zIndex = '100';
    }
  });

  // Close mobile menu on nav link clicks
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
      }
    });
  });

  // Reset menu display style on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'row';
      navMenu.style.position = 'static';
      navMenu.style.padding = '0';
      navMenu.style.gap = '2.5rem';
    } else {
      navMenu.style.display = 'none';
    }
  });

  // ==========================================
  // 5. ACTIVE LINK HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
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

  // ==========================================
  // 6. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission sending
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        successMsg.style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          successMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
