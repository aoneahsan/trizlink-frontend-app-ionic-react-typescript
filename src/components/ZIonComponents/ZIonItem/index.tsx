// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonItem } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType,
  type ZIonRouterDirection
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';
interface ZIonItemType {
  children?: ReactNode;
  className?: string;
  button?: boolean;
  color?: ZIonColorType;
  counter?: boolean;
  counterFormatter?: (inputLength: number, maxLength: number) => string;
  detail?: boolean;
  detailIcon?: string;
  disabled?: boolean;
  download?: string;
  fill?: 'outline' | 'solid';
  href?: string;
  lines?: 'full' | 'inset' | 'none';
  mode?: ZIonModeType;
  rel?: string;
  // routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation),
  routerDirection?: ZIonRouterDirection;
  shape?: 'round';
  target?: string;
  slot?: 'start' | 'end' | string;
  id?: string;
  type?: 'button' | 'reset' | 'submit';
  routerLink?: string;
  style?: Record<string, unknown>;
  onClick?: (event?: unknown) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLIonItemElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonItemElement>;
  minHeight?: 'auto' | string;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonItem: React.FC<ZIonItemType> = (props: ZIonItemType) => {
  const compStyle =
    props.style !== undefined && props.minHeight !== undefined
      ? { ...props.style, '--min-height': props.minHeight }
      : props.style !== undefined && props.minHeight === undefined
      ? { ...props.style }
      : props.style === undefined && props.minHeight !== undefined
      ? { '--min-height': props.minHeight }
      : {};

  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonItem
      {...props}
      style={compStyle}
      {..._idSelector}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonItem>
  );
};

export default ZIonItem;
