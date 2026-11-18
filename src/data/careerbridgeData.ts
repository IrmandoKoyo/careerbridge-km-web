export interface TeamMember {
  noLabel: string;
  nama: string;
  peran: string;
  tugasOperasional: string;
  entriUtama: string;
  entriNo: number;
}

export interface Interviewee {
  kode: 'NS-1' | 'NS-2' | 'NS-3';
  nama: string;
  latar: string;
  jabatan: string;
  industri: string;
  durasi: string;
  bukti: string;
  highlight: string;
  entriTerkait: number[];
}

export interface CategoryInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  entryNos: number[];
}

export interface KnowledgeEntry {
  no: number;
  slug: string;
  categoryId: number;
  subkategoriLabel: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan' | 'Semua Level';
  readMinutes: number;
  penulisUtama: string;
  contentWriter: string;
  risetWawancara: string;
  title: string;
  shortTitle: string;
  ringkasan: string;
  langkahInti: { heading: string; detail: string }[];
  kesalahanUmum: string[];
  tipsNarasumber: {
    quote: string;
    speaker: string;
    role: string;
    timestamp: string;
  }[];
  templateFile: string;
  driveFolderTag: string;
  checklist: string[];
  sumber: string;
  updatedAt: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  relatedEntryNo: number;
}

export interface DriveAssetItem {
  folderCode: string;
  folderName: string;
  fileName: string;
  description: string;
  forEntries: string;
}

export interface ExplicitSourceItem {
  entri: string;
  sumber: string;
  peneliti: string;
}

export const PROJECT_META = {
  brand: 'CareerBridge',
  subtitle: 'Basis Pengetahuan Panduan Karir & Sukses Kerja Mahasiswa Fresh Graduate',
  pilihan: 'Pilihan 1 — Knowledge Base (Website Portal + Google Drive)',
  tema: 'Tema 5 — Mendapat Pekerjaan Setelah Lulus Kuliah',
  kelompok: 'Kelompok 7 — Universitas Klabat (UNKLAB)',
  ketua: 'Valentino Milano Gufron',
  tanggalUpdate: '17 November 2026',
  subpathUrl: 'https://upro.web.id/kmclass',
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 1,
    title: 'Kategori 1: Persiapan Sebelum Lulus',
    subtitle: 'Pondasi Kompetensi, CV ATS & Portofolio',
    description:
      'Persiapan strategis sebelum wisuda agar lulusan memiliki arah keahlian inti, CV lolos mesin penyaring ATS, serta bukti proyek kuliah.',
    entryNos: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Kategori 2: Strategi Mencari & Melamar Kerja',
    subtitle: 'LinkedIn, Loker Multi-Channel & Ketahanan Mental',
    description:
      'Optimasi jejak digital profesional, berburu loker di 6 kanal resmi bebas penipuan, serta menjaga kesehatan mental selama masa tunggu 2–4 bulan.',
    entryNos: [4, 5, 10],
  },
  {
    id: 3,
    title: 'Kategori 3: Menghadapi Proses Seleksi',
    subtitle: 'Psikotes/TPA, FGD, Wawancara HRD & User',
    description:
      'Strategi lulus TKD/TPA, menjaga stabilitas Tes Koran (Kraepelin/Pauli), dan teknik wawancara Metode STAR langsung dari sudut pandang User Interviewer.',
    entryNos: [6, 7],
  },
  {
    id: 4,
    title: 'Kategori 4: Negosiasi, Kontrak & Adaptasi',
    subtitle: 'Etika Gaji, Hukum PKWT/PKWTT & Masa Probation',
    description:
      'Etika diplomatis membahas kompensasi, audit pasal kontrak kerja berdasarkan PP No. 35 Tahun 2021, serta rencana kerja 90 hari pertama.',
    entryNos: [8, 9],
  },
];

export const ROSTER_TEAM: TeamMember[] = [
  {
    noLabel: 'Orang 1 (Ketua / Coordinator)',
    nama: 'Valentino Milano Gufron',
    peran: 'Project Coordinator',
    tugasOperasional:
      'Mengatur seluruh jalannya proyek, jadwal milestone, kerangka konseptual SECI, komunikasi dengan dosen, & koordinasi antar-divisi',
    entriUtama: 'Entri 1 (Pemetaan Karir & Riset Industri) + Ko-Penulis Entri 10',
    entriNo: 1,
  },
  {
    noLabel: 'Orang 2 (Tim Wawancara 1)',
    nama: 'Hulio Klose Bastian Jocom',
    peran: 'Tim Wawancara 1 (Tacit Knowledge)',
    tugasOperasional:
      'Mencari narasumber alumni, mengurus izin persetujuan, menyusun instrumen, mewawancarai & merekap transkrip lengkap',
    entriUtama: 'Entri 2 (CV Standar ATS & Surat Lamaran) + Kontributor Entri 1–5',
    entriNo: 2,
  },
  {
    noLabel: 'Orang 3 (Tim Wawancara 2)',
    nama: 'Avian Rivan Manopo',
    peran: 'Tim Wawancara 2 (Tacit Knowledge)',
    tugasOperasional:
      'Mencari narasumber alumni, melaksanakan wawancara mendalam, memverifikasi timestamp, & ekstraksi kutipan tacit',
    entriUtama: 'Entri 8 (Negosiasi Gaji & Kontrak PKWT/PKWTT) + Kontributor Entri 6–10',
    entriNo: 8,
  },
  {
    noLabel: 'Orang 4 (Tim Research 1)',
    nama: 'Swindry Brami Kowimbin',
    peran: 'Tim Research 1 (Explicit Knowledge)',
    tugasOperasional:
      'Mengumpulkan referensi resmi explicit Kategori 1 & 2 (BPS, Harvard/CakeResume ATS, Portofolio GitHub, LinkedIn, Portal Loker)',
    entriUtama: 'Entri 3 (Portofolio Proyek Kuliah & Sertifikasi) + Riset Entri 1–5',
    entriNo: 3,
  },
  {
    noLabel: 'Orang 5 (Tim Research 2)',
    nama: 'Elgiboa Anthony Mitchell Rengkung',
    peran: 'Tim Research 2 (Explicit Knowledge)',
    tugasOperasional:
      'Mengumpulkan referensi resmi explicit Kategori 3 & 4 (TPA BUMN, STAR MIT, PP 35/2021 PKWT/PKWTT, Salary Guide, Probation)',
    entriUtama: 'Entri 6 (Psikotes Korporat, TPA & FGD) + Riset Entri 6–10',
    entriNo: 6,
  },
  {
    noLabel: 'Orang 6 (Tim Content Writer 1)',
    nama: 'Pranata Vareliano Rumagit',
    peran: 'Tim Content Writer 1 (Kategori 1 & 2)',
    tugasOperasional:
      'Menyusun, mengedit, dan menyeragamkan Entri 1 s/d Entri 5 ke dalam Format Standar 6 Poin Dosen',
    entriUtama: 'Entri 5 (Berburu Loker Multi-Channel & Anti-Scam) + Editor Entri 1–5',
    entriNo: 5,
  },
  {
    noLabel: 'Orang 7 (Tim Content Writer 2)',
    nama: 'Irmando Koyo',
    peran: 'Tim Content Writer 2 (Kategori 3 & 4)',
    tugasOperasional:
      'Menyusun, mengedit, dan menyeragamkan Entri 6 s/d Entri 10 ke Format Standar 6 Poin & integrasi web portal',
    entriUtama: 'Entri 7 (Wawancara HRD & User Metode STAR) + Editor Entri 6–10',
    entriNo: 7,
  },
  {
    noLabel: 'Orang 8 (Web Designer)',
    nama: 'Julio Yesaya Korengkeng',
    peran: 'Web Designer (Web Portal & Drive)',
    tugasOperasional:
      'Merancang tata letak navigasi 4 kategori, halaman responsif HP/desktop, serta integrasi 6 folder Google Drive',
    entriUtama: 'Entri 4 (Optimasi LinkedIn & Personal Branding) + Arsitektur Situs',
    entriNo: 4,
  },
  {
    noLabel: 'Orang 9 (Dokumentasi & QC)',
    nama: 'Alexander Jonatan Tukoshi Rantung',
    peran: 'Dokumentasi & Quality Control',
    tugasOperasional:
      'Menyusun Laporan Akhir, Log Kontribusi (Google Sheets), Halaman 10 FAQ, & mengelola Uji Coba Pengguna Luar',
    entriUtama: 'Entri 9 (Budaya Kerja & Probation 90 Hari) + FAQ, Log & QC',
    entriNo: 9,
  },
];

export const INTERVIEWEES: Interviewee[] = [
  {
    kode: 'NS-1',
    nama: 'Bapak Oliver Patrick Lumentra',
    latar: 'Alumni UNKLAB Angkatan ke-85 (Lulus 2021)',
    jabatan: 'Area Sales Manager & User Interviewer — PT Sinar Makmur Timur (Orang Tua Group)',
    industri: 'Korporat Swasta Nasional (FMCG Beverage)',
    durasi: '12 Menit 18 Detik',
    bukti: 'Video wawancara1 + 14 Screenshot Transkrip [00:00 – 12:18]',
    highlight:
      'CV harus singkat padat menonjolkan kekuatan utama. Saat wawancara User, pantang menjawab bertele-tele, pantang berbohong, serta wajib meriset budaya kerja & garis tanggung jawab posisi.',
    entriTerkait: [1, 2, 4, 5, 7, 9, 10],
  },
  {
    kode: 'NS-2',
    nama: 'Bapak Vicco (Viko) Manopo',
    latar: 'Alumni UNKLAB Lulusan 2021 (FILKOM — Teknik Informatika)',
    jabatan: 'Software Engineer — Perusahaan Multinasional / Internasional',
    industri: 'Teknologi Multinasional',
    durasi: '09 Menit 04 Detik',
    bukti: 'Audio wawancara2 + 10 Screenshot Transkrip & Teks [00:02 – 09:04]',
    highlight:
      'Mulai melamar segera setelah selesai sidang skripsi. Gunakan CV format ATS (CakeResume) dan bedakan CV untuk tiap role. Jangan tanya gaji duluan ke HRD sebelum ditanya.',
    entriTerkait: [1, 2, 3, 4, 5, 6, 7, 8, 10],
  },
  {
    kode: 'NS-3',
    nama: 'Saudara Francis Figo Repu (Ciko)',
    latar: 'Alumni UNKLAB Tamatan 2026 (Fakultas Ilmu Komputer)',
    jabatan: 'IT Support — PT Bank Rakyat Indonesia (Persero) Tbk Kantor Wilayah (Kanwil)',
    industri: 'Perbankan BUMN (Fresh Graduate 2026)',
    durasi: '07 Menit 29 Detik',
    bukti: 'Audio wawancara3 + 6 Screenshot Transkrip [00:02 – 07:29]',
    highlight:
      'Kuasai secara mendalam minimal 1 bidang keahlian sejak kuliah, tonjolkan skill/sertifikat/proyek website di CV, siapkan mental seleksi, manfaatkan website Kemnaker, & hindari kata ragu "Kayaknya...".',
    entriTerkait: [1, 2, 3, 4, 5, 6, 7, 10],
  },
];

