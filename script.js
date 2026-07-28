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
  // 4. MULTI-PLATFORM ARCHITECTURE SWITCHER & INSPECTOR DATA
  // ==========================================================================
  const platformsData = {
    neevpath: {
      nodes: [
        { id: "np_client", badge: "Frontend Tier", icon: "fa-brands fa-react", title: "React & Flutter App", sub: "WebSockets & UI", active: true },
        { id: "np_gateway", badge: "API Gateway", icon: "fa-solid fa-network-wired", title: "Django REST / FastAPI", sub: "Pydantic Schemas" },
        { id: "np_async", badge: "Async Engine", icon: "fa-solid fa-clock-rotate-left", title: "Celery & Redis", sub: "Background Queues" },
        { id: "np_rag", badge: "Vector AI", icon: "fa-solid fa-microchip", title: "ChromaDB RAG + LLM", sub: "Doubt Clarification" },
        { id: "np_cloud", badge: "DevOps & Cloud", icon: "fa-solid fa-cloud-arrow-up", title: "Docker on Azure VM", sub: "PostgreSQL & CI/CD" }
      ],
      details: {
        np_client: {
          tag: "NeevPath Frontend", title: "React.js & Flutter School ERP Portals",
          desc: "Multi-role student, parent, teacher, and admin web portals built with React.js and TailwindCSS. Communicates via WSS WebSockets for real-time attendance alerts and chat.",
          filename: "ws_neevpath_client.js",
          code: `const ws = new WebSocket('wss://api.neevpath.com/ws/live-school/');\nws.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  updateStudentAttendanceUI(data.student_id, data.status);\n};`,
          metrics: [{ label: "Portals", val: "5 User Roles" }, { label: "Protocol", val: "WSS WebSockets" }, { label: "Frontend", val: "React + Tailwind" }]
        },
        np_gateway: {
          tag: "NeevPath API Gateway", title: "Django REST & django-ninja-extra API Engine",
          desc: "API gateway exposing student assessments, fees, exams, and AI doubt resolution endpoints. Enforces JWT authentication and RBAC.",
          filename: "neevpath_api.py",
          code: `@api_controller('/v1/school', tags=['School ERP'])\nclass SchoolController:\n    @http_post('/doubts/ask', response={200: dict})\n    def ask_ai(self, request, payload: DoubtSchema):\n        task = run_rag_pipeline.delay(payload.query_text)\n        return 200, {"task_id": task.id}`,
          metrics: [{ label: "Endpoints", val: "30+ APIs" }, { label: "Security", val: "JWT & RBAC" }, { label: "Validation", val: "Pydantic" }]
        },
        np_async: {
          tag: "Async Queue", title: "Celery Worker & Redis Task Scheduling",
          desc: "Executes non-blocking tasks: fee due alerts, automated attendance processing, and background vector embedding generation.",
          filename: "tasks.py",
          code: `@shared_task\ndef run_rag_pipeline(query_text):\n    rag = RAGEngine(collection="school_docs")\n    return rag.query(query_text)`,
          metrics: [{ label: "Queue", val: "Celery Workers" }, { label: "Broker", val: "Redis DB 0" }, { label: "Retries", val: "Automatic (x3)" }]
        },
        np_rag: {
          tag: "Vector AI Engine", title: "ChromaDB RAG Pipeline for Doubt Resolution",
          desc: "Retrieval-Augmented Generation using ChromaDB vector database. Matches student questions against textbook embeddings for grounded AI explanations.",
          filename: "rag_engine.py",
          code: `import chromadb\nchroma = chromadb.PersistentClient(path="./chroma_school")\ncoll = chroma.get_collection("curriculum")\nres = coll.query(query_embeddings=[vec], n_results=3)`,
          metrics: [{ label: "Vector Store", val: "ChromaDB Persistent" }, { label: "Embeddings", val: "SentenceTransformer" }, { label: "Grounding", val: "98% Accuracy" }]
        },
        np_cloud: {
          tag: "Cloud Infrastructure", title: "Docker Containerization on Azure Virtual Machine",
          desc: "Dockerized production stack running Gunicorn, Celery, Redis, and PostgreSQL on Azure Virtual Machines with GitHub Actions CI/CD.",
          filename: "docker-compose.yml",
          code: `version: '3.8'\nservices:\n  web:\n    image: neevpath/backend:latest\n    environment: [AZURE_VM=true, POSTGRES_DB=neevpath]`,
          metrics: [{ label: "Host", val: "Azure VM" }, { label: "Containers", val: "Docker Compose" }, { label: "Database", val: "PostgreSQL 15" }]
        }
      }
    },
    verifihire: {
      nodes: [
        { id: "vh_recruiter", badge: "Recruiter UI", icon: "fa-solid fa-desktop", title: "React Recruiter Suite", sub: "Tailwind & Dashboards", active: true },
        { id: "vh_parser", badge: "NLP Engine", icon: "fa-solid fa-file-invoice", title: "Async Resume Parser", sub: "LLM PDF Extraction" },
        { id: "vh_ats", badge: "Scoring Engine", icon: "fa-solid fa-calculator", title: "ATS Match & Rank", sub: "Fit Vector Scoring" },
        { id: "vh_bot", badge: "AI Interviewer", icon: "fa-solid fa-robot", title: "LLM Live Interview", sub: "Dynamic Follow-ups" },
        { id: "vh_deploy", badge: "Cloud Microservices", icon: "fa-brands fa-docker", title: "Docker & Azure VM", sub: "Scalable Containers" }
      ],
      details: {
        vh_recruiter: {
          tag: "VerifiHire UI", title: "React & TailwindCSS Recruiter Dashboard",
          desc: "Recruiter interfaces for candidate pipeline tracking, bulk resume uploads, and live interview monitoring via WebSockets.",
          filename: "recruiter_dashboard.jsx",
          code: `export const Dashboard = () => {\n  const { candidateStream } = useWebSocket('wss://api.verifihire.ai/ws/interviews/');\n  return <CandidateGrid data={candidateStream} />;\n};`,
          metrics: [{ label: "Framework", val: "React.js" }, { label: "Styling", val: "TailwindCSS" }, { label: "Updates", val: "Real-time Stream" }]
        },
        vh_parser: {
          tag: "NLP Parser", title: "LLM-Powered Resume Information Extraction",
          desc: "Async Celery pipeline extracting technical skills, work history, education, and credentials from high-volume PDF resume uploads.",
          filename: "resume_parser.py",
          code: `def extract_resume_metadata(pdf_bytes):\n    text = extract_pdf_text(pdf_bytes)\n    prompt = f"Extract skills, experience from:\\n{text}"\n    return llm.generate_json(prompt)`,
          metrics: [{ label: "Async Queue", val: "Celery Uploads" }, { label: "Format", val: "PDF / DOCX" }, { label: "Parsing Latency", val: "< 1.2s" }]
        },
        vh_ats: {
          tag: "ATS Engine", title: "Vector ATS Fit Scoring & Ranking",
          desc: "Computes similarity score between candidate profiles and job requirements using ChromaDB vector embeddings.",
          filename: "ats_scorer.py",
          code: `def score_candidate(candidate_vec, job_spec_vec):\n    similarity = cosine_similarity(candidate_vec, job_spec_vec)\n    return round(similarity * 100, 2)`,
          metrics: [{ label: "Scoring", val: "Cosine Similarity" }, { label: "Ranking", val: "Automated Top N" }, { label: "Match Speed", val: "Instant" }]
        },
        vh_bot: {
          tag: "AI Interviewer", title: "LLM Automated Interview Conversations",
          desc: "Interactive conversational AI agent conducting technical interviews, asking dynamic follow-up questions, and generating summaries.",
          filename: "interview_bot.py",
          code: `class InterviewAgent:\n    def next_question(self, candidate_answer):\n        return llm.chat(system_prompt=INTERVIEWER_RULES, user_msg=candidate_answer)`,
          metrics: [{ label: "Agent", val: "LLM Conversational" }, { label: "Follow-ups", val: "Contextual" }, { label: "Output", val: "Summary Report" }]
        },
        vh_deploy: {
          tag: "Deploy", title: "Docker Microservices on Azure Infrastructure",
          desc: "Containerized deployment of recruitment backend, Celery workers, and Redis channels on Azure VM.",
          filename: "docker_deploy.sh",
          code: `docker compose -f docker-compose.prod.yml up -d --build`,
          metrics: [{ label: "Orchestration", val: "Docker Compose" }, { label: "Cloud", val: "Azure VMs" }, { label: "CI/CD", val: "GitHub Actions" }]
        }
      }
    },
    soulsupport: {
      nodes: [
        { id: "ss_client", badge: "Private App", icon: "fa-solid fa-mobile-screen", title: "Flutter & Mobile Client", sub: "Encrypted Messaging", active: true },
        { id: "ss_wss", badge: "Real-time Gateway", icon: "fa-solid fa-satellite-dish", title: "Django Channels WSS", sub: "Sub-40ms Delivery" },
        { id: "ss_auth", badge: "Security", icon: "fa-solid fa-key", title: "JWT & RBAC Controller", sub: "Multi-Role Guard" },
        { id: "ss_db", badge: "Database", icon: "fa-solid fa-leaf", title: "PostgreSQL Database", sub: "Query Tuning & Indexing" },
        { id: "ss_moderation", badge: "Support Admin", icon: "fa-solid fa-user-shield", title: "Moderation & Analytics", sub: "Admin Diagnostics" }
      ],
      details: {
        ss_client: {
          tag: "SoulSupport Client", title: "Secure Flutter Cross-Platform Mobile Client",
          desc: "Flutter mobile application communicating with Django REST & Channels for private, encrypted support sessions.",
          filename: "support_session.dart",
          code: `final channel = WebSocketChannel.connect(Uri.parse('wss://api.soulsupport.org/ws/chat/'));\nchannel.stream.listen((message) => handleIncomingChat(message));`,
          metrics: [{ label: "Client", val: "Flutter Mobile" }, { label: "Security", val: "Encrypted Channels" }, { label: "Latency", val: "< 40ms" }]
        },
        ss_wss: {
          tag: "WSS Engine", title: "Django Channels & Redis Real-Time Socket Layer",
          desc: "Asynchronous WebSocket server handling user-to-member message routing, presence detection, and live notification pushes.",
          filename: "consumers.py",
          code: `class SupportChatConsumer(AsyncWebsocketConsumer):\n    async def connect(self):\n        self.user = self.scope['user']\n        if self.user.is_authenticated:\n            await self.accept()`,
          metrics: [{ label: "Gateway", val: "Django Channels" }, { label: "Channel Bus", val: "Redis Memory" }, { label: "Protocol", val: "WSS Sockets" }]
        },
        ss_auth: {
          tag: "Security Guard", title: "JWT Token Validation & Multi-Tenant RBAC",
          desc: "Enforces strict identity boundaries between support seekers, certified members, and platform administrators.",
          filename: "permissions.py",
          code: `class IsSupportMember(BasePermission):\n    def has_permission(self, request, view):\n        return request.user.role == 'SUPPORT_MEMBER' and request.user.is_verified`,
          metrics: [{ label: "Auth Token", val: "JWT Access + Refresh" }, { label: "Control", val: "Granular RBAC" }, { label: "Isolation", val: "Strict Scoping" }]
        },
        ss_db: {
          tag: "Optimized DB", title: "PostgreSQL Database Schema & Query Optimization",
          desc: "Indexed PostgreSQL tables holding user records, conversation histories, moderation reports, and analytical metrics.",
          filename: "models.py",
          code: `class Conversation(models.Model):\n    seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seeker_chats')\n    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name='member_chats')\n    created_at = models.DateTimeField(auto_now_add=True, db_index=True)`,
          metrics: [{ label: "RDBMS", val: "PostgreSQL 15" }, { label: "Optimization", val: "Indexed Foreign Keys" }, { label: "Queries", val: "Zero N+1 Calls" }]
        },
        ss_moderation: {
          tag: "Admin Suite", title: "Moderation Dashboards & Diagnostic Analytics",
          desc: "Admin diagnostic APIs for analytical reporting, flag resolution, and emergency intervention triggers.",
          filename: "admin_views.py",
          code: `@api_view(['GET'])\n@permission_classes([IsAdminUser])\ndef moderation_analytics(request):\n    stats = FlaggedSession.objects.filter(resolved=False).aggregate(Count('id'))\n    return Response(stats)`,
          metrics: [{ label: "Suite", val: "Admin Moderation" }, { label: "Analytics", val: "Real-time Metrics" }, { label: "Safety", val: "Emergency Triggers" }]
        }
      }
    }
  };

  let currentPlatform = 'neevpath';

  function renderArchitectureNodes(platformKey) {
    currentPlatform = platformKey;
    const pData = platformsData[platformKey];
    if (!pData) return;

    const container = document.getElementById('arch-nodes-container');
    if (!container) return;

    container.innerHTML = pData.nodes.map((n, idx) => `
      <div class="arch-node ${n.active ? 'active-node' : ''}" data-node="${n.id}">
        <div class="node-badge">${n.badge}</div>
        <div class="node-icon"><i class="${n.icon}"></i></div>
        <h4>${n.title}</h4>
        <p>${n.sub}</p>
      </div>
      ${idx < pData.nodes.length - 1 ? '<div class="arch-connector"><i class="fa-solid fa-chevron-right"></i></div>' : ''}
    `).join('');

    // Rebind click events
    container.querySelectorAll('.arch-node').forEach(node => {
      node.addEventListener('click', () => {
        container.querySelectorAll('.arch-node').forEach(x => x.classList.remove('active-node'));
        node.classList.add('active-node');
        const nodeId = node.dataset.node;
        updateInspectorDetails(platformKey, nodeId);
      });
    });

    // Default inspect first node
    const firstNodeId = pData.nodes[0].id;
    updateInspectorDetails(platformKey, firstNodeId);
  }

  function updateInspectorDetails(platformKey, nodeId) {
    const details = platformsData[platformKey]?.details[nodeId];
    if (!details) return;

    document.getElementById('inspect-tag').textContent = details.tag;
    document.getElementById('inspect-title').textContent = details.title;
    document.getElementById('inspect-desc').textContent = details.desc;
    document.getElementById('inspect-filename').textContent = details.filename;
    document.getElementById('inspect-code').textContent = details.code;

    const metricsEl = document.getElementById('inspect-metrics');
    if (metricsEl) {
      metricsEl.innerHTML = details.metrics.map(m => `
        <div class="metric-box">
          <span>${m.label}</span>
          <strong>${m.val}</strong>
        </div>
      `).join('');
    }
  }

  // Bind Platform Switcher Tabs
  const archTabBtns = document.querySelectorAll('.arch-tab-btn');
  archTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      archTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const platformKey = btn.dataset.arch;
      renderArchitectureNodes(platformKey);
    });
  });

  // Initial render
  renderArchitectureNodes('neevpath');

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
        if (s) s.className = 'sim-step';
      });

      consoleOutput.innerHTML = '<div style="color:var(--cyan)"><i class="fa-solid fa-gear fa-spin"></i> Initializing RAG Pipeline Execution...</div>';

      const startTime = performance.now();
      const timerInt = setInterval(() => {
        const elapsed = Math.round(performance.now() - startTime);
        if (timerEl) timerEl.textContent = `Elapsed: ${elapsed}ms`;
      }, 50);

      // Step 1
      setTimeout(() => {
        const s1 = document.getElementById('step-1');
        if (s1) s1.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:#a5b4fc">[STEP 1] ${data.step1}</div>`;
      }, 400);

      // Step 2
      setTimeout(() => {
        const s1 = document.getElementById('step-1');
        const s2 = document.getElementById('step-2');
        if (s1) s1.className = 'sim-step step-complete';
        if (s2) s2.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--cyan)">[STEP 2] ${data.step2}</div>`;
      }, 1000);

      // Step 3
      setTimeout(() => {
        const s2 = document.getElementById('step-2');
        const s3 = document.getElementById('step-3');
        if (s2) s2.className = 'sim-step step-complete';
        if (s3) s3.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--magenta)">[STEP 3] ${data.step3}</div>`;
      }, 1700);

      // Step 4
      setTimeout(() => {
        const s3 = document.getElementById('step-3');
        const s4 = document.getElementById('step-4');
        if (s3) s3.className = 'sim-step step-complete';
        if (s4) s4.className = 'sim-step step-complete';
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
