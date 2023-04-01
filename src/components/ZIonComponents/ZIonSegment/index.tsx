// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSegment } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from 'types/zaionsAppSettings.type';

type ZIonSegmentType = {
  children: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  color?: ZIonColorType;
  disabled?: boolean;
  mode?: ZIonModeType;
  scrollable?: boolean;
  selectOnFocus?: boolean;
  swipeGesture?: boolean;
  value?: null | string;
};

const ZIonSegment = (props: ZIonSegmentType) => {
  return <IonSegment {...props}>{props.children}</IonSegment>;
};

export default ZIonSegment;
