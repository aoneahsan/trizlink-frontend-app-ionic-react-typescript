// Core Imports
import React, { useState } from 'react';

// Packages Imports
import {
	IonSegmentButton,
	ItemReorderEventDetail,
	RefresherEventDetail,
} from '@ionic/react';
import {
	menuOutline,
	businessOutline,
	calendar,
	pricetagOutline,
	filterOutline,
	refresh,
} from 'ionicons/icons';
import {
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import classNames from 'classnames';
import { Formik } from 'formik';
import dayjs from 'dayjs';

// Custom Imports
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
import ZaionsShortLinkTable from '@/components/InPageComponents/ZaionsTable/ShortLinkListTable';
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonInput,
	ZIonRow,
	ZIonList,
	ZIonGrid,
	ZIonChip,
	ZIonContent,
	ZIonMenuToggle,
	ZIonDatetimeButton,
	ZIonButton,
	ZIonCheckbox,
	ZIonButtons,
} from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZRCheckbox from '@/components/CustomComponents/ZRCheckbox';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZIonRefresher from '@/components/ZIonComponents/ZIonRefresher';
import ZIonRefresherContent from '@/components/ZIonComponents/ZIonRefresherContent';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	useZInvalidateReactQueries,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import FolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/FoldersActionPopover';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

