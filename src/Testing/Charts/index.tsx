import React from 'react';

import {
  ZIonButton,
  ZIonContent,
  ZIonFooter,
  ZIonHeader,
  ZIonTitle,
} from '@/components/ZIonComponents';
import ZaionsIonPage from '@/components/ZaionsIonPage';

const ChartsExamples: React.FC = () => {
  return (
    <ZaionsIonPage>
      <>
        <ZIonHeader>
          <ZIonTitle>Charts</ZIonTitle>
        </ZIonHeader>
        <ZIonContent>
          <ZIonButton>View Chart</ZIonButton>
          <ZIonTitle>
            We will use tanstack react charts to display charts in our app.
          </ZIonTitle>
        </ZIonContent>
        <ZIonFooter>
          <ZIonTitle>Charts Okay :)</ZIonTitle>
        </ZIonFooter>
      </>
    </ZaionsIonPage>
  );
};

export default ChartsExamples;
