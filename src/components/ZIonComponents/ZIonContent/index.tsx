// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonContent } from '@ionic/react';

// Type
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';

interface ZIonContentType {
  children: ReactNode;
  color?: ZIonColorType;
  forceOverscroll?: boolean;
  fullscreen?: boolean;
  scrollEvents?: boolean;
  scrollX?: boolean;
  scrollY?: boolean;
  className?: string;
  style?: Record<string, unknown>;
}

const ZIonContent: React.FC<ZIonContentType> = (props: ZIonContentType) => {
  return <IonContent {...props}>{props.children}</IonContent>;
};

export default ZIonContent;
