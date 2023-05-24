// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRadio } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

import { IonRadioCustomEvent } from '@ionic/core/dist/types/components';

type ZIonRadioType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	allowEmptySelection?: boolean;
	name?: string;
	value?: string;
	disabled?: boolean;
	justify?: 'end' | 'space-between' | 'start';
	labelPlacement?: 'end' | 'fixed' | 'start';
	legacy?: boolean;
	onIonBlur?: (event: IonRadioCustomEvent<void>) => void;
	onIonFocus?: (event: IonRadioCustomEvent<void>) => void;
};

const ZIonRadio = (props: ZIonRadioType) => {
	return <IonRadio {...props}>{props.children}</IonRadio>;
};

export default ZIonRadio;
