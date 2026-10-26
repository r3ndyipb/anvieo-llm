---
name: anvieo-github-agent
description: >-
  Orchestrate, manage, and automate GitHub operations, repository lifecycle, CI/CD workflows, branch protections, and release pipelines for the Anvieo LLM / LMS platform repository (https://github.com/r3ndyipb/anvieo-llm). Use this skill whenever creating or cloning GitHub repositories, managing git commits and automated pushes, configuring GitHub Actions CI/CD, managing issues/PRs, tagging releases, or operating gh CLI on behalf of r3ndyipb.
---

# Anvieo GitHub DevOps & Repository Automation Agent

Panduan dan instruksi operasional untuk **DevOps Engineer & GitHub Specialist** dalam mengelola repositori [r3ndyipb/anvieo-llm](https://github.com/r3ndyipb/anvieo-llm) pada akun GitHub [@r3ndyipb](https://github.com/r3ndyipb). Keahlian ini memastikan siklus pengembangan perangkat lunak (SDLC), komit berstruktur, otomatisasi sinkronisasi, dan pipeline integrasi berjalan dengan disiplin tinggi.

---

## 1. Identitas & Konfigurasi Kredensial Repositori

| Parameter | Nilai Resmi |
|---|---|
| **Repository URL** | `https://github.com/r3ndyipb/anvieo-llm` |
| **Owner / Akun GitHub** | `r3ndyipb` (Rendy Aria Windana) |
| **Email Pengembang** | `rendy.ariawindana@gmail.com` |
| **Cabang Utama (Default)** | `main` |
| **Git Remote Alias** | `origin` |
| **CLI Management Tool** | GitHub CLI (`gh`) v2.x |

### Prosedur Verifikasi Akun Aktif
Setiap kali melakukan operasi remote GitHub melalui terminal, pastikan akun aktif adalah `r3ndyipb`:
```bash
# Periksa status autentikasi gh
gh auth status

# Jika akun aktif bukan r3ndyipb, pindahkan akun secara langsung:
gh auth switch --user r3ndyipb
```

---

## 2. Standar Commit (Conventional Commits)

Seluruh komit pada repositori `anvieo-llm` wajib mengikuti konvensi penamaan standar industri:

```bash
<type>(<scope>): <deskripsi singkat dalam bahasa Indonesia atau Inggris>
```

### Tipe Komit yang Didukung:
- `feat(lms-web)`: Penambahan fitur atau halaman baru (misal: halaman silabus, single course checkout, autentikasi).
- `fix(auth)`: Perbaikan bug fungsional, broken link, atau rendering UI.
- `docs(readme)`: Pembaruan dokumentasi, BRD, PRD, atau technical guide.
- `style(blackbox)`: Penyesuaian CSS token, garis pembatas 1px, atau dark mode obsidian.
- `refactor(components)`: Restrukturisasi kode tanpa mengubah fungsionalitas publik.
- `perf(routing)`: Peningkatan Core Web Vitals (LCP, INP, CLS) atau optimasi bundle.
- `chore(repo)`: Pemeliharaan `.gitignore`, dependensi package, atau script automasi.

---

## 3. Alur Kerja Otomatisasi Git & Push

### 3.1 Siklus Sinkronisasi Cepat (Fast Sync)
```bash
# 1. Pastikan akun r3ndyipb aktif
gh auth switch --user r3ndyipb

# 2. Periksa status perubahan
git status

# 3. Stage seluruh perubahan (menghormati .gitignore)
git add .

# 4. Buat komit dengan pesan terstruktur
git commit -m "feat(academy): implement syllabus, checkout & auth gateway with blackbox rails"

# 5. Push ke cabang utama
git push -u origin main
```

### 3.2 Penanganan Cabang Fitur (Feature Branching)
Untuk pengembangan fitur berskala besar:
```bash
# Membuat cabang baru
git checkout -b feature/in-browser-cloud-ide

# Mengajukan Pull Request via gh CLI
gh pr create --title "feat(ide): in-browser cloud execution sandbox" --body "Implementasi Monaco Editor dan WebContainers."
```

---

## 4. GitHub Actions CI/CD Pipeline Template

Untuk memastikan integritas kompilasi Next.js dan TypeScript, pipeline CI otomatis diletakkan pada `.github/workflows/ci.yml`:

```yaml
name: ANVIEO LMS CI Validation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: lms-web/package-lock.json

      - name: Install Dependencies
        working-directory: ./lms-web
        run: npm ci

      - name: TypeScript Type Check
        working-directory: ./lms-web
        run: npx tsc --noEmit

      - name: Next.js Production Build
        working-directory: ./lms-web
        run: npm run build
```

---

## 5. Aturan Keamanan & Higienitas Repositori (Security Guardrails)

1. **Proteksi Rahasia (.env & Tokens)**:
   - Dilarang keras melakukan komit berkas `.env`, `.env.local`, API keys, ataupun private tokens.
   - Pastikan `.gitignore` selalu mengabaikan `.env*`, `node_modules/`, dan `.next/`.
2. **Pemeriksaan Ukuran Berkas**:
   - Berkas biner besar di atas 10MB wajib menggunakan CDN external atau Git LFS.
3. **Branch Protection**:
   - Cabang `main` dilindungi untuk menjaga stabilitas production code.

---

## 6. Runbook Pemecahan Masalah (Troubleshooting)

| Isu | Penyebab | Solusi |
|---|---|---|
| `fatal: remote origin already exists` | Remote git sudah ada sebelumnya | Jalankan `git remote set-url origin https://github.com/r3ndyipb/anvieo-llm.git` |
| `Permission to ... denied to user` | Token gh aktif bukan milik `r3ndyipb` | Jalankan `gh auth switch --user r3ndyipb` lalu ulangi push |
| `src refspec main does not match any` | Belum ada komit pertama lokal | Lakukan `git add . && git commit -m "initial commit"` sebelum push |
| `Updates were rejected because remote contains work` | Remote mendahului lokal | Lakukan `git pull --rebase origin main` lalu `git push origin main` |
