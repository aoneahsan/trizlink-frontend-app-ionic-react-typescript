// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonPopover } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { IonPopoverCustomEvent } from '@ionic/core/dist/types/components';

type ZIonPopoverType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	alignment?: 'center' | 'end' | 'start';
	animated?: boolean;
	arrow?: boolean;
	backdropDismiss?: boolean;
	component?: Function | HTMLElement | null | string;
	componentProps?: { [key: string]: unknown };
	dismissOnSelect?: boolean;
	event?: unknown;
	htmlAttributes?: { [key: string]: unknown };
	isOpen?: boolean;
	keepContentsMounted?: boolean;
	keyboardClose?: boolean;
	reference?: 'event' | 'trigger';
	showBackdrop?: boolean;
	side?: 'bottom' | 'end' | 'left' | 'right' | 'start' | 'top';
	size?: 'auto' | 'cover';
	translucent?: boolean;
	trigger?: string;
	triggerAction?: 'click' | 'context-menu' | 'hover';

	onIonPopoverDidDismiss?: (
		event: IonPopoverCustomEvent<OverlayEventDetail<any>>
	) => void;
};

const ZIonPopover = (props: ZIonPopoverType) => {
	return <IonPopover {...props}> {props.children}</IonPopover>;
};

export default ZIonPopover;
