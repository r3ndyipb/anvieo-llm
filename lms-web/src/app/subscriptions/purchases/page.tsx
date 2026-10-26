"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

type LpPackageTier = "pemula" | "lanjutan" | "komplit";
type PlusPeriod = "1" | "3" | "6" | "12";

interface LpCourseInfo {
  name: string;
  hours: string;
}

const LEARNING_PATHS_CATALOG: Record<string, { title: string; classes: Record<LpPackageTier, LpCourseInfo[]> }> = {
  ai: {
    title: "AI Engineer",
    classes: {
      pemula: [
        { name: "Belajar Dasar AI", hours: "10 Jam" },
        { name: "Memulai Pemrograman dengan Python", hours: "60 Jam" },
      ],
      lanjutan: [
        { name: "Belajar Machine Learning untuk Pemula", hours: "90 Jam" },
        { name: "Belajar Fundamental Deep Learning", hours: "110 Jam" },
      ],
      komplit: [
        { name: "Belajar Dasar AI", hours: "10 Jam" },
        { name: "Memulai Pemrograman dengan Python", hours: "60 Jam" },
        { name: "Belajar Machine Learning untuk Pemula", hours: "90 Jam" },
        { name: "Belajar Fundamental Deep Learning", hours: "110 Jam" },
        { name: "Machine Learning Terapan", hours: "80 Jam" },
        { name: "Membangun Proyek Deep Learning Tingkat Mahir", hours: "90 Jam" },
      ],
    },
  },
  frontend: {
    title: "Front-End Web Developer",
    classes: {
      pemula: [
        { name: "Belajar Dasar Pemrograman Web (HTML, CSS, JS)", hours: "40 Jam" },
        { name: "Belajar Membuat Front-End Web untuk Pemula", hours: "45 Jam" },
      ],
      lanjutan: [
        { name: "Belajar Fundamental Aplikasi Web dengan React", hours: "60 Jam" },
        { name: "Menjadi Front-End Web Developer Expert", hours: "95 Jam" },
      ],
      komplit: [
        { name: "Belajar Dasar Pemrograman Web", hours: "40 Jam" },
        { name: "Belajar Membuat Front-End Web untuk Pemula", hours: "45 Jam" },
        { name: "Belajar Fundamental Web dengan React", hours: "60 Jam" },
        { name: "Menjadi Front-End Web Developer Expert", hours: "95 Jam" },
        { name: "Membangun Progressive Web Apps (PWA)", hours: "50 Jam" },
      ],
    },
  },
  cloud: {
    title: "Cloud & DevOps Architect",
    classes: {
      pemula: [
        { name: "Belajar Dasar Cloud Computing", hours: "20 Jam" },
        { name: "Memulai Dasar Linux & Docker", hours: "35 Jam" },
      ],
      lanjutan: [
        { name: "Menjadi Cloud Practitioner Terakreditasi", hours: "65 Jam" },
        { name: "Belajar Implementasi CI/CD & Kubernetes", hours: "80 Jam" },
      ],
      komplit: [
        { name: "Belajar Dasar Cloud Computing", hours: "20 Jam" },
        { name: "Memulai Dasar Linux & Docker", hours: "35 Jam" },
        { name: "Menjadi Cloud Practitioner Terakreditasi", hours: "65 Jam" },
        { name: "Belajar Implementasi CI/CD & Kubernetes", hours: "80 Jam" },
        { name: "Arsitektur Multi-Cloud Enterprise & Terraform", hours: "90 Jam" },
      ],
    },
  },
  fintech: {
    title: "Fintech & Quantitative Finance",
    classes: {
      pemula: [
        { name: "Dasar Finansial Pasar Modal & Analisis Fundamental", hours: "25 Jam" },
        { name: "Pemodelan Keuangan dengan Python & Excel", hours: "45 Jam" },
      ],
      lanjutan: [
        { name: "Algoritmic Trading & Analisis Foreign Flow", hours: "75 Jam" },
        { name: "Valuasi Ekuitas Korporasi & Struktur M&A", hours: "85 Jam" },
      ],
      komplit: [
        { name: "Dasar Finansial Pasar Modal", hours: "25 Jam" },
        { name: "Pemodelan Keuangan dengan Python", hours: "45 Jam" },
        { name: "Algoritmic Trading & Foreign Flow", hours: "75 Jam" },
        { name: "Valuasi Ekuitas Korporasi & M&A", hours: "85 Jam" },
        { name: "Audit Forensik Laporan Keuangan", hours: "70 Jam" },
      ],
    },
  },
};

