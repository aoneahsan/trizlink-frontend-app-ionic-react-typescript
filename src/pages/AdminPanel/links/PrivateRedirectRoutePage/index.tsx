/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { Geolocation } from '@capacitor/geolocation';
import { Formik } from 'formik';
import { AxiosError } from 'axios';
import classNames from 'classnames';

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
  ZIonNote,
  ZIonRouterLink,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import ZIonPage from '@/components/ZIonPage';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZRQCreateRequest,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ProductExternalURL } from '@/utils/constants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import {
  _getQueryKey,
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  getCountryFromCoordinates,
  isZNonEmptyString,
  isZNonEmptyStrings,
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
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  type ABTestingRotatorInterface,
  EZGeoLocationCondition,
  type GeoLocationRotatorInterface,
  type LinkExpirationInfoInterface,
  type messengerPlatformsBlockEnum,
  type PasswordInterface
} from '@/types/AdminPanel/index.type';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { reportCustomError } from '@/utils/customErrorType';

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
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZPrivateRedirectRoutePage: React.FC = () => {
  // Folder id getting from url. (use when use when to filter short links by folder listed on the left-side, when user click on the folder from listed folder the id of that folder the Id of folder will set in the url and we will fetch it here by useParams).
  const { urlPath, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    urlPath?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

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

  const {
    data: getSLDataFromPrivateUrl
    // isFetching: isGetSLDataFromPrivateUrlFetching
  } = useZRQGetRequest<ShortLinkType>({
    _url: API_URL_ENUM.view_sl_by_private_link,
    _key: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS
              .GET_DATA_BY_PRIVATE_LINK
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS
              .GET_SWS_DATA_BY_PRIVATE_LINK
          : ''
      ],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId, urlPath]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId, urlPath]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.urlPath
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([workspaceId, urlPath]) ||
      isZNonEmptyStrings([wsShareId, shareWSMemberId, urlPath])
    ),
    _showLoader: false,
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  const { mutateAsync: checkLinkPasswordValidation } = useZRQCreateRequest({
    _url: API_URL_ENUM.shortLink_check_target_password,
    _urlDynamicParts: [CONSTANTS.RouteParams.urlPath],
    _itemsIds: [getSLDataFromPrivateUrl?.shortUrlPath ?? ''],
    _showAlertOnError: false,
    _authenticated: false,
    _showLoader: false
  });

  useEffect(() => {
    if (
      getSLDataFromPrivateUrl !== undefined &&
      getSLDataFromPrivateUrl !== null &&
      isZNonEmptyString(getSLDataFromPrivateUrl?.id)
    ) {
      void (async () => {
        try {
          const _target = getSLDataFromPrivateUrl?.target as LinkTargetType;
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          const _type =
            // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
            getSLDataFromPrivateUrl?.type as messengerPlatformsBlockEnum;
          const _geoLocations =
            getSLDataFromPrivateUrl?.geoLocationRotatorLinks as GeoLocationRotatorInterface[];
          const _abTestingRotator =
            getSLDataFromPrivateUrl?.abTestingRotatorLinks as ABTestingRotatorInterface[];
          const _linkExpiration =
            getSLDataFromPrivateUrl?.linkExpirationInfo as LinkExpirationInfoInterface;

          const coordinates = await Geolocation.getCurrentPosition();
          console.log({ _userPosition: coordinates });
          //   const _userCountry = await getCountryFromCoordinates({
          //     latitude: coordinates?.coords?.latitude,
          //     longitude: coordinates?.coords?.longitude
          //   });

          // trimming and lowercasing because if user country is same but in api the case is change then it will be a problem so her we are trimming and lowercase to compare correctly.
          //   const _userCountryTrim = _userCountry?.long_name
          //     ?.trim()
          //     ?.toLowerCase();
          const _userCountryTrim = '';

          // generating redirect link according to __target and type. (the default redirection)
          let _redirectUrl = zRedirectToTarget({
            _target,
            type: _type
          });

          // if Ab testing rotators are set the setting _redirectUrl from below.
          if (
            _abTestingRotator?.length > 0 &&
            (_geoLocations?.length === 0 ||
              _geoLocations === undefined ||
              _geoLocations === null)
          ) {
            const _randomRotatorLink = zGetRandomLink(_abTestingRotator);

            if (_randomRotatorLink !== null) {
              _redirectUrl = _randomRotatorLink;
            }
          }

          // if geo locations are set the setting _redirectUrl from below.
          if (
            _userCountryTrim !== undefined &&
            _userCountryTrim !== null &&
            (_abTestingRotator?.length === 0 ||
              _abTestingRotator === undefined ||
              _abTestingRotator === null)
          ) {
            let highestPriority = Infinity; // Start with a high value

            // Checking if any geo-location define. if define then redirect according to it.
            // Now check if the user's country exists in the geoRedirects array.
            for (const geoLocation of _geoLocations) {
              if (
                geoLocation?.condition !== undefined &&
                geoLocation?.country !== null
              ) {
                let _country: string | string[] | null = null;

                //
                if (typeof geoLocation?.country === 'string') {
                  // trimming and lowercasing because if user country is same but in google map api result the case is change then it will be a problem so her we are trimming and lowercase to compare correctly.
                  _country = geoLocation?.country?.trim()?.toLowerCase();
                } else if (typeof geoLocation?.country === typeof []) {
                  _country = (geoLocation?.country ?? []).map(el =>
                    el?.trim()?.toLowerCase()
                  );
                }

                // If condition is `equal to`.
                const _equalTo =
                  geoLocation?.condition === EZGeoLocationCondition.equalTo &&
                  typeof _country === 'string' &&
                  _country === _userCountryTrim;

                // If condition is `not equal to`.
                const _notEqualTo =
                  geoLocation?.condition ===
                    EZGeoLocationCondition.notEqualTo &&
                  typeof _country === 'string' &&
                  _country !== _userCountryTrim;

                // If condition is `with in`.
                const _within =
                  geoLocation.condition === EZGeoLocationCondition.within &&
                  Array.isArray(geoLocation.country) &&
                  typeof _country === typeof [] &&
                  (_country ?? [])?.includes(_userCountryTrim ?? '');

                // If condition is `not with in`.
                const _notWithin =
                  geoLocation?.condition === EZGeoLocationCondition.notWithin &&
                  Array.isArray(geoLocation.country) &&
                  typeof _country === typeof [] &&
                  !(_country ?? [])?.includes(_userCountryTrim ?? '');

                if (
                  geoLocation?.condition !== undefined &&
                  (_equalTo || _notEqualTo || _within || _notWithin)
                ) {
                  const currentPriority =
                    CONSTANTS.conditionPriority[geoLocation?.condition];
                  if (currentPriority < highestPriority) {
                    highestPriority = currentPriority;
                    _redirectUrl = geoLocation.redirectionLink;
                  }
                }
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
            if (
              (getSLDataFromPrivateUrl?.password as PasswordInterface)
                ?.enabled === false
            ) {
              window.location.replace(_redirectUrl);
            }
          }
        } catch (error) {
          if (error instanceof GeolocationPositionError) {
            console.log({ log: 'my error', error: error?.message });
          }
        }
      })();
    }
  }, [getSLDataFromPrivateUrl]);

  /**
   * Checking if :urlPath matches the requirement.
   */
  useEffect(() => {
    if (urlPath !== undefined && urlPath?.trim()?.length === 6) {
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
  if (
    (getSLDataFromPrivateUrl?.password as PasswordInterface)?.enabled === true
  ) {
    const formikInitialValues = {
      password: ''
    };
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
                className='min-w-[7rem] max-w-[10rem] mb-2'
              />

              <ZIonText className='text-2xl font-bold'>
                This link is protected
              </ZIonText>

              <ZIonText>
                This link is protected by a password. To access this link,
                please provide the password.
              </ZIonText>

              <Formik
                initialValues={formikInitialValues}
                validate={() => {
                  const errors = {};

                  return errors;
                }}
                onSubmit={async values => {
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
                {({ values, handleChange, handleBlur, submitForm }) => {
                  return (
                    <>
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
                          'rounded zaions__bg_white text-start ion-padding-end-0 overflow-hidden mt-4 shadow-none z-ion-border-radius-0 z-ion-border-radius-1rem':
                            true
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
                        }>
                        <ZIonButton
                          slot='end'
                          className='h-full ion-no-margin ion-box-shadow-none ion-text-capitalize z-ion-border-radius-0'
                          onClick={() => {
                            void submitForm();
                          }}
                          testingselector={
                            CONSTANTS.testingSelectors.shortLink.listPage
                              .searchBtn
                          }>
                          <ZIonText className='block px-3 text-sm'>
                            Enter
                          </ZIonText>
                        </ZIonButton>
                      </ZIonInput>

                      <ZIonNote
                        color='danger'
                        className='w-full ion-text-start'>
                        {compState.error}
                      </ZIonNote>
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
                  {ProductExternalURL.GenericExternalURL}
                </ZIonRouterLink>
                . Please note that our links are case sensitive. Feel free to
                visit
                <ZIonRouterLink className='mx-1 cursor-pointer hover:underline'>
                  {ProductExternalURL.GenericExternalURL}
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

export default ZPrivateRedirectRoutePage;
