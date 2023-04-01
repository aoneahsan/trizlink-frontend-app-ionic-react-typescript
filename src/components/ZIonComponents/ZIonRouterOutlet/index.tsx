// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRouterOutlet } from '@ionic/react';

// Type
type ZIonRouterOutletType = {
  children?: ReactNode;
  className?: string;
};

const ZIonRouterOutlet = (props: ZIonRouterOutletType) => {
  return <IonRouterOutlet {...props}>{props.children}</IonRouterOutlet>;
};

export default ZIonRouterOutlet;
