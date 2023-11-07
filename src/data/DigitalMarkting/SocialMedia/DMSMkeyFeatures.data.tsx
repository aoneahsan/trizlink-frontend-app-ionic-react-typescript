import { type ZaionsKeyFeatureType } from '@/types/InPageComponentTypes/ZaionsKeyFeature.type';
import { BrandingGif, DashboardGif, ShortenMin } from '@/assets/gif';
import { checkboxOutline, linkOutline, mailOutline } from 'ionicons/icons';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

export const DMSMKeyFeaturesData: ZaionsKeyFeatureType[] = [
  {
    id: 1,
    icon: linkOutline,
    title: 'Links that work in all your channels',
    animation: ShortenMin,
    text: 'Deploy branded links to lift results across every touchpoint.',
    link: {
      text: 'Learn more about link management →',
      url: ZaionsRoutes.Products.ZaionsLinkManagmentRoute
    }
  },
  {
    id: 2,
    icon: checkboxOutline,
    title: 'Brand-building built into every click',
    animation: BrandingGif,
    text: 'Improve click-through’s and amplify your brand at the same time.',
    link: {
      text: 'Learn more about branded links →',
      url: ZaionsRoutes.Feature.ZaionsBrandedLinksRoute
    }
  },
  {
    id: 3,
    icon: mailOutline,
    title: 'Fully understand engagement',
    animation: DashboardGif,
    text: 'Identify and promote your top-performing content.',
    link: {
      text: 'Learn more about campaign management and analytics →',
      url: ZaionsRoutes.Feature.ZaionsCampaignManagementAnalyticsRoute
    }
  }
];
