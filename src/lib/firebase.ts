import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  increment,
  serverTimestamp,
  query,
  orderBy,
  limit,
  type Firestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim() || 'AIzaSyBZsGkcKodgGlntZ6ar4zg-pGHws6KhWzo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() || 'careerbridge-unklab.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim() || 'careerbridge-unklab',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim() || 'careerbridge-unklab.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim() || '947989321689',
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim() || '1:947989321689:web:9aa8267754288450fb6bc8',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn('[CareerBridge] Gagal inisialisasi Firebase, beralih ke penyimpanan lokal:', err);
    db = null;
  }
}

export interface UserTestingFeedback {
  id?: string;
  testerName: string;
  faculty: string;
  device: 'HP (Mobile)' | 'Laptop / Desktop';
  navScore: number;
  clarityScore: number;
  tipsScore: number;
  driveScore: number;
  mobileScore: number;
  comment: string;
  createdAtLabel: string;
}

const LOCAL_VOTES_KEY = 'careerbridge_entry_votes_v1';
const LOCAL_USER_VOTED_KEY = 'careerbridge_user_voted_entries_v1';
const LOCAL_FEEDBACK_KEY = 'careerbridge_user_testing_feedback_v1';

export function getLocalVotedSet(): number[] {
  try {
    const raw = localStorage.getItem(LOCAL_USER_VOTED_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export async function fetchEntryVotes(): Promise<Record<number, number>> {
  let localMap: Record<number, number> = {};
  try {
    const raw = localStorage.getItem(LOCAL_VOTES_KEY);
    if (raw) localMap = JSON.parse(raw) as Record<number, number>;
  } catch {
    localMap = {};
  }

  if (!db) return localMap;

  try {
    const snap = await getDocs(collection(db, 'entry_votes'));
    const cloudMap: Record<number, number> = { ...localMap };
    snap.forEach((docSnap) => {
      const no = Number(docSnap.id.replace('entri_', ''));
      const count = Number(docSnap.data()?.count ?? 0);
      if (!Number.isNaN(no) && no >= 1 && no <= 10) {
        cloudMap[no] = count;
      }
    });
    return cloudMap;
  } catch {
    return localMap;
  }
}

export async function voteEntryHelpful(entryNo: number): Promise<Record<number, number>> {
  const voted = getLocalVotedSet();
  if (!voted.includes(entryNo)) {
    voted.push(entryNo);
    localStorage.setItem(LOCAL_USER_VOTED_KEY, JSON.stringify(voted));
  }

  let localMap: Record<number, number> = {};
  try {
    const raw = localStorage.getItem(LOCAL_VOTES_KEY);
    if (raw) localMap = JSON.parse(raw) as Record<number, number>;
  } catch {
    localMap = {};
  }
  localMap[entryNo] = (localMap[entryNo] || 0) + 1;
  localStorage.setItem(LOCAL_VOTES_KEY, JSON.stringify(localMap));

  if (db) {
    try {
      await setDoc(
        doc(db, 'entry_votes', `entri_${entryNo}`),
        { count: increment(1), updatedAt: serverTimestamp() },
        { merge: true }
      );
      return await fetchEntryVotes();
    } catch {
      return localMap;
    }
  }
  return localMap;
}

export async function fetchUserTestingFeedbacks(): Promise<UserTestingFeedback[]> {
  let localList: UserTestingFeedback[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_FEEDBACK_KEY);
    if (raw) localList = JSON.parse(raw) as UserTestingFeedback[];
  } catch {
    localList = [];
  }

  if (!db) return localList;

  try {
    const q = query(collection(db, 'user_testing_feedback'), orderBy('createdAt', 'desc'), limit(30));
    const snap = await getDocs(q);
    const items: UserTestingFeedback[] = [];
    snap.forEach((d) => {
      const data = d.data();
      items.push({
        id: d.id,
        testerName: String(data.testerName || ''),
        faculty: String(data.faculty || ''),
        device: (data.device as UserTestingFeedback['device']) || 'HP (Mobile)',
        navScore: Number(data.navScore || 5),
        clarityScore: Number(data.clarityScore || 5),
        tipsScore: Number(data.tipsScore || 5),
        driveScore: Number(data.driveScore || 5),
        mobileScore: Number(data.mobileScore || 5),
        comment: String(data.comment || ''),
        createdAtLabel: String(data.createdAtLabel || 'Baru saja'),
      });
    });
    return items;
  } catch {
    return localList;
  }
}

export async function submitUserTestingFeedback(
  payload: Omit<UserTestingFeedback, 'id' | 'createdAtLabel'>
): Promise<{ savedTo: 'firebase' | 'local'; item: UserTestingFeedback }> {
  const nowLabel = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const newItem: UserTestingFeedback = {
    ...payload,
    id: `local_${Date.now()}`,
    createdAtLabel: nowLabel,
  };

  try {
    const raw = localStorage.getItem(LOCAL_FEEDBACK_KEY);
    const list = raw ? (JSON.parse(raw) as UserTestingFeedback[]) : [];
    localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify([newItem, ...list]));
  } catch {
    // ignore storage errors
  }

  if (db) {
    try {
      const ref = await addDoc(collection(db, 'user_testing_feedback'), {
        ...payload,
        createdAtLabel: nowLabel,
        createdAt: serverTimestamp(),
      });
      return { savedTo: 'firebase', item: { ...newItem, id: ref.id } };
    } catch {
      return { savedTo: 'local', item: newItem };
    }
  }
  return { savedTo: 'local', item: newItem };
}