export const KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    no: 1,
    slug: 'pemetaan-karir-riset-industri',
    categoryId: 1,
    subkategoriLabel: 'Kategori 1: Persiapan Sebelum Lulus',
    level: 'Pemula',
    readMinutes: 6,
    penulisUtama: 'Valentino Milano Gufron (Orang 1 – Ketua)',
    contentWriter: 'Pranata Vareliano Rumagit (Orang 6 – Content Writer 1)',
    risetWawancara: 'Swindry B. Kowimbin (Orang 4) & Hulio K. B. Jocom (Orang 2)',
    title: 'Entri 1: Panduan Pemetaan Karir (Self-Assessment) & Riset Kebutuhan Industri Sebelum Lulus',
    shortTitle: 'Pemetaan Karir & Riset Industri',
    ringkasan:
      'Banyak mahasiswa tingkat akhir baru bingung menentukan arah karir setelah upacara wisuda akibat fenomena Career Blindness dan minimnya informasi kebutuhan industri. Panduan ini membantu calon lulusan memetakan satu keahlian inti sejak kuliah, meriset deskripsi pekerjaan nyata di pasar kerja, serta menentukan jadwal tepat mulai melamar kerja.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Audit & Dalami Minimal 1 Keahlian Inti (Core Skill Focus)',
        detail:
          'Sejak semester 6–8, tentukan satu bidang spesifik yang paling Anda minati dan kuasai secara mendalam (misalnya: Web Development, Network Troubleshooting/IT Support, Data Analytics, atau B2B Sales) agar profil Anda tajam di mata perekrut.',
      },
      {
        heading: 'Langkah 2 — Bedah 10 Iklan Lowongan Kerja Target (Job Description Mapping)',
        detail:
          'Buka LinkedIn, JobStreet, Glints, dan Karirhub Kemnaker untuk posisi incaran Anda. Catat keahlian teknis, perangkat lunak, dan sertifikasi yang paling sering dipersyaratkan pada 10 lowongan tersebut sebagai kurikulum belajar pribadi sebelum lulus.',
      },
      {
        heading: 'Langkah 3 — Curi Start Melamar Segera Setelah Sidang Skripsi (Jangan Tunggu Wisuda)',
        detail:
          'Segera ajukan Surat Keterangan Lulus (SKL) dan transkrip nilai sementara setelah ujian skripsi selesai, lalu mulailah melamar karena siklus rekrutmen perusahaan rata-rata memakan waktu 2 hingga 4 bulan.',
      },
      {
        heading: 'Langkah 4 — Bangun Jejaring (Networking) dengan Alumni & Praktisi Industri',
        detail:
          'Hubungi kakak tingkat alumni UNKLAB atau senior yang bekerja di industri target untuk menanyakan kualifikasi nyata di balik iklan lowongan yang sering ditulis terlalu umum.',
      },
    ],
    kesalahanUmum: [
      'Menunggu ijazah fisik atau acara wisuda baru mulai mencari informasi lowongan kerja, sehingga kehilangan momentum fresh graduate.',
      'Bersikap "serba bisa tetapi tanggung" tanpa memiliki satu pun keahlian inti yang dikuasai secara mendalam untuk dijual saat seleksi.',
      'Hanya mengandalkan syarat normatif pada iklan lowongan tanpa berkonsultasi dengan praktisi/alumni yang memahami kebutuhan riil perusahaan.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Saran saya bagi mahasiswa yang akan segera lulus kuliah: usahakan untuk meminati dan menguasai secara mendalam minimal satu bidang keahlian sejak kuliah. Dengan begitu, ketika lulus dan mencari pekerjaan nanti, kita sudah tahu passion kita di mana dan benar-benar menguasai bidang tersebut.',
        speaker: 'Francis Figo Repu',
        role: 'Alumni UNKLAB 2026 • IT Support BRI Kanwil',
        timestamp: '06:43 – 07:15',
      },
      {
        quote:
          'Kalau dari pengalaman saya, begitu selesai lulus sidang skripsi langsung coba apply-apply saja, jangan menunda terlalu lama karena perusahaan lebih suka fresh graduate yang baru lulus dan prosesnya memakan waktu 2 sampai 4 bulan.',
        speaker: 'Vicco Manopo',
        role: 'Alumni UNKLAB 2021 • Software Engineer Perusahaan Multinasional',
        timestamp: '08:22 – 08:47',
      },
      {
        quote:
          'Mencari kerja untuk menunjang tujuan karir jangka panjang tidak cukup hanya mengandalkan skill saat ini, tetapi harus ditunjang oleh informasi akurat melalui networking (relasi) karena banyak fresh graduate belum tahu harus melamar ke mana tanpa bimbingan praktisi.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager OT Group',
        timestamp: '01:28 – 02:24 & 10:44 – 11:57',
      },
    ],
    templateFile: 'Worksheet_Self_Assessment_Karir_FreshGraduate.docx',
    driveFolderTag: 'Folder 01 • Template CV & Persiapan',
    checklist: [
      'Menetapkan 1 keahlian inti (Core Skill) dan maksimal 2 posisi target (Job Role) yang spesifik.',
      'Mengumpulkan minimal 10 Job Description terbaru dan menandai gap keahlian yang harus segera dipelajari.',
      'Menyiapkan SKL & memulai pengiriman lamaran pertama dalam H+7 setelah lulus sidang skripsi.',
    ],
    sumber:
      'Badan Pusat Statistik (BPS) — Keadaan Ketenagakerjaan Indonesia (2025); Harvard Office of Career Services — Career Exploration Framework; Wawancara Tacit Alumni UNKLAB (Oliver Patrick Lumentra, Vicco Manopo, & Francis Figo Repu, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 2,
    slug: 'cv-standar-ats-dan-surat-lamaran',
    categoryId: 1,
    subkategoriLabel: 'Kategori 1: Persiapan Sebelum Lulus',
    level: 'Pemula',
    readMinutes: 8,
    penulisUtama: 'Hulio Klose Bastian Jocom (Orang 2 – Tim Wawancara 1)',
    contentWriter: 'Pranata Vareliano Rumagit (Orang 6 – Content Writer 1)',
    risetWawancara: 'Swindry B. Kowimbin (Orang 4) & Avian R. Manopo (Orang 3)',
    title: 'Entri 2: Cara Menyusun CV Standar ATS (Applicant Tracking System) & Surat Lamaran yang Lolos Screening HRD',
    shortTitle: 'CV Standar ATS & Cover Letter',
    ringkasan:
      'Mayoritas perusahaan modern menyaring ratusan hingga ribuan lamaran menggunakan sistem otomatis Applicant Tracking System (ATS) sebelum berkas dibaca oleh User Interviewer. Entri ini memandu mahasiswa menyusun CV satu kolom yang lolos pemindaian ATS, menyesuaikan isi CV per jabatan, serta menulis surat lamaran yang padat dan meyakinkan.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Gunakan Format Satu Kolom Berbasis Teks (ATS-Friendly)',
        detail:
          'Hindari tabel rumit, dua kolom sempit, ikon grafis, atau diagram persentase keahlian (skill bar 80%) karena gagal terbaca mesin ATS. Gunakan satu kolom bersih (Calibri/Arial 10–11 pt) lewat CakeResume Builder atau template Word CareerBridge, lalu ekspor ke PDF teks.',
      },
      {
        heading: 'Langkah 2 — Buat CV Berbeda untuk Setiap Posisi (Role-Specific Tailoring)',
        detail:
          'Siapkan versi CV terpisah untuk tiap jenis role pekerjaan yang Anda lamar. Kata kunci dan proyek pada CV Programmer/Web Developer harus dibedakan dengan CV untuk posisi Data Analyst, Quality Assurance (QA), atau IT Support.',
      },
      {
        heading: 'Langkah 3 — Tulis Ringkas, Padat, dan Menonjolkan Kekuatan Utama di Atas',
        detail:
          'Di hadapan User Interviewer yang memeriksa banyak berkas, cantumkan ringkasan kekuatan utama (Core Strengths), daftar keahlian teknis, sertifikat kompetensi, serta proyek kuliah terbaik secara padat dalam 1–2 halaman tanpa basa-basi.',
      },
      {
        heading: 'Langkah 4 — Sertakan Cover Letter Singkat & Subjek Email Profesional',
        detail:
          'Saat melamar lewat email HRD, tulis pengantar 3 paragraf padat di badan email (posisi dilamar, kampus asal, 1 keahlian unggulan, dan lampiran PDF tergabung rapi).',
      },
    ],
    kesalahanUmum: [
      'Mengirim satu file CV yang sama ("CV Sapu Jagat") untuk melamar role pekerjaan berbeda—misalnya CV Programmer dipakai melamar Data Analyst atau QA.',
      'Membuat CV penuh desain warna-warni berkotak-kotak dari Canva sehingga teksnya rusak/kosong saat dipindai mesin ATS.',
      'Menulis narasi paragraf terlalu panjang dan bertele-tele sehingga kekuatan utama (core strengths) pelamar tenggelam.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Untuk cara membuat CV yang menarik, kebanyakan perusahaan sekarang sudah memakai format ATS. Kita bisa memakai template gratis atau platform seperti CakeResume Builder. Kesalahan terbesar saya dulu adalah apply ke berbagai role memakai satu CV yang sama—contohnya CV Programmer dipakai melamar Data Analyst atau QA, padahal seharusnya tiap role memiliki CV masing-masing.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '03:26 – 03:55 & 07:20 – 08:10',
      },
      {
        quote:
          'Sebagai user interviewer untuk posisi tim kami, bagi saya CV yang menarik untuk dilihat adalah CV yang tidak bertele-tele: singkat, padat, namun mampu langsung menjelaskan kekuatan utama yang dimiliki oleh calon pelamar.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager & User Interviewer OT Group',
        timestamp: '04:47 – 05:45',
      },
      {
        quote:
          'Usahakan di dalam CV kita menonjolkan skill yang kita miliki supaya HRD melihat bahwa kita punya keahlian yang mumpuni, dan lengkapi juga dengan sertifikat bila ada.',
        speaker: 'Francis Figo Repu',
        role: 'IT Support BRI Kanwil',
        timestamp: '02:51 – 03:38',
      },
    ],
    templateFile: 'Template_CV_ATS_Friendly_FreshGraduate_UNKLAB.docx (3 Variasi Role CV + 2 Cover Letter)',
    driveFolderTag: 'Folder 01 • Template CV & Cover Letter',
    checklist: [
      'CV disusun dengan format 1 kolom bersih (PDF berbasis teks < 2 MB) tanpa diagram bintang/batang.',
      'Memiliki minimal 2–3 versi CV berbeda yang disesuaikan kata kuncinya untuk tiap role target.',
      'Kekuatan utama, hard skills, dan sertifikasi relevan diletakkan jelas di paruh atas halaman pertama.',
    ],
    sumber:
      'Harvard FAS Mignone Center for Career Success (Resume & Cover Letter Guide, 2024); CakeResume ATS Formatting Standards; Wawancara Tacit Alumni UNKLAB (Vicco Manopo, Oliver Patrick Lumentra, & Francis Figo Repu, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 3,
    slug: 'portofolio-proyek-kuliah-sertifikasi',
    categoryId: 1,
    subkategoriLabel: 'Kategori 1: Persiapan Sebelum Lulus',
    level: 'Menengah',
    readMinutes: 7,
    penulisUtama: 'Swindry Brami Kowimbin (Orang 4 – Tim Research 1)',
    contentWriter: 'Pranata Vareliano Rumagit (Orang 6 – Content Writer 1)',
    risetWawancara: 'Hulio K. B. Jocom (Orang 2) & Avian R. Manopo (Orang 3)',
    title: 'Entri 3: Membangun Portofolio Proyek Kuliah & Sertifikasi bagi Fresh Graduate Tanpa Pengalaman Kerja',
    shortTitle: 'Portofolio Proyek & Sertifikasi',
    ringkasan:
      'Hampir setiap lulusan baru menghadapi dilema lowongan entry-level yang mensyaratkan pengalaman kerja 1 tahun padahal baru saja menyelesaikan kuliah. Entri ini menjelaskan cara mengonversi proyek mata kuliah, tugas akhir/skripsi, serta sertifikat kompetensi menjadi portofolio profesional yang diakui HRD.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Inventarisasi Seluruh Proyek Kuliah, Lab, & Skripsi',
        detail:
          'Kumpulkan 3–5 karya terbaik selama kuliah—seperti aplikasi web, konfigurasi jaringan, desain sistem informasi, riset pasar, atau laporan analisis data—sebagai pengganti pengalaman kerja formal (Proof of Work).',
      },
      {
        heading: 'Langkah 2 — Dokumentasikan dengan Rumus Problem – Tech/Method – Result',
        detail:
          'Jangan hanya menulis judul tugas kuliah di CV. Jelaskan secara ringkas: (a) Masalah apa yang diselesaikan, (b) Peran dan teknologi/alat apa yang dipakai (React, PHP, MySQL, Mikrotik, atau Excel), dan (c) Hasil nyata yang dicapai.',
      },
      {
        heading: 'Langkah 3 — Publikasikan di Wadah Portofolio Sesuai Bidang & Sematkan Tautan',
        detail:
          'Untuk jurusan IT unggah kode rapi beserta README & tangkapan layar ke GitHub atau hosting gratis (Vercel/Netlify); untuk non-IT susun Case Study PDF di Google Drive/Notion; lalu tempel tautan portofolio tersebut di header CV.',
      },
      {
        heading: 'Langkah 4 — Lampirkan Sertifikat Kompetensi yang Terverifikasi',
        detail:
          'Tambahkan sertifikat resmi (BNSP, Cisco NetAcad, Dicoding, Coursera, Google Career Certificates, atau TOEFL) sebagai penguat validitas keahlian Anda.',
      },
    ],
    kesalahanUmum: [
      'Mengosongkan bagian pengalaman di CV hanya karena belum pernah bekerja full-time sebagai karyawan tetap, sehingga CV terlihat kosong.',
      'Memasukkan tautan Google Drive atau GitHub portofolio di CV yang lupa dibuka aksesnya (masih Private / Restricted sehingga HRD tidak bisa membukanya).',
      'Mencantumkan sertifikat seminar umum yang tidak relevan dengan posisi, sementara sertifikat kompetensi inti justru terlewat.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Karena waktu itu saya masih fresh graduate dan belum punya pengalaman kerja, maka semua project yang pernah saya kerjakan selama kuliah saya masukkan dan tonjolkan di dalam CV.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '03:57 – 04:09',
      },
      {
        quote:
          'Kalau kita belum punya pengalaman kerja formal, masukkan pengalaman proyek yang pernah kita buat—contohnya bagi lulusan IT seperti pengalaman membuat website—serta lengkapi dengan sertifikat keahlian di dalam CV.',
        speaker: 'Francis Figo Repu',
        role: 'IT Support BRI Kanwil',
        timestamp: '03:04 – 03:38',
      },
    ],
    templateFile: 'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx',
    driveFolderTag: 'Folder 01 • Panduan Portofolio',
    checklist: [
      'Minimal 3 proyek kuliah/skripsi telah diringkas memakai format Masalah – Tools/Teknologi – Hasil.',
      'Tautan portofolio online (GitHub / Notion / Live Web / Drive) sudah diuji dalam mode Incognito agar terbuka publik.',
      'Seluruh sertifikat keahlian relevan sudah dikumpulkan rapi dan dicantumkan nomor kredensial/tahun terbitnya.',
    ],
    sumber:
      'GitHub Career Portfolio Best Practices (2025); Kementerian Ketenagakerjaan RI — Kerangka Kualifikasi Nasional Indonesia (KKNI); Wawancara Tacit Alumni UNKLAB (Vicco Manopo & Francis Figo Repu, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 4,
    slug: 'optimasi-profil-linkedin',
    categoryId: 2,
    subkategoriLabel: 'Kategori 2: Strategi Mencari & Melamar Kerja',
    level: 'Pemula',
    readMinutes: 7,
    penulisUtama: 'Julio Yesaya Korengkeng (Orang 8 – Web Designer)',
    contentWriter: 'Pranata Vareliano Rumagit (Orang 6 – Content Writer 1)',
    risetWawancara: 'Swindry B. Kowimbin (Orang 4) & Hulio K. B. Jocom (Orang 2)',
    title: 'Entri 4: Optimasi Profil LinkedIn & Personal Branding Digital agar Dilirik Perekrut (Headhunter)',
    shortTitle: 'Optimasi LinkedIn & Branding',
    ringkasan:
      'Selain portal lamaran tradisional, tim HRD dan Technical Recruiter perusahaan nasional maupun multinasional aktif berburu kandidat menggunakan mesin pencari LinkedIn. Entri ini memandu mahasiswa mengoptimasi judul profil (Headline), bagian proyek, sertifikasi, dan jaringan alumni agar akun LinkedIn mudah ditemukan perekrut.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Rapikan Custom URL & Foto Profil Profesional',
        detail:
          'Ubah tautan acak profil LinkedIn menjadi alamat bersih (linkedin.com/in/nama-lengkap) agar rapi ditempel di CV, lalu pasang foto close-up berbusana rapi dengan latar terang dan ekspresi profesional.',
      },
      {
        heading: 'Langkah 2 — Tulis Headline Kaya Kata Kunci Jabatan',
        detail:
          'Hindari hanya menulis "Fresh Graduate UNKLAB". Gunakan formula [Target Jabatan] | [3 Hard Skills Inti] | [Kampus/Sertifikasi], contoh: "Computer Science Graduate (UNKLAB) | Junior Web Developer & IT Support | React.js, Node.js, SQL".',
      },
      {
        heading: 'Langkah 3 — Isi Lengkap Bagian About, Projects, & Licenses/Certifications',
        detail:
          'Tulis 3–4 kalimat pengantar diri di kolom About, tambahkan daftar proyek kuliah pada fitur Projects, dan unggah sertifikat dengan tautan verifikasi agar algoritma LinkedIn Recruiter menaikkan peringkat profil Anda.',
      },
      {
        heading: 'Langkah 4 — Aktifkan #OpenToWork & Koneksi Sopan dengan Alumni',
        detail:
          'Aktifkan lencana Open to Work untuk maksimal 5 posisi target, lalu kirim permintaan koneksi beserta pesan singkat sopan kepada alumni UNKLAB dan HR Recruiter di industri incaran.',
      },
    ],
    kesalahanUmum: [
      'Sama sekali tidak memiliki akun LinkedIn atau membuat akun lalu dibiarkan kosong tanpa ringkasan About, skill, dan proyek sehingga dilewati perekrut.',
      'Menulis Headline terlalu umum ("Job Seeker" / "Seeking Opportunities") tanpa kata kunci jabatan maupun skill teknis yang dicari HRD.',
      'Memasang foto liburan/swafoto kasual sebagai foto profil utama serta mengunggah konten tidak profesional di beranda publik.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Untuk mengikuti perkembangan dunia kerja dan memantau peluang karir terbaru, saat ini saya rutin menggunakan LinkedIn di samping JobStreet.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager OT Group',
        timestamp: '05:57 – 06:13',
      },
      {
        quote:
          'Bagi fresh graduate, platform pencari kerja yang paling bagus digunakan antara lain LinkedIn selain Glints dan JobStreet.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '04:20 – 04:35',
      },
      {
        quote:
          'Meskipun pelamar bisa memperoleh info loker daerah lewat website Kemnaker maupun grup komunitas tanpa LinkedIn, menyiapkan profil LinkedIn sejak kuliah membuka jangkauan rekruter nasional dan multinasional jauh lebih luas.',
        speaker: 'Pembelajaran Lintas Narasumber (kontras NS-3)',
        role: 'Francis Figo Repu',
        timestamp: '03:58 – 04:12',
      },
    ],
    templateFile: 'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx (Checklist 10 Poin Audit Profil)',
    driveFolderTag: 'Folder 01 • Checklist LinkedIn',
    checklist: [
      'Custom URL LinkedIn sudah rapi (linkedin.com/in/nama-lengkap) dan disematkan di header CV ATS.',
      'Headline memuat target jabatan spesifik + minimal 3 hard skills inti.',
      'Bagian Projects dan Certifications sudah diisi lengkap beserta tautan bukti karya.',
    ],
    sumber:
      'LinkedIn Talent Solutions — Official Guide to Student & Graduate Profiles (2025); Wawancara Tacit Alumni UNKLAB (Oliver Patrick Lumentra, Vicco Manopo, & Francis Figo Repu, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 5,
    slug: 'strategi-loker-multi-channel-anti-scam',
    categoryId: 2,
    subkategoriLabel: 'Kategori 2: Strategi Mencari & Melamar Kerja',
    level: 'Menengah',
    readMinutes: 7,
    penulisUtama: 'Pranata Vareliano Rumagit (Orang 6 – Tim Content Writer 1)',
    contentWriter: 'Pranata Vareliano Rumagit (Orang 6 – Content Writer 1)',
    risetWawancara: 'Swindry B. Kowimbin (Orang 4) & Hulio K. B. Jocom (Orang 2)',
    title: 'Entri 5: Strategi Multi-Channel Berburu Lowongan Kerja (Job Portal, Website Kemnaker, Komunitas) & Pencegahan Penipuan Loker',
    shortTitle: 'Berburu Loker & Anti-Scam',
    ringkasan:
      'Mengandalkan satu aplikasi pencari kerja saja membuat lulusan baru kehilangan akses terhadap lowongan instansi daerah, BUMN, maupun jalur rekomendasi alumni. Entri ini memetakan 6 saluran pencarian kerja resmi yang terbukti efektif bagi alumni UNKLAB lengkap dengan panduan mengenali modus penipuan lowongan kerja palsu (anti-scam).',
    langkahInti: [
      {
        heading: 'Langkah 1 — Kombinasikan Portal Karir Korporat & Tech Startup',
        detail:
          'Buat profil 100% lengkap dan pasang notifikasi lowongan (Job Alert) pada Glints, LinkedIn, dan JobStreet sebagai tiga kanal utama korporat nasional/multinasional, ditambah Deall Jobs serta Tech in Asia untuk sektor teknologi/startup.',
      },
      {
        heading: 'Langkah 2 — Pantau Portal Resmi Pemerintah (Karirhub Kemnaker) & Rekrutmen Regional',
        detail:
          'Daftarkan akun terverifikasi di karirhub.kemnaker.go.id (SIAPkerja Kemnaker) serta pantau kanal rekrutmen kantor wilayah perbankan/BUMN yang sering membuka kuota penempatan daerah.',
      },
      {
        heading: 'Langkah 3 — Manfaatkan Grup Komunitas Alumni (WhatsApp/Facebook) & Job Tracker',
        detail:
          'Aktif memantau grup WhatsApp alumni jurusan, grup profesi Facebook terpercaya, serta catat setiap lamaran ke dalam spreadsheet Job Tracker (tanggal kirim, posisi, versi CV yang dipakai, & status tahap) agar tidak kelabakan saat HRD menelepon.',
      },
      {
        heading: 'Langkah 4 — Verifikasi Keaslian Lowongan (Protokol Anti-Scam 3 Cek)',
        detail:
          'Selalu cek domain email pengundang (perusahaan resmi memakai domain korporat, bukan @gmail.com/@yahoo.com), cek alamat & nomor kantor resmi di website perusahaan, dan pastikan TIDAK ada pungutan biaya apa pun.',
      },
    ],
    kesalahanUmum: [
      'Hanya menunggu notifikasi dari satu aplikasi loker saja sehingga peluang panggilan wawancara menjadi sangat sempit.',
      'Melamar secara acak ke puluhan perusahaan tanpa mencatat daftar lamarannya (bingung sendiri saat ditelepon HRD mendadak).',
      'Tergiur panggilan wawancara palsu berkedok wajib transfer biaya tiket travel, seragam, atau tes kesehatan ke rekening pribadi—rekrutmen resmi TIDAK PERNAH memungut biaya apa pun!',
    ],
    tipsNarasumber: [
      {
        quote:
          'Saya menggunakan beberapa platform seperti LinkedIn, JobStreet, Glints, Deall Jobs, dan Tech in Asia. Menurut saya, untuk fresh graduate yang paling bagus digunakan adalah Glints, LinkedIn, dan JobStreet.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '04:20 – 04:35',
      },
      {
        quote:
          'Kalau saya mencari informasi lowongan kerja dari jejaring grup WhatsApp, informasi dari Facebook, serta melalui website resmi Kemnaker (Kementerian Ketenagakerjaan).',
        speaker: 'Francis Figo Repu',
        role: 'IT Support BRI Kanwil',
        timestamp: '03:46 – 04:12',
      },
      {
        quote:
          'Untuk pekerjaan saya sekarang, dulu saya mendapatkannya lewat JobStreet, dan untuk mengikuti perkembangan peluang karir sekarang saya memakai LinkedIn serta networking industri.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager OT Group',
        timestamp: '05:57 – 06:13 & 11:24 – 11:57',
      },
    ],
    templateFile: 'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx',
    driveFolderTag: 'Folder 01 • Job Tracker Multi-Channel',
    checklist: [
      'Aktif menggunakan minimal 3 saluran berbeda: JobStreet/LinkedIn/Glints + Karirhub Kemnaker + Grup Alumni.',
      'Memiliki tabel Job Tracker yang mencatat setiap lamaran yang dikirim dan jadwal follow-up.',
      'Telah memverifikasi bahwa undangan tes berasal dari domain/kanal resmi perusahaan dan bebas pungutan biaya.',
    ],
    sumber:
      'Kementerian Ketenagakerjaan RI — Portal Resmi SIAPkerja & Karirhub Kemnaker (2025); JobStreet by SEEK Recruitment Guide; Kompas Karier — Ciri-Ciri Lowongan Kerja Palsu; Wawancara Tacit Alumni UNKLAB (Vicco Manopo, Francis Figo Repu, & Oliver Patrick Lumentra, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 6,
    slug: 'psikotes-korporat-tpa-coding-fgd',
    categoryId: 3,
    subkategoriLabel: 'Kategori 3: Menghadapi Proses Seleksi',
    level: 'Menengah',
    readMinutes: 8,
    penulisUtama: 'Elgiboa Anthony Mitchell Rengkung (Orang 5 – Tim Research 2)',
    contentWriter: 'Irmando Koyo (Orang 7 – Content Writer 2)',
    risetWawancara: 'Avian R. Manopo (Orang 3) & Narasumber Francis Figo Repu / Vicco Manopo',
    title: 'Entri 6: Strategi Menaklukkan Psikotes Korporat, Tes Potensi Akademik (TPA), Coding Test, & Focus Group Discussion (FGD)',
    shortTitle: 'Psikotes, TPA, Coding Test & FGD',
    ringkasan:
      'Lolos seleksi CV hanyalah pintu pertama; pelamar fresh graduate pada BUMN, perbankan, FMCG, dan perusahaan teknologi wajib melewati saringan Psikotes/TPA, FGD, atau Tes Teknis/Coding. Entri ini merangkum pola soal TPA yang paling sering keluar, teknik menstabilkan grafik Tes Koran (Kraepelin/Pauli), serta etika tampil konstruktif saat FGD.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Latih 3 Pola Utama Soal TPA/TKD (Verbal, Numerik, & Figural)',
        detail:
          'Biasakan diri dengan waktu ketat melalui latihan rutin: (a) Silogisme (jangan menarik kesimpulan di luar premis), (b) Deret Angka bertingkat (contoh: 3, 7, 15, 31, 63 → jawaban 127 karena selisih +4, +8, +16, +32, +64), dan (c) Rotasi/pencerminan bangun figural.',
      },
      {
        heading: 'Langkah 2 — Jaga Kestabilan Grafik Tes Koran (Kraepelin / Pauli)',
        detail:
          'Saat menjumlahkan kolom angka berderet di bawah aba-aba "Pindah!", psikolog menilai Panker (kecepatan), Tianker (ketelitian), Janker (kestabilan), & Hanker (daya tahan). Jaga ritme konsisten sejak lajur awal hingga akhir agar grafik tidak anjlok tajam.',
      },
      {
        heading: 'Langkah 3 — Ambil Peran Konstruktif saat FGD & Think Out Loud di Coding Test',
        detail:
          'Dalam FGD (6–8 kandidat), ajukan struktur pembahasan (Identifikasi Masalah → Opsi Solusi → Mitigasi Risiko) dengan sopan sambil mengajak peserta pendiam berpendapat. Pada tes coding/teknis, jelaskan alur logika berpikir Anda.',
      },
      {
        heading: 'Langkah 4 — Siapkan Ketenangan Mental & Keahlian Inti Sebelum Hari Ujian',
        detail:
          'Tidur cukup 7–8 jam sebelum tes, cek kestabilan internet & kamera 30 menit sebelumnya jika tes daring, serta matangkan penguasaan bidang inti Anda.',
      },
    ],
    kesalahanUmum: [
      'Mengebut habis-habisan di awal Tes Kraepelin/Pauli sehingga tangan lelah dan grafik jawaban anjlok drastis pada separuh akhir ujian (dianggap cepat stres).',
      'Mendominasi diskusi FGD secara agresif dan memotong pembicaraan orang lain, ATAU sebaliknya diam seribu bahasa sepanjang diskusi.',
      'Datang mengikuti ujian seleksi tanpa persiapan mental maupun latihan waktu (timer), sehingga panik dan blank di bawah batas waktu ketat.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Hal pertama yang harus disiapkan sebelum melamar dan mengikuti tahapan seleksi adalah mental, kedua adalah CV, dan ketiga persiapan diri menghadapi ujian/wawancara—karena pada saat itulah mental kita benar-benar akan diuji.',
        speaker: 'Francis Figo Repu',
        role: 'IT Support BRI Kanwil',
        timestamp: '04:21 – 04:46',
      },
      {
        quote:
          'Poin penilaian tiap role berbeda—misalnya untuk posisi Programmer vs Data Analyst vs Quality Assurance—sehingga persiapan teknis dan proyek yang ditonjolkan harus spesifik sesuai tuntutan posisi yang diuji.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '07:31 – 08:10',
      },
    ],
    templateFile: 'Bank_Soal_Latihan_TPA_Psikotes_dan_Panduan_FGD.docx (15 Soal Verbal, Numerik & Logika + Pembahasan)',
    driveFolderTag: 'Folder 02 • Bank Soal TPA & Psikotes',
    checklist: [
      'Berlatih minimal 2 set simulasi soal TPA (Silogisme & Deret Angka) menggunakan timer.',
      'Memahami 4 parameter penilaian Tes Kraepelin/Pauli (Panker, Tianker, Janker, Hanker).',
      'Menyiapkan ruang tenang, perangkat cadangan, dan mengulas materi teknis inti H-1 tes.',
    ],
    sumber:
      'Forum Human Capital Indonesia (FHCI) — Panduan Tes Kemampuan Dasar Rekrutmen Bersama BUMN (2025); Pedoman Psikometri Tes Kraepelin-Pauli; Wawancara Tacit Alumni UNKLAB (Francis Figo Repu & Vicco Manopo, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 7,
    slug: 'wawancara-hrd-user-metode-star',
    categoryId: 3,
    subkategoriLabel: 'Kategori 3: Menghadapi Proses Seleksi',
    level: 'Lanjutan',
    readMinutes: 9,
    penulisUtama: 'Irmando Koyo (Orang 7 – Tim Content Writer 2)',
    contentWriter: 'Irmando Koyo (Orang 7 – Content Writer 2)',
    risetWawancara: 'Avian R. Manopo (Orang 3) & Elgiboa A. M. Rengkung (Orang 5)',
    title: 'Entri 7: Rahasia Lolos Wawancara HRD & User Interview Menggunakan Metode STAR (Perspektif User Interviewer & Alumni)',
    shortTitle: 'Wawancara HRD & User (STAR)',
    ringkasan:
      'Tahap wawancara terbagi menjadi Wawancara HRD (menguji motivasi, karakter, dan kecocokan budaya) serta Wawancara User oleh Manajer Divisi (menguji kompetensi teknis dan pemahaman peran). Entri ini memadukan kerangka jawaban standar global STAR dengan rahasia penilaian langsung dari User Interviewer dan alumni agar jawaban Anda tegas, jujur, dan langsung tepat sasaran.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Susun Jawaban Pengalaman dengan Rumus Metode STAR',
        detail:
          'Setiap kali ditanya "Ceritakan proyek atau masalah yang pernah Anda selesaikan", jawab terstruktur dalam 60–90 detik: (1) Situation: konteks singkat masalah, (2) Task: tanggung jawab spesifik Anda, (3) Action: langkah nyata & tools yang dipakai, (4) Result: hasil terukur yang dicapai.',
      },
      {
        heading: 'Langkah 2 — Riset Mendalam Profil Perusahaan & Garis Tanggung Jawab Posisi',
        detail:
          'Minimal H-1 wawancara, catat sejarah/asal-usul perusahaan, produk atau layanannya, serta pahami detail tugas harian posisi yang dilamar—termasuk kepada jabatan apa posisi tersebut bertanggung jawab (melapor).',
      },
      {
        heading: 'Langkah 3 — Jawab Tegas, Jujur Apa Adanya, dan Paparkan Kontribusi Nyata',
        detail:
          'Ceritakan proyek kuliah/skripsi Anda dengan nada yakin tanpa ragu, jujur atas peran pribadi vs tim, serta jelaskan bagaimana keterampilan Anda membantu tim mereka.',
      },
    ],
    kesalahanUmum: [
      'Menjawab pertanyaan pewawancara secara berputar-putar / bertele-tele tanpa poin inti sehingga pewawancara kehilangan fokus.',
      'Berbohong atau mengarang pengalaman kerja di hadapan User Interviewer—pewawancara berpengalaman langsung mengujinya lewat pertanyaan lanjutan hingga kandidat lari dari pertanyaan.',
      'Menggunakan kata-kata ragu seperti "Kayaknya saya bisa..." atau "Mungkin nanti saya coba..." saat ditanya kemampuan teknis.',
      'Sudah lolos CV dan tahap awal, lalu gagal fatal di tengah jalan karena tidak meriset asal-usul perusahaan maupun tidak tahu posisi itu bekerja apa dan melapor kepada siapa.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Sebagai user interviewer, hal yang paling harus dihindari saat wawancara adalah menjawab secara bertele-tele dan berbohong. Kalau pelamar berbohong, biasanya ketahuan karena akan lari dari pertanyaan. Dan kesalahan paling disayangkan adalah ketika kandidat sudah lolos setengah jalan, tapi gagal karena kurang riset—tidak tahu secara spesifik posisi yang dilamar itu pekerjaannya apa dan bertanggung jawab kepada siapa.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager & User Interviewer OT Group',
        timestamp: '08:28 – 10:20',
      },
      {
        quote:
          'Saat wawancara, kita wajib mencari tahu terlebih dahulu asal-usul perusahaan yang dilamar karena hal tersebut bisa ditanyakan. Dan hindari kata-kata yang terdengar ragu atau kurang meyakinkan—misalnya ketika ditanya kemampuan, jangan menjawab dengan kata "Kayaknya bisa begini..." atau "Kayaknya saya bisa...".',
        speaker: 'Francis Figo Repu',
        role: 'IT Support BRI Kanwil',
        timestamp: '04:47 – 05:54',
      },
      {
        quote:
          'Wawancara pertama pasti gugup karena belum punya pengalaman praktis, jadi pelajari ulang daftar proyek selama kuliah serta profil perusahaan yang akan mewawancarai kita.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '04:40 – 06:03',
      },
    ],
    templateFile: 'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx (8 Jawaban STAR vs Jawaban Fatal)',
    driveFolderTag: 'Folder 03 • Cheat Sheet Wawancara STAR',
    checklist: [
      'Merangkum asal-usul perusahaan, produk utama, & garis pelaporan posisi yang dilamar minimal H-1.',
      'Menyiapkan 3 cerita pengalaman proyek kuliah/organisasi dalam struktur Situation–Task–Action–Result (STAR).',
      'Berlatih menjawab lantang sambil menghilangkan kebiasaan mengucapkan kata "kayaknya" atau "mungkin".',
    ],
    sumber:
      'MIT Career Advising & Professional Development — STAR Behavioral Interview Method (2024); Harvard Business Review — Job Interview Preparation Guide; Wawancara Tacit Alumni UNKLAB (Oliver Patrick Lumentra, Francis Figo Repu, & Vicco Manopo, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 8,
    slug: 'negosiasi-gaji-dan-kontrak-pkwt-pkwtt',
    categoryId: 4,
    subkategoriLabel: 'Kategori 4: Negosiasi, Kontrak & Adaptasi',
    level: 'Lanjutan',
    readMinutes: 8,
    penulisUtama: 'Avian Rivan Manopo (Orang 3 – Tim Wawancara 2)',
    contentWriter: 'Irmando Koyo (Orang 7 – Content Writer 2)',
    risetWawancara: 'Elgiboa A. M. Rengkung (Orang 5) & Vicco Manopo (Narasumber)',
    title: 'Entri 8: Etika Negosiasi Gaji Fresh Graduate & Panduan Memahami Kontrak Kerja (PKWT vs PKWTT Sesuai PP No. 35 Tahun 2021)',
    shortTitle: 'Negosiasi Gaji & Kontrak PKWT/PKWTT',
    ringkasan:
      'Memasuki tahap akhir seleksi, lulusan baru sering canggung menentukan kapan waktu tepat membahas gaji serta kurang teliti membaca pasal surat perjanjian kerja. Entri ini mengajarkan etika diplomatis negosiasi gaji fresh graduate dan bedah perlindungan hukum kontrak kerja PKWT vs PKWTT berdasarkan PP No. 35 Tahun 2021.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Terapkan Etika Diplomatis: Tunggu HRD Membuka Topik Gaji Lebih Dulu',
        detail:
          'Jangan menanyakan nominal gaji duluan pada sesi wawancara awal sebelum perusahaan menyatakan ketertarikan. Tunggu hingga HRD menanyakan "Berapa ekspektasi gaji Anda?" pada akhir wawancara atau tahap Offering Letter.',
      },
      {
        heading: 'Langkah 2 — Sampaikan Rentang Gaji (Salary Range) Berbasis Riset UMK & Industri',
        detail:
          'Siapkan kisaran angka wajar sesuai Upah Minimum Provinsi/Kabupaten/Kota (UMP/UMK) lokasi penempatan serta survei gaji posisi entry-level (sebutkan rentang Rp X – Rp Y sambil tetap terbuka mendiskusikan paket tunjangan perusahaan).',
      },
      {
        heading: 'Langkah 3 — Audit 5 Klausul Wajib Sebelum Menandatangani Kontrak (PP No. 35 Tahun 2021)',
        detail:
          'Periksa status kontrak Anda: (1) Jika PKWT (Kontrak), menurut Pasal 58 UU Cipta Kerja DILARANG ada masa probation dan di akhir kontrak berhak atas Uang Kompensasi; (2) Jika PKWTT (Karyawan Tetap), boleh ada probation maksimal 3 bulan; (3) Pastikan rincian gaji pokok, tunjangan, BPJS, & jam kerja tertulis jelas.',
      },
    ],
    kesalahanUmum: [
      'Kesalahan fatal bagi fresh graduate: langsung menanyakan nominal gaji dan tunjangan terlebih dahulu ke HRD sebelum membuktikan kualitas diri.',
      'Menyebut angka ekspektasi asal-asalan tanpa riset UMK atau tergesa-gesa menandatangani kontrak PKWT tanpa sadar adanya klausul probation ilegal/denda resign tidak wajar.',
      'Menyerahkan ijazah asli sebagai jaminan tanpa berita acara penyerahan resmi yang ditandatangani kedua pihak.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Kesalahan yang cukup fatal saat wawancara—apalagi bagi yang masih fresh graduate—adalah langsung menanyakan soal gaji terlebih dahulu kepada HRD, kecuali kalau pihak HRD yang lebih dulu menanyakan berapa ekspektasi gaji kita. Sebaiknya kita tetap bersikap diplomatis: tunggu sampai HRD bertanya lebih dulu soal ekspektasi gaji, barulah di situ kita melakukan negosiasi.',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '06:04 – 07:02',
      },
    ],
    templateFile: 'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx (Skrip Gaji & Tabel PP 35/2021)',
    driveFolderTag: 'Folder 03 • Panduan Gaji & Hukum Kontrak',
    checklist: [
      'Mengecek nilai UMP/UMK lokasi kerja target dan survei gaji posisi sebelum masuk tahap Offering.',
      'Memastikan topik gaji disampaikan secara diplomatis setelah HRD menanyakannya lebih dahulu.',
      'Memeriksa kesesuaian status kontrak (PKWT tanpa probation vs PKWTT maks. 3 bulan probation), komponen take-home pay, dan BPJS sebelum tanda tangan.',
    ],
    sumber:
      'Peraturan Pemerintah RI No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja & PHK (jo. UU Cipta Kerja); Indonesia Salary Guide (Michael Page & PersolKelly, 2025); Wawancara Tacit Alumni UNKLAB (Vicco Manopo, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 9,
    slug: 'budaya-kerja-perusahaan-probation',
    categoryId: 4,
    subkategoriLabel: 'Kategori 4: Negosiasi, Kontrak & Adaptasi',
    level: 'Menengah',
    readMinutes: 7,
    penulisUtama: 'Alexander Jonatan Tukoshi Rantung (Orang 9 – Dokumentasi & QC)',
    contentWriter: 'Irmando Koyo (Orang 7 – Content Writer 2)',
    risetWawancara: 'Elgiboa A. M. Rengkung (Orang 5) & Oliver Patrick Lumentra / Avian R. Manopo',
    title: 'Entri 9: Mengenali Budaya Kerja Perusahaan (Company Culture) & Strategi Sukses Melewati Masa Probation 90 Hari Pertama',
    shortTitle: 'Budaya Kerja & Probation 90 Hari',
    ringkasan:
      'Diterima bekerja bukanlah garis finis, karena lulusan baru harus menghadapi Culture Shock dunia kerja sekaligus evaluasi masa percobaan (Probation 3 bulan pertama). Entri ini memaparkan cara memetakan budaya kerja asli perusahaan sebelum bergabung serta panduan rencana kerja terukur 30–60–90 hari pertama.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Pelajari Budaya Kerja Asli Melalui Relasi Industri Sebelum Masuk',
        detail:
          'Setiap sektor memiliki ritme khas (misal: target lapangan cepat di FMCG, sistem Agile/Sprint di IT Multinasional, atau kepatuhan SOP & kerahasiaan data tinggi di perbankan BUMN). Tanyakan kondisi nyata lingkungan kerja tim ke senior/alumni.',
      },
      {
        heading: 'Langkah 2 — Jalankan Peta Adaptasi 30–60–90 Hari Pertama ("The First 90 Days")',
        detail:
          'Hari 1–30 (Fase Belajar): catat seluruh SOP & konfirmasi indikator lulus probation (KPI). Hari 31–60 (Fase Eksekusi Mandiri): selesaikan tugas tepat waktu dengan minim revisi. Hari 61–90 (Fase Kontribusi Terukur): rangkum pencapaian kinerja untuk evaluasi pengangkatan karyawan.',
      },
      {
        heading: 'Langkah 3 — Bangun Etika Komunikasi Proaktif & Dokumentasi Kerja',
        detail:
          'Biasakan memberi kabar progres pekerjaan (status update) kepada atasan sebelum ditanya, catat instruksi agar tidak mengulang kesalahan yang sama, dan jaga sikap kolaboratif.',
      },
    ],
    kesalahanUmum: [
      'Menerima tawaran kerja tanpa meriset latar belakang industri maupun company culture, lalu mengundurkan diri cepat (resign dini) akibat Culture Shock.',
      'Bersikap pasif selama masa probation ("menunggu disuruh" dan takut bertanya pada minggu pertama) sehingga dinilai lambat beradaptasi.',
      'Tidak mencatat SOP dan alur kerja tim saat onboarding sehingga berulang kali menanyakan hal dasar yang sama kepada rekan senior.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Sebelum kita masuk ke sebuah perusahaan, kita wajib tahu bagaimana background perusahaan tersebut dan bagaimana company culture-nya. Informasi mengenai apa yang benar-benar terjadi di dalam perusahaan dan bagaimana budaya kerjanya sangat sulit dilihat hanya dari internet, sehingga penting sekali memperbanyak relasi (networking) untuk mendapatkan gambaran nyatanya.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager OT Group',
        timestamp: '06:48 – 07:03 & 10:44 – 11:57',
      },
    ],
    templateFile: 'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx (Bagian 4: Rencana 30-60-90 Hari Probation)',
    driveFolderTag: 'Folder 03 • Rencana Kerja 90 Hari',
    checklist: [
      'Mengonfirmasi target pencapaian evaluasi masa percobaan (KPI Probation) pada minggu pertama bekerja.',
      'Membuat catatan pribadi berisi SOP tim, daftar kontak lintas divisi, dan alur persetujuan.',
      'Meminta sesi umpan balik singkat (feedback 1-on-1) dari atasan pada akhir bulan ke-1 dan bulan ke-2.',
    ],
    sumber:
      'Watkins, Michael D. (2013), The First 90 Days: Proven Strategies for Getting Up to Speed Faster and Smarter (Harvard Business Review Press); Wawancara Tacit Alumni UNKLAB (Oliver Patrick Lumentra, November 2026).',
    updatedAt: '17 November 2026',
  },
  {
    no: 10,
    slug: 'atasi-burnout-anxiety-masa-tunggu',
    categoryId: 2,
    subkategoriLabel: 'Kategori 2: Strategi Mencari & Melamar Kerja',
    level: 'Semua Level',
    readMinutes: 7,
    penulisUtama: 'Kolaborasi Tim (Pranata Vareliano Rumagit, Irmando Koyo, & Valentino Milano Gufron)',
    contentWriter: 'Irmando Koyo (Orang 7) & Pranata Vareliano Rumagit (Orang 6)',
    risetWawancara: 'Hulio K. B. Jocom (Orang 2) & Avian R. Manopo (Orang 3)',
    title: 'Entri 10: Mengatasi Post-Graduation Anxiety, Burnout, Tekanan Lingkungan, & Menjaga Produktivitas Selama Masa Tunggu (Gap Time)',
    shortTitle: 'Atasi Burnout & Masa Tunggu',
    ringkasan:
      'Masa transisi setelah lulus sebelum memperoleh pekerjaan pertama (rata-rata 2 hingga 4 bulan) kerap memicu kecemasan, kelelahan emosional akibat penolakan (burnout), serta tekanan pertanyaan dari lingkungan sekitar. Entri ini membantu lulusan baru menormalisasi masa tunggu, menyusun rutinitas harian terstruktur, serta mengubah jeda waktu tunggu menjadi peningkatan daya saing karir.',
    langkahInti: [
      {
        heading: 'Langkah 1 — Normalisasi Ekspektasi: Masa Tunggu 2–4 Bulan adalah Proses Wajar',
        detail:
          'Hasil wawancara terhadap ketiga alumni UNKLAB di sektor FMCG, IT Multinasional, maupun Perbankan BUMN membuktikan proses dari mulai melamar hingga diterima kerja rata-rata memakan waktu 2 sampai 4 bulan. Penolakan awal adalah bagian alami dari seleksi.',
      },
      {
        heading: 'Langkah 2 — Terapkan Jadwal "Jam Kerja Pencari Kerja" agar Terhindar dari Burnout',
        detail:
          'Hindari mengirim lamaran tanpa jeda hingga larut malam. Terapkan jadwal sehat: pukul 08.00–12.00 untuk riset loker, menyesuaikan CV ATS, & latihan TPA; pukul 13.30–16.00 untuk memperbarui portofolio/sertifikasi; setelah pukul 17.00 tutup portal kerja untuk berolahraga, beribadah, dan istirahat.',
      },
      {
        heading: 'Langkah 3 — Hadapi Pertanyaan Lingkungan dengan Tenang & Lakukan Audit Mingguan',
        detail:
          'Saat ditanya "Sudah kerja di mana?", jawab tenang dan optimis ("Sedang dalam tahapan seleksi di beberapa perusahaan, mohon doanya"). Evaluasi titik gugur tiap minggu: bila 20 CV tanpa panggilan → perbaiki CV ATS; bila sering gagal wawancara → latih metode STAR.',
      },
    ],
    kesalahanUmum: [
      'Menyalahkan diri dan mengalami burnout hanya karena dalam 2–3 minggu pertama belum menerima panggilan, padahal siklus normal seleksi memakan waktu 2–4 bulan.',
      'Membiarkan masa tunggu berlalu pasif tanpa menambah proyek portofolio atau sertifikat, sehingga tercipta "gap" kosong saat ditanya HRD.',
      'Mengirim puluhan lamaran asal-asalan (mass-apply dengan 1 CV sama) karena panik dikejar tekanan sosial lingkungan sekitar.',
    ],
    tipsNarasumber: [
      {
        quote:
          'Pertama kali mencari pekerjaan setelah lulus kuliah tentu ada rasa gelisah, apalagi ada dilema karena hampir semua loker mensyaratkan pengalaman kerja, ditambah tekanan sering ditanya-tanya lingkungan sekitar apakah sudah dapat kerja atau belum. Karena itu hal pertama yang wajib disiapkan adalah mental.',
        speaker: 'Francis Figo Repu',
        role: 'Alumni 2026 • IT Support BRI Kanwil (proses 2–3/4 bulan)',
        timestamp: '01:10 – 02:40 & 04:21 – 04:46',
      },
      {
        quote:
          'Untuk proses mendapatkan pekerjaan pertama sejak selesai sidang skripsi hingga diterima di bidang Software Engineer memakan waktu sekitar 2 sampai 3 bulan (3–4 bulan).',
        speaker: 'Vicco Manopo',
        role: 'Software Engineer Perusahaan Multinasional',
        timestamp: '02:47 – 03:18',
      },
      {
        quote:
          'Kurang lebih membutuhkan waktu sekitar 2 sampai 4 bulan dari awal mulai mengirim lamaran, mengikuti interview, hingga akhirnya menerima offering letter.',
        speaker: 'Oliver Patrick Lumentra',
        role: 'Area Sales Manager OT Group',
        timestamp: '04:01 – 04:36',
      },
    ],
    templateFile: 'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx (Jadwal Harian Anti-Burnout)',
    driveFolderTag: 'Folder 01 • Jadwal Rutinitas Harian',
    checklist: [
      'Menerapkan jam khusus berburu kerja maksimal 4–5 jam/hari supaya kesehatan mental dan fisik terjaga.',
      'Mengisi masa tunggu dengan minimal 1 pembaruan proyek portofolio atau penyelesaian 1 kursus sertifikasi per bulan.',
      'Melakukan evaluasi mingguan terhadap titik gugur seleksi (CV ATS vs Psikotes vs Wawancara).',
    ],
    sumber:
      'American Psychological Association (APA) — Managing Post-Graduation Transition & Job Search Burnout (2024); Wawancara Tacit 3 Alumni UNKLAB (Francis Figo Repu, Vicco Manopo, & Oliver Patrick Lumentra, November 2026).',
    updatedAt: '17 November 2026',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: 'Apakah saya harus menunggu ijazah keluar atau acara wisuda dulu baru boleh mulai melamar kerja?',
    answer:
      'Tidak perlu menunggu wisuda. Narasumber alumni kami Vicco Manopo (Software Engineer Multinasional [01:19–01:45 & 08:22–08:47]) menyarankan agar mulai melamar segera setelah lulus sidang skripsi menggunakan Surat Keterangan Lulus (SKL) karena proses seleksi rata-rata memakan waktu 2 sampai 4 bulan.',
    relatedEntryNo: 1,
  },
  {
    id: 2,
    question: 'Berapa lama rata-rata waktu yang wajar dibutuhkan fresh graduate sampai mendapat pekerjaan pertama?',
    answer:
      'Berdasarkan pengalaman nyata ketiga narasumber kami di tiga industri berbeda (FMCG oleh Bapak Oliver Lumentra [04:06–04:30], IT Multinasional oleh Bapak Vicco Manopo [02:47–03:12], dan Perbankan BUMN BRI oleh Saudara Francis Figo Repu [02:27–02:40]), waktu tunggu normal berkisar antara 2 hingga 4 bulan.',
    relatedEntryNo: 10,
  },
  {
    id: 3,
    question: 'Mengapa saya sudah mengirim puluhan CV tetapi tidak pernah dipanggil wawancara (sering kena ghosting)?',
    answer:
      'Penyebab tersering ada dua: CV penuh tabel/desain grafis sehingga gagal dibaca mesin Applicant Tracking System (ATS), ATAU mengirim satu file CV sama untuk role berbeda. Bapak Vicco Manopo ([07:20–08:10]) menegaskan setiap posisi (Programmer, Data Analyst, QA, IT Support) wajib memakai CV berbeda yang kata kuncinya disesuaikan.',
    relatedEntryNo: 2,
  },
  {
    id: 4,
    question: 'Bagaimana cara mengisi bagian pengalaman di CV kalau saya belum pernah bekerja secara formal sama sekali?',
    answer:
      'Ganti pengalaman kerja dengan portofolio proyek mata kuliah, tugas akhir/skripsi, asisten lab, maupun proyek pembuatan sistem/website, ditambah sertifikasi kompetensi. Strategi inilah yang mengantar Bapak Vicco Manopo ([03:57–04:09]) dan Saudara Francis Figo Repu ([03:04–03:38]) lolos seleksi.',
    relatedEntryNo: 3,
  },
  {
    id: 5,
    question: 'Platform apa yang paling efektif untuk berburu lowongan kerja bagi lulusan baru UNKLAB?',
    answer:
      'Gunakan strategi multi-channel: Glints, LinkedIn, dan JobStreet unggul untuk korporat nasional/multinasional & startup (rekomendasi Vicco Manopo [04:20–04:35] & Oliver Lumentra [05:57–06:13]). Pantau juga website resmi pemerintah Karirhub Kemnaker serta grup WhatsApp dan Facebook alumni untuk lowongan penempatan wilayah (jalur Francis Figo Repu ke BRI Kanwil [03:46–04:12]).',
    relatedEntryNo: 5,
  },
  {
    id: 6,
    question: 'Apa kesalahan paling fatal saat User Interview yang sering membuat kandidat langsung gugur?',
    answer:
      'Menurut Bapak Oliver Patrick Lumentra selaku User Interviewer di Orang Tua Group ([08:28–10:20]), kesalahan fatal tersebut adalah menjawab bertele-tele, berbohong/mengarang cerita (pasti ketahuan saat dikejar pertanyaan), serta tidak meriset sehingga tidak tahu detail posisi itu bekerja apa dan bertanggung jawab kepada siapa.',
    relatedEntryNo: 7,
  },
  {
    id: 7,
    question: 'Kata-kata atau sikap seperti apa yang pantang diucapkan di hadapan pewawancara?',
    answer:
      'Jangan mengucapkan kalimat ragu seperti "Kayaknya saya bisa begini..." atau "Kayaknya saya mampu..." karena langsung menurunkan keyakinan pewawancara terhadap kesiapan mental Anda (tips Saudara Francis Figo Repu [05:28–05:54]). Jawab dengan tegas dan pastikan sudah meriset asal-usul perusahaan sebelumnya.',
    relatedEntryNo: 7,
  },
  {
    id: 8,
    question: 'Bolehkah pelamar fresh graduate langsung menanyakan gaji di awal sesi wawancara dengan HRD?',
    answer:
      'Tidak disarankan. Bapak Vicco Manopo ([06:04–07:02]) mengingatkan bahwa menanyakan gaji terlebih dahulu kepada HRD adalah kesalahan fatal bagi fresh graduate. Bersikaplah diplomatis: tunggu sampai HRD menanyakan ekspektasi gaji Anda lebih dulu baru bernegosiasi.',
    relatedEntryNo: 8,
  },
  {
    id: 9,
    question: 'Apa perbedaan hak dan aturan masa percobaan (probation) antara kontrak PKWT dan PKWTT?',
    answer:
      'Berdasarkan UU Cipta Kerja & PP No. 35 Tahun 2021: PKWT (karyawan kontrak waktu tertentu) DILARANG mencantumkan masa probation dan perusahaan wajib memberi Uang Kompensasi di akhir masa kontrak. Sebaliknya, PKWTT (karyawan tetap) boleh mencantumkan masa probation paling lama 3 bulan.',
    relatedEntryNo: 8,
  },
  {
    id: 10,
    question: 'Bagaimana cara menjaga kewarasan mental ketika merasa gelisah dan terus ditanya lingkungan "Sudah kerja di mana?"?',
    answer:
      'Pahami bahwa rasa gelisah tersebut normal dialami lulusan baru (Francis Figo Repu [01:10–01:44]). Kunci utamanya adalah menyiapkan mental sebelum melamar, menerapkan jadwal harian terukur (4–5 jam/hari berburu loker + mendalami 1 keahlian inti), serta menyadari durasi pencarian 2–4 bulan adalah wajar.',
    relatedEntryNo: 10,
  },
];

