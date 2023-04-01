// Core Imports
import React, { CSSProperties, FunctionComponent } from 'react';

// Packages Imports
import Select, {
  ActionMeta,
  ClearIndicatorProps,
  MultiValue,
  PropsValue,
} from 'react-select';

// Interface
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

interface ZaionsRSelectType {
  options: readonly ZaionsRSelectOptions[];
  className?: string;
  closeMenuOnSelect?: boolean;
  isMulti?: true;
  name?: string;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  value?: PropsValue<ZaionsRSelectOptions>;
  classNamePrefix?: string | null | undefined;
  defaultValue?: PropsValue<ZaionsRSelectOptions>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (
    newValue: MultiValue<ZaionsRSelectOptions>,
    actionMeta: ActionMeta<ZaionsRSelectOptions>
  ) => void;
}

const CustomClearText: FunctionComponent = () => <>clear all</>;
const ClearIndicator = (
  props: ClearIndicatorProps<ZaionsRSelectOptions, true>
) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as CSSProperties}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = <T extends object>(
  base: T,
  state: ClearIndicatorProps<ZaionsRSelectOptions>
) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'white' : 'white',
  border: 0,
});

const ZaionsRSelect: React.FC<ZaionsRSelectType> = (props) => {
  return (
    <Select
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      // defaultValue={[ZaionsRSelects[4], ZaionsRSelects[5]]}
      {...props}
      classNamePrefix={props.classNamePrefix || 'zaions__rs'}
      // menuIsOpen={true}
    />
  );
};

export default ZaionsRSelect;
