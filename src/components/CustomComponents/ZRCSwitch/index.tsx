import React from 'react';

import RCSwitch, { SwitchChangeEventHandler } from 'rc-switch';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZRCSwitchType = {
	className?: string;
	onChange?: SwitchChangeEventHandler;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	checkedChildren?: string;
	unCheckedChildren?: string;
	style?: {
		[key: string]: unknown;
	};
	id?: string;

	//
	testingSelector?: string;
	testingListSelector?: string;
};

const ZRCSwitch: React.FC<ZRCSwitchType> = (props) => {
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
		<RCSwitch {...props} {..._testingSelector} {..._testingListSelector} />
	);
};

export default ZRCSwitch;
