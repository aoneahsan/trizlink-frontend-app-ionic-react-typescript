// Core Imports
import React, { useState } from 'react';

// Package Imports Consolas, 'Courier New', monospace
import { Formik } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

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
import CONSTANTS, { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import {
	zAxiosApiRequest,
	formatApiRequestErrorForFormikFormField,
	getUserDataObjectForm,
	STORAGE,
	validateFields,
	zStringify,
	zConsoleError,
	replaceParams,
} from '@/utils/helpers';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { AxiosError } from 'axios';
import { ZCustomError } from '@/utils/customErrorType';
import {
	ZaionsAuthTokenData,
	ZaionsUserAccountRStateAtom,
} from '@/ZaionsStore/UserAccount/index.recoil';
import { useSetRecoilState } from 'recoil';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { UserAuthData } from '@/types/ZaionsApis.type';
import { ZIonButton } from '@/components/ZIonComponents';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

// Style

const ZaionsLoginForm: React.FC = () => {
	// state to change weather password shown on not.
	const [canViewPassword, setCanViewPassword] = useState<boolean>(false);

	// Store user data in ZaionsUserAccountRStateAtom recoil state.
	const setUserAccountStateAtom = useSetRecoilState(
		ZaionsUserAccountRStateAtom
	);

	// recoil state for storing auth data
	const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

	// Custom hooks.
	const { presentZIonErrorAlert } = useZIonErrorAlert(); // hook to show alert
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(); // hook to show loader
	const { zNavigatePushRoute } = useZNavigate(); // hook to navigate

	// Formik submit function.
	const FormikSubmissionHandler = async (
		_values: { [key: string]: unknown },
		resetForm: resetFormType,
		setErrors: FormikSetErrorsType
	) => {
		try {
			// Loading start...
			await presentZIonLoader('Logging in. please wait a second.');

			// registering data
			const __response = await zAxiosApiRequest<UserAuthData>({
				_url: API_URL_ENUM.login,
				_method: 'post',
				_isAuthenticatedRequest: false,
				_data: zStringify({
					email: _values.emailAddress,
					password: _values.password,
				}),
			});
			// Checking if the __response is available.
			if (
				__response &&
				__response.success &&
				__response.data.token.plainTextToken
			) {
				// getting user data.
				const userData = getUserDataObjectForm(__response.data.user);

				// Storing user token at userAccountAuthToken State.
				const userToken = {
					token: __response.data.token.plainTextToken,
				};

				// Set user data && user token to localstorage.
				if (userData && userToken) {
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

					// Dismiss the ion loader
					await dismissZIonLoader();

					// If success then show the success notification.
					showSuccessNotification(MESSAGES.GENERAL.LOGIN_SUCCESSFULLY);

					// reset form.
					resetForm();

					// redirect to profile. (old 30/5/2023)
					// zNavigatePushRoute(
					// 	replaceParams(
					// 		ZaionsRoutes.AdminPanel.LinkInBio.Main,
					// 		CONSTANTS.RouteParams.folderIdToGetShortLinks,
					// 		''
					// 	)
					// );

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
			zConsoleError({ err: error });
			await dismissZIonLoader();
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
						emailAddress: '',
						password: '',
					}}
					// Validations of sign up form fields
					validate={(values) => {
						try {
							const errors: {
								emailAddress?: string;
								password?: string;
							} = {};

							validateFields(['emailAddress', 'password'], values, errors, [
								VALIDATION_RULE.email,
								VALIDATION_RULE.password,
							]);
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
						await FormikSubmissionHandler(values, resetForm, setErrors);
					}}
				>
					{({
						handleChange,
						handleBlur,
						values,
						touched,
						errors,
						submitForm,
					}) => (
						<>
							{/* Email Address Field */}
							<ZIonInput
								className={classNames({
									'mb-4': true,

									'ion-touched ion-invalid':
										touched.emailAddress && errors.emailAddress,
									'ion-touched ion-valid':
										touched.emailAddress && !errors.emailAddress,
								})}
								name='emailAddress'
								label='Email Address'
								labelPlacement='floating'
								type='email'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.emailAddress}
								errorText={errors.emailAddress}
							/>

							{/* Password Field */}
							<div className='flex ion-align-items-center'>
								<ZIonInput
									className={classNames({
										'ion-touched ion-invalid':
											touched.password && errors.password,
										'ion-touched ion-valid':
											touched.password && !errors.password,
									})}
									name='password'
									label='Password'
									labelPlacement='floating'
									type={canViewPassword ? 'text' : 'password'}
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values.password}
									errorText={errors.password}
								/>
								<ZIonButton
									fill='clear'
									size='large'
									className='ion-no-padding ms-3 zaions__max_content'
									onClick={() => setCanViewPassword((OldVal) => !OldVal)}
									mode='ios'
								>
									<ZIonIcon
										icon={canViewPassword ? eyeOffOutline : eyeOutline}
									/>
								</ZIonButton>
							</div>

							<div className='ion-text-end'>
								<ZIonButton
									fill='clear'
									className='ion-no-padding ion-no-margin ion-text-capitalize text-decoration-underline'
									mode='ios'
									routerLink={ZaionsRoutes.PasswordResetEmailForm}
								>
									Forgot your password?
								</ZIonButton>
							</div>

							{/* Submit Button */}
							<ZIonButton
								expand='block'
								className='mt-4 ion-text-capitalize'
								onClick={() => void submitForm()}
							>
								Log in
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
						</>
					)}
				</Formik>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZaionsLoginForm;
