// Core Imports
import React, { useState } from 'react';

// Package Imports
import { Form, Formik, useFormikContext } from 'formik';
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
	extractInnerData,
} from '@/utils/helpers';
import {
	API_URL_ENUM,
	CONTAINS,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
	ZSetPasswordTabEnum,
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';

// Recoil States
import {
	ZaionsAuthTokenData,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';
import CONSTANTS, { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import { AxiosError } from 'axios';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { UserAuthData } from '@/types/ZaionsApis.type';
import { ZIonButton } from '@/components/ZIonComponents';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import {
	AuthTokenResponseType,
	UserAccountType,
} from '@/types/UserAccount/index.type';

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
					setUserAccountStateAtom((oldValues) => ({
						...oldValues,
						...userData,
					}));
					setAuthTokenDataState((oldValues) => ({
						...oldValues,
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
				// await presentZIonErrorAlert();

				// Setting errors on form fields
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['username', 'emailAddress', 'password'],
					['name', 'email', 'password'],
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
						otp: '',
						confirm_password: '',

						isOTPApiError: false,
						OTPApiErrorText: '',

						tab: ZSetPasswordTabEnum.sendOptTab,
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
						setFieldTouched,
						values,
						touched,
						errors,
						isValid,
					}) => (
						<Form>
							{values.tab === ZSetPasswordTabEnum.sendOptTab ? (
								<ZSendOtpTab />
							) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
								<ZConfirmOptTab />
							) : values.tab === ZSetPasswordTabEnum.newPasswordTab ? (
								<ZNewPasswordTab />
							) : null}

							{/* User Name Field */}
							{/* <ZIonInput
								label='Username*'
								name='username'
								labelPlacement='floating'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.username}
								errorText={touched.username ? errors.username : undefined}
								testingselector={
									CONSTANTS.testingSelectors.signupPage.usernameInput
								}
								className={classNames({
									'mb-4': true,
									'ion-touched': touched.username,
									'ion-invalid': touched.username && errors.username,
									'ion-valid': touched.username && !errors.username,
								})}
							/> */}

							{/* Email Address Field */}
							{/* <ZIonInput
								type='email'
								name='emailAddress'
								label='Email Address*'
								labelPlacement='floating'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.emailAddress}
								testingselector={
									CONSTANTS.testingSelectors.signupPage.emailInput
								}
								errorText={
									touched.emailAddress ? errors.emailAddress : undefined
								}
								className={classNames({
									'mb-3': true,
									'ion-touched': touched.emailAddress,
									'ion-invalid': touched.emailAddress && errors.emailAddress,
									'ion-valid': touched.emailAddress && !errors.emailAddress,
								})}
							/> */}

							{/* Password Field */}
							{/* <div className='flex mb-1 mt-4 ion-align-items-start'>
								<ZIonInput
									name='password'
									label='Password*'
									labelPlacement='floating'
									onIonChange={(e) => {
										handleChange(e);
										if (
											e?.target?.value &&
											(e?.target?.value as string)?.length > 0
										) {
											setFieldTouched('password', true, true);
										}
									}}
									onIonBlur={handleBlur}
									value={values.password}
									errorText={touched.password ? errors.password : undefined}
									type={zaionsSignUpState.canViewPassword ? 'text' : 'password'}
									clearOnEdit={false}
									testingselector={
										CONSTANTS.testingSelectors.signupPage.passwordInput
									}
									className={classNames({
										'ion-touched': touched.password,
										'ion-invalid': touched.password && errors.password,
										'ion-touched ion-valid':
											touched.password && !errors.password,
									})}
								/>

								<ZIonButton
									slot='end'
									fill='clear'
									size='large'
									className='ion-no-padding ion-no-margin ms-3 w-max'
									testingselector={
										CONSTANTS.testingSelectors.signupPage.canViewPasswordButton
									}
									onClick={() =>
										setZaionsSignUpState((oldValues) => ({
											...oldValues,
											canViewPassword: !oldValues.canViewPassword,
										}))
									}
								>
									<ZIonIcon
										icon={
											zaionsSignUpState.canViewPassword
												? eyeOffOutline
												: eyeOutline
										}
									/>
								</ZIonButton>
							</div> */}

							{/* <ZIonNote className='w-full'>
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
							</ZIonNote> */}

							{/* Confirm Password Field */}
							{/* <div className='flex mt-4 ion-align-items-start'>
								<ZIonInput
									label='Confirm Password*'
									labelPlacement='floating'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values.confirm_password}
									name='confirm_password'
									clearOnEdit={false}
									type={zaionsSignUpState.canViewPassword ? 'text' : 'password'}
									testingselector={
										CONSTANTS.testingSelectors.signupPage.confirmPasswordInput
									}
									errorText={
										touched.confirm_password
											? errors.confirm_password
											: undefined
									}
									className={classNames({
										'ion-touched': touched.confirm_password,
										'ion-invalid':
											touched.confirm_password && errors.confirm_password,
										'ion-valid':
											touched.confirm_password && !errors.confirm_password,
									})}
								/>
								<ZIonButton
									fill='clear'
									size='large'
									className='ion-no-padding ion-no-margin ms-3 w-max'
									testingselector={
										CONSTANTS.testingSelectors.signupPage
											.canViewConfirmPasswordButton
									}
									onClick={() =>
										setZaionsSignUpState((oldValues) => ({
											...oldValues,
											canViewConfirmPassword: !oldValues.canViewConfirmPassword,
										}))
									}
								>
									<ZIonIcon
										icon={
											zaionsSignUpState.canViewConfirmPassword
												? eyeOffOutline
												: eyeOutline
										}
									/>
								</ZIonButton>
							</div> */}

							{/* Submit Button */}
							{/* <ZIonButton
								expand='block'
								type='submit'
								className='mt-4 ion-text-capitalize'
								disabled={touched && !isValid}
								testingselector={
									CONSTANTS.testingSelectors.signupPage.signupButton
								}
							>
								Sign up with Email
							</ZIonButton> */}

							{/* Some Text */}
							{/* <div className='mt-3 mb-4 ion-text-center'>
								<ZIonText className='text-[14px]' color='medium'>
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
							</div> */}
						</Form>
					)}
				</Formik>
			</ZIonCol>
		</ZIonRow>
	);
};

