"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface CsrProgram {
  id: string;
  title: string;
  partner: string;
  scope: string;
  badge: string;
  beneficiaries: string;
  desc: string;
  focusAreas: string[];
}

const CSR_PROGRAMS: CsrProgram[] = [
  {
    id: "bangkit",
    title: "Bangkit Academy: Tech Career Readiness",
    partner: "Google, GoTo, Traveloka & Kemendikbud Ristek",
    scope: "Nasional (Seluruh PTN/PTS Indonesia)",
    badge: "900+ Jam Pembelajaran",
    beneficiaries: "30.000+ Mahasiswa Kampus Merdeka",
    desc: "Program akselerasi talenta digital berbasis beasiswa penuh yang membekali mahasiswa dengan sertifikasi global Google di jalur Machine Learning, Mobile Development, dan Cloud Computing.",
    focusAreas: ["Sertifikasi Google Associate & TensorFlow", "Proyek Capstone Berdampak UMKM", "Career Mentoring & Soft Skills"],
  },
  {
    id: "dbs",
    title: "Coding Camp powered by DBS Foundation",
    partner: "DBS Foundation Indonesia",
    scope: "Nasional & Komunitas Inklusif",
    badge: "Beasiswa Penuh 100%",
    beneficiaries: "50.000+ Penerima Beasiswa",
    desc: "Inisiatif literasi teknologi dan inklusi finansial untuk melatih generasi muda menguasai coding web modern, machine learning, dan manajemen keuangan pribadi yang sehat.",
    focusAreas: ["Inklusi Talenta Daerah Non-Metropolitan", "Kurikulum Finansial Terintegrasi", "Fast-Track Rekrutmen Sektor FinTek"],
  },
  {
    id: "idcamp",
    title: "IDCamp: Empowering Digital Nation",
    partner: "Indosat Ooredoo Hutchison",
    scope: "Inklusif Sabang sampai Merauke",
    badge: "Pemenang Asian Management Excellence",
    beneficiaries: "384.000+ Peserta Terdaftar",
    desc: "Program CSR unggulan pilar Digital Education yang membuka akses materi pemrograman berstandar global bagi talenta disabilitas, santri, dan pemuda di wilayah 3T.",
    focusAreas: ["Akses Belajar Ramah Disabilitas (Screen Reader)", "Hackathon Tahunan Solusi Sosial", "Inkubasi Pendanaan Startup Awal"],
  },
  {
    id: "laskarai",
    title: "Laskar AI: Sovereign AI Acceleration",
    partner: "Lintasarta Cloudeka & NVIDIA",
    scope: "Nasional untuk Peneliti & Developer Muda",
    badge: "NVIDIA Compute Support",
    beneficiaries: "10.000+ Talenta AI",
    desc: "Pemberdayaan kedaulatan kecerdasan buatan nasional dengan memberikan akses komputasi GPU enterprise cluster NVIDIA untuk melatih model bahasa dan computer vision lokal.",
    focusAreas: ["Akses Server GPU Cluster Lintasarta", "Model Bahasa Berbasis Budaya Indonesia", "Pelatihan Generative AI Etis"],
  },
];

const CSR_STORIES = [
  {
    name: "Rizky Firmansyah",
    origin: "Ternate, Maluku Utara",
    roleNow: "Junior Cloud Engineer di Perusahaan Telekomunikasi",
    story: "“Di daerah saya, akses fasilitas lab komputer sangat terbatas. Beasiswa penuh ini memberikan akses cloud lab nyata dan review tugas baris-demi-baris yang mengubah hidup saya.”",
    program: "IDCamp Graduate",
  },
  {
    name: "Siti Rahmawati",
    origin: "Banyumas, Jawa Tengah",
    roleNow: "Data Analyst di FinTech Payment Gateway",
    story: "“Saya awalnya lulusan ilmu sosial tanpa background programming. Berkat mentoring intensif dan modul ramah pemula, saya bisa membuktikan bahwa perempuan desa bisa berkarir di data science.”",
    program: "DBS Foundation Coding Camp",
  },
  {
    name: "Ahmad Junaidi",
    origin: "Lombok Timur, NTB",
    roleNow: "Machine Learning Engineer di Startup Agrotech",
    story: "“Capstone proyek Bangkit membawa tim saya menciptakan aplikasi deteksi penyakit daun tembakau berbasis AI yang kini dipakai ratusan petani lokal di desa kami.”",
    program: "Bangkit Academy Graduate",
  },
];