export const DRIVE_ASSETS: DriveAssetItem[] = [
  {
    folderCode: 'Folder 01',
    folderName: '01_Template_CV_dan_Surat_Lamaran',
    fileName: 'Template_CV_ATS_Friendly_FreshGraduate_UNKLAB.docx',
    description: 'Berisi 3 template CV 1-kolom siap edit sesuai role (Software Engineer, IT Support, MT Sales/Business) + 2 contoh Cover Letter Indonesia & Inggris.',
    forEntries: 'Entri 2',
  },
  {
    folderCode: 'Folder 01',
    folderName: '01_Template_CV_dan_Surat_Lamaran',
    fileName: 'Worksheet_Self_Assessment_Karir_FreshGraduate.docx',
    description: 'Lembar kerja pemetaan 1 Core Skill Focus, audit 10 iklan lowongan, dan timeline melamar pasca sidang skripsi.',
    forEntries: 'Entri 1',
  },
  {
    folderCode: 'Folder 01',
    folderName: '01_Template_CV_dan_Surat_Lamaran',
    fileName: 'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx',
    description: 'Template README GitHub / studi kasus Notion untuk proyek kuliah & 10 poin audit profil LinkedIn Recruiter.',
    forEntries: 'Entri 3 & 4',
  },
  {
    folderCode: 'Folder 01',
    folderName: '01_Template_CV_dan_Surat_Lamaran',
    fileName: 'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx',
    description: 'Tabel pelacak lamaran multi-channel serta jadwal "Jam Kerja Pencari Kerja" anti-burnout.',
    forEntries: 'Entri 5 & 10',
  },
  {
    folderCode: 'Folder 02',
    folderName: '02_Soal_Latihan_Psikotes_dan_TPA',
    fileName: 'Bank_Soal_Latihan_TPA_Psikotes_dan_Panduan_FGD.docx',
    description: '15 soal latihan Silogisme, Analogi, Deret Angka, Aritmatika & Logika Kerja lengkap pembahasan + panduan 4 parameter Tes Koran Kraepelin/Pauli & FGD 15 menit.',
    forEntries: 'Entri 6',
  },
  {
    folderCode: 'Folder 03',
    folderName: '03_Panduan_Wawancara_dan_Negosiasi_Gaji',
    fileName: 'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx',
    description: '8 jawaban STAR terbaik vs fatal, skrip negosiasi & benchmark gaji 2026, tabel PP No. 35/2021 (PKWT vs PKWTT), & rencana kerja 90 hari masa probation.',
    forEntries: 'Entri 7, 8 & 9',
  },
  {
    folderCode: 'Folder 04',
    folderName: '04_Dokumentasi_Wawancara_dan_Laporan_Tim',
    fileName: 'Catatan_dan_Instrumen_Wawancara_CareerBridge_Kelompok7.docx (+ Rekaman NS-1, NS-2, NS-3)',
    description: 'Bukti rekaman asli wawancara 3 narasumber alumni UNKLAB, transkrip bertimestamp, matriks perbandingan, & bank kutipan.',
    forEntries: 'Dokumentasi Tacit',
  },
  {
    folderCode: 'Folder 04',
    folderName: '04_Dokumentasi_Wawancara_dan_Laporan_Tim',
    fileName: 'FINAL_REPORT_CareerBridge_Kelompok7.docx & Log_Kontribusi_Kelompok7_CareerBridge.xlsx',
    description: 'Laporan akhir lengkap analisis SECI, daftar sumber explicit, instrumen uji coba, dan Google Sheets Log Kontribusi 9 anggota.',
    forEntries: 'Dokumentasi & QC',
  },
];

