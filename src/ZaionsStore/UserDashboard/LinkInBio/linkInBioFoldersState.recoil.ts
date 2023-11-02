// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import {
  type FolderInterface,
  type LinkFolderType
} from '@/types/AdminPanel/linksType';

// Data

// Recoil state for storing formatted (formatted in a way to show in react-select) link-in-bio folders data.
export const LinkInBioFolderFormattedRState = atom<FolderInterface[]>({
  key: 'LinkInBioFolderFormattedRState_key',
  default: []
});

// Recoil state for storing link-in-bio folder data.
export const LinkInBioFolderRState = atom<LinkFolderType[]>({
  key: 'LinkInBioFolderRState_key',
  default: []
});
