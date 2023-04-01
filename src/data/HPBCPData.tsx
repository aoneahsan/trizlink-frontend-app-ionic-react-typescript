// Core Imports

// Packages Imports
import { checkmarkCircleOutline } from 'ionicons/icons';

// Custom Imports
import { ZaionsHpCPDataType } from '@/types/ZaionsHPBCPType';

// Images
import { linkInBio, linkMngt3, qrCode } from '@/assets/images';

export const HPBCData: ZaionsHpCPDataType[] = [
  {
    id: 1,
    icon: linkMngt3,
    title: 'Link Management',
    text: `A comprehensive solution to help make every
    point of connection between your content and
    your audience more powerful.`,
    featureListTitle: 'Popular Link Management Features',
    featureListItem: [
      {
        id: 1,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL shortening at scale',
      },
      {
        id: 2,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Custom links with your brand',
      },
      {
        id: 3,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL redirects',
      },
      {
        id: 4,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Advanced analytics & tracking',
      },
    ],
    primaryBtnText: 'Get Started For Free',
    secondaryBtnText: 'Learn more',
  },
  {
    id: 2,
    icon: qrCode,
    title: 'QR Codes',
    text: `A comprehensive solution to help make every
    point of connection between your content and
    your audience more powerful.`,
    featureListTitle: 'Popular Link Management Features',
    featureListItem: [
      {
        id: 1,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL shortening at scale',
      },
      {
        id: 2,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Custom links with your brand',
      },
      {
        id: 3,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL redirects',
      },
      {
        id: 4,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Advanced analytics & tracking',
      },
    ],
    primaryBtnText: 'Get Started For Free',
    secondaryBtnText: 'Learn more',
  },
  {
    id: 3,
    icon: linkInBio,
    title: 'Link-in-bio ',
    text: `A comprehensive solution to help make every
    point of connection between your content and
    your audience more powerful.`,
    featureListTitle: 'Popular Link Management Features',
    featureListItem: [
      {
        id: 1,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL shortening at scale',
      },
      {
        id: 2,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Custom links with your brand',
      },
      {
        id: 3,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'URL redirects',
      },
      {
        id: 4,
        featureIcon: checkmarkCircleOutline,
        fetureText: 'Advanced analytics & tracking',
      },
    ],
    primaryBtnText: 'Get Started For Free',
    secondaryBtnText: 'Learn more',
    extraData: 'New',
  },
];
