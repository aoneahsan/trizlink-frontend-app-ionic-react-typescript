// Core Imports
import React, { useEffect, useRef, useState } from 'react';

// Packages Imports
import { IonPopover } from '@ionic/react';
import {
	fileTrayFullOutline,
	pencilOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import routeQueryString from 'qs';

// Custom Imports
import {
	ZTable,
	ZTableHeadCol,
	ZTableRow,
	ZTableRowCol,
	ZTableTBody,
	ZTableTHead,
} from './table-styled-components.sc';

import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonCheckbox,
	ZIonSkeletonText,
	ZIonSelect,
	ZIonSelectOption,
	ZIonTitle,
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
	createRedirectRoute,
	extractInnerData,
	replaceRouteParams,
} from '@/utils/helpers';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
	useZGetRQCacheData,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';

// Types
import {
	LinkTargetType,
	ShortLinkType,
	ZShortLinkListPageTableColumnsEnum,
	ZShortLinkListPageTableColumnsIds,
} from '@/types/AdminPanel/linksType';

// Recoil State
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';
import { useParams } from 'react-router';
import {
	FilteredShortLinkDataSelector,
	ShortLinksFilterOptionsRStateAtom,
	ShortLinksRStateAtom,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { reportCustomError } from '@/utils/customErrorType';
import ZaionsPixelAccountDetail from '../ZaionsModals/PixelAccount/pixelAccountDetailModal';
import ZaionsLinkNoteDetailModal from '../ZaionsModals/LinkNote/LinkNoteDetail';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import {
	FormMode,
	ZUserSettingInterface,
	ZUserSettingTypeEnum,
} from '@/types/AdminPanel/index.type';
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
	ColumnOrderState,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';

// Styles

const ZaionsShortLinkTable: React.FC<{
	showSkeleton?: boolean;
}> = ({ showSkeleton = false }) => {
	// #region Component state.
	const [compState, setCompState] = useState<{
		selectedShortLinkId?: string;
		showActionPopover: boolean;
	}>({
		showActionPopover: false,
	});
	// #endregion

	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);

	// Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
	const { folderId, workspaceId } = useParams<{
		folderId: string;
		workspaceId: string;
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

	//
	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);
	// #endregion

	// #region custom hooks.
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { zNavigatePushRoute } = useZNavigate();
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// getting search param from url with the help of 'qs' package.
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const { pageindex, pagesize } = routeQSearchParams;
	// #endregion

	const { presentZIonModal: presentShortLinkNoteModal } = useZIonModal(
		ZaionsLinkNoteDetailModal
	);

	// #region APIS requests.
	// Request for deleting short link.
	const { mutateAsync: deleteShortLinkMutate } = useZRQDeleteRequest(
		API_URL_ENUM.shortLinks_update_delete,
		[]
	);

	// Request for getting short links data.
	const { data: ShortLinksData } = useZRQGetRequest<ShortLinkType[]>({
		_url: API_URL_ENUM.shortLinks_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	const { data: getUserSetting, isFetching: isUserSettingFetching } =
		useZRQGetRequest<ZUserSettingInterface>({
			_url: API_URL_ENUM.user_setting_delete_update,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
				workspaceId,
				ZUserSettingTypeEnum.shortLinkListPageTable,
			],
			_itemsIds: [ZUserSettingTypeEnum.shortLinkListPageTable],
			_urlDynamicParts: [CONSTANTS.RouteParams.user.setting.type],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});
	// #endregion

	// When the short links data fetch from backend, storing it in ShortLinksRStateAtom recoil state.
	useEffect(() => {
		try {
			_setShortLinksFilterOptions((oldState) => ({
				...oldState,
				folderId: folderId,
			}));
		} catch (error) {
			reportCustomError(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [folderId]);

	useEffect(() => {
		try {
			if (ShortLinksData) {
				setShortLinksStateAtom(ShortLinksData);
			}
		} catch (error) {
			reportCustomError(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ShortLinksData]);

	// #region Functions.
	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	const { presentZIonModal: presentPixelAccountDetailModal } = useZIonModal(
		ZaionsPixelAccountDetail
	);

	//
	const editShortLinkDetails = async () => {
		try {
			if (compState && compState.selectedShortLinkId) {
				setNewShortLinkFormState((_oldValues) => ({
					..._oldValues,
					formMode: FormMode.EDIT,
				}));

				zNavigatePushRoute(
					replaceRouteParams(
						ZaionsRoutes.AdminPanel.ShortLinks.Edit,
						[
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.editShortLinkIdParam,
						],
						[workspaceId, compState.selectedShortLinkId]
					)
				);
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// when user won't to delete short link and click on the delete button this function will fire and show the confirm alert.
	const deleteShortLink = async () => {
		try {
			if (
				compState.selectedShortLinkId?.trim() &&
				_FilteredShortLinkDataSelector?.length
			) {
				const selectedShortLinkId = _FilteredShortLinkDataSelector?.find(
					(el) => el.id === compState.selectedShortLinkId
				);
				await presentZIonAlert({
					header: `Delete Short Link "${selectedShortLinkId?.title || ''}"`,
					subHeader: 'Remove Short Link from user account.',
					message: 'Are you sure you want to delete this Short Link?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeShortLink();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			await presentZIonErrorAlert();
		}
	};

	// on the delete short link confirm alert, when user click on delete button this function will firs which will trigger delete request and delete the short link.
	const removeShortLink = async () => {
		try {
			if (
				compState.selectedShortLinkId?.trim() &&
				_FilteredShortLinkDataSelector?.length
			) {
				if (compState.selectedShortLinkId) {
					const _response = await deleteShortLinkMutate({
						itemIds: [workspaceId, compState.selectedShortLinkId],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.shortLink.shortLinkId,
						],
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
											workspaceId,
										],
									}) as ShortLinkType[],
									extractInnerDataOptionsEnum.createRequestResponseItems
								) || [];

							// removing deleted shortLinks from cache.
							const _updatedShortLinks = _oldShortLinks.filter(
								(el) => el.id !== compState.selectedShortLinkId
							);

							// Updating data in RQ cache.
							await updateRQCDataHandler<ShortLinkType[] | undefined>({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
									workspaceId,
								],
								data: _updatedShortLinks as ShortLinkType[],
								id: '',
								extractType: ZRQGetRequestExtractEnum.extractItems,
								updateHoleData: true,
							});

							showSuccessNotification(
								MESSAGES.GENERAL.SHORT_LINKS.SHORT_LINK_DELETE
							);
						} else {
							showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
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
	// #endregion

	// #region Managing table data with react-table.
	const columnHelper = createColumnHelper<ShortLinkType>();

	const defaultColumns = [
		columnHelper.display({
			id: ZShortLinkListPageTableColumnsIds.id,
			header: 'Select',
			footer: 'Select Column Footer',
			cell: (props) => {
				return (
					<>
						<ZIonCheckbox />
					</>
				);
			},
		}),

		// Title
		columnHelper.accessor((itemData) => itemData.title, {
			header: 'Title',
			id: ZShortLinkListPageTableColumnsIds.title,
			footer: 'Title',
		}),

		// Date
		columnHelper.accessor((itemData) => itemData.createdAt, {
			header: 'Date',
			id: ZShortLinkListPageTableColumnsIds.date,
			footer: 'Date',
		}),

		// Pixels
		columnHelper.accessor((itemData) => itemData.pixelIds, {
			header: 'No of attached pixels',
			id: ZShortLinkListPageTableColumnsIds.pixel,
			footer: 'Pixels',
			cell: (row) => {
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
									className='zaions__cursor_pointer'
									onClick={() => {
										setShortLinkFormState((oldVal) => ({
											...oldVal,
											pixelAccountIds: JSON.parse(
												row?.getValue()!.toString()
											) as string[],
										}));
										// Open The Modal
										presentPixelAccountDetailModal({
											_cssClass: 'pixel-account-detail-modal-size',
										});
									}}
								>
									View Pixels
								</ZIonText>
							</div>
						) : (
							CONSTANTS.NO_VALUE_FOUND
						)}
					</>
				);
			},
		}),

		// Notes
		columnHelper.accessor((itemData) => itemData.notes, {
			id: ZShortLinkListPageTableColumnsIds.notes,
			header: 'Notes',
			footer: 'Notes',
			cell: (row) => {
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
									onClick={() => {
										setShortLinkFormState((oldVal) => ({
											...oldVal,
											note: row.getValue(),
										}));
										presentShortLinkNoteModal({
											_cssClass: 'pixel-account-detail-modal-size',
										});
									}}
								>
									Read more
								</ZIonText>
							</div>
						) : (
							CONSTANTS.NO_VALUE_FOUND
						)}
					</>
				);
			},
		}),

		// Url
		columnHelper.accessor(
			(itemData) => {
				if (itemData.target) {
					return (itemData.target as LinkTargetType).url;
				}
			},
			{
				header: 'Url',
				id: ZShortLinkListPageTableColumnsIds.url,
				cell: (row) => row.getValue(),
				footer: 'Url Footer',
			}
		),

		// link to share
		columnHelper.accessor('link_to_share', {
			header: 'Link to share',
			id: ZShortLinkListPageTableColumnsIds.linkToShare,
			footer: 'Link to share',
			cell: () => <div>https://linktoshare.com</div>,
		}),
	];

	const zShortLinksTable = useReactTable({
		columns: defaultColumns,
		data: _FilteredShortLinkDataSelector || [],
		state: {
			columnOrder: getUserSetting?.settings?.columnOrderIds || [],
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	// #endregion

	useEffect(() => {
		try {
			if (getUserSetting?.settings?.shortLinkColumn) {
				const __getTitleColumn =
					getUserSetting?.settings?.shortLinkColumn.filter(
						(el) => el.name === ZShortLinkListPageTableColumnsEnum.title
					)[0];

				const __getDateColumn =
					getUserSetting?.settings?.shortLinkColumn.filter(
						(el) => el.name === ZShortLinkListPageTableColumnsEnum.date
					)[0];

				const __getLinkToShareColumn =
					getUserSetting?.settings?.shortLinkColumn.filter(
						(el) => el.name === ZShortLinkListPageTableColumnsEnum.linkToShare
					)[0];

				const __getNotesColumn =
					getUserSetting?.settings?.shortLinkColumn.filter(
						(el) => el.name === ZShortLinkListPageTableColumnsEnum.notes
					)[0];

				const __getPixelsColumn =
					getUserSetting?.settings?.shortLinkColumn.filter(
						(el) => el.name === ZShortLinkListPageTableColumnsEnum.pixels
					)[0];

				const __getUrlColumn = getUserSetting?.settings?.shortLinkColumn.filter(
					(el) => el.name === ZShortLinkListPageTableColumnsEnum.url
				)[0];

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
	}, [getUserSetting]);

	useEffect(() => {
		zShortLinksTable.setPageIndex(Number(pageindex) || 0);
		zShortLinksTable.setPageSize(Number(pagesize) || 2);
	}, [pageindex, pagesize]);

	return (
		<>
			{!showSkeleton && (
				<div className='ps-2'>
					<div className='w-full overflow-y-scroll border rounded-lg h-max zaions_pretty_scrollbar ion-no-padding'>
						{zShortLinksTable
							.getHeaderGroups()
							.map((_headerInfo, _headerIndex) => {
								return (
									<ZIonRow
										key={_headerIndex}
										className='flex mb-2 flex-nowrap zaions__light_bg'
									>
										{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
											return (
												<ZIonCol
													size={
														_columnInfo.column.id === '__z_short_link_id__'
															? '.8'
															: '3'
													}
													key={_columnInfo.id}
													className={classNames({
														'border-b ps-2 py-1 font-bold zaions__light_bg text-sm':
															true,
														'border-r': false,
													})}
												>
													{_columnInfo.column.columnDef.header?.toString()}
												</ZIonCol>
											);
										})}
									</ZIonRow>
								);
							})}

						{/* Body Section */}
						<ZIonRow className='rounded-b-lg'>
							{ShortLinksData?.length ? (
								<ZIonCol size='12' className='w-full ion-no-padding'>
									{zShortLinksTable
										.getRowModel()
										.rows.map((_rowInfo, _rowIndex) => {
											return (
												<ZIonRow key={_rowIndex} className='flex-nowrap'>
													{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) =>
														_cellInfo.column.getIsVisible() ? (
															<ZIonCol
																size={
																	_cellInfo.column.id === '__z_short_link_id__'
																		? '.8'
																		: '3'
																}
																key={_cellIndex}
																className={classNames({
																	'py-1 mt-1 border-b ps-2 flex ion-align-items-center':
																		true,
																	'border-r': false,
																	'ion-justify-content-center':
																		_cellInfo.column.id ===
																		'__z_short_link_id__',
																})}
															>
																<div
																	className={classNames({
																		' w-full text-sm ZaionsTextEllipsis': true,
																		'ion-justify-content-center flex ion-align-items-center':
																			_cellInfo.column.id ===
																			'__z_short_link_id__',
																	})}
																>
																	{flexRender(
																		_cellInfo.column.columnDef.cell,
																		_cellInfo.getContext()
																	)}
																</div>
															</ZIonCol>
														) : null
													)}
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
										No short links founds{' '}
										{(folderId !== null || folderId !== 'all') &&
											'In this Folder'}
										. please create a short link.
									</ZIonTitle>
								</ZIonCol>
							)}
						</ZIonRow>
					</div>

					{/*  */}
					<ZIonRow className='w-full px-2 pt-1 pb-2 mt-1 overflow-hidden rounded-lg zaions__light_bg'>
						<ZIonCol>
							{/* previous buttons */}
							<ZIonButton
								className='mr-1 ion-no-padding ion-no-margin'
								size='small'
								fill='clear'
								onClick={() => {
									if (zShortLinksTable.getCanPreviousPage()) {
										zNavigatePushRoute(
											createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
												params: [
													CONSTANTS.RouteParams.workspace.workspaceId,
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
												],
												values: [workspaceId, 'all'],
												routeSearchParams: {
													pageindex: 0,
													pagesize: zShortLinksTable
														.getState()
														.pagination.pageSize.toString(),
												},
											})
										);

										zShortLinksTable.setPageIndex(0);
									}
								}}
								disabled={!zShortLinksTable.getCanPreviousPage()}
							>
								{/* <ZIonIcon icon={chevronBackOutline} />
							<ZIonIcon icon={chevronBackOutline} /> */}
								<ZIonText className='px-1 text-xl'>{'<<'}</ZIonText>
							</ZIonButton>

							<ZIonButton
								className='mr-1 ion-no-padding ion-no-margin'
								size='small'
								fill='clear'
								onClick={() => {
									if (zShortLinksTable.getCanPreviousPage()) {
										zShortLinksTable.previousPage();

										zNavigatePushRoute(
											createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
												params: [
													CONSTANTS.RouteParams.workspace.workspaceId,
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
												],
												values: [workspaceId, 'all'],
												routeSearchParams: {
													pageindex:
														zShortLinksTable.getState().pagination.pageIndex -
														1,
													pagesize: zShortLinksTable
														.getState()
														.pagination.pageSize.toString(),
												},
											})
										);
									}
								}}
								disabled={!zShortLinksTable.getCanPreviousPage()}
							>
								{/* <ZIonIcon icon={chevronBackOutline} />
							<ZIonIcon icon={chevronBackOutline} /> */}
								<ZIonText className='px-1 text-xl'>{'<'}</ZIonText>
							</ZIonButton>

							{/* next buttons */}
							<ZIonButton
								className='mr-1 ion-no-padding ion-no-margin'
								size='small'
								fill='clear'
								onClick={() => {
									if (zShortLinksTable.getCanNextPage()) {
										zShortLinksTable.nextPage();

										zNavigatePushRoute(
											createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
												params: [
													CONSTANTS.RouteParams.workspace.workspaceId,
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
												],
												values: [workspaceId, 'all'],
												routeSearchParams: {
													pageindex:
														zShortLinksTable.getState().pagination.pageIndex +
														1,
													pagesize: zShortLinksTable
														.getState()
														.pagination.pageSize.toString(),
												},
											})
										);
									}
								}}
								disabled={!zShortLinksTable.getCanNextPage()}
							>
								{/* <ZIonIcon icon={chevronBackOutline} />
							<ZIonIcon icon={chevronBackOutline} /> */}
								<ZIonText className='px-1 text-xl'>{'>'}</ZIonText>
							</ZIonButton>

							<ZIonButton
								className='mr-1 ion-no-padding ion-no-margin'
								size='small'
								fill='clear'
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
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
												],
												values: [workspaceId, 'all'],
												routeSearchParams: {
													pageindex: zShortLinksTable.getPageCount() - 1,
													pagesize: zShortLinksTable
														.getState()
														.pagination.pageSize.toString(),
												},
											})
										);
									}
								}}
								disabled={!zShortLinksTable.getCanNextPage()}
							>
								{/* <ZIonIcon icon={chevronBackOutline} />
							<ZIonIcon icon={chevronBackOutline} /> */}
								<ZIonText className='px-1 text-xl'>{'>>'}</ZIonText>
							</ZIonButton>
						</ZIonCol>

						<ZIonCol></ZIonCol>

						<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
							<ZIonSelect
								minHeight='30px'
								fill='outline'
								className='bg-white w-[7rem]'
								interface='popover'
								value={zShortLinksTable.getState().pagination.pageSize}
								onIonChange={(e) => {
									zShortLinksTable.setPageSize(Number(e.target.value));

									zNavigatePushRoute(
										createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
											params: [
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams
													.folderIdToGetShortLinksOrLinkInBio,
											],
											values: [workspaceId, 'all'],
											routeSearchParams: {
												pageindex: zShortLinksTable.getPageCount() - 1,
												pagesize: Number(e.target.value),
											},
										})
									);
								}}
							>
								{[2, 3].map((pageSize) => (
									<ZIonSelectOption
										key={pageSize}
										value={pageSize}
										className='h-[2.3rem]'
									>
										Show {pageSize}
									</ZIonSelectOption>
								))}
							</ZIonSelect>
						</ZIonCol>
					</ZIonRow>
				</div>
			)}

			{showSkeleton && <ZaionsShortLinkTableSkeleton />}

			{/* Popovers */}
			<IonPopover
				ref={actionsPopoverRef}
				isOpen={compState?.showActionPopover}
				dismissOnSelect
				showBackdrop={false}
				keepContentsMounted
				className='zaions__ion_popover'
				onDidDismiss={() =>
					setCompState((oldVal) => ({ ...oldVal, showActionPopover: false }))
				}
			>
				<ZIonContent>
					<ZIonList lines='none' className='ion-no-padding'>
						<ZCan havePermission={permissionsEnum.update_shortLink}>
							<ZIonItem
								button={true}
								detail={false}
								onClick={() => {
									void editShortLinkDetails();
								}}
							>
								<ZIonButton
									size='small'
									expand='full'
									fill='clear'
									className='mx-auto ion-text-capitalize'
								>
									<ZIonIcon
										icon={pencilOutline}
										className='me-2'
										color='secondary'
									/>
									<ZIonText color='secondary'>Edit</ZIonText>
								</ZIonButton>
							</ZIonItem>
						</ZCan>

						<ZCan havePermission={permissionsEnum.delete_shortLink}>
							<ZIonItem
								button={true}
								detail={false}
								onClick={() => void deleteShortLink()}
							>
								<ZIonButton
									size='small'
									expand='full'
									fill='clear'
									className='mx-auto ion-text-capitalize'
								>
									<ZIonIcon
										icon={trashBinOutline}
										className='me-2'
										color='danger'
									/>
									<ZIonText color='danger'>Delete</ZIonText>
								</ZIonButton>
							</ZIonItem>
						</ZCan>
					</ZIonList>
				</ZIonContent>
			</IonPopover>
		</>
	);
};

