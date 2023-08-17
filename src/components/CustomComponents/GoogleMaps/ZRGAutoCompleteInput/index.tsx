import RGAutoComplete from 'react-google-autocomplete';
import {
	FormikSetFieldValueEventType,
	FormikSetFieldTouchedEventType,
} from '@/types/ZaionsFormik.type';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { PRODUCT_NAME } from '@/utils/constants';

interface IZRGAutoCompleteInputProps {
	inputStyles?: {
		[key: string]: unknown;
	};
	className?: string;
	value?: string;
	defaultValue?: string;
	onLocationSelectHandler: (place: google.maps.places.PlaceResult) => void;
	setFieldValue?: FormikSetFieldValueEventType;
	setFieldTouched?: FormikSetFieldTouchedEventType;
	inputName: string;
	testingSelector?: string;
	testingListSelector?: string;
}

const ZRGAutoCompleteInput: React.FC<IZRGAutoCompleteInputProps> = ({
	inputStyles,
	className,
	value,
	defaultValue,
	onLocationSelectHandler,
	setFieldValue,
	setFieldTouched,
	inputName,
	testingSelector,
	testingListSelector,
}) => {
	const _testingListSelector = testingListSelector
		? {
				...zCreateElementTestingSelector({
					_value: testingListSelector || PRODUCT_NAME,
					_key: zCreateElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = testingSelector
		? {
				...zCreateElementTestingSelector({
					_value: testingSelector || PRODUCT_NAME,
				}),
		  }
		: {};
	return (
		<>
			<RGAutoComplete
				apiKey={GM_CONSTANTS.MAP_API_KEY}
				onPlaceSelected={onLocationSelectHandler}
				style={{ ...inputStyles }}
				className={className}
				defaultValue={defaultValue}
				// onChange={(event) => {
				//   const _value = (event.target as { value?: string })?.value || '';
				//   setFieldValue && setFieldValue(inputName, _value, false);
				//   setFieldTouched && setFieldTouched(inputName, true, true);
				// }}
				onSelect={(event) => {
					// const _value = (event.target as { value?: string })?.value || '';
					// setFieldValue && setFieldValue(inputName, _value, false);
					// setFieldTouched && setFieldTouched(inputName, true, true);
				}}
				{..._testingSelector}
				{..._testingListSelector}
			/>
		</>
	);
};

export default ZRGAutoCompleteInput;
