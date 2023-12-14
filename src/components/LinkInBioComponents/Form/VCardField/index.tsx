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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
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
            minHeight='2.5rem'
          />
        </ZIonCol>
      </ZIonRow>
    </ZIonCol>
  );
};

export default LinkInBioVCardField;
