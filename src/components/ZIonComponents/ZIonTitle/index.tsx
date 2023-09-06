// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTitle } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

// Type
type ZIonTitleType = {
	children: ReactNode;
	color?: ZIonColorType;
	size?: 'large' | 'small' | undefined;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	testingselector?: string;
	testingListSelector?: string;
};

const ZIonTitle = (props: ZIonTitleType) => {
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

	return (
		<IonTitle {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonTitle>
	);
};

export default ZIonTitle;
