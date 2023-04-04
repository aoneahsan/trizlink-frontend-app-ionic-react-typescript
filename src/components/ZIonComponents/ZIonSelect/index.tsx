// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSelect, SelectChangeEventDetail } from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core/dist/types/components';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
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
	onIonChange?: (
		event: IonSelectCustomEvent<SelectChangeEventDetail<unknown>>
	) => void;
	onChange?: React.FormEventHandler<HTMLIonSelectElement>;
	onIonCancel?: (event: IonSelectCustomEvent<void>) => void;
	onIonBlur?: (event: IonSelectCustomEvent<void>) => void;

	// Ionic 7
	label?: string;
	labelPlacement?: 'fixed' | 'floating' | 'stacked';
	fill?: 'solid' | 'outline';
};

const ZIonSelect = (props: ZIonSelectType) => {
	return <IonSelect {...props}>{props.children}</IonSelect>;
};

export default ZIonSelect;
