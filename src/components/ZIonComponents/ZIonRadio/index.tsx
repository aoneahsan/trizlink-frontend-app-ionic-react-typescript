// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRadio } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';

import { type IonRadioCustomEvent } from '@ionic/core/dist/types/components';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

interface ZIonRadioType {
  children?: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  allowEmptySelection?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  justify?: 'end' | 'space-between' | 'start';
  labelPlacement?: 'end' | 'fixed' | 'start';
  legacy?: boolean;
  onIonBlur?: (event: IonRadioCustomEvent<void>) => void;
  onIonFocus?: (event: IonRadioCustomEvent<void>) => void;
  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonRadio: React.FC<ZIonRadioType> = (props: ZIonRadioType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonRadio
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonRadio>
  );
};

export default ZIonRadio;
