// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';
import { type InputChangeEventDetail } from '@ionic/react';
import { type IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import {
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem
} from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioTitleFieldInterface {
  placeholder?: string;
  name?: string;
  value?: string | number | null;
  className?: string;
  showImageInSlot?: boolean;
  slotImageUrl?: string;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioTitleField: React.FC<LinkInBioTitleFieldInterface> = ({
  placeholder = 'Your Title',
  value,
  name,
  className,
  showImageInSlot = false,
  slotImageUrl,
  testinglistselector,
  testingselector,
  onIonChange,
  onIonBlur
}) => {
  return (
    <ZIonItem
      className={`ion-item-start-no-padding ${className}`}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      {!showImageInSlot &&
        slotImageUrl?.trim() === null &&
        slotImageUrl?.trim() === '' && (
          <ZIonIcon
            icon={reorderTwoOutline}
            slot='start'
            className='w-7 h-7 me-2'
            testingselector={`${testingselector}-icon`}
            testinglistselector={`${testinglistselector}-icon`}
          />
        )}

      {showImageInSlot &&
        slotImageUrl?.trim() !== null &&
        slotImageUrl?.trim() !== '' && (
          <ZIonImg
            src={slotImageUrl}
            slot='start'
            className='w-[25px]'
            testingselector={`${testingselector}-image`}
            testinglistselector={`${testinglistselector}-image`}
          />
        )}

      <ZIonInput
        aria-label='title'
        minHeight='40px'
        name={name}
        className='ion-padding-start-point-8rem'
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}
      />
    </ZIonItem>
  );
};

export default LinkInBioTitleField;
