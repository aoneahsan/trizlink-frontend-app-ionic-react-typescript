// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonSpinner } from '@ionic/react';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';

// Type
interface ZIonSpinnerInterface {
  children?: ReactNode;
  color?: ZIonColorType;
  duration?: number;
  name?:
    | 'bubbles'
    | 'circles'
    | 'circular'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-sharp'
    | 'lines-sharp-small'
    | 'lines-small';
  paused?: boolean;
  className?: string;
  style?: Record<string, unknown>;
}

const ZIonSpinner: React.FC<ZIonSpinnerInterface> = ({
  color = 'primary',
  duration,
  name = 'circles',
  paused = false,
  className,
  style,
  children
}) => {
  return (
    <IonSpinner
      color={color}
      duration={duration}
      name={name}
      paused={paused}
      className={className}
      style={style}>
      {children}
    </IonSpinner>
  );
};

export default ZIonSpinner;
