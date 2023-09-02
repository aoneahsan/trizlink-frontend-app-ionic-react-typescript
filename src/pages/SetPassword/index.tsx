/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { ProductFavicon } from '@/assets/images';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonNote,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
	API_URL_ENUM,
	CONTAINS,
	VALIDATION_RULE,
	extractInnerDataOptionsEnum,
} from '@/utils/enums';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import {
	checkIfContains,
	extractInnerData,
	validateFields,
	zStringify,
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { Formik, useFormikContext } from 'formik';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

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
enum ZSetPasswordTabEnum {
	sendOptTab = 'sendOptTab',
	confirmOptTab = 'confirmOptTab',
	newPasswordTab = 'newPasswordTab',
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZSetPasswordPage: React.FC = () => {
	return (
		<ZIonPage pageTitle='set password page'>
			<ZIonContent fullscreen>
				<ZaionsSecondaryHeader />

				<ZIonGrid className='h-auto ion-padding-top ion-margin-top'>
					<ZIonRow className='h-auto ion-padding-top ion-margin-top'>
						<ZIonCol className='flex ion-justify-content-center'>
							<div className='w-full ion-text-center mb-5'>
								<ZIonImg
									src={ProductFavicon}
									className='w-[6rem] h-[6rem] mx-auto mb-6'
								/>
								<ZIonText className='block mb-3 text-2xl font-bold ion-text-center'>
									Setup Account Password
								</ZIonText>
								<ZIonText className='block'>
									<ZIonText>
										Set Account Password to access your account
									</ZIonText>
								</ZIonText>
							</div>
						</ZIonCol>
					</ZIonRow>

					{/* From */}
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
									emailAddress: '',
									otp: '',

									isEmailAddressApiError: false,
									emailAddressApiErrorText: '',
									isOTPApiError: false,
									OTPApiErrorText: '',

									password: '',
									canViewPassword: false,
									confirmPassword: '',
									canViewConfirmPassword: false,

									tab: ZSetPasswordTabEnum.newPasswordTab,
								}}
								// Validations of sign up form fields
								validate={(values) => {
									try {
										const errors: {
											emailAddress?: string;
											password?: string;
											confirmPassword?: string;
										} = {};

										validateFields(
											['emailAddress', 'password', 'confirmPassword'],
											values,
											errors,
											[
												VALIDATION_RULE.email,
												VALIDATION_RULE.password,
												VALIDATION_RULE.confirm_password,
											]
										);

										// checking the confirm password is === password ? validated : setting an error + invalidate
										if (values.confirmPassword !== values.password) {
											errors.confirmPassword =
												MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
										}

										return errors;
									} catch (error) {
										console.error({
											errorPlacement:
												'From components - InPageComponents - ZaionsLoginPage - ZaionsSignUpForm Formik validate Catch',
											error,
										});
									}
								}}
								// Submit function of formik
								onSubmit={async (values, { resetForm, setErrors }) => {
									// await FormikSubmissionHandler(values, resetForm, setErrors);
								}}
							>
								{({
									handleChange,
									handleBlur,
									submitForm,
									isValid,
									values,
									touched,
									errors,
								}) => {
									return (
										<>
											{values.tab === ZSetPasswordTabEnum.sendOptTab ? (
												<ZSendOtpTab />
											) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
												<ZConfirmOptTab />
											) : values.tab === ZSetPasswordTabEnum.newPasswordTab ? (
												<ZNewPasswordTab />
											) : null}
										</>
									);
								}}
							</Formik>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZIonPage>
	);
};

