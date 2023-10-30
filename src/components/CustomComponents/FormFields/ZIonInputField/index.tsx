// Core Import
import React from 'react';

// Packages Import
import { IonInput } from '@ionic/react';

// Type

import { type ZIonInputType } from '@/components/ZIonComponents/ZIonInput';

interface ZIonInputFieldType {
  inputFieldProps: ZIonInputType;
}

const ZIonInputField = React.forwardRef(
  (
    { inputFieldProps }: ZIonInputFieldType,
    ref: React.Ref<HTMLIonInputElement>
  ) => {
    return (
      <IonInput
        {...inputFieldProps}
        onIonInput={inputFieldProps.onIonChange}
        fill={inputFieldProps.fill ?? 'outline'}
        ref={ref}
      />
    );
  }
);
ZIonInputField.displayName = 'ZIonInputField';

export default ZIonInputField;
