// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { EmbedWidgetsType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';

export const EmbedWidgetsFormState = atom<EmbedWidgetsType>({
  key: 'EmbedWidgets_Key',
  default: {
    formMode: FormMode.ADD,
  },
});
