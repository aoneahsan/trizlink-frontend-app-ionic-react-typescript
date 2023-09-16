// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonChip } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonChipType = {
  children: ReactNode;
  color?: ZIonColorType;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  disabled?: boolean;
  mode?: ZIonModeType;
  outline?: boolean;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: React.MouseEventHandler<HTMLIonChipElement>;
};

const ZIonChip = (props: ZIonChipType) => {
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
    <IonChip
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonChip>
  );
};

export default ZIonChip;
