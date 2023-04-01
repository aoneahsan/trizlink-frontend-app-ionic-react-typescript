// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonFooter } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonFooterType = {
  children: ReactNode;
  className?: string;
  collapse?: 'fade';
  mode?: ZIonModeType;
  translucent?: boolean;
};

const ZIonFooter = (props: ZIonFooterType) => {
  return <IonFooter {...props}>{props.children}</IonFooter>;
};

export default ZIonFooter;
