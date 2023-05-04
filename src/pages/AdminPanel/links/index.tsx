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
	appsOutline,
	businessOutline,
	calendar,
	pricetagOutline,
	ellipsisVertical,
	trashOutline,
	pencilOutline,
	filterOutline,
	refresh,
} from 'ionicons/icons';
import { Dropdown } from 'react-bootstrap';
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
	ZIonReorder,
	ZIonReorderGroup,
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
import AdminPanelMainSidebarMenu from '@/components/AdminPanelComponents/MainSideBarMenu';
import ShortLinksFolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/ShortLinkFoldersActionPopover';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

// Types
import { LinkFolderType, TimeFilterEnum } from '@/types/AdminPanel/linksType';
import {
	folderState,
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';

// Recoil States
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import {
	ShortLinksFieldsDataSelector,
	ShortLinksFilterOptionsRState,
	ShortLinksRState,
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
import ZIonSegment from '@/components/ZIonComponents/ZIonSegment';
import ZIonSegmentButton from '@/components/ZIonComponents/ZIonSegmentButton';

const ShortLinksTimeRangeFilterPopover = () => {
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRState
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
			<div className='d-flex'>
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
							<ZIonLabel className='ms-2 fw-bold'>Start at:</ZIonLabel>
							<ZIonDatetimeButton
								className='ion-justify-content-start mt-2 mx-2 my-3'
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

						<div className='me-2 mt-4'>
							<ZIonLabel className='ms-2 fw-bold'>End at:</ZIonLabel>
							<ZIonDatetimeButton
								className='ion-justify-content-start mt-2 mx-2 my-3'
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
		ShortLinksFieldsDataSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRState
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
								<ZIonText className='ms-3 fw-bold zaions__fs_14'>
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
											<ZIonChip className='zaions__fs_14 m-0'>{el}</ZIonChip>
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
		ShortLinksFieldsDataSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRState
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
							<ZIonText className='ms-3 fw-bold zaions__fs_14'>
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
										<ZIonChip className='zaions__fs_14 m-0'>{_domain}</ZIonChip>
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
		ShortLinksFilterOptionsRState
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

const AdminLinksIndexPage: React.FC = () => {
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

	const { isXlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale();

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
	const { zNavigatePushRoute } = useZNavigate();
	const shortLinksFilterOptions = useRecoilValue(ShortLinksFilterOptionsRState);

	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

	const setFolderFormState = useSetRecoilState(FolderFormState);

	const { data: _foldersData } = useZRQGetRequest<LinkFolderType[]>({
		_url: API_URL_ENUM.userAccountFolders_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
	});

	const { zInvalidateReactQueries } = useZInvalidateReactQueries();

	const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
		ShortLinksFolderActionsPopoverContent
	);
	const { presentZIonPopover: presentShortLinkTimeFilterModal } =
		useZIonPopover(ShortLinksTimeRangeFilterPopover);

	const { presentZIonPopover: presentShortLinkTagsFilterModal } =
		useZIonPopover(ShortLinksTagsFiltersPopover);

	const { presentZIonPopover: presentShortLinkDomainsFilterModal } =
		useZIonPopover(ShortLinksDomainsFiltersPopover);

	const _shortLinksData = useRecoilValue(ShortLinksRState);

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: folderState.ShortLink,
		}
	);

	const { validateRequestResponse } = useZValidateRequestResponse();

	// Update shortLinks folders reorder API
	const { mutateAsync: UpdateShortLinksFoldersReorder } = useZRQUpdateRequest({
		_url: API_URL_ENUM.ShortLinks_folders_reorder,
		_queriesKeysToInvalidate: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
	});

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	const invalidedShortLinksQuery = async () => {
		try {
			await zInvalidateReactQueries([
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
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
			pageTitle='Zaions Short Links Page'
			id={CONSTANTS.MENU_IDS.ADMIN_PAGE_FOLDERS_MENU_ID}
			menu={PAGE_MENU.ADMIN_PANEL_FOLDERS_MENU}
			menuSide={PAGE_MENU_SIDE.START}
		>
			<ZIonContent>
				<ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
					<ZIonRefresherContent />
				</ZIonRefresher>
				<ZIonGrid className='ion-no-padding zaions_h100'>
					<ZIonRow className='zaions_h100'>
						{isLgScale && <AdminPanelMainSidebarMenu />}
						{/* Folders Side Menu */}
						{isLgScale && (
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
											<h5 className='fw-bold m-0 p-0'>🔗 All links</h5>
										</ZIonItem>
										<ZIonItem>
											<ZIonList lines='none' className='zaions__w100'>
												<ZIonItem className='ion-no-padding'>
													<ZIonText color='primary' className='fw-bold'>
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
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													<ZIonLabel>Default</ZIonLabel>
													<ZIonReorder slot='start' className='me-3'>
														<ZIonIcon icon={appsOutline}></ZIonIcon>
													</ZIonReorder>
												</ZIonItem>
												{_foldersData && _foldersData.length ? (
													<ZIonReorderGroup
														disabled={false}
														onIonItemReorder={handleReorder}
													>
														{_foldersData.map((el) => (
															<ZIonItem
																className='zaions__cursor_pointer zaions-short-link-folder'
																key={el.id}
																data-folder-id={el.id}
															>
																<ZIonLabel
																	onClick={() => {
																		zNavigatePushRoute(
																			replaceParams(
																				ZaionsRoutes.AdminPanel
																					.ZaionsAdminLinkIndexPageRoute,
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
																<ZIonReorder slot='start' className='me-3'>
																	<ZIonIcon icon={appsOutline}></ZIonIcon>
																</ZIonReorder>
															</ZIonItem>
														))}
													</ZIonReorderGroup>
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
									>
										New Folder
									</ZIonButton>

									{compState?.shortLinksFoldersReorder?.isEnable && (
										<ZIonButton
											className='ion-text-capitalize ion-margin-horizontal position-absolute bottom-0'
											expand='block'
											onClick={() => {
												void shortLinksFoldersReOrderHandler();
											}}
											style={{ width: '78%' }}
										>
											save reorder
										</ZIonButton>
									)}
								</div>
							</ZIonCol>
						)}

						<ZIonCol className='zaions-transition'>
							<ZIonGrid className='pb-2 zaions__bg_white ion-no-padding'>
								{!isLgScale && (
									<ZIonRow className='mb-5 ion-align-items-center zaions__light_bg'>
										<ZIonCol size='12' className='mt-1'>
											<ZIonSegment
												scrollable={true}
												value={'short-links'}
												// color='secondary'
											>
												{/* Short Links */}
												<ZIonSegmentButton
													value='short-links'
													className='text-transform-initial'
													onClick={() => {
														zNavigatePushRoute(
															replaceParams(
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													Short links
												</ZIonSegmentButton>

												{/* Link-in-bio */}
												<ZIonSegmentButton
													value='link-in-bio'
													className='text-transform-initial'
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
													Link-in-bio
												</ZIonSegmentButton>

												{/* Extension */}
												<ZIonSegmentButton
													value='extension'
													className='text-transform-initial'
													onClick={() => {
														zNavigatePushRoute(
															replaceParams(
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													Extension
												</ZIonSegmentButton>

												{/* Integrations */}
												<ZIonSegmentButton
													value='integrations'
													className='text-transform-initial'
													onClick={() => {
														zNavigatePushRoute(
															replaceParams(
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													Integrations
												</ZIonSegmentButton>

												{/* Help center */}
												<ZIonSegmentButton
													value='help-center'
													className='text-transform-initial'
													onClick={() => {
														zNavigatePushRoute(
															replaceParams(
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													Help center
												</ZIonSegmentButton>

												{/* Settings */}
												<ZIonSegmentButton
													value='settings'
													className='text-transform-initial'
													onClick={() => {
														zNavigatePushRoute(
															replaceParams(
																ZaionsRoutes.AdminPanel
																	.ZaionsAdminLinkIndexPageRoute,
																CONSTANTS.RouteParams
																	.folderIdToGetShortLinksOrLinkInBio,
																'all'
															)
														);
													}}
												>
													Settings
												</ZIonSegmentButton>
											</ZIonSegment>
										</ZIonCol>
									</ZIonRow>
								)}

								<ZIonRow
									className={classNames({
										'px-3 ion-align-items-center': true,
										'mt-4': isLgScale,
									})}
								>
									<ZIonCol>
										<ZIonText
											className={classNames({
												'ion-text-center': !isSmScale,
											})}
										>
											<h4 className='fw-bold zaions__color_gray2'>
												Create a new link
											</h4>
										</ZIonText>
										<ZIonText
											className={classNames({
												'ion-text-center': !isSmScale,
											})}
										>
											<h5 className='zaions__color_gray2'>
												Create & manage your links
											</h5>
										</ZIonText>
									</ZIonCol>
									<ZIonCol
										sizeXl='4'
										sizeLg='5'
										sizeMd='5'
										sizeSm='12'
										sizeXs='12'
										className={classNames({
											'mt-4': !isMdScale,
										})}
									>
										<ZaionsCreateShortLinkUrlInput />
									</ZIonCol>

									{!isLgScale && (
										<ZIonCol
											size='max-content'
											sizeSm='max-content'
											sizeXs='12'
										>
											<ZIonMenuToggle
												autoHide={false}
												menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_FOLDERS_MENU_ID}
											>
												<ZIonButton
													className={classNames(classes['open-folder-menu-button'], {
														'text-transform-initial': true,
														'ion-margin-start': !isLgScale,
														'mt-4 ms-0': !isMdScale,
													})}
													expand={!isSmScale ? 'block' : undefined}
													// menu={CONSTANTS.MENU_IDS.ADMIN_PAGE_FOLDERS_MENU_ID}
													// autoHide={false}
												>
													Open folders menu
												</ZIonButton>
											</ZIonMenuToggle>
										</ZIonCol>
									)}
								</ZIonRow>
							</ZIonGrid>

							<ZIonGrid className='mt-3 mb-5'>
								<ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center'>
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
													'w-100': true,
													'ion-justify-content-between': !isXlScale,
													'ion-justify-content-end gap-3': isXlScale,
													'd-block': !isSmScale,
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

												<ZIonButton
													color='primary'
													fill='solid'
													className={classNames({
														'my-2': true,
													})}
													expand={!isSmScale ? 'block' : undefined}
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
													routerLink={
														ZaionsRoutes.AdminPanel
															.ZaionsAdminCreateNewLinkPageRoute
													}
												>
													Create a new link
												</ZIonButton>
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
													routerLink={
														ZaionsRoutes.AdminPanel
															.ZaionsAdminCreateNewLinkPageRoute
													}
												>
													Create a new link
												</ZIonButton>
											</ZIonCol> */}
										</ZIonRow>
									</ZIonCol>
								</ZIonRow>

								<ZIonRow className='py-4 px-3 zaions__bg_white rounded ion-align-items-center mt-1'>
									<ZIonCol className='d-flex ion-align-items-center'>
										<ZIonText>
											<h4 className='ion-no-margin'>
												<ZIonText className='total_links fw-bold'>
													{_shortLinksData?.length}
												</ZIonText>{' '}
												links
											</h4>
										</ZIonText>
									</ZIonCol>

									<ZIonCol
										className={classNames({
											'd-flex': true,
											'justify-content-end': isXlScale,
											'justify-content-between mt-2': !isXlScale,
										})}
										sizeXl='10'
										size='12'
									>
										<ZIonRow
											className={classNames({
												'w-100 ion-justify-content-between': true,
												'row-gap-1-rem': !isLgScale,
											})}
										>
											<ZIonButtons
												className={classNames({
													'w-100': true,
													'ion-justify-content-between': !isXlScale,
													'ion-justify-content-end gap-3': isXlScale,
													'd-block': !isMdScale,
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
																	.daysToSubtract === TimeFilterEnum.customRange
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
													{shortLinksFilterOptions.timeFilter.daysToSubtract ===
													TimeFilterEnum.allTime
														? 'All Times'
														: shortLinksFilterOptions.timeFilter
																.daysToSubtract === TimeFilterEnum.today
														? 'Today'
														: shortLinksFilterOptions.timeFilter
																.daysToSubtract === TimeFilterEnum.lastSevenDays
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
													<ZIonIcon slot='start' icon={menuOutline}></ZIonIcon>7
													Columns
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
		</ZaionsIonPage>
	);
};

export default AdminLinksIndexPage;
