// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonAvatar } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
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
	testingselector?: string;
};

const ZIonAvatar = (props: ZIonAvatarType) => {
	return (
		<IonAvatar
			{...props}
			{...zCreateElementTestingSelector({
				_value: props.testingselector || PRODUCT_NAME,
			})}
		>
			{props.children}
		</IonAvatar>
	);
};

export default ZIonAvatar;
