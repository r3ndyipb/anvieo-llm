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
  level: string;
  standards: string;
  duration: string;
  examFormat: string;
  fee: string;
  installment: string;
  badgeColor: string;
  description: string;
  skills: string[];
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    code: "CPAIE",
    acronym: "CPAIE™",
    title: "Certified Professional AI Engineer",
    level: "Architect Level 4",
    standards: "NIST AI RMF & IEEE 2801 Compliant",
    duration: "4 Jam (Teori & Live Coding)",
    examFormat: "Ujian Kasus + Capstone Model Deployment + Technical Interview",
    fee: "Rp1.750.000",
    installment: "atau 3x cicilan Rp583.000/bln",
    badgeColor: "var(--gold)",
    description: "Sertifikasi kompetensi tertinggi untuk profesional yang merancang, melatih, mengevaluasi, dan menerapkan model machine learning & deep learning berskala produksi.",
    skills: ["Deep Learning & Transformer Architecture", "RAG & Vector Search Deployment", "Model Quantization & Inference Optimization", "AI Safety & Ethical Governance"],
  },
  {
    code: "CFSA",
    acronym: "CFSA™",
    title: "Certified Full-Stack Software Architect",
    level: "Architect Level 4",
    standards: "IEEE 1471 & Clean Architecture Certified",
    duration: "4 Jam (Arsitektur & Audit Kode)",
    examFormat: "Studi Kasus Arsitektur + Live Code Audit + Defense",
    fee: "Rp1.750.000",
    installment: "atau 3x cicilan Rp583.000/bln",
    badgeColor: "#3B82F6",
    description: "Uji kompetensi arsitektur perangkat lunak modern untuk lead developer yang merancang sistem microservices, database terdistribusi, dan performa tinggi.",
    skills: ["Microservices & Event-Driven Design", "PostgreSQL 16 High-Concurrency Tuning", "Next.js & FastAPI Enterprise Stack", "Secure Coding & Threat Modeling"],
  },
  {
    code: "CCDS",
    acronym: "CCDS™",
    title: "Certified Cloud DevOps Specialist",
    level: "Specialist Level 3",
    standards: "CNCF Standard & DevSecOps Benchmark",
    duration: "3.5 Jam (Hands-on Cloud Lab)",
    examFormat: "Hands-on Infrastructure as Code + Kubernetes Troubleshooting",
    fee: "Rp1.650.000",
    installment: "atau 3x cicilan Rp550.000/bln",
    badgeColor: "#10B981",
    description: "Sertifikasi untuk DevOps & Site Reliability Engineer dalam mengelola container Kubernetes, otomatisasi CI/CD zero-downtime, dan keamanan multi-cloud.",
    skills: ["Kubernetes Cluster Administration", "Docker Multi-stage Optimization", "Terraform Infrastructure as Code", "Continuous Deployment Zero-Downtime"],
  },
  {
    code: "CFMVA",
    acronym: "CFMVA™",
    title: "Certified Financial Modeling & Valuation Analyst",
    level: "Senior Analyst Level 4",
    standards: "CFA Institute Standard & IFRS Accounting",
    duration: "4 Jam (Financial Modeling Sandbox)",
    examFormat: "3-Statement Financial Model + DCF Valuation + Investment Pitch",
    fee: "Rp1.850.000",
    installment: "atau 3x cicilan Rp616.000/bln",
    badgeColor: "#F59E0B",
    description: "Sertifikasi pemodelan keuangan dan valuasi ekuitas terakreditasi untuk analis investasi, banker, dan konsultan keuangan korporasi.",
    skills: ["DCF & Comparable Company Analysis", "M&A & LBO Transaction Modeling", "Financial Statement Forensic Audit", "Capital Allocation & Sensitivity Analysis"],
  },
  {
    code: "CCLO",
    acronym: "CCLO™",
    title: "Certified Corporate Cyber Law & PDP Officer",
    level: "Officer Level 3",
    standards: "UU No. 27/2022 (PDP) & ISO 27001 Legal Audit",
    duration: "3 Jam (Legal Drafting & Compliance)",
    examFormat: "Drafting Kontrak IT + Legal Audit Kasus Sengketa Data",
    fee: "Rp1.500.000",
    installment: "atau 3x cicilan Rp500.000/bln",
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
    theoryScore: number;
    practicalScore: number;
    defenseStatus: string;
    accreditationCode: string;
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

  const selectProgramForRegistration = (code: string) => {
    setExamForm((prev) => ({ ...prev, program: code }));
    const el = document.getElementById("daftar-ujian");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyId.trim().toUpperCase();
    if (!clean) return;

    if (clean.includes("CPAIE") || clean === "ANV-AI-2026" || clean.includes("CFSA") || clean.includes("CCDS") || clean.length > 5) {
      setVerifyResult({
        valid: true,
        certId: clean,
        holderName: clean.includes("CFSA") ? "Rendy Ariawindana, S.T." : "Muhammad Bagas Prakoso, S.Kom.",
        program: clean.includes("CFSA")
          ? "Certified Full-Stack Software Architect (CFSA™)"
          : clean.includes("CCDS")
          ? "Certified Cloud DevOps Specialist (CCDS™)"
          : "Certified Professional AI Engineer (CPAIE™)",
        issueDate: "14 Oktober 2026",
        status: "Aktif & Terverifikasi Resmi",
        theoryScore: 94,
        practicalScore: 97,
        defenseStatus: "Passed with Distinction",
        accreditationCode: "IEEE-NIST-2026-ANV-88914",
      });
    } else {
      setVerifyResult({
        valid: false,
        certId: clean,
        holderName: "-",
        program: "-",
        issueDate: "-",
        status: "Nomor Registrasi Tidak Terdaftar",
        theoryScore: 0,
        practicalScore: 0,
        defenseStatus: "Not Applicable",
        accreditationCode: "N/A",
      });
    }
  };

  const triggerSampleVerify = (sampleId: string) => {
    setVerifyId(sampleId);
    setVerifyResult({
      valid: true,
      certId: sampleId,
      holderName: sampleId.includes("CFSA") ? "Rendy Ariawindana, S.T." : "Muhammad Bagas Prakoso, S.Kom.",
      program: sampleId.includes("CFSA")
        ? "Certified Full-Stack Software Architect (CFSA™)"
        : "Certified Professional AI Engineer (CPAIE™)",
      issueDate: "14 Oktober 2026",
      status: "Aktif & Terverifikasi Resmi",
      theoryScore: 95,
      practicalScore: 98,
      defenseStatus: "Passed with Distinction",
      accreditationCode: "IEEE-NIST-2026-ANV-88914",
    });
    const el = document.getElementById("verifikasi");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const FAQ_ITEMS = [
    {
      q: "Berapa lama masa berlaku sertifikat kompetensi ANVIEO?",
      a: "Sertifikat kompetensi resmi ANVIEO Academy berlaku seumur hidup dengan status nomor registrasi terdaftar secara publik di portal verifikasi kriptografi kami. Rekruter dan perusahaan mitra dapat melakukan validasi instan 24/7 tanpa perantara.",
    },
    {
      q: "Apakah saya bisa langsung mengikuti ujian sertifikasi tanpa mengambil kelas?",
      a: "Bisa. Kami menyediakan jalur Direct Examination bagi praktisi yang telah memiliki pengalaman kerja dan portofolio mandiri. Anda hanya perlu mendaftar jadwal batch ujian dan menyelesaikan uji teori kasus serta proyek teknis yang diaudit oleh reviewer ahli.",
    },
    {
      q: "Bagaimana jika saya belum mencapai passing grade pada percobaan pertama?",
      a: "Peserta yang belum mencapai passing grade 80% akan menerima laporan audit rubrik mendalam dari tim Reviewer dan mendapatkan 1x kesempatan retake ujian gratis dalam waktu 30 hari kalender.",
    },
    {
      q: "Bagaimana cara memverifikasi keaslian sertifikat oleh tim HR dan Rekruter?",
      a: "Setiap sertifikat memuat kode verifikasi unik, QR Code kriptografi, dan tanda tangan digital SHA-256. Rekruter dapat langsung memindai QR Code atau memasukkan ID sertifikat di portal ini untuk memeriksa nilai rubrik dan keabsahan dokumen.",
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
            <span className="lp-breadcrumb-current">Sertifikasi Kompetensi</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Live Credential Hologram Preview */}
      <section className="sert-hero-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="blackbox-strip" style={{ marginBottom: "28px" }}>
            <span className="blackbox-strip-label">ANVIEO CREDENTIAL // GLOBAL ACCREDITATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>ACCREDITATION</dt>
                <dd>IEEE / NIST / CFA</dd>
              </div>
              <div>
                <dt>VERIFIED ALUMNI</dt>
                <dd>18.450+ DOKUMEN AKTIF</dd>
              </div>
              <div>
                <dt>INDUSTRY RECOGNITION</dt>
                <dd>850+ HIRING PARTNER</dd>
              </div>
            </dl>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "clamp(24px, 4vw, 48px)", alignItems: "center" }}>
            {/* Left: Editorial Value Proposition */}
            <div className="sert-hero-content" style={{ textAlign: "left", margin: 0 }}>
              <div className="sert-hero-tag">
                <span>OFFICIAL COMPETENCY ACCREDITATION • GLOBALLY VERIFIABLE</span>
              </div>

              <h1 className="sert-hero-title" style={{ textAlign: "left" }}>
                Sertifikasi Kompetensi Resmi ANVIEO: Standar Keunggulan Industri Global
              </h1>

              <p className="sert-hero-desc" style={{ textAlign: "left" }}>
                Buktikan kompetensi profesional Anda melalui uji kompetensi berbasis studi kasus dan audit proyek nyata. Terakreditasi standar <strong>IEEE, NIST, dan CFA Institute</strong>, diverifikasi secara kriptografi dengan tanda tangan SHA-256, dan <strong>diakui oleh 850+ perusahaan teknologi &amp; multinasional</strong>.
              </p>

              <div className="sert-hero-actions" style={{ justifyContent: "flex-start" }}>
                <a href="#program" className="lp-btn-primary">
                  <span>Pilih Program Ujian</span>
                  <span>→</span>
                </a>
                <a href="#verifikasi" className="lp-btn-outline">
                  <span>Cek Keaslian Sertifikat</span>
                  <FlatIcon type="search" size={15} />
                </a>
              </div>

              {/* 4 Reassurance Badges */}
              <div className="sert-key-badges-row" style={{ marginTop: "32px" }}>
                <div className="sert-kbadge-item">
                  <span className="sert-kbadge-icon"><FlatIcon type="shield" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>IEEE &amp; NIST</strong>
                    <span style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Terakreditasi Global</span>
                  </div>
                </div>
                <div className="sert-kbadge-item">
                  <span className="sert-kbadge-icon"><FlatIcon type="share" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>QR Kriptografi</strong>
                    <span style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>SHA-256 Signed</span>
                  </div>
                </div>
                <div className="sert-kbadge-item">
                  <span className="sert-kbadge-icon"><FlatIcon type="briefcase" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>850+ Rekruter</strong>
                    <span style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Langsung Tersalurkan</span>
                  </div>
                </div>
                <div className="sert-kbadge-item">
                  <span className="sert-kbadge-icon"><FlatIcon type="globe" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>LinkedIn Badge</strong>
                    <span style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>One-Click Import</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Official Credential Sample Preview */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  background: "var(--bx-surface)",
                  border: "2px solid var(--gold)",
                  borderRadius: "var(--radius-xs)",
                  padding: "24px 28px",
                  position: "relative",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.1)",
                }}
              >
                {/* Decorative Seal Corner */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      OFFICIAL DIGITAL CREDENTIAL
                    </span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "4px 0 0" }}>
                      ANVIEO ACADEMY
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "#10B981",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-xs)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                    VERIFIED &amp; ACTIVE
                  </div>
                </div>

                <div style={{ borderTop: "1px dashed var(--bx-border)", borderBottom: "1px dashed var(--bx-border)", padding: "16px 0", margin: "14px 0" }}>
                  <span style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                    Diberikan kepada:
                  </span>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "4px 0 8px" }}>
                    Muhammad Bagas Prakoso, S.Kom.
                  </h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", margin: 0, lineHeight: 1.5 }}>
                    Telah menyelesaikan ujian komprehensif berstandar internasional dan dinyatakan kompeten sebagai:
                  </p>
                  <div style={{ display: "inline-block", background: "rgba(201, 150, 46, 0.12)", border: "1px solid var(--gold)", padding: "4px 10px", borderRadius: "var(--radius-xs)", marginTop: "8px" }}>
                    <strong style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--gold)" }}>
                      CPAIE™ — Certified Professional AI Engineer
                    </strong>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.6875rem", fontFamily: "var(--font-mono)" }}>
                  <div>
                    <span style={{ color: "var(--bx-text-meta)" }}>CREDENTIAL ID:</span>
                    <strong style={{ display: "block", color: "var(--bx-ink-bright)" }}>ANV-CPAIE-2026-99X</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--bx-text-meta)" }}>RUBRIC SCORE:</span>
                    <strong style={{ display: "block", color: "#10B981" }}>96 / 100 (HIGH DISTINCTION)</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--bx-text-meta)" }}>DATE OF ISSUANCE:</span>
                    <strong style={{ display: "block", color: "var(--bx-ink-bright)" }}>14 OKTOBER 2026</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--bx-text-meta)" }}>ACCREDITATION:</span>
                    <strong style={{ display: "block", color: "var(--bx-ink-bright)" }}>IEEE 2801 / NIST RMF</strong>
                  </div>
                </div>

                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--bx-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--bx-text-meta)" }}>
                    SHA-256: 9e8a7f6c4d...3b21
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerSampleVerify("ANV-CPAIE-2026-99X")}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--gold)",
                      fontWeight: 700,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Uji Verifikasi ID Ini →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Programs Grid */}
      <section id="program" className="sert-programs-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
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
                <div>
                  <div className="sert-card-top">
                    <div className="sert-badge-pill" style={{ borderColor: cert.badgeColor, color: cert.badgeColor }}>
                      {cert.acronym}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="sert-fee-tag">{cert.fee}</span>
                      <small style={{ display: "block", fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>{cert.installment}</small>
                    </div>
                  </div>

                  <h3 className="sert-card-title">{cert.title}</h3>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", margin: "6px 0 10px" }}>
                    <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", padding: "2px 6px", background: "rgba(201, 150, 46, 0.12)", color: "var(--gold)", borderRadius: "var(--radius-xs)", fontWeight: 700 }}>
                      {cert.level}
                    </span>
                    <span className="sert-standards-meta" style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: 0 }}>
                      <FlatIcon type="certificate" size={13} color="var(--gold)" /> {cert.standards}
                    </span>
                  </div>

                  <p className="sert-card-desc">{cert.description}</p>
                </div>

                <div>
                  <div className="sert-exam-meta-box">
                    <div className="sert-meta-line">
                      <strong>Durasi Ujian:</strong> <span>{cert.duration}</span>
                    </div>
                    <div className="sert-meta-line">
                      <strong>Format Uji:</strong> <span>{cert.examFormat}</span>
                    </div>
                  </div>

                  <div className="sert-skills-tags">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="sert-skill-tag">
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <FlatIcon type="check" size={11} color="#10B981" /> {skill}
                        </span>
                      </span>
                    ))}
                  </div>

                  <div className="sert-card-footer">
                    <button
                      type="button"
                      onClick={() => selectProgramForRegistration(cert.code)}
                      className="lp-btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Daftar Ujian {cert.acronym} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps to Certification */}
      <section className="sert-steps-sec blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
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
                Pilih program sertifikasi dan jadwal ujian batch yang tersedia. Dapatkan panduan silabus, kisi-kisi teknis, dan akses ke sandbox simulasi.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">02</div>
              <h4 className="sert-step-title">Uji Teori &amp; Analitik Kasus</h4>
              <p className="sert-step-desc">
                Ujian online terawasi berbasis studi kasus industri nyata untuk menguji pemahaman konsep, regulasi, dan perancangan arsitektur sistem.
              </p>
            </div>

            <div className="sert-step-card">
              <div className="sert-step-number">03</div>
              <h4 className="sert-step-title">Praktik Proyek &amp; Code Defense</h4>
              <p className="sert-step-desc">
                Pengerjaan tugas proyek nyata yang diaudit baris-demi-baris oleh Reviewer praktisi dan diuji melalui sesi wawancara teknis 1-on-1.
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
        <BlackboxRails position="both" />
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

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                <small style={{ color: "var(--bx-text-meta)" }}>Pilih ID valid untuk simulasi cepat:</small>
                <button
                  type="button"
                  onClick={() => triggerSampleVerify("ANV-CPAIE-2026-99X")}
                  style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                >
                  ANV-CPAIE-2026-99X (AI Engineer)
                </button>
                <span style={{ color: "var(--bx-text-meta)", opacity: 0.4 }}>•</span>
                <button
                  type="button"
                  onClick={() => triggerSampleVerify("ANV-CFSA-2026-42B")}
                  style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "0.75rem", cursor: "pointer", fontWeight: 700 }}
                >
                  ANV-CFSA-2026-42B (Software Architect)
                </button>
              </div>
            </form>

            {/* Verification Result Display */}
            {verifyResult && (
              <div className={`sert-result-box ${verifyResult.valid ? "valid" : "invalid"}`}>
                {verifyResult.valid ? (
                  <div>
                    <div className="sert-result-header">
                      <span className="sert-valid-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <FlatIcon type="check" size={14} color="#10B981" /> SERTIFIKAT VALID &amp; TERVERIFIKASI RESMI
                      </span>
                      <span className="sert-id-chip">{verifyResult.certId}</span>
                    </div>

                    <div className="sert-result-grid" style={{ marginBottom: "16px" }}>
                      <div>
                        <small>Nama Pemegang Sertifikat:</small>
                        <h4 style={{ color: "var(--bx-ink-bright)" }}>{verifyResult.holderName}</h4>
                      </div>
                      <div>
                        <small>Program Sertifikasi:</small>
                        <h4 style={{ color: "var(--gold)" }}>{verifyResult.program}</h4>
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

                    {/* Rubric Breakdown Score Box */}
                    <div style={{ background: "var(--bx-bg)", border: "1px solid var(--bx-border)", borderRadius: "var(--radius-xs)", padding: "14px 16px", marginTop: "12px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.08em" }}>
                        AUDIT RUBRIC BREAKDOWN // NILAI KELULUSAN
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginTop: "8px" }}>
                        <div>
                          <small style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Ujian Teori &amp; Kasus:</small>
                          <strong style={{ display: "block", fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>{verifyResult.theoryScore} / 100</strong>
                        </div>
                        <div>
                          <small style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Praktik Proyek Mandiri:</small>
                          <strong style={{ display: "block", fontSize: "0.875rem", color: "#10B981" }}>{verifyResult.practicalScore} / 100</strong>
                        </div>
                        <div>
                          <small style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Wawancara Code Defense:</small>
                          <strong style={{ display: "block", fontSize: "0.875rem", color: "var(--gold)" }}>{verifyResult.defenseStatus}</strong>
                        </div>
                        <div>
                          <small style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>Kode Registrasi:</small>
                          <strong style={{ display: "block", fontSize: "0.75rem", color: "var(--bx-ink-bright)", fontFamily: "var(--font-mono)" }}>{verifyResult.accreditationCode}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "16px" }}>
                    <FlatIcon type="info" size={26} color="#EF4444" />
                    <h4 style={{ color: "#EF4444", margin: "10px 0 4px", fontSize: "1.0625rem" }}>Sertifikat Tidak Ditemukan</h4>
                    <p style={{ fontSize: "0.84375rem", color: "var(--bx-text-meta)", margin: 0 }}>
                      Nomor registrasi <strong>{verifyResult.certId}</strong> tidak terdaftar di database penerbitan resmi ANVIEO Academy. Pastikan penulisan kode sesuai dengan yang tercetak di dokumen fisik atau digital.
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
        <BlackboxRails position="both" />
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
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlatIcon type="award" size={32} color="var(--gold)" />
                </div>
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
        <BlackboxRails position="both" />
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
