// Core Import
import React from 'react';

// Packages Import
import { DatetimeChangeEventDetail, IonDatetimeButton } from '@ionic/react';
import ZIonDatetime from '../ZIonDatetime';
import ZIonModal from '../ZIonModal';

//
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { IonDatetimeCustomEvent } from '@ionic/core/dist/types/components';

// Type
type ZIonDatetimeButtonType = {
  id: string;
  className?: string;
  style?: {
    [key: string]: unknown;
  };
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
};

const ZIonDatetimeButton = (props: ZIonDatetimeButtonType) => {
  return (
    <>
      <IonDatetimeButton
        {...props}
        date-target={props.dateTarget}
        time-target={props.timeTarget}
        datetime={`datetime-${props.id}`}
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
