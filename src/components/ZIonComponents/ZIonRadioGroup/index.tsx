// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRadioGroup, RadioGroupChangeEventDetail } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

import { IonRadioGroupCustomEvent } from '@ionic/core/dist/types/components';

type ZIonRadioGroupType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	allowEmptySelection?: boolean;
	name?: string;
	value?: string;
	onIonChange?: (
		event: IonRadioGroupCustomEvent<RadioGroupChangeEventDetail<unknown>>
	) => void;
};

const ZIonRadioGroup = (props: ZIonRadioGroupType) => {
	return <IonRadioGroup {...props}>{props.children}</IonRadioGroup>;
};

export default ZIonRadioGroup;
