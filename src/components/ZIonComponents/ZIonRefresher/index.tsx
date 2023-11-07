// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRefresher, type RefresherEventDetail } from '@ionic/react';
import { type IonRefresherCustomEvent } from '@ionic/core/dist/types/components';

// Type
interface ZIonRefresherType {
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
}

const ZIonRefresher: React.FC<ZIonRefresherType> = (
  props: ZIonRefresherType
) => {
  return (
    <IonRefresher
      {...props}
      slot='fixed'>
      {props.children}
    </IonRefresher>
  );
};

export default ZIonRefresher;
