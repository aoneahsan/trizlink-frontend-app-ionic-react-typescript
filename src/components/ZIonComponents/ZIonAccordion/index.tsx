// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonAccordion } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonAccordionType = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  mode?: ZIonModeType;
  readonly?: boolean;
  toggleIcon?: string;
  toggleIconSlot?: 'end' | 'start';
  value?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZIonAccordion = (props: ZIonAccordionType) => {
  return <IonAccordion {...props}>{props.children}</IonAccordion>;
};

export default ZIonAccordion;
