// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonImg } from '@ionic/react';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

interface ZIonImgType {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  slot?: 'start' | 'end';
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonImg: React.FC<ZIonImgType> = (props: ZIonImgType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });
  return (
    <IonImg
      {...props}
      style={props.style}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonImg>
  );
};

export default ZIonImg;
