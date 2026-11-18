/**
 * Konfigurasi Tautan Google Drive, Google Docs 10 Entri, Template Kerja, & Google Sheets Log Kontribusi.
 */

const ENV_DRIVE_URL = (import.meta.env.VITE_GOOGLE_DRIVE_MAIN_URL || '').trim();
const ENV_SHEET_URL = (import.meta.env.VITE_GOOGLE_SHEET_LOG_URL || '').trim();

export const ENTRY_GOOGLE_DOCS: Record<number, string> = {
  1: 'https://docs.google.com/document/d/1TMm7pSxGS8JUvbK-egI8n2Nmt2ehuY-Y/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  2: 'https://docs.google.com/document/d/1ZgbL-Xe3E-ORnToaqRLvkSlonmrPc2g7/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  3: 'https://docs.google.com/document/d/1X7pZhK5TUFCf97v2HxV4y5dkn-luU5iW/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  4: 'https://docs.google.com/document/d/1ydQQkiy1iRrA7imb0uh34V1uJ9_mP0aV/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  5: 'https://docs.google.com/document/d/1B3CL6ASGF7TFVaKsVOTkaao19Cv7N_yV/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  6: 'https://docs.google.com/document/d/1BNg2vHvvwptCkQsWsuYSi7sKAcoco8gp/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  7: 'https://docs.google.com/document/d/1WDlNbW94WyBh4beNNreYbmxrTwBlG6LR/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  8: 'https://docs.google.com/document/d/1iaybI29yfM-MYMOtBTWj5j86IbKmu0B0/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  9: 'https://docs.google.com/document/d/1gGGtWFLaBY8Qj3-j7zVatf3I0dyGAdLB/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  10: 'https://docs.google.com/document/d/19kOk4pfh0OIgPd0VqA-kBQszGsI6FqWn/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
};

/**
 * Opsional: Tautan langsung ke masing-masing file Template di Folder 01, 02, 03, & 04.
 * Jika belum diisi, tombol akan mengarah ke Folder Utama Drive atau Naskah Google Docs entri terkait.
 */
export const TEMPLATE_FILE_URLS: Record<string, string> = {
  'Worksheet_Self_Assessment_Karir_FreshGraduate.docx': '',
  'Template_CV_ATS_Friendly_FreshGraduate_UNKLAB.docx': '',
  'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx': '',
  'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx': '',
  'Bank_Soal_Latihan_TPA_Psikotes_dan_Panduan_FGD.docx': '',
  'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx': '',
  'Catatan_dan_Instrumen_Wawancara_CareerBridge_Kelompok7.docx': '',
  'FINAL_REPORT_CareerBridge_Kelompok7.docx & Log_Kontribusi_Kelompok7_CareerBridge.xlsx': '',
};

export const DRIVE_LINKS = {
  mainFolderUrl: ENV_DRIVE_URL || '',
  logSheetUrl: ENV_SHEET_URL || '',
};

export const hasDriveUrl = (): boolean => DRIVE_LINKS.mainFolderUrl.startsWith('http');
export const hasSheetUrl = (): boolean => DRIVE_LINKS.logSheetUrl.startsWith('http');

export function getEntryDocUrl(entryNo: number): string {
  return ENTRY_GOOGLE_DOCS[entryNo] || DRIVE_LINKS.mainFolderUrl || '';
}

export function getTemplateUrl(fileName: string, fallbackEntryNo?: number): string {
  const direct = TEMPLATE_FILE_URLS[fileName];
  if (direct && direct.startsWith('http')) return direct;
  if (DRIVE_LINKS.mainFolderUrl.startsWith('http')) return DRIVE_LINKS.mainFolderUrl;
  if (fallbackEntryNo && ENTRY_GOOGLE_DOCS[fallbackEntryNo]) return ENTRY_GOOGLE_DOCS[fallbackEntryNo];
  return '';
}
