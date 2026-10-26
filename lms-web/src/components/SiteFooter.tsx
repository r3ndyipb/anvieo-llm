"use client";

import React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="blackbox-footer-wrap">
      <div className="blackbox-rails blackbox-rails-top" aria-hidden="true">
        <div className="blackbox-rails-track"></div>
      </div>

      <div className="blackbox-frame">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Alamat */}
          <div className="footer-col">
            {/* ANVIEO ACADEMY Brand Logo & Title (Light Colors on Dark Footer) */}
            <div style={{ marginBottom: "20px" }}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }} aria-label="ANVIEO ACADEMY">
                <img
                  src="/logo-light.png"
                  alt="Anvieo Logo"
                  width={38}
                  height={38}
                  style={{
                    width: "38px",
                    height: "38px",
                    objectFit: "contain",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", lineHeight: 1 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.32rem",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: "#FFFFFF",
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
                          fontSize: "0.575rem",
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
              </Link>
            </div>

            <h5>Alamat</h5>
            <p className="footer-address">
              ANVIEO Tower, Cyber 2 Building Lt. 18, Jl. H. R. Rasuna Said Blok X-5 No. 13, Kuningan Timur, Jakarta Selatan 12950
            </p>
            <div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", background: "var(--gold)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "rgba(251, 248, 241, 0.65)", letterSpacing: "0.06em" }}>
                ANVIEO ACADEMY · HIGH-TRUST MULTIDISCIPLINARY LMS
              </span>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="footer-col">
            <h5>Company</h5>
            <ul className="footer-links">
              <li><Link href="/about">Tentang Kami</Link></li>
              <li><Link href="/contact-us">Hubungi Kami</Link></li>
              <li><Link href="/career">Karier</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Product Links */}
          <div className="footer-col">
            <h5>Product</h5>
            <ul className="footer-links">
              <li><Link href="/learningpaths/65">Learning Path</Link></li>
              <li><Link href="/subscriptions/purchases">Biaya Langganan</Link></li>
              <li><Link href="/tokens/activation">Aktivasi Token</Link></li>
              <li><Link href="/corporate-training">Corporate Training</Link></li>
              <li><Link href="/bootcamp">Accelerated Bootcamp</Link></li>
              <li><Link href="/sertifikasi">Sertifikasi &amp; Uji Kompetensi</Link></li>
              <li><Link href="/impact">Capaian &amp; Dampak</Link></li>
              <li><Link href="/hiring-partner">Hiring Partner</Link></li>
              <li><Link href="/csr">Corporate Social Relationship</Link></li>
              <li><Link href="/case-study">Case Study &amp; Rekayasa</Link></li>
              <li><Link href="/elite">Elite Guild</Link></li>
              <li><Link href="/events">Tech Event</Link></li>
              <li><Link href="/jobs">Hiring Jobs</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="footer-bottom">
          <div className="footer-legal-row">
            <div>
              <span>© 2026 ANVIEO Academy</span>{" "}
              <span style={{ margin: "0 6px", opacity: 0.5 }}>|</span>{" "}
              <span>ANVIEO Academy adalah platform edukasi rekayasa perangkat lunak milik PT ANVIEO TEKNOLOGI NUSANTARA.</span>
            </div>
            <div className="footer-legal-links">
              <Link href="/termsofuse">Terms of Use</Link>
              <span style={{ opacity: 0.5 }}>•</span>
              <Link href="/privacy">Privacy</Link>
              <span style={{ opacity: 0.5 }}>•</span>
              <Link href="/login">Masuk</Link>
              <span style={{ opacity: 0.5 }}>•</span>
              <Link href="/register">Daftar</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
