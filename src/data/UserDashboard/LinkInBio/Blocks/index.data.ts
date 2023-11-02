import CONSTANTS from '@/utils/constants';

import {
  LinkInBioButtonTypeEnum,
  LinkInBioThemeBackgroundEnum
} from '@/types/AdminPanel/linkInBioType';
import {
  LinkInBioBlockAnimationEnum,
  LinkInBioBlockEnum,
  LinkInBioCardStyleEnum,
  LinkInBioCardViewEnum,
  type LinkInBioSingleBlockContentType,
  LinkInBioMusicPlatformEnum,
  SeparatorTypeEnum,
  LinkInBioSocialPlatformEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes/index';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

const defaultTimezone = '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi';

const DefaultSharedData: LinkInBioSingleBlockContentType = {
  animation: {
    isEnabled: false,
    type: LinkInBioBlockAnimationEnum.jello
  },

  schedule: {
    isEnabled: false,
    startAt: new Date().toISOString(),
    endAt: new Date().toISOString(),
    timezone: defaultTimezone
  }
};

const LinkInBioButtonBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: 'button',
  icon: '',
  timezone: defaultTimezone,
  customAppearance: {
    isEnabled: false,
    background: {
      bgType: LinkInBioThemeBackgroundEnum.solidColor,
      bgSolidColor: CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_COLOR,
      bgGradientColors: {
        startColor: '#000',
        endColor: '#000',
        direction: 0
      },
      bgImageUrl: 'string',
      enableBgImage: false
    },
    buttonType: LinkInBioButtonTypeEnum.inlineCircle
  },
  ...DefaultSharedData
};

const LinkInBioTextBlockDefaultData: LinkInBioSingleBlockContentType = {
  text: 'text',
  ...DefaultSharedData
};

const LinkInBioCountdownBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  imageUrl: '',
  title: '',
  description: '',
  date: new Date().toISOString(),
  timezone: defaultTimezone,
  style: LinkInBioCardStyleEnum.horizontal,
  ...DefaultSharedData
};

const LinkInBioCardBlockDefaultData: LinkInBioSingleBlockContentType = {
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  cardItems: [
    {
      target: {
        url: ''
      },
      imageUrl: '',
      title: '',
      description: ''
    },
    {
      target: {
        url: ''
      },
      imageUrl: '',
      title: '',
      description: ''
    }
  ],
  ...DefaultSharedData
};

const LinkInBioRSSBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  titleIsEnable: true,
  descriptionIsEnable: true,
  pictureIsEnable: true,
  cardNumber: 15,
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  ...DefaultSharedData
};

const LinkInBioAudioBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  customHeight: 196,
  ...DefaultSharedData
};

const LinkInBioVideoBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  ...DefaultSharedData
};

const LinkInBioCalendarBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  customHeight: 196,
  cardMode: false,
  ...DefaultSharedData
};

const LinkInBioShopifyBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  titleIsEnable: true,
  descriptionIsEnable: false,
  priceIsEnable: true,
  pictureIsEnable: true,
  cardNumber: 10,
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  ...DefaultSharedData
};

const LinkInBioMagentoBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  titleIsEnable: true,
  descriptionIsEnable: false,
  priceIsEnable: true,
  cardNumber: 10,
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  ...DefaultSharedData
};

const LinkInBioWordpressBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  titleIsEnable: true,
  descriptionIsEnable: false,
  priceIsEnable: true,
  cardNumber: 10,
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  ...DefaultSharedData
};

const LinkInBioMapsBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  ...DefaultSharedData
};

const LinkInBioVcardBlockDefaultData: LinkInBioSingleBlockContentType = {
  title: 'Save to Contacts',
  icon: '',
  vcard: {
    firstName: '',
    lastName: '',
    mobile: '',
    phone: '',
    fax: '',
    email: '',
    company: '',
    job: '',
    street: '',
    city: '',
    zip: 0,
    state: '',
    country: '',
    website: ''
  },
  customAppearance: {
    isEnabled: false,
    background: {
      bgType: LinkInBioThemeBackgroundEnum.solidColor,
      bgSolidColor: CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_COLOR,
      bgGradientColors: {
        startColor: '#000',
        endColor: '#000',
        direction: 0
      },
      bgImageUrl: 'string',
      enableBgImage: false
    },
    buttonType: LinkInBioButtonTypeEnum.inlineCircle
  },
  ...DefaultSharedData
};

const LinkInBioIframeBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  iframe: '',
  cardMode: false,
  customHeight: 196,
  ...DefaultSharedData
};

const LinkInBioSeparatorBlockDefaultData: LinkInBioSingleBlockContentType = {
  separatorType: SeparatorTypeEnum.solid,
  separatorColor: '#ffffff',
  margin: 20,
  ...DefaultSharedData
};

const LinkInBioAvatarBlockDefaultData: LinkInBioSingleBlockContentType = {
  target: {
    url: ''
  },
  title: '',
  description: '',
  imageUrl: '',
  style: LinkInBioCardStyleEnum.circle,
  avatarShadow: false,
  ...DefaultSharedData
};

const LinkInBioMusicBlockDefaultData: LinkInBioSingleBlockContentType = {
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  cardItems: [
    {
      target: {
        url: ''
      },
      musicCardType: LinkInBioMusicPlatformEnum.spotify,
      title: 'Spotify'
    }
  ],
  ...DefaultSharedData
};

const LinkInBioMessengerBlockDefaultData: LinkInBioSingleBlockContentType = {
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  cardItems: [
    {
      target: {
        url: ''
      },
      messengerCardType: messengerPlatformsBlockEnum.email,
      title: 'Email'
    }
  ],
  ...DefaultSharedData
};

const LinkInBioSocialBlockDefaultData: LinkInBioSingleBlockContentType = {
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  cardItems: [
    {
      target: {
        url: ''
      },
      socialCardType: LinkInBioSocialPlatformEnum.tiktok
    }
  ],
  ...DefaultSharedData
};

const LinkInBioQAndABlockDefaultData: LinkInBioSingleBlockContentType = {
  style: LinkInBioCardStyleEnum.horizontal,
  view: LinkInBioCardViewEnum.carousel,
  cardItems: [
    {
      target: {
        url: ''
      },
      title: '',
      text: ''
    }
  ],
  ...DefaultSharedData
};

export const LinkInBioBlocksDefaultData: Record<
  string,
  LinkInBioSingleBlockContentType
> = {
  [LinkInBioBlockEnum.button]: LinkInBioButtonBlockDefaultData,
  [LinkInBioBlockEnum.text]: LinkInBioTextBlockDefaultData,
  [LinkInBioBlockEnum.countdown]: LinkInBioCountdownBlockDefaultData,
  [LinkInBioBlockEnum.card]: LinkInBioCardBlockDefaultData,
  [LinkInBioBlockEnum.carousel]: LinkInBioRSSBlockDefaultData,
  [LinkInBioBlockEnum.audio]: LinkInBioAudioBlockDefaultData,
  [LinkInBioBlockEnum.video]: LinkInBioVideoBlockDefaultData,
  [LinkInBioBlockEnum.calendar]: LinkInBioCalendarBlockDefaultData,
  [LinkInBioBlockEnum.shopify]: LinkInBioShopifyBlockDefaultData,
  [LinkInBioBlockEnum.magento]: LinkInBioMagentoBlockDefaultData,
  [LinkInBioBlockEnum.wordpress]: LinkInBioWordpressBlockDefaultData,
  [LinkInBioBlockEnum.map]: LinkInBioMapsBlockDefaultData,
  [LinkInBioBlockEnum.VCard]: LinkInBioVcardBlockDefaultData,
  [LinkInBioBlockEnum.Iframe]: LinkInBioIframeBlockDefaultData,
  [LinkInBioBlockEnum.separator]: LinkInBioSeparatorBlockDefaultData,
  [LinkInBioBlockEnum.avatar]: LinkInBioAvatarBlockDefaultData,
  [LinkInBioBlockEnum.music]: LinkInBioMusicBlockDefaultData,
  [LinkInBioBlockEnum.QAndA]: LinkInBioQAndABlockDefaultData,
  [LinkInBioBlockEnum.messenger]: LinkInBioMessengerBlockDefaultData,
  [LinkInBioBlockEnum.social]: LinkInBioSocialBlockDefaultData
};
