// Core Imports
import React from 'react';

// Packages Import
import { Form, Formik } from 'formik';
import { toggleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonHeader,
	ZIonNote,
	ZIonContent,
	ZIonIcon,
	ZIonFooter,
	ZIonSelectOption,
} from '@/components/ZIonComponents';

// Global Constants
import {
	convertToTitleCase,
	validateFields,
	validatePixelAccountID,
	zStringify,
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { PixelAccountPlatformOptionsRState } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

// Types
import {
	PixelAccountType,
	PixelPlatformsEnum,
} from '@/types/AdminPanel/linksType';
import { FormMode } from '@/types/AdminPanel/index.type';
import { PixelAccountFormState } from '@/ZaionsStore/FormStates/pixelAccountFormState.recoil';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonSelect from '@/components/ZIonComponents/ZIonSelect';
import { showSuccessNotification } from '@/utils/notification';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

// Pixel Id Placeholder check
const PIXEL_ID_PLACEHOLDER = (curSelectedPlatformType?: PixelPlatformsEnum) => {
	switch (curSelectedPlatformType) {
		case PixelPlatformsEnum.facebook:
			return '1234567891234567';
		case PixelPlatformsEnum.twitter:
			return 'zaionsOfficial';
		case PixelPlatformsEnum.google_analytics:
		case PixelPlatformsEnum.google_analytics_4:
			return 'UA-000000-0';
		case PixelPlatformsEnum.google_ads:
			return '123456789';
		case PixelPlatformsEnum.google_tag_manager:
			return 'GMT-0000AAA';
		case PixelPlatformsEnum.quora:
			return 'd42ba18b3f684e8fb5d68cf9c628b6d';
		case PixelPlatformsEnum.snapchat:
			return '7c47481d-fde8-4263-89b3-4a63367e';
		case PixelPlatformsEnum.pinterest:
			return '1234567891234';
		case PixelPlatformsEnum.bing:
		case PixelPlatformsEnum.linkedin:
			return '1234567';
		case PixelPlatformsEnum.adroll:
			return 'YourAdvertiserID|YourPixelID';
		case PixelPlatformsEnum.nexus:
			return '';
		case PixelPlatformsEnum.tiktok:
			return 'ABCDEFGHIGKLMNOPQRST';
		case PixelPlatformsEnum.vk:
			return 'VK-ABCD-000000-ABCD';
		default:
			return '1234567891234567';
	}
};
const ZaionsAddPixelAccount: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const platformData = useRecoilValue(PixelAccountPlatformOptionsRState);
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);
	const [pixelAccountFormState, setPixelAccountFormState] = useRecoilState(
		PixelAccountFormState
	);

	const { mutate: createPixelAccount } = useZRQCreateRequest({
		_url: API_URL_ENUM.userPixelAccounts_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
		],
	});
	const { mutate: updatePixelAccount } = useZRQUpdateRequest({
		_url: API_URL_ENUM.userPixelAccounts_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN,
		],
	});

	/**
	 * Handle Form Submission Function
	 * add a new pixel function
	 *  */
	const handleFormSubmit = (value: string, resetForm: resetFormType) => {
		try {
			// if in from add mode then add a new pixel account
			if (pixelAccountFormState.formMode === FormMode.ADD) {
				createPixelAccount(value);
				showSuccessNotification(
					MESSAGES.GENERAL.PIXEL_ACCOUNT
						.NEW_PIXEL_ACCOUNT_CREATED_SUCCEED_MESSAGE
				);
			} // if in from edit mode then edit  pixel account
			else if (pixelAccountFormState.formMode === FormMode.EDIT) {
				pixelAccountFormState.id &&
					updatePixelAccount({
						itemIds: [pixelAccountFormState.id],
						urlDynamicParts: [':pixelId'],
						requestData: value,
					});
				showSuccessNotification(
					MESSAGES.GENERAL.PIXEL_ACCOUNT.PIXEL_ACCOUNT_UPDATED_SUCCEED_MESSAGE
				);
			}
			// Close modal after action.
			dismissZIonModal();

			// Reset to default
			SetDefaultPixelAccountFormState();

			// this will reset form
			if (resetForm) {
				resetForm();
			}
		} catch (error) {
			reportCustomError(error);
		}

		// After Submit loading state end
		// setTimeout(() => {
		// 	void ionLoaderDismiss();
		// }, 3000);
	};

	const SetDefaultPixelAccountFormState = () => {
		// Reset to default
		setPixelAccountFormState((oldVal) => ({
			...oldVal,
			formMode: FormMode.ADD,
			id: '',
			title: '',
			platform: PixelPlatformsEnum.facebook,
			pixelId: '',
		}));
	};
	// JSX Code
	return (
		<Formik
			initialValues={{
				platform: pixelAccountFormState.platform || PixelPlatformsEnum.facebook,
				title: pixelAccountFormState.title || '',
				pixelId: pixelAccountFormState.pixelId || '',
			}}
			enableReinitialize={true}
			validate={(values) => {
				const errors: {
					platform?: string;
					title?: string;
					pixelId?: string;
				} = {};

				validateFields(['platform', 'title', 'pixelId'], values, errors, [
					VALIDATION_RULE.string,
					VALIDATION_RULE.string,
					VALIDATION_RULE.string,
				]);

				if (values.platform && values.pixelId) {
					const errorMessage = validatePixelAccountID(
						values.platform,
						values.pixelId
					);
					if (errorMessage) {
						errors.pixelId = errorMessage;
					}
				}

				return errors;
			}}
			onSubmit={(values: PixelAccountType, { resetForm }) => {
				const stringifyValue = zStringify({
					title: values.title,
					platform: values.platform,
					pixelId: values.pixelId,
				});
				void handleFormSubmit(stringifyValue, resetForm);
			}}
		>
			{({
				errors,
				values,
				handleChange,
				touched,
				submitForm,
				handleSubmit,
				handleBlur,
				isValid,
			}) => (
				<>
					{/**
					 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in      appSetting and hide if it is `false`
					 * default: false
					 *  */}
					{appSettings.appModalsSetting.actions.showActionInModalHeader && (
						<ZIonHeader>
							<ZIonRow className='ion-align-items-center'>
								<ZIonCol>
									<ZIonButton
										onClick={() => {
											// Close the Modal
											dismissZIonModal();
											// Reset to default
											SetDefaultPixelAccountFormState();
										}}
										color='primary'
										className='ion-text-capitalize'
										fill='outline'
									>
										Cancel
									</ZIonButton>
								</ZIonCol>

								<ZIonCol className='ion-text-end'>
									<ZIonButton
										type='submit'
										onClick={() => {
											void submitForm();
										}}
										color={'primary'}
										className='ion-text-capitalize'
										fill='solid'
									>
										{pixelAccountFormState.formMode === FormMode.ADD
											? 'Create'
											: pixelAccountFormState.formMode === FormMode.EDIT
											? 'Update'
											: ''}
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
							{!isValid && (
								<ZIonRow>
									<ZIonCol className='ion-text-center'>
										<ZIonNote color='danger'>
											{MESSAGES.GENERAL.FORM.INVALID}
										</ZIonNote>
									</ZIonCol>
								</ZIonRow>
							)}
						</ZIonHeader>
					)}

					<ZIonContent className='ion-padding'>
						<div className='flex ion-text-center ion-justify-content-center flex-col ion-padding-top ion-margin-top'>
							<ZIonText className='' color={'primary'}>
								<h4 className={`mb-0 bg-primary zaions__modal_icon`}>
									<ZIonIcon
										icon={toggleOutline}
										className='mx-auto'
										color='light'
									/>
								</h4>
							</ZIonText>
							<br />
							<ZIonText color={'dark'}>
								<h6 className='font-bold'>Add a new Pixel ID 🧞</h6>
							</ZIonText>
						</div>
						<Form onSubmit={handleSubmit} className='px-4'>
							{/* Pixel platform select */}
							<div
								className={classNames({
									'mt-4 mb-5 pb-2': true,
									'ion-touched ion-invalid':
										touched.platform && errors.platform,
									'ion-touched ion-valid':
										touched.platform && !!errors.platform,
								})}
							>
								<ZIonSelect
									name='platform'
									label='Select the platform*'
									labelPlacement='stacked'
									selectedText={convertToTitleCase(values.platform)}
									onIonChange={handleChange}
									fill='outline'
								>
									{platformData.map((el) => {
										return (
											<ZIonSelectOption value={el.type} key={el.id}>
												{el.title}
											</ZIonSelectOption>
										);
									})}
								</ZIonSelect>
								<ZIonNote slot='error'>
									{touched.platform && errors.platform}
								</ZIonNote>
							</div>

							{/* Pixel Name Input */}
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'mt-3 mb-5 pb-2': true,
										'ion-touched ion-invalid': touched.title && errors.title,
										'ion-touched ion-valid': touched.title && !errors.title,
									}),
									label: 'Name your pixel*',
									labelPlacement: 'floating',
									name: 'title',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.title,
									errorText: errors.title,
									placeholder: 'Enter Pixel Name',
									type: 'text',
								}}
							/>

							{/* Pixel Id Input */}
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'mt-3': true,
										'ion-touched ion-invalid':
											touched.pixelId && errors.pixelId,
										'ion-touched ion-valid': touched.pixelId && !errors.pixelId,
									}),
									label: 'Pixel ID*',
									labelPlacement: 'floating',
									name: 'pixelId',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.pixelId,
									errorText: errors.pixelId,
									placeholder: 'Enter Pixel Id',
									type: 'text',
								}}
							/>
						</Form>
					</ZIonContent>

					{/**
					 * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in appSetting, and hide if it is `false`
					 * default: true
					 *  */}
					{appSettings.appModalsSetting.actions.showActionInModalFooter && (
						<ZIonFooter>
							<ZIonRow className='mt-2 px-3 ion-justify-content-between'>
								<ZIonCol>
									<ZIonButton
										fill='outline'
										size='default'
										className='ion-text-capitalize'
										onClick={() => {
											// Close the Modal
											dismissZIonModal();
											// Reset to default
											SetDefaultPixelAccountFormState();
										}}
									>
										Close
									</ZIonButton>
								</ZIonCol>

								<ZIonCol className='ion-text-end'>
									<ZIonButton
										fill='solid'
										size='default'
										className='ion-text-capitalize'
										// disabled
										type='submit'
										onClick={() => void submitForm()}
									>
										{pixelAccountFormState.formMode === FormMode.ADD
											? 'Create'
											: pixelAccountFormState.formMode === FormMode.EDIT
											? 'Update'
											: ''}
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
							{!isValid && (
								<ZIonRow>
									<ZIonCol className='ion-text-center'>
										<ZIonNote color='danger'>
											{MESSAGES.GENERAL.FORM.INVALID}
										</ZIonNote>
									</ZIonCol>
								</ZIonRow>
							)}
						</ZIonFooter>
					)}
				</>
			)}
		</Formik>
	);
};

export default ZaionsAddPixelAccount;
