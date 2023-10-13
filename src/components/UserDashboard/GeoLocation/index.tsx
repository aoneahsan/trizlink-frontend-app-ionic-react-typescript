// Core Imports
import React, { useEffect, useState } from 'react';

// Packages Import
import {
  addOutline,
  globeOutline,
  removeOutline,
  trashBin
} from 'ionicons/icons';
import classNames from 'classnames';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonNote,
  ZIonButton,
  ZIonGrid,
  ZIonSelect,
  ZIonSelectOption
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';

// Global Constants
import {
  formatReactSelectOption,
  getRandomKey,
  zAddUrlProtocol
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Images

// Recoil States
import { ZCountryData } from '@/data/DiscoverEnterprise/index.data';

// Types
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import CONSTANTS from '@/utils/constants';
import { EZGeoLocationCondition } from '@/types/AdminPanel/index.type';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import { AutoSizer, List } from 'react-virtualized';

// Styles

type GeoLocationErrorsType = {
  redirectionLink: string | boolean | undefined;
  country?: string;
};

const ZConditions = [
  {
    label: 'Equal to',
    value: EZGeoLocationCondition.equalTo
  },
  {
    label: 'Not Equal to',
    value: EZGeoLocationCondition.notEqualTo
  },
  {
    label: 'Within',
    value: EZGeoLocationCondition.within
  },
  {
    label: 'Not within',
    value: EZGeoLocationCondition.notWithin
  }
];

const GeoLocation: React.FC = () => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    setFieldTouched
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const [compState, setCompState] = useState<{
    equalToConditionCountries: string[];
    notEqualToConditionCountries: string[];
  }>({
    equalToConditionCountries: [],
    notEqualToConditionCountries: []
  });

  const { isMdScale, isSmScale } = useZMediaQueryScale();

  useEffect(() => {
    // Filtering geoLocation getting all geo location countries where condition is equalTo.
    const _filteredEqualToGeoLocation = values?.geoLocation?.filter(el => {
      if (el.condition === EZGeoLocationCondition.equalTo) {
        return el.country;
      }
    });

    // Filtering geoLocation getting all geo location countries where condition is equalTo.
    const _filteredNotEqualToGeoLocation = values?.geoLocation?.filter(el => {
      if (el.condition === EZGeoLocationCondition.notEqualTo) {
        return el.country;
      }
    });

    // getting equalTo condition countries.
    const _equalToCountries = Array.from(
      _filteredEqualToGeoLocation,
      _geoLocation => _geoLocation.country
    );

    // getting notEqualTo condition countries.
    const _notEqualToCountries = Array.from(
      _filteredNotEqualToGeoLocation,
      _geoLocation => _geoLocation.country
    );

    if (_equalToCountries) {
      setCompState(oldValues => ({
        ...oldValues,
        equalToConditionCountries: _equalToCountries as string[]
      }));
    }

    if (_notEqualToCountries) {
      setCompState(oldValues => ({
        ...oldValues,
        notEqualToConditionCountries: _notEqualToCountries as string[]
      }));
    }
  }, [values?.geoLocation]);

  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className='py-3 border zaions__bg_white'>
      <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
        <ZIonIcon
          icon={globeOutline}
          size='large'
        />
        <ZIonText className='font-bold ion-no-margin ps-2'>
          Geolocation
          <ZIonRouterLink
            className='ms-1'
            routerLink={ZaionsRoutes.HomeRoute}>
            (help)
          </ZIonRouterLink>
        </ZIonText>
      </div>
      <div className='block pt-2'>
        <FieldArray name='geoLocation'>
          {({ remove, push }) => (
            <>
              <ZCustomScrollable
                scrollY={true}
                className={classNames({
                  'h-auto max-h-[13rem]': true,
                  'border-t border-b': values?.geoLocation?.length > 0
                })}>
                <ZIonGrid
                  className='py-0 px-0 w-full h-auto max-h-[13rem] '
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
                      .container
                  }>
                  {values.geoLocation.length
                    ? values.geoLocation.map((_geoLocationEl, _index) => (
                        <ZIonRow
                          key={_index}
                          className={classNames({
                            'ion-align-items-center gap-2 pb-3 pt-3 px-2 ':
                              true,
                            'border-b':
                              _index !== values?.geoLocation?.length - 1,
                            // zaions__medium_bg_opacity_point_3: _index !== 0,
                            // 'border-t': _index === 0,
                            zaions__light_bg_opacity_point_8: _index % 2 === 0,
                            'gap-2': isSmScale,
                            'py-2 gap-1 mt-2 border-b':
                              (!isMdScale && isSmScale) || !isSmScale
                          })}>
                          <ZIonCol size='11.2'>
                            <ZIonRow className='ion-justify-content-between'>
                              <ZIonCol
                                sizeXl='12'
                                sizeLg='12'
                                sizeMd='12'
                                sizeSm='12'
                                sizeXs='12'
                                className='mb-2'>
                                <ZIonInput
                                  type='url'
                                  minHeight='40px'
                                  labelPlacement='stacked'
                                  label='Redirection Links*'
                                  onIonChange={handleChange}
                                  value={
                                    values.geoLocation[_index]?.redirectionLink
                                  }
                                  name={`geoLocation.${_index}.redirectionLink`}
                                  testingselector={
                                    CONSTANTS.testingSelectors.shortLink
                                      .formPage.geoLocation.redirectionLinkInput
                                  }
                                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.redirectionLinkInput}-${_geoLocationEl.id}`}
                                  onIonBlur={e => {
                                    handleBlur(e);
                                    const inputUrl =
                                      values?.geoLocation[_index]
                                        ?.redirectionLink;
                                    const formattedUrl = zAddUrlProtocol(
                                      inputUrl || ''
                                    );
                                    setFieldValue(
                                      `geoLocation.${_index}.redirectionLink`,
                                      formattedUrl
                                    );
                                  }}
                                  errorText={
                                    errors.geoLocation?.length
                                      ? ((
                                          errors.geoLocation[
                                            _index
                                          ] as GeoLocationErrorsType
                                        )?.redirectionLink as string)
                                      : undefined
                                  }
                                  className={classNames({
                                    z_ion_bg_white: true,
                                    'ion-touched':
                                      touched?.geoLocation &&
                                      touched?.geoLocation[_index]
                                        ?.redirectionLink,
                                    'ion-invalid':
                                      touched?.geoLocation &&
                                      errors?.geoLocation &&
                                      touched?.geoLocation[_index]
                                        ?.redirectionLink &&
                                      (
                                        errors.geoLocation[
                                          _index
                                        ] as GeoLocationErrorsType
                                      ).redirectionLink,
                                    'ion-valid':
                                      touched?.geoLocation &&
                                      errors?.geoLocation &&
                                      touched?.geoLocation[_index]
                                        ?.redirectionLink &&
                                      !(
                                        errors.geoLocation[
                                          _index
                                        ] as GeoLocationErrorsType
                                      ).redirectionLink
                                  })}
                                />
                              </ZIonCol>

                              <ZIonCol
                                sizeXl='5.8'
                                sizeLg='5.8'
                                sizeMd='5.8'
                                sizeSm='12'
                                sizeXs='12'>
                                <ZIonSelect
                                  minHeight='2.5rem'
                                  interface='popover'
                                  fill='outline'
                                  label='Condition'
                                  labelPlacement='stacked'
                                  className='z_ion_bg_white'
                                  onIonChange={e => {
                                    if (
                                      e?.target?.value ===
                                        EZGeoLocationCondition.equalTo ||
                                      e?.target?.value ===
                                        EZGeoLocationCondition.notEqualTo
                                    ) {
                                      setFieldValue(
                                        `geoLocation.${_index}.country`,
                                        '',
                                        false
                                      );
                                    }
                                    handleChange(e);
                                  }}
                                  onIonBlur={handleBlur}
                                  name={`geoLocation.${_index}.condition`}
                                  value={
                                    values?.geoLocation[_index]
                                      ?.condition as string
                                  }
                                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.conditionSelector}-${_geoLocationEl.id}`}
                                  testingselector={
                                    CONSTANTS.testingSelectors.shortLink
                                      .formPage.geoLocation.conditionSelector
                                  }>
                                  {ZConditions?.map((el, index) => {
                                    return (
                                      <ZIonSelectOption
                                        key={index}
                                        value={el.value}>
                                        {el.label}
                                      </ZIonSelectOption>
                                    );
                                  })}
                                </ZIonSelect>
                              </ZIonCol>

                              <ZIonCol
                                sizeXl='5.8'
                                sizeLg='5.8'
                                sizeMd='5.8'
                                sizeSm='11'
                                sizeXs='11'>
                                <ZIonSelect
                                  toggleIcon={
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.notWithin ||
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.within
                                      ? addOutline
                                      : undefined
                                  }
                                  expandedIcon={
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.notWithin ||
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.within
                                      ? removeOutline
                                      : undefined
                                  }
                                  minHeight='2.5rem'
                                  interface='popover'
                                  multiple={
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.notWithin ||
                                    values?.geoLocation[_index]?.condition ===
                                      EZGeoLocationCondition.within
                                  }
                                  fill='outline'
                                  label='country*'
                                  labelPlacement='stacked'
                                  name={`geoLocation.${_index}.country`}
                                  value={
                                    values?.geoLocation[_index]
                                      ?.country as string
                                  }
                                  onIonChange={handleChange}
                                  onIonBlur={handleBlur}
                                  testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelector}-${_geoLocationEl.id}`}
                                  testingselector={
                                    CONSTANTS.testingSelectors.shortLink
                                      .formPage.geoLocation.countrySelector
                                  }
                                  errorText={
                                    errors.geoLocation?.length
                                      ? ((
                                          errors.geoLocation[
                                            _index
                                          ] as GeoLocationErrorsType
                                        )?.country as string)
                                      : undefined
                                  }
                                  className={classNames({
                                    z_ion_bg_white: true,
                                    'ion-touched':
                                      touched?.geoLocation &&
                                      touched?.geoLocation[_index]?.country,
                                    'ion-invalid':
                                      touched?.geoLocation &&
                                      errors?.geoLocation &&
                                      touched?.geoLocation[_index]?.country &&
                                      (
                                        errors.geoLocation[
                                          _index
                                        ] as GeoLocationErrorsType
                                      ).country,
                                    'ion-valid':
                                      touched?.geoLocation &&
                                      errors?.geoLocation &&
                                      touched?.geoLocation[_index]?.country &&
                                      !(
                                        errors.geoLocation[
                                          _index
                                        ] as GeoLocationErrorsType
                                      ).country
                                  })}>
                                  {ZCountryData.map((el, index) => {
                                    let _disabled = false;
                                    const _condition =
                                      values?.geoLocation[_index]?.condition;
                                    if (
                                      _condition ===
                                      EZGeoLocationCondition.equalTo
                                    ) {
                                      _disabled =
                                        compState.equalToConditionCountries?.includes(
                                          el.value
                                        );
                                    } else if (
                                      _condition ===
                                      EZGeoLocationCondition.notEqualTo
                                    ) {
                                      _disabled =
                                        compState.notEqualToConditionCountries?.includes(
                                          el.value
                                        );
                                    }

                                    return (
                                      <ZIonSelectOption
                                        value={el.value}
                                        key={index}
                                        disabled={_disabled}>
                                        {el.label}
                                      </ZIonSelectOption>
                                    );
                                  })}
                                </ZIonSelect>
                                {/* <ZaionsRSelect
														placeholder='country*'
														name={`geoLocation.${_index}.country`}
														options={ZCountryData}
														testingselector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.countrySelector
														}
														testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelector}-${_geoLocationEl.id}`}
														onChange={(_value) => {
															setFieldValue(
																`geoLocation.${_index}.country`,
																(_value as ZaionsRSelectOptions).value,
																true
															);
														}}
														className={classNames({
															'pb-0 mb-0 geo-location-country-field': true,
															invalid:
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																(
																	errors?.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																)?.country,

															valid:
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																!(
																	errors?.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																)?.country,
														})}
														onBlur={() => {
															setFieldTouched(
																`geoLocation.${_index}.country`,
																true,
																true
															);
														}}
														value={
															formatReactSelectOption(
																values?.geoLocation[_index]?.country as string,
																ZCountryData as ZGenericObject[],
																'label',
																'value'
															) || []
														}
													/>
													 */}
                                {errors?.geoLocation &&
                                touched?.geoLocation &&
                                (
                                  errors.geoLocation[
                                    _index
                                  ] as GeoLocationErrorsType
                                )?.country &&
                                touched?.geoLocation[_index]?.country ? (
                                  <ZIonNote
                                    className='text-xs ps-2'
                                    color='danger'
                                    testingselector={
                                      CONSTANTS.testingSelectors.shortLink
                                        .formPage.geoLocation
                                        .countrySelectorError
                                    }
                                    testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelectorError}-${_geoLocationEl.id}`}>
                                    {errors.geoLocation?.length &&
                                      (
                                        errors.geoLocation[
                                          _index
                                        ] as GeoLocationErrorsType
                                      )?.country}
                                  </ZIonNote>
                                ) : (
                                  ''
                                )}
                              </ZIonCol>
                            </ZIonRow>
                          </ZIonCol>

                          {/* delete */}
                          <ZIonCol className='flex ion-align-items-center ion-justify-content-center'>
                            <ZIonIcon
                              icon={trashBin}
                              onClick={() => remove(_index)}
                              color='danger'
                              className='w-[21px] h-[21px] zaions__nav_item'
                              testingselector={
                                CONSTANTS.testingSelectors.shortLink.formPage
                                  .geoLocation.deleteSingleGeoLocationBtn
                              }
                              testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.deleteSingleGeoLocationBtn}-${_geoLocationEl.id}`}
                            />
                          </ZIonCol>
                        </ZIonRow>
                      ))
                    : null}
                </ZIonGrid>
              </ZCustomScrollable>

              {/*  */}
              {!values.rotatorABTesting.length ? (
                <ZIonButton
                  fill='outline'
                  className='mt-2 ion-no-padding ion-padding-horizontal px-0 ms-2'
                  size='small'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
                      .addSingleGeoLocationBtn
                  }
                  style={{
                    '--border-width': '1px'
                  }}
                  onClick={() =>
                    push({
                      id: getRandomKey(),
                      redirectionLink: 'https://',
                      country: '',
                      condition: EZGeoLocationCondition.equalTo
                    })
                  }>
                  Add a redirection
                </ZIonButton>
              ) : (
                <ZIonText
                  color='dark'
                  className='ms-3 text-md block ion-no-padding'
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
                      .deleteSingleGeoLocationBtn
                  }>
                  You can't add a redirection if AB testing is activated
                </ZIonText>
              )}
            </>
          )}
        </FieldArray>
      </div>
    </ZIonCol>
  );
};

export default GeoLocation;
