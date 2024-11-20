import { firebaseApp } from '@/configs/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';

export const firebaseAuth = getAuth(firebaseApp);

// put try catch where you are using it
export const createUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signInUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};
