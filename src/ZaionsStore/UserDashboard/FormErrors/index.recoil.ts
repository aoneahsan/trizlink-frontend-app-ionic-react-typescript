// Packages Imports
import { atom } from 'recoil';

// Type
import { type FormErrorsType } from '@/types/AdminPanel/linksType';

export const ZaionsFormErrors = atom<FormErrorsType>({
  key: 'ZaionsFormErrors_key',
  default: {}
});
