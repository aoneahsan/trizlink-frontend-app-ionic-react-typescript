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
import { Formik } from 'formik';
import { IonRadio, IonRadioGroup } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonInput,
	ZIonFooter,
	ZIonList,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import CONSTANTS, { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { ZCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsAuthToken } from '@/ZaionsStore/UserAccount/index.recoil';
import { useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
import { zAxiosApiRequest, zStringify } from '@/utils/helpers';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

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
 * ? Like if you have a type for props it should be placed Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const DeleteUserAccountModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	zNavigatePushRoute?: (_url: string) => void;
}> = ({ dismissZIonModal, zNavigatePushRoute }) => {
	const authToken = useRecoilValue(ZaionsAuthToken);

	const handleFormSubmit = async (values: {
		confirm: string;
		reason: string;
	}) => {
		try {
			await presentZIonLoader(MESSAGES.GENERAL.DELETING_ACCOUNT);
			if (authToken) {
				try {
					await zAxiosApiRequest({
						_url: API_URL_ENUM.delete,
						_method: 'post',
						_isAuthenticatedRequest: true,
						_data: zStringify({
							accountDeleteReason: values.reason,
						}),
					});
				} catch (_error) {
					throw new ZCustomError({ message: (_error as Error).message });
				}
			} else {
				throw new ZCustomError({ message: MESSAGES.GENERAL.INVALID_REQUEST });
			}

			await dismissZIonLoader();

			dismissZIonModal();

			showSuccessNotification(
				MESSAGES.GENERAL.USER_ACCOUNT_SUCCESS_DELETE_MESSAGE
			);

			zNavigatePushRoute && zNavigatePushRoute(ZaionsRoutes.HomeRoute);
		} catch (error) {
			console.error({
				errorPlacement: 'From DeleteUserAccountModal - formik - onSubmit',
				error,
			});
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
	return (
		<>
			<Formik
				initialValues={{ confirm: '', reason: '' }}
				validate={(values) => {
					const errors: {
						confirm?: string;
						reason?: string;
					} = {};

					if (
						!values.confirm.trim() ||
						values.confirm.trim() !== CONSTANTS.USER_ACCOUNT_DELETE_CONFIRM_KEY
					) {
						errors.confirm = MESSAGES.GENERAL.DELETE_USER_ACCOUNT_CONFIRM;
					}

					if (!values.reason) {
						errors.reason = MESSAGES.GENERAL.DELETE_USER_ACCOUNT_REASON;
					}
					return errors;
				}}
				onSubmit={async (values) => {
					await handleFormSubmit(values);
				}}
			>
				{({
					values,
					errors,
					handleChange,
					handleBlur,
					submitForm,
					setFieldValue,
					isValid,
					touched,
				}) => {
					return (
						<>
							<ZIonContent className='ion-padding-vertical'>
								<ZIonRow className='ion-no-padding ion-no-margin'>
									<ZIonCol className='flex ion-justify-content-end ion-align-items-start ion-no-padding ion-no-margin'>
										<ZIonButton
											fill='clear'
											className='ion-no-padding ion-no-margin me-2'
											color='dark'
											onClick={() => dismissZIonModal()}
										>
											<ZIonIcon icon={closeOutline} size='large' />
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
								<ZIonRow className='ion-no-padding'>
									<ZIonCol className='flex flex-col ion-justify-content-end pt-0 px-4 ms-2'>
										<ZIonTitle className='ion-no-padding mb-3'>
											<h3 className='font-bold'>Delete user account</h3>
										</ZIonTitle>
										<ZIonText className='block font-bold zaions__fs_16'>
											How your account will be affected:
										</ZIonText>
										<ZIonList
											lines='none'
											className='ion-no-padding zaions__dotted_list'
										>
											<ZIonItem className='ion-no-padding'>
												Your login will be deactivated
											</ZIonItem>
											<ZIonItem className='ion-no-padding ion-align-items-start'>
												All your personally identifiable information (PII) will
												be permanently deleted from our servers
											</ZIonItem>
											<ZIonItem className='ion-no-padding ion-align-items-start mt-2'>
												Integrations using your user information, such as access
												tokens, will be disconnected from {PRODUCT_NAME}
											</ZIonItem>
											<ZIonItem className='ion-no-padding'>
												Any paid plan subscription will be canceled and billing
												will stop
											</ZIonItem>
										</ZIonList>

										<ZIonText className='block font-bold zaions__fs_16 mt-3'>
											How your links will be affected:
										</ZIonText>
										<ZIonList
											lines='none'
											className='ion-no-padding zaions__dotted_list'
										>
											<ZIonItem className='ion-no-padding'>
												Your links will not be deleted or deactivated
											</ZIonItem>
											<ZIonItem className='ion-no-padding'>
												Links using the ${PRODUCT_DOMAIN} domain will continue
												to function
											</ZIonItem>
											<ZIonItem className='ion-no-padding ion-align-items-start mt-2'>
												Links branded with a {PRODUCT_NAME} complimentary domain
												will continue to function for one year from your sign up
												date, and then they will lead to an error page
											</ZIonItem>
											<ZIonItem className='ion-no-padding ion-align-items-start mt-2'>
												Links branded with your own custom domain will continue
												to function as long as the domain's DNS records point to
												{PRODUCT_NAME}'s servers
											</ZIonItem>
											<ZIonItem className='ion-no-padding'>
												Your name will not appear next to links you've created
											</ZIonItem>

											<ZIonText className='block font-bold zaions__fs_16 mt-3'>
												We're sad to see you go. Can you tell us why you're
												leaving?
											</ZIonText>
										</ZIonList>
										<ZIonList lines='none'>
											<IonRadioGroup>
												<ZIonItem>
													<IonRadio
														className='me-2'
														onClick={() =>
															setFieldValue(
																'reason',
																`I have another ${PRODUCT_NAME} account`
															)
														}
													/>
													<ZIonText>
														I have another {PRODUCT_NAME} account
													</ZIonText>
												</ZIonItem>
												<ZIonItem>
													<IonRadio
														className='me-2'
														onClick={() =>
															setFieldValue(
																'reason',
																`I have privacy concerns using ${PRODUCT_NAME}`
															)
														}
													/>
													<ZIonText>
														I have privacy concerns using {PRODUCT_NAME}
													</ZIonText>
												</ZIonItem>
												<ZIonItem>
													<IonRadio
														className='me-2'
														onClick={() =>
															setFieldValue(
																'reason',
																`I no longer find  ${PRODUCT_NAME} useful`
															)
														}
													/>
													<ZIonText>
														I no longer find {PRODUCT_NAME} useful
													</ZIonText>
												</ZIonItem>
												<ZIonItem>
													<IonRadio
														className='me-2'
														onClick={() => setFieldValue('reason', `Other`)}
													/>
													<ZIonText>Other</ZIonText>
												</ZIonItem>
												{values.reason === 'Other' && (
													<ZIonInputField
														inputFieldProps={{
															className: classNames({
																'ion-margin-start mt-3': true,
																'ion-touched ion-invalid':
																	touched.reason && errors.reason,
																'ion-touched ion-valid':
																	touched.reason && !errors.reason,
															}),
															label: 'Specify reason',
															labelPlacement: 'floating',
															name: 'reason',
															onIonChange: handleChange,
															onIonBlur: handleBlur,
															value: values.reason,
															errorText: errors.reason,
															type: 'text',
															color: 'dark',
														}}
													/>
												)}
											</IonRadioGroup>
										</ZIonList>

										<ZIonText className='font-bold zaions__fs_16 mt-4'>
											To permanently delete your account, enter '
											{CONSTANTS.USER_ACCOUNT_DELETE_CONFIRM_KEY}' below, and
											then select Delete account.
										</ZIonText>

										<ZIonInputField
											inputFieldProps={{
												className: classNames({
													'mt-3': true,
													'ion-touched ion-invalid':
														touched.confirm && errors.confirm,
													'ion-touched ion-valid':
														touched.confirm && !errors.confirm,
												}),
												label: 'Enter Key',
												labelPlacement: 'floating',
												name: 'confirm',
												onIonChange: handleChange,
												onIonBlur: handleBlur,
												value: values.confirm,
												errorText: errors.confirm,
												type: 'text',
												color: 'dark',
											}}
										/>
									</ZIonCol>
								</ZIonRow>
							</ZIonContent>
							<ZIonFooter className='ion-text-end py-2'>
								<ZIonButton
									className='me-4'
									fill='outline'
									onClick={() => dismissZIonModal()}
								>
									Cancel
								</ZIonButton>
								<ZIonButton
									className='me-4'
									color='danger'
									onClick={() => {
										if (isValid) {
											void submitForm();
										}
									}}
									disabled={!isValid}
								>
									Delete account
								</ZIonButton>
							</ZIonFooter>
						</>
					);
				}}
			</Formik>
		</>
	);
};

export default DeleteUserAccountModal;
