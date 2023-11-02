/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { AxiosError } from 'axios';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import dayjs from 'dayjs';
import DayJsTimezonePlugin from 'dayjs/plugin/timezone';
import DayJsUtcPlugin from 'dayjs/plugin/utc';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonImg,
  ZIonInput,
  ZIonItem,
  ZIonNote,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ExternalURL } from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ENVS } from '@/utils/envKeys';
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  zGetRandomLink,
  zRedirectToTarget,
  zStringify
} from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type LinkTargetType,
  type ShortLinkType
} from '@/types/AdminPanel/linksType';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
  type ABTestingRotatorInterface,
  EZGeoLocationCondition,
  type GeoLocationRotatorInterface,
  type LinkExpirationInfoInterface,
  type messengerPlatformsBlockEnum,
  type PasswordInterface
} from '@/types/AdminPanel/index.type';
import { ProductLogo } from '@/assets/images';
import { Formik } from 'formik';
import classNames from 'classnames';
import { reportCustomError } from '@/utils/customErrorType';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
dayjs.extend(DayJsUtcPlugin);
dayjs.extend(DayJsTimezonePlugin);

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (This page handles the redirection of short links, such as "/s/mrtf". It extracts the unique link identifier, validates it, and redirects the user to the corresponding destination.)
 * @type {*}
 * */

const conditionPriority: Record<EZGeoLocationCondition, number> = {
  [EZGeoLocationCondition.equalTo]: 1,
  [EZGeoLocationCondition.within]: 2,
  [EZGeoLocationCondition.notEqualTo]: 3,
  [EZGeoLocationCondition.notWithin]: 4
};

