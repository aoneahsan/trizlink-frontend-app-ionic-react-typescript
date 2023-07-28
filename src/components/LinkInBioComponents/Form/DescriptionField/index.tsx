// Core Imports
import React from 'react';

// Packages Imports
import { reorderFourOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Styles

// Component Type
interface LinkInBioDescriptionFieldInterface {
	placeholder?: string;
	value?: string | null;
	name?: string;
	className?: string;
	onIonChange?: (event: Event) => void;
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
			<ZIonIcon
				icon={reorderFourOutline}
				slot='start'
				className='w-7 h-7 me-2'
			/>

			<ZIonTextarea
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				rows={3}
				name={name}
				label=''
				fill='outline'
			/>
		</ZIonItem>
	);
};

export default LinkInBioDescriptionField;
