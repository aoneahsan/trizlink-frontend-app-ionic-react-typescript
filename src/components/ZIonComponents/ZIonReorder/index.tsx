// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonReorder } from '@ionic/react';

type ZIonReorderType = {
	children?: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end';
};

const ZIonReorder = (props: ZIonReorderType) => {
	return (
		<IonReorder {...props} color='primary'>
			{props.children}
		</IonReorder>
	);
};

export default ZIonReorder;
