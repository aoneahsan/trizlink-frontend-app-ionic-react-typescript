import RGAutoComplete from 'react-google-autocomplete';
import {
  FormikSetFieldValueEventType,
  FormikSetFieldTouchedEventType,
} from '@/types/ZaionsFormik.type';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';

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
}) => {
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
      />
    </>
  );
};

export default ZRGAutoCompleteInput;
