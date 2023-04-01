// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { ZIonButton } from '@/components/ZIonComponents';

// Types
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

// Component Type
type ZRoundedButtonType = {
  className?: string;
  children?: ReactNode;
  color?: ZIonColorType;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
};

/**
 * Rounded button component for example in LinkInBioBlocksForm page
 */
const ZRoundedButton: React.FC<ZRoundedButtonType> = (props) => {
  return (
    <ZIonButton
      {...props}
      shape='round'
      style={{
        '--padding-top': '1.5rem',
        '--padding-bottom': '1.5rem',
        '--padding-start': '.9rem',
        '--padding-end': '.9rem',
      }}
    >
      {props.children}
    </ZIonButton>
  );
};

export default ZRoundedButton;
