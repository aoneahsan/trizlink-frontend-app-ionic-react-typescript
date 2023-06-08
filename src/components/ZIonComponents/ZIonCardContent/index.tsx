// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCardContent } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonCardContentType = {
  children: ReactNode;
  className?: string;
  mode?: ZIonModeType;
	onClick?: React.MouseEventHandler<HTMLIonCardElement>;
};

const ZIonCardContent = (props: ZIonCardContentType) => {
  return <IonCardContent {...props}>{props.children}</IonCardContent>;
};

export default ZIonCardContent;
