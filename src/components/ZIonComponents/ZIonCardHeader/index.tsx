// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCardHeader } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonCardHeaderType = {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  translucent?: boolean;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonCardHeader = (props: ZIonCardHeaderType) => {
  return <IonCardHeader {...props}>{props.children}</IonCardHeader>;
};

export default ZIonCardHeader;
