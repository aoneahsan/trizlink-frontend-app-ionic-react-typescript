// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonRouterDirection,
  type ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonRouterLinkType {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  href?: string;
  rel?: string;
  routerLink?: string;
  // routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation)
  routerDirection?: ZIonRouterDirection;
  target?: ZIonTargetType;

  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonRouterLink: React.FC<ZIonRouterLinkType> = (
  props: ZIonRouterLinkType
) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });
  return (
    <IonRouterLink
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonRouterLink>
  );
};

export default ZIonRouterLink;
