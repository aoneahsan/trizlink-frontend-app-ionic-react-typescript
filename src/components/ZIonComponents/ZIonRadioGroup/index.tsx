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
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

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
  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonRadioGroup: React.FC<ZIonRadioGroupType> = (
  props: ZIonRadioGroupType
) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonRadioGroup
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonRadioGroup>
  );
};

export default ZIonRadioGroup;
