/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { Formik } from 'formik';
import {
	addOutline,
	arrowUp,
	cardOutline,
	cashOutline,
	chevronBackOutline,
	copyOutline,
	eyeOffOutline,
	eyeOutline,
	imageOutline,
	linkOutline,
	lockClosedOutline,
	removeOutline,
	reorderFourOutline,
	trashBinOutline,
	wifiOutline,
} from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonDatetimeButton,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonLabel,
	ZIonRange,
	ZIonRouterLink,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import LinkInBioLinkField from '@/components/LinkInBioComponents/Form/LinkField';
import LinkInBioTitleField from '@/components/LinkInBioComponents/Form/TitleField';
import LinkInBioDescriptionField from '@/components/LinkInBioComponents/Form/DescriptionField';
import LinkInBioUploadField from '@/components/LinkInBioComponents/Form/UploadField';
import LinkInBioDateTimeField from '@/components/LinkInBioComponents/Form/DateTimeField';
import LinkInBioEnableField from '@/components/LinkInBioComponents/Form/DateTimeField/enableField';
import LinkInBioSearchField from '@/components/LinkInBioComponents/Form/SearchField';
import LinkInBioTimezoneField from '@/components/LinkInBioComponents/Form/TimezoneField';
import ZRoundedButton from '@/components/CustomComponents/ZRoundedButton';
import ZTextEditor from '@/components/CustomComponents/ZTextEditor';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import ZLinkInBioAddBlockModal from '@/components/InPageComponents/ZaionsModals/LinkInBioAddBlockModal';
import LinkInBioCarouselCardField from '@/components/LinkInBioComponents/Form/CarouselCardField';
import LinkInBioQAndACardField from '@/components/LinkInBioComponents/Form/QAndACardField';
import LinkInBioMusicPlatformCardField from '@/components/LinkInBioComponents/Form/MusicPlatformField';
import LinkInBioMessengerPlatformCardField from '@/components/LinkInBioComponents/Form/MessengerPlatformField';
import LinkInBioSocialPlatformCardField from '@/components/LinkInBioComponents/Form/socialPlatformField';
import LinkInBioIconField from '@/components/LinkInBioComponents/Form/IconField';
import LinkInBioVCardField from '@/components/LinkInBioComponents/Form/VCardField';
import LinkInBioIframeField from '@/components/LinkInBioComponents/Form/Iframe';
import LinkInBioFormField from '@/components/LinkInBioComponents/Form/FormField';
import ZRGAutoCompleteInput from '@/components/CustomComponents/GoogleMaps/ZRGAutoCompleteInput';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	useZUpdateRQCacheData,
	useZRQDeleteRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
	useZGetRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import CONSTANTS, { TIMEZONES } from '@/utils/constants';
