"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

export default function CorporateTrainingPage() {
  const [activeTrack, setActiveTrack] = useState<"non-tech" | "tech" | "leadership">("non-tech");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    picName: "",
    companyName: "",
    email: "",
    phone: "",
    employeeCount: "10-50",
    track: "AI Professional Productivity (Non-Tech)",
    notes: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="corporate-training-page-wrap">
      <SiteHeader activeTabOverride="corporate-training" />

      {/* Breadcrumb Header */}
      <div className="lp-breadcrumb-wrap">
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Corporate Training</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="corp-hero-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="corp-hero-content">
            <div className="corp-hero-badge">
              <span>CORPORATE TRAINING • AI &amp; MULTIDISCIPLINARY TRANSFORMATION</span>
            </div>

            <h1 className="corp-hero-title">
              Pelatihan Korporat untuk Transformasi Profesional dan Bisnis Anda
            </h1>

            <p className="corp-hero-desc">
              Menyelaraskan teknologi dan keterampilan tim dengan tujuan bisnis melalui kurikulum praktis, relevan, dan siap diterapkan di setiap divisi, <strong>tech maupun non‑tech</strong>.
            </p>

            <div className="corp-hero-actions">
              <a
                href="https://api.whatsapp.com/send/?phone=6285878911000&text=Halo+Anvieo+Academy%2C+saya+ingin+konsultasi+mengenai+program+corporate+training+untuk+tim+kami."
                target="_blank"
                rel="noreferrer"
                className="lp-btn-primary corp-btn-whatsapp"
              >
                <span>Konsultasi Gratis via WhatsApp</span>
                <FlatIcon type="chat" size={16} />
              </a>

              <a href="#form" className="lp-btn-outline">
                <span>Minta Penawaran Resmi</span>
                <span>↓</span>
              </a>
            </div>

            {/* 2 Key Value Propositions */}
            <div className="corp-hero-values-grid">
              <div className="corp-hero-value-card">
                <div className="corp-value-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="sparkle" size={20} color="var(--gold)" /></div>
                <div>
                  <h4 className="corp-value-title">Tingkatkan Produktivitas Tim</h4>
                  <p className="corp-value-text">
                    Otomasi workflow kerja dengan generative AI, prompt engineering, dan pemrosesan data instan.
                  </p>
                </div>
              </div>

              <div className="corp-hero-value-card">
                <div className="corp-value-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="target" size={20} color="var(--gold)" /></div>
                <div>
                  <h4 className="corp-value-title">Bangun Skill Siap Pakai</h4>
                  <p className="corp-value-text">
                    Kurikulum berbasis studi kasus industri nyata yang langsung dapat diaplikasikan di hari pertama kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Tech Recognition Ticker */}
      <section className="corp-partners-ticker-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // GLOBAL TECH RECOGNITION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>GLOBAL PARTNERS</dt>
                <dd>5 TECH LEADERS</dd>
              </div>
              <div>
                <dt>BENCHMARK</dt>
                <dd>ENTERPRISE ACCREDITED</dd>
              </div>
            </dl>
          </div>

          <span className="corp-ticker-label">
            SATU-SATUNYA EDTECH INDONESIA YANG DIAKUI OLEH 5 TECH COMPANY GLOBAL
          </span>

          <div className="corp-partners-logos">
            <div className="corp-partner-pill">Google Cloud</div>
            <div className="corp-partner-pill">Microsoft</div>
            <div className="corp-partner-pill">AWS (Amazon Web Services)</div>
            <div className="corp-partner-pill">IBM</div>
            <div className="corp-partner-pill">Meta</div>
          </div>
        </div>
      </section>

      {/* Program Tracks Section */}
      <section className="corp-tracks-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // TAILORED CORPORATE TRACKS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>DIVISIONS</dt>
                <dd>TECH &amp; NON-TECH</dd>
              </div>
              <div>
                <dt>METHOD</dt>
                <dd>CUSTOMIZED CURRICULUM</dd>
              </div>
              <div>
                <dt>OUTCOMES</dt>
                <dd>MEASURABLE BUSINESS KPI</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Pilih Program Pelatihan Sesuai Kebutuhan Tim Anda</h2>
            <p className="lp-section-subtitle">
              Tersedia jalur pembelajaran khusus divisi non-teknis, rekayasa perangkat lunak teknis, hingga pimpinan strategis korporasi.
            </p>
          </div>

          {/* Track Tabs */}
          <div className="corp-track-tabs">
            <button
              type="button"
              className={`corp-track-tab ${activeTrack === "non-tech" ? "active" : ""}`}
              onClick={() => setActiveTrack("non-tech")}
            >
              <span>01. Non-Tech Track</span>
              <small>Marketing, HR, Finance &amp; Operations</small>
            </button>

            <button
              type="button"
              className={`corp-track-tab ${activeTrack === "tech" ? "active" : ""}`}
              onClick={() => setActiveTrack("tech")}
            >
              <span>02. Tech &amp; Engineering Track</span>
              <small>IT, Software Engineer &amp; Data Team</small>
            </button>

            <button
              type="button"
              className={`corp-track-tab ${activeTrack === "leadership" ? "active" : ""}`}
              onClick={() => setActiveTrack("leadership")}
            >
              <span>03. Executive &amp; Leadership Track</span>
              <small>C-Level, VP &amp; Strategic Decision Maker</small>
            </button>
          </div>

          {/* Track Detail Card */}
          <div className="corp-track-detail-card">
            {activeTrack === "non-tech" && (
              <div className="corp-track-view">
                <div className="corp-track-left">
                  <span className="lp-hero-badge">NON-TECH TRACK</span>
                  <h3 className="corp-track-title">AI Professional Productivity</h3>
                  <p className="corp-track-desc">
                    Program akselerasi produktivitas harian bagi karyawan lintas divisi menggunakan Generative AI, pemrosesan dokumen otomatis, analisis data visual tanpa coding, dan otomasi tugas berulang.
                  </p>

                  <h4 className="corp-modules-heading">Modul &amp; Keahlian Utama:</h4>
                  <ul className="corp-modules-list">
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Advanced Prompt Engineering:</strong> Mengoptimalkan LLM untuk riset kompetitor, drafting kontrak, dan presentasi bisnis.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Automated Data Analysis:</strong> Mengolah data spreadsheet jutaan baris dan menghasilkan dashboard insight tanpa rumus rumit.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Creative &amp; Marketing Ops AI:</strong> Produksi konten omnichannel, visual copywriting, dan otomatisasi email marketing.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Etika &amp; Keamanan Data Korporat:</strong> Mencegah kebocoran rahasia dagang saat menggunakan tools AI publik.</span>
                    </li>
                  </ul>

                  <div className="corp-track-meta-row">
                    <div className="corp-track-meta-item">
                      <strong>Durasi:</strong> 2 - 4 Minggu (Fleksibel)
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Format:</strong> In-House Workshop / Hybrid
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Output:</strong> Custom AI Workflow Ready
                    </div>
                  </div>
                </div>

                <div className="corp-track-right">
                  <div className="corp-quote-box">
                    <p className="corp-quote-text">
                      “Setelah mengikuti pelatihan AI Professional Productivity, tim People Operations dan Marketing kami berhasil memangkas 40% waktu administrasi rutin per minggu.”
                    </p>
                    <div className="corp-quote-author">
                      <strong>Handoko Setiawan</strong>
                      <span>Head of HR &amp; People Experience · Multifinance Group</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTrack === "tech" && (
              <div className="corp-track-view">
                <div className="corp-track-left">
                  <span className="lp-hero-badge">TECH &amp; ENGINEERING TRACK</span>
                  <h3 className="corp-track-title">Advanced Software Engineering &amp; AI Architect</h3>
                  <p className="corp-track-desc">
                    Pelatihan teknis intensif bagi tim developer dan data engineer korporat untuk membangun sistem berskala masif, arsitektur microservices, pipeline cloud DevOps teruji, dan integrasi AI agents.
                  </p>

                  <h4 className="corp-modules-heading">Modul &amp; Keahlian Utama:</h4>
                  <ul className="corp-modules-list">
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Cloud Native &amp; Microservices Architecture:</strong> Desain arsitektur tahan beban jutaan request per detik dengan Kubernetes &amp; Docker.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Secure Coding &amp; DevSecOps:</strong> Standar keamanan OWASP, audit kerentanan otomatis, dan pipeline CI/CD zero-downtime.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Enterprise AI Agent Deployment:</strong> Integrasi model LLM, fine-tuning arsitektur open-source, dan RAG dengan pgvector.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Human Code Review Standar Industri:</strong> Setiap baris kode peserta diaudit oleh Principal Engineer ANVIEO.</span>
                    </li>
                  </ul>

                  <div className="corp-track-meta-row">
                    <div className="corp-track-meta-item">
                      <strong>Durasi:</strong> 4 - 8 Minggu
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Format:</strong> Live Coding, Lab Sandbox &amp; Code Review
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Output:</strong> Production-Ready Enterprise Capstone
                    </div>
                  </div>
                </div>

                <div className="corp-track-right">
                  <div className="corp-quote-box">
                    <p className="corp-quote-text">
                      “Pelatihan teknis ini menyelaraskan standar code review dan arsitektur cloud microservices seluruh software engineer di squad kami dengan sangat terstruktur.”
                    </p>
                    <div className="corp-quote-author">
                      <strong>Bayu Pratama</strong>
                      <span>VP of Engineering · Tier-1 Digital Banking</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTrack === "leadership" && (
              <div className="corp-track-view">
                <div className="corp-track-left">
                  <span className="lp-hero-badge">EXECUTIVE &amp; LEADERSHIP TRACK</span>
                  <h3 className="corp-track-title">Executive AI Strategy, Valuation &amp; Governance</h3>
                  <p className="corp-track-desc">
                    Masterclass strategis bagi C-Level, Direktur, dan VP untuk merumuskan roadmap adopsi AI, menghitung ROI investasi teknologi, memastikan kepatuhan regulasi UU PDP, serta memimpin transformasi budaya organisasi.
                  </p>

                  <h4 className="corp-modules-heading">Modul &amp; Keahlian Utama:</h4>
                  <ul className="corp-modules-list">
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>AI Strategy &amp; Capital Allocation:</strong> Membedakan hype dari inisiatif AI yang mendatangkan profit nyata dan efisiensi belanja modal (CapEx).</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>AI Governance &amp; Kepatuhan UU No. 27/2022 (PDP):</strong> Manajemen risiko hukum data pribadi dan mitigasi liabilitas perusahaan.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Change Management &amp; Cultural Shift:</strong> Menghilangkan hambatan psikologis karyawan terhadap adopsi otomatisasi baru.</span>
                    </li>
                    <li>
                      <span className="lp-check-icon"><FlatIcon type="check" size={12} color="#10B981" /></span>
                      <span><strong>Executive Simulation Workshop:</strong> Studi kasus nyata bedah merger teknologi dan penyelamatan proyek legacy.</span>
                    </li>
                  </ul>

                  <div className="corp-track-meta-row">
                    <div className="corp-track-meta-item">
                      <strong>Durasi:</strong> 2 Hari Intensif Executive Retreat
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Format:</strong> Round-table Masterclass &amp; Case Study
                    </div>
                    <div className="corp-track-meta-item">
                      <strong>Output:</strong> 3-Year Digital Strategy Blueprint
                    </div>
                  </div>
                </div>

                <div className="corp-track-right">
                  <div className="corp-quote-box">
                    <p className="corp-quote-text">
                      “Sesi strategis ini memberikan kejernihan bagi jajaran direksi kami untuk menentukan prioritas investasi AI yang aman secara hukum dan terbukti menguntungkan.”
                    </p>
                    <div className="corp-quote-author">
                      <strong>Dr. Ir. Dian Kusuma</strong>
                      <span>Chief Digital Officer · BUMN Infrastruktur</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Delivery Methods Section */}
      <section className="corp-methods-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // FLEXIBLE DELIVERY METHODOLOGIES</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>ONSITE</dt>
                <dd>IN-HOUSE WORKSHOP</dd>
              </div>
              <div>
                <dt>VIRTUAL</dt>
                <dd>INTERACTIVE LIVE SESSIONS</dd>
              </div>
              <div>
                <dt>LMS ACCESS</dt>
                <dd>24/7 SELF-PACED</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h2 className="lp-section-title">Metode Pelatihan Fleksibel Sesuai Ritme Perusahaan</h2>
            <p className="lp-section-subtitle">
              Kombinasikan pembelajaran mandiri (self-paced), sesi tatap muka interaktif, dan pendampingan mentor untuk memaksimalkan retensi materi.
            </p>
          </div>

          <div className="corp-methods-grid">
            <div className="corp-method-card">
              <div className="corp-method-badge">ONSITE / IN-HOUSE</div>
              <h3 className="corp-method-title">In-House Bootcamps &amp; Workshops</h3>
              <p className="corp-method-desc">
                Instruktur dan praktisi senior kami hadir langsung di kantor Anda untuk memandu sesi praktik intensif, lab coding bareng, dan simulasi proyek riil tim Anda.
              </p>
              <ul className="corp-method-features">
                <li>Tatap muka interaktif &amp; tanya jawab langsung</li>
                <li>Disesuaikan dengan codebase / data perusahaan</li>
                <li>Membangun ikatan kolaborasi tim yang solid</li>
              </ul>
            </div>

            <div className="corp-method-card featured">
              <div className="corp-method-badge gold">HYBRID / ONLINE LIVE</div>
              <h3 className="corp-method-title">Interactive Live Virtual Sessions</h3>
              <p className="corp-method-desc">
                Sesi webinar interaktif melalui Zoom/Google Meet dengan fitur breakout room praktikum, pair programming, dan live coding feedback dari mentor.
              </p>
              <ul className="corp-method-features">
                <li>Jangkauan fleksibel untuk tim remote / cabang</li>
                <li>Rekaman sesi HD dapat diakses ulang kapan saja</li>
                <li>Sesi Q&amp;A intensif dengan Principal Specialist</li>
              </ul>
            </div>

            <div className="corp-method-card">
              <div className="corp-method-badge">SELF-PACED + MENTOR</div>
              <h3 className="corp-method-title">LMS Platform &amp; Human Code Review</h3>
              <p className="corp-method-desc">
                Karyawan belajar secara mandiri kapan saja di platform ANVIEO dengan kurikulum terstruktur dan evaluasi tugas baris-demi-baris oleh Reviewer &lt; 12 jam.
              </p>
              <ul className="corp-method-features">
                <li>Akses modul belajar 24/7 tanpa mengganggu jam kerja</li>
                <li>Reviewer manusia memastikan kualitas kode berstandar tinggi</li>
                <li>Ujian sertifikasi kelulusan resmi kompetensi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Dashboard & Realtime Analytics Feature */}
      <section className="corp-dashboard-feature-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">04 // ENTERPRISE HR &amp; ANALYTICS DASHBOARD</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>MONITORING</dt>
                <dd>REALTIME PROGRESS TRACKING</dd>
              </div>
              <div>
                <dt>REVIEW SLA</dt>
                <dd>&lt; 12 JAM GUARANTEED</dd>
              </div>
              <div>
                <dt>COMPLIANCE</dt>
                <dd>FAKTUR PAJAK &amp; B2B LEGAL</dd>
              </div>
            </dl>
          </div>

          <div className="corp-dashboard-feature-grid">
            <div className="corp-dashboard-feature-left">
              <span className="lp-hero-badge">DASHBOARD HR &amp; MANAGEMENT</span>
              <h2 className="corp-dashboard-title">Pantau Progres Belajar Tim Anda Secara Real-Time</h2>
              <p className="corp-dashboard-desc">
                LMS ANVIEO Enterprise dilengkapi dengan dashboard analitik terpadu untuk tim HR dan manajer divisi. Anda dapat memantau tingkat penyelesaian modul, nilai tugas, passing grade sertifikasi, dan performa tim secara transparan.
              </p>

              <div className="corp-dashboard-points">
                <div className="corp-point-item">
                  <span className="corp-point-icon" style={{ display: "inline-flex", alignItems: "center", marginRight: "8px" }}><FlatIcon type="chart" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong>Laporan Analitik Kompetensi</strong>
                    <p>Ekspor laporan performa berkala dalam format PDF/Excel untuk evaluasi KPI triwulanan.</p>
                  </div>
                </div>

                <div className="corp-point-item">
                  <span className="corp-point-icon" style={{ display: "inline-flex", alignItems: "center", marginRight: "8px" }}><FlatIcon type="clock" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong>SLA Reviewer Terjamin &lt; 12 Jam</strong>
                    <p>Setiap submisi tugas karyawan dinilai cepat agar progres belajar tidak terhambat.</p>
                  </div>
                </div>

                <div className="corp-point-item">
                  <span className="corp-point-icon" style={{ display: "inline-flex", alignItems: "center", marginRight: "8px" }}><FlatIcon type="document" size={16} color="var(--gold)" /></span>
                  <div>
                    <strong>Faktur Pajak &amp; Administrasi Resmi</strong>
                    <p>Dukungan lengkap dokumen legalitas, SPK korporat, faktur pajak PPN resmi, dan terms of payment B2B.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="corp-dashboard-feature-right">
              {/* Mockup Dashboard Card */}
              <div className="corp-dashboard-mockup">
                <div className="corp-mockup-header">
                  <span className="corp-mockup-dot red"></span>
                  <span className="corp-mockup-dot yellow"></span>
                  <span className="corp-mockup-dot green"></span>
                  <span className="corp-mockup-title">ANVIEO Enterprise HR Analytics Dashboard</span>
                </div>
                <div className="corp-mockup-body">
                  <div className="corp-mockup-stats-row">
                    <div className="corp-mstat-box">
                      <span className="corp-mstat-num">94.8%</span>
                      <span className="corp-mstat-lbl">Completion Rate</span>
                    </div>
                    <div className="corp-mstat-box">
                      <span className="corp-mstat-num">142</span>
                      <span className="corp-mstat-lbl">Active Employees</span>
                    </div>
                    <div className="corp-mstat-box">
                      <span className="corp-mstat-num">4.87 / 5</span>
                      <span className="corp-mstat-lbl">Avg. Review Score</span>
                    </div>
                  </div>

                  <div className="corp-mockup-progress-bars">
                    <div className="corp-mprog-item">
                      <div className="corp-mprog-label">
                        <span>AI &amp; Machine Learning Squad</span>
                        <span>98%</span>
                      </div>
                      <div className="corp-mprog-track">
                        <div className="corp-mprog-fill" style={{ width: "98%" }}></div>
                      </div>
                    </div>

                    <div className="corp-mprog-item">
                      <div className="corp-mprog-label">
                        <span>Marketing &amp; Growth AI Ops</span>
                        <span>92%</span>
                      </div>
                      <div className="corp-mprog-track">
                        <div className="corp-mprog-fill" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div className="corp-mprog-item">
                      <div className="corp-mprog-label">
                        <span>Corporate Finance &amp; Valuation</span>
                        <span>89%</span>
                      </div>
                      <div className="corp-mprog-track">
                        <div className="corp-mprog-fill" style={{ width: "89%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Lead Generation Form */}
      <section id="form" className="corp-form-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">05 // REQUEST FOR PROPOSAL &amp; CONSULTATION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>RESPONSE TIME</dt>
                <dd>&lt; 24 JAM KERJA</dd>
              </div>
              <div>
                <dt>CONSULTATION</dt>
                <dd>FREE 1-ON-1 SCOPING</dd>
              </div>
              <div>
                <dt>PROPOSAL</dt>
                <dd>CUSTOMIZED WBS &amp; PRICING</dd>
              </div>
            </dl>
          </div>

          <div className="corp-form-card">
            <div className="corp-form-header">
              <span className="lp-hero-badge">FORMULIR PENAWARAN KORPORAT</span>
              <h2 className="corp-form-title">Konsultasikan Kebutuhan Pelatihan Tim Anda</h2>
              <p className="corp-form-subtitle">
                Isi formulir di bawah ini. Tim Corporate Solutions Consultant kami akan menghubungi Anda dalam waktu 1x24 jam kerja untuk menyusun kurikulum kustom dan estimasi investasi.
              </p>
            </div>

            {formSubmitted ? (
              <div className="corp-form-success">
                <div className="corp-success-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="award" size={28} color="var(--gold)" /></div>
                <h3 className="corp-success-title">Terima Kasih, Permintaan Anda Telah Diterima!</h3>
                <p className="corp-success-desc">
                  Tim konsultan corporate training kami akan segera menghubungi <strong>{formData.email}</strong> atau WhatsApp <strong>{formData.phone}</strong> dengan proposal kurikulum kustom dan penawaran resmi.
                </p>
                <button
                  type="button"
                  className="lp-btn-primary"
                  onClick={() => setFormSubmitted(false)}
                >
                  Kirim Permintaan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="corp-form-grid" suppressHydrationWarning>
                <div className="corp-form-field">
                  <label>Nama Lengkap PIC / Penanggung Jawab *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Raditya Pratama"
                    value={formData.picName}
                    onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Nama Perusahaan / Institusi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Bank Central Teknologi Tbk"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>Alamat Email Kantor (Work Email) *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.co.id"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="corp-form-field">
                  <label>No. WhatsApp / Telepon Aktif *</label>
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
                  <label>Estimasi Jumlah Peserta Pelatihan *</label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="5-15">5 - 15 Karyawan (Small Squad)</option>
                    <option value="16-50">16 - 50 Karyawan (Division Level)</option>
                    <option value="51-150">51 - 150 Karyawan (Multi-Department)</option>
                    <option value="150+">&gt; 150 Karyawan (Enterprise-wide)</option>
                  </select>
                </div>

                <div className="corp-form-field">
                  <label>Program / Track yang Diminati *</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    suppressHydrationWarning
                  >
                    <option value="AI Professional Productivity (Non-Tech)">AI Professional Productivity (Non-Tech)</option>
                    <option value="Advanced Software Engineering & AI Architect (Tech)">Advanced Software Engineering &amp; AI Architect (Tech)</option>
                    <option value="Executive AI Strategy & Governance (Leadership)">Executive AI Strategy &amp; Governance (Leadership)</option>
                    <option value="Custom Curriculum Tailored by Industry">Kurikulum Kustom Khusus Industri Kami</option>
                  </select>
                </div>

                <div className="corp-form-field full-width">
                  <label>Catatan Tambahan &amp; Target Transformasi Tim (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan target spesifik atau teknologi yang saat ini digunakan di perusahaan Anda..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <div className="corp-form-field full-width">
                  <button type="submit" className="lp-btn-primary corp-submit-btn">
                    Kirim Permintaan Proposal &amp; Penawaran Resmi →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
