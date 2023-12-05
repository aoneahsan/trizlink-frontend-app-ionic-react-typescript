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
import routeQueryString from 'qs';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCheckbox,
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
import ZEmptyTable from '../ZEmptyTable';
import ZCan from '@/components/Can';
import ZaionsAddUtmTags from '../ZaionsModals/AddUtmTags';
import ZaionsEmbedWidgetsModal from '../ZaionsModals/AddEmbedWidgets';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
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
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type EmbedWidgetsType,
  type UTMTagTemplateType
} from '@/types/AdminPanel/linksType';
import {
  FormMode,
  type ZUserSettingInterface,
  ZUserSettingTypeEnum,
  ZUTMTagsListPageTableColumnsIds
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FilteredUtmTagsDataRStateSelector } from '@/ZaionsStore/UserDashboard/UTMTagTemplatesState';
import { EmbedWidgetsRStateAtom } from '@/ZaionsStore/UserDashboard/EmbedWidgetsState';

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

const EmbedWidgetsTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  // #region APIS requests.
  // Request for getting embed widgets data.
  const { data: embedWidgetsData, isFetching: isEmbedWidgetsDataFetching } =
    useZRQGetRequest<EmbedWidgetsType[]>({
      _url: API_URL_ENUM.userEmbedWidget_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN],
      _itemsIds: [],
      _urlDynamicParts: []
    });
  // #endregion

  // #region Modals & popovers
  const { presentZIonModal: presentZEmbedWidgetsFormModal } = useZIonModal(
    ZaionsEmbedWidgetsModal,
    { formMode: FormMode.ADD }
  );
  // #endregion

  // #region Functions.

  // #endregion

  const isZFetching = isEmbedWidgetsDataFetching;

  return (
    <>
      {!isZFetching ? (
        embedWidgetsData !== null &&
        embedWidgetsData !== undefined &&
        embedWidgetsData?.length > 0 ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message='No embed widgets founds. please create a embed widget.'
              btnText='Create embed widget'
              btnTestingselector={
                CONSTANTS.testingSelectors.utmTags.listPage.table.createBtn
              }
              btnOnClick={() => {
                presentZEmbedWidgetsFormModal({
                  _cssClass: 'embed-widget-modal-size'
                });
              }}
            />
          </div>
        )
      ) : null}

      {showSkeleton || isZFetching ? <ZEmbedWidgetTableSkeleton /> : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  const [compState, setCompState] = useState<{
    embedWidget?: UTMTagTemplateType;
  }>();

  // #region Recoil state.
  const setEmbedWidgetsDataRState = useSetRecoilState(EmbedWidgetsRStateAtom);
  const filteredUtmTagsDataRSelector = useRecoilValue(
    FilteredUtmTagsDataRStateSelector
  );
  // #endregion

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  // #region APIS requests.
  // Request for getting Embed widget data.
  const { data: UTMTagsData } = useZRQGetRequest<EmbedWidgetsType[]>({
    _url: API_URL_ENUM.userEmbedWidget_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.EMBED_WIDGET.MAIN],
    _itemsIds: [],
    _urlDynamicParts: []
  });

  const { data: getEmbedWidgetFiltersData } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
              workspaceId,
              ZUserSettingTypeEnum.embedWidgetsListPageTable
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
              ZUserSettingTypeEnum.embedWidgetsListPageTable
            ]
          : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [
              ZWSTypeEum.personalWorkspace,
              workspaceId,
              ZUserSettingTypeEnum.embedWidgetsListPageTable
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
              ZUserSettingTypeEnum.embedWidgetsListPageTable
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
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<UTMTagTemplateType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZUTMTagsListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: ({ row }) => {
        return (
          <ZIonCheckbox
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.select}-${row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.select
            }
          />
        );
      }
    }),

    // templateName
    columnHelper.accessor(itemData => itemData.templateName, {
      header: 'template name',
      id: ZUTMTagsListPageTableColumnsIds.templateName,
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.templateName}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.templateName
            }>
            {row.getValue()}
          </ZIonText>
        );
      },
      footer: 'Template name'
    }),

    // Campaign
    columnHelper.accessor(itemData => itemData.utmCampaign, {
      header: 'Campaign',
      id: ZUTMTagsListPageTableColumnsIds.campaign,
      footer: 'Campaign',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.campaign}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.campaign
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // Medium
    columnHelper.accessor(itemData => itemData.utmMedium, {
      header: 'Medium',
      id: ZUTMTagsListPageTableColumnsIds.medium,
      footer: 'Medium',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.medium}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.medium
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // Content
    columnHelper.accessor(itemData => itemData.utmContent, {
      header: 'Content',
      id: ZUTMTagsListPageTableColumnsIds.content,
      footer: 'Content',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.content}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.content
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // Source
    columnHelper.accessor(itemData => itemData.utmSource, {
      header: 'Source',
      id: ZUTMTagsListPageTableColumnsIds.source,
      footer: 'Source',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.source}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.source
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // Term
    columnHelper.accessor(itemData => itemData.utmTerm, {
      header: 'Term',
      id: ZUTMTagsListPageTableColumnsIds.term,
      footer: 'Term',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.team}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.team
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    }),

    // create at
    columnHelper.accessor(itemData => itemData.formattedCreateAt, {
      header: 'create at',
      id: ZUTMTagsListPageTableColumnsIds.formattedCreateAt,
      footer: 'create at',
      cell: row => {
        return (
          <ZIonText
            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.createAt}-${row?.row?.original?.id}`}
            testinglistselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.createAt
            }>
            {row.getValue()}
          </ZIonText>
        );
      }
    })
  ];

  const zUTMTagTable = useReactTable({
    columns: defaultColumns,
    data: filteredUtmTagsDataRSelector ?? [],
    state: {
      columnOrder: getEmbedWidgetFiltersData?.settings?.columnOrderIds ?? []
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
      if (getEmbedWidgetFiltersData?.settings?.columns !== null) {
        const _getTemplateNameColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.templateName
          )[0];

        const _getFormattedCreateAtColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.formattedCreateAt
          )[0];

        const _getCampaignColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.campaign
          )[0];

        const _getContentColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.content
          )[0];

        const _getMediumColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.medium
          )[0];

        const _getSourceColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.source
          )[0];

        const _getTermColumn =
          getEmbedWidgetFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.term
          )[0];

        if (_getTemplateNameColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.templateName)
            ?.toggleVisibility(_getTemplateNameColumn?.isVisible);
        }

        if (_getMediumColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.medium)
            ?.toggleVisibility(_getMediumColumn?.isVisible);
        }

        if (_getFormattedCreateAtColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.formattedCreateAt)
            ?.toggleVisibility(_getFormattedCreateAtColumn?.isVisible);
        }

        if (_getCampaignColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.campaign)
            ?.toggleVisibility(_getCampaignColumn?.isVisible);
        }

        if (_getSourceColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.source)
            ?.toggleVisibility(_getSourceColumn?.isVisible);
        }

        if (_getContentColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.content)
            ?.toggleVisibility(_getContentColumn?.isVisible);
        }

        if (_getTermColumn !== undefined) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.term)
            ?.toggleVisibility(_getTermColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEmbedWidgetFiltersData]);

  useEffect(() => {
    zUTMTagTable.setPageIndex(Number(pageindex) ?? 0);
    zUTMTagTable.setPageSize(Number(pagesize) ?? 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (UTMTagsData !== undefined && UTMTagsData !== null) {
        setEmbedWidgetsDataRState(UTMTagsData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UTMTagsData]);
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZUTMTagActionPopover } = useZIonPopover(
    ZEmbedWidgetActionPopover,
    {
      workspaceId,
      utmTag: compState?.embedWidget
    }
  );

  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    { formMode: FormMode.ADD, workspaceId }
  );
  // #endregion

  return (
    <div
      className={classNames({
        'mt-2': !isMdScale
      })}>
      <ZCustomScrollable
        className='w-full border rounded-lg h-max ion-no-padding'
        scrollX={true}>
        <div className='min-w-[55rem]'>
          {zUTMTagTable?.getHeaderGroups()?.map((_headerInfo, _headerIndex) => {
            return (
              <ZIonRow
                key={_headerIndex}
                className='flex flex-nowrap zaions__light_bg'>
                {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                  return (
                    <ZIonCol
                      size={
                        _columnInfo.column.id ===
                          ZUTMTagsListPageTableColumnsIds.id ||
                        _columnInfo.column.id ===
                          ZUTMTagsListPageTableColumnsIds.actions
                          ? '.8'
                          : '2.6'
                      }
                      key={_columnInfo.id}
                      className={classNames({
                        'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
                          true,
                        'border-r': false
                      })}>
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
          <ZIonRow className='rounded-b-lg'>
            <ZIonCol
              size='12'
              className='w-full ion-no-padding'>
              {filteredUtmTagsDataRSelector?.length > 0 ? (
                zUTMTagTable
                  ?.getRowModel()
                  ?.rows?.map((_rowInfo, _rowIndex) => {
                    return (
                      <ZIonRow
                        key={_rowIndex}
                        className='flex-nowrap'>
                        {_rowInfo?.getAllCells()?.map((_cellInfo, _cellIndex) =>
                          _cellInfo?.column?.getIsVisible() ? (
                            <ZIonCol
                              key={_cellIndex}
                              size={
                                _cellInfo.column.id ===
                                  ZUTMTagsListPageTableColumnsIds.id ||
                                _cellInfo.column.id ===
                                  ZUTMTagsListPageTableColumnsIds.actions
                                  ? '.8'
                                  : '2.6'
                              }
                              className={classNames({
                                'py-1 mt-1 border-b flex ion-align-items-center':
                                  true,
                                'border-r': false,
                                'ps-2':
                                  _cellInfo.column.id !==
                                  ZUTMTagsListPageTableColumnsIds.id,
                                'ps-0':
                                  _cellInfo.column.id ===
                                  ZUTMTagsListPageTableColumnsIds.id
                              })}>
                              <div
                                className={classNames({
                                  'w-full text-sm ZaionsTextEllipsis': true,
                                  'ps-3':
                                    _cellInfo.column.id ===
                                    ZUTMTagsListPageTableColumnsIds.id
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
                            testingselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.actionBtn}-${_rowInfo?.original?.id}`}
                            testinglistselector={
                              CONSTANTS.testingSelectors.utmTags.listPage.table
                                .actionBtn
                            }
                            onClick={(_event: unknown) => {
                              setCompState(oldVal => ({
                                ...oldVal,
                                embedWidget: _rowInfo?.original
                              }));
                              //
                              presentZUTMTagActionPopover({
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
                  })
              ) : (
                <ZEmptyTable
                  message='No UTM tags founds. please create a UTM tag.'
                  btnText='Create UTM tag'
                  btnOnClick={() => {
                    presentZUtmTagsFormModal({
                      _cssClass: 'utm-tags-modal-size'
                    });
                  }}
                />
              )}
            </ZIonCol>
          </ZIonRow>
        </div>
      </ZCustomScrollable>

      {/*  */}
      <ZIonRow
        className={classNames({
          'w-full px-2 pt-1 pb-2 mt-1 overflow-hidden rounded-lg zaions__light_bg':
            true,
          'mt-2': !isMdScale
        })}>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className={classNames({
            'flex mt-1': true,
            'ion-align-items-center': isSmScale,
            'ion-justify-content-center': !isSmScale
          })}>
          {/* previous buttons */}
          <ZIonButton
            className='mr-2 ion-no-padding ion-no-margin'
            size='small'
            fill='clear'
            disabled={!zUTMTagTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex: 0,
                      pagesize: zUTMTagTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );

                zUTMTagTable.setPageIndex(0);
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
            disabled={!zUTMTagTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.previousButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanPreviousPage()) {
                zUTMTagTable.previousPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex:
                        zUTMTagTable.getState().pagination.pageIndex - 1,
                      pagesize: zUTMTagTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
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
            disabled={!zUTMTagTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.nextButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanNextPage()) {
                zUTMTagTable.nextPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex:
                        zUTMTagTable.getState().pagination.pageIndex + 1,
                      pagesize: zUTMTagTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
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
            disabled={!zUTMTagTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanNextPage()) {
                zUTMTagTable.setPageIndex(zUTMTagTable.getPageCount() - 1);

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag,
                    params: [CONSTANTS.RouteParams.workspace.workspaceId],
                    values: [workspaceId ?? ''],
                    routeSearchParams: {
                      pageindex: zUTMTagTable.getPageCount() - 1,
                      pagesize: zUTMTagTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
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
        {/* <ZIonCol></ZIonCol> */}

        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className={classNames({
            'flex ion-align-items-center ': true,
            'ion-justify-content-end': isSmScale,
            'ion-justify-content-between mt-1 px-2': !isSmScale
          })}>
          <ZIonText className='mt-1 font-semibold me-3'>
            {filteredUtmTagsDataRSelector?.length ?? 0}{' '}
            {filteredUtmTagsDataRSelector?.length === 1 ? 'UTMTag' : 'UTMTags'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem]'
            value={zUTMTagTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zUTMTagTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag,
                  params: [CONSTANTS.RouteParams.workspace.workspaceId],
                  values: [workspaceId ?? ''],
                  routeSearchParams: {
                    pageindex: zUTMTagTable.getPageCount() - 1,
                    pagesize: Number(e.target.value)
                  }
                })
              );
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

// Skeleton.
const ZEmbedWidgetTableSkeleton: React.FC = React.memo(() => {
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
ZEmbedWidgetTableSkeleton.displayName = 'ZEmbedWidgetTableSkeleton';

// UTMTag action popover
const ZEmbedWidgetActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  utmTag?: UTMTagTemplateType;
}> = ({ workspaceId, utmTag, dismissZIonPopover, zNavigatePushRoute }) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region Modals & popovers
  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    {
      utmTag,
      formMode: FormMode.EDIT,
      workspaceId
    }
  );
  // #endregion

  // Request for deleting UTM tag.
  const { mutateAsync: deleteUtmTagMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.userAccountUtmTags_update_delete
  });

  const { data: UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  // when user won't to delete Utm tag and click on the delete button this function will fire and show the confirm alert.
  const deleteUTMTag = async (): Promise<void> => {
    try {
      if (
        utmTag?.id?.trim() !== undefined &&
        utmTag?.id?.trim() !== '' &&
        UTMTagsData?.length !== null
      ) {
        // const selectedUTMTag = UTMTagsData?.find(el => el.id === utmTag?.id);
        await presentZIonAlert({
          header: MESSAGES.UTM_TAGS_TEMPLATE.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.UTM_TAGS_TEMPLATE.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.UTM_TAGS_TEMPLATE.DELETE_ALERT.MESSAGES,
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
                void removeUTMTag();
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

  // on the delete Utm tag confirm alert, when user click on delete button this function will fires which will trigger delete request and delete the Utm tag.
  const removeUTMTag = async (): Promise<void> => {
    try {
      if (
        utmTag?.id?.trim() !== undefined &&
        utmTag?.id?.trim() !== '' &&
        UTMTagsData?.length !== null
      ) {
        if (utmTag?.id !== undefined) {
          const _response = await deleteUtmTagMutate({
            itemIds: [workspaceId, utmTag?.id],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.utmTag.utmTagId
            ]
          });

          if (_response !== undefined) {
            const _data = extractInnerData<{ success: boolean }>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data !== undefined && _data?.success) {
              // getting all the utm tag from RQ cache.
              const _oldUTMTags =
                extractInnerData<UTMTagTemplateType[]>(
                  getRQCDataHandler<UTMTagTemplateType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                      workspaceId
                    ]
                  }) as UTMTagTemplateType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) ?? [];

              // removing deleted utm tag from cache.
              const _updatedUtmTags = _oldUTMTags?.filter(
                el => el.id !== utmTag?.id
              );

              // Updating data in RQ cache.
              await updateRQCDataHandler<UTMTagTemplateType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                  workspaceId
                ],
                data: _updatedUtmTags,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });

              showSuccessNotification(MESSAGES.UTM_TAGS_TEMPLATE.DELETED);

              dismissZIonPopover('', '');
            } else {
              showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);

              dismissZIonPopover('', '');
            }
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
      <ZCan havePermissions={[permissionsEnum.update_utmTag]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={
            CONSTANTS.testingSelectors.utmTags.listPage.table.editBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.editBtn}-${utmTag?.id}`}
          onClick={() => {
            void (async () => {
              try {
                if (utmTag?.id !== null) {
                  //
                  presentZUtmTagsFormModal({
                    _cssClass: 'utm-tags-modal-size'
                  });

                  dismissZIonPopover('', '');
                } else {
                  await presentZIonErrorAlert();
                }
              } catch (error) {
                reportCustomError(error);
              }
            })();
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
      </ZCan>

      <ZCan havePermissions={[permissionsEnum.delete_utmTag]}>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => {
            void deleteUTMTag();
          }}
          testingselector={
            CONSTANTS.testingSelectors.utmTags.listPage.table.deleteBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.deleteBtn}-${utmTag?.id}`}>
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
    </ZIonList>
  );
};

export default EmbedWidgetsTable;
