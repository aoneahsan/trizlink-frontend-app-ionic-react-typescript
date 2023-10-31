// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonNote } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
type ZIonNoteType = {
  children: ReactNode;
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  slot?: 'error' | 'helper';
  testingselector?: string;
  testinglistselector?: string;
};

const ZIonNote = (props: ZIonNoteType) => {
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
    <IonNote
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonNote>
  );
};

export default ZIonNote;
