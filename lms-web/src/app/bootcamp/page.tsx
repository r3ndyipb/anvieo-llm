"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

export default function BootcampPage() {
  const [selectedTrack, setSelectedTrack] = useState<"fullstack" | "datascience" | "fintech">("fullstack");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    track: "Full-Stack AI & Software Engineering",
    batch: "Batch 12 (Mulai 15 November 2026)",
    background: "freshgrad",
    notes: "",
  });

  const BOOTCAMP_TRACKS = {
    fullstack: {
      title: "Full-Stack AI & Software Engineering Bootcamp",
      level: "Pemula hingga Mahir",
      duration: "16 Minggu (360 Jam Belajar)",
      schedule: "Selasa & Kamis (19.00 - 21.30 WIB) + Sabtu (09.00 - 15.00 WIB)",
      targetJob: "Full-Stack Developer, Backend Engineer, AI Application Specialist",
      avgSalary: "Rp12.000.000 - Rp22.000.000 / bulan",
      syllabus: [
        {
          phase: "Fase 1: Minggu 1 - 4",
          topic: "Modern Front-End & System Foundations",
          desc: "Penguasaan mendalam TypeScript, React 19, Next.js 16 App Router, responsive component architecture, dan integrasi API RESTful.",
        },
        {
          phase: "Fase 2: Minggu 5 - 8",
          topic: "Enterprise Backend & Relational Databases",
          desc: "Membangun microservices dengan Python FastAPI, schema relational PostgreSQL 16, asynchronous queue, caching Redis, dan clean architecture.",
        },
        {
          phase: "Fase 3: Minggu 9 - 12",
          topic: "AI Agent Engineering & Cloud DevOps",
          desc: "Integrasi pgvector untuk RAG embedding, LLM function calling, Docker containerization, otomatisasi CI/CD GitHub Actions, dan deployment cloud.",
        },
        {
          phase: "Fase 4: Minggu 13 - 16",
          topic: "Capstone Real-World Project & Career Prep",
          desc: "Membangun sistem SaaS skala masif yang live di production, simulasi technical coding interview, live mock HR interview, dan penyaluran kerja.",
        },
      ],
    },
    datascience: {
      title: "Data Science & Machine Learning Specialist Bootcamp",
      level: "Pemula hingga Mahir",
      duration: "16 Minggu (360 Jam Belajar)",
      schedule: "Senin & Rabu (19.00 - 21.30 WIB) + Sabtu (09.00 - 15.00 WIB)",
      targetJob: "Data Scientist, Machine Learning Engineer, AI Researcher",
      avgSalary: "Rp14.000.000 - Rp24.000.000 / bulan",
      syllabus: [
        {
          phase: "Fase 1: Minggu 1 - 4",
          topic: "Python for Data Science & Statistical Inference",
          desc: "Kompilasi data saintifik dengan NumPy & Pandas, visualisasi data interaktif, pengujian hipotesis statistik, dan probability distribution.",
        },
        {
          phase: "Fase 2: Minggu 5 - 8",
          topic: "Supervised & Unsupervised Machine Learning",
          desc: "Algoritma regresi, klasifikasi Random Forest & XGBoost, dimensional reduction PCA, clustering K-Means, dan evaluasi matriks model.",
        },
        {
          phase: "Fase 3: Minggu 9 - 12",
          topic: "Deep Learning, PyTorch & LLM Fine-Tuning",
          desc: "Neural network backpropagation, Convolutional Neural Networks untuk computer vision, Transformer architecture, dan parameter-efficient fine-tuning (LoRA).",
        },
        {
          phase: "Fase 4: Minggu 13 - 16",
          topic: "MLOps Production & Industry Capstone",
          desc: "Pipeline model tracking dengan MLflow, serving model REST API dengan Docker, monitoring data drift, dan portfolio presentasi live ke industri.",
        },
      ],
    },
    fintech: {
      title: "Fintech & Quantitative Trading Bootcamp",
      level: "Menengah hingga Mahir",
      duration: "16 Minggu (360 Jam Belajar)",
      schedule: "Rabu & Jumat (19.00 - 21.30 WIB) + Minggu (09.00 - 15.00 WIB)",
      targetJob: "Quantitative Analyst, Algorithmic Trader, Financial Engineer",
      avgSalary: "Rp15.000.000 - Rp28.000.000 / bulan",
      syllabus: [
        {
          phase: "Fase 1: Minggu 1 - 4",
          topic: "Capital Markets Mechanics & Valuation Framework",
          desc: "Analisis laporan keuangan komparatif, Discounted Cash Flow (DCF), valuasi ekuitas multi-sektor, dan regulasi OJK / BEI.",
        },
        {
          phase: "Fase 2: Minggu 5 - 8",
          topic: "Algorithmic Trading & Foreign Flow Mechanics",
          desc: "Pemodelan kuantitatif Python, analisis pergerakan bandarmology / broker summary, pengujian backtesting strategi, dan Sharpe ratio.",
        },
        {
          phase: "Fase 3: Minggu 9 - 12",
          topic: "High-Speed Data Ingestion & Sectors API Pipelines",
          desc: "Ekstraksi data finansial realtime, automated sentiment analysis berita pasar modal dengan AI, dan pipeline database time-series.",
        },
        {
          phase: "Fase 4: Minggu 13 - 16",
          topic: "Automated Trading Bot Capstone & Desk Presentation",
          desc: "Membangun trading engine otomatis dengan risk-management protocol, backtesting 5 tahun data historis, dan simulasi komite investasi.",
        },
      ],
    },
  };

  const BOOTCAMP_ALUMNI = [
    {
      name: "Yoga Pratama",
      roleBefore: "Fresh Graduate Administrasi",
      roleAfter: "Software Engineer di Unicorn E-Commerce",
      salaryMultiplier: "3.4x",
      story: "“Saya belajar coding dari nol di ANVIEO. Yang paling mengubah nasib adalah review kodenya yang teliti banget—diajarin cara nulis clean architecture yang langsung bikin saya lolos tes teknis.”",
      avatar: "/alumni/alumni_1.jpg",
      badge: "Batch 4 Graduate",
      company: "Tokopedia / GoTo",
      capstone: "High-Concurrency Flash Sale Service",
    },
    {
      name: "Nabila Zahra",
      roleBefore: "Customer Care Specialist",
      roleAfter: "Machine Learning Engineer di FinTech Gateway",
      salaryMultiplier: "2.8x",
      story: "“Switch career terasa realistis karena mentor-mentornya praktisi aktif di industri. Capstone proyek saya tentang deteksi anomali fraud langsung dipuji saat interview user.”",
      avatar: "/alumni/alumni_2.jpg",
      badge: "Batch 6 Graduate",
      company: "DANA Indonesia",
      capstone: "Realtime Fraud Detection Engine",
    },
    {
      name: "Fajar Ramadhan",
      roleBefore: "Junior IT Support",
      roleAfter: "Cloud & DevOps Specialist di Bank Digital",
      salaryMultiplier: "3.1x",
      story: "“Di bootcamp ini kami belajar Docker, Kubernetes, dan CI/CD langsung di server nyata. Portofolio GitHub saya jadi sangat kuat dan terstruktur rapi.”",
      avatar: "/alumni/alumni_3.jpg",
      badge: "Batch 5 Graduate",
      company: "Bank Jago",
      capstone: "Zero-Downtime GitOps Pipeline",
    },
    {
      name: "Jessica Tanuwidjaja",
      roleBefore: "Accounting Staff",
      roleAfter: "Quantitative Analyst di Perusahaan Sekuritas",
      salaryMultiplier: "3.6x",
      story: "“Bootcamp Fintech & Algorithmic Trading ini sangat langka di Indonesia. Diajari menggabungkan analisis valuasi fundamental dengan coding Python otomatis.”",
      avatar: "/alumni/alumni_4.jpg",
      badge: "Batch 7 Graduate",
      company: "Mandiri Sekuritas",
      capstone: "Automated Broker Summary Scanner",
    },
  ];

  const FAQ_ITEMS = [
    {
      q: "Apakah pemula tanpa latar belakang IT atau coding bisa mendaftar?",
      a: "Tentu bisa! Bootcamp ini dirancang dengan kurikulum berjenjang dari fondasi paling dasar. Kami juga menyediakan kelas matrikulasi pra-bootcamp gratis selama 2 minggu untuk memastikan semua peserta siap sebelum kelas intensif dimulai.",
    },
    {
      q: "Bagaimana mekanisme garansi penyaluran kerja (Job Placement Guarantee)?",
      a: "Setiap siswa yang lulus capstone dengan passing grade minimal 80% dan tingkat kehadiran 85% akan otomatis dimasukkan ke program Career Accelerator. Tim karir kami akan menghubungkan profil Anda langsung ke 850+ hiring partner kami dengan jaminan penyaluran dalam waktu maksimal 90 hari setelah kelulusan.",
    },
    {
      q: "Apakah jadwal bootcamp ramah bagi karyawan yang sedang bekerja?",
      a: "Ya. Sesi live diadakan pada malam hari di hari kerja (pukul 19.00 - 21.30 WIB) dan akhir pekan (Sabtu/Minggu). Semua sesi tatap muka virtual direkam dalam kualitas HD dan dapat diakses ulang jika berhalangan hadir.",
    },
    {
      q: "Apa saja fasilitas yang didapatkan siswa selama 16 minggu?",
      a: "Siswa mendapatkan akses cloud lab coding, akun repository GitHub enterprise, bimbingan 1-on-1 private mentor, review kode tanpa batas dengan SLA < 12 jam, sertifikat kelulusan terakreditasi IEEE/NIST, serta portofolio capstone siap produksi.",
    },
    {
      q: "Metode pembayaran apa saja yang tersedia?",
      a: "Tersedia opsi pembayaran langsung (lump sum) dengan diskon early bird, cicilan 0% hingga 12 bulan menggunakan kartu kredit / fintech partner, serta beasiswa parsial bagi pendaftar dengan seleksi tes bakat terbaik.",
    },
  ];

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSubmitted(true);
  };

  const currentTrackData = BOOTCAMP_TRACKS[selectedTrack];

  return (
    <div className="bootcamp-page-wrap">
      <SiteHeader activeTabOverride="programs" />

      {/* Breadcrumb Header */}
      <div className="lp-breadcrumb-wrap" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Bootcamp</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bootcamp-hero-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="bootcamp-hero-content">
            <div className="bootcamp-hero-tag">
              <span>INTENSIVE 16-WEEK ACCELERATOR • GARANSI PENYALURAN KERJA</span>
            </div>

            <h1 className="bootcamp-hero-title">
              Akselerasi Karir Teknologi &amp; Finansial Impian Anda dalam 16 Minggu
            </h1>

            <p className="bootcamp-hero-desc">
              Pelatihan intensif berorientasi industri dari nol hingga siap kerja. Bimbingan 1-on-1 bersama praktisi senior, lab coding produksi, review tugas teliti &lt; 12 jam, dan akses langsung ke <strong>850+ perusahaan hiring partner</strong>.
            </p>

            <div className="bootcamp-hero-actions">
              <a href="#daftar" className="lp-btn-primary">
                <span>Daftar Gelombang Terbaru</span>
                <span>→</span>
              </a>
              <a href="#tracks" className="lp-btn-outline">
                <span>Jelajahi Pilihan Track &amp; Silabus</span>
                <span>↓</span>
              </a>
            </div>

            {/* Key Numbers Row */}
            <div className="bootcamp-key-stats">
              <div className="b-stat-box">
                <span className="b-stat-num">94.2%</span>
                <span className="b-stat-lbl">Tingkat Penyaluran Kerja</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">3.2x</span>
                <span className="b-stat-lbl">Peningkatan Gaji Rata-rata</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">850+</span>
                <span className="b-stat-lbl">Hiring Partner Aktif</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">&lt; 12 Jam</span>
                <span className="b-stat-lbl">SLA Reviewer Human</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Bootcamp Section */}
      <section className="bootcamp-why-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // WHY CHOOSE ANVIEO BOOTCAMP</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PROGRAM</dt>
                <dd>16 WEEKS INTENSIVE</dd>
              </div>
              <div>
                <dt>REVIEW SLA</dt>
                <dd>&lt; 12 JAM</dd>
              </div>
              <div>
                <dt>HIRING PARTNERS</dt>
                <dd>850+ COMPANIES</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Mengapa ANVIEO Bootcamp Berbeda?</h2>
            <p className="lp-section-subtitle">
              Kami tidak sekadar mengajarkan tutorial dasar, kami melatih Anda bekerja seperti seorang profesional di tim engineering dunia nyata.
            </p>
          </div>

          <div className="bootcamp-pillars-grid">
            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="company" size={24} color="var(--gold)" /></div>
              <h3 className="b-pillar-title">Kurikulum Berstandar Global</h3>
              <p className="b-pillar-desc">
                Disusun bersama Google Cloud, AWS, dan praktisi industri. Menyelaraskan standar arsitektur IEEE, NIST AI RMF, dan CFA Institute.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="laptop" size={24} color="var(--gold)" /></div>
              <h3 className="b-pillar-title">Production Capstone Project</h3>
              <p className="b-pillar-desc">
                Bukan membuat clone aplikasi sederhana, Anda akan merancang sistem berskala masif yang live di production dan tahan uji beban nyata.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="search" size={24} color="var(--gold)" /></div>
              <h3 className="b-pillar-title">Review Kode Baris-demi-Baris</h3>
              <p className="b-pillar-desc">
                Satu-satunya bootcamp dengan audit kode manusia dalam waktu &lt; 12 jam. Anda dilatih memahami clean code, security, dan modular design.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="hands" size={24} color="var(--gold)" /></div>
              <h3 className="b-pillar-title">Career Coaching &amp; Hiring Match</h3>
              <p className="b-pillar-desc">
                Bimbingan pembuatan resume ATS-friendly, mock interview teknis, dan portofolio show-off langsung di hadapan tim hiring partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Tracks & Detailed Syllabus */}
      <section id="tracks" className="bootcamp-tracks-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // TRACKS &amp; CURRICULUM SYLLABUS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>TOTAL DURATION</dt>
                <dd>360 JAM INTENSIF</dd>
              </div>
              <div>
                <dt>TRACKS</dt>
                <dd>3 SPESIALISASI</dd>
              </div>
              <div>
                <dt>DELIVERY</dt>
                <dd>LIVE + LAB PRODUCTION</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pilihan Program &amp; Materi Bootcamp</h2>
            <p className="lp-section-subtitle">
              Pilih spesialisasi yang sesuai dengan aspirasi karir Anda. Setiap track disusun selama 16 minggu intensif.
            </p>
          </div>

          {/* Track Switcher */}
          <div className="bootcamp-track-pills">
            <button
              type="button"
              className={`b-track-pill ${selectedTrack === "fullstack" ? "active" : ""}`}
              onClick={() => setSelectedTrack("fullstack")}
            >
              Full-Stack AI &amp; Software Engineer
            </button>
            <button
              type="button"
              className={`b-track-pill ${selectedTrack === "datascience" ? "active" : ""}`}
              onClick={() => setSelectedTrack("datascience")}
            >
              Data Science &amp; Machine Learning
            </button>
            <button
              type="button"
              className={`b-track-pill ${selectedTrack === "fintech" ? "active" : ""}`}
              onClick={() => setSelectedTrack("fintech")}
            >
              Fintech &amp; Quantitative Trading
            </button>
          </div>

          {/* Track Overview Card */}
          <div className="bootcamp-track-card">
            <div className="b-track-header">
              <div>
                <div className="b-eyebrow"><span>SPESIALISASI TERPOPULER</span></div>
                <h3 className="b-track-title">{currentTrackData.title}</h3>
                <div className="b-track-meta-chips">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="clock" size={13} color="var(--gold)" /> {currentTrackData.duration}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="calendar" size={13} color="var(--gold)" /> {currentTrackData.schedule}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="briefcase" size={13} color="var(--gold)" /> Target: {currentTrackData.targetJob}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="money" size={13} color="var(--gold)" /> Estimasi Gaji: {currentTrackData.avgSalary}</span>
                </div>
              </div>
              <a href="#daftar" className="lp-btn-primary" style={{ alignSelf: "flex-start" }}>
                Daftar Track Ini →
              </a>
            </div>

            {/* 16-Week Phase Roadmap */}
            <h4 className="b-roadmap-title">Roadmap Kurikulum 16 Minggu:</h4>
            <div className="b-roadmap-grid">
              {currentTrackData.syllabus.map((item, idx) => (
                <div key={idx} className="b-roadmap-item">
                  <div className="b-roadmap-phase-badge">{item.phase}</div>
                  <h5 className="b-roadmap-topic">{item.topic}</h5>
                  <p className="b-roadmap-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Graduates Showcase */}
      <section className="bootcamp-alumni-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // VERIFIED ALUMNI CAREER ACCELERATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PENYALURAN</dt>
                <dd>94.2% TEPAT SASARAN</dd>
              </div>
              <div>
                <dt>KENAIKAN GAJI</dt>
                <dd>RATA-RATA 3.2X</dd>
              </div>
              <div>
                <dt>WAKTU TUNGGU</dt>
                <dd>&lt; 90 HARI</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Kisah Sukses Lulusan Bootcamp</h2>
            <p className="lp-section-subtitle">
              Transparansi lintasan karir alumni: dari latar belakang non-IT hingga berhasil menembus perusahaan teknologi dan institusi finansial terkemuka.
            </p>
          </div>

          <div className="bootcamp-alumni-grid">
            {BOOTCAMP_ALUMNI.map((alumni, idx) => (
              <div key={idx} className="b-alumni-card">
                {/* Top Profile Header */}
                <div className="b-alumni-top">
                  <div className="b-alumni-avatar-wrap">
                    <img
                      src={alumni.avatar}
                      alt={alumni.name}
                      width={52}
                      height={52}
                      className="b-alumni-avatar"
                    />
                  </div>
                  <div className="b-alumni-meta-top">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
                      <h4 className="b-alumni-name">{alumni.name}</h4>
                      <span className="b-alumni-verified-tag">
                        <FlatIcon type="check" size={11} color="#10B981" /> Verified Graduate
                      </span>
                    </div>
                    <div className="b-alumni-badges-row">
                      <span className="b-alumni-batch-tag">{alumni.badge}</span>
                      <span style={{ color: "var(--bx-text-meta)", opacity: 0.5 }}>•</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)" }}>
                        {alumni.company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Career Trajectory Box (Un-squished & Clear) */}
                <div className="b-alumni-trajectory-box">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "10px" }}>
                    <div className="b-traj-step">
                      <span className="b-traj-step-label">SEBELUM BOOTCAMP</span>
                      <span className="b-traj-step-title before">{alumni.roleBefore}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                      <span className="b-traj-arrow-icon">→</span>
                      <span className="b-traj-salary-pill">+{alumni.salaryMultiplier}</span>
                    </div>

                    <div className="b-traj-step" style={{ textAlign: "right" }}>
                      <span className="b-traj-step-label">SETELAH LULUS</span>
                      <span className="b-traj-step-title after">{alumni.roleAfter}</span>
                    </div>
                  </div>
                </div>

                {/* Capstone Project Tag */}
                <div className="b-alumni-capstone-tag">
                  <FlatIcon type="code" size={13} color="var(--gold)" />
                  <span>Proyek Capstone: <strong style={{ color: "var(--bx-ink-bright)" }}>{alumni.capstone}</strong></span>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="b-alumni-quote">
                  {alumni.story}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="daftar" className="bootcamp-reg-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // ADMISSION &amp; BATCH REGISTRATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>KUOTA KELAS</dt>
                <dd>25 SISWA / BATCH</dd>
              </div>
              <div>
                <dt>SELEKSI</dt>
                <dd>TES BAKAT &amp; INTERVIEW</dd>
              </div>
              <div>
                <dt>BATCH TERDEKAT</dt>
                <dd>15 NOVEMBER 2026</dd>
              </div>
            </dl>
          </div>

          <div className="bootcamp-reg-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">PENDAFTARAN BATCH TERBARU</span>
              <h2 className="corp-form-title">Daftar Bootcamp Sekarang</h2>
              <p className="corp-form-subtitle">
                Kuota kelas dibatasi maksimal 25 siswa per batch untuk menjamin bimbingan 1-on-1 intensif. Daftarkan diri Anda sekarang untuk mengamankan kursi dan konsultasi karir gratis.
              </p>
            </div>

            {regSubmitted ? (
              <div className="corp-form-success">
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="award" size={28} color="var(--gold)" /></div>
                <h3 className="corp-success-title">Pendaftaran Anda Berhasil Diterima!</h3>
                <p className="corp-success-desc">
                  Selamat, <strong>{regForm.fullName}</strong>! Tim konsultan karir ANVIEO akan menghubungi Anda melalui WhatsApp <strong>{regForm.phone}</strong> atau email <strong>{regForm.email}</strong> dalam waktu 1x24 jam untuk menjadwalkan tes bakat dan wawancara persiapan.
                </p>
                <button
                  type="button"
                  className="lp-btn-primary"
                  onClick={() => setRegSubmitted(false)}
                >
                  Kirim Pendaftaran Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="corp-form-grid" suppressHydrationWarning>
                <div className="corp-form-field">
                  <label>Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rizky Pratama"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Email Aktif *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Pilihan Track Bootcamp *</label>
                  <select
                    value={regForm.track}
                    onChange={(e) => setRegForm({ ...regForm, track: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="Full-Stack AI & Software Engineering">Full-Stack AI &amp; Software Engineering Bootcamp</option>
                    <option value="Data Science & Machine Learning">Data Science &amp; Machine Learning Specialist Bootcamp</option>
                    <option value="Fintech & Quantitative Trading">Fintech &amp; Quantitative Trading Bootcamp</option>
                  </select>
                </div>

                <div className="corp-form-field">
                  <label>Pilihan Gelombang / Batch *</label>
                  <select
                    value={regForm.batch}
                    onChange={(e) => setRegForm({ ...regForm, batch: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="Batch 12 (Mulai 15 November 2026)">Batch 12 — Mulai 15 November 2026 (Sisa 4 Kursi)</option>
                    <option value="Batch 13 (Mulai 10 Januari 2027)">Batch 13 — Mulai 10 Januari 2027 (Pendaftaran Dibuka)</option>
                  </select>
                </div>

                <div className="corp-form-field">
                  <label>Latar Belakang Anda Saat Ini *</label>
                  <select
                    value={regForm.background}
                    onChange={(e) => setRegForm({ ...regForm, background: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="freshgrad">Fresh Graduate / Mahasiswa Tingkat Akhir</option>
                    <option value="working-it">Bekerja di Bidang IT (Ingin Naik Level)</option>
                    <option value="career-switch">Bekerja Non-IT (Ingin Switch Career)</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <button type="submit" className="lp-btn-primary corp-submit-btn">
                    Kirim Pendaftaran &amp; Jadwalkan Konsultasi Karir Gratis →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bootcamp-faq-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // FREQUENTLY ASKED QUESTIONS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>KONSULTASI</dt>
                <dd>GRATIS 1-ON-1</dd>
              </div>
              <div>
                <dt>CICILAN</dt>
                <dd>0% HINGGA 12 BULAN</dd>
              </div>
              <div>
                <dt>BEASISWA</dt>
                <dd>TERSEDIA SELEKSI</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="lp-section-subtitle">
              Hal-hal yang sering ditanyakan calon siswa sebelum mendaftar bootcamp.
            </p>
          </div>

          <div className="subs-faq-list" style={{ maxWidth: "860px", margin: "0 auto" }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`subs-faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="subs-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="subs-faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="subs-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
