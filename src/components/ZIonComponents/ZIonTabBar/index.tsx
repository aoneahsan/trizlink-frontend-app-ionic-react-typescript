// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTabBar } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonTabBarType = {
  children?: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  selectedTab?: string | undefined;
  translucent?: boolean;
  slot?: 'top' | 'bottom';
};

const ZIonTabBar = (props: ZIonTabBarType) => {
  return <IonTabBar {...props}>{props.children}</IonTabBar>;
};

export default ZIonTabBar;
