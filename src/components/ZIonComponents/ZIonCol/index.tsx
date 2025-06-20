// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonCol } from '@ionic/react';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonColType {
  offset?: string;
  offsetXl?: string;
  offsetLg?: string;
  offsetMd?: string;
  offsetSm?: string;
  offsetXs?: string;
  pull?: string;
  pullXl?: string;
  pullLg?: string;
  pullMd?: string;
  pullSm?: string;
  pullXs?: string;
  push?: string;
  pushXl?: string;
  pushLg?: string;
  pushMd?: string;
  pushSm?: string;
  pushXs?: string;
  size?: string;
  sizeXl?: string;
  sizeLg?: string;
  sizeMd?: string;
  sizeSm?: string;
  sizeXs?: string;
  children?: ReactNode;
  className?: string;
  color?: ZIonColorType;
  title?: string;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLIonColElement>;
  onClick?: React.MouseEventHandler<HTMLIonIconElement>;
  minHeight?: 'auto' | string;
}

const ZIonCol: React.FC<ZIonColType> = (props: ZIonColType) => {
  const compStyle =
    props.style !== undefined && props.minHeight !== undefined
      ? { ...props.style, 'min-height': props.minHeight }
      : props.style !== undefined && props.minHeight === undefined
      ? { ...props.style }
      : props.style === undefined && props.minHeight !== undefined
      ? { 'min-height': props.minHeight }
      : {};

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
    <IonCol
      {...props}
      style={compStyle}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonCol>
  );
};

export default ZIonCol;
