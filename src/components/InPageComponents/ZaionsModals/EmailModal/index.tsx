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
import isEmail from 'validator/lib/isEmail';
import { useSetRecoilState } from 'recoil';
import { closeOutline } from 'ionicons/icons';

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
	ZIonFooter,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import { getRandomKey } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountEmails } from '@/ZaionsStore/UserAccount/index.recoil';
import { ZIonButton } from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
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
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AddEmailModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const setNewEmailInUserAccount = useSetRecoilState(ZaionsUserAccountEmails);
	return (
		<>
			<Formik
				initialValues={{ email: '' }}
				validate={(values) => {
					const errors: {
						email?: string;
					} = {};

					if (!values.email.trim()) {
						errors.email = MESSAGES.GENERAL.FORM.FIELDS_INVALID.Email;
					} else if (!isEmail(values.email)) {
						errors.email = MESSAGES.GENERAL.FORM.FIELDS_INVALID.NOT_VALID_Email;
					}

					return errors;
				}}
				onSubmit={(values) => {
					setNewEmailInUserAccount((oldVals) =>
						oldVals
							? [
									...oldVals,
									{
										id: getRandomKey(),
										emailAddress: values.email,
										isPrimary: false,
										isVarified: false,
									},
							  ]
							: [
									{
										id: getRandomKey(),
										emailAddress: values.email,
										isPrimary: false,
										isVarified: false,
									},
							  ]
					);
					dismissZIonModal();
				}}
			>
				{({
					values,
					errors,
					handleChange,
					handleBlur,
					submitForm,
					isValid,
					touched,
				}) => (
					<>
						<ZIonContent className='ion-padding-vertical '>
							<ZIonRow className='ion-padding'>
								<ZIonCol className='flex flex-col ion-justify-content-end ion-align-items-center mt-3'>
									<ZIonTitle className='ion-no-padding mb-3'>
										<h3 className='font-bold'>Add a new email address</h3>
									</ZIonTitle>
									<ZIonText className='block'>
										A verification email will be sent to this address after
										clicking Save. New email addresses cannot be designated as
										primary until they have been verified.
									</ZIonText>
								</ZIonCol>
								<ZIonCol className='flex ion-justify-content-end ion-align-items-start ion-no-padding'>
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

							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'ion-margin-start ion-margin-end': true,
										'ion-touched ion-invalid': touched.email && errors.email,
										'ion-touched ion-valid': touched.email && !errors.email,
									}),
									label: 'Email address*',
									labelPlacement: 'floating',
									name: 'email',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.email,
									errorText: errors.email,
								}}
							/>
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
								color='tertiary'
								onClick={() => {
									if (isValid) {
										void submitForm();
									}
								}}
							>
								Save
							</ZIonButton>
						</ZIonFooter>
					</>
				)}
			</Formik>
		</>
	);
};

export default AddEmailModal;
