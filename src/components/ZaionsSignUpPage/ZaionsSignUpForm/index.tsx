// Core Imports
import React, { useCallback, useEffect, useState } from 'react';

// Package Imports
import { Form, Formik, useFormikContext } from 'formik';
import classNames from 'classnames';
import {
  eyeOffOutline,
  eyeOutline,
  logoGoogle,
  refreshOutline
} from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonNote,
  ZIonButton,
  ZIonRouterLink,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import {
  zAxiosApiRequest,
  checkIfContains,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  STORAGE,
  validateFields,
  zStringify,
  extractInnerData,
  isZNonEmptyString
} from '@/utils/helpers';
import {
  API_URL_ENUM,
  CONTAINS,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE,
  ZSetPasswordTabEnum
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';

// Recoil States
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { AxiosError } from 'axios';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import {
  type ZLinkMutateApiType,
  type UserAuthData
} from '@/types/ZaionsApis.type';
import {
  type FormikSetErrorsType,
  type resetFormType
} from '@/types/ZaionsFormik.type';
import {
  reloadBlockingTypeEnum,
  type ZGenericObject
} from '@/types/zaionsAppSettings.type';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import {
  type AuthTokenResponseType,
  type UserAccountType
} from '@/types/UserAccount/index.type';
import dayjs from 'dayjs';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import { reloadBlockingRStateAtom } from '@/ZaionsStore/AppRStates';
import { useLocation } from 'react-router';
import { ProductFavicon } from '@/assets/images';
import TermsPrivacyAcceptedNote from '@/components/TermsPrivacyAcceptedNote';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Style

const ZaionsSignUpForm: React.FC = props => {
  const [compState, setCompState] = useState<{
    email?: string;
    tab?: ZSetPasswordTabEnum;
    OTPCodeValidTill?: string;
    resendOTPValidCheck?: boolean;
  }>();

  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);
  // ZaionsAuthToken
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  const { zNavigatePushRoute } = useZNavigate();
  const { isMdScale, isSmScale } = useZMediaQueryScale();

  const FormikSubmissionHandler = async (
    _values: Record<string, unknown>,
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      // Loading start...
      await presentZIonLoader(MESSAGES.SIGN_UP.SIGNING_UP);

      // registering data
      const _response = await zAxiosApiRequest<UserAuthData>({
        _url: API_URL_ENUM.register,
        _method: 'post',
        _isAuthenticatedRequest: false,
        _data: zStringify({
          displayName: _values.displayName,
          email: _values.emailAddress,
          password: _values.password,
          password_confirmation: _values.confirm_password
        })
      });

      // Checking if the _response is available & if there is a user object in _response which have the id.
      if (
        _response?.data !== undefined &&
        _response?.success &&
        _response?.data.user?.id !== null
      ) {
        // getting user data.
        const userData = getUserDataObjectForm(_response?.data.user);

        // Storing user token at userAccountAuthToken State.
        const userToken = {
          token: _response?.data?.token?.plainTextToken
        };

        // Set user data && user token to localstorage.
        if (userData !== null && userToken.token !== null) {
          // store User token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
          // store auth token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

          // Storing user data in userAccount Recoil State.
          setUserAccountStateAtom(oldValues => ({
            ...oldValues,
            ...userData
          }));
          setAuthTokenDataState(oldValues => ({
            ...oldValues,
            ...userToken
          }));

          // reset form.
          resetForm();

          await dismissZIonLoader();

          // If success then show the success notification.
          showSuccessNotification('Registration Completed');

          // redirect to profile. (old 30/5/2023)
          // zNavigatePushRoute(ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile);

          // Redirect to startup page
          zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
        } else {
          // if there is any error in above then Throw Error..
          throw new ZCustomError();
        }
      } else {
        // if there is any error in above then Throw Error..
        throw new AxiosError();
      }
    } catch (error) {
      await dismissZIonLoader();

      if (error instanceof AxiosError) {
        // if there any error then showing the alert modal.
        // await presentZIonErrorAlert();

        // Setting errors on form fields
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;

        if (
          _apiErrors !== undefined &&
          _apiErrors !== null &&
          Object.keys(_apiErrors).length > 0
        ) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['displayName', 'emailAddress', 'password'],
            ['name', 'email', 'password'],
            _apiErrors
          );

          setErrors(_errors);
        } else {
          await presentZIonErrorAlert();
        }
      } else if (error instanceof ZCustomError || error instanceof Error) {
        // if we need to do some other type of logic reporting (like report this error to API or error logging to like sentry or datadog etc then we can do that here, otherwise if we just want to show the message of error to user in alert then we can do that in one else case no need for this check, but here we can set the title of alert to )
        await presentZIonErrorAlert();
      }
    }
  };

  useEffect(() => {
    try {
      void (async () => {
        const userData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.SIGNUP_USER_DATA
        )) as {
          email: string;
          tab?: ZSetPasswordTabEnum;
          OTPCodeValidTill?: string;
          resendOTPValidCheck?: boolean;
        } | null;
        //
        setCompState(oldValues => ({
          ...oldValues,
          email: userData?.email,
          tab: userData?.tab,
          OTPCodeValidTill: userData?.OTPCodeValidTill,
          resendOTPValidCheck: userData?.resendOTPValidCheck
        }));
      })();
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const formikInitialValues = {
    displayName: '',
    emailAddress: compState?.email ?? '',
    password: '',
    otp: '',
    confirm_password: '',

    isDisplayNameApiError: false,
    isDisplayNameApiSuccess: true,
    displayNameApiErrorText: '',
    displayNameApiSuccessText: '',
    isOTPApiError: false,
    OTPApiErrorText: '',
    OTPCodeValidTill: compState?.OTPCodeValidTill ?? '',
    resendOTPValidCheck: compState?.resendOTPValidCheck ?? false,
    OTPValidCheckExecuted: false,

    tab: compState?.tab ?? ZSetPasswordTabEnum.sendOptTab
  };

  return (
    <Formik
      // Initial Values of sign up form fields
      initialValues={formikInitialValues}
      // Validations of sign up form fields
      validate={values => {
        try {
          // Error object
          const errors: {
            displayName?: string;
            emailAddress?: string;
            password?: string;
            confirm_password?: string;
          } = {};

          // validating the fields and checking for error and error ? setting the errors : validated
          validateFields(
            ['displayName', 'emailAddress', 'password', 'confirm_password'],
            values,
            errors,
            [
              VALIDATION_RULE.username,
              VALIDATION_RULE.email,
              VALIDATION_RULE.password,
              VALIDATION_RULE.confirm_password
            ]
          );

          // checking the confirm password is === password ? validated : setting an error + invalidate
          if (values.confirm_password !== values.password) {
            errors.confirm_password = MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
          }

          // returning errors object
          return errors;
        } catch (error) {
          console.error({
            errorPlacement:
              'From components - InPageComponents - ZaionsSignUpPage - ZaionsSignUpForm Formik validate Catch',
            error
          });
        }
      }}
      enableReinitialize
      // Submit function
      onSubmit={async (_values, { resetForm, setErrors }) => {
        await FormikSubmissionHandler(_values, resetForm, setErrors);
      }}>
      {({ values }) => (
        <>
          <ZIonRow
            className={classNames({
              'mb-10': isMdScale,
              'mb-5': !isMdScale
            })}>
            <ZIonCol
              className='flex mx-auto ion-justify-content-center'
              sizeXl='6'
              sizeLg='6.7'
              sizeMd='7.5'
              sizeSm='10'
              sizeXs='12'>
              <div className='w-full ion-text-center'>
                <ZIonImg
                  src={ProductFavicon}
                  className={classNames('mx-auto', {
                    'w-[6rem] h-[6rem] mb-6': isMdScale,
                    'w-[4rem] h-[4rem] mb-4': !isMdScale && isSmScale,
                    'w-[3.5rem] h-[3.5rem] mb-2': !isSmScale
                  })}
                />

                <ZIonText
                  className={classNames(
                    'block mb-3 font-bold ion-text-center',
                    {
                      'text-2xl': isMdScale,
                      'text-xl': !isMdScale && isSmScale,
                      'text-lg': !isSmScale
                    }
                  )}>
                  Sign up and start shortening
                </ZIonText>

                <ZIonText
                  className={classNames({
                    block: true,
                    'mb-5': values.tab === ZSetPasswordTabEnum.confirmOptTab
                  })}>
                  <ZIonText>
                    {values.tab === ZSetPasswordTabEnum.sendOptTab
                      ? 'Already have an account? '
                      : values.tab === ZSetPasswordTabEnum.confirmOptTab
                        ? 'Confirm OPT(One Time Password) send to your email.'
                        : ''}
                  </ZIonText>
                  {values.tab === ZSetPasswordTabEnum.sendOptTab && (
                    <ZIonRouterLink
                      className='underline'
                      routerLink={ZaionsRoutes.LoginRoute}
                      testingselector={
                        CONSTANTS.testingSelectors.signupPage.loginButton
                      }>
                      Login
                    </ZIonRouterLink>
                  )}
                </ZIonText>
              </div>
            </ZIonCol>
          </ZIonRow>

          <ZIonRow className='ion-justify-content-center'>
            <ZIonCol
              className='ion-text-start'
              size='4.2'
              sizeLg='5'
              sizeMd='6.2'
              sizeSm='8.2'
              sizeXs='11.9'>
              <Form>
                {values.tab === ZSetPasswordTabEnum.sendOptTab ? (
                  <ZSendOtpTab />
                ) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
                  <ZConfirmOptTab />
                ) : values.tab === ZSetPasswordTabEnum.newPasswordTab ? (
                  <ZNewPasswordTab />
                ) : null}
              </Form>
            </ZIonCol>
          </ZIonRow>
          <TermsPrivacyAcceptedNote isRegisterPage />
        </>
      )}
    </Formik>
  );
};

