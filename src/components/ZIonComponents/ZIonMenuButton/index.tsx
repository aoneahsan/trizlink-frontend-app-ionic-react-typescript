// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonMenuButton } from '@ionic/react';
import {
	ZIonButtonType,
	ZIonColorType,
	ZIonModeType,
} from '@/types/zaionsAppSettings.type';

// Type
type ZIonMenuButtonType = {
	children?: ReactNode;
	className?: string;
	autoHide?: boolean;
	color?: ZIonColorType;
	disabled?: boolean;
	menu?: string;
	mode?: ZIonModeType;
	type?: ZIonButtonType;
};

const ZIonMenuButton = (props: ZIonMenuButtonType) => {
	return <IonMenuButton {...props}>{props.children}</IonMenuButton>;
};

export default ZIonMenuButton;
