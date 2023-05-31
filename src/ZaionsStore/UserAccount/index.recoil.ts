import {
	UserAccountType,
	UserAccountAuthTokenType,
	UserRoleAndPermissionsInterface,
} from '@/types/UserAccount/index.type';
// Packages Imports
import { atom, selector } from 'recoil';

// Data
import { userAccountEmailsData } from '@/data/UserAccount';

// Custom Imports
import { UserAccountEmailType } from '@/types/UserAccount/index.type';
import { STORAGE } from '@/utils/helpers';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';

export const ZaionsUserAccountRStateAtom = atom<UserAccountType | null>({
	key: 'ZaionsUserAccountRStateAtom_Key',
	default: {},
});

export const currentLoggedInUserRoleAndPermissionsRStateAtom =
	atom<UserRoleAndPermissionsInterface | null>({
		key: 'currentLoginUserRoleAndPermissionsRStateAtom_Key',
		default: {
			role: '',
			permissions: [],
		},
	});

export const ZaionsAuthTokenData = atom<UserAccountAuthTokenType | null>({
	key: 'ZaionsAuthTokenData_Key',
	default: {},
});

export const ZaionsAuthToken = selector<string | null>({
	key: 'ZaionsAuthToken_Key',
	get: ({ get }) => {
		const authTokenData = get(ZaionsAuthTokenData);

		if (authTokenData && authTokenData.token) {
			return authTokenData?.token;
		} else {
			return null;
		}
	},
});

export const ZaionsUserAccountEmails = atom<UserAccountEmailType[] | null>({
	key: 'ZaionsUserAccountEmails_Key',
	default: userAccountEmailsData,
});

export const ZaionsUserAccountEmail = selector<string | null>({
	key: 'ZaionsUserAccountEmail_key',
	get: ({ get }) => {
		const _currentUser = get(ZaionsUserAccountRStateAtom);
		if (_currentUser && _currentUser.email) {
			return _currentUser.email;
		} else {
			return null;
		}
	},
});

export const IsAuthenticatedRStateSelector = selector({
	key: 'IsAuthenticatedRStateSelector_key',
	get: async ({ get }) => {
		const authToken = (await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN)) as
			| string
			| null;
		const currentUserEmail = get(ZaionsUserAccountEmail);
		return authToken || currentUserEmail !== null;
	},
});
