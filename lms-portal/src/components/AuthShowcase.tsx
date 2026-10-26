"use client";

import React, { useState, useEffect } from "react";
import FlatIcon from "./FlatIcon";

const TESTIMONIALS = [
  {
    avatar: "/alumni/alumni_1.jpg",
    name: "Ahmad Fauzi",
    role: "Fullstack Engineer di Bukalapak",
    quote: "Review submission kode dari expert reviewer di Anvieo beneran detail per baris. Standar clean architecture yang diajarkan langsung terpakai di pekerjaan harian.",
  },
  {
    avatar: "/alumni/alumni_2.jpg",
    name: "Siti Rahmawati",
    role: "Cloud Architect di Tokopedia",
    quote: "Modul hands-on berbasis skenario industri riil dan Socratic AI membantuku memecahkan error arsitektur sistem tanpa harus macet berhari-hari.",
  },
  {
    avatar: "/alumni/alumni_3.jpg",
    name: "Budi Santoso",
    role: "AI & ML Specialist di Telkom",
    quote: "Sertifikasi dan portofolio proyek di Anvieo diakui langsung saat proses wawancara kerja. Transisi karir saya jadi sangat mulus.",
  },
];

export default function AuthShowcase() {
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestiIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentTesti = TESTIMONIALS[activeTestiIndex];

  return (
    <div className="portal-showcase-panel">
      {/* Background Watermark */}
      <div className="portal-showcase-watermark" aria-hidden="true">
        ANVIEO
      </div>

      <div>
        {/* Institutional Pill */}
        <div className="portal-showcase-pill">
          <FlatIcon type="shield" size={14} color="var(--gold)" />
          <span>PORTAL AKADEMI TERAKREDITASI</span>
        </div>

        {/* Main Display Heading */}
        <h1 className="portal-showcase-heading">
          Akselerasi Penguasaan Disiplin Berstandar Industri
        </h1>

        <p className="portal-showcase-subtext">
          Portal terpadu untuk mengakses silabus mutakhir, ruang review kode 1-on-1 bersama praktisi terverifikasi, dan sertifikasi kompetensi berbobot internasional.
        </p>

        {/* Feature List */}
        <div className="portal-feature-list">
          <div className="portal-feature-item">
            <div className="portal-feature-icon-box">
              <FlatIcon type="brain" size={18} />
            </div>
            <div>
              <div className="portal-feature-title">Socratic AI Copilot</div>
              <div className="portal-feature-desc">
                Petunjuk logika dan bedah error interaktif 24/7 tanpa memberi jalan pintas instan.
              </div>
            </div>
          </div>

          <div className="portal-feature-item">
            <div className="portal-feature-icon-box">
              <FlatIcon type="terminal" size={18} />
            </div>
            <div>
              <div className="portal-feature-title">Evaluasi Kode Human-Reviewer</div>
              <div className="portal-feature-desc">
                Setiap baris kode submission proyek ditelaah manual oleh praktisi senior sesuai rubrik standar industri.
              </div>
            </div>
          </div>

          <div className="portal-feature-item">
            <div className="portal-feature-icon-box">
              <FlatIcon type="award" size={18} />
            </div>
            <div>
              <div className="portal-feature-title">Sertifikat &amp; Jalur Rekrutmen</div>
              <div className="portal-feature-desc">
                Akses langsung ke jaringan 1,200+ Hiring Partner setelah menyelesaikan submission kelulusan.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Rotating Testimonial */}
      <div>
        <div className="portal-testimonial-card">
          <img
            src={currentTesti.avatar}
            alt={currentTesti.name}
            className="portal-testimonial-avatar"
          />
          <div>
            <p className="portal-testimonial-quote">
              &ldquo;{currentTesti.quote}&rdquo;
            </p>
            <div className="portal-testimonial-author">
              {currentTesti.name} · <span style={{ opacity: 0.8, fontWeight: 500, color: "var(--bx-muted)" }}>{currentTesti.role}</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="portal-stats-row">
          <div className="portal-stat-col">
            <span className="portal-stat-num">128,400+</span>
            <span className="portal-stat-label">Siswa Terdaftar</span>
          </div>
          <div className="portal-stat-col">
            <span className="portal-stat-num">98.4%</span>
            <span className="portal-stat-label">Tingkat Lulus Uji</span>
          </div>
          <div className="portal-stat-col">
            <span className="portal-stat-num">4.9 / 5.0</span>
            <span className="portal-stat-label">Kepuasan Reviewer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
