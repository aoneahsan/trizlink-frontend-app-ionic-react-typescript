// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { InputChangeEventDetail, IonInput } from '@ionic/react';
import {
	ZIonColorType,
	ZIonModeType,
	ZIonPlacementType,
} from '@/types/zaionsAppSettings.type';

// Type
import { IonInputCustomEvent } from '@ionic/core/dist/types/components';

type ZIonInputAutoCompleteType =
	| 'name'
	| 'email'
	| 'tel'
	| 'url'
	| 'on'
	| 'off'
	| 'honorific-prefix'
	| 'given-name'
	| 'additional-name'
	| 'family-name'
	| 'honorific-suffix'
	| 'nickname'
	| 'username'
	| 'new-password'
	| 'current-password'
	| 'one-time-code'
	| 'organization-title'
	| 'organization'
	| 'street-address'
	| 'address-line1'
	| 'address-line2'
	| 'address-line3'
	| 'address-level4'
	| 'address-level3'
	| 'address-level2'
	| 'address-level1'
	| 'country'
	| 'country-name'
	| 'postal-code'
	| 'cc-name'
	| 'cc-given-name'
	| 'cc-additional-name'
	| 'cc-family-name'
	| 'cc-number'
	| 'cc-exp'
	| 'cc-exp-month'
	| 'cc-exp-year'
	| 'cc-csc'
	| 'cc-type'
	| 'transaction-currency'
	| 'transaction-amount'
	| 'language'
	| 'bday'
	| 'bday-day'
	| 'bday-month'
	| 'bday-year'
	| 'sex'
	| 'tel-country-code'
	| 'tel-national'
	| 'tel-area-code'
	| 'tel-local'
	| 'tel-extension'
	| 'impp'
	| 'photo';

export type ZIonInputType = {
	className?: string;
	autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
	autocomplete?: ZIonInputAutoCompleteType;
	autocorrect?: 'off' | 'on';
	autofocus?: boolean;
	clearInput?: boolean;
	clearOnEdit?: boolean;
	color?: ZIonColorType;
	debounce?: number;
	disabled?: boolean;
	enterkeyhint?:
		| 'done'
		| 'enter'
		| 'go'
		| 'next'
		| 'previous'
		| 'search'
		| 'send';
	inputmode?:
		| 'decimal'
		| 'email'
		| 'none'
		| 'numeric'
		| 'search'
		| 'tel'
		| 'text'
		| 'url';
	max?: number | string;
	maxlength?: number;
	min?: number;
	minlength?: number;
	mode?: ZIonModeType;
	multiple?: boolean;
	name?: string;
	pattern?:
		| string
		| 'text'
		| 'search'
		| 'tel'
		| 'url'
		| 'email'
		| 'date'
		| 'password';
	placeholder?: string;
	readonly?: boolean;
	required?: boolean;
	size?: number;
	spellcheck?: boolean;
	step?: string;
	type?:
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'month'
		| 'number'
		| 'password'
		| 'search'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';
	value?: null | number | string;
	defaultValue?: string | number | readonly string[];
	style?: {
		[key: string]: unknown;
	};
	minHeight?: 'auto' | string;

	onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
	onIonBlur?: <A extends Event>(event: A) => void;
	onChange?: React.FormEventHandler<HTMLIonInputElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLIonInputElement>;

	// Props Introduced in ionic 7
	label?: string;
	labelPlacement?: ZIonPlacementType;
	helperText?: string;
	errorText?: string;
	fill?: 'solid' | 'outline';
};

const ZIonInput = React.forwardRef(
	(props: ZIonInputType, ref: React.Ref<HTMLIonInputElement>) => {
		const compStyle =
			props.style && props.minHeight
				? { ...props.style, minHeight: props.minHeight }
				: props.style && !props.minHeight
				? { ...props.style }
				: !props.style && props.minHeight
				? { minHeight: props.minHeight }
				: {};

		return (
			<IonInput
				{...props}
				onIonInput={props.onIonChange}
				fill={props.fill || 'outline'}
				ref={ref}
				style={compStyle}
			/>
		);
	}
);

export default ZIonInput;
