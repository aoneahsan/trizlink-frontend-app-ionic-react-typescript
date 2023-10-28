import { stringOrNull } from '@/types/genericTypeDefinitions.type';
import { Analytics } from 'firebase/analytics';

export type FrbAnalyticsRStateType = {
  isInitialized: boolean;
  initializedAt: stringOrNull;
  frbAnalyticsInstance: Analytics | null;
};