// Types
import { LinkFolderType, TimeFilterEnum } from '@/types/AdminPanel/linksType';
import {
	AdminPanelMainSidebarMenuPageEnum,
	folderState,
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';

// Recoil States
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import {
	ShortLinksFieldsDataRStateSelector,
	ShortLinksFilterOptionsRStateAtom,
	ShortLinksRStateAtom,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';

// Global Contents
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM, PAGE_MENU, PAGE_MENU_SIDE } from '@/utils/enums';
import { replaceParams, zStringify } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';

// Styles
import classes from './styles.module.css';
import ZDashboardSidebar from '@/components/AdminPanelComponents/Sidebar';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { useParams } from 'react-router';

const ZShortLinksListPage: React.FC = () => {
	// Component state.
	const [compState, setCompState] = useState<{
		shortLinksFoldersReorder: {
			Ids?: string[];
			isEnable?: boolean;
		};
	}>({
		shortLinksFoldersReorder: {
			isEnable: false,
		},
	});

	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	// Custom hooks.
	const { isXlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale(); // media query hook.
	const { zInvalidateReactQueries } = useZInvalidateReactQueries();
	const { validateRequestResponse } = useZValidateRequestResponse();

	// Short links folders reorder function.
	const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
		event.detail.complete();

		setTimeout(() => {
			const _shortLinksFoldersEls = document.querySelectorAll(
				'.zaions-short-link-folder'
			);
			const _shortLinksFoldersIds: string[] = [];
			for (let i = 0; i < _shortLinksFoldersEls.length; i++) {
				const _block = _shortLinksFoldersEls[i];
				_shortLinksFoldersIds.push(
					_block.getAttribute('data-folder-id') as string
				);
			}

			if (_shortLinksFoldersIds.length) {
				setCompState((_) => ({
					shortLinksFoldersReorder: {
						Ids: _shortLinksFoldersIds,
						isEnable: _shortLinksFoldersIds.length > 1,
					},
				}));
			}
		}, 100);
	};

	// Recoil state for storing filter options for short-links.
	const shortLinksFilterOptions = useRecoilValue(
		ShortLinksFilterOptionsRStateAtom
	);

	//
	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

	//
	const setFolderFormState = useSetRecoilState(FolderFormState);

	// Request for getting short links folders.
	const { data: shortLinksFoldersData } = useZRQGetRequest<LinkFolderType[]>({
		_url: API_URL_ENUM.ShortLink_folders_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
			workspaceId,
			folderState.shortlink,
		],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	//
	const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
		FolderActionsPopoverContent,
		{
			workspaceId,
			state: folderState.shortlink,
		}
	);

	//
	const { presentZIonPopover: presentShortLinkTimeFilterModal } =
		useZIonPopover(ShortLinksTimeRangeFilterPopover);

	//
	const { presentZIonPopover: presentShortLinkTagsFilterModal } =
		useZIonPopover(ShortLinksTagsFiltersPopover);

	//
	const { presentZIonPopover: presentShortLinkDomainsFilterModal } =
		useZIonPopover(ShortLinksDomainsFiltersPopover);

	//
	const shortLinksStateAtom = useRecoilValue(ShortLinksRStateAtom);

	//
	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: folderState.shortlink,
			workspaceId,
		}
	);

	// Update shortLinks folders reorder API
	const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
		_url: API_URL_ENUM.ShortLinks_folders_reorder,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
			workspaceId,
			folderState.shortlink,
		],
	});

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	const invalidedShortLinksQuery = async () => {
		try {
			await zInvalidateReactQueries([
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
				workspaceId,
			]);
		} catch (error) {
			reportCustomError(error);
		}
	};

	const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
		try {
			await invalidedShortLinksQuery();
			event.detail.complete();
		} catch (error) {
			reportCustomError(error);
		}
	};

	const shortLinksFoldersReOrderHandler = async () => {
		try {
			// The update api...
			const _result = await UpdateShortLinksFoldersReorder({
				requestData: zStringify({
					folders: compState.shortLinksFoldersReorder.Ids,
				}),
				itemIds: [],
				urlDynamicParts: [],
			});

			// if _result of the UpdateShortLinksFoldersReorder api is success this showing success notification else not success then error notification.
			await validateRequestResponse({
				resultObj: _result,
			});

			// hiding the reorder button by assigning isEnable to false
			setCompState((oldValues) => ({
				...oldValues,
				shortLinksFoldersReorder: {
					Ids: oldValues.shortLinksFoldersReorder.Ids,
					isEnable: false,
				},
			}));
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZaionsIonPage
			pageTitle='Zaions short-links list page'
			id={CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID}
			menu={PAGE_MENU.ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU}
		>
			<ZCan havePermission={permissionsEnum.viewAny_shortLink}>
				<ZIonContent>
					{/* IonRefresher */}
					<ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
						<ZIonRefresherContent />
					</ZIonRefresher>

					{/*  */}
					<ZIonGrid className='ion-no-padding zaions_h100'>
						<ZIonRow className='zaions_h100'>
							{/* Side bar */}
							<ZDashboardSidebar
								type={AdminPanelMainSidebarMenuPageEnum.shortLink}
								//
								// foldersData={[]}
								foldersData={shortLinksFoldersData ? shortLinksFoldersData : []}
								//
								addNewFolderButtonOnClickHandler={() => {
									setFolderFormState((oldVal) => ({
										...oldVal,
										id: '',
										name: '',
										formMode: FormMode.ADD,
									}));
									presentFolderModal({
										_cssClass: 'link-in-bio-folder-modal',
									});
								}}
								//
								foldersSaveReorderButtonOnClickHandler={() => {
									void shortLinksFoldersReOrderHandler();
								}}
								//
								handleFoldersReorder={handleReorder}
								//
								showFoldersSaveReorderButton={
									compState?.shortLinksFoldersReorder?.isEnable
								}
								//
								folderActionsButtonOnClickHandler={(event: unknown) => {
									presentFolderActionIonPopover({
										_event: event as Event,
										_cssClass: classNames(
											classes.zaions_present_folder_Action_popover_width
										),
									});
								}}
							/>

							{/* Main Container */}
							<ZIonCol
								className='zaions-transition'
								sizeXl={
									ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
										? '8'
										: '8.8'
								}
								sizeLg={
									ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
										? '8'
										: '8.8'
								}
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
							>
								<ZIonGrid className='pb-2 zaions__bg_white ion-no-padding'>
									<ZIonRow
										className={classNames({
											'px-3 ion-align-items-center': true,
											'mt-4': isLgScale,
										})}
									>
										{!isLgScale && (
											<ZIonCol
												size='max-content'
												sizeSm='max-content'
												sizeXs='12'
												className={classNames({
													'order-3': !isMdScale,
												})}
											>
												<ZIonMenuToggle
													autoHide={false}
													menu={
														CONSTANTS.MENU_IDS
															.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID
													}
												>
													<ZIonButton
														className={classNames({
															'text-transform-initial': true,
															'open-folder-menu-button': isLgScale || isSmScale,
															'mt-4 ms-0': !isMdScale,
														})}
														expand={!isSmScale ? 'block' : undefined}
														// menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID}
														// autoHide={false}
													>
														Open folders menu
													</ZIonButton>
												</ZIonMenuToggle>
											</ZIonCol>
										)}

										<ZIonCol
											className={classNames({
												'order-1': !isMdScale,
											})}
										>
											<ZIonText
												className={classNames({
													'text-2xl font-bold block': true,
													'ion-text-center': !isLgScale,
												})}
												color='medium'
											>
												Create a new link
											</ZIonText>
											<ZIonText
												className={classNames({
													'text-md block': true,
													'ion-text-center ms-3': !isLgScale,
												})}
												color='medium'
											>
												Create & manage your links
											</ZIonText>
										</ZIonCol>

										<ZCan havePermission={permissionsEnum.create_shortLink}>
											<ZIonCol
												sizeXl='4'
												sizeLg='5'
												sizeMd='5'
												sizeSm='12'
												sizeXs='12'
												className={classNames({
													'mt-4 order-2': !isMdScale,
												})}
											>
												<ZaionsCreateShortLinkUrlInput />
											</ZIonCol>
										</ZCan>
									</ZIonRow>
								</ZIonGrid>

								<ZIonGrid className='mt-3 mb-5'>
									<ZIonRow className='px-3 py-4 rounded zaions__bg_white ion-align-items-center'>
										<ZIonCol
											sizeXl='4'
											sizeLg='12'
											sizeMd='12'
											sizeSm='12'
											sizeXs='12'
										>
											<SearchQueryInputComponent />
										</ZIonCol>

										<ZIonCol>
											<ZIonRow
												className={classNames({
													'justify-content-end': isXlScale,
													'justify-content-start mt-4': !isXlScale,
													'row-gap-1-rem': !isLgScale,
												})}
											>
												<ZIonButtons
													className={classNames({
														'w-full': true,
														'ion-justify-content-between': !isXlScale,
														'ion-justify-content-end gap-3': isXlScale,
														block: !isSmScale,
													})}
												>
													<ZIonButton
														id='dropdown-basic'
														fill='outline'
														color='primary'
														expand={!isSmScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
													>
														Export data's
													</ZIonButton>

													<ZIonButton
														fill='outline'
														color='primary'
														expand={!isSmScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
													>
														Bulk Import
													</ZIonButton>

													<ZCan
														havePermission={permissionsEnum.create_shortLink}
													>
														<ZIonButton
															color='primary'
															fill='solid'
															className={classNames({
																'my-2': true,
															})}
															expand={!isSmScale ? 'block' : undefined}
															onClick={() =>
																setNewShortLinkFormState((_) => ({
																	folderId:
																		CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
																	shortUrl: {
																		domain:
																			CONSTANTS.DEFAULT_VALUES
																				.DEFAULT_CUSTOM_DOMAIN,
																	},
																	type: messengerPlatformsBlockEnum.link,
																	pixelIds: [],
																	tags: [],
																	formMode: FormMode.ADD,
																}))
															}
														>
															Create a new link
														</ZIonButton>
													</ZCan>
												</ZIonButtons>
												{/* <ZIonCol
												sizeXl='max-content'
												sizeSm='4'
												sizeXs='6'
												className={classNames({
													'ion-text-end': isXlScale,
													'ion-text-start': !isXlScale,
												})}
											>
												<Dropdown>
													<Dropdown.Toggle
														id='dropdown-custom-components'
														className={`${classes.zaions__dropdown_toggle}`}
													>
														<ZIonButton
															id='dropdown-basic'
															fill='outline'
															className='ms-auto'
														>
															Export data's
														</ZIonButton>
													</Dropdown.Toggle>
													<Dropdown.Menu className='ms-auto'>
														<Dropdown.Item
															className={`${classes.zaions__dropdown_item}`}
														>
															Export all data's
														</Dropdown.Item>
														<Dropdown.Item
															className={`${classes.zaions__dropdown_item}`}
														>
															Export folders data's
														</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</ZIonCol>

											<ZIonCol
												sizeXl='max-content'
												sizeSm='4'
												sizeXs='6'
												className={classNames({
													'ion-text-end': isXlScale,
													'ion-text-start': !isXlScale,
												})}
											>
												<ZIonMenuToggle
													autoHide={false}
													// menu={ADMIN_LINK_PAGE_CONTENT_ID}
												>
													<ZIonButton fill='outline' className='me-3'>
														Bulk Import
													</ZIonButton>
												</ZIonMenuToggle>
											</ZIonCol>

											<ZIonCol
												sizeXl='max-content'
												sizeSm='4'
												sizeXs='6'
												className={classNames({
													'ion-text-end': isXlScale,
													'ion-text-start': !isXlScale,
												})}
											>
												<ZIonButton
													color='primary'
													onClick={() =>
														setNewShortLinkFormState((_) => ({
															folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
															shortUrl: {
																domain:
																	CONSTANTS.DEFAULT_VALUES
																		.DEFAULT_CUSTOM_DOMAIN,
															},
															type: messengerPlatformsBlockEnum.link,
															pixelIds: [],
															tags: [],
															formMode: FormMode.ADD,
														}))
													}
													
												>
													Create a new link
												</ZIonButton>
											</ZIonCol> */}
											</ZIonRow>
										</ZIonCol>
									</ZIonRow>

									<ZIonRow className='px-3 py-4 mt-1 rounded zaions__bg_white ion-align-items-center'>
										<ZIonCol className='flex ion-align-items-center'>
											<ZIonText className='text-2xl'>
												<ZIonText className='font-bold total_links pe-1'>
													{shortLinksStateAtom?.length}
												</ZIonText>
												links
											</ZIonText>
										</ZIonCol>

										<ZIonCol
											className={classNames({
												flex: true,
												'justify-content-end': isXlScale,
												'justify-content-between mt-2': !isXlScale,
											})}
											sizeXl='10'
											size='12'
										>
											<ZIonRow
												className={classNames({
													'w-full ion-justify-content-between': true,
													'row-gap-1-rem': !isLgScale,
												})}
											>
												<ZIonButtons
													className={classNames({
														'w-full': true,
														'ion-justify-content-between': !isXlScale,
														'ion-justify-content-end gap-3': isXlScale,
														block: !isMdScale,
													})}
												>
													{/* Filter by days */}
													<ZIonButton
														fill='outline'
														color='primary'
														expand={!isMdScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
														onClick={(event: unknown) => {
															presentShortLinkTimeFilterModal({
																_event: event as Event,
																_cssClass:
																	shortLinksFilterOptions.timeFilter
																		.daysToSubtract ===
																	TimeFilterEnum.customRange
																		? classes[
																				'short-link-tags-filter-modal-custom-range-size'
																		  ]
																		: classes[
																				'short-link-time-filter-modal-size'
																		  ],
																_dismissOnSelect: false,
															});
														}}
													>
														<ZIonIcon slot='start' icon={calendar} />
														{shortLinksFilterOptions.timeFilter
															.daysToSubtract === TimeFilterEnum.allTime
															? 'All Times'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract === TimeFilterEnum.today
															? 'Today'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract ===
															  TimeFilterEnum.lastSevenDays
															? 'Last 7 days'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract === TimeFilterEnum.last30days
															? 'Last 30 days'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract === TimeFilterEnum.lastMonth
															? 'Last Mouth'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract === TimeFilterEnum.thisMonth
															? 'This Month'
															: shortLinksFilterOptions.timeFilter
																	.daysToSubtract === TimeFilterEnum.customRange
															? 'Custom Range'
															: 'All Time'}
													</ZIonButton>

													{/* Filter by tags */}
													<ZIonButton
														fill='outline'
														color='primary'
														expand={!isMdScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
														onClick={(event: unknown) => {
															presentShortLinkTagsFilterModal({
																_event: event as Event,
																_dismissOnSelect: false,
																_cssClass:
																	classes['short-link-tags-filter-modal-size'],
															});
														}}
													>
														<ZIonIcon slot='start' icon={pricetagOutline} />
														{shortLinksFilterOptions.tags
															? shortLinksFilterOptions.tags?.length === 1
																? shortLinksFilterOptions.tags[0]
																: shortLinksFilterOptions.tags?.length > 1
																? `${shortLinksFilterOptions.tags?.length} tags`
																: 'No values'
															: 'No values'}
													</ZIonButton>

													{/* Filter by Domains */}
													<ZIonButton
														fill='outline'
														color='primary'
														expand={!isMdScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
														onClick={(event: unknown) => {
															presentShortLinkDomainsFilterModal({
																_event: event as Event,
																_dismissOnSelect: false,
																_cssClass:
																	classes['short-link-tags-filter-modal-size'],
															});
														}}
													>
														<ZIonIcon slot='start' icon={businessOutline} />
														{shortLinksFilterOptions.domains
															? shortLinksFilterOptions.domains?.length === 1
																? shortLinksFilterOptions.domains[0]
																: shortLinksFilterOptions.domains?.length > 1
																? `${shortLinksFilterOptions.domains?.length} domains`
																: 'No values'
															: 'No values'}
													</ZIonButton>

													{/* Filter by Columns */}
													<ZIonButton
														fill='outline'
														color='primary'
														expand={!isMdScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
													>
														<ZIonIcon
															slot='start'
															icon={menuOutline}
														></ZIonIcon>
														7 Columns
													</ZIonButton>

													{/* Refetch data button */}
													<ZIonButton
														color='primary'
														fill='outline'
														expand={!isMdScale ? 'block' : undefined}
														className={classNames({
															'my-2': true,
														})}
														onClick={() => {
															void invalidedShortLinksQuery();
														}}
													>
														<ZIonIcon slot='start' icon={refresh} />
														Refetch
													</ZIonButton>
												</ZIonButtons>
											</ZIonRow>
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>
								<ZaionsShortLinkTable />
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				</ZIonContent>
			</ZCan>
		</ZaionsIonPage>
	);
};

const ShortLinksTimeRangeFilterPopover = () => {
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	const timeRangeFilterSubmission = (
		_value: TimeFilterEnum,
		_startedAt?: string,
		_endAt?: string
	) => {
		try {
			setShortLinksFilterOptions((oldValues) => ({
				...oldValues,
				timeFilter: {
					...oldValues.timeFilter,
					daysToSubtract: _value,
					startedAt: _startedAt ? _startedAt : oldValues.timeFilter.startedAt,
					endAt: _endAt ? _endAt : oldValues.timeFilter.startedAt,
				},
			}));
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZRScrollbars
			style={{
				width:
					shortLinksFilterOptions.timeFilter.daysToSubtract ===
					TimeFilterEnum.customRange
						? 450
						: 200,
				height: 300,
			}}
		>
			<div className='flex'>
				<div className='ion-padding-horizontal'>
					<ZIonButton
						color={'secondary'}
						expand='block'
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.allTime)}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.allTime
								? 'solid'
								: 'outline'
						}
					>
						All Time
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.today)}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.today
								? 'solid'
								: 'outline'
						}
					>
						Today
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						className='mx-2 my-3'
						onClick={() =>
							timeRangeFilterSubmission(TimeFilterEnum.lastSevenDays)
						}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.lastSevenDays
								? 'solid'
								: 'outline'
						}
					>
						Last 7 days
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.last30days
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.last30days)}
					>
						Last 30 days
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.thisMonth
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.thisMonth)}
					>
						This month
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.lastMonth
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.lastMonth)}
					>
						Last month
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.customRange
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() =>
							timeRangeFilterSubmission(TimeFilterEnum.customRange)
						}
					>
						Custom Range
					</ZIonButton>
				</div>

				{shortLinksFilterOptions.timeFilter.daysToSubtract ===
					TimeFilterEnum.customRange && (
					<div className='mt-2'>
						<div className='me-2'>
							<ZIonLabel className='font-bold ms-2'>Start at:</ZIonLabel>
							<ZIonDatetimeButton
								className='mx-2 my-3 mt-2 ion-justify-content-start'
								onIonChange={({ target }) => {
									if (target.value) {
										timeRangeFilterSubmission(
											TimeFilterEnum.customRange,
											target.value as string
										);
									}
								}}
								value={dayjs(
									shortLinksFilterOptions.timeFilter.startedAt as string
								).format(CONSTANTS.DateTime.iso8601DateTime)}
								id='all-time-filter-custom-date-start-time'
								preferWheel={false}
							/>
						</div>

						<div className='mt-4 me-2'>
							<ZIonLabel className='font-bold ms-2'>End at:</ZIonLabel>
							<ZIonDatetimeButton
								className='mx-2 my-3 mt-2 ion-justify-content-start'
								onIonChange={({ target }) => {
									if (target.value) {
										timeRangeFilterSubmission(
											TimeFilterEnum.customRange,
											undefined,
											target.value as string
										);
									}
								}}
								value={dayjs(
									shortLinksFilterOptions.timeFilter.endAt as string
								).format(CONSTANTS.DateTime.iso8601DateTime)}
								id='all-time-filter-custom-date-end-time'
								preferWheel={false}
							/>
						</div>
					</div>
				)}
			</div>
		</ZRScrollbars>
	);
};

