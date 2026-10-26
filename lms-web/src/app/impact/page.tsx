"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface AlumniStory {
  id: string;
  name: string;
  role: string;
  company: string;
  category: string;
  image: string;
  quote: string;
  salaryMultiplier: string;
  youtubeId: string;
  details: string;
}

const ALUMNI_STORIES: AlumniStory[] = [
  {
    id: "rahmah",
    name: "RAHMAH KHOIRUSSYIFA’ NURDINI",
    role: "Digital Audit Associate",
    company: "PwC Indonesia",
    category: "Data & Digital Governance",
    image: "/alumni/alumni_1.jpg",
    quote:
      "Dari latar belakang non-IT, kurikulum terstruktur dan code review mendalam di Anvieo Academy membukakan jalan menuju divisi Digital Assurance di Big 4.",
    salaryMultiplier: "3.2x",
    youtubeId: "GmJCHZ3LTKg",
    details:
      "Lulusan Bangkit Academy yang berhasil mentransformasikan pemahaman audit konvensional menjadi otomatisasi audit berbasis kode dan AI analytics di PwC.",
  },
  {
    id: "dery",
    name: "DERY SUDRAJAT",
    role: "Android Engineer Industrial",
    company: "Bank of Korea",
    category: "Mobile Architecture & FinTech",
    image: "/alumni/alumni_2.jpg",
    quote:
      "Standarisasi kode yang diuji berulang kali saat submit submission membuat saya percaya diri bersaing di level perbankan sentral internasional di Seoul.",
    salaryMultiplier: "4.5x",
    youtubeId: "J_AkOvqzn-E",
    details:
      "Alumni yang menembus panggung global di Korea Selatan dengan spesialisasi mobile security, modular clean architecture, dan reactive programming.",
  },
  {
    id: "farhan",
    name: "FARHAN ARIFANDI",
    role: "Back-End Developer",
    company: "Bank Mandiri",
    category: "Enterprise Microservices",
    image: "/alumni/alumni_3.jpg",
    quote:
      "Pelatihan intensif cloud dan backend resilience mengajarkan saya arsitektur toleran kegagalan skala jutaan transaksi per menit.",
    salaryMultiplier: "2.8x",
    youtubeId: "oMPSVviRAck",
    details:
      "Kini bertugas membangun dan mengamankan API core perbankan digital Mandiri Livin' dengan standar high-availability 99.99%.",
  },
];

interface ProgramItem {
  id: string;
  title: string;
  organizer: string;
  tagline: string;
  badge: string;
  description: string;
  points: string[];
  image: string;
}

