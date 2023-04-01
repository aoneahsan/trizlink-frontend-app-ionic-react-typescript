import { chromeLogo, edgeLogo, firefoxLogo } from '@/assets/images';
import { ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';

export const BrowserExtensionData: ZaionsCardWithIconType[] = [
  {
    id: 1,
    icon: chromeLogo,
    title: 'Chrome Extension',
    text: `Click the ${PRODUCT_NAME} button in your toolbar to create a unique link to the current URL on Chrome.`,
    btnText: 'Download for Free →',
    routeLink: CONSTANTS.GenaricExternalURL,
  },
  {
    id: 2,
    icon: firefoxLogo,
    title: 'Firefox Extension',
    text: `Click the ${PRODUCT_NAME} button in your toolbar to create a unique link to the current URL on Firefox.`,
    btnText: 'Download for Free →',
    routeLink: CONSTANTS.GenaricExternalURL,
  },
  {
    id: 3,
    icon: edgeLogo,
    title: 'Edge Extension',
    text: `Click the ${PRODUCT_NAME} button in your toolbar to create a unique link to the current URL on Edge.`,
    btnText: 'Download for Free →',
    routeLink: CONSTANTS.GenaricExternalURL,
  },
];
