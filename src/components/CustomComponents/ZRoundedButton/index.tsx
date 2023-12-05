// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { ZIonButton } from '@/components/ZIonComponents';

// Types
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import classNames from 'classnames';

// Component Type
interface ZRoundedButtonType {
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  children?: ReactNode;
  color?: ZIonColorType;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Rounded button component for example in LinkInBioBlocksForm page
 */
const ZRoundedButton: React.FC<ZRoundedButtonType> = props => {
  return (
    <ZIonButton
      {...props}
      shape='round'
      className={classNames(props.className, {
        'w-[3rem] ion-no-padding': true
      })}
      testinglistselector={props.testinglistselector}
      testingselector={props.testingselector}
      height='3rem'>
      {props.children}
    </ZIonButton>
  );
};

export default ZRoundedButton;
