"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface CaseStudy {
  id: string;
  category: "concurrency" | "ai" | "fintech" | "security";
  categoryLabel: string;
  title: string;
  subtitle: string;
  clientType: string;
  metrics: { label: string; value: string }[];
  problem: string;
  architectureSolution: string[];
  techStack: string[];
  outcomes: string[];
  architectureSnippet: {
    type: string;
    code: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-concurrency",
    category: "concurrency",
    categoryLabel: "High-Load & Concurrency",
    title: "E-Commerce Flash Sale Concurrency & Inventory Rescue",
    subtitle: "Mitigasi race condition dan bottleneck basis data relasional pada lonjakan 120.000 QPS belanja nasional.",
    clientType: "Tier-1 Indonesian E-Commerce Ecosystem",
    metrics: [
      { label: "Peak Concurrency", value: "120K+ QPS" },
      { label: "Transaction Drift", value: "0 ms" },
      { label: "DB Connection Drops", value: "0 Incident" },
      { label: "Throughput Boost", value: "+340%" },
    ],
    problem:
      "Saat event promo nasional 11.11, sistem inventori mengalami row-level locking deadlock pada tabel stock PostgreSQL akibat 80.000 permintaan pemesanan masuk dalam rentang 3 detik. Connection pool database habis dan transaksi mengalami timeout masif hingga menyebabkan overselling produk.",
    architectureSolution: [
      "Implementasi Redis Token Bucket Rate Limiter berbasis atomic Lua Script di gateway ingress.",
      "Desain Async Order Ingestion Queue menggunakan RabbitMQ dengan FIFO ordering dan Idempotency Keys unik per cart session.",
      "Pemisahan transaksi write dengan PostgreSQL Hash Partitioning pada tabel order line-items dan pgBouncer connection multiplexing.",
      "Optimistic locking dengan versioning counter pada level database cache, menihilkan locking blocking pada baris tabel.",
    ],
    techStack: ["PostgreSQL 16", "Redis Enterprise", "Go / Gin Engine", "RabbitMQ Cluster", "pgBouncer", "Kubernetes"],
    outcomes: [
      "120.000 QPS berhasil diproses tanpa satu pun order collision atau overselling inventori.",
      "Response time checkout p99 terpangkas dari 4.8 detik menjadi 185 milidetik.",
      "Beban koneksi langsung ke master database turun 78% melalui multiplexing connection pooling.",
    ],
    architectureSnippet: {
      type: "Redis Lua Atomic Decrement",
      code: `-- Atomic Inventory Reservation in Redis Lua
local key = KEYS[1]
local requested = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current >= requested then
    redis.call('decrby', key, requested)
    return 1 -- SUCCESS: Stock reserved
else
    return 0 -- FAILED: Out of stock
end`,
    },
  },
  {
    id: "cs-ai-rag",
    category: "ai",
    categoryLabel: "AI Agent & RAG Pipeline",
    title: "Multi-Sector Financial Real-Time News & Sentiment RAG Pipeline",
    subtitle: "Arsitektur hybrid retrieval berbasis dense pgvector dan sparse BM25 untuk analisis emiten BEI sub-detik.",
    clientType: "Institutional Market Intelligence & Equity Research Firm",
    metrics: [
      { label: "End-to-End Latency", value: "450 ms" },
      { label: "Factual Accuracy", value: "99.4%" },
      { label: "Daily Data Ingestion", value: "500+ Reports" },
      { label: "Analyst Time Saved", value: "6.8x" },
    ],
    problem:
      "Tim analis pasar modal harus membaca 500+ dokumen keterbukaan informasi emiten IDX harian dan laporan keuangan auditan PDF. Solusi LLM konvensional sering mengalami halusinasi fatal pada pembacaan angka rasio keuangan (PER, PBV, DER) dan lambat dalam menyajikan rekomendasi aksi pasar.",
    architectureSolution: [
      "Pipeline Hybrid Search menggabungkan pgvector HNSW indexing (dense cosine similarity) dan PostgreSQL pg_trgm / tsvector (sparse lexical search).",
      "Multi-Agent Verification Pipeline: Orchestrator mengurai pertanyaan, Fact-Checker memverifikasi kutipan terhadap raw PDF, dan Financial Auditor memvalidasi rumus rasio sebelum output dikirim.",
      "Streaming Response melalui Server-Sent Events (SSE) dengan chunking berbasis Recursive Character Splitter dan semantic boundary detection.",
      "Credit-Shield Multi-Tier Caching di Redis untuk meminimalkan redundansi panggilan API eksternal.",
    ],
    techStack: ["Python FastAPI", "PostgreSQL pgvector (HNSW)", "Gemma 2 / Hermes Agent", "LiteLLM Router", "Redis Cache", "Celery Workers"],
    outcomes: [
      "Waktu pembuatan morning market briefing komprehensif terpangkas dari 3 jam kerja analis menjadi 4 menit.",
      "Akurasi verifikasi angka laporan keuangan mencapai 99.4% tanpa satupun temuan halusinasi kritis.",
      "Penghematan biaya token inferensi LLM sebesar 64% berkat semantic caching pada pertanyaan serupa.",
    ],
    architectureSnippet: {
      type: "PostgreSQL pgvector HNSW Query",
      code: `-- Hybrid Vector & Text Retrieval in PostgreSQL
SELECT 
    d.id, 
    d.ticker, 
    d.chunk_content, 
    (1 - (d.embedding <=> :query_embedding)) AS similarity_score
FROM financial_filings_chunks d
WHERE d.sector = 'BANKING'
  AND d.doc_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY d.embedding <=> :query_embedding ASC
LIMIT 5;`,
    },
  },
  {
    id: "cs-fintech",
    category: "fintech",
    categoryLabel: "Fintech & Core Banking",
    title: "Tier-1 Commercial Bank Core Microservices Zero-Downtime Migration",
    subtitle: "Dekomposisi legacy monolithic mainframe menjadi arsitektur cloud-native event-driven tanpa jeda layanan.",
    clientType: "National Digital Commercial Bank",
    metrics: [
      { label: "Service Downtime", value: "0 Detik" },
      { label: "Daily Volume", value: "45M+ Transaksi" },
      { label: "Data Parity", value: "100.00%" },
      { label: "Feature Velocity", value: "6x Faster" },
    ],
    problem:
      "Sistem perbankan inti monolith peninggalan 14 tahun yang lalu memiliki ketergantungan erat antar-modul. Perubahan kecil pada modul transfer QRIS sering memicu regresi pada sistem ledger rekening koran, sementara regulasi BI menuntut ketersediaan sistem 99.99% tanpa downtime perawatan terjadwal.",
    architectureSolution: [
      "Penerapan Strangler Fig Pattern: Modul transaksi baru diarahkan ke microservices baru secara bertahap via API Gateway.",
      "Dual-Write & Change Data Capture (CDC) menggunakan Debezium dan Apache Kafka untuk menyinkronkan data antar database lama dan baru secara paralel.",
      "Shadow Traffic Verification: 100% request produksi diduplikasi ke microservice baru secara read-only untuk membandingkan output data parity sebelum cutover.",
      "Canary Deployment pada Istio Service Mesh di Kubernetes dengan automatic rollback saat error rate melampaui ambang batas 0.01%.",
    ],
    techStack: ["Java Quarkus", "Apache Kafka", "Debezium CDC", "PostgreSQL Aurora", "Kubernetes", "Istio Mesh", "Prometheus & Grafana"],
    outcomes: [
      "Migrasi 12 modul perbankan inti berhasil dituntaskan dalam 8 bulan dengan 0 detik downtime layanan nasabah.",
      "SLA ketersediaan sistem transaksi BI-FAST dan QRIS meningkat menjadi 99.995%.",
      "Siklus rilis inovasi produk baru dipercepat dari 3 bulan per deployment menjadi 2 minggu per sprint.",
    ],
    architectureSnippet: {
      type: "Kafka CDC Stream Event",
      code: `// Banking Ledger Event Envelope for Kafka
{
  "eventId": "evt_78fa9b12-9c44",
  "eventType": "ACCOUNT_DEBIT_COMMITTED",
  "aggregateId": "ACC-098234-IDR",
  "amount": 2500000,
  "currency": "IDR",
  "referenceId": "QRIS-20261026-0091",
  "timestamp": 1729928400000,
  "idempotencyKey": "idem_8823bfa99021",
  "checksum": "sha256_b738e4a9091..."
}`,
    },
  },
  {
    id: "cs-security",
    category: "security",
    categoryLabel: "Cyber Security & PDP Audit",
    title: "Multi-Tenant Enterprise SaaS ERP PDP Compliance & Security Lockdown",
    subtitle: "Isolasi data tenant tingkat schema, enkripsi data pribadi sesuai UU No. 27/2022, dan jejak audit kriptografis.",
    clientType: "Enterprise SaaS Provider & Device Repair Network",
    metrics: [
      { label: "Regulatory Compliance", value: "UU PDP 100%" },
      { label: "Tenant Isolation", value: "Strict Schema" },
      { label: "Audit Log Tampering", value: "0% Vulnerable" },
      { label: "Forensic Clearance", value: "Certified Tier-1" },
    ],
    problem:
      "Platform SaaS ERP mengelola ribuan data identitas pelanggan servis elektronik di puluhan cabang. Terjadi risiko kebocoran data silang (cross-tenant data leakage) dan urgensi hukum untuk memenuhi amanat Undang-Undang Perlindungan Data Pribadi (UU No. 27/2022) dengan ancaman sanksi pidana dan denda administratif.",
    architectureSolution: [
      "Isolasi Basis Data Multi-Tenant menggunakan Schema-per-Tenant di PostgreSQL dengan Row-Level Security (RLS) terpasang di level session connection.",
      "Enkripsi Data Pribadi (PII) at-rest menggunakan algoritma AES-256 GCM dengan rotasi kunci otomatis di HashiCorp Vault.",
      "Audit Trail Kriptografis: Setiap mutasi data dicatat dalam immutable log bertaut SHA-256 (hash chaining) yang tidak dapat dimanipulasi oleh administrator basis data sekalipun.",
      "Preservasi Bukti Digital & SOP Isolasi Server Darurat sesuai kaidah pembuktian UU ITE dan regulasi forensik.",
    ],
    techStack: ["PostgreSQL RLS", "FastAPI Secure Middleware", "Next.js 16", "HashiCorp Vault KMS", "MinIO Encrypted S3", "Docker Hardened"],
    outcomes: [
      "Sistem meraih sertifikasi kelayakan audit kepatuhan UU PDP dan standar ISO/IEC 27001.",
      "Zero cross-tenant leak vulnerability terkonfirmasi dalam penetration testing independen pihak ketiga.",
      "Kecepatan penelusuran forensik insiden berkurang dari beberapa hari menjadi hitungan menit via hash log explorer.",
    ],
    architectureSnippet: {
      type: "PostgreSQL Row-Level Security Policy",
      code: `-- Enforce Multi-Tenant Isolation via PostgreSQL RLS
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON service_orders
    AS RESTRICTIVE
    USING (tenant_id = current_setting('app.current_tenant_id', true))
    WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));

-- Session variable set securely by middleware:
-- SET LOCAL app.current_tenant_id = 'tenant_pixel_jaya';`,
    },
  },
  {
    id: "cs-bandarmology",
    category: "fintech",
    categoryLabel: "Fintech & Core Banking",
    title: "Low-Latency Algorithmic Trading Broker Summary Matrix",
    subtitle: "Akselerasi kalkulasi matriks akumulasi dan distribusi bandar dari 8.2 detik menjadi 42 milidetik via ClickHouse.",
    clientType: "Proprietary Trading Firm & FinTech Investment Analytics",
    metrics: [
      { label: "Query Latency", value: "8.2s -> 42ms" },
      { label: "Daily Trade Ticks", value: "10M+ Ticks" },
      { label: "Rendering Performance", value: "60 FPS Canvas" },
      { label: "Query Cost Cut", value: "91%" },
    ],
    problem:
      "Pengguna aplikasi membutuhkan agregasi transaksi broker summary penutupan bursa pukul 16:00 WIB untuk 900+ emiten secara instan. Database relasional row-based memerlukan waktu lebih dari 8 detik untuk melakukan aggregasi group-by pada 10 juta baris transaksi harian, menyebabkan lag antarmuka.",
    architectureSolution: [
      "Migrasi data transaksi time-series ke basis data kolom ClickHouse dengan engine AggregatingMergeTree.",
      "Penyimpanan pre-aggregated materialized views untuk kombinasi kode broker buyer/seller, volume lot, dan nilai transaksi per emiten.",
      "Distribusi data real-time ke web client menggunakan WebSocket binary stream terkompresi dengan Protobuf.",
      "Visualisasi interaktif peta bubble bandarmology menggunakan HTML5 Canvas performa tinggi tanpa manipulasi DOM berlebih.",
    ],
    techStack: ["ClickHouse", "Rust Ingestion Engine", "WebSocket (Protobuf)", "Redis Stack", "React Canvas Visualizer"],
    outcomes: [
      "Latensi agregasi data broker summary terpangkas sebesar 99.5% dari 8.2 detik menjadi 42 milidetik.",
      "Kemampuan melayani 25.000 concurrent trader secara bersamaan pada jam puncak penutupan pasar bursa.",
      "Pengurangan biaya server basis data hingga 91% berkat efisiensi kompresi columnar storage 1:6.",
    ],
    architectureSnippet: {
      type: "ClickHouse Columnar Aggregation",
      code: `-- ClickHouse Pre-aggregated Broker Summary
CREATE MATERIALIZED VIEW mv_broker_summary
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(trade_date)
ORDER BY (ticker, broker_code, trade_date)
AS SELECT
    trade_date,
    ticker,
    buyer_code AS broker_code,
    sumState(lot_volume) AS total_lots,
    sumState(trade_val) AS total_value
FROM raw_trade_feed
GROUP BY trade_date, ticker, buyer_code;`,
    },
  },
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Discovery & Root Cause Forensic",
    tagline: "Profiling Beban & Bottleneck Nyata",
    desc: "Kami tidak menduga-duga. Kami menempatkan distributed tracing (OpenTelemetry), flamegraph CPU/memory, dan benchmark query log untuk mengidentifikasi bottleneck sesungguhnya pada sistem produksi Anda.",
    deliverables: ["Diagnostic Flamegraphs", "Architecture Gap Matrix", "SLA Baseline Measurement"],
  },
  {
    step: "02",
    title: "Architectural Blueprint & RFC",
    tagline: "Rancangan Solusi Tervalidasi Standar Global",
    desc: "Menyusun Software Architecture Document (SAD) formal menggunakan framework C4 model. Mendefinisikan kontrak API yang idempoten, skema isolasi data, dan rencana mitigasi kegagalan sebelum baris kode pertama ditulis.",
    deliverables: ["C4 Model Blueprint", "Database Partitioning Strategy", "RFC Peer-Review Dossier"],
  },
  {
    step: "03",
    title: "Chaos Engineering & Load Stress Testing",
    tagline: "Verifikasi Ketahanan di Ambang Batas Ekstrem",
    desc: "Menguji sistem pada beban 3x lipat dari target kapasitas menggunakan k6 distributed testing. Mensimulasikan network latency, kill node acak, dan memory exhaustion untuk memastikan mekanisme failover berfungsi tanpa kehilangan data.",
    deliverables: ["k6 Load Testing Report", "Zero-Data-Loss Verification", "Automated Fallback Trigger"],
  },
  {
    step: "04",
    title: "Zero-Downtime Cutover & Knowledge Transfer",
    tagline: "Transisi Mulus & Pemberdayaan Tim Internal",
    desc: "Eksekusi cutover menggunakan canary deployment dengan automated health check. Menyediakan dokumentasi Diátaxis lengkap dan runbook operasi agar tim rekayasa klien mandiri mengelola sistem seterusnya.",
    deliverables: ["Canary Cutover Verification", "Operations Runbook SOP", "Hands-on Engineering Workshop"],
  },
];

