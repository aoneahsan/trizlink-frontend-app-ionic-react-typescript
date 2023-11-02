// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsJobsData } from '@/data/Company/Careers/AvalableJobs.data';

// Types
import { type ZaionsJobsType } from '@/types/Company/CareersPage/AvalableJobs.type';

export const ZaionsJobsState = atom<ZaionsJobsType[]>({
  key: 'ZaionsJobsState_key',
  default: ZaionsJobsData
});
