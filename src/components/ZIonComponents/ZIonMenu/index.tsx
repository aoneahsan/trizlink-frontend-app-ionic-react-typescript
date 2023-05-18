// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonMenu } from '@ionic/react';

// Type
type ZIonMenuType = {
	children?: ReactNode;
	className?: string;
	contentId?: string;
	disabled?: boolean;
	maxEdgeStart?: number;
	menuId?: string;
	side?: 'end' | 'start';
	swipeGesture?: boolean;
	type?: 'overlay' | 'reveal' | 'push';
	style?: {
		[key: string]: unknown;
	};
};

const ZIonMenu = (props: ZIonMenuType) => {
	return <IonMenu {...props}>{props.children}</IonMenu>;
};

export default ZIonMenu;
