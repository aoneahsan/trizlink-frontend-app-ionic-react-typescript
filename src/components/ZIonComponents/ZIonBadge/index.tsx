// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonBadge } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonBadgeType {
  children?: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: string;
  style?: Record<string, unknown>;
}

const ZIonBadge: React.FC<ZIonBadgeType> = (props: ZIonBadgeType) => {
  return <IonBadge {...props}>{props.children}</IonBadge>;
};

export default ZIonBadge;
