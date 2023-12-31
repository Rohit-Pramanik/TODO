import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
var firebaseConfig = {
  apiKey: process.env.API_KEY || process.env.apiKey,
  authDomain: process.env.AUTH_DOMAIN || process.env.authDomain,
  projectId: process.env.PROJECT_ID || process.env.projectId,
  storageBucket: process.env.STORAGE_BUCKET || process.env.storageBucket,
  messagingSenderId: process.env.MESSAGEING_SENDING_ID || process.env.messagingSenderId,
  appId: process.env.APP_ID || process.env.appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
