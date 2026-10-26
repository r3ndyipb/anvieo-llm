"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FlatIcon from "@/components/FlatIcon";
import BlackboxRails from "@/components/BlackboxRails";

interface SiteHeaderProps {
  activeTabOverride?: string;
}

export default function SiteHeader(props: SiteHeaderProps) {
  return (
    <React.Suspense fallback={<header className="blackbox-site-header" style={{ height: "64px" }} />}>
      <SiteHeaderContent {...props} />
    </React.Suspense>
  );
}

function SiteHeaderContent({ activeTabOverride }: SiteHeaderProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Rendy Ariawindana");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme from html attribute or localStorage
    const savedTheme = localStorage.getItem("anvieo_theme") as "light" | "dark" | null;
    const currentDocTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || currentDocTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-item.dropdown") && !target.closest(".blackbox-nav-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("anvieo_theme", nextTheme);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isLearningPathActive =
    activeTabOverride === "learning-path" ||
    activeTabOverride === "learningpaths" ||
    Boolean(pathname && pathname.startsWith("/learningpaths"));

  const isLanggananActive =
    activeTabOverride === "langganan" ||
    activeTabOverride === "subscriptions" ||
    activeTabOverride === "tokens" ||
    Boolean(pathname && (pathname.startsWith("/subscriptions") || pathname.startsWith("/tokens")));

  const isCorporateActive =
    activeTabOverride === "corporate" ||
    activeTabOverride === "corporate-training" ||
    Boolean(pathname && pathname.startsWith("/corporate-training"));

  const isProgramActive =
    activeTabOverride === "bootcamp" ||
    activeTabOverride === "sertifikasi" ||
    activeTabOverride === "programs" ||
    activeTabOverride === "program" ||
    Boolean(pathname && (pathname.startsWith("/bootcamp") || pathname.startsWith("/sertifikasi")));

  const isImpactActive =
    activeTabOverride === "impact" ||
    activeTabOverride === "capaian-dampak" ||
    Boolean(pathname && (pathname.startsWith("/impact") || pathname.startsWith("/capaian-dampak")));

  const isOthersActive =
    activeTabOverride === "others" ||
    activeTabOverride === "hiring-partner" ||
    activeTabOverride === "hiring-partners" ||
    activeTabOverride === "csr" ||
    activeTabOverride === "case-study" ||
    activeTabOverride === "case-studies" ||
    Boolean(
      pathname &&
        (pathname.startsWith("/hiring-partner") ||
          pathname.startsWith("/csr") ||
          pathname.startsWith("/case-study") ||
          pathname.startsWith("/case-studies"))
    );

  return (
    <>
      <header className="blackbox-site-header" ref={navRef} style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <BlackboxRails position="bottom" />

        <div className="blackbox-frame">
          <div className="header-row">
            {/* Brand Logo */}
            <Link href="/" className="blackbox-home-link" onClick={() => setOpenDropdown(null)} aria-label="ANVIEO ACADEMY">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={theme === "light" ? "/logo-dark.png" : "/logo-light.png"}
                  alt="Anvieo Logo"
                  width={34}
                  height={34}
                  style={{
                    width: "34px",
                    height: "34px",
                    objectFit: "contain",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", lineHeight: 1 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.22rem",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: "var(--bx-ink-bright)",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    ANVIEO
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "3px",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {"ACADEMY".split("").map((char, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.53125rem",
                          fontWeight: 700,
                          color: "var(--gold)",
                          lineHeight: 1,
                          display: "inline-block",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Menus */}
            <ul className="navbar-nav ml-auto" aria-label="Main Navigation">
              {/* 1. Learning Path */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isLearningPathActive ? "active" : ""}`}
                  href="/learningpaths/65"
                  onClick={() => setOpenDropdown(null)}
                >
                  Learning Path
                </Link>
              </li>

              {/* 2. Langganan (Dropdown: Biaya Langganan & Aktivasi Token) */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${openDropdown === "langganan" ? "show" : ""} ${isLanggananActive ? "active" : ""}`}
                  href="#langganan"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "langganan"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown("langganan");
                  }}
                >
                  Langganan
                </a>
                <div id="langganan" className={`dropdown-menu ${openDropdown === "langganan" ? "show" : ""}`} style={{ minWidth: "280px" }}>
                  <Link
                    className="dropdown-item remove-style-link d-flex"
                    href="/subscriptions/purchases"
                    onClick={() => setOpenDropdown(null)}
                    style={{ display: "flex", gap: "12px", padding: "12px 16px" }}
                  >
                    <div className="icon" style={{ marginTop: "2px", color: "var(--gold)" }}>
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M10.3335 6.6665C10.5896 6.6665 10.8232 6.57022 11.0002 6.41187C11.1771 6.57022 11.4107 6.6665 11.6668 6.6665C12.2191 6.6665 12.6668 6.21879 12.6668 5.6665C12.6668 5.11422 12.2191 4.6665 11.6668 4.6665C11.4107 4.6665 11.1771 4.76279 11.0002 4.92114C10.8232 4.76279 10.5896 4.6665 10.3335 4.6665C9.78121 4.6665 9.3335 5.11422 9.3335 5.6665C9.3335 6.21879 9.78121 6.6665 10.3335 6.6665Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.00016 2.6665C1.63197 2.6665 1.3335 2.96498 1.3335 3.33317V11.9998C1.3335 12.368 1.63197 12.6665 2.00016 12.6665H14.0002C14.3684 12.6665 14.6668 12.368 14.6668 11.9998V3.33317C14.6668 2.96498 14.3684 2.6665 14.0002 2.6665H2.00016ZM2.66683 7.99984V3.99984H13.3335V7.99984H2.66683ZM2.66683 9.33317V11.3332H13.3335V9.33317H2.66683Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-weight-600 mb-1" style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--bx-ink-bright)", margin: 0 }}>Biaya Langganan</p>
                      <span className="text-menu" style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", lineHeight: 1.4 }}>Bebas pilih kelas dengan berlangganan.</span>
                    </div>
                  </Link>

                  <Link
                    className="dropdown-item remove-style-link d-flex"
                    href="/tokens/activation"
                    onClick={() => setOpenDropdown(null)}
                    style={{ display: "flex", gap: "12px", padding: "12px 16px" }}
                  >
                    <div className="icon" style={{ marginTop: "2px", color: "var(--gold)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 3C3.44772 3 3 3.44772 3 4V11C3 11.5523 3.44772 12 4 12C4.55228 12 5 11.5523 5 11V9H20V16.7143H18C17.4477 16.7143 17 17.162 17 17.7143C17 18.2666 17.4477 18.7143 18 18.7143H21C21.5523 18.7143 22 18.2666 22 17.7143V4C22 3.44772 21.5523 3 21 3H4ZM20 7V5H5V7H20Z" />
                        <path d="M7 16H5V18H7V16Z" />
                        <path d="M8 16H10V18H8V16Z" />
                        <path d="M13 16H11V18H13V16Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 13C2.44772 13 2 13.4477 2 14V20C2 20.5523 2.44772 21 3 21H15C15.5523 21 16 20.5523 16 20V14C16 13.4477 15.5523 13 15 13H3ZM4 15V19H14V15H4Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-weight-600 mb-1" style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--bx-ink-bright)", margin: 0 }}>Aktivasi Token</p>
                      <span className="text-menu" style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", lineHeight: 1.4 }}>Aktifkan token belajar Academy.</span>
                    </div>
                  </Link>
                </div>
              </li>

              {/* 3. Corporate Training */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCorporateActive ? "active" : ""}`}
                  href="/corporate-training"
                  onClick={() => setOpenDropdown(null)}
                >
                  Corporate Training
                </Link>
              </li>

              {/* 4. Program */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${openDropdown === "programs" ? "show" : ""} ${isProgramActive ? "active" : ""}`}
                  href="#programs"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "programs"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown("programs");
                  }}
                >
                  Program
                </a>
                <div id="programs" className={`dropdown-menu ${openDropdown === "programs" ? "show" : ""}`} style={{ minWidth: "260px" }}>
                  <Link
                    className="dropdown-item remove-style-link"
                    href="/bootcamp"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <p className="font-weight-600 mb-1">Bootcamp</p>
                    <span className="text-menu">Pelatihan intensif 16 minggu dengan garansi job placement.</span>
                  </Link>
                  <Link
                    className="dropdown-item remove-style-link"
                    href="/sertifikasi"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <p className="font-weight-600 mb-1">Sertifikasi</p>
                    <span className="text-menu">Uji kompetensi resmi terakreditasi standar IEEE, NIST &amp; CFA.</span>
                  </Link>
                </div>
              </li>

              {/* 5. Capaian & Dampak */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isImpactActive ? "active" : ""}`}
                  href="/impact"
                  onClick={() => setOpenDropdown(null)}
                >
                  Capaian &amp; Dampak
                </Link>
              </li>

              {/* 6. Lainnya */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle mr-3 ${openDropdown === "others" ? "show" : ""} ${isOthersActive ? "active" : ""}`}
                  href="#others"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "others"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown("others");
                  }}
                >
                  Lainnya
                </a>
                <div id="others" className={`dropdown-menu dropdown-menu-right ${openDropdown === "others" ? "show" : ""}`} style={{ minWidth: "280px" }}>
                  <Link
                    className="dropdown-item remove-style-link"
                    href="/hiring-partner"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <p className="font-weight-600 mb-1">Hiring Partner</p>
                    <span className="text-menu">Jejaring 850+ perusahaan mitra rekrutmen &amp; penyaluran talenta.</span>
                  </Link>
                  <Link
                    className="dropdown-item remove-style-link"
                    href="/csr"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <p className="font-weight-600 mb-1">Corporate Social Relationship</p>
                    <span className="text-menu">Program kemitraan sosial, beasiswa kampus &amp; inklusi digital 3T.</span>
                  </Link>
                  <Link
                    className="dropdown-item remove-style-link"
                    href="/case-study"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <p className="font-weight-600 mb-1">Case Study</p>
                    <span className="text-menu">Bedah proyek riil industri, arsitektur sistem masif &amp; audit hukum.</span>
                  </Link>
                </div>
              </li>
            </ul>

            {/* Header Right Actions */}
            <div className="blackbox-header-tools">
              <button
                type="button"
                className="blackbox-theme-toggle"
                onClick={toggleTheme}
                aria-label="Ganti Tema Warna"
                title={theme === "light" ? "Beralih ke Tema Gelap" : "Beralih ke Tema Terang"}
              >
                {theme === "light" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
              </button>

              {isLoggedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--bx-ink)" }}>
                    <span style={{ width: "6px", height: "6px", background: "var(--bx-blue)", display: "inline-block" }}></span>
                    <span>{userName}</span>
                  </div>
                  <button type="button" className="blackbox-outline" onClick={() => setIsLoggedIn(false)}>
                    KELUAR
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link
                    href="/login"
                    className="blackbox-pill blackbox-pill-black"
                    style={{
                      textDecoration: "none",
                      borderRadius: "8px",
                      padding: "8px 22px",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>MASUK</span>
                    <span style={{ fontSize: "0.875rem", lineHeight: 1 }}>→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "var(--bx-bg)",
              zIndex: 9999,
              padding: "24px 20px",
              overflowY: "auto",
              borderTop: "1px solid var(--bx-grid)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Link
                href="/learningpaths/65"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: isLearningPathActive ? "var(--gold)" : "var(--bx-ink-bright)",
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--bx-grid)",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Learning Path
              </Link>

              <div style={{ padding: "8px 0", borderBottom: "1px solid var(--bx-grid)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Langganan
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px", paddingLeft: "12px" }}>
                  <Link
                    href="/subscriptions/purchases"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="card" size={15} /> Biaya Langganan</span>
                  </Link>
                  <Link
                    href="/tokens/activation"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="ticket" size={15} /> Aktivasi Token</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/corporate-training"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: isCorporateActive ? "var(--gold)" : "var(--bx-ink-bright)",
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--bx-grid)",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Corporate Training
              </Link>

              <div style={{ padding: "8px 0", borderBottom: "1px solid var(--bx-grid)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Program
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px", paddingLeft: "12px" }}>
                  <Link
                    href="/bootcamp"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="rocket" size={15} /> Accelerated Bootcamp</span>
                  </Link>
                  <Link
                    href="/sertifikasi"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="certificate" size={15} /> Uji Kompetensi &amp; Sertifikasi</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/impact"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: isImpactActive ? "var(--gold)" : "var(--bx-ink-bright)",
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--bx-grid)",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Capaian &amp; Dampak
              </Link>

              <div style={{ padding: "8px 0", borderBottom: "1px solid var(--bx-grid)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Lainnya
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px", paddingLeft: "12px" }}>
                  <Link
                    href="/hiring-partner"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="user" size={15} /> Hiring Partner</span>
                  </Link>
                  <Link
                    href="/csr"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="shield" size={15} /> Corporate Social Relationship</span>
                  </Link>
                  <Link
                    href="/case-study"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--bx-ink-bright)", textDecoration: "none" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><FlatIcon type="terminal" size={15} /> Case Study &amp; Rekayasa</span>
                  </Link>
                </div>
              </div>

              <div style={{ marginTop: "16px", paddingTop: "8px" }}>
                <Link
                  href="/login"
                  className="blackbox-pill blackbox-pill-black"
                  style={{
                    display: "flex",
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  MASUK →
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="blackbox-modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setShowLoginModal(false)}
              aria-label="Tutup"
            >
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ width: "48px", height: "48px", margin: "0 auto 12px", background: "rgba(201,150,46,0.12)", border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="lock" size={22} color="var(--gold)" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", margin: "0 0 6px", color: "var(--bx-ink-bright)" }}>
                Masuk ke ANVIEO Academy
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-faint)", margin: 0 }}>
                Akses kurikulum berstandar internasional dan penilaian reviewer expert.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setShowLoginModal(false);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "6px", color: "var(--bx-ink)" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-grid)",
                    borderRadius: "4px",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "6px", color: "var(--bx-ink)" }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-grid)",
                    borderRadius: "4px",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <button
                type="submit"
                className="blackbox-pill blackbox-pill-blue"
                style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
              >
                MASUK SEKARANG →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
