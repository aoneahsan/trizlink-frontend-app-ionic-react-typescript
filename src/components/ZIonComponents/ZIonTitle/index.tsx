// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTitle } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

// Type
type ZIonTitleType = {
  children: ReactNode;
  color?: ZIonColorType;
  size?: 'large' | 'small' | undefined;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonTitle = (props: ZIonTitleType) => {
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
    <IonTitle
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonTitle>
  );
};

export default ZIonTitle;
