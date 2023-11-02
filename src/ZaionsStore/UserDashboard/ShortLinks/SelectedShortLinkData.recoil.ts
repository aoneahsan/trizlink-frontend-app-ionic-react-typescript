// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { type ShortLinkType } from '@/types/AdminPanel/linksType/index';
// Data

export const SelectedShortLinkData = atom<ShortLinkType>({
  key: 'SelectedShortLinkData_key',
  default: {
    featureImg: {}
  }
});
