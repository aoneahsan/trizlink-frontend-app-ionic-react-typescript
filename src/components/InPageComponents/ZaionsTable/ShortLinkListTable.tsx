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
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceRouteParams } from '@/utils/helpers';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';

// Types
import { LinkTargetType } from '@/types/AdminPanel/linksType';

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

// Styles

const ZaionsShortLinkTable = () => {
	// Component state.
	const [compState, setCompState] = useState<{
		selectedShortLinkId?: string;
		showActionPopover: boolean;
	}>({ showActionPopover: false });

	// Recoil state for storing all short links of a user.

	// Recoil selector that will filter from all short links state(ShortLinksRStateAtom) and give the filter short links.
	const _FilteredShortLinkDataSelector = useRecoilValue(
		FilteredShortLinkDataSelector
	);

	// Recoil state for storing filter options. for example folderId, time, etc.
	const _setShortLinksFilterOptions = useSetRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	// Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
	const { folderId, workspaceId } = useParams<{
		folderId: string;
		workspaceId: string;
	}>();

	const actionsPopoverRef = useRef<HTMLIonPopoverElement>(null);

	// custom hooks.
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonAlert } = useZIonAlert();
	const { zNavigatePushRoute } = useZNavigate();

	const { presentZIonModal: presentShortLinkNoteModal } = useZIonModal(
		ZaionsLinkNoteDetailModal
	);

	//
	const setShortLinkFormState = useSetRecoilState(ShortLinkFormState);

	//
	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

	const showActionsPopover = (
		_event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) => {
		if (actionsPopoverRef.current) {
			actionsPopoverRef.current.event = _event;
		}
	};

	//
	const editShortLinkDetails = async () => {
		try {
			if (compState && compState.selectedShortLinkId) {
				setNewShortLinkFormState((_oldValues) => ({
					..._oldValues,
					formMode: FormMode.EDIT,
				}));
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
					// const _response: unknown | ZLinkMutateApiType<ShortLinkType> =
					// 	await deleteShortLinkMutate({
					// 		itemIds: [workspaceId, compState.selectedShortLinkId],
					// 		urlDynamicParts: [
					// 			CONSTANTS.RouteParams.workspace.workspaceId,
					// 			CONSTANTS.RouteParams.shortLink.shortLinkId,
					// 		],
					// 	});
					// if ((_response as ZLinkMutateApiType<ShortLinkType>).success) {
					// 	showSuccessNotification(
					// 		MESSAGES.GENERAL.SHORT_LINKS.SHORT_LINK_DELTE_SUCCESSD_MESSAGE
					// 	);
					// }
				}
			} else {
				void presentZIonErrorAlert();
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<>
			<ZIonRow className='px-4 pt-4 pb-1 mx-1 mt-5 overflow-y-scroll zaions_pretty_scrollbar zaions__bg_white ion-margin-bottom'>
				<ZIonCol>
					<ZTable>
						<ZTableTHead>
							<ZTableRow>
								<ZTableHeadCol>
									<ZIonCheckbox />
								</ZTableHeadCol>
								<ZTableHeadCol>Title</ZTableHeadCol>
								<ZTableHeadCol>Clicks</ZTableHeadCol>
								<ZTableHeadCol>Data</ZTableHeadCol>
								{/* <ZTableHeadCol>Pixels</ZTableHeadCol> */}
								<ZTableHeadCol>Note</ZTableHeadCol>
								<ZTableHeadCol>Url</ZTableHeadCol>
								<ZTableHeadCol>Link To Share</ZTableHeadCol>
								<ZTableHeadCol>Action</ZTableHeadCol>
							</ZTableRow>
						</ZTableTHead>
						<ZTableTBody>
							{_FilteredShortLinkDataSelector &&
								_FilteredShortLinkDataSelector?.map((el) => (
									<ZTableRow key={el.id}>
										<ZTableRowCol>
											<ZIonCheckbox />
										</ZTableRowCol>
										<ZTableRowCol>{el.title}</ZTableRowCol>
										<ZTableRowCol>{el.totalClicks || 0}</ZTableRowCol>
										<ZTableRowCol>{el.createdAt}</ZTableRowCol>
										{/* <ZTableRowCol>
											{(JSON.parse(el?.pixelIds as string) as string[])
												?.length ? (
												<>
													<div className='ZaionsTextEllipsis'>
														{
															(JSON.parse(el?.pixelIds as string) as string[])
																?.length
														}
													</div>
													<ZIonText
														color='primary'
														className='mt-1 zaions__cursor_pointer'
														onClick={() => {
															setShortLinkFormState((oldVal) => ({
																...oldVal,
																pixelAccountIds: JSON.parse(
																	el?.pixelIds as string
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
												</>
											) : (
												CONSTANTS.NO_VALUE_FOUND
											)}
										</ZTableRowCol> */}
										<ZTableRowCol>
											<div className='ZaionsTextEllipsis'>{el.notes}</div>
											{el.notes ? (
												<ZIonText
													color='primary'
													className='mt-1 zaions__cursor_pointer'
													onClick={() => {
														setShortLinkFormState((oldVal) => ({
															...oldVal,
															note: el.notes,
														}));
														presentShortLinkNoteModal({
															_cssClass: 'pixel-account-detail-modal-size',
														});
													}}
												>
													Read more
												</ZIonText>
											) : (
												CONSTANTS.NO_VALUE_FOUND
											)}
										</ZTableRowCol>
										<ZTableRowCol>
											<ZIonRouterLink
												routerLink={ZaionsBusinessDetails.WebsiteUrl}
											>
												{(el.target as LinkTargetType)?.url}
											</ZIonRouterLink>
										</ZTableRowCol>
										<ZTableRowCol>
											<ZIonRouterLink
												routerLink={ZaionsBusinessDetails.WebsiteUrl}
											>
												{ZaionsBusinessDetails.WebsiteUrl}
											</ZIonRouterLink>{' '}
										</ZTableRowCol>
										<ZTableRowCol>
											<ZIonButton
												fill='clear'
												color={'dark'}
												onClick={(_event) => {
													setCompState((oldVal) => ({
														...oldVal,
														selectedShortLinkId: el.id,
														showActionPopover: true,
													}));
													showActionsPopover(_event);
												}}
											>
												<ZIonIcon icon={ellipsisVerticalOutline} />
											</ZIonButton>
										</ZTableRowCol>
									</ZTableRow>
								))}
						</ZTableTBody>
					</ZTable>
					{!_FilteredShortLinkDataSelector?.length && (
						<ZIonCol className='ion-text-center'>
							<ZIonTitle className='mt-10'>
								<ZIonIcon
									icon={fileTrayFullOutline}
									className='mx-auto'
									size='large'
									color='medium'
								/>
							</ZIonTitle>
							<ZIonTitle color='medium'>
								No short links founds
								{(folderId !== null || folderId !== 'all') && ' In this Folder'}
								. please create a short link.
							</ZIonTitle>
						</ZIonCol>
					)}
				</ZIonCol>
			</ZIonRow>

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

export default ZaionsShortLinkTable;
