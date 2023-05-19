// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { CheckboxChangeEventDetail, IonCheckbox } from '@ionic/react';

// Type
import {
	ZIonColorType,
	ZIonModeType,
	ZIonSlotType,
} from '@/types/zaionsAppSettings.type';
import { IonCheckboxCustomEvent } from '@ionic/core/dist/types/components';

type ZIonCheckboxType = {
	className?: string;
	checked?: boolean;
	color?: ZIonColorType;
	disabled?: boolean;
	children?: ReactNode;
	indeterminate?: boolean;
	mode?: ZIonModeType;
	name?: string;
	value?: string;
	slot?: ZIonSlotType;
	labelPlacement?: 'end' | 'fixed' | 'start';
	onIonBlur?: (event: Event | CustomEvent<FocusEvent>) => void;
	onIonChange?: (
		event: IonCheckboxCustomEvent<CheckboxChangeEventDetail<unknown>>
	) => void;
	onIonFocus?: (event: Event | FocusEvent) => void;
	onClick?: () => void;
};

const ZIonCheckbox = (props: ZIonCheckboxType) => {
	return (
		<IonCheckbox
			{...props}
			aria-label={`zaions-checkbox-label-${props.name || ''}`}
		>
			{props.children}
		</IonCheckbox>
	);
};

export default ZIonCheckbox;
