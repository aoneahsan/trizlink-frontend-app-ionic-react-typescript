import React from 'react';

import ReactSelect, {
  SingleValue,
  ActionMeta,
  GroupBase,
  MultiValue,
} from 'react-select';

type ZaionsRSelectPropsType = {
  options: readonly (string | GroupBase<string>)[];
  onChange: (
    newValue: SingleValue<string> | MultiValue<string>,
    actionMeta: ActionMeta<string>
  ) => void;
  value: string;
  isMulti?: boolean;
  className?: string;
  isLoading: boolean;
  isDisabled: boolean;
  name: string;
};

const ZaionsRSelectss: React.FC<ZaionsRSelectPropsType> = ({
  onChange,
  options,
  value,
  isMulti = false,
  className,
  isLoading,
  isDisabled,
  name,
}) => {
  return (
    <>
      <ReactSelect
        options={options}
        onChange={onChange}
        value={value}
        closeMenuOnSelect={true}
        isSearchable={true}
        isMulti={isMulti}
        className={className}
        isClearable={true}
        isLoading={isLoading}
        isDisabled={isDisabled}
        name={name}
      />
    </>
  );
};

export default ZaionsRSelectss;
