// Core Imports
import React from 'react';

// Packages Imports
import { useFormikContext } from 'formik';

// Custom Imports
import {
	ZIonCol,
	ZIonInput,
	ZIonItem,
	ZIonRow,
	ZIonTitle,
} from '@/components/ZIonComponents';

// Type
import { LinkInBioSingleBlockContentType } from '@/types/AdminPanel/linkInBioType/blockTypes';

// Styles

// Component Type

const LinkInBioVCardField: React.FC = () => {
	const { values, handleBlur, handleChange } =
		useFormikContext<LinkInBioSingleBlockContentType>();
	return (
		<ZIonCol
			size='11'
			className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'
		>
			<ZIonTitle className='fw-bold zaions__fs_16 ion-no-padding'>
				📄 vCard
			</ZIonTitle>

			<ZIonRow className='ion-justify-content-between pb-4'>
				{/* First Name */}
				<ZIonCol size='5.5'>
					<ZIonItem>
						<ZIonInput
							name='vcard.firstName'
							label='First name'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.firstName}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Last Name */}
				<ZIonCol size='5.5'>
					<ZIonItem>
						<ZIonInput
							name='vcard.lastName'
							label='Last name'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.lastName}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Mobile */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.mobile'
							label='Mobile'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.mobile}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Phone */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.phone'
							label='Phone'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.phone}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Fax */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.fax'
							label='Fax'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.fax}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Email */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							label='Email'
							labelPlacement='floating'
							name='vcard.email'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.email}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Company */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							label='Company'
							labelPlacement='floating'
							name='vcard.company'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.company}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Your Job */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.job'
							label='Your Job'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.job}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Street */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.street'
							label='Street'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.street}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* City */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.city'
							label='City'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.city}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Zip */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.zip'
							label='Zip'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.zip}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* State */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.state'
							label='State'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.state}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Country */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.country'
							label='Country'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.country}
						/>
					</ZIonItem>
				</ZIonCol>

				{/* Website */}
				<ZIonCol size='5.5' className='mt-3'>
					<ZIonItem>
						<ZIonInput
							name='vcard.website'
							label='Website'
							labelPlacement='floating'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.vcard?.website}
						/>
					</ZIonItem>
				</ZIonCol>
			</ZIonRow>
		</ZIonCol>
	);
};

export default LinkInBioVCardField;
