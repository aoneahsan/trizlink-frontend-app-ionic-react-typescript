/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { settingsOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import AddNotes from '@/components/UserDashboard/AddNotes';
import EmbedWidget from '@/components/UserDashboard/EmbedWidget';
import DeepLinking from '@/components/UserDashboard/DeepLinking';
import LinkCloaking from '@/components/UserDashboard/LinkCloaking';
import Tags from '@/components/UserDashboard/Tags';
import RotatorABTesting from '@/components/UserDashboard/RotatorABTesting';
import GeoLocation from '@/components/UserDashboard/GeoLocation';
import LinkExpiration from '@/components/UserDashboard/LinkExpiration';
import LinkPassword from '@/components/UserDashboard/Password';
import LinkFavIcon from '@/components/UserDashboard/Favicon';
import GDPRPopup from '@/components/UserDashboard/GDPRPopup';
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRow,
	ZIonGrid,
	ZIonTitle,
	ZIonContent,
	ZIonFooter,
} from '@/components/ZIonComponents';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsShortUrlOptionFields from '@/components/UserDashboard/shortLinkFormComponents/shortUrlLinkOptionFields';
import ZaionsCustomYourLink from '@/components/UserDashboard/shortUrlCustomYourLink';
import LinksPixelsAccount from '@/components/UserDashboard/LinksPixelsAccount';
import UTMTagTemplates from '@/components/UserDashboard/UTMTagTemplates';
import DomainName from '@/components/UserDashboard/DomainName';
import ShortLinkFoldersHOC from '@/components/UserDashboard/ShortLinkFoldersHOC';
import {
	useZRQCreateRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
	areAllObjectsFilled,
	extractInnerData,
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
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import CONSTANTS from '@/utils/constants';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkTargetType, ShortLinkType } from '@/types/AdminPanel/linksType';
import {
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
	UTMTagInfoInterface,
	ShortUrlInterface,
	ABTestingRotatorInterface,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	PasswordInterface,
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { useIonViewWillEnter } from '@ionic/react';

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
	// state to manage showAdvanceOptions
	const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

	//
	const [newShortLinkFormState, setNewShortLinkFormState] = useRecoilState(
		NewShortLinkFormState
	);

	// getting link-in-bio and workspace ids from url with the help of useParams.
	const { editLinkId, workspaceId } = useParams<{
		editLinkId: string;
		workspaceId: string;
	}>();

	// Custom hooks
	const { zNavigatePushRoute } = useZNavigate(); // useZNavigate hook use for redirection

	const { isLgScale, isMdScale } = useZMediaQueryScale(); //

	// create short link api.
	const { mutateAsync: createShortLink } = useZRQCreateRequest({
		_url: API_URL_ENUM.shortLinks_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
			workspaceId,
		],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	// update short link api.
	const { mutateAsync: updateShortLink } = useZRQUpdateRequest({
		_url: API_URL_ENUM.shortLinks_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.MAIN,
			workspaceId,
		],
	});

	// get short link data api.
	const { data: selectedShortLink, refetch: refetchSelectedShortLink } =
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
			_staleTime: 0,
		});

	//
	const shortLinkGetRequestFn = useCallback(async () => {
		await refetchSelectedShortLink();
		// eslint-disable-next-line
	}, []);

	useIonViewWillEnter(() => {
		try {
			if (editLinkId) {
				void shortLinkGetRequestFn();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				zNavigatePushRoute(
					replaceRouteParams(
						ZaionsRoutes.AdminPanel.ShortLinks.Main,
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
	});

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

	// Formik submit handler.
	const FormikSubmissionHandler = async (
		_values: string,
		resetForm: resetFormType
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

					// if we have data then show success message.
					if (_data && _data.id) {
						showSuccessNotification(
							MESSAGES.GENERAL.SHORT_LINKS
								.NEW_SHORT_LINK_CREATED_SUCCEED_MESSAGE
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

				// extract Data from _response.
				const _data = extractInnerData<ShortLinkType>(
					_response,
					extractInnerDataOptionsEnum.createRequestResponseItem
				);

				// if we have data then show success message.
				if (_data && _data.id) {
					showSuccessNotification(
						MESSAGES.GENERAL.SHORT_LINKS.SHORT_LINK_UPDATED_SUCCEED_MESSAGE
					);
				} else {
					throw new Error(
						(_response as ZLinkMutateApiType<ShortLinkType>).message ||
							'something went wrong please try again! :('
					);
				}
			} else {
				throwZCustomErrorRequestFailed(MESSAGES.GENERAL.INVALID_REQUEST);
			}

			resetForm();

			setShowAdvanceOptions(false);

			zNavigatePushRoute(
				replaceRouteParams(
					ZaionsRoutes.AdminPanel.ShortLinks.Main,
					[
						CONSTANTS.RouteParams.workspace.workspaceId,
						CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
					],
					[workspaceId, 'all']
				)
			);
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZaionsIonPage pageTitle='Create New Page'>
			{/* Formik Start */}
			<Formik
				// ( Initial Values Start  ) //
				initialValues={{
					target: {
						url: (selectedShortLink?.target as LinkTargetType)?.url || '',
						phoneNumber:
							(selectedShortLink?.target as LinkTargetType)?.phoneNumber || '',
						username:
							(selectedShortLink?.target as LinkTargetType)?.username || '',
						email: (selectedShortLink?.target as LinkTargetType)?.email || '',
						accountId:
							(selectedShortLink?.target as LinkTargetType)?.accountId || '',
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
							(selectedShortLink?.password as PasswordInterface)?.password ||
							'',
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
							(JSON.parse(selectedShortLink?.tags as string) as string[])) ||
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
							)?.redirectionLink || '',
					},
					rotatorABTesting:
						(selectedShortLink?.abTestingRotatorLinks as ABTestingRotatorInterface[]) ||
						[],
					geoLocation:
						(selectedShortLink?.geoLocationRotatorLinks as GeoLocationRotatorInterface[]) ||
						[],
					shortUrl: {
						domain:
							(selectedShortLink?.shortUrl as ShortUrlInterface)?.domain || '',
						url: (selectedShortLink?.shortUrl as ShortUrlInterface)?.url || '',
					},
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
							(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)?.utmTerm ||
							'',
						utmContent:
							(selectedShortLink?.utmTagInfo as UTMTagInfoInterface)
								?.utmContent || '',
					},

					favicon: selectedShortLink?.favicon || '',
					// complete page fields here
				}}
				enableReinitialize={true}
				// ( Initial Values End  ) //
				// ( Handling Validation & Errors Start  ) //
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
					} = {
						target: {},
						linkExpiration: {},
						rotatorABTesting: [],
						geoLocation: [],
						password: {},
					};

					// Url Validations Start
					if (newShortLinkFormState.type === messengerPlatformsBlockEnum.link) {
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
						newShortLinkFormState.type === messengerPlatformsBlockEnum.call ||
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
						newShortLinkFormState.type === messengerPlatformsBlockEnum.wechat ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.viber ||
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
						newShortLinkFormState.type === messengerPlatformsBlockEnum.email ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.sms ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.viber ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.whatsapp
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
						errors.rotatorABTesting = values.rotatorABTesting.map((el) => ({}));
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
						errors.password?.value?.trim() ||
						!areAllObjectsFilled(
							(errors.rotatorABTesting as Array<object>) || []
						) ||
						!areAllObjectsFilled((errors.geoLocation as Array<object>) || [])
					) {
						return errors;
					} else {
						return [];
					}
					// return errors;
				}}
				// ( Handling Validation & Errors End  ) //
				onSubmit={async (values, { resetForm }) => {
					console.log(selectedShortLink);
					await FormikSubmissionHandler(
						zStringify({
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
							shortUrl: zStringify(values.shortUrl),
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
						}),
						resetForm
					);
				}}
			>
				{({ isSubmitting, isValid, submitForm, resetForm }) => {
					return (
						<>
							<ZIonContent className='' color={'light'}>
								<div className={`zaions_h100 w-full`}>
									<ZIonGrid className={`zaions__bg_white py-2 px-3`}>
										<ZIonRow className='ion-align-items-center'>
											<ZIonCol className='flex'>
												<ZIonButton
													className='ion-text-capitalize'
													routerLink={replaceRouteParams(
														ZaionsRoutes.AdminPanel.ShortLinks.Main,
														[
															CONSTANTS.RouteParams.workspace.workspaceId,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
														],
														[workspaceId, 'all']
													)}
													onClick={() => {
														resetForm();
													}}
												>
													Home
												</ZIonButton>
												<ZIonTitle color='medium'>
													<h5 className='ion-no-margin'>
														{newShortLinkFormState.formMode === FormMode.ADD
															? 'Create a New link'
															: newShortLinkFormState.formMode === FormMode.EDIT
															? 'Update Link'
															: ''}
													</h5>
												</ZIonTitle>
											</ZIonCol>
											<ZIonCol className='ion-text-center'>
												<ZIonText color='medium' className='text-2xl font-bold'>
													Link settings
												</ZIonText>
											</ZIonCol>
											<ZIonCol className='ion-text-end'>
												<ZIonButton
													className='ion-text-capitalize'
													routerLink={replaceRouteParams(
														ZaionsRoutes.AdminPanel.ShortLinks.Main,
														[
															CONSTANTS.RouteParams.workspace.workspaceId,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
														],
														[workspaceId, 'all']
													)}
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

									{/* Short link Grid */}
									<ZaionsShortUrlOptionFields />

									{/* Custom your link Grid */}
									<ZIonGrid
										className={classNames({
											'my-5': true,
											'ms-3': isMdScale,
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
											<ZaionsCustomYourLink />

											{/* Pixel Account, Utm Tags, Custom Domain */}
											<ZIonCol
												sizeXl='5.9'
												sizeLg='5.8'
												sizeMd='5.9'
												sizeSm='12'
												sizeXs='12'
											>
												{/* Pixels */}
												<LinksPixelsAccount />

												{/* UTMTags */}
												<UTMTagTemplates />

												{/* Choose Domain Name */}
												<DomainName />
											</ZIonCol>
										</ZIonRow>
									</ZIonGrid>

									{/* Advance Options */}
									<ZIonGrid className='ms-3 me-1'>
										<ZIonRow>
											<ZIonCol>
												<ZIonButton
													onClick={() =>
														setShowAdvanceOptions((oldVal) => !oldVal)
													}
													expand='block'
													size='large'
													className='ion-text-capitalize'
												>
													<ZIonText>
														<h4 className='flex ion-no-margin ion-align-items-center ion-padding-top ion-padding-bottom'>
															Advance Options
														</h4>
													</ZIonText>
													<ZIonIcon
														slot='end'
														icon={settingsOutline}
														className='ion-margin-end ms-auto'
													></ZIonIcon>
												</ZIonButton>
												{showAdvanceOptions && (
													<ZIonRow className='gap-5 ion-margin-top'>
														{/* Folder */}
														<ShortLinkFoldersHOC />

														{/* Add Notes */}
														<AddNotes />

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
									</ZIonGrid>
								</div>
							</ZIonContent>
							<ZIonFooter>
								<ZIonGrid className='mx-4 mt-3'>
									<ZIonRow>
										<ZIonCol>
											<ZIonButton
												expand='full'
												onClick={() => void submitForm()}
												disabled={isSubmitting || !isValid}
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
							</ZIonFooter>
						</>
					);
				}}
			</Formik>
		</ZaionsIonPage>
	);
};

export default AdminCreateNewLinkPages;
