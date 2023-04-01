// Core Import
import React from 'react';

// Packages Import
import { IonIcon } from '@ionic/react';

// Type
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
type ZIonIconType = {
  icon?: string;
  className?: string;
  color?: ZIonColorType;
  size?: 'small' | 'large' | 'default';
  style?: {
    [key: string]: unknown;
  };
  slot?: 'start' | 'end';
  title?: string;
  onClick?: React.MouseEventHandler<HTMLIonIconElement>;
};

const ZIonIcon = (props: ZIonIconType) => {
  return <IonIcon {...props} />;
};

export default ZIonIcon;
