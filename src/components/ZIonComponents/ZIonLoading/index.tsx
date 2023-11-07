// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonLoading } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import {
  type IonicSafeString,
  type IonLoadingCustomEvent
} from '@ionic/core/dist/types/components';

// Type
interface ZIonLoadingType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  animated?: boolean;
  backdropDismiss?: boolean;
  cssClass?: string | string[];
  duration?: number;
  htmlAttributes?: Record<string, unknown>;
  isOpen?: boolean;
  keyboardClose?: boolean;
  message?: IonicSafeString | string;
  showBackdrop?: boolean;
  spinner?:
    | 'bubbles'
    | 'circles'
    | 'circular'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-sharp'
    | 'lines-sharp-small'
    | 'lines-small'
    | null;
  translucent?: boolean;
  trigger?: string;

  onDidDismiss?: (
    event: IonLoadingCustomEvent<OverlayEventDetail<any>>
  ) => void;
  onDidPresent?: (event: IonLoadingCustomEvent<void>) => void;
  onIonLoadingWillPresent?: (event: IonLoadingCustomEvent<void>) => void;
  onWillDismiss?: (
    event: IonLoadingCustomEvent<OverlayEventDetail<unknown>>
  ) => void;
  onWillPresent?: (event: IonLoadingCustomEvent<void>) => void;
  // leaveAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
  // enterAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
}

const ZIonLoading: React.FC<ZIonLoadingType> = (props: ZIonLoadingType) => {
  return <IonLoading {...props}>{props.children}</IonLoading>;
};

export default ZIonLoading;
