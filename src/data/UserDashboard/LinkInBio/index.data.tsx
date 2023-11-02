import CONSTANTS from '@/utils/constants';

// Types
import {
  LinkInBioButtonTypeEnum,
  LinkInBioThemeBackgroundEnum,
  LinkInBioThemeFontEnum
} from '@/types/AdminPanel/linkInBioType';

export const ZaionsLinkInBioDefaultData = {
  theme: {
    background: {
      bgType: LinkInBioThemeBackgroundEnum.solidColor,
      bgSolidColor: CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BG_COLOR,
      enableBgImage: false
    },
    button: {
      background: {
        bgType: LinkInBioThemeBackgroundEnum.solidColor,
        bgSolidColor: CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_COLOR
      },
      type: LinkInBioButtonTypeEnum.inlineSquare
    },
    font: LinkInBioThemeFontEnum.lato
  }
};