const ShortLinksTagsFiltersPopover = () => {
	// For getting all tags data
	const { tags: _shortLinksFieldsDataTagsSelector } = useRecoilValue(
		ShortLinksFieldsDataRStateSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	// function for generating initialValue for formik below.
	const generateInitialValueOfTagsFormik = (
		allTags: string[],
		filteredTags: string[] = []
	): {
		_filteredTags?: {
			[key: string]: boolean;
		};
		_allTags?: boolean;
	} => {
		try {
			const _filteredTags: {
				[key: string]: boolean;
			} = {};
			let _allTags = true;
			if (allTags.length) {
				allTags.forEach((tag, i) => {
					if (filteredTags.includes(tag)) {
						_filteredTags[tag] = true;
					} else {
						_filteredTags[tag] = false;
						_allTags = false;
					}
				});
			}
			return { _filteredTags, _allTags };
		} catch (error) {
			reportCustomError(error);
			return {};
		}
	};

	return (
		<ZRScrollbars style={{ width: 300, height: 300 }}>
			<Formik
				initialValues={generateInitialValueOfTagsFormik(
					_shortLinksFieldsDataTagsSelector,
					shortLinksFilterOptions.tags as string[]
				)}
				onSubmit={(values) => {
					try {
						if (values._filteredTags) {
							const _tags: string[] = [];
							for (const [key, value] of Object.entries(values._filteredTags)) {
								if (value === true) {
									_tags.push(key);
								}
							}

							setShortLinksFilterOptions((oldVales) => ({
								...oldVales,
								tags: [..._tags],
							}));
						}
					} catch (error) {
						reportCustomError(error);
					}
				}}
				enableReinitialize
			>
				{({ values, submitForm, handleBlur, setFieldValue }) => {
					return (
						<>
							<ZIonButton
								expand='block'
								className='m-0 ion-text-capitalize'
								onClick={() => void submitForm()}
							>
								<ZIonIcon icon={filterOutline} className='me-1' />
								<ZIonText>filter</ZIonText>
							</ZIonButton>
							<ZIonItem className='ion-no-padding'>
								<ZIonText className='font-bold ms-3 zaions__fs_14'>
									All Tags
								</ZIonText>
								{/* <ZIonCheckbox
									slot='end'
									checked={values._allTags}
									onIonChange={({ target }) => {
										setFieldValue('_allTags', target.checked, false);
										_shortLinksFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(
												`_filteredTags.${el}`,
												target.checked,
												false
											);
										});
									}}
									onIonBlur={handleBlur}
								/> */}
								<ZRCheckbox
									checkedValue={values._allTags}
									handleChange={(checked) => {
										setFieldValue('_allTags', checked, false);
										_shortLinksFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(`_filteredTags.${el}`, checked, false);
										});
									}}
									className='ms-auto'
								/>
							</ZIonItem>
							<ZIonList lines='none'>
								{_shortLinksFieldsDataTagsSelector.map((el, i) => {
									return (
										<ZIonItem key={i}>
											<ZIonChip className='m-0 zaions__fs_14'>{el}</ZIonChip>
											<ZIonCheckbox
												slot='end'
												checked={
													values._filteredTags && values._filteredTags[el]
												}
												name={el}
												onIonChange={({ target }) => {
													if (!target.checked && values._allTags) {
														setFieldValue('_allTags', false, false);
													}
													setFieldValue(
														`_filteredTags.${el}`,
														target.checked,
														false
													);
												}}
												onIonBlur={handleBlur}
											/>
										</ZIonItem>
									);
								})}
							</ZIonList>
						</>
					);
				}}
			</Formik>
		</ZRScrollbars>
	);
};

