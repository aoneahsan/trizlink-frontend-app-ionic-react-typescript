// Core Import
import React, { type ReactNode } from 'react';
import { type ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Packages Import
import { IonAccordionGroup } from '@ionic/react';

// Type
interface ZIonAccordionGroupType {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  disabled?: boolean;
  expand?: 'compact' | 'inset';
  mode?: ZIonModeType;
  multiple?: boolean;
  readonly?: boolean;
  value?: null | string | string[];
  //
  testingselector?: string;
  testinglistselector?: string;
}

const ZIonAccordionGroup: React.FC<ZIonAccordionGroupType> = (
  props: ZIonAccordionGroupType
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

  return (
    <IonAccordionGroup
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonAccordionGroup>
  );
};

export default ZIonAccordionGroup;
