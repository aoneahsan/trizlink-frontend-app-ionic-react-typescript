// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonChip } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonChipType = {
	children: ReactNode;
	color?: ZIonColorType;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	disabled?: boolean;
	mode?: ZIonModeType;
	outline?: boolean;
	testingSelector?: string;
	testingListSelector?: string;
	onClick?: React.MouseEventHandler<HTMLIonChipElement>;
};

const ZIonChip = (props: ZIonChipType) => {
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
		<IonChip {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonChip>
	);
};

export default ZIonChip;
