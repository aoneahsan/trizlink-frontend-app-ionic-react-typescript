import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';

// Images
import {
  DemoCreateSMSResource,
  Ebook30WaysResource,
  EbookHowMktUseSite,
  WebinarPromoteBrandResource
} from '@/assets/images';
import { PRODUCT_NAME } from '@/utils/constants';

export const DMSocialMarketerData: Zaions4By4GridSysType[] = [
  {
    id: 1,
    title: `How to Use ${PRODUCT_NAME} to Promote Your Brand`,
    image: WebinarPromoteBrandResource,
    label: 'Webinar',
    link: '/'
  },
  {
    id: 2,
    title: `The A–Z Guide to ${PRODUCT_NAME}’s Features, Tools & Use Cases`,
    image: Ebook30WaysResource,
    label: 'Ebook',
    link: '/'
  },
  {
    id: 3,
    title: `A Guide to How ${PRODUCT_NAME}’s Marketing Team Uses ${PRODUCT_NAME}`,
    image: EbookHowMktUseSite,
    label: 'Ebook',
    link: '/'
  },
  {
    id: 4,
    title: 'The 3 Steps to Creating a Click-Worthy SMS Message',
    image: DemoCreateSMSResource,
    label: 'Infographic',
    link: '/'
  }
];
