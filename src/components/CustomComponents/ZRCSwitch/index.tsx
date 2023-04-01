import React from 'react';

import RCSwitch, { SwitchChangeEventHandler } from 'rc-switch';

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
};

const ZRCSwitch: React.FC<ZRCSwitchType> = (props) => {
  return <RCSwitch {...props} />;
};

export default ZRCSwitch;
