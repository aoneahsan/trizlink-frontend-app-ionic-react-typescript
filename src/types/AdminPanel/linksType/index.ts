// IMPORTS
import {
  type ABTestingRotatorInterface,
  type FormMode,
  type GeoLocationRotatorInterface,
  type LinkExpirationInfoInterface,
  type messengerPlatformsBlockEnum,
  type PasswordInterface,
  type ShortUrlInterface,
  type UTMTagInfoInterface
} from '@/types/AdminPanel/index.type';

import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

// CONSTANTS

// ENUMS
export enum PixelPlatformsEnum {
  facebook = 'facebook',
  linkedin = 'linkedin',
  twitter = 'twitter',
  google_analytics = 'google_analytics',
  google_analytics_4 = 'google_analytics_4',
  google_ads = 'google_ads',
  google_tag_manager = 'google_tag_manager',
  quora = 'quora',
  snapchat = 'snapchat',
  pinterest = 'pinterest',
  bing = 'bing',
  adroll = 'adroll',
  nexus = 'nexus',
  tiktok = 'tiktok',
  vk = 'vk'
}

export enum IconTypeEnum {
  ionic = 'ionic',
  react = 'react',
  svg = 'svg',
  image = 'image',
  others = 'others'
}

export enum IonLoaderEnum {
  bubbles = 'bubbles',
  circles = 'circles',
  circular = 'circular',
  crescent = 'crescent',
  dots = 'dots',
  lines = 'lines',
  linesSharp = 'linesharp',
  linesSharpSmall = 'linessharpsmall',
  linesSmall = 'linessmall'
}

export enum UTMTagFieldsEnum {
  utmCampaign = 'utmcampaign',
  utmMedium = 'utmmedium',
  utmSource = 'utmsource',
  utmTerm = 'utmterm',
  utmContent = 'utmcontent'
}

export enum CustomdomainFieldsEnum {
  domain = 'domain',
  customize = 'customize'
}

export enum EmbedWidgetsDisplayAtEnum {
  Landing = 'landing',
  Delay = 'delay',
  Exit = 'exit'
}

export enum EmbedWidgetsPositionEnum {
  TopStart = 'top start',
  TopCenter = 'top center',
  TopEnd = 'top end',
  CenterStart = 'center start',
  CenterCenter = 'center center',
  CenterEnd = 'center end',
  BottomStart = 'bottom start',
  BottomCenter = 'bottom center',
  BottomEnd = 'bottom end'
}

export enum ZLinkIonPanelSidebarActiveLinkType {
  dashboard = 'Dashboard',
  links = 'Links',
  linksInBio = 'links-in-bio',
  campaigns = 'Campaigns',
  customLinks = 'Custom Links',
  settings = 'Settings'
}

export enum ZLinkIonPanelSettingsSidebarActiveLinkType {
  profile = 'Profile',
  integrations = 'Integrations',
  accountDetails = 'Account details',
  customdomain = 'Custom domain',
  groups = 'Groups',
  csvBulkShortening = 'CSV bulk shortening',
  api = 'API'
}

export enum TimeFilterEnum {
  allTime = 'All time',
  today = '0',
  lastSevenDays = '7',
  last30days = '30',
  thisMonth = 'This mouth',
  lastMonth = '60',
  customRange = 'Custom range'
}

export enum ZShortLinkListPageTableColumnsEnum {
  title = 'title',
  clicks = 'clicks',
  date = 'date',
  pixels = 'pixels',
  notes = 'notes',
  url = 'url',
  linkToShare = 'linkToShare'
}

export enum ZShortLinkListPageTableColumnsIds {
  id = '__z_short_link_id__',
  title = '__z_short_link_title__',
  date = '__z_short_link_date__',
  pixel = '__z_short_link_pixels__',
  notes = '__z_short_link_notes__',
  url = '__z_short_link_target_url__',
  linkToShare = '__z_short_link_link_to_share__',
  click = '__z_short_link_click__',
  actions = '__z_short_link_actions__'
}

