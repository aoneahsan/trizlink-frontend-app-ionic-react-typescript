import {
  type LinkInBioBlockEnum,
  type LinkInBioBlockFromType
} from './blockTypes/index';
import {
  type ABTestingRotatorInterface,
  type GeoLocationRotatorInterface,
  type LinkExpirationInfoInterface,
  type PasswordInterface,
  type ShortUrlInterface,
  type UTMTagInfoInterface,
  type FormMode,
  type ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';

import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

/**
 * Enum's
 */
export enum LinkInBioThemeBackgroundEnum {
  solidColor = 'solidColor',
  gradient = 'gradient',
  image = 'image'
}

export enum LinkInBioButtonTypeEnum {
  inlineSquare = 'inlineSquare',
  inlineRound = 'inlineRound',
  inlineCircle = 'inlineCircle',

  inlineSquareOutline = 'inlineSquareOutline',
  inlineRoundOutline = 'inlineRoundOutline',
  inlineCircleOutline = 'inlineCircleOutline',

  inlineSquareShadow = 'inlineSquareShadow',
  inlineRoundShadow = 'inlineRoundShadow',
  inlineCircleShadow = 'inlineCircleShadow'
}

export enum LinkInBioThemeFontEnum {
  roboto = 'roboto',
  lato = 'lato',
  baybas = 'baybas',
  serif = 'serif',
  sanSerif = 'san-serif',
  newTimeArial = 'new-time-arial',
  B612 = 'B612',
  alegreya = 'Alegreya',
  titilliumWeb = 'titillium-web',
  vollkorn = 'vollkorn',
  IBMPlexSerif = 'IBM-plex-serif'
}

export enum ZLinkInBioRHSComponentEnum {
  theme = 'theme',
  blocks = 'blocks',
  settings = 'settings',
  poweredBy = 'poweredBy',
  blockForm = 'blockForm'
}

export enum ZLinkInBioPageEnum {
  design = 'design',
  shareSettings = 'shareSettings',
  pageAnalytics = 'pageAnalytics',
  lead = 'lead',
  blockAnalytics = 'blockAnalytics'
}

// LIB -> link-in-bio
export enum ZLIBListPageTableColumnsIds {
  id = '__z_link_in_bio_id__',
  title = '__z_link_in_bio_title__',
  date = '__z_link_in_bio_date__',
  pixel = '__z_link_in_bio_pixels__',
  notes = '__z_link_in_bio_notes__',
  url = '__z_link_in_bio_target_url__',
  linkToShare = '__z_link_in_bio_link_to_share__',
  click = '__z_link_in_bio_click__',
  actions = '__z_link_in_bio_actions__'
}

export enum addBlockModalUIEnum {
  minimalistic = 'minimalistic',
  advance = 'advance'
}

/**
 * Interfaces
 */
export interface LinkInBioThemeFontFamilyInterface {
  id?: string;
  fontName: LinkInBioThemeFontEnum;
}

export interface LinkInBioFormPageInterface {
  page?: ZLinkInBioPageEnum;
}

export interface LinkInBioBgGradientColorsInterface {
  startColor: string;
  endColor: string;
  direction: string | number;
}

export interface libFormSettingsInterface {
  id?: string;
  type?: ZUserSettingTypeEnum;
  workspaceId?: string;
  settings: {
    addBlockModal: {
      Ui: addBlockModalUIEnum;
    };
  };
}

/**
 * Types
 */
export interface LinkInBioThemeBackgroundType {
  bgType: LinkInBioThemeBackgroundEnum;
  bgSolidColor?: string;
  bgGradientColors?: LinkInBioBgGradientColorsInterface;
  bgImageUrl?: string;
  bgImageFile?: File | null;
  bgImagePath?: string | null;
  enableBgImage?: boolean;
}

export interface LinkInBioPredefinedThemeType {
  id?: string;
  background: string | LinkInBioThemeBackgroundType | undefined;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkInBioThemeType {
  predefinedThemeId?: string;
  background?: LinkInBioThemeBackgroundType;
  button: {
    background?: LinkInBioThemeBackgroundType;
    type?: LinkInBioButtonTypeEnum;
    shadowColor?: string;
  };
  font?: LinkInBioThemeFontEnum;
}

export interface LinkInBIoSettingType {
  headerCode?: string;
  bodyCode?: string;
}

export interface LinkInBioType {
  id?: string;
  // Design Page Types
  designPageCurrentTab?: ZLinkInBioRHSComponentEnum;
  // theme tab - Design Page Types
  LinkInBioBlock?: LinkInBioBlockEnum; // REMOVE THIS
  theme: LinkInBioThemeType;
  settings: LinkInBIoSettingType;
  // blocks tab - Design Page Types
  // we will use relationship in backend to send back this data as well when sending the link-in-bio data
  blocks?: LinkInBioBlockFromType[];

  // form data - for creation/updating
  // featureImg?: string;
  featureImg: {
    featureImgFile?: File;
    featureImgPath?: string;
    featureImgUrl?: string;
  };
  // featureImgPath?: string;
  title?: string;
  linkInBioTitle?: string;
  description?: string;
  pixelIds?: ZaionsRSelectOptions[] | string[] | string;
  utmTagInfo?: UTMTagInfoInterface;
  shortUrl?: ShortUrlInterface;
  folderId?: string; // default if non is given
  notes?: string | null;
  tags?: string[];
  abTestingRotatorLinks?: ABTestingRotatorInterface[];
  geoLocationRotatorLinks?: GeoLocationRotatorInterface[];
  linkExpirationInfo?: LinkExpirationInfoInterface;
  password?: PasswordInterface;
  shortUrlDomain?: string;
  shortUrlPath?: string;
  // favicon?: {
  //   url?: string;
  //   type?: string;
  //   fileName?: string;
  //   size?: string;
  // };

  // favicon?: string;
  // faviconPath?: string;
  favicon: {
    path: string;
    url: string;
    file: File;
  };

  // computed data - due to other events or calculations
  totalClicks?: number;

  // other default fields
  createdAt?: string;
  updatedAt?: string;

  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;

  // frontend form fields
  formState?: {
    submitted?: boolean;
    errorShown?: boolean;
    isValid?: boolean;
    formErrors?: unknown; // ahsan bahi ny btani hy type, aj hi pochni hy sham tak
    linkExpiration?: boolean;
    password?: boolean;
  };

  formMode?: FormMode;
}
