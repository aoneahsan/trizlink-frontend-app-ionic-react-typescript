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
  showIconInSlot?: boolean;
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
  showIconInSlot = true,
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
      <ZIonTextareaShort
        aria-label='description'
        rows={3}
        className='ion-padding-start-point-8rem ion-align-items-center'
        value={value}
        name={name}
        fill='outline'
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        testingselector={`${testingselector}-textarea`}
        testinglistselector={`${testinglistselector}-textarea`}>
        {showIconInSlot && (
          <ZIonIcon
            icon={reorderFourOutline}
            color='medium'
            slot='start'
            className='w-6 h-6 pt-3 me-2'
            testingselector={`${testingselector}-icon`}
            testinglistselector={`${testinglistselector}-icon`}
          />
        )}
      </ZIonTextareaShort>
    </ZIonItem>
  );
};

export default LinkInBioDescriptionField;
