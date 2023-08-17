// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonSegmentButton } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

type ZIonSegmentButtonType = {
	children: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	disabled?: boolean;
	mode?: ZIonModeType;
	value?: string;
	type?: 'button' | 'reset' | 'submit';
	testingSelector?: string;
	testingListSelector?: string;
	layout?:
		| 'icon-bottom'
		| 'icon-end'
		| 'icon-hide'
		| 'icon-start'
		| 'icon-top'
		| 'label-hide';
	id?: string;
	onClick?: React.MouseEventHandler<HTMLIonSegmentButtonElement>;
};

const ZIonSegmentButton = (props: ZIonSegmentButtonType) => {
	const _testingListSelector = props.testingListSelector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingListSelector || PRODUCT_NAME,
					_key: zCreateElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = props.testingSelector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingSelector || PRODUCT_NAME,
				}),
		  }
		: {};

	return (
		<IonSegmentButton
			{...props}
			{..._testingSelector}
			{..._testingListSelector}
		>
			{props.children}
		</IonSegmentButton>
	);
};

export default ZIonSegmentButton;
