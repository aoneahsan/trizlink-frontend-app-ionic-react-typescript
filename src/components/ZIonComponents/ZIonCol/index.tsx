// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCol } from '@ionic/react';
import { ZIonColorType } from 'types/zaionsAppSettings.type';

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
  onMouseEnter?: React.MouseEventHandler<HTMLIonColElement>;
  onClick?: React.MouseEventHandler<HTMLIonIconElement>;
};

const ZIonCol = (props: ZIonColType) => {
  return <IonCol {...props}>{props.children}</IonCol>;
};

export default ZIonCol;
