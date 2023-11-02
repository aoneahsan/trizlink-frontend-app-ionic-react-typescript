// Core Import
import React from 'react';

// Packages Import
import { IonTextarea } from '@ionic/react';

import { type IonTextareaCustomEvent } from '@ionic/core/dist/types/components';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import ZInputLengthConstant from '@/utils/constants/InputLenghtConstant';
interface ZIonTextareaType {
  className?: string;
  autoGrow?: boolean;
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  autofocus?: boolean;
  clearOnEdit?: boolean;
  color?: ZIonColorType;
  cols?: number;
  debounce?: number;
  disabled?: boolean;
  enterkeyhint?:
    | 'done'
    | 'enter'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
  inputmode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  maxlength?: number;
  minlength?: number;
  mode?: ZIonModeType;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  spellcheck?: boolean;
  value?: null | string;
  wrap?: 'hard' | 'off' | 'soft';
  onIonChange?: (event: Event) => void;
  onIonBlur?: (event: IonTextareaCustomEvent<FocusEvent>) => void;
  counter?: boolean;
  style?: Record<string, unknown>;

  testingselector?: string;
  testinglistselector?: string;
  // Ionic 7
  label?: string;
  labelPlacement?: 'fixed' | 'floating' | 'stacked';
  helperText?: string;
  errorText?: string;
  fill?: 'solid' | 'outline';
}

const ZIonTextarea: React.FC<ZIonTextareaType> = (props: ZIonTextareaType) => {
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
    <IonTextarea
      {...props}
      onIonInput={props.onIonChange}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export const ZIonTextareaShort: React.FC<ZIonTextareaType> = props => {
  return (
    <ZIonTextarea
      {...props}
      counter={true}
      maxlength={ZInputLengthConstant.defaultShortTextMaxLength}
      rows={3}
      autoGrow={true}
    />
  );
};

export const ZIonTextareaLong: React.FC<ZIonTextareaType> = props => {
  return (
    <ZIonTextarea
      {...props}
      counter={true}
      maxlength={ZInputLengthConstant.defaultLongTextMaxLength}
      rows={5}
      autoGrow={true}
    />
  );
};

export default ZIonTextarea;
