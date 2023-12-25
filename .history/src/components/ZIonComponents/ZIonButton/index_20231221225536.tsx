// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonButton } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType,
  type ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import classNames from 'classnames';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';
interface ZIonButtonType {
  children?: ReactNode;
  className?: string;
  color?: ZIonColorType;
  disabled?: boolean;
  download?: string;
  expand?: 'block' | 'full';
  fill?: 'clear' | 'default' | 'outline' | 'solid';
  mode?: ZIonModeType;
  size?: 'default' | 'large' | 'small';
  type?: 'button' | 'reset' | 'submit';
  shape?: 'round';
  routerLink?: string;
  id?: string;
  slot?: 'end' | 'start' | string;
  title?: string;
  target?: ZIonTargetType;
  value?: string | number | string[] | number[];
  style?: Record<string, unknown>;
  href?: string;
  height?: '36px' | string;
  minHeight?: '36px' | string;
  ref?: React.Ref<HTMLIonButtonElement>;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;

  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}
const ZIonButton: React.FC<ZIonButtonType> = (props: ZIonButtonType) => {
  const compStyle =
    props.style !== undefined && props.height !== undefined
      ? { ...props.style, height: props.height }
      : props.style !== undefined &&
        props.height !== undefined &&
        props.minHeight !== undefined
      ? { ...props.style, height: props.height, minHeight: props.minHeight }
      : props.style !== undefined && props.minHeight !== undefined
      ? { ...props.style, minHeight: props.minHeight }
      : props.style !== undefined && props.height === undefined
      ? { ...props.style }
      : props.style !== undefined && props.minHeight === undefined
      ? { ...props.style }
      : props.style === undefined && props.height !== undefined
      ? { height: props.height }
      : props.style === undefined && props.minHeight !== undefined
      ? { minHeight: props.minHeight }
      : {};

  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonButton
      {...props}
      style={compStyle}
      className={classNames(props.className, { 'normal-case': true })}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonButton>
  );
};
export default ZIonButton;
