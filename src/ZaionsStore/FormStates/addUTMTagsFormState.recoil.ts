// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { UTMTagTemplateType } from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';

export const UTMTagsTemplateFormState = atom<UTMTagTemplateType>({
  key: 'UTMTagsTemplateFormState_Key',
  default: {
    templateName: '',
    formMode: FormMode.ADD,
  },
});
