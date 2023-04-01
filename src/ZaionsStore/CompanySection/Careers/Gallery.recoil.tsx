// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsCareersPageGalleryData } from '@/data/Company/Careers/Gallery.data';

// Types
import { ZaionsGalleryType } from '@/types/Company/CareersPage/Gallery.type';

export const ZaionsCareersPageGalleryState = atom<ZaionsGalleryType[]>({
  key: 'ZaionsCareersPageGalleryState_key',
  default: ZaionsCareersPageGalleryData,
});