// Interface
export interface FolderInterface {
  label?: string;
  value?: string;
  createAt?: string;
  updateAt?: string;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface LinkTargetType {
  url?: string | null;
  phoneNumber?: string | null;
  message?: string | null;
  username?: string | null;
  accountId?: string | null;
  email?: string | null;
  subject?: string | null;
}

export interface ZaionsShortUrlOptionFieldsValuesInterface {
  target: LinkTargetType;
  type?: messengerPlatformsBlockEnum;
  title: string;
  linkDescription: string;
  featureImg: {
    featureImgFile?: File;
    featureImgPath?: string;
    featureImgUrl?: string;
  };
  passwordEnabled: boolean;
  password: PasswordInterface;
  folderId: string;
  linkNote: string;
  tags: string[];
  linkExpiration: LinkExpirationInfoInterface;
  rotatorABTesting: ABTestingRotatorInterface[];
  geoLocation: GeoLocationRotatorInterface[];
  shortUrl: ShortUrlInterface;
  linkPixelsAccount: string[];
  UTMTags: UTMTagInfoInterface;
  favicon: {
    path: string;
    url: string;
    file: File;
  };
  shortUrlDomain?: string;
  shortUrlPath?: string;
  formMode?: FormMode;
  isShortUrlPathValid?: boolean;
}

export interface ShortLinkFilterOptionsInterface {
  folderId?: string;
  timeFilter: {
    daysToSubtract: TimeFilterEnum;
    startedAt?: string;
    endAt?: string;
  };
  tags?: string[] | null;
  domains?: string[] | null;
  searchQuery?: string | null;
}

// TYPES
export interface FormErrorsType {
  url?: string;
  linkTitle?: string;
  phoneNumber?: string;
  username?: string;
  linkExpirationInfoRL?: string;
}

export interface IdNameType {
  id?: string;
  name?: string;
  createAt?: string;
  updateAt?: string;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface PixelAccountPlatformType {
  id?: string;
  type: PixelPlatformsEnum;
  title: string;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface PixelAccountType {
  id?: string;
  platform?: PixelPlatformsEnum;
  title: string | undefined;
  pixelId: string | undefined;
  createAt?: string | undefined;
  formattedCreateAt?: string | undefined;
  updatedAt?: string | undefined;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface UTMTagTemplateType {
  id?: string;
  templateName: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmSource?: string;
  utmTerm?: string;
  utmContent?: string;
  createAt?: string | undefined;
  formattedCreateAt?: string | undefined;
  updatedAt?: string | undefined;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface EmbedWidgetsType {
  id?: string;
  name?: string;
  jsCode?: string;
  HTMLCode?: string;
  displayAt?: EmbedWidgetsDisplayAtEnum;
  delay?: string;
  position?: EmbedWidgetsPositionEnum;
  animation?: boolean;
  closingOption?: boolean;
  createAt?: string | undefined;
  updatedAt?: string | undefined;
  canCodeHtml?: boolean;
  canCodeJs?: boolean;

  // Just to handle frontend form
  formMode?: FormMode;
}

export interface LinkFolderType {
  id?: string;
  title: string;
  icon?: string;
}

// label?: string;
// value?: string;
// createAt?: string;
// updateAt?: string;

export interface ShortLinkType {
  id?: string;

  // form data - for creation/updating
  type?: messengerPlatformsBlockEnum;
  target?: LinkTargetType | string;
  // featureImg?: string;
  featureImg: {
    featureImgFile?: File;
    featureImgPath?: string;
    featureImgUrl?: string;
  };
  title?: string;
  description?: string;
  pixelIds?: ZaionsRSelectOptions[] | string[] | string;
  utmTagInfo?: UTMTagInfoInterface | string;
  shortUrl?: ShortUrlInterface | string;
  shortUrlDomain?: string;
  shortUrlPath?: string;
  folderId?: string | number; // default if non is given
  notes?: string | null;
  tags?: string[] | string;
  abTestingRotatorLinks?: ABTestingRotatorInterface[] | string;
  geoLocationRotatorLinks?: GeoLocationRotatorInterface[] | string;
  linkExpirationInfo?: LinkExpirationInfoInterface | string;
  password?: string | PasswordInterface;
  // favicon?: {
  //   url?: string;
  //   type?: string;
  //   fileName?: string;
  //   size?: string;
  // };

  favicon?: string;

  // computed data - due to other events or calculations
  totalClicks?: number;

  // other default fields
  createdAt?: string;
  updatedAt?: string;

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

// 'ionic' | 'react' | 'svg' | 'image' | other

export interface ShortUrlLinkOptionType {
  id?: string;
  icon: {
    iconName: string;
    iconType?: 'ionic' | 'others';
  };
  text: string;
  type: messengerPlatformsBlockEnum;
}

// const as = []

// as.includes(tagText)

// as.filter(el => el !== tagText)

// as.splice(tagIndex, 1)
