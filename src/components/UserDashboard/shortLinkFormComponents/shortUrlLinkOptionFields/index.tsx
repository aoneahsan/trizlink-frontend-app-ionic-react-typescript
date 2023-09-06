/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { refreshCircleOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import isURL from 'validator/lib/isURL';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonSkeletonText,
	ZIonText,
	ZIonTextareaShort,
} from '@/components/ZIonComponents';
import ZShortLinkOptionsPopover from '@/components/InPageComponents/ZaionsPopovers/ShortLinkOptionsPopover';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import { parseZQueryString, zAddUrlProtocol } from '@/utils/helpers';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
	ShortLinkType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkSelectTypeOption } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';
import ZCPhoneNumberInput from '@/components/CustomComponents/ZPhoneNumberInput';

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

const ZaionsShortUrlOptionFields: React.FC = () => {
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
		setFieldTouched,
	} = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const [newShortLinkTypeOptionDataAtom, setNewShortLinkTypeOptionDataAtom] =
		useRecoilState(NewShortLinkSelectTypeOption);

	// getting link-in-bio and workspace ids from url with the help of useParams.
	const { editLinkId, workspaceId } = useParams<{
		editLinkId: string;
		workspaceId: string;
	}>();

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

	const { presentZIonPopover: presentShortLinkOptionsPopover } = useZIonPopover(
		ZShortLinkOptionsPopover,
		{
			setFieldValue,
		}
	); // popover hook to show ZShortLinkOptionsPopover

	useEffect(() => {
		try {
			const selectedTypeOptionData = LinkTypeOptionsData.find(
				(el) => el.type === selectedShortLink?.type
			);

			if (selectedShortLink && selectedTypeOptionData) {
				setNewShortLinkTypeOptionDataAtom((_) => ({
					...selectedTypeOptionData,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [selectedShortLink]);

	const ShortLinkPlaceholder = () => {
		if (newShortLinkTypeOptionDataAtom) {
			switch (newShortLinkTypeOptionDataAtom?.type) {
				case messengerPlatformsBlockEnum.link:
					return 'https://yourlink.com';
				case messengerPlatformsBlockEnum.call:
					return 'Phone number (eg +33 6 XX XX XX XX)';

				case messengerPlatformsBlockEnum.whatsapp:
					return 'Phone number (eg +33 6 XX XX XX XX)';

				case messengerPlatformsBlockEnum.sms:
					return 'Phone number (eg +33 6 XX XX XX XX)';

				case messengerPlatformsBlockEnum.email:
					return 'johndoe@gmail.com';

				case messengerPlatformsBlockEnum.messenger:
					return 'Messenger link (https://m/me/zaions.com)';

				case messengerPlatformsBlockEnum.telegram:
					return 'Telegram username (eg: @myId)';

				case messengerPlatformsBlockEnum.skype:
					return 'Skype username';

				case messengerPlatformsBlockEnum.wechat:
					return 'WeChat ID';

				case messengerPlatformsBlockEnum.line:
					return 'Line ID';

				case messengerPlatformsBlockEnum.viber:
					return 'Viber ID';
				default:
					return ZaionsBusinessDetails.WebsiteUrl;
			}
		}
	};

	const linkInputChangeHandler = (
		event: IonInputCustomEvent<InputChangeEventDetail>
	) => {
		try {
			handleChange(event);

			if (isURL(event.target.value as string)) {
				const { __queryStringData } = parseZQueryString(
					zAddUrlProtocol(String(event.target.value))
				);

				// utmCampaign
				if (__queryStringData['utm_campaign']) {
					setFieldValue(
						'UTMTags.utmCampaign',
						__queryStringData['utm_campaign'],
						false
					);
				} else {
					setFieldValue('UTMTags.utmCampaign', '', false);
				}

				// utmMedium
				if (__queryStringData['utm_medium']) {
					setFieldValue(
						'UTMTags.utmMedium',
						__queryStringData['utm_medium'],
						false
					);
				} else {
					setFieldValue('UTMTags.utmMedium', '', false);
				}

				// utmSource
				if (__queryStringData['utm_source']) {
					setFieldValue(
						'UTMTags.utmSource',
						__queryStringData['utm_source'],
						false
					);
				} else {
					setFieldValue('UTMTags.utmSource', '', false);
				}

				// utmTerm
				if (__queryStringData['utm_term']) {
					setFieldValue(
						'UTMTags.utmTerm',
						__queryStringData['utm_term'],
						false
					);
				} else {
					setFieldValue('UTMTags.utmTerm', '', false);
				}

				// utmContent
				if (__queryStringData['utm_content']) {
					setFieldValue(
						'UTMTags.utmContent',
						__queryStringData['utm_content'],
						false
					);
				} else {
					setFieldValue('UTMTags.utmContent', '', false);
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<>
			{!isSelectedShortLinkFetching && (
				<ZIonGrid
					className={classNames({
						'mt-2': true,
						'mx-3': isLgScale,
						'ms-2 mr-3': !isLgScale,
					})}
				>
					<ZIonRow className='px-4 py-4 rounded zaions__bg_white ion-align-items-center'>
						<ZIonCol
							className={classNames({
								'flex pt-2 ion-align-items-start': true,
								'flex-col': !isMdScale,
							})}
						>
							{/* Options Dropdown (messengerPlatformsBlockEnum)  */}
							{newShortLinkTypeOptionDataAtom && (
								<ZIonButton
									fill={isMdScale ? 'default' : 'outline'}
									className={classNames({
										'flex normal-case ion-no-margin ion-align-items-center ion-justify-content-center':
											true,
										'mb-4': !isMdScale,
										'w-full': !isSmScale,
									})}
									testingselector={
										CONSTANTS.testingSelectors.shortLink.formPage
											.ShortUrlOptionFields.typeBtn
									}
									onClick={(event: unknown) => {
										presentShortLinkOptionsPopover({
											_event: event as Event,
											_cssClass: 'short_link_options_popover_size',
											_dismissOnSelect: false,
										});
									}}
									height='39px'
								>
									{newShortLinkTypeOptionDataAtom.icon.iconName && (
										<ZIonIcon
											icon={newShortLinkTypeOptionDataAtom.icon.iconName}
											size={isMdScale ? 'large' : 'default'}
											color='primary'
										/>
									)}
									<ZIonText
										className={classNames({
											'pt-[3px] ms-2 ion-padding-end': true,
											'text-lg': isMdScale,
											'text-md': !isMdScale,
										})}
										color='dark'
									>
										<h6 className='font-bold ion-no-margin d-inline'>
											{newShortLinkTypeOptionDataAtom.text}
										</h6>
									</ZIonText>
								</ZIonButton>
							)}
							{!newShortLinkTypeOptionDataAtom && (
								<>Invalid Option Type Selected.</>
							)}

							{/* Link Input */}
							{(newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.link ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.messenger) && (
								<>
									{/* Input of every links */}
									<ZIonInput
										label='URL'
										labelPlacement='stacked'
										name='target.url'
										minHeight='40px'
										type='url'
										onIonChange={linkInputChangeHandler}
										value={values?.target?.url}
										placeholder={ShortLinkPlaceholder()}
										errorText={
											touched?.target?.url ? errors?.target?.url : undefined
										}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.linkInput
										}
										onIonBlur={(e) => {
											handleBlur(e);
											const inputUrl = values?.target?.url;
											const formattedUrl = zAddUrlProtocol(inputUrl || '');
											setFieldValue('target.url', formattedUrl);
										}}
										className={classNames({
											'w-full ion-margin-end ': true,
											'ion-touched': touched?.target?.url,
											'ion-invalid':
												touched?.target?.url && errors?.target?.url,
											'ion-valid': touched?.target?.url && !errors?.target?.url,
										})}
									/>
								</>
							)}

							{/* Phone Number Input */}
							{(newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.whatsapp ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.sms ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.call) && (
								<>
									{/* <ZIonSelect
										name='countryCode'
										// value={values.countryCode}
										// onIonChange={handleCountryCodeChange}
										className='w-1/5 me-2'
										minHeight='40px'
										value='92'
										fill='outline'
										interface='popover'
									>
										{/* {countryCodes.map((country) => (
											<IonSelectOption key={country.code} value={country.code}>
												{country.name} ({country.code})
											</IonSelectOption>
										))} * /}
										<ZIonSelectOption value='92'>
											+92 (pakistan)
										</ZIonSelectOption>
									</ZIonSelect> */}
									<ZCPhoneNumberInput
										placeholder={ShortLinkPlaceholder()}
										value={String(values?.target?.phoneNumber)}
										touched={touched?.target?.phoneNumber}
										className={classNames({
											'w-full ': true,
										})}
										errorText={
											touched?.target?.phoneNumber
												? errors?.target?.phoneNumber
												: undefined
										}
										onChange={(_value) => {
											setFieldValue('target.phoneNumber', _value, true);
										}}
										onBlur={() => {
											setFieldTouched('target.phoneNumber', true, true);
										}}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.numberInput
										}
									/>
									{/* Input of every Phone Number */}
									{/* <ZIonInput
										label='Phone number'
										labelPlacement='stacked'
										name='target.phoneNumber'
										type='text'
										minHeight='40px'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.phoneNumber}
										placeholder={ShortLinkPlaceholder()}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.numberInput
										}
										errorText={
											touched?.target?.phoneNumber
												? errors?.target?.phoneNumber
												: undefined
										}
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.phoneNumber,
											'ion-invalid':
												touched?.target?.phoneNumber &&
												errors?.target?.phoneNumber,
											'ion-valid':
												touched?.target?.phoneNumber &&
												!errors?.target?.phoneNumber,
										})}
									/> */}
								</>
							)}

							{/* Username Input */}
							{(newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.telegram ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.skype) && (
								<>
									{/* Input of every Username */}
									<ZIonInput
										label='Username'
										labelPlacement='stacked'
										name='target.username'
										type='text'
										minHeight='40px'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.username}
										placeholder={ShortLinkPlaceholder()}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.usernameInput
										}
										errorText={
											touched?.target?.username
												? errors?.target?.username
												: undefined
										}
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.username,
											'ion-invalid':
												touched?.target?.username && errors?.target?.username,
											'ion-valid':
												touched?.target?.username && !errors?.target?.username,
										})}
									/>
								</>
							)}

							{/* Account Id Input */}
							{(newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.wechat ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.viber ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.line) && (
								<>
									{/* Input of every Account Id */}
									<ZIonInput
										label='Account Id'
										labelPlacement='stacked'
										name='target.accountId'
										type='text'
										minHeight='40px'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.accountId}
										placeholder={ShortLinkPlaceholder()}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.accountIdInput
										}
										errorText={
											touched?.target?.accountId
												? errors?.target?.accountId
												: undefined
										}
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.accountId,
											'ion-invalid':
												touched?.target?.accountId && errors?.target?.accountId,
											'ion-valid':
												touched?.target?.accountId &&
												!errors?.target?.accountId,
										})}
									/>
								</>
							)}

							{/* Email Input */}
							{newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.email && (
								<>
									{/* Input of every email */}
									<ZIonInput
										label='Email'
										labelPlacement='stacked'
										name='target.email'
										type='email'
										minHeight='40px'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.email}
										placeholder={ShortLinkPlaceholder()}
										errorText={
											touched?.target?.email ? errors?.target?.email : undefined
										}
										testingselector={
											CONSTANTS.testingSelectors.shortLink.formPage
												.ShortUrlOptionFields.emailInput
										}
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.email,
											'ion-invalid':
												touched?.target?.email && errors?.target?.email,
											'ion-valid':
												touched?.target?.email && !errors?.target?.email,
										})}
									/>
								</>
							)}

							<ZIonButton
								height='39px'
								fill={isMdScale ? 'clear' : 'solid'}
								testingselector={
									CONSTANTS.testingSelectors.shortLink.formPage
										.ShortUrlOptionFields.refreshThePreviewBtn
								}
								className={classNames({
									'ion-no-margin normal-case': true,
									'mt-3': !isMdScale,
									'w-full': !isSmScale,
								})}
							>
								{!isMdScale && <ZIonText>Refresh the preview</ZIonText>}
								<ZIonIcon
									icon={refreshCircleOutline}
									size='large'
									color={isMdScale ? 'primary' : 'light'}
								/>
							</ZIonButton>
						</ZIonCol>

						{/*  */}
						<ZIonCol size='12' className=''>
							{/* Subject Input */}
							{newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.email && (
								<ZIonInput
									label='Subject*'
									labelPlacement='stacked'
									placeholder='Something short...'
									minHeight='40px'
									name='target.subject'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values?.target?.subject}
									errorText={
										touched?.target?.subject
											? errors?.target?.subject
											: undefined
									}
									testingselector={
										CONSTANTS.testingSelectors.shortLink.formPage
											.ShortUrlOptionFields.subjectInput
									}
									className={classNames({
										'w-full mt-4': true,
										'ion-touched': touched?.target?.subject,
										'ion-invalid':
											touched?.target?.subject && errors?.target?.subject,
										'ion-valid':
											touched?.target?.subject && !errors?.target?.subject,
									})}
								/>
							)}

							{/* Message Textarea */}
							{(newShortLinkTypeOptionDataAtom?.type ===
								messengerPlatformsBlockEnum.email ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.sms ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.viber ||
								newShortLinkTypeOptionDataAtom?.type ===
									messengerPlatformsBlockEnum.whatsapp) && (
								<ZIonTextareaShort
									rows={4}
									name='target.message'
									placeholder='Message*'
									fill='outline'
									onIonChange={handleChange}
									value={values?.target?.message}
									testingselector={
										CONSTANTS.testingSelectors.shortLink.formPage
											.ShortUrlOptionFields.messageTextarea
									}
									errorText={
										touched?.target?.message
											? errors?.target?.message
											: undefined
									}
									className={classNames({
										'w-full ion-margin-end mt-4': true,
										'ion-touched': touched?.target?.message,
										'ion-invalid':
											touched?.target?.message && errors?.target?.message,
										'ion-valid':
											touched?.target?.message && !errors?.target?.message,
									})}
								/>
							)}
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			)}

			{isSelectedShortLinkFetching && <ZaionsShortUrlOptionFieldsSkeleton />}
		</>
	);
};

