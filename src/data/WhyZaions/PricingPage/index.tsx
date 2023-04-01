// Type
import { ZaionsPricingSubscriptionsType } from '@/types/WhyZaions/PricingPage';

// Images
import {
  XSlLinkInBio,
  XSCustomizableBackhalves,
  XSQRCodes,
  XSRedirect,
  XSDataAnalytics,
  XSChatSupport,
  XSComplimentaryDomain,
  XSShare,
  XSAnalytics,
  XSCampaigns,
  XSLocationDeviceData,
  XSUserPermission,
  XSScaleLinks,
  XSUptime,
  XSEnterpriseSupport,
} from '@/assets/images';
import { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

export const ZaionsPricingPageData: ZaionsPricingSubscriptionsType[] = [
  {
    id: '1',
    label: 'FREE',
    price: '$0',
    priceDuration: '/month',
    limit_text: `50 ${PRODUCT_DOMAIN} links/month`,
    features_title: 'Includes:',
    link: ZaionsRoutes.SignUpRoute,
    features_included: [
      {
        feature_id: '1',
        icon: XSlLinkInBio,
        text: `${PRODUCT_NAME}-branded Link-in-bio`,
      },
      {
        feature_id: '2',
        icon: XSCustomizableBackhalves,
        text: 'Custom back-halves',
      },
      {
        feature_id: '3',
        icon: XSQRCodes,
        text: `${PRODUCT_NAME}-branded QR Codes`,
        new: true,
      },
    ],
  },
  {
    id: '2',
    label: 'STARTER',
    price: '$8',
    priceDuration: '/month',
    annualCharge: '$96',
    limit_text: `200 ${PRODUCT_DOMAIN} links/month`,
    features_title: 'Everything in Free, plus:',
    features_included: [
      {
        feature_id: '1',
        icon: XSlLinkInBio,
        text: 'Link-in-bio',
        new: true,
      },
      {
        feature_id: '2',
        icon: XSRedirect,
        text: 'Link redirects',
      },
      {
        feature_id: '3',
        icon: XSDataAnalytics,
        text: 'Data export',
      },
      {
        feature_id: '4',
        icon: XSChatSupport,
        text: 'Access to support',
      },
    ],
  },
  {
    id: '3',
    label: 'BASIC',
    price: '$29',
    priceDuration: '/month',
    annualCharge: '$348',
    limit_text: '1,500 branded links/month',
    features_title: 'Everything in Starter, plus:',
    features_included: [
      {
        feature_id: '1',
        icon: XSComplimentaryDomain,
        text: 'Complimentary custom domain*',
      },
      {
        feature_id: '2',
        icon: XSRedirect,
        text: 'Custom link redirects',
      },
      {
        feature_id: '3',
        icon: XSQRCodes,
        text: 'QR Code colors and logos',
      },
      {
        feature_id: '4',
        icon: XSShare,
        text: 'Branded links',
      },
    ],
  },
  {
    id: '4',
    label: 'PREMIUM',
    price: '$199',
    priceDuration: '/month',
    annualCharge: '$2,388',
    limit_text: '3,000  branded links/month',
    features_title: 'Everything in Basic, plus:',
    features_included: [
      {
        feature_id: '1',
        icon: XSAnalytics,
        text: 'Advanced performance dashboard',
      },
      {
        feature_id: '2',
        icon: XSCampaigns,
        text: 'Campaigns',
      },
      {
        feature_id: '3',
        icon: XSQRCodes,
        text: 'QR Code multiple download formats',
      },
      {
        feature_id: '4',
        icon: XSLocationDeviceData,
        text: 'Location and device type data',
      },
    ],
  },
  {
    id: '5',
    label: 'ENTERPRISE',
    price: 'Custom',
    limit_text: '10,000+ branded links/mo.',
    features_title: 'Everything in Premium, plus:',
    features_included: [
      {
        feature_id: '1',
        icon: XSUserPermission,
        text: 'Multiple user seats and group permissions',
      },
      {
        feature_id: '2',
        icon: XSScaleLinks,
        text: 'At scale link generation',
      },
      {
        feature_id: '3',
        icon: XSUptime,
        text: '99.9% SLA uptime',
      },
      {
        feature_id: '4',
        icon: XSEnterpriseSupport,
        text: 'Account manager support',
      },
    ],
  },
];
