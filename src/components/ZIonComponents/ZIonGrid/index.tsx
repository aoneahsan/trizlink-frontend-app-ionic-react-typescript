// Core Import
import React, { type ReactNode } from 'react';

// Packages Import
import { IonGrid } from '@ionic/react';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

interface ZIonGridType {
  children: ReactNode;
  fixed?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  testingselector?: string;
  testinglistselector?: string;
  onClick?: React.MouseEventHandler<HTMLIonGridElement>;
}

const ZIonGrid: React.FC<ZIonGridType> = props => {
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
    <IonGrid
      {...props}
      {..._testingSelector}
      {..._testinglistselector}>
      {props.children}
    </IonGrid>
  );
};

export default ZIonGrid;
