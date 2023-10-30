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
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import MESSAGES from '@/utils/messages';
import { reportCustomError } from '@/utils/customErrorType';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { UTMTagTemplateType } from '@/types/AdminPanel/linksType';
import {
  FormMode,
  ZUserSettingInterface,
  ZUserSettingTypeEnum,
  ZUTMTagsListPageTableColumnsIds
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  FilteredUtmTagsDataRStateSelector,
  UTMTagsRStateAtom
} from '@/ZaionsStore/UserDashboard/UTMTagTemplatesState';

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

const ZUTMTagsTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { editLinkId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId: string;
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region APIS requests.
  // If owned workspace then this api is used to fetch workspace utm tags data.
  const { data: UTMTagsData, isFetching: isUTMTagsDataFetching } =
    useZRQGetRequest<UTMTagTemplateType[]>({
      _url: API_URL_ENUM.userAccountUtmTags_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId],
      _shouldFetchWhenIdPassed: workspaceId ? false : true,
      _itemsIds: [workspaceId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
    });

  // If share workspace then this api is used to fetch share workspace utm tags data.
  const { data: swsUTMTagsData, isFetching: isSWSUTMTagsDataFetching } =
    useZRQGetRequest<UTMTagTemplateType[]>({
      _url: API_URL_ENUM.sws_utm_tag_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN, wsShareId],
      _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
      _itemsIds: [shareWSMemberId],
      _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId]
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

  // #region Modals & popovers
  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    { formMode: FormMode.ADD, workspaceId, wsShareId, shareWSMemberId }
  );
  // #endregion

  // #region Functions.

  // #endregion

  let isZFetching;
  if (workspaceId !== undefined) {
    isZFetching = isUTMTagsDataFetching;
  } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
    isZFetching = isSWSUTMTagsDataFetching;
  }

  return (
    <>
      {!isZFetching ? (
        (workspaceId && UTMTagsData && UTMTagsData?.length) ||
        (wsShareId &&
          shareWSMemberId &&
          swsUTMTagsData &&
          swsUTMTagsData?.length) ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message={
                [
                  shareWSPermissionEnum.create_sws_utmTag,
                  shareWSPermissionEnum.update_sws_utmTag
                ].some(el =>
                  getMemberRolePermissions?.memberPermissions?.includes(el)
                ) || workspaceId
                  ? 'No UTM tags founds. please create a UTM tag.'
                  : 'No UTM tags founds.'
              }
              btnText='Create UTM tag'
              btnTestingselector={
                CONSTANTS.testingSelectors.utmTags.listPage.table.createBtn
              }
              btnOnClick={() => {
                presentZUtmTagsFormModal({
                  _cssClass: 'utm-tags-modal-size'
                });
              }}
              showBtn={
                [
                  shareWSPermissionEnum.create_sws_utmTag,
                  shareWSPermissionEnum.update_sws_utmTag
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

      {showSkeleton || isZFetching ? <ZUTMTableSkeleton /> : null}
    </>
  );
};

const ZInpageTable: React.FC = () => {
  const [compState, setCompState] = useState<{
    utmTag?: UTMTagTemplateType;
  }>();

  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { editLinkId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId: string;
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Recoil state.
  const setUtmTagsDataRState = useSetRecoilState(UTMTagsRStateAtom);
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
  // If owned workspace then this api is used to fetch workspace utm tags data.
  const { data: UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  // If share workspace then this api is used to fetch share workspace utm tags data.
  const { data: swsUTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN, wsShareId],
    _shouldFetchWhenIdPassed: wsShareId && shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  const {
    data: getUTMTagFiltersData,
    isFetching: isUTMTagFiltersDataFetching
  } = useZRQGetRequest<ZUserSettingInterface>({
    _url: API_URL_ENUM.user_setting_delete_update_get,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
      ZUserSettingTypeEnum.UTMTagListPageTable
    ],
    _itemsIds: [workspaceId!, ZUserSettingTypeEnum.UTMTagListPageTable],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.settings.type
    ],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: workspaceId ? false : true
  });

  const {
    data: getSWSUTMTagFiltersData,
    isFetching: isSWSUTMTagFiltersDataFetching
  } = useZRQGetRequest<ZUserSettingInterface>({
    _url: API_URL_ENUM.sws_user_setting_delete_update_get,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
      ZUserSettingTypeEnum.UTMTagListPageTable
    ],
    _itemsIds: [shareWSMemberId!, ZUserSettingTypeEnum.UTMTagListPageTable],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.shareWSMemberId,
      CONSTANTS.RouteParams.settings.type
    ],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
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
    data: filteredUtmTagsDataRSelector || [],
    state: {
      columnOrder: getUTMTagFiltersData?.settings?.columnOrderIds || []
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
      if (
        getUTMTagFiltersData?.settings?.columns ||
        getSWSUTMTagFiltersData?.settings?.columns
      ) {
        let __getTemplateNameColumn;
        let __getFormattedCreateAtColumn;
        let __getCampaignColumn;
        let __getContentColumn;
        let __getMediumColumn;
        let __getSourceColumn;
        let __getTermColumn;

        if (workspaceId !== undefined) {
          __getTemplateNameColumn =
            getUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.templateName
            )[0];

          __getFormattedCreateAtColumn =
            getUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.formattedCreateAt
            )[0];

          __getCampaignColumn = getUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.campaign
          )[0];

          __getContentColumn = getUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.content
          )[0];

          __getMediumColumn = getUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.medium
          )[0];

          __getSourceColumn = getUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.source
          )[0];

          __getTermColumn = getUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.term
          )[0];
        } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          __getTemplateNameColumn =
            getSWSUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.templateName
            )[0];

          __getFormattedCreateAtColumn =
            getSWSUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.formattedCreateAt
            )[0];

          __getCampaignColumn =
            getSWSUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.campaign
            )[0];

          __getContentColumn =
            getSWSUTMTagFiltersData?.settings?.columns.filter(
              el => el?.id === ZUTMTagsListPageTableColumnsIds.content
            )[0];

          __getMediumColumn = getSWSUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.medium
          )[0];

          __getSourceColumn = getSWSUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.source
          )[0];

          __getTermColumn = getSWSUTMTagFiltersData?.settings?.columns.filter(
            el => el?.id === ZUTMTagsListPageTableColumnsIds.term
          )[0];
        }

        if (__getTemplateNameColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.templateName)
            ?.toggleVisibility(__getTemplateNameColumn?.isVisible);
        }

        if (__getMediumColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.medium)
            ?.toggleVisibility(__getMediumColumn?.isVisible);
        }

        if (__getFormattedCreateAtColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.formattedCreateAt)
            ?.toggleVisibility(__getFormattedCreateAtColumn?.isVisible);
        }

        if (__getCampaignColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.campaign)
            ?.toggleVisibility(__getCampaignColumn?.isVisible);
        }

        if (__getSourceColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.source)
            ?.toggleVisibility(__getSourceColumn?.isVisible);
        }

        if (__getContentColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.content)
            ?.toggleVisibility(__getContentColumn?.isVisible);
        }

        if (__getTermColumn) {
          zUTMTagTable
            ?.getColumn(ZUTMTagsListPageTableColumnsIds.term)
            ?.toggleVisibility(__getTermColumn?.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getUTMTagFiltersData, getSWSUTMTagFiltersData]);

  useEffect(() => {
    zUTMTagTable.setPageIndex(Number(pageindex) || 0);
    zUTMTagTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);

  useEffect(() => {
    try {
      if (workspaceId && UTMTagsData) {
        setUtmTagsDataRState(UTMTagsData);
      } else if (wsShareId && shareWSMemberId && swsUTMTagsData) {
        setUtmTagsDataRState(swsUTMTagsData);
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [UTMTagsData, swsUTMTagsData, workspaceId, wsShareId, shareWSMemberId]);
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonPopover: presentZUTMTagActionPopover } = useZIonPopover(
    ZUTMTagActionPopover,
    {
      workspaceId,
      wsShareId,
      shareWSMemberId,
      utmTag: compState?.utmTag
    }
  );

  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    { formMode: FormMode.ADD, workspaceId, wsShareId, shareWSMemberId }
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
                                utmTag: _rowInfo?.original
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
                  message={
                    [
                      shareWSPermissionEnum.create_sws_utmTag,
                      shareWSPermissionEnum.update_sws_utmTag
                    ].some(el =>
                      getMemberRolePermissions?.memberPermissions?.includes(el)
                    ) || workspaceId
                      ? 'No UTM tags founds. please create a UTM tag.'
                      : 'No UTM tags founds.'
                  }
                  btnText='Create UTM tag'
                  btnTestingselector={
                    CONSTANTS.testingSelectors.utmTags.listPage.table.createBtn
                  }
                  btnOnClick={() => {
                    presentZUtmTagsFormModal({
                      _cssClass: 'utm-tags-modal-size'
                    });
                  }}
                  showBtn={
                    [
                      shareWSPermissionEnum.create_sws_utmTag,
                      shareWSPermissionEnum.update_sws_utmTag
                    ].some(el =>
                      getMemberRolePermissions?.memberPermissions?.includes(el)
                    ) || workspaceId
                      ? true
                      : false
                  }
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
                  workspaceId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .UTMTag,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId!],
                        routeSearchParams: {
                          pageindex: 0,
                          pagesize: zUTMTagTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId && shareWSMemberId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .UTMTag,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex: 0,
                          pagesize: zUTMTagTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : ''
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
                  workspaceId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .UTMTag,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId!],
                        routeSearchParams: {
                          pageindex:
                            zUTMTagTable.getState().pagination.pageIndex - 1,
                          pagesize: zUTMTagTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId && shareWSMemberId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .UTMTag,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex:
                            zUTMTagTable.getState().pagination.pageIndex - 1,
                          pagesize: zUTMTagTable
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
            disabled={!zUTMTagTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.nextButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanNextPage()) {
                zUTMTagTable.nextPage();

                zNavigatePushRoute(
                  workspaceId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .UTMTag,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId!],
                        routeSearchParams: {
                          pageindex:
                            zUTMTagTable.getState().pagination.pageIndex + 1,
                          pagesize: zUTMTagTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId && shareWSMemberId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .UTMTag,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex:
                            zUTMTagTable.getState().pagination.pageIndex + 1,
                          pagesize: zUTMTagTable
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
            disabled={!zUTMTagTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zUTMTagTable.getCanNextPage()) {
                zUTMTagTable.setPageIndex(zUTMTagTable.getPageCount() - 1);

                zNavigatePushRoute(
                  workspaceId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .UTMTag,
                        params: [CONSTANTS.RouteParams.workspace.workspaceId],
                        values: [workspaceId!],
                        routeSearchParams: {
                          pageindex: zUTMTagTable.getPageCount() - 1,
                          pagesize: zUTMTagTable
                            .getState()
                            .pagination.pageSize.toString()
                        }
                      })
                    : wsShareId && shareWSMemberId
                    ? createRedirectRoute({
                        url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .UTMTag,
                        params: [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        values: [wsShareId, shareWSMemberId],
                        routeSearchParams: {
                          pageindex: zUTMTagTable.getPageCount() - 1,
                          pagesize: zUTMTagTable
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
            {filteredUtmTagsDataRSelector?.length || 0}{' '}
            {filteredUtmTagsDataRSelector?.length === 1 ? 'UTMTag' : 'UTMTags'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem]'
            interface='popover'
            value={zUTMTagTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.utmTags.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zUTMTagTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                workspaceId
                  ? createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.Setting.AccountSettings
                        .UTMTag,
                      params: [CONSTANTS.RouteParams.workspace.workspaceId],
                      values: [workspaceId!],
                      routeSearchParams: {
                        pageindex: zUTMTagTable.getPageCount() - 1,
                        pagesize: Number(e.target.value)
                      }
                    })
                  : wsShareId && shareWSMemberId
                  ? createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                        .UTMTag,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId
                      ],
                      values: [wsShareId, shareWSMemberId],
                      routeSearchParams: {
                        pageindex: zUTMTagTable.getPageCount() - 1,
                        pagesize: Number(e.target.value)
                      }
                    })
                  : ''
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
const ZUTMTableSkeleton: React.FC = React.memo(() => {
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

// UTMTag action popover
const ZUTMTagActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string; // if owned workspace then this will be id of owned workspace.
  wsShareId: string; // if share workspace then this will be id of share workspace.
  shareWSMemberId: string; // if share workspace then this will be id of current member.
  utmTag?: UTMTagTemplateType;
}> = ({
  workspaceId,
  wsShareId,
  shareWSMemberId,
  utmTag,
  dismissZIonPopover,
  zNavigatePushRoute
}) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region Modals & popovers
  const { presentZIonModal: presentZUtmTagsFormModal } = useZIonModal(
    ZaionsAddUtmTags,
    {
      utmTag: utmTag,
      formMode: FormMode.EDIT,
      workspaceId,
      shareWSMemberId,
      wsShareId
    }
  );
  // #endregion

  // #region APIS.
  // If owned-workspace then this api will delete utm tags in this owned-workspace.
  const { mutateAsync: deleteUtmTagMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.userAccountUtmTags_update_delete
  });

  // If owned-workspace then this api will delete utm tags in this owned-workspace.
  const { mutateAsync: deleteSWSUtmTagMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.sws_utm_tag_update_delete
  });
  // #endregion

  // when user won't to delete Utm tag and click on the delete button this function will fire and show the confirm alert.
  const deleteUTMTag = async () => {
    try {
      if (utmTag?.id?.trim()) {
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
  const removeUTMTag = async () => {
    try {
      if (utmTag?.id) {
        let _response;
        if (workspaceId !== undefined) {
          _response = await deleteUtmTagMutate({
            itemIds: [workspaceId, utmTag?.id],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.utmTag.utmTagId
            ]
          });
        }
        if (wsShareId !== undefined && shareWSMemberId !== undefined) {
          _response = await deleteSWSUtmTagMutate({
            itemIds: [shareWSMemberId, utmTag?.id],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSMemberId,
              CONSTANTS.RouteParams.utmTag.utmTagId
            ]
          });
        }

        if (_response) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data && _data?.success) {
            // getting all the utm tag from RQ cache.
            let _oldUTMTags: UTMTagTemplateType[] = [];

            if (workspaceId !== undefined) {
              _oldUTMTags =
                extractInnerData<UTMTagTemplateType[]>(
                  getRQCDataHandler<UTMTagTemplateType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                      workspaceId
                    ]
                  }) as UTMTagTemplateType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];
            } else if (
              wsShareId !== undefined &&
              shareWSMemberId !== undefined
            ) {
              _oldUTMTags =
                extractInnerData<UTMTagTemplateType[]>(
                  getRQCDataHandler<UTMTagTemplateType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
                      wsShareId
                    ]
                  }) as UTMTagTemplateType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];
            }

            // removing deleted utm tag from cache.
            const _updatedUtmTags = _oldUTMTags.filter(
              el => el.id !== utmTag?.id
            );

            // Updating data in RQ cache.
            if (workspaceId !== undefined) {
              await updateRQCDataHandler<UTMTagTemplateType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
                  workspaceId
                ],
                data: _updatedUtmTags as UTMTagTemplateType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (
              wsShareId !== undefined &&
              shareWSMemberId !== undefined
            ) {
              await updateRQCDataHandler<UTMTagTemplateType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN,
                  wsShareId
                ],
                data: _updatedUtmTags as UTMTagTemplateType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            showSuccessNotification(MESSAGES.UTM_TAGS_TEMPLATE.DELETED);

            dismissZIonPopover('', '');
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);

            dismissZIonPopover('', '');
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonList
      lines='none'
      className='ion-no-padding'>
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId && shareWSMemberId
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          workspaceId
            ? [permissionsEnum.update_utmTag]
            : wsShareId && shareWSMemberId
            ? [shareWSPermissionEnum.update_sws_utmTag]
            : []
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={
            CONSTANTS.testingSelectors.utmTags.listPage.table.editBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.utmTags.listPage.table.editBtn}-${utmTag?.id}`}
          onClick={async () => {
            try {
              if (utmTag?.id) {
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

      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId && shareWSMemberId
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          workspaceId
            ? [permissionsEnum.delete_utmTag]
            : wsShareId && shareWSMemberId
            ? [shareWSPermissionEnum.delete_sws_utmTag]
            : []
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => void deleteUTMTag()}
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

export default ZUTMTagsTable;
