import React from "react";
import PortalHeader from "@/components/PortalHeader";
import AuthShowcase from "@/components/AuthShowcase";
import LoginForm from "@/components/LoginForm";
import BlackboxRails from "@/components/BlackboxRails";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Masuk ke Portal Belajar — ANVIEO Academy",
  description: "Masuk ke akun portal belajar ANVIEO Academy untuk mengakses silabus materi, ruang review kode, dan asisten AI.",
};

export default function LoginPage() {
  return (
    <div className="portal-page-wrap">
      <PortalHeader currentPage="login" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame">
          <div className="portal-auth-grid">
            {/* Left Column: Unboxed Editorial Showcase */}
            <AuthShowcase />

            {/* Right Column: Constrained Login Card */}
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Official LMS Web Site Footer */}
      <SiteFooter />
    </div>
  );
}
