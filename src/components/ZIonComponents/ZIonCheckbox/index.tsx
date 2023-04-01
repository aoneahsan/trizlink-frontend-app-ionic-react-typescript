// Core Import
import React from 'react';

// Packages Import
import { IonCheckbox } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
type ZIonCheckboxType = {
  className?: string;
  checked?: boolean;
  color?: ZIonColorType;
  disabled?: boolean;
  indeterminate?: boolean;
  mode?: ZIonModeType;
  name?: string;
  value?: string;
  onIonBlur?: (event: Event | CustomEvent<FocusEvent>) => void;
  onIonChange?: (event: Event | CustomEvent<unknown>) => void;
  onIonFocus?: (event: Event | FocusEvent) => void;
  onClick?: () => void;
};

const ZIonCheckbox = (props: ZIonCheckboxType) => {
  return <IonCheckbox {...props} />;
};

export default ZIonCheckbox;
