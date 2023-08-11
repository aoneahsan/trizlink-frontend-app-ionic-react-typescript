// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonAvatar } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';

// Type
type ZIonAvatarType = {
	children?: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	mode?: ZIonModeType;
	slot?: 'start' | 'end';

	id?: string;

	onClick?: React.MouseEventHandler<HTMLIonAvatarElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonAvatarElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonAvatarElement>;

	//
	testingSelector?: string;
};

const ZIonAvatar = (props: ZIonAvatarType) => {
	return (
		<IonAvatar
			{...props}
			{...createElementTestingSelector({
				_value: props.testingSelector || PRODUCT_NAME
			})}
		>
			{props.children}
		</IonAvatar>
	);
};

export default ZIonAvatar;
