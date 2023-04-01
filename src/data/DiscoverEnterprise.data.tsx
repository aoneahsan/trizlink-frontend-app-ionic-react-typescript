// Core Import

// Packages Imports

// Custom Imports
import { bose, buzzFeed, disney, ESPN, Gartner, nyTimes } from '@/assets/images';
import { ZaionsHPBrandsType } from '../types/ZionsHPBrandType';

const DEBrandData: ZaionsHPBrandsType[] = [
  {
    id: 1,
    image: `${ESPN}`,
  },

  {
    id: 2,
    image: `${disney}`,
  },

  {
    id: 3,
    image: `${buzzFeed}`,
  },

  {
    id: 4,
    image: `${nyTimes}`,
  },

  {
    id: 5,
    image: `${Gartner}`,
  },
  {
    id: 6,
    image: `${bose}`,
  },
];

export default DEBrandData;
