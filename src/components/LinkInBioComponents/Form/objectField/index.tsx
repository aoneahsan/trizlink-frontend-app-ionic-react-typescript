// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import { ZIonInput, ZIonItem } from '@/components/ZIonComponents';
import { InputChangeEventDetail } from '@ionic/react';
import { IonInputCustomEvent } from '@ionic/core';

// Styles

// Component Type
interface LinkInBioObjectFieldInterface {
	placeholder?: string;
	name?: string;
	value?: string | number | null;
	className?: string;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioObjectField: React.FC<LinkInBioObjectFieldInterface> = ({
	placeholder = 'object',
	value,
	name,
	className,
	onIonChange,
	onIonBlur,
}) => {
	return (
		<ZIonItem className={className} lines='none'>
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

export default LinkInBioObjectField;
