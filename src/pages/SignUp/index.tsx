// Core Imports
import React from 'react';

// Package Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsSignUpForm from '@/components/ZaionsSignUpPage/ZaionsSignUpForm';
import { ZIonContent, ZIonGrid } from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

const SignUp: React.FC = () => {
  return (
    <ZIonPage pageTitle='Login Page'>
      {/* Page Content */}
      <ZIonContent fullscreen>
        <ZaionsSecondaryHeader />
        <ZIonGrid>
          <ZaionsSignUpForm />
        </ZIonGrid>
      </ZIonContent>
    </ZIonPage>
  );
};

export default SignUp;
