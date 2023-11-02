import {
  audioBlock,
  avatarBlock,
  buttonBlock,
  calenderBlock,
  cardClipBlock,
  carouselBlock,
  magento,
  RssBlock,
  shopify,
  textBlock,
  timerBlock,
  videoBlock,
  wordpress,
  emailLogo,
  whatsAppLogo,
  messengerLogo,
  callLogo,
  smsLogo,
  telegramLogo,
  skypeLogo,
  wechatLogo,
  lineLogo,
  viberLogo,
  tiktokLogo,
  facebookLogo,
  instagramLogo,
  twitterLogo,
  linkedinLogo,
  slackLogo,
  pinterestLogo,
  facebookWhiteLogo,
  instagramWhiteLogo,
  twitterWhiteLogo,
  linkedinWhiteLogo,
  slackWhiteLogo,
  pinterestWhiteLogo,
  map,
  music,
  QAndABlock,
  messengerBlock,
  socialBlock,
  vcardBlock,
  codeBlock,
  spacingBlock,
  separatorBlock,
  formBlock,
  spotifyLogo,
  soundCloudLogo,
  googleMusicLogo,
  appleMusicLogo,
  youtubeLogo,
  deezerLogo,
  amazonMusicLogo,
  napsterLogo,
  spotifyWhiteLogo,
  soundCloudWhiteLogo,
  googleMusicWhiteLogo,
  appleMusicWhiteLogo,
  youtubeWhiteLogo,
  deezerWhiteLogo,
  amazonMusicWhiteLogo,
  napsterWhiteLogo,
  tiktokWhiteLogo,
  emailWhiteLogo,
  whatsAppWhiteLogo,
  messengerWhiteLogo,
  callWhiteLogo,
  smsWhiteLogo,
  telegramWhiteLogo,
  skypeWhiteLogo,
  lineWhiteLogo,
  wechatWhiteLogo,
  viberWhiteLogo,
  headingIcon,
  userIcon_1,
  userIcon_2,
  textIcon,
  calenderIcon,
  linkIcon
} from '@/assets/images';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import {
  LinkInBioFormFieldsEnum,
  LinkInBioMusicPlatformEnum,
  LinkInBioSocialPlatformEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';

export const ZIcons: {
  buttonBlock: string;
  tiktokLogo: string;
  PlaceHolder: string;
  [key: string]: string;
} = {
  // SVG Icons
  buttonBlock,
  textBlock,
  timerBlock,
  cardClipBlock,
  carouselBlock,
  RssBlock,
  audioBlock,
  videoBlock,
  calenderBlock,
  shopify,
  avatarBlock,
  magento,
  wordpress,
  map,
  music,
  QAndABlock,
  messengerBlock,
  socialBlock,
  vcardBlock,
  IframeBlock: codeBlock,
  spacingBlock,
  separatorBlock,
  formBlock,

  // per defined music platform svg's
  spotifyLogo,
  soundCloudLogo,
  googleMusicLogo,
  appleMusicLogo,
  youtubeLogo,
  deezerLogo,
  amazonMusicLogo,
  napsterLogo,

  // per defined messenger platform svg's
  emailLogo,
  whatsAppLogo,
  messengerLogo,
  callLogo,
  smsLogo,
  telegramLogo,
  skypeLogo,
  wechatLogo,
  lineLogo,
  viberLogo,

  // pre defined social platform svg's
  tiktokLogo,
  facebookLogo,
  instagramLogo,
  twitterLogo,
  linkedinLogo,
  slackLogo,
  pinterestLogo,

  // pre defined form fields svg's
  headingIcon,
  userIcon_1,
  userIcon_2,
  textIcon,
  calenderIcon,
  linkIcon,

  // IonIcons
  // Images
  // Gifs
  // PlaceholderIcon = Zaions Favicon | Product
  PlaceHolder: ''
};

// link-in-bio music platform image form type.
export const predefinedMusicPlatformImages: Record<string, string> = {
  [LinkInBioMusicPlatformEnum.amazonMusic]: amazonMusicLogo,
  [LinkInBioMusicPlatformEnum.appleMusic]: appleMusicLogo,
  [LinkInBioMusicPlatformEnum.deezer]: deezerLogo,
  [LinkInBioMusicPlatformEnum.googleMusic]: googleMusicLogo,
  [LinkInBioMusicPlatformEnum.napster]: napsterLogo,
  [LinkInBioMusicPlatformEnum.soundCloud]: soundCloudLogo,
  [LinkInBioMusicPlatformEnum.spotify]: shopify,
  [LinkInBioMusicPlatformEnum.youtube]: youtubeLogo
};

// link-in-bio music platform image form type.
export const predefinedMusicPlatformImagesInWhite: Record<string, string> = {
  [LinkInBioMusicPlatformEnum.amazonMusic]: amazonMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.appleMusic]: appleMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.deezer]: deezerWhiteLogo,
  [LinkInBioMusicPlatformEnum.googleMusic]: googleMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.napster]: napsterWhiteLogo,
  [LinkInBioMusicPlatformEnum.soundCloud]: soundCloudWhiteLogo,
  [LinkInBioMusicPlatformEnum.spotify]: spotifyWhiteLogo,
  [LinkInBioMusicPlatformEnum.youtube]: youtubeWhiteLogo
};

