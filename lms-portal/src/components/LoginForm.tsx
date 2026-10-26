"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FlatIcon from "./FlatIcon";

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<"siswa" | "reviewer" | "instruktur">("siswa");
  const [email, setEmail] = useState("student@anvieo.edu");
  const [password, setPassword] = useState("anvieo2026!pass");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Autofill helpers for rapid testing
  const setDemoRole = (selectedRole: "siswa" | "reviewer" | "instruktur") => {
    setRole(selectedRole);
    if (selectedRole === "siswa") {
      setEmail("student@anvieo.edu");
      setPassword("siswa2026!secret");
    } else if (selectedRole === "reviewer") {
      setEmail("reviewer.expert@anvieo.edu");
      setPassword("reviewer2026!pass");
    } else {
      setEmail("lead.instructor@anvieo.edu");
      setPassword("instructor2026!pass");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        const displayName =
          role === "siswa"
            ? "Rian Sanjaya"
            : role === "reviewer"
            ? "Dr. Ir. Hendra Gunawan"
            : "Prof. Sarah Agustina";
        localStorage.setItem(
          "portal_user",
          JSON.stringify({
            name: displayName,
            email: email || "student@anvieo.edu",
            role: role,
            enrolledTrack: "Fullstack Web & AI Architecture",
            streak: 7,
            xp: 2840,
            avatar: "/alumni/alumni_1.jpg",
          })
        );
      }
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <>
      <div className="portal-card-wrap">
        {/* Navigation Tabs (Masuk vs Daftar) */}
        <div className="portal-nav-tabs">
          <Link href="/login" className="portal-nav-tab active">
            Masuk Portal
          </Link>
          <Link href="/register" className="portal-nav-tab">
            Daftar Akun Baru
          </Link>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <div className="portal-role-tabs">
            <button
              type="button"
              className={`portal-role-tab ${role === "siswa" ? "active" : ""}`}
              onClick={() => setDemoRole("siswa")}
            >
              <FlatIcon type="user" size={13} />
              <span>Siswa</span>
            </button>
            <button
              type="button"
              className={`portal-role-tab ${role === "reviewer" ? "active" : ""}`}
              onClick={() => setDemoRole("reviewer")}
            >
              <FlatIcon type="terminal" size={13} />
              <span>Reviewer</span>
            </button>
            <button
              type="button"
              className={`portal-role-tab ${role === "instruktur" ? "active" : ""}`}
              onClick={() => setDemoRole("instruktur")}
            >
              <FlatIcon type="briefcase" size={13} />
              <span>Instruktur</span>
            </button>
          </div>
        </div>

        {/* 1-Click Demo Fill Pill Bar */}
        <div className="portal-demo-autofill">
          <span style={{ color: "var(--gold)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "3px" }}>
            <FlatIcon type="sparkle" size={12} color="var(--gold)" />
            Coba Demo:
          </span>
          <button
            type="button"
            className="portal-demo-pill"
            onClick={() => setDemoRole("siswa")}
            title="Isi akun demo siswa"
          >
            Siswa
          </button>
          <button
            type="button"
            className="portal-demo-pill"
            onClick={() => setDemoRole("reviewer")}
            title="Isi akun demo reviewer"
          >
            Reviewer
          </button>
          <button
            type="button"
            className="portal-demo-pill"
            onClick={() => setDemoRole("instruktur")}
            title="Isi akun demo instruktur"
          >
            Instruktur
          </button>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="portal-form">
          {/* Email Field */}
          <div className="portal-form-group">
            <label htmlFor="email" className="portal-label">
              <span>Email Akun Portal <span style={{ color: "var(--gold)" }}>*</span></span>
            </label>
            <div className="portal-input-wrap">
              <span className="portal-input-icon">
                <FlatIcon type="email" size={14} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                inputMode="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="portal-input"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="portal-form-group">
            <label htmlFor="password" className="portal-label">
              <span>Kata Sandi <span style={{ color: "var(--gold)" }}>*</span></span>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="portal-link-gold"
                style={{ fontSize: "0.71875rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Lupa Sandi?
              </button>
            </label>
            <div className="portal-input-wrap">
              <span className="portal-input-icon">
                <FlatIcon type="lock" size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="portal-input"
              />
              <span className="portal-input-addon">
                <button
                  type="button"
                  className="portal-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  <FlatIcon type={showPassword ? "eye-off" : "eye"} size={14} />
                </button>
              </span>
            </div>
          </div>

          {/* Options Row (Remember Me) */}
          <div className="portal-form-options">
            <label className="portal-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
            <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted-soft)" }}>
              Sesi 30 Hari
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="portal-submit-btn"
          >
            {isLoading ? (
              <>
                <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid #0A2E52", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                <span>MEMVERIFIKASI...</span>
              </>
            ) : (
              <>
                <span>MASUK KE PORTAL BELAJAR</span>
                <FlatIcon type="arrow-right" size={14} color="#0A2E52" />
              </>
            )}
          </button>
        </form>

        {/* SSO Divider */}
        <div className="portal-divider">
          <span>atau masuk dengan</span>
        </div>

        {/* SSO Social Logins */}
        <div className="portal-sso-grid">
          <button
            type="button"
            className="portal-sso-btn"
            onClick={() => {
              setEmail("google.user@gmail.com");
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <FlatIcon type="google" size={14} />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="portal-sso-btn"
            onClick={() => {
              setEmail("github.dev@users.noreply.github.com");
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <FlatIcon type="github" size={14} />
            <span>GitHub</span>
          </button>
        </div>

        {/* Switch Prompt */}
        <div className="portal-switch-prompt">
          Belum memiliki akun portal?{" "}
          <Link href="/register" className="portal-link-gold">
            Daftar Sekarang (Gratis) →
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="blackbox-modal-backdrop"
          onClick={() => {
            setShowForgotModal(false);
            setForgotSuccess(false);
          }}
        >
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ width: "42px", height: "42px", margin: "0 auto 10px", background: "rgba(201,150,46,0.12)", border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="key" size={20} color="var(--gold)" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                Pemulihan Kata Sandi
              </h3>
              <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: 0 }}>
                Masukkan email yang terdaftar untuk menerima tautan instruksi reset.
              </p>
            </div>

            {forgotSuccess ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ color: "#10B981", marginBottom: "6px", display: "flex", justifyContent: "center" }}>
                  <FlatIcon type="check-circle" size={32} color="#10B981" />
                </div>
                <h4 style={{ fontSize: "0.9375rem", color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Tautan Reset Telah Terkirim!
                </h4>
                <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", marginBottom: "14px" }}>
                  Silakan periksa folder kotak masuk atau spam pada <strong>{forgotEmail || email}</strong>.
                </p>
                <button
                  type="button"
                  className="portal-submit-btn"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                >
                  KEMBALI KE LOGIN
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSuccess(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, marginBottom: "4px", color: "var(--bx-ink)" }}>
                    Email Terdaftar
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={forgotEmail || email}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "var(--bx-bg)",
                      border: "1px solid var(--bx-border)",
                      borderRadius: "5px",
                      color: "var(--bx-ink-bright)",
                      fontSize: "0.8125rem",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="portal-submit-btn"
                >
                  KIRIM INSTRUKSI RESET →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
