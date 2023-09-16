// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCol } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonColType = {
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
  style?: {
    [key: string]: unknown;
  };
  testingselector?: string;
  testinglistselector?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLIonColElement>;
  onClick?: React.MouseEventHandler<HTMLIonIconElement>;
  minHeight?: 'auto' | string;
};

const ZIonCol = (props: ZIonColType) => {
  const compStyle =
    props.style && props.minHeight
      ? { ...props.style, 'min-height': props.minHeight }
      : props.style && !props.minHeight
      ? { ...props.style }
      : !props.style && props.minHeight
      ? { 'min-height': props.minHeight }
      : {};

  const _testinglistselector = props.testinglistselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testinglistselector || PRODUCT_NAME,
          _key: zCreateElementTestingSelectorKeyEnum.listSelector
        })
      }
    : {};

  const _testingSelector = props.testingselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testingselector || PRODUCT_NAME
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
