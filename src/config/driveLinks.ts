/**
 * Konfigurasi Tautan Google Drive & Google Sheets Log Kontribusi Kelompok 7.
 * Bisa diatur langsung lewat Vercel Environment Variables (VITE_GOOGLE_DRIVE_MAIN_URL & VITE_GOOGLE_SHEET_LOG_URL)
 * ATAU tempelkan link Share Publik Google Drive Anda langsung di bawah ini.
 */

const ENV_DRIVE_URL = (import.meta.env.VITE_GOOGLE_DRIVE_MAIN_URL || '').trim();
const ENV_SHEET_URL = (import.meta.env.VITE_GOOGLE_SHEET_LOG_URL || '').trim();

export const DRIVE_LINKS = {
  // Ganti string kosong di bawah jika tidak memakai Env Var Vercel:
  mainFolderUrl: ENV_DRIVE_URL || '',
  logSheetUrl: ENV_SHEET_URL || '',
};

export const hasDriveUrl = (): boolean => DRIVE_LINKS.mainFolderUrl.startsWith('http');
export const hasSheetUrl = (): boolean => DRIVE_LINKS.logSheetUrl.startsWith('http');
