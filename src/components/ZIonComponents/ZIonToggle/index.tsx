// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonToggle } from '@ionic/react';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import {
  type IonToggleCustomEvent,
  type ToggleChangeEventDetail
} from '@ionic/core/dist/types/components';

// Type

interface ZIonToggleType {
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
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
}

const ZIonToggle: React.FC<ZIonToggleType> = (props: ZIonToggleType) => {
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
