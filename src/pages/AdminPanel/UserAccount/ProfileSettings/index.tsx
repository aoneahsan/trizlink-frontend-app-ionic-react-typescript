/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { Form, Formik } from 'formik';
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
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
  extractInnerData,
  getUserDataObjectForm,
  STORAGE,
  validateField,
  zStringify
} from '@/utils/helpers';
import { UserAccountType } from '@/types/UserAccount/index.type';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import AddEmailModal from '@/components/InPageComponents/ZaionsModals/EmailModal';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProfileSettingsSettings: React.FC = () => {
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
  // #endregion

  // #region Functions.
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

            canViewCurrentPassword: false,
            currentPassword: '',

            canViewNewPassword: false,
            newPassword: '',

            canViewConfirmPassword: false,
            confirmPassword: ''
          }}
          enableReinitialize={true}
          validate={values => {
            const errors = {};

            validateField('username', values, errors);

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
                    userAvatar={values?.userProfileFile?.fileUrl}
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
                  <ZUploadInput
                    setFieldValueFn={setFieldValue}
                    name='userProfileFile'
                    value={values.userProfileFile}
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
                    onClick={() => {
                      if (
                        errors?.username === undefined &&
                        !updateProfileDetailBtnDisable
                      ) {
                        const __zStringifyData = zStringify({
                          name: values?.name,
                          username: values?.username,
                          phoneNumber: values?.phoneNumber,
                          profileImage: zStringify(values?.userProfileFile),
                          avatar: values?.userProfileFile?.fileUrl
                        });
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
                    <ZEmailAddressesTable />
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

                  <div
                    className={classNames({
                      'w-max': isSmScale,
                      'w-full': !isSmScale,
                      'cursor-not-allowed': true
                    })}>
                    <ZIonButton
                      disabled={true}
                      expand={isSmScale ? undefined : 'block'}
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .profileSettingsTab.updatePrimaryEmailBtn
                      }>
                      Update primary email
                    </ZIonButton>
                  </div>
                </div>

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
                {/* Current password */}
                <div className='flex mt-2 ion-align-items-start'>
                  <ZIonInput
                    name='currentPassword'
                    label='Current password'
                    enterkeyhint='enter'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    type={values.canViewCurrentPassword ? 'text' : 'password'}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.currentPassword}
                    id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                    errorText={
                      touched.currentPassword
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
                      'ion-invalid': errors.currentPassword,
                      'ion-valid':
                        touched.currentPassword && !errors.currentPassword
                    })}
                  />
                  <ZIonButton
                    fill='clear'
                    // size='large'
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
                      icon={
                        values.canViewCurrentPassword
                          ? eyeOffOutline
                          : eyeOutline
                      }
                    />
                  </ZIonButton>
                </div>

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
                      'ion-touched': touched.newPassword,
                      'ion-invalid': errors.newPassword,
                      'ion-valid': touched.newPassword && !errors.newPassword
                    })}
                  />
                  <ZIonButton
                    fill='clear'
                    // size='large'
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
                      'ion-touched': touched.confirmPassword,
                      'ion-invalid': errors.confirmPassword,
                      'ion-valid':
                        touched.confirmPassword && !errors.confirmPassword
                    })}
                  />
                  <ZIonButton
                    fill='clear'
                    // size='large'
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
                      icon={
                        values.canViewConfirmPassword
                          ? eyeOffOutline
                          : eyeOutline
                      }
                    />
                  </ZIonButton>
                </div>
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
                      expand={isSmScale ? undefined : 'block'}
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .profileSettingsTab.changePasswordBtn
                      }>
                      Change password
                    </ZIonButton>
                  </div>
                </div>

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

export default ZProfileSettingsSettings;