const ShortLinksDomainsFiltersPopover = () => {
	// For getting all domains data
	const { domains: _shortLinksFieldsDataDomainsSelector } = useRecoilValue(
		ShortLinksFieldsDataRStateSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	// function for generating initialValue for formik below.
	const generateInitialValueOfDomainsFormik = (
		allDomains: string[],
		filteredDomains: string[] = []
	): {
		_filteredDomains?: {
			[key: string]: boolean;
		};
		_allDomains?: boolean;
	} => {
		try {
			const _filteredDomains: {
				[key: string]: boolean;
			} = {};
			let _allDomains = true;
			if (allDomains.length) {
				allDomains.forEach((domain, i) => {
					const _domain = domain.replace('.', '_');
					if (filteredDomains.includes(_domain)) {
						_filteredDomains[_domain] = true;
					} else {
						_filteredDomains[_domain] = false;
						_allDomains = false;
					}
				});
			}
			return { _filteredDomains, _allDomains };
		} catch (error) {
			reportCustomError(error);
			return {};
		}
	};

	return (
		<ZRScrollbars style={{ width: 300, height: 300 }}>
			<Formik
				initialValues={generateInitialValueOfDomainsFormik(
					_shortLinksFieldsDataDomainsSelector,
					shortLinksFilterOptions.domains as string[]
				)}
				onSubmit={(values) => {
					try {
						if (values._filteredDomains) {
							const _domains: string[] = [];
							for (const [key, value] of Object.entries(
								values._filteredDomains
							)) {
								if (value === true) {
									const _key = key.replace('_', '.');
									_domains.push(_key);
								}
							}

							setShortLinksFilterOptions((oldVales) => ({
								...oldVales,
								domains: [..._domains],
							}));
						}
					} catch (error) {
						reportCustomError(error);
					}
				}}
				enableReinitialize
			>
				{({ values, submitForm, handleBlur, setFieldValue }) => (
					<>
						<ZIonButton
							expand='block'
							className='m-0 ion-text-capitalize'
							onClick={() => void submitForm()}
						>
							<ZIonIcon icon={filterOutline} className='me-1' />
							<ZIonText>filter</ZIonText>
						</ZIonButton>
						<ZIonItem className='ion-no-padding'>
							<ZIonText className='font-bold ms-3 zaions__fs_14'>
								All Domains
							</ZIonText>
							{/* <ZIonCheckbox
								slot='end'
								checked={values._allDomains}
								onIonChange={({ target }) => {
									setFieldValue('_allDomains', target.checked, false);
								}}
								onIonBlur={handleBlur}
							/> */}
							<ZRCheckbox
								checkedValue={values._allDomains}
								handleChange={(checked) => {
									setFieldValue('_allDomains', checked, false);
									_shortLinksFieldsDataDomainsSelector.forEach((el) => {
										const domain = el.replace('.', '_');
										setFieldValue(`_filteredDomains.${domain}`, checked, false);
									});
								}}
								className='ms-auto'
							/>
						</ZIonItem>
						<ZIonList lines='none'>
							{_shortLinksFieldsDataDomainsSelector.map((_domain, i) => {
								const domain = _domain.replace('.', '_');
								return (
									<ZIonItem key={i}>
										<ZIonChip className='m-0 zaions__fs_14'>{_domain}</ZIonChip>
										<ZIonCheckbox
											slot='end'
											checked={
												values._filteredDomains &&
												values._filteredDomains[domain]
											}
											name={domain}
											onIonChange={({ target }) => {
												if (!target.checked && values._allDomains) {
													setFieldValue('_allDomains', false, false);
												}
												setFieldValue(
													`_filteredDomains.${domain}`,
													target.checked,
													false
												);
											}}
											onIonBlur={handleBlur}
										/>
									</ZIonItem>
								);
							})}
						</ZIonList>
					</>
				)}
			</Formik>
		</ZRScrollbars>
	);
};

const SearchQueryInputComponent = () => {
	const setShortLinksFilterOptions = useSetRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);
	return (
		<Formik
			initialValues={{
				searchValue: '',
			}}
			onSubmit={(values) => {
				try {
					if (values.searchValue) {
						setShortLinksFilterOptions((oldValues) => ({
							...oldValues,
							searchQuery: values.searchValue,
						}));
					} else {
						setShortLinksFilterOptions((oldValues) => ({
							...oldValues,
							searchQuery: null,
						}));
					}
				} catch (error) {
					reportCustomError(error);
				}
			}}
		>
			{({ submitForm, handleChange }) => (
				<ZIonItem
					className='border ion-item-start-no-padding'
					style={{ '--inner-padding-end': '0px' }}
				>
					<ZIonInput
						label='🔍'
						clearInput={true}
						type='text'
						name='searchValue'
						onIonChange={handleChange}
						placeholder='Search link by title, domain...'
						fill='solid'
						style={{
							'--background': '#fff',
							'--padding-start': '11px',
							'--border-color': '#fff',
						}}
					/>
					<ZIonButton
						onClick={() => void submitForm()}
						className='ion-no-margin ion-text-capitalize'
						style={{
							height: '100%',
						}}
						slot='end'
					>
						<ZIonIcon icon={filterOutline} className='me-2' />{' '}
						<ZIonText>Filter</ZIonText>
					</ZIonButton>
				</ZIonItem>
			)}
		</Formik>
	);
};

export default ZShortLinksListPage;
