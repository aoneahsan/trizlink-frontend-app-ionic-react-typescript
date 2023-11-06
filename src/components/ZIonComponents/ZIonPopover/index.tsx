// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonPopover } from '@ionic/react';

// Type
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { type IonPopoverCustomEvent } from '@ionic/core/dist/types/components';

interface ZIonPopoverType {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  alignment?: 'center' | 'end' | 'start';
  animated?: boolean;
  arrow?: boolean;
  backdropDismiss?: boolean;
  component?: HTMLElement | null | string;
  componentProps?: Record<string, unknown>;
  dismissOnSelect?: boolean;
  event?: unknown;
  htmlAttributes?: Record<string, unknown>;
  isOpen?: boolean;
  keepContentsMounted?: boolean;
  keyboardClose?: boolean;
  reference?: 'event' | 'trigger';
  showBackdrop?: boolean;
  side?: 'bottom' | 'end' | 'left' | 'right' | 'start' | 'top';
  size?: 'auto' | 'cover';
  translucent?: boolean;
  trigger?: string;
  triggerAction?: 'click' | 'context-menu' | 'hover';

  onIonPopoverDidDismiss?: (
    event: IonPopoverCustomEvent<OverlayEventDetail<any>>
  ) => void;
}

// const ZIonPopover: React.FC<ZIonPopoverType> = (props: ZIonPopoverType) => {
//   return <IonPopover {...props}>{props.children}</IonPopover>;
// };
const ZIonPopover = React.forwardRef(
  (props: ZIonPopoverType, ref: React.Ref<HTMLIonPopoverElement>) => {
    return (
      <IonPopover
        ref={ref}
        {...props}>
        {props.children}
      </IonPopover>
    );
  }
);
ZIonPopover.displayName = 'ZIonPopover';

export default ZIonPopover;
