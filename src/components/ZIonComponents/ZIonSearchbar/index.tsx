// Core Import
import React from 'react';

// Packages Import
import { IonSearchbar, type SearchbarChangeEventDetail } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

// Type
import { type IonSearchbarCustomEvent } from '@ionic/core/dist/types/components';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonInputAutoCompleteType =
  | 'name'
  | 'email'
  | 'tel'
  | 'url'
  | 'on'
  | 'off'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'photo';

interface ZIonSearchbarType {
  className?: string;
  animated?: boolean;
  autocomplete?: ZIonInputAutoCompleteType;
  autocorrect?: 'off' | 'on';
  cancelButtonIcon?: string;
  cancelButtonText?: string;
  clearIcon?: string;
  color?: ZIonColorType;
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
  mode?: ZIonModeType;
  placeholder?: string;
  searchIcon?: string;
  showCancelButton?: 'always' | 'focus' | 'never';
  showClearButton?: 'always' | 'focus' | 'never';
  spellcheck?: boolean;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  value?: null | string;
  defaultValue?: string | readonly string[];
  name?: string;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
  onIonChange?: (
    event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const ZIonSearchbar: React.FC<ZIonSearchbarType> = (
  props: ZIonSearchbarType
) => {
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
    <IonSearchbar
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZIonSearchbar;
