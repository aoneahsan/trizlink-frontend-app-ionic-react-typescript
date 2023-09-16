// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { CheckboxChangeEventDetail, IonCheckbox } from '@ionic/react';

// Type
import {
  ZIonColorType,
  ZIonModeType,
  ZIonSlotType
} from '@/types/zaionsAppSettings.type';
import { IonCheckboxCustomEvent } from '@ionic/core/dist/types/components';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonCheckboxType = {
  className?: string;
  checked?: boolean;
  color?: ZIonColorType;
  disabled?: boolean;
  children?: ReactNode;
  indeterminate?: boolean;
  mode?: ZIonModeType;
  name?: string;
  value?: string;
  slot?: ZIonSlotType;
  labelPlacement?: 'end' | 'fixed' | 'start';
  onIonBlur?: (event: Event | CustomEvent<FocusEvent>) => void;
  onIonChange?: (
    event: IonCheckboxCustomEvent<CheckboxChangeEventDetail<unknown>>
  ) => void;
  onIonFocus?: (event: Event | FocusEvent) => void;
  onClick?: () => void;

  //
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonCheckbox = (props: ZIonCheckboxType) => {
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
    <IonCheckbox
      {...props}
      aria-label={`zaions-checkbox-label-${props.name || ''}`}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonCheckbox>
  );
};

export default ZIonCheckbox;
