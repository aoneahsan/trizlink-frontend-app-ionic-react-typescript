// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSegmentButton } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonSegmentButtonType {
  children: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  disabled?: boolean;
  mode?: ZIonModeType;
  value?: string;
  type?: 'button' | 'reset' | 'submit';
  testingselector?: string;
  testinglistselector?: string;
  layout?:
    | 'icon-bottom'
    | 'icon-end'
    | 'icon-hide'
    | 'icon-start'
    | 'icon-top'
    | 'label-hide';
  id?: string;
  onClick?: React.MouseEventHandler<HTMLIonSegmentButtonElement>;
}

const ZIonSegmentButton: React.FC<ZIonSegmentButtonType> = (
  props: ZIonSegmentButtonType
) => {
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
    <IonSegmentButton
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonSegmentButton>
  );
};

export default ZIonSegmentButton;
