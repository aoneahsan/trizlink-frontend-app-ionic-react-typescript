import {
  PixelAccountPlatformType,
  PixelAccountType,
  PixelPlatformsEnum,
} from '@/types/AdminPanel/linksType';

export const PixelAccountsData: PixelAccountType[] = [
  {
    id: '1',
    pixelId: 'facebook34343323',
    platform: PixelPlatformsEnum.facebook,
    title: 'facebook',
    createAt: 'Nov 29, 2022',
    updatedAt: undefined,
  },
  {
    id: '2',
    pixelId: 'google_ads',
    platform: PixelPlatformsEnum.google_ads,
    title: 'google_ads',
    createAt: 'Nov 2, 2022',
    updatedAt: 'Nov 29, 2022',
  },
];

export const PixelAccountPlatformOptionsData: PixelAccountPlatformType[] = [
  {
    id: '1',
    type: PixelPlatformsEnum.facebook,
    title: 'FaceBook',
  },
  {
    id: '2',
    type: PixelPlatformsEnum.linkedin,
    title: 'Linkdin',
  },
  {
    id: '3',
    type: PixelPlatformsEnum.twitter,
    title: 'Twitter',
  },
  {
    id: '4',
    type: PixelPlatformsEnum.google_analytics,
    title: 'Google Analytics',
  },
  {
    id: '5',
    type: PixelPlatformsEnum.google_analytics_4,
    title: 'Google Analytics 4',
  },
  {
    id: '6',
    type: PixelPlatformsEnum.google_ads,
    title: 'Google Ads',
  },
  {
    id: '7',
    type: PixelPlatformsEnum.google_tag_manager,
    title: 'Google Tag Manager',
  },
  {
    id: '8',
    type: PixelPlatformsEnum.quora,
    title: 'Quora',
  },
  {
    id: '9',
    type: PixelPlatformsEnum.snapchat,
    title: 'Snapchat',
  },
  {
    id: '10',
    type: PixelPlatformsEnum.pinterest,
    title: 'Pinterest',
  },
  {
    id: '11',
    type: PixelPlatformsEnum.bing,
    title: 'Bing',
  },
  {
    id: '12',
    type: PixelPlatformsEnum.adroll,
    title: 'Adroll',
  },
  {
    id: '13',
    type: PixelPlatformsEnum.nexus,
    title: 'Nexus',
  },
  {
    id: '14',
    type: PixelPlatformsEnum.tiktok,
    title: 'TikTok',
  },
  {
    id: '15',
    type: PixelPlatformsEnum.vk,
    title: 'VK',
  },
];
