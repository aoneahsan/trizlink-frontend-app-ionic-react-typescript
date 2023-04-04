// Core Imports
import React from 'react';

// Packages Imports
import { reorderFourOutline } from 'ionicons/icons';

// Custom Imports
import { ZIonIcon, ZIonInput, ZIonItem } from '@/components/ZIonComponents';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Styles

// Component Type
interface LinkInBioDescriptionFieldInterface {
	placeholder?: string;
	value?: string | number | null;
	name?: string;
	className?: string;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioDescriptionField: React.FC<
	LinkInBioDescriptionFieldInterface
> = ({
	placeholder = 'Your Description',
	onIonChange,
	onIonBlur,
	value,
	name,
	className,
}) => {
	return (
		<ZIonItem className={className} lines='none'>
			<ZIonIcon icon={reorderFourOutline} slot='start' />

			<ZIonInput
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				name={name}
				label=''
			/>
		</ZIonItem>
	);
};

export default LinkInBioDescriptionField;