export const EXPLICIT_SOURCES: ExplicitSourceItem[] = [
  {
    entri: 'Entri 1',
    sumber: 'Badan Pusat Statistik (BPS) RI (2025) — Publikasi Keadaan Ketenagakerjaan Indonesia; Harvard Office of Career Services — Career Exploration Guide.',
    peneliti: 'Swindry Brami Kowimbin (Orang 4)',
  },
  {
    entri: 'Entri 2',
    sumber: 'Harvard FAS Mignone Center for Career Success (2024) — Resume & Cover Letter Writing Guide; CakeResume Official ATS Formatting Standards.',
    peneliti: 'Swindry Brami Kowimbin (Orang 4)',
  },
  {
    entri: 'Entri 3',
    sumber: 'GitHub Career Portfolio Standards (2025); Kementerian Ketenagakerjaan RI — Kerangka Kualifikasi Nasional Indonesia (KKNI) & BNSP.',
    peneliti: 'Swindry Brami Kowimbin (Orang 4)',
  },
  {
    entri: 'Entri 4',
    sumber: 'LinkedIn Talent Solutions (2025) — Official Guide to Student & Graduate Profile Optimization.',
    peneliti: 'Swindry Brami Kowimbin (Orang 4)',
  },
  {
    entri: 'Entri 5',
    sumber: 'Kemnaker RI — Portal Resmi SIAPkerja & Karirhub Kemnaker; JobStreet by SEEK Trends Report (2025); Panduan Literasi Keamanan Siber Anti-Scam.',
    peneliti: 'Swindry Brami Kowimbin (Orang 4)',
  },
  {
    entri: 'Entri 6',
    sumber: 'Forum Human Capital Indonesia (FHCI, 2025) — Pedoman TKD/TPA Rekrutmen Bersama BUMN; Pedoman Psikometri Tes Kraepelin-Pauli.',
    peneliti: 'Elgiboa Anthony Mitchell Rengkung (Orang 5)',
  },
  {
    entri: 'Entri 7',
    sumber: 'MIT Career Advising & Professional Development (2024) — STAR Behavioral Interview Method; Harvard Business Review Interview Guide.',
    peneliti: 'Elgiboa Anthony Mitchell Rengkung (Orang 5)',
  },
  {
    entri: 'Entri 8',
    sumber: 'Peraturan Pemerintah RI No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja & PHK (jo. UU Cipta Kerja); Indonesia Salary Guide (2025).',
    peneliti: 'Elgiboa Anthony Mitchell Rengkung (Orang 5)',
  },
  {
    entri: 'Entri 9',
    sumber: 'Watkins, Michael D. (2013) — The First 90 Days: Proven Strategies for Getting Up to Speed Faster and Smarter (Harvard Business Review Press).',
    peneliti: 'Elgiboa Anthony Mitchell Rengkung (Orang 5)',
  },
  {
    entri: 'Entri 10',
    sumber: 'American Psychological Association (APA, 2024) — Managing Post-Graduation Stress, Career Transition Anxiety, and Burnout.',
    peneliti: 'Swindry (Orang 4) & Elgiboa (Orang 5)',
  },
];

