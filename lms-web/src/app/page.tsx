"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FlatIcon from "@/components/FlatIcon";

const CobeGlobe = dynamic(() => import("@/components/CobeGlobe"), { ssr: false });

type Discipline = "all" | "tech" | "law" | "econ" | "biz";
type DifficultyLevel = "all" | "pemula" | "menengah" | "mahir";

interface CourseItem {
  id: string;
  code: string;
  discipline: Discipline;
  disciplineTag: string;
  tagClass: string;
  title: string;
  category: string;
  level: string;
  levelFilter: "pemula" | "menengah" | "mahir";
  duration: string;
  rating: number;
  students: string;
  flatIconType: string;
  bannerBg: string;
  desc: string;
  skills: string[];
  syllabus: string[];
}

// Reusable Blackbox Lines & Rails Component
function BlackboxRails({ position = "bottom" }: { position?: "bottom" | "top" | "both" }) {
  return (
    <div className="blackbox-rails blackbox-rail" aria-hidden="true">
      <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: "var(--bx-frame)" }}>
        <span className="blackbox-rail-hatch" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "var(--bx-gutter)" }} />
        <span className="blackbox-rail-hatch" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "var(--bx-gutter)" }} />
        <span className="blackbox-rail-v" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px" }} />
        <span className="blackbox-rail-v" style={{ position: "absolute", left: "var(--bx-gutter)", top: 0, bottom: 0, width: "1px" }} />
        <span className="blackbox-rail-v" style={{ position: "absolute", right: "var(--bx-gutter)", top: 0, bottom: 0, width: "1px" }} />
        <span className="blackbox-rail-v" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "1px" }} />
      </div>
      {(position === "bottom" || position === "both") && (
        <span className="blackbox-rail-h" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "1px" }} />
      )}
      {(position === "top" || position === "both") && (
        <span className="blackbox-rail-h" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "1px" }} />
      )}
      <span style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
        <span style={{ position: "relative", width: "100%", maxWidth: "var(--bx-frame)" }}>
          {(position === "bottom" || position === "both") && (
            <>
              <span className="blackbox-rail-cross" style={{ position: "absolute", bottom: 0, left: 0 }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", bottom: 0, left: "var(--bx-gutter)" }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", bottom: 0, right: "var(--bx-gutter)" }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", bottom: 0, right: 0 }} />
            </>
          )}
          {(position === "top" || position === "both") && (
            <>
              <span className="blackbox-rail-cross" style={{ position: "absolute", top: 0, left: 0 }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", top: 0, left: "var(--bx-gutter)" }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", top: 0, right: "var(--bx-gutter)" }} />
              <span className="blackbox-rail-cross" style={{ position: "absolute", top: 0, right: 0 }} />
            </>
          )}
        </span>
      </span>
    </div>
  );
}

// Reusable Blackbox Pixel-Art SVG Arrow
function PixelArrow({ color = "currentColor", size = 12 }: { color?: string; size?: number }) {
  return (
    <svg className="blackbox-px" width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }} aria-hidden="true">
      <path d="M3 0H16V12H12V4H3V0Z" fill={color}></path>
      <path d="M8.00005 8L8 4H12V8H8.00005Z" fill={color}></path>
      <path d="M4.00005 12L4 8H8.00005L8 12H4.00005Z" fill={color}></path>
      <path d="M0 16V12H4.00005L4 16H0Z" fill={color}></path>
    </svg>
  );
}


