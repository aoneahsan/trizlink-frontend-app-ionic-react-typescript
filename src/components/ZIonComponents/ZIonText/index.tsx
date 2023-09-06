// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonText } from '@ionic/react';
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

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
	testingselector?: string;
	testingListSelector?: string;
	onClick?: React.MouseEventHandler<HTMLIonTextElement>;
};

const ZIonText = React.forwardRef(
	(props: ZIonTextType, ref: React.Ref<HTMLIonTextElement>) => {
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
