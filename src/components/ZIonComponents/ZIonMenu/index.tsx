// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonMenu } from '@ionic/react';

// Type
interface ZIonMenuType {
  children?: ReactNode;
  className?: string;
  contentId?: string;
  disabled?: boolean;
  maxEdgeStart?: number;
  menuId?: string;
  side?: 'end' | 'start';
  swipeGesture?: boolean;
  type?: 'overlay' | 'reveal' | 'push';
  style?: Record<string, unknown>;
}

const ZIonMenu: React.FC<ZIonMenuType> = (props: ZIonMenuType) => {
  return <IonMenu {...props}>{props.children}</IonMenu>;
};

export default ZIonMenu;
