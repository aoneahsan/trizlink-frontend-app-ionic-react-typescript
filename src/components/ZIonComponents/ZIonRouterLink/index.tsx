// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonRouterDirection,
  type ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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
}

const ZIonRouterLink: React.FC<ZIonRouterLinkType> = (
  props: ZIonRouterLinkType
) => {
  const _testinglistselector =
    props.testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
          })
        }
      : {};
  return (
    <IonRouterLink
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonRouterLink>
  );
};

export default ZIonRouterLink;
