// Core Import
import React from 'react';

// Packages Import
import { IonicSafeString, IonRefresherContent } from '@ionic/react';

// Type
type ZIonRefresherContentType = {
  className?: string;
  pullingIcon?: null | string | undefined;
  pullingText?: IonicSafeString | string | undefined;
  refreshingSpinner?:
    | 'bubbles'
    | 'circles'
    | 'circular'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-sharp'
    | 'lines-sharp-small'
    | 'lines-small'
    | null
    | undefined;
  refreshingText?: IonicSafeString | string | undefined;
};

const ZIonRefresherContent = (props: ZIonRefresherContentType) => {
  return <IonRefresherContent {...props} />;
};

export default ZIonRefresherContent;