import {
	createRedirectRoute,
	extractInnerData,
	formatReactSelectOption,
	zStringify,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkInBioButtonTypeEnum,
	LinkInBioThemeBackgroundEnum,
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import {
	LinkInBioBlockAnimationEnum,
	linkInBioBlockCardItemEnum,
	LinkInBioBlockEnum,
	LinkInBioBlockFromType,
	LinkInBioCardStyleEnum,
	LinkInBioCardViewEnum,
	SeparatorTypeEnum,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from '../styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import {
	borderDashed,
	borderDotted,
	borderSolid,
	card_style_1,
	card_style_2,
	carousel_view,
	jelloAnimation,
	list_view,
	mixed_view,
	pulseAnimation,
	shakeAnimation,
	strip_style,
	swingAnimation,
	tadaAnimation,
	thumb_style_1,
	thumb_style_2,
	wobbleAnimation,
	zoomAnimation,
} from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioBlocksForm: React.FC = () => {
	const location = useLocation();

	// current Link-in-bio id.
	const { linkInBioId, workspaceId } = useParams<{
		linkInBioId: string;
		workspaceId: string;
	}>();

	// #region Custom hooks.
	const { zNavigatePushRoute } = useZNavigate();
	// validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	const { validateRequestResponse } = useZValidateRequestResponse();
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region Recoil states.
	// recoil state of single block data.
	// state for storing data of block. because when we go to edit page (blockFrom page) of any block or create a new block and redirect to blockFrom page we need data of that block, initial data or updated data we need it in blockFrom page for editing that block, so we store the data of block in setLinkInBioSelectedBlockFromState then we will initialized this to the initial value of the blockFrom page formik initial value. with the id of the current block.
	// const [linkInBioSelectedBlockFromState, setLinkInBioSelectedBlockFromState] =
	// 	useRecoilState(LinkInBioSelectedBlockFromRState);

	// Recoil state of blocks of preview panel.
	const [linkInBioBlocksState, setLinkInBioBlocksState] = useRecoilState(
		LinkInBioBlocksRState
	);

	// const [linkInBioBlockState, setLinkInBioBlockState] = useRecoilState(
	// 	LinkInBioBlocksRState
	// );
	// #endregion

	// getting search param from url with the help of 'qs' package.
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const _blockId = (routeQSearchParams as { blockId: string }).blockId;

	// #region API.
	// Update Link-in-bio block API.
	const { mutateAsync: UpdateLinkInBioBlock } = useZRQUpdateRequest({
		_url: API_URL_ENUM.linkInBioBlock_delete_update_get,
		_queriesKeysToInvalidate: [],
		// [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN]
	});

	// fetching link-in-bio block data with the help of linkInBioId and id from backend.
	const { data: linkInBioBlockData, isFetching: isLinkInBioBlockDataFetching } =
		useZRQGetRequest<LinkInBioBlockFromType>({
			_url: API_URL_ENUM.linkInBioBlock_delete_update_get,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET,
				workspaceId,
				linkInBioId,
				_blockId,
			],
			_itemsIds: [workspaceId, linkInBioId, _blockId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.workspace.workspaceId,
				CONSTANTS.RouteParams.linkInBio.linkInBioId,
				CONSTANTS.RouteParams.linkInBio.libBlockId,
			],
			_shouldFetchWhenIdPassed: _blockId ? false : true,
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// delete link-in-bio block api where use went to delete the block on preview panel and click on the delete button in ActionSheet (useZIonActionSheet) the deleteBlockHandler will execute with will hit this api and delete the block.
	const { mutateAsync: deleteLinkInBioBlockMutate } = useZRQDeleteRequest(
		API_URL_ENUM.linkInBioBlock_delete_update_get,
		[]
	);
	// #endregion

	// custom hook for presenting modal (the add block modal)
	const { presentZIonModal: presentZLinkInBioAddBlockModal } = useZIonModal(
		ZLinkInBioAddBlockModal,
		{
			_blockType: linkInBioBlockData?.blockType, // passing values.LinkInBioBlock as blockType to ZLinkInBioAddBlockModal component.
			_blockContent: linkInBioBlockData?.blockContent,
			linkInBioId,
			modalHeading: 'Clone block 😊',
			modalSubHeading: `Would you like clone this ${linkInBioBlockData?.blockType} block in your page?`,
			workspaceId,
		}
	);

	// #region Functions.
	// formik submit function.
	const formikSubmitHandler = async (_reqDataStr: string) => {
		try {
			if (_reqDataStr) {
				// The update api...
				const __response = await UpdateLinkInBioBlock({
					itemIds: [workspaceId, linkInBioId, _blockId],
					urlDynamicParts: [
						CONSTANTS.RouteParams.workspace.workspaceId,
						CONSTANTS.RouteParams.linkInBio.linkInBioId,
						CONSTANTS.RouteParams.linkInBio.libBlockId,
					],
					requestData: _reqDataStr,
				});

				if (__response) {
					// if __response of the updateLinkInBioBlock api is success this showing success notification else not success then error notification.
					await validateRequestResponse({
						resultObj: __response,
					});

					// extracting data from result.
					const __extractItemFromResult =
						extractInnerData<LinkInBioBlockFromType>(
							__response,
							extractInnerDataOptionsEnum.createRequestResponseItem
						);

					const __updatedLinkInBioBlocksState: LinkInBioBlockFromType[] =
						linkInBioBlocksState.map((el) => {
							if (el.id === __extractItemFromResult?.id) {
								return __extractItemFromResult as LinkInBioBlockFromType;
							} else {
								return el;
							}
						});

					setLinkInBioBlocksState(__updatedLinkInBioBlocksState);

					if (__extractItemFromResult?.id) {
						// Updating single block in all blocks data in RQ cache.
						await updateRQCDataHandler({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
								workspaceId,
								linkInBioId,
							],
							data: __extractItemFromResult,
							id: __extractItemFromResult?.id,
						});

						// Updating single block data in RQ cache.
						await updateRQCDataHandler<LinkInBioBlockFromType | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.GET,
								workspaceId,
								linkInBioId,
								_blockId,
							],
							data: __extractItemFromResult as LinkInBioBlockFromType,
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

	// delete block function.
	const deleteBlockHandler = async (detail: OverlayEventDetail<unknown>) => {
		try {
			if (detail && detail.role === 'destructive' && _blockId) {
				// const _updateLinkInBioBlockState = linkInBioBlockState.filter(
				// 	(el) => el.id !== _blockId
				// );

				const __response = await deleteLinkInBioBlockMutate({
					itemIds: [workspaceId, linkInBioId, _blockId],
					urlDynamicParts: [
						CONSTANTS.RouteParams.workspace.workspaceId,
						CONSTANTS.RouteParams.linkInBio.linkInBioId,
						CONSTANTS.RouteParams.linkInBio.libBlockId,
					],
				});

				if (__response) {
					// getting all the LinkInBioBlocks from RQ cache.
					const __oldLinkInBioBlocks =
						extractInnerData<LinkInBioBlockFromType[]>(
							getRQCDataHandler<LinkInBioBlockFromType[]>({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
									workspaceId,
									linkInBioId,
								],
							}) as LinkInBioBlockFromType[],
							extractInnerDataOptionsEnum.createRequestResponseItems
						) || [];

					// removing deleted LinkInBioBlocks from cache.
					const __updatedLinkInBioBlocks = __oldLinkInBioBlocks.filter(
						(el) => el.id !== _blockId
					);

					// Updating data in RQ cache.
					await updateRQCDataHandler<LinkInBioBlockFromType[] | undefined>({
						key: [
							CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN,
							workspaceId,
							linkInBioId,
						],
						data: __updatedLinkInBioBlocks as LinkInBioBlockFromType[],
						id: '',
						extractType: ZRQGetRequestExtractEnum.extractItems,
						updateHoleData: true,
					});

					// setLinkInBioBlockState(_updateLinkInBioBlockState);
					// if _response of the updateLinkInBio api is success this showing success notification else not success then error notification.
					await validateRequestResponse({
						resultObj: __response,
					});

					// Redirect to block
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
								step: ZLinkInBioRHSComponentEnum.blocks,
							},
						})
					);
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};
	// #endregion

	const isZFetching = isLinkInBioBlockDataFetching;

	return (
		<Formik
			// #region initial values
			initialValues={{
				target: {
					url: linkInBioBlockData?.blockContent?.target?.url || '',

					email: linkInBioBlockData?.blockContent?.target?.email || '',

					phoneNumber:
						linkInBioBlockData?.blockContent?.target?.phoneNumber || '',

					username: linkInBioBlockData?.blockContent?.target?.username || '',

					accountId: linkInBioBlockData?.blockContent?.target?.accountId || '',

					subject: linkInBioBlockData?.blockContent?.target?.subject || '',
					message: linkInBioBlockData?.blockContent?.target?.message || '',
					type:
						linkInBioBlockData?.blockContent?.target?.type ||
						linkInBioBlockCardItemEnum.whatsapp,
				},
				vcard: {
					firstName: linkInBioBlockData?.blockContent?.vcard?.firstName || '',
					lastName: linkInBioBlockData?.blockContent?.vcard?.lastName || '',
					mobile: linkInBioBlockData?.blockContent?.vcard?.mobile || '',
					phone: linkInBioBlockData?.blockContent?.vcard?.phone || '',
					fax: linkInBioBlockData?.blockContent?.vcard?.fax || '',
					email: linkInBioBlockData?.blockContent?.vcard?.email || '',
					company: linkInBioBlockData?.blockContent?.vcard?.company || '',
					job: linkInBioBlockData?.blockContent?.vcard?.job || '',
					street: linkInBioBlockData?.blockContent?.vcard?.street || '',
					city: linkInBioBlockData?.blockContent?.vcard?.city || '',
					zip: linkInBioBlockData?.blockContent?.vcard?.zip || 0,
					state: linkInBioBlockData?.blockContent?.vcard?.state || '',
					country: linkInBioBlockData?.blockContent?.vcard?.country || '',
					website: linkInBioBlockData?.blockContent?.vcard?.website || '',
				},
				title: linkInBioBlockData?.blockContent?.title || '',
				icon: linkInBioBlockData?.blockContent?.icon || '',
				text: linkInBioBlockData?.blockContent?.text || '',
				description: linkInBioBlockData?.blockContent?.description || '',
				titleIsEnable: linkInBioBlockData?.blockContent?.titleIsEnable || false,
				descriptionIsEnable:
					linkInBioBlockData?.blockContent?.descriptionIsEnable || false,
				pictureIsEnable:
					linkInBioBlockData?.blockContent?.pictureIsEnable || false,
				priceIsEnable: linkInBioBlockData?.blockContent?.priceIsEnable || false,
				cardIsEnable: linkInBioBlockData?.blockContent?.cardIsEnable || false,
				cardNumber: linkInBioBlockData?.blockContent?.cardNumber || 0,
				searchString: linkInBioBlockData?.blockContent?.searchString || '',
				spacing: linkInBioBlockData?.blockContent?.spacing || 0,
				customHeight: linkInBioBlockData?.blockContent?.customHeight || 0,
				date: linkInBioBlockData?.blockContent?.date || '',
				timezone: linkInBioBlockData?.blockContent?.timezone || '',
				imageUrl: linkInBioBlockData?.blockContent?.imageUrl || '',
				avatarShadow: linkInBioBlockData?.blockContent?.avatarShadow || false,
				cardMode: linkInBioBlockData?.blockContent?.cardMode || false,
				iframe: linkInBioBlockData?.blockContent?.iframe || '',
				separatorType:
					linkInBioBlockData?.blockContent?.separatorType ||
					SeparatorTypeEnum.solid,
				separatorColor: linkInBioBlockData?.blockContent?.separatorColor || '',
				separatorMargin: linkInBioBlockData?.blockContent?.separatorMargin || 0,
				margin: linkInBioBlockData?.blockContent?.margin || 0,

				map: {
					formattedAddress: 'okay',
					lat: 10,
					lng: 10,
					userEnteredAddress: 'working',
				},

				customAppearance: {
					isEnabled:
						linkInBioBlockData?.blockContent?.customAppearance?.isEnabled ||
						false,
					background: {
						bgType:
							linkInBioBlockData?.blockContent?.customAppearance?.background
								?.bgType || LinkInBioThemeBackgroundEnum.solidColor,
						bgSolidColor:
							linkInBioBlockData?.blockContent?.customAppearance?.background
								?.bgSolidColor || CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BG_COLOR,
						bgGradientColors: {
							startColor:
								linkInBioBlockData?.blockContent?.customAppearance?.background
									?.bgGradientColors?.startColor || '',
							endColor:
								linkInBioBlockData?.blockContent?.customAppearance?.background
									?.bgGradientColors?.endColor || '',
							direction:
								linkInBioBlockData?.blockContent?.customAppearance?.background
									?.bgGradientColors?.direction || 0,
						},
					},
					color:
						linkInBioBlockData?.blockContent?.customAppearance?.color || '',
					buttonType:
						linkInBioBlockData?.blockContent?.customAppearance?.buttonType ||
						LinkInBioButtonTypeEnum.inlineSquare,
					shadowColor:
						linkInBioBlockData?.blockContent?.customAppearance?.shadowColor ||
						CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR,
				},

				animation: {
					isEnabled:
						linkInBioBlockData?.blockContent?.animation?.isEnabled || false,
					type: linkInBioBlockData?.blockContent?.animation?.type,
				},

				style:
					linkInBioBlockData?.blockContent?.style ||
					LinkInBioCardStyleEnum.square,

				view:
					linkInBioBlockData?.blockContent?.view ||
					LinkInBioCardViewEnum.carousel,

				cardItems: linkInBioBlockData?.blockContent?.cardItems || [],

				form: {
					formFields: linkInBioBlockData?.blockContent?.form?.formFields || [],
					isTermEnabled:
						linkInBioBlockData?.blockContent?.form?.isTermEnabled || false,
					submitButtonText:
						linkInBioBlockData?.blockContent?.form?.submitButtonText ||
						'Submit',
					termText:
						linkInBioBlockData?.blockContent?.form?.termText ||
						'I Agree to Terms & Conditions',
					termLink: linkInBioBlockData?.blockContent?.form?.termLink,
				},

				schedule: {
					isEnabled:
						linkInBioBlockData?.blockContent?.schedule?.isEnabled || false,
					// startAt: linkInBioBlockData?.blockContent?.schedule?.startAt || '',
					startAt:
						linkInBioBlockData?.blockContent?.schedule?.startAt ||
						new Date().toISOString(),
					endAt:
						linkInBioBlockData?.blockContent?.schedule?.endAt ||
						new Date().toISOString(),
					timezone: linkInBioBlockData?.blockContent?.schedule?.timezone || '',
				},

				isActive: linkInBioBlockData?.isActive,
			}}
			enableReinitialize
			// #endregion

			// #region submit handler
			onSubmit={(values) => {
				const stringifyValue = zStringify({
					blockType: linkInBioBlockData?.blockType,
					blockContent: zStringify(values),
					isActive: values.isActive,
				});
				void formikSubmitHandler(stringifyValue);
			}}
			// #endregion
		>
			{({ values, dirty, handleChange, setFieldValue, submitForm }) => {
				return (
					<>
						<ZIonCol
							sizeXl='11'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='ion-margin-start ion-padding-vertical ion-margin-top border-bottom__violet'
						>
							<ZIonRow>
								<ZIonCol className='flex ion-align-items-center'>
									<ZIonButton
										fill='clear'
										size='small'
										className='mb-1 ion-no-padding me-2'
										color='dark'
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
														step: ZLinkInBioRHSComponentEnum.blocks,
													},
												})
											);
										}}
									>
										<ZIonIcon icon={chevronBackOutline} className='w-6 h-6' />
									</ZIonButton>

									{isZFetching && (
										<ZIonText>
											<ZIonSkeletonText width='6rem' height='1rem' />
										</ZIonText>
									)}
									{/*  */}
									{!isZFetching && (
										<ZIonText className='text-xl'>
											{linkInBioBlockData?.blockType ===
											LinkInBioBlockEnum.button
												? 'Button'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.text
												? 'Text'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.countdown
												? 'Countdown'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.card
												? 'Card'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.carousel
												? 'Carousel'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.RSS
												? 'RSS'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.audio
												? 'Audio'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.video
												? 'Video'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.calendar
												? 'Calendar'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.shopify
												? 'Shopify'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.magento
												? 'Magento'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.wordpress
												? 'Wordpress'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.map
												? 'Maps'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.music
												? 'Music'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.QAndA
												? 'Q&A'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.form
												? 'Forms'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.social
												? 'Social'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.Iframe
												? 'Iframe'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.avatar
												? 'Avatar'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.VCard
												? 'Vcard'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.messenger
												? 'Messenger'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.spacing
												? 'Spacing'
												: linkInBioBlockData?.blockType ===
												  LinkInBioBlockEnum.separator
												? 'Separator'
												: ''}{' '}
											block
											<ZIonRouterLink className='ps-2'>(help)</ZIonRouterLink>
										</ZIonText>
									)}
								</ZIonCol>

								<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
									{dirty && (
										<ZIonButton
											className='ion-no-margin me-3 ion-text-capitalize'
											onClick={() => {
												void submitForm();
											}}
										>
											Save
										</ZIonButton>
									)}

									{isZFetching &&
										[1, 2, 3].map((el) => (
											<ZIonButton
												fill='clear'
												className='mt-2 ion-no-padding me-3 ion-no-margin'
												color='light'
												size='small'
												key={el}
											>
												<ZIonSkeletonText
													width='2rem'
													height='2rem'
													animated={true}
												/>
											</ZIonButton>
										))}

									{!isZFetching && (
										<>
											{/* isActive button */}
											<ZIonButton
												fill='clear'
												className='ion-no-padding me-3 ion-no-margin'
												color='light'
												size='small'
												style={{
													'--background-hover-opacity': '0',
												}}
												onClick={() => {
													setFieldValue('isActive', !values.isActive, false);
												}}
											>
												<ZIonIcon
													icon={values.isActive ? eyeOutline : eyeOffOutline}
													className='mt-2 w-7 h-7'
													color='dark'
												/>
											</ZIonButton>

											{/* duplicate button */}
											<ZIonButton
												fill='clear'
												className='ion-no-padding me-3 ion-no-margin'
												color='light'
												style={{
													'--background-hover-opacity': '0',
												}}
												onClick={() => {
													presentZLinkInBioAddBlockModal({
														_cssClass: 'lib-block-modal-size',
													});
												}}
											>
												<ZIonIcon
													icon={copyOutline}
													className='w-6 h-6 mt-2'
													color='dark'
												/>
											</ZIonButton>

											{/* Delete button */}
											<ZCustomDeleteComponent
												deleteFn={deleteBlockHandler}
												className='ion-no-padding ion-no-margin'
												iconColor='danger'
												iconName={trashBinOutline}
												iconClassName='mt-2'
											/>
										</>
									)}
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>

						<ZIonCol
							sizeXl='11'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='ion-padding-top ion-margin-start border-bottom__violet'
						>
							{!isZFetching && (
								<ZIonTitle className='text-lg font-bold ion-no-padding'>
									{linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.button ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard
										? '👉 Button'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.text
										? '✒️ Text'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.countdown
										? '⏱ Countdown'
										: linkInBioBlockData?.blockType ===
												LinkInBioBlockEnum.card ||
										  linkInBioBlockData?.blockType ===
												LinkInBioBlockEnum.carousel
										? '👉 Card'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS
										? '👉 RSS'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio
										? '🔊 Audio player'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.video
										? '🎬 Video'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.calendar
										? '📆 Calendar'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.shopify
										? '👉 Shopify'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.magento
										? '👉 Magento'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.wordpress
										? '🖥 Wordpress'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.map
										? '🗺️ Maps'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.music
										? '🎵 Add music platforms'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA
										? '💬 Add Question - Answer'
										: linkInBioBlockData?.blockType === LinkInBioBlockEnum.form
										? '📝 Forms'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.social
										? '🧳 Add Social platforms'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.Iframe
										? '💻 Iframe (Typeform, Acast, etc.)'
										: linkInBioBlockData?.blockType ===
										  LinkInBioBlockEnum.avatar
										? '👋 Avatar'
										: ''}
								</ZIonTitle>
							)}

							{isZFetching && (
								<ZIonTitle className='text-lg font-bold ion-no-padding'>
									<ZIonSkeletonText height='1rem' animated={true} />
								</ZIonTitle>
							)}

							<ZIonRow className='ion-padding-bottom'>
								{isZFetching &&
									[1, 2, 3, 4, 5].map((el) => {
										return (
											<ZIonCol size='12' className='mt-3' key={el}>
												<ZIonSkeletonText height='2rem' animated={true} />
											</ZIonCol>
										);
									})}

								{/* Carousel card field */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.carousel && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioCarouselCardField />
									</ZIonCol>
								)}

								{/* Q and A card field */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioQAndACardField />
									</ZIonCol>
								)}

								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.music && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioMusicPlatformCardField />
									</ZIonCol>
								)}

								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.messenger && (
									<ZIonCol size='12'>
										<LinkInBioMessengerPlatformCardField />
									</ZIonCol>
								)}

								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.social && (
									<ZIonCol size='12'>
										<LinkInBioSocialPlatformCardField />
									</ZIonCol>
								)}

								{/* Link Component */}
								{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.countdown ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.video ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.calendar ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.avatar) && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioLinkField
											name='target.url'
											value={values.target.url}
											onIonChange={handleChange}
										/>
									</ZIonCol>
								)}

								{/* Iframe component */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.Iframe && <LinkInBioIframeField />}

								{/* Title Component */}
								{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.countdown ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.audio ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.video ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.calendar ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.avatar ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.map ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.Iframe ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.form) && (
									<ZIonCol size='12' className='mt-1'>
										<LinkInBioTitleField
											name='title'
											value={values.title}
											onIonChange={handleChange}
											placeholder={
												linkInBioBlockData?.blockType ===
												LinkInBioBlockEnum.form
													? 'Form Name'
													: 'Your Title'
											}
										/>
									</ZIonCol>
								)}

								{/* Form Component */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioFormField />
									</ZIonCol>
								)}

								{/* ✅ Submit button */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
									<ZIonCol size='12' className='mt-3 border-bottom__violet'>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding ms-3'>
											✅ Submit button
										</ZIonTitle>
										<div className='mt-2 mb-5'>
											<LinkInBioTitleField
												name='form.submitButtonText'
												value={values.form?.submitButtonText}
												onIonChange={handleChange}
												placeholder='Submit button text'
												showImageInSlot={true}
											/>
										</div>
									</ZIonCol>
								)}

								{/* Icon Component */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioIconField
											name='icon'
											value={values.icon}
											onIonChange={handleChange}
										/>
									</ZIonCol>
								)}

								{/* Description Component */}
								{(linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.countdown ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.avatar) && (
									<ZIonCol size='12' className='mt-2'>
										<LinkInBioDescriptionField
											name='description'
											value={values.description}
											onIonChange={handleChange}
										/>
									</ZIonCol>
								)}

								{/* Text area */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.text && (
									<ZIonCol size='12' className='mt-2 mb-4'>
										<ZTextEditor
											value={values.text}
											onChange={(_value) => {
												setFieldValue('text', _value, false);
											}}
										/>
									</ZIonCol>
								)}

								{/* Upload Component */}
								{(linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.countdown ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
									linkInBioBlockData?.blockType === LinkInBioBlockEnum.avatar ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.music) && (
									<ZIonCol size='12' className='mt-4'>
										<LinkInBioUploadField
											dropdownHeight='6rem'
											setFieldValue={setFieldValue}
											fieldName='imageUrl'
											imageUrl={values.imageUrl}
										/>
									</ZIonCol>
								)}

								{/* DateTime Component */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.countdown && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioDateTimeField
											name='date'
											id={`${linkInBioBlockData?.blockType}-${linkInBioBlockData?.id}`}
											value={values.date}
											onIonChange={handleChange}
										/>
									</ZIonCol>
								)}

								{/* Timezone */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.countdown && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioTimezoneField
											name='timezone'
											onChange={(_value) => {
												setFieldValue(
													'timezone',
													(_value as ZaionsRSelectOptions)?.value,
													false
												);
											}}
											value={
												formatReactSelectOption(
													values?.timezone,
													TIMEZONES as ZGenericObject[],
													'label',
													'value'
												) || []
											}
										/>
									</ZIonCol>
								)}

								{/**** Search *****/}
								{/* {(linkInBioBlockData?.blockType ===
                  LinkInBioBlockEnum.RSS ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.shopify ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.magento ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.wordpress ||
                  linkInBioBlockData?.blockType ===
                    LinkInBioBlockEnum.map) && (
                  <ZIonCol size='12' className='pt-2 mt-4'>
                    <LinkInBioSearchField
                      placeholder={
                        linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? 'RSS Feed'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.shopify
                          ? 'Shopify link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.magento
                          ? 'Magento link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.wordpress
                          ? 'Wordpress link'
                          : linkInBioBlockData?.blockType ===
                            LinkInBioBlockEnum.map
                          ? 'Search an address'
                          : ''
                      }
                      searchIcon={
                        linkInBioBlockData?.blockType ===
                        LinkInBioBlockEnum.RSS
                          ? wifiOutline
                          : linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.shopify ||
                            linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.magento ||
                            linkInBioBlockData?.blockType ===
                              LinkInBioBlockEnum.wordpress
                          ? linkOutline
                          : ''
                      }
                    />
                  </ZIonCol>
                )} */}

								{/* RSS Feed */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioSearchField
											placeholder='RSS Feed'
											searchIcon={wifiOutline}
											onIonChange={({ detail }) => {
												setFieldValue('searchString', detail.value, false);
											}}
											value={values?.searchString}
										/>
									</ZIonCol>
								)}

								{/* Shopify */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.shopify && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioSearchField
											placeholder='Shopify link'
											searchIcon={linkOutline}
											onIonChange={({ detail }) => {
												setFieldValue('searchString', detail.value, false);
											}}
											value={values?.searchString}
										/>
									</ZIonCol>
								)}

								{/* Magneto */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.magento && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioSearchField
											placeholder='Magento link'
											searchIcon={linkOutline}
											onIonChange={({ detail }) => {
												setFieldValue('searchString', detail.value, false);
											}}
											value={values?.searchString}
										/>
									</ZIonCol>
								)}

								{/* Wordpress */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.wordpress && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<LinkInBioSearchField
											placeholder='Wordpress link'
											searchIcon={linkOutline}
											onIonChange={({ detail }) => {
												setFieldValue('searchString', detail.value, false);
											}}
											value={values?.searchString}
										/>
									</ZIonCol>
								)}

								{/* Maps */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.map && (
									<ZIonCol size='12' className='mt-4'>
										<ZIonItem className='ion-item-start-no-padding'>
											<ZRGAutoCompleteInput
												onLocationSelectHandler={(
													place: google.maps.places.PlaceResult
												) => {
													setFieldValue(
														'map.formattedAddress',
														'Making a string',
														true
													);
													const _lat = place.geometry?.location?.lat() || 0;
													const _lng = place.geometry?.location?.lng() || 0;
													setFieldValue('map.lat', _lat, true);
													setFieldValue('map.lng', _lng, true);
												}}
												inputStyles={{ width: '100%', border: 'none' }}
												className={classNames(
													classes['map-auto-complete-input']
												)}
												defaultValue={values?.map?.userEnteredAddress}
												inputName='map.userEnteredAddress'
											/>
										</ZIonItem>
									</ZIonCol>
								)}

								{/* <input
                  onChange={({ target }) => {
                    setFieldValue(
                      'map.formattedAddress',
                      'Making a string',
                      true
                    );
                  }}
                  value={values.map.lat}
                /> */}

								{/* Title enable */}
								{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.shopify ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.magento ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.wordpress) && (
									<ZIonCol size='12' className='mt-4'>
										<LinkInBioEnableField
											onChange={(value) => {
												setFieldValue('titleIsEnable', value, false);
											}}
											checked={values.titleIsEnable}
										/>
									</ZIonCol>
								)}

								{/* Description enable */}
								{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.shopify ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.magento ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.wordpress) && (
									<ZIonCol size='12' className='mt-3'>
										<LinkInBioEnableField
											title='Description'
											icon={reorderFourOutline}
											onChange={(value) => {
												setFieldValue('descriptionIsEnable', value, false);
											}}
											checked={values.descriptionIsEnable}
										/>
									</ZIonCol>
								)}

								{/* Picture enable */}
								{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.shopify ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.magento ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.wordpress) && (
									<ZIonCol size='12' className='mt-3'>
										<LinkInBioEnableField
											title='Photo'
											icon={imageOutline}
											onChange={(value) => {
												setFieldValue('pictureIsEnable', value, false);
											}}
											checked={values.pictureIsEnable}
										/>
									</ZIonCol>
								)}

								{/* Card enable */}
								{(linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.calendar ||
									linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.Iframe) && (
									<ZIonCol size='12' className='mt-3'>
										<LinkInBioEnableField
											title='Card mode'
											icon={cardOutline}
											onChange={(value) => {
												setFieldValue('cardIsEnable', value, false);
											}}
											checked={values.cardIsEnable}
										/>
									</ZIonCol>
								)}

								{/* Price enable */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.shopify && (
									<ZIonCol size='12' className='mt-3'>
										<LinkInBioEnableField
											title='Price'
											icon={cashOutline}
											onChange={(value) => {
												setFieldValue('priceIsEnable', value, false);
											}}
											checked={values.priceIsEnable}
										/>
									</ZIonCol>
								)}

								{/* Terms checkbox */}
								{linkInBioBlockData?.blockType === LinkInBioBlockEnum.form && (
									<ZIonCol size='12' className='mt-3'>
										<LinkInBioEnableField
											title='Terms checkbox'
											icon={lockClosedOutline}
											checked={values.form?.isTermEnabled}
											onChange={(value) => {
												setFieldValue('form.isTermEnabled', value, false);
											}}
										/>
										{values.form?.isTermEnabled && (
											<div className='mt-2 mb-2'>
												<LinkInBioTitleField
													name='form.termText'
													value={values.form?.termText}
													onIonChange={handleChange}
													placeholder='Text'
												/>

												<LinkInBioLinkField
													name='form.termLink'
													value={values.form?.termLink}
													onIonChange={handleChange}
													placeholder='Link to your T&C'
													className='pt-2 mt-3'
													showRefreshBtn={false}
												/>
											</div>
										)}
									</ZIonCol>
								)}

								{/* ➖ Type  */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.separator && (
									<ZIonCol size='12'>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
											➖ Type
										</ZIonTitle>
										<div className='mt-2 mb-2'>
											{/* Solid */}
											<ZRoundedButton
												className='me-2'
												color={
													values.separatorType === SeparatorTypeEnum.solid
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'separatorType',
														SeparatorTypeEnum.solid,
														false
													);
												}}
											>
												<ZIonImg
													src={borderSolid}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											{/* Dashed */}
											<ZRoundedButton
												className='me-2'
												color={
													values.separatorType === SeparatorTypeEnum.dashed
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'separatorType',
														SeparatorTypeEnum.dashed,
														false
													);
												}}
											>
												<ZIonImg
													src={borderDashed}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											{/* Dotted */}
											<ZRoundedButton
												className='me-2'
												color={
													values.separatorType === SeparatorTypeEnum.dotted
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'separatorType',
														SeparatorTypeEnum.dotted,
														false
													);
												}}
											>
												<ZIonImg
													src={borderDotted}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>
										</div>
									</ZIonCol>
								)}

								{/* 🎨 Color  */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.separator && (
									<ZIonCol size='12' className='pt-2 mt-4'>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
											🎨 Color
										</ZIonTitle>
										<div className='mb-2'>
											<ZaionsColorPiker
												name='separatorColor'
												value={values.separatorColor}
												setFieldValueFn={setFieldValue}
											/>
										</div>
									</ZIonCol>
								)}

								{/* ☄️ Spacing  */}
								{linkInBioBlockData?.blockType ===
									LinkInBioBlockEnum.spacing && (
									<ZIonCol size='12'>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
											☄️ Spacing:{' '}
											<ZIonText color='primary'>{values.spacing}</ZIonText>
										</ZIonTitle>
										<div className='mb-2'>
											<ZIonRange
												max={200}
												ticks={false}
												snaps={true}
												pin={true}
												pinFormatter={(value: number) => value}
												onIonChange={({ target }) => {
													setFieldValue('spacing', target.value, false);
												}}
											>
												<ZIonIcon slot='start' icon={removeOutline} />
												<ZIonIcon slot='end' icon={addOutline} />
											</ZIonRange>
										</div>
									</ZIonCol>
								)}
							</ZIonRow>
						</ZIonCol>

						{/* 📄 vCard */}
						{linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard && (
							<LinkInBioVCardField />
						)}

						{/* 📏 Margin  */}
						{linkInBioBlockData?.blockType === LinkInBioBlockEnum.separator && (
							<ZIonCol
								sizeXl='11'
								sizeLg='12'
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
								className='ion-padding-vertical ion-margin-start border-bottom__violet'
							>
								<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
									📏 Margin:
									<ZIonText color='primary' className='ps-1'>
										{values.separatorMargin}
									</ZIonText>
								</ZIonTitle>
								<div className='mb-2'>
									<ZIonRange
										max={40}
										ticks={false}
										snaps={true}
										pin={true}
										pinFormatter={(value: number) => value}
										onIonChange={({ target }) => {
											setFieldValue('separatorMargin', target.value, false);
										}}
									>
										<ZIonIcon slot='start' icon={removeOutline} />
										<ZIonIcon slot='end' icon={addOutline} />
									</ZIonRange>
								</div>
							</ZIonCol>
						)}

						{/* 🎨 Custom appearance */}
						{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.form) && (
							<ZIonCol
								size='11'
								className='ion-padding-vertical ion-margin-start border-bottom__violet'
							>
								<ZIonRow>
									<ZIonCol>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
											🎨 Custom appearance{' '}
											<ZIonRouterLink>(help)</ZIonRouterLink>
										</ZIonTitle>
									</ZIonCol>

									<ZIonCol className='ion-text-end'>
										<ZRCSwitch
											checked={values.customAppearance.isEnabled}
											onChange={(_value) => {
												setFieldValue(
													'customAppearance.isEnabled',
													_value,
													false
												);
											}}
										/>
									</ZIonCol>

									{/* 🖍️ Button color */}
									{values.customAppearance.isEnabled && (
										<ZIonCol className='mt-3 mb-2' size='12'>
											<div className='flex ion-align-items-center ion-padding-bottom'>
												{values?.customAppearance?.background?.bgType ===
													LinkInBioThemeBackgroundEnum.solidColor && (
													<ZaionsColorPiker
														name='customAppearance.background.bgSolidColor'
														value={
															values?.customAppearance?.background?.bgSolidColor
														}
														setFieldValueFn={setFieldValue}
													/>
												)}

												{values?.customAppearance?.background?.bgType ===
													LinkInBioThemeBackgroundEnum.gradient && (
													<>
														<ZaionsColorPiker
															name='customAppearance.background.bgGradientColors.startColor'
															value={
																values?.customAppearance?.background
																	?.bgGradientColors?.startColor
															}
															setFieldValueFn={setFieldValue}
														/>
														<ZIonButton
															shape='round'
															className='mt-3 direction-button ion-margin-horizontal'
															color='secondary'
															style={{
																'--padding-top': '1.3rem',
																'--padding-bottom': '1.3rem',
																'--padding-start': '.7rem',
																'--padding-end': '.7rem',
															}}
															onClick={() => {
																let _newDirection =
																	+(values?.customAppearance?.background
																		?.bgGradientColors?.direction as string) +
																	+CONSTANTS.LINK_In_BIO.FORM
																		.DIRECTION_PRE_CLICKED;
																_newDirection =
																	_newDirection >= 359 ? 0 : _newDirection;
																setFieldValue(
																	'customAppearance.background.bgGradientColors.direction',
																	_newDirection,
																	false
																);
															}}
														>
															<ZIonIcon
																icon={arrowUp}
																className='direction-icon'
																style={{
																	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
																	transform: `rotate(${values?.customAppearance?.background?.bgGradientColors?.direction}deg)`,
																}}
															/>
														</ZIonButton>
														<ZaionsColorPiker
															name='customAppearance.background.bgGradientColors.endColor'
															value={
																values?.customAppearance?.background
																	?.bgGradientColors?.endColor
															}
															setFieldValueFn={setFieldValue}
															showCloseIcon={true}
															closeIconOnChangeFn={() => {
																setFieldValue(
																	'customAppearance.background.bgType',
																	LinkInBioThemeBackgroundEnum.solidColor,
																	false
																);
															}}
														/>
													</>
												)}
												{values?.customAppearance?.background?.bgType ===
													LinkInBioThemeBackgroundEnum.solidColor && (
													<ZIonButton
														className='mt-3 ion-text-capitalize ms-4'
														shape='round'
														onClick={() => {
															setFieldValue(
																'customAppearance.background.bgType',
																LinkInBioThemeBackgroundEnum.gradient,
																false
															);
														}}
													>
														<ZIonIcon icon={addOutline} className='pe-2' />
														<ZIonText>Add gradient</ZIonText>
													</ZIonButton>
												)}
											</div>

											<ZIonTitle className='font-bold zaions__fs_16 ion-margin-top ion-no-padding'>
												🎫 Button type
											</ZIonTitle>
											<ZIonRow
												className={classNames(
													classes['row-gap-1-point-6-rem'],
													{
														'ion-padding-top': true,
													}
												)}
											>
												{/* Filled's */}
												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-button-type-button-active': true, // from index.css
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineSquare,
															}
														)}
														color='medium'
														style={{
															'--border-radius': '0',
														}}
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineSquare,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineRound,
															}
														)}
														color='medium'
														style={{
															'--border-radius': '10px',
														}}
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineRound,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineCircle,
															}
														)}
														color='medium'
														shape='round'
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineCircle,
																false
															);
														}}
													/>
												</ZIonCol>

												{/* Outline's */}
												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineSquareOutline,
															}
														)}
														color={
															values?.customAppearance?.buttonType ===
															LinkInBioButtonTypeEnum.inlineSquareOutline
																? 'primary'
																: 'medium'
														}
														style={{
															'--border-radius': '0',
														}}
														fill='outline'
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineSquareOutline,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineRoundOutline,
															}
														)}
														color={
															values?.customAppearance?.buttonType ===
															LinkInBioButtonTypeEnum.inlineRoundOutline
																? 'primary'
																: 'medium'
														}
														style={{
															'--border-radius': '10px',
														}}
														fill='outline'
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineRoundOutline,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineCircleOutline,
															}
														)}
														color={
															values?.customAppearance?.buttonType ===
															LinkInBioButtonTypeEnum.inlineCircleOutline
																? 'primary'
																: 'medium'
														}
														shape='round'
														fill='outline'
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineCircleOutline,
																false
															);
														}}
													/>
												</ZIonCol>

												{/* Shadow's */}
												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															classes['zaions-button-type-shadow'],
															{
																'zaions-border-transparent':
																	values?.customAppearance?.buttonType !==
																	LinkInBioButtonTypeEnum.inlineSquareShadow,
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineSquareShadow,
															}
														)}
														color='medium'
														style={{
															'--border-radius': '0',
														}}
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineSquareShadow,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															classes['zaions-button-type-shadow'],
															{
																'zaions-border-transparent':
																	values?.customAppearance?.buttonType !==
																	LinkInBioButtonTypeEnum.inlineRoundShadow,
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineRoundShadow,
															}
														)}
														color='medium'
														style={{
															'--border-radius': '10px',
														}}
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineRoundShadow,
																false
															);
														}}
													/>
												</ZIonCol>

												<ZIonCol size='4'>
													<ZIonButton
														className={classNames(
															classes['zaions-button-type'],
															classes['zaions-button-type-shadow'],
															{
																'zaions-border-primary':
																	values?.customAppearance?.buttonType ===
																	LinkInBioButtonTypeEnum.inlineCircleShadow,
																'zaions-border-transparent':
																	values?.customAppearance?.buttonType !==
																	LinkInBioButtonTypeEnum.inlineCircleShadow,
															}
														)}
														color='medium'
														shape='round'
														onClick={() => {
															setFieldValue(
																'customAppearance.buttonType',
																LinkInBioButtonTypeEnum.inlineCircleShadow,
																false
															);
														}}
													/>
												</ZIonCol>

												{/* Shadow Color */}
												<ZIonCol size='12' className='mt-3'>
													{values?.customAppearance?.buttonType &&
														[
															LinkInBioButtonTypeEnum.inlineSquareShadow,
															LinkInBioButtonTypeEnum.inlineRoundShadow,
															LinkInBioButtonTypeEnum.inlineCircleShadow,
														].includes(
															values?.customAppearance?.buttonType
														) && (
															<ZaionsColorPiker
																name='customAppearance.shadowColor'
																value={values?.customAppearance?.shadowColor}
																setFieldValueFn={setFieldValue}
															/>
														)}
												</ZIonCol>
											</ZIonRow>
										</ZIonCol>
									)}
								</ZIonRow>
							</ZIonCol>
						)}

						{/* 🗃️ Card number */}
						{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
							linkInBioBlockData?.blockType ===
								LinkInBioBlockEnum.wordpress) && (
							<ZIonCol
								size='11'
								className='ion-padding-vertical ion-margin-start border-bottom__violet'
							>
								<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
									🗃️ Card number: <ZIonText color='primary'>10</ZIonText>
								</ZIonTitle>
								<div className='mb-2'>
									<ZIonRange
										max={25}
										ticks={true}
										snaps={true}
										pin={true}
										pinFormatter={(value: number) => value}
									>
										<ZIonIcon slot='start' icon={removeOutline} />
										<ZIonIcon slot='end' icon={addOutline} />
									</ZIonRange>
								</div>
							</ZIonCol>
						)}

						{/* ✨ Style */}
						{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.countdown ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.carousel ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.wordpress ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.avatar) && (
							<ZIonCol
								sizeXl='11'
								sizeLg='12'
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
								className='pb-2 ion-padding-top ion-margin-start border-bottom__violet'
							>
								<ZIonTitle className='mb-3 font-bold zaions__fs_16 ion-no-padding'>
									✨ Style
								</ZIonTitle>
								<div className='mb-2 ion-padding-bottom'>
									{linkInBioBlockData?.blockType !==
										LinkInBioBlockEnum.avatar && (
										<>
											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.horizontal
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.horizontal,
														false
													);
												}}
											>
												<ZIonImg
													src={card_style_1}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.vertical
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.vertical,
														false
													);
												}}
											>
												<ZIonImg
													src={card_style_2}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>
										</>
									)}

									{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
										linkInBioBlockData?.blockType ===
											LinkInBioBlockEnum.carousel ||
										linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
										linkInBioBlockData?.blockType ===
											LinkInBioBlockEnum.shopify ||
										linkInBioBlockData?.blockType ===
											LinkInBioBlockEnum.magento ||
										linkInBioBlockData?.blockType ===
											LinkInBioBlockEnum.wordpress) && (
										<>
											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.thumbRound
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.thumbRound,
														false
													);
												}}
											>
												<ZIonImg
													src={thumb_style_1}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.thumbCircle
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.thumbCircle,
														false
													);
												}}
											>
												<ZIonImg
													src={thumb_style_2}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.thumbStrip
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.thumbStrip,
														false
													);
												}}
											>
												<ZIonImg
													src={strip_style}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>
										</>
									)}
									{linkInBioBlockData?.blockType ===
										LinkInBioBlockEnum.avatar && (
										<>
											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.circle
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.circle,
														false
													);
												}}
											>
												<ZIonImg
													src={strip_style}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.square
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.square,
														false
													);
												}}
											>
												<ZIonImg
													src={strip_style}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.style === LinkInBioCardStyleEnum.album
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'style',
														LinkInBioCardStyleEnum.album,
														false
													);
												}}
											>
												<ZIonImg
													src={strip_style}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>
										</>
									)}
								</div>
							</ZIonCol>
						)}

						{/* 👓 View */}
						{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.magento ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.wordpress ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.shopify ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.RSS ||
							linkInBioBlockData?.blockType ===
								LinkInBioBlockEnum.carousel) && (
							<ZIonCol
								sizeXl='11'
								sizeLg='12'
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
								className='ion-padding-vertical ion-margin-start border-bottom__violet'
							>
								<ZIonTitle className='mb-3 font-bold zaions__fs_16 ion-no-padding'>
									👓 View
								</ZIonTitle>
								<div className='mb-2 ion-padding-bottom'>
									<ZRoundedButton
										className='me-2'
										color={
											values.view === LinkInBioCardViewEnum.carousel
												? 'primary'
												: 'medium'
										}
										onClick={() => {
											setFieldValue(
												'view',
												LinkInBioCardViewEnum.carousel,
												false
											);
										}}
									>
										<ZIonImg
											src={carousel_view}
											style={{
												width: '22px',
											}}
										/>
									</ZRoundedButton>

									<ZRoundedButton
										className='me-2'
										color={
											values.view === LinkInBioCardViewEnum.list
												? 'primary'
												: 'medium'
										}
										onClick={() => {
											setFieldValue('view', LinkInBioCardViewEnum.list, false);
										}}
									>
										<ZIonImg
											src={list_view}
											style={{
												width: '22px',
											}}
										/>
									</ZRoundedButton>

									<ZRoundedButton
										className='me-2'
										color={
											values.view === LinkInBioCardViewEnum.mixed
												? 'primary'
												: 'medium'
										}
										onClick={() => {
											setFieldValue('view', LinkInBioCardViewEnum.mixed, false);
										}}
									>
										<ZIonImg
											src={mixed_view}
											style={{
												width: '22px',
											}}
										/>
									</ZRoundedButton>
								</div>
							</ZIonCol>
						)}

						{/* 🎈 Animation */}
						{(linkInBioBlockData?.blockType === LinkInBioBlockEnum.button ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.text ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.countdown ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.card ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.carousel ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.music ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.QAndA ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.messenger ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.form ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.social ||
							linkInBioBlockData?.blockType === LinkInBioBlockEnum.VCard) && (
							<ZIonCol
								sizeXl='11'
								sizeLg='12'
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
								className='ion-padding-top ion-margin-start border-bottom__violet'
							>
								<ZIonRow className='ion-padding-bottom'>
									<ZIonCol>
										<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
											🎈 Animation <ZIonRouterLink>(help)</ZIonRouterLink>
										</ZIonTitle>
									</ZIonCol>

									<ZIonCol className='ion-text-end'>
										<ZRCSwitch
											checked={values.animation.isEnabled}
											onChange={(_value) => {
												setFieldValue('animation.isEnabled', _value, false);
											}}
										/>
									</ZIonCol>

									{values.animation.isEnabled && (
										<ZIonCol size='12' className='my-3'>
											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.tada
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.tada,
														false
													);
												}}
											>
												<ZIonImg
													src={tadaAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.shake
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.shake,
														false
													);
												}}
											>
												<ZIonImg
													src={shakeAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.swing
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.swing,
														false
													);
												}}
											>
												<ZIonImg
													src={swingAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.wobble
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.wobble,
														false
													);
												}}
											>
												<ZIonImg
													src={wobbleAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.jello
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.jello,
														false
													);
												}}
											>
												<ZIonImg
													src={jelloAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.pulse
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.pulse,
														false
													);
												}}
											>
												<ZIonImg
													src={pulseAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>

											<ZRoundedButton
												className='me-2'
												color={
													values.animation.type ===
													LinkInBioBlockAnimationEnum.zoom
														? 'primary'
														: 'medium'
												}
												onClick={() => {
													setFieldValue(
														'animation.type',
														LinkInBioBlockAnimationEnum.zoom,
														false
													);
												}}
											>
												<ZIonImg
													src={zoomAnimation}
													style={{
														width: '22px',
													}}
												/>
											</ZRoundedButton>
										</ZIonCol>
									)}
								</ZIonRow>
							</ZIonCol>
						)}

						{/* ⏱ Schedule */}
						<ZIonCol
							sizeXl='11'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className='mb-2 ion-padding-top ion-margin-horizontal'
						>
							<ZIonRow className='ion-margin-bottom'>
								<ZIonCol>
									<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
										⏱ Schedule <ZIonRouterLink>(help)</ZIonRouterLink>
									</ZIonTitle>
								</ZIonCol>

								<ZIonCol className='ion-text-end'>
									<ZRCSwitch
										checked={values.schedule.isEnabled}
										onChange={(_value) => {
											setFieldValue('schedule.isEnabled', _value, false);
										}}
									/>
								</ZIonCol>

								{values.schedule.isEnabled && (
									<ZIonCol size='12' className='mt-3'>
										<ZIonRow>
											<ZIonCol size='5.9' className='me-2'>
												{/* <ZIonItem className='ion-no-padding ion-no-margin'> */}
												<ZIonLabel className='font-bold ms-2'>
													Start at:
												</ZIonLabel>
												<ZIonDatetimeButton
													name='schedule.startAt'
													className='mt-2 ion-justify-content-start zaions-datetime-btn'
													onIonChange={({ target }) => {
														setFieldValue(
															'schedule.startAt',
															target.value,
															false
														);
													}}
													id='startAt'
													value={dayjs(values.schedule.startAt).format(
														CONSTANTS.DateTime.iso8601DateTime
													)}
													min={new Date().toISOString()}
												/>
											</ZIonCol>

											<ZIonCol size='5.9'>
												<ZIonLabel className='font-bold ms-2'>
													End at:
												</ZIonLabel>
												<ZIonDatetimeButton
													className='mt-2 ion-justify-content-start zaions-datetime-btn'
													name='schedule.endAt'
													onIonChange={({ target }) => {
														setFieldValue(
															'schedule.endAt',
															target.value,
															false
														);
													}}
													id='endAt'
													value={dayjs(values.schedule.endAt).format(
														CONSTANTS.DateTime.iso8601DateTime
													)}
													min={dayjs(
														dayjs(values.schedule.startAt)
															.add(1, 'hour')
															.toISOString()
													).format(CONSTANTS.DateTime.iso8601DateTime)}
												/>
											</ZIonCol>
										</ZIonRow>
									</ZIonCol>
								)}
							</ZIonRow>
						</ZIonCol>
					</>
				);
			}}
		</Formik>
	);
};

export default ZLinkInBioBlocksForm;
