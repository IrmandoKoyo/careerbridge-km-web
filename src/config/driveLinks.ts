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

export const TEMPLATE_FILE_URLS: Record<string, string> = {
  'Worksheet_Self_Assessment_Karir_FreshGraduate.docx':
    'https://docs.google.com/document/d/1V0RavI2m0SLIqxAK_JP7J2Qx5lk1plqv/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'Template_CV_ATS_Friendly_FreshGraduate_UNKLAB.docx':
    'https://docs.google.com/document/d/1lzTPyU-Y2PfQow9HqYpok3tNsr3EY7yV/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'Panduan_Portofolio_GitHub_dan_Checklist_LinkedIn.docx':
    'https://docs.google.com/document/d/1t9z-x0it2H5nlUzD6hzyVlvPD3udZJCK/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'Tracker_Lamaran_Kerja_dan_Jadwal_Harian_FreshGraduate.docx':
    'https://docs.google.com/document/d/1amHfnkFu5s2hUF1qQ0tpb39hN9-icHHe/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'Bank_Soal_Latihan_TPA_Psikotes_dan_Panduan_FGD.docx':
    'https://docs.google.com/document/d/1SCXXWf1gKYBPbqV508AlTlbJvmWHPbBx/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'CheatSheet_Wawancara_STAR_dan_Checklist_Kontrak_PKWT_PKWTT.docx':
    'https://docs.google.com/document/d/1w_lIRDkI69ZtlPN2zENlpUCqzAphsuxw/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'Catatan_dan_Instrumen_Wawancara_CareerBridge_Kelompok7.docx':
    'https://docs.google.com/document/d/1iTChTdW_JAgdiEDxqlqLeULZwo3Y5wM6/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  'FINAL_REPORT_CareerBridge_Kelompok7.docx & Log_Kontribusi_Kelompok7_CareerBridge.xlsx':
    'https://docs.google.com/document/d/1cc41bDekdn6cntm0Twon-a1V4B4lO0ub/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
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
  catatanWawancaraUrl:
    'https://docs.google.com/document/d/1iTChTdW_JAgdiEDxqlqLeULZwo3Y5wM6/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
  finalReportUrl:
    'https://docs.google.com/document/d/1cc41bDekdn6cntm0Twon-a1V4B4lO0ub/edit?usp=sharing&ouid=100656699522555931128&rtpof=true&sd=true',
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
