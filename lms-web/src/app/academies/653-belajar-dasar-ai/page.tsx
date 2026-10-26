"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface SyllabusLesson {
  title: string;
  duration: string;
  type: "article" | "quiz" | "exam";
  isLocked?: boolean;
}

interface SyllabusCategory {
  id: string;
  title: string;
  description: string;
  totalTime: string;
  articleCount: number;
  quizCount: number;
  examCount: number;
  lessons: SyllabusLesson[];
}

const SYLLABUS_CATEGORIES: SyllabusCategory[] = [
  {
    id: "persiapan-belajar",
    title: "Persiapan Belajar",
    description:
      "Modul ini mengenalkan sistem belajar di kelas secara umum mulai dari Persetujuan Hak Cipta, Prasyarat Kemampuan, Prasyarat Tools, Mekanisme Belajar, Forum Diskusi, Glosarium, hingga Daftar Referensi.",
    totalTime: "40 menit",
    articleCount: 7,
    quizCount: 0,
    examCount: 0,
    lessons: [
      { title: "Persetujuan Hak Cipta", duration: "1 Menit", type: "article" },
      { title: "Prasyarat Kemampuan", duration: "5 Menit", type: "article" },
      { title: "Prasyarat Tools", duration: "5 Menit", type: "article" },
      { title: "Mekanisme Belajar", duration: "10 Menit", type: "article" },
      { title: "Forum Diskusi", duration: "10 Menit", type: "article" },
      { title: "Glosarium", duration: "5 Menit", type: "article" },
      { title: "Daftar Referensi", duration: "4 Menit", type: "article" },
    ],
  },
  {
    id: "berkenalan-ai",
    title: "Berkenalan dengan Artificial Intelligence (AI)",
    description:
      "Modul ini mengenalkan konsep dasar dari Artificial Intelligence dan beberapa sub-bidang yang ada pada AI hingga contoh penerapannya pada industri nyata.",
    totalTime: "90 menit",
    articleCount: 6,
    quizCount: 0,
    examCount: 1,
    lessons: [
      { title: "Penerapan AI dalam Dunia Nyata", duration: "10 Menit", type: "article" },
      { title: "Pengenalan AI", duration: "15 Menit", type: "article" },
      { title: "Sejarah Perkembangan AI", duration: "15 Menit", type: "article" },
      { title: "Definisi Kecerdasan Buatan", duration: "15 Menit", type: "article" },
      { title: "Narrow AI vs General AI (AGI)", duration: "15 Menit", type: "article" },
      { title: "Rangkuman Berkenalan dengan AI", duration: "5 Menit", type: "article" },
      { title: "Kuis Evaluasi: Pengenalan AI", duration: "15 Menit", type: "exam" },
    ],
  },
  {
    id: "subbidang-ai",
    title: "Mengenal Sub-bidang AI",
    description:
      "Membahas berbagai disiplin ilmu di dalam AI: Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, dan Generative AI.",
    totalTime: "150 menit",
    articleCount: 8,
    quizCount: 1,
    examCount: 1,
    lessons: [
      { title: "Peta Cabang Keilmuan AI", duration: "10 Menit", type: "article" },
      { title: "Dasar Machine Learning: Supervised vs Unsupervised", duration: "25 Menit", type: "article" },
      { title: "Deep Learning & Artificial Neural Networks", duration: "25 Menit", type: "article" },
      { title: "Computer Vision: Pengolahan Citra Digital", duration: "20 Menit", type: "article" },
      { title: "Natural Language Processing (NLP)", duration: "20 Menit", type: "article" },
      { title: "Generative AI & Large Language Models", duration: "20 Menit", type: "article" },
      { title: "Rangkuman Sub-bidang AI", duration: "10 Menit", type: "article" },
      { title: "Latihan Interaktif: Identifikasi Kasus AI", duration: "10 Menit", type: "quiz" },
      { title: "Kuis Evaluasi: Sub-bidang AI", duration: "10 Menit", type: "exam" },
    ],
  },
  {
    id: "tata-kelola-etika",
    title: "Etika, Regulasi & Tata Kelola AI",
    description:
      "Mempelajari tantangan etika kecerdasan buatan, bias data, transparansi algoritma, UU Perlindungan Data Pribadi (UU PDP), dan kerangka kerja NIST AI RMF.",
    totalTime: "60 menit",
    articleCount: 5,
    quizCount: 0,
    examCount: 1,
    lessons: [
      { title: "Tantangan Etika dalam Pengembangan AI", duration: "10 Menit", type: "article" },
      { title: "Bias Algoritma & Fairness Data", duration: "15 Menit", type: "article" },
      { title: "Kepatuhan UU Perlindungan Data Pribadi (UU PDP)", duration: "15 Menit", type: "article" },
      { title: "Standar Keamanan AI (NIST AI Risk Management)", duration: "10 Menit", type: "article" },
      { title: "Rangkuman Etika AI", duration: "5 Menit", type: "article" },
      { title: "Kuis: Tata Kelola AI Bertanggung Jawab", duration: "5 Menit", type: "exam" },
    ],
  },
  {
    id: "evaluasi-akhir",
    title: "Evaluasi & Ujian Akhir Kelas",
    description:
      "Ujian komprehensif pilihan ganda untuk menguji pemahaman menyeluruh materi Belajar Dasar AI sebagai syarat penerbitan sertifikat kompetensi.",
    totalTime: "60 menit",
    articleCount: 2,
    quizCount: 0,
    examCount: 1,
    lessons: [
      { title: "Panduan Teknis Ujian Akhir", duration: "5 Menit", type: "article" },
      { title: "Ujian Akhir Belajar Dasar AI (30 Soal)", duration: "50 Menit", type: "exam" },
      { title: "Klaim Sertifikat Kompetensi Digital", duration: "5 Menit", type: "article" },
    ],
  },
];