// link-in-bio music platform image form type.
export const predefinedMessengerPlatformImagesInWhite: Record<string, string> =
  {
    [messengerPlatformsBlockEnum.email]: emailWhiteLogo,
    [messengerPlatformsBlockEnum.call]: callWhiteLogo,
    [messengerPlatformsBlockEnum.whatsapp]: whatsAppWhiteLogo,
    [messengerPlatformsBlockEnum.messenger]: messengerWhiteLogo,
    [messengerPlatformsBlockEnum.sms]: smsWhiteLogo,
    [messengerPlatformsBlockEnum.telegram]: telegramWhiteLogo,
    [messengerPlatformsBlockEnum.skype]: skypeWhiteLogo,
    [messengerPlatformsBlockEnum.wechat]: wechatWhiteLogo,
    [messengerPlatformsBlockEnum.line]: lineWhiteLogo,
    [messengerPlatformsBlockEnum.viber]: viberWhiteLogo
  };

// link-in-bio social platform image form type.
export const predefinedSocialImages: Record<string, string> = {
  [LinkInBioSocialPlatformEnum.facebook]: facebookLogo,
  [LinkInBioSocialPlatformEnum.instagram]: instagramLogo,
  [LinkInBioSocialPlatformEnum.linkedin]: linkedinLogo,
  [LinkInBioSocialPlatformEnum.pinterest]: pinterestLogo,
  [LinkInBioSocialPlatformEnum.slack]: slackLogo,
  [LinkInBioSocialPlatformEnum.tiktok]: tiktokLogo,
  [LinkInBioSocialPlatformEnum.twitter]: twitterLogo,
  [LinkInBioSocialPlatformEnum.youtube]: youtubeLogo
};

// link-in-bio form fields image form type.
export const predefinedFormFieldsImages: Record<string, string> = {
  [LinkInBioFormFieldsEnum.email]: emailLogo,
  [LinkInBioFormFieldsEnum.date]: calenderIcon,
  [LinkInBioFormFieldsEnum.firstName]: userIcon_1,
  [LinkInBioFormFieldsEnum.lastName]: userIcon_2,
  [LinkInBioFormFieldsEnum.phone]: callLogo,
  [LinkInBioFormFieldsEnum.text]: textIcon,
  [LinkInBioFormFieldsEnum.website]: linkIcon
};

// link-in-bio social platform image form type.
export const predefinedSocialWhiteImages: Record<string, string> = {
  [LinkInBioSocialPlatformEnum.facebook]: facebookWhiteLogo,
  [LinkInBioSocialPlatformEnum.instagram]: instagramWhiteLogo,
  [LinkInBioSocialPlatformEnum.linkedin]: linkedinWhiteLogo,
  [LinkInBioSocialPlatformEnum.pinterest]: pinterestWhiteLogo,
  [LinkInBioSocialPlatformEnum.slack]: slackWhiteLogo,
  [LinkInBioSocialPlatformEnum.tiktok]: tiktokWhiteLogo,
  [LinkInBioSocialPlatformEnum.twitter]: twitterWhiteLogo,
  [LinkInBioSocialPlatformEnum.youtube]: youtubeWhiteLogo
};
