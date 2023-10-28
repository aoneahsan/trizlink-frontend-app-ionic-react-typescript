/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonHeader,
  ZIonIcon,
  ZIonLabel,
  ZIonRow,
  ZIonSegment,
  ZIonSegmentButton,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import {
  IZNotification,
  ZNotificationEnum,
  ZTeamMemberInvitationEnum
} from '@/types/AdminPanel/index.type';
import { zNotificationSlotEnum } from '@/types/CustomHooks/zgeneric-hooks.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  notificationTypeEnum
} from '@/utils/enums';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { showSuccessNotification } from '@/utils/notification';
import { useZNotification } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZInvalidateReactQueries,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import classNames from 'classnames';
import { Formik } from 'formik';
import {
  checkmarkOutline,
  closeOutline,
  fileTrayStackedOutline,
  listCircleOutline,
  logoFacebook,
  personAdd,
  refreshOutline,
  settingsOutline
} from 'ionicons/icons';
import React, { useState } from 'react';
import ZViewInvitationModal from '../../ZaionsModals/Workspace/ViewInvitationModal';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
enum ZNotificationPopoverTabsEnum {
  approvals = 'approvals',
  updates = 'updates'
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZNotificationPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  workspaceId: string;
}> = ({ dismissZIonPopover, workspaceId }) => {
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  const { presentZNotification } = useZNotification();
  const {
    data: userInvitationNotificationsData,
    refetch: refetchNotifications
  } = useZRQGetRequest<IZNotification[]>({
    _url: API_URL_ENUM.user_unread_notifications_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
      workspaceId
    ],
    _showLoader: false,
    _checkPermissions: false,
    _itemsIds: [],
    _urlDynamicParts: []
  });

  const { mutateAsync: markAllAsReadAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_notification_mark_all_as_read,
    _showLoader: false
  });

  return (
    <Formik
      initialValues={{
        tab: ZNotificationPopoverTabsEnum.updates
      }}
      onSubmit={() => {}}>
      {({ values, setFieldValue }) => {
        return (
          <>
            {/* Header */}
            <ZIonHeader className='px-1 pt-1'>
              {/* Header Row */}
              <ZIonRow className='ion-no-padding'>
                {/* Col-1 Segment  */}
                <ZIonCol
                  className='ion-no-padding'
                  size='7'>
                  <ZIonSegment
                    className='ion-justify-content-start'
                    value={values.tab}
                    style={{ gridAutoColumns: 'max-content' }}>
                    {/* Updates */}
                    <ZIonSegmentButton
                      className='normal-case w-max min-w-[80px]'
                      value={ZNotificationPopoverTabsEnum.updates}
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .tabs.updates
                      }
                      onClick={() => {
                        setFieldValue(
                          'tab',
                          ZNotificationPopoverTabsEnum.updates,
                          false
                        );
                      }}
                      style={{
                        '--padding-end': '5px',
                        '--padding-start': '5px'
                      }}>
                      <ZIonLabel className='text-sm'>Updates</ZIonLabel>
                    </ZIonSegmentButton>

                    {/* Approval requests */}
                    <ZIonSegmentButton
                      className='normal-case w-max'
                      value={ZNotificationPopoverTabsEnum.approvals}
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .tabs.approvalRequests
                      }
                      onClick={() => {
                        setFieldValue(
                          'tab',
                          ZNotificationPopoverTabsEnum.approvals,
                          false
                        );
                      }}
                      style={{
                        '--padding-end': '5px',
                        '--padding-start': '5px'
                      }}>
                      <ZIonLabel className='text-sm'>
                        Approval requests
                      </ZIonLabel>
                    </ZIonSegmentButton>
                  </ZIonSegment>
                </ZIonCol>

                {/* Col-2 */}
                <ZIonCol className='flex gap-2 ion-no-padding ion-align-items-center ion-justify-content-end me-2'>
                  {/* Settings btn */}
                  {values.tab === ZNotificationPopoverTabsEnum.updates ? (
                    <ZIonButton
                      fill='clear'
                      size='small'
                      color='medium'
                      className='ion-no-margin ion-no-padding'
                      id='z-wnp-refresh-btn'
                      onClick={async () => {
                        await zInvalidateReactQueries([
                          CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION
                            .MAIN,
                          workspaceId
                        ]);
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .refetchBtn
                      }>
                      <ZIonIcon
                        icon={refreshOutline}
                        className='w-5 h-5'
                      />
                    </ZIonButton>
                  ) : null}
                  <ZRTooltip
                    anchorSelect='#z-wnp-refresh-btn'
                    place='bottom'
                    content='Refetch notification'
                  />

                  {/* Mark all as read btn */}
                  {values.tab === ZNotificationPopoverTabsEnum.updates ? (
                    <ZIonButton
                      fill='clear'
                      size='small'
                      color='medium'
                      className='ion-no-margin ion-no-padding'
                      id='z-mark-all-as-read-btn'
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .markAllAsReadBtn
                      }
                      disabled={
                        userInvitationNotificationsData &&
                        userInvitationNotificationsData?.filter(
                          el => el.read_at === null
                        )?.length > 0
                          ? false
                          : true
                      }
                      onClick={async () => {
                        if (
                          userInvitationNotificationsData &&
                          userInvitationNotificationsData?.filter(
                            el => el.read_at === null
                          )?.length > 0
                        ) {
                          const _response = await markAllAsReadAsyncMutate({
                            requestData: '',
                            itemIds: [],
                            urlDynamicParts: []
                          });

                          if (_response) {
                            const _data = extractInnerData<{
                              success: boolean;
                            }>(
                              _response,
                              extractInnerDataOptionsEnum.createRequestResponseItem
                            );

                            if (_data?.success) {
                              // const _allNotification;

                              await zInvalidateReactQueries([
                                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER
                                  .NOTIFICATION.MAIN,
                                workspaceId
                              ]);

                              presentZNotification({
                                message:
                                  'Successfully marked all notification as read',
                                notificationType: notificationTypeEnum.toast,
                                slot: zNotificationSlotEnum.success
                              });
                            }
                          }
                        }
                      }}>
                      <ZIonIcon
                        icon={listCircleOutline}
                        className='w-6 h-6'
                      />
                    </ZIonButton>
                  ) : null}
                  <ZRTooltip
                    anchorSelect='#z-mark-all-as-read-btn'
                    place='left'
                    content='Mark all as read'
                  />

                  {/* Settings btn */}
                  <ZIonButton
                    fill='clear'
                    size='small'
                    color='medium'
                    className='ion-no-margin ion-no-padding'
                    id='z-wnp-settings-btn'
                    testingselector={
                      CONSTANTS.testingSelectors.topBar.notificationPopover
                        .settingsBtn
                    }
                    routerLink={
                      ZaionsRoutes.AdminPanel.Setting.UserAccount
                        .NotificationSettings
                    }
                    onClick={() => {
                      // ZaionsRoutes.AdminPanel.Setting.UserAccount
                      // .NotificationSettings
                    }}>
                    <ZIonIcon
                      icon={settingsOutline}
                      className='w-5 h-5'
                    />
                  </ZIonButton>
                  <ZRTooltip
                    anchorSelect='#z-wnp-settings-btn'
                    place='bottom'
                    content='Notification settings'
                  />
                </ZIonCol>
              </ZIonRow>
            </ZIonHeader>

            {/* Content */}
            <ZIonContent className='h-full'>
              <ZIonGrid className='h-full px-0'>
                {values.tab === ZNotificationPopoverTabsEnum.approvals ? (
                  <ZApprovalsTab />
                ) : values.tab === ZNotificationPopoverTabsEnum.updates ? (
                  <ZUpdatesTab
                    workspaceId={workspaceId}
                    dismissZIonPopover={dismissZIonPopover}
                  />
                ) : null}
              </ZIonGrid>
            </ZIonContent>
          </>
        );
      }}
    </Formik>
  );
};

