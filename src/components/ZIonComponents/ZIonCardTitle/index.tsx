// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonCardTitle } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonCardTitleType = {
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  color?: ZIonColorType;
  mode?: ZIonModeType;
};

const ZIonCardTitle = (props: ZIonCardTitleType) => {
  return (
    <IonCardTitle {...props} style={props.style}>
      {props.children}
    </IonCardTitle>
  );
};

export default ZIonCardTitle;