const FAQ_CSR = [
  {
    q: "Bagaimana institusi atau perusahaan kami dapat berkolaborasi dalam program CSR dengan ANVIEO?",
    a: "Perusahaan Anda dapat bermitra sebagai sponsor beasiswa penuh, penyedia challenge capstone industri, atau mitra penyerap kerja lulusan. Tim CSR & Ecosystem Partnership kami akan merancang kurikulum dan mekanisme program sesuai fokus ESG (Environmental, Social, and Governance) perusahaan Anda.",
  },
  {
    q: "Apakah program beasiswa CSR ANVIEO dapat ditargetkan ke demografi atau wilayah spesifik?",
    a: "Bisa. Kami memiliki sistem seleksi berbasis kuota demografi—misalnya fokus pada talenta daerah 3T (Tertinggal, Terdepan, Terluar), pemberdayaan perempuan di teknologi (Women in Tech), mahasiswa universitas luar pulau Jawa, maupun penyandang disabilitas.",
  },
  {
    q: "Bagaimana transparansi pelaporan dan pengukuran dampak program (Social ROI)?",
    a: "Setiap mitra sponsor mendapatkan akses ke Dashboard Monitoring CSR Realtime. Di akhir program, kami menyusun Comprehensive Impact Dossier berisi metrik kelulusan, penyerapan kerja, sertifikasi terbit, dan formula Social Return on Investment (SROI) terverifikasi.",
  },
  {
    q: "Apakah ANVIEO memfasilitasi legalitas dan publikasi media atas program CSR bersama?",
    a: "Ya. Kami menyiapkan Perjanjian Kerjasama (PKS) resmi, dokumentasi foto/video wawancara penerima beasiswa, serta konferensi pers peluncuran program yang didistribusikan ke jaringan media nasional terkemuka.",
  },
];

