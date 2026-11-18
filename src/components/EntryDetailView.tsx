import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookmarkCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Quote,
  ShieldAlert,
} from 'lucide-react';
import {
  KNOWLEDGE_ENTRIES,
  MINI_TPA_SAMPLE,
  PKWT_PKWTT_COMPARISON,
  type KnowledgeEntry,
} from '../data/careerbridgeData';
import type { RouteView } from '../hooks/useSubpathRoute';
import { getEntryDocUrl, getTemplateUrl } from '../config/driveLinks';
import {
  fetchEntryVotes,
  getLocalVotedSet,
  voteEntryHelpful,
} from '../lib/firebase';

interface EntryDetailViewProps {
  entryNo: number;
  onNavigate: (route: RouteView) => void;
}

const CHECKLIST_STORAGE_PREFIX = 'careerbridge_checklist_v1_';

export function EntryDetailView({ entryNo, onNavigate }: EntryDetailViewProps) {
  const entry: KnowledgeEntry =
    KNOWLEDGE_ENTRIES.find((e) => e.no === entryNo) || KNOWLEDGE_ENTRIES[0];

  const cleanTitle = entry.title.replace(/^Entri \d+:\s*/, '');
  const cleanCategory = entry.subkategoriLabel.replace(/^Kategori \d+:\s*/, '');

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [votesMap, setVotesMap] = useState<Record<number, number>>({});
  const [hasVoted, setHasVoted] = useState(false);
  const [tpaAnswers, setTpaAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${CHECKLIST_STORAGE_PREFIX}${entry.no}`);
      if (raw) {
        setCheckedItems(JSON.parse(raw) as boolean[]);
      } else {
        setCheckedItems(entry.checklist.map(() => false));
      }
    } catch {
      setCheckedItems(entry.checklist.map(() => false));
    }
    setHasVoted(getLocalVotedSet().includes(entry.no));
  }, [entry.no, entry.checklist.length]);

  useEffect(() => {
    let active = true;
    fetchEntryVotes().then((res) => {
      if (active) setVotesMap(res);
    });
    return () => {
      active = false;
    };
  }, []);

  const toggleChecklist = (idx: number) => {
    const next = [...checkedItems];
    next[idx] = !next[idx];
    setCheckedItems(next);
    try {
      localStorage.setItem(`${CHECKLIST_STORAGE_PREFIX}${entry.no}`, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleHelpfulVote = async () => {
    if (hasVoted) return;
    setHasVoted(true);
    const updated = await voteEntryHelpful(entry.no);
    setVotesMap(updated);
  };

  const doneCount = checkedItems.filter(Boolean).length;
  const prevEntry = entry.no > 1 ? entry.no - 1 : null;
  const nextEntry = entry.no < 10 ? entry.no + 1 : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <button
          onClick={() => onNavigate({ page: 'home' })}
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          Beranda
        </button>
        <ChevronRight strokeWidth={1.5} className="h-3.5 w-3.5" />
        <button
          onClick={() => onNavigate({ page: 'guides', categoryFilter: entry.categoryId })}
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {cleanCategory}
        </button>
        <ChevronRight strokeWidth={1.5} className="h-3.5 w-3.5" />
        <span className="font-medium text-zinc-900 dark:text-zinc-200">
          Bagian {String(entry.no).padStart(2, '0')}
        </span>
      </nav>

      {/* Mobile Entry Switcher */}
      <div className="mb-6 lg:hidden">
        <label
          htmlFor="mobile-entry-switcher"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500"
        >
          Daftar Topik Panduan
        </label>
        <div className="relative">
          <select
            id="mobile-entry-switcher"
            value={entry.no}
            onChange={(e) => onNavigate({ page: 'entry', entryNo: Number(e.target.value) })}
            className="min-h-[44px] w-full appearance-none truncate rounded-md border border-zinc-300 bg-white py-2 pl-3 pr-9 text-base font-medium text-zinc-900 focus:border-[#16263B] focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-100"
          >
            {KNOWLEDGE_ENTRIES.map((item) => (
              <option key={item.no} value={item.no}>
                {String(item.no).padStart(2, '0')} — {item.shortTitle}
              </option>
            ))}
          </select>
          <ChevronDown
            strokeWidth={1.6}
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Desktop Editorial Sidebar Index */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
              Indeks Panduan
            </p>
            <div className="border-l border-zinc-200 dark:border-zinc-800">
              {KNOWLEDGE_ENTRIES.map((item) => {
                const isActive = item.no === entry.no;
                return (
                  <button
                    key={item.no}
                    onClick={() => onNavigate({ page: 'entry', entryNo: item.no })}
                    className={`-ml-px flex w-full items-baseline gap-2.5 border-l-2 py-2 pl-3.5 pr-2 text-left text-xs transition ${
                      isActive
                        ? 'border-[#16263B] font-semibold text-zinc-950 dark:border-[#D4A373] dark:text-white'
                        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span className="shrink-0 font-mono text-[11px] text-zinc-400">
                      {String(item.no).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{item.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Article Column — Strict 6-Point Structure Rendered with Editorial Restraint */}
        <article className="min-w-0 space-y-8 lg:col-span-9">
          {/* Poin 1: Judul, Metadata, & Ringkasan 2-3 Kalimat */}
          <header className="border-b border-zinc-200 pb-7 dark:border-zinc-800">
            <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span>{cleanCategory}</span>
              <span>·</span>
              <span>Tingkat: {entry.level}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock strokeWidth={1.5} className="h-3.5 w-3.5" />
                {entry.readMinutes} menit baca
              </span>
            </div>

            <h1 className="font-display text-2xl font-bold leading-snug text-zinc-950 sm:text-3xl dark:text-white">
              {cleanTitle}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {entry.ringkasan}
            </p>
          </header>

          {/* Poin 2: Langkah-Langkah atau Penjelasan Inti */}
          <section>
            <h2 className="font-display mb-4 text-lg font-bold text-zinc-950 sm:text-xl dark:text-white">
              Langkah-Langkah &amp; Penjelasan Inti
            </h2>
            <div className="divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#121417]">
              {entry.langkahInti.map((step, i) => (
                <div key={step.heading} className="p-4 sm:p-5">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 font-mono text-xs font-semibold text-[#8A5A1E] dark:text-[#D4A373]">
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-950 sm:text-base dark:text-zinc-100">
                        {step.heading.replace(/^Langkah \d+\s*—\s*/, '')}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Mini TPA Quiz inside Entri 6 */}
            {entry.no === 6 && (
              <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Latihan Singkat Interaktif
                </p>
                <h3 className="font-display mt-1 text-sm font-bold text-zinc-950 dark:text-white">
                  Simulasi Pola TPA &amp; Silogisme
                </h3>
                <div className="mt-4 space-y-4">
                  {MINI_TPA_SAMPLE.map((q) => {
                    const selected = tpaAnswers[q.id];
                    const answered = selected !== undefined;
                    return (
                      <div key={q.id} className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#121417]">
                        <p className="text-xs font-medium text-zinc-900 sm:text-sm dark:text-zinc-100">
                          {q.question}
                        </p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {q.options.map((opt, oi) => {
                            const isSelected = selected === oi;
                            const isCorrect = oi === q.correctIndex;
                            let cls =
                              'border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200';
                            if (answered) {
                              if (isCorrect) {
                                cls =
                                  'border-emerald-700/50 bg-emerald-50/70 text-emerald-950 font-medium dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200';
                              } else if (isSelected) {
                                cls =
                                  'border-rose-700/50 bg-rose-50/70 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200';
                              }
                            }
                            return (
                              <button
                                key={opt}
                                onClick={() => setTpaAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                                className={`rounded-md border px-3 py-2 text-left text-xs transition ${cls}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {answered && (
                          <p className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Pembahasan:</span> {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PKWT vs PKWTT responsive table (desktop) + stacked cards (mobile) inside Entri 8 */}
            {entry.no === 8 && (
              <div className="mt-6 rounded-md border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-[#121417]">
                <h3 className="font-display mb-3 text-sm font-bold text-zinc-950 dark:text-white">
                  Perbandingan Hukum Kontrak: PKWT vs PKWTT (PP No. 35 Tahun 2021)
                </h3>

                {/* Mobile stacked cards (zero horizontal scroll!) */}
                <div className="space-y-3 md:hidden">
                  {PKWT_PKWTT_COMPARISON.map((r) => (
                    <div
                      key={r.aspek}
                      className="rounded-md border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40"
                    >
                      <p className="text-xs font-bold text-zinc-950 dark:text-white">{r.aspek}</p>
                      <div className="mt-2 space-y-2 text-xs leading-relaxed">
                        <div>
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8A5A1E] dark:text-[#D4A373]">
                            PKWT (Kontrak)
                          </span>
                          <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{r.pkwt}</p>
                        </div>
                        <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                            PKWTT (Karyawan Tetap)
                          </span>
                          <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{r.pkwtt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block table-wrapper rounded-md border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                      <tr>
                        <th className="px-3.5 py-2.5 font-semibold">Aspek Kontrak</th>
                        <th className="px-3.5 py-2.5 font-semibold">PKWT (Kontrak)</th>
                        <th className="px-3.5 py-2.5 font-semibold">PKWTT (Karyawan Tetap)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {PKWT_PKWTT_COMPARISON.map((r) => (
                        <tr key={r.aspek}>
                          <td className="px-3.5 py-2.5 font-medium text-zinc-950 dark:text-zinc-100">
                            {r.aspek}
                          </td>
                          <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-300">{r.pkwt}</td>
                          <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-300">{r.pkwtt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Poin 3: Kesalahan Umum yang Harus Dihindari (Editorial Restrained Rust) */}
          <section className="rounded-md border border-zinc-200 border-l-2 border-l-[#9F1239] bg-[#FDF9F9] p-5 dark:border-zinc-800 dark:border-l-rose-400 dark:bg-rose-950/15">
            <h2 className="font-display mb-3 flex items-center gap-2 text-base font-bold text-zinc-950 dark:text-rose-100">
              <ShieldAlert strokeWidth={1.5} className="h-4 w-4 shrink-0 text-[#9F1239] dark:text-rose-400" />
              Kesalahan Umum yang Harus Dihindari
            </h2>
            <ul className="space-y-2">
              {entry.kesalahanUmum.map((errTxt) => (
                <li
                  key={errTxt}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9F1239] dark:bg-rose-400" />
                  <span>{errTxt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Poin 4: Tips dari Narasumber (Perspektif Praktisi & Alumni) */}
          <section>
            <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-bold text-zinc-950 dark:text-white">
              <Quote strokeWidth={1.5} className="h-4 w-4 text-[#8A5A1E] dark:text-[#D4A373]" />
              Perspektif Praktisi &amp; Narasumber
            </h2>
            <div className="space-y-3.5">
              {entry.tipsNarasumber.map((tip, i) => (
                <blockquote
                  key={i}
                  className="rounded-md border border-zinc-200 border-l-2 border-l-[#8A5A1E] bg-white p-4 sm:p-5 dark:border-zinc-800 dark:border-l-[#D4A373] dark:bg-[#121417]"
                >
                  <p className="text-sm italic leading-relaxed text-zinc-800 dark:text-zinc-200">
                    “{tip.quote}”
                  </p>
                  <footer className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-2.5 text-xs dark:border-zinc-800">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {tip.speaker}{' '}
                      <span className="font-normal text-zinc-500 dark:text-zinc-400">
                        — {tip.role}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      [{tip.timestamp}]
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* Poin 5: Template Pendukung & Checklist Persiapan */}
          <section className="rounded-md border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-[#121417]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-zinc-950 sm:text-lg dark:text-white">
                Template &amp; Checklist Kesiapan
              </h2>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {doneCount}/{entry.checklist.length} selesai
              </span>
            </div>

            <div className="mb-4 flex flex-col justify-between gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3.5 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex min-w-0 items-start gap-2.5">
                <FileText strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {entry.driveFolderTag}
                  </p>
                  <p className="break-all text-sm font-medium text-zinc-900 sm:truncate dark:text-zinc-100">
                    {entry.templateFile}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {getEntryDocUrl(entry.no) && (
                  <a
                    href={getEntryDocUrl(entry.no)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-md bg-[#16263B] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-zinc-800 sm:flex-initial dark:bg-zinc-100 dark:text-zinc-950"
                  >
                    Buka Naskah Google Docs
                    <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </a>
                )}
                {getTemplateUrl(entry.templateFile) &&
                  getTemplateUrl(entry.templateFile) !== getEntryDocUrl(entry.no) && (
                    <a
                      href={getTemplateUrl(entry.templateFile)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 transition hover:bg-zinc-100 sm:flex-initial dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      Unduh Template Kerja
                      <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </a>
                  )}
              </div>
            </div>

            <div className="space-y-2">
              {entry.checklist.map((chk, idx) => {
                const isChecked = Boolean(checkedItems[idx]);
                return (
                  <label
                    key={chk}
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm transition ${
                      isChecked
                        ? 'border-zinc-300 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChecklist(idx)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#16263B] dark:accent-[#D4A373]"
                    />
                    <span className={isChecked ? 'line-through' : ''}>{chk}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Poin 6: Sumber, Nama Kontributor, & Tanggal Diperbarui (Editorial Colophon) */}
          <footer className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
              Sumber Referensi &amp; Kontributor
            </h2>
            <dl className="grid gap-3 text-xs text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
              <div>
                <dt className="font-semibold text-zinc-800 dark:text-zinc-200">Penulis Utama:</dt>
                <dd>{entry.penulisUtama}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-800 dark:text-zinc-200">Editor Konten:</dt>
                <dd>{entry.contentWriter}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-800 dark:text-zinc-200">Riset &amp; Narasumber:</dt>
                <dd>{entry.risetWawancara}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-800 dark:text-zinc-200">Diperbarui:</dt>
                <dd>{entry.updatedAt}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-zinc-800 dark:text-zinc-200">Daftar Pustaka / Regulasi:</dt>
                <dd className="mt-0.5 leading-relaxed">{entry.sumber}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
              <button
                onClick={handleHelpfulVote}
                disabled={hasVoted}
                className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border px-3.5 py-2 text-xs font-medium transition sm:min-h-0 sm:w-auto ${
                  hasVoted
                    ? 'border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-200 dark:hover:border-zinc-500'
                }`}
              >
                {hasVoted ? (
                  <Check strokeWidth={1.6} className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                ) : (
                  <BookmarkCheck strokeWidth={1.5} className="h-3.5 w-3.5" />
                )}
                {hasVoted ? 'Tercatat bermanfaat' : 'Panduan ini membantu'}
                <span className="font-mono text-[11px] text-zinc-500">
                  ({votesMap[entry.no] ?? 0})
                </span>
              </button>

              <div className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:items-center sm:gap-2">
                {prevEntry ? (
                  <button
                    onClick={() => onNavigate({ page: 'entry', entryNo: prevEntry })}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 sm:min-h-0 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-300"
                  >
                    <ArrowLeft strokeWidth={1.5} className="h-3.5 w-3.5" />
                    Sebelumnya
                  </button>
                ) : (
                  <span className="hidden sm:hidden" />
                )}
                {nextEntry && (
                  <button
                    onClick={() => onNavigate({ page: 'entry', entryNo: nextEntry })}
                    className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-[#16263B] px-3.5 py-2 text-xs font-medium text-white hover:bg-zinc-800 sm:min-h-0 dark:bg-zinc-100 dark:text-zinc-950 ${
                      !prevEntry ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                  >
                    Berikutnya
                    <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
