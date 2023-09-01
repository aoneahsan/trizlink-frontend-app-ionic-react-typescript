// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRow } from '@ionic/react';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonRowType = {
	children: ReactNode;
	className?: string;
	testingSelector?: string;
	testingListSelector?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLIonRowElement>;
};

const ZIonRow = (props: ZIonRowType) => {
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
		<IonRow {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonRow>
	);
};

export default ZIonRow;
