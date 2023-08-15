// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonNote } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { createElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { createElementTestingSelectorKeyEnum } from '@/utils/enums';
type ZIonNoteType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	slot?: 'error' | 'helper';
	testingSelector?: string;
	testingListSelector?: string;
};

const ZIonNote = (props: ZIonNoteType) => {
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
		<IonNote {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonNote>
	);
};

export default ZIonNote;
