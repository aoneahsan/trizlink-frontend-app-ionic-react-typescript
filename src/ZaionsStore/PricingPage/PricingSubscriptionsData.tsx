// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsPricingPageData } from '@/data/WhyZaions/PricingPage';
import { ZaionsPricingSubscriptionsType } from '@/types/WhyZaions/PricingPage';

// Types

export const ZaionsPricingSubscriptionsState = atom<
  ZaionsPricingSubscriptionsType[]
>({
  key: 'ZaionsPrcingDataOfCols_Key',
  default: ZaionsPricingPageData,
});
