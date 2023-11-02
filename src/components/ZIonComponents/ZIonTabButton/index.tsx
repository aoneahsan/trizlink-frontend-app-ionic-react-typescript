// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonTabButton } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';
// import {  } from '@ionic/core/dist/types/components';

// Type
interface ZIonTabButtonType {
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
}

const ZIonTabButton: React.FC<ZIonTabButtonType> = (
  props: ZIonTabButtonType
) => {
  return <IonTabButton {...props}>{props.children}</IonTabButton>;
};

export default ZIonTabButton;
