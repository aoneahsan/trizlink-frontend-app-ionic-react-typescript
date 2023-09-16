// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonAccordion } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonAccordionType = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  mode?: ZIonModeType;
  readonly?: boolean;
  toggleIcon?: string;
  toggleIconSlot?: 'end' | 'start';
  value?: string;
  style?: {
    [key: string]: unknown;
  };
  //
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonAccordion = (props: ZIonAccordionType) => {
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
    <IonAccordion
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonAccordion>
  );
};

export default ZIonAccordion;
