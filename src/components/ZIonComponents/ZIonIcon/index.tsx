// Core Import
import React from 'react';

// Packages Import
import { IonIcon } from '@ionic/react';

// Type
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonIconType = {
	icon?: string;
	className?: string;
	color?: ZIonColorType;
	testingselector?: string;
	testingListSelector?: string;
	size?: 'small' | 'large' | 'default';
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end' | 'icon-only';
	title?: string;
	id?: string;
	onClick?: React.MouseEventHandler<HTMLIonIconElement>;
};

const ZIonIcon = (props: ZIonIconType) => {
	const _testingListSelector = props.testingListSelector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingListSelector || PRODUCT_NAME,
					_key: zCreateElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = props.testingselector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingselector || PRODUCT_NAME,
				}),
		  }
		: {};
	return <IonIcon {...props} {..._testingSelector} {..._testingListSelector} />;
};

export default ZIonIcon;
