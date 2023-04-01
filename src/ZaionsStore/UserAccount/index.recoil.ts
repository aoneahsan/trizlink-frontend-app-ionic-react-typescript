import {
  UserAccountType,
  UserAccountAuthTokenType,
} from '@/types/UserAccount/index.type';
// Packages Imports
import { atom, selector } from 'recoil';

// Data
import { userAccountEmailsData } from '@/data/UserAccount';

// Custom Imports
import { UserAccountEmailType } from '@/types/UserAccount/index.type';

export const ZaionsUserAccountRState = atom<UserAccountType | null>({
  key: 'ZaionsUserAccountRState_Key',
  default: {},
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
    const _currentUser = get(ZaionsUserAccountRState);
    if (_currentUser && _currentUser.email) {
      return _currentUser.email;
    } else {
      return null;
    }
  },
});
