/**
 * Konfigurasi Tautan Google Drive, 10 Naskah Entri, 6 Template Kerja, Folder 04, & Google Sheets Log Kontribusi.
 * Menggunakan format universal `https://drive.google.com/file/d/<ID>/view` untuk file .docx
 * agar 100% bebas error multi-akun (/u/9/) maupun konflik ouid Google Workspace.
 */

const ENV_DRIVE_URL = (import.meta.env.VITE_GOOGLE_DRIVE_MAIN_URL || '').trim();
const ENV_SHEET_URL = (import.meta.env.VITE_GOOGLE_SHEET_LOG_URL || '').trim();

const gdriveView = (fileId: string) => `https://drive.google.com/file/d/${fileId}/view`;

export const ENTRY_GOOGLE_DOCS: Record<number, string> = {
  1: gdriveView('1TMm7pSxGS8JUvbK-egI8n2Nmt2ehuY-Y'),
  2: gdriveView('1ZgbL-Xe3E-ORnToaqRLvkSlonmrPc2g7'),
  3: gdriveView('1X7pZhK5TUFCf97v2HxV4y5dkn-luU5iW'),
  4: gdriveView('1ydQQkiy1iRrA7imb0uh34V1uJ9_mP0aV'),
  5: gdriveView('1B3CL6ASGF7TFVaKsVOTkaao19Cv7N_yV'),
  6: gdriveView('1BNg2vHvvwptCkQsWsuYSi7sKAcoco8gp'),
  7: gdriveView('1WDlNbW94WyBh4beNNreYbmxrTwBlG6LR'),
  8: gdriveView('1iaybI29yfM-MYMOtBTWj5j86IbKmu0B0'),
  9: gdriveView('1gGGtWFLaBY8Qj3-j7zVatf3I0dyGAdLB'),
  10: gdriveView('19kOk4pfh0OIgPd0VqA-kBQszGsI6FqWn'),
};

export const TEMPLATE_FILE_URLS: Record<string, string> = {
  'Worksheet_Self_Assessment_Karir_FreshGraduate.docx': gdriveView(
    '1V0RavI2m0SLIqxAK_JP7J2Qx5lk1plqv'
  ),
  'Template_CV_ATS_Friendly_FreshGraduate_UNKLAB.docx': gdriveView(
    '1lzTPyU-Y2PfQow9HqYpok3tNsr3EY7yV'
  ),
  'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx': gdriveView(
    '1t9z-x0it2H5nlUzD6hzyVlvPD3udZJCK'
  ),
  'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx': gdriveView(
    '1amHfnkFu5s2hUF1qQ0tpb39hN9-icHHe'
  ),
  'Bank_Soal_Latihan_TPA_Psikotes_dan_Panduan_FGD.docx': gdriveView(
    '1SCXXWf1gKYBPbqV508AlTlbJvmWHPbBx'
  ),
  'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx': gdriveView(
    '1w_lIRDkI69ZtlPN2zENlpUCqzAphsuxw'
  ),
  'Catatan_dan_Instrumen_Wawancara_CareerBridge_Kelompok7.docx': gdriveView(
    '1iTChTdW_JAgdiEDxqlqLeULZwo3Y5wM6'
  ),
  'FINAL_REPORT_CareerBridge_Kelompok7.docx & Log_Kontribusi_Kelompok7_CareerBridge.xlsx':
    gdriveView('1cc41bDekdn6cntm0Twon-a1V4B4lO0ub'),
};

export const DRIVE_LINKS = {
  mainFolderUrl:
    ENV_DRIVE_URL ||
    'https://drive.google.com/drive/folders/1VA_GTmHwSj-i3rDN8OmG-7Jt7qstycQ-?usp=sharing',
  logSheetUrl:
    ENV_SHEET_URL ||
    'https://docs.google.com/spreadsheets/d/146vfrvnah7h6UVBtT69OBbBKToPlXJ13dfJMJtK4p4I/edit?usp=sharing',
  folder04Url:
    'https://drive.google.com/drive/folders/1xxLznbZb7fycIjrwjIcrTqvgzRd8JEA_?usp=sharing',
  catatanWawancaraUrl: gdriveView('1iTChTdW_JAgdiEDxqlqLeULZwo3Y5wM6'),
  finalReportUrl: gdriveView('1cc41bDekdn6cntm0Twon-a1V4B4lO0ub'),
};

export const hasDriveUrl = (): boolean => DRIVE_LINKS.mainFolderUrl.startsWith('http');
export const hasSheetUrl = (): boolean => DRIVE_LINKS.logSheetUrl.startsWith('http');

export function getEntryDocUrl(entryNo: number): string {
  return ENTRY_GOOGLE_DOCS[entryNo] || DRIVE_LINKS.mainFolderUrl || '';
}

export function getTemplateUrl(fileName: string, fallbackEntryNo?: number): string {
  const exact = TEMPLATE_FILE_URLS[fileName];
  if (exact && exact.startsWith('http')) return exact;
  for (const [key, url] of Object.entries(TEMPLATE_FILE_URLS)) {
    if (url && url.startsWith('http') && (fileName.startsWith(key) || fileName.includes(key))) {
      return url;
    }
  }
  if (DRIVE_LINKS.mainFolderUrl.startsWith('http')) return DRIVE_LINKS.mainFolderUrl;
  if (fallbackEntryNo && ENTRY_GOOGLE_DOCS[fallbackEntryNo]) return ENTRY_GOOGLE_DOCS[fallbackEntryNo];
  return '';
}
