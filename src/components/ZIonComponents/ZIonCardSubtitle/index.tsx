// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonCardSubtitle } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonCardSubtitleType = {
	children?: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	mode?: ZIonModeType;
};

const ZIonCardSubtitle = (props: ZIonCardSubtitleType) => {
	return (
		<IonCardSubtitle {...props} style={props.style}>
			{props.children}
		</IonCardSubtitle>
	);
};

export default ZIonCardSubtitle;
