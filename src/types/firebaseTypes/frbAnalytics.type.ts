import { type stringOrNull } from '@/types/genericTypeDefinitions.type';
import { type Analytics } from 'firebase/analytics';

export interface FrbAnalyticsRStateType {
  isInitialized: boolean;
  initializedAt: stringOrNull;
  frbAnalyticsInstance: Analytics | null;
}
