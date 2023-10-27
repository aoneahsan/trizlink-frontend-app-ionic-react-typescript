import { atom } from 'recoil';
import { IFrbAppRStateAtom } from '@/types/firebaseRStoreTypes/index.type';

// frb = firebase

export const frbAppRStateAtom = atom<IFrbAppRStateAtom>({
  key: 'frbAppRStateAtom_key',
  default: {
    frbAppInitLastTriedAt: null,
    frbAppInitialized: false,
    frbAppData: null,
    frbRemoteConfigActivated: false,
    frbRemoteConfigData: null
  }
});

export const frbRemoteConfigRStateAtom = atom<>({
  key: 'frbRemoteConfigRStateAtom_key',
  default: {}
});
