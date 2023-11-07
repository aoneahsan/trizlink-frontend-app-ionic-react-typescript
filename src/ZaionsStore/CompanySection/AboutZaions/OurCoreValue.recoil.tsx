// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsOurCoreValuesData } from '@/data/Company/AboutZaions/OurCoreValues.data';
import { type ZaionsOurCoreValuesType } from '@/types/Company/AboutZaionsPage/OurCoreValues.types';

// Types

export const ZaionsOurCoreValuesState = atom<ZaionsOurCoreValuesType[]>({
  key: 'ZaionsOurCoreValuesState_Key',
  default: ZaionsOurCoreValuesData
});