const ZShortLinkRedirectPage: React.FC = () => {
  const [compState, setCompState] = useState<{
    shouldFetch: boolean;
    isProcessing: boolean;
    errorCode?: number;
    errorOccurred: boolean;
    sl?: ShortLinkType;
    redirectLink?: string;
    error?: string;
  }>({
    shouldFetch: false,
    isProcessing: true,
    errorOccurred: false
  });

  const { urlPath } = useParams<{ urlPath: string }>();

  const { mutateAsync: createSLRecodeAsyncMutate, error: SLRecodeError } =
    useZRQCreateRequest({
      _url: API_URL_ENUM.shortLink_get_target_url_info,
      _urlDynamicParts: [CONSTANTS.RouteParams.urlPath],
      _itemsIds: [urlPath],
      _showAlertOnError: false,
      _authenticated: false,
      _showLoader: false
    });

  const { mutateAsync: checkLinkPasswordValidation } = useZRQCreateRequest({
    _url: API_URL_ENUM.shortLink_check_target_password,
    _urlDynamicParts: [CONSTANTS.RouteParams.urlPath],
    _itemsIds: [urlPath],
    _showAlertOnError: false,
    _authenticated: false,
    _showLoader: false
  });

  const logDeviceInfo = useCallback(async () => {
    const _deviceInfo = await Device.getInfo();

    return _deviceInfo;
  }, []);

  // const logBatteryInfo = useCallback(async () => {
  // const _batteryInfo = await Device.getBatteryInfo();

  // return _batteryInfo;
  // }, []);

  const getCountryFromCoordinates = async ({
    latitude,
    longitude
  }: {
    latitude?: number;
    longitude?: number;
  }): Promise<{
    long_name: string;
    short_name: string;
    types: string[];
  } | null> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ENVS?.googleMapApiKey}`
    );
    const data = await response.json();

    const countryComponent = (
      data.results[0].address_components as Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>
    ).find(component => component.types.includes('country'));

    return countryComponent ?? null;
  };

  //
  const createURlRecodeCallback = useCallback(async () => {
    const _deviceInfo = await logDeviceInfo();

    const _data = zStringify({
      type: 'click',
      userIP: '',
      userLocationCoords: zStringify({}),
      userDeviceInfo: zStringify(_deviceInfo)
    });

    const _response = await createSLRecodeAsyncMutate(_data);

    if ((_response as ZLinkMutateApiType<ShortLinkType>).success) {
      const _data = extractInnerData<ShortLinkType>(
        _response,
        extractInnerDataOptionsEnum.createRequestResponseItem
      );

      if (_data?.id !== null && _data?.id !== undefined) {
        setCompState(oldValues => ({
          ...oldValues,
          sl: _data,
          isProcessing: false
        }));

        const _target = _data?.target as LinkTargetType;
        const _type = _data?.type as messengerPlatformsBlockEnum;
        const _geoLocations =
          _data?.geoLocationRotatorLinks as GeoLocationRotatorInterface[];
        const _abTestingRotator =
          _data?.abTestingRotatorLinks as ABTestingRotatorInterface[];
        const _linkExpiration =
          _data?.linkExpirationInfo as LinkExpirationInfoInterface;
        const _userPosition = await Geolocation.getCurrentPosition();
        const _userCountry = await getCountryFromCoordinates({
          latitude: _userPosition?.coords?.latitude,
          longitude: _userPosition?.coords?.longitude
        });

        // generating redirect link according to __target and type. (the default redirection)
        let _redirectUrl = zRedirectToTarget({
          _target,
          type: _type
        });

        const _randomRotatorLink = zGetRandomLink(_abTestingRotator);

        if (_randomRotatorLink !== null && _abTestingRotator?.length > 0) {
          _redirectUrl = _randomRotatorLink;
        }

        let highestPriority = Infinity; // Start with a high value

        // Checking if any geo-location define. if define then redirect according to it.
        // Now check if the user's country exists in the geoRedirects array.
        for (const geoLocation of _geoLocations) {
          if (
            (geoLocation.country !== undefined &&
              geoLocation.condition === EZGeoLocationCondition.equalTo &&
              geoLocation.country === _userCountry) ??
            (geoLocation.condition === EZGeoLocationCondition.notEqualTo &&
              geoLocation.country !== _userCountry) ??
            (geoLocation.condition === EZGeoLocationCondition.within &&
              Array.isArray(geoLocation.country) &&
              geoLocation.country.includes(_userCountry!)) ??
            (geoLocation.condition === EZGeoLocationCondition.notWithin &&
              Array.isArray(geoLocation.country) &&
              !geoLocation.country.includes(_userCountry!))
          ) {
            const currentPriority = conditionPriority[geoLocation.condition];
            if (currentPriority < highestPriority) {
              highestPriority = currentPriority;
              _redirectUrl = geoLocation.redirectionLink;
            }
          }
        }

        // If there is link-expiration define. then redirect according to it.
        if (
          _linkExpiration?.enabled === true &&
          _linkExpiration?.redirectionLink !== undefined &&
          _linkExpiration?.redirectionLink?.trim()?.length > 0
        ) {
          const _expirationTimePass = dayjs
            .tz(dayjs(), _linkExpiration?.timezone)
            .isAfter(
              dayjs.tz(
                _linkExpiration?.expirationDate,
                _linkExpiration?.timezone
              )
            );

          if (_expirationTimePass) {
            _redirectUrl = _linkExpiration?.redirectionLink;
          }
        }

        // redirecting...
        if (_redirectUrl !== undefined) {
          setCompState(oldValues => ({
            ...oldValues,
            redirectLink: _redirectUrl
          }));
          if ((_data?.password as PasswordInterface)?.enabled === false) {
            window.location.replace(_redirectUrl);
          }
        }
      }
    }
  }, []);

  /**
   * If error return from target_url_info api the storing error info in useState for showing appropriate view.
   */
  useEffect(() => {
    if (SLRecodeError instanceof AxiosError) {
      if (SLRecodeError?.response?.data?.status !== undefined) {
        setCompState(oldValues => ({
          ...oldValues,
          errorCode: SLRecodeError?.response?.data?.status,
          errorOccurred: true,
          isProcessing: false
        }));
      }
    }
  }, [SLRecodeError]);

  /**
   * Checking if :urlPath matches the requirement.
   */
  useEffect(() => {
    if (urlPath?.trim()?.length === 6) {
      void createURlRecodeCallback();
      setCompState(oldState => ({
        ...oldState,
        shouldFetch: true
      }));
    } else {
      setCompState(oldState => ({
        ...oldState,
        errorOccurred: true,
        isProcessing: false
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlPath]);

  /**
   * Showing appropriate view.
   */
  if ((compState?.sl?.password as PasswordInterface)?.enabled === true) {
    return (
      <ZIonPage>
        <ZIonContent
          color='light'
          className='h-full'>
          <ZIonRow className='flex h-full ion-align-items-center ion-justify-content-center'>
            <ZIonCol
              size='5'
              className='flex rounded-xl ion-align-items-center ion-justify-content-center zaions__bg_white shadow-xl flex-col px-[3rem] py-[5rem] ion-text-center gap-3'>
              <ZIonImg
                src={ProductLogo}
                className='min-w-[7rem] max-w-[10rem] mb-5'
              />

              <ZIonText className='text-2xl font-bold'>
                This link is protected
              </ZIonText>

              <ZIonText>
                This link is protected by a password. To access this link,
                please provide the password.
              </ZIonText>

              <Formik
                initialValues={{
                  password: ''
                }}
                validate={() => {
                  const errors = {};

                  return errors;
                }}
                onSubmit={async (values, { setErrors, setFieldError }) => {
                  try {
                    const _zStringifyData = zStringify({
                      password: values?.password
                    });

                    const _response:
                      | unknown
                      | ZLinkMutateApiType<{ success: boolean }> =
                      await checkLinkPasswordValidation(_zStringifyData);

                    // if we have a successful response then...
                    if (
                      (_response as ZLinkMutateApiType<{ success: boolean }>)
                        .success
                    ) {
                      // extract Data from _response.
                      const _data = extractInnerData<{ success: boolean }>(
                        _response,
                        extractInnerDataOptionsEnum.createRequestResponseItem
                      );

                      // if we have data then update cache and show success message.
                      if (_data !== undefined && _data.success) {
                        window.location.replace(compState?.redirectLink ?? '');
                      }
                    }
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      // await presentZIonErrorAlert();
                      // Setting errors on form fields
                      const _apiErrors = (
                        error.response?.data as { errors: ZGenericObject }
                      )?.errors;
                      const _errors = formatApiRequestErrorForFormikFormField(
                        ['password'],
                        ['password'],
                        _apiErrors
                      );

                      setCompState(oldValues => ({
                        ...oldValues,
                        error: (_errors as { password: string }).password
                      }));
                    }
                    reportCustomError(error);
                  }
                }}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  submitForm
                }) => {
                  return (
                    <>
                      <ZIonItem
                        className='ion-item-start-no-padding overflow-hidden rounded w-[90%] mt-5'
                        style={{ '--inner-padding-end': '0px' }}
                        lines='none'
                        minHeight='3rem'>
                        <ZIonInput
                          aria-label='Password'
                          type='text'
                          name='password'
                          fill='outline'
                          minHeight='3rem'
                          clearInput={true}
                          placeholder='Password'
                          counter={false}
                          onIonChange={handleChange}
                          onIonBlur={handleBlur}
                          // errorText={errors?.password}
                          value={values.password}
                          className={classNames({
                            'rounded zaions__bg_white': true
                            // 'ion-touched': touched.password,
                            // 'ion-valid': errors?.password?.trim()?.length === 0,
                            // 'ion-invalid':
                            // errors?.password &&
                            // errors?.password?.trim()?.length > 0,
                          })}
                          onKeyUp={event => {
                            if (event?.key === 'Enter') {
                              void submitForm();
                            }
                          }}
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.listPage
                              .searchInput
                          }
                          style={{
                            '--padding-start': '10px',
                            '--border-radius': '0'
                          }}
                        />
                        <ZIonButton
                          slot='end'
                          className='ion-no-margin ion-text-capitalize'
                          onClick={() => {
                            void submitForm();
                          }}
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.listPage
                              .searchBtn
                          }
                          style={{
                            height: '100%',
                            '--border-radius': '0'
                          }}>
                          <ZIonText className='block px-3 text-sm'>
                            Enter
                          </ZIonText>
                        </ZIonButton>
                      </ZIonItem>

                      <ZIonNote color='danger'>{compState.error}</ZIonNote>
                    </>
                  );
                }}
              </Formik>
            </ZIonCol>
          </ZIonRow>
        </ZIonContent>
      </ZIonPage>
    );
  }
  if (compState.isProcessing) {
    return <ZFallbackIonSpinner />;
  } else if (
    urlPath?.trim()?.length === 6 &&
    !compState.errorOccurred &&
    !compState.isProcessing
  ) {
    return <ZFallbackIonSpinner />;
  } else {
    return (
      <ZIonPage>
        <ZIonContent>
          <ZIonRow className='flex h-full ion-align-items-center ion-justify-content-center ion-text-center'>
            <ZIonCol
              size='6'
              className='flex flex-col ion-align-items-center ion-justify-content-center ion-text-center h-max'>
              <ZIonTitle className='text-4xl font-bold ion-no-padding'>
                Something&apos;s wrong here.
              </ZIonTitle>

              <ZIonText className='block mt-3 text-lg tracking-wide'>
                Oops! It seems like you&apos;ve encountered a 404 error. This
                indicates that the link you clicked on is either incorrect or
                the URL you entered is invalid. You might find what you&apos;re
                searching for at
                <ZIonRouterLink className='cursor-pointer ms-1 hover:underline'>
                  {ExternalURL.GenericExternalURL}
                </ZIonRouterLink>
                . Please note that our links are case sensitive. Feel free to
                visit
                <ZIonRouterLink className='mx-1 cursor-pointer hover:underline'>
                  {ExternalURL.GenericExternalURL}
                </ZIonRouterLink>
                for more information.
              </ZIonText>
            </ZIonCol>
          </ZIonRow>
        </ZIonContent>
      </ZIonPage>
    );
  }
};

export default ZShortLinkRedirectPage;
