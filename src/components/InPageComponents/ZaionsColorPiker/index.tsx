/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { FormikSetFieldValueEventType } from '@/types/ZaionsFormik.type';

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
	className?: string;
	colorInputClassName?: string;
	label?: string;
	showCloseIcon?: boolean;
	showInput?: boolean;
	setFieldValueFn?: FormikSetFieldValueEventType;
	closeIconOnChangeFn?: React.MouseEventHandler<HTMLIonButtonElement>;
	onClick?: (event?: unknown) => void;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsColorPiker: React.FC<ZaionsColorPikerType> = ({
	name,
	value,
	className,
	colorInputClassName,
	label,
	setFieldValueFn,
	showCloseIcon = false,
	showInput = false,
	closeIconOnChangeFn,
	onClick,
}) => {
	return (
		<ZIonItem
			className={classNames(className, {
				'flex mt-3 ion-no-padding ion-align-items-center': true,
			})}
			style={{
				// '--border-color': '#000',
				// '--highlight-color-focused': value,
				'--inner-padding-end': '0px',
			}}
			lines='none'
			minHeight='42px'
			onClick={onClick}
		>
			<input
				type='color'
				name={name}
				className={classNames(colorInputClassName, {
					'zaions-color-piker': true,
				})}
				onChange={({ target }) => {
					setFieldValueFn &&
						setFieldValueFn(name, target.value || '#000', false);
				}}
				value={value}
			/>
			{showInput && (
				<ZIonInput
					type='text'
					className='ms-2 zaions__fs_18'
					onIonChange={({ target }) => {
						setFieldValueFn &&
							setFieldValueFn(name, target.value || '#000', false);
					}}
					value={value}
					label={label}
					labelPlacement='stacked'
					fill='outline'
					minHeight='42px'
					style={{ '--background': '#fff', '--padding-start': '10px' }}
				/>
			)}
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
