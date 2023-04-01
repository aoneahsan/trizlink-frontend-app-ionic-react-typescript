// Core Import
import { IonAccordionGroup } from '@ionic/react';
import React, { ReactNode } from 'react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';

// Packages Import

// Type
type ZIonAccordionGroupType = {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  disabled?: boolean;
  expand?: 'compact' | 'inset';
  mode?: ZIonModeType;
  multiple?: boolean;
  readonly?: boolean;
  value?: null | string | string[];
};

const ZIonAccordionGroup = (props: ZIonAccordionGroupType) => {
  return <IonAccordionGroup {...props}>{props.children}</IonAccordionGroup>;
};

export default ZIonAccordionGroup;
