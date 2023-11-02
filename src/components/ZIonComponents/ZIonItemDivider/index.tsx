// Core Imports
import React, { type ReactNode } from 'react';

// Packages Import
import { IonItemDivider } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonItemDividerType {
  children?: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  sticky?: boolean;
  onClick?: () => void;
  style?: Record<string, unknown>;
}

const ZIonItemDivider: React.FC<ZIonItemDividerType> = (
  props: ZIonItemDividerType
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
    <IonItemDivider
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonItemDivider>
  );
};

export default ZIonItemDivider;