export const SECI_PHASES = [
  {
    phase: '1. Socialization',
    mode: 'Tacit → Tacit',
    actor: 'Tim Wawancara (Hulio Jocom & Avian Manopo)',
    desc: 'Dialog rekaman langsung dengan 3 praktisi alumni UNKLAB lintas industri untuk menyerap nuansa pengalaman nyata melamar kerja, sudut pandang User Interviewer, dan kesalahan emosional di lapangan.',
  },
  {
    phase: '2. Externalization',
    mode: 'Tacit → Explicit',
    actor: 'Tim Wawancara & Content Writer',
    desc: 'Rekaman wawancara berdurasi total ±29 menit ditranskrip secara utuh beserta timestamp, lalu kiat lisan ("jangan pakai 1 CV untuk semua role", "hindari kata kayaknya") dikodefikasi menjadi poin tertulis.',
  },
  {
    phase: '3. Combination',
    mode: 'Explicit → Explicit',
    actor: 'Tim Research, Content Writer & Web Designer',
    desc: 'Memadukan catatan tacit terstruktur dengan regulasi PP 35/2021, metodologi STAR, TPA BUMN, dan standar CV ATS ke dalam 10 entri 6 poin seragam, 10 FAQ, dan 4 folder modul Drive di portal web ini.',
  },
  {
    phase: '4. Internalization',
    mode: 'Explicit → Tacit',
    actor: 'Mahasiswa Calon Lulusan & 3 Penguji Luar',
    desc: 'Pengguna membaca panduan di HP/laptop, mencentang checklist aksi, mengunduh template CV & soal TPA, lalu mempraktikkannya saat seleksi kerja hingga terbentuk kecakapan pribadi baru.',
  },
];

