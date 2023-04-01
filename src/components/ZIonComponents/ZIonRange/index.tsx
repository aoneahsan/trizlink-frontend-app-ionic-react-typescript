// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRange } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import {
  IonRangeCustomEvent,
  RangeChangeEventDetail,
  RangeKnobMoveEndEventDetail,
  RangeKnobMoveStartEventDetail,
} from '@ionic/core';
type ZIonRangeType = {
  children?: ReactNode;
  className?: string;
  mode?: ZIonModeType;
  activeBarStart?: number;
  color?: ZIonColorType;
  debounce?: number;
  disabled?: boolean;
  dualKnobs?: boolean;
  snaps?: boolean;
  ticks?: boolean;
  pin?: boolean;
  max?: number;
  min?: number;
  step?: number;
  name?: string;
  value?: number | { lower: number; upper: number };
  pinFormatter?: (value: number) => string | number;
  onIonBlur?: (event: IonRangeCustomEvent<void>) => void;
  onIonChange?: (event: IonRangeCustomEvent<RangeChangeEventDetail>) => void;
  onIonFocus?: (event: IonRangeCustomEvent<void>) => void;
  onIonKnobMoveEnd?: (
    event: IonRangeCustomEvent<RangeKnobMoveEndEventDetail>
  ) => void;
  onIonKnobMoveStart?: (
    event: IonRangeCustomEvent<RangeKnobMoveStartEventDetail>
  ) => void;
};

const ZIonRange = (props: ZIonRangeType) => {
  return <IonRange {...props}> {props.children}</IonRange>;
};

export default ZIonRange;
