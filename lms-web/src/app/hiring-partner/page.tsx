"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface TalentRole {
  id: string;
  category: "engineering" | "ai" | "cloud" | "fintech";
  title: string;
  level: string;
  skills: string[];
  capstoneHighlights: string;
  availableCount: number;
}

const TALENT_ROLES: TalentRole[] = [
  {
    id: "fs-eng",
    category: "engineering",
    title: "Full-Stack Software Engineer",
    level: "Junior to Mid-Level",
    skills: ["TypeScript", "Next.js 16", "Python FastAPI", "PostgreSQL 16", "Redis Caching"],
    capstoneHighlights: "High-Concurrency E-Commerce & Flash Sale Service (120K QPS)",
    availableCount: 48,
  },
  {
    id: "ai-eng",
    category: "ai",
    title: "AI Engineer & Machine Learning Specialist",
    level: "Mid to Senior-Ready",
    skills: ["PyTorch", "LLM Fine-Tuning (LoRA)", "pgvector RAG", "Docker MLOps", "FastAPI"],
    capstoneHighlights: "Automated Financial News RAG & Realtime Anomaly Detection",
    availableCount: 36,
  },
  {
    id: "cloud-devops",
    category: "cloud",
    title: "Cloud DevOps & Platform Engineer",
    level: "Junior to Mid-Level",
    skills: ["Kubernetes (K8s)", "Docker Multi-stage", "Terraform IaC", "GitHub Actions CI/CD"],
    capstoneHighlights: "Zero-Downtime Blue-Green GitOps Multi-Region Infrastructure",
    availableCount: 29,
  },
  {
    id: "quant-fin",
    category: "fintech",
    title: "Fintech & Quantitative Trading Developer",
    level: "Mid-Level",
    skills: ["Python Quants", "Financial Statement DCF", "Broker Summary Scanner", "Time-Series DB"],
    capstoneHighlights: "Algorithmic Market Sentiment & High-Speed Broker Analysis Engine",
    availableCount: 22,
  },
];

const FAQ_HIRING = [
  {
    q: "Apakah ada biaya rekrutmen bagi perusahaan yang ingin menjadi Hiring Partner?",
    a: "Tidak ada biaya awal untuk bergabung menjadi Hiring Partner resmi ANVIEO Academy. Anda mendapatkan akses gratis ke portal kurasi talent pool kami, dapat melihat portofolio proyek produksi, serta mengundang kandidat untuk wawancara teknis.",
  },
  {
    q: "Apa yang membedakan lulusan ANVIEO dari kandidat bootcamp atau lulusan kampus lainnya?",
    a: "Setiap baris kode lulusan kami telah melalui audit reviewer praktisi senior dengan standar ketat (clean architecture, zero SQL injection, automated tests). Mereka tidak hanya membuat prototipe mainan, tetapi capstone berskala produksi yang live dan teruji beban.",
  },
  {
    q: "Berapa lama rata-rata proses rekrutmen hingga talenta siap onboard?",
    a: "Rata-rata hiring partner kami menyelesaikan proses seleksi hingga offering letter dalam waktu 7 hingga 14 hari kerja. Seluruh berkas portofolio GitHub, hasil uji teori, dan catatan reviewer sudah terkompilasi dalam profil kandidat.",
  },
  {
    q: "Apakah ANVIEO menyediakan program talenta kustom (Hire-Train-Deploy)?",
    a: "Ya. Melalui program Corporate Incubation, kami dapat menyaring calon siswa terbaik sesuai kualifikasi spesifik perusahaan Anda, melatih mereka dengan tech-stack internal Anda, dan menyalurkan mereka langsung begitu lulus capstone.",
  },
  {
    q: "Bagaimana mekanisme garansi penempatan dan penggantian talenta?",
    a: "Kami memberikan garansi penggantian kandidat gratis selama 90 hari pertama jika talenta yang ditempatkan terbukti tidak memenuhi KPI standar teknis yang telah disepakati.",
  },
];

