// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { type ZaionsHPFAQType } from '@/types/ZionsHPFAQType';

export const ZaionsHPFAQData = atom<ZaionsHPFAQType[]>({
  key: 'ZaionsHPFAQData_Key',
  default: []
});
