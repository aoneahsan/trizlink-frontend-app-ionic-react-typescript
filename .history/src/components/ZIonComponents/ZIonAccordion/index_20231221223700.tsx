// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonAccordion } from '@ionic/react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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
  testinglistselector?: string;
}

const ZIonAccordion: React.FC<ZIonAccordionType> = (
  props: ZIonAccordionType
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

  const _testingSelector =
    props.testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: props.testingselector
          })
        }
      : {};
  return (
    <IonAccordion
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonAccordion>
  );
};

export default ZIonAccordion;