// Skeleton.
const ZaionsShortLinkTableSkeleton: React.FC = React.memo(() => {
	return (
		<div className='w-full overflow-y-hidden border rounded-lg ms-2 h-max zaions_pretty_scrollbar ion-no-padding'>
			{/* Row-1 */}
			<ZIonRow className='flex mb-2 flex-nowrap zaions__light_bg'>
				{/* Col-1 */}
				<ZIonCol
					size='.8'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.3rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-2 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.4rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-3 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='2.5rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-4 */}
				<ZIonCol className='text-sm font-bold border-b ps-2 zaions__light_bg'>
					<ZIonSkeletonText width='4.5rem' height='.8rem' animated={true} />
				</ZIonCol>

				{/* Col-5 */}
				<ZIonCol
					size='3'
					className='text-sm font-bold border-b ps-2 zaions__light_bg'
				>
					<ZIonSkeletonText width='4.5rem' height='.8rem' animated={true} />
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='rounded-b-lg'>
				<ZIonCol size='12' className='w-full ion-no-padding'>
					{[1, 2].map((el) => {
						return (
							<ZIonRow className='flex-nowrap' key={el}>
								{/* Row-2 Col-1 */}
								<ZIonCol
									size='.8'
									className='flex py-1 mt-1 border-b ps-4 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='1rem'
										height='1rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='2.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='4.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='2.3'
									className='flex py-1 mt-1 border-b ps-2 ion-align-items-center'
								>
									<ZIonSkeletonText
										width='3.3rem'
										height='.8rem'
										animated={true}
									/>
								</ZIonCol>

								<ZIonCol
									size='3'
									className='flex py-1 mt-1 border-b ps-1 ion-align-items-center'
								>
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
