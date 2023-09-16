// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCard } from '@ionic/react';

// Type
import {
  ZIonColorType,
  ZIonModeType,
  ZIonRouterDirection,
  ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonCardType = {
  children: ReactNode;
  button?: boolean;
  color?: ZIonColorType;
  disabled?: boolean;
  download?: string;
  href?: string;
  mode?: ZIonModeType;
  rel?: string;
  // routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation),
  routerDirection?: ZIonRouterDirection;
  target?: ZIonTargetType;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  onMouseEnter?: React.MouseEventHandler<HTMLIonCardElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonCardElement>;
  onClick?: React.MouseEventHandler<HTMLIonCardElement>;

  //
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonCard = (props: ZIonCardType) => {
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
    <IonCard
      {...props}
      style={props.style}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonCard>
  );
};

export default ZIonCard;
