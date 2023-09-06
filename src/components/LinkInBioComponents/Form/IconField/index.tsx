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
	testingListSelector?: string;
	testingselector?: string;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioIconField: React.FC<LinkInBioIconFieldInterface> = ({
	placeholder = 'Icon',
	value,
	name,
	className,
	testingListSelector,
	testingselector,
	onIonChange,
	onIonBlur,
}) => {
	return (
		<ZIonItem
			className={className}
			lines='none'
			testingselector={`${testingselector}-item`}
			testingListSelector={`${testingListSelector}-item`}
		>
			<ZIonIcon icon={addCircleOutline} slot='start' className='w-7 h-7 me-2' />
			<ZIonInput
				label=''
				minHeight='40px'
				name={name}
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				testingselector={`${testingselector}-input`}
				testingListSelector={`${testingListSelector}-input`}
			/>
		</ZIonItem>
	);
};

export default LinkInBioIconField;
