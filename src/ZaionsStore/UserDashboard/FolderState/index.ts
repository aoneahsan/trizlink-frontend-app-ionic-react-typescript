// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Types
import { FolderInterface } from '@/types/AdminPanel/linksType';

// Datas
import { FoldersData } from '@/data/UserDashboard/Folders/index.data';

export const FolderState = atom<FolderInterface[]>({
  key: 'FolderState_Key',
  default: FoldersData,
});