const ZSendOtpTab: React.FC = () => {
	const {
		handleChange,
		handleBlur,
		setFieldValue,
		setFieldError,
		setErrors,
		values,
		touched,
		errors,
	} = useFormikContext<{
		emailAddress: string;
		tab: ZSetPasswordTabEnum;
		inviteToken: string;

		isEmailAddressApiError: boolean;
		emailAddressApiErrorText: string;
		isOTPApiError: boolean;
		OTPErrorText: string;
	}>();

	// API.
	const { mutateAsync: zSendOtpAsyncMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.send_signup_otp,
		_showAlertOnError: false,
		_authenticated: false,
		_loaderMessage: 'Sending OTP...',
	});

	const ZSendOTPHandler = async () => {
		try {
			if (values?.emailAddress && values?.emailAddress?.trim()?.length > 0) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
				});

				const __response = await zSendOtpAsyncMutate(__stringifyData);
				console.log(__response);
				if (__response) {
					const __data = extractInnerData<{
						success: boolean;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					if (__data?.success) {
						setFieldValue('tab', ZSetPasswordTabEnum.confirmOptTab, false);

						showSuccessNotification(
							'OTP has been successfully sent to your email. Please check your email.'
						);
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrorObjects = error.response?.data as {
					errors: { item: string[] } | ZGenericObject;
					status: number;
				};

				const __errors = formatApiRequestErrorForFormikFormField(
					['emailAddress'],
					['email'],
					__apiErrorObjects.errors as ZGenericObject
				);

				if (__errors) {
					setErrors(__errors);
				}

				const __apiErrors = (__apiErrorObjects?.errors as { item: string[] })
					?.item;
				const __apiErrorCode = __apiErrorObjects?.status;

				if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
					setFieldError('emailAddress', __apiErrors[0]);
				}
			}
			reportCustomError(error);
		}
	};

	return (
		<>
			<ZIonInput
				name='emailAddress'
				label='Email Address'
				labelPlacement='floating'
				type='email'
				// enterkeyhint='next'
				onIonChange={(e) => {
					handleChange(e);
					if (values.isEmailAddressApiError) {
						setFieldValue('isEmailAddressApiError', false);
					}
				}}
				onIonBlur={handleBlur}
				value={values.emailAddress}
				testingselector={CONSTANTS.testingSelectors.setPasswordPage.emailInput}
				errorText={
					touched.emailAddress
						? errors.emailAddress?.trim()
							? errors.emailAddress
							: values.isEmailAddressApiError
							? values?.emailAddressApiErrorText
							: undefined
						: undefined
				}
				className={classNames({
					'mb-4': true,
					'ion-touched': touched.emailAddress,
					'ion-invalid': values?.isEmailAddressApiError || errors.emailAddress,
					'ion-valid': touched.emailAddress && !errors.emailAddress,
				})}
			/>

			{/* Send OTP Button */}
			<ZIonButton
				expand='block'
				disabled={values?.emailAddress?.length === 0}
				className='mt-4 ion-text-capitalize'
				onClick={async () => {
					await ZSendOTPHandler();
				}}
				testingselector={CONSTANTS.testingSelectors.setPasswordPage.otpBtn}
			>
				Send OTP
			</ZIonButton>
		</>
	);
};

