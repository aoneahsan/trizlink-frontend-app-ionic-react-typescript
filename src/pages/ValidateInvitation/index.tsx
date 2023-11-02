/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useState, useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z401View from '@/components/Errors/401';
import Z400View from '@/components/Errors/400';
import Z500View from '@/components/Errors/500';
import Z403View from '@/components/Errors/403';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, STORAGE, zStringify } from '@/utils/helpers';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { errorCodes } from '@/utils/constants/apiConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { type WSTeamMembersInterface } from '@/types/AdminPanel/workspace';
import {
  SignUpTypeEnum,
  type UserAccountType
} from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZValidateInvitationPage: React.FC = () => {
  const [compState, setCompState] = useState<{
    shouldFetch: boolean;
    isProcessing: boolean;
    errorCode?: number;
    errorOccurred: boolean;
  }>({
    shouldFetch: false,
    isProcessing: true,
    errorOccurred: false
  });

  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const _token = (routeQSearchParams as { token: string }).token;

  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const { mutateAsync: validateAndUpdateInvitation } = useZRQUpdateRequest({
    _url: API_URL_ENUM.validate_invitation_status,
    _showAlertOnError: false,
    _showLoader: false,
    authenticated: false
  });

  const validator = useCallback(async () => {
    try {
      const userData = (await STORAGE.GET(
        LOCALSTORAGE_KEYS.USERDATA
      )) as UserAccountType | null;

      const _data = zStringify({
        email: userData?.email,
        token: _token
      });

      const _response = await validateAndUpdateInvitation({
        requestData: _data,
        itemIds: [],
        urlDynamicParts: []
      });

      if ((_response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
        const _data = extractInnerData<{
          user: {
            email: string;
            signupType: string;
          };
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data?.user?.email !== undefined) {
          setCompState(oldValues => ({
            ...oldValues,
            isProcessing: false
          }));

          const inviteeData = {
            email: _data?.user?.email,
            token: _token,
            signupType: _data?.user?.signupType
          };
          void STORAGE.SET(LOCALSTORAGE_KEYS.INVITEE_USER_DATA, inviteeData);

          if (_data?.user?.signupType === SignUpTypeEnum.normal) {
            window.location.replace(ZaionsRoutes.LoginRoute);
          } else if (_data?.user?.signupType === SignUpTypeEnum.invite) {
            window.location.replace(ZaionsRoutes.SetPassword);
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrors = error.response;

        setCompState(oldValues => ({
          ...oldValues,
          isProcessing: false,
          errorCode: _apiErrors?.status,
          errorOccurred: true
        }));

        if (_apiErrors?.status === errorCodes.badRequest) {
          void presentZIonErrorAlert({
            subHeader: 'Invalid token',
            message: 'The provided token is invalid.'
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_token?.trim()?.length > 0) {
      void validator();
    } else {
      setCompState(oldState => ({
        ...oldState,
        errorOccurred: true,
        isProcessing: false
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_token]);

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    _token?.trim()?.length > 0 &&
    compState.errorOccurred &&
    compState.errorCode === errorCodes.unauthenticated &&
    !compState.isProcessing
  ) {
    return (
      <ZIonPage>
        <Z401View />
      </ZIonPage>
    );
  } else if (
    _token?.trim()?.length > 0 &&
    compState.errorOccurred &&
    compState.errorCode === errorCodes.badRequest &&
    !compState.isProcessing
  ) {
    return (
      <ZIonPage>
        <Z400View />
      </ZIonPage>
    );
  } else if (
    _token?.trim()?.length > 0 &&
    compState.errorOccurred &&
    compState.errorCode === errorCodes.forbidden &&
    !compState.isProcessing
  ) {
    return (
      <ZIonPage>
        <Z403View />
      </ZIonPage>
    );
  } else if (
    _token?.trim()?.length > 0 &&
    !compState.errorOccurred &&
    !compState.isProcessing
  ) {
    return <ZFallbackIonSpinner />;
  } else {
    return (
      <ZIonPage>
        <Z500View />
      </ZIonPage>
    );
  }
};

export default ZValidateInvitationPage;
