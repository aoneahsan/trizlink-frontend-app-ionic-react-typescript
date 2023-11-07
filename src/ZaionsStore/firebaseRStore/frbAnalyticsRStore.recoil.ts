import { atom, selector } from 'recoil';
import { type FrbAnalyticsRStateType } from '@/types/firebaseTypes/frbAnalytics.type';
import { type Analytics } from 'firebase/analytics';

export const frbAnalyticsRState = atom<FrbAnalyticsRStateType>({
  key: 'frbAnalyticsRState_key',
  default: {
    isInitialized: false,
    initializedAt: null,
    frbAnalyticsInstance: null
  }
});

export const frbAnalyticsInstanceSelector = selector<Analytics | null>({
  key: 'frbAnalyticsInstanceSelector_key',
  get: ({ get }) => {
    const _frbAnalyticsState = get(frbAnalyticsRState);
    return _frbAnalyticsState.frbAnalyticsInstance;
  }
});
