// Core Imports
import React from 'react';

// Custom Imports
import classNames from 'classnames';
import { ZIonButton, ZIonImg } from '@/components/ZIonComponents';

// Style
import classes from './styles.module.css';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

// Component type
interface LinkInBioPDButtonInterface {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
  icon?: string;
  color?: ZIonColorType;
  testingselector?: string;
  testinglistselector?: string;
  style?: {
    [key: string]: unknown;
  };
}

// This button component is use to in blocks page where the single block is this single button. and also in musicPlatform, social block etc.
const LinkInBioPDButton: React.FC<LinkInBioPDButtonInterface> = ({
  className,
  icon,
  color = 'light',
  style,
  testingselector,
  testinglistselector,
  onClick,
  onMouseEnter
}) => {
  return (
    <ZIonButton
      style={style}
      size='large'
      fill='outline'
      color={color}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={classNames(className)} //classes['zaions-block-button'],
      height='4.5rem'
      testingselector={testingselector}
      testinglistselector={testinglistselector}>
      <ZIonImg
        src={icon}
        style={{ width: '25px' }}
      />
    </ZIonButton>
  );
};

export default LinkInBioPDButton;
