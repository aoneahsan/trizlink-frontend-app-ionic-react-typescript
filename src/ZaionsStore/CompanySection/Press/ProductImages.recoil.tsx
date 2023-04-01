// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsPressProductImagesData } from '@/data/Company/Press/ProductImages.data';

// Types
import { ZaionsPressProductImagesType } from '@/types/Company/PressPage/ProductImages.type';

export const ZaionsPressProductImagesState = atom<
  ZaionsPressProductImagesType[]
>({
  key: 'ZaionsProductImages_key',
  default: ZaionsPressProductImagesData,
});
