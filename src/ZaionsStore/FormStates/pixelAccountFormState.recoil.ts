// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';

export const PixelAccountFormState = atom<PixelAccountType>({
  key: 'PixelAccountFormState_Key',
  default: {
    title: undefined,
    pixelId: undefined,
    formMode: FormMode.ADD,
  },
});
