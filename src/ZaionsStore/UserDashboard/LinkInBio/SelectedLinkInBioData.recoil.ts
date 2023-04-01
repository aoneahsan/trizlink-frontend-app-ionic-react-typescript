// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';

// Data
export const SelectedLinkInBioData = atom<LinkInBioType>({
  key: 'SelectedLinkInBioData_key',
  default: {
    theme: {
      button: {},
    },
    settings: {},
  },
});
