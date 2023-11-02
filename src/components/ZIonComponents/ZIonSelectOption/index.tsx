// Core Import
import { IonSelectOption } from '@ionic/react';
import React, { type ReactNode } from 'react';

// Packages Import

// Type
interface ZIonSelectOptionType {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  value?: string | unknown;
  minHeight?: 'auto' | string;
  style?: Record<string, unknown>;
}

const ZIonSelectOption: React.FC<ZIonSelectOptionType> = (
  props: ZIonSelectOptionType
) => {
  const compStyle =
    props.style !== undefined && props.minHeight !== undefined
      ? { ...props.style, '--min-height': props.minHeight }
      : props.style !== undefined && props.minHeight === undefined
      ? { ...props.style }
      : props.style === undefined && props.minHeight !== undefined
      ? { '--min-height': props.minHeight }
      : {};

  return (
    <IonSelectOption
      {...props}
      style={compStyle}>
      {props.children}
    </IonSelectOption>
  );
};

export default ZIonSelectOption;