const REVIEWS_DATA = [
  {
    name: "Ahmad Farhan Pratama",
    role: "Mahasiswa Teknik Informatika",
    rating: 5,
    date: "14 Oktober 2026",
    comment:
      "Materi disajikan dengan sangat runtut dan mudah dipahami meski tanpa background matematika rumit. Penjelasan mengenai etika AI dan UU PDP sangat membuka wawasan!",
  },
  {
    name: "Jessica Putri Lestari",
    role: "Product Manager",
    rating: 5,
    date: "8 Oktober 2026",
    comment:
      "Sangat bermanfaat untuk profesional non-engineer seperti saya. Sekarang saya bisa berkomunikasi dan merumuskan spesifikasi produk AI dengan tim data scientist secara jauh lebih percaya diri.",
  },
  {
    name: "Dimas Suryo Nugroho",
    role: "Software Developer",
    rating: 5,
    date: "29 September 2026",
    comment:
      "Langkah awal yang sempurna sebelum masuk ke alur pemrograman Python dan Machine Learning. Kuis dan ujiannya benar-benar menguji pemahaman konseptual.",
  },
];

export default function BelajarDasarAiAcademyPage() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "persiapan-belajar": true,
    "berkenalan-ai": true,
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllCategories = () => {
    const allOpen: Record<string, boolean> = {};
    SYLLABUS_CATEGORIES.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const collapseAllCategories = () => {
    setOpenCategories({});
  };

  return (
    <>
      <SiteHeader activeTabOverride="learning-path" />

      <main className="blackbox-page" style={{ paddingTop: "64px" }}>
        {/* Breadcrumb Navigation Rail */}
        <section style={{ borderBottom: "1px solid var(--bx-grid)", padding: "14px 0", background: "var(--bx-bg)" }}>
          <div className="blackbox-frame">
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem" }}>
              <Link href="/" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                Beranda
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <Link href="/learningpaths/65" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                Learning Path
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <Link href="/learningpaths/65" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                AI Engineer
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>Belajar Dasar AI</span>
            </nav>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* HERO SECTION */}
        <section style={{ padding: "50px 0 40px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div style={{ maxWidth: "860px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  border: "1px solid var(--gold)",
                  borderRadius: "2px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                LEVEL DASAR // ARTIFICIAL INTELLIGENCE // LANGKAH 1 DARI 6
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 3.6vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "var(--bx-ink-bright)",
                  marginBottom: "16px",
                }}
              >
                Belajar Dasar AI
              </h1>

              <p style={{ fontSize: "1.0625rem", lineHeight: 1.65, color: "var(--bx-ink-soft)", marginBottom: "28px" }}>
                Pelajari konsep fundamental kecerdasan buatan (Artificial Intelligence), cabang keilmuan Machine
                Learning, Deep Learning, Generative AI, serta tata kelola etika dan kepatuhan hukum regulasi digital
                standar industri.
              </p>

              {/* Meta Chips Grid */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "20px",
                  padding: "16px 20px",
                  background: "var(--bx-surface)",
                  border: "1px solid var(--bx-grid)",
                  borderRadius: "2px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlatIcon type="time" size={16} color="var(--gold)" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    10 Jam Belajar
                  </span>
                </div>
                <div style={{ width: "1px", height: "20px", background: "var(--bx-grid)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FlatIcon type="star" size={16} color="#EAB308" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>4.86</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>(38.400+ Ulasan)</span>
                </div>
                <div style={{ width: "1px", height: "20px", background: "var(--bx-grid)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlatIcon type="book" size={16} color="var(--gold)" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    39 Modul Belajar
                  </span>
                </div>
                <div style={{ width: "1px", height: "20px", background: "var(--bx-grid)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlatIcon type="user" size={16} color="var(--gold)" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    246.266 Siswa Terdaftar
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                <Link
                  href="/subscriptions/single-course-653/checkout"
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ textDecoration: "none", fontSize: "0.875rem", padding: "12px 24px" }}
                >
                  BERLANGGANAN SEKARANG →
                </Link>
                <a
                  href="#course-syllabus-section"
                  className="blackbox-pill blackbox-pill-black"
                  style={{ textDecoration: "none", fontSize: "0.875rem", padding: "12px 20px" }}
                >
                  LIHAT SILABUS LENGKAP ↓
                </a>
                <Link
                  href="/subscriptions/purchases"
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--bx-ink-faint)",
                    textDecoration: "underline",
                    marginLeft: "8px",
                  }}
                >
                  Lihat langganan lainnya
                </Link>
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION: FASILITAS BELAJAR */}
        <section style={{ padding: "36px 0", background: "var(--bx-surface)", borderBottom: "1px solid var(--bx-border)", position: "relative" }}>
          <BlackboxRails position="bottom" />
          <div className="blackbox-frame">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                { title: "Modul Tutorial", desc: "Materi bacaan elektronik interaktif yang disajikan bahasa praktis.", icon: "book" },
                { title: "Kuis Pilihan Ganda", desc: "Uji pemahaman per bab sebelum lanjut ke modul berikutnya.", icon: "check" },
                { title: "Ujian Evaluasi Akhir", desc: "Validasi pengetahuan menyeluruh sebagai syarat kelulusan.", icon: "award" },
                { title: "Forum Diskusi Aktif", desc: "Tanya jawab langsung bersama instruktur dan komunitas developer.", icon: "terminal" },
                { title: "Sertifikat Digital", desc: "Sertifikat resmi terakreditasi dengan verifikasi hash SHA-256.", icon: "certificate" },
              ].map((fac, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-grid)",
                    padding: "18px 16px",
                    borderRadius: "2px",
                  }}
                >
                  <div style={{ color: "var(--gold)", marginBottom: "8px" }}>
                    <FlatIcon type={fac.icon as any} size={20} />
                  </div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                    {fac.title}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", lineHeight: 1.5, margin: 0 }}>
                    {fac.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STICKY IN-PAGE NAVIGATION */}
        <nav
          style={{
            position: "sticky",
            top: "60px",
            zIndex: 900,
            background: "var(--bx-bg)",
            borderBottom: "1px solid var(--bx-grid)",
          }}
        >
          <div className="blackbox-frame">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "48px" }}>
              <div style={{ display: "flex", gap: "24px", overflowX: "auto" }}>
                <a href="#course-description-section" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}>
                  Deskripsi Kelas
                </a>
                <a href="#learning-path-position" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                  Learning Path
                </a>
                <a href="#course-syllabus-section" style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--gold)", textDecoration: "none" }}>
                  Silabus Materi (39 Modul)
                </a>
                <a href="#student-reviews" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                  Testimoni Siswa
                </a>
              </div>

              <div>
                <Link
                  href="/subscriptions/single-course-653/checkout"
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ fontSize: "0.75rem", padding: "6px 14px", textDecoration: "none" }}
                >
                  BERLANGGANAN SEKARANG →
                </Link>
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </nav>

        {/* SECTION: DESKRIPSI & TARGET SASARAN */}
        <section id="course-description-section" style={{ padding: "50px 0", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px" }}>
              {/* Left Column: Description */}
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "16px" }}>
                  Deskripsi Kelas
                </h2>
                <div style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--bx-ink-soft)" }}>
                  <p>
                    <strong>Artificial Intelligence (AI)</strong> adalah teknologi yang melibatkan peniruan perilaku
                    manusia dengan memanfaatkan mesin untuk belajar berdasarkan data yang diberikan dan melakukan tugas
                    tanpa perlu instruksi eksplisit tentang output yang diinginkan.
                  </p>
                  <p>
                    AI memiliki beberapa subbidang di dalamnya, seperti <em>Machine Learning</em>, <em>Deep Learning</em>,{" "}
                    <em>Natural Language Processing (NLP)</em>, dan <em>Generative AI</em>. Di kelas ini, Anda akan
                    mempelajari mulai dari pengenalan AI hingga membuat model AI dan penerapannya di industri.
                  </p>
                  <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <li>Memberikan pemahaman dasar tentang AI mulai dari pengertian hingga penerapannya di dunia nyata.</li>
                    <li>Menjawab kebutuhan industri yang semakin masif terhadap talenta melek kecerdasan buatan.</li>
                    <li>Dapat dipelajari oleh siapa saja tanpa memerlukan latar belakang matematika tingkat tinggi.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Target Siswa */}
              <div style={{ border: "1px solid var(--bx-grid)", background: "var(--bx-surface)", padding: "28px", borderRadius: "2px" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "14px" }}>
                  Target dan Sasaran Siswa
                </h3>
                <ul style={{ paddingLeft: "18px", fontSize: "0.875rem", color: "var(--bx-ink-soft)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li>Kelas ini ditujukan untuk pemula yang ingin memulai karier di dunia AI Engineering.</li>
                  <li>Siswa memiliki literasi komputer dasar dan mampu mengoperasikan web browser dengan baik.</li>
                  <li>Memiliki ketertarikan tinggi pada logika algoritma dan pemecahan masalah (problem solving).</li>
                  <li>Siswa berkomitmen meluangkan waktu sekitar 10 jam untuk menyelesaikan seluruh materi dan ujian kelulusan.</li>
                </ul>
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION: POSISI PADA LEARNING PATH */}
        <section id="learning-path-position" style={{ padding: "40px 0", background: "var(--bx-surface)", borderBottom: "1px solid var(--bx-border)", position: "relative" }}>
          <BlackboxRails position="bottom" />
          <div className="blackbox-frame">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--gold)", textTransform: "uppercase" }}>
                  ROADMAP SPESIALISASI KARIER
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: 0 }}>
                  Posisi Kelas pada Learning Path AI Engineer
                </h3>
              </div>
              <Link href="/learningpaths/65" style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>
                Lihat Alur Belajar Penuh (6 Kelas) →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {/* Current Step Card */}
              <div style={{ border: "2px solid var(--gold)", background: "var(--bx-bg)", padding: "20px", borderRadius: "2px" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  LANGKAH SAAT INI (LANGKAH 1)
                </span>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "0 0 6px" }}>
                  Belajar Dasar AI
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", margin: 0 }}>
                  10 Jam Belajar · 39 Modul · Level Dasar
                </p>
              </div>

              {/* Next Step Card */}
              <Link
                href="/learningpaths/65"
                style={{
                  border: "1px solid var(--bx-grid)",
                  background: "var(--bx-bg)",
                  padding: "20px",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-ink-faint)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  LANGKAH SELANJUTNYA (LANGKAH 2) →
                </span>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "0 0 6px" }}>
                  Memulai Pemrograman dengan Python
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", margin: 0 }}>
                  60 Jam Belajar · 91 Modul · Level Dasar
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: SILABUS LENGKAP (ACCORDION PER KATEGORI STANDAR ANVIEO) */}
        <section id="course-syllabus-section" style={{ padding: "60px 0 80px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>01 // COMPLETE COURSE SYLLABUS</span>
              <span>39 MODUL · 10 JAM BELAJAR TOTAL</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--bx-ink-bright)",
                    marginBottom: "6px",
                  }}
                >
                  Silabus Pembelajaran Lengkap
                </h2>
                <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", margin: 0 }}>
                  Materi yang akan Anda pelajari pada kelas ini secara terstruktur.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={expandAllCategories}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--bx-grid)",
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    color: "var(--bx-ink-bright)",
                    cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  Buka Semua Modul
                </button>
                <button
                  type="button"
                  onClick={collapseAllCategories}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--bx-grid)",
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    color: "var(--bx-ink-bright)",
                    cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  Tutup Semua Modul
                </button>
              </div>
            </div>

            {/* Accordion Categories */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {SYLLABUS_CATEGORIES.map((cat, idx) => {
                const isOpen = Boolean(openCategories[cat.id]);
                return (
                  <div
                    key={cat.id}
                    style={{
                      border: "1px solid var(--bx-grid)",
                      background: "var(--bx-card-bg)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Header Bar */}
                    <div
                      onClick={() => toggleCategory(cat.id)}
                      style={{
                        padding: "20px 24px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "16px",
                        background: isOpen ? "var(--bx-surface)" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.6875rem",
                              color: "var(--gold)",
                              fontWeight: 700,
                            }}
                          >
                            MODUL {idx + 1}
                          </span>
                          <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)" }}>•</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>{cat.totalTime}</span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.125rem",
                            fontWeight: 700,
                            color: "var(--bx-ink-bright)",
                            margin: "0 0 6px",
                          }}
                        >
                          {cat.title}
                        </h3>
                        <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-soft)", lineHeight: 1.5, margin: 0 }}>
                          {cat.description}
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                        <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                          {cat.articleCount > 0 && <span>{cat.articleCount} Artikel</span>}
                          {cat.quizCount > 0 && <span>{cat.quizCount} Kuis</span>}
                          {cat.examCount > 0 && <span>{cat.examCount} Ujian</span>}
                        </div>
                        <span
                          style={{
                            fontSize: "1.25rem",
                            color: "var(--gold)",
                            lineHeight: 1,
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          ▼
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Lesson List */}
                    {isOpen && (
                      <div style={{ borderTop: "1px solid var(--bx-grid)", padding: "8px 24px 16px" }}>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                          {cat.lessons.map((lesson, lIdx) => (
                            <li
                              key={lIdx}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 0",
                                borderBottom: lIdx === cat.lessons.length - 1 ? "none" : "1px solid var(--bx-grid)",
                                fontSize: "0.8125rem",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--bx-ink-faint)" }}>
                                  {lesson.type === "exam" ? (
                                    <FlatIcon type="award" size={15} color="var(--gold)" />
                                  ) : lesson.type === "quiz" ? (
                                    <FlatIcon type="check" size={15} color="#22c55e" />
                                  ) : (
                                    <FlatIcon type="book" size={15} />
                                  )}
                                </span>
                                <span style={{ color: "var(--bx-ink-bright)", fontWeight: lesson.type === "exam" ? 700 : 500 }}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span style={{ color: "var(--bx-ink-faint)", fontSize: "0.75rem" }}>{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Call to Action */}
            <div
              style={{
                marginTop: "40px",
                padding: "24px",
                border: "1px solid var(--gold)",
                background: "rgba(201, 150, 46, 0.05)",
                borderRadius: "2px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                  Siap Memulai Pembelajaran Belajar Dasar AI?
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-soft)", margin: 0 }}>
                  Akses langsung 39 modul dan dapatkan sertifikat kelulusan resmi berstandar industri.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <Link
                  href="/subscriptions/single-course-653/checkout"
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ textDecoration: "none" }}
                >
                  BERLANGGANAN KELAS INI →
                </Link>
                <Link
                  href="/subscriptions/purchases"
                  className="blackbox-pill blackbox-pill-black"
                  style={{ textDecoration: "none" }}
                >
                  Lihat Paket Plus (Semua Kelas)
                </Link>
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION: TESTIMONI SISWA */}
        <section id="student-reviews" style={{ padding: "60px 0", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>02 // VERIFIED STUDENT REVIEWS</span>
              <span>4.86 / 5.0 RATING TERTINGGI</span>
            </div>

            <div style={{ maxWidth: "780px", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
                Ulasan Siswa Belajar Dasar AI
              </h2>
              <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.875rem", margin: 0 }}>
                Pengalaman nyata siswa yang telah menuntaskan modul dan sertifikasi kelas ini.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {REVIEWS_DATA.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid var(--bx-grid)",
                    background: "var(--bx-card-bg)",
                    padding: "24px",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "4px", color: "#EAB308", marginBottom: "12px" }}>
                      {"★".repeat(rev.rating)}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6, fontStyle: "italic", marginBottom: "20px" }}>
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid var(--bx-grid)", paddingTop: "12px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>{rev.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--gold)" }}>{rev.role}</div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", marginTop: "2px" }}>{rev.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
