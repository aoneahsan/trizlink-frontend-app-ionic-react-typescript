// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsPressData } from '@/data/Company/Press/Press.data';

// Types
import { type ZaionsPressType } from '@/types/Company/PressPage/Press.type';

export const ZaionsPressState = atom<ZaionsPressType[]>({
  key: 'ZaionsPressState_key',
  default: ZaionsPressData
});