export default function HiringPartnerPage() {
  const [activeTab, setActiveTab] = useState<"all" | "engineering" | "ai" | "cloud" | "fintech">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    picName: "",
    companyName: "",
    email: "",
    phone: "",
    roleNeeded: "Full-Stack Software Engineer",
    hiringCount: "1-3 Talenta",
    notes: "",
  });

  const filteredRoles = activeTab === "all" ? TALENT_ROLES : TALENT_ROLES.filter((r) => r.category === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="hiring-partner-page-wrap" style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <SiteHeader activeTabOverride="others" />

      {/* Breadcrumb Navigation */}
      <div className="lp-breadcrumb-wrap">
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Hiring Partner</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hiring-hero-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="bootcamp-hero-content">
            <div className="bootcamp-hero-tag">
              <span>TALENT PLACEMENT NETWORK • 850+ ENTERPRISE PARTNERS</span>
            </div>

            <h1 className="bootcamp-hero-title">
              Rekrut Talenta Teknologi &amp; Finansial Siap Kerja yang Terverifikasi Industri
            </h1>

            <p className="bootcamp-hero-desc">
              Akses talent pool lulusan ANVIEO Academy dengan standar kode bersih, arsitektur microservices teruji, dan bimbingan praktisi senior. Pangkas waktu rekrutmen hingga <strong>60%</strong> tanpa biaya di muka.
            </p>

            <div className="bootcamp-hero-actions">
              <a href="#daftar-partner" className="lp-btn-primary">
                <span>Daftar Menjadi Hiring Partner</span>
                <span>→</span>
              </a>
              <a href="#talent-pool" className="lp-btn-outline">
                <span>Jelajahi Spesialisasi Talenta</span>
                <span>↓</span>
              </a>
            </div>

            {/* Key Assurance Metric Stats */}
            <div className="bootcamp-key-stats">
              <div className="b-stat-box">
                <span className="b-stat-num">850+</span>
                <span className="b-stat-lbl">Perusahaan Mitra Aktif</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">&lt; 14 Hari</span>
                <span className="b-stat-lbl">Rata-rata Waktu Hiring</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">100%</span>
                <span className="b-stat-lbl">Kode Diaudit Reviewer</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">90 Hari</span>
                <span className="b-stat-lbl">Garansi Penggantian</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Why Hire ANVIEO Graduates */}
      <section className="hiring-why-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // VALUE PROPOSITION FOR EMPLOYERS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>AUDIT MUTU</dt>
                <dd>100% CODE REVIEWED</dd>
              </div>
              <div>
                <dt>ONBOARDING</dt>
                <dd>ZERO RE-TRAINING</dd>
              </div>
              <div>
                <dt>BIAYA</dt>
                <dd>0% BIAYA PENDAFTARAN</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Mengapa Rekrut Lulusan ANVIEO Academy?</h2>
            <p className="lp-section-subtitle">
              Talenta kami tidak sekadar menghafal sintaks, melainkan terbiasa bekerja dengan standar teknik dan budaya rekayasa industri tingkat lanjut.
            </p>
          </div>

          <div className="bootcamp-pillars-grid">
            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="laptop" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Arsitektur Produksi Skala Nyata</h3>
              <p className="b-pillar-desc">
                Setiap lulusan menyelesaikan capstone project nyata—seperti microservices e-commerce konkurensi tinggi dan pipeline RAG—yang di-deploy langsung di cloud.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="shield" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Clean Code &amp; Security-First</h3>
              <p className="b-pillar-desc">
                Tugas dan kode mereka dievaluasi baris-demi-baris oleh Reviewer praktisi industri dengan penekanan pada prinsip DRY, SOLID, dan standar OWASP Top 10.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="clock" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Siap Kerja Tanpa Training Ulang</h3>
              <p className="b-pillar-desc">
                Kuasai Git flow kolaboratif, container Docker, automated CI/CD pipeline, dan arsitektur database relasional modern sehingga langsung berkontribusi di sprint pertama.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="hands" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Soft Skills &amp; Business Sense</h3>
              <p className="b-pillar-desc">
                Dilatih dalam komunikasi teknis, problem breakdown, kepatuhan regulasi data (UU PDP), dan pemahaman nilai bisnis di setiap fitur yang dibangun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Talent Pool Specializations */}
      <section id="talent-pool" className="hiring-talents-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // PRE-SCREENED TALENT POOL</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>READY TALENTS</dt>
                <dd>135+ KANDIDAT AKTIF</dd>
              </div>
              <div>
                <dt>BACKGROUNDS</dt>
                <dd>TECH &amp; MULTIDISCIPLINARY</dd>
              </div>
              <div>
                <dt>INTERVIEWS</dt>
                <dd>MOCK VERIFIED</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pilihan Spesialisasi Talenta Tersedia</h2>
            <p className="lp-section-subtitle">
              Telusuri kandidat berprestasi tinggi yang siap diwawancarai sesuai kebutuhan departemen engineering dan data tim Anda.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="bootcamp-track-pills">
            <button
              type="button"
              className={`b-track-pill ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Semua Spesialisasi
            </button>
            <button
              type="button"
              className={`b-track-pill ${activeTab === "engineering" ? "active" : ""}`}
              onClick={() => setActiveTab("engineering")}
            >
              Full-Stack Engineering
            </button>
            <button
              type="button"
              className={`b-track-pill ${activeTab === "ai" ? "active" : ""}`}
              onClick={() => setActiveTab("ai")}
            >
              AI &amp; Data Science
            </button>
            <button
              type="button"
              className={`b-track-pill ${activeTab === "cloud" ? "active" : ""}`}
              onClick={() => setActiveTab("cloud")}
            >
              Cloud &amp; DevOps
            </button>
            <button
              type="button"
              className={`b-track-pill ${activeTab === "fintech" ? "active" : ""}`}
              onClick={() => setActiveTab("fintech")}
            >
              Fintech &amp; Quants
            </button>
          </div>

          <div className="sert-cards-grid">
            {filteredRoles.map((role) => (
              <div key={role.id} className="sert-card">
                <div className="sert-card-top">
                  <span className="sert-badge-pill" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                    {role.level}
                  </span>
                  <span className="sert-fee-tag" style={{ fontSize: "0.875rem", color: "#10B981" }}>
                    {role.availableCount} Talenta Siap Interview
                  </span>
                </div>

                <h3 className="sert-card-title">{role.title}</h3>
                <span className="sert-standards-meta" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <FlatIcon type="sparkle" size={12} color="var(--gold)" /> Proyek Capstone: {role.capstoneHighlights}
                </span>

                <div className="sert-skills-tags">
                  {role.skills.map((skill, i) => (
                    <span key={i} className="sert-skill-tag">
                      <FlatIcon type="check" size={11} color="#10B981" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="sert-card-footer">
                  <a href="#daftar-partner" className="lp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Minta Profil Kandidat {role.title.split(" ")[0]} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Network of 850+ Hiring Partners */}
      <section className="hiring-network-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // PROVEN INDUSTRY RECOGNITION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>ENTERPRISES</dt>
                <dd>TIER-1 BANKING &amp; UNICORNS</dd>
              </div>
              <div>
                <dt>GLOBAL TECH</dt>
                <dd>GOOGLE, AWS, MSFT ALIGNED</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header text-center">
            <h2 className="lp-section-title">Dipercaya Oleh 850+ Perusahaan Terkemuka</h2>
            <p className="lp-section-subtitle">
              Dari unicorn teknologi terdepan hingga institusi perbankan nasional, lulusan kami menjadi andalan tim engineering.
            </p>
          </div>

          <div className="corp-partners-logos" style={{ marginTop: "24px" }}>
            <div className="corp-partner-pill">Google Cloud</div>
            <div className="corp-partner-pill">Amazon Web Services</div>
            <div className="corp-partner-pill">Microsoft Azure</div>
            <div className="corp-partner-pill">Bank Central Asia</div>
            <div className="corp-partner-pill">Bank Mandiri</div>
            <div className="corp-partner-pill">Telkom Indonesia</div>
            <div className="corp-partner-pill">Tokopedia / GoTo</div>
            <div className="corp-partner-pill">Shopee Indonesia</div>
            <div className="corp-partner-pill">Traveloka</div>
            <div className="corp-partner-pill">PricewaterhouseCoopers</div>
            <div className="corp-partner-pill">Bank DBS Indonesia</div>
            <div className="corp-partner-pill">DANA Indonesia</div>
          </div>
        </div>
      </section>

      {/* Section 04: Recruitment Workflow */}
      <section className="hiring-steps-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // RECRUITMENT WORKFLOW FOR PARTNERS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PROSES</dt>
                <dd>4 LANGKAH CEPAT</dd>
              </div>
              <div>
                <dt>KURASI</dt>
                <dd>PROFIL LENGKAP &amp; GITHUB</dd>
              </div>
              <div>
                <dt>SLA</dt>
                <dd>&lt; 48 JAM PROFIL TERKIRIM</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">4 Tahap Mudah Merekrut Talenta Unggul</h2>
            <p className="lp-section-subtitle">
              Alur rekrutmen efisien yang memangkas waktu screening resume hingga tim teknis Anda dapat fokus pada kecocokan budaya kerja.
            </p>
          </div>

          <div className="sert-steps-grid">
            <div className="sert-step-card">
              <div className="sert-step-number">01</div>
              <h4 className="sert-step-title">Daftar &amp; Rinci Kebutuhan</h4>
              <p className="sert-step-desc">
                Isi formulir kebutuhan posisi talenta, kriteria tech stack perusahaan, dan target tanggal onboarding.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">02</div>
              <h4 className="sert-step-title">Penerimaan Rekomendasi</h4>
              <p className="sert-step-desc">
                Tim Talent Placement kami mengirimkan shortlist kandidat terkurasi lengkap dengan link GitHub dan transkrip review tugas.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">03</div>
              <h4 className="sert-step-title">Interview &amp; Live Coding</h4>
              <p className="sert-step-desc">
                Lakukan wawancara teknis atau user interview secara langsung dengan kandidat yang Anda pilih.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">04</div>
              <h4 className="sert-step-title">Onboarding &amp; Garansi</h4>
              <p className="sert-step-desc">
                Terbitkan offering letter dan sambut talenta baru di tim Anda dengan perlindungan garansi penggantian 90 hari.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Partner Registration Form */}
      <section id="daftar-partner" className="hiring-reg-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // HIRING PARTNER REGISTRATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>AKSES</dt>
                <dd>GRATIS KE TALENT POOL</dd>
              </div>
              <div>
                <dt>RESPONS</dt>
                <dd>&lt; 1 HARI KERJA</dd>
              </div>
            </dl>
          </div>

          <div className="bootcamp-reg-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">FORMULIR KEMITRAAN REKRUTMEN</span>
              <h2 className="corp-form-title">Daftar Menjadi Hiring Partner ANVIEO</h2>
              <p className="corp-form-subtitle">
                Bergabunglah dengan jejaring 850+ perusahaan terdepan dan dapatkan akses prioritas ke talenta teknologi berprestasi tinggi.
              </p>
            </div>

            {formSubmitted ? (
              <div className="corp-form-success">
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlatIcon type="award" size={28} color="var(--gold)" />
                </div>
                <h3 className="corp-success-title">Pendaftaran Kemitraan Berhasil Dikirim!</h3>
                <p className="corp-success-desc">
                  Terima kasih, <strong>{formData.picName}</strong> dari <strong>{formData.companyName}</strong>! Tim Talent Acquisition &amp; Placement ANVIEO akan menghubungi Anda melalui email <strong>{formData.email}</strong> atau WhatsApp <strong>{formData.phone}</strong> dalam waktu 1x24 jam dengan katalog profil talenta yang sesuai.
                </p>
                <button
                  type="button"
                  className="lp-btn-primary"
                  onClick={() => setFormSubmitted(false)}
                >
                  Kirim Permintaan Rekrutmen Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="corp-form-grid" suppressHydrationWarning>
                <div className="corp-form-field">
                  <label>Nama PIC / Recruiter / Hiring Manager *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarah Anindita"
                    value={formData.picName}
                    onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nama Perusahaan / Startup *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT FinTek Digital Indonesia"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Email Perusahaan (Work Email) *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@fintek.co.id"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nomor WhatsApp / Telepon PIC *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Spesialisasi Posisi yang Dibutuhkan *</label>
                  <select
                    value={formData.roleNeeded}
                    onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                    <option value="AI & Machine Learning Specialist">AI &amp; Machine Learning Specialist</option>
                    <option value="Cloud DevOps Engineer">Cloud DevOps Engineer</option>
                    <option value="Fintech & Quantitative Developer">Fintech &amp; Quantitative Developer</option>
                    <option value="Multiple Engineering Positions">Multi-Posisi Engineering</option>
                  </select>
                </div>

                <div className="corp-form-field">
                  <label>Estimasi Jumlah Kebutuhan Talenta *</label>
                  <select
                    value={formData.hiringCount}
                    onChange={(e) => setFormData({ ...formData, hiringCount: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="1-3 Talenta">1 - 3 Talenta</option>
                    <option value="4-10 Talenta">4 - 10 Talenta</option>
                    <option value="> 10 Talenta (Massive Hiring)">&gt; 10 Talenta (Massive Hiring Squad)</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <label>Kriteria Tambahan / Tech-Stack Khusus (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan spesifikasi framework, database, atau pengalaman khusus yang dicari..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <div className="corp-form-field full-width">
                  <button type="submit" className="lp-btn-primary corp-submit-btn">
                    Daftar Sebagai Hiring Partner &amp; Dapatkan Katalog Profil →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 06: FAQ Hiring Partner */}
      <section className="hiring-faq-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">06 // FREQUENTLY ASKED QUESTIONS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>KEMITRAAN</dt>
                <dd>ZERO COST ACCESS</dd>
              </div>
              <div>
                <dt>LEGALITAS</dt>
                <dd>MOU REKRUTMEN RESMI</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pertanyaan Seputar Kemitraan Rekrutmen</h2>
            <p className="lp-section-subtitle">
              Hal-hal yang sering ditanyakan oleh perusahaan dan tim HR sebelum memulai proses rekrutmen.
            </p>
          </div>

          <div className="subs-faq-list" style={{ maxWidth: "860px", margin: "0 auto" }}>
            {FAQ_HIRING.map((item, idx) => {
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
