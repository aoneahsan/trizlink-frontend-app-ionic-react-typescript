// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonMenuToggle } from '@ionic/react';

// Type
interface ZIonMenuToggleType {
  children: ReactNode;
  className?: string;
  autoHide?: boolean;
  menu?: string;
  slot?: string;
}

const ZIonMenuToggle: React.FC<ZIonMenuToggleType> = (
  props: ZIonMenuToggleType
) => {
  return <IonMenuToggle {...props}>{props.children}</IonMenuToggle>;
};

export default ZIonMenuToggle;
