// Core Imports
import React from 'react';

// Package Imports
import { Formik } from 'formik';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonTitle,
	ZIonInput,
	ZIonNote,
	ZIonImg,
} from '@/components/ZIonComponents';

// Global Constants
import { validateFields, zConsoleLog } from '@/utils/helpers';
import { VALIDATION_RULE } from '@/utils/enums';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import { ProductLogo } from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Style

const ZaionsPasswordResetConfirm: React.FC = () => {
	return (
		<ZaionsIonPage>
			<ZIonContent color='light'>
				<ZIonGrid className=''>
					<ZIonRow className='ion-justify-content-center ion-align-items-top '>
						<ZIonCol
							className='ion-text-start border py-5 zaions__bg_white mt-5'
							sizeXl='4'
							sizeLg='5'
							sizeMd='6.2'
							sizeSm='8.2'
							sizeXs='11.5'
						>
							<div className='zaions__w80 mx-auto'>
								<ZIonImg src={ProductLogo} className='logo mx-auto' />
								<ZIonTitle color='dark'>
									<h5 className='ion-text-center mt-4 mb-3'>
										FORGOT YOUR PASSWORD?
									</h5>
								</ZIonTitle>
								<ZIonText>
									It happens to the best of us. Enter your email or username to
									request a password reset link.
								</ZIonText>
							</div>
							<Formik
								// Initial Values of sign up form fields
								initialValues={{
									emailAddress: '',
								}}
								// Validations of sign up form fields
								validate={(values) => {
									try {
										const errors: {
											emailAddress?: string;
										} = {};

										validateFields(['emailAddress'], values, errors, [
											VALIDATION_RULE.email,
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
								// Submit action
								onSubmit={(values) => {
									try {
										zConsoleLog({
											data: {
												log: 'From components - InPageComponents - ZaionsLoginPage - ZaionsSignUpForm Formik onSubmit Try',
												values,
											},
										});
									} catch (error) {
										console.error({
											errorPlacement:
												'From components - InPageComponents - ZaionsLoginPage - ZaionsSignUpForm Formik onSubmit Catch',
											error,
										});
									}
								}}
							>
								{({ handleChange, handleBlur, values, touched, errors }) => (
									<>
										{/* Email Address Field */}
										{/* <ZIonInput
											
										/> */}
										<ZIonInputField
											inputFieldProps={{
												className: classNames({
													'mb-4 zaions__w80 mx-auto mt-4': true,
													'ion-touched ion-invalid':
														touched.emailAddress && errors.emailAddress,
													'ion-touched ion-valid':
														touched.emailAddress && !errors.emailAddress,
												}),
												label: 'Username or Email Address:',
												labelPlacement: 'floating',
												name: 'emailAddress',
												type: 'email',
												onIonChange: handleChange,
												onIonBlur: handleBlur,
												value: values.emailAddress,
												errorText: errors.emailAddress,
											}}
										/>

										{/* Submit Button */}
										<ZIonButton
											expand='block'
											className='ion-text-capitalize mt-4 zaions__w80 mx-auto mt-3 mb-5'
										>
											Log in
										</ZIonButton>
									</>
								)}
							</Formik>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZaionsPasswordResetConfirm;
