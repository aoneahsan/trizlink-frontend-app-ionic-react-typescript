// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTitle } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonTitleType = {
  children: ReactNode;
  color?: ZIonColorType;
  size?: 'large' | 'small' | undefined;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonTitle = (props: ZIonTitleType) => {
  return <IonTitle {...props}>{props.children}</IonTitle>;
};

export default ZIonTitle;
