import React from 'react';

import RCSwitch, { type SwitchChangeEventHandler } from 'rc-switch';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZRCSwitchType {
  className?: string;
  onChange?: SwitchChangeEventHandler;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
  style?: Record<string, unknown>;
  id?: string;

  //
  testingselector?: string;
  testinglistselector?: string;
}

const ZRCSwitch: React.FC<ZRCSwitchType> = props => {
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

  return (
    <RCSwitch
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZRCSwitch;
