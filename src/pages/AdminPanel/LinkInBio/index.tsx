// Core Imports
import React from 'react';

// Packages Imports
import {
	IonCheckbox,
	IonChip,
	IonList,
	IonReorder,
	IonReorderGroup,
	ItemReorderEventDetail,
	RefresherEventDetail,
} from '@ionic/react';
import {
	menuOutline,
	appsOutline,
	calendar,
	pricetagOutline,
	search,
	ellipsisVertical,
	trashOutline,
	pencilOutline,
	filterOutline,
	refresh,
} from 'ionicons/icons';
import { Dropdown } from 'react-bootstrap';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { Formik } from 'formik';

// Custom Imports
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
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
	ZIonContent,
	ZIonMenuToggle,
} from '@/components/ZIonComponents';
import { ZIonButton } from '@/components/ZIonComponents';
import {
	useZInvalidateReactQueries,
	useZRQDeleteRequest,
	useZRQGetRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonLoading,
	useZIonModal,
	useZIonPopover,
} from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import ZRCheckbox from '@/components/CustomComponents/ZRCheckbox';
import ZIonRefresher from '@/components/ZIonComponents/ZIonRefresher';
import ZIonRefresherContent from '@/components/ZIonComponents/ZIonRefresherContent';
import ZaionsLinkInBioLinksTable from '@/components/InPageComponents/ZaionsTable/linkInBioTables/LinkInBioTable';
import ZaionsAddLinkInBioModal from '@/components/InPageComponents/ZaionsModals/AddNewLinkInBioModal';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import AdminPanelMainSidebarMenu from '@/components/AdminPanelComponents/MainSideBarMenu';

// Types
import { folderState, FormMode } from '@/types/AdminPanel/index.type';
import { LinkFolderType, TimeFilterEnum } from '@/types/AdminPanel/linksType';

// Recoil States
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import {
	LinkInBiosFieldsDataSelector,
	LinkInBiosFilterOptionsRState,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

// Global Contents
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM } from '@/utils/enums';
import { showSuccessNotification } from '@/utils/notification';
import { replaceParams } from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';

// Styles
import classes from './styles.module.css';

