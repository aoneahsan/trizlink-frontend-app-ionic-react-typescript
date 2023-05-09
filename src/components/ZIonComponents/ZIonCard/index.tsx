// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCard } from '@ionic/react';

// Type
import {
	ZIonColorType,
	ZIonModeType,
	ZIonRouterDirection,
	ZIonTargetType,
} from '@/types/zaionsAppSettings.type';

type ZIonCardType = {
	children: ReactNode;
	button?: boolean;
	color?: ZIonColorType;
	disabled?: boolean;
	download?: string;
	href?: string;
	mode?: ZIonModeType;
	rel?: string;
	// routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation),
	routerDirection?: ZIonRouterDirection;
	target?: ZIonTargetType;
	type?: 'button' | 'reset' | 'submit';
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	onMouseEnter?: React.MouseEventHandler<HTMLIonCardElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonCardElement>;
	onClick?: React.MouseEventHandler<HTMLIonCardElement>;
};

const ZIonCard = (props: ZIonCardType) => {
	return (
		<IonCard {...props} style={props.style}>
			{props.children}
		</IonCard>
	);
};

export default ZIonCard;
