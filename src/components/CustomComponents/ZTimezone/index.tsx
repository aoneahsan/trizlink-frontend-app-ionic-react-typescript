/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  type IonSelectCustomEvent,
  type SelectChangeEventDetail
} from '@ionic/core';
import classNames from 'classnames';
import {
  type ActionMeta,
  type MultiValue,
  type PropsValue
} from 'react-select';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonSelect, ZIonSelectOption } from '@/components/ZIonComponents';
import ZaionsRSelect from '../ZaionsRSelect';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { TIMEZONES } from '@/utils/constants';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { type ZIonPlacementType } from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZTimezoneInputInterface {
  className?: string;
  placeholder?: string;
  name?: string;
  testingselector?: string;
  testinglistselector?: string;
  // options?: readonly ZaionsRSelectOptions[];
  value?: PropsValue<ZaionsRSelectOptions>;
  defaultValue?: PropsValue<ZaionsRSelectOptions>;
  onChange?: (
    newValue: MultiValue<ZaionsRSelectOptions>,
    actionMeta: ActionMeta<ZaionsRSelectOptions>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

interface ZTimezoneSelectorInterface {
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  multiple?: boolean;
  label?: string;
  labelPlacement?: ZIonPlacementType;
  helperText?: string;
  errorText?: string;
  onIonBlur?: (event: IonSelectCustomEvent<void>) => void;
  onIonChange?: (
    event: IonSelectCustomEvent<SelectChangeEventDetail<unknown>>
  ) => void;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZTimezoneInput: React.FC<ZTimezoneInputInterface> = props => {
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
    <ZaionsRSelect
      {...props}
      placeholder='timezone'
      {..._testingSelector}
      {..._testinglistselector}
      options={
        TIMEZONES.map(el => {
          return { ...el };
        }) as unknown as ZaionsRSelectOptions[]
      }
    />
  );
};

export const ZTimezoneSelector: React.FC<
  ZTimezoneSelectorInterface
> = props => {
  return (
    <ZIonSelect
      {...props}
      fill='outline'
      label='timezone'
      labelPlacement='stacked'
      errorText={props.errorText}
      minHeight='2.5rem'
      interface='popover'
      className={classNames(props.className)}>
      {TIMEZONES.map((el, index) => {
        return (
          <ZIonSelectOption
            value={el.value}
            key={index}>
            {el.label}
          </ZIonSelectOption>
        );
      })}
    </ZIonSelect>
  );
};

export default ZTimezoneInput;
