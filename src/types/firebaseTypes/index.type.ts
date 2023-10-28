import { FirebaseApp } from 'firebase/app';
import {
  stringOrNull,
  stringOrNumberOrBooleanOrNull
} from '@/types/genericTypeDefinitions.type';

// Export from other files in this folder
export * from './frbAnalytics.type';

export interface IFrbAppRStateAtom {
  frbAppInitLastTriedAt: stringOrNull;
  frbAppInitialized: boolean;
  frbAppData: FirebaseApp | null;
}

export interface IFrbRemoteConfigRStateAtom {
  isInitialized: boolean;
  lastFetchedAt: stringOrNull;
  keys: FrbRemoteConfigKeysType;
}

export type FrbRemoteConfigKeysType = {
  [key in FrbRemoteConfigKeysNamesType]: stringOrNumberOrBooleanOrNull;
};

export type FrbRemoteConfigKeysNamesType =
  | 'appTitle'
  | 'cryptoSecret'
  | 'defaultCountry'
  | 'defaultShortUrlDomain'
  | 'defaultShortUrlDomain_Prod'
  | 'defaultTimeZone'
  | 'apiUrl'
  | 'apiUrl_Prod'
  | 'googleMapsApiKey';
