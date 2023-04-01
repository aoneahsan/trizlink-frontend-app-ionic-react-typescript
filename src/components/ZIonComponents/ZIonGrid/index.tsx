// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonGrid } from '@ionic/react';

type ZIonGridType = {
  children: ReactNode;
  fixed?: boolean;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonGrid = ({
  children,
  className,
  fixed = false,
  style,
}: ZIonGridType) => {
  return (
    <IonGrid className={className} fixed={fixed} style={style}>
      {children}
    </IonGrid>
  );
};

export default ZIonGrid;
