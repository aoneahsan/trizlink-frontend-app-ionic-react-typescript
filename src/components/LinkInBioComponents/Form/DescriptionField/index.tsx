// Core Imports
import React from 'react';

// Packages Imports
import { reorderFourOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonIcon,
	ZIonItem,
	ZIonTextareaShort,
} from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioDescriptionFieldInterface {
	placeholder?: string;
	value?: string | null;
	name?: string;
	className?: string;
	testingListSelector?: string;
	testingSelector?: string;
	onIonChange?: (event: Event) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioDescriptionField: React.FC<
	LinkInBioDescriptionFieldInterface
> = ({
	placeholder = 'Your Description',
	value,
	name,
	className,
	testingListSelector,
	testingSelector,
	onIonChange,
	onIonBlur,
}) => {
	return (
		<ZIonItem
			className={className}
			lines='none'
			testingSelector={`${testingSelector}-item`}
			testingListSelector={`${testingListSelector}-item`}
		>
			<ZIonIcon
				icon={reorderFourOutline}
				slot='start'
				className='w-7 h-7 me-2'
				testingSelector={`${testingSelector}-icon`}
				testingListSelector={`${testingListSelector}-icon`}
			/>

			<ZIonTextareaShort
				label=''
				rows={3}
				value={value}
				name={name}
				fill='outline'
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				testingSelector={`${testingSelector}-textarea`}
				testingListSelector={`${testingListSelector}-textarea`}
			/>
		</ZIonItem>
	);
};

export default LinkInBioDescriptionField;
