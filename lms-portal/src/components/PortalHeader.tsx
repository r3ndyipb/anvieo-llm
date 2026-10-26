"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import FlatIcon from "./FlatIcon";

interface PortalHeaderProps {
  currentPage?: "login" | "register" | "dashboard";
}

export default function PortalHeader({ currentPage = "login" }: PortalHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateThemeState = () => {
      const current = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
      setTheme(current || "light");
    };

    updateThemeState();
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="portal-auth-header">
      <div className="blackbox-frame">
        <div className="portal-auth-header-inner">
          {/* Brand Logo & Title */}
          <Link href="/" className="portal-auth-brand-group" aria-label="ANVIEO ACADEMY PORTAL">
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
              <span className="portal-brand-title">
                ANVIEO
              </span>
              <div className="portal-brand-subtitle" aria-hidden="true">
                {"ACADEMY".split("").map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </div>
            </div>
            <span className="portal-badge-portal">PORTAL</span>
          </Link>

          {/* Navigation Actions */}
          <div className="portal-header-actions">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="portal-back-link"
              title="Kunjungi website publik LMS"
            >
              <FlatIcon type="globe" size={14} />
              <span>Halaman Utama</span>
            </a>

            {currentPage === "login" && (
              <Link href="/register" className="portal-back-link" style={{ fontWeight: 700, color: "var(--gold)" }}>
                <span>Daftar Akun</span>
                <FlatIcon type="arrow-right" size={13} />
              </Link>
            )}

            {currentPage === "register" && (
              <Link href="/login" className="portal-back-link" style={{ fontWeight: 700, color: "var(--gold)" }}>
                <span>Masuk Portal</span>
                <FlatIcon type="arrow-right" size={13} />
              </Link>
            )}

            {currentPage === "dashboard" && (
              <Link href="/login" className="portal-back-link" style={{ color: "var(--bx-rose, #F43F5E)" }}>
                <FlatIcon type="logout" size={14} />
                <span>Keluar</span>
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
