// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonChip } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
interface ZIonChipType {
  children: ReactNode;
  color?: ZIonColorType;
  className?: string;
  style?: Record<string, unknown>;
  disabled?: boolean;
  mode?: ZIonModeType;
  outline?: boolean;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: React.MouseEventHandler<HTMLIonChipElement>;
}

const ZIonChip: React.FC<ZIonChipType> = (props: ZIonChipType) => {
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
    <IonChip
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonChip>
  );
};

export default ZIonChip;
