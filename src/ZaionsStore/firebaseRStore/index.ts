import { atom, selector } from 'recoil';
import {
  FrbRemoteConfigKeysType,
  IFrbAppRStateAtom,
  IFrbRemoteConfigRStateAtom
} from '@/types/firebaseTypes/index.type';

// Exports from other files in this folder
export * from './frbAnalyticsRStore.recoil';

// frb = firebase

export const frbAppRStateAtom = atom<IFrbAppRStateAtom>({
  key: 'frbAppRStateAtom_key',
  default: {
    frbAppInitLastTriedAt: null,
    frbAppInitialized: false,
    frbAppData: null
  }
});

export const frbRemoteConfigRStateAtom = atom<IFrbRemoteConfigRStateAtom>({
  key: 'frbRemoteConfigRStateAtom_key',
  default: {
    isInitialized: false,
    lastFetchedAt: null,
    keys: {
      apiUrl: null,
      apiUrl_Prod: null,
      appTitle: null,
      cryptoSecret: null,
      defaultCountry: null,
      defaultShortUrlDomain: null,
      defaultShortUrlDomain_Prod: null,
      defaultTimeZone: null,
      googleMapsApiKey: null
    }
  }
});

export const frbRemoteConfigKeysRStateSelector =
  selector<FrbRemoteConfigKeysType>({
    key: 'frbRemoteConfigKeysRStateSelector_key',
    get: ({ get }) => {
      const frbRemoteConfigRState = get(frbRemoteConfigRStateAtom);
      return frbRemoteConfigRState.keys;
    }
  });
