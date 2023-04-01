// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTabButton } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';
// import {  } from '@ionic/core/dist/types/components';

// Type
type ZIonTabButtonType = {
  children?: ReactNode;
  disabled?: boolean;
  download?: string;
  href?: string;
  layout?:
    | 'icon-bottom'
    | 'icon-end'
    | 'icon-hide'
    | 'icon-start'
    | 'icon-top'
    | 'label-hide';
  mode?: ZIonModeType;
  rel?: string;
  selected?: boolean;
  tab?: string;
  target?: string;
};

const ZIonTabButton = (props: ZIonTabButtonType) => {
  return <IonTabButton {...props}>{props.children}</IonTabButton>;
};

export default ZIonTabButton;
