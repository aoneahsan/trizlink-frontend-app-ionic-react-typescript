// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
	ZIonColorType,
	ZIonRouterDirection,
	ZIonTargetType,
} from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';

// Type
type ZIonRouterLinkType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	href?: string;
	rel?: string;
	routerLink?: string;
	// routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation)
	routerDirection?: ZIonRouterDirection;
	target?: ZIonTargetType;

	//
	testingSelector?: string;
};

const ZIonRouterLink = (props: ZIonRouterLinkType) => {
	return (
		<IonRouterLink
			{...props}
			{...createElementTestingSelector(props.testingSelector || PRODUCT_NAME)}
		>
			{props.children}
		</IonRouterLink>
	);
};

export default ZIonRouterLink;
