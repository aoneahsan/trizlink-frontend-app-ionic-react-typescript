// Core Imports
import React, { useState } from 'react';

// Package Imports Consolas, 'Courier New', monospace
import { Formik } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonRow,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS, { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import {
  zAxiosApiRequest,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  STORAGE,
  validateFields,
  zStringify
} from '@/utils/helpers';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { AxiosError } from 'axios';
import { ZCustomError } from '@/utils/customErrorType';
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRStateAtom
} from '@/ZaionsStore/UserAccount/index.recoil';
import { useSetRecoilState } from 'recoil';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { type UserAuthData } from '@/types/ZaionsApis.type';
import {
  type FormikSetErrorsType,
  type resetFormType
} from '@/types/ZaionsFormik.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZInputLengthConstant from '@/utils/constants/InputLenghtConstant';
import TermsPrivacyAcceptedNote from '@/components/TermsPrivacyAcceptedNote';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Style

const ZaionsLoginForm: React.FC = () => {
  // state to change weather password shown on not.
  const [canViewPassword, setCanViewPassword] = useState<boolean>(false);

  // Store user data in ZaionsUserAccountRStateAtom recoil state.
  const setUserAccountStateAtom = useSetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  // recoil state for storing auth data
  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

  // Custom hooks.
  const { presentZIonErrorAlert } = useZIonErrorAlert(); // hook to show alert
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(); // hook to show loader
  const { zNavigatePushRoute } = useZNavigate(); // hook to navigate
  const { isSmScale } = useZMediaQueryScale();

  // Formik submit function.
  const FormikSubmissionHandler = async (
    _values: Record<string, unknown>,
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      // Loading start...
      await presentZIonLoader('Logging in. please wait a second.');

      // registering data
      const _response = await zAxiosApiRequest<UserAuthData>({
        _url: API_URL_ENUM.login,
        _method: 'post',
        _isAuthenticatedRequest: false,
        _data: zStringify({
          email: _values.emailAddress,
          password: _values.password
        })
      });
      // Checking if the __response is available.
      if (
        _response !== undefined &&
        _response.success &&
        _response?.data?.token?.plainTextToken?.length > 0
      ) {
        // getting user data.
        const userData = getUserDataObjectForm(_response.data.user);

        // Storing user token at userAccountAuthToken State.
        const userToken = {
          token: _response.data.token.plainTextToken
        };

        // Set user data && user token to localstorage.
        if (userData !== undefined && userData !== null && userToken !== null) {
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

          // Dismiss the ion loader
          await dismissZIonLoader();

          // If success then show the success notification.
          showSuccessNotification(MESSAGES.GENERAL.LOGIN_SUCCESSFULLY);

          // reset form.
          resetForm();

          // redirect to profile. (old 30/5/2023)
          // zNavigatePushRoute(
          // replaceParams(
          // ZaionsRoutes.AdminPanel.LinkInBio.Main,
          // CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
          // ''
          // )
          // );

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
        // await presentZIonErrorAlert();
        // Setting errors on form fields
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['emailAddress', 'password'],
          ['email', 'password'],
          _apiErrors
        );
        setErrors(_errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        // if we need to do some other type of logic reporting (like report this error to API or error blogging to like sentry or datadog etc then we can do that here, otherwise if we just want to show the message of error to user in alert then we can do that in one else case no need for this check, but here we can set the title of alert to)
        await presentZIonErrorAlert();
      }
    }
  };

  const formikInitialValues = {
    emailAddress: '',
    password: ''
  };

  return (
    <ZIonRow className='ion-justify-content-center'>
      <ZIonCol
        className='ion-text-start ion-no-padding'
        size='12'>
        <Formik
          // Initial Values of sign up form fields
          initialValues={formikInitialValues}
          // Validations of sign up form fields
          validate={values => {
            try {
              const errors: {
                emailAddress?: string;
                password?: string;
              } = {};

              validateFields(['emailAddress', 'password'], values, errors, [
                VALIDATION_RULE.email,
                VALIDATION_RULE.password
              ]);
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
          onSubmit={async (values, { resetForm, setErrors }) => {
            await FormikSubmissionHandler(values, resetForm, setErrors);
          }}>
          {({
            handleChange,
            handleBlur,
            submitForm,
            isValid,
            values,
            touched,
            errors
          }) => (
            <>
              {/* Email Address Field */}
              <ZIonInput
                name='emailAddress'
                label='Email Address*'
                labelPlacement='stacked'
                placeholder='Please enter email'
                type='email'
                enterkeyhint='next'
                onIonChange={handleChange}
                onIonBlur={handleBlur}
                value={values.emailAddress}
                testingselector={
                  CONSTANTS.testingSelectors.loginPage.emailInput
                }
                errorText={
                  touched?.emailAddress === true
                    ? errors.emailAddress
                    : undefined
                }
                zNextFieldId={
                  CONSTANTS.testingSelectors.loginPage.passwordInput
                }
                className={classNames({
                  'mb-4': true,
                  'ion-touched': touched?.emailAddress === true,
                  'ion-invalid':
                    touched?.emailAddress === true && errors.emailAddress,
                  'ion-valid':
                    touched?.emailAddress === true &&
                    (errors.emailAddress === undefined ||
                      errors.emailAddress?.trim()?.length === 0)
                })}
              />

              {/* Password Field */}
              <div className='flex ion-align-items-start'>
                <ZIonInput
                  name='password'
                  label='Password*'
                  placeholder='Please enter password'
                  enterkeyhint='enter'
                  labelPlacement='stacked'
                  type={canViewPassword ? 'text' : 'password'}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  value={values.password}
                  id={CONSTANTS.testingSelectors.loginPage.passwordInput}
                  errorText={
                    touched?.password === true ? errors.password : undefined
                  }
                  clearOnEdit={false}
                  minlength={ZInputLengthConstant.loginForm.password.min}
                  testingselector={
                    CONSTANTS.testingSelectors.loginPage.passwordInput
                  }
                  className={classNames({
                    'ion-padding-end-point-3rem': true,
                    'ion-touched': touched?.password === true,
                    'ion-invalid':
                      touched?.password === true && errors.password,
                    'ion-valid':
                      touched?.password === true &&
                      (errors.password === undefined ||
                        errors.password?.trim()?.length === 0)
                  })}>
                  <ZIonButton
                    fill='default'
                    slot='end'
                    className='overflow-hidden rounded-full ion-no-padding ion-no-margin ms-3 w-[2.5rem] h-[2.5rem]'
                    onClick={() => {
                      setCanViewPassword(OldVal => !OldVal);
                    }}
                    testingselector={
                      CONSTANTS.testingSelectors.loginPage.canViewPasswordButton
                    }>
                    <ZIonIcon
                      icon={canViewPassword ? eyeOffOutline : eyeOutline}
                      className='w-7 h-7'
                      color='primary'
                    />
                  </ZIonButton>
                </ZIonInput>
              </div>

              <div className='ion-text-end'>
                <ZIonRouterLink
                  className={classNames(
                    'block ion-no-padding ion-no-margin hover:underline',
                    {
                      'text-sm': !isSmScale
                    }
                  )}
                  routerLink={ZaionsRoutes.PasswordResetEmailForm}
                  testingselector={
                    CONSTANTS.testingSelectors.loginPage.forgetPasswordButton
                  }>
                  Forgot your password?
                </ZIonRouterLink>
              </div>

              {/* Submit Button */}
              <ZIonButton
                expand='block'
                disabled={!isValid}
                className='mt-4 ion-text-capitalize'
                onClick={() => {
                  void submitForm();
                }}
                testingselector={
                  CONSTANTS.testingSelectors.loginPage.loginButton
                }>
                Log in
              </ZIonButton>

              <TermsPrivacyAcceptedNote isRegisterPage={false} />
            </>
          )}
        </Formik>
      </ZIonCol>
    </ZIonRow>
  );
};

export default ZaionsLoginForm;
