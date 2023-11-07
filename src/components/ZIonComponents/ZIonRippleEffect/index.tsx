// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRippleEffect } from '@ionic/react';

interface ZIonRippleEffectType {
  children?: ReactNode;
  className?: string;
  type?: 'bounded' | 'unbounded';
  style?: Record<string, unknown>;
}

const ZIonRippleEffect: React.FC<ZIonRippleEffectType> = (
  props: ZIonRippleEffectType
) => {
  return <IonRippleEffect {...props}>{props.children}</IonRippleEffect>;
};

export default ZIonRippleEffect;
