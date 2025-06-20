// Core Imports
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { BRACKPOINT_LG } from '@/utils/constants';

// Packages Import

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonItem,
  ZIonInput,
  ZIonNote,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants

// Images
import { drawCustomdomain } from '@/assets/images';

// Recoil States

// Types

// Styles

const APSettingsCustomDomain: React.FC = () => {
  const isLgScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_LG})`
  });

  return (
    <>
      <ZIonRow className='px-4 py-4 mx-4 mt-5 zaions__bg_white'>
        {' '}
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'>
          <ZIonText
            className='p-0 mb-2 font-bold'
            color={'primary'}>
            Customize your own domain name
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            Customize your own domain name to get links like links.company.com
            instead of hi.zaions.com.
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            To get your own domain name, follow the steps below.
          </ZIonText>
        </ZIonCol>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'>
          <div className=''>
            <ZIonImg
              src={drawCustomdomain}
              className={`mx-auto ${!isLgScale ? 'w-full mt-5' : 'w-[60%] '}`}
            />
          </div>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow className='mx-4 mt-5'>
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className='px-4 py-4 rounded zaions__bg_white me-2'>
          <ZIonText className='p-0 mb-2 font-bold'>
            How add your domain name?
          </ZIonText>
          <ZIonText
            className='block mt-2'
            color={'medium'}>
            1. Login to your hosting domain provider
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            2. In the domain settings section, look for DNS settings.
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            3. Once you are in the DNS settings, create a CNAME record of your
            choice that point to links.zaions.com. (
            <ZIonRouterLink>learn more</ZIonRouterLink>
            ).
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            4. Wait for the DNS propagation.
          </ZIonText>
          <ZIonText
            className='block mt-3'
            color={'medium'}>
            5. Add your subdomain to the &quot;Add your own custom domain
            name&quot; section on the right.
          </ZIonText>
        </ZIonCol>
        <ZIonCol
          sizeXl=''
          sizeLg=''
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={`${!isLgScale ? 'mt-3' : 'ms-2'}`}>
          <div className='px-4 py-4 rounded zaions__bg_white'>
            <ZIonText
              className='p-0 mb-2 font-bold'
              color={'primary'}>
              How add your domain name?
            </ZIonText>
            <div className='flex mb-3 ion-align-items-center'>
              <ZIonItem
                slot='start'
                className='w-[88%] me-auto'>
                <ZIonInput
                  label='link.yourBrand.com'
                  labelPlacement='floating'
                />
                <ZIonNote slot='helper'>
                  It can be a subdomain (app.yourDomain.com)
                </ZIonNote>
                {/* <ZIonNote slot='error'>{}</ZIonNote> */}
              </ZIonItem>
              <ZIonButton
                slot='end'
                className='ion-text-capitalize ms-3'>
                Add
              </ZIonButton>
            </div>
            <ZIonText
              className='p-0 mb-2 font-bold'
              color={'primary'}>
              Your domain(s)
            </ZIonText>
            <ZIonText className='block mt-3'>
              You don&apos;t have any custom domain
            </ZIonText>
          </div>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default APSettingsCustomDomain;
