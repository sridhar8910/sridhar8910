<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:020617,35:00f2fe,70:7c3aed,100:db00ff&text=Sridhar%20Reddy%20Guda&fontColor=ffffff&fontSize=42&fontAlignY=36&desc=AI%20Developer%20%7C%20Python%20%26%20Django/FastAPI%20Backend%20%7C%20RAG%20%26%20ChromaDB&descAlignY=58&descSize=16" alt="Sridhar Reddy Guda Header" />
</p>

<h1 align="center">⚡ Sridhar Reddy Guda</h1>

<p align="center">
  <b>Software Engineer with 2+ Years of Production Experience</b><br />
  Specializing in <b>AI / RAG Systems (ChromaDB)</b>, <b>50+ Scalable REST APIs (Django / DRF / FastAPI)</b>, <b>Real-Time WebSockets & React UI</b>, and <b>Cloud DevOps (Docker & Azure VM)</b>.
</p>

<p align="center">
  <a href="https://sridhar8910.github.io/">
    <img src="https://img.shields.io/badge/🌐_Portfolio-sridhar8910.github.io-00f2fe?style=for-the-badge&logoColor=white" alt="Live Portfolio Website" />
  </a>
  <a href="mailto:gudasridharreddy2002@gmail.com">
    <img src="https://img.shields.io/badge/Email-gudasridharreddy2002%40gmail.com-ef4444?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="tel:+918106707735">
    <img src="https://img.shields.io/badge/Phone-+91_8106707735-10b981?style=for-the-badge&logo=phone&logoColor=white" alt="Phone" />
  </a>
  <a href="https://linkedin.com/in/sridhar-reddy-guda-161a7b223">
    <img src="https://img.shields.io/badge/LinkedIn-Sridhar_Reddy_Guda-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <img src="https://komarev.com/ghpvc/?username=sridhar8910&style=for-the-badge&color=7c3aed" alt="Profile views" />
</p>

---

## 🎯 Recruiter Quick-Navigation Matrix (Select Your Hiring Stream)

Choose your relevant domain below to view custom engineering highlights, metrics, and production proof:

