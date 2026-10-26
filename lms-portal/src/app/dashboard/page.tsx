import React from "react";
import PortalHeader from "@/components/PortalHeader";
import PortalDashboardPreview from "@/components/PortalDashboardPreview";
import BlackboxRails from "@/components/BlackboxRails";

export const metadata = {
  title: "Dashboard Siswa — ANVIEO Academy Portal",
  description: "Dashboard pembelajaran siswa ANVIEO Academy: akses silabus berjalan, feedback reviewer kode, dan asisten AI.",
};

export default function DashboardPage() {
  return (
    <>
      <PortalHeader currentPage="dashboard" />

      <main style={{ flex: 1, position: "relative" }}>
        <BlackboxRails position="top" />
        <PortalDashboardPreview />
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
