// Core Imports
import React from 'react';

// Packages Imports
import { ActionMeta, MultiValue, PropsValue } from 'react-select';

// Custom Imports
import ZTimezoneInput from '@/components/CustomComponents/ZTimezone';

// Type
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

// Styles

// Component Type
interface LinkInBioTimezoneFieldInterface {
  className?: string;
  value?: PropsValue<ZaionsRSelectOptions>;
  name?: string;
  testingselector?: string;
  testinglistselector?: string;
  onChange?: (
    newValue: MultiValue<ZaionsRSelectOptions>,
    actionMeta: ActionMeta<ZaionsRSelectOptions>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const LinkInBioTimezoneField: React.FC<LinkInBioTimezoneFieldInterface> = ({
  value,
  name,
  onChange,
  onBlur,
  testingselector,
  testinglistselector
}) => {
  return (
    <ZTimezoneInput
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      testingselector={testingselector}
      testinglistselector={testinglistselector}
    />
  );
};

export default LinkInBioTimezoneField;
