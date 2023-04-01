// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';
import { InputChangeEventDetail } from '@ionic/react';
import { IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import {
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem,
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
  onIonChange,
  onIonBlur,
}) => {
  return (
    <ZIonItem className={className}>
      {!showImageInSlot && !slotImageUrl?.trim() && (
        <ZIonIcon icon={reorderTwoOutline} slot='start' />
      )}

      {showImageInSlot && slotImageUrl?.trim() && (
        <ZIonImg src={slotImageUrl} style={{ width: '25px' }} slot='start' />
      )}

      <ZIonInput
        name={name}
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
      />
    </ZIonItem>
  );
};

export default LinkInBioTitleField;
