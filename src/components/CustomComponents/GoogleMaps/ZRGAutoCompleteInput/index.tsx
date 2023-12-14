import React from 'react';
import RGAutoComplete from 'react-google-autocomplete';
import {
  type FormikSetFieldValueEventVoidType,
  type FormikSetFieldTouchedEventType
} from '@/types/ZaionsFormik.type';
import { GM_CONSTANTS } from '@/utils/constants/googleMapsConstants';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import classNames from 'classnames';
import { ZIonItem, ZIonLabel } from '@/components/ZIonComponents';

interface IZRGAutoCompleteInputProps {
  inputStyles?: Record<string, unknown>;
  className?: string;
  value?: string;
  defaultValue?: string;
  onLocationSelectHandler: (place: google.maps.places.PlaceResult) => void;
  setFieldValue?: FormikSetFieldValueEventVoidType;
  setFieldTouched?: FormikSetFieldTouchedEventType;
  inputName: string;
  testingselector?: string;
  testinglistselector?: string;
  placeholder?: string;
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
  testingselector,
  testinglistselector,
  placeholder
}) => {
  const _testinglistselector =
    testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testingselector
          })
        }
      : {};

  // #region comp constants
  const _style = { ...inputStyles };
  // #endregion

  return (
    <ZIonItem
      className='ion-item-start-no-padding ion-padding-end-0'
      lines='none'>
      <ZIonLabel
        position='stacked'
        className='ps-1'>
        Search an address
      </ZIonLabel>
      <RGAutoComplete
        apiKey={GM_CONSTANTS.MAP_API_KEY}
        onPlaceSelected={onLocationSelectHandler}
        style={_style}
        className={classNames(className, {
          'z-upload-input p-[.4rem] w-full mt-2': true
        })}
        defaultValue={defaultValue}
        placeholder={placeholder}
        // onChange={(event) => {
        //   const _value = (event.target as { value?: string })?.value || '';
        //   setFieldValue && setFieldValue(inputName, _value, false);
        //   setFieldTouched && setFieldTouched(inputName, true, true);
        // }}
        onSelect={_ => {
          // const _value = (event.target as { value?: string })?.value || '';
          // setFieldValue && setFieldValue(inputName, _value, false);
          // setFieldTouched && setFieldTouched(inputName, true, true);
        }}
        {..._testingSelector}
        {..._testinglistselector}
      />
    </ZIonItem>
  );
};

export default ZRGAutoCompleteInput;
