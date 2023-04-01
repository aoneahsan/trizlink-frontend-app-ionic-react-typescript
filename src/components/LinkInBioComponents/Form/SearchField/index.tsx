// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonItem } from '@/components/ZIonComponents';
import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from '@ionic/core';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';
import { closeOutline, searchOutline } from 'ionicons/icons';

// Styles

// Component Type
interface LinkInBioSearchFieldInterface {
  placeholder?: string;
  value?: string | null;
  searchIcon?: string;
  onIonChange?: (
    event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioSearchField: React.FC<LinkInBioSearchFieldInterface> = ({
  placeholder = 'Search an address',
  value,
  searchIcon = searchOutline,
  onIonChange,
  onIonBlur,
}) => {
  return (
    <ZIonItem className='ion-no-padding'>
      <ZIonSearchbar
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        className='ion-no-padding'
        style={{
          '--box-shadow': 'none',
        }}
        searchIcon={searchIcon}
        clearIcon={closeOutline}
      />
    </ZIonItem>
  );
};

export default LinkInBioSearchField;
