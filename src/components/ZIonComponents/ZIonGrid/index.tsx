// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonGrid } from '@ionic/react';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

interface ZIonGridType {
  children: ReactNode;
  fixed?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
  onClick?: React.MouseEventHandler<HTMLIonGridElement>;
}

const ZIonGrid: React.FC<ZIonGridType> = props => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonGrid
      {...props}
      {..._testingSelector}
      {..._idSelector}
      {..._testinglistselector}>
      {props.children}
    </IonGrid>
  );
};

export default ZIonGrid;
