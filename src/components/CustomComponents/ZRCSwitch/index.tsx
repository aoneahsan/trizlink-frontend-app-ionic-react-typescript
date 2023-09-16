import React from 'react';

import RCSwitch, { SwitchChangeEventHandler } from 'rc-switch';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZRCSwitchType = {
  className?: string;
  onChange?: SwitchChangeEventHandler;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
  style?: {
    [key: string]: unknown;
  };
  id?: string;

  //
  testingselector?: string;
  testinglistselector?: string;
};

const ZRCSwitch: React.FC<ZRCSwitchType> = props => {
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
    <RCSwitch
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
    />
  );
};

export default ZRCSwitch;