| Hiring Stream / Role | Core Technologies | Key Business Impact | Jump To Section |
| :--- | :--- | :--- | :---: |
| 🤖 **AI / GenAI / RAG Engineer** | RAG, ChromaDB Vector DB, Prompt Engineering, ATS Engines, LLM Interviews | Built RAG pipeline with 98% accuracy & context grounding | [👉 AI Stream](#-1-ai--genai--rag-engineering-stream) |
| 🐍 **Python / Backend Developer** | Python 3.x, Django, DRF, FastAPI, django-ninja-extra, Pydantic, PostgreSQL | Delivered **50+ REST APIs** with `< 45ms` response time | [👉 Backend Stream](#-2-python--django--fastapi-backend-stream) |
| ⚡ **Full-Stack & WebSockets** | React.js, TailwindCSS, Django Channels WSS, Redis Channel Layer | Built live tracking & messaging streaming `< 40ms` latency | [👉 Full Stack Stream](#-3-full-stack--real-time-websockets-stream) |
| ☁️ **DevOps / Cloud Engineer** | Docker Containers, Azure VMs, Linux, Git/GitHub Actions, pytest | Zero-downtime releases & containerized microservices | [👉 DevOps Stream](#-4-devops--cloud-infrastructure-stream) |

---

## 💡 Key Engineering Business Metrics

<p align="center">
  <img src="https://img.shields.io/badge/50%2B-REST_APIs_Delivered-00f2fe?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/2%2B_Years-Production_Experience-7c3aed?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/3-Enterprise_SaaS_Platforms-db00ff?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/10,000%2B-Daily_Async_Jobs-10b981?style=for-the-badge&logo=redis&logoColor=white" />
</p>

---

## 🤖 1. AI / GenAI / RAG Engineering Stream

### **What I Bring as an AI Engineer:**
- **RAG Architecture**: Designed & deployed a production Retrieval-Augmented Generation (RAG) pipeline using **ChromaDB vector database** for context-aware doubt clarification.
- **ATS & HRTech AI**: Built automated candidate screening engines, calculating ATS similarity fit scores between resumes and job specifications.
- **Conversational AI**: Integrated LLMs for dynamic interview conversations, generating automated summaries and contextual follow-up questions.
- **Prompt Engineering & NLP**: Designed structured prompts with strict system bounds, JSON schema outputs, and fallback mechanisms.

<details>
<summary><b>🔍 View NeevPath RAG System Architecture Diagram</b></summary>

```mermaid
flowchart TD
    A[Student / Teacher Client] -->|Ask Query| B[Django REST / FastAPI Gateway]
    B -->|Generate 384-d Embedding| C[SentenceTransformer Engine]
    C -->|Cosine Vector Search| D[(ChromaDB Vector Store)]
    D -->|Top 3 Context Chunks| E[Prompt Augmentation Module]
    E -->|Augmented Prompt| F[LLM / OpenAI API]
    F -->|Grounded AI Response| B
    B -->|Deliver Answer| A
```
</details>

---

## 🐍 2. Python / Django / FastAPI Backend Stream

### **What I Bring as a Backend Engineer:**
- **50+ REST APIs**: Designed and maintained robust, production-grade endpoints using **Django, DRF, FastAPI, and django-ninja-extra**.
- **Data Validation & Schemas**: Enforced type safety and input sanitization using **Pydantic** models.
- **Database Optimization**: Engineered complex **PostgreSQL/MySQL** schemas, added strategic database indexing, and eliminated N+1 query bottlenecks.
- **Async Processing**: Integrated **Celery workers** backed by **Redis** for scheduled background jobs, notifications, and heavy file parsing.

<details>
<summary><b>🔍 View High-Throughput API Gateway Architecture Diagram</b></summary>

```mermaid
flowchart LR
    Client[REST Client / Frontend] -->|HTTPS Requests| Gateway[Django REST / FastAPI Gateway]
    Gateway -->|JWT Validation & RBAC| Auth[Role-Based Security Guard]
    Auth -->|Valid Request| Router[Ninja Extra Controller]
    Router -->|Pydantic Schema Check| Service[Business Logic Layer]
    Service -->|Async Tasks| Celery[Celery Workers + Redis]
    Service -->|Optimized Queries| DB[(PostgreSQL 15 DB)]
```
</details>

---

## ⚡ 3. Full-Stack & Real-Time WebSockets Stream

### **What I Bring as a Full-Stack Engineer:**
- **Real-Time Streaming**: Implemented low-latency WebSockets using **Django Channels** and **Redis channel layers** (`< 40ms` latency).
- **React.js & TailwindCSS**: Built recruiter dashboard interfaces, live interview monitors, and candidate tracking components.
- **State & Event Management**: Synchronized asynchronous UI state updates with backend WebSocket broadcast channels.

<details>
<summary><b>🔍 View WebSockets & React Architecture Diagram</b></summary>

```mermaid
flowchart TD
    ReactApp[React.js + Tailwind UI] -->|WSS Handshake| Channels[Django Channels ASGI]
    Channels -->|Publish/Subscribe| Redis[(Redis Channel Layer)]
    Redis -->|Broadcast Event| Channels
    Channels -->|Push Live Updates| ReactApp
```
</details>

---

## ☁️ 4. DevOps & Cloud Infrastructure Stream

### **What I Bring as a DevOps Engineer:**
- **Docker Containerization**: Created optimized multi-stage Dockerfiles and `docker-compose` production environment manifests.
- **Azure Virtual Machines**: Deployed web servers, Celery workers, Redis instances, and PostgreSQL databases on Azure VMs.
- **Testing & Quality Assurance**: Wrote comprehensive **pytest unit test suites** for API validation and zero-downtime deployments.

<details>
<summary><b>🔍 View Docker & Azure Deployment Architecture Diagram</b></summary>

```mermaid
flowchart TD
    Code[Git Repo / Push] -->|CI/CD Pipeline| Actions[GitHub Actions Runner]
    Actions -->|Build & Test| Pytest[pytest Unit Testing]
    Pytest -->|Containerize| Docker[Docker Image Registry]
    Docker -->|Deploy Compose| Azure[(Azure Virtual Machine)]
    Azure -->|Serve Traffic| Users[Global Traffic]
```
</details>

---

## 💼 Work Experience

### **Software Engineer — Python Backend & AI Integration**
**IndusInnovate Technologies Pvt. Ltd., Hyderabad** | *April 2024 – June 2026*

- Developed scalable backend services using **Python, Django, DRF, django-ninja-extra with Pydantic schemas, and FastAPI** across 3 enterprise SaaS platforms.
- Designed and maintained **50+ RESTful APIs** for authentication, admin workflows, analytics, real-time messaging, and AI-driven features.
- Integrated LLMs into production applications, including a **Retrieval-Augmented Generation (RAG) pipeline with ChromaDB** to ground AI responses in domain content.
- Engineered AI-driven features including resume parsing, ATS fit scoring, AI candidate interviews, and adaptive learning engines.
- Built **WebSocket-based real-time features (live tracking, candidate monitoring, chat)** using Django Channels with Redis as channel layer.
- Contributed React and TailwindCSS frontend features, building recruiter dashboard views and interactive management interfaces.
- Wrote **pytest unit test suites** to validate backend business logic and ensure safe, zero-downtime continuous integration.
- Containerized applications using **Docker** and deployed services on **Azure Virtual Machines**, optimizing PostgreSQL/MySQL queries.

---

## 🛠️ Complete Technical Arsenal

```
┌─────────────────────────┬──────────────────────────────────────────────────────────────┐
│ Category                │ Tech Stack & Capabilities                                    │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ AI & LLMs               │ RAG Pipelines, ChromaDB (Vector DB), Prompt Eng, ATS Scoring │
│ Backend & APIs          │ Python 3.x, Django, DRF, FastAPI, django-ninja-extra, Pydantic│
│ Real-Time & Frontend    │ React.js, TailwindCSS, WebSockets, Django Channels, Flutter  │
│ Databases & Async       │ PostgreSQL, MySQL, ChromaDB, Redis Cache, Celery Workers     │
│ Cloud & DevOps          │ Azure VMs, Docker, Kubernetes (Exposure), Linux, Git, pytest  │
│ Auth & Security         │ JWT Authentication, OAuth2, Role-Based Access Control (RBAC)  │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 🌟 Featured Enterprise Projects

| Project | Domain | Core Tech Stack | Impact & Highlights |
| :--- | :--- | :--- | :--- |
| **NeevPath** | EdTech AI | `Python` `Django` `DRF` `RAG` `ChromaDB` `WebSockets` `Docker` `Azure` | Built ChromaDB RAG pipeline for AI doubt clarification & WebSockets live tracking. |
| **VerifiHireAI** | HRTech AI | `Python` `Django` `DRF` `React` `Tailwind` `WebSockets` `LLMs` `Celery` | Built LLM automated interview bot, async resume parser, & React recruiter dashboard. |
| **SoulSupport** | Mental Health | `Python` `Django REST` `PostgreSQL` `Redis` `JWT` `RBAC` `Docker` | Built secure encrypted messaging portal with strict multi-tenant JWT RBAC boundaries. |

---

## 🎓 Education & Certifications

- 🎓 **B.Tech in Electrical & Electronics Engineering** — *ACE Engineering College, Hyderabad (2020 – 2024)*
- ☁️ **AZ-900: Microsoft Azure Fundamentals** — *Microsoft (In Progress)*
- 🐳 **Docker Fundamentals** — *Docker & DevOps (In Progress)*
- 📜 **SQL (Basic & Intermediate)** — *HackerRank Verified Certification*
- 🐍 **Python Basic Certification** — *HackerRank Verified Certification*
- 💻 **Complete Python Bootcamp & Scientific Research** — *Udemy Advanced Credentials*

---

## 📈 Engineering Performance & Skill Distribution Graphs

### 1. Codebase & Skill Distribution Pie Chart

```mermaid
pie title Production Engineering & Technology Distribution
    "Python & Backend APIs (Django/FastAPI)" : 40
    "AI & RAG Pipelines (ChromaDB)" : 25
    "Real-Time WebSockets & Async (Celery/Redis)" : 20
    "DevOps & Infrastructure (Docker/Azure)" : 15
```

### 2. System Delivery Timeline (Gantt Chart)

```mermaid
gantt
    title Production System Delivery Timeline (2024 - 2026)
    dateFormat YYYY-MM
    axisFormat %b %Y

    section Enterprise SaaS
    NeevPath School ERP (RAG & WebSockets) : active, 2024-04, 2025-03
    VerifiHireAI (LLM ATS & Interview Bot) : 2025-01, 2025-10
    SoulSupport (Real-time RBAC & Chat)    : 2025-08, 2026-06

    section Architecture & DevOps
    50+ REST APIs Delivery                 : 2024-04, 2026-06
    Docker & Azure VM Deployments           : 2024-06, 2026-06
```

### 3. Production Competency & Capability Distribution

```
📊 Production Capability Matrix

Python / Backend APIs  [████████████████████] 98% (50+ REST APIs)
RAG & ChromaDB         [██████████████████  ] 92% (Context Vector Search)
Django / DRF           [██████████████████  ] 92% (Enterprise SaaS)
FastAPI & Pydantic     [████████████████    ] 88% (High Throughput)
WebSockets & Redis     [████████████████    ] 86% (Real-Time Channels)
React.js & Tailwind    [██████████████      ] 82% (Full-Stack UI)
Docker & Azure VM      [██████████████      ] 82% (Container DevOps)
```

---

## 🐍 Contribution Grid Snake Game

<p align="center">
  <img src="https://raw.githubusercontent.com/sridhar8910/sridhar8910/output/github-contribution-grid-snake-dark.svg" alt="GitHub Contribution Grid Snake Game" width="100%" />
</p>

---

<p align="center">
  <b>🌐 Interactive Web Portfolio: <a href="https://sridhar8910.github.io/">sridhar8910.github.io</a></b><br />
  Designed & Engineered by Sridhar Reddy Guda
</p>
