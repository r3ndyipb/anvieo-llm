"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  // Compute password strength
  const getPasswordStrength = () => {
    if (!password) return { label: "Belum diisi", percent: 0, color: "var(--bx-border)" };
    if (password.length < 6) return { label: "Lemah (min. 8 karakter)", percent: 25, color: "#EF4444" };
    const hasNum = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (password.length >= 8 && hasNum && hasSpecial) {
      return { label: "Sangat Kuat", percent: 100, color: "#22C55E" };
    }
    if (password.length >= 8 && (hasNum || hasSpecial)) {
      return { label: "Kuat", percent: 75, color: "var(--gold)" };
    }
    return { label: "Cukup", percent: 50, color: "#F59E0B" };
  };

  const strength = getPasswordStrength();
  const passwordsMatch = !confirmPassword || password === confirmPassword;

  // Handle mock submit
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !agreeTerms) return;
    if (password !== confirmPassword) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegisterSuccess(fullName);
    }, 750);
  };

  // Handle mock Google SSO
  const handleGoogleSSO = () => {
    setSsoLoading(true);
    setTimeout(() => {
      setSsoLoading(false);
      setRegisterSuccess("Rendy Aria Windana (Google Account)");
    }, 900);
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
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>01 // REGISTRASI AKUN BARU</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }}></span>
              <span>100% GRATIS PENDAFTARAN AWAL</span>
            </div>
          </div>
        </div>
        <BlackboxRails position="bottom" />
      </section>

      {/* Main Content Area */}
      <main style={{ flex: 1, position: "relative" }}>
        <div className="blackbox-frame">
          <div className="auth-split-grid">
            
            {/* LEFT COLUMN: Registration Card */}
            <div>
              <div className="auth-card">
                
                {/* Header Title */}
                <div style={{ marginBottom: "26px" }}>
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
                    <FlatIcon type="user-plus" size={20} color="var(--gold)" />
                  </div>
                  <h1 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    margin: "0 0 8px",
                    color: "var(--bx-ink-bright)",
                    letterSpacing: "-0.01em"
                  }}>
                    Buat Akun ANVIEO Academy
                  </h1>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "var(--bx-ink-dim)",
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    Mulai perjalanan belajar gratis hari ini dan bangun portofolio software engineering kelas dunia.
                  </p>
                </div>

                {/* Registration Success Banner */}
                {registerSuccess ? (
                  <div style={{
                    padding: "24px",
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(34, 197, 94, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px"
                    }}>
                      <FlatIcon type="check" size={24} color="#22C55E" />
                    </div>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--bx-ink-bright)", margin: "0 0 8px" }}>
                      Pendaftaran Berhasil!
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--bx-ink)", lineHeight: 1.5, margin: "0 0 20px" }}>
                      Selamat datang, <strong>{registerSuccess}</strong>! Akun ANVIEO Academy Anda telah siap. Silakan lanjutkan untuk menjelajahi kurikulum atau masuk ke kelas pertama Anda.
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                      <Link
                        href="/learningpaths/65"
                        className="blackbox-pill blackbox-pill-black"
                        style={{ padding: "10px 18px", fontSize: "0.875rem" }}
                      >
                        Mulai Belajar di Learning Path AI →
                      </Link>
                      <Link
                        href="/login"
                        className="blackbox-outline"
                        style={{ padding: "10px 18px", fontSize: "0.875rem" }}
                      >
                        Ke Halaman Login
                      </Link>
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
                      aria-label="Daftar cepat dengan akun Google"
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
                          <span>Daftar dengan Google</span>
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="auth-divider-line">
                      <span>atau daftar dengan email</span>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      
                      {/* Full Name */}
                      <div>
                        <label style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          marginBottom: "6px",
                          color: "var(--bx-ink-bright)"
                        }}>
                          Nama Lengkap
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Rendy Aria Windana"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="auth-input-field"
                            style={{ paddingLeft: "38px" }}
                          />
                          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.6 }}>
                            <FlatIcon type="user" size={16} color="var(--bx-ink-faint)" />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          marginBottom: "6px",
                          color: "var(--bx-ink-bright)"
                        }}>
                          Alamat Email
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
                        <label style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          marginBottom: "6px",
                          color: "var(--bx-ink-bright)"
                        }}>
                          <span>Kata Sandi</span>
                          <span style={{ fontSize: "0.75rem", color: strength.color, fontWeight: 700 }}>
                            {strength.label}
                          </span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Minimal 8 karakter kombinasi huruf & simbol"
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
                        {/* Password Strength Meter Bar */}
                        <div style={{
                          height: "3px",
                          width: "100%",
                          background: "var(--bx-border)",
                          borderRadius: "2px",
                          marginTop: "6px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            height: "100%",
                            width: `${strength.percent}%`,
                            background: strength.color,
                            transition: "width 0.3s ease, background 0.3s ease"
                          }} />
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          marginBottom: "6px",
                          color: "var(--bx-ink-bright)"
                        }}>
                          <span>Konfirmasi Kata Sandi</span>
                          {!passwordsMatch && (
                            <span style={{ fontSize: "0.75rem", color: "#EF4444", fontWeight: 600 }}>
                              Kata sandi tidak cocok!
                            </span>
                          )}
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="Ulangi kata sandi Anda"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="auth-input-field"
                            style={{
                              paddingLeft: "38px",
                              paddingRight: "40px",
                              borderColor: !passwordsMatch ? "#EF4444" : undefined
                            }}
                          />
                          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.6 }}>
                            <FlatIcon type="lock" size={16} color="var(--bx-ink-faint)" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            aria-label={showConfirmPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                          >
                            <FlatIcon type={showConfirmPassword ? "eye-off" : "eye"} size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Required Terms Checkbox */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
                        <input
                          type="checkbox"
                          id="agree-terms"
                          required
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          style={{ accentColor: "var(--gold)", cursor: "pointer", width: "16px", height: "16px", marginTop: "2px" }}
                        />
                        <label htmlFor="agree-terms" style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", lineHeight: 1.45, cursor: "pointer" }}>
                          Saya telah membaca dan menyetujui{" "}
                          <Link
                            href="/termsofuse"
                            style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "underline" }}
                          >
                            Syarat &amp; Ketentuan
                          </Link>{" "}
                          serta Kebijakan Privasi ANVIEO Academy.
                        </label>
                      </div>

                      {/* Optional Newsletter Checkbox */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <input
                          type="checkbox"
                          id="newsletter-check"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          style={{ accentColor: "var(--gold)", cursor: "pointer", width: "16px", height: "16px", marginTop: "2px" }}
                        />
                        <label htmlFor="newsletter-check" style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", lineHeight: 1.45, cursor: "pointer" }}>
                          Kirimkan info kurikulum baru, webinar gratis bersama pakar industri, dan beasiswa tech.
                        </label>
                      </div>

                      {/* Submit Button */}
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
                          marginTop: "8px"
                        }}
                        disabled={isLoading || !passwordsMatch}
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
                            MEMBUAT AKUN BARU...
                          </>
                        ) : (
                          <>
                            DAFTAR SEKARANG — GRATIS
                            <span style={{ marginLeft: "8px" }}>→</span>
                          </>
                        )}
                      </button>

                    </form>
                  </>
                )}

                {/* Bottom Switch to Login */}
                <div style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--bx-border)",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "var(--bx-ink-dim)"
                }}>
                  Sudah memiliki akun ANVIEO Academy?{" "}
                  <Link
                    href="/login"
                    style={{
                      color: "var(--gold)",
                      fontWeight: 700,
                      textDecoration: "none",
                      marginLeft: "4px"
                    }}
                  >
                    Masuk di sini →
                  </Link>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: What You Get / Value Proposition */}
            <div className="auth-showcase-panel">
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 10px",
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "2px",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "#22C55E",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                <FlatIcon type="check" size={13} color="#22C55E" />
                MEMBERSHIP BENEFIT RESMI
              </div>

              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.625rem",
                fontWeight: 700,
                color: "var(--bx-ink-bright)",
                margin: "0 0 14px",
                lineHeight: 1.3
              }}>
                Akses Langsung ke Ekosistem Belajar Engineering Terintegrasi
              </h2>

              <p style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--bx-ink-dim)",
                margin: "0 0 28px"
              }}>
                Daftar sekarang dan nikmati fasilitas pembelajaran mandiri interaktif, sandbox koding di cloud browser, dan penilaian portfolio real-world.
              </p>

              {/* 4 Feature Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "rgba(201, 150, 46, 0.1)",
                    border: "1px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="book" size={15} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 2px", color: "var(--bx-ink-bright)" }}>
                      Gratis Akses Modul Dasar &amp; Sandbox Cloud
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Coba langsung coding AI, Python, dan Web tanpa perlu konfigurasi lokal yang rumit.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid #22C55E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="certificate" size={15} color="#22C55E" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 2px", color: "var(--bx-ink-bright)" }}>
                      Sertifikat Kelulusan Resmi Terverifikasi QR
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Setiap sertifikat kelulusan memiliki ID unik dan dapat diverifikasi langsung oleh recruiter di LinkedIn.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid #3B82F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="chat" size={15} color="#3B82F6" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 2px", color: "var(--bx-ink-bright)" }}>
                      Forum Diskusi &amp; Bimbingan Komunitas Aktif
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Tanyakan kendala bug atau error kode Anda di forum kelas. Dapatkan respon dari instruktur dan rekan sesama engineer.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "rgba(168, 85, 247, 0.1)",
                    border: "1px solid #A855F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FlatIcon type="career" size={15} color="#A855F7" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 2px", color: "var(--bx-ink-bright)" }}>
                      Akses Eksklusif Lowongan Kerja &amp; Fast-Track
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-dim)", margin: 0, lineHeight: 1.45 }}>
                      Dapatkan undangan eksklusif ke job fair virtual dan prioritas screening di 850+ perusahaan mitra.
                    </p>
                  </div>
                </div>

              </div>

              {/* Hiring Partner Logos Row */}
              <div style={{
                padding: "20px",
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-border)",
                borderRadius: "4px"
              }}>
                <div style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                  textAlign: "center"
                }}>
                  DIPERCAYA OLEH TALENT RECRUITER TOP COMPANIES:
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                  opacity: 0.75,
                  fontSize: "0.8125rem",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)"
                }}>
                  <span>TOKOPEDIA</span>
                  <span>•</span>
                  <span>BCA</span>
                  <span>•</span>
                  <span>MANDIRI</span>
                  <span>•</span>
                  <span>TRAVELOKA</span>
                  <span>•</span>
                  <span>GOTO</span>
                </div>
              </div>

            </div>

          </div>
        </div>
        <BlackboxRails position="bottom" />
      </main>

      <SiteFooter />
    </div>
  );
}
