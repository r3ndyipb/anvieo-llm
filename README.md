# ANVIEO LMS & AI Academy (`anvieo-llm`)

> **Next-Generation Enterprise Learning Management System & AI Academy**  
> Mengintegrasikan Kurikulum Standar Global, In-Browser Cloud IDE, Socratic AI Copilot, Reviewer Studio 1-on-1, dan 14+ Multidisciplinary Learning Paths.

[![Repository](https://img.shields.io/badge/GitHub-r3ndyipb%2Fanvieo--llm-0A0A0C?style=for-the-badge&logo=github)](https://github.com/r3ndyipb/anvieo-llm)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![UI Framework](https://img.shields.io/badge/Design_System-Blackbox_UI_Rails-gold?style=for-the-badge)](#)

---

## 🌟 Ringkasan Platform

**ANVIEO Academy** adalah platform pembelajaran software engineering modern yang dirancang untuk menjembatani kesenjangan antara kurikulum akademis dan standar industri teknologi global. Platform ini mengusung filosofi *hands-on practice*, peninjauan kode (*code review*) mendalam baris per baris oleh praktisi senior dalam <3×24 jam, serta penyaluran kerja langsung ke 850+ jaringan hiring partners.

---

## 🚀 Fitur Utama & Keunggulan

1. **14+ Multidisciplinary Learning Paths**:
   - AI Engineer, Generative AI Engineer, MLOps, Data Scientist, Data Analyst.
   - Front-End Web, React Developer, Back-End JavaScript, Back-End Python.
   - Android Developer, Flutter Developer, iOS Developer.
   - DevOps & Cloud Computing (Google Cloud Platform).

2. **Silabus Detail & Interaktif (Standar Kurikulum Global)**:
   - Halaman detail kelas komprehensif (`/academies/653-belajar-dasar-ai`) dengan metrik durasi, rating, jumlah modul, dan fasilitas belajar.
   - Accordion silabus interaktif 5 kategori dengan 39 modul pembelajaran lengkap.

3. **Sistem Langganan & Single Course Checkout**:
   - Komparasi paket Single Course (30 Hari) vs Plus Subscription (1 Bulan hingga 1 Tahun).
   - Dynamic billing summary, diskon promo code (`AI50`, `MERDEKA`), referral code (10%), dan garansi uang kembali.

4. **Gerbang Autentikasi Modern (Google SSO & Email)**:
   - Halaman Login (`/login`) dengan Google Identity SSO dan Email/Password.
   - Halaman Registrasi (`/register` & `/daftar`) dengan indikator kekuatan kata sandi (*Password Strength Meter*).
   - Tautan legal Syarat & Ketentuan platform (`/termsofuse`) berstandar kepatuhan hukum edisi 2026.

5. **Ekosistem Enterprise & Dampak**:
   - **Hiring Partner Network** (`/hiring-partner`): 850+ perusahaan mitra perekrut.
   - **Corporate Social Relationship (CSR)** (`/csr`): Bangkit, DBS Foundation, IDCamp, Laskar AI.
   - **Case Studies & Production Engineering** (`/case-study`): 5 studi kasus arsitektur high-scale (120K QPS, Financial RAG, Microservices, UU PDP Audit).

---

## 📂 Struktur Monorepo

```bash
LMS/
├── .agents/                      # Agentic AI Custom Skills
│   └── skills/
│       ├── anvieo-github-agent/   # DevOps & GitHub Repository Governance Skill
│       ├── lms-uiux-developer/    # Next.js UI/UX & Blackbox Design System
│       ├── lms-system-analyst/    # System Workflows & Functional Requirements
│       ├── lms-dbms-developer/    # PostgreSQL & pgvector Schema Architecture
│       └── lms-technical-writer/  # Technical Documentation & Runbooks
│
├── lms-web/                      # Next.js 15 Web Portal (Main Academy Application)
│   ├── src/
│   │   ├── app/
│   │   │   ├── academies/        # Course Detail & Syllabus Pages
│   │   │   ├── subscriptions/    # Checkout & Plan Comparison
│   │   │   ├── learningpaths/    # Curriculum Tracks & Class Catalog
│   │   │   ├── login/            # Authentication Gateway (Google SSO + Email)
│   │   │   ├── register/         # Student Registration Gateway
│   │   │   ├── termsofuse/       # Legal Terms & Conditions
│   │   │   ├── hiring-partner/   # 850+ Hiring Partners Network
│   │   │   ├── csr/              # Corporate Social Initiatives
│   │   │   └── case-study/       # High-Scale System Case Studies
│   │   └── components/           # BlackboxRails, FlatIcon, SiteHeader, SiteFooter
│   └── public/                   # Static Assets & Icons
│
├── lms-portal/                   # Student Classroom & IDE Sandbox Studio
├── BRD.md                        # Business Requirements Document
├── PRD.md                        # Product Requirements Document
├── brieft.md                     # Project Technical Brief & Architecture
└── COMPETITIVE_ANALYSIS_AND_ENHANCEMENT.md # Industry Benchmarking Analysis
```

---

## 🛠️ Panduan Menjalankan Secara Lokal

### Prasyarat
- Node.js 18.x atau lebih tinggi (direkomendasikan Node.js 20+)
- npm, yarn, pnpm, atau bun

### Instalasi & Menjalankan Dev Server
```bash
# 1. Pindah ke direktori aplikasi web
cd lms-web

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:3000` untuk menjelajahi platform.

---

## 🤖 Agentic AI Skills

Repository ini dilengkapi dengan keterampilan AI khusus yang terletak di direktori `.agents/skills/`:
- **`anvieo-github-agent`**: Mengotomatisasi manajemen repositori GitHub, commit terstruktur, branching, CI/CD, dan sinkronisasi ke `r3ndyipb/anvieo-llm`.
- **`lms-uiux-developer`**: Menjaga integritas sistem desain Blackbox UI, palet warna obsidian `#0A0A0C`, dan micro-interactions.
- **`lms-system-analyst`**: Mengelola alur logika bisnis, BPMN, dan kontrak antarmuka API.
- **`lms-dbms-developer`**: Mengoptimasi basis data relasional PostgreSQL dan HNSW vector embeddings.
- **`lms-technical-writer`**: Memelihara dokumentasi teknis berskala enterprise dengan kerangka kerja Diátaxis.

---

## 📜 Lisensi & Hak Cipta
Hak Cipta © 2026 PT ANVIEO TEKNOLOGI NUSANTARA & Rendy Aria Windana ([@r3ndyipb](https://github.com/r3ndyipb)). Seluruh hak cipta dilindungi undang-undang.
