// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { type CheckboxChangeEventDetail, IonCheckbox } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType,
  type ZIonSlotType
} from '@/types/zaionsAppSettings.type';
import { type IonCheckboxCustomEvent } from '@ionic/core/dist/types/components';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonCheckboxType {
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
}

const ZIonCheckbox: React.FC<ZIonCheckboxType> = (props: ZIonCheckboxType) => {
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
    <IonCheckbox
      {...props}
      aria-label={`zaions-checkbox-label-${props.name ?? ''}`}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonCheckbox>
  );
};

export default ZIonCheckbox;
