/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Form, Formik, useFormikContext } from 'formik';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZEmailAddressesTable from '@/components/InPageComponents/ZaionsTable/UserSettings/emailAddressesTable';
import ZCPhoneNumberInput from '@/components/CustomComponents/ZPhoneNumberInput';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import ZCan from '@/components/Can';
import AddEmailModal from '@/components/InPageComponents/ZaionsModals/EmailModal';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import ZInputLengthConstant from '@/utils/constants/InputLenghtConstant';
import { reportCustomError } from '@/utils/customErrorType';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  STORAGE,
  validateFields,
  zStringify
} from '@/utils/helpers';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type UserAccountType } from '@/types/UserAccount/index.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import {
  type FormikSetErrorsType,
  type FormikSetFieldTouchedEventType,
  type FormikSetFieldValueEventVoidType
} from '@/types/ZaionsFormik.type';
import dayjs from 'dayjs';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

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

// Change password tab enum
enum EChangePasswordTab {
  currentPasswordTab = 'currentPasswordTab',
  otpTab = 'otpTab',
  newPasswordTab = 'newPasswordTab'
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProfileSettingsSettings: React.FC = () => {
  // #region component useState
  const [compState, setCompState] = useState<{
    profileFile?: File;
    profilePicFormattedObj?: {
      file?: object;
      fileName?: object;
      filePath?: string;
      fileUrl?: string;
    };
    profilePicFrontendUrl?: string;
  }>();
  // #endregion

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  // #region recoil states.
  // getting current user data from ZaionsUserAccountRStateAtom recoil state.
  const [userAccountStateAtom, setUserAccountStateAtom] = useRecoilState(
    ZaionsUserAccountRStateAtom
  );
  // #endregion

  // #region Modal & popovers.
  const { presentZIonModal: presentEmailModal } = useZIonModal(AddEmailModal);
  // #endregion

  // #region APIs
  const { mutateAsync: ZUpdateUserAccountInfoAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.updateUserAccountInfo
    });

  // Single file upload.
  const { mutateAsync: uploadSingleFile } = useZRQCreateRequest({
    _url: API_URL_ENUM.uploadSingleFile,
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });
  // #endregion

  // #region Functions.

  const updateProfileDetailsHandler = async (_value: string): Promise<void> => {
    try {
      const _response = await ZUpdateUserAccountInfoAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _value
      });

