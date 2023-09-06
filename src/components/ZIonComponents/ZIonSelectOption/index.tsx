// Core Import
import { IonSelectOption } from '@ionic/react';
import React, { ReactNode } from 'react';

// Packages Import

// Type
type ZIonSelectOptionType = {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	value?: string | unknown;
	minHeight?: 'auto' | string;
	style?: {
		[key: string]: unknown;
	};
};

const ZIonSelectOption = (props: ZIonSelectOptionType) => {
	const compStyle =
		props.style && props.minHeight
			? { ...props.style, '--min-height': props.minHeight }
			: props.style && !props.minHeight
			? { ...props.style }
			: !props.style && props.minHeight
			? { '--min-height': props.minHeight }
			: {};

	return (
		<IonSelectOption {...props} style={compStyle}>
			{props.children}
		</IonSelectOption>
	);
};

export default ZIonSelectOption;
