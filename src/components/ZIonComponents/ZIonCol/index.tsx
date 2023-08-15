// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonCol } from '@ionic/react';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';

type ZIonColType = {
	offset?: string;
	offsetXl?: string;
	offsetLg?: string;
	offsetMd?: string;
	offsetSm?: string;
	offsetXs?: string;
	pull?: string;
	pullXl?: string;
	pullLg?: string;
	pullMd?: string;
	pullSm?: string;
	pullXs?: string;
	push?: string;
	pushXl?: string;
	pushLg?: string;
	pushMd?: string;
	pushSm?: string;
	pushXs?: string;
	size?: string;
	sizeXl?: string;
	sizeLg?: string;
	sizeMd?: string;
	sizeSm?: string;
	sizeXs?: string;
	children?: ReactNode;
	className?: string;
	color?: ZIonColorType;
	title?: string;
	style?: {
		[key: string]: unknown;
	};
	testingSelector?: string;
	testingListSelector?: string;
	onMouseEnter?: React.MouseEventHandler<HTMLIonColElement>;
	onClick?: React.MouseEventHandler<HTMLIonIconElement>;
	minHeight?: 'auto' | string;
};

const ZIonCol = (props: ZIonColType) => {
	const compStyle =
		props.style && props.minHeight
			? { ...props.style, 'min-height': props.minHeight }
			: props.style && !props.minHeight
			? { ...props.style }
			: !props.style && props.minHeight
			? { 'min-height': props.minHeight }
			: {};

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
		<IonCol
			{...props}
			style={compStyle}
			{..._testingSelector}
			{..._testingListSelector}
		>
			{props.children}
		</IonCol>
	);
};

export default ZIonCol;
