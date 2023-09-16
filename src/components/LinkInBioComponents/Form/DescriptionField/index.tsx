// Core Imports
import React from 'react';

// Packages Imports
import { reorderFourOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonIcon,
  ZIonItem,
  ZIonTextareaShort
} from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioDescriptionFieldInterface {
  placeholder?: string;
  value?: string | null;
  name?: string;
  className?: string;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (event: Event) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioDescriptionField: React.FC<
  LinkInBioDescriptionFieldInterface
> = ({
  placeholder = 'Your Description',
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
      className={className}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonIcon
        icon={reorderFourOutline}
        slot='start'
        className='w-7 h-7 me-2'
        testingselector={`${testingselector}-icon`}
        testinglistselector={`${testinglistselector}-icon`}
      />

      <ZIonTextareaShort
        label=''
        rows={3}
        value={value}
        name={name}
        fill='outline'
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        testingselector={`${testingselector}-textarea`}
        testinglistselector={`${testinglistselector}-textarea`}
      />
    </ZIonItem>
  );
};

export default LinkInBioDescriptionField;
