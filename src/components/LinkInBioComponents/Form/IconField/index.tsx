// Core Imports
import React from 'react';

// Packages Imports
import { addCircleOutline } from 'ionicons/icons';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import { ZIonIcon, ZIonInput, ZIonItem } from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioIconFieldInterface {
	placeholder?: string;
	name?: string;
	className?: string;
	value?: string | number | null;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioIconField: React.FC<LinkInBioIconFieldInterface> = ({
	placeholder = 'Icon',
	value,
	name,
	className,
	onIonChange,
	onIonBlur,
}) => {
	return (
		<ZIonItem className={className} lines='none'>
			<ZIonIcon icon={addCircleOutline} slot='start' className='w-7 h-7 me-2' />
			<ZIonInput
				name={name}
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				label=''
				minHeight='40px'
			/>
		</ZIonItem>
	);
};

export default LinkInBioIconField;
