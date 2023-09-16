// Core Imports
import React, { ReactNode } from 'react';

// Packages Import
import { IonLabel } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonLabelType = {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  position?: 'fixed' | 'floating' | 'stacked';
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: () => void;
};

const ZIonLabel = (props: ZIonLabelType) => {
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
    <IonLabel
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonLabel>
  );
};

export default ZIonLabel;