const CLIENT_TESTIMONIALS = [
  {
    quote:
      "“Penyelesaian bottleneck konkurensi oleh tim arsitek ANVIEO menyelamatkan event belanja tahunan kami. Peningkatan throughput 340% dicapai tanpa perlu membengkakkan tagihan cloud kami secara berlebihan.”",
    author: "Hendrawan Kusuma",
    role: "VP of Engineering",
    company: "Tier-1 Retail & E-Commerce Network",
  },
  {
    quote:
      "“Pipeline RAG berbasis hybrid search pgvector yang dirancang memberikan lompatan luar biasa bagi tim analis kami. Akurasi data laporan keuangan 99.4% memberikan rasa tenang dan keunggulan kompetitif yang masif.”",
    author: "Bambang Wicaksono",
    role: "Chief Investment Strategist",
    company: "Capital Market Intelligence Advisory",
  },
  {
    quote:
      "“Proses audit kepatuhan UU PDP dan isolasi database multi-tenant dieksekusi dengan standar industri perbankan. Rancangan audit log kriptografis membuat kami percaya diri menghadapi audit otoritas.”",
    author: "Elvira Maharani, S.H.",
    role: "Head of Legal & Data Governance",
    company: "SaaS Enterprise Group",
  },
];

export default function CaseStudyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    domain: "concurrency",
    qpsTarget: "",
    challengeSummary: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredCases =
    selectedCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <SiteHeader activeTabOverride="others" />

      <main className="blackbox-page" style={{ paddingTop: "64px" }}>
        {/* Breadcrumb Navigation Rail */}
        <section style={{ borderBottom: "1px solid var(--bx-grid)", padding: "14px 0", background: "var(--bx-bg)" }}>
          <div className="blackbox-frame">
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem" }}>
              <Link href="/" style={{ color: "var(--bx-ink-faint)", textDecoration: "none" }}>
                BERANDA
              </Link>
              <span style={{ color: "var(--bx-grid)" }}>/</span>
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>CASE STUDY &amp; SYSTEM ARCHITECTURE</span>
            </nav>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* HERO SECTION */}
        <section
          style={{
            padding: "60px 0 50px",
            background: "var(--bx-bg)",
            position: "relative",
            borderBottom: "1px solid var(--bx-border)",
          }}
        >
          <div className="blackbox-frame">
            <div style={{ maxWidth: "900px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  border: "1px solid var(--gold)",
                  borderRadius: "2px",
                  marginBottom: "20px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "var(--gold)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                <FlatIcon type="terminal" size={14} color="var(--gold)" />
                01 // REAL-WORLD ENGINEERING CASE STUDIES
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 3.8vw, 3.1rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--bx-ink-bright)",
                  marginBottom: "20px",
                }}
              >
                Bedah Kasus Rekayasa Perangkat Lunak &amp; Sistem Skala Industri
              </h1>

              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--bx-ink-soft)",
                  marginBottom: "36px",
                  maxWidth: "820px",
                }}
              >
                Eksplorasi blueprint arsitektur produksi, penanganan konkurensi ekstrem, pipeline AI agent tanpa
                halusinasi, migrasi perbankan tanpa downtime, hingga tata kelola keamanan sesuai UU Perlindungan Data
                Pribadi (UU PDP). Semua diuji dan beroperasi di dunia nyata.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a
                  href="#cases-grid"
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ textDecoration: "none" }}
                >
                  JELAJAHI STUDI KASUS PRODUKSI ↓
                </a>
                <a
                  href="#methodology"
                  className="blackbox-pill blackbox-pill-black"
                  style={{ textDecoration: "none" }}
                >
                  METODOLOGI ARSITEKTUR 4 TAHAP →
                </a>
              </div>
            </div>

            {/* Metrics Dashboard Rail */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1px",
                background: "var(--bx-grid)",
                border: "1px solid var(--bx-grid)",
                marginTop: "48px",
              }}
            >
              {[
                { number: "120K+ QPS", label: "Peak Concurrency Handled", sub: "Bebas Deadlock Transaksi" },
                { number: "99.995%", label: "High-Availability SLA", sub: "Zero-Downtime Migration" },
                { number: "42 ms", label: "Latency Data Aggregation", sub: "Dari 8.2s via ClickHouse" },
                { number: "0 Leak", label: "UU PDP Compliance", sub: "100% Isolasi Data Multi-Tenant" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bx-bg)",
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.875rem",
                      fontWeight: 800,
                      color: "var(--gold)",
                      lineHeight: 1.1,
                      marginBottom: "6px",
                    }}
                  >
                    {item.number}
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", marginTop: "4px" }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION 01: FILTER & PRODUCTION CASE STUDIES */}
        <section id="cases-grid" style={{ padding: "60px 0 70px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>01 // PRODUCTION ARCHITECTURE ARCHIVE</span>
              <span>FILTER BY DOMAIN ENGINEERING</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--bx-ink-bright)",
                    marginBottom: "8px",
                  }}
                >
                  Arsip Proyek &amp; Studi Kasus Rekayasa Nyata
                </h2>
                <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", maxWidth: "680px", margin: 0 }}>
                  Pilih domain arsitektur di bawah untuk melihat rincian tantangan, solusi teknis yang diterapkan,
                  teknologi yang digunakan, serta metrik hasil yang terukur.
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { id: "all", label: "Semua Domain" },
                  { id: "concurrency", label: "Concurrency & High Load" },
                  { id: "ai", label: "AI Agent & RAG" },
                  { id: "fintech", label: "Fintech & Banking" },
                  { id: "security", label: "Security & UU PDP" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: selectedCategory === cat.id ? "var(--bx-ink-bright)" : "transparent",
                      color: selectedCategory === cat.id ? "var(--bx-bg)" : "var(--bx-ink-bright)",
                      border: "1px solid var(--bx-grid)",
                      padding: "8px 14px",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Cards Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {filteredCases.map((cs) => (
                <div
                  key={cs.id}
                  style={{
                    border: "1px solid var(--bx-grid)",
                    background: "var(--bx-card-bg)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Top Metas */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "12px",
                      borderBottom: "1px solid var(--bx-grid)",
                      paddingBottom: "18px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          fontWeight: 700,
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {cs.categoryLabel} // {cs.clientType}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.375rem",
                          fontWeight: 700,
                          color: "var(--bx-ink-bright)",
                          margin: 0,
                        }}
                      >
                        {cs.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalCase(cs)}
                      className="blackbox-pill blackbox-pill-black"
                      style={{ fontSize: "0.75rem", padding: "6px 14px" }}
                    >
                      LIHAT BLUEPRINT LENGKAP →
                    </button>
                  </div>

                  <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "20px" }}>
                    {cs.subtitle}
                  </p>

                  {/* Two-Column Problem & Architecture Overview */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: "24px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(224, 49, 49, 0.04)",
                        border: "1px solid rgba(224, 49, 49, 0.2)",
                        padding: "18px",
                        borderRadius: "2px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <FlatIcon type="alert" size={16} color="var(--red, #e03131)" />
                        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--red, #e03131)", textTransform: "uppercase" }}>
                          Tantangan &amp; Bottleneck Sistem
                        </span>
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6, margin: 0 }}>
                        {cs.problem}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(201, 150, 46, 0.04)",
                        border: "1px solid rgba(201, 150, 46, 0.25)",
                        padding: "18px",
                        borderRadius: "2px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <FlatIcon type="code" size={16} color="var(--gold)" />
                        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase" }}>
                          Solusi Rekayasa &amp; Arsitektur
                        </span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                        {cs.architectureSolution.slice(0, 3).map((sol, sIdx) => (
                          <li key={sIdx} style={{ marginBottom: "6px" }}>
                            {sol}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quantitative Metrics Strip */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                      gap: "1px",
                      background: "var(--bx-grid)",
                      border: "1px solid var(--bx-grid)",
                      marginBottom: "20px",
                    }}
                  >
                    {cs.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          background: "var(--bx-bg)",
                          padding: "12px 14px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textTransform: "uppercase" }}>
                          {m.label}
                        </span>
                        <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--gold)", marginTop: "2px" }}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips & Quick Action */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                      borderTop: "1px solid var(--bx-grid)",
                      paddingTop: "16px",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)", marginRight: "4px" }}>
                        Tech Stack:
                      </span>
                      {cs.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: "0.75rem",
                            background: "transparent",
                            border: "1px solid var(--bx-grid)",
                            padding: "2px 8px",
                            borderRadius: "2px",
                            color: "var(--bx-ink-bright)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalCase(cs)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: 0,
                      }}
                    >
                      Buka Rincian Implementasi &amp; Snippet Arsitektur →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION 02: 4-STAGE ENGINEERING METHODOLOGY */}
        <section id="methodology" style={{ padding: "70px 0", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>02 // ENGINEERING DISCIPLINE</span>
              <span>RIGOROUS 4-STAGE METHODOLOGY</span>
            </div>

            <div style={{ maxWidth: "780px", marginBottom: "40px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  marginBottom: "12px",
                }}
              >
                Metodologi Rekayasa &amp; Tata Kelola Sistem Skala Enterprise
              </h2>
              <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                Setiap arsitektur yang kami rancang tidak dibangun di atas asumsi. Kami menggunakan siklus
                rekayasa terstruktur berbasis data empiris, pengujian ketahanan batas ekstrem, dan dokumentasi formal
                standar IEEE.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {METHODOLOGY_STEPS.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid var(--bx-grid)",
                    background: "var(--bx-card-bg)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "var(--gold)",
                      lineHeight: 1,
                      marginBottom: "10px",
                    }}
                  >
                    PHASE {m.step}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "var(--bx-ink-bright)",
                      marginBottom: "4px",
                    }}
                  >
                    {m.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bx-ink-faint)",
                      marginBottom: "14px",
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {m.tagline}
                  </span>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--bx-ink-soft)",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                      flexGrow: 1,
                    }}
                  >
                    {m.desc}
                  </p>

                  <div style={{ borderTop: "1px solid var(--bx-grid)", paddingTop: "14px" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--gold)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Deliverables Terukur:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "0.75rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                      {m.deliverables.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION 03: CLIENT TESTIMONIALS */}
        <section style={{ padding: "60px 0 70px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>03 // ENTERPRISE VERIFICATION</span>
              <span>EXECUTIVE &amp; ARCHITECT ENDORSEMENTS</span>
            </div>

            <div style={{ maxWidth: "780px", marginBottom: "36px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--bx-ink-bright)",
                  marginBottom: "8px",
                }}
              >
                Pengakuan dari Pimpinan Teknologi &amp; Kepengurusan Bisnis
              </h2>
              <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem" }}>
                Dampak nyata rekayasa perangkat lunak dan keandalan sistem tercermin dari testimoni pimpinan
                organisasi yang bermitra dengan ANVIEO Academy.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {CLIENT_TESTIMONIALS.map((t, tIdx) => (
                <div
                  key={tIdx}
                  style={{
                    border: "1px solid var(--bx-grid)",
                    background: "var(--bx-card-bg)",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "var(--bx-ink-bright)",
                      fontStyle: "italic",
                      marginBottom: "24px",
                    }}
                  >
                    {t.quote}
                  </p>

                  <div style={{ borderTop: "1px solid var(--bx-grid)", paddingTop: "14px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--bx-ink-bright)" }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600 }}>
                      {t.role}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--bx-ink-faint)" }}>
                      {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* SECTION 04: ARCHITECTURE AUDIT & CONSULTATION REQUEST FORM */}
        <section id="consultation-form" style={{ padding: "70px 0 80px", background: "var(--bx-bg)", position: "relative" }}>
          <div className="blackbox-frame">
            <div className="blackbox-section-strip">
              <span>04 // ARCHITECTURE ADVISORY INQUIRY</span>
              <span>SCHEDULE SYSTEM AUDIT &amp; CASE CONSULTATION</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
                alignItems: "start",
              }}
            >
              {/* Left Column Info */}
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.875rem",
                    fontWeight: 700,
                    color: "var(--bx-ink-bright)",
                    marginBottom: "16px",
                  }}
                >
                  Diskusikan Tantangan Arsitektur Sistem Perusahaan Anda
                </h2>

                <p style={{ color: "var(--bx-ink-soft)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "24px" }}>
                  Apakah Anda menghadapi kendala bottleneck transaksi saat peak traffic, ingin membangun pipeline
                  AI Agent RAG yang terverifikasi tanpa halusinasi, atau memerlukan penyesuaian regulasi UU PDP?
                  Tim Chief Architect dan System Analyst kami siap melakukan tinjauan teknis komprehensif.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { title: "Non-Disclosure Agreement (NDA) Dijamin", desc: "Kerahasiaan source code, skema basis data, dan konfigurasi server Anda terikat secara hukum perdata." },
                    { title: "Laporan Audit Komprehensif", desc: "Menerima dokumen evaluasi risiko arsitektur, kalkulasi estimasi QPS, dan rekomendasi mitigasi teknis." },
                    { title: "Direct Architect Engagement", desc: "Konsultasi langsung bersama praktisi engineering yang berpengalaman mengelola sistem jutaan pengguna." },
                  ].map((feat, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ marginTop: "3px", color: "var(--gold)" }}>
                        <FlatIcon type="check" size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                          {feat.title}
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--bx-ink-soft)", lineHeight: 1.5, marginTop: "2px" }}>
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    border: "1px solid var(--bx-grid)",
                    padding: "18px",
                    background: "var(--bx-card-bg)",
                    fontSize: "0.8125rem",
                    color: "var(--bx-ink-faint)",
                  }}
                >
                  <strong style={{ color: "var(--bx-ink-bright)", display: "block", marginBottom: "4px" }}>
                    Kontak Divisi Enterprise Architecture:
                  </strong>
                  Email: <span style={{ color: "var(--gold)" }}>solutions@anvieo.academy</span> | Hotline: <span style={{ color: "var(--bx-ink-bright)" }}>+62 21 8062 9000</span>
                </div>
              </div>

              {/* Right Column Form */}
              <div
                style={{
                  border: "1px solid var(--bx-grid)",
                  background: "var(--bx-card-bg)",
                  padding: "36px",
                  borderRadius: "2px",
                }}
              >
                {formSubmitted ? (
                  <div style={{ textAlign: "center", padding: "30px 10px" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        margin: "0 auto 16px",
                        borderRadius: "50%",
                        border: "1px solid var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gold)",
                      }}
                    >
                      <FlatIcon type="check" size={28} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.375rem",
                        fontWeight: 700,
                        color: "var(--bx-ink-bright)",
                        marginBottom: "10px",
                      }}
                    >
                      Permintaan Diskusi Arsitektur Diterima
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-soft)", lineHeight: 1.6, marginBottom: "24px" }}>
                      Terima kasih, <strong>{formData.fullName}</strong>. Tim Enterprise Solutions &amp; System Architect
                      ANVIEO Academy akan mempelajari rangkuman sistem <strong>{formData.company}</strong> dan menghubungi Anda via{" "}
                      <strong>{formData.workEmail}</strong> dalam waktu maksimal 1x24 jam kerja.
                    </p>
                    <button
                      type="button"
                      className="blackbox-pill blackbox-pill-black"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          fullName: "",
                          workEmail: "",
                          company: "",
                          domain: "concurrency",
                          qpsTarget: "",
                          challengeSummary: "",
                        });
                      }}
                    >
                      KIRIM PERMINTAAN LAIN
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--bx-ink-bright)",
                        marginBottom: "4px",
                      }}
                    >
                      Formulir Permintaan Konsultasi Arsitektur
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)", marginBottom: "24px" }}>
                      Lengkapi detail sistem di bawah untuk menjadwalkan sesi audit teknis awal.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                          Nama Lengkap &amp; Jabatan *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Pratama Surya - VP of Engineering"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            border: "1px solid var(--bx-grid)",
                            background: "var(--bx-bg)",
                            color: "var(--bx-ink-bright)",
                            fontSize: "0.875rem",
                            borderRadius: "2px",
                            outline: "none",
                          }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                            Email Perusahaan / Kantor *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="nama@perusahaan.com"
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              border: "1px solid var(--bx-grid)",
                              background: "var(--bx-bg)",
                              color: "var(--bx-ink-bright)",
                              fontSize: "0.875rem",
                              borderRadius: "2px",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                            Nama Perusahaan / Organisasi *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="PT Solusi Digital Raya"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              border: "1px solid var(--bx-grid)",
                              background: "var(--bx-bg)",
                              color: "var(--bx-ink-bright)",
                              fontSize: "0.875rem",
                              borderRadius: "2px",
                              outline: "none",
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                            Fokus Domain Solusi *
                          </label>
                          <select
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              border: "1px solid var(--bx-grid)",
                              background: "var(--bx-bg)",
                              color: "var(--bx-ink-bright)",
                              fontSize: "0.875rem",
                              borderRadius: "2px",
                              outline: "none",
                            }}
                          >
                            <option value="concurrency">Concurrency &amp; High-Traffic QPS</option>
                            <option value="ai">AI Agent &amp; RAG Architecture</option>
                            <option value="fintech">Core Banking &amp; Event-Driven</option>
                            <option value="security">UU PDP Audit &amp; Data Isolation</option>
                            <option value="custom">Arsitektur Kustom Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                            Target Beban / QPS Transaksi
                          </label>
                          <input
                            type="text"
                            placeholder="Misal: 50.000 QPS atau 5 Juta DAU"
                            value={formData.qpsTarget}
                            onChange={(e) => setFormData({ ...formData, qpsTarget: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              border: "1px solid var(--bx-grid)",
                              background: "var(--bx-bg)",
                              color: "var(--bx-ink-bright)",
                              fontSize: "0.875rem",
                              borderRadius: "2px",
                              outline: "none",
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--bx-ink-bright)", display: "block", marginBottom: "6px" }}>
                          Deskripsi Ringkas Kendala Sistem Saat Ini *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Jelaskan tantangan arsitektur, teknologi stack saat ini, atau target pencapaian performa yang ingin diwujudkan..."
                          value={formData.challengeSummary}
                          onChange={(e) => setFormData({ ...formData, challengeSummary: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            border: "1px solid var(--bx-grid)",
                            background: "var(--bx-bg)",
                            color: "var(--bx-ink-bright)",
                            fontSize: "0.875rem",
                            borderRadius: "2px",
                            outline: "none",
                            resize: "vertical",
                          }}
                        />
                      </div>

                      <div style={{ marginTop: "8px" }}>
                        <button
                          type="submit"
                          className="blackbox-pill blackbox-pill-gold"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          KIRIM PERMINTAAN KONSULTASI ARSITEKTUR →
                        </button>
                      </div>

                      <span style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)", textAlign: "center" }}>
                        Seluruh informasi teknis dilindungi oleh Standard Confidentiality &amp; NDA Protocol.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <BlackboxRails position="bottom" />
        </section>

        {/* MODAL: DETAIL CASE STUDY BLUEPRINT */}
        {activeModalCase && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.75)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setActiveModalCase(null)}
          >
            <div
              style={{
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-grid)",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "36px",
                borderRadius: "2px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModalCase(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "var(--bx-ink-bright)",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
                aria-label="Tutup"
              >
                ×
              </button>

              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 700,
                  }}
                >
                  ENGINEERING BLUEPRINT // {activeModalCase.categoryLabel}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--bx-ink-bright)",
                    marginTop: "4px",
                    marginBottom: "6px",
                  }}
                >
                  {activeModalCase.title}
                </h3>
                <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-faint)" }}>
                  Domain Klien: {activeModalCase.clientType}
                </span>
              </div>

              {/* Metrics Bar */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "1px",
                  background: "var(--bx-grid)",
                  border: "1px solid var(--bx-grid)",
                  marginBottom: "24px",
                }}
              >
                {activeModalCase.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bx-card-bg)",
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ fontSize: "0.6875rem", color: "var(--bx-ink-faint)" }}>{m.label}</div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: "var(--gold)" }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Detailed Breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--red, #e03131)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Tantangan &amp; Failure Mode:
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6, margin: 0 }}>
                    {activeModalCase.problem}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Arsitektur &amp; Langkah Mitigasi:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                    {activeModalCase.architectureSolution.map((s, idx) => (
                      <li key={idx} style={{ marginBottom: "6px" }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture Code Snippet */}
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Cuplikan Kode / Query Kunci ({activeModalCase.architectureSnippet.type}):
                  </h4>
                  <pre
                    style={{
                      background: "var(--bx-code-bg, #0b0c10)",
                      border: "1px solid var(--bx-grid)",
                      color: "var(--bx-code-text, #a5b4fc)",
                      padding: "16px",
                      borderRadius: "2px",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono, monospace)",
                      overflowX: "auto",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    <code>{activeModalCase.architectureSnippet.code}</code>
                  </pre>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Dampak Bisnis &amp; Rekayasa Terukur:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.875rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                    {activeModalCase.outcomes.map((o, idx) => (
                      <li key={idx} style={{ marginBottom: "4px" }}>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid var(--bx-grid)", paddingTop: "16px" }}>
                <a
                  href="#consultation-form"
                  onClick={() => setActiveModalCase(null)}
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ textDecoration: "none" }}
                >
                  KONSULTASIKAN KASUS SERUPA →
                </a>
                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-black"
                  onClick={() => setActiveModalCase(null)}
                >
                  TUTUP
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
