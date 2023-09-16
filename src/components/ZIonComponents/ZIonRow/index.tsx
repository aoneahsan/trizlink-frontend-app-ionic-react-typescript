// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonRowType = {
  children: ReactNode;
  className?: string;
  testingselector?: string;
  testinglistselector?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLIonRowElement>;
};

const ZIonRow = (props: ZIonRowType) => {
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
    <IonRow
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonRow>
  );
};

export default ZIonRow;
