import {
  createUser,
  firebaseAuth,
  signInUser
} from '@/HOCs/FirebaseHOC/frbAuthSetup';
import { STORAGE } from '@/utils/helpers';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { AuthError, AuthErrorCodes, getIdToken } from 'firebase/auth';

const email = 'aoneahsan@gmail.com';
const password = 'Asd123!@#';
const authKey = 'firebaseAuthToken';

const TestingFirebaseFeatures: React.FC = () => {
  const getFirebaseAuthToken = async () => {
    try {
      const res = await createUser(email, password);

      console.log({ ml: 'getFirebaseAuthToken -> signUp -> success', res });

      await STORAGE.SET(authKey, res);
    } catch (error) {
      const _err = error as AuthError;

      if (_err.code === AuthErrorCodes.EMAIL_EXISTS) {
        const res = await signInUser(email, password);

        console.log({ ml: 'getFirebaseAuthToken -> login -> success', res });

        await STORAGE.SET(authKey, res);
      }
    }
  };

  const getAuthLocalstorage = async () => {
    const firebaseAuthToken = await STORAGE.GET(authKey);

    console.log({
      ml: 'getAuthLocalstorage -> firebaseAuthToken',
      firebaseAuthToken
    });
  };

  const getAuthIdToken = async () => {
    if (firebaseAuth.currentUser) {
      const idToken = await getIdToken(firebaseAuth.currentUser);

      console.log({
        ml: 'getAuthIdToken -> idToken',
        idToken,
        currentUser: firebaseAuth.currentUser
      });
    } else {
      console.error({ ml: 'getAuthIdToken -> error', error: 'no user' });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={getFirebaseAuthToken}>
          give me auth token firebase
        </IonButton>
        <IonButton onClick={getAuthLocalstorage}>
          get auth from localstorage
        </IonButton>
        <IonButton onClick={getAuthIdToken}>get auth id token</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TestingFirebaseFeatures;
