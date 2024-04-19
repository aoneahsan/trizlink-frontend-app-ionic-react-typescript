// #region ---- Core Imports ----
import React, { type ReactNode } from 'react';
// #endregion

// #region ---- Packages Imports ----
import { type ActionSheetButton, IonActionSheet } from '@ionic/react';
// #endregion

// #region ---- Custom Imports ----
import { zComponentTestingSelectorMaker } from '@/utils/helpers';
// #endregion

// #region ---- Types Imports ----
import {
  type IonActionSheetCustomEvent,
  type OverlayEventDetail
} from '@ionic/core';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';

interface ZIonActionSheetI {
  children?: ReactNode;
  className?: string;

  animated?: boolean;
  backdropDismiss?: boolean;
  buttons?: Array<string | ActionSheetButton<unknown>>;
  cssClass?: string | string[];
  header?: string;
  subHeader?: string;
  translucent?: boolean;
  trigger?: string;
  htmlAttributes?: Record<string, unknown>;
  isOpen?: boolean;
  keyboardClose?: boolean;
  mode?: ZIonModeType;
  onIonActionSheetDidDismiss?: (
    event: IonActionSheetCustomEvent<OverlayEventDetail<unknown>>
  ) => void;
  onIonActionSheetDidPresent?: (event: IonActionSheetCustomEvent<void>) => void;
  onIonActionSheetWillPresent?: (
    event: IonActionSheetCustomEvent<void>
  ) => void;
  onIonActionSheetWillDismiss?: (
    event: IonActionSheetCustomEvent<OverlayEventDetail<unknown>>
  ) => void;

  // testing attribute
  testingselector?: string;
  testingidselector?: string;
  testinglistselector?: string;
}
// #endregion

/**
 * A customized IonNote component.
 */
const ZIonActionSheet: React.FC<ZIonActionSheetI> = props => {
  // Creating testing attributes with values.
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonActionSheet
      {...props}
      {..._idSelector}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonActionSheet>
  );
};

export default ZIonActionSheet;
