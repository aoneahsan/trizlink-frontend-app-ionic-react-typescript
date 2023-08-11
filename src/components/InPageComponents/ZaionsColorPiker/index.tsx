/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	ZIonButton,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonSkeletonText,
} from '@/components/ZIonComponents';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';
import { closeCircleOutline, closeOutline } from 'ionicons/icons';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

interface ZaionsColorPikerType {
	value: string;
	name: string;
	showCloseIcon?: boolean;
	showSkeleton?: boolean;
	minHeight?: string;
	setDefaultColor?: string;
	testingSelector?: string;
	testingListSelector?: string;
	setFieldValueFn?: FormikSetFieldValueEventType;
	closeIconOnChangeFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsColorPiker: React.FC<ZaionsColorPikerType> = ({
	name,
	value,
	setFieldValueFn,
	showCloseIcon = false,
	showSkeleton = false,
	minHeight = '40px',
	setDefaultColor = '#000', //if color is values is empty the when color is be set.
	testingSelector,
	testingListSelector,
	closeIconOnChangeFn,
}) => {
	return (
		<>
			{!showSkeleton && (
				<ZIonItem
					className='flex mt-3 ion-no-padding ion-align-items-center'
					lines='none'
					minHeight={minHeight}
					testingSelector={testingSelector}
					testingListSelector={testingListSelector}
					style={{
						// '--border-color': '#000',
						// '--highlight-color-focused': value,
						'--inner-padding-end': '0px',
					}}
				>
					<input
						type='color'
						name={name}
						className='zaions-color-piker'
						value={value}
						onChange={({ target }) => {
							setFieldValueFn &&
								setFieldValueFn(name, target.value || setDefaultColor, false);
						}}
					/>
					<ZIonInput
						type='text'
						className='ms-2 zaions__fs_18'
						value={value}
						label=''
						fill='outline'
						minHeight={minHeight}
						style={{ '--background': '#fff' }}
						onIonChange={({ target }) => {
							setFieldValueFn &&
								setFieldValueFn(name, target.value || setDefaultColor, false);
						}}
					/>
					{showCloseIcon && (
						<ZIonButton
							slot='end'
							fill='clear'
							className='ion-no-padding ion-no-margin ms-2'
							onClick={closeIconOnChangeFn}
						>
							<ZIonIcon icon={closeCircleOutline} className='w-6 h-6' />
						</ZIonButton>
					)}
				</ZIonItem>
			)}

			{showSkeleton && <ZaionsColorPikerSkeleton />}
		</>
	);
};

const ZaionsColorPikerSkeleton: React.FC = React.memo(() => {
	return (
		<ZIonItem
			className='flex mt-3 ion-no-padding ion-align-items-center'
			lines='none'
			minHeight='40px'
			style={{
				// '--border-color': '#000',
				// '--highlight-color-focused': value,
				'--inner-padding-end': '0px',
			}}
		>
			<ZIonSkeletonText
				width='2.5rem'
				height='40px'
				className='me-2'
				animated={true}
			/>
			<ZIonSkeletonText width='100%' height='40px' animated={true} />
		</ZIonItem>
	);
});

export default ZaionsColorPiker;
