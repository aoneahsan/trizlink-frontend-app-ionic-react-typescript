// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data

// Types
import { ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

export const ZaionsInpageColState = atom<ZaionsInpageColType[]>({
  key: 'ZaionsInpageColState_key',
  default: [],
});
