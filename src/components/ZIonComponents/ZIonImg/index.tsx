// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonImg } from '@ionic/react';
import { createElementTestingSelector } from '@/utils/helpers';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

type ZIonImgType = {
	src?: string;
	alt?: string;
	children?: ReactNode;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end';
	testingSelector?: string;
	testingListSelector?: string;
};

const ZIonImg = (props: ZIonImgType) => {
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
		<IonImg
			
			
			{...props}
			style={props.style}
		
			{..._testingSelector}
			{..._testingListSelector}
		>
			{props.children}
		</IonImg>
	);
};

export default ZIonImg;
