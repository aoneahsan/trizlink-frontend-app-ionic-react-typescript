// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonToolbar } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonToolbarType = {
  children: ReactNode;
  color?: ZIonColorType;
  className?: string;
  mode?: ZIonModeType;
};

const ZIonToolbar = (props: ZIonToolbarType) => {
  return <IonToolbar {...props}>{props.children}</IonToolbar>;
};

export default ZIonToolbar;
