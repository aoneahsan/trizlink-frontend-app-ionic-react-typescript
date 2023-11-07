// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonTabBar } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
interface ZIonTabBarType {
  children?: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  selectedTab?: string | undefined;
  translucent?: boolean;
  slot?: 'top' | 'bottom';
}

const ZIonTabBar: React.FC<ZIonTabBarType> = (props: ZIonTabBarType) => {
  return <IonTabBar {...props}>{props.children}</IonTabBar>;
};

export default ZIonTabBar;
