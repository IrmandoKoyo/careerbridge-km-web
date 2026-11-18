import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCopy,
  Database,
  FileSpreadsheet,
  FolderOpen,
  Search,
  Send,
  ZoomIn,
} from 'lucide-react';
import {
  DRIVE_ASSETS,
  EXPLICIT_SOURCES,
  FAQ_ITEMS,
  INTERVIEWEES,
  KNOWLEDGE_ENTRIES,
  PROJECT_META,
  ROSTER_TEAM,
  SECI_PHASES,
  TACIT_CHALLENGES,
} from '../data/careerbridgeData';
import type { RouteView } from '../hooks/useSubpathRoute';
import { BASE_PATH } from '../hooks/useSubpathRoute';
import {
  DRIVE_LINKS,
  getEntryDocUrl,
  getTemplateUrl,
  hasDriveUrl,
  hasSheetUrl,
} from '../config/driveLinks';
import {
  fetchUserTestingFeedbacks,
  isFirebaseConfigured,
  submitUserTestingFeedback,
  type UserTestingFeedback,
} from '../lib/firebase';

/* ============================================================================
   1. SUMBER & TEMPLATE (DIRECTORY GOOGLE DRIVE + REFERENSI RESMI)
   ============================================================================ */
export function DownloadsView({ onNavigate }: { onNavigate: (r: RouteView) => void }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex flex-col justify-between gap-5 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end dark:border-zinc-800">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
            Arsip Dokumen &amp; Regulasi
          </p>
          <h1 className="font-display mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
            Sumber, Template &amp; Modul Kerja
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Kumpulan templat CV standar ATS, lembar pemetaan karir, bank soal latihan TPA, panduan wawancara STAR, dan salinan transkrip narasumber.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap">
          {hasDriveUrl() && (
            <a
              href={DRIVE_LINKS.mainFolderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#16263B] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950"
            >
              <FolderOpen strokeWidth={1.5} className="h-4 w-4" />
              Buka Google Drive Utama
              <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
            </a>
          )}
          {DRIVE_LINKS.folder04Url && (
            <a
              href={DRIVE_LINKS.folder04Url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-xs font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-200"
            >
              <FolderOpen strokeWidth={1.5} className="h-4 w-4" />
              Folder 04 (Dokumentasi)
              <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
            </a>
          )}
          {hasSheetUrl() && (
            <a
              href={DRIVE_LINKS.logSheetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-xs font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-200"
            >
              <FileSpreadsheet strokeWidth={1.5} className="h-4 w-4" />
              Log Kontribusi (Sheets)
              <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Naskah Google Docs 10 Panduan Utama */}
      <section>
        <div className="mb-4">
          <h2 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
            Naskah Google Docs 10 Panduan Utama (Bagian 01–10)
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Salinan dokumen lengkap format 6 poin yang tersimpan di Google Drive dan dapat diakses atau diunduh langsung.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {KNOWLEDGE_ENTRIES.map((entry) => {
            const docUrl = getEntryDocUrl(entry.no);
            const cleanEntryTitle = entry.title.replace(/^Entri \d+:\s*/, '');
            return (
              <div
                key={entry.no}
                className="flex min-w-0 flex-col justify-between rounded-md border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#121417] dark:hover:border-zinc-600"
              >
                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center justify-between gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-[#8A5A1E] dark:text-[#D4A373]">
                      Bagian {String(entry.no).padStart(2, '0')}
                    </span>
                    <span>{entry.subkategoriLabel.replace(/^Kategori \d+:\s*/, '')}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug text-zinc-950 dark:text-zinc-100">
                    {cleanEntryTitle}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Penulis Utama: {entry.penulisUtama.replace(/\s*\(Orang \d+.*?\)/, '')}
                  </p>
                </div>
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <button
                    onClick={() => onNavigate({ page: 'entry', entryNo: entry.no })}
                    className="text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    Baca di Portal Web
                  </button>
                  {docUrl && (
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#16263B] hover:underline dark:text-[#D4A373]"
                    >
                      Buka Google Docs
                      <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daftar Berkas */}
      <section>
        <h2 className="font-display mb-4 text-lg font-bold text-zinc-950 dark:text-white">
          Direktori Templat Siap Pakai
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {DRIVE_ASSETS.map((item) => {
            const matchEntry = item.forEntries.match(/\d+/);
            const fallbackEntryNo = matchEntry ? Number(matchEntry[0]) : 1;
            const targetUrl = getTemplateUrl(item.fileName, fallbackEntryNo);
            return (
              <div
                key={item.fileName}
                className="flex min-w-0 flex-col justify-between rounded-md border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 sm:p-5 dark:border-zinc-800 dark:bg-[#121417] dark:hover:border-zinc-600"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>{item.folderCode}</span>
                    <span>{item.forEntries}</span>
                  </div>
                  <p className="truncate font-mono text-[11px] text-zinc-400">{item.folderName}/</p>
                  <h3 className="mt-1 break-all text-sm font-semibold text-zinc-950 sm:break-words sm:text-base dark:text-zinc-100">
                    {item.fileName}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {item.description}
                  </p>
                </div>
                {targetUrl && (
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16263B] hover:underline dark:text-[#D4A373]"
                    >
                      {item.fileName.includes('FINAL_REPORT')
                        ? 'Buka Final Report'
                        : 'Buka Dokumen di Google Docs'}
                      <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </a>
                    {item.fileName.includes('FINAL_REPORT') && hasSheetUrl() && (
                      <a
                        href={DRIVE_LINKS.logSheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-white"
                      >
                        Buka Google Sheets Log
                        <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {item.folderCode === 'Folder 04' && DRIVE_LINKS.folder04Url && (
                      <a
                        href={DRIVE_LINKS.folder04Url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-white"
                      >
                        Buka Folder 04
                        <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Daftar Pustaka & Regulasi Resmi */}
      <section className="rounded-md border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-[#121417]">
        <div className="mb-4">
          <h2 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
            Rujukan Literatur &amp; Regulasi Resmi
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Seluruh panduan disusun mengacu pada regulasi ketenagakerjaan Indonesia, statistik resmi, dan literatur karier terverifikasi.
          </p>
        </div>
        <div className="space-y-2.5 md:hidden">
          {EXPLICIT_SOURCES.map((s) => (
            <div
              key={s.entri}
              className="min-w-0 rounded-md border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate({ page: 'entry', entryNo: Number(s.entri.replace('Entri ', '')) })}
                  className="inline-flex min-h-[34px] items-center rounded border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#8A5A1E] transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-[#D4A373]"
                >
                  {s.entri}
                </button>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{s.peneliti}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {s.sumber}
              </p>
            </div>
          ))}
        </div>

        <div className="table-wrapper hidden rounded-md border border-zinc-200 md:block dark:border-zinc-800">
          <table className="w-full min-w-[600px] text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3.5 py-2.5 font-semibold">Bagian</th>
                <th className="px-3.5 py-2.5 font-semibold">Sumber Literatur / Regulasi</th>
                <th className="px-3.5 py-2.5 font-semibold">Kontributor Riset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {EXPLICIT_SOURCES.map((s) => (
                <tr key={s.entri} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-3.5 py-2.5 font-mono font-medium whitespace-nowrap">
                    <button
                      onClick={() => onNavigate({ page: 'entry', entryNo: Number(s.entri.replace('Entri ', '')) })}
                      className="text-[#8A5A1E] hover:underline dark:text-[#D4A373]"
                    >
                      {s.entri}
                    </button>
                  </td>
                  <td className="px-3.5 py-2.5 leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {s.sumber}
                  </td>
                  <td className="px-3.5 py-2.5 text-zinc-500 dark:text-zinc-400">{s.peneliti}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   2. HALAMAN FAQ (MINIMALIS 10 PERTANYAAN)
   ============================================================================ */
export function FaqView({ onNavigate }: { onNavigate: (r: RouteView) => void }) {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) =>
      `${item.question} ${item.answer}`.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
          Pertanyaan Umum
        </p>
        <h1 className="font-display mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Jawaban ringkas atas kendala yang paling sering dihadapi lulusan baru dalam persiapan berkas, pencarian lowongan, wawancara, hingga kontrak kerja.
        </p>

        <div className="relative mt-5">
          <Search strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan, misal: wisuda, CV ATS, gaji, PKWT, masa tunggu..."
            className="min-h-[44px] w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-[#16263B] focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-[#121417] dark:text-white dark:focus:border-[#D4A373]"
          />
        </div>
      </header>

      <div className="divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#121417]">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-zinc-50 sm:px-5 dark:hover:bg-zinc-800/40"
              >
                <span className="text-sm font-semibold text-zinc-950 sm:text-base dark:text-zinc-100">
                  <span className="mr-2 font-mono text-xs text-zinc-400">
                    {String(item.id).padStart(2, '0')}
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  strokeWidth={1.5}
                  className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                    isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-zinc-100 bg-zinc-50/70 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {item.answer}
                  </p>
                  <button
                    onClick={() => onNavigate({ page: 'entry', entryNo: item.relatedEntryNo })}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#16263B] hover:underline dark:text-[#D4A373]"
                  >
                    Baca panduan lengkap di Bagian {String(item.relatedEntryNo).padStart(2, '0')}
                    <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
   3. HALAMAN TENTANG (CARA SITUS DISUSUN + ANGGOTA PENYUSUN + SECI + NARASUMBER)
   ============================================================================ */
export function AboutView({
  onNavigate,
  onOpenDiagramModal,
}: {
  onNavigate: (r: RouteView) => void;
  onOpenDiagramModal: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-zinc-200 pb-7 dark:border-zinc-800">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
          Tentang Basis Pengetahuan Ini
        </p>
        <h1 className="font-display mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
          Bagaimana CareerBridge Disusun
        </h1>
        <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          CareerBridge dikembangkan sebagai pusat pengetahuan terbuka bagi mahasiswa tingkat akhir dan lulusan baru (<em>fresh graduate</em>). Konten situs ini dibangun dengan menyatukan pengalaman lapangan (<em>Tacit Knowledge</em>) tiga alumni Universitas Klabat lintas industri bersama pedoman hukum serta standar rekrutmen resmi (<em>Explicit Knowledge</em>).
        </p>
      </header>

      {/* Metodologi & Model SECI */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
              Metodologi Pengelolaan Pengetahuan (Model SECI)
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Empat tahapan konversi pengalaman lisan narasumber menjadi panduan tertulis terstruktur (Nonaka &amp; Takeuchi).
            </p>
          </div>
          <button
            onClick={onOpenDiagramModal}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-200"
          >
            <ZoomIn strokeWidth={1.5} className="h-3.5 w-3.5" />
            Lihat Diagram Arsitektur
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECI_PHASES.map((p) => (
            <div
              key={p.phase}
              className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#121417]"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-950 dark:text-white">{p.phase}</span>
                <span className="font-mono text-[10px] text-zinc-500">{p.mode}</span>
              </div>
              <p className="mb-1.5 text-[11px] font-medium text-[#8A5A1E] dark:text-[#D4A373]">
                {p.actor}
              </p>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Diagram Thumbnail */}
        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#121417]">
          <button
            onClick={onOpenDiagramModal}
            className="group block w-full overflow-hidden rounded border border-zinc-200 dark:border-zinc-800"
          >
            <img
              src={`${BASE_PATH}/kerangka-konseptual.png`}
              alt="Diagram Kerangka Konseptual CareerBridge"
              className="h-auto w-full object-contain transition group-hover:opacity-95"
            />
          </button>
        </div>

        {/* Tantangan Kodifikasi Tacit -> Explicit */}
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h3 className="font-display mb-3 text-sm font-bold text-zinc-950 sm:text-base dark:text-white">
            Tantangan Mengubah Pengetahuan Tacit Menjadi Explicit &amp; Pendekatan Tim
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            {TACIT_CHALLENGES.map((ch) => (
              <div key={ch.title} className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#121417]">
                <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-100">{ch.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Tantangan:</span> {ch.problem}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-[#16263B] dark:text-[#D4A373]">Solusi:</span> {ch.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil 3 Narasumber */}
      <section>
        <h2 className="font-display mb-4 text-xl font-bold text-zinc-950 dark:text-white">
          Narasumber Praktisi &amp; Alumni
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {INTERVIEWEES.map((ns) => (
            <div
              key={ns.kode}
              className="rounded-md border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#121417]"
            >
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>{ns.industri}</span>
                <span>{ns.durasi}</span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">{ns.nama}</h3>
              <p className="text-xs font-medium text-[#8A5A1E] dark:text-[#D4A373]">{ns.jabatan}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{ns.latar}</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {ns.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar Anggota Penyusun */}
      <section className="rounded-md border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-[#121417]">
        <div className="mb-4">
          <h2 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
            Tim Penyusun — {PROJECT_META.kelompok}
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Pembagian peran tim serta tanggung jawab penulisan topik utama masing-masing kontributor.
          </p>
        </div>
        <div className="space-y-2.5 md:hidden">
          {ROSTER_TEAM.map((m) => (
            <div
              key={m.nama}
              className="min-w-0 rounded-md border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {m.noLabel}
                </span>
                <button
                  onClick={() => onNavigate({ page: 'entry', entryNo: m.entriNo })}
                  className="inline-flex min-h-[34px] items-center rounded border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-[#16263B] transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-[#D4A373]"
                >
                  {m.entriUtama}
                </button>
              </div>
              <h3 className="mt-1.5 text-sm font-semibold text-zinc-950 dark:text-white">
                {m.nama}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {m.tugasOperasional}
              </p>
            </div>
          ))}
        </div>

        <div className="table-wrapper hidden rounded-md border border-zinc-200 md:block dark:border-zinc-800">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3.5 py-2.5 font-semibold">Peran</th>
                <th className="px-3.5 py-2.5 font-semibold">Nama Anggota</th>
                <th className="px-3.5 py-2.5 font-semibold">Tanggung Jawab</th>
                <th className="px-3.5 py-2.5 font-semibold">Entri Utama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {ROSTER_TEAM.map((m) => (
                <tr key={m.nama} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-3.5 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">
                    {m.noLabel}
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-950 dark:text-white">
                    {m.nama}
                  </td>
                  <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">
                    {m.tugasOperasional}
                  </td>
                  <td className="px-3.5 py-2.5">
                    <button
                      onClick={() => onNavigate({ page: 'entry', entryNo: m.entriNo })}
                      className="text-left font-medium text-[#16263B] hover:underline dark:text-[#D4A373]"
                    >
                      {m.entriUtama}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   4. HALAMAN EVALUASI & MASUKAN PEMBACA (/masukan & /uji-coba)
   ============================================================================ */
export function TestingView({ onNavigate }: { onNavigate: (r: RouteView) => void }) {
  const [feedbacks, setFeedbacks] = useState<UserTestingFeedback[]>([]);
  const [testerName, setTesterName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [device, setDevice] = useState<'HP (Mobile)' | 'Laptop / Desktop'>('HP (Mobile)');
  const [navScore, setNavScore] = useState(5);
  const [clarityScore, setClarityScore] = useState(5);
  const [tipsScore, setTipsScore] = useState(5);
  const [driveScore, setDriveScore] = useState(5);
  const [mobileScore, setMobileScore] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUserTestingFeedbacks().then(setFeedbacks);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!testerName.trim() || !comment.trim()) return;
    setSubmitting(true);
    const res = await submitUserTestingFeedback({
      testerName: testerName.trim(),
      faculty: faculty.trim() || 'Umum / Mahasiswa',
      device,
      navScore,
      clarityScore,
      tipsScore,
      driveScore,
      mobileScore,
      comment: comment.trim(),
    });
    const refreshed = await fetchUserTestingFeedbacks();
    setFeedbacks(refreshed.length ? refreshed : [res.item, ...feedbacks]);
    setTesterName('');
    setFaculty('');
    setComment('');
    setSubmitting(false);
    setSubmittedNotice(
      res.savedTo === 'firebase'
        ? 'Terima kasih, evaluasi Anda telah tersimpan.'
        : 'Terima kasih, masukan Anda berhasil dicatat.'
    );
  };

  const handleCopyForReport = () => {
    const lines = feedbacks.map((f, idx) => {
      const avg = ((f.navScore + f.clarityScore + f.tipsScore + f.driveScore + f.mobileScore) / 5).toFixed(1);
      return `Penguji ${idx + 1}: ${f.testerName} (${f.faculty}) | ${f.device} | Tgl: ${f.createdAtLabel} | Skor Rata2: ${avg}/5.0 | Masukan: ${f.comment}`;
    });
    const text = lines.length ? lines.join('\n') : 'Belum ada data masukan tercatat.';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreFields: { label: string; value: number; setter: (n: number) => void }[] = [
    { label: 'Kemudahan Navigasi Menu', value: navScore, setter: setNavScore },
    { label: 'Kejelasan Struktur Panduan', value: clarityScore, setter: setClarityScore },
    { label: 'Manfaat Perspektif Narasumber', value: tipsScore, setter: setTipsScore },
    { label: 'Kelengkapan Template & Sumber', value: driveScore, setter: setDriveScore },
    { label: 'Kenyamanan Tampilan Mobile (HP)', value: mobileScore, setter: setMobileScore },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end dark:border-zinc-800">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
            Evaluasi Kualitas Situs
          </p>
          <h1 className="font-display mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
            Umpan Balik &amp; Masukan Pembaca
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
            Bantu kami menyempurnakan kejelasan materi, tampilan mobile, dan navigasi CareerBridge dengan mengisi evaluasi singkat setelah mencoba panduan.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-400">
          <Database strokeWidth={1.5} className="h-3.5 w-3.5" />
          {isFirebaseConfigured ? 'Firestore Terhubung' : 'Penyimpanan Lokal'}
        </span>
      </header>

      {/* Panduan cepat yang disarankan untuk dicek */}
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={() => onNavigate({ page: 'entry', entryNo: 2 })}
          className="rounded-md border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#121417]"
        >
          <p className="font-mono text-[11px] text-[#8A5A1E] dark:text-[#D4A373]">Alur Uji 01</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            Cek kelengkapan panduan CV standar ATS &amp; kesalahan umum pelamar.
          </p>
        </button>
        <button
          onClick={() => onNavigate({ page: 'entry', entryNo: 7 })}
          className="rounded-md border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#121417]"
        >
          <p className="font-mono text-[11px] text-[#8A5A1E] dark:text-[#D4A373]">Alur Uji 02</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            Tinjau teknik wawancara metode STAR dan kutipan User Interviewer.
          </p>
        </button>
        <button
          onClick={() => onNavigate({ page: 'downloads' })}
          className="rounded-md border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#121417]"
        >
          <p className="font-mono text-[11px] text-[#8A5A1E] dark:text-[#D4A373]">Alur Uji 03</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            Periksa kenyamanan akses direktori templat &amp; responsivitas layar HP.
          </p>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-md border border-zinc-200 bg-white p-5 lg:col-span-6 dark:border-zinc-800 dark:bg-[#121417]"
        >
          <h2 className="font-display text-base font-bold text-zinc-950 dark:text-white">
            Formulir Evaluasi
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={testerName}
                onChange={(e) => setTesterName(e.target.value)}
                placeholder="Nama Anda"
                className="min-h-[44px] w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-base text-zinc-900 focus:border-[#16263B] focus:bg-white focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Program Studi / Latar Belakang
              </label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Misal: Teknik Informatika / Sem. 7"
                className="min-h-[44px] w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-base text-zinc-900 focus:border-[#16263B] focus:bg-white focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Perangkat yang Digunakan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['HP (Mobile)', 'Laptop / Desktop'] as const).map((dev) => (
                <button
                  type="button"
                  key={dev}
                  onClick={() => setDevice(dev)}
                  className={`min-h-[44px] rounded-md border px-3 py-2.5 text-xs font-medium transition ${
                    device === dev
                      ? 'border-[#16263B] bg-[#16263B] text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                      : 'border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
                  }`}
                >
                  {dev}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-md border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Skor Penilaian (1 = Kurang, 5 = Sangat Baik):
            </p>
            {scoreFields.map((sf) => (
              <div
                key={sf.label}
                className="flex flex-col items-start gap-2 py-0.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{sf.label}</span>
                <div className="grid w-full grid-cols-5 gap-1.5 sm:flex sm:w-auto sm:gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => sf.setter(num)}
                      className={`h-10 w-full rounded text-xs font-semibold transition sm:h-8 sm:w-8 ${
                        sf.value === num
                          ? 'bg-[#16263B] text-white dark:bg-[#D4A373] dark:text-zinc-950'
                          : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Catatan, Kendala, &amp; Saran Perbaikan *
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tuliskan bagian yang menurut Anda perlu diperbaiki atau paling membantu..."
              className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-base text-zinc-900 focus:border-[#16263B] focus:bg-white focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          {submittedNotice && (
            <div className="rounded-md border border-zinc-300 bg-zinc-50 p-3 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              {submittedNotice}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#16263B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950"
          >
            <Send strokeWidth={1.5} className="h-4 w-4" />
            {submitting ? 'Mengirim...' : 'Kirim Masukan'}
          </button>
        </form>

        {/* Log Masukan Masuk */}
        <section className="min-w-0 space-y-4 rounded-md border border-zinc-200 bg-white p-4 sm:p-5 lg:col-span-6 dark:border-zinc-800 dark:bg-[#121417]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold text-zinc-950 dark:text-white">
                Riwayat Evaluasi ({feedbacks.length})
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Rekaman tanggapan pembaca untuk perbaikan berkelanjutan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyForReport}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {copied ? <Check strokeWidth={1.6} className="h-3.5 w-3.5 text-emerald-600" /> : <ClipboardCopy strokeWidth={1.5} className="h-3.5 w-3.5" />}
              {copied ? 'Tersalin' : 'Salin Rekap'}
            </button>
          </div>

          {feedbacks.length === 0 ? (
            <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50/70 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Belum ada evaluasi masuk
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Evaluasi yang dikirimkan melalui formulir di samping akan tampil secara langsung di sini.
              </p>
            </div>
          ) : (
            <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
              {feedbacks.map((fb, idx) => {
                const avg = ((fb.navScore + fb.clarityScore + fb.tipsScore + fb.driveScore + fb.mobileScore) / 5).toFixed(1);
                return (
                  <div
                    key={fb.id || idx}
                    className="rounded-md border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {fb.testerName}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          {fb.faculty} · {fb.device} · {fb.createdAtLabel}
                        </p>
                      </div>
                      <span className="rounded border border-zinc-200 bg-white px-2 py-0.5 font-mono text-xs font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        {avg}/5.0
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                      “{fb.comment}”
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
