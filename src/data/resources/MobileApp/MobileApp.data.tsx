// Types
import { type ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

// Images
import { AppleLogo, playStoreLogo } from '@/assets/images';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';

export const MobileAppData: ZaionsCardWithIconType[] = [
  {
    id: 1,
    icon: playStoreLogo,
    title: 'Google Play | Android',
    text: `Manage your links from anywhere with the ${PRODUCT_NAME} Android app.`,
    btnText: 'Download for Free →',
    routeLink: CONSTANTS.ExternalURL.GenericExternalURL
  },
  {
    id: 2,
    icon: AppleLogo,
    title: 'App Store | iOS ',
    text: `Manage your links from anywhere with the ${PRODUCT_NAME} iOS app.`,
    btnText: 'Download for Free →',
    routeLink: CONSTANTS.ExternalURL.GenericExternalURL
  }
];
