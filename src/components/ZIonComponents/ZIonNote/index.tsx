// Core Import
import React, { ReactNode } from 'react';

// Packages Import
import { IonNote } from '@ionic/react';

// Type
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
type ZIonNoteType = {
	children: ReactNode;
	className?: string;
	color?: ZIonColorType;
	mode?: ZIonModeType;
	slot?: 'error' | 'helper';
	testingselector?: string;
	testingListSelector?: string;
};

const ZIonNote = (props: ZIonNoteType) => {
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
		<IonNote {...props} {..._testingSelector} {..._testingListSelector}>
			{props.children}
		</IonNote>
	);
};

export default ZIonNote;
