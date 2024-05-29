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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import routeQueryString from 'qs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  createOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline,
  sendOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonChip,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import ZEmptyTable from '@/components/InPageComponents/ZEmptyTable';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal,
  useZIonPopover,
  useZIonToast
} from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  createRedirectRoute,
  extractInnerData,
  zStringify
} from '@/utils/helpers';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { ENVS } from '@/utils/envKeys';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type WSRolesNameEnum,
  WorkspaceSharingTabEnum,
  type WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import {
  FormMode,
  ZMembersListPageTableColumnsIds,
  ZTeamMemberInvitationEnum,
  type ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  FilteredMembersDataRStateSelector,
  MembersAccountsRStateAtom,
  MembersFilterOptionsRStateAtom
} from '@/ZaionsStore/UserDashboard/MemberState/index.recoil';

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
 * About: (table for listing workspace team members)
 * @type {*}
 * */

const ZMembersListTable: React.FC = () => {
  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region APIS.
  // If owned-workspace then this api will fetch members in this owned-workspace.
  const { data: membersData, isFetching: isMembersFetching } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined &&
      workspaceId !== null &&
      (workspaceId?.trim()?.length ?? 0) > 0
    )
  });

  // If share-workspace then this api will fetch members in this share-workspace.
  const { data: swsMembersData, isFetching: isSWSMembersFetching } =
    useZRQGetRequest<WSTeamMembersInterface[]>({
      _url: API_URL_ENUM.member_getAllInvite_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
        wsShareId ?? ''
      ],
      _itemsIds: [shareWSMemberId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _shouldFetchWhenIdPassed: !(
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      )
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

  // #region Modals & popovers.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite,
      workspaceId
    }
  );
  // #endregion

  let isZFetching = isMembersFetching;

  if (
    wsShareId !== undefined &&
    wsShareId !== null &&
    wsShareId?.trim()?.length > 0 &&
    shareWSMemberId !== undefined &&
    shareWSMemberId !== null &&
    shareWSMemberId?.trim()?.length > 0
  ) {
    isZFetching = isSWSMembersFetching;
  }

  return (
    <>
      {isZFetching && <ZaionsMembersTableSkeleton />}

      {!isZFetching ? (
        (workspaceId !== undefined &&
          workspaceId !== null &&
          (workspaceId?.trim()?.length ?? 0) > 0 &&
          membersData !== undefined &&
          membersData !== null &&
          membersData?.length > 0) ||
        (wsShareId !== undefined &&
          wsShareId !== null &&
          (wsShareId?.trim()?.length ?? 0) > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          (shareWSMemberId?.trim()?.length ?? 0) > 0 &&
          swsMembersData !== undefined &&
          swsMembersData !== null &&
          swsMembersData?.length > 0) ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message={
                [
                  shareWSPermissionEnum.send_invitation_sws_member,
                  shareWSPermissionEnum.create_sws_member,
                  shareWSPermissionEnum.update_sws_member
                ].some(el =>
                  getMemberRolePermissions?.memberPermissions?.includes(el)
                ) ||
                (workspaceId !== undefined &&
                  workspaceId !== null &&
                  (workspaceId?.trim()?.length ?? 0) > 0)
                  ? 'No members founds. please invite a member.'
                  : 'No members founds.'
              }
              btnText='Invite member'
              btnOnClick={() => {
                if (
                  [
                    shareWSPermissionEnum.send_invitation_sws_member,
                    shareWSPermissionEnum.create_sws_member,
                    shareWSPermissionEnum.update_sws_member
                  ].some(el =>
                    getMemberRolePermissions?.memberPermissions?.includes(el)
                  ) ||
                  (workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0)
                ) {
                  presentWorkspaceSharingModal({
                    _cssClass: 'workspace-sharing-modal-size'
                  });
                }
              }}
              showBtn={
                !!(
                  [
                    shareWSPermissionEnum.send_invitation_sws_member,
                    shareWSPermissionEnum.create_sws_member,
                    shareWSPermissionEnum.update_sws_member
                  ].some(el =>
                    getMemberRolePermissions?.memberPermissions?.includes(el)
                  ) ||
                  (workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0)
                )
              }
            />
          </div>
        )
      ) : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    selectedMemberId?: string;
    selectedMemberEmail?: string;
    selectedMemberRole?: WSRolesNameEnum;
    selectedShortUrlKey?: string;
  }>({});
  // #endregion

  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonToast } = useZIonToast();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  // #region Recoil state.
  const setMembersDataRState = useSetRecoilState(MembersAccountsRStateAtom);
  const setMembersFilterOptionsRState = useSetRecoilState(
    MembersFilterOptionsRStateAtom
  );
  const filteredMembersDataRSelector = useRecoilValue(
    FilteredMembersDataRStateSelector
  );

  // #endregion

  // #region APIS.
  // If owned-workspace then this api will fetch members in this owned-workspace.
  const { data: membersData } = useZRQGetRequest<WSTeamMembersInterface[]>({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: !(
      workspaceId !== undefined &&
      workspaceId !== null &&
      (workspaceId?.trim()?.length ?? 0) > 0
    )
  });

  // If share-workspace then this api will fetch members in this share-workspace.
  const { data: swsMembersData } = useZRQGetRequest<WSTeamMembersInterface[]>({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
      wsShareId ?? ''
    ],
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _shouldFetchWhenIdPassed: !(
      wsShareId !== undefined &&
      wsShareId !== null &&
      (wsShareId?.trim()?.length ?? 0) > 0 &&
      shareWSMemberId !== undefined &&
      shareWSMemberId !== null &&
      (shareWSMemberId?.trim()?.length ?? 0) > 0
    )
  });

  const { data: getMemberFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.membersListPageTable
            ]
          : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                wsShareId,
                shareWSMemberId,
                ZUserSettingTypeEnum.membersListPageTable
              ]
            : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.membersListPageTable
            ]
          : wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== undefined &&
              shareWSMemberId !== null &&
              shareWSMemberId?.trim()?.length > 0
            ? [
                ZWSTypeEum.shareWorkspace,
                shareWSMemberId,
                ZUserSettingTypeEnum.membersListPageTable
              ]
            : [],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        ((wsShareId?.trim()?.length ?? 0) === 0 &&
          (shareWSMemberId?.trim()?.length ?? 0) === 0) ||
        (workspaceId?.trim()?.length ?? 0) === 0
      ),
      _showLoader: false
    });

  // If this is a owned workspace then this api will add a short url in for invitation link.
  const { mutateAsync: invitationLinkShortUrlAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.member_create_short_url,
      _loaderMessage: MESSAGES.MEMBER.INVITE_LINK_API
    });

  // If this is a share workspace and member has permission to add short url then this api will add a short url in for invitation link.
  const { mutateAsync: swsInvitationLinkShortUrlAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.sws_member_create_short_url,
      _loaderMessage: MESSAGES.MEMBER.INVITE_LINK_API
    });
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZMemberActionPopover } = useZIonPopover(
    ZMemberActionPopover,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId,
      membersId: compState.selectedMemberId,
      email: compState.selectedMemberEmail,
      role: compState.selectedMemberRole
    }
  );
  // #endregion

  // #region Functions.
  const addInvitationShortLink = async (
    invitationId: string
  ): Promise<void> => {
    try {
      let _response;
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        // WSTeamMembersInterface
        _response = await invitationLinkShortUrlAsyncMutate({
          itemIds: [workspaceId, invitationId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: ''
        });
      } else if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        _response = await swsInvitationLinkShortUrlAsyncMutate({
          itemIds: [shareWSMemberId, invitationId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSMemberId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: ''
        });
      }

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<WSTeamMembersInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== null && _data?.id !== undefined) {
          if (workspaceId !== undefined) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ],
              data: _data,
              id: _data?.id,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
          } else if (
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                wsShareId
              ],
              data: _data,
              id: _data?.id,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
          }

          setCompState(oldValues => ({
            ...oldValues,
            selectedItem: _data,
            canCreateShortUrl: _data?.shortUrlId === null,
            formMode: FormMode.EDIT
          }));

          showSuccessNotification(MESSAGES.MEMBER.INVITATION_SHORT_URL_ADDED);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<WSTeamMembersInterface>();
  const defaultMembersColumns = [
    columnHelper.display({
      id: ZMembersListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: _ => {
        return <ZIonCheckbox />;
      }
    }),

    // Email
    columnHelper.accessor(itemData => itemData.email, {
      header: 'Email',
      id: ZMembersListPageTableColumnsIds.email,
      footer: 'Email',
      cell: row => {
        return (
          <>
            {row?.getValue() !== null ? (
              <div className='flex ion-align-items-center'>
                <div className='text-sm ZaionsTextEllipsis'>
                  {row.getValue()}
                </div>
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // Role
    columnHelper.accessor('memberRole', {
      header: 'Role',
      id: ZMembersListPageTableColumnsIds.role,
      cell: ({ row }) => {
        return <>{row?.original?.memberRole?.name}</>;
      },
      footer: 'Role'
    }),

    // status
    columnHelper.accessor(itemData => itemData.accountStatus, {
      header: 'Status',
      id: ZMembersListPageTableColumnsIds.status,
      cell: row => {
        const value = row.getValue();
        return (
          <ZIonChip
            className='p-0 px-3 py-[2px] cursor-auto h-max'
            color={
              value === ZTeamMemberInvitationEnum.pending
                ? 'warning'
                : value === ZTeamMemberInvitationEnum.accepted
                  ? 'success'
                  : value === ZTeamMemberInvitationEnum.rejected ||
                      value === ZTeamMemberInvitationEnum.cancel ||
                      value === ZTeamMemberInvitationEnum.leaved
                    ? 'danger'
                    : value === ZTeamMemberInvitationEnum.resend
                      ? 'secondary'
                      : 'dark'
            }>
            {row.getValue()}
          </ZIonChip>
        );
      },
      footer: 'Status'
    }),

    // Invited at
    // columnHelper.accessor(itemData => itemData.invitedAt, {
    //   header: 'Invited at',
    //   id: ZMembersListPageTableColumnsIds.invitedAt,
    //   footer: 'Invited at'
    // }),

    // Invited accepted at '"inviteAcceptedAt"|"inviteRejectedAt"',
    columnHelper.accessor(itemData => itemData.inviteAcceptedAt, {
      header: 'Updated At',
      id: ZMembersListPageTableColumnsIds.invitedAcceptedAt,
      cell: row => {
        return (
          <>
            {row?.row?.original?.inviteAcceptedAt !== null
              ? `Accepted at: ${row?.row?.original?.inviteAcceptedAt}`
              : row?.row?.original?.inviteRejectedAt !== null
                ? `Rejected at: ${row?.row?.original?.inviteRejectedAt}`
                : CONSTANTS.NO_VALUE_FOUND}
          </>
        );
      },
      footer: 'Updated At'
    }),

    // shortUrlId
    columnHelper.accessor(itemData => itemData.shortUrlId, {
      header: 'Link to share',
      id: ZMembersListPageTableColumnsIds.linkToShare,
      cell: row => {
        const value = row.getValue();
        return (
          <ZIonText
            color={
              value !== null && value !== undefined ? 'primary' : 'tertiary'
            }
            className='cursor-pointer hover:underline'
            onClick={() => {
              if (value !== undefined && value !== null) {
                void navigator.clipboard.writeText(
                  `${ENVS.defaultShortUrlDomain}/${CONSTANTS.SHORT_LINK.invitationSLStaticPath}/${value}`
                );

                void presentZIonToast('✨ Copied', 'tertiary');
              } else {
                void addInvitationShortLink(row?.row?.original?.id ?? '');
              }
            }}>
            {value !== undefined
              ? `${ENVS.defaultShortUrlDomain}/${CONSTANTS.SHORT_LINK.invitationSLStaticPath}/${value}`
              : 'Create invite link'}
          </ZIonText>
        );
      },
      footer: 'Link to share'
    })
  ];

  const zMembersTable = useReactTable({
    columns: defaultMembersColumns,
    data: filteredMembersDataRSelector ?? [],
    state: {
      columnOrder: getMemberFiltersData?.settings?.columnOrderIds ?? []
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  });
  // #endregion

  // #region useEffect's
  useEffect(() => {
    try {
      zMembersTable.setPageIndex(
        isNaN(Number(pageindex))
          ? CONSTANTS.pagination.startingPageIndex
          : Number(pageindex)
      );
      zMembersTable.setPageSize(
        isNaN(Number(pagesize))
          ? CONSTANTS.pagination.defaultPageSize
          : Number(pagesize)
      );
    } catch (error) {
      zMembersTable.setPageIndex(CONSTANTS.pagination.startingPageIndex);
      zMembersTable.setPageSize(CONSTANTS.pagination.defaultPageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (
        getMemberFiltersData?.settings?.columns !== null &&
        getMemberFiltersData?.settings?.columns !== undefined
      ) {
        const _getEmailColumn = getMemberFiltersData?.settings?.columns?.filter(
          el => el?.id === ZMembersListPageTableColumnsIds.email
        )[0];

        const _getRoleColumn = getMemberFiltersData?.settings?.columns?.filter(
          el => el?.id === ZMembersListPageTableColumnsIds.role
        )[0];

        const _getStatusColumn =
          getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.status
          )[0];

        const _getInvitedAtColumn =
          getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.invitedAt
          )[0];

        const _geInvitedAcceptedAtColumn =
          getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.invitedAcceptedAt
          )[0];

        if (_getInvitedAtColumn !== undefined) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.invitedAt)
            ?.toggleVisibility(_getInvitedAtColumn?.isVisible);
        }

        if (_getEmailColumn !== undefined) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.email)
            ?.toggleVisibility(_getEmailColumn?.isVisible);
        }

        if (_getRoleColumn !== undefined) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.role)
            ?.toggleVisibility(_getRoleColumn?.isVisible);
        }

        if (_geInvitedAcceptedAtColumn !== undefined) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.invitedAcceptedAt)
            ?.toggleVisibility(_geInvitedAcceptedAtColumn?.isVisible);
        }

        if (_getStatusColumn !== undefined) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.status)
            ?.toggleVisibility(_getStatusColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMemberFiltersData]);

  useEffect(() => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0 &&
        membersData !== undefined &&
        membersData !== null
      ) {
        setMembersDataRState(membersData ?? []);
      } else if (
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0 &&
        swsMembersData !== undefined &&
        swsMembersData !== null
      ) {
        setMembersDataRState(swsMembersData ?? []);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, membersData, swsMembersData, wsShareId, shareWSMemberId]);

  useEffect(() => {
    try {
      if (getMemberFiltersData !== undefined && getMemberFiltersData !== null) {
        setMembersFilterOptionsRState(oldValues => ({
          ...oldValues,
          role: getMemberFiltersData?.settings?.filters
            ?.role as WSRolesNameEnum,
          status: getMemberFiltersData?.settings?.filters
            ?.status as ZTeamMemberInvitationEnum
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMemberFiltersData]);

  // #endregion

  return (
    <div>
      <ZCustomScrollable
        className='w-full overflow-hidden border rounded-lg h-max ion-no-padding zaions__light_bg'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zMembersTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
            return (
              <ZIonRow
                key={_headerIndex}
                className='flex flex-nowrap zaions__light_bg'>
                {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                  return (
                    <ZIonCol
                      key={_columnInfo.id}
                      className={classNames({
                        'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                          true,
                        'border-r': false
                      })}
                      size={
                        _columnInfo.column.id ===
                          ZMembersListPageTableColumnsIds.id ||
                        _columnInfo.column.id ===
                          ZMembersListPageTableColumnsIds.actions
                          ? '1.2'
                          : '2.5'
                      }>
                      {_columnInfo.column.columnDef.header?.toString()}
                    </ZIonCol>
                  );
                })}

                <ZCan
                  shareWSId={wsShareId}
                  checkMode={permissionCheckModeEnum.any}
                  permissionType={
                    wsShareId !== null &&
                    wsShareId !== undefined &&
                    wsShareId?.trim()?.length > 0 &&
                    shareWSMemberId !== undefined &&
                    shareWSMemberId !== null &&
                    shareWSMemberId?.trim()?.length > 0
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0
                      ? [
                          permissionsEnum.update_ws_member,
                          permissionsEnum.delete_ws_member,
                          permissionsEnum.resend_invitation_ws_member,
                          permissionsEnum.update_memberRole_ws_member
                        ]
                      : wsShareId !== null &&
                          wsShareId !== undefined &&
                          wsShareId?.trim()?.length > 0 &&
                          shareWSMemberId !== undefined &&
                          shareWSMemberId !== null &&
                          shareWSMemberId?.trim()?.length > 0
                        ? [
                            shareWSPermissionEnum.update_sws_member,
                            shareWSPermissionEnum.delete_sws_member,
                            shareWSPermissionEnum.resend_invitation_sws_member,
                            shareWSPermissionEnum.update_memberRole_sws_member
                          ]
                        : []
                  }>
                  <ZIonCol
                    size='.8'
                    className={classNames({
                      'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                        true,
                      'border-r': false
                    })}>
                    Actions
                  </ZIonCol>
                </ZCan>
              </ZIonRow>
            );
          })}

          {/* Body Section */}
          <ZIonRow className='rounded-b-lg zaions__light_bg'>
            <ZIonCol
              size='12'
              className='w-full ion-no-padding'>
              {zMembersTable?.getRowModel().rows.map((_rowInfo, _rowIndex) => {
                return (
                  <ZIonRow
                    key={_rowIndex}
                    className='flex-nowrap'>
                    {_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
                      _cellInfo.column.getIsVisible() ? (
                        <ZIonCol
                          key={_cellIndex}
                          size={
                            _cellInfo.column.id ===
                              ZMembersListPageTableColumnsIds.id ||
                            _cellInfo.column.id ===
                              ZMembersListPageTableColumnsIds.actions
                              ? '1.2'
                              : '2.5'
                          }
                          className={classNames({
                            'py-1 mt-1 border-b flex ion-align-items-center':
                              true,
                            'border-r': false,
                            'ps-2':
                              _cellInfo.column.id !==
                              ZMembersListPageTableColumnsIds.id,
                            'ps-0':
                              _cellInfo.column.id ===
                              ZMembersListPageTableColumnsIds.id
                          })}>
                          <div
                            className={classNames({
                              'w-full text-sm ZaionsTextEllipsis': true,
                              'ps-3':
                                _cellInfo.column.id ===
                                ZMembersListPageTableColumnsIds.id
                            })}>
                            {flexRender(
                              _cellInfo.column.columnDef.cell,
                              _cellInfo.getContext()
                            )}
                          </div>
                        </ZIonCol>
                      ) : null
                    )}

                    <ZCan
                      shareWSId={wsShareId}
                      checkMode={permissionCheckModeEnum.any}
                      permissionType={
                        wsShareId !== null &&
                        wsShareId !== undefined &&
                        wsShareId?.trim()?.length > 0 &&
                        shareWSMemberId !== undefined &&
                        shareWSMemberId !== null &&
                        shareWSMemberId?.trim()?.length > 0
                          ? permissionsTypeEnum.shareWSMemberPermissions
                          : permissionsTypeEnum.loggedInUserPermissions
                      }
                      havePermissions={
                        workspaceId !== undefined &&
                        workspaceId !== null &&
                        (workspaceId?.trim()?.length ?? 0) > 0
                          ? [
                              permissionsEnum.update_ws_member,
                              permissionsEnum.delete_ws_member,
                              permissionsEnum.resend_invitation_ws_member,
                              permissionsEnum.update_memberRole_ws_member
                            ]
                          : wsShareId !== null &&
                              wsShareId !== undefined &&
                              wsShareId?.trim()?.length > 0 &&
                              shareWSMemberId !== undefined &&
                              shareWSMemberId !== null &&
                              shareWSMemberId?.trim()?.length > 0
                            ? [
                                shareWSPermissionEnum.update_sws_member,
                                shareWSPermissionEnum.delete_sws_member,
                                shareWSPermissionEnum.resend_invitation_sws_member,
                                shareWSPermissionEnum.update_memberRole_sws_member
                              ]
                            : []
                      }>
                      <ZIonCol
                        size='.8'
                        className={classNames({
                          'py-1 mt-1 border-b ps-2 ion-justify-content-center flex ion-align-items-center':
                            true,
                          'border-r': false
                        })}>
                        <ZIonButton
                          fill='clear'
                          color='dark'
                          className='ion-no-padding ion-no-margin'
                          size='small'
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.listPage.table
                              .actionPopoverBtn
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.actionPopoverBtn}-${_rowInfo.original.id}`}
                          onClick={(_event: unknown) => {
                            setCompState(oldVal => ({
                              ...oldVal,
                              selectedMemberId: _rowInfo.original.id ?? '',
                              selectedMemberEmail:
                                _rowInfo.original.email ?? '',
                              selectedMemberRole:
                                _rowInfo.original.memberRole.name,
                              selectedShortUrlKey: _rowInfo.original.shortUrlId
                            }));

                            //
                            presentZMemberActionPopover({
                              _event: _event as Event,
                              _cssClass: 'z_member_table_action_popover_width',
                              _dismissOnSelect: false
                            });
                          }}>
                          <ZIonIcon icon={ellipsisVerticalOutline} />
                        </ZIonButton>
                      </ZIonCol>
                    </ZCan>
                  </ZIonRow>
                );
              })}
            </ZIonCol>
          </ZIonRow>
        </div>
      </ZCustomScrollable>

      <ZIonRow className='w-full px-2 pt-1 pb-2 mt-2 overflow-hidden border rounded-lg ion-align-items-center zaions__light_bg'>
        <ZIonCol className='flex mt-1 ps-1 ion-align-items-center'>
          {/* previous buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zMembersTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zMembersTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Members,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex: 0,
                          pagesize: zMembersTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== null &&
                        wsShareId !== undefined &&
                        wsShareId?.trim()?.length > 0 &&
                        shareWSMemberId !== undefined &&
                        shareWSMemberId !== null &&
                        shareWSMemberId?.trim()?.length > 0
                      ? createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          values: [wsShareId, shareWSMemberId],
                          routeSearchParams: {
                            pageindex: 0,
                            pagesize: zMembersTable
                              .getState()
                              .pagination.pageSize.toString()
                          }
                        })
                      : ''
                );

                zMembersTable.setPageIndex(0);
              }
            }}>
            <ZIonIcon
              icon={playBackOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zMembersTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .previousButton
            }
            onClick={() => {
              if (zMembersTable.getCanPreviousPage()) {
                zMembersTable.previousPage();

                zNavigatePushRoute(
                  workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Members,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex:
                            zMembersTable.getState().pagination.pageIndex - 1,
                          pagesize: zMembersTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== null &&
                        wsShareId !== undefined &&
                        wsShareId?.trim()?.length > 0 &&
                        shareWSMemberId !== undefined &&
                        shareWSMemberId !== null &&
                        shareWSMemberId?.trim()?.length > 0
                      ? createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          values: [wsShareId, shareWSMemberId],
                          routeSearchParams: {
                            pageindex:
                              zMembersTable.getState().pagination.pageIndex - 1,
                            pagesize: zMembersTable
                              .getState()
                              .pagination.pageSize.toString()
                          }
                        })
                      : ''
                );
              }
            }}>
            <ZIonIcon
              icon={chevronBackOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          {/* next buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zMembersTable?.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .nextButton
            }
            onClick={() => {
              if (zMembersTable.getCanNextPage()) {
                zMembersTable.nextPage();

                zNavigatePushRoute(
                  workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Members,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex:
                            zMembersTable.getState().pagination.pageIndex + 1,
                          pagesize: zMembersTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== null &&
                        wsShareId !== undefined &&
                        wsShareId?.trim()?.length > 0 &&
                        shareWSMemberId !== undefined &&
                        shareWSMemberId !== null &&
                        shareWSMemberId?.trim()?.length > 0
                      ? createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          values: [wsShareId, shareWSMemberId],
                          routeSearchParams: {
                            pageindex:
                              zMembersTable.getState().pagination.pageIndex + 1,
                            pagesize: zMembersTable
                              .getState()
                              .pagination.pageSize.toString()
                          }
                        })
                      : ''
                );
              }
            }}>
            <ZIonIcon
              icon={chevronForwardOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>

          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zMembersTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zMembersTable.getCanNextPage()) {
                zMembersTable.setPageIndex(zMembersTable.getPageCount() - 1);

                zNavigatePushRoute(
                  workspaceId !== undefined &&
                    workspaceId !== null &&
                    (workspaceId?.trim()?.length ?? 0) > 0
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .Members,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId],
                        routeSearchParams: {
                          pageindex: zMembersTable.getPageCount() - 1,
                          pagesize: zMembersTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId !== null &&
                        wsShareId !== undefined &&
                        wsShareId?.trim()?.length > 0 &&
                        shareWSMemberId !== undefined &&
                        shareWSMemberId !== null &&
                        shareWSMemberId?.trim()?.length > 0
                      ? createRedirectRoute({
                          url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          params: [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          values: [wsShareId, shareWSMemberId],
                          routeSearchParams: {
                            pageindex: zMembersTable.getPageCount() - 1,
                            pagesize: zMembersTable
                              .getState()
                              .pagination.pageSize.toString()
                          }
                        })
                      : ''
                );
              }
            }}>
            <ZIonIcon
              icon={playForwardOutline}
              slot='icon-only'
              className='w-5 h-5'
            />
          </ZIonButton>
        </ZIonCol>

        {/* Col for pagination number like 1,2,3,...,n */}
        <ZIonCol></ZIonCol>

        <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
          <ZIonText className='mt-1 font-semibold me-3'>
            {filteredMembersDataRSelector?.length ?? 0}{' '}
            {filteredMembersDataRSelector?.length === 1 ? 'Member' : 'Members'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='zaions__bg_white w-[7rem] mt-1'
            value={
              zMembersTable.getState().pagination.pageSize ??
              CONSTANTS.pagination.defaultPageSize
            }
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .pageSizeInput
            }
            onIonChange={e => {
              zMembersTable.setPageSize(Number(e.target.value));

              if (
                workspaceId !== undefined &&
                workspaceId !== null &&
                (workspaceId?.trim()?.length ?? 0) > 0
              ) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                      .Members,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId],
                    routeSearchParams: {
                      pageindex: zMembersTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              } else if (
                wsShareId !== null &&
                wsShareId !== undefined &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
              ) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                      .Members,
                    params: [
                      CONSTANTS.RouteParams.workspace.wsShareId,
                      CONSTANTS.RouteParams.workspace.shareWSMemberId
                    ],
                    values: [wsShareId, shareWSMemberId],
                    routeSearchParams: {
                      pageindex: zMembersTable.getPageCount() - 1,
                      pagesize: Number(e.target.value)
                    }
                  })
                );
              }
            }}>
            {CONSTANTS.pagination.pageSizeOptions.map(pageSize => (
              <ZIonSelectOption
                key={pageSize}
                value={pageSize}
                className='h-[2.3rem]'>
                Show {pageSize}
              </ZIonSelectOption>
            ))}
          </ZIonSelect>
        </ZIonCol>
      </ZIonRow>
    </div>
  );
};

const ZMemberActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string; // if owned workspace then this will be id of owned workspace.
  wsShareId: string; // if share workspace then this will be id of share workspace.
  shareWSMemberId: string; // if share workspace then this will be id of current member.
  membersId: string; // this will be the item id, we are listing member if we click action btn of any member then this will be the id of that member/item
  email: string;
  role: WSRolesNameEnum;
}> = ({
  dismissZIonPopover,
  workspaceId,
  membersId,
  email,
  role,
  wsShareId,
  shareWSMemberId
}) => {
  const [compState, setCompState] = useState<{
    currentMemberData?: WSTeamMembersInterface;
  }>();

  // #region custom hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  // #endregion

  // #region APIS.
  // If owner then this api is used to resent invitation to the members.
  const { mutateAsync: resendInviteMemberAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.member_resendInvite_list,
    _loaderMessage: 'Resending invitation.'
  });

  // If member and has permission to resent invitation then this api is used to resent invitation to other members.
  const { mutateAsync: resendInviteSWSMemberAsyncMutate } = useZRQUpdateRequest(
    {
      _url: API_URL_ENUM.sws_member_resendInvite_list,
      _loaderMessage: 'Resending invitation.'
    }
  );

  // If owner then this api is used to cancel invitation.
  const { mutateAsync: updateInvitationAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.member_update,
    _loaderMessage: 'Canceling invitation...'
  });

  // If member and has permission to cancel invitation then this api is used to cancel invitation.
  const { mutateAsync: updateSWSInvitationAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.sws_member_update,
    _loaderMessage: 'Canceling invitation...'
  });

  // If owner then this api is used to delete invitation.
  const { mutateAsync: deleteInvitationAsyncMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.member_invite_delete
  });

  // If member and has permission to delete invitation then this api is used to delete invitation.
  const { mutateAsync: deleteSWSInvitationAsyncMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.sws_member_invite_delete
  });
  // #endregion

  // #region useEffects
  useEffect(() => {
    try {
      let _allMemberRQCacheData;
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        _allMemberRQCacheData = getRQCDataHandler({
          key: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
            workspaceId
          ]
        });
      } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
        _allMemberRQCacheData = getRQCDataHandler({
          key: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
            wsShareId
          ]
        });
      }

      const _allMember =
        extractInnerData<WSTeamMembersInterface[]>(
          _allMemberRQCacheData ?? [],
          extractInnerDataOptionsEnum.createRequestResponseItems
        ) ?? [];

      const _currentMember = _allMember?.find(el => el.id === membersId);

      if (_currentMember !== undefined) {
        setCompState(oldValues => ({
          ...oldValues,
          currentMemberData: _currentMember
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, wsShareId, shareWSMemberId]);
  // #endregion

  // #region Modals & popovers.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      role,
      email,
      wsShareId,
      workspaceId,
      shareWSMemberId,
      id: membersId,
      formMode: FormMode.EDIT,
      Tab: WorkspaceSharingTabEnum.invite
    }
  );
  // #endregion

  // #region Functions.
  const ZResendInvitationHandler = async (): Promise<void> => {
    try {
      let _response;

      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        _response = await resendInviteMemberAsyncMutate({
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.invitationId
          ],
          itemIds: [workspaceId, membersId],
          requestData: ''
        });
      } else if (
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        _response = await resendInviteSWSMemberAsyncMutate({
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSMemberId,
            CONSTANTS.RouteParams.workspace.invitationId
          ],
          itemIds: [shareWSMemberId, membersId],
          requestData: ''
        });
      }

      if ((_response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
        const _data = extractInnerData<WSTeamMembersInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== null && _data?.id !== undefined) {
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ],
              data: _data,
              id: _data?.id
            });
          } else if (
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                wsShareId
              ],
              data: _data,
              id: _data?.id
            });
          }

          showSuccessNotification(MESSAGES.MEMBER.INVITE_RESEND);

          dismissZIonPopover('', '');
        }
      }
    } catch (error) {
      // if (error instanceof AxiosError) {
      //   // const _apiErrors = (error.response?.data as { errors: ZGenericObject })
      //   //   ?.errors;
      // }
      reportCustomError(error);
    }
  };

  // Cancel invitation alert.
  const ZCancelInvitationAlert = async (): Promise<void> => {
    try {
      if (membersId !== undefined) {
        await presentZIonAlert({
          header: MESSAGES.MEMBER.CANCEL_ALERT.HEADER,
          subHeader: MESSAGES.MEMBER.CANCEL_ALERT.SUB_HEADER,
          message: MESSAGES.MEMBER.CANCEL_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Close',
              role: 'cancel'
            },
            {
              text: 'Cancel',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void ZCancelInvitation();
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

  const ZCancelInvitation = async (): Promise<void> => {
    try {
      const _stringifyData = zStringify({
        status: ZTeamMemberInvitationEnum.cancel
      });

      let _response;
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        _response = await updateInvitationAsyncMutate({
          itemIds: [workspaceId, membersId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: _stringifyData
        });
      } else if (
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        _response = await updateSWSInvitationAsyncMutate({
          itemIds: [shareWSMemberId, membersId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSMemberId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: _stringifyData
        });
      }

      if (_response !== undefined) {
        const _data = extractInnerData<WSTeamMembersInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== undefined && _data?.id !== null) {
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ],
              data: _data,
              id: _data?.id
            });
          } else if (
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                wsShareId
              ],
              data: _data,
              id: _data?.id
            });
          }

          showSuccessNotification(MESSAGES.MEMBER.CANCELED);

          dismissZIonPopover('', '');
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when user won't to delete Invitation and click on the delete button this function will fire and show the confirm alert.
  const deleteMember = async (): Promise<void> => {
    try {
      if (membersId !== undefined) {
        await presentZIonAlert({
          header: MESSAGES.MEMBER.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.MEMBER.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.MEMBER.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void ZDeleteInvitation();
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

  const ZDeleteInvitation = async (): Promise<void> => {
    try {
      let _response;

      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ) {
        _response = await deleteInvitationAsyncMutate({
          itemIds: [workspaceId, membersId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ]
        });
      } else if (
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        _response = await deleteSWSInvitationAsyncMutate({
          itemIds: [shareWSMemberId, membersId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSMemberId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ]
        });
      }

      if (_response !== undefined) {
        const _data = extractInnerData<{ success: boolean }>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data !== undefined && _data?.success) {
          // getting all the members from RQ cache.
          let _oldMembers: WSTeamMembersInterface[] = [];
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
          ) {
            _oldMembers =
              extractInnerData<WSTeamMembersInterface[]>(
                getRQCDataHandler<WSTeamMembersInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                    workspaceId
                  ]
                }) as WSTeamMembersInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];
          } else if (
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            _oldMembers =
              extractInnerData<WSTeamMembersInterface[]>(
                getRQCDataHandler<WSTeamMembersInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE
                      .SWS_MEMBERS_MAIN,
                    wsShareId
                  ]
                }) as WSTeamMembersInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];
          }

          // removing deleted members from cache.
          const _updatedMembers = _oldMembers?.filter(
            el => el.id !== membersId
          );

          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ],
              data: _updatedMembers,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItems
            });
          } else if (
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                wsShareId
              ],
              data: _updatedMembers,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItems
            });
          }

          showSuccessNotification(MESSAGES.MEMBER.DELETED);

          dismissZIonPopover('', '');
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId !== null &&
          wsShareId !== undefined &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          workspaceId !== undefined &&
          workspaceId !== null &&
          (workspaceId?.trim()?.length ?? 0) > 0
            ? [permissionsEnum.update_ws_member]
            : wsShareId !== null &&
                wsShareId !== undefined &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
              ? [shareWSPermissionEnum.update_sws_member]
              : []
        }>
        {/* Edit Role */}
        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
              ? [permissionsEnum.update_memberRole_ws_member]
              : wsShareId !== null &&
                  wsShareId !== undefined &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [shareWSPermissionEnum.update_memberRole_sws_member]
                : []
          }>
          <ZIonItem
            button={true}
            detail={false}
            minHeight='2.5rem'
            testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn}-${membersId}`}
            testinglistselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn
            }
            onClick={() => {
              presentWorkspaceSharingModal({
                _cssClass: 'workspace-sharing-modal-size'
              });

              dismissZIonPopover('', '');
            }}>
            <ZIonButton
              size='small'
              expand='full'
              fill='clear'
              color='light'>
              <ZIonIcon
                icon={createOutline}
                className='w-5 h-5 me-2'
                color='secondary'
              />
              <ZIonText
                color='secondary'
                className='text-[.9rem] pt-1'>
                Edit role
              </ZIonText>
            </ZIonButton>
          </ZIonItem>
        </ZCan>

        {/* Resend invite link */}
        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
              ? [permissionsEnum.resend_invitation_ws_member]
              : wsShareId !== null &&
                  wsShareId !== undefined &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [shareWSPermissionEnum.resend_invitation_sws_member]
                : []
          }>
          {compState?.currentMemberData?.accountStatus !==
            ZTeamMemberInvitationEnum.accepted && (
            <div
              className={classNames({
                'cursor-not-allowed':
                  compState?.currentMemberData?.resendAllowedAfter?.trim()
                    ?.length !== 0 &&
                  dayjs(
                    compState?.currentMemberData?.resendAllowedAfter
                  ).isAfter(dayjs())
              })}>
              <ZIonItem
                button={true}
                detail={false}
                minHeight='2.5rem'
                testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.resendInvitation}-${membersId}`}
                testinglistselector={
                  CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                    .resendInvitation
                }
                onClick={() => {
                  void (async () => {
                    if (
                      compState?.currentMemberData?.resendAllowedAfter?.trim()
                        ?.length !== 0 &&
                      dayjs(
                        compState?.currentMemberData?.resendAllowedAfter
                      ).isBefore(dayjs())
                    ) {
                      await ZResendInvitationHandler();
                    }
                  })();
                }}
                disabled={
                  compState?.currentMemberData?.resendAllowedAfter?.trim()
                    ?.length !== 0 &&
                  dayjs(
                    compState?.currentMemberData?.resendAllowedAfter
                  ).isAfter(dayjs())
                }>
                <ZIonButton
                  size='small'
                  expand='full'
                  fill='clear'
                  color='light'>
                  <ZIonIcon
                    icon={sendOutline}
                    className='w-5 h-5 me-2'
                    color='primary'
                  />
                  <ZIonText
                    color='primary'
                    className='text-[.9rem] pt-1'>
                    Resend invite link
                  </ZIonText>
                </ZIonButton>
              </ZIonItem>
            </div>
          )}
        </ZCan>

        {/* Cancel */}
        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
              ? [permissionsEnum.cancel_invitation_ws_member]
              : wsShareId !== null &&
                  wsShareId !== undefined &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [shareWSPermissionEnum.cancel_invitation_sws_member]
                : []
          }>
          {(compState?.currentMemberData?.accountStatus ===
            ZTeamMemberInvitationEnum.pending ||
            compState?.currentMemberData?.accountStatus ===
              ZTeamMemberInvitationEnum.resend) && (
            <ZIonItem
              button={true}
              detail={false}
              minHeight='2.5rem'
              testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.cancelBtn}-${membersId}`}
              testinglistselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                  .cancelBtn
              }
              onClick={() => {
                void ZCancelInvitationAlert();
              }}>
              <ZIonButton
                size='small'
                expand='full'
                fill='clear'
                color='light'
                className='ion-text-capitalize'>
                <ZIonIcon
                  icon={closeOutline}
                  className='w-5 h-5 me-2'
                  color='danger'
                />
                <ZIonText
                  color='danger'
                  className='text-[.9rem] pt-1'>
                  Cancel
                </ZIonText>
              </ZIonButton>
            </ZIonItem>
          )}
        </ZCan>

        {/* Delete */}
        <ZCan
          shareWSId={wsShareId}
          permissionType={
            wsShareId !== null &&
            wsShareId !== undefined &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
              ? permissionsTypeEnum.shareWSMemberPermissions
              : permissionsTypeEnum.loggedInUserPermissions
          }
          havePermissions={
            workspaceId !== undefined &&
            workspaceId !== null &&
            (workspaceId?.trim()?.length ?? 0) > 0
              ? [permissionsEnum.delete_ws_member]
              : wsShareId !== null &&
                  wsShareId !== undefined &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [shareWSPermissionEnum.delete_sws_member]
                : []
          }>
          {(compState?.currentMemberData?.accountStatus ===
            ZTeamMemberInvitationEnum.cancel ||
            compState?.currentMemberData?.accountStatus ===
              ZTeamMemberInvitationEnum.rejected) && (
            <ZIonItem
              button={true}
              detail={false}
              minHeight='2.5rem'
              testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn}-${membersId}`}
              testinglistselector={
                CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                  .deleteBtn
              }
              onClick={() => {
                void deleteMember();
              }}>
              <ZIonButton
                size='small'
                expand='full'
                fill='clear'
                color='light'
                className='ion-text-capitalize'>
                <ZIonIcon
                  icon={trashBinOutline}
                  className='w-5 h-5 me-2'
                  color='danger'
                />
                <ZIonText
                  color='danger'
                  className='text-[.9rem] pt-1'>
                  Delete
                </ZIonText>
              </ZIonButton>
            </ZIonItem>
          )}
        </ZCan>
      </ZCan>
    </ZIonList>
  );
};

// Skeleton.
const ZaionsMembersTableSkeleton: React.FC = React.memo(() => {
  return (
    <div className='w-full overflow-y-hidden border rounded-lg ms-1 h-max zaions_pretty_scrollbar ion-no-padding'>
      {/* Row-1 */}
      <ZIonRow className='flex mb-2 flex-nowrap zaions__light_bg'>
        {/* Col-1 */}
        <ZIonCol
          size='.8'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.3rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-2 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.4rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-3 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='2.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-4 */}
        <ZIonCol className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='4.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>

        {/* Col-5 */}
        <ZIonCol
          size='3'
          className='text-sm font-bold border-b ps-2 zaions__light_bg'>
          <ZIonSkeletonText
            width='4.5rem'
            height='.8rem'
            animated={true}
          />
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='rounded-b-lg'>
        <ZIonCol
          size='12'
          className='w-full ion-no-padding'>
          {[1, 2].map(el => {
            return (
              <ZIonRow
                className='flex-nowrap'
                key={el}>
                {/* Row-2 Col-1 */}
                <ZIonCol
                  size='.8'
                  className='flex py-1 mt-1 border-b ps-4 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='1rem'
                    height='1rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='2.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='4.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='2.3'
                  className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='3.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>

                <ZIonCol
                  size='3'
                  className='flex py-1 mt-1 border-b ps-1 ion-align-items-center'>
                  <ZIonSkeletonText
                    width='3.3rem'
                    height='.8rem'
                    animated={true}
                  />
                </ZIonCol>
              </ZIonRow>
            );
          })}
        </ZIonCol>
      </ZIonRow>
    </div>
  );
});
ZaionsMembersTableSkeleton.displayName = 'ZaionsMembersTableSkeleton';

export default React.memo(ZMembersListTable);
