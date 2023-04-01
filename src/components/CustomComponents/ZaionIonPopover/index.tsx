/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonPopover } from '@ionic/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonContent } from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be pleace Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

type ZaionsIonPopoverType = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  alignment?: 'center' | 'end' | 'start' | undefined;
  animated?: boolean;
  arrow?: boolean;
  backdropDismiss?: boolean;
  dismissOnSelect?: boolean;
  showBackdrop?: boolean;
  onMouseLeave?: React.MouseEventHandler<HTMLIonPopoverElement> | undefined;
};

const ZaionsIonPopover: React.FC<ZaionsIonPopoverType> = ({
  children,
  isOpen = false,
  alignment = undefined,
  animated = false,
  arrow = false,
  backdropDismiss = true,
  dismissOnSelect = false,
  showBackdrop = true,
  onMouseLeave = undefined,
}) => {
  return (
    <IonPopover
      isOpen={isOpen}
      alignment={alignment}
      animated={animated}
      arrow={arrow}
      backdropDismiss={backdropDismiss}
      dismissOnSelect={dismissOnSelect}
      showBackdrop={showBackdrop}
      onMouseLeave={onMouseLeave}
    >
      <ZIonContent className='ion-padding'>{children}</ZIonContent>
    </IonPopover>
  );
};

export default ZaionsIonPopover;
