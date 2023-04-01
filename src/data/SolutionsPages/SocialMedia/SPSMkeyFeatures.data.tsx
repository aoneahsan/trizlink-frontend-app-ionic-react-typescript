import { ZaionsKeyFeatureType } from 'types/InPageComponentTypes/ZaionsKeyFeature.type';
import {} from 'ionicons';
import { BrandingGif, DashboardGif, ShortenMin } from 'assets/gif';
import { checkboxOutline, linkOutline, mailOutline } from 'ionicons/icons';
import { ZaionsBusinessDetails } from 'utils/constants';

export const SPSMKeyFeaturesData: ZaionsKeyFeatureType[] = [
  {
    id: 1,
    icon: linkOutline,
    title: 'Links built for social',
    animation: ShortenMin,
    text: 'Share and manage links your followers will want to click.',
    link: {
      text: 'Learn more about link management →',
      url: ZaionsBusinessDetails.WebsiteUrl,
    },
  },
  {
    id: 2,
    icon: checkboxOutline,
    title: 'Brand-building in every link',
    animation: BrandingGif,
    text: 'Amplify and further expand your brand with each share.',
    link: {
      text: 'Learn more about branded links →',
      url: ZaionsBusinessDetails.WebsiteUrl,
    },
  },
  {
    id: 3,
    icon: mailOutline,
    title: 'Clearer insights, less guesswork',
    animation: DashboardGif,
    text: 'Identify your best content across social channels.',
    link: {
      text: 'Learn more about campaign management and analytics →',
      url: ZaionsBusinessDetails.WebsiteUrl,
    },
  },
];
