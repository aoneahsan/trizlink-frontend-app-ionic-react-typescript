// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonAvatar } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';

// Type
interface ZIonAvatarType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: 'start' | 'end';

  id?: string;

  onClick?: React.MouseEventHandler<HTMLIonAvatarElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonAvatarElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonAvatarElement>;

  //
  testingselector?: string;
}

const ZIonAvatar: React.FC<ZIonAvatarType> = (props: ZIonAvatarType) => {
  return (
    <IonAvatar
      {...props}
      {...zCreateElementTestingSelector({
        _value: props.testingselector ?? ''
      })}>
      {props.children}
    </IonAvatar>
  );
};

export default ZIonAvatar;
