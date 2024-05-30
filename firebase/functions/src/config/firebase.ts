import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getRemoteConfig } from 'firebase-admin/remote-config';
import { getAuth } from 'firebase-admin/auth';

// Initialize the Firebase app with the configuration object
export const firebaseApp = initializeApp();

// Firebase Auth Package
export const firebaseAuth = getAuth(firebaseApp);

/**
 * Firebase Firestore database.
 */
export const firebaseFirestoreDB = getFirestore();

/**
 * Firebase Remote Config.
 */
export const firebaseRemoteConfig = getRemoteConfig();
