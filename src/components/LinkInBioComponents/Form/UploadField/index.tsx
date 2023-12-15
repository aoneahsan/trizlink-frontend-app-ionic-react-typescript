// Core Imports
import React from 'react';

// Packages Imports
import { imageOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem } from '@/components/ZIonComponents';
import ZDragAndDrop, {
  type ZDragAndDropType
} from '@/components/CustomComponents/ZDragAndDrop';

// Styles

// Component Type
interface LinkInBioUploadFieldInterface extends ZDragAndDropType {
  className?: string;
  dropdownHeight?: string;
}

const LinkInBioUploadField: React.FC<LinkInBioUploadFieldInterface> = ({
  className,
  dropdownHeight,
  imageUrl,
  testinglistselector,
  testingselector,
  multiple,
  autoFocus,
  disabled,
  maxSize,
  minSize,
  maxFiles,
  onDrop,
  onDropRejected,
  onError
}) => {
  const _style = { height: dropdownHeight };
  return (
    <ZIonItem
      lines='none'
      className={` ion-item-start-no-padding ${className}`}
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonIcon
        icon={imageOutline}
        slot='start'
        className='w-7 h-7 me-2'
      />
      <ZDragAndDrop
        imageUrl={imageUrl}
        style={_style}
        testingselector={testingselector}
        testinglistselector={testinglistselector}
        onDrop={onDrop}
        multiple={multiple}
        autoFocus={autoFocus}
        disabled={disabled}
        maxSize={maxSize}
        minSize={minSize}
        maxFiles={maxFiles}
        onDropRejected={onDropRejected}
        onError={onError}
      />
    </ZIonItem>
  );
};

export default LinkInBioUploadField;
