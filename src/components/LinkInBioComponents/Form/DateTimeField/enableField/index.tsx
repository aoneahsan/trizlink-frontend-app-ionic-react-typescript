// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonItem, ZIonText } from 'components/ZIonComponents';
import ZRCSwitch from 'components/CustomComponents/ZRCSwitch';
import { SwitchChangeEventHandler } from 'rc-switch';

// Styles

// Component Type
interface LinkInBioEnableFieldInterface {
  title?: string;
  icon?: string;
  checked?: boolean;
  onChange?: SwitchChangeEventHandler;
}

const LinkInBioEnableField: React.FC<LinkInBioEnableFieldInterface> = ({
  title = 'Title',
  icon = reorderTwoOutline,
  checked,
  onChange,
}) => {
  return (
    <ZIonItem lines='none' className='mt-3'>
      <ZIonIcon icon={icon} className='me-3' slot='start' />
      <ZIonText color='medium'>{title}</ZIonText>
      <ZIonText slot='end'>
        <ZRCSwitch onChange={onChange} checked={checked} />
      </ZIonText>
    </ZIonItem>
  );
};

export default LinkInBioEnableField;
