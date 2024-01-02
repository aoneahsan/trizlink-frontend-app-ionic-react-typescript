// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonText } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonTextType {
  children?: ReactNode;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  className?: string;
  id?: string;
  style?: Record<string, unknown>;
  slot?: 'start' | 'end' | string;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
  onClick?: React.MouseEventHandler<HTMLIonTextElement>;
}

const ZIonText = React.forwardRef(
  (props: ZIonTextType, ref: React.Ref<HTMLIonTextElement>) => {
    const { _idSelector, _testingSelector, _testinglistselector } =
      zComponentTestingSelectorMaker({
        testingidselector: props.testingidselector,
        testinglistselector: props.testinglistselector,
        testingselector: props.testingselector
      });
    return (
      <IonText
        {...props}
        ref={ref}
        {..._testingSelector}
        {..._testinglistselector}
        {..._idSelector}>
        {props.children}
      </IonText>
    );
  }
);
ZIonText.displayName = 'ZIonText';

export default ZIonText;
