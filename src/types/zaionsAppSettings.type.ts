export interface ZaionsAppSettingsType {
  shortLinkSettings: ZaionsShortLinkSettingsType;
  appModalsSetting: ZaionsAppModalSettingType;
}

export interface ZaionsShortLinkSettingsType {
  previewImage: {
    dimension: {
      width: number;
      height: number;
    };
    size: number; // this will be size in mb (to limit file upload size)
    // type: // add if needed
  };
}

export interface ZaionsAppModalSettingType {
  actions: {
    showActionInModalHeader: boolean; // control the visibility of action buttons in the header of modal
    showActionInModalFooter: boolean; // control the visibility of action buttons in the footer of modal
  };
  applyBorderRadius: boolean;
}

export interface ZaionsCountryCodeType {
  name: string;
  dial_code: string;
  code: string;
}

export type ZIonColorType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'light'
  | 'dark'
  | 'medium'
  | 'tertiary'
  | 'warning';

export type ZIonModeType = 'ios' | 'md';

export type ZIonSlotType = 'start' | 'end';

export type ZIonTargetType = '_blank' | '_self' | '_parent' | '_top';

export type ZIonRouterDirection = 'back' | 'forward' | 'root';

export type ZIonButtonType = 'button' | 'reset' | 'submit';

export type ZIonPlacementType = 'fixed' | 'floating' | 'stacked';

export type ZGenericObject = Record<string, string | number>;

export enum ZMediaEnum {
  image = 'image',
  rss = 'rss',
  calendar = 'calendar',
  video = 'video',
  audio = 'audio',
  map = 'map',
  carousel = 'carousel',
  countDown = 'countDown',
  iframe = 'iframe',
  iframeSrcDoc = 'iframeSrcDoc'
}

export enum reloadBlockingTypeEnum {
  libFormThemeSection = 'libFormThemeSection',
  libBlockFormSection = 'libBlockFormSection',
  signUpPage = 'signUpPage'
}

export interface reloadBlockingInterface {
  // lib => linkInBio.
  pageUrl?: string;
  isBlock: boolean;
  type?: reloadBlockingTypeEnum | null;
}
