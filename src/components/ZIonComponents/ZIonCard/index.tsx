// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonCard } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType,
  type ZIonRouterDirection,
  type ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonCardType {
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
  style?: Record<string, unknown>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonCardElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonCardElement>;
  onClick?: React.MouseEventHandler<HTMLIonCardElement>;

  //
  testingselector?: string;
  testinglistselector?: string;
}

const ZIonCard: React.FC<ZIonCardType> = (props: ZIonCardType) => {
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
