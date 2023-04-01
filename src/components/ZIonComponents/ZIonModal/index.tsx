// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonModal } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { IonModalCustomEvent } from '@ionic/core/dist/types/components';

// Type
type ZIonModalType = {
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  color?: ZIonColorType;
  mode?: ZIonModeType;
  animated?: boolean;
  backdropBreakpoint?: number;
  backdropDismiss?: boolean;
  breakpoints?: number[];
  handle?: boolean;
  handleBehavior?: 'cycle' | 'none';
  htmlAttributes?: { [key: string]: unknown };
  initialBreakpoint?: number;
  isOpen?: boolean;
  keepContentsMounted?: boolean;
  keyboardClose?: boolean;
  presentingElement?: HTMLElement;
  showBackdrop?: boolean;
  trigger?: string;
  canDismiss?:
    | ((data?: unknown, role?: string | undefined) => Promise<boolean>)
    | boolean;
  onDidDismiss?: (
    event: IonModalCustomEvent<OverlayEventDetail<unknown>>
  ) => void;
  onDidPresent?: (event: IonModalCustomEvent<void>) => void;
  onIonModalDidDismiss?: (
    event: IonModalCustomEvent<OverlayEventDetail<unknown>>
  ) => void;
  onIonModalWillPresent?: (event: IonModalCustomEvent<void>) => void;
  onWillDismiss?: (
    event: IonModalCustomEvent<OverlayEventDetail<unknown>>
  ) => void;
  onWillPresent?: (event: IonModalCustomEvent<void>) => void;
  // leaveAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
  // enterAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
};

const ZIonModal = (props: ZIonModalType) => {
  return (
    <IonModal {...props} style={props.style}>
      {props.children}
    </IonModal>
  );
};

export default ZIonModal;
