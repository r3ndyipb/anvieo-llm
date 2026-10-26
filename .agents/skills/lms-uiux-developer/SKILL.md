---
name: lms-uiux-developer
description: >-
  Design and build ultra-modern, accessible, and high-performance UI/UX interfaces for the Next.js LMS platform (Interactive Classroom, In-Browser Cloud IDE, Reviewer Studio, RPG Skill Tree, and Virtual Study Rooms). Use this skill whenever building frontend components, designing dark/light themes, implementing Monaco code editors, optimizing Core Web Vitals, or crafting fluid micro-interactions.
---

# LMS UI/UX & Frontend Developer Skill (Next.js 15 Specialist)

Panduan keahlian dan runbook bagi **UI/UX Designer & Senior Frontend Engineer** untuk platform LMS Edukasi Teknologi generasi baru. Keahlian ini menetapkan standar desain visual modern (*rich aesthetics*), sistem token desain HSL terkurasi, arsitektur komponen React 19 / Next.js 15 App Router, integrasi editor kode in-browser (Monaco Editor / WebContainers), serta kepatuhan aksesibilitas WCAG 2.1 AA.

---

## 1. Desain Sistem & Token Visual (Design Tokens)

Platform LMS harus memberikan kesan **premium, futuristik, dan ramah pembelajar**. Hindari warna mentah standar browser.

### 1.1 Palet Warna Semantik
```css
:root {
  /* Mode Terang (Default Day) */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-card: #FFFFFF;
  --border-subtle: #E2E8F0;
  --text-main: #0F172A;
  --text-muted: #64748B;
  
  /* Brand Tokens */
  --brand-navy: #0F172A;
  --brand-blue: #2563EB;
  --brand-blue-hover: #1D4ED8;
  
  /* Aksentuasi Fitur Khusus */
  --ai-purple: #8B5CF6;        /* Khusus Socratic AI Copilot */
  --ai-purple-light: #F5F3FF;
  --success-emerald: #10B981;  /* Status Lolos & Terverifikasi */
  --warning-amber: #F59E0B;    /* Bintang Review & Poin XP */
  --danger-rose: #F43F5E;      /* Error & Perlu Revisi */
  
  /* Code Editor Canvas */
  --code-bg: #0D1117;
  --code-text: #E6EDF3;
}

[data-theme="dark"] {
  /* Mode Gelap (Developer Night Mode) */
  --bg-primary: #0B0F17;
  --bg-secondary: #111827;
  --bg-card: #161F30;
  --border-subtle: #1F293D;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  
  --brand-blue: #3B82F6;
  --brand-blue-hover: #60A5FA;
  --ai-purple: #A78BFA;
  --ai-purple-light: #241442;
  --code-bg: #0B0F17;
}
```

### 1.2 Tipografi
- **Headings & Judul:** `Plus Jakarta Sans` atau `Inter` (Font-weight: 600, 700, 800) dengan *letter-spacing: -0.02em*.
- **Body & Teks Bacaan:** `Inter` (Line-height: 1.65, Font-weight: 400, 500).
- **Editor & Sintaks Kode:** `JetBrains Mono` atau `Fira Code` (dengan ligatur pemrograman aktif `font-feature-settings: "liga" on`).

---

## 2. Arsitektur Komponen Inti LMS (Component Archetypes)

### 2.1 Interactive Classroom Player
Komponen ruang belajar terbagi dalam 3 panel responsif:
1. **Bilah Kiri (Collapsible Sidebar):** Struktur silabus pohon modul dengan centang status bacaan/kuis.
2. **Kanvas Tengah (Content Stage):** Artikel teks dengan format rapi, pemutar video kustom dengan bookmark catatan waktu, dan blok latihan kode interaktif.
3. **Bilah Kanan (Interaction Drawer):** Tab ganda yang memuat:
   - **Tab 1 (Socratic AI Tutor):** Panel asisten AI dengan tombol pintas *"Jelaskan Error Ini"*, *"Beri Petunjuk Logika"*.
   - **Tab 2 (Forum Diskusi):** Pertanyaan kontekstual per modul dengan filter *Solusi Terverifikasi*.

### 2.2 Reviewer Code Studio
Antarmuka khusus bagi tim reviewer untuk mengevaluasi kode siswa secara presisi:
- **Pohon Berkas (*File Tree*):** Penjelajah struktur file `.zip` proyek.
- **Monaco Code Canvas:** Menampilkan nomor baris kode. Mengeklik nomor baris kode akan memunculkan *popover* formulir komentar inline.
- **Panel Rubrik Bintang 1-5:** Daftar checklist kriteria wajib (berwarna hijau jika lolos) dan kriteria bonus, disertai kolom catatan evaluasi komprehensif.

### 2.3 Zero-Setup In-Browser Cloud IDE
- Terintegrasi engine WebContainer di tab peramban.
- Terminal bawaan (Xterm.js) untuk mengeksekusi perintah CLI `npm`, `node`, atau `python`.
- Split-pane live browser preview dengan URL hot-reload lokal.

### 2.4 RPG Visual Skill Tree
- Visualisasi representasi keahlian berbentuk graf pohon bercabang (menggunakan React Flow atau SVG dinamis).
- Efek visual interaktif: Node yang belum terbuka berpenampilan abu-abu redup, node aktif berdenyut biru (*pulse animation*), dan node *Mastered* bercahaya keemasan dengan efek partikel.

### 2.5 Virtual Study Room & Live Pair Programming
- Tata letak lobi belajar dengan *Pomodoro Timer Widget* mengambang.
- Kursor ganda tersinkronisasi (*multi-cursor live editing*) menggunakan WebSockets untuk sesi *collaborative coding*.

---

## 3. Standar Kualitas Desain (Frontend Definition of Done)

Setiap halaman dan komponen yang dibangun wajib memenuhi checklist berikut:
- [ ] **100% Dark & Light Mode Support:** Tidak boleh ada teks gelap di atas latar belakang gelap (*unreadable text contrast*).
- [ ] **Core Web Vitals:** Largest Contentful Paint (LCP) < 1.2 detik, Interaction to Next Paint (INP) < 100ms, Cumulative Layout Shift (CLS) = 0.
- [ ] **Aksesibilitas (WCAG 2.1 AA):** Seluruh tombol interaktif memiliki `aria-label`, navigasi keyboard (Focus visible state), dan kontras rasio minimal 4.5:1.
- [ ] **Desain Adaptif:** Sempurna pada resolusi Mobile (375px), Tablet (768px), Laptop (1280px), dan Monitor Ultra-wide (1920px+).
- [ ] **Tanpa Placeholder Hambar:** Gunakan visualisasi kode nyata, lencana resmi beranimasi, dan ilustrasi SVG modern.
