import { FirebaseApp } from 'firebase/app';
import { RemoteConfig } from 'firebase/remote-config';

export interface IFrbAppRStateAtom {
  frbAppInitLastTriedAt: string | null;
  frbAppInitialized: boolean;
  frbAppData: FirebaseApp | null;
  frbRemoteConfigActivated: boolean;
  frbRemoteConfigData: RemoteConfig | null;
}

export interface IFrbRemoteConfigRStateAtom {
  isInitialized: boolean;
  lastFetchedAt: string;
  // TODO: !ALERT : Ahsan working here, create a type for this based on keys in config
}
