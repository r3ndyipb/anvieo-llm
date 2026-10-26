---
name: lms-dbms-developer
description: >-
  Architect, optimize, and maintain PostgreSQL 16+ databases and pgvector extensions for the LMS platform (Relational 3NF schemas, HNSW vector indexing, queue concurrency locking, table partitioning, and async migrations). Use this skill whenever writing SQL schemas, tuning database queries, implementing pgvector similarity search, configuring Alembic migrations, or auditing transactional performance.
---

# LMS DBMS & Data Architect Skill (PostgreSQL 16+ & pgvector Specialist)

Panduan keahlian dan runbook bagi **Database Administrator (DBA), Database Engineer, & Data Architect** untuk platform LMS Edukasi Teknologi. Keahlian ini menetapkan standar pemodelan basis data relasional (ACID), optimasi konkurensi antrean reviewer (*row-level locking*), indexing vektor semantik AI menggunakan ekstensi **`pgvector`**, strategi partisi tabel berkapasitas tinggi, serta migrasi terstruktur tanpa *downtime* dengan SQLAlchemy & Alembic.

---

## 1. Arsitektur Basis Data: Relasional ACID + Ekstensi AI (pgvector)

PostgreSQL berfungsi ganda sebagai:
1. **Penyimpan Transaksional Kritis:** Keuangan, transaksi langganan, nilai kuis, perolehan sertifikat, dan otentikasi akun.
2. **Mesin Pencarian Vektor Semantik (Vector Store):** Menyimpan *embeddings* teks (1536 dimensi) untuk forum diskusi Q&A, deteksi plagiarisme kode, dan pencocokan resume talenta dengan lowongan kerja.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       POSTGRESQL 16+ CLUSTER ARSITEKTUR                     │
├─────────────────────────────────────────┬───────────────────────────────────┤
│            TABEL RELASIONAL 3NF         │     TABEL VEKTOR AI (pgvector)    │
│  - users, courses, modules, lessons     │  - forum_topic_embeddings         │
│  - submissions, reviews, certificates   │  - submission_ast_embeddings      │
│  - orders, order_items, challenges      │  - talent_profile_embeddings      │
├─────────────────────────────────────────┴───────────────────────────────────┤
│                        FITUR DATABASE TINGKAT TINGGI                        │
│  - Concurrency Lock: `SELECT ... FOR UPDATE SKIP LOCKED` (Reviewer Queue)   │
│  - Vector Indexes: HNSW (Cosine Distance `<=>`) untuk pencarian semantik    │
│  - Range Partitioning: Tabel `submissions` & `ai_conversations` per kuartal │
│  - Connection Pooling: PgBouncer dengan batas koneksi terkontrol           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Pola Kueri Penting & Pencegahan Masalah Konkurensi

### 2.1 Penugasan Antrean Reviewer Tanpa Tabrakan (Race-Condition Free Queue)
Ketika 50 reviewer mengambil tugas secara bersamaan, sistem wajib mencegah dua reviewer mengambil submission yang sama. Gunakan `SKIP LOCKED`:

```sql
-- Mengambil 1 submission paling lama yang berstatus 'QUEUED' dan menguncinya
WITH next_task AS (
    SELECT id 
    FROM submissions
    WHERE status = 'QUEUED'
      AND claimed_by_reviewer_id IS NULL
    ORDER BY submitted_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
)
UPDATE submissions
SET status = 'IN_REVIEW',
    claimed_by_reviewer_id = :reviewer_id,
    claimed_at = NOW(),
    claim_expires_at = NOW() + INTERVAL '3 hours'
FROM next_task
WHERE submissions.id = next_task.id
RETURNING submissions.id, submissions.course_id, submissions.zip_file_url;
```

### 2.2 Pencarian Semantik Forum Diskusi dengan HNSW Index
Ekstensi `pgvector` dikonfigurasi dengan indeks **HNSW (Hierarchical Navigable Small World)** untuk pencarian sub-milidetik:

```sql
-- Pastikan ekstensi aktif
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabel embedding topik forum
CREATE TABLE forum_topic_embeddings (
    topic_id UUID PRIMARY KEY REFERENCES forum_topics(id) ON DELETE CASCADE,
    embedding vector(1536), -- Format standar model text-embedding-3
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks HNSW menggunakan metrik Cosine Distance
CREATE INDEX idx_forum_embeddings_hnsw 
ON forum_topic_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Kueri pencarian 3 topik forum paling mirip (Threshold kemiripan > 0.82)
SELECT 
    ft.id, 
    ft.title, 
    ft.has_best_answer,
    1 - (fte.embedding <=> :query_vector) AS similarity_score
FROM forum_topic_embeddings fte
JOIN forum_topics ft ON ft.id = fte.topic_id
WHERE (1 - (fte.embedding <=> :query_vector)) >= 0.82
ORDER BY fte.embedding <=> :query_vector ASC
LIMIT 3;
```

---

## 3. Strategi Partisi Tabel Berkapasitas Tinggi (Table Partitioning)

Tabel `submissions` dan `ai_conversations` akan memiliki jutaan baris data dalam setahun. Partisi berdasarkan rentang waktu (*Range Partitioning*) wajib diterapkan:

```sql
-- Tabel master terpartisi
CREATE TABLE submissions (
    id UUID NOT NULL,
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(32) NOT NULL,
    PRIMARY KEY (id, submitted_at)
) PARTITION BY RANGE (submitted_at);

-- Partisi per kuartal tahun
CREATE TABLE submissions_2026_q1 PARTITION OF submissions
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

CREATE TABLE submissions_2026_q2 PARTITION OF submissions
    FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');
```

---

## 4. Checklist Kualitas Database Engineer (Definition of Done)

Sebelum skema atau migrasi diterapkan ke lingkungan produksi:
- [ ] **Indexing B-Tree & Foreign Key:** Seluruh kolom referensi Foreign Key memiliki indeks B-Tree (mencegah *table scan* saat operasi `DELETE/UPDATE CASCADE`).
- [ ] **Tipe Data Kriptografis Unik:** Kode sertifikat, order number, dan user email memiliki constraint `UNIQUE` dengan indeks case-insensitive jika teks.
- [ ] **Presisi Finansial:** Kolom harga dan saldo honor menggunakan tipe `NUMERIC(14, 2)` (bukan `FLOAT` / `REAL` yang rentan kesalahan presisi desimal).
- [ ] **Alembic Down Revision:** Seluruh skrip migrasi memiliki fungsi `downgrade()` yang telah diuji dapat membatalkan migrasi (*rollback*) secara bersih tanpa data korup.
- [ ] **Audit Trail & Keamanan:** Data sensitif siswa terenkripsi di level data (*field encryption*) sesuai ketentuan UU No. 27/2022 tentang Pelindungan Data Pribadi.
