// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { calendarOutline } from 'ionicons/icons';
import { DatetimeChangeEventDetail } from '@ionic/core';

// Custom Imports
import {
  ZIonDatetimeButton,
  ZIonIcon,
  ZIonItem
} from '@/components/ZIonComponents';

// Type
import { IonDatetimeCustomEvent } from '@ionic/core/dist/types/components';

// Styles
import classes from './styles.module.css';
import dayjs from 'dayjs';
import CONSTANTS from '@/utils/constants';

// Component Type
interface LinkInBioDateTimeFieldInterface {
  value?: string;
  name?: string;
  id?: string;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (
    event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => void;
}

const LinkInBioDateTimeField: React.FC<LinkInBioDateTimeFieldInterface> = ({
  value,
  name = '',
  id = '',
  testinglistselector,
  testingselector,
  onIonChange
}) => {
  return (
    <ZIonItem
      minHeight='32px'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}
      style={{ '--background-hover': 'transparent' }}>
      <ZIonIcon
        icon={calendarOutline}
        slot='start'
        className='my-0 me-2'
      />

      <ZIonDatetimeButton
        id={id}
        name={name}
        onIonChange={onIonChange}
        testingselector={testingselector}
        testinglistselector={testinglistselector}
        min={new Date().toISOString()}
        value={dayjs(value).format(CONSTANTS.DateTime.iso8601DateTime)}
        className={classNames(classes['zaions-datetime-field'], {
          'zaions-datetime-btn w-full': true
        })}
      />
    </ZIonItem>
  );
};

export default LinkInBioDateTimeField;
