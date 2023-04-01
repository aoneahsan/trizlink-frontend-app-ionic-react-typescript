// Core Imports
import React from 'react';

// Packages Import
import { IonToggle } from '@ionic/react';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const APSettingspassword: React.FC = () => {
  return (
    <>
      <ZIonRow className='py-4 px-4 zaions__bg_white mx-4 mt-5 ion-align-items-center mb-3'>
        <ZIonCol sizeXl='4' sizeLg='5' sizeMd='6' sizeSm='8' sizeXs='12'>
          <ZIonText className='p-0 mb-2 fw-bold' color={'dark'}>
            Pop-up with logo <ZIonRouterLink>(learn more)</ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
        <ZIonCol className='ion-text-end'>
          <IonToggle />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default APSettingspassword;
