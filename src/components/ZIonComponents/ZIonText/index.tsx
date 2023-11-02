// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonText } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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
  onClick?: React.MouseEventHandler<HTMLIonTextElement>;
}

const ZIonText = React.forwardRef(
  (props: ZIonTextType, ref: React.Ref<HTMLIonTextElement>) => {
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
      <IonText
        {...props}
        ref={ref}
        {..._testingSelector}
        {..._testinglistselector}>
        {props.children}
      </IonText>
    );
  }
);
ZIonText.displayName = 'ZIonText';

export default ZIonText;
