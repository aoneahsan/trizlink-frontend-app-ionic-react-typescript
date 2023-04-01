// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRefresher, RefresherEventDetail } from '@ionic/react';
import { IonRefresherCustomEvent } from '@ionic/core/dist/types/components';

// Type
type ZIonRefresherType = {
  children: ReactNode;
  className?: string;
  closeDuration?: string;
  disabled?: boolean;
  pullFactor?: number;
  pullMax?: number;
  pullMin?: number;
  snapbackDuration?: string;
  onIonPull?: (event: IonRefresherCustomEvent<void>) => void;
  onIonRefresh?: (event: IonRefresherCustomEvent<RefresherEventDetail>) => void;
  onIonStart?: (event: IonRefresherCustomEvent<void>) => void;
};

const ZIonRefresher = (props: ZIonRefresherType) => {
  return (
    <IonRefresher {...props} slot='fixed'>
      {props.children}
    </IonRefresher>
  );
};

export default ZIonRefresher;
