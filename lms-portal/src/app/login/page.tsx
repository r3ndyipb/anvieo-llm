import React from "react";
import PortalHeader from "@/components/PortalHeader";
import AuthShowcase from "@/components/AuthShowcase";
import LoginForm from "@/components/LoginForm";
import BlackboxRails from "@/components/BlackboxRails";

export const metadata = {
  title: "Masuk ke Portal Belajar — ANVIEO Academy",
  description: "Masuk ke akun portal belajar ANVIEO Academy untuk mengakses silabus materi, ruang review kode, dan asisten AI.",
};

export default function LoginPage() {
  return (
    <>
      <PortalHeader currentPage="login" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame">
          <div className="portal-auth-grid">
            {/* Left Column: Showcase */}
            <AuthShowcase />

            {/* Right Column: Login Form */}
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Subtle Footer Bar */}
      <footer style={{ borderTop: "1px solid var(--bx-border)", padding: "16px 0", textAlign: "center", fontSize: "0.75rem", color: "var(--bx-muted)", background: "var(--bx-surface)" }}>
        <div className="blackbox-frame">
          <span>© 2026 ANVIEO Academy · High-Trust Multidisciplinary LMS. Standar Kurikulum Global &amp; Evaluasi Praktisi.</span>
        </div>
      </footer>
    </>
  );
}
