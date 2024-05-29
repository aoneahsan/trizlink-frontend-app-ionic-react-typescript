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
import classNames from 'classnames';
import routeQueryString from 'qs';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  createOutline,
  ellipsisVerticalOutline,
  fileTrayFullOutline,
  trashBinOutline
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonRouterLink,
  ZIonRow,
  ZIonSelect,
  ZIonSelectOption,
  ZIonSkeletonText,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonModal,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import { showErrorNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type workspaceTeamInterface,
  ZWSTeamListPageTableColumnsIds
} from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZEmptyTable from '@/components/InPageComponents/ZEmptyTable';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZWSTeamCreateModal from '@/components/InPageComponents/ZaionsModals/Workspace/Team/CreateModal';

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
 * About: (ZWSSettingTeamListTable -> ZWorkspaceSettingTeamListTable is table component for listing team data.)
 * @type {*}
 * */

const ZWSSettingTeamListTable: React.FC = () => {
  const { workspaceId } = useParams<{
    workspaceId?: string;
  }>();

  // #region APIS
  // Request for getting teams data.
  const { data: WSTeamsData, isFetching: isWSTeamsDataFetching } =
    useZRQGetRequest<workspaceTeamInterface[]>({
      _url: API_URL_ENUM.workspace_team_create_list,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
        workspaceId ?? ''
      ],
      _itemsIds: [workspaceId ?? ''],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
      _shouldFetchWhenIdPassed: !(
        workspaceId !== undefined && (workspaceId?.trim()?.length ?? 0) > 0
      )
    });

  // #endregion

  // #region Popovers & Modals.
  const { presentZIonModal: presentZWSTeamCreateModal } = useZIonModal(
    ZWSTeamCreateModal,
    {
      workspaceId
    }
  );
  // #endregion

  return (
    <>
      {isWSTeamsDataFetching && <ZTeamTableSkeleton />}

      {!isWSTeamsDataFetching ? (
        WSTeamsData !== undefined &&
        WSTeamsData !== null &&
        WSTeamsData?.length > 0 ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message='No teams founds. please create a team.'
              btnOnClick={() => {
                presentZWSTeamCreateModal({
                  _cssClass: 'create-workspace-modal-size'
                });
              }}
              btnText='Create team'
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
    selectedTeamId?: string;
  }>({});
  // #endregion

  // #region Custom hooks
  const { zNavigatePushRoute } = useZNavigate();
  const { isMdScale } = useZMediaQueryScale();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  const { workspaceId } = useParams<{
    workspaceId?: string;
  }>();

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZTeamActionPopover } = useZIonPopover(
    ZTeamActionPopover,
    {
      workspaceId,
      teamId: compState.selectedTeamId
    }
  );
  // #endregion

  // #region APIS
  // Request for getting teams data.
  const { data: WSTeamsData } = useZRQGetRequest<workspaceTeamInterface[]>({
    _url: API_URL_ENUM.workspace_team_create_list,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
      workspaceId ?? ''
    ],
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<workspaceTeamInterface>();
  const defaultColumns = [
    columnHelper.display({
      id: ZWSTeamListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: _ => {
        return <ZIonCheckbox />;
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.title, {
      header: 'Title',
      id: ZWSTeamListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonRouterLink
            className='hover:underline'
            routerLink={createRedirectRoute({
              url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.ViewTeam,
              params: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.workspace.teamId
              ],
              values: [workspaceId ?? '', row?.row?.original?.id ?? '']
            })}>
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // Description
    columnHelper.accessor(itemData => itemData.description, {
      header: 'Description',
      id: ZWSTeamListPageTableColumnsIds.description,
      footer: 'Description',
      cell: row => {
        return (
          <>
            {row?.getValue() !== undefined ? (
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

    // Member
    columnHelper.accessor(itemData => itemData.membersCount, {
      header: 'Member',
      id: ZWSTeamListPageTableColumnsIds.member,
      footer: 'Member',
      cell: row => {
        return (
          <div className='flex ion-align-items-center'>
            {/* current/total */}
            <div className='text-sm ZaionsTextEllipsis ps-1'>
              {row.getValue()}/4
            </div>
          </div>
        );
      }
    })
  ];

  const zTeamsTable = useReactTable({
    columns: defaultColumns,
    data: WSTeamsData ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
    // filterFns: undefined,
  });
  // #endregion

  useEffect(() => {
    try {
      zTeamsTable.setPageIndex(
        isNaN(Number(pageindex))
          ? CONSTANTS.pagination.startingPageIndex
          : Number(pageindex)
      );
      zTeamsTable.setPageSize(
        isNaN(Number(pagesize))
          ? CONSTANTS.pagination.defaultPageSize
          : Number(pagesize)
      );
    } catch (error) {
      zTeamsTable.setPageIndex(CONSTANTS.pagination.startingPageIndex);
      zTeamsTable.setPageSize(CONSTANTS.pagination.defaultPageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageindex, pagesize]);

  return (
    <div
      className={classNames({
        'mt-2': !isMdScale
      })}>
      <ZCustomScrollable
        className='w-full overflow-hidden border rounded-lg h-max ion-no-padding zaions__light_bg'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zTeamsTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
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
                          ZWSTeamListPageTableColumnsIds.id ||
                        _columnInfo.column.id ===
                          ZWSTeamListPageTableColumnsIds.actions
                          ? '1.2'
                          : _columnInfo.column.id ===
                              ZWSTeamListPageTableColumnsIds.description
                            ? '5.5'
                            : '2.5'
                      }>
                      {_columnInfo.column.columnDef.header?.toString()}
                    </ZIonCol>
                  );
                })}

                <ZIonCol
                  size='.8'
                  className={classNames({
                    'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                      true,
                    'border-r': false
                  })}>
                  Actions
                </ZIonCol>
              </ZIonRow>
            );
          })}

          {/* Body Section */}
          <ZIonRow className='rounded-b-lg zaions__light_bg'>
            {WSTeamsData?.length != null ? (
              <ZIonCol
                size='12'
                className='w-full ion-no-padding'>
                {zTeamsTable.getRowModel().rows.map((_rowInfo, _rowIndex) => {
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
                                ZWSTeamListPageTableColumnsIds.id ||
                              _cellInfo.column.id ===
                                ZWSTeamListPageTableColumnsIds.actions
                                ? '1.2'
                                : _cellInfo.column.id ===
                                    ZWSTeamListPageTableColumnsIds.description
                                  ? '5.5'
                                  : '2.5'
                            }
                            className={classNames({
                              'py-1 mt-1 border-b flex ion-align-items-center':
                                true,
                              'border-r': false,
                              'ps-2':
                                _cellInfo.column.id !==
                                ZWSTeamListPageTableColumnsIds.id,
                              'ps-0':
                                _cellInfo.column.id ===
                                ZWSTeamListPageTableColumnsIds.id
                            })}>
                            <div
                              className={classNames({
                                'w-full text-sm ZaionsTextEllipsis': true,
                                'ps-3':
                                  _cellInfo.column.id ===
                                  ZWSTeamListPageTableColumnsIds.id
                              })}>
                              {flexRender(
                                _cellInfo.column.columnDef.cell,
                                _cellInfo.getContext()
                              )}
                            </div>
                          </ZIonCol>
                        ) : null
                      )}

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
                              selectedTeamId: _rowInfo.original.id ?? ''
                            }));

                            //
                            presentZTeamActionPopover({
                              _event: _event as Event,
                              _cssClass:
                                'zaions_present_folder_Action_popover_width',
                              _dismissOnSelect: false
                            });
                          }}>
                          <ZIonIcon icon={ellipsisVerticalOutline} />
                        </ZIonButton>
                      </ZIonCol>
                    </ZIonRow>
                  );
                })}
              </ZIonCol>
            ) : (
              <ZIonCol className='py-3 ion-text-center'>
                <ZIonTitle className='mt-3'>
                  <ZIonIcon
                    icon={fileTrayFullOutline}
                    className='mx-auto'
                    size='large'
                    color='medium'
                  />
                </ZIonTitle>
                <ZIonTitle color='medium'>
                  No teams founds. please create a team.
                </ZIonTitle>
              </ZIonCol>
            )}
          </ZIonRow>
        </div>
      </ZCustomScrollable>

      <ZIonRow className='w-full px-2 pt-1 pb-2 mt-2 overflow-hidden border rounded-lg ion-align-items-center zaions__light_bg'>
        <ZIonCol>
          {/* previous buttons */}
          <ZIonButton
            className='mr-1 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zTeamsTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zTeamsTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                      .Members,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex: 0,
                      pagesize: zTeamsTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );

                zTeamsTable.setPageIndex(0);
              }
            }}>
            <ZIonText className='px-1 text-xl'>{'<<'}</ZIonText>
          </ZIonButton>

          <ZIonButton
            className='mr-1 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zTeamsTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .previousButton
            }
            onClick={() => {
              if (zTeamsTable.getCanPreviousPage()) {
                zTeamsTable.previousPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                      .Members,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex:
                        zTeamsTable.getState().pagination.pageIndex - 1,
                      pagesize: zTeamsTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonText className='px-1 text-xl'>{'<'}</ZIonText>
          </ZIonButton>

          {/* next buttons */}
          <ZIonButton
            className='mr-1 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zTeamsTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .nextButton
            }
            onClick={() => {
              if (zTeamsTable.getCanNextPage()) {
                zTeamsTable.nextPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                      .Members,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex:
                        zTeamsTable.getState().pagination.pageIndex + 1,
                      pagesize: zTeamsTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonText className='px-1 text-xl'>{'>'}</ZIonText>
          </ZIonButton>

          <ZIonButton
            className='mr-1 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zTeamsTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zTeamsTable.getCanNextPage()) {
                zTeamsTable.setPageIndex(zTeamsTable.getPageCount() - 1);

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                      .Members,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex: zTeamsTable.getPageCount() - 1,
                      pagesize: zTeamsTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );
              }
            }}>
            <ZIonText className='px-1 text-xl'>{'>>'}</ZIonText>
          </ZIonButton>
        </ZIonCol>

        {/* Col for pagination number like 1,2,3,...,n */}
        <ZIonCol></ZIonCol>

        <ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem] mt-1'
            value={
              zTeamsTable.getState().pagination.pageSize ??
              CONSTANTS.pagination.defaultPageSize
            }
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table
                .pageSizeInput
            }
            onIonChange={e => {
              zTeamsTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members,
                  params: [CONSTANTS.RouteParams.workspace.workspaceId],
                  values: [workspaceId ?? ''],
                  routeSearchParams: {
                    pageindex: zTeamsTable.getPageCount() - 1,
                    pagesize: Number(e.target.value)
                  }
                })
              );
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

