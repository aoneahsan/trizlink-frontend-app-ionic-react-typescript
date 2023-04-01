// Core Imports
import React, { ReactNode } from 'react';

// Packages Import
import { IonLabel } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
type ZIonLabelType = {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  position?: 'fixed' | 'floating' | 'stacked';
  className?: string;
  onClick?: () => void;
};

const ZIonLabel = (props: ZIonLabelType) => {
  return <IonLabel {...props}>{props.children}</IonLabel>;
};

export default ZIonLabel;
