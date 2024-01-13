// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonMenu } from '@ionic/react';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonMenuType {
  children?: ReactNode;
  className?: string;
  contentId?: string;
  disabled?: boolean;
  maxEdgeStart?: number;
  menuId?: string;
  side?: 'end' | 'start';
  swipeGesture?: boolean;
  type?: 'overlay' | 'reveal' | 'push';
  style?: Record<string, unknown>;

  //
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
}

const ZIonMenu: React.FC<ZIonMenuType> = (props: ZIonMenuType) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingidselector: props.testingidselector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });
  return (
    <IonMenu
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonMenu>
  );
};

export default ZIonMenu;