const MULTIDISCIPLINE_COURSES: CourseItem[] = [
  // ==================== 1. TEKNOLOGI & IT (5 KELAS) ====================
  {
    id: "tech-backend",
    code: "ANV-CS-101",
    discipline: "tech",
    disciplineTag: "Teknologi & IT",
    tagClass: "tag-tech",
    title: "Back-End Developer Specialist",
    category: "Python, FastAPI & PostgreSQL Architecture",
    level: "Pemula ➔ Mahir",
    levelFilter: "pemula",
    duration: "140 Jam Belajar",
    rating: 4.9,
    students: "14.2k",
    flatIconType: "backend",
    bannerBg: "linear-gradient(135deg, #1E3A8A, #0F172A)",
    desc: "Kuasai perancangan sistem backend skala tinggi dengan Python FastAPI, basis data relasional PostgreSQL dengan pgvector, Redis caching, microservices, dan automated testing CI/CD.",
    skills: ["Python 3.12+", "FastAPI Framework", "PostgreSQL & pgvector", "Docker Container", "Redis Caching", "CI/CD Pipeline"],
    syllabus: [
      "Modul 1: Fondasi Pemrograman Asinkron & Python Modern",
      "Modul 2: Arsitektur RESTful API & Middleware FastAPI",
      "Modul 3: Pemodelan Relasional PostgreSQL & Indeks Vektor HNSW",
      "Modul 4: Autentikasi JWT, RBAC & Keamanan API OWASP",
      "Modul 5: Proyek Akhir: Microservice Berkinerja Tinggi Terverifikasi"
    ]
  },
  {
    id: "tech-ai",
    code: "ANV-CS-102",
    discipline: "tech",
    disciplineTag: "Teknologi & IT",
    tagClass: "tag-tech",
    title: "Applied AI & Machine Learning Specialist",
    category: "LLM, RAG & Vector Intelligence",
    level: "Menengah ➔ Mahir",
    levelFilter: "menengah",
    duration: "160 Jam Belajar",
    rating: 4.9,
    students: "9.8k",
    flatIconType: "ai",
    bannerBg: "linear-gradient(135deg, #0284C7, #082F49)",
    desc: "Pelajari pembangunan aplikasi berbasis LLM generasi mutakhir, Retrieval-Augmented Generation (RAG), embeddings vektor semantik, fine-tuning model, dan orkestrasi agen cerdas mandiri.",
    skills: ["Generative AI & LLMs", "RAG with pgvector", "LangChain & Agents", "Vector Embeddings", "AI Ethics & Safety", "Model Deployment"],
    syllabus: [
      "Modul 1: Arsitektur Transformer & Fondasi LLM",
      "Modul 2: Semantic Search & Vector Databases (HNSW)",
      "Modul 3: Retrieval-Augmented Generation (RAG) Production",
      "Modul 4: Evaluasi Akurasi, Halusinasi & Guardrails",
      "Modul 5: Proyek Akhir: Multi-Agent Autonomous Assistant"
    ]
  },
  {
    id: "tech-cloud",
    code: "ANV-CS-103",
    discipline: "tech",
    disciplineTag: "Teknologi & IT",
    tagClass: "tag-tech",
    title: "Cloud Native & DevOps Engineering",
    category: "Kubernetes, Terraform & GitOps",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "130 Jam Belajar",
    rating: 4.8,
    students: "7.1k",
    flatIconType: "cloud",
    bannerBg: "linear-gradient(135deg, #0369A1, #0C4A6E)",
    desc: "Automasi infrastruktur komputasi awan modern dengan Infrastructure-as-Code (Terraform), orkestrasi kontainer Kubernetes (K8s), observabilitas sistem (Prometheus/Grafana), dan pipeline GitOps.",
    skills: ["Kubernetes (K8s)", "Terraform IaC", "Prometheus & Grafana", "GitOps ArgoCD", "AWS & GCP Cloud", "Zero-Downtime Deploy"],
    syllabus: [
      "Modul 1: Kontainerisasi Skala Produksi dengan Docker",
      "Modul 2: Kubernetes Cluster Architecture & Pod Lifecycle",
      "Modul 3: Infrastructure-as-Code dengan Terraform",
      "Modul 4: Logging, Tracing & APM Telemetry",
      "Modul 5: Proyek Akhir: Multi-Zone Kubernetes Auto-Healing"
    ]
  },
  {
    id: "tech-fullstack",
    code: "ANV-CS-104",
    discipline: "tech",
    disciplineTag: "Teknologi & IT",
    tagClass: "tag-tech",
    title: "Full-Stack Next.js & React Architect",
    category: "TypeScript, SSR & Microfrontends",
    level: "Pemula ➔ Mahir",
    levelFilter: "menengah",
    duration: "135 Jam Belajar",
    rating: 4.9,
    students: "11.4k",
    flatIconType: "backend",
    bannerBg: "linear-gradient(135deg, #1D4ED8, #0B1934)",
    desc: "Bangun aplikasi web modern skalabel enterprise dengan Next.js App Router, Server Actions, TypeScript type safety, optimasi Core Web Vitals, dan integrasi API asinkron berkecepatan sub-detik.",
    skills: ["Next.js 16 App Router", "TypeScript 5+", "Tailwind & Pure CSS", "Server Actions & SSR", "State Machine & Zustand", "Core Web Vitals"],
    syllabus: [
      "Modul 1: Arsitektur Modern React Server Components (RSC)",
      "Modul 2: State Management & Optimistic UI Updates",
      "Modul 3: Server Actions, Data Mutation & Cache Revalidation",
      "Modul 4: Autentikasi Sesi & Proteksi Rute Middleware",
      "Modul 5: Proyek Akhir: Platform SaaS Enterprise Interaktif"
    ]
  },
  {
    id: "tech-security",
    code: "ANV-CS-105",
    discipline: "tech",
    disciplineTag: "Teknologi & IT",
    tagClass: "tag-tech",
    title: "Cybersecurity & Ethical Defense Specialist",
    category: "OWASP API, Pentesting & Threat Defense",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "125 Jam Belajar",
    rating: 4.8,
    students: "6.8k",
    flatIconType: "cloud",
    bannerBg: "linear-gradient(135deg, #0F766E, #042F2E)",
    desc: "Praktik pertahanan siber mendalam meliputi audit kerentanan OWASP API Security Top 10, penetration testing, isolasi zero-trust network, enkripsi data in-transit/at-rest, dan incident response.",
    skills: ["OWASP API Security Top 10", "Network Penetration Testing", "Zero-Trust Architecture", "Kriptografi & TLS 1.3", "SIEM & Log Forensics", "Incident Response"],
    syllabus: [
      "Modul 1: Metodologi Penetration Testing & Reconnaissance",
      "Modul 2: Eksploitasi & Remedi API Vulnerabilities (BOLA, BFLA)",
      "Modul 3: Kriptografi Terapan & Manajemen Rahasia HashiCorp Vault",
      "Modul 4: Deteksi Serangan Realtime & Analisis Log SIEM",
      "Modul 5: Proyek Akhir: Red Team vs Blue Team Enterprise Simulation"
    ]
  },

  // ==================== 2. HUKUM & LEGAL REGULASI (5 KELAS) ====================
  {
    id: "law-cyber",
    code: "ANV-LAW-201",
    discipline: "law",
    disciplineTag: "Hukum & Legal",
    tagClass: "tag-law",
    title: "Hukum Siber, PDP & Kontrak Digital",
    category: "Regulasi Privasi & Hukum Transaksi Elektronik",
    level: "Pemula ➔ Mahir",
    levelFilter: "pemula",
    duration: "110 Jam Belajar",
    rating: 4.9,
    students: "6.4k",
    flatIconType: "cyberlaw",
    bannerBg: "linear-gradient(135deg, #4F46E5, #1E1B4B)",
    desc: "Pelajari implementasi kepatuhan UU PDP No. 27/2022, perancangan kontrak lisensi software (SLA, MSA, SPK), mitigasi risiko kebocoran data, dan penyelesaian sengketa transaksi elektronik (UU ITE).",
    skills: ["UU PDP No. 27/2022 Compliance", "Software IP & Lisensi", "Drafting Kontrak SPK/MSA", "Audit Kepatuhan Privasi", "Hukum Bukti Elektronik", "Mitigasi Risiko Regulasi"],
    syllabus: [
      "Modul 1: Anatomi Hukum Siber & UU ITE Indonesia",
      "Modul 2: Implementasi Standar Perlindungan Data Pribadi (UU PDP)",
      "Modul 3: Teknik Drafting Kontrak TI (MSA, SLA, NDA & SPK)",
      "Modul 4: Legal Forensik & Pembuktian Sengketa Digital",
      "Modul 5: Proyek Akhir: Dokumen Audit Kepatuhan & Perjanjian Novasi"
    ]
  },
  {
    id: "law-corporate",
    code: "ANV-LAW-202",
    discipline: "law",
    disciplineTag: "Hukum & Legal",
    tagClass: "tag-law",
    title: "Corporate Legal & Hak Kekayaan Intelektual",
    category: "Tata Kelola Korporasi & Perlindungan Aset",
    level: "Menengah ➔ Mahir",
    levelFilter: "menengah",
    duration: "95 Jam Belajar",
    rating: 4.8,
    students: "4.7k",
    flatIconType: "corplaw",
    bannerBg: "linear-gradient(135deg, #4338CA, #1E1B4B)",
    desc: "Kuasai tata kelola korporasi modern (GCG), pendaftaran dan perlindungan Hak Cipta Perangkat Lunak, hak paten teknologi, rahasia dagang, serta klausul penanganan novasi kontrak komersial.",
    skills: ["Good Corporate Governance", "Hak Cipta Software & Kode", "Non-Disclosure Agreements", "M&A Legal Due Diligence", "Perjanjian Kerjasama B2B", "Penyelesaian Sengketa"],
    syllabus: [
      "Modul 1: Struktur Korporasi Modern & Tanggung Jawab Direksi",
      "Modul 2: Rezim Hak Cipta UU No. 28/2014 untuk Karya Digital",
      "Modul 3: Strategi Lisensi Paten & Klausul Perlindungan Escrow",
      "Modul 4: Mekanisme Somasi Wanprestasi (Pasal 1243 KUHPerdata)",
      "Modul 5: Proyek Akhir: Dossier Due Diligence Akuisisi Startup"
    ]
  },
  {
    id: "law-ai-ethics",
    code: "ANV-LAW-203",
    discipline: "law",
    disciplineTag: "Hukum & Legal",
    tagClass: "tag-law",
    title: "Regulasi AI, Etika Algoritma & Compliance",
    category: "Tata Kelola AI & Standar Internasional",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "90 Jam Belajar",
    rating: 4.8,
    students: "3.9k",
    flatIconType: "aigov",
    bannerBg: "linear-gradient(135deg, #3730A3, #172554)",
    desc: "Kupas tuntas lanskap regulasi kecerdasan buatan global (EU AI Act, NIST Framework) dan pedoman Surat Edaran Kominfo tentang Etika Kecerdasan Artifisial bagi industri.",
    skills: ["EU AI Act Alignment", "SE Menkominfo No. 9/2023", "Algorithmic Bias Audit", "Liability & AI Copyright", "Model Risk Management", "Cross-Border Data Transfer"],
    syllabus: [
      "Modul 1: Klasifikasi Risiko AI: Minimal, Terbatas, hingga Tinggi",
      "Modul 2: Tanggung Gugat Hukum Output Generatif (Copyright & Defamation)",
      "Modul 3: Audit Bias & Transparansi Algoritmik",
      "Modul 4: Kerangka Tata Kelola AI Korporasi",
      "Modul 5: Proyek Akhir: Kebijakan Tata Kelola AI Perusahaan"
    ]
  },
  {
    id: "law-fintech",
    code: "ANV-LAW-204",
    discipline: "law",
    disciplineTag: "Hukum & Legal",
    tagClass: "tag-law",
    title: "Hukum FinTech & Perbankan Digital",
    category: "Regulasi OJK, BI & AML/CFT Compliance",
    level: "Pemula ➔ Menengah",
    levelFilter: "menengah",
    duration: "105 Jam Belajar",
    rating: 4.8,
    students: "5.2k",
    flatIconType: "cyberlaw",
    bannerBg: "linear-gradient(135deg, #312E81, #1E1B4B)",
    desc: "Kajian komprehensif regulasi Otoritas Jasa Keuangan (OJK) dan Bank Indonesia terkait sistem pembayaran digital, lisensi P2P lending, kepatuhan Anti-Pencucian Uang (APU-PPT), dan open banking API.",
    skills: ["Regulasi POJK FinTech", "Ketentuan BI Open API Payment", "AML/CFT & KYC Compliance", "Perlindungan Konsumen FinTech", "Mitigasi Risiko Gagal Bayar"],
    syllabus: [
      "Modul 1: Kerangka Hukum Perizinan FinTech & Sandbox OJK",
      "Modul 2: Standar SNAP (Standar Nasional Open API Pembayaran) BI",
      "Modul 3: Kepatuhan APU-PPT & Verifikasi Nasabah Elektronik (e-KYC)",
      "Modul 4: Penyelesaian Sengketa Konsumen Lembaga Keuangan",
      "Modul 5: Proyek Akhir: Legal Opinion Kepatuhan Peluncuran FinTech"
    ]
  },
  {
    id: "law-ma",
    code: "ANV-LAW-205",
    discipline: "law",
    disciplineTag: "Hukum & Legal",
    tagClass: "tag-law",
    title: "Legal Due Diligence & M&A Transaction",
    category: "Audit Akuisisi, Novasi & Sengketa Komersial",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "100 Jam Belajar",
    rating: 4.9,
    students: "4.1k",
    flatIconType: "corplaw",
    bannerBg: "linear-gradient(135deg, #2E1065, #0F172A)",
    desc: "Kuasai prosedur audit hukum uji tuntas (Legal Due Diligence) untuk merger & akuisisi perusahaan teknologi, penyusunan novasi kontrak Pasal 1413 KUHPerdata, serta mitigasi risiko wanprestasi.",
    skills: ["Legal Due Diligence Reporting", "Share Purchase Agreement (SPA)", "Novasi Kontrak Komersial", "Audit Kepatuhan Ketenagakerjaan", "Arbitrase BANI & Litigasi"],
    syllabus: [
      "Modul 1: Metodologi Uji Tuntas Hukum Aspek Korporasi & Aset",
      "Modul 2: Analisis Risiko Kontrak Pihak Ketiga & Klausul Change of Control",
      "Modul 3: Drafting Share Purchase Agreement & Shareholders Agreement",
      "Modul 4: Mekanisme Novasi & Pengalihan Hak Kekayaan Intelektual",
      "Modul 5: Proyek Akhir: Comprehensive Legal Due Diligence Report"
    ]
  },

  // ==================== 3. EKONOMI & KEUANGAN (5 KELAS) ====================
  {
    id: "econ-valuation",
    code: "ANV-FIN-301",
    discipline: "econ",
    disciplineTag: "Ekonomi & Keuangan",
    tagClass: "tag-econ",
    title: "Financial Modeling & Valuasi Korporasi",
    category: "Corporate Finance & Investasi",
    level: "Menengah ➔ Mahir",
    levelFilter: "menengah",
    duration: "120 Jam Belajar",
    rating: 4.9,
    students: "8.1k",
    flatIconType: "valuation",
    bannerBg: "linear-gradient(135deg, #059669, #064E3B)",
    desc: "Kuasai teknik pemodelan keuangan dinamis (DCF, Multiples, LBO), analisis arus kas terdiskon, proyeksi neraca, evaluasi kelayakan investasi merger/akuisisi, dan analisis sensitivitas sensitif.",
    skills: ["DCF Financial Modeling", "Sensitivitas & Scenario Analysis", "Corporate Valuation", "Laporan Keuangan 3-Statement", "Penganggaran Modal (Capex)", "Analisis Rasio Kinerja"],
    syllabus: [
      "Modul 1: Fondasi Analisis Laporan Keuangan 3-Statement",
      "Modul 2: Proyeksi Pendapatan & Model Biaya Operasional",
      "Modul 3: Valuasi Discounted Cash Flow (DCF) & WACC",
      "Modul 4: Valuasi Relatif (Trading & Transaction Multiples)",
      "Modul 5: Proyek Akhir: Model Valuasi Perusahaan Publik IDX"
    ]
  },
  {
    id: "econ-fintech",
    code: "ANV-FIN-302",
    discipline: "econ",
    disciplineTag: "Ekonomi & Keuangan",
    tagClass: "tag-econ",
    title: "FinTech & Analisis Pasar Modal Digital",
    category: "Pasar Keuangan & Digital Assets",
    level: "Pemula ➔ Menengah",
    levelFilter: "pemula",
    duration: "105 Jam Belajar",
    rating: 4.8,
    students: "7.3k",
    flatIconType: "fintech",
    bannerBg: "linear-gradient(135deg, #0D9488, #134E4A)",
    desc: "Memahami ekosistem financial technology (payment gateway, peer-to-peer lending), regulasi OJK & Bank Indonesia, serta analisis teknikal, bandarmology, dan fundamental pasar saham modern.",
    skills: ["Regulasi OJK & BI", "Struktur Payment Gateway", "Analisis Saham & Pasar Modal", "Manajemen Risiko Portofolio", "Inovasi Perbankan Digital", "Credit Scoring Berbasis AI"],
    syllabus: [
      "Modul 1: Lanskap Regulasi FinTech & Open Finance OJK/BI",
      "Modul 2: Arsitektur Payment Gateway & Transaksi Kliring",
      "Modul 3: Analisis Fundamental & Foreign Flow Pasar Modal",
      "Modul 4: AI-Driven Credit Scoring & Risk Scoring",
      "Modul 5: Proyek Akhir: Rancangan Produk FinTech & Analisis Saham"
    ]
  },
  {
    id: "econ-quant",
    code: "ANV-FIN-303",
    discipline: "econ",
    disciplineTag: "Ekonomi & Keuangan",
    tagClass: "tag-econ",
    title: "Quantitative Trading & Bandarmology Analytics",
    category: "Algorithmic Trading & Foreign Flow",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "115 Jam Belajar",
    rating: 4.9,
    students: "6.5k",
    flatIconType: "valuation",
    bannerBg: "linear-gradient(135deg, #047857, #064E3B)",
    desc: "Analisis pergerakan modal bandar (Broker Summary analysis), deteksi akumulasi asing (Foreign Flow), backtesting algoritma trading dengan Python, dan manajemen eksposur risiko portofolio saham.",
    skills: ["Broker Summary Analysis", "Foreign Flow Accumulation", "Backtesting Algoritmik", "Risk-Reward Optimization", "Market Microstructure"],
    syllabus: [
      "Modul 1: Struktur Pasar Modal & Analisis Transaksi Asing",
      "Modul 2: Pembacaan Pola Akumulasi & Distribusi Broker",
      "Modul 3: Pemrograman Algoritma Backtesting Saham",
      "Modul 4: Risk Parity & Pengukuran Volatilitas Portofolio",
      "Modul 5: Proyek Akhir: Sistem Deteksi Aliran Dana Saham Otomatis"
    ]
  },
  {
    id: "econ-ib",
    code: "ANV-FIN-304",
    discipline: "econ",
    disciplineTag: "Ekonomi & Keuangan",
    tagClass: "tag-econ",
    title: "Investment Banking & Private Equity Strategy",
    category: "LBO, M&A Structure & IPO",
    level: "Menengah ➔ Mahir",
    levelFilter: "menengah",
    duration: "125 Jam Belajar",
    rating: 4.8,
    students: "4.9k",
    flatIconType: "fintech",
    bannerBg: "linear-gradient(135deg, #0F766E, #115E59)",
    desc: "Pelajari siklus hidup pendanaan ekuitas, pemodelan Leveraged Buyout (LBO), restrukturisasi utang korporasi, serta persiapan Initial Public Offering (IPO) di Bursa Efek Indonesia.",
    skills: ["LBO Model Architecture", "M&A Synergies Valuation", "IPO Readiness Checklist", "Debt Restructuring", "Pitchbook Creation"],
    syllabus: [
      "Modul 1: Struktur Transaksi Investment Banking & Deal Origination",
      "Modul 2: Pemodelan Keuangan LBO (Leveraged Buyout)",
      "Modul 3: Penilaian Sinergi Merger & Analisis EPS Accretion/Dilution",
      "Modul 4: Prosedur IPO & Penjaminan Emisi Efek (Underwriting)",
      "Modul 5: Proyek Akhir: Investment Committee M&A Pitchbook"
    ]
  },
  {
    id: "econ-audit",
    code: "ANV-FIN-305",
    discipline: "econ",
    disciplineTag: "Ekonomi & Keuangan",
    tagClass: "tag-econ",
    title: "Audit Forensik & Akuntansi Investigasi",
    category: "Fraud Detection & Rekonsiliasi Korporasi",
    level: "Pemula ➔ Mahir",
    levelFilter: "pemula",
    duration: "110 Jam Belajar",
    rating: 4.8,
    students: "5.6k",
    flatIconType: "valuation",
    bannerBg: "linear-gradient(135deg, #115E59, #042F2E)",
    desc: "Keahlian forensik keuangan untuk mendeteksi manipulasi laporan laba rugi, tracing aliran dana tersembunyi, perhitungan kerugian finansial sengketa, dan kepatuhan Standar Akuntansi Keuangan (PSAK).",
    skills: ["Forensic Data Tracing", "Fraud Triangle Assessment", "PSAK & IFRS Reconciliation", "Litigation Financial Damage", "Investigative Interviewing"],
    syllabus: [
      "Modul 1: Indikator Red Flags & Manipulasi Neraca Keuangan",
      "Modul 2: Teknik Tracing Rekening Koran & Rekonsiliasi Cash Flow",
      "Modul 3: Perhitungan Nilai Kerugian Riil Wanprestasi Kontrak",
      "Modul 4: Kepatuhan Standar Akuntansi Forensik Internasional",
      "Modul 5: Proyek Akhir: Laporan Audit Investigasi Keuangan Komersial"
    ]
  },

  // ==================== 4. BISNIS & MANAJEMEN (5 KELAS) ====================
  {
    id: "biz-pm",
    code: "ANV-MGT-401",
    discipline: "biz",
    disciplineTag: "Bisnis & Manajemen",
    tagClass: "tag-biz",
    title: "Digital Product Management Specialist",
    category: "Product Discovery, Delivery & Metriks",
    level: "Pemula ➔ Mahir",
    levelFilter: "pemula",
    duration: "115 Jam Belajar",
    rating: 4.9,
    students: "11.6k",
    flatIconType: "product",
    bannerBg: "linear-gradient(135deg, #D97706, #78350F)",
    desc: "Pelajari manajemen siklus hidup produk digital dari riset pengguna, penentuan PRD/BRD, prioritisasi roadmap fitur, kerangka kerja Agile Scrum, hingga monetisasi dan metriks retensi.",
    skills: ["Product Strategy & Vision", "User Research & PRD Drafting", "Agile & Scrum Leadership", "A/B Testing & Analitik", "Unit Economics & Pricing", "Stakeholder Alignment"],
    syllabus: [
      "Modul 1: Product Discovery & Validasi Masalah Konsumen",
      "Modul 2: Penulisan PRD (Product Requirements Document) Profesional",
      "Modul 3: Eksekusi Agile Scrum, Backlog & Prioritisasi RICE",
      "Modul 4: Product Analytics: Funnel, Retention & Unit Economics",
      "Modul 5: Proyek Akhir: Peluncuran Produk & Go-to-Market Strategy"
    ]
  },
  {
    id: "biz-strategy",
    code: "ANV-MGT-402",
    discipline: "biz",
    disciplineTag: "Bisnis & Manajemen",
    tagClass: "tag-biz",
    title: "Strategic Business & Inovasi Korporasi",
    category: "Skalabilitas Bisnis & Transformasi Digital",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "100 Jam Belajar",
    rating: 4.8,
    students: "5.8k",
    flatIconType: "strategy",
    bannerBg: "linear-gradient(135deg, #EA580C, #7C2D12)",
    desc: "Rancang strategi ekspansi pasar, analisis keunggulan kompetitif, pengembangan saluran kemitraan B2B enterprise, dan transformasi digital organisasi untuk memenangkan persaingan.",
    skills: ["Competitive Landscape Mapping", "Business Model Canvas", "Strategi Penjualan B2B", "Operational Efficiency", "Change Management", "Inovasi Model Bisnis"],
    syllabus: [
      "Modul 1: Analisis Dinamika Industri & Competitive Advantage",
      "Modul 2: Desain Model Bisnis Berkelanjutan (Platform vs Pipeline)",
      "Modul 3: Enterprise Sales Cycle & Kemitraan Strategis",
      "Modul 4: Digital Transformation & Manajemen Perubahan",
      "Modul 5: Proyek Akhir: Rencana Transformasi Bisnis Korporasi"
    ]
  },
  {
    id: "biz-growth",
    code: "ANV-MGT-403",
    discipline: "biz",
    disciplineTag: "Bisnis & Manajemen",
    tagClass: "tag-biz",
    title: "Growth Product & Retention Strategy",
    category: "Product-Led Growth, CAC/LTV & Retensi",
    level: "Menengah ➔ Mahir",
    levelFilter: "menengah",
    duration: "110 Jam Belajar",
    rating: 4.9,
    students: "7.4k",
    flatIconType: "product",
    bannerBg: "linear-gradient(135deg, #C2410C, #7C2D12)",
    desc: "Kuasai arsitektur Product-Led Growth (PLG), optimalisasi siklus adopsi pengguna, eksperimen A/B testing skala masif, serta kalkulasi rasio CAC:LTV untuk pertumbuhan bisnis eksponensial.",
    skills: ["Product-Led Growth (PLG)", "Cohort Retention Analysis", "A/B Testing Rigor", "CAC & LTV Optimization", "Viral Loop Mechanics"],
    syllabus: [
      "Modul 1: Kerangka Kerja Pertumbuhan & Metrik North Star",
      "Modul 2: Onboarding Flow & Penurunan Time-to-Value (TTV)",
      "Modul 3: Analisis Kohort Retensi & Churn Reduction",
      "Modul 4: Eksperimen A/B Testing & Signifikansi Statistik",
      "Modul 5: Proyek Akhir: Blue-Print Growth Engine Perusahaan SaaS"
    ]
  },
  {
    id: "biz-operations",
    code: "ANV-MGT-404",
    discipline: "biz",
    disciplineTag: "Bisnis & Manajemen",
    tagClass: "tag-biz",
    title: "Operasi Skala Masif & Digital Supply Chain",
    category: "Lean Architecture & Otomasi ERP",
    level: "Pemula ➔ Menengah",
    levelFilter: "pemula",
    duration: "95 Jam Belajar",
    rating: 4.8,
    students: "4.3k",
    flatIconType: "strategy",
    bannerBg: "linear-gradient(135deg, #B45309, #451A03)",
    desc: "Desain sistem rantai pasok modern, implementasi metodologi Lean Operations, integrasi sistem Enterprise Resource Planning (ERP), dan mitigasi bottleneck operasional korporasi.",
    skills: ["Lean Operations Methodology", "Supply Chain Visibility", "ERP Integration Systems", "Vendor & SLA Governance", "Process Automation"],
    syllabus: [
      "Modul 1: Prinsip Lean Architecture & Eliminasi Pemborosan",
      "Modul 2: Desain Alur Kerja Operasional & Penjadwalan Kerja",
      "Modul 3: Arsitektur Modul ERP (Inventory, Order, Billing)",
      "Modul 4: Tata Kelola SLA Vendor & Manajemen Risiko Pasokan",
      "Modul 5: Proyek Akhir: Rancang Ulang Sistem Operasi Logistik Digital"
    ]
  },
  {
    id: "biz-leadership",
    code: "ANV-MGT-405",
    discipline: "biz",
    disciplineTag: "Bisnis & Manajemen",
    tagClass: "tag-biz",
    title: "Executive Tech Leadership & People Ops",
    category: "Engineering Scaling & Agile Governance",
    level: "Menengah ➔ Mahir",
    levelFilter: "mahir",
    duration: "90 Jam Belajar",
    rating: 4.8,
    students: "5.1k",
    flatIconType: "product",
    bannerBg: "linear-gradient(135deg, #9A3412, #451A03)",
    desc: "Kembangkan kepemimpinan teknologi eksekutif: perancangan matriks kompetensi engineer, orkestrasi Objectives and Key Results (OKR), resolusi konflik lintas divisi, dan kultur teknik kelas dunia.",
    skills: ["Engineering Org Scaling", "OKR Framework Mastery", "Cross-Functional Governance", "Talent Retention Strategy", "Executive Stakeholder Management"],
    syllabus: [
      "Modul 1: Perancangan Struktur Tim Engineering (Squad vs Guild)",
      "Modul 2: Implementasi OKR yang Terukur & Selaras Target Finansial",
      "Modul 3: Manajemen Kinerja & Jalur Karir Technical vs Managerial",
      "Modul 4: Negosiasi & Komunikasi Efektif dengan Direksi C-Level",
      "Modul 5: Proyek Akhir: Dokumen Rencana Pertumbuhan Tim Teknologi 3 Tahun"
    ]
  }
];

export interface AlumniStory {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  discipline: string;
  accentColor: string;
  accentBg: string;
  story: string;
  metric: string;
}

const ALUMNI_STORIES: AlumniStory[] = [
  {
    id: "alumni-1",
    name: "Rizky Pratama, S.Kom.",
    role: "Senior Backend & AI Architect",
    company: "FinTech Unicorn Jakarta",
    avatar: "/alumni/alumni_1.jpg",
    discipline: "Teknologi & AI",
    accentColor: "#10B981", // Emerald
    accentBg: "rgba(16, 185, 129, 0.12)",
    story: "Review kode dari senior reviewer sangat teliti hingga ke level alokasi memori pgvector dan arsitektur async. Dalam 3 bulan, saya berhasil naik dari Mid-level ke Tech Lead dengan kenaikan kompensasi 2.8x.",
    metric: "Promosi Tech Lead • +180% Gaji"
  },
  {
    id: "alumni-2",
    name: "Annisa Larasati, S.H., LL.M.",
    role: "VP Data Privacy & Cyber Law",
    company: "Tier-1 Law Firm & Tech Advisory",
    avatar: "/alumni/alumni_2.jpg",
    discipline: "Hukum & PDP",
    accentColor: "#F59E0B", // Amber Gold
    accentBg: "rgba(245, 158, 11, 0.12)",
    story: "Laboratorium simulasi audit kepatuhan UU PDP dan drafting MSA internasional di Anvieo memberikan portofolio nyata yang langsung meyakinkan partner firma hukum saat proses seleksi.",
    metric: "Legal Counsel • 4 Proyek Multi-Billion"
  },
  {
    id: "alumni-3",
    name: "Nadia Amanda, B.Sc.",
    role: "Principal Product Manager",
    company: "Regional SuperApp SEA",
    avatar: "/alumni/alumni_3.jpg",
    discipline: "Produk & Bisnis",
    accentColor: "#A855F7", // Purple
    accentBg: "rgba(168, 85, 247, 0.12)",
    story: "Pendekatan berbasis data dan metrik unit economics yang diajarkan membuat PRD saya diakui tim eksekutif. Saya memimpin peluncuran fitur lintas 3 negara dalam kuartal pertama kerja.",
    metric: "Lead 14 Engineers • 3 Country Launch"
  },
  {
    id: "alumni-4",
    name: "Fadhil Ramadhan, S.E., CFA",
    role: "Quantitative Valuation Analyst",
    company: "Global Investment Bank",
    avatar: "/alumni/alumni_4.jpg",
    discipline: "Ekonomi & Valuasi",
    accentColor: "#06B6D4", // Cyan
    accentBg: "rgba(6, 182, 212, 0.12)",
    story: "Modul Dynamic Financial Modeling 3-Statement dan Monte Carlo valuation sangat aplikatif untuk valuasi M&A riil. SLA review di bawah 12 jam membantu saya menyelesaikan studi kasus kompleks.",
    metric: "M&A Analyst • US$ 120M Deal Advisory"
  },
  {
    id: "alumni-5",
    name: "Dimas Wicaksono",
    role: "Cloud Platform & SRE Lead",
    company: "Cloud Enterprise Solutions",
    avatar: "/alumni/alumni_5.jpg",
    discipline: "Cloud & DevOps",
    accentColor: "#F43F5E", // Rose
    accentBg: "rgba(244, 63, 94, 0.12)",
    story: "Praktik hands-on Kubernetes multi-region dan disaster recovery dengan zero-downtime SLA membuat sertifikasi CKA dan wawancara teknis tingkat internasional terasa sangat mudah.",
    metric: "SRE Specialist • 99.99% Uptime Track"
  },
  {
    id: "alumni-6",
    name: "Dr. Sherly Veronica",
    role: "Chief AI Governance Specialist",
    company: "National AI Ethics Consortium",
    avatar: "/alumni/alumni_6.jpg",
    discipline: "AI & Etika Digital",
    accentColor: "#18181B", // Obsidian Black
    accentBg: "rgba(24, 24, 27, 0.12)",
    story: "Integrasi multidisiplin antara machine learning dan regulasi hukum teknologi di Anvieo adalah kurikulum paling holistik di Indonesia. Sangat relevan untuk kebutuhan regulator saat ini.",
    metric: "Advisor Regulasi • 12 Paper Ilmiah"
  }
];

