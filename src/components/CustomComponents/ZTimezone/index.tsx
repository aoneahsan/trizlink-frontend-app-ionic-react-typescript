/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { ActionMeta, MultiValue, PropsValue } from 'react-select';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { PRODUCT_NAME, TIMEZONES } from '@/utils/constants';
import ZaionsRSelect from '../ZaionsRSelect';
import { ZIonSelect, ZIonSelectOption } from '@/components/ZIonComponents';
import { IonSelectCustomEvent, SelectChangeEventDetail } from '@ionic/core';
import { ZIonPlacementType } from '@/types/zaionsAppSettings.type';
import classNames from 'classnames';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
  style?: {
    [key: string]: unknown;
  };
  testingselector?: string;
  testinglistselector?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZTimezoneInput: React.FC<ZTimezoneInputInterface> = props => {
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
