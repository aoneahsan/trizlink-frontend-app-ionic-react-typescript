// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonAvatar } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonAvatarType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: 'start' | 'end';

  id?: string;

  onClick?: React.MouseEventHandler<HTMLIonAvatarElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonAvatarElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonAvatarElement>;

  //
  testingselector?: string;
  testingidselector?: string;
  testinglistselector?: string;
}

const ZIonAvatar: React.FC<ZIonAvatarType> = (props: ZIonAvatarType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonAvatar
      {...props}
      {..._idSelector}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonAvatar>
  );
};

export default ZIonAvatar;
