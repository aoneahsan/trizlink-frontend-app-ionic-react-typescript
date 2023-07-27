/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonNote,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import { useFormikContext } from 'formik';
import { refreshCircleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ShortLinkType,
	ShortUrlLinkOptionType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	NewShortLinkFormState,
	NewShortLinkSelectTypeOption,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import CONSTANTS, { ZaionsBusinessDetails } from '@/utils/constants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import ZShortLinkOptionsPopover from '@/components/InPageComponents/ZaionsPopovers/ShortLinkOptionsPopover';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { useParams } from 'react-router';
import { reportCustomError } from '@/utils/customErrorType';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

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
										'flex text-transform-initial ion-no-margin ion-align-items-center ion-justify-content-center':
											true,
										'mb-4': !isMdScale,
										'w-full': !isSmScale,
									})}
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
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.url}
										name='target.url'
										errorText={errors?.target?.url}
										type='url'
										className={classNames({
											'w-full ion-margin-end ': true,
											'ion-touched': touched?.target?.url,
											'ion-invalid':
												touched?.target?.url && errors?.target?.url,
											'ion-valid':
												touched?.target?.url && !!errors?.target?.url,
										})}
										placeholder={ShortLinkPlaceholder()}
										minHeight='40px'
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
									{/* Input of every Phone Number */}
									<ZIonInput
										label='Phone number'
										labelPlacement='stacked'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.phoneNumber}
										name='target.phoneNumber'
										errorText={errors?.target?.phoneNumber}
										type='text'
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
										minHeight='40px'
										placeholder={ShortLinkPlaceholder()}
									/>
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
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.username}
										name='target.username'
										errorText={errors?.target?.username}
										type='text'
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.username,
											'ion-invalid':
												touched?.target?.username && errors?.target?.username,
											'ion-valid':
												touched?.target?.username && !errors?.target?.username,
										})}
										placeholder={ShortLinkPlaceholder()}
										minHeight='40px'
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
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.accountId}
										name='target.accountId'
										errorText={errors?.target?.accountId}
										type='text'
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.accountId,
											'ion-invalid':
												touched?.target?.accountId && errors?.target?.accountId,
											'ion-valid':
												touched?.target?.accountId &&
												!errors?.target?.accountId,
										})}
										placeholder={ShortLinkPlaceholder()}
										minHeight='40px'
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
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values?.target?.email}
										name='target.email'
										errorText={errors?.target?.email}
										type='email'
										className={classNames({
											'w-full ion-margin-end': true,
											'ion-touched': touched?.target?.email,
											'ion-invalid':
												touched?.target?.email && errors?.target?.email,
											'ion-valid':
												touched?.target?.email && !errors?.target?.email,
										})}
										placeholder={ShortLinkPlaceholder()}
										minHeight='40px'
									/>
								</>
							)}

							<ZIonButton
								fill={isMdScale ? 'clear' : 'solid'}
								className={classNames({
									'ion-no-margin normal-case': true,
									'mt-3': !isMdScale,
									'w-full': !isSmScale,
								})}
								height='39px'
							>
								{!isMdScale && <ZIonText>Refresh the preview</ZIonText>}
								<ZIonIcon
									icon={refreshCircleOutline}
									size='large'
									color={isMdScale ? 'primary' : 'light'}
								></ZIonIcon>
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
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values?.target?.subject}
									name='target.subject'
									errorText={errors?.target?.subject}
									className={classNames({
										'w-full mt-4': true,
										'ion-touched': touched?.target?.subject,
										'ion-invalid':
											touched?.target?.subject && errors?.target?.subject,
										'ion-valid':
											touched?.target?.subject && !!errors?.target?.subject,
									})}
									placeholder='Something short...'
									minHeight='40px'
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
								<ZIonTextarea
									rows={4}
									name='target.message'
									placeholder='Message*'
									onIonChange={handleChange}
									value={values?.target?.message}
									fill='outline'
									errorText={errors?.target?.message}
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
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();
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
							'flex text-transform-initial ion-no-margin ion-align-items-center ion-justify-content-center':
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
