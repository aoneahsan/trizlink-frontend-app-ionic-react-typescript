// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRange } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import {
  type IonRangeCustomEvent,
  type RangeChangeEventDetail,
  type RangeKnobMoveEndEventDetail,
  type RangeKnobMoveStartEventDetail
} from '@ionic/core';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { zCreateElementTestingSelector } from '@/utils/helpers';
interface ZIonRangeType {
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
}

const ZIonRange: React.FC<ZIonRangeType> = (props: ZIonRangeType) => {
  const _testinglistselector =
    props.testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
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
