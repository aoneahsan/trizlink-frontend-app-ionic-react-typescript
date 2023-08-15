// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonText } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonTextType = {
	children?: ReactNode;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	className?: string;
	id?: string;
	style?: {
		[key: string]: unknown;
	};
	slot?: 'start' | 'end' | string;
	testingSelector?: string;
	testingListSelector?: string;
	onClick?: React.MouseEventHandler<HTMLIonTextElement>;
};

const ZIonText = React.forwardRef(
	(props: ZIonTextType, ref: React.Ref<HTMLIonTextElement>) => {
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
			<IonText
				{...props}
				ref={ref}
				{..._testingSelector}
				{..._testingListSelector}
			>
				{props.children}
			</IonText>
		);
	}
);

export default ZIonText;
