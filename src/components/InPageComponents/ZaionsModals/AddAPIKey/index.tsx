// Core Imports
import React from 'react';
// Packages Import
import { Form, Formik } from 'formik';
import { documentTextOutline, toggleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonRouterLink,
	ZIonHeader,
	ZIonNote,
	ZIonContent,
	ZIonIcon,
	ZIonFooter,
} from '@/components/ZIonComponents';

// Global Constants
import { getRandomKey } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { APIKeyFormState } from '@/ZaionsStore/FormStates/apiKeyState.recoil';
import { APIKeyState } from '@/ZaionsStore/UserDashboard/APIKey';

// Types
import { FormMode } from '@/types/AdminPanel/index.type';
import { resetFormType } from '@/types/ZaionsFormik.type';
import { useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const ZaionsAddAPIKeyModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

	const [apiKeyData, setApiKeyData] = useRecoilState(APIKeyState);
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);
	const [apiKeyFormState, setAPIKeyFormState] = useRecoilState(APIKeyFormState);

	/**
	 * Handle Form Submission Function
	 * add a Api Key function
	 *  */
	const handleFormSubmit = async (
		values: { name: string },
		resetForm?: resetFormType
	) => {
		// On Submit loading state start
		await presentZIonLoader(
			apiKeyFormState.formMode === FormMode.ADD
				? 'Adding Api Key...'
				: apiKeyFormState.formMode === FormMode.EDIT
				? 'Updating Api Key...'
				: ''
		);
		try {
			// ADD API Request to add this api key to user account in DB.

			if (apiKeyFormState.formMode === FormMode.ADD) {
				setApiKeyData((old) => [
					...old,
					{
						id: getRandomKey(),
						name: values.name,
					},
				]);
			} else if (apiKeyFormState.formMode === FormMode.EDIT) {
				const updatedEmbedWidgetData = apiKeyData.map((el) => {
					if (el.id === apiKeyFormState.id) {
						return {
							id: apiKeyFormState.id,
							name: values.name,
						};
					} else {
						return el;
					}
				});
				setApiKeyData(updatedEmbedWidgetData);
			}

			// Close modal after action.
			dismissZIonModal();

			// Reset to default
			SetDefaultAPIKeyState();

			// this will reset form
			if (resetForm) {
				resetForm();
			}
		} catch (error) {
			console.error(error);
		}

		// After Submit loading state end

		await dismissZIonLoader();
	};

	const SetDefaultAPIKeyState = () => {
		// Reset to default
		setAPIKeyFormState((oldVal) => ({
			...oldVal,
			formMode: FormMode.ADD,
			id: '',
			name: '',
			createAt: '',
			updateAt: '',
		}));
	};
	// JSX Code
	return (
		<Formik
			initialValues={{
				name: apiKeyFormState.name || 'API Key',
			}}
			enableReinitialize={true}
			validate={(values) => {
				const errors: {
					name?: string;
				} = {};

				if (!values.name.trim()) {
					errors.name = MESSAGES.GENERAL.FORM.API_KEY_REQUIRED;
				}

				return errors;
			}}
			onSubmit={(values, { resetForm }) => {
				void handleFormSubmit(values, resetForm);
			}}
		>
			{({
				submitForm,
				handleChange,
				errors,
				isValid,
				isSubmitting,
				handleBlur,
				values,
				touched,
			}) => {
				return (
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
												SetDefaultAPIKeyState();
											}}
											color='primary'
											className='ion-text-capitalize'
											fill='outline'
										>
											Close
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
											{apiKeyFormState.formMode === FormMode.ADD
												? 'Create'
												: apiKeyFormState.formMode === FormMode.EDIT
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
								{/* </IonToolbar> */}
							</ZIonHeader>
						)}

						<ZIonContent className='ion-padding'>
							<div className='flex ion-text-center ion-justify-content-center flex-col ion-padding-top ion-margin-top'>
								<ZIonText className='' color={'primary'}>
									<h1
										className={`mb-0 ion-padding-top bg-primary zaions__modal_icon`}
									>
										<ZIonIcon
											icon={toggleOutline}
											className='mx-auto'
											color='light'
										></ZIonIcon>
									</h1>
								</ZIonText>
								<br />
								<ZIonText color={'dark'}>
									<h6 className='fw-blod'>
										{apiKeyFormState.formMode === FormMode.ADD
											? 'Create a new API Key'
											: apiKeyFormState.formMode === FormMode.EDIT
											? 'Update API Key'
											: ''}
										<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
											(help)
										</ZIonRouterLink>{' '}
										📁
									</h6>
								</ZIonText>
							</div>
							<Form className='px-2'>
								<ZIonInputField
									inputFieldProps={{
										className: classNames({
											'mt-4': true,
											'ion-touched ion-invalid': touched.name && errors.name,
											'ion-touched ion-valid': touched.name && !errors.name,
										}),
										label: 'API name*',
										type: 'text',
										labelPlacement: 'floating',
										name: 'name',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.name,
										errorText: errors.name,
										color: 'dark',
									}}
								/>
							</Form>
						</ZIonContent>

						{/**
						 * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
						 * default: true
						 *  */}
						{appSettings.appModalsSetting.actions.showActionInModalFooter && (
							<ZIonFooter>
								<ZIonRow className=' mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
									<ZIonCol>
										<ZIonButton
											fill='outline'
											size='default'
											className='ion-text-capitalize'
											onClick={() => {
												// Close The Modal
												dismissZIonModal();
												SetDefaultAPIKeyState();
											}}
										>
											Close
										</ZIonButton>
									</ZIonCol>

									<ZIonCol className='ion-text-end'>
										<ZIonButton
											id='submit-button-info'
											fill='solid'
											size='default'
											className='ion-text-capitalize'
											type='submit'
											disabled={isSubmitting || !isValid}
											onClick={() => void submitForm()}
										>
											{apiKeyFormState.formMode === FormMode.ADD
												? 'Create'
												: apiKeyFormState.formMode === FormMode.EDIT
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
				);
			}}
		</Formik>
	);
};

export default ZaionsAddAPIKeyModal;
