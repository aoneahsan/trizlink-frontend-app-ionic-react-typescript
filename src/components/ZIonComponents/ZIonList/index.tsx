// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonList } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonListType {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  lines?: 'full' | 'inset' | 'none';
  mode?: ZIonModeType;
  slot?: string;
  color?: ZIonColorType;
  style?: Record<string, unknown>;

  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonList: React.FC<ZIonListType> = (props: ZIonListType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonList
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonList>
  );
};

export default ZIonList;
