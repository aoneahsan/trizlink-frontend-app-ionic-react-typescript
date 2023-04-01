// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTab } from '@ionic/react';
// import {  } from '@ionic/core/dist/types/components';

// Type
type ZIonTabType = {
  tab: string;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  component?: Function | HTMLElement | null | string;
};

const ZIonTab = (props: ZIonTabType) => {
  return <IonTab {...props}>{props.children}</IonTab>;
};

export default ZIonTab;
