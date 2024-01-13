// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

interface ZIonRowType {
  children: ReactNode;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLIonRowElement>;
}

const ZIonRow: React.FC<ZIonRowType> = (props: ZIonRowType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonRow
      {...props}
      {..._testingSelector}
      {..._idSelector}
      {..._testinglistselector}>
      {props.children}
    </IonRow>
  );
};

export default ZIonRow;
