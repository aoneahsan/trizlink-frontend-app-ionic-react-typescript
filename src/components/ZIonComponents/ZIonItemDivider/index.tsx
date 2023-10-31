// Core Imports
import React, { ReactNode } from 'react';

// Packages Import
import { IonItemDivider } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

type ZIonItemDividerType = {
  children?: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  sticky?: boolean;
  onClick?: () => void;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonItemDivider = (props: ZIonItemDividerType) => {
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
