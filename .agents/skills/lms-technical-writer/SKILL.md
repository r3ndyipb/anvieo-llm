---
name: lms-technical-writer
description: >-
  Author, structure, and maintain high-grade technical documentation, curriculum authoring guidelines, API references, and reviewer operational SOPs for the LMS platform using the Diátaxis framework. Use this skill whenever drafting Software Architecture Documents (SAD), REST API specifications, curriculum creation guidelines, reviewer grading runbooks, or learner guides.
---

# LMS Technical Writer Skill (Documentation & Curriculum Specialist)

Panduan keahlian dan runbook bagi **Senior Technical Writer & Documentation Engineer** pada ekosistem platform LMS Edukasi Teknologi. Keahlian ini memastikan seluruh dokumentasi teknis, silabus kurikulum, spesifikasi REST API, rubrik penilaian, dan prosedur operasional standar (SOP) tersusun secara terstruktur, presisi, bebas dari ambiguitas, dan mengikuti kerangka kerja **Diátaxis Framework**.

---

## 1. Kerangka Dokumentasi Diátaxis untuk Platform LMS

Setiap dokumen teknis yang diproduksi harus diklasifikasikan ke dalam 4 kuadran berikut:

```
                       TEORI / PENGETAHUAN
                                ▲
                                │
                EXPLANATION     │    REFERENCE
              (Konseptual &     │   (Spesifikasi API,
               Justifikasi AI)  │    ERD & Rubrik)
                                │
    PEMBELAJARAN ───────────────┼─────────────── PRAKTIK KERJA
                                │
                TUTORIAL        │    HOW-TO GUIDE
              (Langkah Siswa    │   (SOP Reviewer &
               Pemula / Ide)    │    Deploy Backend)
                                │
                                ▼
                        PRAKTIK TERAPAN
```

1. **Tutorial (Learning-oriented):** Panduan langkah awal bagi siswa baru (*e.g. Tutorial Menjalankan Proyek Fullstack Pertama di Cloud IDE LMS dalam 5 Menit*).
2. **How-To Guide (Task-oriented):** Panduan penyelesaian tugas teknis tertentu (*e.g. Cara Reviewer Memeriksa Submission Kode Siswa & Menyematkan Catatan Inline*).
3. **Reference (Information-oriented):** Deskripsi teknis yang kering, akurat, dan lengkap (*e.g. Spesifikasi REST API FastAPI v1, Skema JSON Webhook Midtrans, dan Kamus Data PostgreSQL*).
4. **Explanation (Understanding-oriented):** Pembahasan arsitektur dan filosofi desain (*e.g. Mengapa Platform Menerapkan Dual-Engine Review dan Pendekatan Sokratik pada AI Tutor*).

---

## 2. Pedoman Penulisan Kurikulum & Rubrik Penilaian

Technical writer berperan mengawal standardisasi modul yang ditulis oleh *Curriculum Developer* dan *Subject Matter Experts*:

### 2.1 Struktur Modul Pembelajaran Baku
Setiap materi modul wajib memiliki elemen:
- **Tujuan Pembelajaran Khusus (Objective):** Menggunakan kata kerja terukur (e.g. *"Siswa mampu mengonfigurasi koneksi database PostgreSQL menggunakan connection pool SQLAlchemy"*).
- **Penjelasan Konsep & Cuplikan Kode:** Sintaks kode berwarna dengan penjelasan baris per baris.
- **Peringatan Penting (Callouts):** Blok `[!TIP]`, `[!NOTE]`, atau `[!WARNING]` untuk *common pitfalls* atau jebakan error yang sering dialami pemula.
- **Latihan Mandiri (Hands-on Challenge):** Soal latihan kecil untuk menguji pemahaman sebelum melangkah ke modul berikutnya.

### 2.2 Template Standar Rubrik Penilaian Submission (Bintang 1-5)
```markdown
# Rubrik Penilaian Tugas Akhir: [Nama Kelas]

## 1. Kriteria Wajib (Mandatory - Syarat Kelulusan Bintang 3)
*Seluruh kriteria di bawah ini wajib terpenuhi 100% untuk dinyatakan LULUS:*
- [ ] **Kriteria 1 (Fungsionalitas Inti):** Aplikasi berhasil melakukan operasi CRUD via REST API sesuai spesifikasi endpoint.
- [ ] **Kriteria 2 (Basis Data):** Relasi tabel dinormalisasi dengan Foreign Key dan query bebas dari SQL Injection.
- [ ] **Kriteria 3 (Clean Code):** Struktur folder terpisah secara modular (Routes, Controllers, Services, Models).

## 2. Kriteria Bonus (Optional - Syarat Kelulusan Bintang 4 atau 5)
*Memenuhi minimal 2 kriteria untuk Bintang 4, dan seluruh kriteria untuk Bintang 5:*
- [ ] **Bonus 1 (Automated Testing):** Menyertakan unit test dengan coverage minimal 80%.
- [ ] **Bonus 2 (Caching Performance):** Mengimplementasikan caching Redis pada endpoint GET berskala tinggi.
- [ ] **Bonus 3 (Containerization):** Menyertakan berkas `Dockerfile` dan `docker-compose.yml` yang siap dijalankan dengan sekali klik.
```

---

## 3. Format Dokumentasi Spesifikasi API (REST API Reference Standard)

Format baku pendokumentasian endpoint:

```markdown
### [METHOD] /api/v1/[resource]
**Deskripsi:** Penjelasan ringkas fungsi endpoint.  
**Autentikasi:** Wajib (Bearer JWT) / Publik.  
**Role Akses:** `LEARNER` / `REVIEWER` / `ADMIN`.  

#### Request Headers
| Header | Tipe | Wajib? | Deskripsi |
|---|---|---|---|
| `Authorization` | String | Ya | Format: `Bearer <jwt_token>` |
| `Content-Type` | String | Ya | `application/json` |

#### Request Body
```json
{
  "field_name": "example_value"
}
```

#### Response Responses
- **200 OK / 201 Created:** Contoh payload JSON saat berhasil.
- **400 Bad Request / 422 Unprocessable Entity:** Contoh payload saat validasi gagal.
- **401 Unauthorized / 403 Forbidden:** Contoh payload saat token tidak valid atau hak akses tidak sesuai.
```

---

## 4. Checklist Kualitas Technical Writer (Definition of Done)

Sebelum dokumen dipublikasikan:
- [ ] **Akurasi Perintah & Kode:** Semua perintah CLI, endpoint API, dan cuplikan kode telah diuji secara nyata dan berhasil dieksekusi tanpa error.
- [ ] **Format Link Valid:** Hyperlink internal mengarah ke file markdown atau URL yang benar tanpa *broken links*.
- [ ] **Diagram Mermaid Valid:** Seluruh sintaks diagram Mermaid bebas dari kesalahan sintaks.
- [ ] **Tata Bahasa Baku:** Mengikuti kaidah PUEBI/KBBI untuk bahasa Indonesia resmi atau Technical English yang presisi.
- [ ] **Metadata Dokumen:** Menyertakan versi dokumen, tanggal pembaruan, nama penyusun, dan status dokumen.
