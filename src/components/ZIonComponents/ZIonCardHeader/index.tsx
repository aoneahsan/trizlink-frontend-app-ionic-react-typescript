// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonCardHeader } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonCardHeaderType {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  translucent?: boolean;
  style?: Record<string, unknown>;
}

const ZIonCardHeader: React.FC<ZIonCardHeaderType> = (
  props: ZIonCardHeaderType
) => {
  return <IonCardHeader {...props}>{props.children}</IonCardHeader>;
};

export default ZIonCardHeader;
