// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSkeletonText } from '@ionic/react';

// Type
import { ZIonModeType } from '@/types/zaionsAppSettings.type';
type ZIonSkeletonTextType = {
	children?: ReactNode;
	className?: string;
	animated?: boolean;
	mode?: ZIonModeType;
	style?: {
		[key: string]: unknown;
	};
};

const ZIonSkeletonText = (props: ZIonSkeletonTextType) => {
	return <IonSkeletonText {...props}>{props.children}</IonSkeletonText>;
};

export default ZIonSkeletonText;
