// Core Import
import React from 'react';

// Packages Import
import { DatetimeChangeEventDetail, IonDatetimeButton } from '@ionic/react';
import ZIonDatetime from '../ZIonDatetime';
import ZIonModal from '../ZIonModal';

//
import { ZIonColorType, ZIonModeType } from '@/types/zaionsAppSettings.type';
import { IonDatetimeCustomEvent } from '@ionic/core/dist/types/components';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Type
type ZIonDatetimeButtonType = {
	id: string;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	color?: ZIonColorType;
	datetime?: string;
	disabled?: boolean;
	mode?: ZIonModeType;
	dateTarget?: string;
	value?: string;
	timeTarget?: string;
	name?: string;
	min?: string;
	onIonChange?: (
		event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
	) => void;
	preferWheel?: boolean;
	testingSelector?: string;
	testingListSelector?: string;
};

const ZIonDatetimeButton = (props: ZIonDatetimeButtonType) => {
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
		<>
			<IonDatetimeButton
				{...props}
				date-target={props.dateTarget}
				time-target={props.timeTarget}
				datetime={`datetime-${props.id}`}
				{..._testingSelector}
				{..._testingListSelector}
			/>
			<ZIonModal keepContentsMounted={true}>
				<ZIonDatetime
					id={`datetime-${props.id}`}
					name={props.name}
					onIonChange={props.onIonChange}
					value={props.value}
					min={props.min}
					preferWheel={props.preferWheel ?? true}
				/>
			</ZIonModal>
		</>
	);
};

export default ZIonDatetimeButton;
