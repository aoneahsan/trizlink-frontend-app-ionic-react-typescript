import React from 'react';

import classNames from 'classnames';

import classes from './styles.module.css';

type ZRCheckboxType = {
  handleChange: (val: boolean) => void;
  checkedValue?: boolean;
  className?: string;
};

const ZRCheckbox: React.FC<ZRCheckboxType> = ({
  handleChange,
  checkedValue,
  className,
}) => {
  return (
    <input
      type='checkbox'
      checked={checkedValue}
      onChange={(e) => {
        handleChange(e.target.checked);
      }}
      className={classNames(className, classes['zr-checkbox'])}
    />
  );
};

export default ZRCheckbox;
