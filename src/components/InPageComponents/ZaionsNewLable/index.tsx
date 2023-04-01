// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports

// Style
import classes from './style.module.css';

const ZaionsNewLabel: React.FC<{
  className?: string;
  title: string | JSX.Element | null;
}> = (props: { className?: string; title: string | JSX.Element | null }) => {
  return (
    <div
      className={classNames(props.className, {
        zaions_secondary_color: true,
        [classes.zaions_label_new]: true,
      })}
    >
      {props.title}
    </div>
  );
};

export default ZaionsNewLabel;
