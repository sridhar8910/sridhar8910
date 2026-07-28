document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (SUBTLE FUTURISTIC UI SOUNDS)
  // ==========================================================================
  let soundEnabled = false;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  function playUiBeep(freq = 600, duration = 0.05, type = 'sine') {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    const xIcon = soundBtn.querySelector('.fa-volume-xmark');
    const highIcon = soundBtn.querySelector('.fa-volume-high');
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (xIcon) xIcon.style.display = soundEnabled ? 'none' : 'block';
      if (highIcon) highIcon.style.display = soundEnabled ? 'block' : 'none';
      if (soundEnabled) playUiBeep(880, 0.08, 'triangle');
    });
  }

  // ==========================================================================
  // 2. CURSOR GLOW TRACKER (desktop only)
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
  // 3. PARTICLE CANVAS NETWORK
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
  // 4. TYPEWRITER EFFECT
  // ==========================================================================
  const typed = document.getElementById('typed-text');
  const phrases = [
    "AI & RAG Pipeline Engineer (ChromaDB)",
    "Python & Django REST Framework (DRF) Expert",
    "Flutter & Dart Mobile App Developer",
    "React.js & TailwindCSS Full-Stack Integration",
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
  // 5. RECRUITER ROLE FILTER
  // ==========================================================================
  const rolePills = document.querySelectorAll('.role-pill');
  rolePills.forEach(pill => {
    pill.addEventListener('click', () => {
      playUiBeep(750, 0.05);
      rolePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const selectedRole = pill.dataset.role;

      document.querySelectorAll('[data-role-category]').forEach(el => {
        if (selectedRole === 'all' || el.dataset.roleCategory === selectedRole) {
          el.classList.remove('dimmed-item');
        } else {
          el.classList.add('dimmed-item');
        }
      });
    });
  });

  // ==========================================================================
  // 6. MULTI-PLATFORM ARCHITECTURE SWITCHER & INSPECTOR DATA
  // ==========================================================================
  const platformsData = {
    neevpath: {
      nodes: [
        { id: "np_client", badge: "Mobile Frontend", icon: "fa-solid fa-mobile-screen", title: "Flutter & Dart App", sub: "Cross-Platform ERP UI", active: true },
        { id: "np_gateway", badge: "API Gateway", icon: "fa-solid fa-network-wired", title: "Django REST (DRF)", sub: "50+ REST APIs & JWT" },
        { id: "np_async", badge: "Async Engine", icon: "fa-solid fa-clock-rotate-left", title: "Celery & Redis", sub: "Background Queues" },
        { id: "np_rag", badge: "Vector AI", icon: "fa-solid fa-microchip", title: "ChromaDB RAG + LLM", sub: "Doubt Clarification" },
        { id: "np_cloud", badge: "DevOps & Cloud", icon: "fa-solid fa-cloud-arrow-up", title: "Docker on Azure VM", sub: "PostgreSQL & CI/CD" }
      ],
      details: {
        np_client: {
          tag: "NeevPath Frontend", title: "Flutter & Dart Cross-Platform ERP Application",
          desc: "Multi-portal mobile application engineered with Flutter & Dart for students, parents, teachers, and school management. Communicates with Python/Django REST Framework backend.",
          filename: "neevpath_app.dart",
          code: `import 'package:flutter/material.dart';\nimport 'package:http/http.dart' as http;\n\nFuture<void> fetchStudentData(String jwtToken) async {\n  final response = await http.get(\n    Uri.parse('https://api.neevpath.com/v1/school/dashboard/'),\n    headers: {'Authorization': 'Bearer $jwtToken'},\n  );\n}`,
          metrics: [{ label: "Frontend Stack", val: "Flutter & Dart" }, { label: "Portals", val: "5 User Roles" }, { label: "Backend API", val: "Django REST (DRF)" }]
        },
        np_gateway: {
          tag: "NeevPath API Gateway", title: "Django & Django REST Framework (DRF) Engine",
          desc: "API gateway written in Python, Django, and DRF exposing student assessments, fees, exams, and AI doubt resolution endpoints with JWT auth and RBAC.",
          filename: "views.py",
          code: `from rest_framework.views import APIView\nfrom rest_framework.response import Response\nfrom rest_framework.permissions import IsAuthenticated\n\nclass AIDoubtClarificationView(APIView):\n    permission_classes = [IsAuthenticated]\n    def post(self, request):\n        task = run_rag_pipeline.delay(request.data.get('query_text'))\n        return Response({'status': 'queued', 'task_id': task.id})`,
          metrics: [{ label: "Backend", val: "Python & DRF" }, { label: "Security", val: "JWT & RBAC" }, { label: "Endpoints", val: "30+ REST APIs" }]
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
        { id: "vh_recruiter", badge: "Web Frontend", icon: "fa-brands fa-react", title: "React & Tailwind Suite", sub: "Recruiter Dashboards", active: true },
        { id: "vh_parser", badge: "API & NLP", icon: "fa-solid fa-file-invoice", title: "Django REST NLP Parser", sub: "Async Resume Screening" },
        { id: "vh_ats", badge: "Scoring Engine", icon: "fa-solid fa-calculator", title: "ATS Fit Scoring", sub: "Vector Cosine Match" },
        { id: "vh_bot", badge: "AI Interviewer", icon: "fa-solid fa-robot", title: "LLM Live Interview Bot", sub: "Dynamic Summaries" },
        { id: "vh_deploy", badge: "Cloud Microservices", icon: "fa-brands fa-docker", title: "Docker & Azure VM", sub: "Scalable Containers" }
      ],
      details: {
        vh_recruiter: {
          tag: "VerifiHire Frontend", title: "React.js & TailwindCSS Recruiter Dashboard",
          desc: "Recruiter dashboard built with React.js and TailwindCSS for candidate pipeline tracking, resume uploads, and interview management.",
          filename: "recruiter_dashboard.jsx",
          code: `import React, { useState, useEffect } from 'react';\n\nexport const Dashboard = () => {\n  const [candidates, setCandidates] = useState([]);\n  useEffect(() => {\n    fetch('/api/v1/recruitment/candidates/').then(r => r.json()).then(setCandidates);\n  }, []);\n  return <CandidateGrid data={candidates} />;\n};`,
          metrics: [{ label: "Frontend", val: "React.js" }, { label: "Styling", val: "TailwindCSS" }, { label: "Backend API", val: "Django REST (DRF)" }]
        },
        vh_parser: {
          tag: "NLP Parser", title: "Django REST & LLM Resume Extraction",
          desc: "Async Celery pipeline extracting technical skills, work history, education, and credentials from high-volume PDF resume uploads.",
          filename: "views.py",
          code: `@api_view(['POST'])\ndef upload_resume(request):\n    task = parse_resume_async.delay(request.FILES['resume'].read())\n    return Response({'task_id': task.id}, status=202)`,
          metrics: [{ label: "Backend", val: "Django REST (DRF)" }, { label: "Async Queue", val: "Celery Uploads" }, { label: "Format", val: "PDF / DOCX" }]
        },
        vh_ats: {
          tag: "ATS Engine", title: "Vector ATS Fit Scoring & Candidate Ranking",
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
          desc: "Containerized deployment of recruitment Django REST backend, Celery workers, and Redis channels on Azure VM.",
          filename: "docker-compose.yml",
          code: `version: '3.8'\nservices:\n  backend:\n    image: verifihire/django-api:latest\n    ports: ["8000:8000"]`,
          metrics: [{ label: "Orchestration", val: "Docker Compose" }, { label: "Cloud", val: "Azure VMs" }, { label: "CI/CD", val: "GitHub Actions" }]
        }
      }
    },
    soulsupport: {
      nodes: [
        { id: "ss_client", badge: "Mobile Frontend", icon: "fa-solid fa-mobile-screen", title: "Flutter & Dart App", sub: "Encrypted Support UI", active: true },
        { id: "ss_gateway", badge: "API Gateway", icon: "fa-solid fa-network-wired", title: "Django REST (DRF)", sub: "Secure REST APIs" },
        { id: "ss_auth", badge: "Security Guard", icon: "fa-solid fa-key", title: "JWT & RBAC Controller", sub: "Multi-Tenant Isolation" },
        { id: "ss_db", badge: "Database", icon: "fa-solid fa-leaf", title: "PostgreSQL Database", sub: "Query Tuning & Indexing" },
        { id: "ss_moderation", badge: "Support Admin", icon: "fa-solid fa-user-shield", title: "Admin Diagnostics", sub: "Moderation & Reporting" }
      ],
      details: {
        ss_client: {
          tag: "SoulSupport Frontend", title: "Flutter & Dart Cross-Platform Mobile Client",
          desc: "Flutter mobile application communicating with Python/Django REST Framework APIs for private, encrypted emotional support sessions.",
          filename: "support_client.dart",
          code: `import 'package:flutter/material.dart';\nimport 'package:http/http.dart' as http;\n\nFuture<void> sendPrivateMessage(String msg, String jwtToken) async {\n  final res = await http.post(\n    Uri.parse('https://api.soulsupport.org/v1/conversations/send/'),\n    headers: {'Authorization': 'Bearer $jwtToken'},\n    body: {'message': msg},\n  );\n}`,
          metrics: [{ label: "Frontend", val: "Flutter & Dart" }, { label: "Security", val: "Encrypted REST APIs" }, { label: "Backend API", val: "Django REST (DRF)" }]
        },
        ss_gateway: {
          tag: "Django REST Gateway", title: "Django REST Framework (DRF) Core Engine",
          desc: "High-security API gateway handling user authentication, private conversation threads, notification queues, and moderation dashboards.",
          filename: "views.py",
          code: `from rest_framework.generics import ListCreateAPIView\nfrom rest_framework.permissions import IsAuthenticated\n\nclass ConversationView(ListCreateAPIView):\n    serializer_class = ConversationSerializer\n    permission_classes = [IsAuthenticated]`,
          metrics: [{ label: "Backend", val: "Django REST (DRF)" }, { label: "Database", val: "PostgreSQL 15" }, { label: "Authentication", val: "JWT Tokens" }]
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

  function renderArchitectureNodes(platformKey) {
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

    container.querySelectorAll('.arch-node').forEach(node => {
      node.addEventListener('click', () => {
        playUiBeep(800, 0.04);
        container.querySelectorAll('.arch-node').forEach(x => x.classList.remove('active-node'));
        node.classList.add('active-node');
        updateInspectorDetails(platformKey, node.dataset.node);
      });
    });

    updateInspectorDetails(platformKey, pData.nodes[0].id);
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

  const archTabBtns = document.querySelectorAll('.arch-tab-btn');
  archTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiBeep(650, 0.05);
      archTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderArchitectureNodes(btn.dataset.arch);
    });
  });

  renderArchitectureNodes('neevpath');

  // ==========================================================================
  // 7. LIVE API SANDBOX TESTER
  // ==========================================================================
  const apiData = {
    rag_query: {
      status: "200 OK", time: "28ms",
      body: `{\n  "status": "success",\n  "backend_framework": "Django REST Framework (DRF)",\n  "endpoint": "/v1/ai/rag/clarify-doubt",\n  "chromadb_collection": "neevpath_curriculum",\n  "query": "Explain Snell's Law in Physics",\n  "similarity_distance": 0.082,\n  "retrieved_context_chunks": 3,\n  "llm_output": "Snell's Law (n1 sin θ1 = n2 sin θ2) describes the ratio of angles of incidence and refraction for light passing between isotropic media.",\n  "timestamp": "2026-07-29T00:56:00.000Z"\n}`
    },
    ats_score: {
      status: "200 OK", time: "34ms",
      body: `{\n  "status": "success",\n  "backend_framework": "Django REST Framework (DRF)",\n  "endpoint": "/v1/recruitment/ats-match",\n  "candidate_name": "Sridhar Reddy Guda",\n  "job_role": "Python AI & Backend Engineer",\n  "fit_score": 94.5,\n  "matching_keywords": ["Python 3.x", "Django REST", "FastAPI", "RAG", "ChromaDB", "Flutter", "Docker", "Azure"],\n  "recommendation": "STRONG MATCH"\n}`
    },
    jwt_auth: {
      status: "200 OK", time: "18ms",
      body: `{\n  "status": "success",\n  "backend_framework": "Django REST Framework (DRF)",\n  "endpoint": "/v1/auth/jwt-token",\n  "token_type": "Bearer",\n  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "user": {\n    "name": "Sridhar Reddy Guda",\n    "roles": ["BACKEND_LEAD", "AI_ENGINEER"],\n    "permissions": ["all"]\n  }\n}`
    },
    flutter_session: {
      status: "200 OK", time: "15ms",
      body: `{\n  "status": "success",\n  "backend_framework": "Django REST Framework (DRF)",\n  "endpoint": "/v1/mobile/flutter-sync",\n  "mobile_frontend": "Flutter & Dart",\n  "encrypted_session": true,\n  "user_role": "STUDENT_PORTAL",\n  "sync_timestamp": "2026-07-29T00:56:00.000Z"\n}`
    }
  };

  const sendApiBtn = document.getElementById('send-api-btn');
  const apiSelect = document.getElementById('api-endpoint-select');
  const apiCodeEl = document.getElementById('api-response-body');
  const apiStatusCodeEl = document.getElementById('api-status-code');
  const apiResponseTimeEl = document.getElementById('api-response-time');

  if (sendApiBtn && apiSelect && apiCodeEl) {
    sendApiBtn.addEventListener('click', () => {
      playUiBeep(900, 0.06);
      const val = apiSelect.value;
      const resp = apiData[val];
      if (!resp) return;

      sendApiBtn.disabled = true;
      sendApiBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Request...';
      apiCodeEl.textContent = '// Sending HTTP Request over SSL/TLS...';

      setTimeout(() => {
        apiStatusCodeEl.textContent = resp.status;
        apiResponseTimeEl.textContent = resp.time;
        apiCodeEl.textContent = resp.body;
        sendApiBtn.disabled = false;
        sendApiBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send API Request';
      }, 500);
    });
  }

  // ==========================================================================
  // 8. PROJECT MODAL LIGHTBOX
  // ==========================================================================
  const modalData = {
    neevpath: {
      title: "NeevPath — Smart School Management Platform",
      tagline: "Where Education Evolves Digitally",
      badge: "EdTech AI",
      desc: "Full-scale school ERP with Flutter & Dart cross-platform mobile frontend and Python/Django REST Framework (DRF) backend. Includes JWT auth, multi-role RBAC across 5 portals, Celery background pipelines, and a GenAI learning assistant powered by ChromaDB RAG.",
      code: `// NeevPath RAG Retriever & Vector Matcher (Django REST Framework Backend)
class NeevPathRAGEngine:
    def query_doubt(self, student_prompt):
        embeddings = self.encoder.encode(student_prompt)
        docs = self.chroma_db.query(query_embeddings=[embeddings], n_results=3)
        return self.llm.generate_answer(context=docs, prompt=student_prompt)`,
      specs: ["Frontend: Flutter & Dart Mobile App", "Backend: Python, Django & DRF", "ChromaDB Vector Store", "Celery & Redis", "Docker on Azure VM"]
    },
    verifihire: {
      title: "VerifiHireAI — Enterprise AI Recruitment Platform",
      tagline: "Trust in Every Hire",
      badge: "HRTech AI",
      desc: "AI recruitment platform featuring React.js & TailwindCSS frontend and Python/Django REST Framework (DRF) backend. Includes automated resume screening via LLMs, ATS vector scoring, candidate ranking, and async Celery file processing.",
      code: `// VerifiHireAI Resume Screening & ATS Scorer (Django REST Framework Backend)
def process_candidate_resume(pdf_file, job_spec):
    parsed_metadata = nlp_parser.extract_skills(pdf_file)
    fit_score = ats_engine.calculate_cosine_fit(parsed_metadata, job_spec)
    return {"candidate": parsed_metadata.name, "score": fit_score}`,
      specs: ["Frontend: React.js & TailwindCSS", "Backend: Python, Django & DRF", "LLM Prompting & NLP", "Async Celery Pipeline", "Docker Containers"]
    },
    soulsupport: {
      title: "SoulSupport — Human Emotional Support Platform",
      tagline: "You're Not Alone",
      badge: "Mental Health SaaS",
      desc: "Secure emotional wellbeing platform featuring Flutter & Dart cross-platform mobile frontend and Python/Django REST Framework (DRF) backend. Includes encrypted 1-on-1 support conversations, strict multi-role JWT RBAC access control, and optimized PostgreSQL database queries.",
      code: `// SoulSupport RBAC Access Controller (Django REST Framework Backend)
class SecureConversationGuard(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.id in [obj.seeker_id, obj.support_member_id]`,
      specs: ["Frontend: Flutter & Dart Mobile App", "Backend: Python, Django & DRF", "PostgreSQL Query Tuning", "JWT Auth & RBAC Guard", "Docker Azure VM"]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContentEl = document.getElementById('modal-body-content');

  document.querySelectorAll('.clickable-project').forEach(card => {
    card.addEventListener('click', () => {
      playUiBeep(700, 0.05);
      const pKey = card.dataset.project;
      const d = modalData[pKey];
      if (!d || !projectModal || !modalContentEl) return;

      modalContentEl.innerHTML = `
        <span class="project-badge" style="margin-bottom:.8rem;display:inline-block">${d.badge}</span>
        <h2 style="font-family:var(--font-h);font-size:1.5rem;font-weight:800;margin-bottom:.2rem">${d.title}</h2>
        <div style="font-style:italic;color:var(--cyan);font-size:.92rem;font-weight:600;margin-bottom:1.2rem"><i class="fa-solid fa-quote-left"></i> "${d.tagline}"</div>
        <p style="color:var(--text-2);font-size:1rem;margin-bottom:1.5rem">${d.desc}</p>
        <div class="code-terminal" style="margin-bottom:1.5rem">
          <div class="code-header"><span class="filename">backend_architecture.py</span></div>
          <pre class="code-body"><code>${d.code}</code></pre>
        </div>
        <h4 style="font-family:var(--font-h);margin-bottom:.8rem;font-size:1.05rem">Production Specs & Stack:</h4>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem">
          ${d.specs.map(s => `<span class="tech-tag" style="border-color:var(--cyan);color:var(--text-1)">${s}</span>`).join('')}
        </div>
      `;

      projectModal.classList.add('active-modal');
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active-modal');
    });
    projectModal.addEventListener('click', e => {
      if (e.target === projectModal) projectModal.classList.remove('active-modal');
    });
  }

  // ==========================================================================
  // 9. RAG SIMULATOR LOGIC
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
      playUiBeep(850, 0.05);
      const qKey = querySelect.value;
      const data = ragSimData[qKey];
      if (!data) return;

      runRagBtn.disabled = true;
      runRagBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Pipeline...';

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

      setTimeout(() => {
        const s1 = document.getElementById('step-1');
        if (s1) s1.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:#a5b4fc">[STEP 1] ${data.step1}</div>`;
      }, 400);

      setTimeout(() => {
        const s1 = document.getElementById('step-1');
        const s2 = document.getElementById('step-2');
        if (s1) s1.className = 'sim-step step-complete';
        if (s2) s2.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--cyan)">[STEP 2] ${data.step2}</div>`;
      }, 1000);

      setTimeout(() => {
        const s2 = document.getElementById('step-2');
        const s3 = document.getElementById('step-3');
        if (s2) s2.className = 'sim-step step-complete';
        if (s3) s3.className = 'sim-step step-active';
        consoleOutput.innerHTML += `<div style="margin-top:.5rem;color:var(--magenta)">[STEP 3] ${data.step3}</div>`;
      }, 1700);

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
  // 10. COUNTER ANIMATION
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
  // 11. THEME TOGGLE
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
  // 12. SKILL TABS SWITCHING
  // ==========================================================================
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiBeep(650, 0.04);
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.skills-content').forEach(c => {
        c.classList.toggle('active', c.id === btn.dataset.tab);
      });
    });
  });

  // ==========================================================================
  // 13. TIMELINE ACCORDION
  // ==========================================================================
  document.querySelectorAll('.timeline-content').forEach((tc, i) => {
    if (i === 0) tc.classList.add('expanded');
    tc.addEventListener('click', () => tc.classList.toggle('expanded'));
  });

  // ==========================================================================
  // 14. SCROLL REVEAL
  // ==========================================================================
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('active-reveal'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

  // ==========================================================================
  // 15. 3D CARD TILT (desktop)
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
  // 16. NAV ACTIVE HIGHLIGHT ON SCROLL
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
  // 17. MOBILE MENU TOGGLE
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
  // 18. CONTACT FORM SUBMISSION
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
