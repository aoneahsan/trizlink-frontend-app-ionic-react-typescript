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
	ZIonItem,
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
	onIonChange?: (
		event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
	) => void;
}

const LinkInBioDateTimeField: React.FC<LinkInBioDateTimeFieldInterface> = ({
	value,
	name = '',
	id = '',
	onIonChange,
}) => {
	return (
		<ZIonItem
			style={{ '--background-hover': 'transparent', '--min-height': '31px' }}
		>
			<ZIonIcon icon={calendarOutline} slot='start' className='my-0 me-2' />

			<ZIonDatetimeButton
				name={name}
				className={classNames(classes['zaions-datetime-field'], {
					'zaions-datetime-btn w-full': true,
				})}
				onIonChange={onIonChange}
				id={id}
				value={dayjs(value).format(CONSTANTS.DateTime.iso8601DateTime)}
				min={new Date().toISOString()}
			/>
		</ZIonItem>
	);
};

export default LinkInBioDateTimeField;
