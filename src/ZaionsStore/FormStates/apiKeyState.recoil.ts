// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { IdNameType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';

export const APIKeyFormState = atom<IdNameType>({
  key: 'APIKeyFormState_Key',
  default: {
    formMode: FormMode.ADD,
  },
});