const ZaionsShortUrlOptionFieldsSkeleton = () => {
	const { isMdScale, isSmScale } = useZMediaQueryScale();
	return (
		<ZIonGrid className='mx-3 mt-2'>
			<ZIonRow className='px-4 py-4 rounded zaions__bg_white ion-align-items-center'>
				<ZIonCol
					className={classNames({
						'flex pt-2 ion-align-items-start': true,
						'flex-col': !isMdScale,
					})}
				>
					<ZIonButton
						fill='default'
						className={classNames({
							'flex normal-case ion-no-margin ion-align-items-center ion-justify-content-center':
								true,
							'mb-4': !isMdScale,
							'w-full': !isSmScale,
						})}
						height='39px'
					>
						<ZIonSkeletonText
							animated={true}
							width='30px'
							height='20px'
						></ZIonSkeletonText>

						{/*  */}
						<ZIonText className='pt-[3px] ms-2 text-lg ion-padding-end'>
							<ZIonSkeletonText
								animated={true}
								width='60px'
								height='20px'
							></ZIonSkeletonText>
						</ZIonText>
					</ZIonButton>

					{/* Link Input */}
					{/* <ZIonInput
						label='URL'
						labelPlacement='stacked'
						type='url'
						className='w-full ion-margin-end'
						minHeight='40px'
					></ZIonInput> */}
					<ZIonSkeletonText
						animated={true}
						width='100%'
						height='40px'
					></ZIonSkeletonText>

					<ZIonButton
						fill='clear'
						className={classNames({
							'ion-no-margin normal-case': true,
							'mt-3': !isMdScale,
							'w-full': !isSmScale,
						})}
						height='39px'
					>
						{!isMdScale && (
							<ZIonText className='me-2'>
								<ZIonSkeletonText
									animated={true}
									width='80px'
									height='17px'
								></ZIonSkeletonText>
							</ZIonText>
						)}
						<ZIonSkeletonText
							animated={true}
							width={isMdScale ? '25px' : !isMdScale ? '17px' : '25px'}
							height={isMdScale ? '25px' : !isMdScale ? '17px' : '25px'}
						></ZIonSkeletonText>
					</ZIonButton>
				</ZIonCol>

				{/*  */}
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZaionsShortUrlOptionFields;
