// Core Import
import React from 'react';

// Packages Import
import {
  type DatetimeChangeEventDetail,
  IonDatetimeButton
} from '@ionic/react';
import ZIonDatetime from '../ZIonDatetime';
import ZIonModal from '../ZIonModal';

//
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { type IonDatetimeCustomEvent } from '@ionic/core/dist/types/components';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
interface ZIonDatetimeButtonType {
  id: string;
  className?: string;
  style?: Record<string, unknown>;
  color?: ZIonColorType;
  datetime?: string;
  disabled?: boolean;
  mode?: ZIonModeType;
  dateTarget?: string;
  value?: string;
  timeTarget?: string;
  name?: string;
  min?: string;
  onIonChange?: (
    event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => void;
  preferWheel?: boolean;
  testingselector?: string;
  testinglistselector?: string;
}

const ZIonDatetimeButton: React.FC<ZIonDatetimeButtonType> = (
  props: ZIonDatetimeButtonType
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
    <>
      <IonDatetimeButton
        {...props}
        date-target={props.dateTarget}
        time-target={props.timeTarget}
        datetime={`datetime-${props.id}`}
        {..._testingSelector}
        {..._testinglistselector}
      />
      <ZIonModal keepContentsMounted={true}>
        <ZIonDatetime
          id={`datetime-${props.id}`}
          name={props.name}
          onIonChange={props.onIonChange}
          value={props.value}
          min={props.min}
          preferWheel={props.preferWheel ?? true}
        />
      </ZIonModal>
    </>
  );
};

export default ZIonDatetimeButton;
