import { reportCustomError } from '@/utils/customErrorType';
import { useZRQGetRequest } from './zreactquery-hooks';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { type planFeaturesEnum } from '@/types/AdminPanel/index.type';
import { type userServicesLimitI } from '@/types/UserAccount/index.type';

// User Services limits checker
export const useUserServicesLimitChecker = (): {
  limitChecker: (
    name: planFeaturesEnum,
    serviceCurrentLimit?: number
  ) => boolean;
} => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: userServicesLimits } = useZRQGetRequest<userServicesLimitI[]>(
      {
        _url: API_URL_ENUM.getUserServicesLimits,
        _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.LIMITS],
        _checkPermissions: false
      }
    );

    const limitChecker = (
      name: planFeaturesEnum,
      serviceCurrentLimit = 0
    ): boolean => {
      try {
        if ((userServicesLimits?.length ?? 0) > 0) {
          const _selectService = userServicesLimits?.find(
            el => el?.name === name
          );

          if (_selectService !== undefined && _selectService !== null) {
            if (
              (_selectService?.maxLimit ?? 0) > 0 &&
              serviceCurrentLimit < (_selectService?.maxLimit ?? 0)
            ) {
              return true;
            }
            return false;
          }

          return false;
        }

        return false;
      } catch (error) {
        reportCustomError(error);

        return false;
      }
    };
    return { limitChecker };
  } catch (error) {
    return { limitChecker: (name: planFeaturesEnum) => false };
  }
};
