// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { FolderInterface } from '@/types/AdminPanel/linksType';

// Data

export const LinkInBioFolderRState = atom<FolderInterface[]>({
  key: 'LinkInBioFolderRState_key',
  default: [],
});
