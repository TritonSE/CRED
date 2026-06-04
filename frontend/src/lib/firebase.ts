import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import type { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    "Missing Firebase config. Set NEXT_PUBLIC_API_KEY (and other NEXT_PUBLIC_* vars) in .env — see .env.example.",
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
