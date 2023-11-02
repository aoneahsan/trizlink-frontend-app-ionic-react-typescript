// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonMenuButton } from '@ionic/react';
import {
  type ZIonButtonType,
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonMenuButtonType {
  children?: ReactNode;
  className?: string;
  autoHide?: boolean;
  color?: ZIonColorType;
  disabled?: boolean;
  menu?: string;
  mode?: ZIonModeType;
  type?: ZIonButtonType;
}

const ZIonMenuButton: React.FC<ZIonMenuButtonType> = (
  props: ZIonMenuButtonType
) => {
  return <IonMenuButton {...props}>{props.children}</IonMenuButton>;
};

export default ZIonMenuButton;
