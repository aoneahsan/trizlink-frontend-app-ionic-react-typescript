// Type
import { type ZaionsPressProductImagesType } from '@/types/Company/PressPage/ProductImages.type';

// Images
import {
  BrandingProductMarketingImgRetina,
  CustomBitlinksProductMarketingImgRetina,
  DashboardProductMarketingImgRetina,
  GeneralProductMarketingImg,
  MobileOptimizerProductMarketingImgRetina,
  OneViewProductMarketingImgRetina1
} from '@/assets/images';
import { PRODUCT_NAME } from '@/utils/constants';

export const ZaionsPressProductImagesData: ZaionsPressProductImagesType[] = [
  {
    id: '1',
    title: `${PRODUCT_NAME} Product`,
    image: GeneralProductMarketingImg,
    link: GeneralProductMarketingImg
  },
  {
    id: '2',
    title: `${PRODUCT_NAME} Product Branding`,
    image: BrandingProductMarketingImgRetina,
    link: BrandingProductMarketingImgRetina
  },
  {
    id: '3',
    title: `${PRODUCT_NAME} Product Custom Bitlinks`,
    image: CustomBitlinksProductMarketingImgRetina,
    link: CustomBitlinksProductMarketingImgRetina
  },
  {
    id: '4',
    title: `${PRODUCT_NAME} Product Dashboard`,
    image: DashboardProductMarketingImgRetina,
    link: DashboardProductMarketingImgRetina
  },
  {
    id: '5',
    title: `${PRODUCT_NAME} Product Mobile Optimizer`,
    image: MobileOptimizerProductMarketingImgRetina,
    link: MobileOptimizerProductMarketingImgRetina
  },
  {
    id: '6',
    title: `${PRODUCT_NAME} Product Campaigns`,
    image: OneViewProductMarketingImgRetina1,
    link: OneViewProductMarketingImgRetina1
  }
];
