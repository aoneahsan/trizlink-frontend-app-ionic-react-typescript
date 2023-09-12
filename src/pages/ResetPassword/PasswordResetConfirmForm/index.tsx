// Core Imports
import React from 'react';

// Package Imports
import { Formik, useFormikContext } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonImg,
	ZIonText,
	ZIonInput,
	ZIonButton,
	ZIonNote,
	ZIonIcon,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

// Global Constants
import {
	API_URL_ENUM,
	CONTAINS,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
	ZSetPasswordTabEnum,
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import {
	checkIfContains,
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	getUserDataObjectForm,
	STORAGE,
	validateFields,
	zStringify,
} from '@/utils/helpers';
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';

// Images
import { ProductFavicon } from '@/assets/images';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';
import { showSuccessNotification } from '@/utils/notification';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import {
	AuthTokenResponseType,
	UserAccountType,
} from '@/types/UserAccount/index.type';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useSetRecoilState } from 'recoil';
import {
	ZaionsAuthTokenData,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Style

const ZaionsPasswordResetConfirm: React.FC = () => {
	return (
		<ZIonPage>
			<ZIonContent fullscreen>
				<ZaionsSecondaryHeader />
				<ZIonGrid className=''>
					<Formik
						initialValues={{
							// emailAddress: compState?.email || '',
							emailAddress: '',
							password: '',
							otp: '',
							confirm_password: '',

							isEmailAddressApiError: false,
							emailAddressApiErrorText: '',
							isOTPApiError: false,
							OTPApiErrorText: '',

							// tab: compState?.tab || ZSetPasswordTabEnum.sendOptTab,
							tab: ZSetPasswordTabEnum.sendOptTab,
						}}
						// Validations of sign up form fields
						validate={(values) => {
							try {
								// Error object
								const errors: {
									emailAddress?: string;
									password?: string;
									confirm_password?: string;
								} = {};

								// validating the fields and checking for error and error ? setting the errors : validated
								validateFields(
									['emailAddress', 'password', 'confirm_password'],
									values,
									errors,
									[
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
						enableReinitialize
						// Submit function
						onSubmit={() => {}}
					>
						{({ values }) => {
							return (
								<>
									<ZIonRow>
										<ZIonCol
											className='flex mx-auto ion-justify-content-center'
											sizeXl='6'
											sizeLg='6.7'
											sizeMd='7.5'
											sizeSm='10'
											sizeXs='12'
										>
											<div className='w-full ion-text-center'>
												<ZIonImg
													src={ProductFavicon}
													className='w-[6rem] h-[6rem] mx-auto mb-6'
												/>

												<ZIonText className='block mb-3 text-2xl font-bold'>
													Forget your password
												</ZIonText>
												<ZIonText className='block'>
													{values.tab === ZSetPasswordTabEnum.sendOptTab
														? 'It happens to the best of us. Enter your email to request a OTP (one-time-password).'
														: values.tab === ZSetPasswordTabEnum.confirmOptTab
														? 'Please entry OTP (one-time-password) that has sent to your email.'
														: values.tab === ZSetPasswordTabEnum.newPasswordTab
														? 'Entry your new password.'
														: null}
												</ZIonText>
											</div>
										</ZIonCol>
									</ZIonRow>

									{/*  */}
									<ZIonRow className='ion-justify-content-center ion-align-items-top mt-6'>
										<ZIonCol
											className='ion-text-start'
											size='4.2'
											sizeLg='5'
											sizeMd='6.2'
											sizeSm='8.2'
											sizeXs='11.5'
										>
											{values.tab === ZSetPasswordTabEnum.sendOptTab ? (
												<ZSendOtpTab />
											) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
												<ZConfirmOptTab />
											) : values.tab === ZSetPasswordTabEnum.newPasswordTab ? (
												<ZNewPasswordTab />
											) : null}
										</ZIonCol>
									</ZIonRow>
								</>
							);
						}}
					</Formik>
				</ZIonGrid>
			</ZIonContent>
		</ZIonPage>
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
	const { mutateAsync: zSendOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.send_forget_password_otp,
		_showAlertOnError: false,
		authenticated: false,
		_loaderMessage: 'Sending OTP...',
	});

	const ZSendOTPHandler = async () => {
		try {
			if (values?.emailAddress && values?.emailAddress?.trim()?.length > 0) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
				});

				const __response = await zSendOtpAsyncMutate({
					itemIds: [],
					urlDynamicParts: [],
					requestData: __stringifyData,
				});

				if (__response) {
					const __data = extractInnerData<{
						success: boolean;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					if (__data?.success) {
						const userData = {
							email: values?.emailAddress,
							tab: ZSetPasswordTabEnum.confirmOptTab,
						};

						await STORAGE.SET(
							LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA,
							userData
						);

						setFieldValue('tab', ZSetPasswordTabEnum.confirmOptTab, false);

						showSuccessNotification(MESSAGES.GENERAL.OTP.SEND_SUCCESSFULLY);
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

				if (__apiErrorCode === ZErrorCodeEnum.notFound) {
					setFieldValue('emailAddressApiErrorText', __apiErrors[0], false);
					setFieldValue('isEmailAddressApiError', true, false);
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
				disabled={
					errors?.emailAddress !== undefined ||
					values?.emailAddress?.length === 0 ||
					values?.isEmailAddressApiError
				}
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

	// API
	const { mutateAsync: zConfirmOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.confirm_otp,
		_showAlertOnError: false,
		authenticated: false,
		_loaderMessage: 'Confirming OTP...',
	});
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	const { mutateAsync: zSendOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.send_otp,
		_showAlertOnError: false,
		authenticated: false,
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

						const userData = {
							email: values?.emailAddress,
							tab: ZSetPasswordTabEnum.newPasswordTab,
						};

						await STORAGE.SET(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA, userData);

						setFieldValue('tab', ZSetPasswordTabEnum.newPasswordTab, false);
						setFieldValue('otp', '', false);
						showSuccessNotification(MESSAGES.GENERAL.OTP.CONFIRMED);
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
					// await ZResendOTPHandler();
					setFieldValue('tab', ZSetPasswordTabEnum.newPasswordTab, false);
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
		canViewPassword: boolean;
		confirmPassword: string;
		canViewConfirmPassword: boolean;
	}>();

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

	const ZSetPassword = async () => {
		try {
			if (values?.password && values?.password?.trim()?.length > 0) {
				const __stringifyData = zStringify({
					email: values.emailAddress,
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

						await STORAGE.REMOVE(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA);

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
							showSuccessNotification('Successfully reset password.');

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
					presentZIonErrorAlert({
						message: (__apiErrors as { item: string[] }).item[0],
					});
				}
			}
			reportCustomError(error);
		}
	};

	return (
		<>
			{/* Password Field */}
			<div className='flex mb-1 ion-align-items-start'>
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
					await ZSetPassword();
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

export default ZaionsPasswordResetConfirm;
