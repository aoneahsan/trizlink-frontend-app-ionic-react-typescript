// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem, ZIonText } from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { type SwitchChangeEventHandler } from 'rc-switch';

// Styles

// Component Type
interface LinkInBioEnableFieldInterface {
  title?: string;
  icon?: string;
  checked?: boolean;
  testingselector?: string;
  testinglistselector?: string;
  onChange?: SwitchChangeEventHandler;
}

const LinkInBioEnableField: React.FC<LinkInBioEnableFieldInterface> = ({
  title = 'Title',
  icon = reorderTwoOutline,
  checked,
  testingselector,
  testinglistselector,
  onChange
}) => {
  return (
    <ZIonItem
      lines='none'
      className='mt-3'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      <ZIonIcon
        icon={icon}
        className='me-3'
        slot='start'
      />
      <ZIonText
        color='medium'
        testingselector={`${testingselector}-text`}
        testinglistselector={`${testinglistselector}-text`}>
        {title}
      </ZIonText>
      <ZIonText slot='end'>
        <ZRCSwitch
          onChange={onChange}
          checked={checked}
          testingselector={testingselector}
          testinglistselector={testinglistselector}
        />
      </ZIonText>
    </ZIonItem>
  );
};

export default LinkInBioEnableField;
