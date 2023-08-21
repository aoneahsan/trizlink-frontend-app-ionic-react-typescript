// Core Imports
import React from 'react';

// Packages Imports
import { Formik } from 'formik';
import PhoneInput, {
	formatPhoneNumberIntl,
	isPossiblePhoneNumber,
} from 'react-phone-number-input';

// Custom Imports
import { ZIonCol, ZIonNote } from '@/components/ZIonComponents';

// Global constant

import 'react-phone-number-input/style.css';

const ZaionsTestPage: React.FC = () => {
	return (
		<ZIonCol
			sizeXl='12'
			sizeLg='12'
			sizeMd='12'
			sizeSm='12'
			sizeXs='12'
			className='py-3'
		>
			<Formik
				initialValues={{
					pn1: '',
				}}
				validate={(values) => {
					const errors: {
						pn1?: string;
					} = {};

					if (values.pn1.trim().length === 0) {
						errors.pn1 = 'phone number is required.';
					} else if (!isPossiblePhoneNumber(values.pn1)) {
						errors.pn1 = 'not a valid phone number.';
					} else {
						delete errors.pn1;
					}

					return errors;
				}}
				onSubmit={() => {}}
			>
				{({ values, errors, touched, setFieldValue, setFieldTouched }) => {
					console.log({
						values,
						errors,
						touched,
					});
					return (
						<>
							<div className='border'>
								<PhoneInput
									placeholder='Enter phone number'
									value={formatPhoneNumberIntl(values.pn1)}
									onBlur={() => {
										setFieldTouched('pn1', true, true);
									}}
									onChange={(_value) => {
										setFieldValue('pn1', _value, false);
									}}
								/>
								{touched.pn1 && errors.pn1 && errors.pn1?.length > 0 && (
									<ZIonNote color='danger'>{errors.pn1}</ZIonNote>
								)}
							</div>
						</>
					);
				}}
			</Formik>
		</ZIonCol>
	);
};

export default ZaionsTestPage;
