/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type RefresherEventDetail } from '@ionic/react';
import classNames from 'classnames';
import { createOutline, pricetagOutline, timeOutline } from 'ionicons/icons';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonIcon,
  ZIonRefresher,
  ZIonRefresherContent,
  ZIonRow,
  ZIonSkeletonText,
  ZIonSpinner,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZInvalidateReactQueries,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import {
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type workspaceInterface,
  workspaceSettingsModalTabEnum
} from '@/types/AdminPanel/workspace';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

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

const ZShareWSView: React.FC = () => {
  const [compState, setCompState] = useState<{
    modalTab: workspaceSettingsModalTabEnum;
    isProcessing: boolean;
  }>({
    modalTab: workspaceSettingsModalTabEnum.timetable,
    isProcessing: true
  });

  // getting current share workspace id form params.
  const { wsShareId, shareWSMemberId } = useParams<{
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region custom hooks.
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Modals & popovers.
  // if user have permissions to view any of ZWorkspacesSettingModal.
  const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
    ZWorkspacesSettingModal,
    {
      Tab: compState.modalTab,
      wsShareId,
      wsShareMemberId: shareWSMemberId
    }
  );
  // #endregion

  // #region APIs.
  const {
    data: getShareWSInfoData,
    isFetching: isGetShareWSInfoDataFetching,
    isError: isGetShareWSInfoDataError
  } = useZRQGetRequest<workspaceInterface>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_info_data,
    _shouldFetchWhenIdPassed: !(
      shareWSMemberId !== undefined &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  const {
    data: getMemberRolePermissions,
    isFetching: isGetMemberRolePermissionsFetching,
    isError: isGetMemberRolePermissionsError
  } = useZRQGetRequest<{
    memberRole?: string;
    memberPermissions?: string[];
  }>({
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
      wsShareId ?? ''
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: !(
      shareWSMemberId !== undefined && shareWSMemberId?.trim()?.length > 0
    ),
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const invalidedQueries = async (): Promise<void> => {
    try {
      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MEMBER_ROLE_AND_PERMISSIONS,
        wsShareId ?? ''
      ]);

      await zInvalidateReactQueries([
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
        wsShareId ?? ''
      ]);
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleRefresh = async (
    event: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  useEffect(() => {
    if (
      !isGetMemberRolePermissionsFetching &&
      !isGetShareWSInfoDataFetching &&
      !isGetMemberRolePermissionsError &&
      !isGetShareWSInfoDataError
    ) {
      setCompState(oldValues => ({
        ...oldValues,
        isProcessing: false
      }));
    }
  }, [
    isGetMemberRolePermissionsFetching,
    isGetShareWSInfoDataFetching,
    isGetMemberRolePermissionsError,
    isGetShareWSInfoDataError
  ]);

  const isZFetching =
    isGetMemberRolePermissionsFetching && isGetShareWSInfoDataFetching;

  if (compState.isProcessing) {
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
  } else {
    return (
      <ZIonPage pageTitle='Zaions share workspace view page'>
        <ZCan
          shareWSId={wsShareId}
          havePermissions={[shareWSPermissionEnum.view_sws_workspace]}
          permissionType={permissionsTypeEnum.shareWSMemberPermissions}
          returnPermissionDeniedView={true}>
          <ZIonContent>
            {/* IonRefresher */}
            <ZIonRefresher
              onIonRefresh={event => {
                void handleRefresh(event);
              }}>
              <ZIonRefresherContent />
            </ZIonRefresher>

            {/* Grid-1 */}
            <ZIonGrid
              className={classNames({
                'h-screen ion-no-padding': true,
                'max-w-[200rem] mx-auto': true
              })}>
              {/* Row-1 */}
              <Suspense
                fallback={
                  <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                    <ZFallbackIonSpinner2 />
                  </ZIonRow>
                }>
                <ZAdminPanelTopBar
                  showInviteBtn={false}
                  showRefreshBtn={true}
                  refreshBtnOnClick={() => {
                    void invalidedQueries();
                  }}
                  showWSSwitcherBtn={false}
                />
              </Suspense>

              <ZIonRow className='px-4 py-5 mt-5 border rounded-lg zaions__light_bg ion-margin ion-align-items-start'>
                <ZIonCol>
                  {!isZFetching && (
                    <>
                      <ZIonTitle className='block font-bold ion-no-padding'>
                        Welcome to &quot;
                        <ZIonText color='tertiary'>
                          {getShareWSInfoData?.workspaceName}
                        </ZIonText>
                        &quot; workspace
                      </ZIonTitle>
                      <ZIonText
                        className='block text-sm'
                        color='dark'>
                        Owned by &quot;
                        <ZIonText
                          className='font-semibold'
                          color='tertiary'>
                          {getShareWSInfoData?.user?.username}
                        </ZIonText>
                        &quot;<ZIonText className='px-1'>|</ZIonText>Created at
                        <ZIonText className='px-1'>
                          {getShareWSInfoData?.createdAt}
                        </ZIonText>
                      </ZIonText>
                      <ZIonText className='block mt-3 text-sm'>
                        Your expertise as a &quot;
                        <ZIonText
                          className='font-semibold'
                          color='tertiary'>
                          {getMemberRolePermissions?.memberRole}
                        </ZIonText>
                        &quot; is essential here. Your contributions make a
                        difference. Let&apos;s work together to achieve great
                        things!
                      </ZIonText>
                    </>
                  )}

                  {isZFetching && (
                    <>
                      <ZIonTitle className='tracking-wider ion-no-padding'>
                        <ZIonSkeletonText className='w-full h-[1.2rem]' />
                      </ZIonTitle>
                      <ZIonText
                        className='block text-sm'
                        color='medium'>
                        <ZIonSkeletonText className='w-full h-[.8rem]' />
                      </ZIonText>
                      <ZIonText className='block mt-3 text-sm'>
                        <ZIonSkeletonText className='w-full h-[.6rem]' />
                        <ZIonSkeletonText className='w-full h-[.6rem]' />
                      </ZIonText>
                    </>
                  )}
                </ZIonCol>

                <ZIonCol className='flex ion-align-items-start ion-justify-content-end'>
                  {isZFetching && getMemberRolePermissions === undefined && (
                    <>
                      <ZIonButton
                        height='.9rem'
                        disabled
                        className='w-[9rem]'>
                        <ZIonSpinner color='light' />
                      </ZIonButton>
                      <ZIonButton
                        height='.9rem'
                        disabled
                        className='w-[7rem]'>
                        <ZIonSpinner color='light' />
                      </ZIonButton>
                      <ZIonButton
                        height='.9rem'
                        disabled>
                        <ZIonSpinner color='light' />
                      </ZIonButton>
                    </>
                  )}

                  {!isZFetching &&
                    (getMemberRolePermissions?.memberPermissions ?? [])
                      ?.length > 0 && (
                      <>
                        {/* If member has permission to view Time slot */}
                        <ZCan
                          havePermissions={[
                            shareWSPermissionEnum.viewAny_sws_timeSlot
                          ]}
                          permissionType={
                            permissionsTypeEnum.shareWSMemberPermissions
                          }
                          shareWSId={wsShareId}>
                          <ZIonButton
                            fill='outline'
                            className='me-2'
                            onClick={() => {
                              // setting the tab with should be active in modal
                              setCompState(oldValues => ({
                                ...oldValues,
                                modalTab:
                                  workspaceSettingsModalTabEnum.timetable
                              }));

                              // presenting modal
                              presentWorkspaceSettingModal({
                                _cssClass: 'workspace-setting-modal-size'
                              });
                            }}>
                            <ZIonIcon
                              className='me-1'
                              icon={timeOutline}
                            />
                            <ZCan
                              havePermissions={[
                                shareWSPermissionEnum.create_sws_timeSlot
                              ]}
                              permissionType={
                                permissionsTypeEnum.shareWSMemberPermissions
                              }
                              shareWSId={wsShareId}>
                              <ZIonText className='me-1'>Add</ZIonText>
                            </ZCan>
                            time slot
                          </ZIonButton>
                        </ZCan>

                        {/* If member has permission to view Label */}
                        <ZCan
                          havePermissions={[
                            shareWSPermissionEnum.viewAny_sws_label
                          ]}
                          permissionType={
                            permissionsTypeEnum.shareWSMemberPermissions
                          }
                          shareWSId={wsShareId}>
                          <ZIonButton
                            className='me-2'
                            fill='outline'
                            onClick={() => {
                              // setting the tab with should be active in modal
                              setCompState(oldValues => ({
                                ...oldValues,
                                modalTab: workspaceSettingsModalTabEnum.labels
                              }));

                              // presenting modal
                              presentWorkspaceSettingModal({
                                _cssClass: 'workspace-setting-modal-size'
                              });
                            }}>
                            <ZIonIcon
                              className='me-1'
                              icon={pricetagOutline}
                            />
                            <ZCan
                              havePermissions={[
                                shareWSPermissionEnum.create_sws_timeSlot
                              ]}
                              permissionType={
                                permissionsTypeEnum.shareWSMemberPermissions
                              }
                              shareWSId={wsShareId}>
                              <ZIonText className='me-1'>Add</ZIonText>
                            </ZCan>
                            label
                          </ZIonButton>
                        </ZCan>

                        {/* If member has permission to edit */}
                        <ZCan
                          havePermissions={[
                            shareWSPermissionEnum.update_sws_workspace
                          ]}
                          permissionType={
                            permissionsTypeEnum.shareWSMemberPermissions
                          }
                          shareWSId={wsShareId}>
                          <ZIonButton
                            onClick={() => {
                              // setting the tab with should be active in modal
                              setCompState(oldValues => ({
                                ...oldValues,
                                modalTab: workspaceSettingsModalTabEnum.settings
                              }));

                              // presenting modal
                              presentWorkspaceSettingModal({
                                _cssClass: 'workspace-setting-modal-size'
                              });
                            }}>
                            <ZIonIcon
                              className='me-1'
                              icon={createOutline}
                            />
                            Edit
                          </ZIonButton>
                        </ZCan>
                      </>
                    )}
                </ZIonCol>
              </ZIonRow>

              <ZIonRow className='px-4 py-5 mt-5 border rounded-lg zaions__light_bg ion-margin ion-align-items-start'>
                <ZIonCol>
                  <ZIonTitle className='block font-bold ion-no-padding'>
                    Short links
                  </ZIonTitle>

                  <ZIonText
                    className='block text-sm'
                    color='dark'>
                    Total short link in this workspace are &ldquo;
                    <ZIonText
                      className='font-semibold'
                      color='tertiary'>
                      0
                    </ZIonText>
                    &ldquo;
                  </ZIonText>
                </ZIonCol>

                <ZIonCol className='flex ion-align-items-start ion-justify-content-end'>
                  {/* If member has permission to view short links */}
                  <ZCan
                    havePermissions={[
                      shareWSPermissionEnum.viewAny_sws_shortLink
                    ]}
                    permissionType={
                      permissionsTypeEnum.shareWSMemberPermissions
                    }
                    shareWSId={wsShareId}>
                    <ZIonButton
                      fill='outline'
                      className='me-2'
                      routerLink={createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                        values: [
                          wsShareId ?? '',
                          shareWSMemberId ?? '',
                          CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                        ],
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId,
                          CONSTANTS.RouteParams
                            .folderIdToGetShortLinksOrLinkInBio
                        ]
                      })}>
                      View all short links
                    </ZIonButton>
                  </ZCan>

                  {/* If member has permission to view short links */}
                  <ZCan
                    havePermissions={[
                      shareWSPermissionEnum.create_sws_shortLink
                    ]}
                    permissionType={
                      permissionsTypeEnum.shareWSMemberPermissions
                    }
                    shareWSId={wsShareId}>
                    <ZIonButton className=''>Create short links</ZIonButton>
                  </ZCan>
                </ZIonCol>
              </ZIonRow>
            </ZIonGrid>
          </ZIonContent>
        </ZCan>
      </ZIonPage>
    );
  }
};

export default ZShareWSView;
