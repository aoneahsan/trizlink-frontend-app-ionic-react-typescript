/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense, useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Form, Formik, useFormikContext } from 'formik';
import { AxiosError } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

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
import ZUploadInput from '@/components/CustomComponents/ZUploadInput';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import ZInputLengthConstant from '@/utils/constants/InputLenghtConstant';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/ZaionsHooks/zreactquery-hooks';
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
  validateField,
  validateFields,
  zStringify
} from '@/utils/helpers';
import { UserAccountType } from '@/types/UserAccount/index.type';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import AddEmailModal from '@/components/InPageComponents/ZaionsModals/EmailModal';
import MESSAGES from '@/utils/messages';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from '@/utils/notification';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';
import {
  FormikSetErrorsType,
  FormikSetFieldTouchedEventType,
  FormikSetFieldValueEventType
} from '@/types/ZaionsFormik.type';
import ZCountdown from '@/components/CustomComponents/ZCountDown';
import dayjs from 'dayjs';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';

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
    _queriesKeysToInvalidate: [],
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });
  // #endregion

  // #region Functions.
  const uploadFileToBackend = async () => {
    try {
      const formData = new FormData();
      formData.append('file', compState?.profileFile!);
      const result = await uploadSingleFile(formData);

      if (result) {
        const __data = (
          result as {
            data: {
              file: object;
              fileName: object;
              filePath: string;
              fileUrl: string;
            };
          }
        )?.data;

        if (__data) {
          setCompState(oldValues => ({
            ...oldValues,
            profilePicFormattedObj: { ...__data }
          }));

          // showing success message.
          showSuccessNotification(MESSAGES.GENERAL.FILE.UPLOADED);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _error = (error?.response?.data as { errors: { file: string[] } })
          ?.errors;
        const _axiosErrorMessage = error?.message;

        if (_error) {
          showErrorNotification(_error?.file[0]);
        } else {
          showErrorNotification(_axiosErrorMessage);
        }
      }
    }
  };

  const updateProfileDetailsHandler = async (_data: string) => {
    try {
      const __response = await ZUpdateUserAccountInfoAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (__response) {
        const __data = extractInnerData<UserAccountType>(
          __response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (__data && __data?.id && __data?.email) {
          // getting user data.
          const userData = getUserDataObjectForm(__data);

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
      if (error instanceof AxiosError) {
      }
    }
  };

  // #endregion
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
          initialValues={{
            name: userAccountStateAtom?.name || '',
            username: userAccountStateAtom?.username || '',
            userProfileFile: {
              filePath: userAccountStateAtom?.profileImage?.filePath || '',
              fileUrl:
                userAccountStateAtom?.profileImage?.fileUrl ||
                userAccountStateAtom?.avatar ||
                ''
            },
            phoneNumber: userAccountStateAtom?.phoneNumber || '',
            enableMakeEmailPrimary: true
          }}
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
                  errorText={touched.username ? errors.username : undefined}
                  className={classNames({
                    'ion-touched': touched.username,
                    'ion-invalid': touched.username && errors.username,
                    'ion-valid': touched.username && !errors.username
                  })}
                  testingselector={
                    CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                      .usernameInput
                  }
                />

                {/* Profile */}
                <div className='flex w-full gap-2 mt-2 mb-4 ion-align-items-center'>
                  <ZUserAvatarButton
                    className='border rounded-sm'
                    userAvatar={
                      compState?.profilePicFrontendUrl ||
                      compState?.profilePicFormattedObj?.fileUrl ||
                      userAccountStateAtom?.profileImage?.fileUrl
                    }
                    style={{
                      height: '3rem',
                      width: '3rem',
                      cursor: 'auto !important',
                      '--border-radius': '4px'
                    }}
                    userAvatarUi={{
                      name: userAccountStateAtom?.username
                    }}
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
                      const zFile =
                        event?.target?.files && event?.target?.files[0];

                      if (zFile) {
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
                    touched?.phoneNumber ? errors?.phoneNumber : undefined
                  }
                  onChange={_value => {
                    setFieldValue('phoneNumber', _value, true);
                  }}
                  onBlur={() => {
                    setFieldTouched('phoneNumber', true, true);
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
                      (errors?.username && errors?.username?.length > 0) ||
                      updateProfileDetailBtnDisable
                  })}>
                  <ZIonButton
                    disabled={
                      (errors?.username && errors?.username?.length > 0) ||
                      updateProfileDetailBtnDisable
                    }
                    type='submit'
                    expand={isSmScale ? undefined : 'block'}
                    onClick={async () => {
                      if (
                        errors?.username === undefined &&
                        !updateProfileDetailBtnDisable
                      ) {
                        let __zStringifyData = zStringify({
                          name: values?.name,
                          username: values?.username,
                          phoneNumber: values?.phoneNumber,
                          profileImage: compState?.profilePicFormattedObj
                            ? zStringify(compState?.profilePicFormattedObj)
                            : userAccountStateAtom?.profileImage
                            ? zStringify(userAccountStateAtom?.profileImage)
                            : null,
                          avatar:
                            compState?.profilePicFormattedObj?.fileUrl ||
                            userAccountStateAtom?.profileImage?.fileUrl
                        });

                        //
                        if (compState?.profileFile !== undefined) {
                          // await uploadFileToBackend();
                          const formData = new FormData();
                          formData.append('file', compState?.profileFile!);
                          const result = await uploadSingleFile(formData);

                          if (result) {
                            const __data = (
                              result as {
                                data: {
                                  file: object;
                                  fileName: object;
                                  filePath: string;
                                  fileUrl: string;
                                };
                              }
                            )?.data;

                            if (__data) {
                              __zStringifyData = zStringify({
                                name: values?.name,
                                username: values?.username,
                                phoneNumber: values?.phoneNumber,
                                profileImage: zStringify({ ...__data }),
                                avatar: __data.fileUrl
                              });

                              // showing success message.
                              showSuccessNotification(
                                MESSAGES.GENERAL.FILE.UPLOADED
                              );
                            }
                          }
                        }

                        void updateProfileDetailsHandler(__zStringifyData);
                      }
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
                      onClick={() =>
                        presentEmailModal({
                          _cssClass: 'add-email-modal-size'
                        })
                      }
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
                  You're viewing recent activity on your account. Logging out
                  will apply to all devices currently connected to{' '}
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
    setFieldValueFn: FormikSetFieldValueEventType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }) => {
    try {
      const __response = await ZValidateCurrentPasswordAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (__response) {
        const __data = extractInnerData<{
          success: boolean;
          OTPCodeValidTill: string;
        }>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (__data?.success) {
          setFieldValueFn('tab', EChangePasswordTab.otpTab, false);

          parentSetFieldValue('enableMakeEmailPrimary', false, false);

          setFieldValueFn('resendOTPValidCheck', false, false);
          setFieldValueFn('otpCodeValidTill', __data.OTPCodeValidTill, false);
          setFieldTouchedFn('currentPassword', false);
          setFieldValueFn('currentPassword', '', false);
          setErrors({});

          showSuccessNotification(MESSAGES.USER.CONFIRMED_CURRENT_PASSWORD);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const __apiErrors = __apiErrorObjects?.errors;
        const __apiErrorCode = __apiErrorObjects?.status;

        if (
          __apiErrorCode === ZErrorCodeEnum.serverError ||
          __apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const __errors = formatApiRequestErrorForFormikFormField(
            ['currentPassword'],
            ['password'],
            __apiErrors as ZGenericObject
          );

          const _passwordErrorMessage = (
            __errors as { currentPassword: string }
          )?.currentPassword;

          setFieldValueFn('isCurrentPasswordApiError', true, false);
          setFieldValueFn(
            'currentPasswordApiMessage',
            _passwordErrorMessage,
            false
          );

          setErrors(__errors);
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
    setFieldValueFn: FormikSetFieldValueEventType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }) => {
    try {
      const __response = await ZResendPasswordOtpAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: ''
      });

      if (__response) {
        const __data = extractInnerData<{
          success: boolean;
          OTPCodeValidTill: string;
        }>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (__data?.success) {
          setFieldValueFn('resendOTPValidCheck', false, false);
          parentSetFieldValue('enableMakeEmailPrimary', false, false);
          setFieldValueFn('otpCodeValidTill', __data.OTPCodeValidTill, false);
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
    setFieldValueFn: FormikSetFieldValueEventType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }) => {
    try {
      const __response = await ZValidatePasswordOtpAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (__response) {
        const __data = extractInnerData<{
          success: boolean;
        }>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (__data?.success) {
          setFieldValueFn('tab', EChangePasswordTab.newPasswordTab, false);
          parentSetFieldValue('enableMakeEmailPrimary', true, false);
          setFieldValueFn('otp', '', false);
          setFieldTouchedFn('otp', false);
          setErrors({});

          showSuccessNotification(MESSAGES.USER.CONFIRMED_PASSWORD_OTP);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const __apiErrors = __apiErrorObjects?.errors;
        const __apiErrorCode = __apiErrorObjects?.status;

        if (
          __apiErrorCode === ZErrorCodeEnum.serverError ||
          __apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const __errors = formatApiRequestErrorForFormikFormField(
            ['otp'],
            ['otp'],
            __apiErrors as ZGenericObject
          );

          const _otpErrorMessage = (__errors as { otp: string })?.otp;

          setFieldValueFn('isOTPApiError', true, false);
          setFieldValueFn('OTPApiMessage', _otpErrorMessage, false);

          setErrors(__errors);
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
    setFieldValueFn: FormikSetFieldValueEventType;
    setFieldTouchedFn: FormikSetFieldTouchedEventType;
  }) => {
    try {
      setFieldValueFn('tab', EChangePasswordTab.currentPasswordTab, false);

      parentSetFieldValue('enableMakeEmailPrimary', true, false);

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
    setFieldValueFn: FormikSetFieldValueEventType,
    setFieldTouchedFn: FormikSetFieldTouchedEventType
  ) => {
    try {
      const __response = await ZUpdatePasswordAsyncMutate({
        itemIds: [],
        urlDynamicParts: [],
        requestData: _data
      });

      if (__response) {
        const __data = extractInnerData<{
          user: UserAccountType;
        }>(__response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (__data && __data?.user?.email) {
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
        const __apiErrorObjects = error.response?.data as {
          errors: { item: string[] } | ZGenericObject;
          status: number;
        };

        const __apiErrors = __apiErrorObjects?.errors;
        const __apiErrorCode = __apiErrorObjects?.status;

        if (
          __apiErrorCode === ZErrorCodeEnum.serverError ||
          __apiErrorCode === ZErrorCodeEnum.badRequest
        ) {
          const __errors = formatApiRequestErrorForFormikFormField(
            ['newPassword', 'confirmPassword'],
            ['newPassword', 'newPassword_confirmation'],
            __apiErrors as ZGenericObject
          );
          setErrors(__errors);
        }
      }

      reportCustomError(error);
    }
  };
  // #endregion
  return (
    <Formik
      initialValues={{
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
      }}
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
          !errors?.newPassword?.trim() &&
          !errors?.confirmPassword?.trim() &&
          values?.newPassword?.trim()?.length > 0 &&
          values?.confirmPassword?.trim()?.length > 0;

        const currentPasswordValidCheck =
          !errors?.currentPassword?.trim() &&
          values?.currentPassword?.trim()?.length > 0;

        const otpValidCheck =
          !errors?.otp?.trim() &&
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

                    setFieldValue('isCurrentPasswordApiError', false, false);
                  }}
                  onIonBlur={handleBlur}
                  value={values.currentPassword}
                  id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                  errorText={
                    values.isCurrentPasswordApiError
                      ? values.currentPasswordApiMessage
                      : touched.currentPassword
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
                  onClick={() =>
                    setFieldValue(
                      'canViewCurrentPassword',
                      !values.canViewCurrentPassword,
                      false
                    )
                  }>
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
                      : touched.otp
                      ? errors.otp
                      : undefined
                  }
                  className={classNames({
                    'ion-touched': touched.otp,
                    'ion-invalid':
                      (touched.otp && errors.otp) || values.isOTPApiError
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
                      setFieldValue('resendOTPValidCheck', true, false);
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
                      touched.newPassword ? errors.newPassword : undefined
                    }
                    clearOnEdit={false}
                    minlength={ZInputLengthConstant.loginForm.password.min}
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount.profileSettingsTab
                        .newPasswordInput
                    }
                    className={classNames({
                      'mt-1': true,
                      'ion-touched': touched.newPassword,
                      'ion-invalid': errors.newPassword,
                      'ion-valid': touched.newPassword && !errors.newPassword
                    })}
                  />
                  <ZIonButton
                    fill='default'
                    height='2.3rem'
                    className='ion-no-padding ion-no-margin ms-3 w-max'
                    onClick={() =>
                      setFieldValue(
                        'canViewNewPassword',
                        !values.canViewNewPassword,
                        false
                      )
                    }
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
                      touched.confirmPassword
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
                        touched.confirmPassword && !errors.confirmPassword
                    })}
                  />
                  <ZIonButton
                    fill='default'
                    height='2.3rem'
                    className='ion-no-padding ion-no-margin ms-3 w-max'
                    onClick={() =>
                      setFieldValue(
                        'canViewConfirmPassword',
                        !values.canViewConfirmPassword,
                        false
                      )
                    }
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
                      const __stringifyData = zStringify({
                        password: values.currentPassword
                      });

                      void validateCurrentPasswordHandler({
                        _data: __stringifyData,
                        setErrors: setErrors,
                        setFieldValueFn: setFieldValue,
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
                      const __stringifyData = zStringify({
                        otp: values.otp
                      });

                      void validateOtpHandler({
                        _data: __stringifyData,
                        setErrors: setErrors,
                        setFieldValueFn: setFieldValue,
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
                          setErrors: setErrors,
                          setFieldValueFn: setFieldValue,
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
                      setErrors: setErrors,
                      setFieldValueFn: setFieldValue,
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
                      const __stringifyData = zStringify({
                        newPassword: values.newPassword,
                        newPassword_confirmation: values.confirmPassword
                      });

                      void updatePasswordHandler(
                        __stringifyData,
                        setErrors,
                        setFieldValue,
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