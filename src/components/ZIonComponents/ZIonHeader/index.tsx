// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonHeader } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
interface ZIonHeaderType {
  children: ReactNode;
  className?: string;
  collapse?: 'condense' | 'fade';
  mode?: ZIonModeType;
  translucent?: boolean;
}

const ZIonHeader: React.FC<ZIonHeaderType> = (props: ZIonHeaderType) => {
  return <IonHeader {...props}>{props.children}</IonHeader>;
};

export default ZIonHeader;
