// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRippleEffect } from '@ionic/react';

type ZIonRippleEffectType = {
  children?: ReactNode;
  className?: string;
  type?: 'bounded' | 'unbounded';
  style?: {
    [key: string]: unknown;
  };
};

const ZIonRippleEffect = (props: ZIonRippleEffectType) => {
  return <IonRippleEffect {...props}>{props.children}</IonRippleEffect>;
};

export default ZIonRippleEffect;
