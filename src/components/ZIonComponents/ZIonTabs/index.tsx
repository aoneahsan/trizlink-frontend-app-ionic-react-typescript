// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTabs } from '@ionic/react';
import { IonTabsCustomEvent } from '@ionic/core/dist/types/components';

// Type
type ZIonTabsType = {
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
};

const ZIonTabs = (props: ZIonTabsType) => {
  return <IonTabs {...props}>{props.children}</IonTabs>;
};

export default ZIonTabs;
