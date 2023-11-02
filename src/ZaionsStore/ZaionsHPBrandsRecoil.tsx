// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { type ZaionsHPBrandsType } from '@/types/ZionsHPBrandType';

export const ZaionsHPBrandsData = atom<ZaionsHPBrandsType[]>({
  key: 'ZaionsHPBrandsData_Key',
  default: []
});
