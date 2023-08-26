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
import PhoneInput, {
	formatPhoneNumberIntl,
	isPossiblePhoneNumber,
} from 'react-phone-number-input';
import classNames from 'classnames';

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
import classes from './styles.module.css';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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
	placeholder?: string;
	onChange: (value: string) => void;
	onBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void;
	errorText?: string;
	className?: string;
	touched?: boolean;
	minHeight?: string;
	testingSelector?: string;
	testingListSelector?: string;
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
	placeholder = 'Enter phone number',
	errorText,
	className,
	minHeight = '2.5rem',
	style,
	touched = false,
	testingSelector,
	testingListSelector,
	onBlur,
	onChange,
}) => {
	const compStyle =
		style && minHeight
			? { ...style, minHeight: minHeight }
			: style && !minHeight
			? { ...style }
			: !style && minHeight
			? { minHeight: minHeight }
			: {};

	const _testingListSelector = testingListSelector
		? {
				...zCreateElementTestingSelector({
					_value: testingListSelector || PRODUCT_NAME,
					_key: zCreateElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = testingSelector
		? {
				...zCreateElementTestingSelector({
					_value: testingSelector || PRODUCT_NAME,
				}),
		  }
		: {};
	return (
		<div className={className}>
			<PhoneInput
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				style={compStyle}
				className={classNames(classes['z-custom-pn-field'], {
					'w-full': true,
					'z-ion-border-danger zaions_ion_color_danger':
						touched && errorText !== undefined,
					// 'z-ion-border-success': isPossiblePhoneNumber(value),
				})}
				{..._testingSelector}
				{..._testingListSelector}
				value={formatPhoneNumberIntl(String(value))}
			/>
			{errorText && errorText?.trim().length > 0 && (
				<ZIonNote color='danger' className='z-custom-pn-field-error-text'>
					{errorText}
				</ZIonNote>
			)}
		</div>
	);
};

export default ZCPhoneNumberInput;
