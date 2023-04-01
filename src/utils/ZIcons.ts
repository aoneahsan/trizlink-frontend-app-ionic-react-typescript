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
  linkIcon,
} from '@/assets/images';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import {
  LinkInBioFormFieldsEnum,
  LinkInBioMusicPlatformEnum,
  LinkInBioSocialPlatformEnum,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

export const ZIcons: {
  buttonBlock: string;
  tiktokLogo: string;
  PlaceHolder: string;
  [key: string]: string;
} = {
  // SVG Icons
  buttonBlock: buttonBlock,
  textBlock: textBlock,
  timerBlock: timerBlock,
  cardClipBlock: cardClipBlock,
  carouselBlock: carouselBlock,
  RssBlock: RssBlock,
  audioBlock: audioBlock,
  videoBlock: videoBlock,
  calenderBlock: calenderBlock,
  shopify: shopify,
  avatarBlock: avatarBlock,
  magento: magento,
  wordpress: wordpress,
  map: map,
  music: music,
  QAndABlock: QAndABlock,
  messengerBlock: messengerBlock,
  socialBlock: socialBlock,
  vcardBlock: vcardBlock,
  IframeBlock: codeBlock,
  spacingBlock: spacingBlock,
  separatorBlock: separatorBlock,
  formBlock: formBlock,

  // per defined music platform svg's
  spotifyLogo: spotifyLogo,
  soundCloudLogo: soundCloudLogo,
  googleMusicLogo: googleMusicLogo,
  appleMusicLogo: appleMusicLogo,
  youtubeLogo: youtubeLogo,
  deezerLogo: deezerLogo,
  amazonMusicLogo: amazonMusicLogo,
  napsterLogo: napsterLogo,

  // per defined messenger platform svg's
  emailLogo: emailLogo,
  whatsAppLogo: whatsAppLogo,
  messengerLogo: messengerLogo,
  callLogo: callLogo,
  smsLogo: smsLogo,
  telegramLogo: telegramLogo,
  skypeLogo: skypeLogo,
  wechatLogo: wechatLogo,
  lineLogo: lineLogo,
  viberLogo: viberLogo,

  // pre defined social platform svg's
  tiktokLogo: tiktokLogo,
  facebookLogo: facebookLogo,
  instagramLogo: instagramLogo,
  twitterLogo: twitterLogo,
  linkedinLogo: linkedinLogo,
  slackLogo: slackLogo,
  pinterestLogo: pinterestLogo,

  // pre defined form fields svg's
  headingIcon: headingIcon,
  userIcon_1: userIcon_1,
  userIcon_2: userIcon_2,
  textIcon: textIcon,
  calenderIcon: calenderIcon,
  linkIcon: linkIcon,

  // IonIcons
  // Images
  // Gifs
  // PlaceholderIcon = Zaions Favicon | Product
  PlaceHolder: '',
};

// link-in-bio music platform image form type.
export const predefinedMusicPlatformImages: {
  [key: string]: string;
} = {
  [LinkInBioMusicPlatformEnum.amazonMusic]: amazonMusicLogo,
  [LinkInBioMusicPlatformEnum.appleMusic]: appleMusicLogo,
  [LinkInBioMusicPlatformEnum.deezer]: deezerLogo,
  [LinkInBioMusicPlatformEnum.googleMusic]: googleMusicLogo,
  [LinkInBioMusicPlatformEnum.napster]: napsterLogo,
  [LinkInBioMusicPlatformEnum.soundCloud]: soundCloudLogo,
  [LinkInBioMusicPlatformEnum.spotify]: shopify,
  [LinkInBioMusicPlatformEnum.youtube]: youtubeLogo,
};

// link-in-bio music platform image form type.
export const predefinedMusicPlatformImagesInWhite: {
  [key: string]: string;
} = {
  [LinkInBioMusicPlatformEnum.amazonMusic]: amazonMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.appleMusic]: appleMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.deezer]: deezerWhiteLogo,
  [LinkInBioMusicPlatformEnum.googleMusic]: googleMusicWhiteLogo,
  [LinkInBioMusicPlatformEnum.napster]: napsterWhiteLogo,
  [LinkInBioMusicPlatformEnum.soundCloud]: soundCloudWhiteLogo,
  [LinkInBioMusicPlatformEnum.spotify]: spotifyWhiteLogo,
  [LinkInBioMusicPlatformEnum.youtube]: youtubeWhiteLogo,
};

// link-in-bio music platform image form type.
export const predefinedMessengerPlatformImagesInWhite: {
  [key: string]: string;
} = {
  [messengerPlatformsBlockEnum.email]: emailWhiteLogo,
  [messengerPlatformsBlockEnum.call]: callWhiteLogo,
  [messengerPlatformsBlockEnum.whatsapp]: whatsAppWhiteLogo,
  [messengerPlatformsBlockEnum.messenger]: messengerWhiteLogo,
  [messengerPlatformsBlockEnum.sms]: smsWhiteLogo,
  [messengerPlatformsBlockEnum.telegram]: telegramWhiteLogo,
  [messengerPlatformsBlockEnum.skype]: skypeWhiteLogo,
  [messengerPlatformsBlockEnum.wechat]: wechatWhiteLogo,
  [messengerPlatformsBlockEnum.line]: lineWhiteLogo,
  [messengerPlatformsBlockEnum.viber]: viberWhiteLogo,
};

// link-in-bio social platform image form type.
export const predefinedSocialImages: {
  [key: string]: string;
} = {
  [LinkInBioSocialPlatformEnum.facebook]: facebookLogo,
  [LinkInBioSocialPlatformEnum.instagram]: instagramLogo,
  [LinkInBioSocialPlatformEnum.linkedin]: linkedinLogo,
  [LinkInBioSocialPlatformEnum.pinterest]: pinterestLogo,
  [LinkInBioSocialPlatformEnum.slack]: slackLogo,
  [LinkInBioSocialPlatformEnum.tiktok]: tiktokLogo,
  [LinkInBioSocialPlatformEnum.twitter]: twitterLogo,
  [LinkInBioSocialPlatformEnum.youtube]: youtubeLogo,
};

// link-in-bio form fields image form type.
export const predefinedFormFieldsImages: {
  [key: string]: string;
} = {
  [LinkInBioFormFieldsEnum.email]: emailLogo,
  [LinkInBioFormFieldsEnum.date]: calenderIcon,
  [LinkInBioFormFieldsEnum.firstName]: userIcon_1,
  [LinkInBioFormFieldsEnum.lastName]: userIcon_2,
  [LinkInBioFormFieldsEnum.phone]: callLogo,
  [LinkInBioFormFieldsEnum.text]: textIcon,
  [LinkInBioFormFieldsEnum.website]: linkIcon,
};

// link-in-bio social platform image form type.
export const predefinedSocialWhiteImages: {
  [key: string]: string;
} = {
  [LinkInBioSocialPlatformEnum.facebook]: facebookWhiteLogo,
  [LinkInBioSocialPlatformEnum.instagram]: instagramWhiteLogo,
  [LinkInBioSocialPlatformEnum.linkedin]: linkedinWhiteLogo,
  [LinkInBioSocialPlatformEnum.pinterest]: pinterestWhiteLogo,
  [LinkInBioSocialPlatformEnum.slack]: slackWhiteLogo,
  [LinkInBioSocialPlatformEnum.tiktok]: tiktokWhiteLogo,
  [LinkInBioSocialPlatformEnum.twitter]: twitterWhiteLogo,
  [LinkInBioSocialPlatformEnum.youtube]: youtubeWhiteLogo,
};
