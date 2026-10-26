"use client";

import React, { useState, useEffect } from "react";
import FlatIcon from "./FlatIcon";

const TESTIMONIALS = [
  {
    avatar: "/alumni/alumni_1.jpg",
    name: "Ahmad Fauzi",
    role: "Fullstack Engineer di Bukalapak",
    quote: "Review submission kode dari praktisi beneran detail per baris. Standar clean architecture terpakai langsung di kantor.",
  },
  {
    avatar: "/alumni/alumni_2.jpg",
    name: "Siti Rahmawati",
    role: "Cloud Architect di Tokopedia",
    quote: "Modul industri dan Socratic AI membantuku memecahkan error arsitektur sistem tanpa harus macet berhari-hari.",
  },
  {
    avatar: "/alumni/alumni_3.jpg",
    name: "Budi Santoso",
    role: "AI Specialist di Telkom",
    quote: "Sertifikasi dan portofolio proyek di Anvieo diakui langsung saat interview teknis. Transisi karir sangat mulus.",
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
    <div className="portal-showcase-clean">
      <div>
        {/* Line Model Eyebrow (Model Garis AUI) */}
        <div className="portal-showcase-line-label">
          <span className="portal-gold-line" aria-hidden="true" />
          <span>PORTAL AKADEMI TERAKREDITASI</span>
        </div>

        {/* Main Display Heading (Fraunces Serif) */}
        <h1 className="portal-showcase-heading">
          Akselerasi Disiplin Berstandar Industri
        </h1>

        <p className="portal-showcase-subtext">
          Portal terpadu untuk mengakses silabus mutakhir, evaluasi kode 1-on-1 bersama praktisi terverifikasi, dan sertifikasi kompetensi berbobot internasional.
        </p>

        {/* High-Impact Feature Highlights */}
        <div className="portal-feature-list">
          <div className="portal-feature-item">
            <div className="portal-feature-icon-box">
              <FlatIcon type="brain" size={17} />
            </div>
            <div>
              <div className="portal-feature-title">Socratic AI &amp; Interactive Guidance</div>
              <div className="portal-feature-desc">
                Petunjuk logika komputasi dan bedah error interaktif 24/7 tanpa jalan pintas instan.
              </div>
            </div>
          </div>

          <div className="portal-feature-item">
            <div className="portal-feature-icon-box">
              <FlatIcon type="terminal" size={17} />
            </div>
            <div>
              <div className="portal-feature-title">Evaluasi Kode Human-Reviewer 1x24 Jam</div>
              <div className="portal-feature-desc">
                Setiap baris kode tugas akhir ditelaah manual oleh praktisi senior sesuai rubrik industri.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Social Proof Strip */}
      <div className="portal-trust-card">
        <div className="portal-testimonial-clean">
          <img
            src={currentTesti.avatar}
            alt={currentTesti.name}
            className="portal-testimonial-avatar"
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="portal-testimonial-quote">
              &ldquo;{currentTesti.quote}&rdquo;
            </p>
            <div className="portal-testimonial-author">
              <strong>{currentTesti.name}</strong> · <span>{currentTesti.role}</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="portal-stats-row">
          <div className="portal-stat-col">
            <span className="portal-stat-num">128,400+</span>
            <span className="portal-stat-label">Siswa Aktif</span>
          </div>
          <div className="portal-stat-col">
            <span className="portal-stat-num">98.4%</span>
            <span className="portal-stat-label">Tingkat Lulus</span>
          </div>
          <div className="portal-stat-col">
            <span className="portal-stat-num">4.9 / 5.0</span>
            <span className="portal-stat-label">Rating Reviewer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
