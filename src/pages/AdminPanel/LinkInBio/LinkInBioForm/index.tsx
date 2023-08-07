/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import { createOutline, pencilOutline } from 'ionicons/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import routeQueryString from 'qs';
import { AxiosError } from 'axios';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonLabel,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZIonSegment from '@/components/ZIonComponents/ZIonSegment';
import ZIonSegmentButton from '@/components/ZIonComponents/ZIonSegmentButton';
import LinkInBioDesignPage from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/Design';
import LinkInBioShareSettings from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/ShareSettings';
import LinkInBioPageAnalytics from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics';

import {
	useZRQGetRequest,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	createRedirectRoute,
	extractInnerData,
	replaceRouteParams,
	zJsonParse,
	zStringify,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkInBioButtonTypeEnum,
	LinkInBIoSettingType,
	LinkInBioThemeBackgroundEnum,
	LinkInBioThemeFontEnum,
	LinkInBioThemeType,
	LinkInBioType,
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import { LinkInBioBlockEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { FormMode } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	LinkInBioFromPageRState,
	NewLinkInBioFormState,
} from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';
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

const ZaionsLinkInBioForm: React.FC = () => {
	const location = useLocation();

	// getting link-in-bio id from route (url), when user refresh the page the id from route will be get and link-in-bio of that id will be fetch from backend and store in NewLinkInBioFormState recoil state.
	const { linkInBioId, workspaceId } = useParams<{
		linkInBioId: string;
		workspaceId: string;
	}>();

	// #region Recoil states.
	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	// Recoil state of managing current page. for example design, share settings etc.
	const [linkInBioFromPageState, setLinkInBioFromPageState] = useRecoilState(
		LinkInBioFromPageRState
	);

	// Recoil state link-in-bio form state (for editing or creating link-in-bio)
	const setLinkInBioFormState = useSetRecoilState(NewLinkInBioFormState);
	//#endregion

	// #region Custom hooks.
	// useZNavigate for redirection
	const { zNavigatePushRoute } = useZNavigate();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	// validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	const { validateRequestResponse } = useZValidateRequestResponse();
	//#endregion

	//#region APIS
	// fetching link-in-bio with the linkInBioId data from backend.
	const {
		data: selectedLinkInBio,
		refetch: refetchSelectedLinkInBio,
		isFetching: isSelectedLinkInBioFetching,
	} = useZRQGetRequest<LinkInBioType>({
		_url: API_URL_ENUM.linkInBio_update_delete,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
			workspaceId,
			linkInBioId,
		],
		_authenticated: true,
		_itemsIds: [linkInBioId, workspaceId],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.linkInBio.linkInBioId,
			CONSTANTS.RouteParams.workspace.workspaceId,
		],
		_shouldFetchWhenIdPassed: !linkInBioId ? true : false,
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	// Update Link-in-bio API
	const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
		_url: API_URL_ENUM.linkInBio_update_delete,
		_queriesKeysToInvalidate: [],
	});
	// #endregion

	const linkInBioGetRequestFn = useCallback(async () => {
		await refetchSelectedLinkInBio();
		// eslint-disable-next-line
	}, []);

	// Refetching if the linkInBioId changes and if the linkInBioId is undefined it will redirect user to link-in-bio page.
	useEffect(() => {
		try {
			if (linkInBioId) {
				void linkInBioGetRequestFn();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				zNavigatePushRoute(
					replaceRouteParams(
						ZaionsRoutes.AdminPanel.LinkInBio.Main,
						[
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
						],
						[workspaceId, 'all']
					)
				);
				showErrorNotification(error.message);
			} else {
				reportCustomError(error);
			}
		}
		// eslint-disable-next-line
	}, [linkInBioId]);

	// Storing link-in-bio data in recoil state.
	useEffect(() => {
		try {
			if (selectedLinkInBio && selectedLinkInBio?.id && linkInBioId) {
				setLinkInBioFormState((oldVal) => ({
					...oldVal,
					formMode: FormMode.EDIT,
				}));

				//
			}
		} catch (error) {
			reportCustomError(error);
		}
		// eslint-disable-next-line
	}, [selectedLinkInBio]);

	// storing the current page info in setLinkInBioFromPageState recoil state, so we can show the appropriate content.
	useEffect(() => {
		try {
			if (routeQSearchParams && routeQSearchParams.page) {
				setLinkInBioFromPageState((oldValues) => ({
					...oldValues,
					page: ZLinkInBioPageEnum[
						routeQSearchParams.page as ZLinkInBioPageEnum
					],
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
		// eslint-disable-next-line
	}, [routeQSearchParams.page]);

	// formik submit function
	const formikSubmitHandler = async (_reqDataStr: string) => {
		try {
			if (_reqDataStr) {
				// The update api...
				const __response = await UpdateLinkInBio({
					itemIds: [workspaceId, linkInBioId],
					urlDynamicParts: [
						CONSTANTS.RouteParams.workspace.workspaceId,
						CONSTANTS.RouteParams.linkInBio.linkInBioId,
					],
					requestData: _reqDataStr,
				});

				if (__response) {
					// if __response of the updateLinkInBio api is success this showing success notification else not success then error notification.
					await validateRequestResponse({
						resultObj: __response,
					});

					// extracting data from result.
					const __extractItemFromResult = extractInnerData<LinkInBioType>(
						__response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (__extractItemFromResult?.id) {
						// Updating single link-in-bio in all link-in-bios data in RQ cache.
						await updateRQCDataHandler({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
								workspaceId,
							],
							data: __extractItemFromResult,
							id: __extractItemFromResult?.id,
						});

						// Updating single link-in-bio data in RQ cache.
						await updateRQCDataHandler<LinkInBioType | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
								workspaceId,
								linkInBioId,
							],
							data: __extractItemFromResult as LinkInBioType,
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItem,
							updateHoleData: true,
						});
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	const isZFetching = isSelectedLinkInBioFetching;

	return (
		<ZaionsIonPage pageTitle='Link In Bio Form Page'>
			<Formik
				// #region initial values
				initialValues={{
					designPageCurrentTab:
						(routeQSearchParams as { step: ZLinkInBioRHSComponentEnum })
							?.step || ZLinkInBioRHSComponentEnum.theme,
					LinkInBioBlock: LinkInBioBlockEnum.default, // REMOVE THIS
					title: selectedLinkInBio?.title || '',
					linkInBioTitle: selectedLinkInBio?.linkInBioTitle || '',
					enableTitleInput: false,
					theme: {
						background: {
							bgType:
								selectedLinkInBio?.theme?.background?.bgType ||
								LinkInBioThemeBackgroundEnum.solidColor,
							bgSolidColor:
								selectedLinkInBio?.theme?.background?.bgSolidColor || '',
							bgGradientColors: {
								startColor:
									selectedLinkInBio?.theme?.background?.bgGradientColors
										?.startColor || '',
								endColor:
									selectedLinkInBio?.theme?.background?.bgGradientColors
										?.endColor || '',
								direction:
									selectedLinkInBio?.theme?.background?.bgGradientColors
										?.direction || 0,
							},
							enableBgImage:
								selectedLinkInBio?.theme?.background?.enableBgImage || false,
							bgImageUrl:
								selectedLinkInBio?.theme?.background?.bgImageUrl || '',
						},
						button: {
							background: {
								bgType:
									selectedLinkInBio?.theme?.button?.background?.bgType ||
									LinkInBioThemeBackgroundEnum.solidColor,
								bgSolidColor:
									selectedLinkInBio?.theme?.button?.background?.bgSolidColor ||
									'',
								bgGradientColors: {
									startColor:
										selectedLinkInBio?.theme?.button?.background
											?.bgGradientColors?.startColor || '',
									endColor:
										selectedLinkInBio?.theme?.button?.background
											?.bgGradientColors?.endColor || '',
									direction:
										selectedLinkInBio?.theme?.button?.background
											?.bgGradientColors?.direction || 0,
								},
								bgImageUrl:
									selectedLinkInBio?.theme?.button?.background?.bgImageUrl ||
									'',
							},
							type:
								selectedLinkInBio?.theme?.button?.type ||
								LinkInBioButtonTypeEnum.inlineSquare,
							shadowColor:
								selectedLinkInBio?.theme?.button?.shadowColor ||
								CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR,
						},
						font: selectedLinkInBio?.theme?.font || LinkInBioThemeFontEnum.lato,
					},
					settings: {
						headerCode: selectedLinkInBio?.settings?.headerCode || '',
						bodyCode: selectedLinkInBio?.settings?.bodyCode || '',
					},
				}}
				//
				enableReinitialize
				// #endregion

				// #region Submit function
				onSubmit={(values) => {
					const stringifyValue = zStringify({
						linkInBioTitle: values.linkInBioTitle,
						theme: zStringify(values.theme),
						settings: zStringify(values.settings),
						folderId: 1,
					});
					setLinkInBioFormState((oldVal) => ({
						...oldVal,
						theme: values.theme,
						formMode: FormMode.EDIT,
					}));
					void formikSubmitHandler(stringifyValue);
				}}
				// #endregion
			>
				{({ values, setFieldValue, handleChange, handleBlur }) => {
					return (
						<>
							{!isZFetching ? (
								<ZIonHeader className='ion-padding-horizontal'>
									<ZIonGrid className='ion-no-padding'>
										<ZIonRow>
											<ZIonCol className='flex ion-align-items-center' size='3'>
												<ZIonButton
													className='ion-text-capitalize ion-no-margin'
													color='secondary'
													routerLink={replaceRouteParams(
														ZaionsRoutes.AdminPanel.LinkInBio.Main,
														[
															CONSTANTS.RouteParams.workspace.workspaceId,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
														],
														[workspaceId, 'all']
													)}
												>
													<ZIonText className='ion-no-padding zaions__fs_16'>
														Home
													</ZIonText>
												</ZIonButton>

												<div className='ms-2 w-[71%]'>
													{values.enableTitleInput && (
														<ZIonItem
															className={classNames({
																'ion-no-padding ion-no-margin me-2': true,
															})}
															lines='none'
															style={{
																'--inner-padding-end': '0',
															}}
															minHeight='40px'
														>
															<ZIonInput
																name='linkInBioTitle'
																label=''
																minHeight='40px'
																onIonChange={handleChange}
																onIonBlur={handleBlur}
																value={values.linkInBioTitle}
																className={classNames(
																	classes['link-in-bio-title-field'],
																	{
																		zaions__fs_18: true,
																	}
																)}
															/>
															<ZIonButton
																className='ion-text-capitalize ion-no-margin'
																height='40px'
																expand='full'
																onClick={() => {
																	setFieldValue(
																		'enableTitleInput',
																		false,
																		false
																	);
																}}
															>
																<ZIonText className='text-sm'>save</ZIonText>
															</ZIonButton>
														</ZIonItem>
													)}
													{!values.enableTitleInput && (
														<div
															className='flex w-full zaions__fs_18 zaions__cursor_pointer ms-2'
															onClick={() => {
																setFieldValue('enableTitleInput', true, false);
															}}
														>
															<ZIonTitle className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'>
																{values.linkInBioTitle}
															</ZIonTitle>
															<ZIonIcon
																icon={createOutline}
																className='w-6 h-6 mt-1'
																color='dark'
															/>
														</div>
													)}
												</div>
											</ZIonCol>

											<ZIonCol size='6'>
												<ZIonSegment value={linkInBioFromPageState.page}>
													<ZIonSegmentButton
														value='design'
														className='ion-text-capitalize'
														onClick={() => {
															zNavigatePushRoute(
																createRedirectRoute({
																	url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
																	params: [
																		CONSTANTS.RouteParams.workspace.workspaceId,
																		CONSTANTS.RouteParams.linkInBio.linkInBioId,
																	],
																	values: [workspaceId, linkInBioId],
																	routeSearchParams: {
																		page: ZLinkInBioPageEnum.design,
																		step: ZLinkInBioRHSComponentEnum.theme,
																	},
																})
															);
														}}
													>
														<ZIonLabel className='font-bold letter-spacing-0px'>
															Design
														</ZIonLabel>
													</ZIonSegmentButton>

													<ZIonSegmentButton
														value='shareSettings'
														className='ion-text-capitalize'
														onClick={() => {
															zNavigatePushRoute(
																createRedirectRoute({
																	url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
																	params: [
																		CONSTANTS.RouteParams.workspace.workspaceId,
																		CONSTANTS.RouteParams.linkInBio.linkInBioId,
																	],
																	values: [workspaceId, linkInBioId],
																	routeSearchParams: {
																		page: ZLinkInBioPageEnum.shareSettings,
																	},
																})
															);
														}}
													>
														<ZIonLabel className='font-bold letter-spacing-0px'>
															Share settings
														</ZIonLabel>
													</ZIonSegmentButton>

													<ZIonSegmentButton
														value='pageAnalytics'
														className='ion-text-capitalize'
														onClick={() => {
															zNavigatePushRoute(
																createRedirectRoute({
																	url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
																	params: [
																		CONSTANTS.RouteParams.workspace.workspaceId,
																		CONSTANTS.RouteParams.linkInBio.linkInBioId,
																	],
																	values: [workspaceId, linkInBioId],
																	routeSearchParams: {
																		page: ZLinkInBioPageEnum.pageAnalytics,
																	},
																})
															);
														}}
													>
														<ZIonLabel className='font-bold letter-spacing-0px'>
															Page Analytics
														</ZIonLabel>
													</ZIonSegmentButton>

													<ZIonSegmentButton
														value='lead'
														className='ion-text-capitalize'
														onClick={() => {
															zNavigatePushRoute(
																createRedirectRoute({
																	url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
																	params: [
																		CONSTANTS.RouteParams.workspace.workspaceId,
																		CONSTANTS.RouteParams.linkInBio.linkInBioId,
																	],
																	values: [workspaceId, linkInBioId],
																	routeSearchParams: {
																		page: ZLinkInBioPageEnum.lead,
																	},
																})
															);
														}}
													>
														<ZIonLabel className='font-bold letter-spacing-0px'>
															Lead
														</ZIonLabel>
													</ZIonSegmentButton>

													<ZIonSegmentButton
														value='block-analytics'
														className='ion-text-capitalize'
													>
														<ZIonLabel className='font-bold letter-spacing-0px'>
															Block Analytics
														</ZIonLabel>
													</ZIonSegmentButton>
												</ZIonSegment>
											</ZIonCol>

											<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
												<ZIonButton
													className='ion-text-lowercase ion-no-margin me-4'
													color='danger'
												>
													<ZIonText className='ion-no-padding zaions__fs_16'>
														errors
													</ZIonText>
												</ZIonButton>
												<ZIonButton className='ion-text-capitalize ion-no-margin'>
													<ZIonText className='ion-no-padding zaions__fs_16'>
														Upgrade
													</ZIonText>
												</ZIonButton>
											</ZIonCol>
										</ZIonRow>
									</ZIonGrid>
								</ZIonHeader>
							) : (
								<ZHeaderSkeleton />
							)}

							{/* Design  */}
							{linkInBioFromPageState.page === ZLinkInBioPageEnum.design && (
								<LinkInBioDesignPage />
							)}

							{/* Share Settings */}
							{linkInBioFromPageState.page ===
								ZLinkInBioPageEnum.shareSettings && <LinkInBioShareSettings />}

							{/* Page Analytics */}
							{linkInBioFromPageState.page ===
								ZLinkInBioPageEnum.pageAnalytics && <LinkInBioPageAnalytics />}
						</>
					);
				}}
			</Formik>
		</ZaionsIonPage>
	);
};

const ZHeaderSkeleton: React.FC = React.memo(() => {
	return (
		<ZIonHeader className='ion-padding-horizontal'>
			<ZIonGrid className='ion-no-padding'>
				<ZIonRow>
					<ZIonCol className='flex ion-align-items-center' size='3'>
						<ZIonButton
							className='ion-text-capitalize ion-no-margin'
							color='secondary'
						>
							<ZIonText className='ion-no-padding zaions__fs_16'>
								<ZIonSkeletonText width='45px' height='20px' animated={true} />
							</ZIonText>
						</ZIonButton>

						<div className='ms-2 w-[71%]'>
							<div className='flex w-full zaions__fs_18 zaions__cursor_pointer ms-2'>
								<ZIonTitle className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'>
									<ZIonSkeletonText width='100px' height='25px' />
								</ZIonTitle>
								<ZIonTitle className='overflow-hidden me-1 w-min max-w-max ion-no-padding text-md'>
									<ZIonSkeletonText width='1.5rem' height='1.5rem' />
								</ZIonTitle>
							</div>
						</div>
					</ZIonCol>

					<ZIonCol size='6'>
						<ZIonSegment disabled={true}>
							<ZIonSegmentButton value='design' className='ion-text-capitalize'>
								<ZIonLabel className='font-bold letter-spacing-0px'>
									<ZIonSkeletonText
										width='50px'
										height='20px'
										animated={true}
									/>
								</ZIonLabel>
							</ZIonSegmentButton>

							<ZIonSegmentButton
								value='shareSettings'
								className='ion-text-capitalize'
							>
								<ZIonLabel className='font-bold letter-spacing-0px'>
									<ZIonSkeletonText
										width='85px'
										height='20px'
										animated={true}
									/>
								</ZIonLabel>
							</ZIonSegmentButton>

							<ZIonSegmentButton
								value='pageAnalytics'
								className='ion-text-capitalize'
							>
								<ZIonLabel className='font-bold letter-spacing-0px'>
									<ZIonSkeletonText
										width='95px'
										height='20px'
										animated={true}
									/>
								</ZIonLabel>
							</ZIonSegmentButton>

							<ZIonSegmentButton value='lead' className='ion-text-capitalize'>
								<ZIonLabel className='font-bold letter-spacing-0px'>
									<ZIonSkeletonText
										width='40px'
										height='20px'
										animated={true}
									/>
								</ZIonLabel>
							</ZIonSegmentButton>

							<ZIonSegmentButton
								value='block-analytics'
								className='ion-text-capitalize'
							>
								<ZIonLabel className='font-bold letter-spacing-0px'>
									<ZIonSkeletonText
										width='100px'
										height='20px'
										animated={true}
									/>
								</ZIonLabel>
							</ZIonSegmentButton>
						</ZIonSegment>
					</ZIonCol>

					<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
						<ZIonButton
							className='ion-text-lowercase ion-no-margin me-4'
							color='danger'
						>
							<ZIonText className='ion-no-padding zaions__fs_16'>
								<ZIonSkeletonText width='45px' height='20px' animated={true} />
							</ZIonText>
						</ZIonButton>
						<ZIonButton className='ion-text-capitalize ion-no-margin'>
							<ZIonText className='ion-no-padding zaions__fs_16'>
								<ZIonSkeletonText width='65px' height='20px' animated={true} />
							</ZIonText>
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</ZIonHeader>
	);
});

export default ZaionsLinkInBioForm;
