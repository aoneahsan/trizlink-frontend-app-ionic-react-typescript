// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonItem } from '@/components/ZIonComponents';
import {
  type IonSearchbarCustomEvent,
  type SearchbarChangeEventDetail
} from '@ionic/core';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';
import { closeOutline, searchOutline } from 'ionicons/icons';

// Styles

// Component Type
interface LinkInBioSearchFieldInterface {
  placeholder?: string;
  value?: string | null;
  searchIcon?: string;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (
    event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioSearchField: React.FC<LinkInBioSearchFieldInterface> = ({
  placeholder = 'Search an address',
  value,
  searchIcon = searchOutline,
  testingselector,
  testinglistselector,
  onIonChange,
  onIonBlur
}) => {
  const _style = {
    '--box-shadow': 'none'
  };
  return (
    <ZIonItem
      className='ion-no-padding'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonSearchbar
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        searchIcon={searchIcon}
        clearIcon={closeOutline}
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}
        className='ion-no-padding'
        style={_style}
      />
    </ZIonItem>
  );
};

export default LinkInBioSearchField;
