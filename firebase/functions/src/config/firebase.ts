import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getRemoteConfig } from 'firebase-admin/remote-config';
import { getAuth } from 'firebase-admin/auth';

// Initialize the Firebase app with the configuration object
export const firebaseServerApp = initializeApp();

// Firebase Auth Package
export const firebaseServerAuth = getAuth(firebaseServerApp);

/**
 * Firebase Firestore database.
 */
export const firebaseServerFirestoreDB = getFirestore(firebaseServerApp);

/**
 * Firebase Remote Config.
 */
export const firebaseServerRemoteConfig = getRemoteConfig(firebaseServerApp);
