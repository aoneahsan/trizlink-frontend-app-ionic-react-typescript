// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonGrid } from '@ionic/react';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonGridType = {
	children: ReactNode;
	fixed?: boolean;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	testingSelector?: string;
	testingListSelector?: string;
	onClick?: React.MouseEventHandler<HTMLIonGridElement>;
};

const ZIonGrid: React.FC<ZIonGridType> = (props) => {
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
		<IonGrid {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonGrid>
	);
};

export default ZIonGrid;
