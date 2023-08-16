// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonTitle } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';
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
	testingSelector?: string;
	testingListSelector?: string;
};

const ZIonTitle = (props: ZIonTitleType) => {
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

	return (
		<IonTitle {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonTitle>
	);
};

export default ZIonTitle;
