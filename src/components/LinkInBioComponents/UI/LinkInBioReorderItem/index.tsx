/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useLocation, useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { appsOutline, pencilOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';
import { OverlayEventDetail } from '@ionic/core';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonReorder,
	ZIonText,
} from '@/components/ZIonComponents';
import ZLinkInBioAvatarBlock from '@/components/LinkInBioComponents/UI/AvatarBlock';
import ZLinkInBioButtonBlock from '@/components/LinkInBioComponents/UI/ButtonBlock';
import ZLinkInBioCardBlock from '@/components/LinkInBioComponents/UI/CardBlock';
import ZLinkInBioTextBlock from '@/components/LinkInBioComponents/UI/TextBlock';
import ZLinkInBioRSSBlock from '@/components/LinkInBioComponents/UI/ZLinkInBioRSSBlock';
import ZLinkInBioCalendarBlock from '@/components/LinkInBioComponents/UI/CalendarBlock';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import ZVideoBlock from '@/components/LinkInBioComponents/UI/VideoBlock';
import ZAudioBlock from '@/components/LinkInBioComponents/UI/AudioBlock';

import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZRQDeleteRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import {
	createRedirectRoute,
	generatePredefinedThemeBackgroundValue,
	zJsonParse,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkInBioButtonTypeEnum,
	LinkInBioThemeBackgroundType,
	LinkInBioType,
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import {
	LinkInBioBlockEnum,
	LinkInBioBlockFromType,
	LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioBlocksRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioBlocksState';
import ZCarouselBlock from '../ZCarouselBlock';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import ZLinkInBioMusicBlock from '../MusicBlock';
import ZLinkInBioSocialBlock from '../SocialBlock';
import ZLinkInBioSeparatorBlock from '../SeparatorBlock';
import ZLinkInBioMessengerBlock from '../MessengerBlock';
import ZLinkInBioQAndABlock from '../QAndABlock';
import ZLinkInBioVCardBlock from '../VCardBlock';
import ZLinkInBioFormBlock from '../FromBlock';
import ZLinkInBioMapBlock from '../MapBlock';
import { NewLinkInBioFormState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';
import classNames from 'classnames';

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

interface ZLinkInBioReorderItemInterface {
	element: LinkInBioBlockFromType;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioReorderItem: React.FC<ZLinkInBioReorderItemInterface> = ({
	element,
}) => {
	const location = useLocation();

	// parse blockContent data from element.
	const parseLinkInBioSelectedBlockData =
		zJsonParse<LinkInBioSingleBlockContentType>(String(element.blockContent));

	// IonActionSheet present went user went to delete a block.

	// validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	const { validateRequestResponse } = useZValidateRequestResponse();

	// For redirection.
	const { zNavigatePushRoute } = useZNavigate();

	// getting search param from url with the help of 'qs' package.
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const [linkInBioBlockState, setLinkInBioBlockState] = useRecoilState(
		LinkInBioBlocksRState
	);

	// link-in-bio id get from route(url).
	const { linkInBioId, workspaceId } = useParams<{
		linkInBioId: string;
		workspaceId: string;
	}>();

	const { setFieldValue } = useFormikContext<LinkInBioType>();

	// delete link-in-bio block api where use went to delete the block on preview panel and click on the delete button in ActionSheet (useZIonActionSheet) the deleteBlockHandler will execute with will hit this api and delete the block.
	const { mutateAsync: deleteLinkInBioBlockMutate } = useZRQDeleteRequest(
		API_URL_ENUM.linkInBioBlock_delete_update_get,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_BLOCK.MAIN]
	);

	// delete block function.
	const deleteBlockHandler = async (detail: OverlayEventDetail<unknown>) => {
		try {
			if (
				detail &&
				detail.role === 'destructive' &&
				(detail.data as { id: string }).id
			) {
				const _updateLinkInBioBlockState = linkInBioBlockState.filter(
					(el) => el.id !== (detail.data as { id: string }).id
				);

				const _result = await deleteLinkInBioBlockMutate({
					itemIds: [linkInBioId, (detail.data as { id: string }).id],
					urlDynamicParts: [':linkInBioId', ':blockId'],
				});

				if (
					(routeQSearchParams as { blockId: string }).blockId ===
					(detail.data as { id: string }).id
				) {
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

				setLinkInBioBlockState(_updateLinkInBioBlockState);
				// if _result of the updateLinkInBio api is success this showing success notification else not success then error notification.
				await validateRequestResponse({
					resultObj: _result,
				});
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// getting the custom style for all the buttons from linkInBioFormState recoil.
	const linkInBioFormState = useRecoilValue(NewLinkInBioFormState);

	// Edit block function this will execute when user went to edit the block and click on the pencil button present in every block side by side of delete button, this will navigate the user to block form page where from route the the blockID will be get and the data of that id will fetch from backend and placed as initial value.
	const blockEditHandler = () => {
		try {
			setFieldValue('LinkInBioBlock', element?.blockType, false);

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
						step: ZLinkInBioRHSComponentEnum.blockForm,
						blockId: element?.id || '',
					},
				})
			);
		} catch (error) {
			reportCustomError(error);
		}
	};

	// ----- Buttons Types ----- //
	// Outlines.
	const currentBlockCustomAppearanceButtonOutlineType =
		parseLinkInBioSelectedBlockData?.customAppearance?.buttonType &&
		[
			LinkInBioButtonTypeEnum.inlineSquareOutline,
			LinkInBioButtonTypeEnum.inlineRoundOutline,
			LinkInBioButtonTypeEnum.inlineCircleOutline,
		].includes(parseLinkInBioSelectedBlockData?.customAppearance.buttonType);

	const linkInBioThemeButtonOutlineType =
		linkInBioFormState.theme.button.type &&
		[
			LinkInBioButtonTypeEnum.inlineSquareOutline,
			LinkInBioButtonTypeEnum.inlineRoundOutline,
			LinkInBioButtonTypeEnum.inlineCircleOutline,
		].includes(linkInBioFormState.theme.button.type);

	// Square
	const currentBlockCustomAppearanceButtonSquareType =
		parseLinkInBioSelectedBlockData?.customAppearance?.buttonType &&
		[
			LinkInBioButtonTypeEnum.inlineSquare,
			LinkInBioButtonTypeEnum.inlineSquareOutline,
			LinkInBioButtonTypeEnum.inlineSquareShadow,
		].includes(parseLinkInBioSelectedBlockData?.customAppearance.buttonType);

	const linkInBioThemeButtonSquareType =
		linkInBioFormState.theme.button.type &&
		[
			LinkInBioButtonTypeEnum.inlineSquare,
			LinkInBioButtonTypeEnum.inlineSquareOutline,
			LinkInBioButtonTypeEnum.inlineSquareShadow,
		].includes(linkInBioFormState.theme.button.type);

	// Circle
	const currentBlockCustomAppearanceButtonCircleType =
		parseLinkInBioSelectedBlockData?.customAppearance?.buttonType &&
		[
			LinkInBioButtonTypeEnum.inlineCircle,
			LinkInBioButtonTypeEnum.inlineCircleOutline,
			LinkInBioButtonTypeEnum.inlineCircleShadow,
		].includes(parseLinkInBioSelectedBlockData?.customAppearance.buttonType);

	const linkInBioThemeButtonCircleType =
		linkInBioFormState.theme.button.type &&
		[
			LinkInBioButtonTypeEnum.inlineCircle,
			LinkInBioButtonTypeEnum.inlineCircleOutline,
			LinkInBioButtonTypeEnum.inlineCircleShadow,
		].includes(linkInBioFormState.theme.button.type);

	// Shadow
	const currentBlockCustomAppearanceButtonShadowType =
		parseLinkInBioSelectedBlockData?.customAppearance?.buttonType &&
		[
			LinkInBioButtonTypeEnum.inlineSquareShadow,
			LinkInBioButtonTypeEnum.inlineRoundShadow,
			LinkInBioButtonTypeEnum.inlineCircleShadow,
		].includes(parseLinkInBioSelectedBlockData?.customAppearance.buttonType);

	const linkInBioThemeButtonShadowType =
		linkInBioFormState.theme.button.type &&
		[
			LinkInBioButtonTypeEnum.inlineSquareShadow,
			LinkInBioButtonTypeEnum.inlineRoundShadow,
			LinkInBioButtonTypeEnum.inlineCircleShadow,
		].includes(linkInBioFormState.theme.button.type);

	// ----- Buttons style ----- //

	const _buttonOutlineStyle = {
		'--background': 'transparent',
		'--border-color': '#fff',
		'--border-width': '1px',
		'--border-style': 'solid',
		'--box-shadow': 'none',
	};

	const _buttonStyle = parseLinkInBioSelectedBlockData?.customAppearance
		?.isEnabled
		? currentBlockCustomAppearanceButtonOutlineType
			? _buttonOutlineStyle
			: generatePredefinedThemeBackgroundValue(
					parseLinkInBioSelectedBlockData?.customAppearance
						.background as LinkInBioThemeBackgroundType
			  )
		: linkInBioThemeButtonOutlineType
		? _buttonOutlineStyle
		: generatePredefinedThemeBackgroundValue(
				linkInBioFormState.theme.button
					.background as LinkInBioThemeBackgroundType
		  );

	// ----- Buttons Fill value ----- //
	const _buttonFillValue = parseLinkInBioSelectedBlockData?.customAppearance
		?.isEnabled
		? currentBlockCustomAppearanceButtonOutlineType
			? 'outline'
			: 'default'
		: linkInBioThemeButtonOutlineType
		? 'outline'
		: 'default';

	return (
		<ZIonItem
			className='my-4 zaions-linkInBio-block'
			style={{
				'--background': 'transparent',
				opacity: element.isActive ? '1' : '0.4',
			}}
			data-block-id={element.id}
		>
			<ZCustomDeleteComponent
				deleteFn={deleteBlockHandler}
				data={{ id: element?.id as string }}
				className='ion-no-padding me-1'
				slot='start'
				iconColor='light'
			/>

			<ZIonButton
				className='ion-no-padding me-3'
				slot='start'
				fill='clear'
				size='large'
				onClick={() => {
					blockEditHandler();
				}}
			>
				<ZIonText>
					<ZIonIcon icon={pencilOutline} color='light' className='w-6 h-6' />
				</ZIonText>
			</ZIonButton>

			{element?.blockType === LinkInBioBlockEnum.avatar ? (
				<ZLinkInBioAvatarBlock />
			) : element?.blockType === LinkInBioBlockEnum.text ? (
				<ZLinkInBioTextBlock
					children={parseLinkInBioSelectedBlockData?.text || 'text'}
					fontFamily={linkInBioFormState.theme.font}
				/>
			) : element?.blockType === LinkInBioBlockEnum.card ? (
				<ZLinkInBioCardBlock />
			) : element?.blockType === LinkInBioBlockEnum.button ? (
				<ZLinkInBioButtonBlock
					fontFamily={linkInBioFormState.theme.font}
					style={{
						..._buttonStyle,
						'--box-shadow': parseLinkInBioSelectedBlockData?.customAppearance
							?.isEnabled
							? currentBlockCustomAppearanceButtonShadowType
								? `6px 6px ${
										parseLinkInBioSelectedBlockData?.customAppearance
											?.shadowColor ||
										CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
								  }`
								: ''
							: linkInBioThemeButtonShadowType
							? `6px 6px ${
									linkInBioFormState?.theme?.button?.shadowColor ||
									CONSTANTS.LINK_In_BIO.INITIAL_VALUES.BUTTON_SHADOW_COLOR
							  }`
							: '',
					}}
					title={parseLinkInBioSelectedBlockData?.title || 'button'}
					url={parseLinkInBioSelectedBlockData?.target?.url}
					// TODO: make this a option in frontend, so user will be able to select whether to open the link in new tab or not - (will be theme and block wise)
					target='_blank'
					animationType={
						parseLinkInBioSelectedBlockData?.animation?.isEnabled
							? parseLinkInBioSelectedBlockData?.animation?.type
							: undefined
					}
					fill={_buttonFillValue}
					className={classNames({
						// inlineSquare
						inlineSquare: parseLinkInBioSelectedBlockData?.customAppearance
							?.isEnabled
							? currentBlockCustomAppearanceButtonSquareType
							: linkInBioThemeButtonSquareType,
						// inlineRound
						inlineRound: parseLinkInBioSelectedBlockData?.customAppearance
							?.isEnabled
							? parseLinkInBioSelectedBlockData?.customAppearance?.buttonType &&
							  [
									LinkInBioButtonTypeEnum.inlineRound,
									LinkInBioButtonTypeEnum.inlineRoundOutline,
									LinkInBioButtonTypeEnum.inlineRoundShadow,
							  ].includes(
									parseLinkInBioSelectedBlockData?.customAppearance.buttonType
							  )
							: linkInBioFormState.theme.button.type &&
							  [
									LinkInBioButtonTypeEnum.inlineRound,
									LinkInBioButtonTypeEnum.inlineRoundOutline,
									LinkInBioButtonTypeEnum.inlineRoundShadow,
							  ].includes(linkInBioFormState.theme.button.type),

						// inlineCircle
						'border-radius__100vmax': parseLinkInBioSelectedBlockData
							?.customAppearance?.isEnabled
							? currentBlockCustomAppearanceButtonCircleType
							: linkInBioThemeButtonCircleType,
					})}
				/>
			) : element?.blockType === LinkInBioBlockEnum.RSS ? (
				<ZLinkInBioRSSBlock
					data={parseLinkInBioSelectedBlockData?.cardItems}
					cardStyle={parseLinkInBioSelectedBlockData?.style}
				/>
			) : element?.blockType === LinkInBioBlockEnum.calendar ? (
				<ZLinkInBioCalendarBlock fontFamily={linkInBioFormState.theme.font} />
			) : element?.blockType === LinkInBioBlockEnum.countdown ? (
				<ZCountdown countDownTime={parseLinkInBioSelectedBlockData?.date} />
			) : element?.blockType === LinkInBioBlockEnum.video ? (
				<ZVideoBlock
					videoLink={parseLinkInBioSelectedBlockData?.target?.url}
					title={parseLinkInBioSelectedBlockData?.title}
				/>
			) : element?.blockType === LinkInBioBlockEnum.audio ? (
				<ZAudioBlock
					audioLink={parseLinkInBioSelectedBlockData?.target?.url}
					title={parseLinkInBioSelectedBlockData?.title}
				/>
			) : element?.blockType === LinkInBioBlockEnum.carousel ? (
				<ZCarouselBlock
					data={parseLinkInBioSelectedBlockData?.cardItems}
					cardStyle={parseLinkInBioSelectedBlockData?.style}
				/>
			) : element?.blockType === LinkInBioBlockEnum.music ? (
				<ZLinkInBioMusicBlock
					fontFamily={linkInBioFormState.theme.font}
					musicBlockData={parseLinkInBioSelectedBlockData?.cardItems}
				/>
			) : element?.blockType === LinkInBioBlockEnum.social ? (
				<ZLinkInBioSocialBlock
					socialBlockData={parseLinkInBioSelectedBlockData?.cardItems}
				/>
			) : element?.blockType === LinkInBioBlockEnum.spacing ? (
				<ZIonCol
					style={{
						height: `${parseLinkInBioSelectedBlockData?.spacing as number}px`,
					}}
				/>
			) : element?.blockType === LinkInBioBlockEnum.separator ? (
				<ZLinkInBioSeparatorBlock
					_borderColor={parseLinkInBioSelectedBlockData?.separatorColor}
					_borderStyle={parseLinkInBioSelectedBlockData?.separatorType}
					_marginVertical={parseLinkInBioSelectedBlockData?.separatorMargin}
				/>
			) : element?.blockType === LinkInBioBlockEnum.messenger ? (
				<ZLinkInBioMessengerBlock
					messengerBlockData={parseLinkInBioSelectedBlockData?.cardItems}
					fontFamily={linkInBioFormState.theme.font}
				/>
			) : element?.blockType === LinkInBioBlockEnum.QAndA ? (
				<ZLinkInBioQAndABlock
					QAndABlockData={parseLinkInBioSelectedBlockData?.cardItems}
					fontFamily={linkInBioFormState.theme.font}
				/>
			) : element?.blockType === LinkInBioBlockEnum.VCard ? (
				<ZLinkInBioVCardBlock
					VCardBlockData={parseLinkInBioSelectedBlockData?.vcard}
					title={parseLinkInBioSelectedBlockData?.title}
					// icon={parseLinkInBioSelectedBlockData?.icon}
				/>
			) : element?.blockType === LinkInBioBlockEnum.form ? (
				<ZLinkInBioFormBlock
					fromBlockData={parseLinkInBioSelectedBlockData?.form}
					fontFamily={linkInBioFormState.theme.font}
				/>
			) : element?.blockType === LinkInBioBlockEnum.map ? (
				<ZLinkInBioMapBlock
					mapId={`${PRODUCT_NAME}-map-block-${element.id || ''}`}
					latitude={parseLinkInBioSelectedBlockData?.map?.lat}
					longitude={parseLinkInBioSelectedBlockData?.map?.lng}
				/>
			) : (
				''
			)}
			<ZIonReorder slot='end' className='ms-3'>
				<ZIonIcon icon={appsOutline} color='light' className='w-6 h-6' />
			</ZIonReorder>
		</ZIonItem>
	);
};

export default ZLinkInBioReorderItem;
