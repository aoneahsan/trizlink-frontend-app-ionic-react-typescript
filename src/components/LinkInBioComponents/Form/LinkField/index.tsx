// Core Imports
import React from 'react';

// Packages Imports
import { linkOutline, refreshCircleOutline } from 'ionicons/icons';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import {
  ZIonButton,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem,
  ZIonTitle,
} from 'components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioLinkFieldInterface {
  placeholder?: string;
  showRefreshBtn?: boolean;
  name?: string;
  className?: string;
  showImageInSlot?: boolean;
  slotImageUrl?: string;
  value?: string | number | null;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
  RefreshBtnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const LinkInBioLinkField: React.FC<LinkInBioLinkFieldInterface> = ({
  placeholder = 'https://yourlink.com',
  showRefreshBtn = true,
  value,
  name,
  showImageInSlot = false,
  slotImageUrl,
  className,
  RefreshBtnClickFn,
  onIonChange,
  onIonBlur,
}) => {
  return (
    <ZIonItem className={className}>
      {!showImageInSlot && !slotImageUrl?.trim() && (
        <ZIonIcon icon={linkOutline} slot='start' />
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

      {showRefreshBtn && (
        <ZIonButton
          fill='clear'
          className='ion-no-padding'
          color='dark'
          slot='end'
          style={{
            '--background-hover-opacity': '0',
          }}
          onClick={RefreshBtnClickFn}
        >
          <ZIonTitle className='ion-no-padding'>
            <h4 className='ion-no-margin'>
              <ZIonIcon
                icon={refreshCircleOutline}
                className='mt-1'
                color='primary'
              />
            </h4>
          </ZIonTitle>
        </ZIonButton>
      )}
    </ZIonItem>
  );
};

export default LinkInBioLinkField;
