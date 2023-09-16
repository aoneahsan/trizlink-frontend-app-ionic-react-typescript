// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonImg } from '@ionic/react';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

type ZIonImgType = {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
  slot?: 'start' | 'end';
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonImg = (props: ZIonImgType) => {
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
    <IonImg
      {...props}
      style={props.style}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonImg>
  );
};

export default ZIonImg;
