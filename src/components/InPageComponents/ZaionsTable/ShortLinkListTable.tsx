// Core Imports
import React, { useEffect, useState } from 'react';

// Packages Imports
import {
  chevronBackOutline,
  chevronForwardOutline,
  createOutline,
  ellipsisVerticalOutline,
  fileTrayFullOutline,
  playBackOutline,
  playForwardOutline,
  trashBinOutline
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';
import routeQueryString from 'qs';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';

// Custom Imports
import ZaionsPixelAccountDetail from '../ZaionsModals/PixelAccount/pixelAccountDetailModal';
import ZaionsLinkNoteDetailModal from '../ZaionsModals/LinkNote/LinkNoteDetail';
import ZCan from '@/components/Can';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonCheckbox,
  ZIonSkeletonText,
  ZIonSelect,
  ZIonSelectOption,
  ZIonButton,
  ZIonRouterLink
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZEmptyTable from '../ZEmptyTable';

// Global Constants
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import {
  createRedirectRoute,
  extractInnerData,
  zGenerateShortLink,
  replaceRouteParams,
  replaceParams
} from '@/utils/helpers';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
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
  useZIonPopover,
  useZIonToast
} from '@/ZaionsHooks/zionic-hooks';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';

// Types
import {
  LinkTargetType,
  ShortLinkType,
  ZShortLinkListPageTableColumnsEnum,
  ZShortLinkListPageTableColumnsIds
} from '@/types/AdminPanel/linksType';
import {
  FormMode,
  messengerPlatformsBlockEnum,
  ZUserSettingInterface,
  ZUserSettingTypeEnum
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Recoil State
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';
import {
  FilteredShortLinkDataSelector,
  ShortLinksFilterOptionsRStateAtom,
  ShortLinksRStateAtom
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { reportCustomError } from '@/utils/customErrorType';
import {
  NewShortLinkFormState,
  NewShortLinkSelectTypeOption
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';

// Styles

const ZaionsShortLinkTable: React.FC<{
  showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
  // Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
  const { workspaceId, shareWSMemberId, wsShareId, folderId } = useParams<{
    folderId: string;
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  const { zNavigatePushRoute } = useZNavigate();

  // Recoil state for shortLinks.
  // Recoil selector that will filter from all short links state(ShortLinksRStateAtom) and give the filter short links.
  const _FilteredShortLinkDataSelector = useRecoilValue(
    FilteredShortLinkDataSelector
  );
  const shortLinksStateAtom = useRecoilValue(ShortLinksRStateAtom);
  //
  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
    NewShortLinkSelectTypeOption
  );
  // #endregion

  // #region APIS requests.
  // get share-workspace data api.
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
    _shouldFetchWhenIdPassed: shareWSMemberId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _showLoader: false
  });

  // Request for getting short links data.
  const { data: ShortLinksData } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.shortLinks_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN, workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // Request for getting share workspace short links data.
  const {
    data: swsShortLinksData,
    isFetching: isSWSShortLinksDataFetching,
    isError: isSWSShortLinksDataError
  } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.sws_sl_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN, wsShareId],
    _shouldFetchWhenIdPassed: wsShareId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const resetShortLinkFormHandler = () => {
    try {
      setNewShortLinkFormState(_ => ({
        folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
        shortUrl: {
          domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN
        },
        type: messengerPlatformsBlockEnum.link,
        pixelIds: [],
        tags: [],
        formMode: FormMode.ADD
      }));

      const selectedTypeOptionData = LinkTypeOptionsData.find(
        el => el.type === messengerPlatformsBlockEnum.link
      );

      if (selectedTypeOptionData) {
        setNewShortLinkTypeOptionDataAtom(_ => ({
          ...selectedTypeOptionData
        }));
      }

      zNavigatePushRoute(
        replaceParams(
          ZaionsRoutes.AdminPanel.ShortLinks.Create,
          CONSTANTS.RouteParams.workspace.workspaceId,
          workspaceId
        )
      );
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      {!showSkeleton ? (
        (ShortLinksData && ShortLinksData?.length) ||
        (swsShortLinksData && swsShortLinksData?.length) ? (
          <ZInpageTable />
        ) : (
          <div className='w-full mb-3 border rounded-lg h-max ion-padding zaions__light_bg'>
            <ZEmptyTable
              message={
                (wsShareId &&
                  getMemberRolePermissions?.memberPermissions?.includes(
                    shareWSPermissionEnum.create_sws_shortLink
                  )) ||
                workspaceId
                  ? 'No short links founds. please create a short link.'
                  : 'No short links founds.'
              }
              showBtn={
                wsShareId
                  ? getMemberRolePermissions?.memberPermissions?.includes(
                      shareWSPermissionEnum.create_sws_shortLink
                    )
                  : workspaceId
                  ? true
                  : false
              }
              btnText={
                (wsShareId &&
                  getMemberRolePermissions?.memberPermissions?.includes(
                    shareWSPermissionEnum.create_sws_shortLink
                  )) ||
                workspaceId
                  ? 'Create short link'
                  : undefined
              }
              btnOnClick={() => {
                if (
                  (wsShareId &&
                    getMemberRolePermissions?.memberPermissions?.includes(
                      shareWSPermissionEnum.create_sws_shortLink
                    )) ||
                  workspaceId
                ) {
                  resetShortLinkFormHandler();
                }
              }}
            />
          </div>
        )
      ) : null}

      {showSkeleton && <ZaionsShortLinkTableSkeleton />}
    </>
  );
};

//
const ZInpageTable: React.FC = () => {
  // #region Component state.
  const [compState, setCompState] = useState<{
    selectedShortLinkId?: string;
  }>({});
  // #endregion

  // Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
  const { folderId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    folderId: string;
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  // #region Recoils.
  // Recoil state for storing all short links of a user.
  const setShortLinksStateAtom = useSetRecoilState(ShortLinksRStateAtom);
  // Recoil selector that will filter from all short links state(ShortLinksRStateAtom) and give the filter short links.
  const _FilteredShortLinkDataSelector = useRecoilValue(
    FilteredShortLinkDataSelector
  );

  // Recoil state for storing filter options. for example folderId, time, etc.
  const _setShortLinksFilterOptions = useSetRecoilState(
    ShortLinksFilterOptionsRStateAtom
  );
  //
  const setShortLinkFormState = useSetRecoilState(ShortLinkFormState);
  // #endregion

  // #region custom hooks.
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonToast } = useZIonToast();
  const { isMdScale, isSmScale } = useZMediaQueryScale();
  // getting search param from url with the help of 'qs' package.
  const routeQSearchParams = routeQueryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { pageindex, pagesize } = routeQSearchParams;
  // #endregion

  // #region APIS requests.
  // Request for getting short links data.
  const { data: ShortLinksData } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.shortLinks_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN, workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // Request for getting share workspace short links data.
  const {
    data: swsShortLinksData,
    isFetching: isSWSShortLinksDataFetching,
    isError: isSWSShortLinksDataError
  } = useZRQGetRequest<ShortLinkType[]>({
    _url: API_URL_ENUM.sws_sl_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.SWS_MAIN, wsShareId],
    _shouldFetchWhenIdPassed: wsShareId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });

  // If owned-workspace then this api will fetch owned-workspace-short-link filters options data.
  const { data: getUserSetting, isFetching: isUserSettingFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
        workspaceId,
        ZUserSettingTypeEnum.shortLinkListPageTable
      ],
      _shouldFetchWhenIdPassed: workspaceId ? false : true,
      _itemsIds: [workspaceId!, ZUserSettingTypeEnum.shortLinkListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.settings.type
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  // If share-workspace then this api will fetch share-workspace-short-link filters options data.
  const { data: swsGetUserSetting, isFetching: isSWSUserSettingFetching } =
    useZRQGetRequest<ZUserSettingInterface>({
      _url: API_URL_ENUM.sws_user_setting_delete_update_get,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
        wsShareId,
        ZUserSettingTypeEnum.shortLinkListPageTable
      ],
      _itemsIds: [shareWSMemberId, ZUserSettingTypeEnum.shortLinkListPageTable],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.shareWSMemberId,
        CONSTANTS.RouteParams.settings.type
      ],
      _shouldFetchWhenIdPassed: wsShareId ? false : true,
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });
  // #endregion

  // #region Modal & Popovers.
  const { presentZIonModal: presentPixelAccountDetailModal } = useZIonModal(
    ZaionsPixelAccountDetail,
    { workspaceId }
  );

  const { presentZIonModal: presentShortLinkNoteModal } = useZIonModal(
    ZaionsLinkNoteDetailModal
  );

  const { presentZIonPopover: presentZShortLinkActionPopover } = useZIonPopover(
    ZShortLinkActionPopover,
    {
      workspaceId: workspaceId,
      shareWSMemberId,
      wsShareId,
      shortLinkId: compState.selectedShortLinkId
    }
  );
  // #endregion

  // #region Managing table data with react-table.
  const columnHelper = createColumnHelper<ShortLinkType>();

  const defaultColumns = [
    columnHelper.display({
      id: ZShortLinkListPageTableColumnsIds.id,
      header: 'Select',
      footer: 'Select Column Footer',
      cell: props => {
        return <ZIonCheckbox />;
      }
    }),

    // Title
    columnHelper.accessor(itemData => itemData.title, {
      header: 'Title',
      id: ZShortLinkListPageTableColumnsIds.title,
      cell: row => {
        return (
          <ZIonRouterLink
            className='hover:underline'
            routerLink={replaceRouteParams(
              ZaionsRoutes.AdminPanel.ShortLinks.Edit,
              [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.editShortLinkIdParam
              ],
              [workspaceId, row?.row?.original?.id!]
            )}>
            <ZIonText>{row.getValue()}</ZIonText>
          </ZIonRouterLink>
        );
      },
      footer: 'Title'
    }),

    // Date
    columnHelper.accessor(itemData => itemData.createdAt, {
      header: 'Date',
      id: ZShortLinkListPageTableColumnsIds.date,
      footer: 'Date'
    }),

    // Pixels
    columnHelper.accessor(itemData => itemData.pixelIds, {
      header: 'No of attached pixels',
      id: ZShortLinkListPageTableColumnsIds.pixel,
      footer: 'Pixels',
      cell: row => {
        return (
          <>
            {(JSON.parse(row?.getValue()!.toString()) as string[])?.length >
            0 ? (
              <div className='flex gap-1 ion-align-items-center ZaionsTextEllipsis'>
                <div className=''>
                  {
                    (JSON.parse(row?.getValue()!.toString()) as string[])
                      ?.length
                  }
                </div>
                <ZIonText
                  color='primary'
                  className='cursor-pointer'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.table.pixel
                  }
                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.pixel}-${row.row.original.id}`}
                  onClick={() => {
                    setShortLinkFormState(oldVal => ({
                      ...oldVal,
                      pixelAccountIds: JSON.parse(
                        row?.getValue()!.toString()
                      ) as string[]
                    }));
                    // Open The Modal
                    presentPixelAccountDetailModal({
                      _cssClass: 'pixel-account-detail-modal-size'
                    });
                  }}>
                  View Pixels
                </ZIonText>
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // Notes
    columnHelper.accessor(itemData => itemData.notes, {
      id: ZShortLinkListPageTableColumnsIds.notes,
      header: 'Notes',
      footer: 'Notes',
      cell: row => {
        return (
          <>
            {row.getValue() ? (
              <div className='flex ion-align-items-center'>
                <div className='text-sm ZaionsTextEllipsis'>
                  {row.getValue()}
                </div>
                <ZIonText
                  color='primary'
                  className='text-sm cursor-pointer'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.listPage.table.notes
                  }
                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.notes}-${row.row.original.id}`}
                  onClick={() => {
                    setShortLinkFormState(oldVal => ({
                      ...oldVal,
                      note: row.getValue()
                    }));
                    presentShortLinkNoteModal({
                      _cssClass: 'pixel-account-detail-modal-size'
                    });
                  }}>
                  Read more
                </ZIonText>
              </div>
            ) : (
              CONSTANTS.NO_VALUE_FOUND
            )}
          </>
        );
      }
    }),

    // Url
    columnHelper.accessor(
      itemData => {
        if (itemData.target) {
          return (itemData.target as LinkTargetType).url;
        }
      },
      {
        header: 'Url',
        id: ZShortLinkListPageTableColumnsIds.url,
        cell: row => (
          <ZIonRouterLink
            routerLink={String(row.getValue())}
            color='dark'
            className='hover:underline'
            target='_blank'
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.url
            }
            testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.url}-${row.row.original.id}`}>
            {row.getValue()}
          </ZIonRouterLink>
        ),
        footer: 'Url Footer'
      }
    ),

    // link to share
    columnHelper.accessor('link_to_share', {
      header: 'Link to share',
      id: ZShortLinkListPageTableColumnsIds.linkToShare,
      footer: 'Link to share',
      cell: ({ row }) => {
        const _shortLink = zGenerateShortLink({
          domain: row?.original?.shortUrlDomain,
          urlPath: row?.original?.shortUrlPath
        });
        return (
          <div className='ZaionsTextEllipsis'>
            <ZIonText
              color='primary'
              className='block cursor-pointer hover:underline'
              id={`z-shortlink-${row?.original?.id}`}
              testingselector={
                CONSTANTS.testingSelectors.shortLink.listPage.table.linkToShare
              }
              testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.linkToShare}-${row.original.id}`}
              onClick={() => {
                navigator.clipboard.writeText(_shortLink || '');

                presentZIonToast('✨ Copied', 'tertiary');
              }}>
              {_shortLink}
            </ZIonText>

            <ZRTooltip
              anchorSelect={`#z-shortlink-${row?.original?.id}`}
              place='top'
              onArrow={true}
              variant='info'
              className='z-50'>
              <ZIonText>{_shortLink}</ZIonText>
            </ZRTooltip>
          </div>
        );
      }
    })
  ];

  const zShortLinksTable = useReactTable({
    columns: defaultColumns,
    data: _FilteredShortLinkDataSelector || [],
    state: {
      columnOrder: workspaceId
        ? getUserSetting?.settings?.columnOrderIds
        : wsShareId
        ? swsGetUserSetting?.settings?.columnOrderIds
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
    try {
      if (
        getUserSetting?.settings?.columns ||
        swsGetUserSetting?.settings?.columns
      ) {
        let __getTitleColumn;
        let __getDateColumn;
        let __getLinkToShareColumn;
        let __getNotesColumn;
        let __getPixelsColumn;
        let __getUrlColumn;

        if (workspaceId) {
          __getTitleColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.title
          )[0];

          __getDateColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.date
          )[0];

          __getLinkToShareColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.linkToShare
          )[0];

          __getNotesColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.notes
          )[0];

          __getPixelsColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.pixel
          )[0];

          __getUrlColumn = getUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.url
          )[0];
        } else if (wsShareId) {
          __getTitleColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.title
          )[0];

          __getDateColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.date
          )[0];

          __getLinkToShareColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.linkToShare
          )[0];

          __getNotesColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.notes
          )[0];

          __getPixelsColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.pixel
          )[0];

          __getUrlColumn = swsGetUserSetting?.settings?.columns.filter(
            el => el?.id === ZShortLinkListPageTableColumnsIds.url
          )[0];
        }

        if (__getTitleColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_title__')
            ?.toggleVisibility(__getTitleColumn.isVisible);
        }

        if (__getDateColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_date__')
            ?.toggleVisibility(__getDateColumn.isVisible);
        }

        if (__getLinkToShareColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_link_to_share__')
            ?.toggleVisibility(__getLinkToShareColumn.isVisible);
        }

        if (__getNotesColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_notes__')
            ?.toggleVisibility(__getNotesColumn.isVisible);
        }

        if (__getNotesColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_notes__')
            ?.toggleVisibility(__getNotesColumn.isVisible);
        }

        if (__getPixelsColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_pixels__')
            ?.toggleVisibility(__getPixelsColumn.isVisible);
        }

        if (__getUrlColumn) {
          zShortLinksTable
            .getColumn('__z_short_link_target_url__')
            ?.toggleVisibility(__getUrlColumn.isVisible);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [workspaceId, getUserSetting, swsGetUserSetting, wsShareId]);

  useEffect(() => {
    zShortLinksTable.setPageIndex(Number(pageindex) || 0);
    zShortLinksTable.setPageSize(Number(pagesize) || 2);
  }, [pageindex, pagesize]);

  // When the short links data fetch from backend, storing it in ShortLinksRStateAtom recoil state.
  useEffect(() => {
    try {
      _setShortLinksFilterOptions(oldState => ({
        ...oldState,
        folderId: folderId
      }));
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  useEffect(() => {
    try {
      if (workspaceId && ShortLinksData) {
        setShortLinksStateAtom(ShortLinksData);
      } else if (wsShareId && swsShortLinksData) {
        setShortLinksStateAtom(swsShortLinksData);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShortLinksData]);
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
          {zShortLinksTable
            .getHeaderGroups()
            .map((_headerInfo, _headerIndex) => {
              return (
                <ZIonRow
                  key={_headerIndex}
                  className='flex flex-nowrap zaions__light_bg'>
                  {_headerInfo.headers.map((_columnInfo, _columnIndex) => {
                    return (
                      <ZIonCol
                        size={
                          _columnInfo.column.id ===
                            ZShortLinkListPageTableColumnsIds.id ||
                          _columnInfo.column.id ===
                            ZShortLinkListPageTableColumnsIds.actions
                            ? '.8'
                            : '2.5'
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
              {zShortLinksTable
                .getRowModel()
                .rows.map((_rowInfo, _rowIndex) => {
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
                                ZShortLinkListPageTableColumnsIds.id ||
                              _cellInfo.column.id ===
                                ZShortLinkListPageTableColumnsIds.actions
                                ? '.8'
                                : '2.5'
                            }
                            className={classNames({
                              'py-1 mt-1 border-b flex ion-align-items-center':
                                true,
                              'border-r': false,
                              'ps-2':
                                _cellInfo.column.id !==
                                ZShortLinkListPageTableColumnsIds.id,
                              'ps-0':
                                _cellInfo.column.id ===
                                ZShortLinkListPageTableColumnsIds.id
                            })}>
                            <div
                              className={classNames({
                                'w-full text-sm ZaionsTextEllipsis': true,
                                'ps-3':
                                  _cellInfo.column.id ===
                                  ZShortLinkListPageTableColumnsIds.id
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
                              selectedShortLinkId: _rowInfo.original.id || ''
                            }));

                            //
                            presentZShortLinkActionPopover({
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
            disabled={!zShortLinksTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table
                .getFirstPageButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanPreviousPage()) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: 0,
                      pagesize: zShortLinksTable
                        .getState()
                        .pagination.pageSize.toString()
                    }
                  })
                );

                zShortLinksTable.setPageIndex(0);
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
            disabled={!zShortLinksTable.getCanPreviousPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.previousButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanPreviousPage()) {
                zShortLinksTable.previousPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex:
                        zShortLinksTable.getState().pagination.pageIndex - 1,
                      pagesize: zShortLinksTable
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
            disabled={!zShortLinksTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.nextButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanNextPage()) {
                zShortLinksTable.nextPage();

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex:
                        zShortLinksTable.getState().pagination.pageIndex + 1,
                      pagesize: zShortLinksTable
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
            disabled={!zShortLinksTable.getCanNextPage()}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table
                .getLastPageButton
            }
            onClick={() => {
              if (zShortLinksTable.getCanNextPage()) {
                zShortLinksTable.setPageIndex(
                  zShortLinksTable.getPageCount() - 1
                );

                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                    params: [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                    ],
                    values: [
                      workspaceId,
                      CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                    ],
                    routeSearchParams: {
                      pageindex: zShortLinksTable.getPageCount() - 1,
                      pagesize: zShortLinksTable
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
            {_FilteredShortLinkDataSelector?.length || 0}{' '}
            {_FilteredShortLinkDataSelector?.length === 1 ? 'Link' : 'Links'}
          </ZIonText>
          <ZIonSelect
            minHeight='30px'
            fill='outline'
            className='bg-white w-[7rem]'
            interface='popover'
            value={zShortLinksTable.getState().pagination.pageSize}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.listPage.table.pageSizeInput
            }
            onIonChange={e => {
              zShortLinksTable.setPageSize(Number(e.target.value));

              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                  ],
                  values: [workspaceId, CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE],
                  routeSearchParams: {
                    pageindex: zShortLinksTable.getPageCount() - 1,
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

// Shortlink action popover
const ZShortLinkActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  workspaceId: string;
  shortLinkId: string;
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonPopover,
  workspaceId,
  shareWSMemberId,
  wsShareId,
  shortLinkId,
  zNavigatePushRoute
}) => {
  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);
  // Recoil selector that will filter from all short links state(ShortLinksRStateAtom) and give the filter short links.
  const _FilteredShortLinkDataSelector = useRecoilValue(
    FilteredShortLinkDataSelector
  );

  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // Request for deleting short link.
  const { mutateAsync: deleteShortLinkMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.shortLinks_update_delete
  });

  // when user won't to delete short link and click on the delete button this function will fire and show the confirm alert.
  const deleteShortLink = async () => {
    try {
      if (shortLinkId?.trim() && _FilteredShortLinkDataSelector?.length) {
        // const selectedShortLinkId = _FilteredShortLinkDataSelector?.find(
        //   el => el.id === shortLinkId
        // );
        await presentZIonAlert({
          header: MESSAGES.SHORT_LINKS.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.SHORT_LINKS.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.SHORT_LINKS.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'danger',
              cssClass: 'zaions_ion_color_danger',
              handler: () => {
                void removeShortLink();
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
  const removeShortLink = async () => {
    try {
      if (shortLinkId?.trim() && _FilteredShortLinkDataSelector?.length) {
        if (shortLinkId) {
          const _response = await deleteShortLinkMutate({
            itemIds: [workspaceId, shortLinkId],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.shortLink.shortLinkId
            ]
          });

          if (_response) {
            const _data = extractInnerData<{ success: boolean }>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data && _data?.success) {
              // getting all the shortLinks from RQ cache.
              const _oldShortLinks =
                extractInnerData<ShortLinkType[]>(
                  getRQCDataHandler<ShortLinkType[]>({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
                      workspaceId
                    ]
                  }) as ShortLinkType[],
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];

              // removing deleted shortLinks from cache.
              const _updatedShortLinks = _oldShortLinks.filter(
                el => el.id !== shortLinkId
              );

              // Updating data in RQ cache.
              await updateRQCDataHandler<ShortLinkType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
                  workspaceId
                ],
                data: _updatedShortLinks as ShortLinkType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });

              showSuccessNotification(MESSAGES.SHORT_LINKS.DELETE);

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
      <ZCan
        shareWSId={wsShareId}
        permissionType={
          wsShareId
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId
            ? [shareWSPermissionEnum.update_sws_shortLink]
            : [permissionsEnum.update_shortLink]
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          testingselector={
            CONSTANTS.testingSelectors.shortLink.listPage.table.editBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.editBtn}-${shortLinkId}`}
          onClick={async () => {
            try {
              if (shortLinkId) {
                setNewShortLinkFormState(_oldValues => ({
                  ..._oldValues,
                  formMode: FormMode.EDIT
                }));

                zNavigatePushRoute(
                  replaceRouteParams(
                    ZaionsRoutes.AdminPanel.ShortLinks.Edit,
                    [
                      CONSTANTS.RouteParams.workspace.workspaceId,
                      CONSTANTS.RouteParams.editShortLinkIdParam
                    ],
                    [workspaceId, shortLinkId]
                  )
                );

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
          wsShareId
            ? permissionsTypeEnum.shareWSMemberPermissions
            : permissionsTypeEnum.loggedInUserPermissions
        }
        havePermissions={
          wsShareId
            ? [shareWSPermissionEnum.delete_sws_shortLink]
            : [permissionsEnum.delete_shortLink]
        }>
        <ZIonItem
          button={true}
          detail={false}
          minHeight='2.5rem'
          onClick={() => void deleteShortLink()}
          testingselector={
            CONSTANTS.testingSelectors.shortLink.listPage.table.deleteBtn
          }
          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.listPage.table.deleteBtn}-${shortLinkId}`}>
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

// Skeleton.
const ZaionsShortLinkTableSkeleton: React.FC = React.memo(() => {
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

export default ZaionsShortLinkTable;
