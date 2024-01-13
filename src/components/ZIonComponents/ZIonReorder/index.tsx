// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonReorder } from '@ionic/react';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

interface ZIonReorderType {
  children?: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  slot?: 'start' | 'end';

  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonReorder: React.FC<ZIonReorderType> = (props: ZIonReorderType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });
  return (
    <IonReorder
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}
      color='primary'>
      {props.children}
    </IonReorder>
  );
};

export default ZIonReorder;
