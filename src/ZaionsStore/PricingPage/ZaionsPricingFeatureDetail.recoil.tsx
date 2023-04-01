// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsPricingFeatureDetailType } from '@/types/WhyZaions/PricingPage';
import { ZaionsPricingFeatureDetailData } from '@/data/WhyZaions/ZaionsPricingFeatureDetailData';

// Types

export const ZaionsPricingFeatureDetailState = atom<
  ZaionsPricingFeatureDetailType[]
>({
  key: 'ZaionsPricingFeatureDetailState_key',
  default: ZaionsPricingFeatureDetailData,
});
