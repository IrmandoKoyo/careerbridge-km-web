# CareerBridge — Knowledge Base Panduan Karir Fresh Graduate

**CareerBridge** adalah website *Knowledge Base* yang dibangun oleh **Kelompok 7 Mata Kuliah Knowledge Management — Universitas Klabat (UNKLAB)** (Pilihan 1 — Tema 5: *Mendapat Pekerjaan Setelah Lulus Kuliah*).

Situs ini mengintegrasikan **pengalaman nyata (Tacit Knowledge)** hasil wawancara mendalam terhadap 3 alumni UNKLAB lintas industri (Korporat FMCG, Perusahaan Teknologi Multinasional, dan Perbankan BUMN) bersama **referensi serta regulasi resmi (Explicit Knowledge)**.

---

## Akses Aplikasi & Subpath

- **Subpath Portal Utama:** `/kmclass` (contoh: `https://upro.web.id/kmclass`)
- **Integrasi Dokumen Pendukung:** Terhubung ke Folder Google Drive Kelompok 7 (Template CV ATS, Bank Soal TPA/Psikotes, Cheat Sheet Wawancara STAR, Hukum Kontrak PKWT/PKWTT PP No. 35/2021, serta Transkrip Wawancara).

---

## Struktur Halaman & Fitur

- **Beranda (`/kmclass`)** — Pengantar solusi kesiapan kerja, pencarian instan (`Ctrl+K`), peta 4 kategori & 10 panduan, serta wawasan 3 narasumber praktisi industri.
- **Panduan (`/kmclass/panduan` & `/kmclass/entri/1` s/d `10`)** — 10 entri lengkap format 6 poin standar dosen:
  1. Judul & Ringkasan 2–3 Kalimat
  2. Langkah-Langkah / Penjelasan Inti
  3. Kesalahan Umum yang Harus Dihindari
  4. Tips dari Narasumber (Kutipan Asli + Timestamp Rekaman)
  5. Contoh, Template Google Drive, & Checklist Interaktif
  6. Sumber, Nama Kontributor, & Tanggal Diperbarui
- **Sumber & Template (`/kmclass/unduhan`)** — Direktori templat Google Drive & daftar pustaka *Explicit Knowledge*.
- **FAQ (`/kmclass/faq`)** — 10 tanya-jawab seputar persiapan kerja lulusan baru dengan fitur pencarian.
- **Tentang (`/kmclass/tentang`)** — Profil 9 anggota Kelompok 7, alur penyusunan situs, analisis Model SECI (*Socialization, Externalization, Combination, Internalization*), diagram kerangka konseptual, dan refleksi tantangan konversi *Tacit $\rightarrow$ Explicit*.
- **Masukan (`/kmclass/masukan` atau `/kmclass/uji-coba`)** — Formulir evaluasi 5 aspek skala 1–5 untuk penguji pengguna (mendukung **Firebase Firestore** maupun penyimpanan lokal).

---

## Tim Penyusun (Kelompok 7 UNKLAB)

1. **Valentino Milano Gufron** — Ketua / Project Coordinator *(Penulis Utama Entri 1)*
2. **Hulio Klose Bastian Jocom** — Tim Wawancara 1 *(Penulis Utama Entri 2)*
3. **Avian Rivan Manopo** — Tim Wawancara 2 *(Penulis Utama Entri 8)*
4. **Swindry Brami Kowimbin** — Tim Research 1 *(Penulis Utama Entri 3)*
5. **Elgiboa Anthony Mitchell Rengkung** — Tim Research 2 *(Penulis Utama Entri 6)*
6. **Pranata Vareliano Rumagit** — Tim Content Writer 1 *(Penulis Utama Entri 5 & Editor Entri 1–5)*
7. **Irmando Koyo** — Tim Content Writer 2 *(Penulis Utama Entri 7 & Editor Entri 6–10)*
8. **Julio Yesaya Korengkeng** — Web Designer *(Penulis Utama Entri 4)*
9. **Alexander Jonatan Tukoshi Rantung** — Dokumentasi & Quality Control *(Penulis Utama Entri 9)*

---

## Teknologi

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 + Lucide Icons
- Firebase Firestore *(opsional untuk voting bermanfaat & log uji coba lintas perangkat)*
- Vercel *(hosting & rewrite subpath `/kmclass`)*

---

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```