const FAQ_ITEMS = [
  {
    q: "Apa perbedaan Langganan Learning Path dan Langganan Plus?",
    a: "Langganan Learning Path memberikan akses fokus ke serangkaian kelas pada satu jalur keahlian pilihan Anda (misalnya AI Engineer atau Front-End Web). Sedangkan Langganan Plus membuka akses penuh tanpa batas ke SELURUH kelas (50+ kurikulum) dari semua disiplin teknologi, hukum bisnis, dan keuangan selama masa aktif berlangsung.",
  },
  {
    q: "Bagaimana cara kerja review submission tugas?",
    a: "Setiap tugas proyek yang Anda submit akan diperiksa secara mendalam baris-demi-baris oleh Reviewer praktisi kami. Anda akan menerima feedback menyeluruh terkait aspek fungsionalitas, performa, keamanan, dan standar clean code dalam waktu kurang dari 12 jam (bahkan lebih cepat).",
  },
  {
    q: "Apakah sertifikat ANVIEO Academy diakui industri?",
    a: "Ya. Sertifikat kelulusan kami dilengkapi dengan kode verifikasi unik terenkripsi, transkrip kompetensi standar global (NIST, IEEE, dan CFA), serta diakui oleh lebih dari 850+ perusahaan mitra rekrutmen kami.",
  },
  {
    q: "Bagaimana jika masa langganan saya habis sebelum semua kelas selesai?",
    a: "Progres belajar Anda akan tetap tersimpan aman di sistem selamanya. Ketika Anda memperpanjang langganan atau mengaktivasi token baru, Anda dapat langsung melanjutkan tepat di titik terakhir tanpa mengulang dari awal.",
  },
  {
    q: "Apakah saya bisa membatalkan atau refund langganan?",
    a: "Kami menyediakan jaminan kepuasan pelanggan. Anda dapat mengajukan refund penuh dalam waktu 7 hari pertama jika Anda belum mengklaim sertifikat atau mengumpulkan tugas berbayar.",
  },
];

