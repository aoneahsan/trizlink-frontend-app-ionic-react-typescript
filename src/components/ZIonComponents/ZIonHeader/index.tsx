// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonHeader } from '@ionic/react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonHeaderType = {
	children: ReactNode;
	className?: string;
	collapse?: 'condense' | 'fade';
	mode?: ZIonModeType;
	translucent?: boolean;
};

const ZIonHeader = (props: ZIonHeaderType) => {
	return <IonHeader {...props}>{props.children}</IonHeader>;
};

export default ZIonHeader;
