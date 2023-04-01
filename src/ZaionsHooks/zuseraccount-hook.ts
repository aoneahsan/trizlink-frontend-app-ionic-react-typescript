import { useRecoilValue } from 'recoil';
import { zConsoleError } from '@/utils/helpers';
import {
  ZaionsAuthToken,
  ZaionsUserAccountEmail,
} from '@/ZaionsStore/UserAccount/index.recoil';

export const useZIsAuthenticated = () => {
  try {
    const userAccountEmail = useRecoilValue(ZaionsUserAccountEmail);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authToken = useRecoilValue(ZaionsAuthToken);

    return { authenticated: Boolean(userAccountEmail && authToken) };
  } catch (err) {
    zConsoleError({ err });
    return { authenticated: false };
  }
};
