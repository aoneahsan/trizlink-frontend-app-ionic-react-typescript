// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonList } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonListType = {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  lines?: 'full' | 'inset' | 'none';
  mode?: ZIonModeType;
  slot?: string;
  color?: ZIonColorType;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonList = (props: ZIonListType) => {
  return <IonList {...props}>{props.children}</IonList>;
};

export default ZIonList;