export interface VerifiedImpactItem {
  id: string;
  initials: string;
  name: string;
  role: string;
  company: string;
  course: string;
  quote: string;
  accentColor: string;
  accentBg: string;
  image: string;
  headline: string;
  previousRole: string;
  salaryJump: string;
  timeToHired: string;
  graduationYear: string;
  credentialId: string;
  gridSpan: "tall" | "wide" | "compact";
  keySkills: string[];
  capstoneProject: {
    title: string;
    desc: string;
    techStack: string[];
  };
  inspirationalStory: {
    lead: string;
    background: string;
    turningPoint: string;
    reviewerSLAExperience: string;
    careerBreakthrough: string;
    quoteBanner: string;
  };
}

export const VERIFIED_ALUMNI_IMPACT: VerifiedImpactItem[] = [
  {
    id: "impact-1",
    initials: "FA",
    name: "Fajar Ardiansyah",
    role: "Senior Backend Engineer",
    company: "Unicorn FinTech",
    course: "BACK-END SPECIALIST",
    accentColor: "#3B82F6",
    accentBg: "rgba(59, 130, 246, 0.15)",
    image: "/alumni/alumni_1.jpg",
    headline: "Menembus Arsitektur Skala Tinggi: Dari Staff Non-IT Menjadi Core Engine Developer FinTech",
    previousRole: "Customer Support Operasional",
    salaryJump: "+180% Kenaikan Kompensasi",
    timeToHired: "45 Hari Pasca Lulus",
    graduationYear: "Alumni 2025",
    credentialId: "ANV-CERT-2026-FA882",
    gridSpan: "tall",
    keySkills: ["Python FastAPI", "PostgreSQL pgvector", "Kafka Streams", "Redis Cluster", "Docker & K8s"],
    quote: "SLA reviewer di Anvieo luar biasa disiplin. Setiap kode submission ditinjau hingga ke tingkat arsitektur dan efisiensi memori, bukan sekadar jalan. Ini alasan utama saya lolos tes teknis backend di unicorn impian.",
    capstoneProject: {
      title: "Distributed Transaction Ledger & Realtime Semantic Fraud Engine",
      desc: "Arsitektur ledger terdistribusi dengan kapasitas 50.000 TPS berbasis async connection pooling, idempotency token, dan penelusuran anomali transaksi menggunakan pgvector HNSW.",
      techStack: ["FastAPI", "PostgreSQL 16", "pgvector", "Kafka", "Redis"]
    },
    inspirationalStory: {
      lead: "Bekerja di shift malam customer support selama hampir 3 tahun membuat Fajar merasa potensi hidupnya terhenti. Hari ini, ia merancang sistem transaksi jutaan pengguna setiap detik di unicorn fintech ternama tanah air.",
      background: "Sebelum mengenal Anvieo Academy, saya bekerja sebagai staf support operasional. Setiap hari menangani keluhan pengguna tanpa memahami bagaimana sistem di belakangnya bekerja. Saya sempat belajar coding otodidak lewat video YouTube secara acak, namun selalu terjebak dalam tutorial hell. Saya bisa mengetik sintaks, tetapi gagal total ketika ditanya mengenai arsitektur sistem, concurrency locking, dan penanganan kegagalan transaksi.",
      turningPoint: "Bergabung di program Back-End Specialist Anvieo adalah titik balik hidup saya. Yang paling berharga bukan hanya materi berstandar IEEE, tetapi disiplin code review dari para mentor. Tidak ada tugas yang lolos hanya karena 'kodenya jalan'. Reviewer membedah efisiensi memori, deteksi memory leak, dan kompleksitas Big-O query database.",
      reviewerSLAExperience: "Submission tugas akhir saya ditolak sebanyak 4 kali karena isu connection pooling dan query N+1 di PostgreSQL. Awalnya saya frustrasi, namun catatan inline review dari lead reviewer sangat detail dan membimbing hingga kode saya memenuhi standar produksi perbankan.",
      careerBreakthrough: "Saat mengikuti technical interview di Unicorn FinTech, para interviewer tercengang dengan kedalaman pemahaman saya mengenai asynchronous I/O dan ACID compliance. Proyek capstone yang saya bangun di Anvieo dijadikan bahan bedah kasus selama 90 menit wawancara teknis. Tiga hari kemudian, saya menerima offering letter dengan kenaikan kompensasi 180% dari pekerjaan lama saya.",
      quoteBanner: "Jangan berkecil hati jika submission Anda direvisi berkali-kali oleh reviewer Anvieo. Setiap catatan revisi itu adalah garansi bahwa Anda tidak akan dipermalukan di hadapan hiring manager industri."
    }
  },
  {
    id: "impact-2",
    initials: "NL",
    name: "Nurul Lestari, S.H.",
    role: "Legal & Data Privacy Compliance Counsel",
    company: "Top Tier Corporate Law Firm",
    course: "HUKUM SIBER & PDP",
    accentColor: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.15)",
    image: "/alumni/alumni_2.jpg",
    headline: "Menjembatani Doktrin Hukum & Kepatuhan Cloud: Memimpin Audit UU PDP Korporasi Multinasional",
    previousRole: "Junior Associate Litigasi Konvensional",
    salaryJump: "+120% Kenaikan Fee Konsultasi",
    timeToHired: "30 Hari Pasca Lulus",
    graduationYear: "Alumni 2025",
    credentialId: "ANV-CERT-2026-NL519",
    gridSpan: "compact",
    keySkills: ["UU PDP No. 27/2022", "DPIA Framework", "Standard Contractual Clauses", "Cloud SLA Escrow", "ISO 27001"],
    quote: "Belajar hukum digital dan privasi data di Anvieo memberikan wawasan praktis yang tidak diajarkan di bangku kuliah biasa. Studi kasus audit UU PDP dan drafting kontrak SLA sangat aplikatif untuk kebutuhan klien korporasi.",
    capstoneProject: {
      title: "DPIA & Cross-Border Data Transfer Framework untuk Ekosistem Open Banking",
      desc: "Penyusunan instrumen Data Protection Impact Assessment (DPIA) komprehensif, klausul pembatasan liabilitas kerugian siber, dan audit transfer data lintas batas untuk bank devisa nasional.",
      techStack: ["UU PDP 27/2022", "GDPR Art. 46", "ISO 27701", "DPIA Matrix"]
    },
    inspirationalStory: {
      lead: "Pergeseran regulasi privasi data di Indonesia menuntut profesi hukum mengerti seluk-beluk infrastruktur cloud. Nurul membuktikan bahwa sarjana hukum yang menguasai teknologi memiliki daya tawar karir tertinggi.",
      background: "Setelah lulus sarjana hukum, saya berkarier di firma hukum litigasi umum. Namun seiring disahkannya UU Pelindungan Data Pribadi (UU PDP No. 27/2022), saya melihat kesenjangan luar biasa besar: banyak konsultan hukum memberikan opini yang tidak dapat diimplementasikan oleh tim engineer karena buta arsitektur database dan enkripsi data.",
      turningPoint: "Di Anvieo Academy, saya diajarkan bagaimana data mengalir di dalam microservices, bagaimana enkripsi AES-256 diterapkan at-rest dan in-transit, serta bagaimana menyusun klausul Standard Contractual Clauses (SCC) yang selaras dengan kenyataan arsitektur cloud server.",
      reviewerSLAExperience: "Tugas telaah hukum di Anvieo direview langsung oleh praktisi Senior Legal Counsel dan DPO bersertifikasi. Komentar review mencakup audit redaksional klausul somasi hingga kepatuhan pelaporan kebocoran 3x24 jam.",
      careerBreakthrough: "Portofolio instrumen DPIA yang saya selesaikan di Anvieo membawa saya langsung direkrut oleh Top Tier Law Firm untuk memimpin gugus tugas kepatuhan PDP klien-klien perbankan asing.",
      quoteBanner: "Dunia hukum tidak lagi cukup mengandalkan pasal di buku. Sarjana hukum yang mengerti arsitektur data dan API adalah konsultan masa depan yang paling dicari korporasi."
    }
  },
  {
    id: "impact-3",
    initials: "DA",
    name: "Dimas Anggoro",
    role: "Lead Product Manager",
    company: "Logistics Tech",
    course: "DIGITAL PRODUCT MANAGEMENT",
    accentColor: "#A855F7",
    accentBg: "rgba(168, 85, 247, 0.15)",
    image: "/alumni/alumni_3.jpg",
    headline: "Dari Intuisi Tanpa Data Menjadi Dokumen PRD Presisi Tinggi: Lompatan Cepat Menjadi Lead PM",
    previousRole: "Digital Marketing Associate",
    salaryJump: "+140% Kenaikan Gaji",
    timeToHired: "60 Hari Pasca Lulus",
    graduationYear: "Alumni 2025",
    credentialId: "ANV-CERT-2026-DA304",
    gridSpan: "compact",
    keySkills: ["Dual-Track Discovery & Delivery", "Technical PRD Writing", "Unit Economics (CAC/LTV)", "Event Telemetry", "A/B Testing"],
    quote: "Gabungan pemahaman teknis API dan strategi bisnis yang diajarkan di kelas Product Management membuat saya percaya diri memimpin sprint engineer dan menyusun PRD berstandar global.",
    capstoneProject: {
      title: "Autonomous Fleet Dispatcher PRD & Telemetry Event Schema",
      desc: "Perancangan dokumen PRD menyeluruh untuk sistem alokasi armada logistik otomatis, lengkap dengan sequence diagram API, skema event telemetri, dan model sensitivitas biaya bahan bakar.",
      techStack: ["PRD Markdown", "BPMN 2.0", "Mixpanel Telemetry", "Jira Discovery"]
    },
    inspirationalStory: {
      lead: "Banyak PM pemula gagal berkomunikasi dengan software engineer. Dimas menemukan jembatan emas antara aspirasi bisnis dengan kelayakan teknis melalui standar kurikulum Anvieo.",
      background: "Dua tahun bekerja di digital marketing, saya kerap menyusun usulan fitur produk berdasarkan intuisi semata. Akibatnya, setiap rapat sprint bersama divisi engineering selalu berujung penolakan karena PRD saya dinilai ambigu, tanpa batasan latency, dan tanpa skema data yang jelas.",
      turningPoint: "Kurikulum Digital Product Management di Anvieo mengajarkan bagaimana seorang PM harus berpikir seperti arsitek sistem sekaligus CFO. Kami dilatih menyusun PRD teknis lengkap dengan endpoint API contract, flowchart kondisi edge-case, dan kalkulasi unit economics.",
      reviewerSLAExperience: "Reviewer dari ex-Unicorn Product Lead menolak PRD awal saya karena metriks keberhasilan belum terikat ke Rule of 40 dan retention cohort. Kritik tajam itu membentuk mentalitas produk yang berfokus pada dampak bisnis nyata.",
      careerBreakthrough: "Saat rekrutmen Lead PM di Logistics Tech, saya mempresentasikan live mockup PRD capstone Anvieo saya. VP Product mereka langsung mengatakan: 'Ini adalah standar dokumentasi teknis produk paling rapi yang pernah kami lihat dari seorang kandidat.'",
      quoteBanner: "Product Manager hebat tidak hanya menjual mimpi di slide presentasi, melainkan mampu mereduksi ketidakpastian teknis bagi tim pengembang."
    }
  },
  {
    id: "impact-4",
    initials: "GM",
    name: "Gita Maharani, CFA",
    role: "VP Investment Banking & M&A",
    company: "Global Securitas",
    course: "FINANCIAL MODELING & VALUASI",
    accentColor: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.15)",
    image: "/alumni/alumni_4.jpg",
    headline: "Standar Dealmaking Wall Street: Menembus Level Vice President Advisory di Usia Muda",
    previousRole: "Junior Equity Research Analyst",
    salaryJump: "+210% Total Kompensasi + Bonus",
    timeToHired: "40 Hari Pasca Lulus",
    graduationYear: "Alumni 2024",
    credentialId: "ANV-CERT-2026-GM771",
    gridSpan: "compact",
    keySkills: ["Dynamic 3-Statement Modeling", "LBO Deal Structuring", "Monte Carlo Simulation", "DCF Multi-Stage", "Debt Covenants"],
    quote: "Kurikulum valuasi DCF dan LBO di Anvieo diajarkan langsung dari standar dealmaking global Wall Street. Ini memberikan keunggulan kompetitif mutlak saat presentasi ke komite investasi.",
    capstoneProject: {
      title: "LBO Valuation & Debt Capacity Model Transaksi Energi Terbarukan US$ 250M",
      desc: "Pemodelan komprehensif 3-statement dengan integrasi schedule hutang mezzanine, simulasi waterfall return investor seri A-C, dan analisis sensitivitas WACC berbasis 10.000 iterasi Monte Carlo.",
      techStack: ["Advanced Excel", "Python Quant", "Monte Carlo Simulator", "Bloomberg Terminal API"]
    },
    inspirationalStory: {
      lead: "Bermodalkan kurikulum valuasi berstandar global Wall Street, Gita membuktikan bahwa presisi pemodelan finansial adalah kunci mutlak memenangkan kepercayaan komite investasi internasional.",
      background: "Sebagai analis riset junior, saya sering menemukan bahwa model finansial yang diajarkan di kampus sangat teoritis dan kaku. Ketika berhadapan dengan transaksi merger & akuisisi riil bernilai ratusan juta dolar, model tersebut runtuh karena tidak memperhitungkan debt covenant, amortisasi pajak, dan penyesuaian modal kerja dinamis.",
      turningPoint: "Kelas Financial Modeling & Valuasi di Anvieo memberikan kurikulum dealmaking riil. Setiap sesi dibimbing langsung oleh mantan banker Wall Street dan praktisi private equity papan atas yang membedah transaksi nyata di Asia Pasifik.",
      reviewerSLAExperience: "Reviewer di Anvieo mengaudit rumus spreadsheet hingga ke tingkat konsistensi circular reference handling dan dinamika cash sweep. Tidak ada kompromi pada eror pemodelan sekecil apapun.",
      careerBreakthrough: "Berkat metodologi Anvieo, saya berhasil menyusun dan mempresentasikan model transaksi akuisisi lintas negara kepada Managing Director. Hanya dalam tempo 18 bulan, saya dipromosikan menjadi Vice President Investment Banking termuda di divisi kami.",
      quoteBanner: "Di pasar keuangan global, reputasi Anda dipertaruhkan pada ketepatan desimal model Anda. Anvieo melatih disiplin presisi tersebut sejak hari pertama."
    }
  },
  {
    id: "impact-5",
    initials: "RA",
    name: "Raden Arya Wijaya",
    role: "Principal AI & Cloud Architect",
    company: "Multifinance Group",
    course: "APPLIED AI & LLM SYSTEMS",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.15)",
    image: "/alumni/alumni_5.jpg",
    headline: "Dari Maintenance Server Menjadi Pemimpin Strategi AI & Arsitektur Cloud Korporasi",
    previousRole: "Linux System Administrator",
    salaryJump: "+175% Kenaikan Gaji Pokok",
    timeToHired: "50 Hari Pasca Lulus",
    graduationYear: "Alumni 2025",
    credentialId: "ANV-CERT-2026-RA912",
    gridSpan: "compact",
    keySkills: ["Enterprise RAG Pipelines", "vLLM / Ollama Cluster", "pgvector HNSW Optimization", "LangChain Multi-Agent", "GPU Sizing"],
    quote: "Praktek langsung implementasi RAG, multi-agent orchestrator, dan optimasi GPU inference di Anvieo membawa terobosan automasi operasional di institusi kami.",
    capstoneProject: {
      title: "Enterprise Document Intelligence RAG Engine Latensi Rendah (< 400ms)",
      desc: "Infrastruktur orkestrasi model AI privat on-premise untuk analisis otomatis polis multifinance, pemindaian risiko kredit, dan ekstraksi klausul legal tanpa kebocoran data ke cloud publik.",
      techStack: ["vLLM", "PostgreSQL pgvector", "Docker Swarm", "HuggingFace Transformers", "Nvidia Triton"]
    },
    inspirationalStory: {
      lead: "Banyak korporasi ingin mengadopsi AI tetapi terkendala kerahasiaan data perbankan. Arya memimpin terobosan automasi AI privat berlatensi rendah setelah menuntaskan alur Applied AI di Anvieo.",
      background: "Selama 5 tahun saya berkutat memelihara server Linux dan database konvensional. Ketika demam Generative AI merebak, saya menyadari perusahaan multifinance kami sangat ingin memanfaatkan LLM, tetapi tidak boleh menggunakan cloud publik demi kepatuhan rahasia bank dan UU PDP.",
      turningPoint: "Program Applied AI & LLM Systems di Anvieo mengajarkan bagaimana men-deploy model open-source berukuran besar secara on-premise, mengoptimalkan throughput menggunakan vLLM, serta melakukan indeks vektor semantik di pgvector dengan indeks HNSW.",
      reviewerSLAExperience: "Tugas capstone saya diuji dengan beban konkurensi 100 request/detik untuk memastikan memory footprint GPU tidak mengalami out-of-memory (OOM). Reviewer memberi wawasan optimasi kuantisasi model yang sangat bernilai.",
      careerBreakthrough: "Board of Directors konglomerasi multifinance langsung menunjuk saya sebagai Principal AI & Cloud Architect untuk mengepalai unit inovasi AI lintas 8 anak perusahaan.",
      quoteBanner: "AI bukan sekadar prompt engineering. Memahami infrastruktur komputasi GPU, vector search, dan data security adalah keahlian bernilai tinggi yang sesungguhnya."
    }
  }
];