const AdminLinkInBiosIndexPage: React.FC = () => {
	const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
		event.detail.complete();
	};
	const { zNavigatePushRoute } = useZNavigate();
	const linkInBiosFilterOptionsState = useRecoilValue(
		LinkInBiosFilterOptionsRState
	);

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	const setFolderFormState = useSetRecoilState(FolderFormState);
	const { data: linkInBiosFoldersData } = useZRQGetRequest<LinkFolderType[]>({
		_url: API_URL_ENUM.userAccount_LinkInBio_folders_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_FOLDER.MAIN],
	});

	const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
		FolderActionsPopoverContent
	);

	const { presentZIonModal: presentAddLinkInBioModal } = useZIonModal(
		ZaionsAddLinkInBioModal
	);

	const { zInvalidateReactQueries } = useZInvalidateReactQueries();
	const { presentZIonPopover: presentLinkInBioTimeFilterModal } =
		useZIonPopover(LinkInBiosTimeRangeFilterPopover);

	const { presentZIonPopover: presentLinkInBioTagsFilterModal } =
		useZIonPopover(LinkInBiosTagsFiltersPopover);

	// const { presentZIonPopover: presentLinkInBioDomainsFilterModal } =
	//   useZIonPopover(LinkInBiosDomainsFiltersPopover);

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: folderState.LinkInBios,
		}
	);
	const invalidedLinkInBioQuery = async () => {
		try {
			await zInvalidateReactQueries([
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
			]);
		} catch (error) {
			reportCustomError(error);
		}
	};
	const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
		try {
			await invalidedLinkInBioQuery();
			event.detail.complete();
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZaionsIonPage pageTitle='Zaions Link-In-Bio page'>
			<ZIonContent>
				<ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
					<ZIonRefresherContent />
				</ZIonRefresher>
				<ZIonGrid className='ion-no-padding zaions_h100'>
					<ZIonRow className='zaions_h100'>
						<AdminPanelMainSidebarMenu />
						<ZIonCol
							size={
								ZDashboardState.dashboardMainSidebarIsCollabes.isCollabes
									? '2'
									: '2.4'
							}
							className='ion-padding border-end zaions-transition'
						>
							<div className='ion-padding-top'>
								<ZIonList lines='none'>
									<ZIonItem className='zaions__cursor_pointer mb-2'>
										<h5 className='fw-bold m-0 p-0'>🔗 All Link In Bios</h5>
									</ZIonItem>
									<ZIonItem>
										<ZIonList lines='none' className='zaions__w100'>
											<ZIonItem className='ion-no-padding'>
												<ZIonText color={'primary'} className='fw-bold'>
													<h5 className='fw-bold d-block m-0 p-0'>
														📂 Folders
													</h5>
												</ZIonText>
											</ZIonItem>
											<ZIonItem
												className='zaions__cursor_pointer ms-2'
												onClick={() => {
													zNavigatePushRoute(
														replaceParams(
															ZaionsRoutes.AdminPanel.ZaionsDashboard
																.ZLinkInBio,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
															'all'
														)
													);
												}}
											>
												<ZIonLabel>Default</ZIonLabel>
												<IonReorder slot='start' className='me-3'>
													<ZIonIcon icon={appsOutline}></ZIonIcon>
												</IonReorder>
											</ZIonItem>
											{linkInBiosFoldersData && linkInBiosFoldersData.length ? (
												<IonReorderGroup
													disabled={false}
													onIonItemReorder={handleReorder}
												>
													{linkInBiosFoldersData.map((el) => (
														<ZIonItem
															className='zaions__cursor_pointer'
															key={el.id}
														>
															<ZIonLabel
																onClick={() => {
																	zNavigatePushRoute(
																		replaceParams(
																			ZaionsRoutes.AdminPanel.ZaionsDashboard
																				.ZLinkInBio,
																			CONSTANTS.RouteParams
																				.folderIdToGetShortLinksOrLinkInBio,
																			el.id as string
																		)
																	);
																}}
															>
																{el.title}
															</ZIonLabel>
															<ZIonButton
																fill='clear'
																color='dark'
																size='small'
																value={el.id}
																onClick={(event: unknown) => {
																	presentFolderActionIonPopover({
																		_event: event as Event,
																		_cssClass: classNames(
																			classes.zaions_present_folder_Action_popover_width
																		),
																	});
																	setFolderFormState((oldVal) => ({
																		...oldVal,
																		id: el.id,
																		name: el.title,
																		formMode: FormMode.EDIT,
																	}));
																}}
																className='ion-no-padding ms-auto'
															>
																<ZIonIcon icon={ellipsisVertical} />
															</ZIonButton>
															<IonReorder slot='start' className='me-3'>
																<ZIonIcon icon={appsOutline}></ZIonIcon>
															</IonReorder>
														</ZIonItem>
													))}
												</IonReorderGroup>
											) : (
												''
											)}
										</ZIonList>
									</ZIonItem>
								</ZIonList>
								<ZIonButton
									className='ion-text-capitalize ion-margin-horizontal'
									fill='outline'
									expand='block'
									onClick={() => {
										presentFolderModal({
											_cssClass: 'folder-modal-size',
										});
									}}
								>
									New Folder
								</ZIonButton>
							</div>
						</ZIonCol>
						<ZIonCol
							className='zaions-transition'
							size={
								ZDashboardState.dashboardMainSidebarIsCollabes.isCollabes
									? '8.1'
									: '9'
							}
						>
							<ZIonGrid className='py-4 zaions__bg_white'>
								<ZIonRow className='px-3'>
									<ZIonCol>
										<ZIonText>
											<h4 className='fw-bold zaions__color_gray2'>
												Create a new Link In Bio
											</h4>
										</ZIonText>
										<ZIonText>
											<h5 className='zaions__color_gray2'>
												Create & manage your Link In Bios
											</h5>
										</ZIonText>
									</ZIonCol>
									<ZIonCol className='' size='4'>
										{/* This will create short link (not link-in-bio) */}
										<ZaionsCreateShortLinkUrlInput />
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>

							<ZIonGrid className='my-5'>
								<ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center'>
									<ZIonCol size='4'>
										<SearchQueryInputComponent />
									</ZIonCol>
									<ZIonCol className=''>
										<div className='d-flex gap-3 justify-content-end'>
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
											<ZIonMenuToggle
												autoHide={false}
												// menu={ADMIN_LINK_PAGE_CONTENT_ID}
											>
												<ZIonButton fill='outline' className='me-3'>
													Bulk Import
												</ZIonButton>
											</ZIonMenuToggle>
											<ZIonButton
												color='primary'
												onClick={() => {
													presentAddLinkInBioModal({
														_cssClass: 'folder-modal-size',
													});
												}}
											>
												Create a new Link In Bio
											</ZIonButton>
										</div>
									</ZIonCol>
								</ZIonRow>

								<ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center mt-1'>
									<ZIonCol className='d-flex ion-align-items-center'>
										<ZIonText>
											<h4 className='ion-no-margin'>
												<ZIonText className='total_links fw-bold'>2</ZIonText>{' '}
												links
											</h4>
										</ZIonText>
									</ZIonCol>
									<ZIonCol className='d-flex justify-content-end' size='7'>
										{/* Filter by days */}
										<ZIonButton
											fill='outline'
											className='ms-auto me-3'
											onClick={(event: unknown) => {
												presentLinkInBioTimeFilterModal({
													_event: event as Event,
													_cssClass:
														classes['link-in-bio-time-filter-modal-size'],
												});
											}}
										>
											<ZIonIcon slot='start' icon={calendar} />
											{linkInBiosFilterOptionsState.timeFilter
												.daysToSubtract === TimeFilterEnum.allTime
												? 'All Times'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.today
												? 'Today'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.lastSevenDays
												? 'Last 7 days'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.last30days
												? 'Last 30 days'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.lastMonth
												? 'Last Mouth'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.thisMonth
												? 'This Month'
												: linkInBiosFilterOptionsState.timeFilter
														.daysToSubtract === TimeFilterEnum.customRange
												? 'Custom Range'
												: 'All Time'}
										</ZIonButton>

										{/* Filter by tags */}
										<ZIonButton
											fill='outline'
											className='ms-auto me-3'
											onClick={(event: unknown) => {
												presentLinkInBioTagsFilterModal({
													_event: event as Event,
													_dismissOnSelect: false,
													_cssClass:
														classes['link-in-bio-tags-filter-modal-size'],
												});
											}}
										>
											<ZIonIcon slot='start' icon={pricetagOutline}></ZIonIcon>
											{linkInBiosFilterOptionsState.tags
												? linkInBiosFilterOptionsState.tags?.length === 1
													? linkInBiosFilterOptionsState.tags[0]
													: linkInBiosFilterOptionsState.tags?.length > 1
													? `${linkInBiosFilterOptionsState.tags?.length} tags`
													: 'No values'
												: 'No values'}
										</ZIonButton>

										{/* Filter by Domains */}
										{/* <ZIonButton
                      fill='outline'
                      className='ms-auto me-3'
                      onClick={(event: unknown) => {
                        presentLinkInBioDomainsFilterModal({
                          _event: event as Event,
                          _dismissOnSelect: false,
                          _cssClass:
                            classes['short-link-tags-filter-modal-size'],
                        });
                      }}
                    >
                      <ZIonIcon slot='start' icon={businessOutline}></ZIonIcon>
                      {linkInBiosFilterOptionsState.domains
                        ? linkInBiosFilterOptionsState.domains?.length === 1
                          ? linkInBiosFilterOptionsState.domains[0]
                          : linkInBiosFilterOptionsState.domains?.length > 1
                          ? `${linkInBiosFilterOptionsState.domains?.length} domains`
                          : 'No values'
                        : 'No values'}
                    </ZIonButton> */}

										<ZIonButton fill='outline' className='ms-auto me-3'>
											<ZIonIcon slot='start' icon={menuOutline} />7 Columns
										</ZIonButton>

										<ZIonButton
											fill='outline'
											className='ms-auto'
											onClick={() => {
												void invalidedLinkInBioQuery();
											}}
										>
											<ZIonIcon slot='start' icon={refresh} />
											Refetch
										</ZIonButton>

										{/* Filter by Columns */}
										{/* <Dropdown>
											<Dropdown.Toggle
												id='dropdown-custom-components'
												className={`${classes.zaions__dropdown_toggle}`}
											>
												<ZIonButton
													id='dropdown-basic'
													fill='outline'
													className='ms-auto'
												>
													<ZIonIcon slot='start' icon={menuOutline}></ZIonIcon>7
													Columns
												</ZIonButton>
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<ZRScrollbars style={{ width: 200, height: 300 }}>
													<div className='ion-padding-horizontal'>
														<ZIonList lines='none'>
															<ZIonItem className='border-bottom'>
																<ZIonText color={'primary'} className='fw-bold'>
																	All Columns
																</ZIonText>
															</ZIonItem>
															<IonReorderGroup
																disabled={false}
																onIonItemReorder={handleReorder}
															>
																<ZIonItem>
																	<ZIonLabel>column 1</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 2</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 3</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 4</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 5</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 6</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
																<ZIonItem>
																	<ZIonLabel>column 7</ZIonLabel>
																	<IonReorder slot='start' className='me-3'>
																		<ZIonIcon icon={appsOutline}></ZIonIcon>
																	</IonReorder>
																</ZIonItem>
															</IonReorderGroup>
														</ZIonList>
													</div>
												</ZRScrollbars>
											</Dropdown.Menu>
										</Dropdown> */}
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
							<ZaionsLinkInBioLinksTable />
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

const LinkInBiosTimeRangeFilterPopover = () => {
	const [linkInBiosFilterOptionsState, setLinkInBiosFilterOptionsState] =
		useRecoilState(LinkInBiosFilterOptionsRState);

	const timeRangeFilterSubmission = (_value: TimeFilterEnum) => {
		try {
			setLinkInBiosFilterOptionsState((oldValues) => ({
				...oldValues,
				daysToSubtract: _value,
			}));
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZRScrollbars style={{ width: 200, height: 300 }}>
			<div className='ion-padding-horizontal'>
				<ZIonButton
					color={'secondary'}
					expand='block'
					className='mx-2 my-3'
					onClick={() => timeRangeFilterSubmission(TimeFilterEnum.allTime)}
					fill={
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
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
						linkInBiosFilterOptionsState.timeFilter.daysToSubtract ===
						TimeFilterEnum.customRange
							? 'solid'
							: 'outline'
					}
					className='mx-2 my-3'
					onClick={() => timeRangeFilterSubmission(TimeFilterEnum.customRange)}
				>
					Custom Range
				</ZIonButton>
			</div>
		</ZRScrollbars>
	);
};

const LinkInBiosTagsFiltersPopover = () => {
	// For getting all tags data
	const { tags: _LinkInBiosFieldsDataTagsSelector } = useRecoilValue(
		LinkInBiosFieldsDataSelector
	);

	// For getting filter.
	const [linkInBiosFilterOptionsState, setLinkInBiosFilterOptionsState] =
		useRecoilState(LinkInBiosFilterOptionsRState);

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
					_LinkInBiosFieldsDataTagsSelector,
					linkInBiosFilterOptionsState.tags as string[]
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

							setLinkInBiosFilterOptionsState((oldVales) => ({
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
								<ZIonText className='ms-3 fw-bold zaions__fs_14 zaions__color_gray2'>
									All Tags
								</ZIonText>
								{/* <IonCheckbox
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
										_LinkInBiosFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(`_filteredTags.${el}`, checked, false);
										});
									}}
									className='ms-auto'
								/>
							</ZIonItem>
							<IonList lines='none'>
								{_LinkInBiosFieldsDataTagsSelector.map((el, i) => {
									return (
										<ZIonItem key={i}>
											<IonChip className='zaions__fs_14 m-0'>{el}</IonChip>
											<IonCheckbox
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
							</IonList>
						</>
					);
				}}
			</Formik>
		</ZRScrollbars>
	);
};

// const LinkInBiosDomainsFiltersPopover = () => {
//   // For getting all domains data
//   const { domains: _LinkInBiosFieldsDataDomainsSelector } = useRecoilValue(
//     LinkInBiosFieldsDataSelector
//   );

//   // For getting filter.
//   const [linkInBiosFilterOptions, setLinkInBiosFilterOptions] = useRecoilState(
//     LinkInBiosFilterOptionsRState
//   );

//   // function for generating initialValue for formik below.
//   const generateInitialValueOfDomainsFormik = (
//     allDomains: string[],
//     filteredDomains: string[] = []
//   ): {
//     _filteredDomains?: {
//       [key: string]: boolean;
//     };
//     _allDomains?: boolean;
//   } => {
//     try {
//       const _filteredDomains: {
//         [key: string]: boolean;
//       } = {};
//       let _allDomains = true;
//       if (allDomains.length) {
//         allDomains.forEach((domain, i) => {
//           const _domain = domain.replace('.', '_');
//           if (filteredDomains.includes(_domain)) {
//             _filteredDomains[_domain] = true;
//           } else {
//             _filteredDomains[_domain] = false;
//             _allDomains = false;
//           }
//         });
//       }
//       return { _filteredDomains, _allDomains };
//     } catch (error) {
//       reportCustomError(error);
//       return {};
//     }
//   };

//   return (
//     <ZRScrollbars style={{ width: 300, height: 300 }}>
//       <Formik
//         initialValues={generateInitialValueOfDomainsFormik(
//           _LinkInBiosFieldsDataDomainsSelector,
//           linkInBiosFilterOptions.domains as string[]
//         )}
//         onSubmit={(values) => {
//           try {
//             if (values._filteredDomains) {
//               const _domains: string[] = [];
//               for (const [key, value] of Object.entries(
//                 values._filteredDomains
//               )) {
//                 if (value === true) {
//                   const _key = key.replace('_', '.');
//                   _domains.push(_key);
//                 }
//               }

//               setLinkInBiosFilterOptions((oldVales) => ({
//                 ...oldVales,
//                 domains: [..._domains],
//               }));
//             }
//           } catch (error) {
//             reportCustomError(error);
//           }
//         }}
//         enableReinitialize
//       >
//         {({ values, submitForm, handleBlur, setFieldValue }) => (
//           <>
//             <ZIonButton
//               expand='block'
//               className='m-0 ion-text-capitalize'
//               onClick={() => void submitForm()}
//             >
//               <ZIonIcon icon={filterOutline} className='me-1' />
//               <ZIonText>filter</ZIonText>
//             </ZIonButton>
//             <ZIonItem className='ion-no-padding'>
//               <ZIonText className='ms-3 fw-bold zaions__fs_14 zaions__color_gray2'>
//                 All Domains
//               </ZIonText>
//               {/* <IonCheckbox
// 								slot='end'
// 								checked={values._allDomains}
// 								onIonChange={({ target }) => {
// 									setFieldValue('_allDomains', target.checked, false);
// 								}}
// 								onIonBlur={handleBlur}
// 							/> */}
//               <ZRCheckbox
//                 checkedValue={values._allDomains}
//                 handleChange={(checked) => {
//                   setFieldValue('_allDomains', checked, false);
//                   _LinkInBiosFieldsDataDomainsSelector.forEach((el) => {
//                     const domain = el.replace('.', '_');
//                     setFieldValue(`_filteredDomains.${domain}`, checked, false);
//                   });
//                 }}
//                 className='ms-auto'
//               />
//             </ZIonItem>
//             <IonList lines='none'>
//               {_LinkInBiosFieldsDataDomainsSelector.map((_domain, i) => {
//                 const domain = _domain.replace('.', '_');
//                 return (
//                   <ZIonItem key={i}>
//                     <IonChip className='zaions__fs_14 m-0'>{_domain}</IonChip>
//                     <IonCheckbox
//                       slot='end'
//                       checked={
//                         values._filteredDomains &&
//                         values._filteredDomains[domain]
//                       }
//                       name={domain}
//                       onIonChange={({ target }) => {
//                         if (!target.checked && values._allDomains) {
//                           setFieldValue('_allDomains', false, false);
//                         }
//                         setFieldValue(
//                           `_filteredDomains.${domain}`,
//                           target.checked,
//                           false
//                         );
//                       }}
//                       onIonBlur={handleBlur}
//                     />
//                   </ZIonItem>
//                 );
//               })}
//             </IonList>
//           </>
//         )}
//       </Formik>
//     </ZRScrollbars>
//   );
// };

const SearchQueryInputComponent = () => {
	const setLinkInBiosFilterOptionsState = useSetRecoilState(
		LinkInBiosFilterOptionsRState
	);
	return (
		<Formik
			initialValues={{
				searchValue: '',
			}}
			onSubmit={(values) => {
				try {
					if (values.searchValue) {
						setLinkInBiosFilterOptionsState((oldValues) => ({
							...oldValues,
							searchQuery: values.searchValue,
						}));
					} else {
						setLinkInBiosFilterOptionsState((oldValues) => ({
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

const FolderActionsPopoverContent: React.FC = () => {
	/**
	 * hook to present folder form modal
	 */
	const { presentZIonModal: presentFolderModal } =
		useZIonModal(ZaionsAddNewFolder);

	/**
	 * recoil state which will hold the single folder data (for updating). when user click on edit button in action popover the data of that folder will storing in this state and present as initial value in the update folder form. here we are delete it folder by getting the id from folderFormState
	 *
	 */
	const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

	/**
	 * delete short link folder api.
	 */
	const { mutate: deleteLinkInBiosFoldersMutate } = useZRQDeleteRequest(
		API_URL_ENUM.userAccount_LinkInBio_folders_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_FOLDER.MAIN]
	);

	// Custom hooks.
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

	/**
	 * deleteFolderAccount will show the confirm alert before deleting short link folder.
	 */
	const deleteFolderAccount = async () => {
		try {
			if (folderFormState && folderFormState.id) {
				await presentZIonAlert({
					header: `Delete Folder "${
						folderFormState.name ? folderFormState.name : ''
					}"`,
					subHeader: 'Remove folder from user account.',
					message: 'Are you sure you want to delete this folder?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeFolderAccount();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * removeFolderAccount will hit delete short link folder api
	 */
	const removeFolderAccount = async () => {
		await presentZIonLoader('Deleting Api Key...');
		try {
			if (folderFormState.id) {
				// hitting the delete api
				deleteLinkInBiosFoldersMutate({
					itemIds: [folderFormState.id],
					urlDynamicParts: [':folderId'],
				});

				// setting the folderFormState to initial state because the value of this recoil state is used as the initial values of the short link folder form, when we click on the delete button in popover it will store the value or that folder in this recoil state. because we need it in here for example the id to delete the folder.
				setFolderFormState((oldVal) => ({
					...oldVal,
					id: '',
					name: '',
					formMode: FormMode.ADD,
				}));

				// show success message after deleting
				showSuccessNotification(`Folder deleted successfully.`);
			} else {
				await presentZIonErrorAlert();
			}
			await dismissZIonLoader();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<ZIonList lines='none'>
				<ZIonButton
					fill='clear'
					className='ion-no-padding ion-text-capitalize'
					expand='block'
					onClick={() => {
						presentFolderModal({
							_cssClass: 'folder-modal-size',
						});
					}}
				>
					<ZIonIcon icon={pencilOutline} className={'me-2'} />{' '}
					<ZIonText>Rename</ZIonText>
				</ZIonButton>
				<ZIonButton
					fill='clear'
					className='ion-no-padding ion-text-capitalize'
					expand='block'
					onClick={() => {
						void deleteFolderAccount();
					}}
				>
					<ZIonIcon icon={trashOutline} className={'me-2'} color='danger' />{' '}
					<ZIonText color='danger'>Delete</ZIonText>
				</ZIonButton>
			</ZIonList>
		</>
	);
};

export default AdminLinkInBiosIndexPage;
