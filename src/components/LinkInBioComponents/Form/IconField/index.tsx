// Core Imports
import React from 'react';

// Packages Imports
import { addCircleOutline } from 'ionicons/icons';
import {
  type InputChangeEventDetail,
  type IonInputCustomEvent
} from '@ionic/core';

// Custom Imports
import { ZIonIcon, ZIonInput, ZIonItem } from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioIconFieldInterface {
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string | number | null;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioIconField: React.FC<LinkInBioIconFieldInterface> = ({
  placeholder = 'Icon',
  value,
  name,
  className,
  testinglistselector,
  testingselector,
  onIonChange,
  onIonBlur
}) => {
  return (
    <ZIonItem
      className={`ion-item-start-no-padding ion-align-items-start ${className}`}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonInput
        aria-label='Icon input'
        minHeight='40px'
        className='ion-padding-start-point-8rem'
        name={name}
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}>
        <ZIonIcon
          icon={addCircleOutline}
          slot='start'
          color='medium'
          className='w-7 h-7 me-1'
        />
      </ZIonInput>
    </ZIonItem>
  );
};

export default LinkInBioIconField;
