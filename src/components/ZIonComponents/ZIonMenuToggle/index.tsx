// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonMenuToggle } from '@ionic/react';

// Type
type ZIonMenuToggleType = {
  children: ReactNode;
  className?: string;
  autoHide?: boolean;
  menu?: string;
};

const ZIonMenuToggle = (props: ZIonMenuToggleType) => {
  return <IonMenuToggle {...props}>{props.children}</IonMenuToggle>;
};

export default ZIonMenuToggle;
