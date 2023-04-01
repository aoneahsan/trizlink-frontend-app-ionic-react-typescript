// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { IonPage } from '@ionic/react';
// import { Auth } from 'aws-amplify';
// import classNames from 'classnames';
// import { ZIonButton, ZIonCol, ZIonContent, ZIonGrid, ZIonHeader, ZIonInput, ZIonItem, ZIonLabel, ZIonNote, ZIonRow, ZIonTitle } from '@/components/ZIonComponents';
// import { Form, Formik } from 'formik';
// import React, { useState } from 'react';
// import { VALIDATION_RULE } from '@/utils/enums';
// import { validateFields } from '@/utils/helpers';
// import MESSAGES from '@/utils/messages';
// import { useZIonAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';

// enum AUTH_MODE {
// 	LOGIN,
// 	REGISTER,
// }

// type AMPLIFY_ERROR_TYPE = {
// 	code: string;
// 	message: string;
// 	name: string;
// 	stack: string;
// };

// const AwsAmplifyBlogProjectGuestPage: React.FC = () => {
// 	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
// 	const { presentZIonAlert } = useZIonAlert();
// 	const [compState, setCompState] = useState({ authMode: AUTH_MODE.LOGIN });

// 	const handleAuthRequest = async (email: string, password: string) => {
// 		await presentZIonLoader(MESSAGES.GENERAL.PROCESSING_LOGIN);

// 		let errorOccurred;
// 		try {
// 			const _resInput = {
// 				password,
// 				username: email,
// 			};
// 			if (compState.authMode === AUTH_MODE.LOGIN) {
// 				await Auth.signIn(_resInput);
// 			} else {
// 				await Auth.signUp({
// 					..._resInput,
// 				});
// 			}
// 		} catch (error) {
// 			errorOccurred = error as AMPLIFY_ERROR_TYPE;
// 			console.error({
// 				message: 'AwsAmplifyBlogProjectGuestPage - handleAuthRequest - error',
// 				error,
// 				code: errorOccurred.code,
// 			});
// 		}
// 		await dismissZIonLoader();

// 		if (errorOccurred) {
// 			await presentZIonAlert({
// 				header: 'Error Occurred!',
// 				subHeader: errorOccurred.name,
// 				message: errorOccurred.message,
// 				buttons: [
// 					{
// 						text: 'Okay',
// 						role: 'dismiss',
// 					},
// 				],
// 			});
// 			return false;
// 		}

// 		return true;
// 	};

// 	const switchAuthMode = () => {
// 		try {
// 			setCompState((oldVal) => ({
// 				...oldVal,
// 				authMode:
// 					oldVal.authMode === AUTH_MODE.LOGIN
// 						? AUTH_MODE.REGISTER
// 						: AUTH_MODE.LOGIN,
// 			}));
// 		} catch (error) {
// 			console.error({
// 				message: 'AwsAmplifyBlogProjectGuestPage - switchAuthMode - failed',
// 				error,
// 			});
// 		}
// 	};

// 	return (
// 		<>
// 			<IonPage>
// 				<ZIonHeader>
// 					<ZIonTitle className='ion-text-center'>
// 						{compState.authMode === AUTH_MODE.LOGIN ? 'Login' : 'Register'} Form
// 					</ZIonTitle>
// 				</ZIonHeader>
// 				<ZIonContent>
// 					<ZIonGrid>
// 						<ZIonRow>
// 							<ZIonCol size='3' />
// 							<ZIonCol size='12' sizeMd='6'>
// 								<ZIonTitle className='ion-margin-bottom ion-margin-top ion-text-center'>
// 									{compState.authMode === AUTH_MODE.LOGIN
// 										? 'Login'
// 										: 'Register'}{' '}
// 									to see the authenticated pages
// 								</ZIonTitle>
// 								<Formik
// 									initialValues={{
// 										email: '',
// 										password: '',
// 									}}
// 									validate={(values) => {
// 										const errors: { email?: string; password?: string } = {};

// 										validateFields(['email', 'password'], values, errors, [
// 											VALIDATION_RULE.email,
// 											VALIDATION_RULE.password,
// 										]);

// 										return errors;
// 									}}
// 									onSubmit={async (values, { resetForm }) => {
// 										const _resetFormField = await handleAuthRequest(
// 											values.email,
// 											values.password
// 										);

// 										_resetFormField && resetForm();
// 									}}
// 								>
// 									{({
// 										touched,
// 										errors,
// 										handleChange,
// 										isSubmitting,
// 										isValid,
// 										setFieldValue,
// 										setFieldTouched,
// 										values,
// 									}) => {
// 										return (
// 											<>
// 												<Form>
// 													<ZIonItem
// 														className={classNames({
// 															'ion-invalid': touched.email && errors.email,
// 															'ion-valid': touched.email && !errors.email,
// 														})}
// 													>
// 														<ZIonLabel position='floating'>Email</ZIonLabel>
// 														<ZIonInput
// 															name='email'
// 															type='email'
// 															onIonChange={handleChange}
// 															value={values.email}
// 														/>
// 														<ZIonNote slot='error'>{errors.email}</ZIonNote>
// 													</ZIonItem>
// 													<ZIonItem
// 														className={classNames({
// 															'ion-invalid':
// 																touched.password && errors.password,
// 															'ion-valid': touched.password && !errors.password,
// 														})}
// 													>
// 														<ZIonLabel position='floating'>Password</ZIonLabel>
// 														<ZIonInput
// 															name='password'
// 															type='password'
// 															onIonChange={handleChange}
// 															value={values.password}
// 														/>
// 														<ZIonNote slot='error'>{errors.password}</ZIonNote>
// 													</ZIonItem>
// 													<ZIonItem lines='none'>
// 														<ZIonButton
// 															expand='block'
// 															size='default'
// 															disabled={!isValid || isSubmitting}
// 															type='submit'
// 														>
// 															{compState.authMode === AUTH_MODE.LOGIN
// 																? 'Login'
// 																: 'Register'}
// 														</ZIonButton>
// 														<ZIonButton
// 															expand='block'
// 															size='default'
// 															disabled={isSubmitting}
// 															type='button'
// 															onClick={switchAuthMode}
// 														>
// 															Switch Auth Mode
// 														</ZIonButton>
// 														<ZIonButton
// 															expand='block'
// 															size='default'
// 															disabled={isSubmitting}
// 															type='button'
// 															onClick={() => {
// 																setFieldTouched('email', true, false);
// 																setFieldTouched('password', true, false);
// 																setFieldValue(
// 																	'email',
// 																	'ahsan@zaions.com',
// 																	true
// 																);
// 																setFieldValue('password', '123456', true);
// 															}}
// 														>
// 															Use Demo Data
// 														</ZIonButton>
// 													</ZIonItem>
// 												</Form>
// 											</>
// 										);
// 									}}
// 								</Formik>
// 							</ZIonCol>
// 							<ZIonCol size='3' />
// 						</ZIonRow>
// 					</ZIonGrid>
// 				</ZIonContent>
// 			</IonPage>
// 		</>
// 	);
// };

// export default AwsAmplifyBlogProjectGuestPage;
export {};
