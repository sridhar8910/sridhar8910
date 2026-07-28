<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=240&color=0:020617,35:00f2fe,70:7c3aed,100:db00ff&text=Sridhar%20Reddy%20Guda&fontColor=ffffff&fontSize=44&fontAlignY=36&desc=AI%20Developer%20%7C%20Python%20%26%20Django/FastAPI%20Backend%20%7C%20RAG%20%26%20ChromaDB&descAlignY=58&descSize=17" alt="Sridhar Reddy Guda Header Banner" />
</p>

<h1 align="center">⚡ Hi, I'm Sridhar Reddy Guda</h1>

<p align="center">
  <b>AI Developer & Python Backend Engineer</b> specializing in <b>Retrieval-Augmented Generation (RAG)</b> with <b>ChromaDB</b>, <b>50+ Production REST APIs</b>, <b>Real-time WebSockets</b>, and <b>Cloud DevOps (Docker & Azure VM)</b>.
</p>

<p align="center">
  <a href="https://sridhar8910.github.io/">
    <img src="https://img.shields.io/badge/🌐_Live_Portfolio-sridhar8910.github.io-00f2fe?style=for-the-badge&logoColor=white" alt="Live Portfolio Website" />
  </a>
  <a href="mailto:gudasridharreddy2002@gmail.com">
    <img src="https://img.shields.io/badge/Email-gudasridharreddy2002%40gmail.com-ef4444?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="tel:+918106707735">
    <img src="https://img.shields.io/badge/Phone-+91_8106707735-10b981?style=for-the-badge&logo=phone&logoColor=white" alt="Phone" />
  </a>
  <a href="https://linkedin.com/in/sridhar-reddy-guda-161a7b223">
    <img src="https://img.shields.io/badge/LinkedIn-Sridhar%20Reddy%20Guda-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <img src="https://komarev.com/ghpvc/?username=sridhar8910&style=for-the-badge&color=7c3aed" alt="Profile views" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1200&color=00F2FE&center=true&vCenter=true&width=920&lines=AI+Developer+%7C+RAG+Pipelines+%2B+ChromaDB+Vector+DB;Python+%2B+Django+%2B+FastAPI+%2B+django-ninja-extra;50%2B+Production+REST+APIs+%2B+Pydantic+Validation;WebSockets+(Django+Channels)+%2B+Redis+%2B+Celery;React.js+%2B+TailwindCSS+%2B+Docker+%2B+Azure+VM" alt="Typing SVG" />
</p>

---

## 🚀 Executive Summary

Software Engineer with **2+ years of experience** building AI-powered SaaS platforms and scalable Python backends. Hands-on experience integrating Large Language Models (LLMs) into production systems, including designing a **Retrieval-Augmented Generation (RAG) pipeline with ChromaDB** for a context-aware doubt-clarification assistant.

Delivered **50+ REST APIs** across EdTech, HRTech, and Mental Wellness platforms, with production experience in prompt engineering, AI workflow design, real-time WebSockets (Django Channels), React frontends, JWT/OAuth authentication, PostgreSQL/MySQL query optimization, Docker containerization, and Azure Virtual Machines.

---

## 🏛️ System Architectures

### 1. NeevPath — AI RAG Pipeline & Smart School ERP

```mermaid
flowchart TD
    A[Student / Teacher Client\nReact / Flutter] -->|REST & WebSockets| B[Django REST / FastAPI Gateway\nPydantic & JWT Auth]
    B -->|Async Query Payload| C[Celery Worker & Redis Queue]
    C -->|Generate Embedding| D[SentenceTransformer Encoder]
    D -->|Cosine Similarity Search| E[(ChromaDB Vector DB)]
    E -->|Retrieved Context Chunks| F[Prompt Augmentation Engine]
    F -->|Context + Query Prompt| G[LLM API / OpenAI]
    G -->|Grounded AI Response| B
    B -->|Real-time Push| A
```

### 2. VerifiHireAI — AI Recruitment & Interview Automation Pipeline

```mermaid
flowchart LR
    A[Recruiter Uploads Resumes] -->|File Upload Endpoint| B[Django Async Endpoint]
    B -->|Task Queue| C[Celery Workers + Redis]
    C -->|Parse Text & Extraction| D[NLP Resume Parser]
    D -->|Match against Job Spec| E[ATS Fit Scoring Engine]
    E -->|Vector Store Query| F[(ChromaDB Index)]
    F -->|Candidate Ranking| G[React + Tailwind Dashboard]
    G -->|Interactive WebSockets| H[AI Live Interviewer Session]
```

### 3. SoulSupport — Real-Time WebSocket & Security Architecture

```mermaid
flowchart TD
    Client[User / Support Member App] -->|WSS Connection| Channels[Django Channels ASGI Gateway]
    Channels -->|Channel Layer| Redis[(Redis In-Memory Bus)]
    Channels -->|Validate JWT & RBAC| Auth[Role-Based Access Controller]
    Auth -->|Scoped Queries| DB[(PostgreSQL Database)]
    DB -->|Encrypted Chat Audit| Channels
    Channels -->|Sub-40ms Delivery| Client
```

---

## 💼 Work Experience

