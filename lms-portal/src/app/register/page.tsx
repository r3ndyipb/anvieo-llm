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
    <div className="portal-fit-screen">
      <PortalHeader currentPage="register" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame" style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <div className="portal-auth-grid">
            {/* Left Column: Showcase */}
            <AuthShowcase />

            {/* Right Column: Register Form */}
            <RegisterForm />
          </div>
        </div>
      </main>

      {/* Fit Height Compact Footer Bar */}
      <footer className="portal-auth-footer">
        <div className="blackbox-frame" style={{ textAlign: "center" }}>
          <span>© 2026 ANVIEO Academy · High-Trust Multidisciplinary LMS. Standar Kurikulum Global &amp; Evaluasi Praktisi.</span>
        </div>
      </footer>
    </div>
  );
}
