// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSelect, type SelectChangeEventDetail } from '@ionic/react';
import { type IonSelectCustomEvent } from '@ionic/core/dist/types/components';

// Type
import {
  type ZIonColorType,
  type ZIonModeType,
  type ZIonPlacementType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
interface ZIonSelectType {
  children: ReactNode;
  className?: string;
  cancelText?: string;
  compareWith?:
    | ((currentValue: unknown, compareValue: unknown) => boolean)
    | null
    | string;
  disabled?: boolean;
  interface?: 'action-sheet' | 'alert' | 'popover';
  mode?: ZIonModeType;
  multiple?: boolean;
  name?: string;
  okText?: string;
  placeholder?: string;
  selectedText?: null | string | undefined;
  value?: string | unknown;
  defaultValue?: string | number | readonly string[];
  color?: ZIonColorType;
  style?: Record<string, unknown>;
  minHeight?: 'auto' | string;
  testingselector?: string;
  testinglistselector?: string;
  onIonChange?: (
    event: IonSelectCustomEvent<SelectChangeEventDetail<unknown>>
  ) => void;
  onChange?: React.FormEventHandler<HTMLIonSelectElement>;
  onIonCancel?: (event: IonSelectCustomEvent<void>) => void;
  onIonBlur?: (event: IonSelectCustomEvent<void>) => void;

  // Ionic 7
  label?: string;
  labelPlacement?: ZIonPlacementType;
  fill?: 'solid' | 'outline';
  helperText?: string;
  errorText?: string;
  toggleIcon?: string;
  expandedIcon?: string;
}

const ZIonSelect: React.FC<ZIonSelectType> = (props: ZIonSelectType) => {
  const compStyle =
    props.style !== undefined && props.minHeight !== undefined
      ? { ...props.style, minHeight: props.minHeight }
      : props.style !== undefined && props.minHeight === undefined
      ? { ...props.style }
      : props.style === undefined && props.minHeight !== undefined
      ? { minHeight: props.minHeight }
      : {};

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

  //
  return (
    <IonSelect
      {...props}
      style={compStyle}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonSelect>
  );
};

export default ZIonSelect;
