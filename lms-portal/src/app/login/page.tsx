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
    <div className="portal-fit-screen">
      <PortalHeader currentPage="login" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame" style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <div className="portal-auth-grid">
            {/* Left Column: Showcase */}
            <AuthShowcase />

            {/* Right Column: Login Form */}
            <LoginForm />
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
