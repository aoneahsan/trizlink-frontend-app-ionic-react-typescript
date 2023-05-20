// Core Imports
import React from 'react';
// Packages Import
import { Formik, Form } from 'formik';
import { toggleOutline } from 'ionicons/icons';
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
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { UTMTagsTemplateFormState } from '@/ZaionsStore/FormStates/addUTMTagsFormState.recoil';

// Types
import { FormMode } from '@/types/AdminPanel/index.type';
import { resetFormType } from '@/types/ZaionsFormik.type';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { zStringify } from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import { showSuccessNotification } from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const ZaionsAddUtmTags: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);
	const [ZaionsUTMTagsTemplateFormState, setZaionsUTMTagsTemplateFormState] =
		useRecoilState(UTMTagsTemplateFormState);

	const { mutate: CreateUTMTag } = useZRQCreateRequest({
		_url: API_URL_ENUM.userAccountUtmTags_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
		],
	});
	const { mutate: UpdateUTMTag } = useZRQUpdateRequest({
		_url: API_URL_ENUM.userAccountUtmTags_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN,
		],
	});

	/**
	 * Handle Form Submission Function
	 * add a new UTM Tag function
	 *  */
	const handleFormSubmit = (value: string, resetForm?: resetFormType) => {
		try {
			// ADD API Request to add this UTM Tag to user account in DB.
			if (ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD) {
				CreateUTMTag(value);
				showSuccessNotification(
					MESSAGES.GENERAL.UTM_TAGS_TEMPLATE
						.NEW_UTM_TAGS_TEMPLATE_CREATED_SUCCEED_MESSAGE
				);
			} else if (ZaionsUTMTagsTemplateFormState.formMode === FormMode.EDIT) {
				ZaionsUTMTagsTemplateFormState.id &&
					UpdateUTMTag({
						itemIds: [ZaionsUTMTagsTemplateFormState.id],
						urlDynamicParts: [':utmTagId'],
						requestData: value,
					});
				showSuccessNotification(
					MESSAGES.GENERAL.UTM_TAGS_TEMPLATE
						.UTM_TAGS_TEMPLATE_UPDATED_SUCCEED_MESSAGE
				);
			}

			// Close modal after action.
			dismissZIonModal();

			// Reset to Default
			SetDefaultPixelsAccountFormState();

			// this will reset form
			if (resetForm) {
				resetForm({ values: {} });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const SetDefaultPixelsAccountFormState = () => {
		try {
			// Reset to default
			setZaionsUTMTagsTemplateFormState((oldVal) => ({
				...oldVal,
				id: '',
				templateName: '',
				utmCampaign: '',
				utmMedium: '',
				utmSource: '',
				utmTerm: '',
				utmContent: '',
				formMode: FormMode.ADD,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	// JSX Code
	return (
		<Formik
			initialValues={{
				templateName: ZaionsUTMTagsTemplateFormState.templateName || '',
				utmCampaign: ZaionsUTMTagsTemplateFormState.utmCampaign || '',
				utmMedium: ZaionsUTMTagsTemplateFormState.utmMedium || '',
				utmSource: ZaionsUTMTagsTemplateFormState.utmSource || '',
				utmTerm: ZaionsUTMTagsTemplateFormState.utmTerm || '',
				utmContent: ZaionsUTMTagsTemplateFormState.utmContent || '',
			}}
			enableReinitialize={true}
			validate={(values) => {
				const errors: {
					templateName?: string;
					utmCampaign?: string;
					utmMedium?: string;
				} = {};

				if (!values.templateName) {
					errors.templateName = 'Template name is required.';
				}

				if (!values.utmCampaign) {
					errors.utmCampaign = 'Campaign is required.';
				}

				if (!values.utmMedium) {
					errors.utmMedium = 'Medium is required.';
				}

				return errors;
			}}
			onSubmit={(values, { resetForm }) => {
				const stringifyValue = zStringify({
					templateName: values.templateName,
					utmCampaign: values.utmCampaign,
					utmMedium: values.utmMedium,
					utmSource: values.utmSource,
					utmTerm: values.utmTerm,
					utmContent: values.utmContent,
				});
				void handleFormSubmit(stringifyValue, resetForm);
			}}
		>
			{({
				values,
				errors,
				isValid,
				handleSubmit,
				handleChange,
				handleBlur,
				submitForm,
				touched,
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
											// Close The Modal
											dismissZIonModal();
											// Reset to Default
											SetDefaultPixelsAccountFormState();
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
										{ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD
											? 'Create'
											: ZaionsUTMTagsTemplateFormState.formMode ===
													FormMode.EDIT && 'Update'}
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
									Create UTMs preset{' '}
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										(help)
									</ZIonRouterLink>{' '}
									🎫
								</h6>
							</ZIonText>
						</div>
						<Form onSubmit={handleSubmit} className='px-2'>
							{/* Template Name Input */}
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'ion-touched ion-invalid':
											touched.templateName && errors.templateName,
										'ion-touched ion-valid':
											touched.templateName && !errors.templateName,
									}),
									label: 'Template name*',
									labelPlacement: 'floating',
									name: 'templateName',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.templateName,
									errorText: errors.templateName,
									placeholder: 'Template name',
									type: 'text',
									color: 'dark',
								}}
							/>

							{/* UTM Campaign Input */}
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'mt-4': true,
										'ion-touched ion-invalid':
											touched.utmCampaign && errors.utmCampaign,
										'ion-touched ion-valid':
											touched.utmCampaign && !errors.utmCampaign,
									}),
									label: 'UTM Campaign*',
									labelPlacement: 'floating',
									name: 'utmCampaign',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.utmCampaign,
									errorText: errors.utmCampaign,
									placeholder: 'UTM Campaign',
									type: 'text',
									color: 'dark',
								}}
							/>

							{/* UTM Medium Input */}
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'mt-4': true,
										'ion-touched ion-invalid':
											touched.utmMedium && errors.utmMedium,
										'ion-touched ion-valid':
											touched.utmMedium && !errors.utmMedium,
									}),
									label: 'UTM Medium*',
									labelPlacement: 'floating',
									name: 'utmMedium',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.utmMedium,
									errorText: errors.utmMedium,
									placeholder: 'UTM Medium',
									type: 'text',
									color: 'dark',
								}}
							/>

							{/* UTM Source Input */}
							<ZIonInputField
								inputFieldProps={{
									className: 'mt-4',
									label: 'UTM Source*',
									labelPlacement: 'floating',
									name: 'utmSource',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.utmSource,
									placeholder: 'UTM Source',
									type: 'text',
									color: 'dark',
								}}
							/>

							{/* UTM Term Input */}
							<ZIonInputField
								inputFieldProps={{
									className: 'mt-4',
									label: 'UTM Term*',
									labelPlacement: 'floating',
									name: 'utmTerm',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.utmTerm,
									placeholder: 'UTM Term',
									type: 'text',
									color: 'dark',
								}}
							/>

							{/* UTM Content Input */}
							<ZIonInputField
								inputFieldProps={{
									className: 'mt-4',
									label: 'UTM Content*',
									labelPlacement: 'floating',
									name: 'utmContent',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.utmContent,
									placeholder: 'UTM Content',
									type: 'text',
									color: 'dark',
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
											// Close The Modal
											dismissZIonModal();
											// Reset to Default
											SetDefaultPixelsAccountFormState();
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
										{ZaionsUTMTagsTemplateFormState.formMode === FormMode.ADD
											? 'Create'
											: ZaionsUTMTagsTemplateFormState.formMode ===
													FormMode.EDIT && 'Update'}
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

export default ZaionsAddUtmTags;