// Approvals tab.
const ZApprovalsTab: React.FC = () => {
  return (
    <>
      <div className='flex flex-col w-full gap-2 py-7 ion-align-items-center ion-justify-content-center'>
        <ZIonIcon
          icon={fileTrayStackedOutline}
          color='medium'
          className='w-8 h-8'
        />

        <ZIonText color='medium'>
          There are currently no posts awaiting your approval.
        </ZIonText>
      </div>
    </>
  );
};

// Update tab.
const ZUpdatesTab: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  workspaceId: string;
}> = ({ workspaceId, dismissZIonPopover }) => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    memberInviteId?: string;
  }>();
  // #endregion
  const { presentZNotification } = useZNotification();

  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region APIS.
  const {
    data: userInvitationNotificationsData,
    isFetching: isNotificationsFetching
  } = useZRQGetRequest<IZNotification[]>({
    _url: API_URL_ENUM.user_unread_notifications_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
      workspaceId
    ],
    _showLoader: false,
    _checkPermissions: false,
    _itemsIds: [],
    _urlDynamicParts: []
  });

  const { mutateAsync: markAsReadAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.user_notification_mark_as_read,
    _showLoader: false
  });
  // #endregion

  // #region Modal & Popover.
  const { presentZIonModal: presentZViewInvitationModal } = useZIonModal(
    ZViewInvitationModal,
    {
      workspaceId: workspaceId,
      memberInviteId: compState?.memberInviteId
    }
  );
  // #endregion

  // #region Functions.
  const zMarkAsReadHandler = async ({
    notificationId
  }: {
    notificationId?: string;
  }) => {
    try {
      if (notificationId) {
        const _response = await markAsReadAsyncMutate({
          requestData: '',
          itemIds: [notificationId],
          urlDynamicParts: [CONSTANTS.RouteParams.user.notification.id]
        });

        if (_response) {
          const _data = extractInnerData<IZNotification>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id) {
            // 	await zInvalidateReactQueries([
            // 		CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
            // 		workspaceId,
            // 	]);
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
                workspaceId
              ],
              id: _data?.id,
              data: _data,
              extractType: ZRQGetRequestExtractEnum.extractItems
            });

            presentZNotification({
              message: 'Successfully marked notification as read',
              notificationType: notificationTypeEnum.toast,
              slot: zNotificationSlotEnum.success
            });
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  if (isNotificationsFetching) {
    return <ZUpdatesTabSkeleton />;
  }

  return (
    <ZCustomScrollable
      className='h-full pb-10 mb-2'
      scrollY={true}>
      {userInvitationNotificationsData?.map((el, index) => {
        return (
          <ZIonRow
            key={index}
            className={classNames({
              'pb-2 border-b cursor-pointer px-1': true,
              zaions__bg_light_opacity_point7: el?.read_at !== null,
              zaions__bg_white: el?.read_at === null
            })}
            testingselector={
              CONSTANTS.testingSelectors.topBar.notificationPopover
                .singleNotification
            }
            testinglistselector={`${CONSTANTS.testingSelectors.topBar.notificationPopover.singleNotification}-${el?.id}`}
            onClick={() => {
              if (el?.read_at === null) {
                void zMarkAsReadHandler({
                  notificationId: el?.id
                });
              }
            }}>
            {/*  */}
            <ZIonCol size='1.5'>
              <ZUserAvatarButton
                className='w-[44px!important] h-[44px!important]'
                showStatus={true}
                statusIconColor='light'
                statusIcon={personAdd}
                statusIconPosition='bottom'
              />
            </ZIonCol>

            {/*  */}
            <ZIonCol>
              <div className='flex w-full ion-align-items-top ion-justify-content-between'>
                <div className='w-[73%]'>
                  <div className='overflow-hidden leading-none line-clamp-2'>
                    <ZIonText
                      className={classNames({
                        'text-sm ion-color': true,
                        'ion-color-dark font-semibold': el?.read_at === null,
                        'ion-color-medium': el?.read_at !== null
                      })}
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .notificationUpdateTabText
                      }
                      testinglistselector={`${CONSTANTS.testingSelectors.topBar.notificationPopover.notificationUpdateTabText}-${el?.id}`}>
                      {el?.data?.item?.message}
                    </ZIonText>
                  </div>

                  {el.zlNotificationType ===
                    ZNotificationEnum.wsTeamMemberInvitation && (
                    <ZIonButton
                      size='small'
                      className='mt-1'
                      testingselector={
                        CONSTANTS.testingSelectors.topBar.notificationPopover
                          .notificationUpdateTabViewBtn
                      }
                      testinglistselector={`${CONSTANTS.testingSelectors.topBar.notificationPopover.notificationUpdateTabViewBtn}-${el?.id}`}
                      onClick={async () => {
                        setCompState(oldValues => ({
                          ...oldValues,
                          memberInviteId: el?.data?.item?.wsTeamMemberInviteId
                        }));

                        presentZViewInvitationModal({
                          _cssClass: 'invitation-view-modal-size'
                        });

                        dismissZIonPopover('', '');
                      }}>
                      View
                    </ZIonButton>
                  )}
                </div>

                {/*  */}
                <div className='w-[22%] ion-text-center'>
                  <ZIonText
                    className='text-sm'
                    color='medium'
                    testingselector={
                      CONSTANTS.testingSelectors.topBar.notificationPopover
                        .dateText
                    }
                    testinglistselector={`${CONSTANTS.testingSelectors.topBar.notificationPopover.dateText}-${el?.id}`}>
                    {el.createdAt}
                  </ZIonText>
                </div>
              </div>

              {/* <div className='flex p-[3px] ion-align-items-center border rounded-md mt-2'>
							<div className='w-[36px] h-[36px] zaions__light_bg rounded-sm me-2'></div>

							<div className='w-[40%!important] me-1 overflow-hidden line-clamp-2 leading-none'>
								<ZIonText className='text-xs'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dignissimos assumenda ex dolor non maiores sequi tempore
									perspiciatis tenetur temporibus, dolores illo, inventore
									repellendus quas voluptas doloremque ratione consequuntur quis
									iure!
								</ZIonText>
							</div>

							<div className='flex ion-align-items-center ion-justify-content-between w-[47%]'>
								<div className='flex ion-align-items-center'>
									<ZIonIcon icon={logoFacebook} className='w-4 h-4' />
									<ZIonText className='text-xs mt-[1px] ms-1'>zaions</ZIonText>
								</div>

								<div className=''>
									<ZIonText className='text-xs' color='medium'>
										May 16, 11:44
									</ZIonText>
								</div>
							</div>
						</div> */}
            </ZIonCol>
          </ZIonRow>
        );
      })}

      {userInvitationNotificationsData &&
      userInvitationNotificationsData?.length === 0 ? (
        <div className='flex flex-col w-full gap-2 py-7 ion-align-items-center ion-justify-content-center'>
          <ZIonIcon
            icon={fileTrayStackedOutline}
            color='medium'
            className='w-8 h-8'
          />

          <ZIonText color='medium'>
            There are currently no notifications.
          </ZIonText>
        </div>
      ) : (
        []
      )}
    </ZCustomScrollable>
  );
};

const ZUpdatesTabSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => {
        return (
          <ZIonRow
            className='pb-2 border-b cursor-pointer'
            key={index}>
            {/*  */}
            <ZIonCol size='1.5'>
              <ZIonSkeletonText
                className='rounded-full'
                width='44px'
                height='44px'
              />
            </ZIonCol>

            {/*  */}
            <ZIonCol>
              <div className='flex w-full ion-align-items-top ion-justify-content-between'>
                <div className='w-[85%] me-2'>
                  <ZIonText color='medium'>
                    <ZIonSkeletonText
                      width='100%'
                      height='.8rem'
                    />
                  </ZIonText>
                </div>

                <div className='w-[15%]'>
                  <ZIonText color='medium'>
                    <ZIonSkeletonText
                      width='100%'
                      height='.8rem'
                    />
                  </ZIonText>
                </div>
              </div>

              {index === 1 && (
                <div className='flex p-[3px] ion-align-items-center border rounded-md mt-2'>
                  <div className='w-[36px] h-[36px] zaions__light_bg rounded-sm me-2'></div>

                  <div className='w-[40%!important] me-1 overflow-hidden line-clamp-2 leading-none'>
                    <ZIonText className='text-xs'>
                      <ZIonSkeletonText
                        width='100%'
                        height='1.4rem'
                      />
                    </ZIonText>
                  </div>

                  <div className='flex ion-align-items-center ion-justify-content-between w-[47%]'>
                    <div className='flex ion-align-items-center'>
                      <ZIonSkeletonText
                        width='1rem'
                        height='1rem'
                        className='rounded-full'
                      />
                      <ZIonText className='text-xs mt-[1px] ms-1'>
                        <ZIonSkeletonText
                          width='3rem'
                          height='.8rem'
                        />
                      </ZIonText>
                    </div>

                    <div>
                      <ZIonText
                        className='text-xs'
                        color='medium'>
                        <ZIonSkeletonText
                          width='5rem'
                          height='.8rem'
                        />
                      </ZIonText>
                    </div>
                  </div>
                </div>
              )}
            </ZIonCol>
          </ZIonRow>
        );
      })}
    </>
  );
};

export default ZNotificationPopover;
