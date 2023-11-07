// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonCardTitle } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonCardTitleType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  mode?: ZIonModeType;
}

const ZIonCardTitle: React.FC<ZIonCardTitleType> = (
  props: ZIonCardTitleType
) => {
  return (
    <IonCardTitle
      {...props}
      style={props.style}>
      {props.children}
    </IonCardTitle>
  );
};

export default ZIonCardTitle;
