// Core Imports
import React from 'react';

// Packages Imports
import { logoGoogle } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonRow,
} from 'components/ZIonComponents';

// Global Constants
import ZaionsRoutes from 'utils/constants/RoutesConstants';
import { ZIonButton } from 'components/ZIonComponents';

// Style

const ZaionsSignUpOptions: React.FC = () => {
  return (
    <>
      <ZIonRow>
        <ZIonCol
          className='d-flex justify-content-center mx-auto'
          sizeXl='6'
          sizeLg='6.7'
          sizeMd='7.5'
          sizeSm='10'
          sizeXs='12'
        >
          <div className='ion-text-center'>
            <ZIonText className='d-block'>
              <h2
                className='d-inline-block mb-3 fw-bold'
                style={{ color: '#4f565a' }}
              >
                Sign up and start shortening
              </h2>
            </ZIonText>
            <ZIonText className='d-block'>
              <ZIonText style={{ color: '#6c6d71' }}>
                Already have an account?
              </ZIonText>{' '}
              <ZIonRouterLink
                className='zaions__underline'
                routerLink={ZaionsRoutes.LoginRoute}
              >
                Login
              </ZIonRouterLink>{' '}
              .{' '}
              <ZIonRouterLink
                className='zaions__underline'
                routerLink={ZaionsRoutes.LoginRoute}
              >
                Log in with SSO
              </ZIonRouterLink>
            </ZIonText>
          </div>
          <div></div>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow>
        {/* <ZIonCol className="ion-text-center" size="3.6"> */}
        {/* </ZIonCol> */}
        <ZIonCol
          className='ion-text-center mx-auto mt-3'
          sizeXl='5'
          sizeLg='5.7'
          sizeMd='6.5'
          sizeSm='10'
          sizeXs='12'
        >
          <ZIonButton
            className='me-2 ion-text-capitalize'
            color='tertiary'
            expand={'block'}
          >
            <ZIonIcon icon={logoGoogle} className='me-1 fw-bold'></ZIonIcon>{' '}
            Sign Up with Google
          </ZIonButton>
        </ZIonCol>
        {/* <ZIonCol className="ion-text-center" size="3.6"></ZIonCol> */}
      </ZIonRow>
    </>
  );
};

export default ZaionsSignUpOptions;
