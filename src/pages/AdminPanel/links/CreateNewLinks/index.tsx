/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { settingsOutline } from 'ionicons/icons';
import { Formik, useFormikContext } from 'formik';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRow,
	ZIonGrid,
	ZIonTitle,
	ZIonContent,
	ZIonFooter,
	ZIonSkeletonText,
	ZIonButton,
	ZIonSpinner,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';

const AddNotes = lazy(() => import('@/components/UserDashboard/AddNotes'));
const EmbedWidget = lazy(
	() => import('@/components/UserDashboard/EmbedWidget')
);
const DeepLinking = lazy(
	() => import('@/components/UserDashboard/DeepLinking')
);
const LinkCloaking = lazy(
	() => import('@/components/UserDashboard/LinkCloaking')
);
const Tags = lazy(() => import('@/components/UserDashboard/Tags'));
const RotatorABTesting = lazy(
	() => import('@/components/UserDashboard/RotatorABTesting')
);
const GeoLocation = lazy(
	() => import('@/components/UserDashboard/GeoLocation')
);
const LinkExpiration = lazy(
	() => import('@/components/UserDashboard/LinkExpiration')
);
const LinkPassword = lazy(() => import('@/components/UserDashboard/Password'));
const LinkFavIcon = lazy(() => import('@/components/UserDashboard/Favicon'));
const GDPRPopup = lazy(() => import('@/components/UserDashboard/GDPRPopup'));
const ZaionsShortUrlOptionFields = lazy(
	() =>
		import(
			'@/components/UserDashboard/shortLinkFormComponents/shortUrlLinkOptionFields'
		)
);
const ZaionsCustomYourLink = lazy(
	() => import('@/components/UserDashboard/shortUrlCustomYourLink')
);
const LinksPixelsAccount = lazy(
	() => import('@/components/UserDashboard/LinksPixelsAccount')
);
const UTMTagTemplates = lazy(
	() => import('@/components/UserDashboard/UTMTagTemplates')
);
const DomainName = lazy(() => import('@/components/UserDashboard/DomainName'));

