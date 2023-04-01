// Type
import { ZaionsPressType } from 'types/Company/PressPage/Press.type';

// Images
import {
  ZaionsMomentumLeadershipPressPreview,
  ZaionsPress,
} from 'assets/images';
import { PRODUCT_NAME } from 'utils/constants';

export const ZaionsPressData: ZaionsPressType[] = [
  {
    id: '1',
    date: 'September 22, 2022',
    title: `${PRODUCT_NAME} Expands Leadership Team With Hiring of Chief Marketing Officer, General Counsel; Promotion of Chief Product Officer and Appointment of New Board Member`,
    image: ZaionsMomentumLeadershipPressPreview,
    link: '/',
  },
  {
    id: '2',
    date: 'August 23, 2022',
    title: `${PRODUCT_NAME} Establishes Five Employee Resource Groups To Further Commitment To Diversity, Equity and Inclusion`,
    image: ZaionsPress,
    link: '/',
  },
  {
    id: '3',
    date: 'July 12, 2022',
    title: `${PRODUCT_NAME} Achieves 60+% Year Over Year Customer Growth in First Half of 2022`,
    image: ZaionsPress,
    link: '/',
  },
];
