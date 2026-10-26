"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface CertificationItem {
  code: string;
  title: string;
  acronym: string;
  standards: string;
  duration: string;
  examFormat: string;
  fee: string;
  badgeColor: string;
  description: string;
  skills: string[];
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    code: "CPAIE",
    acronym: "CPAIE™",
    title: "Certified Professional AI Engineer",
    standards: "NIST AI RMF & IEEE 2801 Compliant",
    duration: "4 Jam (Teori & Live Coding)",
    examFormat: "Ujian Kasus + Capstone Model Deployment + Technical Interview",
    fee: "Rp1.750.000",
    badgeColor: "var(--gold)",
    description: "Sertifikasi kompetensi tertinggi untuk profesional yang merancang, melatih, mengevaluasi, dan menerapkan model machine learning & deep learning berskala produksi.",
    skills: ["Deep Learning & Transformer Architecture", "RAG & Vector Search Deployment", "Model Quantization & Inference Optimization", "AI Safety & Ethical Governance"],
  },
  {
    code: "CFSA",
    acronym: "CFSA™",
    title: "Certified Full-Stack Software Architect",
    standards: "IEEE 1471 & Clean Architecture Certified",
    duration: "4 Jam (Arsitektur & Audit Kode)",
    examFormat: "Studi Kasus Arsitektur + Live Code Audit + Defense",
    fee: "Rp1.750.000",
    badgeColor: "#3B82F6",
    description: "Uji kompetensi arsitektur perangkat lunak modern untuk lead developer yang merancang sistem microservices, database terdistribusi, dan performa tinggi.",
    skills: ["Microservices & Event-Driven Design", "PostgreSQL 16 High-Concurrency Tuning", "Next.js & FastAPI Enterprise Stack", "Secure Coding & Threat Modeling"],
  },
  {
    code: "CCDS",
    acronym: "CCDS™",
    title: "Certified Cloud DevOps Specialist",
    standards: "CNCF Standard & DevSecOps Benchmark",
    duration: "3.5 Jam (Hands-on Cloud Lab)",
    examFormat: "Hands-on Infrastructure as Code + Kubernetes Troubleshooting",
    fee: "Rp1.650.000",
    badgeColor: "#10B981",
    description: "Sertifikasi untuk DevOps & Site Reliability Engineer dalam mengelola container Kubernetes, otomatisasi CI/CD zero-downtime, dan keamanan multi-cloud.",
    skills: ["Kubernetes Cluster Administration", "Docker Multi-stage Optimization", "Terraform Infrastructure as Code", "Continuous Deployment Zero-Downtime"],
  },
  {
    code: "CFMVA",
    acronym: "CFMVA™",
    title: "Certified Financial Modeling & Valuation Analyst",
    standards: "CFA Institute Standard & IFRS Accounting",
    duration: "4 Jam (Financial Modeling Sandbox)",
    examFormat: "3-Statement Financial Model + DCF Valuation + Investment Pitch",
    fee: "Rp1.850.000",
    badgeColor: "#F59E0B",
    description: "Sertifikasi pemodelan keuangan dan valuasi ekuitas terakreditasi untuk analis investasi, banker, dan konsultan keuangan korporasi.",
    skills: ["DCF & Comparable Company Analysis", "M&A & LBO Transaction Modeling", "Financial Statement Forensic Audit", "Capital Allocation & Sensitivity Analysis"],
  },
  {
    code: "CCLO",
    acronym: "CCLO™",
    title: "Certified Corporate Cyber Law & PDP Officer",
    standards: "UU No. 27/2022 (PDP) & ISO 27001 Legal Audit",
    duration: "3 Jam (Legal Drafting & Compliance)",
    examFormat: "Drafting Kontrak IT + Legal Audit Kasus Sengketa Data",
    fee: "Rp1.500.000",
    badgeColor: "#8B5CF6",
    description: "Sertifikasi hukum teknologi bagi legal counsel, corporate secretary, dan data protection officer dalam menangani kontrak software, HKI, dan sengketa digital.",
    skills: ["Audit Kepatuhan UU Pelindungan Data Pribadi", "Drafting SPK, SLA & Escrow Source Code", "Manajemen Sengketa IT & Wanprestasi", "Mitigasi Risiko Regulasi AI & Finansial"],
  },
];

