// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonTabs } from '@ionic/react';
import { type IonTabsCustomEvent } from '@ionic/core/dist/types/components';

// Type
interface ZIonTabsType {
  children?: ReactNode;
  onIonTabsDidChange?: (
    event: IonTabsCustomEvent<{
      tab: string;
    }>
  ) => void;
  onIonTabsWillChange?: (
    event: IonTabsCustomEvent<{
      tab: string;
    }>
  ) => void;
}

const ZIonTabs: React.FC<ZIonTabsType> = (props: ZIonTabsType) => {
  return <IonTabs {...props}>{props.children}</IonTabs>;
};

export default ZIonTabs;
