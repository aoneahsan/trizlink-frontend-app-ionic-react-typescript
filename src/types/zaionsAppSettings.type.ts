export type ZaionsAppSettingsType = {
  shortLinkSettings: ZaionsShortLinkSettingsType;
  appModalsSetting: ZaionsAppModalSettingType;
};

export type ZaionsShortLinkSettingsType = {
  previewImage: {
    dimension: {
      width: number;
      height: number;
    };
    size: number; // this will be size in mb (to limit file upload size)
    // type: // add if needed
  };
};

export type ZaionsAppModalSettingType = {
  actions: {
    showActionInModalHeader: boolean; // control the visibility of action buttons in the header of modal
    showActionInModalFooter: boolean; // control the visibility of action buttons in the footer of modal
  };
};

export type ZaionsCountryCodeType = {
  name: string;
  dial_code: string;
  code: string;
};

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

export type ZIonTargetType = '_blank' | '_self' | '_parent' | '_top';

export type ZIonRouterDirection = 'back' | 'forward' | 'root';

export type ZIonButtonType = 'button' | 'reset' | 'submit';

export type ZGenericObject = { [key: string]: string };

export enum ZMediaEnum {
  image = 'image',
  video = 'video',
  audio = 'audio',
  carousel = 'carousel',
}
