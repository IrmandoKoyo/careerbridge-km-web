import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Compass,
  FolderOpen,
  HelpCircle,
  Home,
  Info,
  Layers,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import {
  CATEGORIES,
  INTERVIEWEES,
  KNOWLEDGE_ENTRIES,
  PROJECT_META,
} from './data/careerbridgeData';
import { BASE_PATH, useSubpathRoute, type RouteView } from './hooks/useSubpathRoute';
import { SearchModal } from './components/SearchModal';
import { EntryDetailView } from './components/EntryDetailView';
import {
  AboutView,
  DownloadsView,
  FaqView,
  TestingView,
} from './components/AboutAndTestingViews';

export function App() {
  const { route, navigate } = useSubpathRoute();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [diagramModalOpen, setDiagramModalOpen] = useState(false);
  const [levelFilter, setLevelFilter] = useState<string>('Semua');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', darkMode ? '#0B0C0E' : '#FAF9F6');
    }
  }, [darkMode]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (!isTyping && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setDiagramModalOpen(false);
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  const navAndClose = (nextRoute: RouteView) => {
    setMobileMenuOpen(false);
    navigate(nextRoute);
  };

  // Menu bersih selayaknya portal knowledge base resmi (tanpa embel-embel tugas kuliah)
  const navLinks: {
    label: string;
    route: RouteView;
    activePages: string[];
    icon: typeof Home;
  }[] = [
    { label: 'Beranda', route: { page: 'home' }, activePages: ['home'], icon: Home },
    { label: 'Panduan', route: { page: 'guides' }, activePages: ['guides', 'entry'], icon: BookOpen },
    { label: 'Sumber & Template', route: { page: 'downloads' }, activePages: ['downloads'], icon: FolderOpen },
    { label: 'FAQ', route: { page: 'faq' }, activePages: ['faq'], icon: HelpCircle },
    { label: 'Tentang', route: { page: 'about' }, activePages: ['about'], icon: Info },
    { label: 'Masukan', route: { page: 'testing' }, activePages: ['testing'], icon: MessageSquare },
  ];

  const activeCategoryFilter = route.page === 'guides' ? route.categoryFilter : undefined;

  const filteredCatalogEntries = useMemo(() => {
    return KNOWLEDGE_ENTRIES.filter((ent) => {
      const matchCat = !activeCategoryFilter || ent.categoryId === activeCategoryFilter;
      const matchLevel = levelFilter === 'Semua' || ent.level === levelFilter;
      return matchCat && matchLevel;
    });
  }, [activeCategoryFilter, levelFilter]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FAF9F6] text-zinc-900 transition-colors dark:bg-[#0B0C0E] dark:text-zinc-100">
      {/* Backdrop overlay saat mobile drawer terbuka */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[35] bg-zinc-950/25 backdrop-blur-[1.5px] lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Minimalist Top Bar */}
      <header className="safe-top sticky top-0 z-40 border-b border-zinc-200/80 bg-[#FAF9F6]/95 backdrop-blur-md dark:border-zinc-800/90 dark:bg-[#0B0C0E]/95">
        <div className="safe-x mx-auto flex h-15 max-w-6xl items-center justify-between gap-3">
          <button
            onClick={() => navAndClose({ page: 'home' })}
            className="flex min-w-0 items-center gap-2.5 text-left"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#16263B] text-[#D4A373] dark:bg-zinc-100 dark:text-zinc-950">
              <Compass strokeWidth={1.6} className="h-4 w-4" />
            </div>
            <div className="flex min-w-0 items-baseline gap-2">
              <span className="font-display truncate text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                {PROJECT_META.brand}
              </span>
              <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
                Career Handbook
              </span>
            </div>
          </button>

          {/* Desktop Navigation — Architectural Text Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((item) => {
              const isActive = item.activePages.includes(route.page);
              return (
                <button
                  key={item.label}
                  onClick={() => navAndClose(item.route)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? 'bg-zinc-200/75 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="inline-flex h-9 w-9 items-center justify-center gap-2.5 rounded-md text-xs text-zinc-600 transition hover:bg-zinc-200/60 hover:text-zinc-950 sm:h-8 sm:w-auto sm:border sm:border-zinc-200 sm:bg-white sm:px-2.5 sm:py-1.5 sm:text-zinc-500 sm:hover:border-zinc-400 sm:hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800 sm:dark:border-zinc-800 sm:dark:bg-[#121417] sm:dark:text-zinc-400 sm:dark:hover:border-zinc-600 sm:dark:hover:bg-[#121417]"
              aria-label="Cari panduan"
            >
              <Search strokeWidth={1.6} className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Cari topik...</span>
              <kbd className="hidden font-mono text-[10px] text-zinc-400 md:inline">
                Ctrl K
              </kbd>
            </button>

            <button
              onClick={() => setDarkMode((d) => !d)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition hover:bg-zinc-200/60 hover:text-zinc-950 sm:h-8 sm:w-8 sm:border sm:border-zinc-200 sm:bg-white sm:hover:border-zinc-400 sm:hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800 sm:dark:border-zinc-800 sm:dark:bg-[#121417] sm:dark:hover:border-zinc-600 sm:dark:hover:bg-[#121417]"
              aria-label="Ubah mode tampilan"
            >
              {darkMode ? (
                <Sun strokeWidth={1.6} className="h-4 w-4" />
              ) : (
                <Moon strokeWidth={1.6} className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              className={`ml-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border transition lg:hidden ${
                mobileMenuOpen
                  ? 'border-[#16263B] bg-[#16263B] text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-200'
              }`}
            >
              {mobileMenuOpen ? (
                <X strokeWidth={1.7} className="h-4 w-4" />
              ) : (
                <Menu strokeWidth={1.6} className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Editorial Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="safe-x absolute inset-x-0 top-full z-40 border-b border-zinc-200 bg-[#FAF9F6] pb-4 pt-3 shadow-xl shadow-zinc-950/10 lg:hidden dark:border-zinc-800 dark:bg-[#111317] dark:shadow-black/50">
            <div className="mx-auto max-w-6xl">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                  Navigasi Portal
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  6 Halaman
                </span>
              </div>

              <nav
                className="divide-y divide-zinc-200/70 overflow-hidden rounded-md border border-zinc-200/90 bg-white dark:divide-zinc-800/80 dark:border-zinc-800 dark:bg-[#16191D]"
                aria-label="Menu navigasi mobile"
              >
                {navLinks.map((item) => {
                  const isActive = item.activePages.includes(route.page);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => navAndClose(item.route)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative flex min-h-[48px] w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition ${
                        isActive
                          ? 'bg-[#16263B]/[0.05] text-[#16263B] dark:bg-[#D4A373]/[0.08] dark:text-[#D4A373]'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-[#16263B] dark:bg-[#D4A373]"
                        />
                      )}
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          strokeWidth={isActive ? 1.85 : 1.5}
                          className={`h-4 w-4 shrink-0 ${
                            isActive
                              ? 'text-[#16263B] dark:text-[#D4A373]'
                              : 'text-zinc-400 dark:text-zinc-500'
                          }`}
                        />
                        <span className={`truncate text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                          {item.label}
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-2">
                        {isActive ? (
                          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[#8A5A1E] dark:text-[#D4A373]">
                            Aktif
                          </span>
                        ) : (
                          <ChevronRight
                            strokeWidth={1.5}
                            className="h-4 w-4 text-zinc-300 dark:text-zinc-600"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <span className="font-mono text-[11px] text-zinc-400">
                  Panduan Karir · Edisi 2026
                </span>
                <button
                  onClick={() => navAndClose({ page: 'entry', entryNo: 1 })}
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-[#16263B] hover:underline dark:text-[#D4A373]"
                >
                  Baca Entri 01
                  <ArrowRight strokeWidth={1.6} className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {route.page === 'home' && (
          <div>
            {/* Clean Editorial Hero */}
            <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0E1013]">
              <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="min-w-0 lg:col-span-7">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.09em] text-[#8A5A1E] dark:text-[#D4A373]">
                      Panduan Karir Lulusan Baru · Edisi 2026
                    </p>
                    <h1 className="font-display mt-3 text-2xl font-bold leading-[1.15] text-zinc-950 sm:text-4xl md:text-[42px] dark:text-white">
                      Navigasi Terstruktur Menuju Pekerjaan Pertama Anda.
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                      Basis pengetahuan praktis bagi lulusan perguruan tinggi—merangkum pengalaman langsung praktisi industri (FMCG, teknologi multinasional, dan perbankan) bersama standar CV ATS, teknik wawancara STAR, serta pemahaman hukum kontrak kerja.
                    </p>

                    <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                      <button
                        onClick={() => navigate({ page: 'entry', entryNo: 1 })}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#16263B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:w-auto dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                      >
                        Mulai Membaca
                        <ArrowRight strokeWidth={1.6} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigate({ page: 'downloads' })}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        <FolderOpen strokeWidth={1.5} className="h-4 w-4 text-zinc-500" />
                        Template &amp; Sumber
                      </button>
                    </div>

                    <button
                      onClick={() => setSearchOpen(true)}
                      className="mt-4 flex min-h-[44px] w-full max-w-md items-center gap-2.5 rounded-md border border-zinc-200 bg-[#FAF9F6] px-3.5 py-2.5 text-left text-xs text-zinc-500 transition hover:border-zinc-400 sm:mt-5 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-400"
                    >
                      <Search strokeWidth={1.5} className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      <span className="truncate">
                        Cari topik: CV ATS, wawancara STAR, negosiasi gaji, PKWT...
                      </span>
                    </button>
                  </div>

                  {/* Right Column: Clean Editorial Phase Index (No AI Metric Boxes!) */}
                  <div className="min-w-0 lg:col-span-5">
                    <div className="rounded-md border border-zinc-200 bg-[#FAF9F6] p-4 sm:p-5 dark:border-zinc-800 dark:bg-[#121417]">
                      <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                        Empat Tahap Perjalanan Karir
                      </p>
                      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {CATEGORIES.map((cat, idx) => (
                          <button
                            key={cat.id}
                            onClick={() => navigate({ page: 'guides', categoryFilter: cat.id })}
                            className="group flex min-h-[48px] w-full items-start justify-between gap-3 py-3 text-left transition"
                          >
                            <div className="flex min-w-0 items-start gap-3">
                              <span className="mt-0.5 font-mono text-xs text-[#8A5A1E] dark:text-[#D4A373]">
                                0{idx + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-zinc-900 group-hover:underline dark:text-zinc-100">
                                  {cat.title.replace(/^Kategori \d+:\s*/, '')}
                                </p>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                  {cat.subtitle}
                                </p>
                              </div>
                            </div>
                            <ArrowUpRight
                              strokeWidth={1.5}
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400 transition group-hover:text-zinc-900 dark:group-hover:text-white"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 Kategori & Daftar Lengkap 10 Topik */}
            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-7">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                    Daftar Materi
                  </p>
                  <h2 className="font-display mt-1 text-xl font-bold text-zinc-950 sm:text-2xl dark:text-white">
                    Topik Panduan Berdasarkan Tahapan
                  </h2>
                </div>
                <button
                  onClick={() => navigate({ page: 'guides' })}
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  Buka seluruh direktori
                  <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                {CATEGORIES.map((cat) => {
                  const catEntries = KNOWLEDGE_ENTRIES.filter((e) => e.categoryId === cat.id);
                  return (
                    <div
                      key={cat.id}
                      className="flex min-w-0 flex-col justify-between rounded-md border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-[#121417]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-zinc-400">
                          <span>BAGIAN 0{cat.id}</span>
                          <button
                            onClick={() => navigate({ page: 'guides', categoryFilter: cat.id })}
                            className="inline-flex min-h-[32px] items-center hover:text-zinc-900 dark:hover:text-zinc-200"
                          >
                            Lihat kategori →
                          </button>
                        </div>
                        <h3 className="font-display mt-2 text-lg font-bold text-zinc-950 dark:text-white">
                          {cat.title.replace(/^Kategori \d+:\s*/, '')}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-5 divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
                        {catEntries.map((ent) => (
                          <button
                            key={ent.no}
                            onClick={() => navigate({ page: 'entry', entryNo: ent.no })}
                            className="group flex min-h-[42px] w-full items-center justify-between gap-3 py-2.5 text-left text-xs font-medium text-zinc-800 transition hover:text-[#8A5A1E] dark:text-zinc-200 dark:hover:text-[#D4A373]"
                          >
                            <span className="truncate">
                              <span className="mr-2 font-mono text-zinc-400">
                                {String(ent.no).padStart(2, '0')}
                              </span>
                              {ent.shortTitle}
                            </span>
                            <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Wawasan Praktisi Industri (Minimalist 3-Column) */}
            <section className="border-t border-zinc-200 bg-white py-8 sm:py-12 dark:border-zinc-800 dark:bg-[#0E1013]">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-6 max-w-2xl sm:mb-7">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
                    Kontributor Wawasan Lapangan
                  </p>
                  <h2 className="font-display mt-1 text-xl font-bold text-zinc-950 sm:text-2xl dark:text-white">
                    Perspektif Langsung dari Dunia Kerja
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    Seluruh kiat praktis, pantangan wawancara, dan waktu tunggu pada panduan ini dihimpun langsung dari wawancara tiga alumni aktif di tiga sektor industri berbeda.
                  </p>
                </div>

                <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                  {INTERVIEWEES.map((ns) => (
                    <div
                      key={ns.kode}
                      className="flex min-w-0 flex-col justify-between rounded-md border border-zinc-200 bg-[#FAF9F6] p-4 sm:p-5 dark:border-zinc-800 dark:bg-[#121417]"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                          {ns.industri}
                        </p>
                        <h3 className="font-display mt-1.5 text-base font-bold text-zinc-950 dark:text-white">
                          {ns.nama}
                        </h3>
                        <p className="text-xs font-medium text-[#8A5A1E] dark:text-[#D4A373]">
                          {ns.jabatan}
                        </p>
                        <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {ns.highlight}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                        {ns.entriTerkait.slice(0, 3).map((eNo) => (
                          <button
                            key={eNo}
                            onClick={() => navigate({ page: 'entry', entryNo: eNo })}
                            className="inline-flex min-h-[32px] items-center rounded border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            Bagian {String(eNo).padStart(2, '0')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Direktori Semua Panduan */}
        {route.page === 'guides' && (
          <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-10">
            <header className="border-b border-zinc-200 pb-5 sm:pb-6 dark:border-zinc-800">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A5A1E] dark:text-[#D4A373]">
                Direktori Panduan
              </p>
              <h1 className="font-display mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
                Seluruh Topik Persiapan Karier
              </h1>

              {/* Compact Filter Controls for Mobile */}
              <div className="mt-4 space-y-2.5 md:hidden">
                <div className="grid grid-cols-12 gap-2">
                  <div className="relative col-span-7 min-w-0">
                    <label htmlFor="mobile-category-filter" className="sr-only">
                      Filter kategori panduan
                    </label>
                    <select
                      id="mobile-category-filter"
                      value={activeCategoryFilter ?? 'all'}
                      onChange={(e) => {
                        const val = e.target.value;
                        navigate(
                          val === 'all'
                            ? { page: 'guides' }
                            : { page: 'guides', categoryFilter: Number(val) }
                        );
                      }}
                      className="min-h-[44px] w-full appearance-none truncate rounded-md border border-zinc-300 bg-white py-2 pl-3 pr-8 text-base font-medium text-zinc-900 focus:border-[#16263B] focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-100"
                    >
                      <option value="all">Semua Kategori</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          0{cat.id} · {cat.title.replace(/^Kategori \d+:\s*/, '')}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      strokeWidth={1.6}
                      className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    />
                  </div>

                  <div className="relative col-span-5 min-w-0">
                    <label htmlFor="mobile-level-filter" className="sr-only">
                      Filter tingkat kesulitan
                    </label>
                    <select
                      id="mobile-level-filter"
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="min-h-[44px] w-full appearance-none truncate rounded-md border border-zinc-300 bg-white py-2 pl-3 pr-8 text-base font-medium text-zinc-900 focus:border-[#16263B] focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-[#121417] dark:text-zinc-100"
                    >
                      {['Semua', 'Pemula', 'Menengah', 'Lanjutan', 'Semua Level'].map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl === 'Semua' ? 'Semua Tingkat' : lvl}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      strokeWidth={1.6}
                      className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    Menampilkan{' '}
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-200">
                      {filteredCatalogEntries.length}
                    </strong>{' '}
                    dari {KNOWLEDGE_ENTRIES.length} panduan
                  </span>
                  {(activeCategoryFilter || levelFilter !== 'Semua') && (
                    <button
                      onClick={() => {
                        setLevelFilter('Semua');
                        navigate({ page: 'guides' });
                      }}
                      className="font-medium text-[#8A5A1E] hover:underline dark:text-[#D4A373]"
                    >
                      Reset filter
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop / Tablet Filter Bars */}
              <div className="mt-5 hidden space-y-3 md:block">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => navigate({ page: 'guides' })}
                    className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      !activeCategoryFilter
                        ? 'bg-[#16263B] text-white dark:bg-zinc-100 dark:text-zinc-950'
                        : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-300'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate({ page: 'guides', categoryFilter: cat.id })}
                      className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        activeCategoryFilter === cat.id
                          ? 'bg-[#16263B] text-white dark:bg-zinc-100 dark:text-zinc-950'
                          : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-300'
                      }`}
                    >
                      {cat.title.replace(/^Kategori \d+:\s*/, '')}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-[11px] text-zinc-400">Tingkat:</span>
                    {['Semua', 'Pemula', 'Menengah', 'Lanjutan', 'Semua Level'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLevelFilter(lvl)}
                        className={`min-h-[32px] rounded px-2.5 py-1 text-[11px] font-medium transition ${
                          levelFilter === lvl
                            ? 'border border-zinc-300 bg-zinc-200/80 font-semibold text-zinc-950 dark:border-[#D4A373]/40 dark:bg-[#D4A373]/15 dark:text-[#D4A373]'
                            : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#121417] dark:text-zinc-400'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-zinc-400">
                    {filteredCatalogEntries.length} / {KNOWLEDGE_ENTRIES.length} topik
                  </span>
                </div>
              </div>
            </header>

            {filteredCatalogEntries.length === 0 ? (
              <div className="rounded-md border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-[#121417]">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Tidak ada panduan untuk kombinasi filter tersebut
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Coba ubah pilihan tingkat kesulitan atau tampilkan seluruh kategori.
                </p>
                <button
                  onClick={() => {
                    setLevelFilter('Semua');
                    navigate({ page: 'guides' });
                  }}
                  className="mt-4 inline-flex min-h-[40px] items-center rounded-md bg-[#16263B] px-4 py-2 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-950"
                >
                  Tampilkan Semua Panduan
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCatalogEntries.map((ent) => (
                  <article
                    key={ent.no}
                    className="flex min-w-0 flex-col justify-between rounded-md border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 sm:p-5 dark:border-zinc-800 dark:bg-[#121417] dark:hover:border-zinc-600"
                  >
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-400">
                        <span>{ent.subkategoriLabel.replace(/^Kategori \d+:\s*/, '')}</span>
                        <span>
                          {ent.level} · {ent.readMinutes} mnt
                        </span>
                      </div>
                      <h2 className="font-display text-base font-bold text-zinc-950 sm:text-lg dark:text-white">
                        {ent.title.replace(/^Entri \d+:\s*/, '')}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                        {ent.ringkasan}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                      <span className="truncate text-[11px] text-zinc-500">
                        {ent.penulisUtama.split('(')[0].trim()}
                      </span>
                      <button
                        onClick={() => navigate({ page: 'entry', entryNo: ent.no })}
                        className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 text-xs font-semibold text-[#16263B] hover:underline dark:text-[#D4A373]"
                      >
                        Baca panduan
                        <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {route.page === 'entry' && (
          <EntryDetailView entryNo={route.entryNo} onNavigate={navigate} />
        )}

        {route.page === 'downloads' && <DownloadsView onNavigate={navigate} />}

        {route.page === 'faq' && <FaqView onNavigate={navigate} />}

        {route.page === 'about' && (
          <AboutView
            onNavigate={navigate}
            onOpenDiagramModal={() => setDiagramModalOpen(true)}
          />
        )}

        {route.page === 'testing' && <TestingView onNavigate={navigate} />}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="safe-bottom mt-12 border-t border-zinc-200 bg-white py-8 pb-24 lg:mt-14 lg:pb-8 dark:border-zinc-800 dark:bg-[#0E1013]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-sm font-bold text-zinc-950 dark:text-white">
              CareerBridge
            </p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Panduan Persiapan Kerja Lulusan Baru · Pembaruan {PROJECT_META.tanggalUpdate}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <button onClick={() => navigate({ page: 'guides' })} className="py-1 hover:text-zinc-950 dark:hover:text-white">
              Panduan
            </button>
            <button onClick={() => navigate({ page: 'downloads' })} className="py-1 hover:text-zinc-950 dark:hover:text-white">
              Sumber &amp; Template
            </button>
            <button onClick={() => navigate({ page: 'faq' })} className="py-1 hover:text-zinc-950 dark:hover:text-white">
              FAQ
            </button>
            <button onClick={() => navigate({ page: 'about' })} className="py-1 hover:text-zinc-950 dark:hover:text-white">
              Tentang
            </button>
            <button onClick={() => navigate({ page: 'testing' })} className="py-1 hover:text-zinc-950 dark:hover:text-white">
              Masukan
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="safe-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200/90 bg-[#FAF9F6]/95 backdrop-blur-md lg:hidden dark:border-zinc-800 dark:bg-[#0B0C0E]/95"
        aria-label="Navigasi cepat mobile"
      >
        <div className="grid grid-cols-5">
          {[
            {
              label: 'Beranda',
              icon: Home,
              active: route.page === 'home',
              onClick: () => navAndClose({ page: 'home' }),
            },
            {
              label: 'Panduan',
              icon: BookOpen,
              active: route.page === 'guides' || route.page === 'entry',
              onClick: () => navAndClose({ page: 'guides' }),
            },
            {
              label: 'Sumber',
              icon: FolderOpen,
              active: route.page === 'downloads',
              onClick: () => navAndClose({ page: 'downloads' }),
            },
            {
              label: 'FAQ',
              icon: HelpCircle,
              active: route.page === 'faq',
              onClick: () => navAndClose({ page: 'faq' }),
            },
            {
              label: 'Tentang',
              icon: Info,
              active: route.page === 'about' || route.page === 'testing',
              onClick: () => navAndClose({ page: 'about' }),
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                onClick={tab.onClick}
                aria-current={tab.active ? 'page' : undefined}
                className={`relative flex min-h-[54px] flex-col items-center justify-center gap-1 px-1 py-1.5 text-[10px] font-medium transition ${
                  tab.active
                    ? 'text-[#16263B] dark:text-[#D4A373]'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {tab.active && (
                  <span className="absolute top-0 h-0.5 w-8 bg-[#16263B] dark:bg-[#D4A373]" />
                )}
                <Icon strokeWidth={tab.active ? 1.9 : 1.5} className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* Diagram Zoom Lightbox */}
      {diagramModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-3 backdrop-blur-[2px] sm:p-6"
          onClick={() => setDiagramModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Diagram Kerangka Konseptual CareerBridge"
        >
          <div
            className="relative max-h-[90dvh] w-full max-w-5xl overflow-auto rounded-lg border border-zinc-200 bg-white p-3 shadow-2xl dark:border-zinc-800 dark:bg-[#121417]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-2 px-1 py-1 sm:px-2">
              <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                <Layers strokeWidth={1.5} className="h-4 w-4 shrink-0 text-[#8A5A1E] dark:text-[#D4A373]" />
                <span className="truncate">
                  Kerangka Konseptual CareerBridge{' '}
                  <span className="hidden sm:inline">(Esc untuk tutup)</span>
                </span>
              </div>
              <button
                onClick={() => setDiagramModalOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Tutup"
              >
                <X strokeWidth={1.6} className="h-4 w-4" />
              </button>
            </div>
            <img
              src={`${BASE_PATH}/kerangka-konseptual.png`}
              alt="Diagram Kerangka Konseptual CareerBridge"
              className="h-auto w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
