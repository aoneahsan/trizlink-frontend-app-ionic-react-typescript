// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRadioGroup, type RadioGroupChangeEventDetail } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

import { type IonRadioGroupCustomEvent } from '@ionic/core/dist/types/components';

interface ZIonRadioGroupType {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  allowEmptySelection?: boolean;
  name?: string;
  value?: string;
  onIonChange?: (
    event: IonRadioGroupCustomEvent<RadioGroupChangeEventDetail<unknown>>
  ) => void;
}

const ZIonRadioGroup: React.FC<ZIonRadioGroupType> = (
  props: ZIonRadioGroupType
) => {
  return <IonRadioGroup {...props}>{props.children}</IonRadioGroup>;
};

export default ZIonRadioGroup;
