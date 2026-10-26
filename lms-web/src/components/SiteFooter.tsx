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
              Dicoding Space Jl. Batik Kumeli No. 50, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung Jawa Barat 40123
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
              <li><a href="https://www.dicoding.com/about" target="_blank" rel="noopener noreferrer">Tentang Kami</a></li>
              <li><a href="https://www.dicoding.com/contact-us" target="_blank" rel="noopener noreferrer">Hubungi Kami</a></li>
              <li><a href="http://careers.dicoding.com/" target="_blank" rel="noopener noreferrer">Karier</a></li>
              <li><a href="https://www.dicoding.com/blog/" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://help.dicoding.com/" target="_blank" rel="noopener noreferrer">FAQ</a></li>
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
              <li><a href="https://www.dicoding.com/elite" target="_blank" rel="noopener noreferrer">Elite</a></li>
              <li><a href="https://www.dicoding.com/events" target="_blank" rel="noopener noreferrer">Event</a></li>
              <li><a href="https://jobs.dicoding.com/" target="_blank" rel="noopener noreferrer">Jobs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="footer-bottom">
          <div className="footer-legal-row">
            <div>
              <span>© 2026 Dicoding &amp; ANVIEO</span>{" "}
              <span style={{ margin: "0 6px", opacity: 0.5 }}>|</span>{" "}
              <span>Dicoding adalah merek milik PT Presentologics, perusahaan induk dari PT Dicoding Akademi Indonesia.</span>
            </div>
            <div className="footer-legal-links">
              <Link href="/termsofuse">Terms of Use</Link>
              <span style={{ opacity: 0.5 }}>•</span>
              <a href="https://www.dicoding.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
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
