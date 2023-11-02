// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSegment, type SegmentChangeEventDetail } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { type IonSegmentCustomEvent } from '@ionic/core/dist/types/components';

interface ZIonSegmentType {
  children: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  disabled?: boolean;
  mode?: ZIonModeType;
  scrollable?: boolean;
  selectOnFocus?: boolean;
  swipeGesture?: boolean;
  value?: undefined | string;

  onIonChange?: (
    event: IonSegmentCustomEvent<SegmentChangeEventDetail>
  ) => void;
}

const ZIonSegment: React.FC<ZIonSegmentType> = (props: ZIonSegmentType) => {
  return <IonSegment {...props}>{props.children}</IonSegment>;
};

export default ZIonSegment;