export interface BootcampProgram {
  id: string;
  batch: string;
  disciplineBadge: string;
  quota: string;
  title: string;
  desc: string;
  duration: string;
  mode: string;
  accentColor: string;
  accentBg: string;
  highlights: string[];
}

const BOOTCAMP_PROGRAMS: BootcampProgram[] = [
  {
    id: "bootcamp-1",
    batch: "BATCH 14",
    disciplineBadge: "JALUR IT & AI",
    quota: "12 KURSI TERSISA",
    title: "Full-Stack & Enterprise AI Engineering Bootcamp",
    desc: "Program komprehensif menguasai Next.js 16, Python FastAPI, Vector Databases, CI/CD, dan orkestrasi model AI mandiri. Dilengkapi jaminan interview kerja.",
    duration: "16 Minggu",
    mode: "Online Live + 1-on-1 Defense",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    highlights: ["Next.js 16 & FastAPI", "HNSW Vector DB & RAG", "SLA Review < 12 Jam", "Garansi Interview Kerja"]
  },
  {
    id: "bootcamp-2",
    batch: "BATCH 08",
    disciplineBadge: "JALUR HUKUM SIBER",
    quota: "8 KURSI TERSISA",
    title: "Legal Tech, Cyber Law & Data Protection Officer (DPO)",
    desc: "Kuasai implementasi UU PDP No. 27/2022, audit kepatuhan korporasi multinasional, drafting kontrak lisensi software, dan mitigasi sengketa IT komersial.",
    duration: "12 Minggu",
    mode: "Online Live + Moot Trial",
    accentColor: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    highlights: ["UU PDP No. 27/2022", "Audit Compliance DPO", "Drafting Kontrak SaaS", "Simulasi Arbitrase Sengketa"]
  },
  {
    id: "bootcamp-3",
    batch: "BATCH 05",
    disciplineBadge: "JALUR PASAR MODAL",
    quota: "10 KURSI TERSISA",
    title: "Quantitative Finance & Investment Banking Modeling",
    desc: "Praktik analisis laporan keuangan korporasi, DCF valuation, LBO modeling, algorithmic trading script Python, dan persiapan interview investment banking.",
    duration: "14 Minggu",
    mode: "Online Live + Wall St Case",
    accentColor: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.12)",
    highlights: ["3-Statement & DCF Modeling", "Python Algo Trading Script", "M&A Deal Structuring", "Mentoring Analis Pasar Modal"]
  },
  {
    id: "bootcamp-4",
    batch: "BATCH 09",
    disciplineBadge: "JALUR MANAJEMEN PRODUK",
    quota: "14 KURSI TERSISA",
    title: "Enterprise Product Management & AI Governance",
    desc: "Rancang strategi produk skala enterprise dari 0 hingga skala jutaan pengguna: PRD drafting, metrics telemetry, AI product integration, dan OKR leadership.",
    duration: "12 Minggu",
    mode: "Online Live + Product Defense",
    accentColor: "#A855F7",
    accentBg: "rgba(168, 85, 247, 0.12)",
    highlights: ["Enterprise PRD & User Journey", "AI Product Architecture", "Data Telemetry & Retention", "Hiring Partner Demo Day"]
  },
  {
    id: "bootcamp-5",
    batch: "BATCH 11",
    disciplineBadge: "JALUR CLOUD INFRA",
    quota: "6 KURSI TERSISA",
    title: "Cloud Architecture, Kubernetes & DevSecOps Mastery",
    desc: "Membangun infrastruktur cloud resilient multi-region di AWS/GCP, orchestration Docker & Kubernetes, zero-trust security audit, dan automated CI/CD pipeline.",
    duration: "16 Minggu",
    mode: "Online Live + Chaos Testing",
    accentColor: "#EC4899",
    accentBg: "rgba(236, 72, 153, 0.12)",
    highlights: ["Kubernetes Cluster Admin", "Terraform Multi-Cloud", "Zero-Trust DevSecOps", "SLA 99.99% Reliability"]
  }
];

