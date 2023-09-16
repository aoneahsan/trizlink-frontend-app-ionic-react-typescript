// Core Import
import { ReactNode } from 'react';

// Packages Import
import { IonItem } from '@ionic/react';

// Type
import {
  ZIonColorType,
  ZIonModeType,
  ZIonRouterDirection
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
type ZIonItemType = {
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
  style?: {
    [key: string]: unknown;
  };
  onClick?: (event?: unknown) => void;
  minHeight?: 'auto' | string;
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonItem = (props: ZIonItemType) => {
  const compStyle =
    props.style && props.minHeight
      ? { ...props.style, '--min-height': props.minHeight }
      : props.style && !props.minHeight
      ? { ...props.style }
      : !props.style && props.minHeight
      ? { '--min-height': props.minHeight }
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
    <IonItem
      {...props}
      style={compStyle}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonItem>
  );
};

export default ZIonItem;
