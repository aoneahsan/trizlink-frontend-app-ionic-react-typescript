// Core Imports
import React from 'react';

// Packages Imports
import { imageOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem } from 'components/ZIonComponents';
import ZDragAndDrop from 'components/CustomComponents/ZDragAndDrop';

// Styles

// Component Type
interface LinkInBioUploadFieldInterface {
  className?: string;
  dropdownHeight?: string;
}

const LinkInBioUploadField: React.FC<LinkInBioUploadFieldInterface> = ({
  className,
  dropdownHeight,
}) => {
  return (
    <ZIonItem lines='none' className={className}>
      <ZIonIcon icon={imageOutline} slot='start' />
      <ZDragAndDrop style={{ height: dropdownHeight }} />
    </ZIonItem>
  );
};

export default LinkInBioUploadField;
