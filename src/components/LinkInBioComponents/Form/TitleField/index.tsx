// Core Imports
import React from 'react';

// Packages Imports
import { reorderTwoOutline } from 'ionicons/icons';
import { InputChangeEventDetail } from '@ionic/react';
import { IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import {
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
} from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioTitleFieldInterface {
	placeholder?: string;
	name?: string;
	value?: string | number | null;
	className?: string;
	showImageInSlot?: boolean;
	slotImageUrl?: string;
	testingListSelector?: string;
	testingSelector?: string;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
}

const LinkInBioTitleField: React.FC<LinkInBioTitleFieldInterface> = ({
	placeholder = 'Your Title',
	value,
	name,
	className,
	showImageInSlot = false,
	slotImageUrl,
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
			{!showImageInSlot && !slotImageUrl?.trim() && (
				<ZIonIcon
					icon={reorderTwoOutline}
					slot='start'
					className='w-7 h-7 me-2'
					testingSelector={`${testingSelector}-icon`}
					testingListSelector={`${testingListSelector}-icon`}
				/>
			)}

			{showImageInSlot && slotImageUrl?.trim() && (
				<ZIonImg
					src={slotImageUrl}
					style={{ width: '25px' }}
					slot='start'
					testingSelector={`${testingSelector}-image`}
					testingListSelector={`${testingListSelector}-image`}
				/>
			)}

			<ZIonInput
				label=''
				minHeight='40px'
				name={name}
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				testingSelector={`${testingSelector}-input`}
				testingListSelector={`${testingListSelector}-input`}
			/>
		</ZIonItem>
	);
};

export default LinkInBioTitleField;
