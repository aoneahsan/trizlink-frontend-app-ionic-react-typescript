// Core Imports
import React from 'react';

// Packages Imports
import { useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonInput,
  ZIonRow,
  ZIonTitle
} from '@/components/ZIonComponents';

// Type
import { type LinkInBioSingleBlockContentType } from '@/types/AdminPanel/linkInBioType/blockTypes';

// Styles

// Component Type

const LinkInBioVCardField: React.FC = () => {
  const { values, handleBlur, handleChange } =
    useFormikContext<LinkInBioSingleBlockContentType>();
  return (
    <ZIonCol
      size='11'
      className='ion-padding-vertical ion-margin-top ion-margin-start border-bottom__violet'>
      <ZIonTitle className='font-bold text-[16px] ion-no-padding'>
        📄 vCard
      </ZIonTitle>

      <ZIonRow className='pb-4 mt-4 ion-justify-content-between'>
        {/* First Name */}
        <ZIonCol size='5.5'>
          <ZIonInput
            name='vcard.firstName'
            label='First name'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.firstName}
          />
        </ZIonCol>

        {/* Last Name */}
        <ZIonCol size='5.5'>
          <ZIonInput
            name='vcard.lastName'
            label='Last name'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.lastName}
          />
        </ZIonCol>

        {/* Mobile */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.mobile'
            label='Mobile'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.mobile}
          />
        </ZIonCol>

        {/* Phone */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.phone'
            label='Phone'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.phone}
          />
        </ZIonCol>

        {/* Fax */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.fax'
            label='Fax'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.fax}
          />
        </ZIonCol>

        {/* Email */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            label='Email'
            labelPlacement='floating'
            name='vcard.email'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.email}
          />
        </ZIonCol>

        {/* Company */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            label='Company'
            labelPlacement='floating'
            name='vcard.company'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.company}
          />
        </ZIonCol>

        {/* Your Job */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.job'
            label='Your Job'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.job}
          />
        </ZIonCol>

        {/* Street */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.street'
            label='Street'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.street}
          />
        </ZIonCol>

        {/* City */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.city'
            label='City'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.city}
          />
        </ZIonCol>

        {/* Zip */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.zip'
            label='Zip'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.zip}
          />
        </ZIonCol>

        {/* State */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.state'
            label='State'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.state}
          />
        </ZIonCol>

        {/* Country */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.country'
            label='Country'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.country}
          />
        </ZIonCol>

        {/* Website */}
        <ZIonCol
          size='5.5'
          className='mt-3'>
          <ZIonInput
            name='vcard.website'
            label='Website'
            labelPlacement='floating'
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.vcard?.website}
          />
        </ZIonCol>
      </ZIonRow>
    </ZIonCol>
  );
};

export default LinkInBioVCardField;
