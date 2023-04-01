// Core Import
import { IonSelectOption } from '@ionic/react';
import React, { ReactNode } from 'react';

// Packages Import

// Type
type ZIonSelectOptionType = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  value?: string | unknown;
};

const ZIonSelectOption = (props: ZIonSelectOptionType) => {
  return <IonSelectOption {...props}>{props.children}</IonSelectOption>;
};

export default ZIonSelectOption;
