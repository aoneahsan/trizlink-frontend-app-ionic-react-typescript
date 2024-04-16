/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import {
  ZIonCol,
  ZIonContent,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ProductExternalURL } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM } from '@/utils/enums';
import { createRedirectRoute } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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

const ZInvitationSLRedirectPage: React.FC = () => {
  const { urlPath } = useParams<{
    urlPath: string;
  }>();

  const [compState, setCompState] = useState<{
    isProcessing: boolean;
    errorCode?: number;
    errorOccurred: boolean;
    redirectLink?: string;
    error?: string;
  }>({
    isProcessing: true,
    errorOccurred: false
  });

  // #region Custom hooks
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region APIS.
  const { data: checkSLData, isError: isCheckSLDataError } = useZRQGetRequest<{
    token?: string;
    success: boolean;
  }>({
    _key: [],
    _url: API_URL_ENUM.member_check_short_url,
    _authenticated: false,
    _checkPermissions: false,
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false,
    _shouldExtractData: true,
    _itemsIds: [urlPath],
    _shouldFetchWhenIdPassed: !(urlPath?.trim()?.length === 12),
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.invitationId]
  });
  // #endregion

  // #region UseEffects
  useEffect(() => {
    if (urlPath?.trim()?.length < 12 || urlPath?.trim()?.length > 12) {
      setCompState(oldState => ({
        ...oldState,
        errorOccurred: true,
        isProcessing: false
      }));
    }
  }, [urlPath]);

  useEffect(() => {
    if (checkSLData?.success === true) {
      setCompState(oldState => ({
        ...oldState,
        errorOccurred: false,
        isProcessing: false
      }));

      zNavigatePushRoute(
        createRedirectRoute({
          url: ZaionsRoutes.ValidateInvitationRoute,
          routeSearchParams: {
            token: String(checkSLData?.token)
          }
        })
      );
    } else if (isCheckSLDataError) {
      setCompState(oldState => ({
        ...oldState,
        errorOccurred: true,
        isProcessing: false
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkSLData, isCheckSLDataError]);
  // #endregion

  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    urlPath?.trim()?.length === 12 &&
    !compState.errorOccurred &&
    !compState.isProcessing
  ) {
    return <ZFallbackIonSpinner />;
  } else {
    return (
      <ZIonPage>
        <ZIonContent>
          <ZIonRow className='flex h-full ion-align-items-center ion-justify-content-center ion-text-center'>
            <ZIonCol
              size='6'
              className='flex flex-col ion-align-items-center ion-justify-content-center ion-text-center h-max'>
              <ZIonTitle className='text-4xl font-bold ion-no-padding'>
                Something&apos;s wrong here.
              </ZIonTitle>

              <ZIonText className='block mt-3 text-lg tracking-wide'>
                Oops! It seems like you&apos;ve encountered a 404 error. This
                indicates that the link you clicked on is either incorrect or
                the URL you entered is invalid. You might find what you&apos;re
                searching for at
                <ZIonRouterLink className='cursor-pointer ms-1 hover:underline'>
                  {ProductExternalURL.GenericExternalURL}
                </ZIonRouterLink>
                . Please note that our links are case sensitive. Feel free to
                visit
                <ZIonRouterLink className='mx-1 cursor-pointer hover:underline'>
                  {ProductExternalURL.GenericExternalURL}
                </ZIonRouterLink>
                for more information.
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
        </ZIonContent>
      </ZIonPage>
    );
  }
};

export default ZInvitationSLRedirectPage;
