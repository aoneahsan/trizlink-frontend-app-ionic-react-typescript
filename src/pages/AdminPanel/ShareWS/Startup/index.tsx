/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import { ZIonContent, ZIonSpinner } from '@/components/ZIonComponents';

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
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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

const ZShareWSStartup: React.FC = () => {
  // getting current share workspace id form params.
  const { wsShareId, shareWSMemberId } = useParams<{
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region APIS
  const {
    data: getMemberRolePermissions,
    isFetching: isGetMemberRolePermissionsFetching
  } = useZRQGetRequest({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  const { data: getShareWSInfoData, isFetching: isGetShareWSInfoDataFetching } =
    useZRQGetRequest({
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId ?? '',
        shareWSMemberId ?? ''
      ],
      _url: API_URL_ENUM.ws_share_member_role_permissions,
      _shouldFetchWhenIdPassed: !(
        shareWSMemberId !== undefined &&
        (shareWSMemberId?.trim()?.length ?? 0) > 0
      ),
      _itemsIds: [shareWSMemberId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });
  // #endregion

  // #region useEffects
  useEffect(() => {
    try {
      if (
        !isGetMemberRolePermissionsFetching &&
        !isGetShareWSInfoDataFetching
      ) {
        zNavigatePushRoute(
          createRedirectRoute({
            url: ZaionsRoutes.AdminPanel.ShareWS.View,
            params: [
              CONSTANTS.RouteParams.workspace.wsShareId,
              CONSTANTS.RouteParams.workspace.shareWSMemberId
            ],
            values: [wsShareId ?? '', shareWSMemberId ?? '']
          })
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      if (
        getMemberRolePermissions !== undefined &&
        getShareWSInfoData !== undefined
      ) {
        zNavigatePushRoute(
          createRedirectRoute({
            url: ZaionsRoutes.AdminPanel.ShareWS.View,
            params: [
              CONSTANTS.RouteParams.workspace.wsShareId,
              CONSTANTS.RouteParams.workspace.shareWSMemberId
            ],
            values: [wsShareId ?? '', shareWSMemberId ?? '']
          })
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMemberRolePermissions, getShareWSInfoData]);
  // #endregion

  return (
    <ZIonPage>
      <ZIonContent>
        <div className='flex flex-col w-full h-full pt-4 ion-align-items-center ion-justify-content-center'>
          <ZIonSpinner className='w-10 h-10' />

          {isGetMemberRolePermissionsFetching
            ? 'Getting & setting your permissions in this workspace'
            : isGetShareWSInfoDataFetching
            ? 'Setting share workspace data'
            : null}
        </div>

        {/* <ZFallbackIonSpinner /> */}
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZShareWSStartup;
