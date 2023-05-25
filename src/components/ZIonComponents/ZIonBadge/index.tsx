// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonBadge } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonBadgeType = {
	children?: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	style?: {
		[key: string]: unknown;
	};
};

const ZIonBadge = (props: ZIonBadgeType) => {
	return <IonBadge {...props}>{props.children}</IonBadge>;
};

export default ZIonBadge;