const ZConfirmOptTab: React.FC = () => {
	const { handleChange, handleBlur, setFieldValue, values, touched } =
		useFormikContext<{
			emailAddress: string;
			otp: string;
			tab: ZSetPasswordTabEnum;

			isEmailAddressApiError: boolean;
			emailAddressApiErrorText: string;
			isOTPApiError: boolean;
			OTPApiErrorText: string;
			inviteToken: string;
		}>();

	const { presentZIonErrorAlert } = useZIonErrorAlert();

	// API
	const { mutateAsync: zConfirmOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.confirm_otp,
		_showAlertOnError: false,
		authenticated: false,
		_loaderMessage: 'Confirming OTP...',
	});

	const { mutateAsync: zSendOtpAsyncMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.send_signup_otp,
		_showAlertOnError: false,
		_authenticated: false,
		_loaderMessage: 'Sending OTP...',
	});

	const ZConfirmOTPHandler = async () => {
		try {
			if (values?.otp && values?.otp?.trim()?.length === 6) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
					otp: values.otp,
				});

				const __response = await zConfirmOtpAsyncMutate({
					requestData: __stringifyData,
					itemIds: [],
					urlDynamicParts: [],
				});

				if (__response) {
					const __data = extractInnerData<{
						success: boolean;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					if (__data?.success) {
						if (values?.isOTPApiError === true) {
							setFieldValue('OTPApiErrorText', '', false);
							setFieldValue('isOTPApiError', false, false);
						}

						setFieldValue('tab', ZSetPasswordTabEnum.newPasswordTab, false);
						setFieldValue('otp', '', false);
						showSuccessNotification('OTP has been confirmed.');
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrorObjects = error.response?.data as {
					errors: { item: string[] };
					status: number;
				};

				const __apiErrors = __apiErrorObjects?.errors?.item;
				const __apiErrorCode = __apiErrorObjects?.status;

				if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
					setFieldValue('OTPApiErrorText', __apiErrors[0], false);
					setFieldValue('isOTPApiError', true, false);
				}
			}

			reportCustomError(error);
		}
	};

	const ZResendOTPHandler = async () => {
		try {
			if (values?.emailAddress && values?.emailAddress?.trim()?.length > 0) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
				});

				const __response = await zSendOtpAsyncMutate(__stringifyData);
				console.log(__response);
				if (__response) {
					const __data = extractInnerData<{
						success: boolean;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					if (__data?.success) {
						setFieldValue('tab', ZSetPasswordTabEnum.confirmOptTab, false);

						showSuccessNotification(
							'OTP has been successfully sent to your email. Please check your email.'
						);
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrorObjects = error.response?.data as {
					errors: { item: string[] };
					status: number;
				};

				const __apiErrors = __apiErrorObjects?.errors?.item;
				const __apiErrorCode = __apiErrorObjects?.status;

				// if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
				// 	setFieldError('emailAddress', __apiErrors[0]);
				// }
			}
			reportCustomError(error);
		}
	};

	return (
		<>
			{/* OTP Field */}
			<ZIonInput
				name='otp'
				label='OTP'
				labelPlacement='floating'
				type='text'
				maxlength={6}
				enterkeyhint='next'
				onIonChange={handleChange}
				onIonBlur={handleBlur}
				value={values.otp}
				testingselector={CONSTANTS.testingSelectors.setPasswordPage.emailInput}
				errorText={values?.isOTPApiError ? values?.OTPApiErrorText : undefined}
				className={classNames({
					'mb-4': true,
					'ion-touched': touched.otp,
					'ion-invalid': values?.isOTPApiError,
					'ion-valid': touched.otp && !values?.isOTPApiError,
				})}
			/>

			{/* Confirm OTP Button */}
			<ZIonButton
				expand='block'
				disabled={values?.otp?.trim()?.length !== 6}
				className='mt-4 ion-text-capitalize'
				onClick={async () => {
					await ZConfirmOTPHandler();
				}}
				testingselector={
					CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
				}
			>
				Continue
			</ZIonButton>

			<ZIonButton
				expand='block'
				fill='outline'
				className='mt-4 ion-text-capitalize'
				onClick={async () => {
					await ZResendOTPHandler();
				}}
				testingselector={
					CONSTANTS.testingSelectors.setPasswordPage.resendOtpBtn
				}
			>
				Resend OTP
			</ZIonButton>
		</>
	);
};

