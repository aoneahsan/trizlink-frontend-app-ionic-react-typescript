// Core Imports
import React from 'react';

// Packages Imports
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonRow,
  ZIonTitle,
} from 'components/ZIonComponents';

// Type
import { LinkInBioSingleBlockContentType } from 'types/AdminPanel/linkInBioType/blockTypes';

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
            <ZIonLabel position='floating'>First name</ZIonLabel>
            <ZIonInput
              name='vcard.firstName'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.firstName}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Last Name */}
        <ZIonCol size='5.5'>
          <ZIonItem>
            <ZIonLabel position='floating'>Last name</ZIonLabel>
            <ZIonInput
              name='vcard.lastName'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.lastName}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Mobile */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Mobile</ZIonLabel>
            <ZIonInput
              name='vcard.mobile'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.mobile}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Phone */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Phone</ZIonLabel>
            <ZIonInput
              name='vcard.phone'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.phone}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Fax */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Fax</ZIonLabel>
            <ZIonInput
              name='vcard.fax'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.fax}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Email */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Email</ZIonLabel>
            <ZIonInput
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
            <ZIonLabel position='floating'>Company</ZIonLabel>
            <ZIonInput
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
            <ZIonLabel position='floating'>Your Job</ZIonLabel>
            <ZIonInput
              name='vcard.job'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.job}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Street */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Street</ZIonLabel>
            <ZIonInput
              name='vcard.street'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.street}
            />
          </ZIonItem>
        </ZIonCol>

        {/* City */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>City</ZIonLabel>
            <ZIonInput
              name='vcard.city'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.city}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Zip */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Zip</ZIonLabel>
            <ZIonInput
              name='vcard.zip'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.zip}
            />
          </ZIonItem>
        </ZIonCol>

        {/* State */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>State</ZIonLabel>
            <ZIonInput
              name='vcard.state'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.state}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Country */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Country</ZIonLabel>
            <ZIonInput
              name='vcard.country'
              onIonChange={handleChange}
              onIonBlur={handleBlur}
              value={values.vcard?.country}
            />
          </ZIonItem>
        </ZIonCol>

        {/* Website */}
        <ZIonCol size='5.5' className='mt-3'>
          <ZIonItem>
            <ZIonLabel position='floating'>Website</ZIonLabel>
            <ZIonInput
              name='vcard.website'
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
