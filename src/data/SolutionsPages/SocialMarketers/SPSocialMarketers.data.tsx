import {
  brandConsistencyResource,
  secretsSocialSmbResource,
  WebinarPromoteBrandResource,
  WebinarSocialMediaStrategyUseV2Resource
} from '@/assets/images';
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
export const SPSocialMarketerData: Zaions4By4GridSysType[] = [
  {
    id: 1,
    title: `How to Use ${PRODUCT_NAME} to Promote Your Brand`,
    image: WebinarPromoteBrandResource,
    label: 'Webinar',
    link: CONSTANTS.ProductExternalURL.GenericExternalURL
  },
  {
    id: 2,
    title: 'How to Create a Social Media Strategy You’ll Actually Use',
    image: WebinarSocialMediaStrategyUseV2Resource,
    label: 'Webinar',
    link: CONSTANTS.ProductExternalURL.GenericExternalURL
  },
  {
    id: 3,
    title: 'How to Achieve Brand Consistency to Gain Competitive Advantage',
    image: brandConsistencyResource,
    label: 'Ebook',
    link: CONSTANTS.ProductExternalURL.GenericExternalURL
  },
  {
    id: 4,
    title: 'Social Media for Small Business: The Complete Guide',
    image: secretsSocialSmbResource,
    label: 'Ebook',
    link: CONSTANTS.ProductExternalURL.GenericExternalURL
  }
];
