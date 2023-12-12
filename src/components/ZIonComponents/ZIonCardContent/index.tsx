// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonCardContent } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
interface ZIonCardContentType {
  children: ReactNode;
  className?: string;
  mode?: ZIonModeType;
  style?: Record<string, unknown>;
}

const ZIonCardContent: React.FC<ZIonCardContentType> = (
  props: ZIonCardContentType
) => {
  return <IonCardContent {...props}>{props.children}</IonCardContent>;
};

export default ZIonCardContent;
