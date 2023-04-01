// Core Imports
import React from 'react';

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
  ZIonItem,
  ZIonLabel,
  ZIonInput,
  ZIonNote,
} from 'components/ZIonComponents';

// Global constant
import { getRandomKey } from 'utils/helpers';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from 'types/AdminPanel/linksType';
import { ZIonButton } from 'components/ZIonComponents';
import { ABTestingRotatorInterface } from 'types/AdminPanel/index.type';
import ZaionsRoutes from 'utils/constants/RoutesConstants';

const FULL_PERCENTAGE = 100;

type RotatorABTestingErrorType = {
  redirectionLink?: string;
  percentage?: string;
};

const getNewRotatorABTestingEmptyObj: () => ABTestingRotatorInterface = () => {
  return {
    id: getRandomKey(),
    redirectionLink: '',
    percentage: 0,
  };
};

const RotatorABTesting: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  return (
    <>
      <ZIonCol
        sizeXl='5.7'
        sizeLg='5.6'
        sizeMd='5.6'
        sizeSm='12'
        sizeXs='12'
        className='border py-3 zaions__bg_white'
      >
        <div className='d-flex align-items-center border-bottom ion-padding-start pb-2'>
          <ZIonIcon icon={gitPullRequestOutline} size={'large'}></ZIonIcon>
          <ZIonText>
            <h6 className='fw-bold ion-no-margin ion-padding-start'>
              Rotator - AB Testing{' '}
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                (help)
              </ZIonRouterLink>
            </h6>
          </ZIonText>
        </div>
        <div className='d-block px-2 mt-3 mb-4'>
          <ZIonRow className='gap-1'>
            <ZIonCol size='5.6'>
              <ZIonItem>
                <ZIonLabel position='floating'>
                  <ZIonText>
                    <h6 className='ion-no-margin'>Redirection Links</h6>
                  </ZIonText>
                </ZIonLabel>
                <ZIonInput disabled className='ion-no-padding'></ZIonInput>
              </ZIonItem>
            </ZIonCol>
            <ZIonCol size='5.6'>
              <ZIonItem>
                <ZIonLabel position='floating'>
                  <ZIonText>
                    <h6 className='ion-no-margin'>Percentage</h6>
                  </ZIonText>
                </ZIonLabel>
                <ZIonInput
                  type='number'
                  value={FULL_PERCENTAGE}
                  disabled
                ></ZIonInput>
              </ZIonItem>
            </ZIonCol>
          </ZIonRow>
          <FieldArray name='rotatorABTesting'>
            {({ remove, push }) => (
              <div>
                {values.rotatorABTesting.length > 0 &&
                  values.rotatorABTesting.map((_rotatorAbTestingEl, _index) => (
                    <ZIonRow key={_index} className='mt-3 ion-align-items-top'>
                      <ZIonCol size='5.6'>
                        <ZIonItem
                          className={`${classNames({
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
                              )?.redirectionLink,
                          })}`}
                        >
                          <ZIonLabel position='floating'>
                            <ZIonText>
                              <h6 className='ion-no-margin'>
                                Redirection Links*
                              </h6>
                            </ZIonText>
                          </ZIonLabel>
                          <ZIonInput
                            name={`rotatorABTesting.${_index}.redirectionLink`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            className='ion-no-padding'
                            value={
                              values.rotatorABTesting[_index].redirectionLink
                            }
                          ></ZIonInput>
                          <ZIonNote slot='error'>
                            {errors.rotatorABTesting?.length &&
                              (
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.redirectionLink}
                          </ZIonNote>
                        </ZIonItem>
                      </ZIonCol>
                      <ZIonCol size='5.6'>
                        <ZIonItem
                          className={`${classNames({
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
                              )?.percentage,
                          })}`}
                        >
                          <ZIonLabel position='floating'>
                            <ZIonText>
                              <h6 className='ion-no-margin'>Percentage*</h6>
                            </ZIonText>
                          </ZIonLabel>
                          <ZIonInput
                            type='number'
                            name={`rotatorABTesting.${_index}.percentage`}
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={values.rotatorABTesting[_index].percentage}
                          ></ZIonInput>
                          <ZIonNote slot='error'>
                            {errors.rotatorABTesting?.length &&
                              (
                                errors.rotatorABTesting[
                                  _index
                                ] as RotatorABTestingErrorType
                              )?.percentage}
                          </ZIonNote>
                        </ZIonItem>
                      </ZIonCol>
                      <ZIonCol className='ion-padding-top mt-4'>
                        <ZIonIcon
                          icon={trashBin}
                          onClick={() => {
                            remove(_index);
                          }}
                          color='danger'
                          className='zaions__nav_item'
                        />
                      </ZIonCol>
                    </ZIonRow>
                  ))}

                {values.geoLocation.length ? (
                  <ZIonButton
                    disabled
                    color={'dark'}
                    className='ion-text-capitalize mt-3'
                    fill='clear'
                  >
                    You can't add a redirection if Geolocation is activated
                  </ZIonButton>
                ) : (
                  <ZIonButton
                    fill='clear'
                    className='ion-text-capitalize mt-3'
                    size='small'
                    onClick={() => push(getNewRotatorABTestingEmptyObj)}
                  >
                    Add a destination
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

export default RotatorABTesting;
