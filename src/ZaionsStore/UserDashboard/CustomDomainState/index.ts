// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Types
import { IdNameType } from '@/types/AdminPanel/linksType';

// Datas
import { DefaultDomainsData } from '@/data/UserDashboard/CustomDomains';

export const DefaultDomainsState = atom<IdNameType[]>({
  key: 'DefaultDomainsState_Key',
  default: DefaultDomainsData,
});
