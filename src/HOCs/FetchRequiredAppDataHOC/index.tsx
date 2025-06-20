/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, useEffect } from 'react';
/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
  useZRQGetRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZPrivateRouteChecker } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type UserAccountType,
  type UserRoleAndPermissionsInterface
} from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  currentLoggedInUserRoleAndPermissionsRStateAtom,
  IsAuthenticatedRStateSelector,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';
import { reportCustomError } from '@/utils/customErrorType';
import { useRouteMatch } from 'react-router';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  extractInnerData,
  getUserDataObjectForm,
  STORAGE
} from '@/utils/helpers';
import { App } from '@capacitor/app';

interface IFetchRequiredAppDataHOCProps {
  children?: React.ReactNode;
}

/**
 * data we can fetch here (can be much more)
 * user permission
 * firebase
 *  remote config
 */
const FetchRequiredAppDataHOC: React.FC<IFetchRequiredAppDataHOCProps> = ({
  children
}) => {
  const is404Page = useRouteMatch(ZaionsRoutes.Error.Z404)?.isExact;

  useEffect(() => {
    if (is404Page === undefined) {
      void (async () => {
        const _errorData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.ERROR_DATA
        )) as { message: string; status: number } | null;

        if (_errorData !== null) {
          await Promise.all([STORAGE.REMOVE(LOCALSTORAGE_KEYS.ERROR_DATA)]);
        }
      })();
    }
  }, [is404Page]);

  return (
    <Suspense fallback={<ZFallbackIonSpinner />}>
      <FetchRequiredAppDataHOCAsync>{children}</FetchRequiredAppDataHOCAsync>
    </Suspense>
  );
};

const FetchRequiredAppDataHOCAsync: React.FC<IFetchRequiredAppDataHOCProps> = ({
  children
}) => {
  let zUserLastSeenInterval: string | number | NodeJS.Timeout | undefined;

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

  const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);
  // Store user data in ZaionsUserAccountRStateAtom recoil state.
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  // recoil state for storing current user roles & permissions.
  const setUserRoleAndPermissions = useSetRecoilState(
    currentLoggedInUserRoleAndPermissionsRStateAtom
  );

  const { zIsPrivateRoute } = useZPrivateRouteChecker();

  // #region APIS.
  // getting the role & permissions of the current log in user.
  const { data: getUserRoleAndPermissions } = useZRQGetRequest<{
    isSuccess: boolean;
    result: UserRoleAndPermissionsInterface;
  }>({
    _url: API_URL_ENUM.getUserRolePermission,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: !loggedIn || !zIsPrivateRoute,
    _checkPermissions: false,
    _showLoader: false
  });

  const { mutateAsync: updateUserStatus } = useZRQUpdateRequest({
    _url: API_URL_ENUM.updateUserStatus,
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const updateUserStatusHandler = async (): Promise<void> => {
    try {
      const _response = await updateUserStatus({
        requestData: '',
        itemIds: [],
        urlDynamicParts: []
      });

      if (_response !== undefined) {
        const _data = extractInnerData<{ user: UserAccountType }>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.user !== undefined || _data?.user !== null) {
          // getting user data.
          const userData = getUserDataObjectForm(_data?.user ?? {});

          // store User token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);

          setUserAccountStateAtom(oldValues => ({
            ...oldValues,
            lastSeenAt: _data?.user?.lastSeenAt
          }));
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const setLastSeenInterval = (): void => {
    try {
      if (
        loggedIn &&
        (zUserLastSeenInterval === undefined || zUserLastSeenInterval === null)
      ) {
        zUserLastSeenInterval = setInterval(
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          updateUserStatusHandler,
          1000 * CONSTANTS.ZLastSeenInterval
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const clearLastSeenInterval = (): void => {
    try {
      if (zUserLastSeenInterval !== undefined) {
        clearInterval(zUserLastSeenInterval);
        zUserLastSeenInterval = undefined;
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  // #region useEffect.
  useEffect(() => {
    if (!zIsPrivateRoute) {
      setCompState(oldState => ({
        ...oldState,
        isProcessing: false,
        userIsAuthenticated: false,
        guestUser: true
      }));
    }
  }, [zIsPrivateRoute]);

  useEffect(() => {
    try {
      if (loggedIn && getUserRoleAndPermissions?.isSuccess === true) {
        // Storing in recoil.
        setUserRoleAndPermissions(oldValues => ({
          ...oldValues,
          role: getUserRoleAndPermissions.result.role,
          permissions: getUserRoleAndPermissions.result.permissions,
          fetched: true
        }));

        setCompState(oldState => ({
          ...oldState,
          isProcessing: false,
          userIsAuthenticated: true,
          guestUser: false
        }));

        // calling this so when user lands/refresh the page it will call this API and will not wait for 10(or more)seconds to update the user active status
        void updateUserStatusHandler();

        // setting the user "updateUserStatus" API interval so it will keep updating the user status after specified interval
        setLastSeenInterval();
      } else {
        clearLastSeenInterval();
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, getUserRoleAndPermissions]);

  useEffect(() => {
    void App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        setLastSeenInterval();
      } else {
        clearLastSeenInterval();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // #endregion

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    !compState.isProcessing &&
    ((!compState.errorOccurred && compState.userIsAuthenticated) ||
      compState.guestUser)
  ) {
    return <>{children}</>;
  } else if (
    !compState.isProcessing &&
    compState.errorOccurred &&
    compState.errorCode === ZErrorCodeEnum.unauthorized
  ) {
    return <Z401View />;
  } else {
    return <Z500View />;
  }
};

export default FetchRequiredAppDataHOC;
