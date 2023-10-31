// Core Imports
import React from 'react';

// Packages Import

// Custom Imports
import { ZIonCol } from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const GdprPopup: React.FC = () => {
  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className='py-3 border zaions__bg_white'>
      {/* <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
        <ZIonIcon
          icon={shieldCheckmarkOutline}
          size='large'
        />
        <ZIonText>
          <h6 className='font-bold ion-no-margin ion-padding-start'>
            GDPR popup
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </h6>
        </ZIonText>
      </div>
      <div className='block px-3 mt-5 mb-4'>
        <ZIonText>
          You can't access this feature if you don't complete your
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            privacy profile.
          </ZIonRouterLink>
        </ZIonText>
      </div> */}
    </ZIonCol>
  );
};

export default GdprPopup;
