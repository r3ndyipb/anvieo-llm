"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

type SelectedPlan = "single" | "plus";

interface PlusPeriodOption {
  months: number;
  days: number;
  label: string;
  price: number;
  originalPrice?: number;
  discountText?: string;
}

const PLUS_PERIOD_OPTIONS: PlusPeriodOption[] = [
  { months: 1, days: 30, label: "1 Bulan", price: 1500000 },
  { months: 3, days: 90, label: "3 Bulan", price: 4500000 },
  { months: 6, days: 180, label: "6 Bulan", price: 8100000, originalPrice: 9000000, discountText: "Hemat 10%" },
  { months: 12, days: 365, label: "1 Tahun", price: 12600000, originalPrice: 18000000, discountText: "Hemat 30%" },
];

export default function SingleCourseCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>("single");
  const [selectedPlusIndex, setSelectedPlusIndex] = useState<number>(0);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState("");

  // Referral Code State
  const [referralInput, setReferralInput] = useState("");
  const [appliedReferral, setAppliedReferral] = useState<{ code: string; discount: number } | null>(null);
  const [referralError, setReferralError] = useState("");

  // Payment Confirmation Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Calculate Prices
  const basePrice =
    selectedPlan === "single"
      ? 500000
      : PLUS_PERIOD_OPTIONS[selectedPlusIndex].price;

  const promoDiscount = appliedPromo ? appliedPromo.discount : 0;
  const referralDiscount = appliedReferral ? Math.round(basePrice * 0.1) : 0;
  const totalCharge = Math.max(0, basePrice - promoDiscount - referralDiscount);

  const formatRupiah = (num: number) => {
    return "Rp" + num.toLocaleString("id-ID");
  };

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === "ANVIEO50" || code === "AI50") {
      setAppliedPromo({ code, discount: 50000, label: "Voucher Pelajar AI (Hemat Rp50.000)" });
      setPromoError("");
    } else if (code === "MERDEKA" || code === "KAMPUSMERDEKA") {
      setAppliedPromo({ code, discount: 100000, label: "Beasiswa Kampus Merdeka (Hemat Rp100.000)" });
      setPromoError("");
    } else {
      setPromoError("Kode promo tidak ditemukan atau telah kedaluwarsa.");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput("");
    setPromoError("");
  };

  const handleApplyReferral = () => {
    const code = referralInput.trim().toUpperCase();
    if (code.length >= 5) {
      setAppliedReferral({ code, discount: Math.round(basePrice * 0.1) });
      setReferralError("");
    } else {
      setReferralError("Kode referral tidak valid (minimal 5 karakter).");
    }
  };

  const handleRemoveReferral = () => {
    setAppliedReferral(null);
    setReferralInput("");
    setReferralError("");
  };

  return (
    <>
      <SiteHeader activeTabOverride="langganan" />

      <main className="blackbox-page" style={{ paddingTop: "60px", minHeight: "100vh" }}>
        {/* Breadcrumb Navigation Rail */}
        <section style={{ borderBottom: "1px solid var(--bx-border)", padding: "14px 0", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem" }}>
              <Link href="/" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                Beranda
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <Link href="/subscriptions/purchases" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                Langganan
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>Pembayaran Paket</span>
            </nav>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* CHECKOUT CONTENT WRAPPER */}
        <section style={{ padding: "40px 0 80px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "36px",
                alignItems: "start",
              }}
            >
              {/* LEFT COLUMN: PACKAGE SELECTION & COMPARISON */}
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <h1
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.875rem",
                      fontWeight: 800,
                      color: "var(--bx-ink-bright)",
                      margin: "0 0 8px",
                    }}
                  >
                    Selesaikan Pembelian
                  </h1>
                  <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
                    Perhatikan detail benefit paket Anda sebelum lanjut. Anda dapat upgrade paket langganan, jika
                    dirasa lebih sesuai.
                  </p>
                </div>

                {/* Banner notice */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    background: "rgba(201, 150, 46, 0.06)",
                    border: "1px solid var(--gold)",
                    borderRadius: "2px",
                    marginBottom: "20px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--bx-ink-bright)",
                  }}
                >
                  <FlatIcon type="shield" size={18} color="var(--gold)" />
                  <span>Pertimbangkan paket yang lebih sesuai untuk kebutuhan Anda</span>
                </div>

                {/* COMPARISON CARDS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* CARD 1: SINGLE COURSE */}
                  <div
                    onClick={() => setSelectedPlan("single")}
                    style={{
                      border: selectedPlan === "single" ? "2px solid var(--gold)" : "1px solid var(--bx-grid)",
                      background: selectedPlan === "single" ? "var(--bx-card-bg)" : "var(--bx-surface)",
                      borderRadius: "2px",
                      padding: "20px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: selectedPlan === "single" ? "5px solid var(--gold)" : "2px solid var(--bx-grid)",
                            background: "transparent",
                          }}
                        />
                        <div>
                          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: 0 }}>
                            Single Course
                          </h3>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                            Bebas akses kelas di paket ini
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            color: "var(--gold)",
                          }}
                        >
                          Rp500.000
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", display: "block" }}>
                          / 30 hari
                        </span>
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--bx-grid)", paddingTop: "14px", marginTop: "12px" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-ink-faint)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                        Fitur Paket Single Course:
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <strong>Akses 1 kelas (Belajar Dasar AI)</strong>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <strong>Durasi belajar 30 hari</strong>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Forum diskusi interaktif</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Unlimited ujian evaluasi</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Code review submission</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Sertifikat kelulusan digital</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: PLUS (BEST OFFER) */}
                  <div
                    onClick={() => setSelectedPlan("plus")}
                    style={{
                      border: selectedPlan === "plus" ? "2px solid var(--gold)" : "1px solid var(--bx-grid)",
                      background: selectedPlan === "plus" ? "var(--bx-card-bg)" : "var(--bx-surface)",
                      borderRadius: "2px",
                      padding: "20px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      position: "relative",
                    }}
                  >
                    {/* Best Offer Tag */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "20px",
                        background: "var(--gold)",
                        color: "#0A0A0C",
                        padding: "2px 10px",
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        borderRadius: "2px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      ★ Penawaran Terbaik
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: selectedPlan === "plus" ? "5px solid var(--gold)" : "2px solid var(--bx-grid)",
                            background: "transparent",
                          }}
                        />
                        <div>
                          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: 0 }}>
                            Langganan Plus (Semua Kelas)
                          </h3>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                            Bebas akses semua 14 kurikulum &amp; 80+ kelas
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period Selector Buttons */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px" }}>
                      {PLUS_PERIOD_OPTIONS.map((opt, idx) => {
                        const isPeriodActive = selectedPlan === "plus" && selectedPlusIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPlan("plus");
                              setSelectedPlusIndex(idx);
                            }}
                            style={{
                              padding: "8px 6px",
                              border: isPeriodActive ? "1px solid var(--gold)" : "1px solid var(--bx-grid)",
                              background: isPeriodActive ? "rgba(201, 150, 46, 0.15)" : "var(--bx-bg)",
                              borderRadius: "2px",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", display: "block" }}>
                              {opt.label}
                            </span>
                            <span style={{ fontSize: "0.6875rem", color: "var(--gold)", fontWeight: 700, display: "block", marginTop: "2px" }}>
                              {formatRupiah(opt.price)}
                            </span>
                            {opt.discountText && (
                              <span style={{ fontSize: "0.5625rem", color: "#22c55e", fontWeight: 700, display: "block" }}>
                                {opt.discountText}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ borderTop: "1px solid var(--bx-grid)", paddingTop: "14px" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-ink-faint)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                        Benefit Eksklusif Langganan Plus:
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <strong>Akses SELURUH 14 kurikulum</strong>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <strong>Durasi belajar {PLUS_PERIOD_OPTIONS[selectedPlusIndex].days} hari</strong>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Konsultasi forum prioritas</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#22c55e" }}>✓</span>
                          <span>Review kode tanpa batas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <Link
                    href="/subscriptions/purchases"
                    style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Bandingkan seluruh paket langganan →
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: RINGKASAN TAGIHAN & CHECKOUT */}
              <div
                style={{
                  border: "1px solid var(--bx-grid)",
                  background: "var(--bx-card-bg)",
                  borderRadius: "2px",
                  padding: "28px",
                  position: "sticky",
                  top: "90px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--bx-ink-bright)",
                    margin: "0 0 16px",
                  }}
                >
                  Ringkasan Tagihan
                </h3>

                {/* Selected Item Breakdown */}
                <div style={{ paddingBottom: "16px", borderBottom: "1px solid var(--bx-grid)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <div>
                      <strong style={{ fontSize: "0.9375rem", color: "var(--bx-ink-bright)", display: "block" }}>
                        {selectedPlan === "single"
                          ? "Belajar Dasar AI (30 hari)"
                          : `Langganan Plus (${PLUS_PERIOD_OPTIONS[selectedPlusIndex].label})`}
                      </strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                        {selectedPlan === "single" ? "Single Course • 30 hari akses" : "Plus • Bebas akses semua kelas"}
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                      {formatRupiah(basePrice)}
                    </span>
                  </div>
                </div>

                {/* Kode Promo Section */}
                <div style={{ padding: "16px 0", borderBottom: "1px solid var(--bx-grid)" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--bx-ink-bright)", display: "block", marginBottom: "4px" }}>
                    Kode Promo
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", display: "block", marginBottom: "8px" }}>
                    Gunakan kode promo untuk potongan harga tambahan.
                  </span>

                  {appliedPromo ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        padding: "8px 12px",
                        borderRadius: "2px",
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: "0.8125rem", color: "#22c55e", display: "block" }}>
                          {appliedPromo.code} Diterapkan
                        </strong>
                        <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-soft)" }}>
                          {appliedPromo.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--bx-ink-faint)",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Contoh: AI50"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          border: "1px solid var(--bx-grid)",
                          background: "var(--bx-bg)",
                          color: "var(--bx-ink-bright)",
                          fontSize: "0.8125rem",
                          borderRadius: "2px",
                          outline: "none",
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="blackbox-pill blackbox-pill-black"
                        style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                      >
                        Terapkan
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <span style={{ fontSize: "0.6875rem", color: "#e03131", marginTop: "4px", display: "block" }}>
                      {promoError}
                    </span>
                  )}

                  {/* Promo quick chips */}
                  {!appliedPromo && (
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setPromoCodeInput("AI50")}
                        style={{
                          background: "transparent",
                          border: "1px dashed var(--bx-grid)",
                          color: "var(--gold)",
                          fontSize: "0.6875rem",
                          padding: "2px 8px",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                      >
                        Gunakan &quot;AI50&quot;
                      </button>
                      <button
                        type="button"
                        onClick={() => setPromoCodeInput("MERDEKA")}
                        style={{
                          background: "transparent",
                          border: "1px dashed var(--bx-grid)",
                          color: "var(--gold)",
                          fontSize: "0.6875rem",
                          padding: "2px 8px",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                      >
                        Gunakan &quot;MERDEKA&quot;
                      </button>
                    </div>
                  )}
                </div>

                {/* Kode Referral Section */}
                <div style={{ padding: "16px 0", borderBottom: "1px solid var(--bx-grid)" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--bx-ink-bright)", display: "block", marginBottom: "4px" }}>
                    Kode Referral
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", display: "block", marginBottom: "8px" }}>
                    Dapatkan diskon 10% dari kode referral rekan Anda.
                  </span>

                  {appliedReferral ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        padding: "8px 12px",
                        borderRadius: "2px",
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: "0.8125rem", color: "#22c55e", display: "block" }}>
                          Referral {appliedReferral.code} Diterapkan
                        </strong>
                        <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-soft)" }}>
                          Potongan 10%: -{formatRupiah(referralDiscount)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveReferral}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--bx-ink-faint)",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Contoh: ALUMNI2026"
                        value={referralInput}
                        onChange={(e) => setReferralInput(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          border: "1px solid var(--bx-grid)",
                          background: "var(--bx-bg)",
                          color: "var(--bx-ink-bright)",
                          fontSize: "0.8125rem",
                          borderRadius: "2px",
                          outline: "none",
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyReferral}
                        className="blackbox-pill blackbox-pill-black"
                        style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                      >
                        Terapkan
                      </button>
                    </div>
                  )}

                  {referralError && (
                    <span style={{ fontSize: "0.6875rem", color: "#e03131", marginTop: "4px", display: "block" }}>
                      {referralError}
                    </span>
                  )}
                </div>

                {/* Total Tagihan Summary */}
                <div style={{ padding: "16px 0 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)" }}>Harga Paket</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>{formatRupiah(basePrice)}</span>
                  </div>

                  {appliedPromo && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.8125rem", color: "#22c55e" }}>Diskon Promo ({appliedPromo.code})</span>
                      <span style={{ fontSize: "0.875rem", color: "#22c55e", fontWeight: 700 }}>
                        -{formatRupiah(promoDiscount)}
                      </span>
                    </div>
                  )}

                  {appliedReferral && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.8125rem", color: "#22c55e" }}>Diskon Referral (10%)</span>
                      <span style={{ fontSize: "0.875rem", color: "#22c55e", fontWeight: 700 }}>
                        -{formatRupiah(referralDiscount)}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px dashed var(--bx-grid)",
                    }}
                  >
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                      Jumlah Tagihan
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "var(--gold)",
                      }}
                    >
                      {formatRupiah(totalCharge)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsSuccessModalOpen(true)}
                    className="blackbox-pill blackbox-pill-gold"
                    style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.875rem" }}
                  >
                    LANJUT KE PEMBAYARAN →
                  </button>
                  <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textAlign: "center", lineHeight: 1.4 }}>
                    Dengan menekan tombol di atas, Anda menyetujui Ketentuan Layanan &amp; Kebijakan Privasi ANVIEO Academy.
                  </span>
                </div>

                {/* Assurance Card */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginTop: "20px",
                    padding: "12px",
                    background: "var(--bx-surface)",
                    border: "1px solid var(--bx-grid)",
                    borderRadius: "2px",
                    fontSize: "0.75rem",
                    color: "var(--bx-ink-faint)",
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ marginTop: "2px", color: "var(--gold)" }}>
                    <FlatIcon type="shield" size={16} />
                  </div>
                  <div>
                    <strong style={{ color: "var(--bx-ink-bright)", display: "block" }}>Bayar Putus Tanpa Jebakan:</strong>
                    Tak ada kewajiban perpanjangan otomatis tanpa izin. Tak ada biaya rahasia tersembunyi.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* PAYMENT CONFIRMATION MODAL */}
        {isSuccessModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.75)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setIsSuccessModalOpen(false)}
          >
            <div
              style={{
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-grid)",
                maxWidth: "500px",
                width: "100%",
                padding: "36px",
                borderRadius: "2px",
                textAlign: "center",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  border: "1px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                }}
              >
                <FlatIcon type="check" size={28} />
              </div>

              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                Instruksi Pembayaran Dibuat
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-soft)", lineHeight: 1.6, marginBottom: "20px" }}>
                Tagihan untuk{" "}
                <strong>
                  {selectedPlan === "single"
                    ? "Belajar Dasar AI (30 hari)"
                    : `Langganan Plus (${PLUS_PERIOD_OPTIONS[selectedPlusIndex].label})`}
                </strong>{" "}
                sebesar <strong style={{ color: "var(--gold)" }}>{formatRupiah(totalCharge)}</strong> telah disiapkan.
              </p>

              <div
                style={{
                  background: "var(--bx-surface)",
                  border: "1px solid var(--bx-grid)",
                  padding: "14px",
                  borderRadius: "2px",
                  marginBottom: "24px",
                  fontSize: "0.8125rem",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--bx-ink-faint)" }}>Metode Pembayaran:</span>
                  <strong style={{ color: "var(--bx-ink-bright)" }}>QRIS / Virtual Account</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--bx-ink-faint)" }}>Nomor Invoice:</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}>INV-20261026-653</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--bx-ink-faint)" }}>Batas Waktu Bayar:</span>
                  <span style={{ color: "var(--bx-ink-bright)" }}>24 Jam ke Depan</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link
                  href="/academies/653-belajar-dasar-ai"
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
                >
                  SIMULASIKAN AKSES KELAS →
                </Link>
                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-black"
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  TUTUP
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
