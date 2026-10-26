"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Mock login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(email);
    }, 700);
  };

  // Mock Google SSO handler
  const handleGoogleSSO = () => {
    setSsoLoading(true);
    setTimeout(() => {
      setSsoLoading(false);
      setLoginSuccess("rendy.ariawindana@gmail.com (Google SSO)");
    }, 900);
  };

  // Mock quick account filler
  const fillPreset = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword("AnvieoDemo2026!");
    setLoginSuccess(null);
  };

  return (
    <div className="auth-page-wrapper">
      <SiteHeader />

      {/* Breadcrumb Rails */}
      <section style={{ borderBottom: "1px solid var(--bx-border)", background: "var(--bx-surface)", position: "relative" }}>
        <BlackboxRails position="top" />
        <div className="blackbox-frame" style={{ padding: "14px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "var(--bx-ink-faint)", fontFamily: "monospace" }}>
              <Link href="/" style={{ color: "var(--bx-ink-dim)", textDecoration: "none" }}>HOME</Link>
              <span>/</span>
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>01 // LOGIN AUTENTIKASI</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }}></span>
              <span>GATEWAY SSO AKTIF (MOCKUP MODE)</span>
            </div>
          </div>
        </div>
        <BlackboxRails position="bottom" />
      </section>

      {/* Main Content Split Area */}
      <main style={{ flex: 1, position: "relative" }}>
        <div className="blackbox-frame">
          <div className="auth-split-grid">
            
            {/* LEFT COLUMN: Login Form Card */}
            <div>
              <div className="auth-card">
                
                {/* Header Icon & Title */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "4px",
                    background: "rgba(201, 150, 46, 0.12)",
                    border: "1px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px"
                  }}>
                    <FlatIcon type="lock" size={20} color="var(--gold)" />
                  </div>
                  <h1 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    margin: "0 0 8px",
                    color: "var(--bx-ink-bright)",
                    letterSpacing: "-0.01em"
                  }}>
                    Masuk ke Akun Anda
                  </h1>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "var(--bx-ink-dim)",
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    Akses materi kurikulum global, kumpulkan tugas coding, dan dapatkan review dari senior engineer.
                  </p>
                </div>

                {/* Login Success Notification (if simulated) */}
                {loginSuccess ? (
                  <div style={{
                    padding: "20px",
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    marginBottom: "24px",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(34, 197, 94, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px"
                    }}>
                      <FlatIcon type="check" size={20} color="#22C55E" />
                    </div>
                    <h3 style={{ fontSize: "1.125rem", color: "var(--bx-ink-bright)", margin: "0 0 6px" }}>
                      Autentikasi Berhasil!
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--bx-ink)", margin: "0 0 16px" }}>
                      Anda masuk sebagai <strong>{loginSuccess}</strong> (Sesi Simulasi Aktif).
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                      <Link
                        href="/learningpaths/65"
                        className="blackbox-pill blackbox-pill-black"
                        style={{ padding: "8px 16px", fontSize: "0.8125rem" }}
                      >
                        Buka Learning Path AI →
                      </Link>
                      <button
                        type="button"
                        onClick={() => setLoginSuccess(null)}
                        className="blackbox-outline"
                        style={{ padding: "8px 16px", fontSize: "0.8125rem", cursor: "pointer" }}
                      >
                        Reset / Ganti Akun
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Google SSO Button */}
                    <button
                      type="button"
                      className="google-sso-btn"
                      onClick={handleGoogleSSO}
                      disabled={ssoLoading}
                      aria-label="Masuk dengan akun Google"
                    >
                      {ssoLoading ? (
                        <>
                          <span style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            border: "2px solid var(--bx-ink-faint)",
                            borderTopColor: "var(--gold)",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite"
                          }}></span>
                          <span>Menghubungkan ke Google Identity...</span>
                        </>
                      ) : (
                        <>
                          <FlatIcon type="google" size={18} />
                          <span>Masuk dengan Google</span>
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="auth-divider-line">
                      <span>atau masuk dengan email</span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      
                      {/* Email Field */}
                      <div>
                        <label style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          marginBottom: "6px",
                          color: "var(--bx-ink-bright)"
                        }}>
                          <span>Email</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>Format: nama@domain.com</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="email"
                            required
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input-field"
                            style={{ paddingLeft: "38px" }}
                          />
                          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.6 }}>
                            <FlatIcon type="mail" size={16} color="var(--bx-ink-faint)" />
                          </div>
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", margin: 0 }}>
                            Kata Sandi
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowForgotModal(true)}
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              fontSize: "0.75rem",
                              color: "var(--gold)",
                              fontWeight: 600,
                              cursor: "pointer",
                              textDecoration: "underline"
                            }}
                          >
                            Lupa kata sandi?
                          </button>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input-field"
                            style={{ paddingLeft: "38px", paddingRight: "40px" }}
                          />
                          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.6 }}>
                            <FlatIcon type="lock" size={16} color="var(--bx-ink-faint)" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "4px",
                              color: "var(--bx-ink-dim)"
                            }}
                            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                          >
                            <FlatIcon type={showPassword ? "eye-off" : "eye"} size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Remember Me Checkbox */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "2px 0" }}>
                        <input
                          type="checkbox"
                          id="remember-checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={{ accentColor: "var(--gold)", cursor: "pointer", width: "16px", height: "16px" }}
                        />
                        <label htmlFor="remember-checkbox" style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", cursor: "pointer" }}>
                          Ingat saya di perangkat ini selama 30 hari
                        </label>
                      </div>

                      {/* Quick Demo Credentials Bar */}
                      <div style={{
                        padding: "10px 14px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px dashed var(--bx-grid)",
                        borderRadius: "4px"
                      }}>
                        <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 700 }}>
                          ⚡ AKUN DEMO INSTAN (KLIK UNTUK MENGISI):
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={() => fillPreset("siswa.ai@anvieo.ac.id")}
                            style={{
                              background: "var(--bx-bg)",
                              border: "1px solid var(--bx-border)",
                              borderRadius: "2px",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              color: "var(--bx-ink-bright)",
                              cursor: "pointer"
                            }}
                          >
                            Siswa AI
                          </button>
                          <button
                            type="button"
                            onClick={() => fillPreset("reviewer.lead@anvieo.ac.id")}
                            style={{
                              background: "var(--bx-bg)",
                              border: "1px solid var(--bx-border)",
                              borderRadius: "2px",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              color: "var(--bx-ink-bright)",
                              cursor: "pointer"
                            }}
                          >
                            Reviewer Lead
                          </button>
                          <button
                            type="button"
                            onClick={() => fillPreset("enterprise.talent@mandiri.co.id")}
                            style={{
                              background: "var(--bx-bg)",
                              border: "1px solid var(--bx-border)",
                              borderRadius: "2px",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              color: "var(--bx-ink-bright)",
                              cursor: "pointer"
                            }}
                          >
                            Enterprise Partner
                          </button>
                        </div>
                      </div>

                      {/* Primary Submit Button */}
                      <button
                        type="submit"
                        className="blackbox-pill blackbox-pill-black"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          padding: "13px",
                          fontSize: "0.9375rem",
                          letterSpacing: "0.04em",
                          cursor: "pointer",
                          marginTop: "6px"
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                              marginRight: "8px"
                            }}></span>
                            MEMPROSES AUTENTIKASI...
                          </>
                        ) : (
                          <>
                            MASUK KE AKUN SAYA
                            <span style={{ marginLeft: "8px" }}>→</span>
                          </>
                        )}
                      </button>

                      {/* Exact User Requested Clause: Syarat & Ketentuan Notice */}
                      <div style={{
                        marginTop: "12px",
                        padding: "12px 14px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid var(--bx-border)",
                        borderRadius: "4px",
                        textAlign: "center"
                      }}>
                        <p style={{
                          fontSize: "0.8125rem",
                          color: "var(--bx-ink-dim)",
                          lineHeight: 1.5,
                          margin: "0 0 6px"
                        }}>
                          Dengan melakukan login, Anda setuju dengan{" "}
                          <Link
                            href="/termsofuse"
                            style={{
                              color: "var(--gold)",
                              fontWeight: 600,
                              textDecoration: "underline",
                              outline: "none"
                            }}
                          >
                            syarat &amp; ketentuan
                          </Link>{" "}
                          ANVIEO Academy.
                        </p>
                        <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)" }}>
                          Standar Kepatuhan Operasional:{" "}
                          <Link
                            href="/termsofuse"
                            style={{ color: "var(--bx-ink-dim)", textDecoration: "underline" }}
                          >
                            anvieo.ac.id/termsofuse
                          </Link>
                        </div>
                      </div>

                    </form>
                  </>
                )}

                {/* Bottom Switch to Register */}
                <div style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--bx-border)",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "var(--bx-ink-dim)"
                }}>
                  Belum punya akun ANVIEO Academy?{" "}
                  <Link
                    href="/register"
                    style={{
                      color: "var(--gold)",
                      fontWeight: 700,
                      textDecoration: "none",
                      marginLeft: "4px"
                    }}
                  >
                    Daftar sekarang gratis →
                  </Link>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Platform Showcase */}
            <div className="auth-showcase-panel">
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
                marginBottom: "20px"
              }}>
                <FlatIcon type="sparkle" size={13} color="var(--gold)" />
                STANDAR GLOBAL ENGINEERING ACADEMY
              </div>

              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.625rem",
                fontWeight: 700,
                color: "var(--bx-ink-bright)",
                margin: "0 0 14px",
                lineHeight: 1.3
              }}>
                Bangun Portofolio Nyata yang Dilirik Unicorn &amp; Big Tech
              </h2>

              <p style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--bx-ink-dim)",
                margin: "0 0 28px"
              }}>
                ANVIEO Academy mengintegrasikan kurikulum industri bertaraf internasional dengan pengujian kode otomatis dan feedback personal dari para praktisi senior.
              </p>

              {/* 3 Pillar Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                
                <div style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px",
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "4px"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="code" size={18} color="#22C55E" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                      14+ Jalur Belajar Berstruktur Lengkap
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Kurikulum mulai dari AI Engineering, GenAI, MLOps, Backend Python/NodeJS, Flutter, hingga Multi-Cloud DevOps.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px",
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "4px"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    background: "rgba(201, 150, 46, 0.1)",
                    border: "1px solid rgba(201, 150, 46, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="certificate" size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                      Code Review Komprehensif Maksimal 3×24 Jam
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Submission kode Anda diperiksa baris per baris. Dapatkan saran arsitektur, optimasi performa, dan best practice.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px",
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "4px"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="enterprise" size={18} color="#3B82F6" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                      Koneksi Langsung ke 850+ Hiring Partners
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Lulusan terverifikasi langsung direkomendasikan ke talent network tech companies, perbankan, dan startup terkemuka.
                    </p>
                  </div>
                </div>

              </div>

              {/* Alumni Testimonial Box */}
              <div style={{
                padding: "20px",
                background: "rgba(201, 150, 46, 0.05)",
                border: "1px solid rgba(201, 150, 46, 0.25)",
                borderRadius: "4px"
              }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FlatIcon key={i} type="star" size={14} color="var(--gold)" />
                  ))}
                </div>
                <p style={{
                  fontSize: "0.8125rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--bx-ink)",
                  margin: "0 0 14px"
                }}>
                  &ldquo;Feedback reviewer di kelas AI Engineer sangat detail dan membuka mata tentang production-ready clean code. 2 bulan setelah menyelesaikan submission akhir, saya diterima sebagai ML Engineer di payment gateway fintech.&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    color: "#000",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem"
                  }}>
                    AF
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                      Ahmad Fauzan
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                      Alumni AI Path • Now ML Engineer @ DOKU
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Metrics Counter */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid var(--bx-border)",
                textAlign: "center"
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    246K+
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textTransform: "uppercase" }}>
                    Siswa Belajar
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--gold)" }}>
                    94.2%
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textTransform: "uppercase" }}>
                    Tingkat Serapan
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    4.86/5
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textTransform: "uppercase" }}>
                    Rating Reviewer
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <BlackboxRails position="bottom" />
      </main>

      {/* Forgot Password Modal (Mockup) */}
      {showForgotModal && (
        <div className="blackbox-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setShowForgotModal(false)}
              aria-label="Tutup"
            >
              ×
            </button>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 12px",
                background: "rgba(201,150,46,0.12)",
                border: "1px solid var(--gold)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <FlatIcon type="key" size={22} color="var(--gold)" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", margin: "0 0 6px", color: "var(--bx-ink-bright)" }}>
                Reset Kata Sandi
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.5 }}>
                Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan pemulihan kata sandi.
              </p>
            </div>

            {forgotSuccess ? (
              <div style={{
                padding: "16px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: "4px",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-bright)", margin: "0 0 12px" }}>
                  ✅ Tautan pemulihan telah dikirim ke <strong>{forgotEmail || "email Anda"}</strong>. Silakan periksa inbox atau folder spam Anda.
                </p>
                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-black"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Tutup &amp; Kembali ke Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!forgotEmail) return;
                  setForgotSuccess(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "6px", color: "var(--bx-ink-bright)" }}>
                    Alamat Email Terdaftar
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="auth-input-field"
                  />
                </div>
                <button
                  type="submit"
                  className="blackbox-pill blackbox-pill-black"
                  style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
                >
                  KIRIM TAUTAN RESET KATA SANDI →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
