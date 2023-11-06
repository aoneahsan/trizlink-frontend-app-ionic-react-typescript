/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { ellipsisHorizontalOutline, star, starOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCard,
  ZIonCardContent,
  ZIonCardHeader,
  ZIonCol,
  ZIonIcon,
  ZIonImg,
  ZIonLabel,
  ZIonRouterLink,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  useZGetRQCacheData,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';
import {
  createRedirectRoute,
  extractInnerData,
  zStringify
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { showSuccessNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type wsShareInterface,
  type WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import { ZTeamMemberInvitationEnum } from '@/types/AdminPanel/index.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type UserAccountType } from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

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
 * @type {*}
 * */

const ZWorkspacesCard: React.FC<{
  workspaceId?: string;
  memberId?: string;
  workspaceName?: string;
  isFavorite?: boolean;
  workspaceTimezone?: string;
  workspaceImage?: string;
  owned?: boolean;
  user: UserAccountType;
  createdAt?: string;
  updatedAt?: string;
  accountStatus?: ZTeamMemberInvitationEnum;
}> = ({
  workspaceId,
  workspaceImage,
  workspaceName,
  createdAt,
  user,
  owned = true,
  isFavorite,
  accountStatus,
  memberId
}) => {
  // #region Custom Hooks.
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  // #endregion

  // #region Recoil state.
  // Store user data in ZaionsUserAccountRStateAtom recoil state.
  const userAccountStateAtom = useRecoilValue(ZaionsUserAccountRStateAtom);
  // #endregion

  // #region Popover.
  const { presentZIonPopover: presentUserInfoPopover } = useZIonPopover(
    ZUserInfoPopover,
    { showBadges: true, user: owned ? userAccountStateAtom : user }
  ); // popover hook to show UserInfoPopover

  const { presentZIonPopover: presentWorkspacesActionsPopover } =
    useZIonPopover(ZWorkspacesActionPopover, {
      workspaceId
    }); // popover hook to show UserInfoPopover
  // #endregion

  // #region APIS.
  // update invitation data api
  const { mutateAsync: updateInvitationAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.member_update,
    _queriesKeysToInvalidate: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION.MAIN,
      workspaceId ?? ''
    ]
  });

  const { mutateAsync: leaveSWSMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.leave_share_ws,
    _loaderMessage: MESSAGES.WORKSPACE.LEAVING_WS_API
  });

  // Update isFavorite of owned workspace
  const { mutateAsync: updateIsFavoriteOwnedWSAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.workspace_update_is_favorite,
      _loaderMessage:
        isFavorite === true
          ? MESSAGES.WORKSPACE.REMOVING_TO_IS_FAVORITE_API
          : MESSAGES.WORKSPACE.ADDING_TO_IS_FAVORITE_API
    });

  // Update isFavorite of share workspace
  const { mutateAsync: updateIsFavoriteShareWSAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.ws_share_update_is_favorite,
      _loaderMessage:
        isFavorite === true
          ? MESSAGES.WORKSPACE.REMOVING_TO_IS_FAVORITE_API
          : MESSAGES.WORKSPACE.ADDING_TO_IS_FAVORITE_API
    });
  // #endregion

  // #region Functions.
  const zInvitationResponseHandler = async ({
    _item
  }: {
    _item: ZTeamMemberInvitationEnum;
  }): Promise<void> => {
    try {
      if (_item?.trim()?.length > 0) {
        const _response = await updateInvitationAsyncMutate({
          requestData: zStringify({
            status: _item
          }),
          itemIds: [workspaceId ?? '', memberId ?? ''],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ]
        });

        if ((_response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
          const _data = extractInnerData<WSTeamMembersInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== undefined) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.INVITATION_GET,
                memberId ?? ''
              ],
              data: _data,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });

            const getWSShareWorkspaceData = getRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
            });

            const _oldData =
              extractInnerData<wsShareInterface[]>(
                getWSShareWorkspaceData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            if (_item === ZTeamMemberInvitationEnum.accepted) {
              await updateRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
                data: {
                  ..._data.workspace,
                  id: _data?.id,
                  accountStatus: _data?.accountStatus
                },
                id: _data?.id
              });
            } else if (_item === ZTeamMemberInvitationEnum.rejected) {
              const _updatedData = _oldData?.filter(el => el?.id !== _data?.id);

              await updateRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
                data: _updatedData,
                id: '',
                updateHoleData: true,
                extractType: ZRQGetRequestExtractEnum.extractItems
              });
            }

            if (_item === ZTeamMemberInvitationEnum.accepted) {
              showSuccessNotification('Successfully accepted invitation.');
            } else if (_item === ZTeamMemberInvitationEnum.rejected) {
              showSuccessNotification('Successfully rejected invitation.');
            }
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const zUpdateIsFavoriteHandler = async (): Promise<void> => {
    try {
      let _response;
      const _zStringifyData = zStringify({
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        isFavorite: !isFavorite
      });
      if (owned) {
        _response = await updateIsFavoriteOwnedWSAsyncMutate({
          itemIds: [workspaceId ?? ''],
          urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
          requestData: _zStringifyData
        });
      } else {
        _response = await updateIsFavoriteShareWSAsyncMutate({
          itemIds: [memberId ?? ''],
          urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
          requestData: _zStringifyData
        });
      }

      if (_response !== undefined) {
        const _data = extractInnerData<WSTeamMembersInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== undefined && _data?.id !== null) {
          if (owned) {
            await updateRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: {
                ..._data
              },
              id: _data?.id
              // extractType: ZRQGetRequestExtractEnum.extractItems,
            });
          } else {
            await updateRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
              data: {
                ..._data
              },
              id: _data?.id
              // extractType: ZRQGetRequestExtractEnum.extractItems,
            });
          }
        }

        if (_data?.isFavorite === true) {
          showSuccessNotification(MESSAGES.WORKSPACE.ADD_TO_IS_FAVORITE);
        } else {
          showSuccessNotification(MESSAGES.WORKSPACE.REMOVE_TO_IS_FAVORITE);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when member went to leave workspace and click on the leave button this function will fire and show the confirm alert.
  const LeaveWorkspaceConfirmAlert = async (): Promise<void> => {
    try {
      if (workspaceId !== undefined && memberId !== undefined) {
        await presentZIonAlert({
          header: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.HEADER,
          subHeader: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.SUB_HEADER,
          message: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Leave',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void leaveWorkspaceHandler();
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  const leaveWorkspaceHandler = async (): Promise<void> => {
    try {
      if (workspaceId !== undefined && memberId !== undefined && !owned) {
        const _response = await leaveSWSMutate({
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSId,
            CONSTANTS.RouteParams.workspace.shareWSMemberId
          ],
          itemIds: [workspaceId, memberId],
          requestData: ''
        });

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            const getWSShareWorkspaceData =
              getRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
              }) ?? [];

            const _oldData =
              extractInnerData<wsShareInterface[]>(
                getWSShareWorkspaceData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            const _updatedData = _oldData?.filter(el => el?.id !== memberId);

            await updateRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
              data: _updatedData,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItems
            });
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // #endregion
  return (
    <ZIonCard className='h-[11.4rem]'>
      <ZIonRow className='flex-col h-full'>
        <ZIonCol className='flex-1'>
          {/* Card header */}
          <ZIonCardHeader>
            <ZIonRow className='ion-align-items-center'>
              <ZIonCol
                size='8'
                className='flex gap-3 ion-align-items-center'>
                <div
                  className={classNames({
                    'w-[40px] h-[40px] rounded overflow-hidden': true,
                    'flex ion-align-items-center ion-justify-content-center':
                      workspaceImage === undefined ||
                      workspaceImage?.trim()?.length === 0
                  })}>
                  <ZIonRouterLink
                    color='dark'
                    routerLink={createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        workspaceId ?? '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ]
                    })}
                    testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardImg}-${workspaceId}`}
                    testinglistselector={
                      CONSTANTS.testingSelectors.workspace.listPage
                        .workspaceCardImg
                    }>
                    <ZIonImg
                      src={
                        workspaceImage ??
                        getUiAvatarApiUrl({
                          name: workspaceName
                        })
                      }
                      className='overflow-hidden rounded'
                    />
                  </ZIonRouterLink>
                </div>
                <div>
                  {/* workspace name */}
                  <ZIonRouterLink
                    className='block'
                    color='dark'
                    routerLink={
                      owned
                        ? createRedirectRoute({
                            url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                            params: [
                              CONSTANTS.RouteParams.workspace.workspaceId,
                              CONSTANTS.RouteParams
                                .folderIdToGetShortLinksOrLinkInBio
                            ],
                            values: [
                              workspaceId ?? '',
                              CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                            ]
                          })
                        : !owned &&
                          accountStatus === ZTeamMemberInvitationEnum.accepted
                        ? createRedirectRoute({
                            url: ZaionsRoutes.AdminPanel.ShareWS.Startup,
                            params: [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            values: [workspaceId ?? '', memberId ?? '']
                          })
                        : undefined
                    }
                    testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardTitle}-${workspaceId}`}
                    testinglistselector={
                      CONSTANTS.testingSelectors.workspace.listPage
                        .workspaceCardTitle
                    }>
                    <div className='max-w-[8rem] overflow-hidden line-clamp-1'>
                      <ZIonLabel
                        className='block text-base font-bold'
                        color='dark'>
                        {workspaceName}
                      </ZIonLabel>
                    </div>
                  </ZIonRouterLink>

                  {/*  */}
                  <ZIonText className='block text-xs'>{createdAt}</ZIonText>
                </div>
              </ZIonCol>

              {/* Add to Favorites button col */}
              <ZIonCol className='ion-text-end'>
                {owned ||
                accountStatus === ZTeamMemberInvitationEnum.accepted ? (
                  <ZIonButton
                    fill='clear'
                    minHeight='auto'
                    className='mb-1 overflow-hidden rounded-full w-7 h-7 ion-no-padding ion-no-margin'
                    testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardFavoritesButton}-${workspaceId}`}
                    testinglistselector={
                      CONSTANTS.testingSelectors.workspace.listPage
                        .workspaceCardFavoritesButton
                    }
                    onClick={() => {
                      void zUpdateIsFavoriteHandler();
                    }}>
                    <ZIonIcon icon={isFavorite === true ? star : starOutline} />
                  </ZIonButton>
                ) : null}
              </ZIonCol>

              {/* user avatar */}
              <ZIonCol
                size='12'
                className='mt-2 ion-no-margin ion-no-padding'>
                {/* Row */}
                <ZIonRow>
                  {/* Col */}
                  <ZIonCol>
                    <ZIonButton
                      color='primary'
                      fill='solid'
                      testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardUserButton}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.listPage
                          .workspaceCardUserButton
                      }
                      className={classNames(
                        classes['workspace-user-avatar-button'],
                        {
                          relative: true
                        }
                      )}
                      onClick={(event: unknown) => {
                        presentUserInfoPopover({
                          _event: event as Event,
                          _cssClass: 'zaions_user_info_popover_size'
                        });
                      }}>
                      <ZIonImg
                        className='w-[38px] h-[40px] zaions-object-fit-cover'
                        src={
                          owned
                            ? userAccountStateAtom?.avatar !== null
                              ? userAccountStateAtom?.avatar
                              : getUiAvatarApiUrl({
                                  name: userAccountStateAtom?.username
                                })
                            : user?.avatar !== null
                            ? user?.avatar
                            : getUiAvatarApiUrl({ name: user?.username })
                        }
                      />
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonCol>
            </ZIonRow>
          </ZIonCardHeader>
        </ZIonCol>

        <ZIonCol className=''>
          {/* Card body */}
          <ZIonCardContent className='flex flex-col h-full ion-justify-content-end ion-align-items-end'>
            {/* Bottom row */}
            <ZIonRow className='w-full ion-align-items-center'>
              {owned || accountStatus === ZTeamMemberInvitationEnum.accepted ? (
                <>
                  {/* View button */}
                  <ZIonCol>
                    <ZCan havePermissions={[permissionsEnum.view_workspace]}>
                      <ZIonButton
                        className='normal-case'
                        color='secondary'
                        size='default'
                        testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.viewWorkspaceButton}-${workspaceId}`}
                        testinglistselector={
                          CONSTANTS.testingSelectors.workspace.listPage
                            .viewWorkspaceButton
                        }
                        onClick={() => {
                          // Click on card will redirect to view workspace.
                          if (workspaceId !== undefined) {
                            if (owned) {
                              zNavigatePushRoute(
                                createRedirectRoute({
                                  url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                                  params: [
                                    CONSTANTS.RouteParams.workspace.workspaceId,
                                    CONSTANTS.RouteParams
                                      .folderIdToGetShortLinksOrLinkInBio
                                  ],
                                  values: [
                                    workspaceId,
                                    CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                                  ]
                                })
                              );
                            } else {
                              zNavigatePushRoute(
                                createRedirectRoute({
                                  url: ZaionsRoutes.AdminPanel.ShareWS.Startup,
                                  params: [
                                    CONSTANTS.RouteParams.workspace.wsShareId,
                                    CONSTANTS.RouteParams.workspace
                                      .shareWSMemberId
                                  ],
                                  values: [workspaceId, memberId ?? '']
                                })
                              );
                            }
                          }
                        }}>
                        View
                      </ZIonButton>
                    </ZCan>
                  </ZIonCol>

                  {/* actions popover button */}
                  <ZIonCol className='ion-text-end'>
                    {owned && (
                      <ZIonButton
                        fill='clear'
                        minHeight='auto'
                        className='w-6 h-6 overflow-hidden normal-case rounded-full ion-no-padding ion-no-margin'
                        color='dark'
                        testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.workspaceCardActionPopoverButton}-${workspaceId}`}
                        testinglistselector={
                          CONSTANTS.testingSelectors.workspace.listPage
                            .workspaceCardActionPopoverButton
                        }
                        onClick={(event: unknown) => {
                          presentWorkspacesActionsPopover({
                            _event: event as Event,
                            _cssClass: 'zaions_workspaces_actions_popover_size',
                            _dismissOnSelect: false
                          });
                        }}>
                        <ZIonIcon icon={ellipsisHorizontalOutline} />
                      </ZIonButton>
                    )}
                    {!owned && (
                      <ZIonButton
                        color='danger'
                        size='default'
                        testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.leaveWorkspaceButton}-${workspaceId}`}
                        testinglistselector={
                          CONSTANTS.testingSelectors.workspace.listPage
                            .leaveWorkspaceButton
                        }
                        onClick={() => {
                          void LeaveWorkspaceConfirmAlert();
                        }}>
                        Leave
                      </ZIonButton>
                    )}
                  </ZIonCol>
                </>
              ) : accountStatus === ZTeamMemberInvitationEnum.pending ||
                accountStatus === ZTeamMemberInvitationEnum.resend ? (
                <>
                  {/* Accept invitation */}
                  <ZIonCol>
                    <ZCan havePermissions={[permissionsEnum.view_workspace]}>
                      <ZIonButton
                        className='normal-case '
                        color='success'
                        size='default'
                        testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.acceptInvitationButton}-${workspaceId}`}
                        testinglistselector={
                          CONSTANTS.testingSelectors.workspace.listPage
                            .acceptInvitationButton
                        }
                        onClick={() => {
                          void zInvitationResponseHandler({
                            _item: ZTeamMemberInvitationEnum.accepted
                          });
                        }}>
                        Accept
                      </ZIonButton>
                    </ZCan>
                  </ZIonCol>

                  {/* Reject invitation */}
                  <ZIonCol className='ion-text-end'>
                    <ZIonButton
                      className='normal-case'
                      color='danger'
                      size='default'
                      testingselector={`${CONSTANTS.testingSelectors.workspace.listPage.rejectInvitationButton}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.listPage
                          .rejectInvitationButton
                      }
                      onClick={() => {
                        void zInvitationResponseHandler({
                          _item: ZTeamMemberInvitationEnum.rejected
                        });
                      }}>
                      Reject
                    </ZIonButton>
                  </ZIonCol>
                </>
              ) : null}
            </ZIonRow>
          </ZIonCardContent>
        </ZIonCol>
      </ZIonRow>
    </ZIonCard>
  );
};

export default ZWorkspacesCard;
