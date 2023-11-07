// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Types
import { type IdNameType } from '@/types/AdminPanel/linksType';

// Data
import { DefaultDomainsData } from '@/data/UserDashboard/CustomDomains';

export const DefaultDomainsState = atom<IdNameType[]>({
  key: 'DefaultDomainsState_Key',
  default: DefaultDomainsData
});