### **Software Engineer — Python Backend & AI Integration**
**IndusInnovate Technologies Pvt. Ltd., Hyderabad** | *April 2024 – June 2026*

- Developed scalable backend services using **Python, Django, DRF, django-ninja-extra with Pydantic schemas, and FastAPI** across three enterprise SaaS platforms.
- Designed and maintained **50+ RESTful APIs** for authentication, admin workflows, analytics, communication, and AI-driven features.
- Integrated LLMs into production applications, including a **Retrieval-Augmented Generation (RAG) pipeline with ChromaDB** to ground AI responses in domain content.
- Built AI-driven features including resume parsing, ATS scoring, candidate ranking, and adaptive learning support engines.
- Implemented **WebSocket real-time features (live tracking and chat)** using Django Channels with Redis as the channel layer.
- Contributed React and TailwindCSS frontend features, collaborating on recruiter-facing dashboards.
- Wrote **pytest unit tests** to validate backend logic and support safe continuous integration.
- Containerized applications using **Docker** and deployed services on **Azure Virtual Machines**.
- Implemented **Celery and Redis-backed asynchronous processing** for scheduled jobs and AI triggers.

---

## 🛠️ Technical Arsenal

| Category | Technologies & Tools |
| --- | --- |
| **AI & LLM Integration** | RAG Pipelines, ChromaDB (Vector DB), Prompt Engineering, LLM Integration, ATS Scoring Engines, AI Interview Automation, NLP |
| **Backend & APIs** | Python 3.x, Django, DRF, FastAPI, Flask, django-ninja-extra, Pydantic, REST APIs, WebSockets, gRPC, C++ |
| **Frontend & Real-Time** | React.js, TailwindCSS, WebSockets (Django Channels), JavaScript (ES6+), HTML5/CSS3, Flutter Integration |
| **Databases & Async** | PostgreSQL, MySQL, ChromaDB, Redis Cache, Celery Workers, Database Design & Query Optimization |
| **DevOps & Cloud** | Azure Virtual Machines, Docker, Kubernetes (Exposure), Apache Beam (Exposure), Linux/Bash, Git, GitHub Actions |
| **Security & Testing** | JWT Authentication, OAuth2, Role-Based Access Control (RBAC), pytest Unit Testing |

---

## 🌟 Featured Enterprise Projects

### 🎓 **NeevPath — AI-Powered Smart School Management Platform**
*`Python` `Django` `DRF` `RAG` `ChromaDB` `WebSockets` `PostgreSQL` `Celery` `Redis` `Docker` `Azure`*
- Built a **Retrieval-Augmented Generation (RAG) pipeline** using ChromaDB to power an AI doubt-clarification assistant delivering contextually grounded explanations.
- Built **WebSocket-based real-time features** for live tracking and chat, using Django Channels with Redis.
- Built an AI assessment engine that generates quizzes, evaluates answers, and identifies learning gaps.
- Designed secure REST APIs using JWT authentication for student, teacher, parent, and admin roles.

### 💼 **VerifiHireAI — Enterprise AI Recruitment Platform**
*`Python` `Django` `DRF` `React` `TailwindCSS` `WebSockets` `LLMs` `Celery` `Redis` `Docker` `Azure VM`*
- Integrated LLMs for AI-powered interview conversations, candidate evaluation, and automated interview summaries.
- Built React frontend features styled with TailwindCSS for recruiter dashboards and candidate management views.
- Implemented WebSockets for live interview monitoring and Celery async resume screening workflows.

### 💖 **SoulSupport — Secure Human Emotional Support Platform**
*`Python` `Django` `DRF` `REST APIs` `PostgreSQL` `Celery` `Redis` `JWT` `RBAC` `Docker` `Azure`*
- Built REST APIs for authentication, private conversations, notifications, admin dashboards, and moderation.
- Implemented JWT authentication and RBAC to secure user, support member, and admin workflows.
- Optimized PostgreSQL queries for encrypted conversation history and low-latency responses.

---

## 🎓 Education & Certifications

- **B.Tech in Electrical and Electronics Engineering** — ACE Engineering College, Hyderabad (2020 – 2024)
- **AZ-900: Microsoft Azure Fundamentals** — *Microsoft (In Progress)*
- **Docker Fundamentals** — *Docker & DevOps (In Progress)*
- **SQL (Basic & Intermediate)** — *HackerRank Verified Certification*
- **Python Basic Certification** — *HackerRank Verified Certification*
- **The Complete Python Bootcamp & Scientific Research** — *Udemy Advanced Credentials*

---

## 📊 GitHub Analytics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=sridhar8910&show_icons=true&theme=cyberpunk&hide_border=true&count_private=true" alt="Sridhar's GitHub Stats" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=sridhar8910&layout=compact&theme=cyberpunk&hide_border=true&langs_count=8" alt="Top Languages" width="48%" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=sridhar8910&theme=cyberpunk&hide_border=true" alt="GitHub Streak" />
</p>

---

<p align="center">
  <b>🌐 Interactive Portfolio: <a href="https://sridhar8910.github.io/">sridhar8910.github.io</a></b><br />
  Designed & Built with ❤️ by Sridhar Reddy Guda
</p>
