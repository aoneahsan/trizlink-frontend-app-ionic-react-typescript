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
	height?: string;
	width?: string;
};

const ZIonSkeletonText = (props: ZIonSkeletonTextType) => {
	return (
		<IonSkeletonText
			{...props}
			animated={props.animated || true}
			style={{ ...props.style, width: props.width, height: props.height }}
		>
			{props.children}
		</IonSkeletonText>
	);
};

export default ZIonSkeletonText;
