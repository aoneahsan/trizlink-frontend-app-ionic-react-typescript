// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { ShortLinkType } from '@/types/AdminPanel/linksType/index';
// Data

export const SelectedShortLinkData = atom<ShortLinkType>({
  key: 'SelectedShortLinkData_key',
  default: {},
});
