import React from "react";
import PortalHeader from "@/components/PortalHeader";
import AuthShowcase from "@/components/AuthShowcase";
import RegisterForm from "@/components/RegisterForm";
import BlackboxRails from "@/components/BlackboxRails";

export const metadata = {
  title: "Daftar Akun Portal Belajar — ANVIEO Academy",
  description: "Daftar akun portal belajar ANVIEO Academy untuk memulai jalur akselerasi karir teknologi, hukum bisnis, dan finansial berstandar industri.",
};

export default function RegisterPage() {
  return (
    <>
      <PortalHeader currentPage="register" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame">
          <div className="portal-auth-grid">
            {/* Left Column: Showcase */}
            <AuthShowcase />

            {/* Right Column: Register Form */}
            <RegisterForm />
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
