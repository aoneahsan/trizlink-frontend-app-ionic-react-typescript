// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSelect, SelectChangeEventDetail } from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core/dist/types/components';

// Type
import {
  ZIonColorType,
  ZIonModeType,
  ZIonPlacementType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
type ZIonSelectType = {
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
  style?: {
    [key: string]: unknown;
  };
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
};

const ZIonSelect = (props: ZIonSelectType) => {
  const compStyle =
    props.style && props.minHeight
      ? { ...props.style, minHeight: props.minHeight }
      : props.style && !props.minHeight
      ? { ...props.style }
      : !props.style && props.minHeight
      ? { minHeight: props.minHeight }
      : {};

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
