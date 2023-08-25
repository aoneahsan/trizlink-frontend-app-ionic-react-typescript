/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ZIonNote } from '@/components/ZIonComponents';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import 'react-phone-number-input/style.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface IZCPhoneNumberInput {
	value?: string;
	onBlur?(event: React.FocusEvent<HTMLElement, Element>): void;
	onChange(value?: string | undefined): void;
	errorsText?: string;
	className?: string;
	minHeight?: string;
	style?: {
		[key: string]: unknown;
	};
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZCPhoneNumberInput: React.FC<IZCPhoneNumberInput> = ({
	value,
	onBlur,
	onChange,
	errorsText,
	className,
	minHeight,
	style,
}) => {
	const compStyle =
		style && minHeight
			? { ...style, minHeight: minHeight }
			: style && !minHeight
			? { ...style }
			: !style && minHeight
			? { minHeight: minHeight }
			: {};
	return (
		<>
			<PhoneInput
				placeholder='Enter phone number'
				onBlur={onBlur}
				onChange={onChange}
				style={compStyle}
				className={className}
				value={formatPhoneNumberIntl(String(value))}
			/>
			{errorsText && errorsText?.trim().length > 0 && (
				<ZIonNote color='danger'>{errorsText}</ZIonNote>
			)}
		</>
	);
};

export default ZCPhoneNumberInput;
