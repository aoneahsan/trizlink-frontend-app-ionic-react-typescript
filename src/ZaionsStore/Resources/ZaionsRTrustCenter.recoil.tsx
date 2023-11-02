// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { type ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

export const ZaionsRTCState = atom<ZaionsCardWithIconType[]>({
  key: 'ZaionsRTCPData_Key',
  default: []
});
