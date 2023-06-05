/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { addOutline, arrowUp } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZDragAndDrop from '@/components/CustomComponents/ZDragAndDrop';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZaionsColorPiker from '@/components/InPageComponents/ZaionsColorPiker';
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	LinkInBioBgGradientColorsInterface,
	LinkInBioButtonTypeEnum,
	LinkInBioPredefinedThemeType,
	LinkInBioThemeBackgroundEnum,
	LinkInBioThemeBackgroundType,
	LinkInBioType,
} from '@/types/AdminPanel/linkInBioType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { LinkInBioFontFamilyRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFontFamilyState';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import classes from '../styles.module.css';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { LinkInBioPredefinedThemeRState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioPreDefinedThemesState.recoil';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import {
	formatReactSelectOption,
	generatePredefinedThemeBackgroundValue,
	zJsonParse,
} from '@/utils/helpers';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { useParams } from 'react-router';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioThemeSection: React.FC = () => {
	const linkInBioFontFamilyState = useRecoilValue(LinkInBioFontFamilyRState);

	// const [linkInBioPredefinedThemesState, setLinkInBioPredefinedThemesState] =
	// 	useRecoilState(LinkInBioPredefinedThemeRState);

	// current Link-in-bio id.
	const { linkInBioId } = useParams<{
		linkInBioId: string;
	}>();

	const { values, setFieldValue } = useFormikContext<LinkInBioType>();

	const { data: LinkInBioPreDefinedThemesData } = useZRQGetRequest<
		LinkInBioPredefinedThemeType[]
	>({
		_url: API_URL_ENUM.linkInBioPreDefinedThemes_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO_PRE_DEFINED_THEMES.MAIN,
			linkInBioId,
		],
	});

	// useEffect(() => {
	// 	try {
	// 		if (LinkInBioPreDefinedThemesData) {
	// 			const _updatedData = LinkInBioPreDefinedThemesData.map((el) => {
	// 				const _predefinedTheme: LinkInBioPredefinedThemeType = {
	// 					id: el.id,
	// 					background: zJsonParse<LinkInBioThemeBackgroundType>(
	// 						el.background as string
	// 					),
	// 					isActive: el.isActive,
	// 					createdAt: el.createdAt,
	// 					updatedAt: el.updatedAt,
	// 				};
	// 				return _predefinedTheme;
	// 			});
	// 			setLinkInBioPredefinedThemesState(_updatedData);
	// 		}
	// 	} catch (error) {
	// 		reportCustomError(error);
	// 	}
	// 	// eslint-disable-next-line
	// }, [LinkInBioPreDefinedThemesData]);

	return (
		<>
			{/* 🎨 Pre-defined start */}
			<ZIonCol
				sizeXl='11'
				sizeLg='12'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='ion-padding-vertical ion-margin-top ion-margin-start '
			>
				<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
					🎨 Pre-defined
				</ZIonTitle>
				<ZIonRow
					className={classNames(classes['row-gap-1-point-6-rem'], {
						'ion-margin-top pt-2 ion-padding-bottom mb-2 ': true,
					})}
				>
					{LinkInBioPreDefinedThemesData?.map((el, i) => {
						return (
							<ZIonCol size='1.9' key={i}>
								<ZIonButton
									size='large'
									className={classNames(classes['zaions-pd-color-block'], {
										'me-3': true,
									})}
									style={{
										...generatePredefinedThemeBackgroundValue(
											el.background as LinkInBioThemeBackgroundType
										),
									}}
									onClick={() => {
										const _bg = el.background as LinkInBioThemeBackgroundType;

										const _bgGradient = zJsonParse(
											_bg.bgGradientColors as unknown as string
										) as LinkInBioBgGradientColorsInterface;

										setFieldValue(
											'theme.background',
											{
												bgType: _bg?.bgType,
												bgSolidColor: _bg?.bgSolidColor,
												bgGradientColors: {
													startColor: _bgGradient?.startColor,
													endColor: _bgGradient?.endColor,
													direction: _bgGradient?.direction || 0,
												},
												bgImageUrl: _bg?.bgImageUrl,
												enableBgImage: _bg?.enableBgImage,
											},
											true
										);
									}}
								/>
							</ZIonCol>
						);
					})}
				</ZIonRow>
			</ZIonCol>
			{/* 🎨 Pre-defined end */}

			{/* 🖌️ Background */}
			<ZIonCol
				sizeXl='11'
				sizeLg='12'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
			>
				<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
					🖌️ Background
				</ZIonTitle>

				<div className='flex ion-align-items-center ion-padding-bottom'>
					{values?.theme?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.solidColor && (
						<ZaionsColorPiker
							name='theme.background.bgSolidColor'
							value={values.theme.background.bgSolidColor as string}
							setFieldValueFn={setFieldValue}
						/>
					)}

					{values?.theme?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.gradient && (
						<>
							<ZaionsColorPiker
								name='theme.background.bgGradientColors.startColor'
								value={
									values?.theme.background?.bgGradientColors
										?.startColor as string
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
										+(values?.theme?.background?.bgGradientColors
											?.direction as string) +
										+CONSTANTS.LINK_In_BIO.FORM.DIRECTION_PRE_CLICKED;
									_newDirection = _newDirection >= 359 ? 0 : _newDirection;
									setFieldValue(
										'theme.background.bgGradientColors.direction',
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
										transform: `rotate(${values?.theme?.background?.bgGradientColors?.direction}deg)`,
									}}
								/>
							</ZIonButton>
							<ZaionsColorPiker
								name='theme.background.bgGradientColors.endColor'
								value={
									values?.theme?.background?.bgGradientColors
										?.endColor as string
								}
								setFieldValueFn={setFieldValue}
								showCloseIcon={true}
								closeIconOnChangeFn={() => {
									setFieldValue(
										'theme.background.bgType',
										LinkInBioThemeBackgroundEnum.solidColor,
										false
									);
								}}
							/>
						</>
					)}
					{values?.theme?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.solidColor && (
						<ZIonButton
							className='mt-3 ion-text-capitalize ms-4'
							shape='round'
							onClick={() => {
								setFieldValue(
									'theme.background.bgType',
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
			</ZIonCol>
			{/* 🖌️ Background */}

			{/* 🖍️ Button color & 🎫 Button type start */}
			<ZIonCol
				sizeXl='11'
				sizeLg='12'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
			>
				{/* 🖍️ Button color */}
				<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
					🖍️ Button color
				</ZIonTitle>

				<div className='flex ion-align-items-center ion-padding-bottom border-bottom__violet'>
					{values?.theme?.button?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.solidColor && (
						<ZaionsColorPiker
							name='theme.button.background.bgSolidColor'
							value={values?.theme?.button?.background?.bgSolidColor as string}
							setFieldValueFn={setFieldValue}
						/>
					)}

					{values?.theme?.button?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.gradient && (
						<>
							<ZaionsColorPiker
								name='theme.button.background.bgGradientColors.startColor'
								value={
									values?.theme?.button?.background?.bgGradientColors
										?.startColor as string
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
										+(values?.theme?.button?.background?.bgGradientColors
											?.direction as string) +
										+CONSTANTS.LINK_In_BIO.FORM.DIRECTION_PRE_CLICKED;
									_newDirection = _newDirection >= 359 ? 0 : _newDirection;
									setFieldValue(
										'theme.button.background.bgGradientColors.direction',
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
										transform: `rotate(${values?.theme?.button?.background?.bgGradientColors?.direction}deg)`,
									}}
								/>
							</ZIonButton>
							<ZaionsColorPiker
								name='theme.button.background.bgGradientColors.endColor'
								value={
									values?.theme?.button?.background?.bgGradientColors
										?.endColor as string
								}
								setFieldValueFn={setFieldValue}
								showCloseIcon={true}
								closeIconOnChangeFn={() => {
									setFieldValue(
										'theme.button.background.bgType',
										LinkInBioThemeBackgroundEnum.solidColor,
										false
									);
								}}
							/>
						</>
					)}
					{values?.theme?.button?.background?.bgType ===
						LinkInBioThemeBackgroundEnum.solidColor && (
						<ZIonButton
							className='mt-3 ion-text-capitalize ms-4'
							shape='round'
							onClick={() => {
								setFieldValue(
									'theme.button.background.bgType',
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

				{/* 🎫 Button type */}
				<ZIonTitle className='font-bold zaions__fs_16 ion-margin-top ion-no-padding z_ff__b612'>
					🎫 Button type
				</ZIonTitle>
				<ZIonRow
					className={classNames(classes['row-gap-1-point-6-rem'], {
						'ion-padding-vertical': true,
					})}
				>
					{/* Filled's */}
					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-button-type-button-active': true, // from index.css
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineSquare,
							})}
							color='medium'
							style={{
								'--border-radius': '0',
							}}
							onClick={() => {
								setFieldValue(
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineSquare,
									false
								);
							}}
						/>
					</ZIonCol>

					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineRound,
							})}
							color='medium'
							style={{
								'--border-radius': '10px',
							}}
							onClick={() => {
								setFieldValue(
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineRound,
									false
								);
							}}
						/>
					</ZIonCol>

					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineCircle,
							})}
							color='medium'
							shape='round'
							onClick={() => {
								setFieldValue(
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineCircle,
									false
								);
							}}
						/>
					</ZIonCol>

					{/* Outline's */}
					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineSquareOutline,
							})}
							color={
								values?.theme?.button?.type ===
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
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineSquareOutline,
									false
								);
							}}
						/>
					</ZIonCol>

					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineRoundOutline,
							})}
							color={
								values?.theme?.button?.type ===
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
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineRoundOutline,
									false
								);
							}}
						/>
					</ZIonCol>

					<ZIonCol size='4'>
						<ZIonButton
							className={classNames(classes['zaions-button-type'], {
								'zaions-border-primary':
									values?.theme?.button?.type ===
									LinkInBioButtonTypeEnum.inlineCircleOutline,
							})}
							color={
								values?.theme?.button?.type ===
								LinkInBioButtonTypeEnum.inlineCircleOutline
									? 'primary'
									: 'medium'
							}
							shape='round'
							fill='outline'
							onClick={() => {
								setFieldValue(
									'theme.button.type',
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
										values?.theme?.button?.type !==
										LinkInBioButtonTypeEnum.inlineSquareShadow,
									'zaions-border-primary':
										values?.theme?.button?.type ===
										LinkInBioButtonTypeEnum.inlineSquareShadow,
								}
							)}
							color='medium'
							style={{
								'--border-radius': '0',
							}}
							onClick={() => {
								setFieldValue(
									'theme.button.type',
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
										values?.theme?.button?.type !==
										LinkInBioButtonTypeEnum.inlineRoundShadow,
									'zaions-border-primary':
										values?.theme?.button?.type ===
										LinkInBioButtonTypeEnum.inlineRoundShadow,
								}
							)}
							color='medium'
							style={{
								'--border-radius': '10px',
							}}
							onClick={() => {
								setFieldValue(
									'theme.button.type',
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
										values?.theme?.button?.type ===
										LinkInBioButtonTypeEnum.inlineCircleShadow,
									'zaions-border-transparent':
										values?.theme?.button?.type !==
										LinkInBioButtonTypeEnum.inlineCircleShadow,
								}
							)}
							color='medium'
							shape='round'
							onClick={() => {
								setFieldValue(
									'theme.button.type',
									LinkInBioButtonTypeEnum.inlineCircleShadow,
									false
								);
							}}
						/>
					</ZIonCol>

					{/* Shadow Color */}
					<ZIonCol size='12' className='mt-3'>
						{values?.theme?.button?.type &&
							[
								LinkInBioButtonTypeEnum.inlineSquareShadow,
								LinkInBioButtonTypeEnum.inlineRoundShadow,
								LinkInBioButtonTypeEnum.inlineCircleShadow,
							].includes(values?.theme?.button?.type) && (
								<ZaionsColorPiker
									name='theme.button.shadowColor'
									value={values?.theme?.button?.shadowColor as string}
									setFieldValueFn={setFieldValue}
								/>
							)}
					</ZIonCol>
				</ZIonRow>
			</ZIonCol>
			{/* 🖍️ Button color & 🎫 Button type end */}

			{/* 📝 Font start */}
			<ZIonCol
				sizeXl='11'
				sizeLg='12'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='ion-padding-vertical ion-margin-top ion-margin-start'
			>
				<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
					📝 Font
				</ZIonTitle>

				<div className='flex ion-align-items-center ion-padding-bottom'>
					<ZaionsRSelect
						options={linkInBioFontFamilyState?.map((el) => {
							return {
								value: el.fontName,
								label: el.fontName,
							};
						})}
						className='w-full z_ff__roboto'
						name='theme.font'
						onChange={(_value) => {
							setFieldValue(
								'theme.font',
								(_value as ZaionsRSelectOptions)?.value,
								false
							);
						}}
						value={
							formatReactSelectOption(
								values?.theme?.font as string,
								linkInBioFontFamilyState as unknown as ZGenericObject[],
								'fontName',
								'fontName'
							) || []
						}
					/>
				</div>
			</ZIonCol>
			{/* 📝 Font end */}

			{/* 🖼️ Background image start */}
			<ZIonCol
				sizeXl='11'
				sizeLg='12'
				sizeMd='12'
				sizeSm='12'
				sizeXs='12'
				className='mb-5 ion-padding-vertical ion-margin-start'
			>
				<ZIonRow>
					<ZIonCol>
						<ZIonTitle className='font-bold zaions__fs_16 ion-no-padding'>
							🖼️ Background image
						</ZIonTitle>
					</ZIonCol>
					<ZIonCol className='flex ion-justify-content-end'>
						<ZRCSwitch
							onChange={(value) => {
								setFieldValue('theme.background.enableBgImage', value, false);
								if (value === true) {
									setFieldValue(
										'theme.background.bgType',
										LinkInBioThemeBackgroundEnum.image,
										false
									);
								} else {
									setFieldValue(
										'theme.background.bgType',
										LinkInBioThemeBackgroundEnum.solidColor,
										false
									);
								}
							}}
							checked={values?.theme?.background?.enableBgImage}
						/>
					</ZIonCol>
				</ZIonRow>

				{values?.theme?.background?.enableBgImage && (
					<div className='flex mt-4 ion-align-items-center ion-padding-bottom'>
						<ZDragAndDrop
							setFieldValue={setFieldValue}
							fieldName='theme.background.bgImageUrl'
							imageUrl={values.theme?.background?.bgImageUrl}
						/>
					</div>
				)}
			</ZIonCol>
			{/* 🖼️ Background image end */}
		</>
	);
};

export default ZLinkInBioThemeSection;
