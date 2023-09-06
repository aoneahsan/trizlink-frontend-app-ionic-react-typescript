// Core Import
import { IonAccordionGroup } from '@ionic/react';
import React, { ReactNode } from 'react';
import { ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Packages Import

// Type
type ZIonAccordionGroupType = {
	children: ReactNode;
	className?: string;
	animated?: boolean;
	disabled?: boolean;
	expand?: 'compact' | 'inset';
	mode?: ZIonModeType;
	multiple?: boolean;
	readonly?: boolean;
	value?: null | string | string[];
	//
	testingselector?: string;
	testingListSelector?: string;
};

const ZIonAccordionGroup = (props: ZIonAccordionGroupType) => {
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
		<IonAccordionGroup
			{...props}
			{..._testingSelector}
			{..._testingListSelector}
		>
			{props.children}
		</IonAccordionGroup>
	);
};

export default ZIonAccordionGroup;