export const TACIT_CHALLENGES = [
  {
    title: 'Bahasa Lisan Bersifat Kontekstual & Ada Salah Eja Transkripsi Otomatis',
    problem:
      'Dalam rekaman wawancara alami, penangkapan suara otomatis memunculkan kata rancu ("UNKLAP", "BRI Kanwil Berry", "Kenmarker", "pasirnya"). Jika diterbitkan mentah, pembaca dapat salah paham.',
    solution:
      'Tim melakukan verifikasi manual terhadap audio asli dan memperbaiki penulisan istilah menjadi "UNKLAB", "BRI Kanwil", "Kemnaker", & "passion-nya" tanpa mengubah makna serta tetap menyertakan penanda waktu [timestamp].',
  },
  {
    title: 'Konteks Industri Narasumber Berbeda-beda',
    problem:
      'Bapak Vicco Manopo (IT Multinasional) menekankan Glints/LinkedIn/CakeResume ATS, sedangkan Saudara Francis Figo Repu (BRI Kanwil regional) memanfaatkan Kemnaker & grup WA/FB.',
    solution:
      'Alih-alih menghapus salah satu perspektif, Content Writer menggabungkannya dalam strategi Multi-Channel dengan label konteks industri yang jelas agar tidak membingungkan mahasiswa dari jurusan berbeda.',
  },
  {
    title: 'Keseimbangan Teori Akademik vs Pelajaran Nyata dari Kegagalan',
    problem:
      'Literatur internet sering terlalu teoritis sementara mahasiswa justru butuh tahu kesalahan fatal apa yang langsung menggugurkan kandidat.',
    solution:
      'Setiap entri mewajibkan kotak merah "Kesalahan Umum yang Harus Dihindari" berdampingan dengan kotak emas "Tips dari Narasumber" agar pelajaran praktis langsung menonjol.',
  },
];