const ZNewPasswordTab: React.FC = () => {
	const {
		handleChange,
		handleBlur,
		setFieldValue,
		resetForm,
		setErrors,
		setFieldTouched,
		values,
		touched,
		errors,
	} = useFormikContext<{
		emailAddress: string;
		tab: ZSetPasswordTabEnum;
		inviteToken: string;

		password: string;
		username: string;
		canViewPassword: boolean;
		confirmPassword: string;
		canViewConfirmPassword: boolean;
	}>();

	// API
	const { mutateAsync: zSetPasswordAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.set_username_password,
		_showAlertOnError: false,
		authenticated: false,
		_loaderMessage: 'Setting password...',
	});

	const setUserAccountStateAtom = useSetRecoilState(
		ZaionsUserAccountRStateAtom
	);
	const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

	const { zNavigatePushRoute } = useZNavigate();

	const { presentZIonErrorAlert } = useZIonErrorAlert();

	const ZSetUsernamePassword = async () => {
		try {
			if (values?.password && values?.password?.trim()?.length > 0) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
					username: values.username,
					password: values.password,
					password_confirmation: values.confirmPassword,
				});

				const __response = await zSetPasswordAsyncMutate({
					requestData: __stringifyData,
					itemIds: [],
					urlDynamicParts: [],
				});

				if (__response) {
					const __data = extractInnerData<{
						user: UserAccountType;
						token: AuthTokenResponseType;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					// Checking if the __data is available & if there is a user object in __data which have the id.
					if (__data?.user?.id) {
						// getting user data.
						const userData = getUserDataObjectForm(__data.user);

						// Storing user token at userAccountAuthToken State.
						const userToken = {
							token: __data?.token?.plainTextToken,
						};

						// Set user data && user token to localstorage.
						if (userData && userToken.token) {
							// store User token.
							void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
							// store auth token.
							void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

							// Storing user data in userAccount Recoil State.
							setUserAccountStateAtom((oldValues) => ({
								...oldValues,
								...userData,
							}));
							setAuthTokenDataState((oldValues) => ({
								...oldValues,
								...userToken,
							}));

							// reset form.
							resetForm();

							// If success then show the success notification.
							showSuccessNotification('Registration Completed');

							// Redirect to startup page
							zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
						} else {
							// if there is any error in above then Throw Error..
							throw new ZCustomError();
						}
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				// if there any error then showing the alert modal.
				// await presentZIonErrorAlert();

				const __apiErrorObjects = error.response?.data as {
					errors: { item: string[] } | ZGenericObject;
					status: number;
				};

				const __apiErrors = __apiErrorObjects?.errors;
				const __apiErrorCode = __apiErrorObjects?.status;

				if (__apiErrorCode === ZErrorCodeEnum.serverError) {
					const __errors = formatApiRequestErrorForFormikFormField(
						['password', 'confirmPassword'],
						['password', 'password_confirmation'],
						__apiErrors as ZGenericObject
					);

					setErrors(__errors);
				}

				if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
					presentZIonErrorAlert((__apiErrors as { item: string[] }).item[0]);
				}
			}
			reportCustomError(error);
		}
	};

	return (
		<>
			<ZIonInput
				name='username'
				label='username*'
				labelPlacement='floating'
				onIonChange={handleChange}
				onIonBlur={handleBlur}
				value={values.username}
				errorText={touched.username ? errors.username : undefined}
				type='text'
				clearOnEdit={false}
				testingselector={CONSTANTS.testingSelectors.signupPage.passwordInput}
				className={classNames({
					'ion-touched': touched.username,
					'ion-invalid': touched.username && errors.username,
					'ion-touched ion-valid': touched.username && !errors.username,
				})}
			/>

			{/* Password Field */}
			<div className='flex mb-1 mt-4 ion-align-items-start'>
				<ZIonInput
					name='password'
					label='Password*'
					labelPlacement='floating'
					onIonChange={(e) => {
						handleChange(e);
						if (e?.target?.value && (e?.target?.value as string)?.length > 0) {
							setFieldTouched('password', true, true);
						}
					}}
					onIonBlur={handleBlur}
					value={values.password}
					errorText={touched.password ? errors.password : undefined}
					type={values.canViewPassword ? 'text' : 'password'}
					clearOnEdit={false}
					testingselector={CONSTANTS.testingSelectors.signupPage.passwordInput}
					className={classNames({
						'ion-touched': touched.password,
						'ion-invalid': touched.password && errors.password,
						'ion-valid': touched.password && !errors.password,
					})}
				/>

				<ZIonButton
					slot='end'
					fill='clear'
					size='large'
					className='ion-no-padding ion-no-margin ms-3 w-max'
					testingselector={
						CONSTANTS.testingSelectors.signupPage.canViewPasswordButton
					}
					onClick={() =>
						setFieldValue('canViewPassword', !values.canViewPassword, false)
					}
				>
					<ZIonIcon
						icon={values.canViewPassword ? eyeOffOutline : eyeOutline}
					/>
				</ZIonButton>
			</div>

			<ZIonNote className='w-full'>
				<ZIonRow>
					<ZIonCol size='6'>
						<ZIonText
							color={
								touched.password
									? checkIfContains(values.password, CONTAINS.minCharacter)
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
									? checkIfContains(values.password, CONTAINS.specialSymbol)
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

			{/* Confirm Password Field */}
			<div className='flex mt-4 ion-align-items-start'>
				<ZIonInput
					label='Confirm Password*'
					labelPlacement='floating'
					onIonChange={handleChange}
					onIonBlur={handleBlur}
					value={values.confirmPassword}
					name='confirmPassword'
					clearOnEdit={false}
					type={values?.canViewConfirmPassword ? 'text' : 'password'}
					testingselector={
						CONSTANTS.testingSelectors.signupPage.confirmPasswordInput
					}
					errorText={
						touched.confirmPassword ? errors.confirmPassword : undefined
					}
					className={classNames({
						'ion-touched': touched.confirmPassword,
						'ion-invalid': touched.confirmPassword && errors.confirmPassword,
						'ion-valid': touched.confirmPassword && !errors.confirmPassword,
					})}
				/>
				<ZIonButton
					fill='clear'
					size='large'
					className='ion-no-padding ion-no-margin ms-3 w-max'
					testingselector={
						CONSTANTS.testingSelectors.signupPage.canViewConfirmPasswordButton
					}
					onClick={() =>
						setFieldValue(
							'canViewConfirmPassword',
							!values.canViewConfirmPassword,
							false
						)
					}
				>
					<ZIonIcon
						icon={values?.canViewConfirmPassword ? eyeOffOutline : eyeOutline}
					/>
				</ZIonButton>
			</div>

			{/* Confirm OTP Button */}
			<ZIonButton
				expand='block'
				disabled={
					(errors?.password?.trim()?.length !== undefined &&
						errors?.password?.trim()?.length > 0) ||
					(errors?.confirmPassword?.trim()?.length !== undefined &&
						errors?.confirmPassword?.trim()?.length > 0)
				}
				className='mt-4 ion-text-capitalize'
				onClick={async () => {
					await ZSetUsernamePassword();
				}}
				testingselector={
					CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
				}
			>
				Continue
			</ZIonButton>
		</>
	);
};

export default ZaionsSignUpForm;
