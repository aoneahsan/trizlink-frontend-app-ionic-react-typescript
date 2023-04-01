// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Types
import { IdNameType } from '@/types/AdminPanel/linksType';

// Datas
import { APIKeyData } from '@/data/UserDashboard/APIKey/index.data';

export const APIKeyState = atom<IdNameType[]>({
  key: 'APIKeyState_Key',
  default: APIKeyData,
});
