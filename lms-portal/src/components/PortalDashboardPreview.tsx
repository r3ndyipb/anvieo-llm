"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FlatIcon from "./FlatIcon";

interface UserProfile {
  name: string;
  email: string;
  role: "siswa" | "reviewer" | "instruktur";
  enrolledTrack: string;
  streak: number;
  xp: number;
  avatar: string;
}

export default function PortalDashboardPreview() {
  const [user, setUser] = useState<UserProfile>({
    name: "Rian Sanjaya",
    email: "student@anvieo.edu",
    role: "siswa",
    enrolledTrack: "Fullstack Web & AI Architecture",
    streak: 7,
    xp: 2840,
    avatar: "/alumni/alumni_1.jpg",
  });

  const [activeTab, setActiveTab] = useState<"modul" | "submission" | "ai">("modul");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portal_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleAskAi = (promptText: string) => {
    setAiPrompt(promptText);
    setAiResponse("Memproses logika analisis...");
    setTimeout(() => {
      if (promptText.includes("Error")) {
        setAiResponse(
          "💡 **Socratic Guidance**: Error 'Hydration failed' biasanya terjadi karena perbedaan render antara server HTML dan client DOM (misal penggunaan `typeof window` tanpa `useEffect` atau mismatch tag `<p>` di dalam `<div>`). Coba pastikan komponen dinamis dieksekusi setelah komponen termount di browser!"
        );
      } else if (promptText.includes("Logika")) {
        setAiResponse(
          "🧠 **Petunjuk Algoritma**: Untuk mencari elemen duplikat dalam O(n), gunakan struktur data Set atau Hash Map. Apakah kamu sudah mencoba memetakan frekuensi kemunculan setiap nilai saat iterasi array pertama?"
        );
      } else {
        setAiResponse(
          "⚡ **Tips Arsitektur**: Selalu buat database index pada kolom foreign key dan kolom yang sering masuk klausul WHERE atau ORDER BY untuk menghindari Full Table Scan pada PostgreSQL."
        );
      }
    }, 500);
  };

  return (
    <div className="blackbox-frame" style={{ paddingTop: "24px", paddingBottom: "60px" }}>
      {/* Top Welcome Strip */}
      <div className="portal-welcome-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201, 150, 46, 0.12)", border: "1px solid rgba(201, 150, 46, 0.35)", padding: "4px 10px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", marginBottom: "12px" }}>
              <FlatIcon type="sparkle" size={12} color="var(--gold)" />
              <span>PORTAL PEMBELAJARAN AKTIF // TEMPLATE PROTOTYPE</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 6px" }}>
              Selamat Datang, {user.name}! 👋
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--bx-prose-ink)", margin: 0, maxWidth: "680px" }}>
              Kamu sedang berada di jalur <strong>{user.enrolledTrack}</strong>. Selesaikan 1 modul hari ini untuk mempertahankan rekor belajarmu!
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bx-surface-card)", padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--bx-border)" }}>
            <img
              src={user.avatar}
              alt={user.name}
              className="portal-user-avatar"
            />
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                {user.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                <span className="portal-xp-pill">
                  <FlatIcon type="star" size={11} color="var(--gold)" />
                  {user.xp} XP
                </span>
                <span style={{ fontSize: "0.75rem", color: "#F59E0B", fontWeight: 700 }}>
                  🔥 {user.streak} Hari Streak
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="portal-dash-grid">
        {/* Left Column: Course Progress & Active Modules */}
        <div>
          {/* Active Course Card */}
          <div className="portal-dash-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(201, 150, 46, 0.12)", border: "1px solid rgba(201, 150, 46, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                  <FlatIcon type="laptop" size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", margin: 0, color: "var(--bx-ink-bright)" }}>
                    {user.enrolledTrack}
                  </h3>
                  <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                    Instruktur: Lead Expert ANVIEO &amp; Praktisi Industri
                  </span>
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 700, color: "var(--gold)" }}>
                68% SELESAI
              </span>
            </div>

            {/* Progress Bar */}
            <div className="portal-progress-bar-wrap">
              <div className="portal-progress-bar-fill" style={{ width: "68%" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78125rem", color: "var(--bx-muted)", marginBottom: "20px" }}>
              <span>14 dari 20 Modul Terselesaikan</span>
              <span>Sisa 6 Modul Menuju Uji Kompetensi Akhir</span>
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-blue"
                style={{ padding: "10px 20px" }}
                onClick={() => alert("Simulasi: Masuk ke In-Browser Classroom Player dengan Monaco Editor.")}
              >
                LANJUTKAN BELAJAR: MODUL 15 →
              </button>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-outline"
                style={{ padding: "10px 16px" }}
                onClick={() => alert("Simulasi: Mengunduh silabus & panduan submission proyek.")}
              >
                Silabus Lengkap
              </button>
            </div>
          </div>

          {/* Tab Navigation (Modul, Submission Review, AI Socratic) */}
          <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--bx-border)", marginBottom: "18px" }}>
            <button
              type="button"
              onClick={() => setActiveTab("modul")}
              style={{
                padding: "8px 14px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: activeTab === "modul" ? "var(--gold)" : "var(--bx-muted)",
                borderBottom: activeTab === "modul" ? "2px solid var(--gold)" : "none",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
              }}
            >
              Daftar Modul Berikutnya
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("submission")}
              style={{
                padding: "8px 14px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: activeTab === "submission" ? "var(--gold)" : "var(--bx-muted)",
                borderBottom: activeTab === "submission" ? "2px solid var(--gold)" : "none",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
              }}
            >
              Reviewer Code Studio (1-on-1)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              style={{
                padding: "8px 14px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: activeTab === "ai" ? "var(--gold)" : "var(--bx-muted)",
                borderBottom: activeTab === "ai" ? "2px solid var(--gold)" : "none",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: "pointer",
              }}
            >
              Socratic AI Tutor
            </button>
          </div>

          {/* Tab 1: Modules */}
          {activeTab === "modul" && (
            <div className="portal-dash-card">
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", margin: "0 0 14px", color: "var(--bx-ink-bright)" }}>
                Silabus Modul Berjalan
              </h4>

              <div className="portal-module-item">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#10B981" }}><FlatIcon type="check-circle" size={18} color="#10B981" /></span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>Modul 14: Middleware Pipeline &amp; JWT Security</div>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Selesai pada 24 Oktober 2026</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", padding: "3px 8px", borderRadius: "4px" }}>
                  LOLOS
                </span>
              </div>

              <div className="portal-module-item" style={{ borderLeft: "3px solid var(--gold)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "var(--gold)" }}><FlatIcon type="rocket" size={18} color="var(--gold)" /></span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--gold)" }}>Modul 15: Integrasi WebContainers &amp; Socratic AI Playground</div>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Modul Sedang Dipelajari · Estimasi 3 Jam</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", background: "rgba(201, 150, 46, 0.12)", padding: "3px 8px", borderRadius: "4px" }}>
                  SEDANG AKTIF
                </span>
              </div>

              <div className="portal-module-item" style={{ opacity: 0.75 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "var(--bx-muted)" }}><FlatIcon type="lock" size={18} /></span>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--bx-ink)" }}>Modul 16: Uji Beban Mikroservis &amp; Cache Redis Terdistribusi</div>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Terkunci hingga Modul 15 diselesaikan</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>TERKUNCI</span>
              </div>
            </div>
          )}

          {/* Tab 2: Submission Review */}
          {activeTab === "submission" && (
            <div className="portal-dash-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", margin: 0, color: "var(--bx-ink-bright)" }}>
                  Hasil Evaluasi Proyek Terakhir
                </h4>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", padding: "4px 10px", borderRadius: "9999px" }}>
                  LULUS BINTANG 5 ⭐⭐⭐⭐⭐
                </span>
              </div>

              <div style={{ background: "var(--bx-bg)", border: "1px solid var(--bx-border)", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <img
                    src="/alumni/alumni_2.jpg"
                    alt="Reviewer"
                    style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                      Budi Hartono <span style={{ fontWeight: 400, color: "var(--bx-muted)" }}>· Principal Engineer @ GoTo</span>
                    </div>
                    <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted-soft)" }}>Dievaluasi 2 hari yang lalu (SLA: 14 Jam)</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, margin: "8px 0" }}>
                  &ldquo;Struktur arsitektur Clean Architecture yang kamu terapkan sangat memuaskan! Pemisahan layer Repository dan Service berjalan sempurna. Unit testing coverage mencapai 92%. Pertahankan gaya penulisan deklaratif ini.&rdquo;
                </p>

                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <span style={{ fontSize: "0.6875rem", background: "rgba(201, 150, 46, 0.1)", color: "var(--gold)", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                    Kriteria 1: Clean Architecture ✓
                  </span>
                  <span style={{ fontSize: "0.6875rem", background: "rgba(16, 185, 129, 0.1)", color: "#10B981", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                    Kriteria 2: 90%+ Test Coverage ✓
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Socratic AI */}
          {activeTab === "ai" && (
            <div className="portal-dash-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ai-purple, #8B5CF6)" }}>
                  <FlatIcon type="brain" size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", margin: 0, color: "var(--bx-ink-bright)" }}>
                    Socratic AI Copilot (24/7 Coding Companion)
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    Asisten penalaran logika kode tanpa memberikan bocoran jawaban instan
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                <button
                  type="button"
                  className="portal-demo-pill"
                  onClick={() => handleAskAi("Jelaskan Error Hydration mismatch di Next.js")}
                >
                  🔍 Jelaskan Error Hydration
                </button>
                <button
                  type="button"
                  className="portal-demo-pill"
                  onClick={() => handleAskAi("Beri Petunjuk Logika mencari duplikat dalam O(n)")}
                >
                  💡 Petunjuk Logika O(n)
                </button>
                <button
                  type="button"
                  className="portal-demo-pill"
                  onClick={() => handleAskAi("Optimasi Indeks Kueri PostgreSQL")}
                >
                  ⚡ Optimasi Indeks SQL
                </button>
              </div>

              {aiResponse && (
                <div style={{ background: "rgba(139, 92, 246, 0.06)", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "8px", padding: "14px", fontSize: "0.8125rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 700, color: "var(--ai-purple, #8B5CF6)", marginBottom: "4px" }}>
                    Tanya: &ldquo;{aiPrompt}&rdquo;
                  </div>
                  <div>{aiResponse}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Quick Actions, Reviewer Hotline & Certificate */}
        <div>
          {/* Study Streak Card */}
          <div className="portal-dash-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>🔥</div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
              7 Hari Berturut-turut
            </h4>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: "0 0 16px" }}>
              Belajar konsisten setiap hari meningkatkan daya retensi konsep hingga 4.2x lipat.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: idx <= 5 ? "var(--gold)" : "var(--bx-border)", color: idx <= 5 ? "#0A2E52" : "var(--bx-muted)", fontSize: "0.6875rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ✓
                  </div>
                  <span style={{ fontSize: "0.625rem", color: "var(--bx-muted-soft)" }}>{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviewer SLA Hotline Card */}
          <div className="portal-dash-card">
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", margin: "0 0 10px", color: "var(--bx-ink-bright)", display: "flex", alignItems: "center", gap: "8px" }}>
              <FlatIcon type="clock" size={16} color="var(--gold)" />
              <span>Jaminan SLA Reviewer</span>
            </h4>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
              Seluruh submission proyek Anda dijamin menerima feedback mendalam dalam <strong>&le; 24 jam</strong> oleh praktisi senior.
            </p>
            <div style={{ padding: "8px 12px", borderRadius: "6px", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", fontSize: "0.75rem", color: "var(--bx-ink)" }}>
              Rata-rata waktu tanggap saat ini: <strong>4.8 Jam</strong> ⚡
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="portal-dash-card">
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", margin: "0 0 12px", color: "var(--bx-ink-bright)" }}>
              Navigasi Cepat Portal
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/login" className="portal-demo-pill" style={{ textAlign: "center", padding: "10px", textDecoration: "none" }}>
                🔄 Ganti Akun / Logout
              </Link>
              <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="portal-demo-pill" style={{ textAlign: "center", padding: "10px", textDecoration: "none" }}>
                🌐 Buka Katalog Kursus
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
