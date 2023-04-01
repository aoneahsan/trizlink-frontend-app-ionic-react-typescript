/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonModal } from '@ionic/react';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state is a Type import
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
 * Component props type Imports go down
 * ? Like if you have a type for props it should be pleace Down
 * */

type ZaionsIonModalType = {
  className?: string;
  triggerId: string;
  width?: string;
  height?: string;
  children: JSX.Element;
  isOpen?: boolean;
};

/**
 * Functional Component
 * About: (custom modal stracture)
 * @type {*}
 * */
const ZaionsIonModal = React.forwardRef<
  HTMLIonModalElement,
  ZaionsIonModalType
>(
  (
    {
      className,
      triggerId,
      width = '50vw',
      height = '50vh',
      isOpen = false,
      children,
    },
    ref
  ) => {
    return (
      <>
        <IonModal
          ref={ref}
          trigger={triggerId}
          style={{
            '--width': width,
            '--height': height,
          }}
          className={classNames(className)}
          isOpen={isOpen}
        >
          {children}
        </IonModal>
      </>
    );
  }
);

export default ZaionsIonModal;
