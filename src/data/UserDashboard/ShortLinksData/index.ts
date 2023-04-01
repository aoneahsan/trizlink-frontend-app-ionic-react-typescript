import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import { ZaionsBusinessDetails } from '@/utils/constants';

export const ZaionsShortLinkData = [
  {
    id: '1',
    utmTagInfo: {
      templateId: '1',
      utmCampaign: 'Zaions Campaign',
      utmContent: 'Zaions Content',
      utmMedium: 'Zaions Medium',
      utmSource: 'Zaions Source',
      utmTerm: 'ZaionsTerm',
    },
    folderId: '2',
    createdAt: 'Des 12, 2022, 11:00',
    // form data - for creation/updation
    type: messengerPlatformsBlockEnum.link,
    target: {
      accountId: '',
      email: '',
      message: '',
      phoneNumber: '',
      subject: '',
      url: ZaionsBusinessDetails.WebsiteUrl,
      username: '',
    },
    featureImg: '',
    title: 'Zaions 1 (The Group Of Projects)',
    description: 'Zaions by Ahsan Mahmood. 1',
    pixelIds: ['1', '2'],
    shortUrl: {
      domain: 'swiy.co',
      url: '',
    },
    notes:
      'We Provide Best Web Services, including website development, mobile app development, website layout designing and over all 360 solutions.',
    tags: ['123', 'cwd', 'zaions', 'ahsan mahmmod', 'mti', 'aoneahsan'],
    abTestingRotatorLinks: [
      { redirectionLink: 'https://aoneahsan.com', percentage: 100 },
    ],
    geoLocationRotatorLinks: [],
    linkExpirationInfo: undefined,
    password: 'zaions',
    favicon: {
      url: '',
      type: '',
      fileName: '',
      size: '',
    },
    totalClicks: 10000,
  },
  {
    id: '2',
    utmTagInfo: {
      templateId: '2',
      utmCampaign: 'Default Campaign 2',
      utmContent: 'Default Content 2',
      utmMedium: 'Default Medium 2',
      utmSource: 'Default Source 2',
      utmTerm: 'DefaultTerm 2',
    },
    folderId: '0',

    // form data - for creation/updation
    type: messengerPlatformsBlockEnum.viber,
    target: {
      accountId: '@zaions',
      email: '',
      message: '',
      phoneNumber: '',
      subject: '',
      url: '',
      username: '',
    },
    featureImg: '',
    title: 'Zaions 2 (The Group Of Projects)',
    description: 'Zaions by Ahsan Mahmood. 2',
    pixelIds: ['1'],
    shortUrl: {
      domain: 'swiy.co',
      url: 'https://shorturl.com',
    },
    notes:
      'We Provide Best Web Services, including website development, mobile app development, website layout designing and over all 660 solutions.',
    tags: ['123', 'cwd', 'zaions', 'ahsan mahmmod', 'mti', 'aoneahsan'],
    abTestingRotatorLinks: [
      { redirectionLink: 'https://aoneahsan.com', percentage: 100 },
    ],
    geoLocationRotatorLinks: [],
    linkExpirationInfo: undefined,
    password: 'zaions',
    favicon: {
      url: '',
      type: '',
      fileName: '',
      size: '',
    },
    totalClicks: 500,
  },
  {
    id: '3',
    utmTagInfo: {
      templateId: '3',
      utmCampaign: 'Zaions devs Campaign',
      utmContent: 'Zaions devs Content',
      utmMedium: 'Zaions devs Medium',
      utmSource: 'Zaions devs Source',
      utmTerm: 'Zaions devs Term',
    },
    folderId: '1',
    createdAt: 'Aug 12, 2022, 23:00',
    // form data - for creation/updation
    type: messengerPlatformsBlockEnum.line,
    target: {
      accountId: '@zaionsDevs',
      email: '',
      message: '',
      phoneNumber: '',
      subject: '',
      url: '',
      username: '',
    },
    featureImg: '',
    title: 'Zaions 3 (The Group Of Projects)',
    description: 'Zaions by Ahsan Mahmood. (The Group Of Projects) 3',
    pixelIds: ['1', '2'],
    shortUrl: {
      domain: 'swiy.co',
      url: 'https://shorturl.com',
    },
    notes:
      'We Provide Best Web Services, including website development, mobile app development, website layout designing and over all 960 solutions.',
    tags: ['123', 'cwd', 'zaions', 'ahsan mahmmod', 'mti', 'aoneahsan'],
    abTestingRotatorLinks: [
      { redirectionLink: 'https://aoneahsan.com', percentage: 100 },
    ],
    geoLocationRotatorLinks: [],
    linkExpirationInfo: undefined,
    password: 'zaions',
    favicon: {
      url: '',
      type: '',
      fileName: '',
      size: '',
    },
    totalClicks: 3000,
  },
];
