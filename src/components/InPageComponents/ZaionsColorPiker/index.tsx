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
import { closeOutline } from 'ionicons/icons';

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
	closeIconOnChangeFn,
}) => {
	return (
		<ZIonItem
			className='ion-no-padding flex ion-align-items-center mt-3'
			style={{
				// '--border-color': '#000',
				// '--highlight-color-focused': value,
				'--inner-padding-end': '0px',
			}}
			lines='none'
		>
			<input
				type='color'
				name={name}
				className='zaions-color-piker'
				onChange={({ target }) => {
					setFieldValueFn &&
						setFieldValueFn(name, target.value || '#000', false);
				}}
				value={value}
			/>
			<ZIonInput
				type='text'
				className='ms-2 zaions__fs_18'
				onIonChange={({ target }) => {
					setFieldValueFn &&
						setFieldValueFn(name, target.value || '#000', false);
				}}
				value={value}
				label=''
				fill='solid'
				style={{ '--background': '#fff' }}
			/>
			{showCloseIcon && (
				<ZIonButton
					slot='end'
					fill='clear'
					className='ion-no-padding ion-no-margin'
					onClick={closeIconOnChangeFn}
				>
					<ZIonIcon icon={closeOutline} />
				</ZIonButton>
			)}
		</ZIonItem>
	);
};

export default ZaionsColorPiker;
