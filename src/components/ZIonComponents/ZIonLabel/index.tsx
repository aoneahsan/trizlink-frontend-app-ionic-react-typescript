// Core Imports
import React, { ReactNode } from 'react';

// Packages Import
import { IonLabel } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';
type ZIonLabelType = {
	children: ReactNode;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	position?: 'fixed' | 'floating' | 'stacked';
	className?: string;
	testingSelector?: string;
	testingListSelector?: string;
	onClick?: () => void;
};

const ZIonLabel = (props: ZIonLabelType) => {
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
		<IonLabel {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonLabel>
	);
};

export default ZIonLabel;
