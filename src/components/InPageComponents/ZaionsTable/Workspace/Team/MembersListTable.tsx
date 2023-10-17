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
import { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCan from '@/components/Can';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonBadge,
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
  useZIonPopover
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
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  WSRolesNameEnum,
  WorkspaceSharingTabEnum,
  WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import {
  FormMode,
  ZMembersListPageTableColumnsIds,
  ZTeamMemberInvitationEnum,
  ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  FilteredMembersDataRStateSelector,
  MembersAccountsRStateAtom
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
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region APIS.
  // If owned-workspace then this api will fetch members in this owned-workspace.
  const { data: membersData, isFetching: isMembersFetching } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true
  });

  // If share-workspace then this api will fetch members in this share-workspace.
  const { data: swsMembersData, isFetching: isSWSMembersFetching } =
    useZRQGetRequest<WSTeamMembersInterface[]>({
      _url: API_URL_ENUM.member_getAllInvite_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
        wsShareId
      ],
      _itemsIds: [shareWSMemberId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true
    });

  // If share-workspace then this api will fetch role & permission of current member in this share-workspace.
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
      wsShareId
    ],
    _url: API_URL_ENUM.ws_share_member_role_permissions,
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
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
      workspaceId: workspaceId
    }
  );
  // #endregion

  let isZFetching = isMembersFetching;

  if (wsShareId && shareWSMemberId) {
    isZFetching = isSWSMembersFetching;
  }

  return (
    <>
      {isZFetching && <ZaionsMembersTableSkeleton />}

      {!isZFetching ? (
        (membersData && membersData?.length > 0) ||
        (swsMembersData && swsMembersData?.length > 0) ? (
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
                ) || workspaceId
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
                  workspaceId
                ) {
                  presentWorkspaceSharingModal({
                    _cssClass: 'workspace-sharing-modal-size'
                  });
                }
              }}
              showBtn={
                [
                  shareWSPermissionEnum.send_invitation_sws_member,
                  shareWSPermissionEnum.create_sws_member,
                  shareWSPermissionEnum.update_sws_member
                ].some(el =>
                  getMemberRolePermissions?.memberPermissions?.includes(el)
                ) || workspaceId
                  ? true
                  : false
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
  }>({});
  // #endregion

  // getting current workspace id form params.
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Recoil state.
  const setMembersDataRState = useSetRecoilState(MembersAccountsRStateAtom);
  const filteredMembersDataRSelector = useRecoilValue(
    FilteredMembersDataRStateSelector
  );
  // #endregion

  // #region APIS.
  // If owned-workspace then this api will fetch members in this owned-workspace.
  const { data: membersData, isFetching: isMembersFetching } = useZRQGetRequest<
    WSTeamMembersInterface[]
  >({
    _url: API_URL_ENUM.member_getAllInvite_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true
  });

  // If share-workspace then this api will fetch members in this share-workspace.
  const { data: swsMembersData, isFetching: isSWSMembersFetching } =
    useZRQGetRequest<WSTeamMembersInterface[]>({
      _url: API_URL_ENUM.member_getAllInvite_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
        wsShareId
      ],
      _itemsIds: [shareWSMemberId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
      _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true
    });

  const {
    data: getMemberFiltersData,
    isFetching: isMemberFiltersDataFetching
  } = useZRQGetRequest<ZUserSettingInterface>({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
      ZUserSettingTypeEnum.membersListPageTable
    ],
    _itemsIds: [workspaceId!, ZUserSettingTypeEnum.membersListPageTable],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.settings.type
    ],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: workspaceId ? false : true
  });

  const {
    data: getSWSMemberFiltersData,
    isFetching: isSWSMemberFiltersDataFetching
  } = useZRQGetRequest<ZUserSettingInterface>({
    _url: API_URL_ENUM.sws_user_setting_delete_update_get,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
      ZUserSettingTypeEnum.membersListPageTable
    ],
    _itemsIds: [shareWSMemberId!, ZUserSettingTypeEnum.membersListPageTable],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.shareWSMemberId,
      CONSTANTS.RouteParams.settings.type
    ],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true
  });
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZMemberActionPopover } = useZIonPopover(
    ZMemberActionPopover,
    {
      workspaceId: workspaceId,
      membersId: compState.selectedMemberId,
      email: compState.selectedMemberEmail,
      role: compState.selectedMemberRole
    }
  );
  // #endregion

  // #region Custom hooks
  const { zNavigatePushRoute } = useZNavigate();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
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
            {row.getValue() ? (
              <div className='flex ion-align-items-center'>
                <div className='text-sm ZaionsTextEllipsis'>
                  {row.getValue()}
                </div>
                {/* <ZIonText
									color='primary'
									className='text-sm cursor-pointer'
									testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.description}-${row.row.original.id}`}
									testinglistselector={
										CONSTANTS.testingSelectors.WSSettings.teamListPage.table
											.description
									}
								>
									Read more
								</ZIonText> */}
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
            {row?.row?.original?.inviteAcceptedAt
              ? `Accepted at: ${row?.row?.original?.inviteAcceptedAt}`
              : row?.row?.original?.inviteRejectedAt
              ? `Rejected at: ${row?.row?.original?.inviteRejectedAt}`
              : CONSTANTS.NO_VALUE_FOUND}
          </>
        );
      },
      footer: 'Updated At'
    })
  ];

  const zMembersTable = useReactTable({
    columns: defaultMembersColumns,
    data: filteredMembersDataRSelector || [],
    state: {
      columnOrder: workspaceId
        ? getMemberFiltersData?.settings?.columnOrderIds
        : wsShareId && shareWSMemberId
        ? getSWSMemberFiltersData?.settings?.columnOrderIds
        : []
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
    zMembersTable.setPageIndex(Number(pageindex) || 0);
    zMembersTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (
        getMemberFiltersData?.settings?.columns ||
        getSWSMemberFiltersData?.settings?.columns
      ) {
        let __getEmailColumn;
        let __getRoleColumn;
        let __getStatusColumn;
        let __getInvitedAtColumn;
        let __geInvitedAcceptedAtColumn;

        if (workspaceId) {
          __getEmailColumn = getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.email
          )[0];

          __getRoleColumn = getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.role
          )[0];

          __getStatusColumn = getMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.status
          )[0];

          __getInvitedAtColumn =
            getMemberFiltersData?.settings?.columns?.filter(
              el => el?.id === ZMembersListPageTableColumnsIds.invitedAt
            )[0];

          __geInvitedAcceptedAtColumn =
            getMemberFiltersData?.settings?.columns?.filter(
              el => el?.id === ZMembersListPageTableColumnsIds.invitedAcceptedAt
            )[0];
        } else if (wsShareId && shareWSMemberId) {
          __getEmailColumn = getSWSMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.email
          )[0];

          __getRoleColumn = getSWSMemberFiltersData?.settings?.columns?.filter(
            el => el?.id === ZMembersListPageTableColumnsIds.role
          )[0];

          __getStatusColumn =
            getSWSMemberFiltersData?.settings?.columns?.filter(
              el => el?.id === ZMembersListPageTableColumnsIds.status
            )[0];

          __getInvitedAtColumn =
            getSWSMemberFiltersData?.settings?.columns?.filter(
              el => el?.id === ZMembersListPageTableColumnsIds.invitedAt
            )[0];

          __geInvitedAcceptedAtColumn =
            getSWSMemberFiltersData?.settings?.columns?.filter(
              el => el?.id === ZMembersListPageTableColumnsIds.invitedAcceptedAt
            )[0];
        }

        if (__getInvitedAtColumn) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.invitedAt)
            ?.toggleVisibility(__getInvitedAtColumn?.isVisible);
        }

        if (__getEmailColumn) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.email)
            ?.toggleVisibility(__getEmailColumn?.isVisible);
        }

        if (__getRoleColumn) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.role)
            ?.toggleVisibility(__getRoleColumn?.isVisible);
        }

        if (__geInvitedAcceptedAtColumn) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.invitedAcceptedAt)
            ?.toggleVisibility(__geInvitedAcceptedAtColumn?.isVisible);
        }

        if (__getStatusColumn) {
          zMembersTable
            ?.getColumn(ZMembersListPageTableColumnsIds.status)
            ?.toggleVisibility(__getStatusColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [
    workspaceId,
    getMemberFiltersData,
    getSWSMemberFiltersData,
    wsShareId,
    shareWSMemberId
  ]);

  useEffect(() => {
    try {
      if (workspaceId && membersData) {
        setMembersDataRState(membersData);
      } else if (wsShareId && shareWSMemberId && swsMembersData) {
        setMembersDataRState(swsMembersData);
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [workspaceId, membersData, swsMembersData, wsShareId, shareWSMemberId]);
  // #endregion
  // console.log({ d: zMembersTable?.getCanNextPage() }); // causing infinite loop

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
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [
                          permissionsEnum.update_ws_member,
                          permissionsEnum.delete_ws_member,
                          permissionsEnum.resend_invitation_ws_member,
                          permissionsEnum.update_memberRole_ws_member
                        ]
                      : wsShareId && shareWSMemberId
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
                        wsShareId && shareWSMemberId
                          ? permissionsTypeEnum.shareWSMemberPermissions
                          : permissionsTypeEnum.loggedInUserPermissions
                      }
                      havePermissions={
                        workspaceId
                          ? [
                              permissionsEnum.update_ws_member,
                              permissionsEnum.delete_ws_member,
                              permissionsEnum.resend_invitation_ws_member,
                              permissionsEnum.update_memberRole_ws_member
                            ]
                          : wsShareId && shareWSMemberId
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
                              selectedMemberId: _rowInfo.original.id || '',
                              selectedMemberEmail:
                                _rowInfo.original.email || '',
                              selectedMemberRole:
                                _rowInfo.original.memberRole.name
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
                  workspaceId
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
                    : wsShareId && shareWSMemberId
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
                  workspaceId
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
                    : wsShareId && shareWSMemberId
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
                  workspaceId
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
                    : wsShareId && shareWSMemberId
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
                  workspaceId
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
                    : wsShareId && shareWSMemberId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
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
            {filteredMembersDataRSelector?.length || 0}{' '}
            {filteredMembersDataRSelector?.length === 1 ? 'Member' : 'Members'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='zaions__bg_white w-[7rem] mt-1'
            interface='popover'
            value={zMembersTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .pageSizeInput
            }
            onIonChange={e => {
              zMembersTable.setPageSize(Number(e.target.value));

              if (workspaceId) {
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
              } else if (wsShareId && shareWSMemberId) {
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
            {[2, 3].map(pageSize => (
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

  useEffect(() => {
    try {
      let _allMemberRQCacheData;
      if (workspaceId) {
        _allMemberRQCacheData = getRQCDataHandler({
          key: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
            workspaceId
          ]
        });
      } else if (wsShareId && shareWSMemberId) {
        _allMemberRQCacheData = getRQCDataHandler({
          key: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
            wsShareId
          ]
        });
      }

      const _allMember =
        extractInnerData<WSTeamMembersInterface[]>(
          _allMemberRQCacheData || [],
          extractInnerDataOptionsEnum.createRequestResponseItems
        ) || [];

      const _currentMember = _allMember?.find(el => el.id === membersId);

      if (_currentMember) {
        setCompState(oldValues => ({
          ...oldValues,
          currentMemberData: _currentMember
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  // #region Modals & popovers.
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite,
      workspaceId: workspaceId,
      formMode: FormMode.EDIT,
      email: email,
      role: role,
      id: membersId
    }
  );
  // #endregion

  // #region Functions.
  const ZResendInvitationHandler = async () => {
    try {
      const __response = await resendInviteMemberAsyncMutate({
        urlDynamicParts: [
          CONSTANTS.RouteParams.workspace.workspaceId,
          CONSTANTS.RouteParams.workspace.invitationId
        ],
        itemIds: [workspaceId, membersId],
        requestData: ''
      });

      if ((__response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
        const __data = extractInnerData<WSTeamMembersInterface>(
          __response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (__data && __data.id) {
          await updateRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
              workspaceId
            ],
            data: __data,
            id: __data?.id!
          });

          showSuccessNotification(MESSAGES.MEMBER.INVITE_RESEND);

          dismissZIonPopover('', '');
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
      }
      reportCustomError(error);
    }
  };

  // Cancel invitation alert.
  const ZCancelInvitationAlert = async () => {
    try {
      if (membersId) {
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

  const ZCancelInvitation = async () => {
    try {
      const __stringifyData = zStringify({
        status: ZTeamMemberInvitationEnum.cancel
      });

      const __response = await updateInvitationAsyncMutate({
        itemIds: [workspaceId, membersId],
        urlDynamicParts: [
          CONSTANTS.RouteParams.workspace.workspaceId,
          CONSTANTS.RouteParams.workspace.memberInviteId
        ],
        requestData: __stringifyData
      });

      if (__response) {
        const __data = extractInnerData<WSTeamMembersInterface>(
          __response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (__data && __data?.id) {
          await updateRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
              workspaceId
            ],
            data: __data,
            id: __data?.id
          });

          showSuccessNotification(MESSAGES.MEMBER.CANCELED);

          dismissZIonPopover('', '');
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when user won't to delete Invitation and click on the delete button this function will fire and show the confirm alert.
  const deleteMember = async () => {
    try {
      if (membersId) {
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

  const ZDeleteInvitation = async () => {
    try {
      const __response = await deleteInvitationAsyncMutate({
        itemIds: [workspaceId, membersId],
        urlDynamicParts: [
          CONSTANTS.RouteParams.workspace.workspaceId,
          CONSTANTS.RouteParams.workspace.memberInviteId
        ]
      });
      if (__response) {
        const __data = extractInnerData<{ success: boolean }>(
          __response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (__data && __data?.success) {
          // getting all the members from RQ cache.
          const __oldMembers =
            extractInnerData<WSTeamMembersInterface[]>(
              getRQCDataHandler<WSTeamMembersInterface[]>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                  workspaceId
                ]
              }) as WSTeamMembersInterface[],
              extractInnerDataOptionsEnum.createRequestResponseItems
            ) || [];

          // removing deleted members from cache.
          const __updatedMembers = __oldMembers.filter(
            el => el.id !== membersId
          );

          await updateRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
              workspaceId
            ],
            data: __updatedMembers,
            id: '',
            updateHoleData: true,
            extractType: ZRQGetRequestExtractEnum.extractItems
          });

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
      <ZCan havePermissions={[permissionsEnum.update_workspaceTeam]}>
        {/* Edit Role */}
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

        {/* Resend invite link */}
        {compState?.currentMemberData?.accountStatus !==
          ZTeamMemberInvitationEnum.accepted && (
          <div
            className={classNames({
              'cursor-not-allowed':
                compState?.currentMemberData?.resendAllowedAfter?.trim()
                  ?.length !== 0 &&
                dayjs(compState?.currentMemberData?.resendAllowedAfter).isAfter(
                  dayjs()
                )
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
              onClick={async () => {
                if (
                  compState?.currentMemberData?.resendAllowedAfter?.trim()
                    ?.length !== 0 &&
                  dayjs(
                    compState?.currentMemberData?.resendAllowedAfter
                  ).isBefore(dayjs())
                ) {
                  await ZResendInvitationHandler();
                }
              }}
              disabled={
                compState?.currentMemberData?.resendAllowedAfter?.trim()
                  ?.length !== 0 &&
                dayjs(compState?.currentMemberData?.resendAllowedAfter).isAfter(
                  dayjs()
                )
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

        {/* Cancel */}
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
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table.cancelBtn
            }
            onClick={async () => {
              await ZCancelInvitationAlert();
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

        {/* Delete */}
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
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn
            }
            onClick={async () => {
              await deleteMember();
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

export default React.memo(ZMembersListTable);
