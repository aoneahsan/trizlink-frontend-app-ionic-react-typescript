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
  RangeKnobMoveStartEventDetail
} from '@ionic/core';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelector } from '@/utils/helpers';
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
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonRange = (props: ZIonRangeType) => {
  const _testinglistselector = props.testinglistselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testinglistselector || PRODUCT_NAME,
          _key: zCreateElementTestingSelectorKeyEnum.listSelector
        })
      }
    : {};

  const _testingSelector = props.testingselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testingselector || PRODUCT_NAME
        })
      }
    : {};
  return (
    <IonRange
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonRange>
  );
};

export default ZIonRange;
