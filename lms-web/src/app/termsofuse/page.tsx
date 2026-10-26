"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

export default function TermsOfUsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("sec-1");

  const sections = [
    { id: "sec-1", title: "1. Akses dan Penggunaan ANVIEO Academy secara Umum" },
    { id: "sec-2", title: "2. Akun Pengguna & Larangan Account Sharing" },
    { id: "sec-3", title: "3. Konten Kelas, Kurikulum, & Hak Cipta DJKI RI" },
    { id: "sec-4", title: "4. Ketentuan Submission Kode & Reviewer SLA 3×24 Jam" },
    { id: "sec-5", title: "5. Kebijakan Penggunaan Artificial Intelligence (AI)" },
    { id: "sec-6", title: "6. Pembelian Single Course, Langganan, & Token" },
    { id: "sec-7", title: "7. Integritas Akademik & Larangan Keras Plagiarisme" },
    { id: "sec-8", title: "8. Batasan Tanggung Jawab & Hukum yang Berlaku" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <SiteHeader />

      {/* Breadcrumb Rails */}
      <section style={{ borderBottom: "1px solid var(--bx-grid)", background: "var(--bx-surface)" }}>
        <BlackboxRails position="top" />
        <div className="blackbox-frame" style={{ padding: "14px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "var(--bx-ink-faint)", fontFamily: "monospace" }}>
              <Link href="/" style={{ color: "var(--bx-ink-dim)", textDecoration: "none" }}>HOME</Link>
              <span>/</span>
              <span style={{ color: "var(--bx-ink-faint)" }}>LEGAL</span>
              <span>/</span>
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>01 // ATURAN DAN SYARAT PENGGUNAAN</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
              <span>DOKUMEN RESMI HUKUM</span>
              <span>•</span>
              <span style={{ color: "var(--gold)" }}>BERLAKU: EDISI TAHUN 2026</span>
            </div>
          </div>
        </div>
        <BlackboxRails position="bottom" />
      </section>

      {/* Hero Header Strip */}
      <section style={{ borderBottom: "1px solid var(--bx-grid)", background: "var(--bx-bg)", padding: "40px 0 32px" }}>
        <div className="blackbox-frame" style={{ padding: "0 24px" }}>
          <div style={{ maxWidth: "860px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              background: "rgba(201, 150, 46, 0.12)",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: "var(--gold)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}>
              <FlatIcon type="document" size={13} color="var(--gold)" />
              PERJANJIAN LISENSI PENGGUNA AKHIR (TERMS OF USE)
            </div>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--bx-ink-bright)",
              margin: "0 0 14px",
              lineHeight: 1.25
            }}>
              Aturan dan Syarat Penggunaan Platform
            </h1>
            <p style={{
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--bx-ink-dim)",
              margin: "0 0 24px"
            }}>
              Selamat datang di ANVIEO Academy. Harap membaca Aturan dan Syarat Penggunaan ini dengan saksama sebelum mengakses, mendaftar, atau menggunakan layanan kurikulum, submission kode, dan sertifikasi kami. Dengan melakukan login atau mendaftar, Anda menyetujui seluruh ketentuan di bawah ini.
            </p>

            {/* Quick Actions Row */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/login"
                className="blackbox-pill blackbox-pill-black"
                style={{ padding: "8px 16px", fontSize: "0.8125rem" }}
              >
                ← Kembali ke Login
              </Link>
              <Link
                href="/register"
                className="blackbox-outline"
                style={{ padding: "8px 16px", fontSize: "0.8125rem" }}
              >
                Daftar Akun Baru →
              </Link>
              <a
                href="https://www.dicoding.com/termsofuse"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8125rem",
                  color: "var(--bx-ink-dim)",
                  textDecoration: "underline",
                  marginLeft: "8px"
                }}
              >
                Referensi Standar: dicoding.com/termsofuse ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Table of Contents Layout */}
      <main style={{ flex: 1, padding: "40px 0 64px" }}>
        <div className="blackbox-frame" style={{ padding: "0 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)",
            gap: "36px",
            alignItems: "start"
          }}>
            
            {/* LEFT: Sticky Table of Contents */}
            <aside style={{ position: "sticky", top: "84px", display: "none" }} className="d-lg-block">
              <div style={{
                background: "var(--bx-surface)",
                border: "1px solid var(--bx-border)",
                borderRadius: "var(--radius-xs)",
                padding: "20px"
              }}>
                <div style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "14px"
                }}>
                  DAFTAR PASAL &amp; KETENTUAN
                </div>

                {/* Quick Search */}
                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    placeholder="Cari kata kunci legal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="auth-input-field"
                    style={{ padding: "8px 12px", fontSize: "0.8125rem" }}
                  />
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {sections
                    .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          background: activeSection === item.id ? "rgba(201, 150, 46, 0.12)" : "transparent",
                          border: "none",
                          borderLeft: activeSection === item.id ? "3px solid var(--gold)" : "3px solid transparent",
                          padding: "8px 10px",
                          textAlign: "left",
                          fontSize: "0.8125rem",
                          color: activeSection === item.id ? "var(--bx-ink-bright)" : "var(--bx-ink-dim)",
                          fontWeight: activeSection === item.id ? 700 : 500,
                          cursor: "pointer",
                          borderRadius: "0 2px 2px 0",
                          lineHeight: 1.45,
                          transition: "all var(--transition-fast)"
                        }}
                      >
                        {item.title}
                      </button>
                    ))}
                </nav>

                <div style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--bx-border)",
                  fontSize: "0.75rem",
                  color: "var(--bx-ink-faint)",
                  lineHeight: 1.5
                }}>
                  Punya pertanyaan seputar hukum atau lisensi? Hubungi{" "}
                  <a href="mailto:legal@anvieo.ac.id" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                    legal@anvieo.ac.id
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT: Legal Clauses Content */}
            <div className="terms-content-card">
              
              {/* Notice Banner */}
              <div style={{
                padding: "16px 20px",
                background: "rgba(201, 150, 46, 0.08)",
                border: "1px solid rgba(201, 150, 46, 0.3)",
                borderRadius: "4px",
                marginBottom: "36px"
              }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <FlatIcon type="shield" size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                      Pemberitahuan Persetujuan Hukum (Binding Agreement)
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink)", margin: 0, lineHeight: 1.5 }}>
                      Dengan mendaftar, mengakses, atau menggunakan layanan platform ANVIEO Academy, Anda dianggap telah membaca, memahami, dan menyetujui seluruh isi dalam Aturan dan Syarat Penggunaan ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, harap tidak melanjutkan akses ke sistem kami.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 1 */}
              <article id="sec-1" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  1. Akses dan Penggunaan ANVIEO Academy secara Umum
                </h2>
                <ul style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Persyaratan Usia:</strong> Anda wajib berusia minimal 17 (tujuh belas) tahun atau telah cakap secara hukum. Pengguna yang berusia di bawah 17 tahun wajib menggunakan layanan di bawah pengawasan dan persetujuan tertulis dari orang tua atau wali yang sah.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Lisensi Terbatas:</strong> ANVIEO memberikan lisensi terbatas, non-eksklusif, tidak dapat dipindahtangankan, dan dapat dicabut sewaktu-waktu semata-mata untuk tujuan pembelajaran pribadi non-komersial.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Akurasi Identitas:</strong> Anda wajib mengisi data nama lengkap sesuai dengan identitas resmi (KTP/Paspor) agar pencetakan sertifikat digital kelulusan valid untuk verifikasi kerja di pihak ketiga.
                  </li>
                  <li>
                    <strong>Ketersediaan Sistem:</strong> Kami berupaya mempertahankan ketersediaan platform 99.9% uptime, namun tidak bertanggung jawab atas gangguan jaringan internet penyedia telekomunikasi atau kejadian force majeure di luar kendali wajar.
                  </li>
                </ul>
              </article>

              {/* SECTION 2 */}
              <article id="sec-2" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  2. Akun Pengguna &amp; Larangan Account Sharing
                </h2>
                <ul style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Satu Akun Per Individu:</strong> Setiap siswa hanya diperbolehkan memiliki 1 (satu) akun dengan email yang terverifikasi. Pembelajaran, poin, XP, dan riwayat sertifikat melekat secara personal pada pemilik akun.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Larangan Keras Berbagi Akun (No Account Sharing):</strong> Dilarang keras meminjamkan, menyewakan, atau memberikan kredensial login (email/password atau Google SSO) kepada pihak lain. Sistem kami menerapkan deteksi otomatis terhadap login anomali dari lokasi berbarengan.
                  </li>
                  <li>
                    <strong>Penangguhan Akun:</strong> Pelanggaran terhadap kepemilikan akun berakibat pada pembekuan (suspend) sementara atau permanen tanpa pengembalian biaya langganan yang telah dibayarkan.
                  </li>
                </ul>
              </article>

              {/* SECTION 3 */}
              <article id="sec-3" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  3. Konten Kelas, Kurikulum, &amp; Hak Kekayaan Intelektual (HAKI)
                </h2>
                <ul style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Perlindungan Hak Cipta DJKI:</strong> Seluruh materi modul teks, repositori referensi, video penjelasan, diagram arsitektur, dan kuis telah didaftarkan hak ciptanya di Direktorat Jenderal Kekayaan Intelektual (DJKI), Kementerian Hukum dan HAM Republik Indonesia.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Larangan Redistribusi:</strong> Dilarang menggandakan, merekam layar untuk dijual kembali, membuat modul bajakan, atau menyebarkan kunci jawaban tugas submission di forum publik mana pun.
                  </li>
                  <li>
                    <strong>Tuntutan Pidana:</strong> Tindakan pembajakan modul dan komersialisasi materi tanpa izin tertulis akan diproses secara tegas melalui jalur hukum pidana dan perdata sesuai UU No. 28 Tahun 2014 tentang Hak Cipta.
                  </li>
                </ul>
              </article>

              {/* SECTION 4 */}
              <article id="sec-4" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  4. Ketentuan Submission Kode &amp; Reviewer SLA 3×24 Jam
                </h2>
                <ul style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Standar Review Maksimal 3×24 Jam:</strong> ANVIEO Academy berkomitmen memeriksa submission proyek akhir Anda dalam waktu maksimal 3×24 jam pada hari kerja efektif (tidak termasuk hari libur resmi nasional).
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Hak Cipta Kode Siswa:</strong> Anda tetap memegang hak cipta atas kode orisinal yang Anda tulis. Dengan mengunggah tugas, Anda memberikan izin kepada reviewer ANVIEO untuk menginspeksi, menjalankan unit test, dan memberikan saran perbaikan arsitektur kode.
                  </li>
                  <li>
                    <strong>Mekanisme Banding:</strong> Apabila siswa merasa hasil penilaian reviewer kurang sesuai dengan kriteria rubrik yang tertulis, siswa berhak mengajukan banding melalui tombol &ldquo;Banding Review&rdquo; dalam waktu 7 (tujuh) hari kalender sejak review diterbitkan.
                  </li>
                </ul>
              </article>

              {/* SECTION 5 */}
              <article id="sec-5" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  5. Kebijakan Penggunaan Artificial Intelligence (AI) dalam Pembelajaran
                </h2>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--bx-ink-dim)", margin: "0 0 14px" }}>
                  ANVIEO Academy menyambut positif perkembangan Artificial Intelligence (AI) sebagai sarana penunjang akselerasi engineer modern. Namun pengguna wajib mematuhi etika akademik:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div style={{
                    padding: "14px",
                    background: "rgba(34, 197, 94, 0.06)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: "4px"
                  }}>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#22C55E", marginBottom: "6px" }}>
                      ✅ Penggunaan AI yang Diperbolehkan:
                    </div>
                    <ul style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--bx-ink-dim)", paddingLeft: "16px", margin: 0 }}>
                      <li>Menjelaskan konsep algoritma yang belum dipahami</li>
                      <li>Meminta saran perbaikan struktur kode (code refactoring)</li>
                      <li>Membantu proses debugging pesan error syntax</li>
                    </ul>
                  </div>
                  <div style={{
                    padding: "14px",
                    background: "rgba(239, 68, 68, 0.06)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "4px"
                  }}>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#EF4444", marginBottom: "6px" }}>
                      ❌ Penggunaan AI yang Dilarang Keras:
                    </div>
                    <ul style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--bx-ink-dim)", paddingLeft: "16px", margin: 0 }}>
                      <li>Menyalin mentah-mentah seluruh kode proyek akhir tanpa pemahaman</li>
                      <li>Menggunakan AI prompt untuk mengerjakan kuis dan evaluasi kelulusan</li>
                      <li>Mengunggah data rahasia/pribadi ke platform AI publik (UU PDP 2022)</li>
                    </ul>
                  </div>
                </div>
              </article>

              {/* SECTION 6 */}
              <article id="sec-6" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  6. Pembelian Single Course, Langganan (Subscription), &amp; Token
                </h2>
                <ul style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Single Course:</strong> Pembelian single course memberikan hak akses materi dan 1 kali sertifikasi pada kelas spesifik yang dipilih untuk durasi 30 hari kalender.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Plus Subscription:</strong> Paket langganan berkala (1 bulan, 3 bulan, 6 bulan, 1 tahun) memberikan akses tanpa batas ke seluruh katalog 14+ Learning Paths selama masa aktif berlangsung.
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <strong>Token Beasiswa:</strong> Token yang diperoleh dari program Corporate Social Relationship (CSR) seperti Bangkit, DBS Foundation, atau IDCamp bersifat personal dan tidak dapat diperjualbelikan kepada pihak lain.
                  </li>
                  <li>
                    <strong>Kebijakan Pengembalian Dana:</strong> Pembayaran yang telah berhasil diproses melalui payment gateway bersifat final dan tidak dapat di-refund, kecuali terjadi kegagalan teknis berulang dari pihak sistem kami.
                  </li>
                </ul>
              </article>

              {/* SECTION 7 */}
              <article id="sec-7" style={{ marginBottom: "40px", scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  7. Integritas Akademik &amp; Larangan Keras Plagiarisme
                </h2>
                <div style={{
                  padding: "16px",
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  borderRadius: "4px",
                  marginBottom: "16px"
                }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#EF4444", marginBottom: "6px" }}>
                    ZERO TOLERANCE UNTUK JASA PIHAK KETIGA (JOKI) DAN KECURANGAN
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink)", lineHeight: 1.5, margin: 0 }}>
                    ANVIEO Academy menerapkan algoritma deteksi plagiarisme cerdas (AST Analysis &amp; Vector Fingerprinting). Apabila siswa terbukti menggunakan jasa joki atau menyalin kode repositori milik orang lain, akun yang bersangkutan akan langsung <strong>dinonaktifkan secara permanen</strong> dan seluruh sertifikat kelulusan dicabut.
                  </p>
                </div>
              </article>

              {/* SECTION 8 */}
              <article id="sec-8" style={{ scrollMarginTop: "90px" }}>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  borderBottom: "1px solid var(--bx-border)",
                  paddingBottom: "10px",
                  margin: "0 0 16px"
                }}>
                  8. Batasan Tanggung Jawab &amp; Hukum yang Berlaku
                </h2>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--bx-ink-dim)", margin: "0 0 16px" }}>
                  Aturan dan Syarat Penggunaan ini diatur dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul sehubungan dengan penafsiran atau pelaksanaan ketentuan ini akan diselesaikan secara musyawarah untuk mufakat. Apabila tidak tercapai mufakat dalam waktu 30 hari, perselisihan akan diselesaikan melalui Pengadilan Negeri Jakarta Selatan.
                </p>
                
                {/* Contact Box */}
                <div style={{
                  padding: "18px 20px",
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px"
                }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                      Tim Kepatuhan Hukum ANVIEO Academy
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)" }}>
                      PT ANVIEO TEKNOLOGI NUSANTARA • Jakarta Selatan, DKI Jakarta
                    </div>
                  </div>
                  <a
                    href="mailto:legal@anvieo.ac.id"
                    className="blackbox-pill blackbox-pill-black"
                    style={{ padding: "8px 16px", fontSize: "0.8125rem", textDecoration: "none" }}
                  >
                    Kirim Surat ke Tim Legal →
                  </a>
                </div>
              </article>

            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
