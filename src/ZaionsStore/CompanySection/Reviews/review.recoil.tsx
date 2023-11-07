// Core Imports

// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data
import { ZaionsReviewData } from '@/data/Company/Review/Review.data';

// Types
import { type ZaionsReviewType } from '@/types/Company/ReviewsPage/Review.type';

export const ZaionsReviewState = atom<ZaionsReviewType[]>({
  key: 'ZaionsReviewState_key',
  default: ZaionsReviewData
});
