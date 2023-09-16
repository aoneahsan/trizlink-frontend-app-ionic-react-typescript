// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
  ZIonColorType,
  ZIonRouterDirection,
  ZIonTargetType
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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

  //
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonRouterLink = (props: ZIonRouterLinkType) => {
  const _testinglistselector = props.testinglistselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testinglistselector || PRODUCT_NAME,
          _key: zCreateElementTestingSelectorKeyEnum.listSelector
        })
      }
    : {};

  const _testingSelector = props.testingselector
    ? {
        ...zCreateElementTestingSelector({
          _value: props.testingselector || PRODUCT_NAME
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
