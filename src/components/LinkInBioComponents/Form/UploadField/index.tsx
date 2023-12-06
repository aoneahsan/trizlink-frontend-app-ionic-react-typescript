// Core Imports
import React from 'react';

// Packages Imports
import { imageOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem } from '@/components/ZIonComponents';
import ZDragAndDrop from '@/components/CustomComponents/ZDragAndDrop';
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';

// Styles

// Component Type
interface LinkInBioUploadFieldInterface {
  className?: string;
  dropdownHeight?: string;
  fieldName?: string;
  imageUrl?: string;
  testinglistselector?: string;
  testingselector?: string;
  setFieldValue?: FormikSetFieldValueEventVoidType;
}

const LinkInBioUploadField: React.FC<LinkInBioUploadFieldInterface> = ({
  className,
  dropdownHeight,
  fieldName,
  imageUrl,
  testinglistselector,
  testingselector,
  setFieldValue
}) => {
  const _style = { height: dropdownHeight };
  return (
    <ZIonItem
      lines='none'
      className={className}
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonIcon
        icon={imageOutline}
        slot='start'
        className='w-7 h-7 me-2'
      />
      <ZDragAndDrop
        fieldName={fieldName}
        imageUrl={imageUrl}
        setFieldValue={setFieldValue}
        style={_style}
        testingselector={testingselector}
        testinglistselector={testinglistselector}
      />
    </ZIonItem>
  );
};

export default LinkInBioUploadField;
