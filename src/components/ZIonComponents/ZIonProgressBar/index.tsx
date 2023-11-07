/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { type ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonProgressBar } from '@ionic/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface IZIonProgressBar {
  children?: ReactNode;
  buffer?: number;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  reversed?: boolean;
  type?: 'determinate' | 'indeterminate';
  value?: number;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZIonProgressBar: React.FC<IZIonProgressBar> = props => {
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
    <IonProgressBar
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonProgressBar>
  );
};

export default ZIonProgressBar;
