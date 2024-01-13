// Core Imports
import React, { type ReactNode } from 'react';

// Packages Import
import { IonLabel } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';
interface ZIonLabelType {
  children: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  position?: 'fixed' | 'floating' | 'stacked';
  className?: string;
  slot?: 'start' | 'end';
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
  onClick?: () => void;
}

const ZIonLabel: React.FC<ZIonLabelType> = (props: ZIonLabelType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonLabel
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonLabel>
  );
};

export default ZIonLabel;
