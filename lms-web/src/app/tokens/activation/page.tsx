"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface ActivatedTokenInfo {
  tokenCode: string;
  packageName: string;
  duration: string;
  expiresAt: string;
  benefits: string[];
}

export default function TokenActivationPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activatedToken, setActivatedToken] = useState<ActivatedTokenInfo | null>(null);

  const sampleTokens: Record<string, ActivatedTokenInfo> = {
    "ANVIEO-AI-30D": {
      tokenCode: "ANVIEO-AI-30D",
      packageName: "Langganan Learning Path: AI Engineer",
      duration: "30 Hari",
      expiresAt: "26 November 2026",
      benefits: [
        "Akses penuh 6 kelas alur belajar AI Engineer",
        "Unlimited code submission & review praktisi < 12 jam",
        "Sertifikat kompetensi kelulusan resmi IEEE/NIST",
      ],
    },
    "ANVIEO-PLUS-90D": {
      tokenCode: "ANVIEO-PLUS-90D",
      packageName: "Langganan Plus (All-Access Pass)",
      duration: "90 Hari (3 Bulan)",
      expiresAt: "26 Januari 2027",
      benefits: [
        "Akses tanpa batas ke 50+ seluruh kelas & kurikulum",
        "Akses materi kurikulum baru yang dirilis",
        "Forum diskusi prioritas dengan instruktur",
        "Unlimited submission dengan feedback mendalam",
      ],
    },
    "BEASISWA-KAMPUS-1Y": {
      tokenCode: "BEASISWA-KAMPUS-1Y",
      packageName: "Beasiswa Talenta Digital Nasional (1 Tahun Penuh)",
      duration: "365 Hari (1 Tahun)",
      expiresAt: "26 Oktober 2027",
      benefits: [
        "Akses penuh tanpa batas ke semua kelas & bootcamp",
        "Mentoring privat karir & portfolio audit",
        "Fasilitasi penyaluran kerja ke 850+ hiring partner",
        "Hak perbarui sertifikat seumur hidup",
      ],
    },
  };

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const clean = tokenInput.trim().toUpperCase();
    if (!clean) {
      setErrorMessage("Silakan masukkan kode token atau voucher Anda.");
      return;
    }

    if (clean.length < 5) {
      setErrorMessage("Format kode token tidak valid. Minimal 5 karakter.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (sampleTokens[clean]) {
        setActivatedToken(sampleTokens[clean]);
      } else {
        setActivatedToken({
          tokenCode: clean,
          packageName: "Langganan Plus Akselerator (Voucher Mitra)",
          duration: "30 Hari",
          expiresAt: "26 November 2026",
          benefits: [
            "Akses penuh ke seluruh kelas & learning path",
            "Unlimited code submission & reviewer feedback praktisi",
            "Sertifikat kompetensi standar industri",
          ],
        });
      }
    }, 850);
  };

  const applySampleToken = (code: string) => {
    setTokenInput(code);
    setErrorMessage(null);
  };

  return (
    <div className="token-activation-page-wrap">
      <SiteHeader activeTabOverride="langganan" />

      {/* Breadcrumb Header */}
      <div className="lp-breadcrumb-wrap">
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <Link href="/subscriptions/purchases" className="lp-breadcrumb-link">
              Langganan
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Aktivasi Token</span>
          </nav>
        </div>
      </div>

      {/* Main Activation Section */}
      <section className="token-main-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="both" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // TOKEN &amp; VOUCHER REDEMPTION</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>VERIFICATION</dt>
                <dd>INSTANT RSA DECRYPT</dd>
              </div>
              <div>
                <dt>ELIGIBILITY</dt>
                <dd>CAMPUS &amp; B2B SPONSOR</dd>
              </div>
            </dl>
          </div>

          <div className="token-card-wrapper">
            {/* Header Eyebrow & Titles */}
            <div className="token-card-top-header">
              <div className="token-hero-badge"><span>AKTIVASI VOUCHER &amp; TOKEN RESMI</span></div>
              <h1 className="token-card-main-title">Aktivasi Token Belajar</h1>
              <p className="token-card-subtitle">
                Masukkan kode token langganan atau voucher beasiswa yang Anda dapatkan dari program mitra kampus, event komunitas, atau pembelian institusi.
              </p>
            </div>

            {/* The Activation Form Box */}
            <div className="token-activation-box">
              <form onSubmit={handleActivate}>
                <div className="token-input-group">
                  <label htmlFor="token-input" className="token-input-label">
                    <span>Token / Kode Voucher</span>
                    <span className="token-required-mark">*</span>
                  </label>

                  <div className="token-input-field-wrap">
                    <div className="token-input-icon" aria-hidden="true">
                      <FlatIcon type="ticket" size={20} color="var(--gold)" />
                    </div>

                    <input
                      id="token-input"
                      type="text"
                      className="token-text-input"
                      placeholder="Contoh: ANVIEO-AI-30D"
                      value={tokenInput}
                      onChange={(e) => {
                        setTokenInput(e.target.value.toUpperCase());
                        setErrorMessage(null);
                      }}
                      autoComplete="off"
                      spellCheck="false"
                      suppressHydrationWarning
                    />

                    {tokenInput && (
                      <button
                        type="button"
                        className="token-clear-btn"
                        onClick={() => setTokenInput("")}
                        aria-label="Bersihkan input"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="token-error-alert">
                      <FlatIcon type="info" size={16} color="#EF4444" style={{ marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>

                {/* Quick Sample Tokens Helper Chips */}
                <div className="token-samples-section">
                  <span className="token-samples-title">Coba contoh token simulasi:</span>
                  <div className="token-samples-chips">
                    <button
                      type="button"
                      className="token-sample-chip"
                      onClick={() => applySampleToken("ANVIEO-AI-30D")}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="key" size={13} color="var(--gold)" /> ANVIEO-AI-30D</span>
                      <small>(AI Engineer 30H)</small>
                    </button>

                    <button
                      type="button"
                      className="token-sample-chip"
                      onClick={() => applySampleToken("ANVIEO-PLUS-90D")}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="star" size={13} color="var(--gold)" /> ANVIEO-PLUS-90D</span>
                      <small>(Langganan Plus 3 Bulan)</small>
                    </button>

                    <button
                      type="button"
                      className="token-sample-chip"
                      onClick={() => applySampleToken("BEASISWA-KAMPUS-1Y")}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FlatIcon type="graduation" size={13} color="var(--gold)" /> BEASISWA-KAMPUS-1Y</span>
                      <small>(Beasiswa 1 Tahun)</small>
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="token-submit-btn"
                  disabled={isLoading || !tokenInput.trim()}
                >
                  {isLoading ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <span>Memverifikasi Token...</span>
                    </span>
                  ) : (
                    <span>Aktivasi Token Sekarang →</span>
                  )}
                </button>
              </form>

              {/* Security Footnote */}
              <div className="token-box-footer-note">
                <FlatIcon type="lock" size={14} color="var(--gold)" style={{ marginRight: "6px" }} />
                <span>Aktivasi terenkripsi aman. Akses akan langsung ditambahkan ke akun Anda.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="token-guide-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // ACTIVATION GUIDELINES &amp; SUPPORT</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>STEPS</dt>
                <dd>4 TAHAPAN MUDAH</dd>
              </div>
              <div>
                <dt>VALIDITY</dt>
                <dd>TERAKUMULASI OTOMATIS</dd>
              </div>
            </dl>
          </div>

          <div className="token-guide-container">
            <h3 className="token-guide-heading">Petunjuk Penggunaan Token</h3>

            <div className="token-guide-steps-grid">
              <div className="token-guide-step-card">
                <div className="token-guide-step-num">1</div>
                <h4 className="token-guide-step-title">Periksa Akun</h4>
                <p className="token-guide-step-desc">
                  Pastikan Anda telah masuk (login) menggunakan akun ANVIEO Academy Anda yang aktif.
                </p>
              </div>

              <div className="token-guide-step-card">
                <div className="token-guide-step-num">2</div>
                <h4 className="token-guide-step-title">Ketik Kode Token</h4>
                <p className="token-guide-step-desc">
                  Masukkan kode token dengan format kapital lengkap dengan tanda strip (-) pemisah.
                </p>
              </div>

              <div className="token-guide-step-card">
                <div className="token-guide-step-num">3</div>
                <h4 className="token-guide-step-title">Klik Aktivasi</h4>
                <p className="token-guide-step-desc">
                  Sistem akan memvalidasi hak akses voucher dan menambahkan paket belajar ke dashboard.
                </p>
              </div>

              <div className="token-guide-step-card">
                <div className="token-guide-step-num">4</div>
                <h4 className="token-guide-step-title">Mulai Belajar</h4>
                <p className="token-guide-step-desc">
                  Akses kelas terbuka seketika. Jika memiliki langganan aktif, durasi akan terakumulasi.
                </p>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="token-help-card">
            <div className="token-help-content">
              <h4 className="token-help-title">Mengalami Masalah Saat Aktivasi?</h4>
              <p className="token-help-desc">
                Jika token Anda dinyatakan kedaluwarsa atau tidak terdaftar, silakan hubungi tim Customer Support kami untuk verifikasi penerbitan token.
              </p>
            </div>
            <Link
              href="/corporate-training"
              className="lp-btn-outline"
              style={{ padding: "8px 18px", fontSize: "0.875rem" }}
            >
              Hubungi Bantuan Support
            </Link>
          </div>
        </div>
      </section>

      {/* Success Activation Modal Dialog */}
      {activatedToken && (
        <div className="blackbox-modal-backdrop" onClick={() => setActivatedToken(null)}>
          <div className="token-success-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setActivatedToken(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div className="token-success-icon-wrap">
              <FlatIcon type="check" size={28} color="#10B981" />
            </div>

            <div className="token-success-eyebrow"><span>AKTIVASI BERHASIL!</span></div>
            <h2 className="token-success-title">Selamat! Token Telah Aktif</h2>
            <p className="token-success-desc">
              Kode token <strong>{activatedToken.tokenCode}</strong> berhasil diverifikasi dan hak akses belajar telah ditambahkan ke akun Anda.
            </p>

            <div className="token-success-package-card">
              <div className="token-success-package-header">
                <div>
                  <span className="token-success-package-tag">PAKET TERDAFTAR</span>
                  <h4 className="token-success-package-name">{activatedToken.packageName}</h4>
                </div>
                <div className="token-success-duration-badge">
                  {activatedToken.duration}
                </div>
              </div>

              <div className="token-success-expiry-row">
                <span>Masa aktif berlaku hingga:</span>
                <strong>{activatedToken.expiresAt}</strong>
              </div>

              <div className="token-success-benefits-list">
                <span className="token-success-benefits-title">Benefit yang Terbuka:</span>
                {activatedToken.benefits.map((b, i) => (
                  <div key={i} className="token-success-benefit-item">
                    <FlatIcon type="check" size={14} color="#10B981" style={{ display: "inline-block", verticalAlign: "middle" }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="token-success-actions">
              <Link
                href="/learningpaths/65"
                className="lp-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setActivatedToken(null)}
              >
                Mulai Belajar Sekarang (AI Engineer) →
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
