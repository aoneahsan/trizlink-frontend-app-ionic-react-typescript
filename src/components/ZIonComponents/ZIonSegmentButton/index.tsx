// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSegmentButton } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

type ZIonSegmentButtonType = {
	children: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	disabled?: boolean;
	mode?: ZIonModeType;
	value?: string;
	type?: 'button' | 'reset' | 'submit';
	layout?:
		| 'icon-bottom'
		| 'icon-end'
		| 'icon-hide'
		| 'icon-start'
		| 'icon-top'
		| 'label-hide';
	id?: string;
	onClick?: React.MouseEventHandler<HTMLIonSegmentButtonElement>;
};

const ZIonSegmentButton = (props: ZIonSegmentButtonType) => {
	return <IonSegmentButton {...props}>{props.children}</IonSegmentButton>;
};

export default ZIonSegmentButton;
