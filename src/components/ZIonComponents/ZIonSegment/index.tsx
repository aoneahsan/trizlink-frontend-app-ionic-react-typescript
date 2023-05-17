// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSegment, SegmentChangeEventDetail } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { IonSegmentCustomEvent } from '@ionic/core/dist/types/components';

type ZIonSegmentType = {
	children: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	disabled?: boolean;
	mode?: ZIonModeType;
	scrollable?: boolean;
	selectOnFocus?: boolean;
	swipeGesture?: boolean;
	value?: undefined | string;

	onIonChange?: (
		event: IonSegmentCustomEvent<SegmentChangeEventDetail>
	) => void;
};

const ZIonSegment = (props: ZIonSegmentType) => {
	return <IonSegment {...props}>{props.children}</IonSegment>;
};

export default ZIonSegment;
