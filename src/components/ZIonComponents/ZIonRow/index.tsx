// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonRowType = {
	children: ReactNode;
	className?: string;
	testingSelector?: string;
	testingListSelector?: string;
	style?: {
		[key: string]: unknown;
	};
	onClick?: React.MouseEventHandler<HTMLIonRowElement>;
};

const ZIonRow = (props: ZIonRowType) => {
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
		<IonRow {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonRow>
	);
};

export default ZIonRow;
