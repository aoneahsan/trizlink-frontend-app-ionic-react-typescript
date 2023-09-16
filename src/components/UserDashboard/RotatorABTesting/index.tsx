// Core Imports
import React, { useEffect, useState } from 'react';

// Packages Imports
import { FieldArray, useFormikContext } from 'formik';
import { gitPullRequestOutline, trashBin } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonButton,
  ZIonGrid
} from '@/components/ZIonComponents';

// Global constant
import {
  getRandomKey,
  zAddUrlProtocol,
  zCalculateRotatorABTesting
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';

type RotatorABTestingErrorType = {
  redirectionLink?: string;
  percentage?: string;
};

const RotatorABTesting: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const { isMdScale, isSmScale } = useZMediaQueryScale();

  return (
    <>
      <ZIonCol
        sizeXl='5.9'
        sizeLg='5.9'
        sizeMd='5.9'
        sizeSm='12'
        sizeXs='12'
        className='py-2 border zaions__bg_white'>
        <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
          <ZIonIcon
            icon={gitPullRequestOutline}
            size='large'
          />
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Rotator - AB Testing
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </div>
        <div className='block px-2 mt-3'>
          <ZIonRow className='gap-2 pb-1'>
            <ZIonCol
              sizeXl='5.6'
              sizeLg='5.6'
              sizeMd='5.6'
              sizeSm='12'
              sizeXs='12'>
              <ZIonInput
                disabled
                className='ion-no-padding'
                label='Redirection Links*'
                type='url'
                labelPlacement='stacked'
                value={values?.target?.url}
                minHeight='40px'
                testingselector={`${CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting.redirectionLinkInput}-disable`}
              />
            </ZIonCol>
            <ZIonCol
              sizeXl='5.6'
              sizeLg='5.6'
              sizeMd='5.6'
              sizeSm='12'
              sizeXs='12'>
              <ZIonInput
                type='number'
                label='Percentage'
                counter={false}
                value={
                  zCalculateRotatorABTesting({
                    _data: values.rotatorABTesting
                  })?._remainingPercentage
                }
                disabled
                labelPlacement='stacked'
                minHeight='40px'
                testingselector={`${CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting.percentageInput}-disable`}
              />
            </ZIonCol>
          </ZIonRow>

          {/*  */}
          <FieldArray name='rotatorABTesting'>
            {({ remove, push }) => (
              <ZIonGrid
                className='pt-0 px-0'
                testingselector={
                  CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting
                    .container
                }>
                {values.rotatorABTesting.length > 0 &&
                  values.rotatorABTesting.map((_rotatorAbTestingEl, _index) => (
                    <ZIonRow
                      key={_index}
                      className={classNames({
                        'gap-2 ion-align-items-top': true,
                        'mt-3': isSmScale,
                        'pt-4 mt-2 border-t':
                          (!isMdScale && isSmScale) || !isSmScale
                      })}>
                      {/* Link Input */}
                      <ZIonCol
                        sizeXl='5.5'
                        sizeLg='5.5'
                        sizeMd='5.5'
                        sizeSm='12'
                        sizeXs='12'>
                        <ZIonInput
                          label='Redirection Links*'
                          type='url'
                          labelPlacement='stacked'
                          onIonChange={handleChange}
                          minHeight='40px'
                          name={`rotatorABTesting.${_index}.redirectionLink`}
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.formPage
                              .rotatorABTesting.redirectionLinkInput
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting.redirectionLinkInput}-${_rotatorAbTestingEl.id}`}
                          onIonBlur={e => {
                            handleBlur(e);
                            const inputUrl =
                              values?.rotatorABTesting[_index]?.redirectionLink;
                            const formattedUrl = zAddUrlProtocol(
                              inputUrl || ''
                            );
                            setFieldValue(
                              `rotatorABTesting.${_index}.redirectionLink`,
                              formattedUrl
                            );
                          }}
                          value={
                            values.rotatorABTesting[_index].redirectionLink
                          }
                          errorText={
                            errors.rotatorABTesting?.length
                              ? touched?.rotatorABTesting &&
                                touched?.rotatorABTesting[_index]
                                  ?.redirectionLink
                                ? ((
                                    errors.rotatorABTesting[
                                      _index
                                    ] as RotatorABTestingErrorType
                                  )?.redirectionLink as string)
                                : undefined
                              : undefined
                          }
                          className={classNames({
                            'ion-touched':
                              touched.rotatorABTesting &&
                              touched.rotatorABTesting[_index]?.redirectionLink,
                            'ion-invalid':
                              touched.rotatorABTesting &&
                              errors.rotatorABTesting &&
                              touched.rotatorABTesting[_index]
                                ?.redirectionLink &&
                              (
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.redirectionLink,

                            'ion-valid':
                              touched.rotatorABTesting &&
                              errors.rotatorABTesting &&
                              touched.rotatorABTesting[_index]
                                ?.redirectionLink &&
                              !(
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.redirectionLink
                          })}
                        />
                      </ZIonCol>

                      {/* Percentage Input */}
                      <ZIonCol
                        sizeXl='5.5'
                        sizeLg='5.5'
                        sizeMd='5.5'
                        sizeSm='11'
                        sizeXs='11'>
                        <ZIonInput
                          type='number'
                          label='Percentage*'
                          max={
                            zCalculateRotatorABTesting({
                              _data: values.rotatorABTesting
                            })?._remainingPercentage - 1
                          }
                          min={1}
                          labelPlacement='stacked'
                          minHeight='40px'
                          counter={false}
                          onIonChange={e => {
                            try {
                              const _percentageVal = parseInt(
                                e?.target?.value?.toString() ?? '0'
                              );
                              const _remainingPercentage =
                                zCalculateRotatorABTesting({
                                  _data: values.rotatorABTesting
                                })?._remainingPercentage;
                              console.log({
                                lm: 'checking what is ab testing percentage',
                                _remainingPercentage,
                                _percentageVal,
                                oldPercentage: values.rotatorABTesting[_index],
                                rotatorABTesting: values.rotatorABTesting
                              });
                              if (_percentageVal > _remainingPercentage) {
                                setFieldValue(
                                  `rotatorABTesting.${_index}.percentage`,
                                  1,
                                  false
                                );
                              } else {
                                handleChange(e);
                              }
                            } catch (error) {
                              setFieldValue(
                                `rotatorABTesting.${_index}.percentage`,
                                1,
                                false
                              );
                            }
                          }}
                          onIonBlur={e => {
                            handleBlur(e);
                            if (
                              values.rotatorABTesting[_index].percentage === 0
                            ) {
                              setFieldValue(
                                `rotatorABTesting.${_index}.percentage`,
                                1,
                                false
                              );
                            }
                          }}
                          value={values.rotatorABTesting[_index].percentage}
                          name={`rotatorABTesting.${_index}.percentage`}
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.formPage
                              .rotatorABTesting.percentageInput
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting.percentageInput}-${_rotatorAbTestingEl.id}`}
                          errorText={
                            errors.rotatorABTesting?.length
                              ? touched?.rotatorABTesting &&
                                touched?.rotatorABTesting[_index]?.percentage
                                ? ((
                                    errors.rotatorABTesting[
                                      _index
                                    ] as RotatorABTestingErrorType
                                  )?.percentage as string)
                                : undefined
                              : undefined
                          }
                          className={classNames({
                            'ion-touched':
                              touched.rotatorABTesting &&
                              touched.rotatorABTesting[_index]?.percentage,
                            'ion-invalid':
                              touched.rotatorABTesting &&
                              errors.rotatorABTesting &&
                              touched.rotatorABTesting[_index]?.percentage &&
                              (
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.percentage,

                            'ion-valid':
                              touched.rotatorABTesting &&
                              errors.rotatorABTesting &&
                              touched.rotatorABTesting[_index]?.percentage &&
                              !(
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.percentage
                          })}
                        />
                      </ZIonCol>

                      <ZIonCol className='ion-padding-top'>
                        <ZIonIcon
                          icon={trashBin}
                          color='danger'
                          className='w-[21px] h-[21px] zaions__nav_item'
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.formPage
                              .rotatorABTesting.deleteSingleRotatorBtn
                          }
                          testinglistselector={`${CONSTANTS.testingSelectors.shortLink.formPage.rotatorABTesting.deleteSingleRotatorBtn}-${_rotatorAbTestingEl.id}`}
                          onClick={() => {
                            remove(_index);
                          }}
                        />
                      </ZIonCol>
                    </ZIonRow>
                  ))}

                {values.geoLocation.length ? (
                  <ZIonButton
                    disabled
                    color='dark'
                    className='mt-3 ion-text-capitalize ion-no-padding'
                    fill='clear'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .rotatorABTesting.disabledAddSingleRotatorBtn
                    }>
                    You can't add a redirection if Geolocation is activated
                  </ZIonButton>
                ) : (
                  <ZIonButton
                    fill='clear'
                    className='mt-2 ion-text-capitalize ion-no-padding ps-1'
                    size='small'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .rotatorABTesting.addSingleRotatorBtn
                    }
                    onClick={() =>
                      push({
                        id: getRandomKey(),
                        redirectionLink: 'https://',
                        percentage: 1
                      })
                    }>
                    Add a destination
                  </ZIonButton>
                )}
              </ZIonGrid>
            )}
          </FieldArray>
        </div>
      </ZIonCol>
    </>
  );
};

export default RotatorABTesting;
