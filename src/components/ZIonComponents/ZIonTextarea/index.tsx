// Core Import
import React from 'react';

// Packages Import
import { IonTextarea } from '@ionic/react';

import { IonTextareaCustomEvent } from '@ionic/core/dist/types/components';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
type ZIonTextareaType = {
	className?: string;
	autoGrow?: boolean;
	autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
	autofocus?: boolean;
	clearOnEdit?: boolean;
	color?: ZIonColorType;
	cols?: number;
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
	maxlength?: number;
	minlength?: number;
	mode?: ZIonModeType;
	name?: string;
	placeholder?: string;
	readonly?: boolean;
	required?: boolean;
	rows?: number;
	spellcheck?: boolean;
	value?: null | string;
	wrap?: 'hard' | 'off' | 'soft';
	onIonChange?: (event: Event) => void;
	onIonBlur?: (event: IonTextareaCustomEvent<FocusEvent>) => void;

	// Ionic 7
	label?: string;
	labelPlacement?: 'fixed' | 'floating' | 'stacked';
	helperText?: string;
	errorText?: string;
	fill?: 'solid' | 'outline';
};

const ZIonTextarea = (props: ZIonTextareaType) => {
	return <IonTextarea {...props} onIonInput={props.onIonChange} />;
};

export default ZIonTextarea;
