// Core Import
import React from 'react';

// Packages Import
import { type DatetimeChangeEventDetail, IonDatetime } from '@ionic/react';
import {
  type ZIonColorType,
  type ZIonModeType
} from '@/types/zaionsAppSettings.type';
import { type IonDatetimeCustomEvent } from '@ionic/core/dist/types/components';

// Type
interface ZIonDatetimeType {
  className?: string;
  color?: ZIonColorType;
  mode?: ZIonModeType;
  style?: Record<string, unknown>;
  cancelText?: string;
  clearText?: string;
  dayValues?: number | number[] | string;
  disabled?: boolean;
  doneText?: string;
  firstDayOfWeek?: number;
  hourCycle?: 'h12' | 'h23';
  hourValue?: number | number[] | string;
  locale?: string;
  max?: string;
  min?: string;
  minuteValues?: number | number[] | string;
  monthValues?: number | number[] | string;
  multiple?: boolean;
  name?: string;
  preferWheel?: boolean;
  presentation?:
    | 'date'
    | 'date-time'
    | 'month'
    | 'month-year'
    | 'time'
    | 'time-date'
    | 'year';
  readonly?: boolean;
  showClearButton?: boolean;
  showDefaultButtons?: boolean;
  showDefaultTimeLabel?: boolean;
  showDefaultTitle?: boolean;
  size?: 'cover' | 'fixed';
  value?: null | string | string[];
  yearValues?: number | number[] | string;
  id?: string;
  titleSelectedDatesFormatter?: (selectedDates: string[]) => string;
  isDateEnabled?: (dateIsoString: string) => boolean;
  onIonBlur?: (event: IonDatetimeCustomEvent<void>) => void;
  onIonCancel?: (event: IonDatetimeCustomEvent<void>) => void;
  onIonChange?: (
    event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => void;
  onIonFocus?: (event: IonDatetimeCustomEvent<void>) => void;
}

const ZIonDatetime: React.FC<ZIonDatetimeType> = (props: ZIonDatetimeType) => {
  return <IonDatetime {...props} />;
};

export default ZIonDatetime;
