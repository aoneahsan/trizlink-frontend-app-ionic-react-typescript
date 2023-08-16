// Core Imports
import React from 'react';

// Packages Imports
import { linkOutline, refreshCircleOutline } from 'ionicons/icons';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';

// Custom Imports
import {
	ZIonButton,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonTitle,
} from '@/components/ZIonComponents';

// Styles

// Component Type
interface LinkInBioLinkFieldInterface {
	placeholder?: string;
	showRefreshBtn?: boolean;
	name?: string;
	className?: string;
	showImageInSlot?: boolean;
	slotImageUrl?: string;
	value?: string | number | null;
	testingListSelector?: string;
	testingSelector?: string;
	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
	RefreshBtnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const LinkInBioLinkField: React.FC<LinkInBioLinkFieldInterface> = ({
	placeholder = 'https://yourlink.com',
	showRefreshBtn = true,
	value,
	name,
	showImageInSlot = false,
	slotImageUrl,
	className,
	testingListSelector,
	testingSelector,
	RefreshBtnClickFn,
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
					icon={linkOutline}
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
				name={name}
				minHeight='40px'
				placeholder={placeholder}
				onIonChange={onIonChange}
				onIonBlur={onIonBlur}
				value={value}
				testingSelector={`${testingSelector}-input`}
				testingListSelector={`${testingListSelector}-input`}
			/>

			{showRefreshBtn && (
				<ZIonButton
					fill='clear'
					color='dark'
					slot='end'
					height='35px'
					className='ion-no-padding ms-2'
					onClick={RefreshBtnClickFn}
					testingSelector={`${testingSelector}-refresh-btn`}
					testingListSelector={`${testingListSelector}-refresh-btn`}
					style={{
						'--background-hover-opacity': '0',
					}}
				>
					<ZIonIcon
						icon={refreshCircleOutline}
						className='w-7 h-7'
						color='primary'
					/>
				</ZIonButton>
			)}
		</ZIonItem>
	);
};

export default LinkInBioLinkField;
