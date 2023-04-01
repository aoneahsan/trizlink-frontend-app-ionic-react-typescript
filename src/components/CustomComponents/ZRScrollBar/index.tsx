import React, { ReactNode } from 'react';

import { Scrollbars } from 'react-custom-scrollbars-2';

type ZRScrollBarType = {
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
};

const ZRScrollbars: React.FC<ZRScrollBarType> = (props) => {
  return <Scrollbars {...props}>{props.children}</Scrollbars>;
};

export default ZRScrollbars;
