// Core Imports
import React from 'react';

// Package Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsLoginOptions from '@/components/ZaionsLoginPage/ZaionsLoginOptions';
import ZaionsLoginForm from '@/components/ZaionsLoginPage/ZaionsLoginForm';
import {
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonRow
} from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

//
const Login: React.FC = () => {
  return (
    <ZIonPage pageTitle='Login Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsSecondaryHeader />
        <ZIonGrid>
          <ZaionsLoginOptions />

          <ZIonRow>
            <ZIonCol
              className='mx-auto ion-text-center'
              size='4.2'
              sizeLg='5'
              sizeMd='6.2'
              sizeSm='8.2'
              sizeXs='11.9'>
              <ZaionsLoginForm />
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonContent>
    </ZIonPage>
  );
};

export default Login;
