// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
  ZIonColorType,
  ZIonRouterDirection,
  ZIonTargetType,
} from '@/types/zaionsAppSettings.type';

// Type
type ZIonRouterLinkType = {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  href?: string;
  rel?: string;
  routerLink?: string;
  // routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation)
  routerDirection?: ZIonRouterDirection;
  target?: ZIonTargetType;
};

const ZIonRouterLink = (props: ZIonRouterLinkType) => {
  return <IonRouterLink {...props}>{props.children}</IonRouterLink>;
};

export default ZIonRouterLink;
