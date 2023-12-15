// Core Imports
import React, { useEffect, useState } from 'react';

// Package Imports
import { Formik, useFormikContext } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonImg,
  ZIonText,
  ZIonInput,
  ZIonButton,
  ZIonNote,
  ZIonIcon
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

// Global Constants
import {
  API_URL_ENUM,
  CONTAINS,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE,
  ZSetPasswordTabEnum
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import {
  checkIfContains,
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  STORAGE,
  validateFields,
  zStringify
} from '@/utils/helpers';
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';

// Images
import { ProductFavicon } from '@/assets/images';
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import { AxiosError } from 'axios';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import {
  type AuthTokenResponseType,
  type UserAccountType
} from '@/types/UserAccount/index.type';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useSetRecoilState } from 'recoil';
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import dayjs from 'dayjs';

// Style

const ZaionsPasswordResetConfirm: React.FC = () => {
  const [compState, setCompState] = useState<{
    email?: string;
    tab?: ZSetPasswordTabEnum;
    OTPCodeValidTill?: string;
    resendOTPValidCheck?: boolean;
  }>();

  useEffect(() => {
    try {
      void (async () => {
        const userData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA
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
    // emailAddress: compState?.email ?? '',
    emailAddress: compState?.email ?? '',
    password: '',
    otp: '',
    confirm_password: '',

    isEmailAddressApiError: false,
    emailAddressApiErrorText: '',
    isOTPApiError: false,
    OTPApiErrorText: '',
    OTPCodeValidTill: compState?.OTPCodeValidTill ?? '',
    resendOTPValidCheck: compState?.resendOTPValidCheck ?? false,

    // tab: compState?.tab || ZSetPasswordTabEnum.sendOptTab,
    tab: compState?.tab != null || ZSetPasswordTabEnum.sendOptTab
  };

  return (
    <ZIonPage>
      <ZIonContent fullscreen>
        <ZaionsSecondaryHeader />
        <ZIonGrid className=''>
          <Formik
            initialValues={formikInitialValues}
            // Validations of sign up form fields
            validate={values => {
              try {
                // Error object
                const errors: {
                  emailAddress?: string;
                  password?: string;
                  confirm_password?: string;
                } = {};

                // validating the fields and checking for error and error ? setting the errors : validated
                validateFields(
                  ['emailAddress', 'password', 'confirm_password'],
                  values,
                  errors,
                  [
                    VALIDATION_RULE.email,
                    VALIDATION_RULE.password,
                    VALIDATION_RULE.confirm_password
                  ]
                );

                // checking the confirm password is === password ? validated : setting an error + invalidate
                if (values.confirm_password !== values.password) {
                  errors.confirm_password =
                    MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
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
            onSubmit={() => {}}>
            {({ values }) => {
              return (
                <>
                  <ZIonRow>
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
                          className='w-[6rem] h-[6rem] mx-auto mb-6'
                        />

                        <ZIonText className='block mb-3 text-2xl font-bold'>
                          Forget your password
                        </ZIonText>
                        <ZIonText className='block'>
                          {values.tab === ZSetPasswordTabEnum.sendOptTab
                            ? 'It happens to the best of us. Enter your email to request a OTP (one-time-password).'
                            : values.tab === ZSetPasswordTabEnum.confirmOptTab
                            ? 'Please entry OTP (one-time-password) that has sent to your email.'
                            : values.tab === ZSetPasswordTabEnum.newPasswordTab
                            ? 'Entry your new password.'
                            : null}
                        </ZIonText>
                      </div>
                    </ZIonCol>
                  </ZIonRow>

                  {/*  */}
                  <ZIonRow className='mt-6 ion-justify-content-center ion-align-items-top'>
                    <ZIonCol
                      className='ion-text-start'
                      size='4.2'
                      sizeLg='5'
                      sizeMd='6.2'
                      sizeSm='8.2'
                      sizeXs='11.5'>
                      {values.tab === ZSetPasswordTabEnum.sendOptTab ? (
                        <ZSendOtpTab />
                      ) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
                        <ZConfirmOptTab />
                      ) : values.tab === ZSetPasswordTabEnum.newPasswordTab ? (
                        <ZNewPasswordTab />
                      ) : null}
                    </ZIonCol>
                  </ZIonRow>
                </>
              );
            }}
          </Formik>
        </ZIonGrid>
      </ZIonContent>
    </ZIonPage>
  );
};

const ZSendOtpTab: React.FC = () => {
  const { handleChange, handleBlur, setFieldValue, values, touched, errors } =
    useFormikContext<{
      emailAddress: string;
      tab: ZSetPasswordTabEnum;
      inviteToken: string;

      isEmailAddressApiError: boolean;
      emailAddressApiErrorText: string;
      isOTPApiError: boolean;
      OTPErrorText: string;
    }>();

  // API.
  const { mutateAsync: zSendOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.send_forget_password_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: MESSAGES.OTP.SENDING
  });

  const ZSendOTPHandler = async (): Promise<void> => {
    try {
      if (
        values?.emailAddress?.length > 0 &&
        values?.emailAddress?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: values.emailAddress
        });

        const _response = await zSendOtpAsyncMutate({
          itemIds: [],
          urlDynamicParts: [],
          requestData: _stringifyData
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{
            success: boolean;
            OTPCodeValidTill?: string;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== undefined && _data?.success) {
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

            await STORAGE.SET(
              LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA,
              userData
            );

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
          void setFieldValue('emailAddressApiErrorText', _apiErrors[0], false);
          void setFieldValue('isEmailAddressApiError', true, false);
        }
      }
      reportCustomError(error);
    }
  };

  return (
    <>
      <ZIonInput
        name='emailAddress'
        label='Email Address'
        labelPlacement='floating'
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
          touched?.emailAddress === true
            ? errors.emailAddress?.trim() !== ''
              ? errors.emailAddress
              : values.isEmailAddressApiError
              ? values?.emailAddressApiErrorText
              : undefined
            : undefined
        }
        className={classNames({
          'mb-4': true,
          'ion-touched': touched?.emailAddress === true,
          'ion-invalid': values?.isEmailAddressApiError || errors.emailAddress,
          'ion-valid':
            touched?.emailAddress === true &&
            errors?.emailAddress?.trim()?.length === 0 &&
            errors?.emailAddress === undefined
        })}
      />

      {/* Send OTP Button */}
      <ZIonButton
        expand='block'
        disabled={
          errors?.emailAddress !== undefined ||
          values?.emailAddress?.length === 0 ||
          values?.isEmailAddressApiError
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
  const { handleChange, handleBlur, setFieldValue, values, touched } =
    useFormikContext<{
      emailAddress: string;
      otp: string;
      tab: ZSetPasswordTabEnum;

      isEmailAddressApiError: boolean;
      emailAddressApiErrorText: string;
      isOTPApiError: boolean;
      OTPApiErrorText: string;
      inviteToken: string;
      resendOTPValidCheck: boolean;
      OTPCodeValidTill: string;
    }>();

  // API
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
              tab: ZSetPasswordTabEnum.newPasswordTab,
              OTPCodeValidTill: '',
              resendOTPValidCheck: false
            };

            await STORAGE.SET(
              LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA,
              userData
            );

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

            await STORAGE.SET(
              LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA,
              userData
            );

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

  return (
    <>
      {/* OTP Field */}
      <div className='flex ion-align-items-start'>
        <ZIonInput
          name='otp'
          label='OTP'
          labelPlacement='floating'
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
            'ion-invalid': values?.isOTPApiError,
            'ion-valid': touched?.otp === true && !values?.isOTPApiError
          })}
        />

        <ZCountdown
          onTick={() => {
            if (
              dayjs().isAfter(
                dayjs(values?.OTPCodeValidTill).subtract(4, 'minute')
              )
            ) {
              void (async () => {
                const userData = {
                  email: values?.emailAddress,
                  tab: ZSetPasswordTabEnum.confirmOptTab,
                  OTPCodeValidTill: values?.OTPCodeValidTill,
                  resendOTPValidCheck: true
                };

                await STORAGE.SET(
                  LOCALSTORAGE_KEYS.FORGET_PASSWORD_USER_DATA,
                  userData
                );
              })();
              void setFieldValue('resendOTPValidCheck', true, false);
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

      {/* Resend OTP Button */}
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
    canViewPassword: boolean;
    confirmPassword: string;
    canViewConfirmPassword: boolean;
  }>();

  const { mutateAsync: zSetPasswordAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.set_username_password,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: 'Setting password...'
  });

  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

  const { zNavigatePushRoute } = useZNavigate();

  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const ZSetPassword = async (): Promise<void> => {
    try {
      if (
        values?.password?.length > 0 &&
        values?.password?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: values.emailAddress,
          password: values.password,
          password_confirmation: values.confirmPassword
        });

        const _response = await zSetPasswordAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{
            user: UserAccountType;
            token: AuthTokenResponseType;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          // Checking if the __data is available & if there is a user object in __data which have the id.
          if (_data !== undefined && _data?.user?.id !== null) {
            // getting user data.
            const userData = getUserDataObjectForm(_data?.user);

            // Storing user token at userAccountAuthToken State.
            const userToken = {
              token: _data?.token?.plainTextToken
            };

            await STORAGE.REMOVE(LOCALSTORAGE_KEYS.SIGNUP_USER_DATA);

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

              // If success then show the success notification.
              showSuccessNotification('Successfully reset password.');

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
            ['password', 'confirmPassword'],
            ['password', 'password_confirmation'],
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

  return (
    <>
      {/* Password Field */}
      <div className='flex mb-1 ion-align-items-start'>
        <ZIonInput
          name='password'
          label='Password*'
          labelPlacement='floating'
          onIonChange={e => {
            handleChange(e);
            if ((e?.target?.value as string)?.length > 0) {
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
            'ion-touched': touched?.password === true,
            'ion-invalid': touched?.password === true && errors.password,
            'ion-valid':
              touched?.password === true &&
              (errors.password?.trim()?.length === 0 ||
                errors.password === undefined)
          })}
        />

        <ZIonButton
          slot='end'
          fill='clear'
          size='large'
          className='ion-no-padding ion-no-margin ms-3 w-max'
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
      </div>

      <ZIonNote className='w-full'>
        <ZIonRow>
          <ZIonCol size='6'>
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
          <ZIonCol size='6'>
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
      <div className='flex mt-4 ion-align-items-start'>
        <ZIonInput
          label='Confirm Password*'
          labelPlacement='floating'
          onIonChange={handleChange}
          onIonBlur={handleBlur}
          value={values.confirmPassword}
          name='confirmPassword'
          clearOnEdit={false}
          type={values?.canViewConfirmPassword ? 'text' : 'password'}
          testingselector={
            CONSTANTS.testingSelectors.signupPage.confirmPasswordInput
          }
          errorText={
            touched.confirmPassword === true
              ? errors.confirmPassword
              : undefined
          }
          className={classNames({
            'ion-touched': touched?.confirmPassword === true,
            'ion-invalid':
              touched?.confirmPassword === true && errors.confirmPassword,
            'ion-valid':
              touched?.confirmPassword === true &&
              (errors.confirmPassword?.trim()?.length === 0 ||
                errors?.confirmPassword === undefined)
          })}
        />
        <ZIonButton
          fill='clear'
          size='large'
          className='ion-no-padding ion-no-margin ms-3 w-max'
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
      </div>

      {/* Confirm OTP Button */}
      <ZIonButton
        expand='block'
        disabled={
          (errors?.password?.trim()?.length !== undefined &&
            errors?.password?.trim()?.length > 0) ||
          (errors?.confirmPassword?.trim()?.length !== undefined &&
            errors?.confirmPassword?.trim()?.length > 0)
        }
        className='mt-4 ion-text-capitalize'
        onClick={() => {
          void ZSetPassword();
        }}
        testingselector={
          CONSTANTS.testingSelectors.setPasswordPage.confirmOtpBtn
        }>
        Continue
      </ZIonButton>
    </>
  );
};

export default ZaionsPasswordResetConfirm;