const ZSendOtpTab: React.FC = () => {
	const {
		handleChange,
		handleBlur,
		submitForm,
		setFieldValue,
		setFieldError,
		values,
		touched,
		errors,
	} = useFormikContext<{
		emailAddress: string;
		tab: ZSetPasswordTabEnum;

		isEmailAddressApiError: boolean;
		emailAddressApiErrorText: string;
		isOTPApiError: boolean;
		OTPErrorText: string;
	}>();

	// API.
	const { mutateAsync: zSendOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.send_otp,
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
					requestData: __stringifyData,
					itemIds: [],
					urlDynamicParts: [],
				});

				if (__response) {
					const __data = extractInnerData<{
						success: boolean;
					}>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

					if (__data?.success) {
						if (values.isEmailAddressApiError === true) {
							setFieldValue('emailAddressApiErrorText', '', false);
							setFieldValue('isEmailAddressApiError', false, false);
						}

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
			{/* Email Address Field */}
			<ZIonInput
				name='emailAddress'
				label='Email Address'
				labelPlacement='floating'
				type='email'
				enterkeyhint='next'
				onIonChange={(e) => {
					handleChange(e);
					if (values.isEmailAddressApiError) {
						setFieldValue('isEmailAddressApiError', false);
					}
				}}
				onIonBlur={handleBlur}
				value={values.emailAddress}
				testingSelector={CONSTANTS.testingSelectors.setPasswordPage.emailInput}
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
					'ion-valid':
						(touched.emailAddress && !errors.emailAddress) ||
						!values?.isEmailAddressApiError,
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
				testingSelector={CONSTANTS.testingSelectors.setPasswordPage.otpBtn}
			>
				Send OTP
			</ZIonButton>
		</>
	);
};

const ZConfirmOptTab: React.FC = () => {
	const { handleChange, handleBlur, setFieldValue, isValid, values, touched } =
		useFormikContext<{
			emailAddress: string;
			otp: string;
			tab: ZSetPasswordTabEnum;

			isEmailAddressApiError: boolean;
			emailAddressApiErrorText: string;
			isOTPApiError: boolean;
			OTPApiErrorText: string;
		}>();

	// API
	const { mutateAsync: zConfirmOtpAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.confirm_otp,
		_showAlertOnError: false,
		authenticated: false,
		_loaderMessage: 'Confirming OTP...',
	});

	const ZConfirmOTPHandler = async () => {
		try {
			if (values?.emailAddress && values?.emailAddress?.trim()?.length > 0) {
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

				console.log({
					__apiErrorCode,
					__apiErrors,
				});

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
			{/* Email Address Field */}
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
				testingSelector={CONSTANTS.testingSelectors.setPasswordPage.emailInput}
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
				testingSelector={
					CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
				}
			>
				Continue
			</ZIonButton>

			<ZIonButton
				expand='block'
				fill='outline'
				disabled={!isValid}
				className='mt-4 ion-text-capitalize'
				// onClick={async () => {
				// 	await ZConfirmOTPHandler();
				// }}
				testingSelector={
					CONSTANTS.testingSelectors.setPasswordPage.resendOtpBtn
				}
			>
				Resend OTP
			</ZIonButton>
		</>
	);
};

const ZNewPasswordTab: React.FC = () => {
	const { handleChange, handleBlur, setFieldValue, values, touched, errors } =
		useFormikContext<{
			emailAddress: string;
			tab: ZSetPasswordTabEnum;

			password: string;
			canViewPassword: boolean;
			confirmPassword: string;
			canViewConfirmPassword: boolean;
		}>();

	return (
		<>
			{/* Password Field */}
			<div className='flex mb-1 ion-align-items-start'>
				<ZIonInput
					name='password'
					label='Password*'
					labelPlacement='floating'
					onIonChange={handleChange}
					onIonBlur={handleBlur}
					value={values.password}
					errorText={touched.password ? errors.password : undefined}
					type={values.canViewPassword ? 'text' : 'password'}
					clearOnEdit={false}
					testingSelector={CONSTANTS.testingSelectors.signupPage.passwordInput}
					className={classNames({
						'ion-touched': touched.password,
						'ion-invalid': touched.password && errors.password,
						'ion-touched ion-valid': touched.password && !errors.password,
					})}
				/>

				<ZIonButton
					slot='end'
					fill='clear'
					size='large'
					className='ion-no-padding ion-no-margin  ms-3 w-max'
					testingSelector={
						CONSTANTS.testingSelectors.signupPage.canViewPasswordButton
					}
					onClick={() =>
						setFieldValue('canViewPassword', !values.canViewPassword, false)
					}
					mode='ios'
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
					testingSelector={
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
					testingSelector={
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
					// await ZConfirmOTPHandler();
				}}
				testingSelector={
					CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
				}
			>
				Continue
			</ZIonButton>
		</>
	);
};

export default ZSetPasswordPage;
