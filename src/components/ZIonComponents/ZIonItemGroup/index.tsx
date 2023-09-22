// Core Imports
import React, { ReactNode } from 'react';

// Packages Import
import { IonItemGroup } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

type ZIonItemGroupType = {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: () => void;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonItemGroup = (props: ZIonItemGroupType) => {
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
    <IonItemGroup
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonItemGroup>
  );
};

export default ZIonItemGroup;
