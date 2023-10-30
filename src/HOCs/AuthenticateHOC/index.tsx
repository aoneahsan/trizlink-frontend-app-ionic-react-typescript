/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { App } from '@capacitor/app';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z401View from '@/components/Errors/401';
import Z500View from '@/components/Errors/500';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZNavigate,
  useZPrivateRouteChecker
} from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM } from '@/utils/enums';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import { STORAGE, zAxiosApiRequest } from '@/utils/helpers';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
interface AuthenticateHOCPropsType {
  children: ReactNode;
}

const AuthenticateHOC: React.FC<AuthenticateHOCPropsType> = props => {
  const [compState, setCompState] = React.useState<{
    isProcessing: boolean;
    userIsAuthenticated: boolean;
    errorOccurred: boolean;
    guestUser: boolean;
    errorCode?: ZErrorCodeEnum; // use enum or whatever so you know which component to show
  }>({
    isProcessing: true,
    userIsAuthenticated: false,
    errorOccurred: false,
    guestUser: false
  });
  // registering data
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  const { zIsPrivateRoute } = useZPrivateRouteChecker();

  const { zNavigatePushRoute } = useZNavigate();

  const checkAuthenticateValidation = async () => {
    try {
      if (!zIsPrivateRoute) {
        setCompState(oldState => ({
          ...oldState,
          isProcessing: false,
          userIsAuthenticated: false,
          guestUser: true
        }));
      } else {
        // Checking if there is some data in local storage, if there is some data then, run verifyAuthenticationStatus api to check it is valid or not.
        await Promise.all([
          STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN),
          STORAGE.GET(LOCALSTORAGE_KEYS.USERDATA)
        ]).then(async ([authToken, userData]) => {
          if (authToken && userData) {
            // check api result
            await zAxiosApiRequest({
              _url: API_URL_ENUM.verifyAuthenticationStatus,
              _method: 'post'
            });

            setUserAccountStateAtom(oldValues => ({
              ...oldValues,
              ...userData
            }));

            setCompState(oldState => ({
              ...oldState,
              isProcessing: false,
              userIsAuthenticated: true
            }));
          } else {
            window.location.replace(ZaionsRoutes.LoginRoute);
            return null;
          }
        });
      }
    } catch (error: any) {
      // Checking if Unauthorized.
      if (
        error.response &&
        error.response.status === ZErrorCodeEnum.unauthorized
      ) {
        // Clear storage
        STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
        STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

        setCompState(oldState => ({
          ...oldState,
          isProcessing: false,
          userIsAuthenticated: false,
          errorCode: ZErrorCodeEnum.unauthorized,
          errorOccurred: true
        }));
        // Clear recoil state
        resetUserAccountState();

        zNavigatePushRoute(ZaionsRoutes.LoginRoute);
      }
    }
  };

  // check if authenticate
  /**
   *
   */
  React.useEffect(() => {
    void checkAuthenticateValidation();

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive === true) {
        void checkAuthenticateValidation();
      }
    });
  }, []);

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    !compState.isProcessing &&
    ((!compState.errorOccurred && compState.userIsAuthenticated) ||
      compState.guestUser)
  ) {
    return <>{props.children}</>;
  } else if (
    !compState.isProcessing &&
    compState.errorOccurred &&
    compState.errorCode === ZErrorCodeEnum.unauthorized
  ) {
    // check error code and then show the respective component
    return <Z401View />;
  } else {
    return <Z500View />;
  }
};

export default AuthenticateHOC;