interface ArticleSection {
  subheading: string;
  paragraphs: string[];
  highlight?: string;
}

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  authorInitial: string;
  excerpt: string;
  image: string;
  content: {
    lead: string;
    sections: ArticleSection[];
    takeaways: string[];
  };
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "art-1",
    slug: "arsitektur-fintech-50k-tps-fastapi-pgvector",
    title: "Arsitektur Sistem FinTech 50.000 TPS: Implementasi Asinkron Python FastAPI & HNSW pgvector",
    category: "REKAYASA AI & CLOUD",
    categoryColor: "#10B981", // Emerald
    categoryBg: "rgba(16, 185, 129, 0.12)",
    readTime: "6 MIN READ",
    date: "25 OKT 2026",
    author: "Bagas Pratama, M.Sc.",
    authorRole: "Principal AI Architect",
    authorInitial: "BP",
    excerpt: "Eksplorasi optimasi pipeline query vektor berkecepatan sub-milidetik, connection pooling PostgreSQL, dan mitigasi latency pada arsitektur agen AI otonom skala puluhan ribu transaksi.",
    image: "/articles/article_ai_fintech.jpg",
    content: {
      lead: "Membangun sistem pemrosesan finansial dengan kapasitas throughput tinggi menuntut pergeseran paradigma dari model blocking sekuensial menuju arsitektur event-driven non-blocking yang terdistribusi.",
      sections: [
        {
          subheading: "Tantangan Concurrency & Latency Sub-Milidetik",
          paragraphs: [
            "Ketika volume transaksi mencapai lebih dari 50.000 transaksi per detik (TPS), bottleneck utama berpindah dari layer aplikasi ke layer basis data dan orkestrasi koneksi I/O.",
            "Dengan mengadopsi Python FastAPI berbasis Uvicorn workers dan connection pooling pgBouncer, kami meminimalkan overhead handshake TCP dan menjaga latency tail p99 di bawah 8.4 milidetik."
          ],
          highlight: "Konfigurasi HNSW indeks pgvector dengan m=16 dan ef_construction=64 memberikan akurasi recall 99.4% dengan latency k-NN retrieval hanya 1.2ms."
        },
        {
          subheading: "Orkestrasi Agen Cerdas Tanpa Mengorbankan Reliabilitas",
          paragraphs: [
            "Agen AI otonom dalam deteksi anomali finansial ditugaskan memverifikasi pola fraud secara real-time sebelum status transaksi diubah menjadi settled.",
            "Integrasi cache bertingkat (Redis Cluster in-memory) memastikan fitur vektor historical transaksi pengguna dapat diakses secara instan tanpa membebani disk IOPS server produksi."
          ]
        }
      ],
      takeaways: [
        "Connection pooling terpusat dan async I/O memangkas tail latency hingga 65%.",
        "HNSW vector search pgvector siap produksi untuk deteksi fraud skala jutaan transaksi.",
        "SLA ketersediaan sistem 99.99% tercapai dengan isolasi circuit-breaker terdistribusi."
      ]
    }
  },
  {
    id: "art-2",
    slug: "kepatuhan-uu-pdp-audit-privasi-data",
    title: "Kepatuhan Penuh UU PDP No. 27/2022: Panduan Audit Privasi Data dan Mitigasi Denda Administratif Korporasi",
    category: "HUKUM BISNIS & PDP",
    categoryColor: "#F59E0B", // Royal Amber
    categoryBg: "rgba(245, 158, 11, 0.12)",
    readTime: "8 MIN READ",
    date: "24 OKT 2026",
    author: "Dr. Raden Wardhana, S.H., LL.M.",
    authorRole: "Senior Legal Fellow & DPO",
    authorInitial: "RW",
    excerpt: "Bedah komprehensif instrumen Data Protection Impact Assessment (DPIA), klausul transfer data lintas batas, dan strategi mitigasi gugatan perdata wanprestasi kebocoran kredensial.",
    image: "/articles/article_cyber_law.jpg",
    content: {
      lead: "Pemberlakuan sanksi penuh UU Pelindungan Data Pribadi (UU PDP) menuntut dewan direksi dan divisi teknologi menyelaraskan klausul operasional dengan kewajiban hukum yang mengikat.",
      sections: [
        {
          subheading: "Klasifikasi Data Pribadi Spesifik & Kewajiban DPIA",
          paragraphs: [
            "Pasal 16 UU No. 27/2022 membagi data pribadi menjadi data umum dan data spesifik. Pengendali data yang memproses data keuangan, biometrik, atau catatan kejahatan wajib melaksanakan Penilaian Dampak Pelindungan Data (DPIA).",
            "Kelalaian dalam dokumentasi DPIA membuka risiko sanksi denda administratif hingga 2% dari total pendapatan tahunan korporasi pelanggar."
          ],
          highlight: "SOP notifikasi insiden kebocoran data wajib disampaikan paling lambat 3 x 24 jam kepada Lembaga PDP dan subjek data terdampak."
        },
        {
          subheading: "Standard Contractual Clauses untuk Cloud Lintas Batas",
          paragraphs: [
            "Bagi institusi yang menggunakan server cloud di luar wilayah yurisdiksi Indonesia, klausul Standard Contractual Clauses (SCC) dan audit tingkat kepatuhan yurisdiksi penerima menjadi syarat mutlak legalitas transfer."
          ]
        }
      ],
      takeaways: [
        "Pemetaan data (Data Mapping & Inventory) wajib diperbaharui setiap kuartal.",
        "Klausul ganti rugi wanprestasi wajib dibatasi secara eksplisit dalam SLA vendor SaaS.",
        "Penunjukan Petugas Pelindungan Data (DPO) bersertifikasi adalah investasi kepatuhan mandatori."
      ]
    }
  },
  {
    id: "art-3",
    slug: "analisis-sensitivitas-valuasi-fintech-sea",
    title: "Analisis Sensitivitas Valuasi Startup FinTech Asia Tenggara Pasca Normalisasi Suku Bunga Acuan",
    category: "VALUASI & QUANT",
    categoryColor: "#8B5CF6", // Electric Violet
    categoryBg: "rgba(139, 92, 246, 0.12)",
    readTime: "7 MIN READ",
    date: "22 OKT 2026",
    author: "Felicia Tan, CFA",
    authorRole: "Quantitative Finance Lead",
    authorInitial: "FT",
    excerpt: "Dekomposisi model Discounted Cash Flow (DCF), penyesuaian Weighted Average Cost of Capital (WACC), dan simulasi skenario multiple exit untuk pendanaan seri B ke atas.",
    image: "/articles/article_fin_quant.jpg",
    content: {
      lead: "Pergeseran suku bunga global telah mengakhiri era 'growth at all costs', mengarahkan investor ventura untuk menuntut disiplin profitabilitas dan unit economics yang teruji secara fundamental.",
      sections: [
        {
          subheading: "Penyesuaian WACC dan Proyeksi Terminal Value",
          paragraphs: [
            "Dengan risk-free rate yang berada pada level ekuilibrium baru, formula WACC untuk startup pasar berkembang harus mengakomodasi country risk premium tambahan sebesar 220-300 bps.",
            "Metode evaluasi berbasis EV/Revenue berganti menjadi EV/Free-Cash-Flow atau EV/EBITDA yang dinormalisasi."
          ],
          highlight: "Simulasi Monte Carlo terhadap 10.000 iterasi variabel churn rate dan CAC payback membuktikan stabilitas valuasi berada pada rentang US$ 85M - 110M."
        },
        {
          subheading: "Implikasi bagi Strategi Penggalangan Dana Korporasi",
          paragraphs: [
            "Manajemen dituntut menyajikan proyeksi arus kas operasional 3-statement yang mencakup neraca, laba rugi, dan rekonsiliasi kas riil dengan validasi data analitik telemetri produk."
          ]
        }
      ],
      takeaways: [
        "Metrik Rule of 40 kini menjadi filter utama evaluasi kelayakan pendanaan institusi.",
        "Diskon likuiditas sekunder meningkat rata-rata 35% dibandingkan valuasi putaran prima.",
        "Struktur anti-dilution clause perlu diaudit cermat oleh konsultan finansial dan legal."
      ]
    }
  },
  {
    id: "art-4",
    slug: "menjembatani-prd-teknis-metrik-unit-economics",
    title: "Menjembatani PRD Teknis dengan Metrik Unit Economics: Framework Dual-Track Discovery & Delivery",
    category: "PRODUCT & GROWTH",
    categoryColor: "#06B6D4", // Vivid Cyan
    categoryBg: "rgba(6, 182, 212, 0.12)",
    readTime: "5 MIN READ",
    date: "20 OKT 2026",
    author: "Dimas Suryo",
    authorRole: "VP of Digital Products",
    authorInitial: "DS",
    excerpt: "Langkah praktis menyelaraskan aspirasi user experience dengan batas runway operasional, customer acquisition cost (CAC), dan percepatan time-to-market tanpa menumpuk technical debt.",
    image: "/articles/article_product_tech.jpg",
    content: {
      lead: "Kerap terjadi jurang pemisah antara Product Requirement Document (PRD) yang ditulis tim produk dengan realitas efisiensi infrastruktur yang dikelola para software engineer.",
      sections: [
        {
          subheading: "Dual-Track Framework: Discovery Terukur & Delivery Cepat",
          paragraphs: [
            "Track discovery berfokus pada validasi asumsi pengguna dengan prototype cepat, sementara track delivery menjamin arsitektur kode clean, modular, dan teruji automatisasi.",
            "Setiap tiket fitur baru wajib menyertakan estimasi 'cost of goods sold' (COGS) komputasi per pengguna aktif bulanan (MAU)."
          ],
          highlight: "Fitur yang meningkatkan CAC lebih dari 15% tanpa berkontribusi pada retention 30 hari langsung didegradasi ke backlog eksperimental."
        },
        {
          subheading: "Menghindari Feature Creep dengan Telemetri Produk Riil",
          paragraphs: [
            "Penggunaan metrik North Star yang tunggal serta dashboard telemetry real-time mencegah tim engineering membangun fitur berbiaya tinggi yang jarang disentuh pengguna akhir."
          ]
        }
      ],
      takeaways: [
        "Satu sprint PRD wajib menyertakan impact assessment terhadap biaya server cloud.",
        "Iterasi prototipe berbasis user feedback nyata mengurangi risiko kegagalan rilis hingga 70%.",
        "Komunikasi cross-functional antara PM, Tech Lead, dan Finance adalah kunci efisiensi capital."
      ]
    }
  },
  {
    id: "art-5",
    slug: "kolaborasi-riset-anvieo-74-perguruan-tinggi",
    title: "Kolaborasi Riset Anvieo & 74 Perguruan Tinggi: Akselerasi Konversi 20 SKS Berbasis Proyek Industri Riil",
    category: "RISET & KAMPUS",
    categoryColor: "#3B82F6", // Electric Blue
    categoryBg: "rgba(59, 130, 246, 0.12)",
    readTime: "4 MIN READ",
    date: "18 OKT 2026",
    author: "Prof. Dr. Ir. H. Sudirman",
    authorRole: "Ketua Konsorsium Riset Akademik",
    authorInitial: "SD",
    excerpt: "Laporan implementasi semester genap: lebih dari 12.000 mahasiswa berhasil mengintegrasikan modul cloud computing dan tata kelola data industri ke dalam transkrip akademik resmi.",
    image: "/articles/article_academic_lab.jpg",
    content: {
      lead: "Sinergi antara perguruan tinggi dengan ekosistem pendidikan teknologi industri terbukti menjadi katalis tercepat dalam memangkas kesenjangan talenta nasional.",
      sections: [
        {
          subheading: "Integrasi Kurikulum Industri ke Dalam Kurikulum Kampus",
          paragraphs: [
            "Program MSIB dan kerja sama bilateral Anvieo memungkinkan mahasiswa mengerjakan proyek rujukan enterprise alih-alih simulasi konseptual semata.",
            "Penilaian kode oleh Senior Reviewer Anvieo diverifikasi oleh dosen pembimbing sebagai portofolio pengganti skripsi atau mata kuliah keahlian berkala."
          ],
          highlight: "74 universitas mitra mencatat peningkatan tingkat kelulusan rekrutmen kerja lulusan sebesar 82% pada tahun pertama setelah adopsi program."
        },
        {
          subheading: "Laboratorium Riset AI Terdistribusi",
          paragraphs: [
            "Mahasiswa dan dosen mendapatkan akses cluster komputasi GPU dan repositori studi kasus perbankan serta legal tech untuk melahirkan publikasi ilmiah bereputasi internasional."
          ]
        }
      ],
      takeaways: [
        "Konversi 20 SKS penuh diakui secara legal oleh Ditjen Diktiristek Kemendikbudristek.",
        "Karya mahasiswa menjadi solusi fungsional yang diadopsi oleh BUMN dan mitra industri.",
        "Pemerataan akses beasiswa 3T menjamin demokratisasi pendidikan teknologi tinggi."
      ]
    }
  },
  {
    id: "art-6",
    slug: "strategi-zero-trust-owasp-api-top-10",
    title: "Strategi Zero-Trust Architecture & Mitigasi Kerentanan OWASP API Top 10 pada Sistem Cloud-Native",
    category: "ENTERPRISE SECURITY",
    categoryColor: "#F43F5E", // Rose / Crimson
    categoryBg: "rgba(244, 63, 94, 0.12)",
    readTime: "9 MIN READ",
    date: "15 OKT 2026",
    author: "Rian Kurniawan, CISSP",
    authorRole: "Head of Cyber Defense",
    authorInitial: "RK",
    excerpt: "Panduan pengamanan perimeter microservices dengan mutual TLS (mTLS), token rotation terdistribusi, serta audit forensik berbasis signature mitigasi eksploitasi zero-day API.",
    image: "/articles/article_cyber_law.jpg",
    content: {
      lead: "Dalam lanskap ancaman modern, asumsi bahwa jaringan internal selalu aman (perimeter-based security) telah usang. Zero Trust memberlakukan prinsip 'never trust, always verify'.",
      sections: [
        {
          subheading: "Mitigasi Broken Object Level Authorization (BOLA)",
          paragraphs: [
            "BOLA menduduki peringkat #1 dalam OWASP API Security Top 10. Eksploitasi ini terjadi ketika endpoint gagal memvalidasi hak kepemilikan objek data sebelum mengembalikan payload.",
            "Implementasi policy-as-code (Open Policy Agent) pada layer API Gateway memastikan setiap request ditautkan dengan tenant context dan atribut otentikasi kriptografis."
          ],
          highlight: "Penerapan mTLS antara service mesh Istio menghentikan potensi sniffing dan serangan man-in-the-middle pada komunikasi east-west antar kontainer."
        },
        {
          subheading: "Audit Forensik Kriptografis & Immutability Logs",
          paragraphs: [
            "Log audit yang ditandatangani secara kriptografis (cryptographic hash chaining) menjamin bahwa bukti digital tidak dapat dimanipulasi oleh pihak penyerang."
          ]
        }
      ],
      takeaways: [
        "Verifikasi ketat context authorization di setiap layer controller API.",
        "Rotasi token asimetris berkala mencegah pencurian session JWT aktif.",
        "Simulasi red-team berkala wajib diadakan minimal setiap rilis mayor sistem."
      ]
    }
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>("tech");
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalType, setModalType] = useState<
    | "login"
    | "register"
    | "course"
    | "token"
    | "challenge"
    | "job"
    | "event"
    | "mentoring"
    | "reward"
    | "hiring-partner"
    | "csr"
    | "case-study"
    | "sertifikasi"
    | "article"
    | "alumni-story"
    | null
  >(null);
  const [openDropdown, setOpenDropdown] = useState<"alumni" | "langganan" | "programs" | "program" | "others" | "lainnya" | null>(null);
  const [tokenInput, setTokenInput] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedAlumniStory, setSelectedAlumniStory] = useState<VerifiedImpactItem | null>(null);
  const [activeArticleIdx, setActiveArticleIdx] = useState<number>(0);
  const articleSliderRef = useRef<HTMLDivElement>(null);
  const bootcampSliderRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("Budi Santoso");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDiscipline, setRegDiscipline] = useState("tech");

  useEffect(() => {
    // Default light mode as explicitly requested by user
    const savedTheme = localStorage.getItem("anvieo_theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-item.dropdown") && !target.closest(".blackbox-nav-dropdown")) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name: "alumni" | "langganan" | "programs" | "program" | "others" | "lainnya") => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("anvieo_theme", nextTheme);
    showToast(`Beralih ke tema ${nextTheme === "dark" ? "Hitam (Dark Mode)" : "Terang (Light Mode)"}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    setModalType("course");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    setIsLoggedIn(true);
    setUserName(loginEmail.split("@")[0] || "Budi Santoso");
    setModalType(null);
    showToast(`Selamat datang kembali, ${loginEmail.split("@")[0]}!`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;
    setIsLoggedIn(true);
    setUserName(regName);
    setModalType(null);
    showToast(`Akun berhasil dibuat! Selamat bergabung di Anvieo, ${regName}.`);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoggedIn(true);
    setUserName(`${provider} User`);
    setModalType(null);
    showToast(`Berhasil masuk menggunakan akun ${provider}!`);
  };

  const handleEnrollCourse = () => {
    setModalType(null);
    showToast(`Pendaftaran berhasil! Selamat belajar di kelas: ${selectedCourse?.title}.`);
  };

  const handleTokenActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setModalType(null);
    showToast(`Token "${tokenInput.trim().toUpperCase()}" berhasil diaktivasi! Akses belajar telah aktif.`);
    setTokenInput("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast("Anda telah keluar dari akun.");
  };

  const scrollArticleSlider = (direction: "left" | "right") => {
    if (articleSliderRef.current) {
      const cardWidth = 380 + 24;
      articleSliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth"
      });
    }
  };

  const scrollToArticleIdx = (index: number) => {
    setActiveArticleIdx(index);
    if (articleSliderRef.current) {
      const cardWidth = 380 + 24;
      articleSliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  const handleArticleSliderScroll = () => {
    if (articleSliderRef.current) {
      const scrollLeft = articleSliderRef.current.scrollLeft;
      const cardWidth = 380 + 24;
      const newIdx = Math.round(scrollLeft / cardWidth);
      if (newIdx >= 0 && newIdx < ARTICLES_DATA.length && newIdx !== activeArticleIdx) {
        setActiveArticleIdx(newIdx);
      }
    }
  };

  const scrollBootcamp = (direction: "left" | "right") => {
    if (bootcampSliderRef.current) {
      const scrollAmount = 420;
      bootcampSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Filter courses based on left sidebar state
  const filteredCourses = MULTIDISCIPLINE_COURSES.filter((course) => {
    const matchDiscipline = selectedDiscipline === "all" || course.discipline === selectedDiscipline;
    const matchSearch =
      searchQuery.trim() === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchDiscipline && matchSearch;
  });

  // Calculate counts for left sidebar
  const countAll = MULTIDISCIPLINE_COURSES.length;
  const countTech = MULTIDISCIPLINE_COURSES.filter((c) => c.discipline === "tech").length;
  const countLaw = MULTIDISCIPLINE_COURSES.filter((c) => c.discipline === "law").length;
  const countEcon = MULTIDISCIPLINE_COURSES.filter((c) => c.discipline === "econ").length;
  const countBiz = MULTIDISCIPLINE_COURSES.filter((c) => c.discipline === "biz").length;

  return (
    <>
      {/* ==================== SITE HEADER ==================== */}
      <SiteHeader activeTabOverride={activeTab} />

      <main style={{ flex: 1 }}>
        {/* ==================== HERO SECTION (CLEAN CENTERED / EDITORIAL - NO RIGHT BOX) ==================== */}
        <section id="top" className="blackbox-hero-sec">
          <BlackboxRails position="bottom" />

          <div className="blackbox-frame">
            <div className="blackbox-hero-grid">
              {/* Left Column: Hero Editorial Content */}
              <div className="blackbox-hero-content">
                {/* AUI Eyebrow Tag with Leading Accent Line */}
                <div className="blackbox-hero-tag">
                  <span className="blackbox-hero-tag-text">
                    AKADEMI MULTIDISIPLIN BERSTANDAR INDUSTRI
                  </span>
                </div>

                <h1 className="blackbox-hero-h1">
                  Bangun keahlian masa depan, <span className="blackbox-hero-h1-blue">akselerasi karir impianmu.</span>
                </h1>

                <p className="blackbox-hero-desc">
                  Platform pembelajaran online berbasis proyek riil dengan kurikulum standar industri dunia. Belajar fleksibel kapan saja, dibimbing langsung oleh <strong>praktisi senior</strong>, dan dapatkan <strong>evaluasi tugas terjamin &lt; 12 jam</strong> untuk melesatkan karir profesional Anda.
                </p>

                {/* Action Buttons */}
                <div className="blackbox-hero-actions">
                  <a
                    className="blackbox-pill blackbox-pill-blue"
                    href="#learning-paths"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("learning-paths");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    JELAJAHI LEARNING PATH
                    <PixelArrow color="#FFFFFF" size={11} />
                  </a>
                  <a
                    className="blackbox-outline"
                    href="#alumni"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("alumni");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    KISAH ALUMNI
                  </a>
                </div>

                {/* Highlights */}
                <div className="blackbox-hero-highlights">
                  <div className="hero-highlight-item">
                    <span className="hero-highlight-icon">
                      <FlatIcon type="ai" size={15} color="var(--bx-blue)" />
                    </span>
                    <span>SLA REVIEW &lt; 12 JAM</span>
                  </div>
                  <div className="hero-highlight-item">
                    <span className="hero-highlight-icon">
                      <FlatIcon type="aigov" size={15} color="var(--bx-blue)" />
                    </span>
                    <span>KURIKULUM GLOBAL (IEEE &amp; CFA)</span>
                  </div>
                  <div className="hero-highlight-item">
                    <span className="hero-highlight-icon">
                      <FlatIcon type="cyberlaw" size={15} color="var(--bx-blue)" />
                    </span>
                    <span>STUDI KASUS RIIL</span>
                  </div>
                  <div className="hero-highlight-item">
                    <span className="hero-highlight-icon">
                      <FlatIcon type="strategy" size={15} color="var(--bx-blue)" />
                    </span>
                    <span>850+ MITRA KORPORASI</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Media with siswa.png (Clean Standalone Cutout, Flush to Bottom Rail) */}
              <div className="blackbox-hero-media">
                <div className="hero-student-glow" aria-hidden="true" />

                {/* Cutout Student Image (Flush to Bottom Rail) */}
                <img
                  src="/siswa.png"
                  alt="Mahasiswa Anvieo Academy"
                  className="hero-student-img-direct"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== STATS GRID SECTION (BLACKBOX 4-COLUMN STRIP) ==================== */}
        <section className="blackbox-stats-section">
          <BlackboxRails position="bottom" />

          <div className="blackbox-frame">
            <div className="blackbox-stats-grid">
              <div className="blackbox-stat-cell">
                <div className="blackbox-stat-value">250K+</div>
                <div className="blackbox-stat-label">MAHASISWA &amp; PROFESIONAL AKTIF</div>
              </div>
              <div className="blackbox-stat-cell">
                <div className="blackbox-stat-value blackbox-stat-value-blue">&lt; 12 JAM</div>
                <div className="blackbox-stat-label">SLA REVIEW TUGAS KODE &amp; DRAFTING</div>
              </div>
              <div className="blackbox-stat-cell">
                <div className="blackbox-stat-value">94.2%</div>
                <div className="blackbox-stat-label">PENYERAPAN KERJA ALUMNI KORPORASI</div>
              </div>
              <div className="blackbox-stat-cell">
                <div className="blackbox-stat-value">850+</div>
                <div className="blackbox-stat-label">MITRA INDUSTRI &amp; REKRUTMEN B2B</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 01 // KURIKULUM STANDAR GLOBAL ==================== */}
        <section id="kurikulum-global" className="section-kurikulum-global">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">01 // KURIKULUM STANDAR GLOBAL</span>
              <dl className="blackbox-strip-facts">
                <div><dt>ACUAN:</dt><dd>IEEE, NIST, ISO 27001 &amp; CFA</dd></div>
                <div><dt>EVALUASI:</dt><dd>SENIOR HUMAN PRACTITIONERS</dd></div>
                <div><dt>AKREDITASI:</dt><dd>TERVERIFIKASI INDUSTRI</dd></div>
              </dl>
            </div>

            <div className="global-curriculum-header" style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 24px" }}>
              <h2 className="blackbox-sec-title" style={{ textAlign: "center" }}>
                Kurikulum Berstandar Global Diselaraskan dengan Industri Dunia.
              </h2>
              <p className="blackbox-sec-sub" style={{ textAlign: "center", margin: "0 auto" }}>
                Setiap modul dirancang sistematis mengacu pada standar kompetensi internasional, regulasi hukum terbaru, serta praktik rekayasa terbaik korporasi teknologi global.
              </p>
            </div>

            {/* Globe Center (Top) */}
            <div className="curriculum-globe-center-col">
              <div className="globe-badge-top">
                <span>STANDARISASI KURIKULUM GLOBAL REALTIME</span>
              </div>

              <CobeGlobe theme={theme} />

              <div className="globe-meta-bottom">
                <span className="globe-meta-item">7 PUSAT INOVASI &amp; REGULASI INTERNASIONAL</span>
                <span className="globe-meta-sub">Sinkronisasi Kurikulum: Jakarta • Singapura • Tokyo • London • San Francisco • Zurich • Sydney</span>
              </div>
            </div>

            {/* 3 Compact Feature Cards Below Globe (Centered without icons) */}
            <div className="curriculum-pillars-bottom-grid" style={{ maxWidth: "980px", margin: "24px auto 0", justifyContent: "center" }}>
              {/* Feature 1: Kurikulum Standar Global */}
              <div className="global-curriculum-card-compact" style={{ textAlign: "center", alignItems: "center" }}>
                <h3 className="compact-card-title" style={{ textAlign: "center", marginBottom: "8px" }}>
                  Kurikulum Standar Global
                </h3>
                <p className="compact-card-desc" style={{ textAlign: "center", marginBottom: "14px" }}>
                  Kurikulum disusun bersama profesional dari industri.
                </p>
                <div className="compact-card-standards" style={{ textAlign: "center", margin: "0 auto" }}>
                  KOLABORASI INDUSTRI · STANDAR GLOBAL
                </div>
              </div>

              {/* Feature 2: Materi Relevan Terbaru */}
              <div className="global-curriculum-card-compact" style={{ textAlign: "center", alignItems: "center" }}>
                <h3 className="compact-card-title" style={{ textAlign: "center", marginBottom: "8px" }}>
                  Materi Relevan Terbaru
                </h3>
                <p className="compact-card-desc" style={{ textAlign: "center", marginBottom: "14px" }}>
                  Materi kelas selalu up-to-date sesuai kebutuhan industri terkini.
                </p>
                <div className="compact-card-standards" style={{ textAlign: "center", margin: "0 auto" }}>
                  PEMBAHARUAN BERKALA · TECH STACK TERBARU
                </div>
              </div>

              {/* Feature 3: Fleksibel dan Mandiri */}
              <div className="global-curriculum-card-compact" style={{ textAlign: "center", alignItems: "center" }}>
                <h3 className="compact-card-title" style={{ textAlign: "center", marginBottom: "8px" }}>
                  Fleksibel dan Mandiri
                </h3>
                <p className="compact-card-desc" style={{ textAlign: "center", marginBottom: "14px" }}>
                  Belajar kapan saja, di mana saja. Akses seumur hidup setelah lulus.
                </p>
                <div className="compact-card-standards" style={{ textAlign: "center", margin: "0 auto" }}>
                  BELAJAR MANDIRI · LIFETIME ACCESS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 02 // MULTIDISCIPLINARY LEARNING PATHS (LEFT SIDEBAR GROUPING) ==================== */}
        <section id="learning-paths" className="blackbox-compute-band">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">02 // MULTIDISCIPLINARY LEARNING PATHS</span>
              <dl className="blackbox-strip-facts">
                <div><dt>STANDARISASI:</dt><dd>KURIKULUM RIIL INDUSTRI</dd></div>
                <div><dt>REVIEWER SLA:</dt><dd>&lt; 12 JAM TERJAMIN</dd></div>
                <div><dt>METODE:</dt><dd>PROJECT-BASED CODE/LEGAL LABS</dd></div>
              </dl>
            </div>

            <h2 className="blackbox-sec-title">
              Pilihan Alur Belajar Terstruktur.
            </h2>
            <p className="blackbox-sec-sub">
              Gunakan panel filter di sebelah kiri untuk memilih rumpun disiplin dan tingkat kesulitan materi yang sesuai dengan target karier Anda.
            </p>

            {/* 2-Column Layout: Left Sidebar + Right Course Grid */}
            <div className="learning-paths-layout">
              {/* Left Sidebar Filter */}
              <aside className="paths-sidebar">
                {/* Search Box */}
                <div>
                  <div className="sidebar-heading">PENCARIAN KELAS</div>
                  <div className="sidebar-search-box">
                    <span className="sidebar-search-icon">
                      <FlatIcon type="search" size={14} color="var(--bx-text-meta)" />
                    </span>
                    <input
                      type="text"
                      className="sidebar-search-input"
                      placeholder="Cari materi / keahlian..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Disiplin Utama Filter Buttons */}
                <div>
                  <div className="sidebar-heading">DISIPLIN UTAMA</div>
                  <div className="sidebar-nav-list">
                    <button
                      type="button"
                      className={`sidebar-nav-btn ${selectedDiscipline === "tech" ? "active" : ""}`}
                      onClick={() => setSelectedDiscipline("tech")}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FlatIcon type="backend" size={14} color={selectedDiscipline === "tech" ? "var(--bx-blue)" : "currentColor"} />
                        Teknologi &amp; IT
                      </span>
                      
                    </button>
                    <button
                      type="button"
                      className={`sidebar-nav-btn ${selectedDiscipline === "law" ? "active" : ""}`}
                      onClick={() => setSelectedDiscipline("law")}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FlatIcon type="cyberlaw" size={14} color={selectedDiscipline === "law" ? "var(--bx-blue)" : "currentColor"} />
                        Hukum &amp; Legal
                      </span>
                      
                    </button>
                    <button
                      type="button"
                      className={`sidebar-nav-btn ${selectedDiscipline === "econ" ? "active" : ""}`}
                      onClick={() => setSelectedDiscipline("econ")}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FlatIcon type="valuation" size={14} color={selectedDiscipline === "econ" ? "var(--bx-blue)" : "currentColor"} />
                        Ekonomi &amp; Keuangan
                      </span>
                      
                    </button>
                    <button
                      type="button"
                      className={`sidebar-nav-btn ${selectedDiscipline === "biz" ? "active" : ""}`}
                      onClick={() => setSelectedDiscipline("biz")}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FlatIcon type="product" size={14} color={selectedDiscipline === "biz" ? "var(--bx-blue)" : "currentColor"} />
                        Bisnis &amp; Manajemen
                      </span>
                      
                    </button>
                  </div>
                </div>

                {/* SLA Guarantee Box */}
                <div className="sidebar-guarantee-card">
                  <div className="sidebar-guarantee-title">
                    <FlatIcon type="cyberlaw" size={14} color="var(--bx-blue)" />
                    <span>JAMINAN REVIEW SLA &lt; 12 JAM</span>
                  </div>
                  <p className="sidebar-guarantee-desc">
                    Tugas coding, drafting kontrak hukum, dan financial model diperiksa manual oleh praktisi industri berpengalaman, bukan sekadar bot otomatis.
                  </p>
                </div>
              </aside>

              {/* Right Course Catalog Grid -> 1-Row Continuous Strip */}
              <div className="paths-content">
                {filteredCourses.length === 0 ? (
                  <div style={{ padding: "48px 24px", textAlign: "center", background: "var(--bx-surface)", border: "1px dashed var(--bx-border)" }}>
                    <p style={{ color: "var(--bx-text-meta)", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                      Tidak ditemukan kelas yang cocok dengan filter atau kata kunci &quot;{searchQuery}&quot;.
                    </p>
                    <button
                      type="button"
                      className="blackbox-outline"
                      style={{ marginTop: "16px" }}
                      onClick={() => {
                        setSelectedDiscipline("tech");
                        setSearchQuery("");
                      }}
                    >
                      RESET SEMUA FILTER
                    </button>
                  </div>
                ) : (
                  <div className="learning-path-row-list">
                    {filteredCourses.map((course) => {
                      const disciplineColors: Record<string, { color: string; bg: string }> = {
                        tech: { color: "#10B981", bg: "rgba(16, 185, 129, 0.14)" },
                        law: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.14)" },
                        econ: { color: "#06B6D4", bg: "rgba(6, 182, 212, 0.14)" },
                        biz: { color: "#A855F7", bg: "rgba(168, 85, 247, 0.14)" }
                      };
                      const colors = disciplineColors[course.discipline] || { color: "var(--bx-blue)", bg: "var(--bx-blue-soft)" };

                      return (
                        <div
                          key={course.id}
                          className="learning-path-row-item"
                          onClick={() => handleOpenCourse(course)}
                        >
                          {/* Left: Code Badge, Duration, Rating, Title, Detail Kurikulum (Tanpa Icon) */}
                          <div className="path-row-left">
                            <div className="path-row-info">
                              <div className="path-row-meta-top">
                                <span
                                  className="path-row-code"
                                  style={{ color: colors.color }}
                                >
                                  {course.code}
                                </span>
                                <span style={{ color: "var(--bx-border-bright)" }}>•</span>
                                <span className="path-row-duration">{course.duration}</span>
                                <span style={{ color: "var(--bx-border-bright)" }}>•</span>
                                <span className="path-row-rating-inline">
                                  <FlatIcon type="star" size={11} color="#F59E0B" />
                                  <span>{course.rating.toFixed(1)}</span>
                                  <span style={{ color: "var(--bx-text-meta)", fontWeight: 400 }}>({course.students})</span>
                                </span>
                              </div>
                              <h3 className="path-row-title">{course.title}</h3>
                              <p className="path-row-detail-sub">{course.desc}</p>
                              <div className="path-row-meta-bottom">
                                <span className="path-meta-pill">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                  </svg>
                                  <strong className="path-meta-pill-highlight">{course.syllabus.length} Modul Terstruktur</strong>
                                </span>
                                <span className="path-meta-divider">•</span>
                                <span className="path-meta-pill">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                  </svg>
                                  <strong className="path-meta-pill-highlight">{course.students} Siswa Terdaftar</strong>
                                </span>
                                <span className="path-meta-divider">•</span>
                                <span className="path-meta-pill path-meta-pill-sla">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  <span>Reviewer Human &lt; 12 Jam</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Tombol Belajar Sekarang (Grey Radius Button) */}
                          <div className="path-row-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className="path-btn-learn-grey"
                              onClick={() => handleOpenCourse(course)}
                            >
                              BELAJAR SEKARANG
                              <PixelArrow color="currentColor" size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>



        {/* ==================== 04 // BOOTCAMP (RECURSIVE LEARNING LOOP) ==================== */}
        <section id="bootcamp" className="blackbox-compute-band">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">04 // ACCELERATED CAREER BOOTCAMPS</span>
              <dl className="blackbox-strip-facts">
                <div><dt>DURASI:</dt><dd>16 MINGGU INTENSIF</dd></div>
                <div><dt>GARANSI:</dt><dd>JOB PLACEMENT SUPPORT</dd></div>
                <div><dt>FORMAT:</dt><dd>LIVE LABS + 1-ON-1 DEFENSE</dd></div>
              </dl>
            </div>

            {/* Top: Section Header + 4-Step Process Progression */}
            <div className="bootcamp-intro-wrapper">
              <h2 className="blackbox-sec-title">
                Iterasi Belajar Hingga Standar Industri Tercapai.
              </h2>
              <p className="blackbox-sec-sub">
                Bootcamp intensif kami menerapkan siklus evaluasi bertingkat: setiap tugas kode maupun dokumen hukum dinilai secara ketat oleh sistem otomatis dan praktisi senior.
              </p>

              {/* The Blackbox Step Loop: 4-Columns Horizontal Grid */}
              <div className="bootcamp-steps-grid">
                <div className="bootcamp-step-card">
                  <div className="bootcamp-step-num">01</div>
                  <h4 className="bootcamp-step-title">DIAGNOSTIK LEVEL &amp; ONBOARDING</h4>
                  <p className="bootcamp-step-desc">
                    Pemetaan fondasi awal dan penyusunan target portofolio personal per peserta.
                  </p>
                </div>

                <div className="bootcamp-step-card">
                  <div className="bootcamp-step-num">02</div>
                  <h4 className="bootcamp-step-title">PRAKTIK STUDI KASUS RIIL PERUSAHAAN</h4>
                  <p className="bootcamp-step-desc">
                    Membangun microservices, audit kontrak UU PDP, atau valuasi merger riil.
                  </p>
                </div>

                <div className="bootcamp-step-card">
                  <div className="bootcamp-step-num">03</div>
                  <h4 className="bootcamp-step-title">HARNESS OTOMATIS &amp; HUMAN REVIEWER SLA</h4>
                  <p className="bootcamp-step-desc">
                    Submission diuji unit tests, OWASP security audit, dan review praktisi &lt; 12 jam.
                  </p>
                </div>

                <div className="bootcamp-step-card">
                  <div className="bootcamp-step-num">04</div>
                  <h4 className="bootcamp-step-title">DEMO DAY &amp; PENYALURAN KERJA</h4>
                  <p className="bootcamp-step-desc">
                    Presentasi portofolio di hadapan hiring manager dari 850+ perusahaan rekanan.
                  </p>
                </div>
              </div>

              <div className="bootcamp-loop-notice">
                <span>↺</span>
                <span>REPETISI FEEDBACK REVIEW HINGGA KARYA DINILAI LAYAK STANDAR PRODUKSI PERUSAHAAN</span>
              </div>
            </div>

            {/* Bottom: Bootcamp Slider Header with Controls */}
            <div className="bootcamp-slider-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
              <div>
                <h3 className="bootcamp-slider-title" style={{ margin: "0 0 6px" }}>Pilihan Program Bootcamp Intensif Tersedia</h3>
                <p className="bootcamp-slider-sub" style={{ margin: 0 }}>
                  Kurikulum terakreditasi industri dengan pembimbingan langsung praktisi senior dan portofolio produksi siap kerja.
                </p>
              </div>

              <div className="marquee-loop-pill">
                <span className="marquee-loop-dot"></span>
                <span>LOOP MARQUEE • HOVER UNTUK JEDA</span>
              </div>
            </div>
          </div>

          {/* Continuous Full-Width Loop Marquee Slider Viewport */}
          <div className="bootcamp-marquee-viewport">
            <div className="bootcamp-marquee-track">
              {[...BOOTCAMP_PROGRAMS, ...BOOTCAMP_PROGRAMS].map((program, idx) => (
                <div key={`bootcamp-marquee-${program.id}-${idx}`} className="bootcamp-slide-card">
                  <div className="bootcamp-card-top">
                    <span
                      className="bootcamp-batch-pill"
                      style={{
                        color: program.accentColor,
                        borderColor: program.accentColor,
                        background: program.accentBg
                      }}
                    >
                      {program.batch} · {program.disciplineBadge}
                    </span>
                    <span className="bootcamp-quota-pill">
                      {program.quota}
                    </span>
                  </div>

                  <h4 className="bootcamp-card-heading">{program.title}</h4>
                  <p className="bootcamp-card-desc">{program.desc}</p>

                  <div className="bootcamp-highlights-list">
                    {program.highlights.map((h, i) => (
                      <span key={i} className="bootcamp-highlight-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <FlatIcon type="check" size={11} color="#10B981" /> {h}
                      </span>
                    ))}
                  </div>

                  <div className="bootcamp-card-footer">
                    <div className="bootcamp-duration-meta">
                      <strong>{program.duration}</strong>
                      <span>{program.mode}</span>
                    </div>

                    <button
                      type="button"
                      className="blackbox-pill blackbox-pill-blue"
                      onClick={() => showToast(`Pendaftaran ${program.batch} (${program.title}) dibuka. Silakan isi form konsultasi.`)}
                    >
                      DAFTAR {program.batch} <PixelArrow color="#FFFFFF" size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 05 // CORPORATE TRAINING ==================== */}
        <section id="corporate-training" className="blackbox-compute-band blackbox-compute-band-alt">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">05 // ENTERPRISE &amp; CAMPUS TALENT TRANSFORMATION</span>
              <dl className="blackbox-strip-facts">
                <div><dt>ORGANISASI:</dt><dd>KORPORASI &amp; PERGURUAN TINGGI</dd></div>
                <div><dt>DEPLOYMENT:</dt><dd>PRIVATE TENANT / ON-PREMISE</dd></div>
                <div><dt>ANALITIK:</dt><dd>C-LEVEL &amp; DEAN DASHBOARD</dd></div>
              </dl>
            </div>

            <h2 className="blackbox-sec-title">
              Pelatihan Terintegrasi untuk Institusi &amp; Industri.
            </h2>
            <p className="blackbox-sec-sub">
              Tingkatkan kapabilitas karyawan atau mahasiswa Anda melalui sistem LMS enterprise berdedikasi dengan kurikulum kustomisasi sesuai kebutuhan bisnis.
            </p>

            <div className="blackbox-grid-3">
              <div className="blackbox-card" style={{ padding: "26px" }}>
                <div className="global-curriculum-icon-wrap" style={{ marginBottom: "14px" }}>
                  <FlatIcon type="strategy" size={24} color="var(--bx-blue)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  Dedicated Private Tenant LMS
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6 }}>
                  Satu tenant terisolasi khusus perusahaan dengan custom domain, branding perusahaan, integrasi SSO (SAML/Okta), dan kontrol data ketat.
                </p>
              </div>

              <div className="blackbox-card" style={{ padding: "26px" }}>
                <div className="global-curriculum-icon-wrap" style={{ marginBottom: "14px" }}>
                  <FlatIcon type="valuation" size={24} color="var(--bx-blue)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  Skill Matrix &amp; Progress Telemetry
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6 }}>
                  Pantau kompetensi tim teknis, legal, dan analis secara real-time. Dapatkan laporan kepatuhan, submission code review, dan SLA kelulusan.
                </p>
              </div>

              <div className="blackbox-card" style={{ padding: "26px" }}>
                <div className="global-curriculum-icon-wrap" style={{ marginBottom: "14px" }}>
                  <FlatIcon type="aigov" size={24} color="var(--bx-blue)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  Mitra Kampus &amp; Konversi SKS
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6 }}>
                  Sinkronisasi kurikulum industri Anvieo dengan mata kuliah universitas untuk program magang, skripsi berbasis proyek, dan pengakuan SKS resmi.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", border: "1px solid var(--bx-border)", background: "var(--bx-surface)", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", margin: 0 }}>
                  Ingin Solusi Kustomisasi untuk Perusahaan atau Universitas Anda?
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", margin: "4px 0 0" }}>
                  Diskusikan kebutuhan pelatihan dan penjadwalan demo sistem bersama Tim Enterprise Anvieo.
                </p>
              </div>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-blue"
                onClick={() => showToast("Permintaan kontak sales diterima. Tim Enterprise akan segera menghubungi Anda.")}
              >
                HUBUNGI SALES ENTERPRISE
                <PixelArrow color="#FFFFFF" size={10} />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== 06 // PROGRAM & BEASISWA ==================== */}
        <section id="program" className="blackbox-compute-band">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">06 // SCHOLARSHIPS &amp; NATIONAL TALENT INITIATIVES</span>
              <dl className="blackbox-strip-facts">
                <div><dt>KOLABORASI:</dt><dd>KEMENTERIAN, BUMN &amp; MULTINASIONAL</dd></div>
                <div><dt>BEASISWA:</dt><dd>100% BEBAS BIAYA</dd></div>
              </dl>
            </div>

            <h2 className="blackbox-sec-title">
              Inisiatif Pendidikan &amp; Akses Talenta Bangsa.
            </h2>
            <p className="blackbox-sec-sub">
              Anvieo berkolaborasi dengan pemerintah dan institusi global menyalurkan beasiswa pendidikan teknologi dan multidisiplin bagi talenta Indonesia.
            </p>

            <div className="blackbox-grid-3">
              <div className="blackbox-card" style={{ padding: "24px" }}>
                <span className="blackbox-card-tag" style={{ position: "static", marginBottom: "12px", display: "inline-block" }}>
                  KAMPUS MERDEKA MSIB
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  Studi Independen Bersertifikat Anvieo
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, marginBottom: "14px" }}>
                  Program intensif 900 jam belajar untuk mahasiswa aktif di seluruh Indonesia dengan konversi penuh hingga 20 SKS akademik resmi.
                </p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-blue)", fontWeight: 700 }}>
                  STATUS: PENDAFTARAN SEMESTER GENAP
                </span>
              </div>

              <div className="blackbox-card" style={{ padding: "24px" }}>
                <span className="blackbox-card-tag" style={{ position: "static", marginBottom: "12px", display: "inline-block" }}>
                  BUMN &amp; ENTERPRISE
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  Digital Talents for Public Infrastructure
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, marginBottom: "14px" }}>
                  Pemberdayaan aparatur dan talenta BUMN dalam menguasai keamanan siber, tata kelola data PDP, dan infrastruktur cloud modern.
                </p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-blue)", fontWeight: 700 }}>
                  STATUS: PROGRAM BERJALAN
                </span>
              </div>

              <div className="blackbox-card" style={{ padding: "24px" }}>
                <span className="blackbox-card-tag" style={{ position: "static", marginBottom: "12px", display: "inline-block" }}>
                  GLOBAL INITIATIVE
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                  AI &amp; Data Ethics Fellowship
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, marginBottom: "14px" }}>
                  Beasiswa riset bagi akademisi dan praktisi muda yang meneliti dampak sosial, ekonomi, dan hukum dari kecerdasan buatan otonom.
                </p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-blue)", fontWeight: 700 }}>
                  STATUS: TERBUKA UNTUK PUBLIK
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 07 // WARTA INDUSTRI & ARTIKEL RISET (INTERACTIVE SLIDER) ==================== */}
        <section id="berita-artikel" className="blackbox-compute-band blackbox-compute-band-alt">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">07 // INDUSTRY DISPATCHES &amp; APPLIED RESEARCH</span>
              <dl className="blackbox-strip-facts">
                <div><dt>PEMBAHARUAN:</dt><dd>EDISI MINGGUAN</dd></div>
                <div><dt>STANDAR:</dt><dd>PEER-REVIEWED</dd></div>
                <div><dt>TOTAL ARTIKEL:</dt><dd>140+ DOKUMEN RISET</dd></div>
              </dl>
            </div>

            <div className="news-slider-header-row">
              <div>
                <h2 className="blackbox-sec-title" style={{ marginBottom: "8px" }}>
                  Warta Industri, Riset Regulasi &amp; Analisis Teknologi Terkini.
                </h2>
                <p className="blackbox-sec-sub" style={{ margin: 0, maxWidth: "780px" }}>
                  Publikasi analisis mendalam dari dewan pengajar dan tim riset Anvieo mengenai evolusi AI, kepatuhan hukum digital, dinamika pasar modal global, dan arsitektur produk skala masif.
                </p>
              </div>

              <div className="marquee-loop-pill">
                <span className="marquee-loop-dot"></span>
                <span>LOOP MARQUEE • HOVER UNTUK JEDA</span>
              </div>
            </div>
          </div>

          {/* Continuous Marquee Loop Viewport (Direction: Right to Left) - FILL WIDTH */}
          <div className="news-marquee-viewport">
            <div className="news-marquee-track">
              {[...ARTICLES_DATA, ...ARTICLES_DATA].map((article, idx) => (
                <article
                  key={`news-loop-${article.id}-${idx}`}
                  className="news-card"
                  onClick={() => {
                    setSelectedArticle(article);
                    setModalType("article");
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedArticle(article);
                      setModalType("article");
                    }
                  }}
                >
                  <div className="news-card-banner">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-card-img"
                      loading="lazy"
                    />
                    <span
                      className="news-card-badge"
                      style={{
                        borderLeft: `3px solid ${article.categoryColor}`
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="news-card-readtime">
                      {article.readTime}
                    </span>
                  </div>

                  <div className="news-card-body">
                    <div className="news-card-meta">
                      <span>{article.date}</span>
                      <span style={{ color: article.categoryColor, fontWeight: 700 }}>
                        PEER-REVIEWED
                      </span>
                    </div>

                    <h3 className="news-card-title">
                      {article.title}
                    </h3>

                    <p className="news-card-excerpt">
                      {article.excerpt}
                    </p>

                    <div className="news-card-footer">
                      <div className="news-author-group">
                        <div
                          className="news-author-avatar"
                          style={{ background: article.categoryColor }}
                        >
                          {article.authorInitial}
                        </div>
                        <div className="news-author-info">
                          <span className="news-author-name">{article.author}</span>
                          <span className="news-author-role">{article.authorRole}</span>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "var(--bx-blue)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                      >
                        BACA <PixelArrow color="var(--bx-blue)" size={9} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Slider Status Bar */}
          <div className="blackbox-frame">
            <div className="news-slider-footer-bar">
              <div className="news-slider-status">
                <span className="news-pulse-dot"></span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--bx-text-meta)" }}>
                  KLIK KARTU ARTIKEL UNTUK MEMBACA NASKAH LENGKAP &bull; LOOP MARQUEE OTOMATIS (ARAH: KANAN KE KIRI)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 03 // VERIFIED ALUMNI IMPACT & PLACEMENT GALLERY ==================== */}
        <section id="alumni" className="blackbox-compute-band">
          <BlackboxRails position="top" />

          <div className="blackbox-frame">
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">03 // VERIFIED ALUMNI IMPACT &amp; PLACEMENT GALLERY</span>
              <dl className="blackbox-strip-facts">
                <div><dt>TINGKAT PENYERAPAN:</dt><dd>94.2% DALAM 90 HARI</dd></div>
                <div><dt>KENAIKAN RATA-RATA GAJI:</dt><dd>+68% POST-GRADUATION</dd></div>
              </dl>
            </div>

            <div className="alumni-gallery-header-row">
              <div>
                <h2 className="blackbox-sec-title">
                  Dampak Nyata Karier &amp; Cerita Inspiratif Alumni.
                </h2>
                <p className="blackbox-sec-sub">
                  Kisah nyata dan rekam jejak lulusan Anvieo Academy yang sukses menembus peran strategis di industri teknologi, perbankan, dan firma hukum terkemuka. Klik kotak alumni untuk membaca cerita inspiratif selengkapnya.
                </p>
              </div>
              <div className="alumni-gallery-meta-pill">
                <span className="alumni-gallery-pulse-dot" style={{ background: "var(--gold)" }}></span>
                <span>MODEL GALERI FOTO • KLIK UNTUK DETAIL INSPIRATIF</span>
              </div>
            </div>

            {/* Asymmetrical Stacked Bento Box Image Gallery - Menempel Seperti Image Gallery */}
            <div className="alumni-gallery-bento-grid">
              {VERIFIED_ALUMNI_IMPACT.map((alumni) => {
                const isFeatured = alumni.gridSpan === "tall"; // Kisah Utama (Fajar Ardiansyah)
                const isWide = alumni.gridSpan === "wide";

                if (isFeatured) {
                  /* Kisah Utama: Satu-satunya yang memiliki kotak putih untuk kontennya */
                  return (
                    <div
                      key={alumni.id}
                      className="alumni-bento-card alumni-card-tall alumni-featured-card"
                      onClick={() => {
                        setSelectedAlumniStory(alumni);
                        setModalType("alumni-story");
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Buka kisah utama ${alumni.name}`}
                    >
                      {/* Featured Media (Tanpa badge kanan atas) */}
                      <div className="alumni-card-media tall-media" style={{ height: "250px", position: "relative", overflow: "hidden" }}>
                        <img
                          src={alumni.image}
                          alt={alumni.name}
                          className="alumni-bento-img"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* Kotak Putih untuk Konten Kisah Utama */}
                      <div
                        className="alumni-card-content tall-content"
                        style={{
                          background: "var(--bx-surface, #FFFFFF)",
                          padding: "24px 22px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <div>
                          {/* Full-fill badges di bawah gambar / atas konten */}
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
                            <span style={{ background: "var(--gold)", color: "#0A0A0C", fontWeight: 800, fontSize: "0.6875rem", padding: "4px 9px", borderRadius: "4px", letterSpacing: "0.04em" }}>
                              ⭐ KISAH UTAMA
                            </span>
                            <span style={{ background: "var(--brand, #0A2E52)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.6875rem", padding: "4px 9px", borderRadius: "4px" }}>
                              {alumni.course}
                            </span>
                            <span style={{ background: "#10B981", color: "#FFFFFF", fontWeight: 700, fontSize: "0.6875rem", padding: "4px 9px", borderRadius: "4px" }}>
                              {alumni.salaryJump}
                            </span>
                          </div>

                          <h3 className="alumni-card-title" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "10px", color: "var(--bx-ink-bright)" }}>
                            {alumni.headline}
                          </h3>

                          <p className="alumni-card-quote" style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--bx-prose-ink)", margin: 0 }}>
                            &ldquo;{alumni.quote}&rdquo;
                          </p>
                        </div>

                        <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--bx-grid)" }}>
                          <div className="alumni-author-row" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                            <div
                              className="alumni-avatar-box"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "var(--gold)",
                                color: "#0A0A0C",
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.8125rem",
                                flexShrink: 0,
                              }}
                            >
                              {alumni.initials}
                            </div>
                            <div className="alumni-author-info">
                              <h4 className="alumni-author-name" style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                                {alumni.name}
                              </h4>
                              <span className="alumni-author-meta" style={{ fontSize: "0.75rem", color: "var(--bx-text-meta)" }}>
                                {alumni.role} · <strong>{alumni.company}</strong>
                              </span>
                            </div>
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.05em" }}>
                              ✓ TERVERIFIKASI
                            </span>
                            <span className="alumni-read-story-btn" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", display: "flex", alignItems: "center", gap: "4px" }}>
                              BACA KISAH LENGKAP →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* Layout Galeri untuk alumni lainnya: Gambar Penuh, Teks di DALAM gambar di bagian bawah, Tanpa badge kanan atas */
                return (
                  <div
                    key={alumni.id}
                    className={`alumni-bento-card ${isWide ? "alumni-card-wide" : "alumni-card-compact"} alumni-gallery-photo-card`}
                    onClick={() => {
                      setSelectedAlumniStory(alumni);
                      setModalType("alumni-story");
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Buka cerita inspiratif ${alumni.name}`}
                    style={{ position: "relative", minHeight: isWide ? "310px" : "330px", height: "100%", overflow: "hidden" }}
                  >
                    {/* Background Image (Covering the entire card) */}
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="alumni-bento-img"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Gradient Scrim Overlay at Bottom (Teks di dalam gambar di bagian bawah) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(to top, rgba(7, 10, 18, 0.96) 0%, rgba(7, 10, 18, 0.8) 55%, rgba(7, 10, 18, 0.15) 85%, transparent 100%)",
                        padding: isWide ? "28px 20px 18px" : "24px 16px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        zIndex: 2,
                      }}
                    >
                      {/* Full-fill badges di simpan di bawah agar terlihat jelas & simpel */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "2px" }}>
                        <span
                          style={{
                            background: "var(--gold)",
                            color: "#0A0A0C",
                            fontWeight: 800,
                            fontSize: "0.6875rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            lineHeight: 1.2,
                          }}
                        >
                          {alumni.course}
                        </span>
                        <span
                          style={{
                            background: "#10B981",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "0.6875rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            lineHeight: 1.2,
                          }}
                        >
                          {alumni.salaryJump}
                        </span>
                      </div>

                      <h4 style={{ color: "#FFFFFF", fontSize: isWide ? "1.125rem" : "1.02rem", fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
                        {alumni.name}
                      </h4>

                      <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.8125rem", margin: 0, lineHeight: 1.35 }}>
                        {alumni.role} · <strong style={{ color: "#FFFFFF" }}>{alumni.company}</strong>
                      </p>

                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "0.75rem",
                          lineHeight: 1.4,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: isWide ? 2 : 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        &ldquo;{alumni.headline}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <SiteFooter />

      {/* ==================== INTERACTIVE MODALS ==================== */}

      {/* 1. Modal Login */}
      {modalType === "login" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "6px", height: "6px", background: "var(--bx-blue)", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-blue)", letterSpacing: "0.08em" }}>
                MASUK KE ANVIEO ACADEMY
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Lanjutkan Perjalanan Belajar
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Masuk untuk mengakses materi kelas, submission tugas reviewer, dan progres sertifikasi Anda.
            </p>

            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="blackbox-form-label">Email Institusi / Pribadi</label>
                <input
                  type="email"
                  className="blackbox-form-input"
                  placeholder="nama@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="blackbox-form-label">Kata Sandi</label>
                <input
                  type="password"
                  className="blackbox-form-input"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="blackbox-pill blackbox-pill-blue"
                style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
              >
                MASUK KE AKUN
                <PixelArrow color="#FFFFFF" size={10} />
              </button>
            </form>

            <div style={{ margin: "20px 0", textAlign: "center", position: "relative" }}>
              <span style={{ background: "var(--bx-surface)", padding: "0 10px", fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>
                ATAU MASUK DENGAN
              </span>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--bx-border)", zIndex: -1 }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                className="blackbox-outline"
                style={{ justifyContent: "center" }}
                onClick={() => handleSocialAuth("Google")}
              >
                Google
              </button>
              <button
                type="button"
                className="blackbox-outline"
                style={{ justifyContent: "center" }}
                onClick={() => handleSocialAuth("GitHub")}
              >
                GitHub
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--bx-text-meta)", marginTop: "20px" }}>
              Belum punya akun?{" "}
              <button
                type="button"
                style={{ color: "var(--bx-blue)", fontWeight: 700 }}
                onClick={() => setModalType("register")}
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 2. Modal Register */}
      {modalType === "register" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "6px", height: "6px", background: "var(--bx-blue)", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-blue)", letterSpacing: "0.08em" }}>
                PENDAFTARAN ANVIEO ACADEMY
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Buka Akses Belajar Anda
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Daftarkan akun gratis untuk memulai alur pembelajaran terstruktur berstandar industri.
            </p>

            <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label className="blackbox-form-label">Nama Lengkap Sesuai KTP / Ijazah</label>
                <input
                  type="text"
                  className="blackbox-form-input"
                  placeholder="Contoh: Budi Santoso"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="blackbox-form-label">Email</label>
                <input
                  type="email"
                  className="blackbox-form-input"
                  placeholder="nama@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="blackbox-form-label">Kata Sandi Baru</label>
                <input
                  type="password"
                  className="blackbox-form-input"
                  placeholder="Minimal 8 karakter kombinasi"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="blackbox-form-label">Minat Disiplin Utama</label>
                <select
                  className="blackbox-form-input"
                  value={regDiscipline}
                  onChange={(e) => setRegDiscipline(e.target.value)}
                  style={{ background: "var(--bx-bg)", cursor: "pointer" }}
                >
                  <option value="tech">Teknologi &amp; Artificial Intelligence</option>
                  <option value="law">Hukum, Cyber Law &amp; Data Privacy</option>
                  <option value="econ">Ekonomi, Keuangan &amp; FinTech</option>
                  <option value="biz">Bisnis &amp; Digital Product Management</option>
                </select>
              </div>

              <button
                type="submit"
                className="blackbox-pill blackbox-pill-blue"
                style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
              >
                BUAT AKUN GRATIS
                <PixelArrow color="#FFFFFF" size={10} />
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--bx-text-meta)", marginTop: "20px" }}>
              Sudah memiliki akun?{" "}
              <button
                type="button"
                style={{ color: "var(--bx-blue)", fontWeight: 700 }}
                onClick={() => setModalType("login")}
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 3. Modal Course Detail Drawer with Flat SVG Icon */}
      {modalType === "course" && selectedCourse && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="blackbox-card-tag" style={{ position: "static" }}>{selectedCourse.code}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--bx-blue)", fontWeight: 700 }}>
                {selectedCourse.disciplineTag}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div className="global-curriculum-icon-wrap" style={{ width: "36px", height: "36px", margin: 0 }}>
                <FlatIcon type={selectedCourse.flatIconType} size={20} color="var(--bx-blue)" />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", margin: 0 }}>
                  {selectedCourse.title}
                </h3>
              </div>
            </div>

            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--bx-text-meta)", display: "block", marginBottom: "14px" }}>
              {selectedCourse.category}
            </span>

            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, marginBottom: "18px" }}>
              {selectedCourse.desc}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", background: "var(--bx-bg)", padding: "10px 12px", border: "1px solid var(--bx-border)", marginBottom: "20px" }}>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--bx-text-meta)" }}>TINGKAT KEAHLIAN</span>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink)" }}>{selectedCourse.level}</div>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--bx-text-meta)" }}>ESTIMASI DURASI</span>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink)" }}>{selectedCourse.duration}</div>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--bx-text-meta)" }}>SLA REVIEW</span>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-blue)" }}>&lt; 12 Jam Kerja</div>
              </div>
            </div>

            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", marginBottom: "8px" }}>
              SILABUS &amp; MODUL PEMBELAJARAN
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
              {selectedCourse.syllabus.map((syl, idx) => (
                <div key={idx} style={{ padding: "6px 10px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", fontSize: "0.78125rem", color: "var(--bx-prose-ink)" }}>
                  {syl}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-blue"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={handleEnrollCourse}
              >
                DAFTAR KE KELAS INI SEKARANG
                <PixelArrow color="#FFFFFF" size={10} />
              </button>
              <button
                type="button"
                className="blackbox-outline"
                onClick={() => setModalType(null)}
              >
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Aktivasi Token */}
      {modalType === "token" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "480px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "6px", height: "6px", background: "var(--bx-blue)", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-blue)", letterSpacing: "0.08em" }}>
                AKTIVASI TOKEN BELAJAR
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Tukarkan Token / Voucher
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Masukkan kode token yang Anda dapatkan dari program beasiswa, kampus, atau voucher korporasi untuk membuka akses kelas secara instan.
            </p>

            <form onSubmit={handleTokenActivation} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="blackbox-form-label">Kode Token Belajar</label>
                <input
                  type="text"
                  className="blackbox-form-input"
                  placeholder="Contoh: ANV-AWS-2026-X79K"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
                  required
                />
              </div>

              <div style={{ padding: "10px 12px", background: "var(--bx-bg)", border: "1px dashed var(--bx-border)", fontSize: "0.75rem", color: "var(--bx-text-meta)" }}>
                <FlatIcon type="ticket" size={13} color="var(--gold)" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />Token belajar memberikan akses penuh langganan atau kelas spesifik sesuai paket penugasan institusi.
              </div>

              <button
                type="submit"
                className="blackbox-pill blackbox-pill-blue"
                style={{ width: "100%", justifyContent: "center" }}
              >
                AKTIFKAN TOKEN SEKARANG
                <PixelArrow color="#FFFFFF" size={10} />
              </button>

              <div style={{ textAlign: "center", marginTop: "4px" }}>
                <a
                  href="/tokens/activation"
                  style={{ fontSize: "0.8125rem", color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}
                  onClick={() => setModalType(null)}
                >
                  Buka Halaman Aktivasi Token Lengkap →
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Sertifikasi */}
      {modalType === "sertifikasi" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "7px", height: "7px", background: "var(--bx-blue)", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "var(--bx-blue)", letterSpacing: "0.08em" }}>
                ANVIEO GLOBAL CERTIFICATION
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Sertifikasi Kompetensi Industri Terakreditasi
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Dapatkan sertifikasi profesional resmi dengan pengakuan internasional berbasis acuan IEEE, NIST, ISO 27001, dan CFA Institute.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", borderLeft: "3px solid #10B981" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>Certified Backend Architect (ANV-CBA)</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#10B981", fontWeight: 700 }}>STANDAR IEEE</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Validasi perancangan sistem asinkron FastAPI, optimasi pgvector HNSW, dan container microservices.</p>
              </div>

              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", borderLeft: "3px solid #F59E0B" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>Certified Data Privacy &amp; Cyber Law (ANV-CDPS)</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#F59E0B", fontWeight: 700 }}>UU PDP &amp; ISO 27001</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Uji kompetensi kepatuhan privasi data pribadi, audit transaksi elektronik, dan lisensi hak cipta software.</p>
              </div>

              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", borderLeft: "3px solid #06B6D4" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>Certified FinTech Quantitative Analyst (ANV-CFQA)</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#06B6D4", fontWeight: 700 }}>CFA METHODOLOGY</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Pengujian pemodelan 3-statement korporasi, DCF valuation, dan kalkulasi risiko portofolio pasar modal.</p>
              </div>
            </div>

            <button
              type="button"
              className="blackbox-pill blackbox-pill-blue"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setModalType(null);
                showToast("Pendaftaran ujian sertifikasi dibuka. Jadwal asesmen dikirimkan ke email Anda.");
              }}
            >
              DAFTAR UJIAN SERTIFIKASI SEKARANG
              <PixelArrow color="#FFFFFF" size={10} />
            </button>
          </div>
        </div>
      )}

      {/* 6. Modal Hiring Partner */}
      {modalType === "hiring-partner" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "7px", height: "7px", background: "#10B981", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em" }}>
                850+ HIRING PARTNER NETWORK
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Kemitraan Rekrutmen &amp; Penyaluran Kerja
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Lulusan terverifikasi Anvieo terhubung langsung ke bursa rekrutmen prioritas di 850+ korporasi teknologi global, perbankan nasional, dan firma hukum terkemuka.
            </p>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "10px", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 700, color: "var(--bx-blue)" }}>94.2%</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>PENYERAPAN KERJA</div>
              </div>
              <div style={{ padding: "10px", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#10B981" }}>&lt; 45 HARI</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>WAKTU TUNGGU RATA-RATA</div>
              </div>
              <div style={{ padding: "10px", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#F59E0B" }}>2.8X</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>KENAIKAN KOMPENSASI</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.84375rem", color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Teknologi &amp; AI Unicorns
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>GoTo Group, Tokopedia, Traveloka, Blibli, Tiket.com, DANA, Bukalapak.</p>
              </div>

              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.84375rem", color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Perbankan, FinTech &amp; Valuasi
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Bank Mandiri, BCA Digital, Bank Jago, Bibit, Stockbit, Mandiri Sekuritas.</p>
              </div>

              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.84375rem", color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Firma Hukum Korporasi &amp; Konsultan Global
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>HHP Law Firm (Baker McKenzie), Assegaf Hamzah &amp; Partners, PwC Indonesia, EY.</p>
              </div>
            </div>

            <button
              type="button"
              className="blackbox-pill blackbox-pill-blue"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setModalType(null);
                showToast("Portofolio Anda telah disinkronkan ke Talent Directory 850+ Hiring Partner.");
              }}
            >
              AJUKAN PROFIL KE HIRING PARTNER
              <PixelArrow color="#FFFFFF" size={10} />
            </button>
          </div>
        </div>
      )}

      {/* 7. Modal Corporate Social Relationship (CSR) */}
      {modalType === "csr" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "7px", height: "7px", background: "#A855F7", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "#A855F7", letterSpacing: "0.08em" }}>
                ANVIEO IMPACT &amp; CSR INITIATIVE
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Corporate Social Relationship &amp; Kampus Merdeka
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Dedikasi Anvieo untuk inklusi talenta digital di seluruh penjuru tanah air melalui hibah lisensi universitas, beasiswa daerah 3T, dan kemitraan kurikulum nasional.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#A855F7", fontWeight: 700 }}>5.000 KUOTA BEASISWA</span>
                <h4 style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)", margin: "4px 0" }}>
                  Beasiswa Talenta Digital Nusantara (Wilayah 3T)
                </h4>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Akses penuh tanpa biaya ke seluruh kurikulum teknologi dan hukum siber bagi mahasiswa daerah terluar.</p>
              </div>

              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-blue)", fontWeight: 700 }}>74 UNIVERSITAS MITRA</span>
                <h4 style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)", margin: "4px 0" }}>
                  Hibah Kurikulum Terintegrasi &amp; Konversi SKS
                </h4>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Sinkronisasi kurikulum kampus dengan standar industri riil, dapat dikonversi hingga 20 SKS akademik resmi.</p>
              </div>

              <div style={{ padding: "12px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#10B981", fontWeight: 700 }}>EMPOWERMENT INITIATIVE</span>
                <h4 style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)", margin: "4px 0" }}>
                  Women in AI &amp; LegalTech Leadership
                </h4>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Program pendampingan dan mentoring eksklusif bagi perempuan profesional di bidang teknik dan hukum korporasi.</p>
              </div>
            </div>

            <button
              type="button"
              className="blackbox-pill blackbox-pill-blue"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setModalType(null);
                showToast("Formulir kemitraan CSR & kampus berhasil dikirim. Tim Anvieo akan menghubungi dalam 1x24 jam.");
              }}
            >
              AJUKAN KEMITRAAN KAMPUS / CSR
              <PixelArrow color="#FFFFFF" size={10} />
            </button>
          </div>
        </div>
      )}

      {/* 8. Modal Case Study */}
      {modalType === "case-study" && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div className="blackbox-modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "7px", height: "7px", background: "#06B6D4", display: "inline-block" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 700, color: "#06B6D4", letterSpacing: "0.08em" }}>
                INDUSTRY REAL-WORLD CASE STUDIES
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Bedah Studi Kasus Proyek Riil Industri
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", marginBottom: "20px" }}>
              Tingkatkan kapabilitas pemecahan masalah kompleks dengan membedah blueprint sistem, kontrak transaksi, dan pemodelan finansial dari kasus industri nyata.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>CS-01 // High-Throughput Payment Engine</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#10B981", fontWeight: 700 }}>50K TPS SCALE</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Arsitektur backend asinkron Python FastAPI, caching Redis cluster, dan indeks vektor semantik untuk deteksi fraud realtime.</p>
              </div>

              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>CS-02 // Audit Kepatuhan UU PDP &amp; GDPR</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#F59E0B", fontWeight: 700 }}>BANKING COMPLIANCE</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Penyusunan Data Protection Impact Assessment (DPIA) dan klausul retensi data pada ekosistem Open Banking API perbankan.</p>
              </div>

              <div style={{ padding: "14px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>CS-03 // Valuasi FinTech M&amp;A US$ 120M</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#06B6D4", fontWeight: 700 }}>M&amp;A ADVISORY</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--bx-prose-ink)", margin: 0 }}>Pemodelan keuangan dinamis 3-statement, simulasi Monte Carlo, dan analisis sensitivitas valuasi merger startup regional.</p>
              </div>
            </div>

            <button
              type="button"
              className="blackbox-pill blackbox-pill-blue"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setModalType(null);
                showToast("Kertas kerja studi kasus teknis & legal berhasil dibuka di panel pembelajaran Anda.");
              }}
            >
              EKSPLORASI SELURUH STUDI KASUS RIIL
              <PixelArrow color="#FFFFFF" size={10} />
            </button>
          </div>
        </div>
      )}

      {/* 9. Modal Article Detail Reader */}
      {modalType === "article" && selectedArticle && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div
            className="blackbox-modal-card"
            style={{ maxWidth: "780px", maxHeight: "90vh", overflowY: "auto", padding: "0" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div style={{ position: "relative", width: "100%", height: "260px", background: "var(--bx-surface-card)", borderBottom: "1px solid var(--bx-border)", overflow: "hidden" }}>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                className="blackbox-modal-close"
                style={{ top: "14px", right: "14px", background: "rgba(0,0,0,0.65)", color: "#FFFFFF", zIndex: 10 }}
                onClick={() => setModalType(null)}
                aria-label="Tutup"
              >
                ×
              </button>
              <div style={{ position: "absolute", bottom: "16px", left: "20px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-xs)",
                    background: selectedArticle.categoryColor,
                    color: "#FFFFFF",
                    letterSpacing: "0.08em",
                  }}
                >
                  {selectedArticle.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-xs)",
                    background: "rgba(0,0,0,0.75)",
                    color: "#E2E8F0",
                  }}
                >
                  {selectedArticle.readTime} &bull; {selectedArticle.date}
                </span>
              </div>
            </div>

            <div style={{ padding: "28px 32px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bx-ink-bright)", lineHeight: 1.35, marginBottom: "16px" }}>
                {selectedArticle.title}
              </h2>

              {/* Author info group */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", borderRadius: "var(--radius-xs)", marginBottom: "24px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-xs)", background: selectedArticle.categoryColor, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9375rem" }}>
                  {selectedArticle.authorInitial}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    {selectedArticle.author}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-text-meta)" }}>
                    {selectedArticle.authorRole} &bull; Dewan Riset Industri Anvieo Academy
                  </div>
                </div>
              </div>

              {/* Article Lead Excerpt */}
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, fontWeight: 500, color: "var(--bx-ink-bright)", borderLeft: `3px solid ${selectedArticle.categoryColor}`, paddingLeft: "16px", marginBottom: "24px", fontStyle: "italic" }}>
                {selectedArticle.content.lead}
              </p>

              {/* Article Content Sections */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px", color: "var(--bx-prose-ink)", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {selectedArticle.content.sections.map((sec, sIdx) => (
                  <div key={sIdx} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "4px 0 0" }}>
                      {sec.subheading}
                    </h3>
                    {sec.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} style={{ margin: 0 }}>
                        {para}
                      </p>
                    ))}
                    {sec.highlight && (
                      <div style={{ padding: "14px 18px", background: selectedArticle.categoryBg, border: `1px solid ${selectedArticle.categoryColor}50`, borderRadius: "var(--radius-xs)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--bx-ink-bright)", margin: "8px 0" }}>
                        <strong>[CATATAN TEKNIS]:</strong> {sec.highlight}
                      </div>
                    )}
                  </div>
                ))}

                {/* Key Takeaways */}
                <div style={{ marginTop: "12px", padding: "18px 20px", background: "var(--bx-surface-card)", border: "1px solid var(--bx-border)", borderRadius: "var(--radius-xs)" }}>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", margin: "0 0 10px 0" }}>
                    Poin Kunci &amp; Implikasi Industri:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8125rem" }}>
                    {selectedArticle.content.takeaways.map((item, tIdx) => (
                      <li key={tIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div style={{ marginTop: "28px", paddingTop: "18px", borderTop: "1px solid var(--bx-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <button
                  type="button"
                  className="blackbox-outline"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast("Tautan artikel riset berhasil disalin ke clipboard!");
                  }}
                >
                  BAGIKAN ARTIKEL
                </button>

                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-blue"
                  onClick={() => {
                    setModalType(null);
                    showToast("Terima kasih telah membaca riset Anvieo. Eksplorasi materi kurikulum terkait di katalog kelas.");
                  }}
                >
                  TUTUP ARTIKEL
                  <PixelArrow color="#FFFFFF" size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Modal Alumni Inspiring Story Detail Reader */}
      {modalType === "alumni-story" && selectedAlumniStory && (
        <div className="blackbox-modal-backdrop" onClick={() => setModalType(null)}>
          <div
            className="blackbox-modal-card alumni-story-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Hero Header with Image & Alumni Meta */}
            <div className="alumni-story-modal-hero">
              <button
                type="button"
                className="blackbox-modal-close"
                style={{ top: "14px", right: "14px", zIndex: 10 }}
                onClick={() => setModalType(null)}
                aria-label="Tutup Kisah"
              >
                ×
              </button>

              <div className="alumni-story-hero-media">
                <img
                  src={selectedAlumniStory.image}
                  alt={selectedAlumniStory.name}
                  className="alumni-story-hero-img"
                />
              </div>

              <div className="alumni-story-hero-info">
                <div className="alumni-story-badge-row">
                  <span
                    className="alumni-story-course-badge"
                    style={{
                      background: selectedAlumniStory.accentBg,
                      color: selectedAlumniStory.accentColor,
                      borderColor: selectedAlumniStory.accentColor,
                    }}
                  >
                    {selectedAlumniStory.course}
                  </span>
                  <span className="alumni-story-verified-badge">
                    <FlatIcon type="check" size={12} color="#10B981" />
                    TERVERIFIKASI ANVIEO REGISTRY
                  </span>
                  <span className="alumni-story-credential-tag">
                    {selectedAlumniStory.credentialId}
                  </span>
                </div>

                <h2 className="alumni-story-headline">
                  {selectedAlumniStory.headline}
                </h2>

                <div className="alumni-story-person-meta">
                  <div className="alumni-story-person-name">
                    {selectedAlumniStory.name}
                  </div>
                  <div className="alumni-story-person-role">
                    <span style={{ color: selectedAlumniStory.accentColor, fontWeight: 700 }}>
                      {selectedAlumniStory.role}
                    </span>
                    <span className="alumni-meta-dot">•</span>
                    <span>{selectedAlumniStory.company}</span>
                    <span className="alumni-meta-dot">•</span>
                    <span>{selectedAlumniStory.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="alumni-story-metrics-strip">
              <div className="alumni-story-metric-cell">
                <span className="alumni-metric-label">KENAIKAN KOMPENSASI</span>
                <div className="alumni-metric-value" style={{ color: "#10B981" }}>
                  {selectedAlumniStory.salaryJump}
                </div>
              </div>
              <div className="alumni-story-metric-cell">
                <span className="alumni-metric-label">PERAN SEBELUMNYA</span>
                <div className="alumni-metric-value" style={{ color: "var(--bx-ink-bright)" }}>
                  {selectedAlumniStory.previousRole}
                </div>
              </div>
              <div className="alumni-story-metric-cell">
                <span className="alumni-metric-label">WAKTU HINGGA DITERIMA</span>
                <div className="alumni-metric-value" style={{ color: "var(--bx-blue)" }}>
                  {selectedAlumniStory.timeToHired}
                </div>
              </div>
              <div className="alumni-story-metric-cell">
                <span className="alumni-metric-label">STANDAR KELULUSAN</span>
                <div className="alumni-metric-value" style={{ color: "var(--gold)" }}>
                  IEEE &amp; ISO 27001
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="alumni-story-body">
              {/* Testimonial Pull-Quote */}
              <blockquote
                className="alumni-story-pullquote"
                style={{ borderLeftColor: selectedAlumniStory.accentColor }}
              >
                &quot;{selectedAlumniStory.quote}&quot;
              </blockquote>

              {/* Story Narrative Sections */}
              <div className="alumni-story-sections">
                {/* Chapter 1: Latar Belakang */}
                <div className="alumni-story-section">
                  <h3 className="alumni-story-subheading">
                    <FlatIcon type="user" size={16} color="var(--bx-blue)" />
                    1. Latar Belakang &amp; Tantangan Awal
                  </h3>
                  <p>{selectedAlumniStory.inspirationalStory.background}</p>
                </div>

                {/* Chapter 2: Titik Balik & Reviewer */}
                <div className="alumni-story-section">
                  <h3 className="alumni-story-subheading">
                    <FlatIcon type="ai" size={16} color="var(--gold)" />
                    2. Titik Balik &amp; Disiplin Code Review Tanpa Kompromi
                  </h3>
                  <p>{selectedAlumniStory.inspirationalStory.turningPoint}</p>
                  <div
                    className="alumni-story-callout"
                    style={{
                      background: selectedAlumniStory.accentBg,
                      borderColor: selectedAlumniStory.accentColor,
                    }}
                  >
                    <strong>[DISIPLIN REVIEWER ANVIEO]:</strong> {selectedAlumniStory.inspirationalStory.reviewerSLAExperience}
                  </div>
                </div>

                {/* Chapter 3: Capstone Project */}
                <div className="alumni-story-section">
                  <h3 className="alumni-story-subheading">
                    <FlatIcon type="strategy" size={16} color="#10B981" />
                    3. Capstone Project Standar Produksi yang Diakui Industri
                  </h3>
                  <div className="alumni-capstone-card">
                    <div>
                      <span className="alumni-capstone-badge">PROYEK PORTOFOLIO AKHIR TERUJI</span>
                      <h4 className="alumni-capstone-title">{selectedAlumniStory.capstoneProject.title}</h4>
                    </div>
                    <p className="alumni-capstone-desc">{selectedAlumniStory.capstoneProject.desc}</p>
                    <div className="alumni-capstone-techs">
                      <span className="alumni-tech-label">Tech Stack &amp; Tools:</span>
                      {selectedAlumniStory.capstoneProject.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="alumni-tech-chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chapter 4: Rekrutmen & Karier */}
                <div className="alumni-story-section">
                  <h3 className="alumni-story-subheading">
                    <FlatIcon type="aigov" size={16} color="var(--bx-blue)" />
                    4. Rekrutmen &amp; Lompatan Karier Nyata
                  </h3>
                  <p>{selectedAlumniStory.inspirationalStory.careerBreakthrough}</p>
                </div>

                {/* Chapter 5: Pesan Inspiratif */}
                <div className="alumni-story-section">
                  <h3 className="alumni-story-subheading">
                    <FlatIcon type="check" size={16} color="var(--gold)" />
                    5. Pesan Inspiratif untuk Siswa &amp; Profesional Muda
                  </h3>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "var(--bx-ink-bright)",
                      background: "var(--bx-bg)",
                      padding: "14px 16px",
                      border: "1px dashed var(--bx-border)",
                    }}
                  >
                    &quot;{selectedAlumniStory.inspirationalStory.quoteBanner}&quot;
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="alumni-story-skills-block">
                <span className="alumni-skills-title">Keahlian Utama yang Dikuasai:</span>
                <div className="alumni-skills-pills">
                  {selectedAlumniStory.keySkills.map((skill, sIdx) => (
                    <span key={sIdx} className="alumni-skill-pill">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="alumni-story-modal-footer">
                <div>
                  <button
                    type="button"
                    className="blackbox-outline"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      showToast(`Tautan kisah inspiratif ${selectedAlumniStory.name} berhasil disalin!`);
                    }}
                  >
                    BAGIKAN CERITA
                  </button>
                </div>

                <div className="alumni-story-footer-right">
                  <a
                    href="/learningpaths/65"
                    className="blackbox-pill blackbox-pill-blue"
                    onClick={() => setModalType(null)}
                  >
                    JELAJAHI ALUR BELAJAR TERKAIT
                    <PixelArrow color="#FFFFFF" size={10} />
                  </a>

                  <button
                    type="button"
                    className="blackbox-outline"
                    onClick={() => setModalType(null)}
                  >
                    TUTUP CERITA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOAST NOTIFICATION ==================== */}
      {toastMessage && (
        <div className="blackbox-toast-container">
          <div className="blackbox-toast">
            <span style={{ color: "var(--bx-blue)", fontWeight: 900 }}>[INFO]</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
