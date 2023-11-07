// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonCardSubtitle } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonCardSubtitleType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  mode?: ZIonModeType;
}

const ZIonCardSubtitle: React.FC<ZIonCardSubtitleType> = (
  props: ZIonCardSubtitleType
) => {
  return (
    <IonCardSubtitle
      {...props}
      style={props.style}>
      {props.children}
    </IonCardSubtitle>
  );
};

export default ZIonCardSubtitle;
