import CONSTANTS from '@/utils/constants';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links/index';
import { atom, selector } from 'recoil';
import {
	ShortLinkType,
	ShortUrlLinkOptionType,
} from '@/types/AdminPanel/linksType';
import {
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';

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

export const NewShortLinkSelectTypeOption = atom<ShortUrlLinkOptionType | null>(
	{
		key: 'NewShortLinkSelectTypeOption_key',
		default: LinkTypeOptionsData[0],
	}
);
