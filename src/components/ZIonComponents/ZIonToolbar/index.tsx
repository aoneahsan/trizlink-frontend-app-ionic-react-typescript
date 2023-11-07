// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonToolbar } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonToolbarType {
  children: ReactNode;
  color?: ZIonColorType;
  className?: string;
  mode?: ZIonModeType;
}

const ZIonToolbar: React.FC<ZIonToolbarType> = (props: ZIonToolbarType) => {
  return <IonToolbar {...props}>{props.children}</IonToolbar>;
};

export default ZIonToolbar;
