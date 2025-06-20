// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonInput, ZIonItem } from '@/components/ZIonComponents';
import { type InputChangeEventDetail } from '@ionic/react';
import { type IonInputCustomEvent } from '@ionic/core';

// Styles

// Component Type
interface LinkInBioEmailFieldInterface {
  placeholder?: string;
  name?: string;
  value?: string | number | null;
  className?: string;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioEmailField: React.FC<LinkInBioEmailFieldInterface> = ({
  placeholder = 'johndoe@gmail.com',
  value,
  name,
  testinglistselector,
  testingselector,
  className,
  onIonChange,
  onIonBlur
}) => {
  return (
    <ZIonItem
      className={`ion-item-start-no-padding ${className}`}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonInput
        aria-label='email'
        name={name}
        className='ion-padding-start-point-8rem'
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        minHeight='40px'
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}
      />
    </ZIonItem>
  );
};

export default LinkInBioEmailField;
