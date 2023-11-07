// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonReorder } from '@ionic/react';

interface ZIonReorderType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  slot?: 'start' | 'end';
}

const ZIonReorder: React.FC<ZIonReorderType> = (props: ZIonReorderType) => {
  return (
    <IonReorder
      {...props}
      color='primary'>
      {props.children}
    </IonReorder>
  );
};

export default ZIonReorder;
