// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { IdNameType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';

export const FolderFormState = atom<IdNameType>({
  key: 'FolderFormState_Key',
  default: {
    formMode: FormMode.ADD,
  },
});
