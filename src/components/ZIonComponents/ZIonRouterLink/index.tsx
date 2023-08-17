// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonRouterLink } from '@ionic/react';
import {
	ZIonColorType,
	ZIonRouterDirection,
	ZIonTargetType,
} from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonRouterLinkType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	href?: string;
	rel?: string;
	routerLink?: string;
	// routerAnimation?: ((baseEl: unknown, opts?: unknown) => Animation)
	routerDirection?: ZIonRouterDirection;
	target?: ZIonTargetType;

	//
	testingSelector?: string;
	testingListSelector?: string;
};

const ZIonRouterLink = (props: ZIonRouterLinkType) => {
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
		<IonRouterLink {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonRouterLink>
	);
};

export default ZIonRouterLink;
