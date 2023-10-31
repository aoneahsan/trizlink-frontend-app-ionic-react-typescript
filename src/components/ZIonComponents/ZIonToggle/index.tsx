// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonToggle } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
import {
  IonToggleCustomEvent,
  ToggleChangeEventDetail
} from '@ionic/core/dist/types/components';

// Type

type ZIonToggleType = {
  children?: ReactNode;
  color?: ZIonColorType;
  size?: 'large' | 'small' | undefined;
  className?: string;
  alignment?: 'center' | 'start';
  checked?: boolean;
  disabled?: boolean;
  enableOnOffLabels?: boolean;
  justify?: 'end' | 'space-between' | 'start';
  // labelPlacement?: 'end' | 'fixed' | 'stacked' | 'start';
  legacy?: boolean;
  mode?: 'ios' | 'md';
  name?: string;
  value?: string | null;
  onIonBlur?: (event: IonToggleCustomEvent<void>) => void;
  onIonChange?: (
    event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>
  ) => void;
  onIonFocus?: (event: IonToggleCustomEvent<void>) => void;
  style?: {
    [key: string]: unknown;
  };
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonToggle = (props: ZIonToggleType) => {
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
    <IonToggle
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonToggle>
  );
};

export default ZIonToggle;
