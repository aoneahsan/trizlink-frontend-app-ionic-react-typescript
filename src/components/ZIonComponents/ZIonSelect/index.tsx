// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSelect, SelectChangeEventDetail } from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core/dist/types/components';

// Type
import {
	ZIonColorType,
	ZIonModeType,
	ZIonPlacementType,
} from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonSelectType = {
	children: ReactNode;
	className?: string;
	cancelText?: string;
	compareWith?:
		| ((currentValue: unknown, compareValue: unknown) => boolean)
		| null
		| string;
	disabled?: boolean;
	interface?: 'action-sheet' | 'alert' | 'popover';
	mode?: ZIonModeType;
	multiple?: boolean;
	name?: string;
	okText?: string;
	placeholder?: string;
	selectedText?: null | string | undefined;
	value?: string | unknown;
	defaultValue?: string | number | readonly string[];
	color?: ZIonColorType;
	style?: {
		[key: string]: unknown;
	};
	minHeight?: 'auto' | string;
	testingSelector?: string;
	onIonChange?: (
		event: IonSelectCustomEvent<SelectChangeEventDetail<unknown>>
	) => void;
	onChange?: React.FormEventHandler<HTMLIonSelectElement>;
	onIonCancel?: (event: IonSelectCustomEvent<void>) => void;
	onIonBlur?: (event: IonSelectCustomEvent<void>) => void;

	// Ionic 7
	label?: string;
	labelPlacement?: ZIonPlacementType;
	fill?: 'solid' | 'outline';
	helperText?: string;
	errorText?: string;
};

const ZIonSelect = (props: ZIonSelectType) => {
	const compStyle =
		props.style && props.minHeight
			? { ...props.style, minHeight: props.minHeight }
			: props.style && !props.minHeight
			? { ...props.style }
			: !props.style && props.minHeight
			? { minHeight: props.minHeight }
			: {};

	//
	return (
		<IonSelect
			{...props}
			style={compStyle}
			{...createElementTestingSelector(props.testingSelector || PRODUCT_NAME)}
		>
			{props.children}
		</IonSelect>
	);
};

export default ZIonSelect;
