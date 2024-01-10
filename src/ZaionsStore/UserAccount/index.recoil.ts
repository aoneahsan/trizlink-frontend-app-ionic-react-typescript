import {
  type UserAccountType,
  type UserAccountAuthTokenType,
  type UserRoleAndPermissionsInterface,
  type UserAccountEmailType,
  type ZUserCurrentLimitsI,
  type userServicesLimitI
} from '@/types/UserAccount/index.type';
// Packages Imports
import { atom, selector, selectorFamily } from 'recoil';

// Data
import { userAccountEmailsData } from '@/data/UserAccount';

// Custom Imports
import { STORAGE } from '@/utils/helpers';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  subscriptionTimeLine,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';
import { type ZUserSubscriptionI } from '@/types/WhyZaions/PricingPage';
import dayjs from 'dayjs';

export const ZaionsUserAccountRStateAtom = atom<UserAccountType | null>({
  key: 'ZaionsUserAccountRStateAtom_Key',
  default: {}
});

export const currentLoggedInUserRoleAndPermissionsRStateAtom =
  atom<UserRoleAndPermissionsInterface | null>({
    key: 'currentLoginUserRoleAndPermissionsRStateAtom_Key',
    default: {
      role: '',
      permissions: [],
      fetched: false
    }
  });

export const ZaionsAuthTokenData = atom<UserAccountAuthTokenType | null>({
  key: 'ZaionsAuthTokenData_Key',
  default: {}
});

export const ZaionsAuthToken = selector<string | null>({
  key: 'ZaionsAuthToken_Key',
  get: ({ get }) => {
    const authTokenData = get(ZaionsAuthTokenData);

    if (authTokenData?.token !== null && authTokenData?.token !== undefined) {
      return authTokenData?.token;
    } else {
      return null;
    }
  }
});

export const ZaionsUserAccountEmails = atom<UserAccountEmailType[] | null>({
  key: 'ZaionsUserAccountEmails_Key',
  default: userAccountEmailsData
});

export const ZaionsUserAccountEmail = selector<string | null>({
  key: 'ZaionsUserAccountEmail_key',
  get: ({ get }) => {
    const _currentUser = get(ZaionsUserAccountRStateAtom);
    if (_currentUser?.email !== undefined && _currentUser?.email !== null) {
      return _currentUser.email;
    } else {
      return null;
    }
  }
});

export const IsAuthenticatedRStateSelector = selector({
  key: 'IsAuthenticatedRStateSelector_key',
  get: async ({ get }) => {
    const authToken = (await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN)) as
      | string
      | null;
    const currentUserEmail = get(ZaionsUserAccountEmail);
    return (
      (authToken !== null && authToken?.trim()?.length > 0) ||
      currentUserEmail !== null
    );
  }
});

export const ZUserServicesLimitsRStateAtom = atom<userServicesLimitI[]>({
  key: 'ZUserServicesLimitsRStateAtom_key',
  default: []
});

export const ZCurrentUserSubscriptionRStateAtom = atom<ZUserSubscriptionI>({
  key: 'ZCurrentUserSubscriptionRStateAtom_key',
  default: {}
});

export const ZUserCurrentLimitsRStateAtom = atom<ZUserCurrentLimitsI>({
  key: 'ZUserCurrentLimitsRStateAtom_key',
  default: {
    [planFeaturesEnum.shortLinks]: 0,
    [planFeaturesEnum.shortLinksFolder]: 0
  }
});

export const ZUserCurrentLimitsRStateSelectorFamily = selectorFamily({
  key: 'ZUserCurrentLimitsRStateSelectorFamily_key',
  get:
    (name: planFeaturesEnum) =>
    async ({ get }) => {
      try {
        const ZUserCurrentLimits = get(ZUserCurrentLimitsRStateAtom);
        const ZCurrentUserServiceLimits = get(ZUserServicesLimitsRStateAtom);
        const ZCurrentUserSubscription = get(
          ZCurrentUserSubscriptionRStateAtom
        );
        if (
          ZCurrentUserServiceLimits !== undefined &&
          ZCurrentUserServiceLimits !== null
        ) {
          const _selectService = ZCurrentUserServiceLimits?.find(
            el => el?.name === name
          );

          if (_selectService !== undefined && _selectService !== null) {
            let endDate = null;

            if (
              ZCurrentUserSubscription.duration === subscriptionTimeLine.monthly
            ) {
              endDate = dayjs(ZCurrentUserSubscription?.startedAt).add(
                30,
                'day'
              );
            } else if (
              ZCurrentUserSubscription.duration === subscriptionTimeLine.yearly
            ) {
              endDate = dayjs(ZCurrentUserSubscription?.startedAt).add(
                1,
                'year'
              );
            }

            if (
              (_selectService?.maxLimit ?? 0) > 0 &&
              dayjs().isAfter(dayjs(ZCurrentUserSubscription?.startedAt)) &&
              dayjs().isBefore(dayjs(endDate)) &&
              (ZUserCurrentLimits[name] ?? 0) < (_selectService?.maxLimit ?? 0)
            ) {
              return true;
            }
            return false;
          }
        }
      } catch (error) {
        reportCustomError(error);
      }
    }
});