      if (_response !== undefined) {
        const _data = extractInnerData<UserAccountType>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (
          _data !== undefined &&
          _data?.id !== null &&
          _data?.email !== null
        ) {
          // getting user data.
          const userData = getUserDataObjectForm(_data);

          // update User token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);

          // Storing user data in userAccount Recoil State.
          setUserAccountStateAtom(oldValues => ({
            ...oldValues,
            ...userData
          }));
        }
      }
    } catch (error) {
      reportCustomError(error);
      // if (error instanceof AxiosError) {
      // }
    }
  };
  // #endregion

  const formikInitialValues = {
    name: userAccountStateAtom?.name ?? '',
    username: userAccountStateAtom?.username ?? '',
    userProfileFile: {
      filePath: userAccountStateAtom?.profileImage?.filePath ?? '',
      fileUrl:
        userAccountStateAtom?.profileImage?.fileUrl ??
        userAccountStateAtom?.avatar ??
        ''
    },
    phoneNumber: userAccountStateAtom?.phoneNumber ?? '',
    enableMakeEmailPrimary: true
  };

  const ZUserAvatarButtonStyle = {
    cursor: 'auto !important',
    '--border-radius': '4px'
  };

  const _userAvatarUi = {
    name: userAccountStateAtom?.username
  };

  return (
    <ZIonRow
      className={classNames({
        'ion-align-items-center': true,
        'ion-padding': isLgScale,
        'p-2': !isMdScale
      })}>
      <ZIonCol
        sizeXl='12'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className={classNames({
          'mb-2': !isSmScale
        })}>
        <ZIonTitle
          className={classNames({
            'block font-bold ion-no-padding': true,
            'text-2xl': isLgScale,
            'text-xl': !isLgScale,
            'ion-text-center': !isSmScale
          })}>
          Profile settings
        </ZIonTitle>

        <ZIonText
          className={classNames({
            'block mt-2 font-normal': true,
            'text-md': isLgScale,
            'text-sm': !isLgScale,
            'ion-text-center': !isSmScale
          })}>
          Your profile, your rules! Customize settings to showcase your
          personality and professional identity.
        </ZIonText>
      </ZIonCol>

      <ZIonCol
        sizeXl='12'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-4'>
        <Formik
          initialValues={formikInitialValues}
          enableReinitialize={true}
          validate={values => {
            const errors = {};

            // validating the fields and checking for error and error ? setting the errors : validated
            validateFields(['username', 'emailAddress'], values, errors, [
              VALIDATION_RULE.username,
              VALIDATION_RULE.email
            ]);

            return errors;
          }}
          onSubmit={() => {}}>
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched
          }) => {
            const updateProfileDetailBtnDisable =
              userAccountStateAtom?.name?.trim() === values?.name?.trim() &&
              userAccountStateAtom?.username?.trim() ===
                values?.username?.trim() &&
              userAccountStateAtom?.phoneNumber?.trim() ===
                values?.phoneNumber?.trim() &&
              userAccountStateAtom?.profileImage?.fileUrl?.trim() ===
                values?.userProfileFile?.fileUrl?.trim();

            return (
              <Form className='mb-2'>
                <ZIonTitle
                  className={classNames({
                    'block font-semibold ion-no-padding mb-4': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  Preferences
                </ZIonTitle>

                {/* display name */}
                <ZIonInput
                  name='name'
                  minHeight='2.3rem'
                  label='Display name'
                  labelPlacement='stacked'
                  value={values.name}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .usernameInput
                  }
                />

                {/* username */}
                <ZIonInput
                  name='username'
                  minHeight='2.3rem'
                  label='Username'
                  labelPlacement='stacked'
                  value={values.username}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  errorText={
                    touched?.username === true ? errors.username : undefined
                  }
                  className={classNames({
                    'ion-touched': touched?.username === true,
                    'ion-invalid':
                      touched?.username === true && errors.username,
                    'ion-valid':
                      touched?.username === true &&
                      (errors?.username?.trim()?.length === 0 ||
                        errors?.username === undefined)
                  })}
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .usernameInput
                  }
                />

                {/* Profile */}
                <div className='flex w-full gap-2 mt-2 mb-4 ion-align-items-center'>
                  <ZUserAvatarButton
                    className='border rounded-sm w-[3rem!important] h-[3rem!important]'
                    userAvatar={
                      compState?.profilePicFrontendUrl ??
                      compState?.profilePicFormattedObj?.fileUrl ??
                      userAccountStateAtom?.profileImage?.fileUrl
                    }
                    style={ZUserAvatarButtonStyle}
                    userAvatarUi={_userAvatarUi}
                  />
                  {/* <ZUploadInput
                    setFieldValueFn={setFieldValue}
                    name='userProfileFile'
                    value={values.userProfileFile}
                  /> */}
                  <input
                    type='file'
                    name='userProfileFile'
                    multiple={false}
                    className={classNames({
                      'z-upload-input w-full': true
                    })}
                    onChange={event => {
                      const zFile = event?.target?.files?.[0];

                      if (zFile !== undefined) {
                        setCompState(oldValues => ({
                          ...oldValues,
                          profileFile: zFile
                        }));

                        const reader = new FileReader();

                        reader.onload = ({ target }) => {
                          setCompState(oldValues => ({
                            ...oldValues,
                            profilePicFrontendUrl: target?.result as string
                          }));
                        };

                        reader.readAsDataURL(zFile);
                      }
                    }}
                  />
                </div>

                {/* Phone-number */}
                <ZCPhoneNumberInput
                  placeholder='Phone number'
                  value={String(values?.phoneNumber)}
                  touched={touched?.phoneNumber}
                  className={classNames({
                    'w-full mt-2 mb-3': true
                  })}
                  errorText={
                    touched?.phoneNumber === true
                      ? errors?.phoneNumber
                      : undefined
                  }
                  onChange={_value => {
                    void setFieldValue('phoneNumber', _value, true);
                  }}
                  onBlur={() => {
                    void setFieldTouched('phoneNumber', true, true);
                  }}
                  testingselector={
                    CONSTANTS.testingSelectors.shortLink.formPage
                      .ShortUrlOptionFields.numberInput
                  }
                />

                {/* Update profile details button */}
                <div
                  className={classNames({
                    'w-max': isSmScale,
                    'w-full': !isSmScale,
                    'cursor-not-allowed':
                      (errors?.username?.trim()?.length ?? 0) > 0 ||
                      updateProfileDetailBtnDisable
                  })}>
                  <ZIonButton
                    disabled={
                      (errors?.username?.trim()?.length ?? 0) > 0 ||
                      updateProfileDetailBtnDisable
                    }
                    type='submit'
                    expand={isSmScale ? undefined : 'block'}
                    onClick={() => {
                      void (async () => {
                        if (
                          errors?.username === undefined &&
                          !updateProfileDetailBtnDisable
                        ) {
                          let _zStringifyData = zStringify({
                            name: values?.name,
                            username: values?.username,
                            phoneNumber: values?.phoneNumber,
                            profileImage:
                              compState?.profilePicFormattedObj !== undefined
                                ? zStringify(compState?.profilePicFormattedObj)
                                : userAccountStateAtom?.profileImage !==
                                  undefined
                                ? zStringify(userAccountStateAtom?.profileImage)
                                : null,
                            avatar:
                              compState?.profilePicFormattedObj?.fileUrl ??
                              userAccountStateAtom?.profileImage?.fileUrl
                          });

                          //
                          if (
                            compState?.profileFile !== undefined &&
                            compState?.profileFile !== null
                          ) {
                            // await uploadFileToBackend();
                            const formData = new FormData();
                            formData.append('file', compState?.profileFile);
                            const result = await uploadSingleFile(formData);

                            if (result !== undefined || result !== null) {
                              const _data = (
                                result as {
                                  data: {
                                    file: object;
                                    fileName: object;
                                    filePath: string;
                                    fileUrl: string;
                                  };
                                }
                              )?.data;

                              if (_data !== undefined) {
                                _zStringifyData = zStringify({
                                  name: values?.name,
                                  username: values?.username,
                                  phoneNumber: values?.phoneNumber,
                                  profileImage: zStringify({ ..._data }),
                                  avatar: _data.fileUrl
                                });

                                // showing success message.
                                showSuccessNotification(
                                  MESSAGES.GENERAL.FILE.UPLOADED
                                );
                              }
                            }
                          }

                          void updateProfileDetailsHandler(_zStringifyData);
                        }
                      })();
                    }}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .updateProfileBtn
                    }>
                    Update profile details
                  </ZIonButton>
                </div>

                {/* Email addresses */}
                <ZIonTitle
                  className={classNames({
                    'block font-semibold ion-no-padding mt-4 pt-2': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  Email addresses
                </ZIonTitle>
                <ZIonText
                  className={classNames({
                    'block mt-1 font-normal': true,
                    'text-md': isLgScale,
                    'text-sm': !isLgScale,
                    'mb-4': isSmScale,
                    'ion-text-center mb-0': !isSmScale
                  })}>
                  Select or add a new email address to receive notifications.
                  Only verified emails can be designated as the primary email
                  address, which is used to log in.
                </ZIonText>

                {/* Emails table */}
                {/* <ZEmailAddressesTable /> */}
                <ZCan havePermissions={[permissionsEnum.view_email]}>
                  <Suspense
                    fallback={
                      <ZIonRow className='h-full'>
                        <ZFallbackIonSpinner2 />
                      </ZIonRow>
                    }>
                    <ZEmailAddressesTable
                      enableMakeEmailPrimary={values.enableMakeEmailPrimary}
                    />
                  </Suspense>
                </ZCan>

                <div
                  className={classNames({
                    'mt-4': isSmScale,
                    'mt-2': !isSmScale,
                    'flex ion-align-items-center': true,
                    'gap-2': isSmScale,
                    'flex-col': !isSmScale
                  })}>
                  <div
                    className={classNames({
                      'w-max': isSmScale,
                      'w-full': !isSmScale,
                      'cursor-not-allowed': false
                    })}>
                    <ZIonButton
                      fill='outline'
                      disabled={false}
                      expand={isSmScale ? undefined : 'block'}
                      onClick={() => {
                        presentEmailModal({
                          _cssClass: 'add-email-modal-size'
                        });
                      }}
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .profileSettingsTab.addNewEmailBtn
                      }>
                      Add new email
                    </ZIonButton>
                  </div>
                </div>

                {/* Security & authentication */}
                <ZChangePassword />

                {/*  2-Factor authentication */}
                <ZIonTitle
                  className={classNames({
                    'block font-semibold ion-no-padding mt-4 pt-2': true,
                    'text-lg': isLgScale,
                    'text-sm': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  2-Factor authentication
                </ZIonTitle>
                <ZCPhoneNumberInput
                  onChange={handleChange}
                  className='mt-3'
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .twoAuthenticationPhoneInput
                  }
                />
                <div
                  className={classNames({
                    'flex ion-align-items-center': true,
                    'gap-2': isSmScale,
                    'flex-col': !isSmScale
                  })}>
                  <div
                    className={classNames({
                      'w-max': isSmScale,
                      'w-full': !isSmScale,
                      'cursor-not-allowed': true
                    })}>
                    <ZIonButton
                      className='mt-4'
                      expand={isSmScale ? undefined : 'block'}
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .profileSettingsTab.twoAuthenticationBtn
                      }>
                      Send verification code
                    </ZIonButton>
                  </div>
                </div>

                {/* Access history */}
                <ZIonTitle
                  color='medium'
                  className={classNames({
                    'block font-semibold ion-no-padding mt-4 pt-2': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  Access history
                </ZIonTitle>
                <ZIonText
                  className={classNames({
                    'block mt-1 mb-3 font-normal': true,
                    'text-md': isLgScale,
                    'text-sm': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  You&apos;re viewing recent activity on your account. Logging
                  out will apply to all devices currently connected to{' '}
                  {PRODUCT_NAME}.
                </ZIonText>
                <div
                  className={classNames({
                    'flex ion-align-items-center': true,
                    'gap-2': isSmScale,
                    'flex-col': !isSmScale
                  })}>
                  <div
                    className={classNames({
                      'w-max': isSmScale,
                      'w-full': !isSmScale,
                      'cursor-not-allowed': true
                    })}>
                    <ZIonButton
                      color='tertiary'
                      className='mt-1'
                      expand={isSmScale ? undefined : 'block'}
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .profileSettingsTab.logoutAllSession
                      }>
                      Logout of all sessions
                    </ZIonButton>
                  </div>
                </div>

                <ZIonList
                  className='mt-4'
                  lines='full'>
                  {[1, 2, 3].map((el, index) => {
                    return (
                      <ZIonItem key={index}>
                        <ZIonLabel
                          slot='start'
                          className='ion-text-wrap'>
                          <ZIonText
                            className={classNames({
                              'block font-semibold': true,
                              'text-md': isLgScale,
                              'text-sm': !isLgScale
                              // 'ion-text-center': !isSmScale
                            })}>
                            Action go here.
                          </ZIonText>
                          <ZIonText
                            className={classNames({
                              block: true,
                              'text-md': isLgScale,
                              'text-sm': !isLgScale
                              // 'ion-text-center': !isSmScale
                            })}>
                            from 39.49.28.229 (PTCL) (Pakistan, PB, Sialkot)
                          </ZIonText>
                        </ZIonLabel>

                        <ZIonLabel
                          slot='end'
                          className='ion-text-wrap'>
                          <ZIonText
                            className={classNames({
                              'block ion-text-end font-semibold': true,
                              'text-md': isLgScale,
                              'text-sm': !isLgScale
                              // 'ion-text-center': !isSmScale
                            })}>
                            September 23, 2023 4:02 PM GMT+5
                          </ZIonText>
                          <ZIonText
                            className={classNames({
                              'block ion-text-end': true,
                              'text-md': isLgScale,
                              'text-sm': !isLgScale
                              // 'ion-text-center': !isSmScale
                            })}>
                            an hour ago
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>
                    );
                  })}
                </ZIonList>
              </Form>
            );
          }}
        </Formik>
      </ZIonCol>
    </ZIonRow>
  );
};

const ZChangePassword: React.FC = () => {
  // #region parent component formik
  const { setFieldValue: parentSetFieldValue } = useFormikContext();
  // #endregion

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();
  // #endregion

  // #region APIS.
  const { mutateAsync: ZUpdatePasswordAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.updatePassword,
    _showAlertOnError: false
  });

  const { mutateAsync: ZValidateCurrentPasswordAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.validateCurrentPassword,
      _showAlertOnError: false,
      _loaderMessage: MESSAGES.USER.CONFIRMED_CURRENT_PASSWORD_API
    });

  const { mutateAsync: ZResendPasswordOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.resendPasswordOtp,
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.USER.RESEND_OTP_API
  });

  const { mutateAsync: ZValidatePasswordOtpAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.validateCurrentPasswordOtp,
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.USER.CONFIRM_OTP_API
  });
  // #endregion

  // #region Functions.
  // validating current password through validateCurrentPassword api.
  const validateCurrentPasswordHandler = async ({
    _data,
    setErrors,
    setFieldValueFn,
    setFieldTouchedFn
  }: {
    _data: string;
    setErrors: FormikSetErrorsType;
    setFieldValueFn: FormikSetFieldValueEventVoidType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }): Promise<void> => {
    try {
      const _response = await ZValidateCurrentPasswordAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (_response !== undefined) {
        const _data = extractInnerData<{
          success: boolean;
          OTPCodeValidTill: string;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data !== undefined && _data?.success) {
          setFieldValueFn('tab', EChangePasswordTab.otpTab, false);

          void parentSetFieldValue('enableMakeEmailPrimary', false, false);

          setFieldValueFn('resendOTPValidCheck', false, false);
          setFieldValueFn('otpCodeValidTill', _data.OTPCodeValidTill, false);
          setFieldTouchedFn('currentPassword', false);
          setFieldValueFn('currentPassword', '', false);
          setErrors({});

          showSuccessNotification(MESSAGES.USER.CONFIRMED_CURRENT_PASSWORD);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (
          _apiErrorCode === ZErrorCodeEnum.serverError ||
          _apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['currentPassword'],
            ['password'],
            _apiErrors as ZGenericObject
          );

          const _passwordErrorMessage = (_errors as { currentPassword: string })
            ?.currentPassword;

          setFieldValueFn('isCurrentPasswordApiError', true, false);
          setFieldValueFn(
            'currentPasswordApiMessage',
            _passwordErrorMessage,
            false
          );

          setErrors(_errors);
        }
      }

      reportCustomError(error);
    }
  };

  const resendPasswordOtpHandler = async ({
    setErrors,
    setFieldValueFn,
    setFieldTouchedFn
  }: {
    setErrors: FormikSetErrorsType;
    setFieldValueFn: FormikSetFieldValueEventVoidType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }): Promise<void> => {
    try {
      const _response = await ZResendPasswordOtpAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: ''
      });

      if (_response !== undefined) {
        const _data = extractInnerData<{
          success: boolean;
          OTPCodeValidTill: string;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data !== undefined && _data?.success) {
          setFieldValueFn('resendOTPValidCheck', false, false);
          void parentSetFieldValue('enableMakeEmailPrimary', false, false);
          setFieldValueFn('otpCodeValidTill', _data.OTPCodeValidTill, false);
          setFieldTouchedFn('currentPassword', false);
          setFieldValueFn('currentPassword', '', false);
          setErrors({});

          showSuccessNotification(MESSAGES.USER.RESEND_OTP);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const validateOtpHandler = async ({
    _data,
    setErrors,
    setFieldValueFn,
    setFieldTouchedFn
  }: {
    _data: string;
    setErrors: FormikSetErrorsType;
    setFieldValueFn: FormikSetFieldValueEventVoidType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }): Promise<void> => {
    try {
      const _response = await ZValidatePasswordOtpAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (_response !== undefined) {
        const _data = extractInnerData<{
          success: boolean;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data !== undefined && _data?.success) {
          setFieldValueFn('tab', EChangePasswordTab.newPasswordTab, false);
          void parentSetFieldValue('enableMakeEmailPrimary', true, false);
          setFieldValueFn('otp', '', false);
          setFieldTouchedFn('otp', false);
          setErrors({});

          showSuccessNotification(MESSAGES.USER.CONFIRMED_PASSWORD_OTP);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (
          _apiErrorCode === ZErrorCodeEnum.serverError ||
          _apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['otp'],
            ['otp'],
            _apiErrors as ZGenericObject
          );

          const _otpErrorMessage = (_errors as { otp: string })?.otp;

          setFieldValueFn('isOTPApiError', true, false);
          setFieldValueFn('OTPApiMessage', _otpErrorMessage, false);

          setErrors(_errors);
        }
      }

      reportCustomError(error);
    }
  };

  const cancelPasswordPossessHandler = ({
    setErrors,
    setFieldValueFn,
    setFieldTouchedFn
  }: {
    setErrors: FormikSetErrorsType;
    setFieldValueFn: FormikSetFieldValueEventVoidType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }): void => {
    try {
      setFieldValueFn('tab', EChangePasswordTab.currentPasswordTab, false);

      void parentSetFieldValue('enableMakeEmailPrimary', true, false);

      setFieldValueFn('otpCodeValidTill', '', false);
      setFieldValueFn('otp', '', false);
      setFieldTouchedFn('currentPassword', false);
      setFieldValueFn('currentPassword', '', false);
      setErrors({});
    } catch (error) {
      reportCustomError(error);
    }
  };

  //
  const updatePasswordHandler = async (
    _data: string,
    setErrors: FormikSetErrorsType,
    setFieldValueFn: FormikSetFieldValueEventVoidType,
    setFieldTouchedFn: FormikSetFieldTouchedEventType
  ): Promise<void> => {
    try {
      const _response = await ZUpdatePasswordAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (_response !== undefined) {
        const _data = extractInnerData<{
          user: UserAccountType;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data?.user?.email !== undefined) {
          setFieldValueFn('tab', EChangePasswordTab.currentPasswordTab, false);
          setFieldValueFn('newPassword', '', false);
          setFieldValueFn('confirmPassword', '', false);

          setFieldTouchedFn('newPassword', false);
          setFieldTouchedFn('confirmPassword', false);

          setErrors({});

          showSuccessNotification(MESSAGES.USER.PASSWORD_CHANGE);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const _apiErrors = _apiErrorObjects?.errors;
        const _apiErrorCode = _apiErrorObjects?.status;

        if (
          _apiErrorCode === ZErrorCodeEnum.serverError ||
          _apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const _errors = formatApiRequestErrorForFormikFormField(
            ['newPassword', 'confirmPassword'],
            ['newPassword', 'newPassword_confirmation'],
            _apiErrors as ZGenericObject
          );
          setErrors(_errors);
        }
      }

      reportCustomError(error);
    }
  };
  // #endregion

  const formikInitialValues = {
    tab: EChangePasswordTab.currentPasswordTab,
    canViewCurrentPassword: false,
    currentPassword: '',
    isCurrentPasswordApiError: false,
    currentPasswordApiMessage: '',

    canViewNewPassword: false,
    newPassword: '',

    canViewConfirmPassword: false,
    confirmPassword: '',

    otp: '',
    otpCodeValidTill: '',
    isOTPApiError: false,
    OTPApiMessage: '',

    resendOTPValidCheck: false
  };

  return (
    <Formik
      initialValues={formikInitialValues}
      validate={values => {
        const errors: {
          confirmPassword?: string;
          currentPassword?: string;
          otp?: string;
        } = {};

        // validating the fields and checking for error and error ? setting the errors : validated
        validateFields(['newPassword', 'confirmPassword'], values, errors, [
          VALIDATION_RULE.password,
          VALIDATION_RULE.confirm_password
        ]);

        // checking the confirm password is === password ? validated : setting an error + invalidate
        if (values.confirmPassword !== values.newPassword) {
          errors.confirmPassword = MESSAGES.GENERAL.FORM.PASSWORD_NOT_MATCH;
        }

        if (
          values.currentPassword?.trim()?.length <
          CONSTANTS.ZPasswordMinCharacter
        ) {
          errors.currentPassword = MESSAGES.PASSWORD.VALIDATION.MIN_LENGTH;
        }

        // otp
        if (values.otp?.trim()?.length > CONSTANTS.ZOtpLength) {
          errors.otp = MESSAGES.OTP.VALIDATION.MAX_LENGTH;
        }

        return errors;
      }}
      onSubmit={() => {}}>
      {({
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        setErrors,
        values,
        errors,
        touched
      }) => {
        const changePasswordValidCheck =
          errors?.newPassword?.trim() === null &&
          errors?.confirmPassword?.trim() === null &&
          values?.newPassword?.trim()?.length > 0 &&
          values?.confirmPassword?.trim()?.length > 0;

        const currentPasswordValidCheck =
          errors?.currentPassword?.trim() === null &&
          values?.currentPassword?.trim()?.length > 0;

        const otpValidCheck =
          errors?.otp?.trim() === null &&
          values?.otp?.trim()?.length === CONSTANTS?.ZOtpLength;

        // useEffect(() => {
        //   resendOTPValidCheck = dayjs().isAfter(
        //     dayjs(values?.otpCodeValidTill).subtract(2, 'minute')
        //   );
        // }, [
        //   dayjs().isAfter(dayjs(values?.otpCodeValidTill).subtract(2, 'minute'))
        // ]);

        return (
          <>
            {/* Security & authentication */}
            <ZIonTitle
              className={classNames({
                'block font-semibold ion-no-padding mt-4 pt-2': true,
                'text-xl': isLgScale,
                'text-lg': !isLgScale,
                'ion-text-center': !isSmScale
              })}>
              Security & authentication
            </ZIonTitle>
            {/* Change password */}
            <ZIonTitle
              className={classNames({
                'block font-semibold ion-no-padding mt-2': true,
                'text-lg': isLgScale,
                'text-sm': !isLgScale,
                'ion-text-center': !isSmScale
              })}>
              Change password
            </ZIonTitle>
            <ZIonText
              className={classNames({
                'block mt-1 mb-4 font-normal': true,
                'text-md': isLgScale,
                'text-sm': !isLgScale,
                'ion-text-center': !isSmScale
              })}>
              You will be required to login after changing your password
            </ZIonText>

            {/* Current password tab */}
            {values.tab === EChangePasswordTab.currentPasswordTab ? (
              <div className='flex mt-2 ion-align-items-start'>
                <ZIonInput
                  name='currentPassword'
                  label='Current password'
                  enterkeyhint='enter'
                  labelPlacement='stacked'
                  minHeight='2.3rem'
                  type={values.canViewCurrentPassword ? 'text' : 'password'}
                  onIonChange={e => {
                    handleChange(e);

                    void setFieldValue(
                      'isCurrentPasswordApiError',
                      false,
                      false
                    );
                  }}
                  onIonBlur={handleBlur}
                  value={values.currentPassword}
                  id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                  errorText={
                    values.isCurrentPasswordApiError
                      ? values.currentPasswordApiMessage
                      : touched?.currentPassword === true
                      ? errors.currentPassword
                      : undefined
                  }
                  clearOnEdit={false}
                  minlength={ZInputLengthConstant.loginForm.password.min}
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .currentPasswordInput
                  }
                  className={classNames({
                    'ion-touched': touched.currentPassword,
                    'ion-invalid':
                      values.isCurrentPasswordApiError || errors.currentPassword
                    // 'ion-valid':
                    //   touched.currentPassword && !errors.currentPassword
                  })}
                />
                <ZIonButton
                  fill='default'
                  height='2.3rem'
                  className='ion-no-padding ion-no-margin ms-3 w-max'
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .currentPasswordSeeBtn
                  }
                  onClick={() => {
                    void setFieldValue(
                      'canViewCurrentPassword',
                      !values.canViewCurrentPassword,
                      false
                    );
                  }}>
                  <ZIonIcon
                    color='primary'
                    className='w-6 h-6'
                    icon={
                      values.canViewCurrentPassword ? eyeOffOutline : eyeOutline
                    }
                  />
                </ZIonButton>
              </div>
            ) : null}

            {/* OTP Tab */}
            {values.tab === EChangePasswordTab.otpTab ? (
              <div className='flex ion-align-items-start'>
                <ZIonInput
                  name='otp'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  minHeight='2.3rem'
                  label='OTP (One-time-password)'
                  maxlength={CONSTANTS.ZOtpLength}
                  labelPlacement='stacked'
                  errorText={
                    values.isOTPApiError
                      ? values.OTPApiMessage
                      : touched?.otp === true
                      ? errors.otp
                      : undefined
                  }
                  className={classNames({
                    'ion-touched': touched.otp,
                    'ion-invalid':
                      (touched?.otp === true && errors.otp) ??
                      values.isOTPApiError
                    // 'ion-valid': touched.otp && !errors.otp
                  })}
                />
                <ZCountdown
                  onTick={() => {
                    if (
                      dayjs().isAfter(
                        dayjs(values?.otpCodeValidTill).subtract(4, 'minute')
                      )
                    ) {
                      void setFieldValue('resendOTPValidCheck', true, false);
                    }
                  }}
                  // onComplete={() => {
                  //   // setFieldValue(
                  //   //   'tab',
                  //   //   EChangePasswordTab.currentPasswordTab,
                  //   //   false
                  //   // );

                  //   showInfoNotification(
                  //     'OTP valid time passed please try again.'
                  //   );
                  // }}
                  countDownTime={values?.otpCodeValidTill}
                  color='dark'
                  component={({ d, color }) => {
                    return (
                      <ZIonText className='h-full mt-2 ms-2'>
                        {d.minutes}:{d.seconds}
                      </ZIonText>
                    );
                  }}
                />
              </div>
            ) : null}

            {/* New password tab */}
            {values.tab === EChangePasswordTab.newPasswordTab ? (
              <>
                {/* New password */}
                <div className='flex mt-3 ion-align-items-start'>
                  <ZIonInput
                    name='newPassword'
                    label='New password'
                    enterkeyhint='enter'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    type={values.canViewNewPassword ? 'text' : 'password'}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.newPassword}
                    id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                    errorText={
                      touched?.newPassword === true
                        ? errors.newPassword
                        : undefined
                    }
                    clearOnEdit={false}
                    minlength={ZInputLengthConstant.loginForm.password.min}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .newPasswordInput
                    }
                    className={classNames({
                      'mt-1': true,
                      'ion-touched': touched?.newPassword,
                      'ion-invalid': errors.newPassword,
                      'ion-valid':
                        touched?.newPassword === true &&
                        (errors?.newPassword?.trim()?.length === 0 ||
                          errors?.newPassword === undefined)
                    })}
                  />
                  <ZIonButton
                    fill='default'
                    height='2.3rem'
                    className='ion-no-padding ion-no-margin ms-3 w-max'
                    onClick={() => {
                      void setFieldValue(
                        'canViewNewPassword',
                        !values.canViewNewPassword,
                        false
                      );
                    }}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .newPasswordSeeBtn
                    }>
                    <ZIonIcon
                      color='primary'
                      className='w-6 h-6'
                      icon={
                        values.canViewNewPassword ? eyeOffOutline : eyeOutline
                      }
                    />
                  </ZIonButton>
                </div>

                {/* Confirm password */}
                <div className='flex mt-3 ion-align-items-start'>
                  <ZIonInput
                    name='confirmPassword'
                    label='Confirm password'
                    enterkeyhint='enter'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    type={values.canViewConfirmPassword ? 'text' : 'password'}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.confirmPassword}
                    id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                    errorText={
                      touched?.confirmPassword === true
                        ? errors.confirmPassword
                        : undefined
                    }
                    clearOnEdit={false}
                    minlength={ZInputLengthConstant.loginForm.password.min}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .confirmPasswordInput
                    }
                    className={classNames({
                      'mt-1': true,
                      'ion-touched': touched.confirmPassword,
                      'ion-invalid': errors.confirmPassword,
                      'ion-valid':
                        touched?.confirmPassword === true &&
                        (errors.confirmPassword === undefined ||
                          errors.confirmPassword === null)
                    })}
                  />
                  <ZIonButton
                    fill='default'
                    height='2.3rem'
                    className='ion-no-padding ion-no-margin ms-3 w-max'
                    onClick={() => {
                      void setFieldValue(
                        'canViewConfirmPassword',
                        !values.canViewConfirmPassword,
                        false
                      );
                    }}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .confirmPasswordSeeBtn
                    }>
                    <ZIonIcon
                      color='primary'
                      className='w-6 h-6'
                      icon={
                        values.canViewConfirmPassword
                          ? eyeOffOutline
                          : eyeOutline
                      }
                    />
                  </ZIonButton>
                </div>
              </>
            ) : null}

            {/* Action btn */}
            {values.tab === EChangePasswordTab.currentPasswordTab ? (
              <div
                className={classNames({
                  'flex ion-align-items-center': true,
                  'gap-2': isSmScale,
                  'flex-col': !isSmScale
                })}>
                <div
                  className={classNames({
                    'mt-1': true,
                    'w-max': isSmScale,
                    'w-full': !isSmScale,
                    'cursor-not-allowed': !currentPasswordValidCheck
                  })}>
                  <ZIonButton
                    disabled={!currentPasswordValidCheck}
                    expand={isSmScale ? undefined : 'block'}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .changePasswordBtn
                    }
                    onClick={() => {
                      const _stringifyData = zStringify({
                        password: values.currentPassword
                      });

                      void validateCurrentPasswordHandler({
                        _data: _stringifyData,
                        setErrors,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldValueFn: setFieldValue,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldTouchedFn: setFieldTouched
                      });
                    }}>
                    Confirm current password
                  </ZIonButton>
                </div>
              </div>
            ) : null}

            {values.tab === EChangePasswordTab.otpTab ? (
              <div
                className={classNames({
                  'flex ion-align-items-center': true,
                  'gap-2': isSmScale,
                  'flex-col': !isSmScale
                })}>
                <div
                  className={classNames({
                    'mt-1': true,
                    'w-max': isSmScale,
                    'w-full': !isSmScale,
                    'cursor-not-allowed': !otpValidCheck
                  })}>
                  <ZIonButton
                    disabled={!otpValidCheck}
                    expand={isSmScale ? undefined : 'block'}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .changePasswordBtn
                    }
                    onClick={() => {
                      const _stringifyData = zStringify({
                        otp: values.otp
                      });

                      void validateOtpHandler({
                        _data: _stringifyData,
                        setErrors,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldValueFn: setFieldValue,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldTouchedFn: setFieldTouched
                      });
                    }}>
                    Confirm OTP
                  </ZIonButton>
                </div>

                <div
                  className={classNames({
                    'mt-1': true,
                    'w-max': isSmScale,
                    'w-full': !isSmScale,
                    'cursor-not-allowed': !otpValidCheck
                  })}>
                  <ZIonButton
                    color='tertiary'
                    disabled={!values.resendOTPValidCheck}
                    expand={isSmScale ? undefined : 'block'}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .changePasswordBtn
                    }
                    onClick={() => {
                      if (values.resendOTPValidCheck) {
                        void resendPasswordOtpHandler({
                          setErrors,
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          setFieldValueFn: setFieldValue,
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          setFieldTouchedFn: setFieldTouched
                        });
                      }
                    }}>
                    Resend OTP
                  </ZIonButton>
                </div>

                <ZIonButton
                  color='secondary'
                  expand={isSmScale ? undefined : 'block'}
                  id='cancel-password-change-possess-tt'
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .changePasswordBtn
                  }
                  onClick={() => {
                    cancelPasswordPossessHandler({
                      setErrors,
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      setFieldValueFn: setFieldValue,
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      setFieldTouchedFn: setFieldTouched
                    });
                  }}>
                  Cancel
                </ZIonButton>
                <ZRTooltip
                  anchorSelect='#cancel-password-change-possess-tt'
                  variant='info'
                  place='right'>
                  <p className='text-sm'>Cancel password change possess</p>
                </ZRTooltip>
              </div>
            ) : null}

            {values.tab === EChangePasswordTab.newPasswordTab ? (
              <div
                className={classNames({
                  'flex ion-align-items-center': true,
                  'gap-2': isSmScale,
                  'flex-col': !isSmScale
                })}>
                <div
                  className={classNames({
                    'mt-1': true,
                    'w-max': isSmScale,
                    'w-full': !isSmScale,
                    'cursor-not-allowed':
                      !changePasswordValidCheck ||
                      values.isCurrentPasswordApiError
                  })}>
                  <ZIonButton
                    disabled={
                      !changePasswordValidCheck ||
                      values.isCurrentPasswordApiError
                    }
                    expand={isSmScale ? undefined : 'block'}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .changePasswordBtn
                    }
                    onClick={() => {
                      const _stringifyData = zStringify({
                        newPassword: values.newPassword,
                        newPassword_confirmation: values.confirmPassword
                      });

                      void updatePasswordHandler(
                        _stringifyData,
                        setErrors,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldValue,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        setFieldTouched
                      );
                    }}>
                    Change password
                  </ZIonButton>
                </div>
              </div>
            ) : null}
          </>
        );
      }}
    </Formik>
  );
};

export default ZProfileSettingsSettings;
