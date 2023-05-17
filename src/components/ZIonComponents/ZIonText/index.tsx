// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonText } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';

// Type
type ZIonTextType = {
	children?: ReactNode;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end' | string;
	onClick?: React.MouseEventHandler<HTMLIonTextElement>;
};

const ZIonText = React.forwardRef(
	(props: ZIonTextType, ref: React.Ref<HTMLIonTextElement>) => {
		return (
			<IonText {...props} ref={ref}>
				{props.children}
			</IonText>
		);
	}
);

export default ZIonText;
