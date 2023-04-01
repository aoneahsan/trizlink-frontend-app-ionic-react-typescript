// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsOurTeamData } from '@/data/Company/AboutZaions/OurTeam.data';

// Types
import { ZaionsTeamType } from '@/types/Company/AboutZaionsPage/OurTeam.type';

export const ZaionsOurTeamState = atom<ZaionsTeamType[]>({
  key: 'ZaionsOurTeam_Key',
  default: ZaionsOurTeamData,
});
