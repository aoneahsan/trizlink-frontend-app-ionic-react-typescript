/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import classNames from 'classnames';
import { menuController } from '@ionic/core/components';
import { filterOutline, refresh } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZaionsAddUtmTags from '@/components/InPageComponents/ZaionsModals/AddUtmTags';
import ZUTMTagsTable from '@/components/InPageComponents/ZaionsTable/UTMTagsTemplateTable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { FormMode } from '@/types/AdminPanel/index.type';
import { type UTMTagTemplateType } from '@/types/AdminPanel/linksType';
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

const ZWSSettingUtmTagListPage: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();

  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region APIs
  // If owned workspace then this api is used to fetch workspace utm tags data.
  const { data: UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId ?? ''],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined &&
      workspaceId !== null &&
      (workspaceId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If share workspace then this api is used to fetch share workspace utm tags data.
  const { data: swsUTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
      wsShareId ?? ''
    ],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      wsShareId !== null &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId !== null &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
  const { data: getMemberRolePermissions } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      wsShareId !== null &&
      wsShareId?.trim()?.length > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId !== null &&
      shareWSMemberId?.trim()?.length > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    {
      formMode: FormMode.ADD,
      workspaceId,
      wsShareId,
      shareWSMemberId
    }
  );
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
          workspaceId
        ]);
      } else if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        await zInvalidateReactQueries([
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
          wsShareId
        ]);
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZCan
      shareWSId={wsShareId}
      havePermissions={
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
          ? [permissionsEnum.viewAny_utmTag]
          : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [shareWSPermissionEnum.viewAny_sws_utmTag]
          : []
      }
      permissionType={
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }>
      {/* filter, refresh, create buttons */}
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
          sizeLg='5'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mb-2': !isSmScale
          })}>
          <ZIonTitle
            className={classNames({
              'block font-bold ion-no-padding': true,
              'text-2xl': isLgScale,
              'text-xl': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            UTM Tags
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            {[
              shareWSPermissionEnum.create_sws_utmTag,
              shareWSPermissionEnum.update_sws_utmTag
            ].some(el =>
              getMemberRolePermissions?.memberPermissions?.includes(el)
            ) ||
            (workspaceId !== undefined &&
              workspaceId !== null &&
              (workspaceId?.trim()?.length ?? 0) > 0)
              ? 'UTM Central: Add, Organize, and Manage Your utm tags'
              : 'Your UTM View: Explore and Monitor UTM Tag Data'}
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='6'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': true,
            'ion-justify-content-between flex gap-1': !isLgScale && isSmScale,
            'w-full': !isSmScale
          })}>
          {/* Filter */}
          {((workspaceId !== undefined &&
            UTMTagsData !== undefined &&
            (UTMTagsData?.length ?? 0) > 0) ||
            (wsShareId !== undefined &&
              shareWSMemberId !== undefined &&
              swsUTMTagsData !== undefined &&
              (swsUTMTagsData?.length ?? 0) > 0)) && (
            <ZIonButton
              fill='outline'
              color='primary'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.utmTags.listPage.filterBtn
              }
              className={classNames({
                'my-2': true,
                'me-2': isLgScale,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale,
                'ion-no-margin': !isSmScale
              })}
              onClick={() => {
                void (async () => {
                  // Open the menu by menu-id
                  await menuController.enable(
                    true,
                    CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID
                  );
                  await menuController.open(
                    CONSTANTS.MENU_IDS.UTMTag_FILTERS_MENU_ID
                  );
                })();
              }}>
              <ZIonIcon
                slot='start'
                icon={filterOutline}
                className={classNames({
                  'me-1': true,
                  'w-4 h-4': !isLgScale
                })}
              />
              Filter
            </ZIonButton>
          )}

          {/* Refetch data button */}
          <ZIonButton
            color='primary'
            fill='outline'
            minHeight={isLgScale ? '39px' : '2rem'}
            expand={!isLgScale ? 'block' : undefined}
            className={classNames({
              'my-2': true,
              'me-2': isLgScale,
              'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                !isLgScale && isSmScale,
              'w-full': !isSmScale
            })}
            onClick={() => {
              void invalidedQueries();
            }}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.refetchBtn
            }>
            <ZIonIcon
              slot='start'
              icon={refresh}
              className={classNames({
                'me-1': true,
                'w-4 h-4': !isLgScale,
                'ion-no-margin': !isSmScale
              })}
            />
            Refetch
          </ZIonButton>

          {/* Create new UTM */}
          <ZCan
            shareWSId={wsShareId}
            havePermissions={
              workspaceId !== undefined &&
              workspaceId !== null &&
              (workspaceId?.trim()?.length ?? 0) > 0
                ? [permissionsEnum.create_utmTag]
                : wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [shareWSPermissionEnum.create_sws_utmTag]
                : []
            }
            permissionType={
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }>
            <ZIonButton
              color='primary'
              fill='solid'
              minHeight={isLgScale ? '39px' : '2rem'}
              expand={!isLgScale ? 'block' : undefined}
              testingselector={
                CONSTANTS.testingSelectors.utmTags.listPage.createBtn
              }
              className={classNames({
                'my-2': true,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale
              })}
              onClick={() => {
                presentZUtmTagsFormModal({
                  _cssClass: 'utm-tags-modal-size'
                });
              }}>
              Create new UTM
            </ZIonButton>
          </ZCan>

          {/* {!isMdScale ? (
            <ZIonButton
              expand={!isLgScale ? 'block' : undefined}
              minHeight={isLgScale ? '39px' : '2rem'}
              className={classNames({
                'my-2': true,
                'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                  !isLgScale && isSmScale,
                'w-full': !isSmScale
              })}
              onClick={async () => {
                // Open the menu by menu-id
                await menuController.enable(
                  true,
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
                await menuController.open(
                  CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID
                );
              }}>
              Open menu
            </ZIonButton>
          ) : null} */}
        </ZIonCol>
      </ZIonRow>

      <ZCan
        shareWSId={wsShareId}
        havePermissions={
          workspaceId !== undefined &&
          workspaceId !== null &&
          (workspaceId?.trim()?.length ?? 0) > 0
            ? [permissionsEnum.view_utmTag]
            : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [shareWSPermissionEnum.view_sws_utmTag]
            : []
        }
        permissionType={
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }>
        <Suspense
          fallback={
            <ZIonRow className='h-full'>
              <ZFallbackIonSpinner2 />
            </ZIonRow>
          }>
          <ZUTMTagsTable />
        </Suspense>
      </ZCan>
    </ZCan>
  );
};

export default ZWSSettingUtmTagListPage;