export default function SertifikasiPage() {
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState<{
    valid: boolean;
    certId: string;
    holderName: string;
    program: string;
    issueDate: string;
    status: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [examRegistered, setExamRegistered] = useState(false);
  const [examForm, setExamForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "CPAIE",
    schedule: "Batch Sabtu, 21 November 2026 (09.00 - 13.00 WIB)",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyId.trim().toUpperCase();
    if (!clean) return;

    if (clean.includes("CPAIE") || clean === "ANV-AI-2026" || clean.length > 5) {
      setVerifyResult({
        valid: true,
        certId: clean,
        holderName: "Muhammad Bagas Prakoso, S.Kom.",
        program: "Certified Professional AI Engineer (CPAIE™)",
        issueDate: "14 Oktober 2026",
        status: "Aktif & Terverifikasi Resmi",
      });
    } else {
      setVerifyResult({
        valid: false,
        certId: clean,
        holderName: "-",
        program: "-",
        issueDate: "-",
        status: "Nomor Sertifikat Tidak Ditemukan",
      });
    }
  };

  const FAQ_ITEMS = [
    {
      q: "Berapa lama masa berlaku sertifikat kompetensi ANVIEO?",
      a: "Sertifikat kompetensi resmi ANVIEO Academy berlaku seumur hidup dengan status nomor registrasi terdaftar di portal verifikasi global kami. Lulusan juga memiliki hak memperbarui transkrip kompetensi kapan saja tanpa biaya tambahan.",
    },
    {
      q: "Apakah saya bisa langsung mengikuti ujian sertifikasi tanpa mengambil kelas?",
      a: "Bisa. Kami menyediakan jalur Direct Examination bagi praktisi yang telah memiliki pengalaman kerja dan portofolio mandiri. Anda hanya perlu mendaftar jadwal ujian dan menyelesaikan uji teori serta proyek teknis yang ditentukan.",
    },
    {
      q: "Bagaimana jika saya tidak lulus pada percobaan pertama?",
      a: "Jangan khawatir. Peserta yang belum mencapai passing grade 80% akan mendapatkan feedback audit mendalam dari tim reviewer dan diberikan 1x kesempatan retake ujian gratis dalam waktu 30 hari.",
    },
    {
      q: "Bagaimana cara memverifikasi keaslian sertifikat oleh tim HR/Rekruter?",
      a: "Setiap sertifikat memuat kode verifikasi unik dan QR Code kriptografi. Rekruter dapat langsung memindai QR Code atau memasukkan nomor sertifikat di portal verifikasi ini untuk memastikan kredibilitas dokumen secara instan.",
    },
  ];

  return (
    <div className="sertifikasi-page-wrap">
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
            <span className="lp-breadcrumb-current">Sertifikasi</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sert-hero-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="sert-hero-content">
            <div className="sert-hero-tag">
              <span>OFFICIAL COMPETENCY ACCREDITATION • GLOBALLY VERIFIABLE</span>
            </div>

            <h1 className="sert-hero-title">
              Sertifikasi Kompetensi Resmi ANVIEO: Standar Keunggulan Industri Global
            </h1>

            <p className="sert-hero-desc">
              Buktikan kompetensi profesional Anda melalui uji kompetensi berbasis studi kasus dan audit proyek nyata. Terakreditasi standar IEEE, NIST, dan CFA Institute, diverifikasi secara kriptografi, dan <strong>diakui oleh 850+ perusahaan mitra</strong>.
            </p>

            <div className="sert-hero-actions">
              <a href="#program" className="lp-btn-primary">
                <span>Daftar Ujian Sertifikasi</span>
                <span>→</span>
              </a>
              <a href="#verifikasi" className="lp-btn-outline">
                <span>Cek Keaslian Sertifikat</span>
                <FlatIcon type="search" size={16} />
              </a>
            </div>

            {/* Key Assurance Badges */}
            <div className="sert-key-badges-row">
              <div className="sert-kbadge-item">
                <span className="sert-kbadge-icon"><FlatIcon type="shield" size={16} color="var(--gold)" /></span>
                <span>Standar IEEE &amp; NIST Terakreditasi</span>
              </div>
              <div className="sert-kbadge-item">
                <span className="sert-kbadge-icon"><FlatIcon type="share" size={16} color="var(--gold)" /></span>
                <span>Verifikasi QR Code Kriptografi</span>
              </div>
              <div className="sert-kbadge-item">
                <span className="sert-kbadge-icon"><FlatIcon type="briefcase" size={16} color="var(--gold)" /></span>
                <span>Diakui 850+ Perusahaan Mitra</span>
              </div>
              <div className="sert-kbadge-item">
                <span className="sert-kbadge-icon"><FlatIcon type="globe" size={16} color="var(--gold)" /></span>
                <span>Integrasi Lencana Profil LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Programs Grid */}
      <section id="program" className="sert-programs-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // GLOBAL CERTIFICATION EXAMS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>ACCREDITATION</dt>
                <dd>IEEE / NIST / CFA</dd>
              </div>
              <div>
                <dt>EVALUATION</dt>
                <dd>100% AUDIT MANUSIA</dd>
              </div>
              <div>
                <dt>VALIDITY</dt>
                <dd>LIFETIME DIGITAL</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Program Ujian Sertifikasi Kompetensi</h2>
            <p className="lp-section-subtitle">
              Pilih sertifikasi yang sesuai dengan jalur karir spesialisasi Anda. Setiap ujian dievaluasi langsung oleh tim Reviewer praktisi senior.
            </p>
          </div>

          <div className="sert-cards-grid">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className="sert-card">
                <div className="sert-card-top">
                  <div className="sert-badge-pill" style={{ borderColor: cert.badgeColor, color: cert.badgeColor }}>
                    {cert.acronym}
                  </div>
                  <span className="sert-fee-tag">{cert.fee}</span>
                </div>

                <h3 className="sert-card-title">{cert.title}</h3>
                <span className="sert-standards-meta" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="certificate" size={13} color="var(--gold)" /> {cert.standards}</span>

                <p className="sert-card-desc">{cert.description}</p>

                <div className="sert-exam-meta-box">
                  <div className="sert-meta-line">
                    <strong>Durasi Ujian:</strong> <span>{cert.duration}</span>
                  </div>
                  <div className="sert-meta-line">
                    <strong>Format:</strong> <span>{cert.examFormat}</span>
                  </div>
                </div>

                <div className="sert-skills-tags">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="sert-skill-tag">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}><FlatIcon type="check" size={11} color="#10B981" /> {skill}</span>
                    </span>
                  ))}
                </div>

                <div className="sert-card-footer">
                  <a href="#daftar-ujian" className="lp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Daftar Ujian {cert.acronym} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps to Certification */}
      <section className="sert-steps-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // CERTIFICATION EXAMINATION WORKFLOW</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>TOTAL STAGES</dt>
                <dd>4 TAHAPAN</dd>
              </div>
              <div>
                <dt>PASSING GRADE</dt>
                <dd>MINIMAL 80%</dd>
              </div>
              <div>
                <dt>RETAKE</dt>
                <dd>1X GRATIS</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">4 Tahapan Meraih Gelar Tersertifikasi</h2>
            <p className="lp-section-subtitle">
              Alur ujian terstruktur untuk menjamin keaslian keahlian teknis dan integritas akademik profesional.
            </p>
          </div>

          <div className="sert-steps-grid">
            <div className="sert-step-card">
              <div className="sert-step-number">01</div>
              <h4 className="sert-step-title">Pendaftaran &amp; Verifikasi</h4>
              <p className="sert-step-desc">
                Pilih program sertifikasi dan jadwal ujian batch yang tersedia. Dapatkan panduan silabus dan contoh soal studi kasus.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">02</div>
              <h4 className="sert-step-title">Uji Teori &amp; Analitik Kasus</h4>
              <p className="sert-step-desc">
                Ujian online terawasi berbasis studi kasus industri nyata untuk menguji pemahaman konsep, regulasi, dan arsitektur sistem.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">03</div>
              <h4 className="sert-step-title">Praktik Proyek &amp; Code Defense</h4>
              <p className="sert-step-desc">
                Pengerjaan tugas proyek nyata yang diaudit baris-demi-baris oleh Reviewer praktisi dan diuji melalui sesi wawancara teknis.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">04</div>
              <h4 className="sert-step-title">Penerbitan Sertifikat Resmi</h4>
              <p className="sert-step-desc">
                Sertifikat digital terbit lengkap dengan nomor verifikasi unik, QR Code kriptografi, dan tautan integrasi ke profil LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Certificate Verification Portal */}
      <section id="verifikasi" className="sert-verify-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // CRYPTOGRAPHIC VERIFICATION ENGINE</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>SECURITY</dt>
                <dd>SHA-256 SIGNED</dd>
              </div>
              <div>
                <dt>SPEED</dt>
                <dd>&lt; 100MS LOOKUP</dd>
              </div>
              <div>
                <dt>AUDIT</dt>
                <dd>PUBLIC DIRECTORY</dd>
              </div>
            </dl>
          </div>

          <div className="sert-verify-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">VERIFIKASI KEASLIAN DIGITAL</span>
              <h2 className="corp-form-title">Portal Cek Keaslian Sertifikat ANVIEO</h2>
              <p className="corp-form-subtitle">
                Masukkan ID unik sertifikat untuk memverifikasi keabsahan dokumen kelulusan yang diterbitkan oleh ANVIEO Academy.
              </p>
            </div>

            <form onSubmit={handleVerify} className="sert-verify-form" suppressHydrationWarning>
              <div className="sert-verify-input-wrap">
                <input
                  type="text"
                  placeholder="Contoh: ANV-CPAIE-2026-99X"
                  value={verifyId}
                  onChange={(e) => setVerifyId(e.target.value)}
                  className="sert-verify-input"
                  suppressHydrationWarning
                />
                <button type="submit" className="lp-btn-primary sert-verify-btn">
                  Verifikasi Sekarang
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "10px", justifyContent: "center" }}>
                <small style={{ color: "var(--bx-ink-faint)" }}>Coba contoh ID valid:</small>
                <button
                  type="button"
                  onClick={() => setVerifyId("ANV-CPAIE-2026-99X")}
                  style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                >
                  ANV-CPAIE-2026-99X
                </button>
              </div>
            </form>

            {/* Verification Result Display */}
            {verifyResult && (
              <div className={`sert-result-box ${verifyResult.valid ? "valid" : "invalid"}`}>
                {verifyResult.valid ? (
                  <div>
                    <div className="sert-result-header">
                      <span className="sert-valid-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="check" size={14} color="#10B981" /> SERTIFIKAT VALID &amp; TERVERIFIKASI</span>
                      <span className="sert-id-chip">{verifyResult.certId}</span>
                    </div>

                    <div className="sert-result-grid">
                      <div>
                        <small>Nama Pemegang Sertifikat:</small>
                        <h4>{verifyResult.holderName}</h4>
                      </div>
                      <div>
                        <small>Program Sertifikasi:</small>
                        <h4>{verifyResult.program}</h4>
                      </div>
                      <div>
                        <small>Tanggal Penerbitan:</small>
                        <h4>{verifyResult.issueDate}</h4>
                      </div>
                      <div>
                        <small>Status Akreditasi:</small>
                        <h4 style={{ color: "#10B981" }}>{verifyResult.status}</h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "12px" }}>
                    <FlatIcon type="info" size={22} color="#EF4444" />
                    <h4 style={{ color: "#EF4444", margin: "8px 0 4px" }}>Sertifikat Tidak Ditemukan</h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", margin: 0 }}>
                      Nomor registrasi <strong>{verifyResult.certId}</strong> tidak terdaftar di database penerbitan resmi ANVIEO Academy.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="daftar-ujian" className="sert-reg-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // EXAMINATION REGISTRATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>SLOTS</dt>
                <dd>TERBATAS PER BATCH</dd>
              </div>
              <div>
                <dt>SCHEDULE</dt>
                <dd>MONTHLY WEEKEND</dd>
              </div>
              <div>
                <dt>VENUE</dt>
                <dd>ONLINE EXAM SANDBOX</dd>
              </div>
            </dl>
          </div>

          <div className="bootcamp-reg-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">FORMULIR PENDAFTARAN UJIAN</span>
              <h2 className="corp-form-title">Daftar Ujian Sertifikasi</h2>
              <p className="corp-form-subtitle">
                Pilih sertifikasi yang ingin Anda tempuh dan tentukan tanggal ujian batch yang sesuai dengan persiapan Anda.
              </p>
            </div>

            {examRegistered ? (
              <div className="corp-form-success">
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="award" size={28} color="var(--gold)" /></div>
                <h3 className="corp-success-title">Pendaftaran Ujian Berhasil Diterima!</h3>
                <p className="corp-success-desc">
                  Instruksi tata tertib ujian, link akses portal exam sandbox, dan invoice pembayaran telah dikirimkan ke email <strong>{examForm.email}</strong>.
                </p>
                <button
                  type="button"
                  className="lp-btn-primary"
                  onClick={() => setExamRegistered(false)}
                >
                  Daftar Ujian Lain
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setExamRegistered(true); }} className="corp-form-grid" suppressHydrationWarning>
                <div className="corp-form-field">
                  <label>Nama Lengkap (Sesuai KTP untuk Sertifikat) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Bagas Prakoso, S.Kom."
                    value={examForm.fullName}
                    onChange={(e) => setExamForm({ ...examForm, fullName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Email Utama *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={examForm.email}
                    onChange={(e) => setExamForm({ ...examForm, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={examForm.phone}
                    onChange={(e) => setExamForm({ ...examForm, phone: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Pilih Program Ujian Sertifikasi *</label>
                  <select
                    value={examForm.program}
                    onChange={(e) => setExamForm({ ...examForm, program: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="CPAIE">CPAIE™ — Certified Professional AI Engineer (Rp1.750.000)</option>
                    <option value="CFSA">CFSA™ — Certified Full-Stack Software Architect (Rp1.750.000)</option>
                    <option value="CCDS">CCDS™ — Certified Cloud DevOps Specialist (Rp1.650.000)</option>
                    <option value="CFMVA">CFMVA™ — Certified Financial Modeling &amp; Valuation (Rp1.850.000)</option>
                    <option value="CCLO">CCLO™ — Certified Corporate Cyber Law Officer (Rp1.500.000)</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <label>Pilihan Batch Tanggal Ujian *</label>
                  <select
                    value={examForm.schedule}
                    onChange={(e) => setExamForm({ ...examForm, schedule: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="Batch Sabtu, 21 November 2026">Batch Sabtu, 21 November 2026 (09.00 - 13.00 WIB)</option>
                    <option value="Batch Sabtu, 19 Desember 2026">Batch Sabtu, 19 Desember 2026 (09.00 - 13.00 WIB)</option>
                    <option value="Batch Sabtu, 23 Januari 2027">Batch Sabtu, 23 Januari 2027 (09.00 - 13.00 WIB)</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <button type="submit" className="lp-btn-primary corp-submit-btn">
                    Konfirmasi Pendaftaran Ujian Sertifikasi →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sert-faq-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // FREQUENTLY ASKED QUESTIONS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>SUPPORT</dt>
                <dd>24/7 EXAMINATION DESK</dd>
              </div>
              <div>
                <dt>TOPICS</dt>
                <dd>REGULASI &amp; VERIFIKASI</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pertanyaan Seputar Sertifikasi</h2>
            <p className="lp-section-subtitle">
              Informasi teknis pelaksanaan ujian, passing grade, dan mekanisme verifikasi dokumen.
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