const FLAGSHIP_PROGRAMS: ProgramItem[] = [
  {
    id: "bangkit",
    title: "Bangkit Academy",
    organizer: "By Google, GoTo, Traveloka & Kemendikbud Ristek",
    tagline: "Career Readiness Program Nasional Terbesar",
    badge: "900+ Jam Pembelajaran",
    description:
      "Bangkit adalah program kesiapan karir kolaborasi Google, GoTo, dan Traveloka yang didukung Kemendikbud Ristek. Menghasilkan lulusan berkaliber tinggi untuk perusahaan teknologi dunia dan unicorn melalui jalur Machine Learning, Mobile Development, dan Cloud Computing.",
    points: [
      "900+ jam pelatihan teknis, soft skills, dan kemampuan bahasa Inggris industri",
      "Capstone project berbasis tantangan riil UMKM dan industri",
      "Sertifikasi global resmi: Google Associate Android Developer / Cloud Engineer / TensorFlow",
    ],
    image: "/articles/article_academic_lab.jpg",
  },
  {
    id: "dbs",
    title: "Coding Camp powered by DBS Foundation",
    organizer: "By DBS Foundation & Anvieo",
    tagline: "Inklusi Talenta Digital & Financial Literacy",
    badge: "Beasiswa Penuh",
    description:
      "Program pelatihan teknologi informasi berstandar tinggi yang menggabungkan keahlian teknis (Web & AI) dengan pelengkap esensial: soft skills, kecakapan bahasa Inggris profesional, dan literasi finansial komprehensif dari bank DBS.",
    points: [
      "Akses beasiswa 100% untuk ribuan talenta di penjuru nusantara",
      "Kurikulum terintegrasi literasi perbankan modern dan etika rekayasa data",
      "Peluang fast-track rekrutmen di grup perbankan DBS regional",
    ],
    image: "/articles/article_fin_quant.jpg",
  },
  {
    id: "aws",
    title: "AWS Cloud & Back-End Academy",
    organizer: "By Amazon Web Services (AWS)",
    tagline: "Akselerasi Infrastruktur Komputasi Awan",
    badge: "AWS Certified Track",
    description:
      "Program beasiswa pelatihan dan sertifikasi yang digagas Amazon Web Services untuk mencetak ribuan Back-End Cloud Developer siap pakai demi menyokong transformasi ekonomi digital Asia Tenggara.",
    points: [
      "Materi pembelajaran terlokalisasi dalam Bahasa Indonesia dengan lab hands-on AWS",
      "Persiapan resmi ujian AWS Certified Cloud Practitioner & Solutions Architect",
      "Diadopsi oleh ratusan startup dan korporasi pengguna infrastruktur AWS",
    ],
    image: "/articles/article_ai_fintech.jpg",
  },
  {
    id: "idcamp",
    title: "IDCamp (Indosat Ooredoo Hutchison)",
    organizer: "By Indosat Ooredoo Hutchison (IOH)",
    tagline: "Empowering Indonesia as a Digital Nation",
    badge: "384K+ Partisipan",
    description:
      "Inisiatif CSR unggulan Indosat Ooredoo Hutchison di pilar Digital Education yang telah memberdayakan lebih dari 384.000 peserta untuk mengikis kesenjangan digital dan meraih penghargaan Asian Management Excellence Awards.",
    points: [
      "Trek belajar dari level dasar pemula hingga pengembang profesional",
      "Penyaluran talenta inklusif bagi talenta disabilitas dan daerah 3T",
      "Virtual hackathon tahunan dengan pendanaan inkubasi proyek",
    ],
    image: "/articles/article_product_tech.jpg",
  },
  {
    id: "laskarai",
    title: "Laskar AI",
    organizer: "By Lintasarta & NVIDIA",
    tagline: "Mencetak Talenta AI Sovereign untuk Visi Indonesia Emas 2045",
    badge: "NVIDIA AI Compute",
    description:
      "Kolaborasi strategis Lintasarta Cloudeka, NVIDIA, dan Anvieo untuk mematangkan talenta di bidang Generative AI, Machine Learning Engineering, dan GPU Cloud Acceleration guna kemandirian teknologi nasional.",
    points: [
      "Akses infrastruktur GPU Cluster enterprise untuk pemodelan deep learning",
      "Kurikulum model bahasa besar (LLM), RAG, dan computer vision industri",
      "Mentoring langsung oleh praktisi AI dan Solution Architect NVIDIA",
    ],
    image: "/articles/article_cyber_law.jpg",
  },
  {
    id: "dts",
    title: "Digital Talent Scholarship (DTS) Kominfo",
    organizer: "By Kementerian Komunikasi dan Digital (Komdigi / Kominfo)",
    tagline: "Upskilling ASN, Fresh Graduate, & Profesional",
    badge: "FGA & PROA National Track",
    description:
      "Program pelatihan kompetensi nasional resmi pemerintah melalui Fresh Graduate Academy (FGA) dan Professional Academy (PROA) yang terintegrasi dengan lisensi Google Career Certificates (GCC).",
    points: [
      "Standarisasi kurikulum nasional SKKNI bidang Rekayasa Perangkat Lunak & AI",
      "Penyediaan sertifikasi Google Career Certificates berskala masif",
      "Kerjasama rekrutmen dengan ribuan BUMN dan instansi pemerintah",
    ],
    image: "/articles/article_academic_lab.jpg",
  },
];