const ZSendOtpTab: React.FC = () => {
  const setReloadBlockingRState = useSetRecoilState(reloadBlockingRStateAtom);
  const location = useLocation();
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    setErrors,
    values,
    touched,
    errors
  } = useFormikContext<{
    emailAddress: string;
    tab: ZSetPasswordTabEnum;
    inviteToken: string;

    isEmailAddressApiError: boolean;
    emailAddressApiErrorText: string;
    isOTPApiError: boolean;
    OTPErrorText: string;
  }>();

  // #region APIs.
  const { mutateAsync: zSendOtpAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.send_signup_otp,
    _showAlertOnError: false,
    _authenticated: false,
    _loaderMessage: MESSAGES.OTP.SENDING
  });
  // #endregion

  // #region Functions.
  const ZSendOTPHandler = async (): Promise<void> => {
    try {
      if (
        values?.emailAddress?.length > 0 &&
        values?.emailAddress?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: values.emailAddress
        });

        const _response = await zSendOtpAsyncMutate(_stringifyData);
        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<{
            success: boolean;
            OTPCodeValidTill: string;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== null && _data !== undefined && _data?.success) {
            void setFieldValue(
              'OTPCodeValidTill',
              _data?.OTPCodeValidTill,
              false
            );
            const userData = {
              email: values?.emailAddress,
              tab: ZSetPasswordTabEnum.confirmOptTab,
              OTPCodeValidTill: _data?.OTPCodeValidTill,
              resendOTPValidCheck: false
            };

            await STORAGE.SET(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA, userData);

            setReloadBlockingRState(_oldValues => ({
              ..._oldValues,
              isBlock: true,
              pageUrl: location.pathname,
              type: reloadBlockingTypeEnum.signUpPage
            }));

            void setFieldValue('tab', ZSetPasswordTabEnum.confirmOptTab, false);

            showSuccessNotification(MESSAGES.OTP.SEND_SUCCESSFULLY);
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        try {
          const _apiErrorObjects = error.response?.data as {
            errors: { item: string[] } | ZGenericObject;
            status: number;
          };

          const _errors = formatApiRequestErrorForFormikFormField(
            ['emailAddress'],
            ['email'],
            _apiErrorObjects.errors as ZGenericObject
          );

          if (_errors !== undefined) {
            setErrors(_errors);
          }

          const _apiErrors = (_apiErrorObjects?.errors as { item: string[] })
            ?.item;
          const _apiErrorCode = _apiErrorObjects?.status;

          if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
            setFieldError('emailAddress', _apiErrors[0]);
          }
        } catch (error) {}
      }

      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      <ZIonInput
        name='emailAddress'
        label='Email Address*'
        labelPlacement='stacked'
        placeholder='Please enter email'
        type='email'
        // enterkeyhint='next'
        onIonChange={e => {
          handleChange(e);
          if (values.isEmailAddressApiError) {
            void setFieldValue('isEmailAddressApiError', false);
          }
        }}
        onIonBlur={handleBlur}
        value={values.emailAddress}
        testingselector={CONSTANTS.testingSelectors.setPasswordPage.emailInput}
        errorText={
          touched.emailAddress === true
            ? errors.emailAddress !== undefined &&
              errors.emailAddress?.trim()?.length > 0
              ? errors.emailAddress
              : values.isEmailAddressApiError
                ? values?.emailAddressApiErrorText
                : undefined
            : undefined
        }
        className={classNames({
          'mb-4': true,
          'ion-touched': touched.emailAddress,
          'ion-invalid': values?.isEmailAddressApiError || errors.emailAddress,
          'ion-valid':
            touched.emailAddress === true &&
            (errors.emailAddress === undefined ||
              errors.emailAddress?.trim()?.length === 0)
        })}
      />

      {/* Send OTP Button */}
      <ZIonButton
        expand='block'
        disabled={
          errors?.emailAddress !== undefined ||
          values?.emailAddress?.length === 0
        }
        className='mt-4 ion-text-capitalize'
        onClick={() => {
          void ZSendOTPHandler();
        }}
        testingselector={CONSTANTS.testingSelectors.setPasswordPage.otpBtn}>
        Send OTP
      </ZIonButton>
    </>
  );
};