export const PKWT_PKWTT_COMPARISON = [
  {
    aspek: 'Masa Percobaan (Probation)',
    pkwt: 'DILARANG ada masa percobaan. Jika tertulis di kontrak PKWT, klausul probation batal demi hukum (Pasal 58 UU Cipta Kerja).',
    pkwtt: 'Boleh mencantumkan masa probation paling lama maksimal 3 (tiga) bulan dan wajib tertulis jelas.',
  },
  {
    aspek: 'Jangka Waktu Kontrak',
    pkwt: 'Maksimal total 5 tahun termasuk perpanjangan; tidak boleh untuk pekerjaan yang bersifat permanen terus-menerus.',
    pkwtt: 'Berlaku permanen hingga usia pensiun atau berakhir sesuai prosedur resign/PHK undang-undang.',
  },
  {
    aspek: 'Hak Akhir Kontrak',
    pkwt: 'WAJIB menerima Uang Kompensasi dari perusahaan saat kontrak berakhir (minimal kerja 1 bulan terus-menerus; 12 bln = 1 bln upah).',
    pkwtt: 'Berhak atas Uang Pesangon, Penghargaan Masa Kerja (UPMK), dan Penggantian Hak apabila terjadi PHK.',
  },
  {
    aspek: 'Resign & Tahan Ijazah',
    pkwt: 'Waspadai klausul penalti denda sepihak dan jangan serahkan ijazah asli tanpa berita acara penyerahan resmi.',
    pkwtt: 'Mengikuti aturan pemberitahuan mundur standar (One Month Notice / 30 hari sebelum keluar).',
  },
];

