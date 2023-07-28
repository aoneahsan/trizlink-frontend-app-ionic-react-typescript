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
				id={id}
				className={classNames(classes['zaions-datetime-field'], {
					'zaions-datetime-btn': true,
				})}
				style={{
					width: '100%',
				}}
				value={value}
				name={name}
				onIonChange={onIonChange}
				min={new Date().toISOString()}
			/>
		</ZIonItem>
	);
};

export default LinkInBioDateTimeField;
