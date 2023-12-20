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
import { type ZIonPlacementType } from '@/types/zaionsAppSettings.type';

// Styles

// Component Type
interface LinkInBioTitleFieldInterface {
  placeholder?: string;
  name?: string;
  labelPlacement?: ZIonPlacementType;
  label?: string;
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
  labelPlacement,
  label,
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
      className={`ion-item-start-no-padding ion-align-items-start ${className}`}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonInput
        aria-label='title'
        label={label}
        labelPlacement={labelPlacement}
        minHeight='40px'
        name={name}
        className='ion-padding-start-point-8rem'
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}>
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
              className='w-[25px] me-3'
              testingselector={`${testingselector}-image`}
              testinglistselector={`${testinglistselector}-image`}
            />
          )}
      </ZIonInput>
    </ZIonItem>
  );
};

export default LinkInBioTitleField;
