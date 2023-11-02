// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { type ZaionsHPGlobalType } from '@/types/ZaionsHPGlobalType';

export const ZaionsHPGlobalData = atom<ZaionsHPGlobalType[]>({
  key: 'ZaionsHPGlobalData_Key',
  default: []
});
