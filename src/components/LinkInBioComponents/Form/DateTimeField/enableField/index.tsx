// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonTitle
} from '@/components/ZIonComponents';
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
    <ZIonRow>
      <ZIonCol className='flex ion-align-items-center'>
        <ZIonIcon
          icon={icon}
          className='w-5 h-5 me-1'
        />
        <ZIonTitle
          className='font-bold text-[16px] mt-[3px] ion-no-padding'
          testingselector={`${testingselector}-text`}>
          {title}
        </ZIonTitle>
      </ZIonCol>

      <ZIonCol className='ion-text-end'>
        <ZRCSwitch
          checked={checked}
          onChange={onChange}
          testingselector={testingselector}
          testinglistselector={testinglistselector}
        />
      </ZIonCol>
    </ZIonRow>
  );
};

export default LinkInBioEnableField;