export default function ImpactPage() {
  const [activeStory, setActiveStory] = useState<string>("rahmah");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string>("bangkit");
  const [activeCategory, setActiveCategory] = useState<"all" | "tech" | "corp" | "gov">("all");

  const currentStory = ALUMNI_STORIES.find((s) => s.id === activeStory) || ALUMNI_STORIES[0];

  return (
    <div className="impact-page-wrapper">
      <SiteHeader activeTabOverride="impact" />

      {/* Breadcrumb Header */}
      <div className="lp-breadcrumb-wrap" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Capaian &amp; Dampak</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="impact-hero-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="impact-hero-header">
            <div className="impact-eyebrow">
              <span className="impact-eyebrow-line"></span>
              <span className="impact-eyebrow-text">
                #1 MOST VISITED • TECH &amp; MULTIDISCIPLINARY EDUCATION PLATFORM
              </span>
            </div>
            <h1 className="impact-hero-title">
              A continuous loop of digital talents, industry, and economic growth
            </h1>
            <p className="impact-hero-subtitle">
              Membangun siklus regenerasi talenta unggul yang berdampak langsung pada akselerasi
              transformasi industri dan pertumbuhan ekonomi digital Indonesia di kancah global.
            </p>
          </div>

          {/* Metric Grid Tiles */}
          <div className="impact-stats-grid">
            <div className="impact-stat-card">
              <div className="impact-stat-number">
                1.3M<span className="impact-stat-accent">+</span>
              </div>
              <div className="impact-stat-label">Monthly platform visits</div>
              <div className="impact-stat-desc">Aktivitas kunjungan pembelajar aktif setiap bulan</div>
            </div>

            <div className="impact-stat-card">
              <div className="impact-stat-number">
                15M<span className="impact-stat-accent">+</span>
              </div>
              <div className="impact-stat-label">Monthly page views</div>
              <div className="impact-stat-desc">Interaksi modul materi, submission kode, dan forum diskusi</div>
            </div>

            <div className="impact-stat-card highlight-card">
              <div className="impact-stat-number">
                1,489,916<span className="impact-stat-accent">+</span>
              </div>
              <div className="impact-stat-label">Registered Members</div>
              <div className="impact-stat-desc">Jejaring talenta dari Sabang sampai Merauke yang terus bertumbuh</div>
            </div>

            <div className="impact-stat-card">
              <div className="impact-stat-number">
                46M<span className="impact-stat-accent">+</span>
              </div>
              <div className="impact-stat-label">Total reach to media network</div>
              <div className="impact-stat-desc">Paparan wawasan edukasi digital di jaringan media nasional</div>
            </div>
          </div>

          <div className="impact-disclaimer-note">
            * Seluruh data pencapaian dan dampak dihitung secara berkala hingga penutupan konsolidasi tahun 2024–2026 bersama mitra pemangku kepentingan nasional.
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="impact-vision-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // PLATFORM VISION &amp; MISSION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>FOCUS</dt>
                <dd>GLOBAL READINESS</dd>
              </div>
              <div>
                <dt>IMPACT</dt>
                <dd>LIFELONG CAREER</dd>
              </div>
            </dl>
          </div>

          <div className="impact-vision-hero-card">
            <div className="impact-vision-main">
              <h2 className="impact-vision-heading">
                Anvieo Academy, reputable tech and multidisciplinary education platform,{" "}
                <span className="impact-gold-highlight">nurtures globally-recognized digital talents.</span>{" "}
                We aim to harness national digital competitiveness at the world stage.
              </h2>
              <p className="impact-vision-paragraph">
                Sejak awal didirikan, Anvieo Academy berkomitmen menjadi garda terdepan pembinaan talenta digital. Kami bermitra erat dengan prinsipal teknologi global (Google, AWS, Microsoft, NVIDIA), institusi finansial, korporasi terkemuka, dan kementerian negara untuk menghadirkan inisiatif pelatihan kelas dunia. Sebagai pusat keunggulan rekayasa teknologi dan kurikulum multidisiplin, kami memastikan setiap standar pengajaran diuji dan diakui secara riil oleh pelaku industri.
              </p>
            </div>

            <div className="impact-vm-split">
              <div className="impact-vm-col vision-box">
                <div className="impact-vm-tag">VISION</div>
                <h3 className="impact-vm-title">
                  Become the leading tech education platform by driving greater access to digital literacy for everyone.
                </h3>
                <p className="impact-vm-desc">
                  Membuka akses seluas-luasnya terhadap literasi rekayasa perangkat lunak, AI, dan keahlian terapan tanpa hambatan geografis maupun latar belakang sosial ekonomi.
                </p>
              </div>

              <div className="impact-vm-col mission-box">
                <div className="impact-vm-tag">MISSION</div>
                <h3 className="impact-vm-title">
                  Accelerate national transition to a digital world through life-transforming tech education.
                </h3>
                <p className="impact-vm-desc">
                  Mengakselerasi lompatan ekonomi digital melalui edukasi yang mentransformasi kehidupan lulusan dari pembelajar pemula menjadi profesional berdaya saing global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars: What Makes Us Different */}
      <section className="impact-pillars-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // CORE DIFFERENTIATORS &amp; PILLARS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>CURRICULUM</dt>
                <dd>IEEE / NIST ALIGNED</dd>
              </div>
              <div>
                <dt>REVIEW SLA</dt>
                <dd>&lt; 12 JAM GUARANTEED</dd>
              </div>
              <div>
                <dt>HIRING PARTNERS</dt>
                <dd>850+ COMPANIES</dd>
              </div>
            </dl>
          </div>

          <div className="impact-section-header text-center">
            <div className="impact-subbadge">WHY WE ARE DIFFERENT</div>
            <h2 className="impact-section-title">
              What Makes Us <span className="impact-gold-highlight">Different?</span>
            </h2>
            <p className="impact-section-desc">
              Empat fondasi utama yang membedakan kualitas lulusan Anvieo Academy dari sekadar kursus teori online biasa.
            </p>
          </div>

          <div className="impact-pillars-grid">
            {/* Pillar 1 */}
            <div className="impact-pillar-card">
              <div className="impact-pillar-icon globe-icon">
                <FlatIcon type="globe" size={28} color="var(--gold)" />
              </div>
              <h3 className="impact-pillar-title">Global-standard curriculum</h3>
              <p className="impact-pillar-text">
                Kurikulum berstandar internasional yang dirancang langsung bersama tech leaders dunia (Google, AWS, Microsoft) dengan lebih dari <strong>160+ modul kelas</strong> dan <strong>10 learning paths</strong> komprehensif.
              </p>
              <div className="impact-pillar-footer">
                <span className="impact-badge-tiny">IEEE &amp; NIST Aligned</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="impact-pillar-card">
              <div className="impact-pillar-icon book-icon">
                <FlatIcon type="book" size={28} color="var(--gold)" />
              </div>
              <h3 className="impact-pillar-title">From self-paced to intensive learning</h3>
              <p className="impact-pillar-text">
                Fleksibilitas belajar mandiri kapan saja di mana saja, yang dapat ditingkatkan ke format bootcamp intensif sinkronus dengan bimbingan instruktur profesional bersertifikasi global.
              </p>
              <div className="impact-pillar-footer">
                <span className="impact-badge-tiny">100% Flexible Schedule</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="impact-pillar-card">
              <div className="impact-pillar-icon code-icon">
                <FlatIcon type="laptop" size={28} color="var(--gold)" />
              </div>
              <h3 className="impact-pillar-title">Code review by expert developers</h3>
              <p className="impact-pillar-text">
                Lebih dari <strong>2.500+ reviewer profesional</strong> dari industri teknologi aktif memeriksa submission baris demi baris, memberikan feedback arsitektur, clean code, dan audit keamanan dalam &lt; 12 jam.
              </p>
              <div className="impact-pillar-footer">
                <span className="impact-badge-tiny">Human Review SLA &lt; 12h</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="impact-pillar-card">
              <div className="impact-pillar-icon users-icon">
                <FlatIcon type="hands" size={28} color="var(--gold)" />
              </div>
              <h3 className="impact-pillar-title">Alumni recognized by industry</h3>
              <p className="impact-pillar-text">
                Lulusan Anvieo Academy diakui oleh 850+ hiring partner. Mereka membekali diri dengan sertifikasi kompetensi resmi serta portofolio proyek industri yang terbukti memecahkan masalah nyata.
              </p>
              <div className="impact-pillar-footer">
                <span className="impact-badge-tiny">850+ Hiring Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Placement & Recognition Network */}
      <section className="impact-alumni-network-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // ALUMNI PLACEMENT &amp; RECOGNITION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>ALUMNI</dt>
                <dd>190K+ PROFESSIONALS</dd>
              </div>
              <div>
                <dt>PRESENCE</dt>
                <dd>10+ COUNTRIES</dd>
              </div>
              <div>
                <dt>SECTORS</dt>
                <dd>TECH, FINTECH &amp; GOV</dd>
              </div>
            </dl>
          </div>

          <div className="impact-alumni-header-box">
            <h2 className="impact-alumni-main-title">
              Over <span className="impact-gold-highlight font-weight-700">190K</span> alumni pursue their career as tech professionals, ranging from entry to leadership level.
            </h2>
            <p className="impact-alumni-sub">
              Lulusan akademi kami dipercaya memimpin transformasi rekayasa perangkat lunak di berbagai korporasi multinasional, perbankan tier-1, lembaga konsultasi global, hingga kementerian negara.
            </p>
          </div>

          <div className="impact-alumni-groups-grid">
            {/* Group 1: Tech */}
            <div className="impact-company-group-card">
              <div className="impact-group-label">TOP TECH COMPANIES</div>
              <ul className="impact-company-list">
                <li>Google</li>
                <li>Amazon Web Services (AWS)</li>
                <li>Microsoft</li>
                <li>Meta</li>
                <li>Alibaba Cloud</li>
                <li>ByteDance</li>
                <li>Gojek &amp; GoTo Financial</li>
                <li>Grab</li>
                <li>Shopee</li>
                <li>Tokopedia</li>
                <li>Traveloka</li>
              </ul>
            </div>

            {/* Group 2: Indonesian Leaders */}
            <div className="impact-company-group-card">
              <div className="impact-group-label">TOP ENTERPRISE &amp; FINTECH</div>
              <ul className="impact-company-list">
                <li>Bank Central Asia (BCA)</li>
                <li>Bank Mandiri</li>
                <li>Bank DBS Indonesia</li>
                <li>Bank Syariah Indonesia (BSI)</li>
                <li>Bank Indonesia (BI)</li>
                <li>Telkom Indonesia</li>
                <li>Astra International</li>
                <li>Pertamina</li>
                <li>Bursa Efek Indonesia (IDX)</li>
                <li>Indosat Ooredoo Hutchison</li>
                <li>Kalbe Farma &amp; Bio Farma</li>
              </ul>
            </div>

            {/* Group 3: Consulting */}
            <div className="impact-company-group-card">
              <div className="impact-group-label">TIER-1 CONSULTING FIRMS</div>
              <ul className="impact-company-list">
                <li>PricewaterhouseCoopers (PwC)</li>
                <li>Deloitte</li>
                <li>Ernst &amp; Young (EY)</li>
                <li>KPMG</li>
                <li>Accenture</li>
                <li>Boston Consulting Group (BCG)</li>
                <li>McKinsey &amp; Company</li>
              </ul>
            </div>

            {/* Group 4: Government & Countries */}
            <div className="impact-company-group-card highlight-group">
              <div className="impact-group-label">GOVERNMENT &amp; PUBLIC SECTOR</div>
              <ul className="impact-company-list mb-4">
                <li>Kementerian Komunikasi dan Digital (Komdigi)</li>
                <li>Kementerian Keuangan RI</li>
                <li>Kementerian Pertahanan RI</li>
                <li>Kementerian Kelautan &amp; Perikanan</li>
                <li>Kemendikbud Ristek / Dikti</li>
              </ul>

              <div className="impact-group-label mt-4">GLOBAL PRESENCE (10+ COUNTRIES)</div>
              <div className="impact-country-tags">
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> ID • Indonesia</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> SG • Singapore</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> MY • Malaysia</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> JP • Japan</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> KR • South Korea</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> AU • Australia</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> GB • United Kingdom</span>
                <span className="country-chip"><FlatIcon type="globe" size={12} color="var(--gold)" /> US • United States</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Stories Showcase */}
      <section className="impact-stories-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // VERIFIED ALUMNI CASE HISTORIES</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>AUDIT</dt>
                <dd>VERIFIED CAREER MULTIPLIER</dd>
              </div>
              <div>
                <dt>STORIES</dt>
                <dd>MULTIDISCIPLINARY OUTCOMES</dd>
              </div>
            </dl>
          </div>

          <div className="impact-section-header">
            <div className="impact-subbadge">REAL CAREER TRANSFORMATIONS</div>
            <h2 className="impact-section-title">
              Turning Dreams into Achievements: <span className="impact-gold-highlight">Inspiring Alumni Stories</span>
            </h2>
            <p className="impact-section-desc">
              Simak bagaimana para alumni melipatgandakan jenjang karir mereka setelah menyelesaikan program kurikulum standar industri.
            </p>
          </div>

          <div className="impact-stories-interactive">
            {/* Story Tabs / Picker */}
            <div className="impact-stories-cards-row">
              {ALUMNI_STORIES.map((s) => (
                <div
                  key={s.id}
                  className={`impact-story-thumb-card ${activeStory === s.id ? "active" : ""}`}
                  onClick={() => setActiveStory(s.id)}
                >
                  <div className="story-thumb-img-wrap">
                    <img src={s.image} alt={s.name} />
                  </div>
                  <div className="story-thumb-meta">
                    <span className="story-category-tag">{s.category}</span>
                    <h4 className="story-thumb-name">{s.name}</h4>
                    <p className="story-thumb-role">{s.role} at {s.company}</p>
                    <span className="story-thumb-multiplier">Gaji {s.salaryMultiplier}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Story Featured Box */}
            <div className="impact-active-story-card">
              <div className="active-story-left">
                <span className="active-story-tag">{currentStory.category}</span>
                <h3 className="active-story-name">{currentStory.name}</h3>
                <h4 className="active-story-position">{currentStory.role} — <strong>{currentStory.company}</strong></h4>
                
                <div className="active-story-multiplier-chip">
                  <span>Peningkatan Gaji Lulusan:</span>
                  <strong>{currentStory.salaryMultiplier}</strong>
                </div>

                <blockquote className="active-story-quote">
                  {currentStory.quote}
                </blockquote>

                <p className="active-story-details">
                  {currentStory.details}
                </p>

                <div className="active-story-actions">
                  <button
                    type="button"
                    className="impact-watch-video-btn"
                    onClick={() => setSelectedVideoUrl(currentStory.youtubeId)}
                  >
                    <FlatIcon type="video" size={16} />
                    <span>Tonton Video Wawancara Alumni</span>
                  </button>
                </div>
              </div>

              <div className="active-story-right">
                <div className="active-story-poster-wrap">
                  <img src={currentStory.image} alt={currentStory.name} />
                  <div
                    className="active-story-play-overlay"
                    onClick={() => setSelectedVideoUrl(currentStory.youtubeId)}
                  >
                    <div className="play-button-circle">▶</div>
                    <span>Tonton Cerita ({currentStory.name.split(" ")[0]})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Impact Section */}
      <section className="impact-economic-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // QUANTIFIABLE ECONOMIC VALUE</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>CUMULATIVE VALUE</dt>
                <dd>IDR 5.4 TRILLION</dd>
              </div>
              <div>
                <dt>BENEFICIARIES</dt>
                <dd>850K+ TALENTS</dd>
              </div>
              <div>
                <dt>CERTIFIED</dt>
                <dd>238K+ GRADUATES</dd>
              </div>
            </dl>
          </div>

          <div className="impact-economic-card">
            <div className="impact-economic-intro">
              <div className="impact-subbadge-light">MEASURABLE VALUE ADDED</div>
              <h2 className="impact-economic-title">
                Over <span className="impact-gold-bright">IDR 5.4 Trillion</span> / <span className="impact-gold-bright">USD 332 Million</span>
              </h2>
              <h3 className="impact-economic-subtitle">
                Cumulative Economic Impact Created Across Indonesia&apos;s Digital Economy*
              </h3>
              <p className="impact-economic-notes">
                * Dampak ekonomi dihitung secara kuantitatif berdasarkan kenaikan nilai gaji kumulatif lulusan, nilai tambah efisiensi produk capstone pada industri mitra, serta standar formula evaluasi dampak sosial-ekonomi yang disepakati bersama pemangku kepentingan program.
              </p>
            </div>

            <div className="impact-economic-metrics-row">
              <div className="impact-econ-metric">
                <div className="econ-val">58</div>
                <div className="econ-label">Strategic Programs</div>
                <div className="econ-sub">Inisiatif beasiswa nasional terlaksana</div>
              </div>

              <div className="impact-econ-metric">
                <div className="econ-val">850K<span>+</span></div>
                <div className="econ-label">Beneficiaries</div>
                <div className="econ-sub">Penerima manfaat langsung pelatihan</div>
              </div>

              <div className="impact-econ-metric">
                <div className="econ-val">238K<span>+</span></div>
                <div className="econ-label">Certified Graduates</div>
                <div className="econ-sub">Lulusan terverifikasi standar industri</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Programs Showcase */}
      <section className="impact-programs-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">06 // COLLABORATIVE NATIONAL PROGRAMS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>INITIATIVES</dt>
                <dd>BANGKIT, DBS, IDCamp</dd>
              </div>
              <div>
                <dt>SPONSORS</dt>
                <dd>GOOGLE, AWS, TELKOM</dd>
              </div>
            </dl>
          </div>

          <div className="impact-section-header text-center">
            <div className="impact-subbadge">COLLABORATIVE INITIATIVES</div>
            <h2 className="impact-section-title">
              Flagship Programs &amp; <span className="impact-gold-highlight">National Inceptions</span>
            </h2>
            <p className="impact-section-desc">
              Program-program berskala nasional yang didesain bersama industri dan kementerian untuk menyiapkan talenta digital siap kerja.
            </p>
          </div>

          <div className="impact-programs-accordion">
            {FLAGSHIP_PROGRAMS.map((prog) => {
              const isOpen = expandedProgram === prog.id;
              return (
                <div
                  key={prog.id}
                  className={`impact-program-item ${isOpen ? "open" : ""}`}
                >
                  <div
                    className="impact-program-header"
                    onClick={() => setExpandedProgram(isOpen ? "" : prog.id)}
                  >
                    <div className="impact-program-title-col">
                      <div className="impact-program-badge-line">
                        <span className="impact-prog-badge">{prog.badge}</span>
                        <span className="impact-prog-organizer">{prog.organizer}</span>
                      </div>
                      <h3 className="impact-prog-title">{prog.title}</h3>
                    </div>

                    <div className="impact-program-toggle-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="impact-program-body">
                      <div className="impact-program-content-grid">
                        <div className="impact-program-text-side">
                          <p className="impact-prog-lead">{prog.description}</p>
                          <ul className="impact-prog-points">
                            {prog.points.map((pt, idx) => (
                              <li key={idx}>
                                <FlatIcon type="check" size={14} color="var(--gold)" style={{ marginRight: "8px", flexShrink: 0 }} />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="impact-program-media-side">
                          <img src={prog.image} alt={prog.title} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Partners Logos */}
      <section className="impact-partners-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">07 // ECOSYSTEM STRATEGIC PARTNERS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PARTNERS</dt>
                <dd>GLOBAL CLOUD &amp; BANKING</dd>
              </div>
              <div>
                <dt>ACCREDITATION</dt>
                <dd>NATIONWIDE RECOGNIZED</dd>
              </div>
            </dl>
          </div>

          <div className="impact-section-header text-center">
            <div className="impact-subbadge">OUR ECOSYSTEM PARTNERS</div>
            <h2 className="impact-section-title">
              Built Upon Robust Relationship With <span className="impact-gold-highlight">Key Stakeholders</span>
            </h2>
            <p className="impact-section-desc">
              Kolaborasi strategis berkelanjutan dengan prinsipal teknologi global, unicorn, perbankan, dan pemerintah.
            </p>
          </div>

          <div className="impact-partners-grid">
            <div className="partner-logo-tile">Google Cloud</div>
            <div className="partner-logo-tile">Amazon Web Services</div>
            <div className="partner-logo-tile">Microsoft Azure</div>
            <div className="partner-logo-tile">IBM Indonesia</div>
            <div className="partner-logo-tile">NVIDIA Inception</div>
            <div className="partner-logo-tile">Bank Central Asia</div>
            <div className="partner-logo-tile">Bank Mandiri</div>
            <div className="partner-logo-tile">Telkom Indonesia</div>
            <div className="partner-logo-tile">DBS Foundation</div>
            <div className="partner-logo-tile">Lintasarta Cloudeka</div>
            <div className="partner-logo-tile">Indosat Ooredoo Hutchison</div>
            <div className="partner-logo-tile">Kominfo / Komdigi</div>
          </div>
        </div>
      </section>

      {/* Downloadable Annual Impact Report Section */}
      <section className="impact-download-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">08 // OFFICIAL IMPACT REPORT DOWNLOAD</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>FORMAT</dt>
                <dd>PDF DOSSIER 48 PAGES</dd>
              </div>
              <div>
                <dt>STATUS</dt>
                <dd>PUBLIC AUDIT ACCESS</dd>
              </div>
            </dl>
          </div>

          <div className="impact-download-card">
            <div className="impact-download-left">
              <div className="impact-subbadge-light">OFFICIAL ANNUAL REPORT</div>
              <h2 className="impact-download-title">
                Discover Who We Are and How We Empower Indonesia’s Digital Talents
              </h2>
              <p className="impact-download-desc">
                Pelajari metodologi pengukuran dampak, rekam jejak capaian kemitraan industri, serta laporan komprehensif profil perusahaan dalam dokumen resmi Anvieo Academy.
              </p>
              <div className="impact-download-actions">
                <a
                  href="/ANVIEO Company Profile - 2026.pdf"
                  className="impact-download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <FlatIcon type="document" size={18} color="#0A2E52" />
                  <span>Download Impact Report &amp; Company Profile (PDF)</span>
                </a>
                <Link href="/corporate-training#form" className="impact-consult-btn">
                  Konsultasi Program Kemitraan
                </Link>
              </div>
            </div>

            <div className="impact-download-right">
              <div className="impact-doc-preview-mockup">
                <div className="impact-doc-badge">ANNUAL REPORT</div>
                <div className="impact-doc-title">ANVIEO IMPACT DOSSIER</div>
                <div className="impact-doc-meta">2024–2026 EDITION • 48 PAGES</div>
                <div className="impact-doc-lines">
                  <span className="doc-line w-80"></span>
                  <span className="doc-line w-100"></span>
                  <span className="doc-line w-60"></span>
                  <span className="doc-line w-90"></span>
                </div>
                <div className="impact-doc-stamp">VERIFIED BY INDUSTRY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideoUrl && (
        <div className="blackbox-modal-backdrop" onClick={() => setSelectedVideoUrl(null)}>
          <div className="impact-video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setSelectedVideoUrl(null)}
              aria-label="Tutup video"
            >
              ×
            </button>
            <div className="impact-iframe-aspect-ratio">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoUrl}?autoplay=1&rel=0`}
                title="Wawancara Kisah Sukses Alumni Anvieo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