const ZConfirmOptTab: React.FC = () => {
  const setReloadBlockingRState = useSetRecoilState(reloadBlockingRStateAtom);

  const { handleChange, handleBlur, setFieldValue, values, touched } =
    useFormikContext<{
      emailAddress: string;
      otp: string;
      tab: ZSetPasswordTabEnum;
      OTPCodeValidTill: string;
      resendOTPValidCheck: boolean;
      OTPValidCheckExecuted: boolean;

      isEmailAddressApiError: boolean;
      emailAddressApiErrorText: string;
      isOTPApiError: boolean;
      OTPApiErrorText: string;
      inviteToken: string;
    }>();

  // #region APIs.
  const { mutateAsync: zConfirmOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.confirm_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: MESSAGES.OTP.CONFIRMING
  });

  const { mutateAsync: zResendOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.resend_user_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: MESSAGES.OTP.RESENDING
  });
  // #endregion

  // #region Functions.
  const ZConfirmOTPHandler = async (): Promise<void> => {
    try {
      if (values?.otp?.length > 0 && values?.otp?.trim()?.length === 6) {
        const _stringifyData = zStringify({
          email: values.emailAddress,
          otp: values.otp
        });

        const _response = await zConfirmOtpAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{
            success: boolean;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== undefined && _data?.success) {
            if (values?.isOTPApiError) {
              void setFieldValue('OTPApiErrorText', '', false);
              void setFieldValue('isOTPApiError', false, false);
            }

            const userData = {
              email: values?.emailAddress,
              tab: ZSetPasswordTabEnum.newPasswordTab
            };

            await STORAGE.SET(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA, userData);

            void setFieldValue(
              'tab',
              ZSetPasswordTabEnum.newPasswordTab,
              false
            );
            void setFieldValue('otp', '', false);
            showSuccessNotification(MESSAGES.OTP.CONFIRMED);
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors?.item;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void setFieldValue('OTPApiErrorText', _apiErrors[0], false);
          void setFieldValue('isOTPApiError', true, false);
        }
      }

      reportCustomError(error);
    }
  };

  const ZResendOTPHandler = async (): Promise<void> => {
    try {
      if (
        values?.emailAddress?.length > 0 &&
        values?.emailAddress?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: values.emailAddress
        });

        const _response = await zResendOtpAsyncMutate({
          itemIds: [],
          urlDynamicParts: [],
          requestData: _stringifyData
        });
        if (_response !== undefined) {
          const _data = extractInnerData<{
            success: boolean;
            OTPCodeValidTill: string;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== undefined && _data?.success) {
            const userData = {
              email: values?.emailAddress,
              tab: ZSetPasswordTabEnum.confirmOptTab,
              OTPCodeValidTill: _data?.OTPCodeValidTill,
              resendOTPValidCheck: false
            };

            await STORAGE.SET(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA, userData);

            void setFieldValue(
              'OTPCodeValidTill',
              _data?.OTPCodeValidTill,
              false
            );
            void setFieldValue('resendOTPValidCheck', false, false);
            void setFieldValue('tab', ZSetPasswordTabEnum.confirmOptTab, false);

            showSuccessNotification(MESSAGES.OTP.SEND_SUCCESSFULLY);
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors?.item;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (_apiErrorCode === ZErrorCodeEnum.notFound) {
          showErrorNotification(_apiErrors[0]);
        }
      }
      reportCustomError(error);
    }
  };
  // #endregion

  useEffect(() => {
    setReloadBlockingRState(_oldValues => ({
      ..._oldValues,
      isBlock: true,
      pageUrl: location.pathname,
      type: reloadBlockingTypeEnum.signUpPage
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* OTP Field */}
      <div className='flex ion-align-items-start'>
        <ZIonInput
          name='otp'
          label='OTP'
          labelPlacement='stacked'
          placeholder='Please enter OTP'
          type='text'
          maxlength={6}
          enterkeyhint='next'
          onIonChange={handleChange}
          onIonBlur={handleBlur}
          value={values.otp}
          testingselector={
            CONSTANTS.testingSelectors.setPasswordPage.emailInput
          }
          errorText={
            values?.isOTPApiError ? values?.OTPApiErrorText : undefined
          }
          className={classNames({
            'mb-4': true,
            'ion-touched': touched.otp,
            'ion-invalid': values?.isOTPApiError
            // 'ion-valid': touched.otp && !values?.isOTPApiError
          })}
        />

        <ZCountdown
          onTick={() => {
            if (
              dayjs().isAfter(
                dayjs(values?.OTPCodeValidTill).subtract(4, 'minute')
              ) &&
              !values.OTPValidCheckExecuted
            ) {
              void (async () => {
                const userData = {
                  email: values?.emailAddress,
                  tab: ZSetPasswordTabEnum.confirmOptTab,
                  OTPCodeValidTill: values?.OTPCodeValidTill,
                  resendOTPValidCheck: true
                };

                await STORAGE.SET(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA, userData);
              })();
              void setFieldValue('resendOTPValidCheck', true, false);
              void setFieldValue('OTPValidCheckExecuted', true, false);
            }
          }}
          countDownTime={values?.OTPCodeValidTill}
          color='dark'
          component={({ d, color }) => {
            return (
              <ZIonText className='h-full mt-4 ms-2'>
                {d.minutes}:{d.seconds}
              </ZIonText>
            );
          }}
        />
      </div>

      {/* Confirm OTP Button */}
      <div
        className={classNames({
          'w-full': true,
          'cursor-not-allowed': values?.otp?.trim()?.length !== 6
        })}>
        <ZIonButton
          expand='block'
          disabled={values?.otp?.trim()?.length !== 6}
          className='mt-4 ion-text-capitalize'
          onClick={() => {
            void ZConfirmOTPHandler();
          }}
          testingselector={
            CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
          }>
          Continue
        </ZIonButton>
      </div>

      <div
        className={classNames({
          'w-full': true,
          'cursor-not-allowed': !values.resendOTPValidCheck
        })}>
        <ZIonButton
          expand='block'
          fill='outline'
          className='mt-4 ion-text-capitalize'
          disabled={!values.resendOTPValidCheck}
          onClick={() => {
            if (values.resendOTPValidCheck) {
              void ZResendOTPHandler();
            }
          }}
          testingselector={
            CONSTANTS.testingSelectors.setPasswordPage.resendOtpBtn
          }>
          Resend OTP
        </ZIonButton>
      </div>
    </>
  );
};

const ZNewPasswordTab: React.FC = () => {
  const setReloadBlockingRState = useSetRecoilState(reloadBlockingRStateAtom);
  // #region Custom hooks.
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    setErrors,
    setFieldTouched,
    values,
    touched,
    errors
  } = useFormikContext<{
    emailAddress: string;
    tab: ZSetPasswordTabEnum;
    inviteToken: string;

    password: string;
    displayName: string;
    canViewPassword: boolean;
    confirm_password: string;
    canViewConfirmPassword: boolean;
    isDisplayNameApiError: boolean;
    isDisplayNameApiSuccess: boolean;
    displayNameApiErrorText: string;
    displayNameApiSuccessText: string;
  }>();
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  // #endregion

  // #region APIs.
  const { mutateAsync: zSetPasswordAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.set_username_password,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: 'Setting password...'
  });

  const { mutateAsync: zCheckIfUsernameIsAvailableAsyncMutate } =
    useZRQCreateRequest({
      _url: API_URL_ENUM.checkIfUsernameIsAvailable,
      _showAlertOnError: false,
      _authenticated: false,
      _loaderMessage: 'Checking...'
    });
  // #endregion

  // #region Recoil states.
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);
  // #endregion

  // #region Functions.
  const ZSetDisplayNamePassword = async (): Promise<void> => {
    try {
      if (
        values?.password?.length > 0 &&
        values?.password?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: values.emailAddress,
          username: values.displayName,
          password: values.password,
          password_confirmation: values.confirm_password
        });

        const _response = await zSetPasswordAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
        });

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<{
            user: UserAccountType;
            token: AuthTokenResponseType;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          // Checking if the __data is available & if there is a user object in __data which have the id.
          if (_data !== undefined && _data?.user?.id !== null) {
            // getting user data.
            const userData = getUserDataObjectForm(_data.user);

            // Storing user token at userAccountAuthToken State.
            const userToken = {
              token: _data?.token?.plainTextToken
            };

            await STORAGE.REMOVE(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA);

            // Set user data && user token to localstorage.
            if (userData !== undefined && userToken.token !== undefined) {
              setReloadBlockingRState(_oldValues => ({
                ..._oldValues,
                isBlock: false,
                pageUrl: '',
                type: null
              }));

              // store User token.
              void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
              // store auth token.
              void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

              // Storing user data in userAccount Recoil State.
              setUserAccountStateAtom(oldValues => ({
                ...oldValues,
                ...userData
              }));
              setAuthTokenDataState(oldValues => ({
                ...oldValues,
                ...userToken
              }));

              // reset form.
              resetForm();

              // If success then show the success notification.
              showSuccessNotification('Registration Completed');

              // Redirect to startup page
              zNavigatePushRoute(ZaionsRoutes.AdminPanel.AppStartupPage);
            } else {
              // if there is any error in above then Throw Error..
              throw new ZCustomError();
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // if there any error then showing the alert modal.
        // await presentZIonErrorAlert();

        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (_apiErrorCode === ZErrorCodeEnum.serverError) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['displayName', 'password', 'confirm_password'],
            ['username', 'password', 'password_confirmation'],
            _apiErrors as ZGenericObject
          );

          setErrors(_errors);
        }

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void presentZIonErrorAlert({
            message: (_apiErrors as { item: string[] }).item[0]
          });
        }
      }
      reportCustomError(error);
    }
  };

  const checkIfUsernameIsAvailableHandler = useCallback(
    async (_value: string) => {
      try {
        const _response = await zCheckIfUsernameIsAvailableAsyncMutate(_value);

        if (
          _response !== undefined &&
          _response !== null &&
          (_response as ZLinkMutateApiType<{ username: string }>).success
        ) {
          const _data = extractInnerData<{ username: string }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );
          void setFieldValue('isDisplayNameApiError', false, false);
          void setFieldValue('displayNameApiErrorText', '', false);

          //
          void setFieldValue('isDisplayNameApiSuccess', true, false);
          void setFieldValue(
            'displayNameApiSuccessText',
            _data?.username,
            false
          );
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const _error = (
            error?.response?.data as { errors: { username: string[] } }
          )?.errors;

          if (isZNonEmptyString(_error?.username[0])) {
            void setFieldValue('isDisplayNameApiError', true, false);
            void setFieldValue(
              'displayNameApiErrorText',
              _error?.username[0],
              false
            );
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // #endregion

  useEffect(() => {
    setReloadBlockingRState(_oldValues => ({
      ..._oldValues,
      isBlock: true,
      pageUrl: location.pathname,
      type: reloadBlockingTypeEnum.signUpPage
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ZIonInput
        name='displayName'
        label='Display Name*'
        labelPlacement='stacked'
        placeholder='Please enter display name'
        onIonChange={e => {
          handleChange(e);
          if (values.isDisplayNameApiError) {
            void setFieldValue('isDisplayNameApiError', false, false);
            void setFieldValue('displayNameApiErrorText', '', false);
          }

          if (values.isDisplayNameApiSuccess) {
            void setFieldValue('isDisplayNameApiSuccess', false, false);
            void setFieldValue('displayNameApiSuccessText', '', false);
          }
        }}
        onIonBlur={handleBlur}
        value={values.displayName}
        // errorText={
        //   touched?.displayName === true ? errors.displayName : undefined
        // }
        errorText={
          touched?.displayName === true && values?.isDisplayNameApiError
            ? values?.displayNameApiErrorText
            : errors.displayName
        }
        helperText={values.displayNameApiSuccessText}
        type='text'
        clearOnEdit={false}
        testingselector={CONSTANTS.testingSelectors.signupPage.passwordInput}
        className={classNames({
          'ion-padding-end-0': true,
          'ion-touched': touched?.displayName === true,
          'ion-invalid':
            touched?.displayName === true &&
            (isZNonEmptyString(errors.displayName) ||
              values?.isDisplayNameApiError),
          'ion-valid':
            touched?.displayName === true &&
            (!isZNonEmptyString(errors.displayName) ||
              values?.isDisplayNameApiSuccess)
        })}>
        <ZIonButton
          fill='clear'
          slot='end'
          size='large'
          className='w-[3rem] ion-no-padding ion-no-margin ms-3'
          testingselector={
            CONSTANTS.testingSelectors.signupPage.checkDisplayNameAvailableBtn
          }
          onClick={() => {
            void checkIfUsernameIsAvailableHandler(
              zStringify({
                username: values.displayName
              })
            );
          }}>
          <ZIonIcon icon={refreshOutline} />
        </ZIonButton>
      </ZIonInput>

      {/* Password Field */}
      <div className='flex pt-1 mt-5 ion-align-items-start'>
        <ZIonInput
          name='password'
          label='Password*'
          labelPlacement='stacked'
          placeholder='Please enter password'
          onIonChange={e => {
            handleChange(e);
            if (
              e?.target?.value !== undefined &&
              (e?.target?.value as string)?.length > 0
            ) {
              void setFieldTouched('password', true, true);
            }
          }}
          onIonBlur={handleBlur}
          value={values.password}
          errorText={touched?.password === true ? errors.password : undefined}
          type={values.canViewPassword ? 'text' : 'password'}
          clearOnEdit={false}
          testingselector={CONSTANTS.testingSelectors.signupPage.passwordInput}
          className={classNames({
            'ion-padding-end-0': true,
            'ion-touched': touched?.password === true,
            'ion-invalid': touched.password === true && errors.password,
            'ion-valid':
              touched?.password === true &&
              (errors?.password === undefined ||
                errors?.password?.trim()?.length === 0)
          })}>
          <ZIonButton
            slot='end'
            fill='clear'
            size='large'
            className='w-[3rem] ion-no-padding ion-no-margin ms-3'
            testingselector={
              CONSTANTS.testingSelectors.signupPage.canViewPasswordButton
            }
            onClick={() => {
              void setFieldValue(
                'canViewPassword',
                !values.canViewPassword,
                false
              );
            }}>
            <ZIonIcon
              icon={values.canViewPassword ? eyeOffOutline : eyeOutline}
            />
          </ZIonButton>
        </ZIonInput>
      </div>

      <ZIonNote className='w-full'>
        <ZIonRow>
          <ZIonCol
            size='6'
            className='pt-0'>
            <ZIonText
              color={
                touched?.password === true
                  ? checkIfContains(values.password, CONTAINS.minCharacter)
                    ? 'success'
                    : 'danger'
                  : 'medium'
              }>
              8 or more characters
            </ZIonText>
          </ZIonCol>
          <ZIonCol
            size='6'
            className='pt-0'>
            <ZIonText
              color={
                touched?.password === true
                  ? checkIfContains(values.password, CONTAINS.number)
                    ? 'success'
                    : 'danger'
                  : 'medium'
              }>
              One number
            </ZIonText>
          </ZIonCol>
          <ZIonCol size='6'>
            <ZIonText
              color={
                touched?.password === true
                  ? checkIfContains(values.password, CONTAINS.letter)
                    ? 'success'
                    : 'danger'
                  : 'medium'
              }>
              One letter
            </ZIonText>
          </ZIonCol>
          <ZIonCol size='6'>
            <ZIonText
              color={
                touched?.password === true
                  ? checkIfContains(values.password, CONTAINS.specialSymbol)
                    ? 'success'
                    : 'danger'
                  : 'medium'
              }>
              One special character
            </ZIonText>
          </ZIonCol>
        </ZIonRow>
      </ZIonNote>

      {/* Confirm Password Field */}
      <div className='flex pt-2 mt-5 ion-align-items-start'>
        <ZIonInput
          label='Confirm Password*'
          name='confirm_password'
          labelPlacement='stacked'
          placeholder='Please confirm password'
          onIonChange={handleChange}
          onIonBlur={handleBlur}
          value={values.confirm_password}
          clearOnEdit={false}
          type={values?.canViewConfirmPassword ? 'text' : 'password'}
          testingselector={
            CONSTANTS.testingSelectors.signupPage.confirmPasswordInput
          }
          errorText={
            touched?.confirm_password === true
              ? errors.confirm_password
              : undefined
          }
          className={classNames({
            'ion-padding-end-0': true,
            'ion-touched': touched?.confirm_password === true,
            'ion-invalid':
              touched?.confirm_password === true && errors.confirm_password,
            'ion-valid':
              touched?.confirm_password === true &&
              (errors?.confirm_password === undefined ||
                errors?.confirm_password?.trim()?.length === 0)
          })}>
          <ZIonButton
            fill='clear'
            slot='end'
            size='large'
            className='w-[3rem] ion-no-padding ion-no-margin ms-3'
            testingselector={
              CONSTANTS.testingSelectors.signupPage.canViewConfirmPasswordButton
            }
            onClick={() => {
              void setFieldValue(
                'canViewConfirmPassword',
                !values.canViewConfirmPassword,
                false
              );
            }}>
            <ZIonIcon
              icon={values?.canViewConfirmPassword ? eyeOffOutline : eyeOutline}
            />
          </ZIonButton>
        </ZIonInput>
      </div>

      {/* Confirm OTP Button */}
      <div
        className={classNames({
          'w-full': true,
          'cursor-not-allowed':
            isZNonEmptyString(errors?.password) ||
            isZNonEmptyString(errors?.confirm_password) ||
            isZNonEmptyString(errors?.displayName) ||
            values?.isDisplayNameApiError
        })}>
        <ZIonButton
          expand='block'
          disabled={
            isZNonEmptyString(errors?.password) ||
            isZNonEmptyString(errors?.confirm_password) ||
            isZNonEmptyString(errors?.displayName) ||
            values?.isDisplayNameApiError
          }
          className='mt-4 ion-text-capitalize'
          onClick={() => {
            void ZSetDisplayNamePassword();
          }}
          testingselector={
            CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
          }>
          Continue
        </ZIonButton>
      </div>
    </>
  );
};

export default ZaionsSignUpForm;