export const MINI_TPA_SAMPLE = [
  {
    id: 1,
    question: 'Deret Angka TKD BUMN:  3,  7,  15,  31,  63,  ...',
    options: ['95', '126', '127', '131'],
    correctIndex: 2,
    explanation: 'Pola selisih berlipat dua (+4, +8, +16, +32, +64), jadi 63 + 64 = 127 (atau rumus 2n + 1).',
  },
  {
    id: 2,
    question:
      'Silogisme Seleksi: Semua staf IT Support wajib menguasai troubleshooting jaringan. Sebagian lulusan baru yang menguasai troubleshooting jaringan memiliki sertifikasi Mikrotik. Kesimpulan sahih?',
    options: [
      'Semua pemilik sertifikasi Mikrotik pasti IT Support.',
      'Sebagian staf IT Support mungkin memiliki sertifikasi Mikrotik.',
      'Staf IT Support tidak membutuhkan penguasaan jaringan.',
      'Semua staf IT Support wajib punya sertifikasi Mikrotik.',
    ],
    correctIndex: 1,
    explanation:
      'Karena sebagian penguasa jaringan punya sertifikasi Mikrotik, maka irisan yang pasti logis hanya "mungkin sebagian staf IT Support memiliki sertifikasi Mikrotik".',
  },
];
