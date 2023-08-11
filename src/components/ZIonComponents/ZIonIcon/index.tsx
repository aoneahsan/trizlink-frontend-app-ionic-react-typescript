// Core Import
import React from 'react';

// Packages Import
import { IonIcon } from '@ionic/react';

// Type
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonIconType = {
	icon?: string;
	className?: string;
	color?: ZIonColorType;
	testingSelector?: string;
	testingListSelector?: string;
	size?: 'small' | 'large' | 'default';
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end';
	title?: string;
	id?: string;
	onClick?: React.MouseEventHandler<HTMLIonIconElement>;
};

const ZIonIcon = (props: ZIonIconType) => {
	const _testingListSelector = props.testingListSelector
		? {
				...createElementTestingSelector({
					_value: props.testingListSelector || PRODUCT_NAME,
					_key: createElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = props.testingSelector
		? {
				...createElementTestingSelector({
					_value: props.testingSelector || PRODUCT_NAME,
				}),
		  }
		: {};
	return <IonIcon {...props} {..._testingSelector} {..._testingListSelector} />;
};

export default ZIonIcon;
