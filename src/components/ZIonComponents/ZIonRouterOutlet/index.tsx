// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRouterOutlet } from '@ionic/react';

// Type
interface ZIonRouterOutletType {
  children?: ReactNode;
  className?: string;
}

const ZIonRouterOutlet: React.FC<ZIonRouterOutletType> = (
  props: ZIonRouterOutletType
) => {
  return <IonRouterOutlet {...props}>{props.children}</IonRouterOutlet>;
};

export default ZIonRouterOutlet;