// Shortlink action popover
const ZTeamActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  teamId: string;
}> = ({ dismissZIonPopover, zNavigatePushRoute, workspaceId, teamId }) => {
  // #region Custom hooks.
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  // Request for deleting team.
  const { mutateAsync: deleteTeamMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.workspace_team_update_delete
  });
  // #endregion

  // #region Functions.
  // when user won't to delete team and click on the delete button this function will fire and show the confirm alert.
  const deleteTeam = async (): Promise<void> => {
    try {
      if (teamId?.trim()?.length > 0) {
        await presentZIonAlert({
          header: 'Delete team.',
          subHeader: 'Remove team from user account.',
          message: 'Are you sure you want to delete this team?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'danger',
              handler: () => {
                void removeTeam();
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

  // on the delete short link confirm alert, when user click on delete button this function will fires which will trigger delete request and delete the short link.
  const removeTeam = async (): Promise<void> => {
    try {
      if (teamId?.trim()?.length > 0) {
        const _response = await deleteTeamMutate({
          itemIds: [workspaceId, teamId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.teamId
          ]
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            // getting all the shortLinks from RQ cache.
            const _oldTeams =
              extractInnerData<workspaceTeamInterface[]>(
                getRQCDataHandler<workspaceTeamInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
                    workspaceId
                  ]
                }) as workspaceTeamInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted shortLinks from cache.
            const _updatedTeams = _oldTeams.filter(el => el.id !== teamId);

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceTeamInterface[] | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
                workspaceId
              ],
              data: _updatedTeams,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            // showSuccessNotification(MESSAGES.GENERAL.TEAM.DELETED);

            dismissZIonPopover('', '');
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);

            dismissZIonPopover('', '');
          }
        }
      } else {
        void presentZIonErrorAlert();
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
        {/* Edit */}
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn}-${teamId}`}
          testinglistselector={
            CONSTANTS.testingSelectors.WSSettings.teamListPage.table.editBtn
          }
          onClick={() => {
            zNavigatePushRoute(
              createRedirectRoute({
                url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.ViewTeam,
                params: [
                  CONSTANTS.RouteParams.workspace.workspaceId,
                  CONSTANTS.RouteParams.workspace.teamId
                ],
                values: [workspaceId, teamId]
              })
            );

            dismissZIonPopover('', '');
          }}>
          <ZIonButton
            size='small'
            expand='full'
            fill='clear'
            color='light'
            className='ion-text-capitalize'>
            <ZIonIcon
              icon={createOutline}
              className='w-5 h-5 me-2'
              color='secondary'
            />
            <ZIonText
              color='secondary'
              className='text-[.9rem] pt-1'>
              Edit
            </ZIonText>
          </ZIonButton>
        </ZIonItem>

        <ZCan havePermissions={[permissionsEnum.delete_workspaceTeam]}>
          <ZIonItem
            button={true}
            detail={false}
            minHeight='2.5rem'
            onClick={() => {
              void deleteTeam();
            }}
            testinglistselector={
              CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn
            }
            testingselector={`${CONSTANTS.testingSelectors.WSSettings.teamListPage.table.deleteBtn}-${teamId}`}>
            <ZIonButton
              size='small'
              expand='full'
              fill='clear'
              color='light'
              className='ion-text-capitalize'>
              <ZIonIcon
                icon={trashBinOutline}
                className='w-4 h-4 me-2'
                color='danger'
              />
              <ZIonText
                color='danger'
                className='text-[.9rem] pt-1'>
                Delete
              </ZIonText>
            </ZIonButton>
          </ZIonItem>
        </ZCan>
      </ZCan>
    </ZIonList>
  );
};

// Skeleton.
const ZTeamTableSkeleton: React.FC = React.memo(() => {
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
ZTeamTableSkeleton.displayName = 'ZTeamTableSkeleton';

export default ZWSSettingTeamListTable;
