/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { Formik, useFormikContext } from 'formik';
import {
  eyeOffOutline,
  eyeOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonNote,
  ZIonRouterLink,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import Z403View from '@/components/Errors/403';
import ZCountdown from '@/components/CustomComponents/ZCountDown';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ZCustomError, reportCustomError } from '@/utils/customErrorType';
import {
  API_URL_ENUM,
  CONTAINS,
  VALIDATION_RULE,
  extractInnerDataOptionsEnum,
  ZSetPasswordTabEnum
} from '@/utils/enums';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import {
  STORAGE,
  checkIfContains,
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  validateFields,
  zStringify
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { errorCodes } from '@/utils/constants/apiConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type AuthTokenResponseType,
  type UserAccountType
} from '@/types/UserAccount/index.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductFavicon } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZSetPasswordPage: React.FC = () => {
  const [compState, setCompState] = useState<{
    email?: string;
    inviteToken?: string;
    canSetPassword?: boolean;
    message?: string;
    isProcessing: boolean;
    errorCode?: number;
    tab: ZSetPasswordTabEnum;
    OTPCodeValidTill?: string;
    resendOTPValidCheck: boolean;
  }>({
    isProcessing: true,
    tab: ZSetPasswordTabEnum.sendOptTab,
    resendOTPValidCheck: false
  });
  const { isMdScale, isSmScale } = useZMediaQueryScale();

  useEffect(() => {
    try {
      void (async () => {
        const inviteeData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.INVITEE_USER_DATA
        )) as {
          email: string;
          token: string;
          signupType: string;
          tab: ZSetPasswordTabEnum;
          OTPCodeValidTill: string;
          resendOTPValidCheck: boolean;
        } | null;

        const userData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.USERDATA
        )) as UserAccountType | null;

        const authToken = (await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN)) as
          | string
          | null;
        if (
          userData?.email !== undefined &&
          authToken !== null &&
          authToken?.trim()?.length > 0
        ) {
          setCompState(oldValues => ({
            ...oldValues,
            canSetPassword: false,
            isProcessing: false
          }));
        } else if (
          userData === undefined &&
          authToken === undefined &&
          inviteeData !== null
        ) {
          setCompState(oldValues => ({
            ...oldValues,
            canSetPassword: true,
            isProcessing: false,
            email: inviteeData?.email,
            inviteToken: inviteeData?.token,
            OTPCodeValidTill: inviteeData?.OTPCodeValidTill,
            tab: inviteeData?.tab,
            resendOTPValidCheck: inviteeData?.resendOTPValidCheck
          }));
        } else if (
          userData === undefined &&
          authToken === undefined &&
          inviteeData === undefined
        ) {
          setCompState(oldValues => ({
            ...oldValues,
            errorCode: errorCodes.forbidden,
            canSetPassword: false,
            isProcessing: false
          }));
        }
      })();
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  if (
    compState?.errorCode !== undefined &&
    compState?.errorCode === errorCodes.forbidden
  ) {
    return (
      <ZIonPage pageTitle='set password page'>
        <Z403View />
      </ZIonPage>
    );
  }

  const formikInitialValues = {
    emailAddress: '',
    inviteToken: compState?.inviteToken,
    otp: '',

    isEmailAddressApiError: false,
    emailAddressApiErrorText: '',
    isOTPApiError: false,
    OTPApiErrorText: '',

    password: '',
    username: '',
    canViewPassword: false,
    confirmPassword: '',
    canViewConfirmPassword: false,
    OTPCodeValidTill: compState?.OTPCodeValidTill ?? '',
    resendOTPValidCheck: compState?.resendOTPValidCheck ?? false,

    tab: compState?.tab ?? ZSetPasswordTabEnum.sendOptTab
  };

  return (
    <ZIonPage pageTitle='set password page'>
      <ZIonContent fullscreen>
        <ZaionsSecondaryHeader />

        <ZIonGrid className='h-auto ion-padding-top ion-margin-top'>
          <ZIonRow className='h-auto ion-padding-top ion-margin-top'>
            <ZIonCol className='flex ion-justify-content-center'>
              <div className='w-full mb-5 ion-text-center'>
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
                  Setup Account Password
                </ZIonText>

                {!compState?.isProcessing &&
                compState?.canSetPassword === true ? (
                  <ZIonText className='block'>
                    <ZIonText>
                      Set Account Password to access your account
                    </ZIonText>
                  </ZIonText>
                ) : !compState?.isProcessing &&
                  compState?.canSetPassword === false ? (
                  <ZIonText className='block'>
                    You have already set a password for your account. If
                    you&apos;d like to update it, please use the &apos;
                    <ZIonRouterLink
                      routerLink={ZaionsRoutes.PasswordResetEmailForm}>
                      Forgot Password
                    </ZIonRouterLink>
                    &apos; option.
                  </ZIonText>
                ) : null}
              </div>
            </ZIonCol>
          </ZIonRow>

          {/* From */}
          <ZIonRow className='ion-justify-content-center'>
            <ZIonCol
              className='ion-text-start'
              size='4.2'
              sizeLg='5'
              sizeMd='6.2'
              sizeSm='8.2'
              sizeXs='11.5'>
              <Formik
                // Initial Values of sign up form fields
                initialValues={formikInitialValues}
                enableReinitialize={true}
                // Validations of sign up form fields
                validate={values => {
                  try {
                    const errors: {
                      emailAddress?: string;
                      password?: string;
                      confirmPassword?: string;
                    } = {};

                    validateFields(
                      [
                        'emailAddress',
                        'password',
                        'confirmPassword',
                        'username'
                      ],
                      values,
                      errors,
                      [
                        VALIDATION_RULE.email,
                        VALIDATION_RULE.password,
                        VALIDATION_RULE.confirm_password,
                        VALIDATION_RULE.string
                      ]
                    );

                    // checking the confirm password is === password ? validated : setting an error + invalidate
                    if (values.confirmPassword !== values.password) {
                      errors.confirmPassword =
                        MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
                    }

                    return errors;
                  } catch (error) {
                    console.error({
                      errorPlacement:
                        'From components - InPageComponents - ZaionsLoginPage - ZaionsSignUpForm Formik validate Catch',
                      error
                    });
                  }
                }}
                // Submit function of formik
                onSubmit={async () => {
                  // await FormikSubmissionHandler(values, resetForm, setErrors);
                }}>
                {({ values, errors }) => {
                  return (
                    <>
                      {!compState?.isProcessing &&
                      compState?.canSetPassword === true ? (
                        values.tab === ZSetPasswordTabEnum.sendOptTab ? (
                          <ZSendOtpTab />
                        ) : values.tab === ZSetPasswordTabEnum.confirmOptTab ? (
                          <ZConfirmOptTab />
                        ) : values.tab ===
                          ZSetPasswordTabEnum.newPasswordTab ? (
                          <ZNewPasswordTab />
                        ) : null
                      ) : !compState?.isProcessing &&
                        compState?.canSetPassword === false ? (
                        <div className='mt-2'>
                          {/* Send OTP Button */}
                          <ZIonButton
                            expand='block'
                            className='mt-4 ion-text-capitalize'
                            routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}
                            testingselector={
                              CONSTANTS.testingSelectors.setPasswordPage
                                .gotoWSBtn
                            }>
                            Go to workspaces
                          </ZIonButton>
                        </div>
                      ) : null}
                    </>
                  );
                }}
              </Formik>
            </ZIonCol>
          </ZIonRow>
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
    _url: API_URL_ENUM.send_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: 'Sending OTP...'
  });

  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const ZSendOTPHandler = async (): Promise<void> => {
    try {
      if (values?.emailAddress?.trim()?.length > 0) {
        const _stringifyData = zStringify({
          email: values.emailAddress,
          inviteToken: values.inviteToken
        });

        const _response = await zSendOtpAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
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

            await STORAGE.SET(LOCALSTORAGE_KEYS.INVITEE_USER_DATA, userData);

            if (values.isEmailAddressApiError) {
              void setFieldValue('emailAddressApiErrorText', '', false);
              void setFieldValue('isEmailAddressApiError', false, false);
            }

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

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void setFieldValue('emailAddressApiErrorText', _apiErrors[0], false);
          void setFieldValue('isEmailAddressApiError', true, false);
        }

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void presentZIonErrorAlert({
            message: _apiErrors[0]
          });
        }
      }
      reportCustomError(error);
    }
  };

  return (
    <>
      <div className='flex w-full ion-align-items-center ion-justify-content-end'>
        <ZIonIcon
          icon={informationCircleOutline}
          color='warning'
          className='w-6 h-6 cursor-pointer'
          id='z-set-password-email-info-tt'
        />

        <ZRTooltip
          anchorSelect='#z-set-password-email-info-tt'
          place='top'
          variant='info'>
          <ZIonText>
            For your security, we want to ensure that it&apos;s <br /> really
            you joining the workspace. By re-entering <br /> your email, you
            confirm that the invitation was sent to the <br /> right person.
            It&apos;s one more step towards keeping your <br /> information and
            our community safe.
          </ZIonText>
        </ZRTooltip>
      </div>
      {/* Email Address Field */}
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
            ? errors?.emailAddress !== undefined &&
              errors?.emailAddress?.trim()?.length > 0
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
            (errors?.emailAddress?.trim()?.length === 0 ||
              errors.emailAddress === undefined)
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
  const { handleChange, handleBlur, setFieldValue, values, touched } =
    useFormikContext<{
      emailAddress: string;
      otp: string;
      tab: ZSetPasswordTabEnum;
      OTPCodeValidTill: string;
      resendOTPValidCheck: boolean;

      isEmailAddressApiError: boolean;
      emailAddressApiErrorText: string;
      isOTPApiError: boolean;
      OTPApiErrorText: string;
      inviteToken: string;
    }>();

  // API
  const { mutateAsync: zConfirmOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.confirm_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: 'Confirming OTP...'
  });

  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const { mutateAsync: zResendOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.resend_user_otp,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: MESSAGES.OTP.RESENDING
  });

  const ZResendOTPHandler = async (): Promise<void> => {
    try {
      const inviteeData = (await STORAGE.GET(
        LOCALSTORAGE_KEYS.INVITEE_USER_DATA
      )) as {
        email: string;
        token: string;
        signupType: string;
        tab: ZSetPasswordTabEnum;
        OTPCodeValidTill: string;
        resendOTPValidCheck: boolean;
      } | null;

      if (
        inviteeData?.email !== undefined &&
        inviteeData?.email?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: inviteeData?.email
        });

        const _response = await zResendOtpAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{
            success: boolean;
            OTPCodeValidTill: string;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== undefined && _data?.success) {
            const userData = {
              email: inviteeData?.email,
              tab: ZSetPasswordTabEnum.confirmOptTab,
              OTPCodeValidTill: _data?.OTPCodeValidTill,
              resendOTPValidCheck: false
            };

            await STORAGE.SET(LOCALSTORAGE_KEYS.INVITEE_USER_DATA, userData);

            if (values.isEmailAddressApiError) {
              void setFieldValue('emailAddressApiErrorText', '', false);
              void setFieldValue('isEmailAddressApiError', false, false);
            }

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

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void presentZIonErrorAlert({
            message: _apiErrors[0]
          });
        }
      }
      reportCustomError(error);
    }
  };

  const ZConfirmOTPHandler = async (): Promise<void> => {
    try {
      const inviteeData = (await STORAGE.GET(
        LOCALSTORAGE_KEYS.INVITEE_USER_DATA
      )) as {
        email: string;
        token: string;
        signupType: string;
        tab: ZSetPasswordTabEnum;
        OTPCodeValidTill: string;
        resendOTPValidCheck: boolean;
      } | null;

      if (
        inviteeData?.email !== undefined &&
        inviteeData?.email?.trim()?.length > 0
      ) {
        const _stringifyData = zStringify({
          email: inviteeData?.email,
          otp: values.otp,
          inviteToken: values.inviteToken
        });

        const _response = await zConfirmOtpAsyncMutate({
          requestData: _stringifyData,
          itemIds: [],
          urlDynamicParts: []
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{
            success: boolean;
            OTPCodeValidTill: string;
          }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

          if (_data !== undefined && _data?.success) {
            const userData = {
              email: inviteeData?.email,
              tab: ZSetPasswordTabEnum.newPasswordTab
            };

            await STORAGE.SET(LOCALSTORAGE_KEYS.INVITEE_USER_DATA, userData);

            if (values?.isOTPApiError) {
              void setFieldValue('OTPApiErrorText', '', false);
              void setFieldValue('isOTPApiError', false, false);
            }

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

        if (_apiErrorCode === ZErrorCodeEnum.badRequest) {
          void presentZIonErrorAlert({
            message: _apiErrors[0]
          });
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
            'ion-touched': touched?.otp === true,
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
                  LOCALSTORAGE_KEYS.INVITEE_USER_DATA,
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

      <div
        className={classNames({
          'w-full': true,
          'cursor-not-allowed': !values.resendOTPValidCheck
        })}>
        <ZIonButton
          expand='block'
          fill='outline'
          className='mt-4 ion-text-capitalize'
          onClick={() => {
            void ZResendOTPHandler();
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
    username: string;
    canViewPassword: boolean;
    confirmPassword: string;
    canViewConfirmPassword: boolean;
  }>();

  const { presentZIonErrorAlert } = useZIonErrorAlert();

  // API
  const { mutateAsync: zSetPasswordAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.set_password,
    _showAlertOnError: false,
    authenticated: false,
    _loaderMessage: 'Setting password...'
  });

  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

  const { zNavigatePushRoute } = useZNavigate();

  const ZSetPassword = async (): Promise<void> => {
    try {
      const inviteeData = (await STORAGE.GET(
        LOCALSTORAGE_KEYS.INVITEE_USER_DATA
      )) as {
        email: string;
        token: string;
        signupType: string;
        tab: ZSetPasswordTabEnum;
        OTPCodeValidTill: string;
        resendOTPValidCheck: boolean;
      } | null;

      if (values?.password?.trim()?.length > 0) {
        const _stringifyData = zStringify({
          email: inviteeData?.email,
          username: values.username,
          password: values.password,
          password_confirmation: values.confirmPassword,
          inviteToken: values.inviteToken
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
            await STORAGE.REMOVE(LOCALSTORAGE_KEYS.INVITEE_USER_DATA);

            // getting user data.
            const userData = getUserDataObjectForm(_data.user);

            // Storing user token at userAccountAuthToken State.
            const userToken = {
              token: _data?.token?.plainTextToken
            };

            // Set user data && user token to localstorage.
            if (userData !== undefined && userToken.token !== undefined) {
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
      <ZIonInput
        name='username'
        label='username*'
        labelPlacement='floating'
        onIonChange={handleChange}
        onIonBlur={handleBlur}
        value={values.username}
        errorText={touched?.username === true ? errors.username : undefined}
        type='text'
        clearOnEdit={false}
        testingselector={CONSTANTS.testingSelectors.signupPage.passwordInput}
        className={classNames({
          'ion-touched': touched?.username === true,
          'ion-invalid': touched?.username === true && errors.username,
          'ion-touched ion-valid':
            touched?.username === true &&
            (errors?.username?.trim()?.length === 0 ||
              errors?.username !== undefined)
        })}
      />

      {/* Password Field */}
      <div className='flex mt-4 mb-1 ion-align-items-start'>
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
              (errors?.password?.trim()?.length === 0 ||
                errors?.password !== undefined)
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
              (errors?.confirmPassword?.trim()?.length === 0 ||
                errors?.confirmPassword !== undefined)
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

export default ZSetPasswordPage;
