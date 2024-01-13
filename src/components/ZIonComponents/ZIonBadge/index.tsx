// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonBadge } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonBadgeType {
  children?: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: string;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonBadge: React.FC<ZIonBadgeType> = (props: ZIonBadgeType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonBadge
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonBadge>
  );
};

export default ZIonBadge;
