// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonFooter } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
interface ZIonFooterType {
  children: ReactNode;
  className?: string;
  collapse?: 'fade';
  mode?: ZIonModeType;
  translucent?: boolean;
}

const ZIonFooter: React.FC<ZIonFooterType> = (props: ZIonFooterType) => {
  return <IonFooter {...props}>{props.children}</IonFooter>;
};

export default ZIonFooter;
