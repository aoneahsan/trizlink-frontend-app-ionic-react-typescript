// Core Imports
import React, { useEffect, useRef, useState } from 'react';

// Packages Imports
import { IonPopover } from '@ionic/react';
import {
	ellipsisVerticalOutline,
	fileTrayFullOutline,
	pencilOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
	ZIonRouterLink,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonCheckbox,
	ZIonTitle,
	ZIonSkeletonText,
	ZIonGrid,
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { extractInnerData, replaceRouteParams } from '@/utils/helpers';
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
import { LinkTargetType, ShortLinkType } from '@/types/AdminPanel/linksType';

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
import { FormMode } from '@/types/AdminPanel/index.type';
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
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
	}>({ showActionPopover: false });
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
			id: '__z_short_link_id__',
			header: 'Select',
			footer: 'Select Column Footer',
			cell: (props) => {
				console.log({ props });
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
			id: '__z_short_link_title__',
			footer: 'Title',
		}),

		// Date
		columnHelper.accessor((itemData) => itemData.createdAt, {
			header: 'Date',
			id: '__z_short_link_date__',
			footer: 'Date',
		}),

		// Pixels
		columnHelper.accessor((itemData) => itemData.pixelIds, {
			header: 'No of attached pixels',
			id: '__z_short_link_pixels__',
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
			id: '__z_short_link_notes__',
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

		columnHelper.accessor(
			(itemData) => {
				if (itemData.target) {
					return (itemData.target as LinkTargetType).url;
				}
			},
			{
				header: 'Url',
				id: '__z_short_link_target_url__',
				cell: (row) => row.getValue(),
				footer: 'Url Footer',
			}
		),

		// link to share
		columnHelper.accessor('link_to_share', {
			header: 'Link to share',
			id: '__z_short_link_link_to_share__',
			footer: 'Link to share',
			cell: () => <div>https://linktoshare.com</div>,
		}),
	];

	const zShortLinksTable = useReactTable({
		columns: defaultColumns,
		data: _FilteredShortLinkDataSelector || [],
		getCoreRowModel: getCoreRowModel(),
	});

	// #endregion

	return (
		<>
			<div className='w-full overflow-y-scroll border rounded -lg h-max zaions_pretty_scrollbar ion-no-padding ms-2'>
				{zShortLinksTable.getHeaderGroups().map((_headerInfo, _headerIndex) => {
					return (
						<ZIonRow key={_headerIndex} className='flex mb-2 flex-nowrap'>
							{_headerInfo.headers.map((_columnInfo, _columnIndex) => {
								return (
									<ZIonCol
										size={
											_columnInfo.column.id === '__z_short_link_id__'
												? '.8'
												: '3'
										}
										key={_columnIndex}
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
					<ZIonCol size='12' className='w-full ion-no-padding'>
						{zShortLinksTable
							.getCoreRowModel()
							.rows.map((_rowInfo, _rowIndex) => {
								return (
									<>
										{
											<ZIonRow key={_rowIndex} className='flex-nowrap'>
												{_rowInfo.getAllCells().map((_cellInfo, _cellIndex) => {
													return (
														<>
															{_cellInfo.column.getIsVisible() ? (
																<ZIonCol
																	size={
																		_cellInfo.column.id ===
																		'__z_short_link_id__'
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
																			' w-full text-sm ZaionsTextEllipsis':
																				true,
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
															) : null}
														</>
													);
												})}
											</ZIonRow>
										}
									</>
								);
							})}
					</ZIonCol>
				</ZIonRow>
			</div>

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
										color={'secondary'}
									/>
									<ZIonText color={'secondary'}>Edit</ZIonText>
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
		<ZIonRow className='px-4 pt-2 pb-1 mx-1 mt-5 overflow-y-scroll zaions_pretty_scrollbar ion-margin-bottom'>
			<ZIonCol>
				<ZTable>
					<ZTableTHead>
						<ZTableRow>
							<ZTableHeadCol>
								<ZIonSkeletonText width='20px' height='20px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
							<ZTableHeadCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableHeadCol>
						</ZTableRow>
					</ZTableTHead>
					<ZTableTBody>
						<ZTableRow>
							<ZTableRowCol>
								<ZIonSkeletonText width='20px' height='20px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonSkeletonText width='40px' height='17px' animated={true} />
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonText
									color='primary'
									className='mt-1 zaions__cursor_pointer'
								>
									<ZIonSkeletonText
										width='40px'
										height='17px'
										animated={true}
									/>
								</ZIonText>
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonText>
									<ZIonSkeletonText
										width='40px'
										height='17px'
										animated={true}
									/>
								</ZIonText>
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonText>
									<ZIonSkeletonText
										width='40px'
										height='17px'
										animated={true}
									/>
								</ZIonText>
							</ZTableRowCol>
							<ZTableRowCol>
								<ZIonButton fill='clear' color={'dark'}>
									<ZIonSkeletonText
										width='18px'
										height='30px'
										animated={true}
									/>
								</ZIonButton>
							</ZTableRowCol>
						</ZTableRow>
					</ZTableTBody>
				</ZTable>
			</ZIonCol>
		</ZIonRow>
	);
});

export default ZaionsShortLinkTable;
