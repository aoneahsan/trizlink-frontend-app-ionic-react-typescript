// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonContent } from '@ionic/react';

// Type
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

type ZIonContentType = {
  children: ReactNode;
  color?: ZIonColorType;
  forceOverscroll?: boolean;
  fullscreen?: boolean;
  scrollEvents?: boolean;
  scrollX?: boolean;
  scrollY?: boolean;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonContent = (props: ZIonContentType) => {
  return <IonContent {...props}>{props.children}</IonContent>;
};

export default ZIonContent;
