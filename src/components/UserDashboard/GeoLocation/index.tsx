// Core Imports
import React from 'react';

// Packages Import
import { globeOutline, trashBin } from 'ionicons/icons';
import classNames from 'classnames';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonItem,
  ZIonLabel,
  ZIonInput,
  ZIonNote,
} from 'components/ZIonComponents';
import { ZIonButton } from 'components/ZIonComponents';
import ZaionsRSelect from 'components/CustomComponents/ZaionsRSelect';

// Global Constants
import { formatReactSelectOption, getRandomKey } from 'utils/helpers';

// Images

// Recoil States
import { ZaionsDiscoverEnterpriseCountry } from 'data/DiscoverEnterprise/index.data';

// Types
import { ZaionsRSelectOptions } from 'types/components/CustomComponents/index.type';
import { ZaionsShortUrlOptionFieldsValuesInterface } from 'types/AdminPanel/linksType';
import { ZGenericObject } from 'types/zaionsAppSettings.type';
import ZaionsRoutes from 'utils/constants/RoutesConstants';

// Styles

type GeoLocationErrorsType = {
  redirectionLink: string | boolean | undefined;
  country?: string;
};

const GeoLocation: React.FC = () => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    setFieldTouched,
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  return (
    <>
      <ZIonCol
        sizeXl='5.8'
        sizeLg='5.7'
        sizeMd='5.6'
        sizeSm='12'
        sizeXs='12'
        className='zaions__bg_white border py-3'
      >
        <div className='d-flex align-items-center border-bottom ion-padding-start pb-2'>
          <ZIonIcon icon={globeOutline} size={'large'}></ZIonIcon>
          <ZIonText>
            <h6 className='fw-bold ion-no-margin ion-padding-start'>
              Geolocation{' '}
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                (help)
              </ZIonRouterLink>
            </h6>
          </ZIonText>
        </div>
        <div className='d-block px-2 mb-4  pt-3'>
          <FieldArray name='geoLocation'>
            {({ remove, push }) => (
              <div>
                {values.geoLocation.length
                  ? values.geoLocation.map((_geoLocationEl, _index) => (
                      <ZIonRow key={_index} className='ion-align-items-top'>
                        <ZIonCol size='5.6'>
                          <ZIonItem
                            className={`${classNames({
                              // 'pt-1 mt-1': true,
                              'ion-touched':
                                touched?.geoLocation &&
                                touched?.geoLocation[_index]?.redirectionLink,
                              'ion-invalid':
                                touched?.geoLocation &&
                                errors?.geoLocation &&
                                touched?.geoLocation[_index]?.redirectionLink &&
                                (
                                  errors.geoLocation[
                                    _index
                                  ] as GeoLocationErrorsType
                                ).redirectionLink,
                              'ion-valid':
                                touched?.geoLocation &&
                                errors?.geoLocation &&
                                touched?.geoLocation[_index]?.country &&
                                !(
                                  errors.geoLocation[
                                    _index
                                  ] as GeoLocationErrorsType
                                ).country,
                            })}`}
                          >
                            <ZIonLabel position='floating'>
                              Redirection Links*
                            </ZIonLabel>
                            <ZIonInput
                              className='ion-no-padding'
                              name={`geoLocation.${_index}.redirectionLink`}
                              // onIonChange={({ target }) => {
                              //   setFieldValue(
                              //     `geoLocation.${_index}.redirectionLink`,
                              //     target.value,
                              //     false
                              //   );
                              // }}
                              onIonChange={handleChange}
                              onIonBlur={handleBlur}
                              value={
                                values.geoLocation[_index]?.redirectionLink
                              }
                            />
                            <ZIonNote slot='error'>
                              {errors.geoLocation?.length &&
                                (
                                  errors.geoLocation[
                                    _index
                                  ] as GeoLocationErrorsType
                                )?.redirectionLink}
                            </ZIonNote>
                          </ZIonItem>
                        </ZIonCol>

                        <ZIonCol size='5.6'>
                          <ZaionsRSelect
                            className={classNames({
                              'ion-padding-top pb-0 mb-0 geo-location-country-field':
                                true,
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
                            placeholder='country*'
                            name={`geoLocation.${_index}.country`}
                            options={ZaionsDiscoverEnterpriseCountry}
                            onChange={(_value) => {
                              setFieldValue(
                                `geoLocation.${_index}.country`,
                                (_value as ZaionsRSelectOptions).value,
                                true
                              );
                            }}
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
                                ZaionsDiscoverEnterpriseCountry as ZGenericObject[],
                                'label',
                                'value'
                              ) || []
                            }
                          />
                          {errors?.geoLocation &&
                          touched?.geoLocation &&
                          (errors.geoLocation[_index] as GeoLocationErrorsType)
                            ?.country &&
                          touched?.geoLocation[_index]?.country ? (
                            <ZIonNote
                              className='ion-padding-start zaions__fs_12'
                              color='danger'
                            >
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
                        <ZIonCol className='ion-padding-top mt-4'>
                          <ZIonIcon
                            icon={trashBin}
                            onClick={() => remove(_index)}
                            color='danger'
                            className='zaions__nav_item'
                          />
                        </ZIonCol>
                      </ZIonRow>
                    ))
                  : ''}

                {!values.rotatorABTesting.length ? (
                  <ZIonButton
                    fill='clear'
                    className='ion-text-capitalize mt-3'
                    size='small'
                    onClick={() =>
                      push({
                        id: getRandomKey(),
                        redirectionLink: '',
                        country: '',
                      })
                    }
                  >
                    Add a redirection
                  </ZIonButton>
                ) : (
                  <ZIonButton
                    disabled
                    color={'dark'}
                    className='ion-text-capitalize mt-3'
                    fill='clear'
                  >
                    You can't add a redirection if AB testing is activated
                  </ZIonButton>
                )}
              </div>
            )}
          </FieldArray>
        </div>
      </ZIonCol>
    </>
  );
};

export default GeoLocation;
