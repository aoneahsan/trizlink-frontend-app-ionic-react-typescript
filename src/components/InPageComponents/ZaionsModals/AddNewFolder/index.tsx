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
import {
	formatApiRequestErrorForFormikFormField,
	zStringify,
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

// Types
import { folderState, FormMode } from '@/types/AdminPanel/index.type';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import { ZIonButton } from '@/components/ZIonComponents';
import { showSuccessNotification } from '@/utils/notification';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { AxiosError } from 'axios';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const ZaionsAddNewFolder: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	state: folderState;
	workspaceId: string;
}> = ({ dismissZIonModal, state = folderState.shortlink, workspaceId }) => {
	const appSettings = useRecoilValue(ZaionsAppSettingsRState);

	const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

	const { mutateAsync: createNewFolder } = useZRQCreateRequest({
		_url: API_URL_ENUM.folders_create_list,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
			workspaceId,
			state,
		],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	const { mutateAsync: updateFolder } = useZRQUpdateRequest({
		_url: API_URL_ENUM.folders_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
			workspaceId,
			state,
		],
	});

	/**
	 * Handle Form Submission Function
	 * add a new folder function
	 *  */
	const handleFormSubmit = async (
		value: string,
		resetForm: resetFormType,
		setErrors: FormikSetErrorsType
	) => {
		try {
			// ADD API Request to add this new Folder to user account in DB.
			if (folderFormState.formMode === FormMode.ADD) {
				await createNewFolder(value);

				showSuccessNotification(
					MESSAGES.GENERAL.FOLDER.NEW_FOLDER_CREATED_SUCCEED_MESSAGE
				);
			} else if (folderFormState.formMode === FormMode.EDIT) {
				if (folderFormState.id) {
					await updateFolder({
						itemIds: [workspaceId, folderFormState.id],
						urlDynamicParts: [
							CONSTANTS.RouteParams.workspace.workspaceId,
							':folderId',
						],
						requestData: value,
					});

					showSuccessNotification(
						MESSAGES.GENERAL.FOLDER.FOLDER_UPDATED_SUCCEED_MESSAGE
					);
				} else {
					throw new ZCustomError({ message: 'Not a valid folder id!' });
				}
			}

			// Close modal after action.
			dismissZIonModal();

			// Reset to default
			SetDefaultFolderState();

			// this will reset form
			if (resetForm) {
				resetForm();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				// await presentZIonErrorAlert();
				// Setting errors on form fields
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['emailAddress', 'password'],
					['email', 'password'],
					__apiErrors
				);
				setErrors(__errors);
			} else if (error instanceof ZCustomError || error instanceof Error) {
				// if we need to do some other type of logic reporting (like report this error to API or error blogging to like sentry or datadog etc then we can do that here, otherwise if we just want to show the message of error to user in alert then we can do that in one else case no need for this check, but here we can set the title of alert to)
				reportCustomError(error);
			}
		}
	};

	const SetDefaultFolderState = () => {
		// Reset to default
		setFolderFormState((oldVal) => ({
			...oldVal,
			formMode: FormMode.ADD,
			id: '',
			name: '',
		}));
	};
	// JSX Code
	return (
		<Formik
			initialValues={{
				folderName: folderFormState.name || '',
			}}
			enableReinitialize={true}
			validate={(values) => {
				const errors: {
					folderName?: string;
				} = {};

				if (!values.folderName) {
					errors.folderName = MESSAGES.FORM_VALIDATIONS.LINK.REQUIRED_FOLDER;
				}

				return errors;
			}}
			onSubmit={(values, { resetForm, setErrors }) => {
				const stringifyValue = zStringify({
					title: values.folderName,
					folderForModel: state,
				});
				void handleFormSubmit(stringifyValue, resetForm, setErrors);
			}}
		>
			{({
				submitForm,
				handleChange,
				handleBlur,
				values,
				errors,
				isValid,
				isSubmitting,
				touched,
			}) => {
				return (
					<>
						{/**
						 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
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
												SetDefaultFolderState();
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
											{folderFormState.formMode === FormMode.ADD
												? 'Create'
												: folderFormState.formMode === FormMode.EDIT
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
									<h6 className='font-bold'>
										{folderFormState.formMode === FormMode.ADD
											? 'Create a new folder '
											: folderFormState.formMode === FormMode.EDIT
											? 'Rename Folder '
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
											'ion-touched ion-invalid':
												touched.folderName && errors.folderName,
											'ion-touched ion-valid':
												touched.folderName && !errors.folderName,
										}),
										label: 'Folder name*',
										labelPlacement: 'floating',
										name: 'folderName',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.folderName,
										errorText: errors.folderName,
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
												SetDefaultFolderState();
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
											{folderFormState.formMode === FormMode.ADD
												? 'Create'
												: folderFormState.formMode === FormMode.EDIT
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

export default ZaionsAddNewFolder;
