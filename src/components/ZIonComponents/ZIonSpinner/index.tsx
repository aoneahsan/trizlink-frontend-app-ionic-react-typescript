// Core Import
import React from 'react';

// Packages Import
import { IonSpinner } from '@ionic/react';
import { ZIonColorType } from 'types/zaionsAppSettings.type';

// Type
interface ZIonSpinnerInterface {
  _color?: ZIonColorType;
  _duration?: number;
  _name?:
    | 'bubbles'
    | 'circles'
    | 'circular'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-sharp'
    | 'lines-sharp-small'
    | 'lines-small';
  _paused?: boolean;
}

const ZIonSpinner: React.FC<ZIonSpinnerInterface> = ({
  _color = 'primary',
  _duration,
  _name = 'circles',
  _paused = false,
}) => {
  return (
    <IonSpinner
      color={_color}
      duration={_duration}
      name={_name}
      paused={_paused}
    />
  );
};

export default ZIonSpinner;
