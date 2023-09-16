// Core Imports
import React, { CSSProperties, FunctionComponent } from 'react';

// Packages Imports
import Select, {
  ActionMeta,
  ClearIndicatorProps,
  MultiValue,
  PropsValue
} from 'react-select';

// Interface
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import classNames from 'classnames';
import { ZIonIcon } from '@/components/ZIonComponents';
import { closeOutline } from 'ionicons/icons';

interface ZaionsRSelectType {
  options: readonly ZaionsRSelectOptions[];
  className?: string;
  closeMenuOnSelect?: boolean;
  isMulti?: true;
  name?: string;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isRtl?: boolean;
  isSearchable?: boolean;
  value?: PropsValue<ZaionsRSelectOptions>;
  classNamePrefix?: string | null | undefined;
  defaultValue?: PropsValue<ZaionsRSelectOptions>;
  testingselector?: string;
  testinglistselector?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (
    newValue: MultiValue<ZaionsRSelectOptions>,
    actionMeta: ActionMeta<ZaionsRSelectOptions>
  ) => void;
}

const CustomClearText: FunctionComponent = () => (
  <ZIonIcon
    color='dark'
    icon={closeOutline}
  />
);
const ClearIndicator = (
  props: ClearIndicatorProps<ZaionsRSelectOptions, true>
) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps }
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as CSSProperties}>
      <div style={{ padding: '0px 0px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = <T extends object>(
  base: T,
  state: ClearIndicatorProps<ZaionsRSelectOptions>
) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'dark' : 'light',
  border: 0
});

const ZaionsRSelect: React.FC<ZaionsRSelectType> = props => {
  const _testinglistselector = props.testinglistselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testinglistselector || PRODUCT_NAME,
          _key: zCreateElementTestingSelectorKeyEnum.listSelector
        })
      }
    : {};

  const _testingSelector = props.testingselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testingselector || PRODUCT_NAME
        })
      }
    : {};
  return (
    <Select
      {...props}
      // components={{ ClearIndicator }}
      // styles={{ clearIndicator: ClearIndicatorStyles }}
      className={classNames('basic-single', props.className)}
      classNamePrefix={props.classNamePrefix || 'select'}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZaionsRSelect;
