// Core Imports
import React from 'react';

// Packages Imports
import Select, {
  type SingleValue,
  type ActionMeta,
  type MultiValue,
  type PropsValue,
  type GroupBase,
  type OptionsOrGroups
} from 'react-select';
import classNames from 'classnames';

// Custom Imports
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Types Imports
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

interface ZaionsRSelectType {
  options: OptionsOrGroups<
    ZaionsRSelectOptions,
    GroupBase<ZaionsRSelectOptions>
  >;
  className?: string;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
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
  // onChange?: (
  //   newValue: MultiValue<ZaionsRSelectOptions>,
  //   actionMeta: ActionMeta<ZaionsRSelectOptions>
  // ) => void;
  onChange?: (
    newValue:
      | MultiValue<ZaionsRSelectOptions>
      | SingleValue<ZaionsRSelectOptions>,
    actionMeta: ActionMeta<ZaionsRSelectOptions>
  ) => void;
}

// const CustomClearText: FunctionComponent = () => (
//   <ZIonIcon
//     color='dark'
//     icon={closeOutline}
//   />
// );
// const ClearIndicator = (
//   props: ClearIndicatorProps<ZaionsRSelectOptions, true>
// ) => {
//   const {
//     children = <CustomClearText />,
//     getStyles,
//     innerProps: { ref, ...restInnerProps }
//   } = props;
//   return (
//     <div
//       {...restInnerProps}
//       ref={ref}
//       style={getStyles('clearIndicator', props) as CSSProperties}>
//       <div className='p-0'>{children}</div>
//     </div>
//   );
// };

// const ClearIndicatorStyles = <T extends object>(
//   base: T,
//   state: ClearIndicatorProps<ZaionsRSelectOptions>
// ) => ({
//   ...base,
//   cursor: 'pointer',
//   color: state.isFocused ? 'dark' : 'light',
//   border: 0
// });

const ZaionsRSelect: React.FC<ZaionsRSelectType> = props => {
  const _testinglistselector =
    props.testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
          })
        }
      : {};

  // const _components = { ClearIndicator }
  // const _styles = { clearIndicator: ClearIndicatorStyles }
  return (
    <Select
      {...props}
      // components={_components}
      // styles={_styles}
      className={classNames('basic-single', props.className)}
      classNamePrefix={
        props.classNamePrefix !== undefined ? props.classNamePrefix : 'select'
      }
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZaionsRSelect;
