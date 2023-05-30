// Core Imports
import { ReactNode } from 'react';

// Packages Imports
import { IonLoading } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import {
	IonicSafeString,
	IonLoadingCustomEvent,
} from '@ionic/core/dist/types/components';

// Type
type ZIonLoadingType = {
	children?: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	mode?: ZIonModeType;
	animated?: boolean;
	backdropDismiss?: boolean;
	cssClass?: string | string[];
	duration?: number;
	htmlAttributes?: { [key: string]: unknown };
	isOpen?: boolean;
	keyboardClose?: boolean;
	message?: IonicSafeString | string;
	showBackdrop?: boolean;
	spinner?:
		| 'bubbles'
		| 'circles'
		| 'circular'
		| 'crescent'
		| 'dots'
		| 'lines'
		| 'lines-sharp'
		| 'lines-sharp-small'
		| 'lines-small'
		| null;
	translucent?: boolean;
	trigger?: string;

	onDidDismiss?: (
		event: IonLoadingCustomEvent<OverlayEventDetail<any>>
	) => void;
	onDidPresent?: (event: IonLoadingCustomEvent<void>) => void;
	onIonLoadingWillPresent?: (event: IonLoadingCustomEvent<void>) => void;
	onWillDismiss?: (
		event: IonLoadingCustomEvent<OverlayEventDetail<unknown>>
	) => void;
	onWillPresent?: (event: IonLoadingCustomEvent<void>) => void;
	// leaveAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
	// enterAnimation?: (baseEl: unknown, opts?: unknown) => Animation;
};

const ZIonLoading = (props: ZIonLoadingType) => {
	return <IonLoading {...props}>{props.children}</IonLoading>;
};

export default ZIonLoading;
