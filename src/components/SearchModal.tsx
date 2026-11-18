import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, FileText, HelpCircle, Search, X } from 'lucide-react';
import { DRIVE_ASSETS, FAQ_ITEMS, KNOWLEDGE_ENTRIES } from '../data/careerbridgeData';
import type { RouteView } from '../hooks/useSubpathRoute';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: RouteView) => void;
}

export function SearchModal({ open, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        entries: KNOWLEDGE_ENTRIES.slice(0, 5),
        faqs: [] as typeof FAQ_ITEMS,
        assets: [] as typeof DRIVE_ASSETS,
      };
    }

    const entries = KNOWLEDGE_ENTRIES.filter((ent) => {
      const hay = [
        ent.title,
        ent.ringkasan,
        ...ent.langkahInti.map((l) => `${l.heading} ${l.detail}`),
        ...ent.kesalahanUmum,
        ...ent.tipsNarasumber.map((t) => `${t.speaker} ${t.quote}`),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });

    const faqs = FAQ_ITEMS.filter((f) =>
      `${f.question} ${f.answer}`.toLowerCase().includes(q)
    );

    const assets = DRIVE_ASSETS.filter((a) =>
      `${a.fileName} ${a.description} ${a.forEntries}`.toLowerCase().includes(q)
    );

    return { entries, faqs, assets };
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/50 p-3 pt-4 backdrop-blur-[2px] sm:p-6 sm:pt-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Panduan CareerBridge"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-[#121417]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 px-3.5 py-3 sm:px-4 dark:border-zinc-800">
          <Search strokeWidth={1.6} className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari topik: CV ATS, wawancara, gaji, PKWT..."
            className="w-full bg-transparent text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:text-sm dark:text-zinc-100"
          />
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Tutup pencarian"
          >
            <X strokeWidth={1.6} className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[78dvh] overflow-y-auto p-2.5 sm:max-h-[65dvh] sm:p-3">
          {results.entries.length === 0 && results.faqs.length === 0 && results.assets.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Tidak ditemukan hasil untuk “{query}”. Coba kata kunci seperti{' '}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">ATS</span>,{' '}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">wawancara</span>,{' '}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">gaji</span>, atau{' '}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">PKWT</span>.
            </p>
          ) : (
            <div className="space-y-4">
              {results.entries.length > 0 && (
                <div>
                  <div className="mb-1.5 px-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    {query.trim() ? `Panduan Karir (${results.entries.length})` : 'Topik Utama'}
                  </div>
                  <div className="space-y-0.5">
                    {results.entries.map((ent) => (
                      <button
                        key={ent.no}
                        onClick={() => {
                          onNavigate({ page: 'entry', entryNo: ent.no });
                          onClose();
                        }}
                        className="flex w-full items-start justify-between gap-3 rounded-md px-2.5 py-2 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                      >
                        <div className="flex min-w-0 items-start gap-2.5">
                          <BookOpen strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-[#8A5A1E] dark:text-[#D4A373]" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {ent.title.replace(/^Entri \d+:\s*/, '')}
                            </p>
                            <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {ent.ringkasan}
                            </p>
                          </div>
                        </div>
                        <ArrowRight strokeWidth={1.5} className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.faqs.length > 0 && (
                <div>
                  <div className="mb-1.5 px-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    Pertanyaan Umum ({results.faqs.length})
                  </div>
                  <div className="space-y-0.5">
                    {results.faqs.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          onNavigate({ page: 'faq' });
                          onClose();
                        }}
                        className="flex w-full items-start justify-between gap-3 rounded-md px-2.5 py-2 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                      >
                        <div className="flex min-w-0 items-start gap-2.5">
                          <HelpCircle strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-[#16263B] dark:text-zinc-300" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {f.question}
                            </p>
                            <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {f.answer}
                            </p>
                          </div>
                        </div>
                        <ArrowRight strokeWidth={1.5} className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.assets.length > 0 && (
                <div>
                  <div className="mb-1.5 px-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    Dokumen & Template ({results.assets.length})
                  </div>
                  <div className="space-y-0.5">
                    {results.assets.map((a) => (
                      <button
                        key={a.fileName}
                        onClick={() => {
                          onNavigate({ page: 'downloads' });
                          onClose();
                        }}
                        className="flex w-full items-start justify-between gap-3 rounded-md px-2.5 py-2 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                      >
                        <div className="flex min-w-0 items-start gap-2.5">
                          <FileText strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {a.fileName}
                            </p>
                            <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {a.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight strokeWidth={1.5} className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
