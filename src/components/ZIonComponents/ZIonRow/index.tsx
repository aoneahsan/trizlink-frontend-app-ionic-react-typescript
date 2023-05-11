// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';

type ZIonRowType = {
	children: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	onClick?: React.MouseEventHandler<HTMLIonRowElement>;
};

const ZIonRow = (props: ZIonRowType) => {
	return <IonRow {...props}>{props.children}</IonRow>;
};

export default ZIonRow;
