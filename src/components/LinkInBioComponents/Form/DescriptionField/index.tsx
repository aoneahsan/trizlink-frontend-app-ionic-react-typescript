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
      className={`${className} ion-item-start-no-padding`}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonIcon
        icon={reorderFourOutline}
        slot='start'
        className='mt-0 mb-6 w-7 h-7 me-2'
        testingselector={`${testingselector}-icon`}
        testinglistselector={`${testinglistselector}-icon`}
      />

      <ZIonTextareaShort
        aria-label='description'
        rows={3}
        className='ion-padding-start-point-8rem'
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
