// Core Imports
import React, { useState } from 'react';

// Package Imports
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
	ZIonRow,
	ZIonNote,
} from '@/components/ZIonComponents';

// Global Constants
import {
	zAxiosApiRequest,
	checkIfContains,
	formatApiRequestErrorForFormikFormField,
	getUserDataObjectForm,
	STORAGE,
	validateFields,
	zStringify,
} from '@/utils/helpers';
import { API_URL_ENUM, CONTAINS, VALIDATION_RULE } from '@/utils/enums';
import MESSAGES from '@/utils/messages';

// Recoil States
import {
	ZaionsAuthTokenData,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';
import { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import { AxiosError } from 'axios';
import { ZCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { UserAuthData } from '@/types/ZaionsApis.type';
import { ZIonButton } from '@/components/ZIonComponents';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Style

const ZaionsSignUpForm: React.FC = (props) => {
	const [zaionsSignUpState, setZaionsSignUpState] = useState<{
		canViewPassword: boolean;
		canViewConfirmPassword: boolean;
	}>({
		canViewConfirmPassword: false,
		canViewPassword: false,
	});

	const setUserAccountStateAtom = useSetRecoilState(
		ZaionsUserAccountRStateAtom
	);
	const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);
	// ZaionsAuthToken
	const { presentZIonErrorAlert } = useZIonErrorAlert();
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

	const { zNavigatePushRoute } = useZNavigate();

	const FormikSubmissionHandler = async (
		_values: { [key: string]: unknown },
		resetForm: resetFormType,
		setErrors: FormikSetErrorsType
	) => {
		try {
			// Loading start...
			await presentZIonLoader('signing up. setting up your profile.');

			// registering data
			const _response = await zAxiosApiRequest<UserAuthData>({
				_url: API_URL_ENUM.register,
				_method: 'post',
				_isAuthenticatedRequest: false,
				_data: zStringify({
					username: _values.username,
					email: _values.emailAddress,
					password: _values.password,
					password_confirmation: _values.confirm_password,
				}),
			});

			// Checking if the _response is available & if there is a user object in _response which have the id.
			if (_response?.data && _response?.success && _response?.data.user?.id) {
				// getting user data.
				const userData = getUserDataObjectForm(_response?.data.user);

				// Storing user token at userAccountAuthToken State.
				const userToken = {
					token: _response?.data?.token?.plainTextToken,
				};

				// Set user data && user token to localstorage.
				if (userData && userToken.token) {
					// store User token.
					void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
					// store auth token.
					void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

					// Storing user data in userAccount Recoil State.
					setUserAccountStateAtom((oldVals) => ({
						...oldVals,
						...userData,
					}));
					setAuthTokenDataState((oldVals) => ({
						...oldVals,
						...userToken,
					}));

					// reset form.
					resetForm();

					await dismissZIonLoader();

					// If success then show the success notification.
					showSuccessNotification('Registration Completed');

					// redirect to profile. (old 30/5/2023)
					// zNavigatePushRoute(ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile);

					// Redirect to startup page
					zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
				} else {
					// if there is any error in above then Throw Error..
					throw new ZCustomError();
				}
			} else {
				// if there is any error in above then Throw Error..
				throw new AxiosError();
			}
		} catch (error) {
			await dismissZIonLoader();

			if (error instanceof AxiosError) {
				// if there any error then showing the alert modal.
				await presentZIonErrorAlert();

				// Setting errors on form fields
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['username', 'emailAddress', 'password'],
					['username', 'email', 'password'],
					__apiErrors
				);

				setErrors(__errors);
			} else if (error instanceof ZCustomError || error instanceof Error) {
				// if we need to do some other type of logic reporting (like report this error to API or error logging to like sentry or datadog etc then we can do that here, otherwise if we just want to show the message of error to user in alert then we can do that in one else case no need for this check, but here we can set the title of alert to )
				await presentZIonErrorAlert();
			}
		}
	};

	return (
		<>
			<ZIonRow className='ion-justify-content-center'>
				<ZIonCol
					className='ion-text-start'
					size='4.2'
					sizeLg='5'
					sizeMd='6.2'
					sizeSm='8.2'
					sizeXs='11.5'
				>
					<Formik
						// Initial Values of sign up form fields
						initialValues={{
							username: '',
							emailAddress: '',
							password: '',
							confirm_password: '',
						}}
						// Validations of sign up form fields
						validate={(values) => {
							try {
								// Error object
								const errors: {
									username?: string;
									emailAddress?: string;
									password?: string;
									confirm_password?: string;
								} = {};

								// validating the fields and checking for error and error ? setting the errors : validated
								validateFields(
									['username', 'emailAddress', 'password', 'confirm_password'],
									values,
									errors,
									[
										VALIDATION_RULE.username,
										VALIDATION_RULE.email,
										VALIDATION_RULE.password,
										VALIDATION_RULE.confirm_password,
									]
								);

								// checking the confirm password is === password ? validated : setting an error + invalidate
								if (values.confirm_password !== values.password) {
									errors.confirm_password =
										MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
								}

								// returning errors object
								return errors;
							} catch (error) {
								console.error({
									errorPlacement:
										'From components - InPageComponents - ZaionsSignUpPage - ZaionsSignUpForm Formik validate Catch',
									error,
								});
							}
						}}
						// Submit function
						onSubmit={async (_values, { resetForm, setErrors }) => {
							await FormikSubmissionHandler(_values, resetForm, setErrors);
						}}
					>
						{({
							handleChange,
							handleBlur,
							values,
							touched,
							errors,
							isValid,
						}) => (
							<Form>
								{/* User Name Field */}
								<ZIonInputField
									inputFieldProps={{
										label: 'Username*',
										labelPlacement: 'floating',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.username,
										name: 'username',
										errorText: errors.username,
										className: `${classNames({
											'mb-4': true,
											'ion-touched ion-invalid':
												touched.username && errors.username,
											'ion-touched ion-valid':
												touched.username && !errors.username,
										})}`,
									}}
								/>

								{/* Email Address Field */}
								<ZIonInputField
									inputFieldProps={{
										label: 'Email Address*',
										labelPlacement: 'floating',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.emailAddress,
										name: 'emailAddress',
										type: 'email',
										errorText: errors.emailAddress,
										className: `${classNames({
											'mb-4': true,
											'ion-touched ion-invalid':
												touched.emailAddress && errors.emailAddress,
											'ion-touched ion-valid':
												touched.emailAddress && !errors.emailAddress,
										})}`,
									}}
								/>

								{/* Password Field */}
								<div className='flex mb-4 ion-align-items-center'>
									<ZIonInputField
										inputFieldProps={{
											label: 'Password*',
											labelPlacement: 'floating',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.password,
											name: 'password',
											type: zaionsSignUpState.canViewPassword
												? 'text'
												: 'password',
											errorText: errors.password,
											className: `${classNames({
												'ion-touched ion-invalid':
													touched.password && errors.password,
												'ion-touched ion-valid':
													touched.password && !errors.password,
											})}`,
										}}
									/>

									<ZIonButton
										slot='end'
										fill='clear'
										size='large'
										className='ion-no-padding ms-3 zaions__max_content'
										onClick={() =>
											setZaionsSignUpState((OldVals) => ({
												...OldVals,
												canViewPassword: !OldVals.canViewPassword,
											}))
										}
										mode='ios'
									>
										<ZIonIcon
											icon={
												zaionsSignUpState.canViewPassword
													? eyeOffOutline
													: eyeOutline
											}
										/>
									</ZIonButton>
								</div>

								<ZIonNote className='w-full'>
									<ZIonRow>
										<ZIonCol size='6'>
											<ZIonText
												color={
													touched.password
														? checkIfContains(
																values.password,
																CONTAINS.minCharacter
														  )
															? 'success'
															: 'danger'
														: 'medium'
												}
											>
												8 or more characters
											</ZIonText>
										</ZIonCol>
										<ZIonCol size='6'>
											<ZIonText
												color={
													touched.password
														? checkIfContains(values.password, CONTAINS.number)
															? 'success'
															: 'danger'
														: 'medium'
												}
											>
												One number
											</ZIonText>
										</ZIonCol>
										<ZIonCol size='6'>
											<ZIonText
												color={
													touched.password
														? checkIfContains(values.password, CONTAINS.letter)
															? 'success'
															: 'danger'
														: 'medium'
												}
											>
												One letter
											</ZIonText>
										</ZIonCol>
										<ZIonCol size='6'>
											<ZIonText
												color={
													touched.password
														? checkIfContains(
																values.password,
																CONTAINS.specialSymbol
														  )
															? 'success'
															: 'danger'
														: 'medium'
												}
											>
												One special character
											</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</ZIonNote>

								{/* Password Field */}
								<div className='flex mb-4 ion-align-items-center'>
									<ZIonInputField
										inputFieldProps={{
											label: 'Confirm Password*',
											labelPlacement: 'floating',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.confirm_password,
											name: 'confirm_password',
											type: zaionsSignUpState.canViewPassword
												? 'text'
												: 'password',
											errorText: errors.confirm_password,
											className: `${classNames({
												'ion-touched ion-invalid':
													touched.confirm_password && errors.confirm_password,
												'ion-touched ion-valid':
													touched.confirm_password && !errors.confirm_password,
											})}`,
										}}
									/>
									<ZIonButton
										fill='clear'
										size='large'
										className='ion-no-padding ms-3 zaions__max_content'
										onClick={() =>
											setZaionsSignUpState((OldVals) => ({
												...OldVals,
												canViewConfirmPassword: !OldVals.canViewConfirmPassword,
											}))
										}
										mode='ios'
									>
										<ZIonIcon
											icon={
												zaionsSignUpState.canViewConfirmPassword
													? eyeOffOutline
													: eyeOutline
											}
										/>
									</ZIonButton>
								</div>

								{/* Submit Button */}
								<ZIonButton
									expand='block'
									type='submit'
									className='mt-4 ion-text-capitalize'
									disabled={touched && !isValid}
								>
									Sign up with Email
								</ZIonButton>

								{/* Some Text */}
								<div className='mt-3 mb-4 ion-text-center'>
									<ZIonText className='zaions__fs_14 ' color='medium'>
										By signing in with an account, you agree to <br />{' '}
										{PRODUCT_NAME}
										's{' '}
										<ZIonRouterLink
											routerLink={ZaionsRoutes.HomeRoute}
											className='underline'
											color='medium'
										>
											Terms of Service
										</ZIonRouterLink>
										,{' '}
										<ZIonRouterLink
											routerLink={ZaionsRoutes.HomeRoute}
											className='underline'
											color='medium'
										>
											Privacy Policy
										</ZIonRouterLink>{' '}
										and{' '}
										<ZIonRouterLink
											routerLink={ZaionsRoutes.HomeRoute}
											className='underline'
											color='medium'
										>
											Acceptable Use Policy
										</ZIonRouterLink>
										.
									</ZIonText>
								</div>
							</Form>
						)}
					</Formik>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default ZaionsSignUpForm;
