// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonImg } from '@ionic/react';

type ZIonImgType = {
	children?: ReactNode;
	src?: string;
	alt?: string;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end';
};

const ZIonImg = (props: ZIonImgType) => {
	return (
		<IonImg {...props} style={props.style}>
			{props.children}
		</IonImg>
	);
};

export default ZIonImg;
