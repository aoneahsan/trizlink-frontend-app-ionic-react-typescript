// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
import { SPSocialMarketerData } from '@/data/SolutionsPages/SocialMarketers/SPSocialMarketers.data';
import { Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

export const ZaionsSPSocialMarketersState = atom<Zaions4By4GridSysType[]>({
  key: 'ZaionsSPSocialMedia_Key',
  default: SPSocialMarketerData,
});
