// Core Imports
import React, { type ReactNode } from 'react';

// Packages Import
import { IonItemGroup } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonItemGroupType {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: () => void;
  style?: Record<string, unknown>;
}

const ZIonItemGroup: React.FC<ZIonItemGroupType> = (
  props: ZIonItemGroupType
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
    <IonItemGroup
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonItemGroup>
  );
};

export default ZIonItemGroup;
