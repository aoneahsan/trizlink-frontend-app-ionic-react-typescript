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
  ZIonGrid,
  ZIonRange
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
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

interface RotatorABTestingErrorType {
  redirectionLink?: string;
  percentage?: string;
}

const RotatorABTesting: React.FC = () => {
  const [compState, setCompState] = useState<{
    totalPercentage: number;
    errorText?: string[];
    isError: boolean;
  }>({
    totalPercentage: 0,
    isError: false
  });
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const { isMdScale, isSmScale } = useZMediaQueryScale();

  const { presentZIonPopover: presentZRotatorABTestingErrorPopover } =
    useZIonPopover(ZRotatorABTestingErrorPopover, {
      errors: compState?.errorText
    });

  useEffect(() => {
    let _total = 0;

    Array.from(
      values?.rotatorABTesting,
      ({ percentage }) => (_total = _total + (percentage ?? 0))
    );

    if (_total > 100) {
      setCompState(oldValues => ({
        ...oldValues,
        totalPercentage: _total,
        isError: true,
        errorText: ['The sum of percentages should be exactly 100']
      }));
    } else if (_total < 100 && _total > 0) {
      setCompState(oldValues => ({
        ...oldValues,
        totalPercentage: _total,
        isError: false,
        errorText: []
      }));
    }
  }, [values?.rotatorABTesting]);

  return (
    <ZIonCol
      sizeXl='5.9'
      sizeLg='5.9'
      sizeMd='5.9'
      sizeSm='12'
      sizeXs='12'
      className={classNames({
        'border zaions__bg_white': true
      })}>
      <div
        className={classNames({
          'w-full h-full py-2': true,
          'zaions__danger_bg_opacity_point_1 ': compState.isError
        })}>
        <div className='flex pb-2 ion-align-items-center ion-justify-content-between border-bottom ion-padding-start'>
          <div className='flex ion-align-items-center'>
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

          {compState?.isError && (
            <ZIonButton
              className='mr-2 ion-no-margin animated pulse'
              size='small'
              color='danger'
              fill='outline'
              onClick={(event: unknown) => {
                presentZRotatorABTestingErrorPopover({
                  _event: event as Event
                });
              }}
              style={{
                '--border-width': '1px'
              }}>
              Error details
            </ZIonButton>
          )}
        </div>
        <div className='block'>
          {/*  */}
          <FieldArray name='rotatorABTesting'>
            {({ remove, push }) => (
              <>
                <ZCustomScrollable
                  scrollY={true}
                  className='h-auto max-h-[13rem]'>
                  <ZIonGrid
                    className='pt-0 px-0 h-auto max-h-[13rem]'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .rotatorABTesting.container
                    }>
                    <ZIonRow className='gap-2 px-2 pt-3 pb-3'>
                      <ZIonCol
                        sizeXl='5.6'
                        sizeLg='5.6'
                        sizeMd='5.6'
                        sizeSm='12'
                        sizeXs='12'>
                        <ZIonInput
                          disabled
                          className='ion-no-padding z_ion_bg_white'
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
                          className='z_ion_bg_white'
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

                    {values.rotatorABTesting.length > 0 &&
                      values.rotatorABTesting.map(
                        (_rotatorAbTestingEl, _index) => (
                          <ZIonRow
                            key={_index}
                            className={classNames({
                              'gap-2 ion-align-items-top pt-3 pb-2 px-2': true,
                              'border-t border-b': _index % 2 === 0,
                              'zaions__light_bg_opacity_point_8 ':
                                _index % 2 === 0 && !compState.isError,
                              // 'mt-3': isSmScale,
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
                                    values?.rotatorABTesting[_index]
                                      ?.redirectionLink;
                                  const formattedUrl = zAddUrlProtocol(
                                    inputUrl ?? ''
                                  );
                                  void setFieldValue(
                                    `rotatorABTesting.${_index}.redirectionLink`,
                                    formattedUrl
                                  );
                                }}
                                value={
                                  values.rotatorABTesting[_index]
                                    .redirectionLink
                                }
                                errorText={
                                  errors.rotatorABTesting !== undefined
                                    ? touched?.rotatorABTesting !== undefined &&
                                      touched?.rotatorABTesting[_index]
                                        ?.redirectionLink === true
                                      ? ((
                                          errors.rotatorABTesting[
                                            _index
                                          ] as RotatorABTestingErrorType
                                        )?.redirectionLink as string)
                                      : undefined
                                    : undefined
                                }
                                className={classNames({
                                  'z_ion_bg_white ': true,
                                  'ion-touched':
                                    touched.rotatorABTesting !== undefined &&
                                    touched.rotatorABTesting[_index]
                                      ?.redirectionLink,
                                  'ion-invalid':
                                    touched.rotatorABTesting !== undefined &&
                                    errors.rotatorABTesting !== undefined &&
                                    touched.rotatorABTesting[_index]
                                      ?.redirectionLink === true &&
                                    (
                                      errors.rotatorABTesting[
                                        _index
                                      ] as RotatorABTestingErrorType
                                    )?.redirectionLink,

                                  'ion-valid':
                                    touched.rotatorABTesting !== undefined &&
                                    errors.rotatorABTesting !== undefined &&
                                    touched.rotatorABTesting[_index]
                                      ?.redirectionLink === true &&
                                    ((
                                      errors.rotatorABTesting[
                                        _index
                                      ] as RotatorABTestingErrorType
                                    )?.redirectionLink === undefined ||
                                      (
                                        errors.rotatorABTesting[
                                          _index
                                        ] as RotatorABTestingErrorType
                                      )?.redirectionLink === null)
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
                              {/* <ZIonInput
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
                                  values.rotatorABTesting[_index].percentage ===
                                  0
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
                                    touched?.rotatorABTesting[_index]
                                      ?.percentage
                                    ? ((
                                        errors.rotatorABTesting[
                                          _index
                                        ] as RotatorABTestingErrorType
                                      )?.percentage as string)
                                    : undefined
                                  : undefined
                              }
                              className={classNames({
                                'z_ion_bg_white ': true,
                                'ion-touched':
                                  touched.rotatorABTesting &&
                                  touched.rotatorABTesting[_index]?.percentage,
                                'ion-invalid':
                                  touched.rotatorABTesting &&
                                  errors.rotatorABTesting &&
                                  touched.rotatorABTesting[_index]
                                    ?.percentage &&
                                  (
                                    errors.rotatorABTesting[
                                      _index
                                    ] as RotatorABTestingErrorType
                                  )?.percentage,

                                'ion-valid':
                                  touched.rotatorABTesting &&
                                  errors.rotatorABTesting &&
                                  touched.rotatorABTesting[_index]
                                    ?.percentage &&
                                  !(
                                    errors.rotatorABTesting[
                                      _index
                                    ] as RotatorABTestingErrorType
                                  )?.percentage
                              })}
                            /> */}
                              {/* Show pin at top so user can see the percentage, user does not have to click it to see */}
                              <ZIonRange
                                aria-label='Percentage'
                                min={1}
                                max={99}
                                pin={true}
                                value={
                                  values.rotatorABTesting[_index].percentage
                                }
                                name={`rotatorABTesting.${_index}.percentage`}
                                className='pt-0 z-ion-range-show-top-pin'
                                pinFormatter={(value: number) => `${value}%`}
                                onIonChange={e => {
                                  handleChange(e);
                                }}
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
                        )
                      )}
                  </ZIonGrid>
                </ZCustomScrollable>
                {values.geoLocation.length > 0 ? (
                  <ZIonText
                    color='dark'
                    className='block ms-3 text-md ion-no-padding'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .rotatorABTesting.disabledAddSingleRotatorBtn
                    }>
                    You can&apos;t add a redirection if Geolocation is activated
                  </ZIonText>
                ) : (
                  <ZIonButton
                    fill='outline'
                    className='px-0 mt-2 ion-no-padding ion-padding-horizontal ms-2'
                    size='small'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage
                        .rotatorABTesting.addSingleRotatorBtn
                    }
                    style={{
                      '--border-width': '1px'
                    }}
                    onClick={() => {
                      push({
                        id: getRandomKey(),
                        redirectionLink: 'https://',
                        percentage: 1
                      });
                    }}>
                    Add a destination
                  </ZIonButton>
                )}
              </>
            )}
          </FieldArray>
        </div>
      </div>
    </ZIonCol>
  );
};

const ZRotatorABTestingErrorPopover: React.FC<{
  errors: string[];
}> = ({ errors }) => {
  return (
    <div className='p-3'>
      {errors?.map((el, index) => (
        <ZIonText key={index}>{el}</ZIonText>
      ))}
    </div>
  );
};

export default RotatorABTesting;
