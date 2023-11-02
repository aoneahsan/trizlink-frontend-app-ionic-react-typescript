// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonList } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonListType {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  lines?: 'full' | 'inset' | 'none';
  mode?: ZIonModeType;
  slot?: string;
  color?: ZIonColorType;
  style?: Record<string, unknown>;
}

const ZIonList: React.FC<ZIonListType> = (props: ZIonListType) => {
  return <IonList {...props}>{props.children}</IonList>;
};

export default ZIonList;
