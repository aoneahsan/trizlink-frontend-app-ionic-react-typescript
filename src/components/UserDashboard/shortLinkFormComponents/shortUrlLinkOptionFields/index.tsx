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
	ZIonItem,
	ZIonNote,
	ZIonRow,
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
import ShortUrlLinkOptions from '@/components/UserDashboard/ShortUrlLinkOption';

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

	const [newShortLinkTypeOptionDataAtom, setNewShortLinkTypeOptionDataAtom] =
		useRecoilState(NewShortLinkSelectTypeOption);

	// getting link-in-bio and workspace ids from url with the help of useParams.
	const { editLinkId, workspaceId } = useParams<{
		editLinkId: string;
		workspaceId: string;
	}>();


	const { presentZIonPopover: presentShortLinkOptionsPopover } = useZIonPopover(
		ZShortLinkOptionsPopover,
		{
			setFieldValue,
		}
	); // popover hook to show ZShortLinkOptionsPopover


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
		<ZIonGrid className='mx-3 my-3'>
			<ZIonRow
				className={`zaions__bg_white py-4 px-4 rounded ion-align-items-center`}
			>
				<ZIonCol className='flex pb-4 ion-align-items-center'>
					{/* Options Dropdown (messengerPlatformsBlockEnum)  */}
					{/* <ShortUrlLinkOptions /> */}
					{newShortLinkTypeOptionDataAtom && (
						<ZIonButton
							fill='default'
							className='text-transform-initial ion-no-margin flex ion-align-items-center ion-justify-content-center'
							style={{
								minHeight: '53px',
							}}
							onClick={(event: unknown) => {
								presentShortLinkOptionsPopover({
									_event: event as Event,
									_cssClass: 'short_link_options_popover_size',
									_dismissOnSelect: false,
								});
							}}
						>
							{newShortLinkTypeOptionDataAtom.icon.iconName && (
								<ZIonIcon
									icon={newShortLinkTypeOptionDataAtom.icon.iconName}
									size='large'
									color='primary'
								/>
							)}
							<ZIonText
								className='ion-margin-start ion-margin-end ion-padding-end'
								color={'dark'}
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
							<ZIonInputField
								inputFieldProps={{
									label: 'URL',
									labelPlacement: 'floating',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values?.target?.url,
									name: 'target.url',
									errorText: errors?.target?.url,
									type: 'url',
									className: `${classNames({
										'zaions__w90 ion-margin-end mx-auto': true,
										'ion-touched': touched?.target?.url,
										'ion-invalid': touched?.target?.url && errors?.target?.url,
										'ion-valid': touched?.target?.url && !!errors?.target?.url,
									})}`,
									placeholder: ShortLinkPlaceholder(),
								}}
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
							<ZIonInputField
								inputFieldProps={{
									label: 'Phone number',
									labelPlacement: 'floating',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values?.target?.phoneNumber,
									name: 'target.phoneNumber',
									errorText: errors?.target?.phoneNumber,
									type: 'text',
									className: `${classNames({
										'zaions__w90 ion-margin-end mx-auto': true,
										'ion-touched': touched?.target?.phoneNumber,
										'ion-invalid':
											touched?.target?.phoneNumber &&
											errors?.target?.phoneNumber,
										'ion-valid':
											touched?.target?.phoneNumber &&
											!errors?.target?.phoneNumber,
									})}`,
									placeholder: ShortLinkPlaceholder(),
								}}
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
							<ZIonInputField
								inputFieldProps={{
									label: 'Username',
									labelPlacement: 'floating',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values?.target?.username,
									name: 'target.username',
									errorText: errors?.target?.username,
									type: 'text',
									className: `${classNames({
										'zaions__w90 ion-margin-end mx-auto': true,
										'ion-touched': touched?.target?.username,
										'ion-invalid':
											touched?.target?.username && errors?.target?.username,
										'ion-valid':
											touched?.target?.username && !errors?.target?.username,
									})}`,
									placeholder: ShortLinkPlaceholder(),
								}}
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
							<ZIonInputField
								inputFieldProps={{
									label: 'Account Id',
									labelPlacement: 'floating',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values?.target?.accountId,
									name: 'target.accountId',
									errorText: errors?.target?.accountId,
									type: 'text',
									className: `${classNames({
										'zaions__w90 ion-margin-end mx-auto': true,
										'ion-touched': touched?.target?.accountId,
										'ion-invalid':
											touched?.target?.accountId && errors?.target?.accountId,
										'ion-valid':
											touched?.target?.accountId && !errors?.target?.accountId,
									})}`,
									placeholder: ShortLinkPlaceholder(),
								}}
							/>
						</>
					)}

					{/* Email Input */}
					{newShortLinkTypeOptionDataAtom?.type ===
						messengerPlatformsBlockEnum.email && (
						<>
							{/* Input of every email */}
							<ZIonInputField
								inputFieldProps={{
									label: 'Email',
									labelPlacement: 'floating',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values?.target?.email,
									name: 'target.email',
									errorText: errors?.target?.email,
									type: 'email',
									className: `${classNames({
										'zaions__w90 ion-margin-end mx-auto': true,
										'ion-touched': touched?.target?.email,
										'ion-invalid':
											touched?.target?.email && errors?.target?.email,
										'ion-valid':
											touched?.target?.email && !errors?.target?.email,
									})}`,
									placeholder: ShortLinkPlaceholder(),
								}}
							/>
						</>
					)}

					<ZIonButton fill='clear'>
						<ZIonIcon
							icon={refreshCircleOutline}
							size={'large'}
							color='primary'
						></ZIonIcon>
					</ZIonButton>
				</ZIonCol>
				{/*  */}
				<ZIonCol size='12' className=''>
					{/* Subject Input */}
					{newShortLinkTypeOptionDataAtom?.type ===
						messengerPlatformsBlockEnum.email && (
						<ZIonInputField
							inputFieldProps={{
								label: 'Subject*',
								labelPlacement: 'floating',
								onIonChange: handleChange,
								onIonBlur: handleBlur,
								value: values?.target?.subject,
								name: 'target.subject',
								errorText: errors?.target?.subject,
								className: `${classNames({
									zaions__w95: true,
									'ion-touched': touched?.target?.subject,
									'ion-invalid':
										touched?.target?.subject && errors?.target?.subject,
									'ion-valid':
										touched?.target?.subject && !!errors?.target?.subject,
								})}`,
								placeholder: ShortLinkPlaceholder(),
							}}
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
							rows={3}
							name='target.message'
							placeholder='Message*'
							onIonChange={handleChange}
							value={values?.target?.message}
							fill='outline'
							errorText={errors?.target?.message}
							className={classNames({
								'zaions__w95 ion-margin-end mt-4 border': true,
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
	);
};

export default ZaionsShortUrlOptionFields;
