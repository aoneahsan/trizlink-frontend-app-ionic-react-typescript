// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonAccordion } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zComponentTestingSelectorMaker } from '@/utils/helpers';

// Type
interface ZIonAccordionType {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  mode?: ZIonModeType;
  readonly?: boolean;
  toggleIcon?: string;
  toggleIconSlot?: 'end' | 'start';
  value?: string;
  style?: Record<string, unknown>;
  //
  testingselector?: string;
  testingIdSelector?: string;
  testinglistselector?: string;
}

const ZIonAccordion: React.FC<ZIonAccordionType> = (
  props: ZIonAccordionType
) => {
  const { _idSelector, _testingSelector, _testinglistselector } =
    zComponentTestingSelectorMaker({
      testingIdSelector: props.testingIdSelector,
      testinglistselector: props.testinglistselector,
      testingselector: props.testingselector
    });

  return (
    <IonAccordion
      {...props}
      {..._testingSelector}
      {..._testinglistselector}
      {..._idSelector}>
      {props.children}
    </IonAccordion>
  );
};

export default ZIonAccordion;