const AdminPanelSidebarMenu = lazy(
	() => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const NewLinkFolder = lazy(
	() => import('@/components/UserDashboard/NewLinkFolder')
);
const ZShortLinkModal = lazy(
	() => import('@/components/InPageComponents/ZaionsModals/ShortLinkModal')
);

import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import MESSAGES from '@/utils/messages';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
	areAllObjectsFilled,
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	generateShortLink,
	replaceRouteParams,
	validateField,
	zStringify,
} from '@/utils/helpers';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import {
	reportCustomError,
	throwZCustomErrorRequestFailed,
} from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import CONSTANTS from '@/utils/constants';
import { ENVS } from '@/utils/envKeys';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkFolderType,
	LinkTargetType,
	ShortLinkType,
} from '@/types/AdminPanel/linksType';
import {
	AdminPanelSidebarMenuPageEnum,
	folderState,
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import {
	UTMTagInfoInterface,
	ABTestingRotatorInterface,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	PasswordInterface,
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import ZCan from '@/components/Can';
import ZAdminPanelTopBar from '@/components/AdminPanelComponents/TopBar';

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
const AdminCreateNewLinkPages: React.FC = () => {
	// #region Component state.
	// state to manage showAdvanceOptions
	const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
	const [compState, setCompState] = useState<{
		shortUrl?: string;
	}>();
	// #endregion

	// #region Recoils.
	//
	const [newShortLinkFormState, setNewShortLinkFormState] = useRecoilState(
		NewShortLinkFormState
	);
	// Recoil state that control the dashboard.
	const ZDashboardState = useRecoilValue(ZDashboardRState);
	// #endregion

	// getting link-in-bio and workspace ids from url with the help of useParams.
	const { editLinkId, workspaceId } = useParams<{
		editLinkId: string;
		workspaceId: string;
	}>();

	// #region Custom hooks
	const { isLgScale, isMdScale } = useZMediaQueryScale(); //
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region APIs.
	// create short link api.
	const { mutateAsync: createShortLink } = useZRQCreateRequest({
		_url: API_URL_ENUM.shortLinks_create_list,
		_queriesKeysToInvalidate: [],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	// update short link api.
	const { mutateAsync: updateShortLink } = useZRQUpdateRequest({
		_url: API_URL_ENUM.shortLinks_update_delete,
		_queriesKeysToInvalidate: [],
	});

	// Request for getting short links data.
	const { isFetching: isShortLinksFetching } = useZRQGetRequest<
		ShortLinkType[]
	>({
		_url: API_URL_ENUM.shortLinks_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	// get short link data api.
	const { data: selectedShortLink, isFetching: isSelectedShortLinkFetching } =
		useZRQGetRequest<ShortLinkType>({
			_url: API_URL_ENUM.shortLinks_update_delete,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
				workspaceId,
				editLinkId,
			],
			_authenticated: true,
			_itemsIds: [workspaceId, editLinkId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.workspace.workspaceId,
				CONSTANTS.RouteParams.shortLink.shortLinkId,
			],
			_shouldFetchWhenIdPassed: !editLinkId ? true : false,
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// Request for getting short links folders.
	const {
		data: shortLinksFoldersData,
		isFetching: isShortLinksFoldersDataFetching,
	} = useZRQGetRequest<LinkFolderType[]>({
		_url: API_URL_ENUM.ShortLink_folders_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
			workspaceId,
			folderState.shortlink,
		],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});
	// #endregion

	// after getting data store in recoil state.
	useEffect(() => {
		try {
			if (selectedShortLink && selectedShortLink?.id && editLinkId) {
				setNewShortLinkFormState((oldVal) => ({
					...oldVal,
					type: selectedShortLink.type,
					formMode: FormMode.EDIT,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
		// eslint-disable-next-line
	}, [selectedShortLink]);

	const { presentZIonModal: presentZShortLinkModal } = useZIonModal(
		ZShortLinkModal,
		{ workspaceId: workspaceId, shortUrl: compState?.shortUrl }
	);

	// #region Functions.
	// Formik submit handler.
	const FormikSubmissionHandler = async (
		_values: string,
		resetForm: resetFormType,
		setErrors: FormikSetErrorsType
	) => {
		try {
			if (newShortLinkFormState.formMode === FormMode.ADD) {
				// Making an api call creating new short link
				const _response: unknown | ZLinkMutateApiType<ShortLinkType> =
					await createShortLink(_values);

				// if we have a successful response then...
				if ((_response as ZLinkMutateApiType<ShortLinkType>).success) {
					// extract Data from _response.
					const _data = extractInnerData<ShortLinkType>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					// if we have data then update cache and show success message.
					if (_data && _data.id) {
						const __generatedShortLink = generateShortLink({
							domain: _data.shortUrlDomain,
							urlPath: _data.shortUrlPath,
						});

						setCompState((oldValues) => ({
							...oldValues,
							shortUrl: __generatedShortLink,
						}));

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

						// added shortLink to all shortLinks data in cache.
						const _updatedShortLinks = [..._oldShortLinks, _data];

						// Updating all shortLinks data in RQ cache.
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
							MESSAGES.GENERAL.SHORT_LINKS.SHORT_LINK_CREATED
						);
					}
				} else {
					throw new Error(
						(_response as ZLinkMutateApiType<ShortLinkType>).message ||
							'something went wrong please try again! :('
					);
				}
			} else if (
				newShortLinkFormState.formMode === FormMode.EDIT &&
				editLinkId
			) {
				const _response: unknown | ZLinkMutateApiType<ShortLinkType> =
					await updateShortLink({
						requestData: _values,
						itemIds: [workspaceId, editLinkId],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							CONSTANTS.RouteParams.shortLink.shortLinkId,
						],
					});

				if (_response) {
					// extract Data from _response.
					const _data = extractInnerData<ShortLinkType>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					// if we have data then show success message.
					if (_data && _data.id) {
						const __generatedShortLink = generateShortLink({
							domain: _data.shortUrlDomain,
							urlPath: _data.shortUrlPath,
						});

						setCompState((oldValues) => ({
							...oldValues,
							shortUrl: __generatedShortLink,
						}));

						// Updating data all shortLinks in RQ cache.
						await updateRQCDataHandler<ShortLinkType | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
								workspaceId,
							],
							data: { ..._data },
							id: editLinkId,
						});

						// Updating current short link in cache in RQ cache.
						await updateRQCDataHandler<ShortLinkType | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
								workspaceId,
								editLinkId,
							],
							data: { ..._data },
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItem,
							updateHoleData: true,
						});

						showSuccessNotification(
							MESSAGES.GENERAL.SHORT_LINKS.SHORT_LINK_UPDATED
						);
					} else {
						throw new Error(
							(_response as ZLinkMutateApiType<ShortLinkType>).message ||
								'something went wrong please try again! :('
						);
					}
				}
			} else {
				throwZCustomErrorRequestFailed(MESSAGES.GENERAL.INVALID_REQUEST);
			}

			resetForm();

			setShowAdvanceOptions(false);

			presentZShortLinkModal({
				_cssClass: 'short-link-modal',
			});

			// zNavigatePushRoute(
			// 	replaceRouteParams(
			// 		ZaionsRoutes.AdminPanel.ShortLinks.Main,
			// 		[
			// 			CONSTANTS.RouteParams.workspace.workspaceId,
			// 			CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
			// 		],
			// 		[workspaceId, 'all']
			// 	)
			// );
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;

				const __errors = formatApiRequestErrorForFormikFormField(
					['title'],
					['title'],
					__apiErrors
				);
				setErrors(__errors);
			}
			reportCustomError(error);
		}
	};
	// #endregion

	// is fetching.
	const isZFetching = isSelectedShortLinkFetching || isShortLinksFetching;

	return (
		<ZIonPage pageTitle='Create New Page'>
			<Suspense fallback={<ZFallbackIonSpinner />}>
				{/* Formik Start */}
				<ZCan
					havePermissions={[
						permissionsEnum.create_shortLink,
						permissionsEnum.update_shortLink,
					]}
					returnPermissionDeniedView={true}
				>
					<Formik
						// #region Initial values
						initialValues={{
							target: {
								url:
									(selectedShortLink?.target as LinkTargetType)?.url ||
									(newShortLinkFormState?.target as LinkTargetType)?.url ||
									'https://',
								phoneNumber:
									(selectedShortLink?.target as LinkTargetType)?.phoneNumber ||
									'',
								username:
									(selectedShortLink?.target as LinkTargetType)?.username || '',
								email:
									(selectedShortLink?.target as LinkTargetType)?.email || '',
								accountId:
									(selectedShortLink?.target as LinkTargetType)?.accountId ||
									'',
								subject:
									(selectedShortLink?.target as LinkTargetType)?.subject || '',
								message:
									(selectedShortLink?.target as LinkTargetType)?.message || '',
							},
							title: selectedShortLink?.title || '',
							linkDescription: selectedShortLink?.description || '',
							featureImg: selectedShortLink?.featureImg || '',
							password: {
								value:
									(selectedShortLink?.password as PasswordInterface)
										?.password || '',
								enabled:
									(selectedShortLink?.password as PasswordInterface)?.enabled ||
									false,
							},
							folderId:
								selectedShortLink?.folderId ||
								CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
							linkNote: selectedShortLink?.notes || '',
							tags:
								(selectedShortLink?.tags &&
									(JSON.parse(
										selectedShortLink?.tags as string
									) as string[])) ||
								[],
							linkExpiration: {
								enabled:
									(
										selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface
									)?.enabled || false,
								expirationDate:
									(
										selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface
									)?.expirationDate || '',
								timezone:
									(
										selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface
									)?.timezone || '',
								redirectionLink:
									(
										selectedShortLink?.linkExpirationInfo as LinkExpirationInfoInterface
									)?.redirectionLink || 'https://',
							},
							rotatorABTesting:
								(selectedShortLink?.abTestingRotatorLinks as ABTestingRotatorInterface[]) ||
								[],
							geoLocation:
								(selectedShortLink?.geoLocationRotatorLinks as GeoLocationRotatorInterface[]) ||
								[],

							//
							shortUrlDomain:
								selectedShortLink?.shortUrlDomain || ENVS.defaultShortUrlDomain,
							shortUrlPath: selectedShortLink?.shortUrlPath || '',
							isShortUrlPathValid: true,
							//

							linkPixelsAccount:
								(selectedShortLink?.pixelIds &&
									(JSON.parse(
										selectedShortLink?.pixelIds as string
									) as string[])) ||
								[],
							UTMTags: {
								templateId:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.templateId || '',
								utmCampaign:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.utmCampaign || '',
								utmMedium:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.utmMedium || '',
								utmSource:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.utmSource || '',
								utmTerm:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.utmTerm || '',
								utmContent:
									(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
										?.utmContent || '',
							},

							favicon: selectedShortLink?.favicon || '',
							// complete page fields here
						}}
						enableReinitialize={true}
						// #endregion

						// #region Handling validation & errors
						validate={(values) => {
							const errors: {
								target: {
									url?: string;
									phoneNumber?: string;
									username?: string;
									email?: string;
									accountId?: string;
									subject?: string;
									message?: string;
								};
								title?: string;
								password: {
									value?: string;
								};
								linkExpiration: {
									redirectionLink?: string;
								};
								rotatorABTesting: {
									redirectionLink?: string;
									percentage?: string;
								}[];
								geoLocation: {
									redirectionLink?: string;
									country?: string;
								}[];
								shortUrlPath?: string;
							} = {
								target: {},
								linkExpiration: {},
								rotatorABTesting: [],
								geoLocation: [],
								password: {},
							};

							// Url Validations Start
							if (
								newShortLinkFormState.type === messengerPlatformsBlockEnum.link
							) {
								validateField(
									'url',
									values.target,
									errors.target,
									VALIDATION_RULE.url
								);
							} else {
								delete errors.target.url;
							}
							// Url Validations End

							// Phone Number Validation Start
							if (
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.call ||
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.whatsapp ||
								newShortLinkFormState.type === messengerPlatformsBlockEnum.sms
							) {
								validateField(
									'phoneNumber',
									values.target,
									errors.target,
									VALIDATION_RULE.phoneNumber
								);
							} else {
								delete errors.target.phoneNumber;
							}

							// Phone Number Validation End

							// Username Validation Start
							if (
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.telegram ||
								newShortLinkFormState.type === messengerPlatformsBlockEnum.skype
							) {
								validateField(
									'username',
									values.target,
									errors.target,
									VALIDATION_RULE.username
								);
							} else {
								delete errors.target.username;
							}
							// Username Validation End

							// Email Validation Start
							if (
								newShortLinkFormState.type === messengerPlatformsBlockEnum.email
							) {
								validateField(
									'email',
									values.target,
									errors.target,
									VALIDATION_RULE.email
								);
							} else {
								delete errors.target.email;
							}
							// Email Validation End

							// AccountId Validation Start
							if (
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.wechat ||
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.viber ||
								newShortLinkFormState.type === messengerPlatformsBlockEnum.line
							) {
								validateField(
									'accountId',
									values.target,
									errors.target,
									VALIDATION_RULE.accountId
								);
							} else {
								delete errors.target.accountId;
							}
							// AccountId Validation End

							// Subject Validation Start
							if (
								newShortLinkFormState.type === messengerPlatformsBlockEnum.email
							) {
								validateField(
									'subject',
									values.target,
									errors.target,
									VALIDATION_RULE.subject
								);
							} else {
								delete errors.target.subject;
							}
							// Subject Validation End

							// Message Validation Start
							if (
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.email ||
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.sms ||
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.viber ||
								newShortLinkFormState.type ===
									messengerPlatformsBlockEnum.whatsapp
							) {
								validateField(
									'message',
									values.target,
									errors.target,
									VALIDATION_RULE.message
								);
							} else {
								delete errors.target.message;
							}
							// message Validation End

							// Link Title Validation Starts
							validateField('title', values, errors, VALIDATION_RULE.linkTitle);
							// Link Title Validation End

							// Password Validation Start
							if (values.password.enabled) {
								validateField(
									'password',
									values?.password,
									errors?.password,
									VALIDATION_RULE.password
								);
							}
							// Password Validation End

							// Link Expiration Validation Start
							if (values.linkExpiration.enabled) {
								validateField(
									'redirectionLink',
									values?.linkExpiration,
									errors?.linkExpiration,
									VALIDATION_RULE.url
								);
							}
							// Link Expiration Validation End

							// Rotator AB Testing Field Validation Start
							if (values.rotatorABTesting.length) {
								errors.rotatorABTesting = values.rotatorABTesting.map(
									(el) => ({})
								);
								values.rotatorABTesting.forEach(
									(el: ABTestingRotatorInterface, index) => {
										if (!el.redirectionLink?.trim()) {
											errors.rotatorABTesting[index].redirectionLink =
												MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_REDIRECTION_LINK;
										} else if (!VALIDATOR.isURL(el.redirectionLink)) {
											errors.rotatorABTesting[index].redirectionLink =
												MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.INVALID_REDIRECTION_LINK;
										}
										if (!el.percentage || isNaN(el.percentage)) {
											errors.rotatorABTesting[index].percentage =
												MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_PERCENTAGE;
										}
									}
								);
							}
							// Rotator AB Testing Field Validation End

							// Rotator Geo Location Field Validation Start
							if (values.geoLocation.length) {
								errors.geoLocation = values.geoLocation.map((el) => ({}));
								values.geoLocation.forEach(
									(el: GeoLocationRotatorInterface, index) => {
										if (!el.redirectionLink?.trim()) {
											errors.geoLocation[index].redirectionLink =
												MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_REDIRECTION_LINK;
										} else if (!VALIDATOR.isURL(el.redirectionLink)) {
											errors.geoLocation[index].redirectionLink =
												MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.INVALID_REDIRECTION_LINK;
										}
										if (!el.country) {
											errors.geoLocation[index].country =
												MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_COUNTRY;
										}
									}
								);
							}

							//
							if (
								String(values?.shortUrlPath)?.trim()?.length > 0 &&
								String(values?.shortUrlPath)?.trim()?.length < 6
							) {
								errors.shortUrlPath = 'Path must be exact 6 character long';
							}

							// Rotator Geo Location Field Validation End
							// check for errors if there are any return errors object otherwise return []
							if (
								errors.target?.url?.trim() ||
								errors.target?.accountId?.trim() ||
								errors.target?.email?.trim() ||
								errors.target?.message?.trim() ||
								errors.target?.username?.trim() ||
								errors.target?.phoneNumber?.trim() ||
								errors.target?.subject?.trim() ||
								errors.linkExpiration?.redirectionLink?.trim() ||
								errors.title?.trim() ||
								errors.shortUrlPath?.trim() ||
								errors.password?.value?.trim() ||
								// !values.isShortUrlPathValid ||
								!areAllObjectsFilled(
									(errors.rotatorABTesting as Array<object>) || []
								) ||
								!areAllObjectsFilled(
									(errors.geoLocation as Array<object>) || []
								)
							) {
								return errors;
							} else {
								return [];
							}
							// return errors;
						}}
						// #endregion

						// #region submit function.
						onSubmit={async (values, { resetForm, setErrors }) => {
							const _zStringifyData = zStringify({
								type: newShortLinkFormState.type,
								target: zStringify({
									url: values.target.url,
									accountId: values.target.accountId,
									email: values.target.email,
									message: values.target.message,
									phoneNumber: values.target.phoneNumber,
									subject: values.target.subject,
									username: values.target.username,
								}),
								title: values.title,
								featureImg: values.featureImg,
								description: values.linkDescription,
								pixelIds: zStringify(values.linkPixelsAccount),
								utmTagInfo: zStringify(values.UTMTags),
								shortUrlDomain: values.shortUrlDomain,
								shortUrlPath: values.shortUrlPath,
								folderId: values.folderId,
								notes: values.linkNote,
								tags: zStringify(values.tags),
								abTestingRotatorLinks: zStringify(values.rotatorABTesting),
								geoLocationRotatorLinks: zStringify(values.geoLocation),
								linkExpirationInfo: zStringify({
									redirectionLink: values.linkExpiration.redirectionLink,
									expirationDate: values.linkExpiration.expirationDate,
									timezone: values.linkExpiration.timezone,
									enabled: values.linkExpiration.enabled,
								}),
								password: zStringify({
									password: values.password.value,
									enabled: values.password.enabled,
								}),
								createdAt: Date.now().toString(),
								favicon: values.favicon,
							});

							await FormikSubmissionHandler(
								_zStringifyData,
								resetForm,
								setErrors
							);
						}}
						// #endregion
					>
						{/* Content */}
						{({ isSubmitting, isValid, submitForm }) => {
							return (
								<ZIonContent color='light'>
									{/* Grid-1 */}
									<ZIonGrid className='h-full ion-no-padding'>
										<ZIonRow className='h-full'>
											{/* Side bar */}
											<AdminPanelSidebarMenu
												activePage={AdminPanelSidebarMenuPageEnum.shortLink}
											/>

											{/* Right-col */}
											<ZIonCol
												className='w-full h-screen overflow-y-scroll zaions_pretty_scrollbar zaions-transition'
												sizeXl={
													ZDashboardState.dashboardMainSidebarIsCollabes
														.isExpand
														? '10'
														: '11.2'
												}
												sizeLg={
													ZDashboardState.dashboardMainSidebarIsCollabes
														.isExpand
														? '10'
														: '11.2'
												}
												sizeMd='12'
												sizeSm='12'
												sizeXs='12'
											>
												{/* Grid-1 -> Grid-1 top-bar */}
												{isZFetching ? <ZTopBarSkeleton /> : <ZTopBar />}
												{/* <ZAdminPanelTopBar workspaceId={workspaceId} /> */}

												{/* Short link Grid-1 -> Grid-2 */}
												<ZaionsShortUrlOptionFields />

												{/* Custom your link Grid-1 -> Grid-3 */}
												<ZIonGrid
													className={classNames({
														'my-1': true,
														'ms-3 mr-4': isMdScale,
														'mx-2': !isMdScale,
													})}
												>
													<ZIonRow
														className={classNames({
															'gap-4': isLgScale,
															'gap-0': !isLgScale,
														})}
													>
														{/* Custom Your Link */}
														<ZaionsCustomYourLink showSkeleton={isZFetching} />

														{/* Pixel Account, Utm Tags, Custom Domain */}
														<ZIonCol
															sizeXl='5.9'
															sizeLg='5.8'
															sizeMd='12'
															sizeSm='12'
															sizeXs='12'
															className={classNames({
																'mt-4': !isLgScale,
															})}
														>
															{/* Pixels */}
															<LinksPixelsAccount showSkeleton={isZFetching} />

															{/* UTMTags */}
															<UTMTagTemplates showSkeleton={isZFetching} />

															{/* Choose Domain Name */}
															<DomainName showSkeleton={isZFetching} />
														</ZIonCol>
													</ZIonRow>
												</ZIonGrid>

												{/* Advance Options Grid-1 -> Grid-4 */}
												<ZIonGrid className='mr-3 ms-3'>
													{/* Row-1 */}
													<Suspense
														fallback={
															<div className='flex w-full h-full ion-align-items-center ion-justify-content-center'>
																<ZIonSpinner
																	color='primary'
																	className=''
																	name='crescent'
																	style={{ width: '50px', height: '50px' }}
																/>
															</div>
														}
													>
														<ZIonRow>
															{/* Col-1 */}
															<ZIonCol>
																{/* advance options toggler button */}
																<ZIonButton
																	expand='block'
																	// size={isMdScale ? 'large' : 'default'}
																	testingSelector={
																		CONSTANTS.testingSelectors.shortLink
																			.formPage.advanceOptionsBtn
																	}
																	onClick={() =>
																		setShowAdvanceOptions((oldVal) => !oldVal)
																	}
																	className={classNames({
																		'ion-text-capitalize': true,
																		'mx-0': !isMdScale,
																	})}
																>
																	<ZIonText className='flex py-2 text-lg ion-no-margin ion-align-items-center'>
																		Advance Options
																	</ZIonText>
																	<ZIonIcon
																		slot='end'
																		icon={settingsOutline}
																		className='w-6 h-6 ms-auto me-1'
																	/>
																</ZIonButton>

																{/* advance options row */}
																{showAdvanceOptions && (
																	<ZIonRow
																		className='gap-3 ion-margin-top'
																		testingSelector={
																			CONSTANTS.testingSelectors.shortLink
																				.formPage.advanceOptionsContent
																		}
																	>
																		{/* Folder */}
																		<NewLinkFolder
																			_foldersData={shortLinksFoldersData || []}
																			_state={folderState.shortlink}
																			workspaceId={workspaceId}
																			showSkeleton={isZFetching}
																		/>

																		{/* Add Notes */}
																		<AddNotes showSkeleton={isZFetching} />

																		{/* Add Embed Widget */}
																		<EmbedWidget />

																		{/* Deep Linking */}
																		<DeepLinking />

																		{/* Link Cloaking */}
																		<LinkCloaking />

																		{/* Tags */}
																		<Tags />

																		{/* Rotator - AB Testing */}
																		<RotatorABTesting />

																		{/* Geo Location */}
																		<GeoLocation />

																		{/* Link Expiration */}
																		<LinkExpiration />

																		{/* Link Password */}
																		<LinkPassword />

																		{/* Link Favicon */}
																		<LinkFavIcon />

																		{/* GDPR Popup */}
																		<GDPRPopup />
																	</ZIonRow>
																)}
															</ZIonCol>
														</ZIonRow>
													</Suspense>
												</ZIonGrid>

												{/* Footer */}
												<ZIonFooter>
													{/* Gird */}
													<ZIonGrid className='mx-4 mt-3'>
														{/* Row */}
														<ZIonRow>
															{/* Col-1 */}
															<ZIonCol>
																{/* get my link button */}
																<ZIonButton
																	expand='full'
																	onClick={() => void submitForm()}
																	disabled={isSubmitting || !isValid}
																>
																	{newShortLinkFormState.formMode ===
																	FormMode.ADD
																		? 'Get my new link'
																		: newShortLinkFormState.formMode ===
																		  FormMode.EDIT
																		? 'Get my updated link'
																		: ''}
																</ZIonButton>
															</ZIonCol>
														</ZIonRow>
													</ZIonGrid>
												</ZIonFooter>
											</ZIonCol>
										</ZIonRow>
									</ZIonGrid>
								</ZIonContent>
							);
						}}
					</Formik>
				</ZCan>
			</Suspense>
		</ZIonPage>
	);
};

// Top bar
const ZTopBar: React.FC = () => {
	// getting link-in-bio and workspace ids from url with the help of useParams.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	// #region custom hooks
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
	// #endregion

	// Formik Context.
	const { resetForm, submitForm, isSubmitting, isValid } = useFormikContext();

	// #region Recoils.
	//
	const [newShortLinkFormState, setNewShortLinkFormState] = useRecoilState(
		NewShortLinkFormState
	);
	// #endregion

	return (
		<ZIonGrid className='px-3 py-2 zaions__bg_white'>
			{/* Row */}
			<ZIonRow className='ion-align-items-center'>
				{/* Col-1 */}
				<ZIonCol
					sizeXl=''
					sizeLg=''
					sizeMd=''
					sizeSm='12'
					sizeXs='12'
					className={classNames({
						flex: true,
						'flex-col-reverse ion-align-items-center':
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
					})}
				>
					{/* Home button */}
					<ZIonButton
						size={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'small'
								: 'default'
						}
						className={classNames({
							'ion-text-capitalize': true,
							'w-full': (!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
						})}
						routerLink={replaceRouteParams(
							ZaionsRoutes.AdminPanel.ShortLinks.Main,
							[
								CONSTANTS.RouteParams.workspace.workspaceId,
								CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
							],
							[workspaceId, 'all']
						)}
						onClick={() => {
							resetForm();
						}}
					>
						Home
					</ZIonButton>

					{/* Title */}
					<ZIonTitle
						color='medium'
						className={classNames({
							'text-xl': isXlScale || isLgScale,
							'text-lg': isMdScale && !isSmScale,
							'text-md ion-no-padding ps-2': !isMdScale && isSmScale,
							'text-sm ion-no-padding ps-2': !isMdScale && !isSmScale,
						})}
					>
						{newShortLinkFormState.formMode === FormMode.ADD
							? 'Create a New link'
							: newShortLinkFormState.formMode === FormMode.EDIT
							? 'Update Link'
							: ''}
					</ZIonTitle>
				</ZIonCol>

				{/* Col-2 */}
				{isMdScale && (
					<ZIonCol
						sizeXl=''
						sizeLg=''
						sizeMd=''
						sizeSm='12'
						sizeXs='12'
						className='ion-text-center'
					>
						<ZIonText
							color='medium'
							className={classNames({
								'font-bold': true,
								'text-2xl': isXlScale || isLgScale,
								'text-xl': isMdScale && !isLgScale,
								'text-lg': !isMdScale && isSmScale,
								'text-md': !isMdScale && !isSmScale,
							})}
						>
							Link settings
						</ZIonText>
					</ZIonCol>
				)}

				{/* Col-3 */}
				<ZIonCol
					sizeXl=''
					sizeLg=''
					sizeMd=''
					sizeSm='12'
					sizeXs='12'
					className={classNames({
						'ion-text-end': isMdScale,
					})}
				>
					{/* get my link button */}
					<ZIonButton
						onClick={() => void submitForm()}
						// onClick={() => {
						// 	presentZShortLinkModal({
						// 		_cssClass: 'short-link-modal',
						// 	});
						// }}
						disabled={isSubmitting || !isValid}
						className={classNames({
							'ion-text-capitalize': true,
							'mx-0 mt-2':
								(!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
						})}
						expand={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'block'
								: undefined
						}
						size={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'small'
								: 'default'
						}
					>
						{newShortLinkFormState.formMode === FormMode.ADD
							? 'Get my new link'
							: newShortLinkFormState.formMode === FormMode.EDIT
							? 'Get my updated link'
							: ''}
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

// Tob bar skeleton
const ZTopBarSkeleton: React.FC = () => {
	// #region custom hooks
	const { isMdScale, isSmScale } = useZMediaQueryScale();
	// #endregion

	return (
		<ZIonGrid className='px-3 py-2 zaions__bg_white'>
			{/* Row */}
			<ZIonRow className='ion-align-items-center'>
				{/* Col-1 */}
				<ZIonCol
					sizeXl=''
					sizeLg=''
					sizeMd=''
					sizeSm='12'
					sizeXs='12'
					className={classNames({
						flex: true,
						'flex-col-reverse ion-align-items-center':
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
					})}
				>
					{/* Home button */}
					<ZIonButton
						size={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'small'
								: 'default'
						}
						className={classNames({
							'ion-text-capitalize': true,
							'w-full': (!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
						})}
					>
						<ZIonSkeletonText
							animated={true}
							width={isMdScale ? '40px' : !isMdScale ? '100%' : '40px'}
							height='17px'
						></ZIonSkeletonText>
					</ZIonButton>

					{/* Title */}
					<ZIonTitle color='medium'>
						<ZIonSkeletonText
							animated={true}
							width='120px'
							height='17px'
						></ZIonSkeletonText>
					</ZIonTitle>
				</ZIonCol>

				{/* Col-2 */}
				{isMdScale && (
					<ZIonCol
						sizeXl=''
						sizeLg=''
						sizeMd=''
						sizeSm='12'
						sizeXs='12'
						className='flex ion-text-center ion-align-items-center ion-justify-content-center'
					>
						<ZIonText color='medium' className='text-2xl font-bold'>
							<ZIonSkeletonText
								animated={true}
								width='150px'
								height='30px'
							></ZIonSkeletonText>
						</ZIonText>
					</ZIonCol>
				)}

				{/* Col-3 */}
				<ZIonCol
					sizeXl=''
					sizeLg=''
					sizeMd=''
					sizeSm='12'
					sizeXs='12'
					className={classNames({
						'ion-text-end': isMdScale,
					})}
				>
					{/* get my link button */}
					<ZIonButton
						className={classNames({
							'ion-text-capitalize': true,
							'mx-0 mt-2':
								(!isMdScale && isSmScale) || (!isMdScale && !isSmScale),
						})}
						expand={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'block'
								: undefined
						}
						size={
							(!isMdScale && isSmScale) || (!isMdScale && !isSmScale)
								? 'small'
								: 'default'
						}
					>
						<ZIonSkeletonText
							animated={true}
							width={isMdScale ? '140px' : !isMdScale ? '100%' : '140px'}
							height='17px'
						></ZIonSkeletonText>
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default AdminCreateNewLinkPages;