export default function CsrPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [csrSubmitted, setCsrSubmitted] = useState(false);
  const [csrForm, setCsrForm] = useState({
    picName: "",
    orgName: "",
    email: "",
    phone: "",
    programType: "Beasiswa Penuh Talenta Digital Nasional",
    targetBeneficiaries: "100 - 500 Siswa",
    notes: "",
  });

  const handleCsrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCsrSubmitted(true);
  };

  return (
    <div className="csr-page-wrap">
      <SiteHeader activeTabOverride="others" />

      {/* Breadcrumb Navigation */}
      <div className="lp-breadcrumb-wrap" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Corporate Social Relationship</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="csr-hero-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="bootcamp-hero-content">
            <div className="bootcamp-hero-tag">
              <span>CSR &amp; DIGITAL INCLUSION • DEMOCRATIZING TECH EDUCATION</span>
            </div>

            <h1 className="bootcamp-hero-title">
              Pemberdayaan Talenta Digital Inklusif &amp; Kemitraan Sosial Berkelanjutan
            </h1>

            <p className="bootcamp-hero-desc">
              Membuka gerbang pemerataan literasi teknologi, beasiswa komputasi awan dan AI bagi ratusan ribu talenta muda di seluruh pelosok nusantara bersama institusi global, korporasi terkemuka, dan kementerian negara.
            </p>

            <div className="bootcamp-hero-actions">
              <a href="#ajukan-csr" className="lp-btn-primary">
                <span>Inisiasi Program Kemitraan CSR</span>
                <span>→</span>
              </a>
              <a href="#programs-csr" className="lp-btn-outline">
                <span>Lihat Program Kolaborasi</span>
                <span>↓</span>
              </a>
            </div>

            {/* Impact Metric Row */}
            <div className="bootcamp-key-stats">
              <div className="b-stat-box">
                <span className="b-stat-num">850K+</span>
                <span className="b-stat-lbl">Penerima Manfaat Beasiswa</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">34 Provinsi</span>
                <span className="b-stat-lbl">Jangkauan Sabang - Merauke</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">Rp5.4 T</span>
                <span className="b-stat-lbl">Nilai Tambah Ekonomi Sosial</span>
              </div>
              <div className="b-stat-sep" />
              <div className="b-stat-box">
                <span className="b-stat-num">100%</span>
                <span className="b-stat-lbl">Beasiswa Tanpa Pungutan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: CSR Core Pillars */}
      <section className="csr-pillars-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // CSR MISSION &amp; STRATEGIC PILLARS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PILAR ESG</dt>
                <dd>SOSIAL &amp; DIGITAL ETHICS</dd>
              </div>
              <div>
                <dt>TARGET</dt>
                <dd>INKLUSI NASIONAL</dd>
              </div>
              <div>
                <dt>STANDAR</dt>
                <dd>GLOBAL CURRICULUM</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">4 Pilar Inisiatif Dampak Sosial ANVIEO</h2>
            <p className="lp-section-subtitle">
              Setiap inisiatif dirancang dengan indikator capaian terukur demi mewujudkan pemerataan ekonomi digital berkeadilan sosial.
            </p>
          </div>

          <div className="bootcamp-pillars-grid">
            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="globe" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Pendidikan Inklusif Daerah 3T</h3>
              <p className="b-pillar-desc">
                Menyediakan materi pembelajaran yang dapat diakses dalam kondisi bandwidth rendah dan beasiswa penuh bagi siswa di daerah tertinggal, terdepan, dan terluar.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="hands" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Akselerasi Women in Tech</h3>
              <p className="b-pillar-desc">
                Mendorong keterwakilan perempuan di bidang rekayasa teknologi dan data science melalui mentoring eksklusif bersama female engineering leader industri.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="shield" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Dukungan Talenta Disabilitas</h3>
              <p className="b-pillar-desc">
                Platform pembelajaran kami terstandarisasi ramah screen reader dan subtitling lengkap agar rekan disabilitas memiliki hak belajar pemrograman yang setara.
              </p>
            </div>

            <div className="b-pillar-card">
              <div className="b-pillar-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="sparkle" size={24} color="var(--gold)" />
              </div>
              <h3 className="b-pillar-title">Inovasi Digital untuk UMKM</h3>
              <p className="b-pillar-desc">
                Tugas akhir capstone siswa diarahkan untuk membangun sistem otomasi nyata yang disumbangkan langsung ke ratusan pelaku UMKM lokal secara cuma-cuma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Flagship CSR Collaborations */}
      <section id="programs-csr" className="csr-programs-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // STRATEGIC COLLABORATIVE INITIATIVES</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PROGRAM</dt>
                <dd>KAMPUS MERDEKA &amp; CSR</dd>
              </div>
              <div>
                <dt>MITRA UTAMA</dt>
                <dd>GOOGLE, DBS, INDOSAT, NVIDIA</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Program Beasiswa Kolaborasi Skala Nasional</h2>
            <p className="lp-section-subtitle">
              Sinergi multipihak antara industri teknologi terkemuka dan ANVIEO Academy dalam mengorkestrasi program pelatihan berskala masif.
            </p>
          </div>

          <div className="sert-cards-grid">
            {CSR_PROGRAMS.map((prog) => (
              <div key={prog.id} className="sert-card">
                <div className="sert-card-top">
                  <span className="sert-badge-pill" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                    {prog.badge}
                  </span>
                  <span className="sert-fee-tag" style={{ fontSize: "0.8125rem", color: "#10B981" }}>
                    {prog.beneficiaries}
                  </span>
                </div>

                <h3 className="sert-card-title">{prog.title}</h3>
                <span className="sert-standards-meta" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <FlatIcon type="company" size={13} color="var(--gold)" /> Mitra: {prog.partner}
                </span>

                <p className="sert-card-desc">{prog.desc}</p>

                <div className="sert-skills-tags">
                  {prog.focusAreas.map((area, i) => (
                    <span key={i} className="sert-skill-tag">
                      <FlatIcon type="check" size={11} color="#10B981" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />
                      {area}
                    </span>
                  ))}
                </div>

                <div className="sert-card-footer">
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--bx-ink-faint)" }}>
                    Cakupan: {prog.scope}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Beneficiaries Stories */}
      <section className="csr-stories-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // INSPIRING BENEFICIARY OUTCOMES</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>TRANSFORMASI</dt>
                <dd>NON-IT TO TECH CAREER</dd>
              </div>
              <div>
                <dt>VERIFIKASI</dt>
                <dd>ALUMNI TESTIMONIALS</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header text-center">
            <h2 className="lp-section-title">Kisah Nyata Penerima Manfaat Beasiswa</h2>
            <p className="lp-section-subtitle">
              Dari wilayah pelosok nusantara hingga berhasil menjadi tulang punggung rekayasa teknologi di panggung nasional.
            </p>
          </div>

          <div className="bootcamp-alumni-grid">
            {CSR_STORIES.map((story, idx) => (
              <div key={idx} className="b-alumni-card">
                <div className="b-alumni-top">
                  <div className="b-alumni-avatar-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,150,46,0.12)", color: "var(--gold)", fontWeight: 800, fontSize: "1.1rem" }}>
                    {story.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="b-alumni-meta-top">
                    <h4 className="b-alumni-name">{story.name}</h4>
                    <div className="b-alumni-badges-row">
                      <span className="b-alumni-badge">{story.program}</span>
                      <small style={{ color: "var(--bx-ink-faint)", fontSize: "0.75rem" }}>{story.origin}</small>
                    </div>
                  </div>
                </div>

                <div className="b-alumni-trajectory-box">
                  <div className="b-traj-step">
                    <span className="b-traj-step-label">POSISI KARIR SAAT INI</span>
                    <span className="b-traj-step-title after" style={{ color: "var(--bx-ink-bright)", fontWeight: 700 }}>
                      {story.roleNow}
                    </span>
                  </div>
                </div>

                <p className="b-alumni-quote">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: CSR Proposal Submission Form */}
      <section id="ajukan-csr" className="csr-form-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // INITIATE CSR PARTNERSHIP</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>KONSULTASI</dt>
                <dd>FREE PROGRAM SCOPING</dd>
              </div>
              <div>
                <dt>PELAPORAN</dt>
                <dd>SROI &amp; ESG COMPLIANT</dd>
              </div>
            </dl>
          </div>

          <div className="bootcamp-reg-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">KONSULTASI KEMITRAAN SOSIAL</span>
              <h2 className="corp-form-title">Inisiasi Program CSR Bersama ANVIEO</h2>
              <p className="corp-form-subtitle">
                Diskusikan program beasiswa atau inisiatif dampak sosial institusi Anda dengan tim kemitraan kami untuk merumuskan kurikulum, target kuota siswa, dan pelaporan dampak terukur.
              </p>
            </div>

            {csrSubmitted ? (
              <div className="corp-form-success">
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlatIcon type="award" size={28} color="var(--gold)" />
                </div>
                <h3 className="corp-success-title">Proposal Kemitraan CSR Berhasil Dikirim!</h3>
                <p className="corp-success-desc">
                  Terima kasih, <strong>{csrForm.picName}</strong> dari <strong>{csrForm.orgName}</strong>! Tim CSR &amp; Strategic Partnership ANVIEO akan menghubungi Anda melalui email <strong>{csrForm.email}</strong> atau WhatsApp <strong>{csrForm.phone}</strong> dalam waktu 1x24 jam kerja untuk menyusun kerangka acuan kerja (TOR) dan rencana anggaran biaya program.
                </p>
                <button
                  type="button"
                  className="lp-btn-primary"
                  onClick={() => setCsrSubmitted(false)}
                >
                  Kirim Pengajuan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleCsrSubmit} className="corp-form-grid" suppressHydrationWarning>
                <div className="corp-form-field">
                  <label>Nama Lengkap PIC Program *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Wicaksono"
                    value={csrForm.picName}
                    onChange={(e) => setCsrForm({ ...csrForm, picName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nama Korporasi / Yayasan / Institusi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Semen Nusantara Tbk (CSR Division)"
                    value={csrForm.orgName}
                    onChange={(e) => setCsrForm({ ...csrForm, orgName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Email Resmi Institusi *</label>
                  <input
                    type="email"
                    required
                    placeholder="csr@perusahaan.co.id"
                    value={csrForm.email}
                    onChange={(e) => setCsrForm({ ...csrForm, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nomor WhatsApp / Telepon PIC *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={csrForm.phone}
                    onChange={(e) => setCsrForm({ ...csrForm, phone: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Jenis Inisiatif Program yang Diinginkan *</label>
                  <select
                    value={csrForm.programType}
                    onChange={(e) => setCsrForm({ ...csrForm, programType: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="Beasiswa Penuh Talenta Digital Nasional">Beasiswa Penuh Talenta Digital Nasional</option>
                    <option value="Coding Camp & Literasi Digital Daerah 3T">Coding Camp &amp; Literasi Digital Daerah 3T</option>
                    <option value="Program Women in Tech & Pemberdayaan">Program Women in Tech &amp; Pemberdayaan</option>
                    <option value="Inkubasi Digital & Hackathon Mahasiswa">Inkubasi Digital &amp; Hackathon Mahasiswa</option>
                    <option value="Custom CSR / ESG Program Scope">Rancangan Kustom Sesuai KPI ESG Perusahaan</option>
                  </select>
                </div>

                <div className="corp-form-field">
                  <label>Target Jumlah Penerima Manfaat *</label>
                  <select
                    value={csrForm.targetBeneficiaries}
                    onChange={(e) => setCsrForm({ ...csrForm, targetBeneficiaries: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="50 - 100 Siswa">50 - 100 Siswa / Talenta</option>
                    <option value="100 - 500 Siswa">100 - 500 Siswa / Talenta</option>
                    <option value="500 - 2000 Siswa">500 - 2.000 Siswa / Talenta</option>
                    <option value="> 2000 Siswa (National Massive)">&gt; 2.000 Siswa (Skala Nasional Masif)</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <label>Catatan Tambahan &amp; Wilayah Sasaran Khusus (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Sebutkan preferensi target kota/provinsi atau fokus keahlian spesifik..."
                    value={csrForm.notes}
                    onChange={(e) => setCsrForm({ ...csrForm, notes: e.target.value })}
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <div className="corp-form-field full-width">
                  <button type="submit" className="lp-btn-primary corp-submit-btn">
                    Kirim Permintaan Kerjasama Program CSR →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 05: FAQ CSR */}
      <section className="csr-faq-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // FREQUENTLY ASKED QUESTIONS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>AKREDITASI</dt>
                <dd>KEMENDIKBUD &amp; GLOBAL</dd>
              </div>
              <div>
                <dt>AUDIT</dt>
                <dd>TRANSPARAN REALTIME</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pertanyaan Seputar Kemitraan CSR</h2>
            <p className="lp-section-subtitle">
              Informasi mekanisme kemitraan, penyesuaian kurikulum, dan sistem monitoring dampak beasiswa.
            </p>
          </div>

          <div className="subs-faq-list" style={{ maxWidth: "860px", margin: "0 auto" }}>
            {FAQ_CSR.map((item, idx) => {
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
