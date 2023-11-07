// Core Imports
import React, { type ReactNode } from 'react';

// Packages Import
import { IonLabel } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
interface ZIonLabelType {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  position?: 'fixed' | 'floating' | 'stacked';
  className?: string;
  slot?: 'start' | 'end';
  testingselector?: string;
  testinglistselector?: string;
  onClick?: () => void;
}

const ZIonLabel: React.FC<ZIonLabelType> = (props: ZIonLabelType) => {
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
    <IonLabel
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonLabel>
  );
};

export default ZIonLabel;
