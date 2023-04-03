/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

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
	ZIonTextarea,
} from '@/components/ZIonComponents';
import { useFormikContext } from 'formik';
import { refreshCircleOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

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
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { ZaionsBusinessDetails } from '@/utils/constants';

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
	const newShortLinkFormState = useRecoilValue(NewShortLinkFormState);
	const { values, errors, touched, handleChange, handleBlur } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const ShortLinkPlaceholder = () => {
		switch (newShortLinkFormState.type) {
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
	};

	return (
		<ZIonGrid className='my-3 mx-3'>
			<ZIonRow
				className={`zaions__bg_white py-4 px-4 rounded ion-align-items-center`}
			>
				<ZIonCol className='d-flex ion-align-items-center pb-4'>
					{/* Options Dropdown (messengerPlatformsBlockEnum)  */}
					<ShortUrlLinkOptions />

					{/* Link Input */}
					{(newShortLinkFormState.type === messengerPlatformsBlockEnum.link ||
						newShortLinkFormState.type ===
							messengerPlatformsBlockEnum.messenger) && (
						<>
							{/* Input of every links */}
							<ZIonItem
								className={classNames({
									'zaions__w90 ion-margin-end': true,
									'ion-touched': touched?.target?.url,
									'ion-invalid': touched?.target?.url && errors?.target?.url,
									'ion-valid': touched?.target?.url && !!errors?.target?.url,
								})}
							>
								<ZIonInput
									type='url'
									name='target.url'
									placeholder={ShortLinkPlaceholder()}
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values?.target?.url}
									label=''
								/>
								<ZIonNote slot='error'>{errors?.target?.url}</ZIonNote>
							</ZIonItem>
						</>
					)}

					{/* Phone Number Input */}
					{(newShortLinkFormState.type ===
						messengerPlatformsBlockEnum.whatsapp ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.sms ||
						newShortLinkFormState.type ===
							messengerPlatformsBlockEnum.call) && (
						<>
							{/* Input of every Phone Number */}
							<ZIonItem
								className={classNames({
									'zaions__w90 ion-margin-end': true,
									'ion-touched': touched?.target?.phoneNumber,
									'ion-invalid':
										touched?.target?.phoneNumber && errors?.target?.phoneNumber,
									'ion-valid':
										touched?.target?.phoneNumber &&
										!!errors?.target?.phoneNumber,
								})}
							>
								<ZIonInput
									type='text'
									name='target.phoneNumber'
									placeholder={ShortLinkPlaceholder()}
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values?.target?.phoneNumber}
									label=''
								/>
								<ZIonNote slot='error'>{errors?.target?.phoneNumber}</ZIonNote>
							</ZIonItem>
						</>
					)}

					{/* Username Input */}
					{(newShortLinkFormState.type ===
						messengerPlatformsBlockEnum.telegram ||
						newShortLinkFormState.type ===
							messengerPlatformsBlockEnum.skype) && (
						<>
							{/* Input of every Username */}
							<ZIonItem
								className={classNames({
									'zaions__w90 ion-margin-end': true,
									'ion-touched': touched?.target?.username,
									'ion-invalid':
										touched?.target?.username && errors?.target?.username,
									'ion-valid':
										touched?.target?.username && !!errors?.target?.username,
								})}
							>
								<ZIonInput
									type='text'
									name='target.username'
									placeholder={ShortLinkPlaceholder()}
									onIonChange={(event) => {
										handleChange(event);
									}}
									onIonBlur={handleBlur}
									value={values?.target?.username}
									label=''
								/>
								<ZIonNote slot='error'>{errors?.target?.username}</ZIonNote>
							</ZIonItem>
						</>
					)}

					{/* Account Id Input */}
					{(newShortLinkFormState.type === messengerPlatformsBlockEnum.wechat ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.viber ||
						newShortLinkFormState.type ===
							messengerPlatformsBlockEnum.line) && (
						<>
							{/* Input of every Account Id */}
							<ZIonItem
								className={classNames({
									'zaions__w90 ion-margin-end': true,
									'ion-touched': touched?.target?.accountId,
									'ion-invalid':
										touched?.target?.accountId && errors?.target?.accountId,
									'ion-valid':
										touched?.target?.accountId && !!errors?.target?.accountId,
								})}
							>
								<ZIonInput
									type='text'
									name='target.accountId'
									placeholder={ShortLinkPlaceholder()}
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values?.target?.accountId}
									label=''
								/>
								<ZIonNote slot='error'>{errors?.target?.accountId}</ZIonNote>
							</ZIonItem>
						</>
					)}

					{/* Email Input */}
					{newShortLinkFormState.type === messengerPlatformsBlockEnum.email && (
						<>
							{/* Input of every email */}
							<ZIonItem
								className={classNames({
									'zaions__w90 ion-margin-end': true,
									'ion-touched': touched?.target?.email,
									'ion-invalid':
										touched?.target?.email && errors?.target?.email,
									'ion-valid':
										touched?.target?.email && !!errors?.target?.email,
								})}
							>
								<ZIonInput
									type='email'
									name='target.email'
									placeholder={ShortLinkPlaceholder()}
									onIonChange={(event) => {
										handleChange(event);
									}}
									onIonBlur={handleBlur}
									value={values?.target?.email}
									label=''
								/>
								<ZIonNote slot='error'>{errors?.target?.email}</ZIonNote>
							</ZIonItem>
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
					{newShortLinkFormState.type === messengerPlatformsBlockEnum.email && (
						<ZIonItem
							className={classNames({
								'zaions__w90 ion-margin-end': true,
								'ion-touched': touched?.target?.subject,
								'ion-invalid':
									touched?.target?.subject && errors?.target?.subject,
								'ion-valid':
									touched?.target?.subject && !!errors?.target?.subject,
							})}
						>
							<ZIonInput
								placeholder='Subject*'
								name='target.subject'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values?.target?.subject}
								label=''
							/>
							<ZIonNote slot='error'>{errors?.target?.subject}</ZIonNote>
						</ZIonItem>
					)}

					{/* Message Textarea */}
					{(newShortLinkFormState.type === messengerPlatformsBlockEnum.email ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.sms ||
						newShortLinkFormState.type === messengerPlatformsBlockEnum.viber ||
						newShortLinkFormState.type ===
							messengerPlatformsBlockEnum.whatsapp) && (
						<ZIonItem
							className={classNames({
								'zaions__w90 ion-margin-end': true,
								'ion-touched': touched?.target?.message,
								'ion-invalid':
									touched?.target?.message && errors?.target?.message,
								'ion-valid':
									touched?.target?.message && !!errors?.target?.message,
							})}
						>
							<ZIonTextarea
								rows={3}
								name='target.message'
								placeholder='Message*'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values?.target?.message}
							></ZIonTextarea>
							<ZIonNote slot='error'>{errors?.target?.message}</ZIonNote>
						</ZIonItem>
					)}
				</ZIonCol>{' '}
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZaionsShortUrlOptionFields;
