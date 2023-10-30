import React, { type ReactNode } from 'react';

import { Scrollbars } from 'react-custom-scrollbars-2';

interface ZRScrollBarType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
}

const ZRScrollbars: React.FC<ZRScrollBarType> = props => {
  return <Scrollbars {...props}>{props.children}</Scrollbars>;
};

export default ZRScrollbars;
