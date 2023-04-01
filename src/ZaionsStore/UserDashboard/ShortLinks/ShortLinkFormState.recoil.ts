import CONSTANTS from 'utils/constants';
import { LinkTypeOptionsData } from 'data/UserDashboard/Links/index';
import { atom, selector } from 'recoil';
import {
  ShortLinkType,
  ShortUrlLinkOptionType,
} from 'types/AdminPanel/linksType';
import {
  FormMode,
  messengerPlatformsBlockEnum,
} from 'types/AdminPanel/index.type';

export const NewShortLinkFormState = atom<ShortLinkType>({
  key: 'NewShortLinkFormState_key',
  default: {
    folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
    shortUrl: {
      domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN,
    },
    type: messengerPlatformsBlockEnum.link,
    pixelIds: [],
    tags: [],
    formMode: FormMode.ADD,
  },
});

export const NewShortLinkSelectTypeOption =
  selector<ShortUrlLinkOptionType | null>({
    key: 'NewShortLinkSelectTypeOption_key',
    get: ({ get }) => {
      const _newShortLinkStateData = get(NewShortLinkFormState);

      if (_newShortLinkStateData && _newShortLinkStateData.type) {
        const selectedTypeOptionData = LinkTypeOptionsData.find(
          (el) => el.type === _newShortLinkStateData.type
        );

        if (selectedTypeOptionData && selectedTypeOptionData.id) {
          return selectedTypeOptionData;
        } else {
          return null;
        }
      } else {
        return LinkTypeOptionsData[0];
      }
    },
  });
