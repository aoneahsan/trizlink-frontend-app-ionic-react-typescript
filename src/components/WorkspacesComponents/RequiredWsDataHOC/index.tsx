/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZPageLoader from '@/components/InPageComponents/ZPageLoader';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings
} from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { type ZSubscriptionI } from '@/types/WhyZaions/PricingPage';
import { type userServicesLimitI } from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  ZWsServicesLimitsRStateAtom,
  ZWsSubscriptionRStateAtom
} from '@/ZaionsStore/UserDashboard/Workspace/index.recoil';

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
 * About: (HOC mainly to fetch required workspace data)
 * @type {*}
 * */

const ZRequiredWsDataHOC: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Recoil
  // recoil state for storing current workspace services data.
  const setWsServicesLimits = useSetRecoilState(ZWsServicesLimitsRStateAtom);

  // recoil state for storing current workspace subscription data.
  const setZWsSubscription = useSetRecoilState(ZWsSubscriptionRStateAtom);
  // #endregion

  // #region APIS.
  // If owned-workspace then this api will fetch owned-workspace data.
  const { isFetching: isSelectedWorkspaceFetching } =
    useZRQGetRequest<workspaceInterface>({
      _url: API_URL_ENUM.workspace_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET,
        workspaceId ?? ''
      ],
      _authenticated: true,
      _itemsIds: [workspaceId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined && (workspaceId?.trim()?.length ?? 0) > 0
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  // fetch workspace subscription data.
  const {
    data: WSSubscriptionData,
    isFetching: isSelectedWSSubscriptionFetching
  } = useZRQGetRequest<ZSubscriptionI>({
    _url: API_URL_ENUM.ws_subscription_get,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SUBSCRIPTION_GET],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyString(workspaceId) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId])
    ),
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // fetch workspace subscription data.
  const {
    data: WSSubscriptionLimitsData,
    isFetching: isSelectedWSSubscriptionLimitsFetching
  } = useZRQGetRequest<userServicesLimitI[]>({
    _url: API_URL_ENUM.ws_subscription_limits,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SUBSCRIPTION_LIMITS],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyString(workspaceId) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId])
    ),
    _showLoader: false
  });
  // #endregion

  // #region useEffects
  useEffect(() => {
    try {
      if (
        WSSubscriptionLimitsData !== null &&
        WSSubscriptionLimitsData !== undefined
      ) {
        setWsServicesLimits(_ => WSSubscriptionLimitsData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [WSSubscriptionLimitsData]);

  useEffect(() => {
    try {
      if (WSSubscriptionData !== null && WSSubscriptionData !== undefined) {
        setZWsSubscription(_ => WSSubscriptionData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line
  }, [WSSubscriptionData]);
  // #endregion
  if (
    isSelectedWSSubscriptionFetching &&
    isSelectedWSSubscriptionLimitsFetching &&
    isSelectedWorkspaceFetching
  ) {
    return (
      <ZPageLoader>
        {isZNonEmptyString(workspaceId) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId])
          ? isSelectedWorkspaceFetching
            ? 'Setting workspace data'
            : isSelectedWorkspaceFetching
            ? 'Fetching workspace subscription'
            : isSelectedWSSubscriptionLimitsFetching
            ? 'Fetching workspace services'
            : null
          : null}
      </ZPageLoader>
    );
  }
  return <>{children}</>;
};

export default ZRequiredWsDataHOC;
