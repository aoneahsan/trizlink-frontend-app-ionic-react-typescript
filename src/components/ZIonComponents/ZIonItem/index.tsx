// Core Import
import { ReactNode } from 'react';

// Packages Import
import { IonItem } from '@ionic/react';

// Type
import {
	ZIonColorType,
	ZIonModeType,
	ZIonRouterDirection,
} from '@/types/zaionsAppSettings.type';
type ZIonItemType = {
	children: ReactNode;
	className?: string;
	button?: boolean;
	color?: ZIonColorType;
	counter?: boolean;
	counterFormatter?: (inputLength: number, maxLength: number) => string;
	detail?: boolean;
	detailIcon?: string;
	disabled?: boolean;
	download?: string;
	fill?: 'outline' | 'solid';
	href?: string;
	lines?: 'full' | 'inset' | 'none';
	mode?: ZIonModeType;
	rel?: string;
	// routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation),
	routerDirection?: ZIonRouterDirection;
	shape?: 'round';
	target?: string;
	slot?: 'start' | 'end' | string;
	id?: string;
	type?: 'button' | 'reset' | 'submit';
	routerLink?: string;
	style?: {
		[key: string]: unknown;
	};
	onClick?: (event?: unknown) => void;
	minHeight?: 'auto' | string;
};

const ZIonItem = (props: ZIonItemType) => {
	const compStyle =
		props.style && props.minHeight
			? { ...props.style, '--min-height': props.minHeight }
			: props.style && !props.minHeight
			? { ...props.style }
			: !props.style && props.minHeight
			? { '--min-height': props.minHeight }
			: {};
	return (
		<IonItem {...props} style={compStyle}>
			{props.children}
		</IonItem>
	);
};

export default ZIonItem;
