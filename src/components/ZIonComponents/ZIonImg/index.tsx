// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonImg } from '@ionic/react';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonImgType {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  slot?: 'start' | 'end';
  testingselector?: string;
  testinglistselector?: string;
}

const ZIonImg: React.FC<ZIonImgType> = (props: ZIonImgType) => {
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
