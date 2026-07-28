document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. CURSOR GLOW TRACKER (desktop only)
  // ==========================================================================
  const glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
    (function moveGlow() {
      cx += (gx - cx) * 0.08;
      cy += (gy - cy) * 0.08;
      glow.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(moveGlow);
    })();
  }

  // ==========================================================================
  // 2. PARTICLE CANVAS NETWORK
  // ==========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const MAX = Math.min(75, Math.floor(window.innerWidth / 18));
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
  // 3. TYPEWRITER EFFECT
  // ==========================================================================
  const typed = document.getElementById('typed-text');
  const phrases = [
    "AI & RAG Pipeline Engineer (ChromaDB)",
    "Python, Django & FastAPI Backend Specialist",
    "50+ Production REST APIs & WebSockets",
    "Full-Stack Web Developer (React + Tailwind)",
    "Cloud & Container DevOps (Docker + Azure VM)"
  ];
  let pi = 0, ci = 0;
  function typeChar() {
    if (ci < phrases[pi].length) { typed.textContent += phrases[pi][ci++]; setTimeout(typeChar, 70); }
    else setTimeout(eraseChar, 2200);
  }
  function eraseChar() {
    if (ci > 0) { typed.textContent = phrases[pi].substring(0, --ci); setTimeout(eraseChar, 30); }
    else { pi = (pi + 1) % phrases.length; setTimeout(typeChar, 400); }
  }
  if (typed) setTimeout(typeChar, 600);

  // ==========================================================================
  // 4. ARCHITECTURE VISUALIZER INSPECTOR DATA
  // ==========================================================================
  const archData = {
    client: {
      tag: "Frontend Tier",
      title: "React.js & Flutter Real-Time Integration",
      desc: "Responsive full-stack user interfaces engineered with React.js, TailwindCSS, and Flutter. Configured with WebSocket event listeners (Django Channels) for real-time chat, live tracking, and recruiter dashboards.",
      filename: "web_socket_client.js",
      code: `// Real-time WebSocket listener connecting React frontend to Django Channels
const ws = new WebSocket('wss://api.neevpath.com/ws/live-tracking/');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateDashboardState({
    studentId: data.student_id,
    liveStatus: data.status,
    timestamp: new Date(data.timestamp)
  });
};`,
      metrics: [
        { label: "Response Latency", val: "< 45ms" },
        { label: "Real-time Layer", val: "WebSockets / WSS" },
        { label: "UI Framework", val: "React + TailwindCSS" }
      ]
    },
    gateway: {
      tag: "API Gateway",
      title: "Django REST Framework & FastAPI Architecture",
      desc: "High-throughput API Gateway servicing 50+ REST endpoints. Uses django-ninja-extra with Pydantic validation schemas, JWT & OAuth2 token validation, and granular Role-Based Access Control (RBAC).",
      filename: "api_views.py",
      code: `from ninja_extra import NinjaExtraAPI, api_controller, http_post
from pydantic import BaseModel

class DoubtQuerySchema(BaseModel):
    student_id: int
    subject: str
    query_text: str

@api_controller('/v1/ai', tags=['AI Doubts'])
class AIDoubtController:
    @http_post('/clarify', response={200: dict})
    def clarify_doubt(self, request, payload: DoubtQuerySchema):
        # Trigger RAG pipeline asynchronously
        task = process_rag_query.delay(payload.model_dump())
        return 200, {"status": "queued", "task_id": task.id}`,
      metrics: [
        { label: "APIs Delivered", val: "50+ Endpoints" },
        { label: "Validation", val: "Pydantic Schemas" },
        { label: "Authentication", val: "JWT & OAuth2" }
      ]
    },
    async: {
      tag: "Async Tasks",
      title: "Celery Workers & Redis Channel Layer",
      desc: "Asynchronous task queue powering non-blocking API operations: automated resume screening, email notifications, ATS scoring batch runs, and real-time WebSocket event distribution.",
      filename: "tasks.py",
      code: `from celery import shared_task
from .rag_engine import QueryRAGEngine

@shared_task(bind=True, max_retries=3)
def process_rag_query(self, query_data):
    try:
        rag = QueryRAGEngine(collection_name="school_curriculum")
        result = rag.retrieve_and_generate(query_data['query_text'])
        return {"status": "success", "response": result['llm_output']}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)`,
      metrics: [
        { label: "Task Queue", val: "Celery Distributed" },
        { label: "Broker / Cache", val: "Redis Enterprise" },
        { label: "Throughput", val: "10,000+ jobs/day" }
      ]
    },
    rag: {
      tag: "Vector AI Engine",
      title: "ChromaDB Vector Search & RAG Pipeline",
      desc: "Retrieval-Augmented Generation pipeline using ChromaDB vector database. Converts text into vector embeddings, performs cosine similarity searches, and constructs augmented LLM context prompts.",
      filename: "rag_engine.py",
      code: `import chromadb
from sentence_transformers import SentenceTransformer

class RAGPipeline:
    def __init__(self, collection_name="neevpath_docs"):
        self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.chroma_client.get_or_create_collection(collection_name)
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def query(self, user_prompt, n_results=3):
        query_vec = self.model.encode(user_prompt).tolist()
        results = self.collection.query(query_embeddings=[query_vec], n_results=n_results)
        context = "\\n".join(results['documents'][0])
        return f"Context:\\n{context}\\n\\nQuestion: {user_prompt}"`,
      metrics: [
        { label: "Vector DB", val: "ChromaDB Engine" },
        { label: "Embeddings", val: "SentenceTransformers" },
        { label: "Accuracy", val: "High Domain Grounding" }
      ]
    },
    cloud: {
      tag: "DevOps & Cloud",
      title: "Docker Containerization & Azure VM Deployment",
      desc: "Multi-container Docker Compose deployment hosting Django WSGI/ASGI servers, Celery workers, Redis, and PostgreSQL on Azure Virtual Machines with GitHub Actions CI/CD pipelines.",
      filename: "docker-compose.yml",
      code: `version: '3.8'
services:
  web:
    build: .
    command: gunicorn neevpath.wsgi:application --bind 0.0.0.0:8000
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/neevpath
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
  celery:
    build: .
    command: celery -A neevpath worker -l info`,
      metrics: [
        { label: "Cloud Provider", val: "Microsoft Azure VM" },
        { label: "Containers", val: "Docker & Compose" },
        { label: "Database", val: "PostgreSQL 15" }
      ]
    }
  };

  const archNodes = document.querySelectorAll('.arch-node');
  archNodes.forEach(node => {
    node.addEventListener('click', () => {
      archNodes.forEach(n => n.classList.remove('active-node'));
      node.classList.add('active-node');
      const key = node.dataset.node;
      const d = archData[key];
      if (d) {
        document.getElementById('inspect-tag').textContent = d.tag;
        document.getElementById('inspect-title').textContent = d.title;
        document.getElementById('inspect-desc').textContent = d.desc;
        document.getElementById('inspect-filename').textContent = d.filename;
        document.getElementById('inspect-code').textContent = d.code;

        const metricsEl = document.getElementById('inspect-metrics');
        metricsEl.innerHTML = d.metrics.map(m => `
          <div class="metric-box">
            <span>${m.label}</span>
            <strong>${m.val}</strong>
          </div>
        `).join('');
      }
    });
  });

  // ==========================================================================
  // 5. RAG SIMULATOR LOGIC
  // ==========================================================================
  const ragSimData = {
    ats: {
      step1: "Generating SentenceTransformer embeddings for resume parameters & job description...",
      step2: "ChromaDB similarity search in vector collection 'hr_jd_embeddings' (n_results=3)...",
      step3: "Retrieved Context: Distance=0.124 | Matches: 'Python 3.x', 'Django REST', 'Celery Redis', 'Docker Azure'",
      step4: "LLM Output: Candidate fit score calculated at 94.5%. Strengths: Backend API design, RAG experience, Azure VM deployment."
    },
    rag: {
      step1: "Encoding student query into 384-dimensional vector space...",
      step2: "Querying ChromaDB collection 'neevpath_curriculum' (Cosine distance metric)...",
      step3: "Augmenting prompt with 3 retrieved textbook chunks (Physics - Optics & Light Wave dynamics)...",
      step4: "LLM Output: 'Snell's Law defines the ratio of the sines of the angles of incidence and refraction... Here is a simplified diagram and practice quiz.'"
    },
    websockets: {
      step1: "Client establishes WSS handshake connection to Django Channels ASGI gateway...",
      step2: "Subscribing connection to Redis Channel Layer channel 'group_live_monitoring'...",
      step3: "Broadcasting event payload across active WebSocket subscriber sockets...",
      step4: "System Status: Real-time latency < 35ms. Live streaming tracking updates active."
    },
    auth: {
      step1: "Validating user credentials against PostgreSQL encrypted auth table...",
      step2: "Generating JWT Access Token (15-min expiry) & Refresh Token (7-day expiry)...",
      step3: "Encoding Role-Based Access Control claims: role='ADMIN', permissions=['read_analytics', 'manage_users']...",
      step4: "Security Header Set: Authorization: Bearer eyJhbGciOiJIUzI1Ni... Session secured."
    }
  };

  const runRagBtn = document.getElementById('run-rag-btn');
  const querySelect = document.getElementById('rag-query-select');
  const consoleOutput = document.getElementById('sim-console-output');
  const timerEl = document.getElementById('sim-timer');

  if (runRagBtn && querySelect && consoleOutput) {
    runRagBtn.addEventListener('click', () => {
      const qKey = querySelect.value;
      const data = ragSimData[qKey];
      if (!data) return;

      runRagBtn.disabled = true;
      runRagBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Pipeline...';

      // Reset steps
      [1, 2, 3, 4].forEach(i => {
        const s = document.getElementById(`step-${i}`);
        s.className = 'sim-step';
      });

      consoleOutput.innerHTML = '<div style="color:var(--cyan)"><i class="fa-solid fa-gear fa-spin"></i> Initializing RAG Pipeline Execution...</div>';

      const startTime = performance.now();
      const timerInt = setInterval(() => {
        const elapsed = Math.round(performance.now() - startTime);
        if (timerEl) timerEl.textContent = `Elapsed: ${elapsed}ms`;
      }, 50);

      // Step 1
      setTimeout(() => {
        document.getElementById('step-1').className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:#a5b4fc">[STEP 1] ${data.step1}</div>`;
      }, 400);

      // Step 2
      setTimeout(() => {
        document.getElementById('step-1').className = 'sim-step step-complete';
        document.getElementById('step-2').className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--cyan)">[STEP 2] ${data.step2}</div>`;
      }, 1000);

      // Step 3
      setTimeout(() => {
        document.getElementById('step-2').className = 'sim-step step-complete';
        document.getElementById('step-3').className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--magenta)">[STEP 3] ${data.step3}</div>`;
      }, 1700);

      // Step 4
      setTimeout(() => {
        document.getElementById('step-3').className = 'sim-step step-complete';
        document.getElementById('step-4').className = 'sim-step step-complete';
        consoleOutput.innerHTML += `<div style="margin-top:.8rem;padding-top:.8rem;border-top:1px dashed var(--border);color:var(--emerald);font-weight:600">[STEP 4 - FINAL RESPONSE]<br>${data.step4}</div>`;
        clearInterval(timerInt);
        runRagBtn.disabled = false;
        runRagBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run RAG Pipeline';
      }, 2400);
    });
  }

  // ==========================================================================
  // 6. COUNTER ANIMATION
  // ==========================================================================
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = () => {
          current += Math.ceil(target / 30);
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = current;
            requestAnimationFrame(step);
          }
        };
        step();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ==========================================================================
  // 7. THEME TOGGLE
  // ==========================================================================
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  body.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ==========================================================================
  // 8. SKILL TABS SWITCHING
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
  // 9. TIMELINE ACCORDION
  // ==========================================================================
  document.querySelectorAll('.timeline-content').forEach((tc, i) => {
    if (i === 0) tc.classList.add('expanded');
    tc.addEventListener('click', () => tc.classList.toggle('expanded'));
  });

  // ==========================================================================
  // 10. SCROLL REVEAL
  // ==========================================================================
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('active-reveal'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

  // ==========================================================================
  // 11. 3D CARD TILT (desktop)
  // ==========================================================================
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.cyber-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((r.height / 2 - (e.clientY - r.top)) / r.height) * 6;
        const ry = (((e.clientX - r.left) - r.width / 2) / r.width) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  // ==========================================================================
  // 12. NAV ACTIVE HIGHLIGHT ON SCROLL
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
  // 13. MOBILE MENU TOGGLE
  // ==========================================================================
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const open = navMenu.style.display === 'flex';
      navMenu.style.display = open ? 'none' : 'flex';
      if (!open) {
        Object.assign(navMenu.style, {
          flexDirection:'column', position:'absolute', top:'72px', left:'0',
          width:'100%', background:'var(--bg-1)', borderBottom:'1px solid var(--border)',
          padding:'2rem 0', gap:'1.2rem', zIndex:'100'
        });
      }
    });
    navLinks.forEach(l => l.addEventListener('click', () => { if (innerWidth <= 768) navMenu.style.display = 'none'; }));
    window.addEventListener('resize', () => {
      if (innerWidth > 768) Object.assign(navMenu.style, { display:'flex', flexDirection:'row', position:'static', padding:'0', gap:'1.8rem' });
      else navMenu.style.display = 'none';
    });
  }

  // ==========================================================================
  // 14. CONTACT FORM SUBMISSION
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
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        msg.style.display = 'block';
        form.reset();
        setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; msg.style.display = 'none'; }, 5000);
      }, 1200);
    });
  }
});
