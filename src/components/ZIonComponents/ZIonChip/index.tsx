// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonChip } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonChipType = {
	children: ReactNode;
	color?: ZIonColorType;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	disabled?: boolean;
	mode?: ZIonModeType;
	outline?: boolean;
	onClick?: React.MouseEventHandler<HTMLIonChipElement>;
};

const ZIonChip = (props: ZIonChipType) => {
	return <IonChip {...props}>{props.children}</IonChip>;
};

export default ZIonChip;