export default function SubscriptionsPurchasesPage() {
  const [lpTier, setLpTier] = useState<LpPackageTier>("pemula");
  const [selectedLpKey, setSelectedLpKey] = useState<string>("ai");
  const [plusPeriod, setPlusPeriod] = useState<PlusPeriod>("1");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutModal, setCheckoutModal] = useState<{
    open: boolean;
    type: "lp" | "plus";
    planName: string;
    price: string;
    period: string;
  } | null>(null);

  const lpPrices: Record<LpPackageTier, { price: string; num: number; duration: string; classesRange: string }> = {
    pemula: { price: "Rp650.000", num: 650000, duration: "30 hari", classesRange: "2 - 3 kelas" },
    lanjutan: { price: "Rp1.300.000", num: 1300000, duration: "30 hari", classesRange: "2 - 4 kelas" },
    komplit: { price: "Rp3.150.000", num: 3150000, duration: "90 hari", classesRange: "5 - 7 kelas" },
  };

  const plusPrices: Record<PlusPeriod, { price: string; oldPrice?: string; discount?: string; label: string; duration: string }> = {
    "1": { price: "Rp1.500.000", label: "1 Bulan", duration: "30 hari" },
    "3": { price: "Rp4.500.000", label: "3 Bulan", duration: "90 hari" },
    "6": { price: "Rp8.100.000", oldPrice: "Rp9.000.000", discount: "Hemat 10%", label: "6 Bulan", duration: "180 hari" },
    "12": { price: "Rp12.600.000", oldPrice: "Rp18.000.000", discount: "Hemat 30%", label: "1 Tahun", duration: "365 hari" },
  };

  const currentLpData = LEARNING_PATHS_CATALOG[selectedLpKey] || LEARNING_PATHS_CATALOG.ai;
  const currentLpClasses = currentLpData.classes[lpTier] || [];

  const handleCheckoutLp = () => {
    setCheckoutModal({
      open: true,
      type: "lp",
      planName: `Langganan Learning Path: ${currentLpData.title} (${lpTier.toUpperCase()})`,
      price: lpPrices[lpTier].price,
      period: lpPrices[lpTier].duration,
    });
  };

  const handleCheckoutPlus = () => {
    setCheckoutModal({
      open: true,
      type: "plus",
      planName: `Langganan Plus (${plusPrices[plusPeriod].label})`,
      price: plusPrices[plusPeriod].price,
      period: plusPrices[plusPeriod].duration,
    });
  };

  return (
    <div className="subscriptions-page-wrap">
      <SiteHeader activeTabOverride="langganan" />

      {/* Breadcrumb Header */}
      <div className="lp-breadcrumb-wrap" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">Jenis Langganan</span>
          </nav>
        </div>
      </div>

      {/* Main Banner Header */}
      <section className="subs-hero-banner blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="subs-hero-badge">
            <span>PROGRAM INVESTASI BELAJAR RESMI</span>
          </div>
          <h1 className="subs-hero-title">
            Jenis <span className="subs-hero-highlight">Langganan</span>
          </h1>
          <p className="subs-hero-subtitle">
            Pilih jenis langganan mulai dari <strong>Learning Path</strong> hingga <strong>Plus</strong> sebagai investasi belajar yang sesuai dengan kebutuhan dan target akselerasi karir Anda.
          </p>
        </div>
      </section>

      {/* Pricing Container Side-by-Side */}
      <section className="subs-pricing-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">01 // SUBSCRIPTION PLANS &amp; INVESTMENT</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>TIERS</dt>
                <dd>LEARNING PATH &amp; PLUS</dd>
              </div>
              <div>
                <dt>ACCESS</dt>
                <dd>UNLIMITED CODING LAB</dd>
              </div>
              <div>
                <dt>CERTIFICATE</dt>
                <dd>IEEE / NIST ACCREDITED</dd>
              </div>
            </dl>
          </div>

          <div className="subs-pricing-grid">
            {/* Card 1: Langganan Learning Path */}
            <div className="subs-card subs-card-lp">
              <div className="subs-card-header">
                <h2 className="subs-card-title">Langganan Learning Path</h2>
                <span className="subs-card-caption">Paket belajar berjenjang</span>
              </div>

              {/* Package Tier Tabs */}
              <div className="subs-tier-pills">
                <button
                  type="button"
                  className={`subs-tier-pill ${lpTier === "pemula" ? "active" : ""}`}
                  onClick={() => setLpTier("pemula")}
                >
                  Pemula
                </button>
                <button
                  type="button"
                  className={`subs-tier-pill ${lpTier === "lanjutan" ? "active" : ""}`}
                  onClick={() => setLpTier("lanjutan")}
                >
                  Lanjutan
                </button>
                <button
                  type="button"
                  className={`subs-tier-pill ${lpTier === "komplit" ? "active" : ""}`}
                  onClick={() => setLpTier("komplit")}
                >
                  Komplit
                </button>
              </div>

              {/* Price Display */}
              <div className="subs-price-display">
                <div className="subs-price-num">{lpPrices[lpTier].price}</div>
                <div className="subs-price-period">Akses durasi {lpPrices[lpTier].duration}</div>
              </div>

              {/* Learning Path Selector Dropdown */}
              <div className="subs-lp-select-wrap">
                <label className="subs-field-label">
                  Pilih Learning Path <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <select
                  className="subs-select"
                  value={selectedLpKey}
                  onChange={(e) => setSelectedLpKey(e.target.value)}
                >
                  <option value="ai">AI Engineer (Machine Learning &amp; Deep Learning)</option>
                  <option value="frontend">Front-End Web Developer (React, Next.js &amp; PWA)</option>
                  <option value="cloud">Cloud &amp; DevOps Architect (Docker, K8s &amp; Multi-Cloud)</option>
                  <option value="fintech">Fintech &amp; Quantitative Finance (Trading Bot &amp; Valuation)</option>
                </select>
              </div>

              {/* Included Classes Accordion Summary */}
              <div className="subs-classes-included-box">
                <div className="subs-classes-included-header">
                  <span>Daftar {currentLpClasses.length} Kelas yang Didapatkan:</span>
                  <span className="subs-classes-count-badge">{lpPrices[lpTier].classesRange}</span>
                </div>
                <ul className="subs-classes-list">
                  {currentLpClasses.map((cls, idx) => (
                    <li key={idx}>
                      <span className="subs-class-num">{idx + 1}.</span>
                      <span className="subs-class-name">{cls.name}</span>
                      <span className="subs-class-hrs">{cls.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              <button type="button" onClick={handleCheckoutLp} className="subs-btn-primary">
                Beli sekarang →
              </button>

              <div className="subs-divider" />

              {/* Benefits Checklist */}
              <p className="subs-desc-notes">
                Pilihan tepat untuk fokus mempelajari satu alur keahlian spesifik hingga tuntas.
              </p>

              <ul className="subs-benefit-list">
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Akses seluruh kelas dalam alur <strong>{currentLpData.title}</strong></span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Durasi belajar aktif <strong>{lpPrices[lpTier].duration}</strong></span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Review kode baris-demi-baris oleh Reviewer dengan SLA &lt; 12 jam</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Sertifikat kelulusan kompetensi resmi terakreditasi global</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Konsultasi forum diskusi aktif bersama mentor instruktur</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Langganan Plus */}
            <div className="subs-card subs-card-plus">
              <div className="subs-card-plus-top-badge">
                <FlatIcon type="sparkle" size={13} color="var(--gold)" />
                <span>AKSES PENUH SEMUA KURIKULUM</span>
              </div>

              <div className="subs-card-header">
                <h2 className="subs-card-title">Langganan Plus</h2>
                <span className="subs-card-caption">All-Access Pass tanpa batas kelas</span>
              </div>

              {/* Period Selector Tabs */}
              <div className="subs-period-grid">
                {(["1", "3", "6", "12"] as PlusPeriod[]).map((pKey) => {
                  const pData = plusPrices[pKey];
                  const isActive = plusPeriod === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      className={`subs-period-btn ${isActive ? "active" : ""}`}
                      onClick={() => setPlusPeriod(pKey)}
                    >
                      <span className="subs-period-lbl">{pData.label}</span>
                      {pData.discount && (
                        <span className="subs-period-badge">{pData.discount}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Plus Price Display */}
              <div className="subs-price-display">
                <div className="subs-price-num-row">
                  <span className="subs-price-num">{plusPrices[plusPeriod].price}</span>
                  {plusPrices[plusPeriod].oldPrice && (
                    <del className="subs-old-price">{plusPrices[plusPeriod].oldPrice}</del>
                  )}
                </div>
                <div className="subs-price-period">Akses tanpa batas durasi {plusPrices[plusPeriod].duration}</div>
              </div>

              {/* Plus Value Highlight Box */}
              <div className="subs-plus-highlight-banner">
                <div className="subs-plus-highlight-icon"><FlatIcon type="award" size={20} color="var(--gold)" /></div>
                <div>
                  <h4 className="subs-plus-highlight-title">50+ Seluruh Kelas Siap Diakses</h4>
                  <p className="subs-plus-highlight-desc">
                    Mulai dari AI Engineering, Full-Stack Web, Cloud DevOps, hingga Finansial Kuantitatif.
                  </p>
                </div>
              </div>

              {/* CTA Action */}
              <button type="button" onClick={handleCheckoutPlus} className="subs-btn-primary subs-btn-gold">
                Beli sekarang →
              </button>

              <div className="subs-divider" />

              {/* Benefits Checklist */}
              <p className="subs-desc-notes">
                Cocok untuk Anda yang ingin mengeksplorasi beragam bahasa pemrograman dan menambah multiskill baru.
              </p>

              <ul className="subs-benefit-list">
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span><strong>Akses ke SEMUA kelas &amp; kurikulum tanpa batasan</strong></span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span><strong>Durasi belajar fleksibel {plusPrices[plusPeriod].duration}</strong></span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Akses materi baru &amp; update kurikulum otomatis</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Forum diskusi prioritas dengan instruktur</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Unlimited submission tugas dengan SLA review &lt; 12 jam</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Sertifikat kelulusan kompetensi terakreditasi IEEE &amp; NIST</span>
                </li>
                <li>
                  <div className="subs-benefit-icon"><FlatIcon type="check" size={12} color="#10B981" /></div>
                  <span>Hak memperbarui sertifikat kompetensi seumur hidup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Addons, Token & Enterprise Solutions Section */}
      <section className="subs-addons-section blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">02 // TOKEN ACTIVATION &amp; ENTERPRISE B2B</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>VOUCHERS</dt>
                <dd>INSTANT ACTIVATION</dd>
              </div>
              <div>
                <dt>B2B SOLUTIONS</dt>
                <dd>CUSTOM TRAINING</dd>
              </div>
            </dl>
          </div>

          {/* Token Activation Callout Banner */}
          <div className="subs-token-callout-card">
            <div className="subs-token-callout-content">
              <div className="subs-token-icon-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><FlatIcon type="ticket" size={26} color="var(--gold)" /></div>
              <div>
                <h3 className="subs-token-callout-title">Punya Token Belajar atau Voucher Beasiswa?</h3>
                <p className="subs-token-callout-desc">
                  Jika Anda memiliki token langganan dari program beasiswa kampus, partner korporat, atau voucher event, Anda dapat langsung mengaktivasinya tanpa biaya.
                </p>
              </div>
            </div>
            <Link href="/tokens/activation" className="subs-token-callout-btn">
              Aktivasi Token Sekarang →
            </Link>
          </div>

          {/* Enterprise B2B Inquiry Banner */}
          <div className="subs-enterprise-banner">
            <div className="subs-enterprise-left">
              <span className="lp-hero-badge">SOLUSI BISNIS &amp; INSTITUSI</span>
              <h3 className="subs-enterprise-title">Ingin Melatih Tim Perusahaan Anda?</h3>
              <p className="subs-enterprise-desc">
                Dapatkan paket enterprise dengan dashboard analytics manajemen progres karyawan, kurikulum kustom, SLA reviewer khusus, dan faktur pajak resmi.
              </p>
            </div>
            <Link
              href="/corporate-training"
              className="lp-btn-outline"
            >
              Konsultasi Solusi Corporate →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="subs-faq-section-wrap blackbox-compute-band" style={{ position: "relative" }}>
        <BlackboxRails position="top" />
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <div className="blackbox-strip">
            <span className="blackbox-strip-label">03 // FREQUENTLY ASKED QUESTIONS</span>
            <dl className="blackbox-strip-facts">
              <div>
                <dt>PAYMENT</dt>
                <dd>QRIS, VA, CC 0%</dd>
              </div>
              <div>
                <dt>SUPPORT</dt>
                <dd>24/7 HELPDESK</dd>
              </div>
            </dl>
          </div>

          <div className="lp-section-header">
            <h3 className="lp-section-title">Pertanyaan yang Sering Diajukan</h3>
            <p className="lp-section-subtitle">
              Informasi penting seputar skema langganan, mekanisme pembayaran, dan hak akses kelas.
            </p>
          </div>

          <div className="subs-faq-list" style={{ maxWidth: "860px", margin: "0 auto" }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`subs-faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="subs-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="subs-faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="subs-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checkout Simulation Modal */}
      {checkoutModal && (
        <div className="blackbox-modal-backdrop" onClick={() => setCheckoutModal(null)}>
          <div className="subs-checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setCheckoutModal(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div className="subs-checkout-header">
              <span className="lp-hero-badge">KONFIRMASI PEMBELIAN</span>
              <h3 className="subs-checkout-title">{checkoutModal.planName}</h3>
              <div className="subs-checkout-price-row">
                <span className="subs-checkout-price">{checkoutModal.price}</span>
                <span className="subs-checkout-duration">/ {checkoutModal.period}</span>
              </div>
            </div>

            <div className="subs-checkout-body">
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "10px" }}>
                Metode Pembayaran Tersedia
              </h4>

              <div className="subs-payment-methods">
                <label className="subs-payment-option">
                  <input type="radio" name="paymentMethod" defaultChecked />
                  <span className="subs-payment-name" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="phone" size={16} /> QRIS (GoPay, OVO, Dana, ShopeePay)</span>
                </label>
                <label className="subs-payment-option">
                  <input type="radio" name="paymentMethod" />
                  <span className="subs-payment-name" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="bank" size={16} /> Virtual Account (BCA, Mandiri, BNI, BRI)</span>
                </label>
                <label className="subs-payment-option">
                  <input type="radio" name="paymentMethod" />
                  <span className="subs-payment-name" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="card" size={16} /> Kartu Kredit / Debit Online (Visa &amp; MasterCard)</span>
                </label>
              </div>

              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(201,150,46,0.08)", border: "1px solid var(--gold)", borderRadius: "4px" }}>
                <small style={{ fontSize: "0.8125rem", color: "var(--bx-ink)", display: "block" }}>
                  <FlatIcon type="lock" size={13} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "5px" }} /> Transaksi terenkripsi 256-bit SSL. Akses langganan akan langsung aktif otomatis setelah pembayaran diverifikasi.
                </small>
              </div>
            </div>

            <div className="subs-checkout-footer">
              <button
                type="button"
                className="subs-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  alert(`Simulasi Pembayaran Berhasil!\n\nPaket: ${checkoutModal.planName}\nTotal: ${checkoutModal.price}\n\nSelamat belajar di ANVIEO Academy!`);
                  setCheckoutModal(null);
                }}
              >
                Bayar Sekarang ({checkoutModal.price}) →
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
