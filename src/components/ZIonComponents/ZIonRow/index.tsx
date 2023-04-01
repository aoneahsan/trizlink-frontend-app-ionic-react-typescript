// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';

type ZIonRowType = {
  children: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonRow = (props: ZIonRowType) => {
  return <IonRow {...props}>{props.children}</IonRow>;
};

export default ZIonRow;
