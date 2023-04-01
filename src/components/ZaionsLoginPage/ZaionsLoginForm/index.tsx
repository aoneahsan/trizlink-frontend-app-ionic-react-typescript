// Core Imports
import React, { useState } from 'react';

// Package Imports Consolas, 'Courier New', monospace
import { Formik } from 'formik';
import classNames from 'classnames';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonItem,
  ZIonLabel,
  ZIonInput,
  ZIonRow,
  ZIonNote,
} from '@/components/ZIonComponents';

// Global Constants
import { LOCALSTORAGE_KEYS, PRODUCT_NAME } from '@/utils/constants';
import {
  zAxiosApiRequest,
  formatApiRequestErrorForFormikFormField,
  getUserDataObjectForm,
  STORAGE,
  validateFields,
  zStringify,
  zConsoleError,
} from '@/utils/helpers';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { AxiosError } from 'axios';
import { ZCustomError } from '@/utils/customErrorType';
import {
  ZaionsAuthTokenData,
  ZaionsUserAccountRState,
} from '@/ZaionsStore/UserAccount/index.recoil';
import { useSetRecoilState } from 'recoil';
import MESSAGES from '@/utils/messages';
import { showSuccessNotification } from '@/utils/notification';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { UserAuthData } from '@/types/ZaionsApis.type';
import { ZIonButton } from '@/components/ZIonComponents';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

// Style

const ZaionsLoginForm: React.FC = () => {
  const [canViewPassword, setcanViewPassword] = useState<boolean>(false);

  const setUserAccountState = useSetRecoilState(ZaionsUserAccountRState);

  const setAuthTokenDataState = useSetRecoilState(ZaionsAuthTokenData);

  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const { zNavigatePushRoute } = useZNavigate();

  const FormikSubmissionHandler = async (
    _values: { [key: string]: unknown },
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ) => {
    try {
      // Loading start...
      await presentZIonLoader('Logging in. please wait a second.');

      // registering data
      console.log({
        log: 'From login',
        _values,
      });
      const ___response = await zAxiosApiRequest<UserAuthData>({
        _url: API_URL_ENUM.login,
        _method: 'post',
        _isAuthenticatedRequest: false,
        _data: zStringify({
          email: _values.emailAddress,
          password: _values.password,
        }),
      });
      // Checking if the ___response is available & if there is a user object in ___response which have the id.
      // if (___response && ___response.user?.id) {
      if (
        ___response &&
        ___response.success &&
        ___response.data.token.plainTextToken
      ) {
        console.log(___response);
        // getting user data.
        const userData = getUserDataObjectForm(___response.data.user);
        // Storing user token at userAccountAuthToken State.
        const userToken = {
          token: ___response.data.token.plainTextToken,
        };

        // Set user data && user token to localstorage.
        if (userData && userToken) {
          // store User token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.USERDATA, userData);
          // store auth token.
          void STORAGE.SET(LOCALSTORAGE_KEYS.AUTHTOKEN, userToken.token);

          // Storing user data in userAccount Recoil State.
          setUserAccountState((oldVals) => ({
            ...oldVals,
            ...userData,
          }));

          setAuthTokenDataState((oldVals) => ({
            ...oldVals,
            ...userToken,
          }));

          // Dismiss the ion loader
          await dismissZIonLoader();

          // If success then show the success notification.
          showSuccessNotification(MESSAGES.GENERAL.LOGIN_SUCCESSFULLY);

          // reset form.
          resetForm();

          // redirect to profile.
          zNavigatePushRoute(ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile);
        } else {
          // if there is any error in above then Throw Error..
          throw new ZCustomError();
        }
      } else {
        // if there is any error in above then Throw Error..
        throw new AxiosError();
      }
    } catch (error) {
      zConsoleError({ err: error });
      await dismissZIonLoader();
      if (error instanceof AxiosError) {
        // await presentZIonErrorAlert();
        // Setting errors on form fields
        const __apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const __errors = formatApiRequestErrorForFormikFormField(
          ['emailAddress', 'password'],
          ['email', 'password'],
          __apiErrors
        );
        setErrors(__errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        // if we need to do some other type of logic reporting (like report this error to API or error blogging to like sentry or datadog etc then we can do that here, otherwise if we just want to show the message of error to user in alert then we can do that in one else case no need for this check, but here we can set the title of alert to)
        await presentZIonErrorAlert();
      }
    }
  };

  return (
    <>
      <ZIonRow className='ion-justify-content-center'>
        <ZIonCol
          className='ion-text-start'
          size='4.2'
          sizeLg='5'
          sizeMd='6.2'
          sizeSm='8.2'
          sizeXs='11.5'
        >
          <Formik
            // Initial Values of sign up form fields
            initialValues={{
              emailAddress: '',
              password: '',
            }}
            // Validations of sign up form fields
            validate={(values) => {
              try {
                const errors: {
                  emailAddress?: string;
                  password?: string;
                } = {};

                validateFields(['emailAddress', 'password'], values, errors, [
                  VALIDATION_RULE.email,
                  VALIDATION_RULE.password,
                ]);
                return errors;
              } catch (error) {
                console.error({
                  errorPlacement:
                    'From components - InPageComponents - ZaionsLoginPage - ZaionsSignUpForm Formik validate Catch',
                  error,
                });
              }
            }}
            // Submit function of formik
            onSubmit={async (values, { resetForm, setErrors }) => {
              await FormikSubmissionHandler(values, resetForm, setErrors);
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              submitForm,
            }) => (
              <>
                {/* Email Address Field */}
                <ZIonItem
                  className={classNames({
                    'mb-4 ion-item-start-no-padding': true,

                    'ion-touched ion-invalid':
                      touched.emailAddress && errors.emailAddress,
                    'ion-touched ion-valid':
                      touched.emailAddress && !errors.emailAddress,
                    zaions_item_input_bb:
                      !touched.emailAddress ||
                      (touched.emailAddress && !errors.emailAddress),
                  })}
                >
                  <ZIonLabel position='floating'>Email Address</ZIonLabel>
                  <ZIonInput
                    name='emailAddress'
                    type='email'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.emailAddress}
                  />
                  <ZIonNote slot='error'>{errors.emailAddress}</ZIonNote>
                </ZIonItem>

                {/* Password Field */}
                <ZIonItem
                  className={classNames({
                    'ion-item-start-no-padding': true,

                    'ion-touched ion-invalid':
                      touched.password && errors.password,
                    'ion-touched ion-valid':
                      touched.password && !errors.password,
                    zaions_item_input_bb:
                      !touched.password ||
                      (touched.password && !errors.password),
                  })}
                >
                  <ZIonLabel position='floating'>Password</ZIonLabel>
                  <ZIonInput
                    name='password'
                    type={canViewPassword ? 'text' : 'password'}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.password}
                  />
                  <ZIonButton
                    slot='end'
                    fill='clear'
                    size='large'
                    className='ion-no-padding'
                    onClick={() => setcanViewPassword((OldVal) => !OldVal)}
                    mode='ios'
                  >
                    <ZIonIcon
                      icon={canViewPassword ? eyeOffOutline : eyeOutline}
                    />
                  </ZIonButton>
                  <ZIonNote slot='error'>{errors.password}</ZIonNote>
                </ZIonItem>
                <div className='ion-text-end '>
                  <ZIonButton
                    fill='clear'
                    className='ion-no-padding ion-no-margin ion-text-capitalize text-decoration-underline'
                    mode='ios'
                    routerLink={ZaionsRoutes.PasswordResetEmailForm}
                  >
                    Forgot your password?
                  </ZIonButton>
                </div>

                {/* Submit Button */}
                <ZIonButton
                  expand='block'
                  className='ion-text-capitalize mt-4'
                  onClick={() => void submitForm()}
                >
                  Log in
                </ZIonButton>

                {/* Some Text */}
                <div className='ion-text-center	mt-3 mb-4'>
                  <ZIonText className='zaions__fs_14 ' color='medium'>
                    By signing in with an account, you agree to <br />{' '}
                    {PRODUCT_NAME}
                    's{' '}
                    <ZIonRouterLink
                      routerLink={ZaionsRoutes.HomeRoute}
                      className='zaions__underline'
                      color='medium'
                    >
                      Terms of Service
                    </ZIonRouterLink>
                    ,{' '}
                    <ZIonRouterLink
                      routerLink={ZaionsRoutes.HomeRoute}
                      className='zaions__underline'
                      color='medium'
                    >
                      Privacy Policy
                    </ZIonRouterLink>{' '}
                    and{' '}
                    <ZIonRouterLink
                      routerLink={ZaionsRoutes.HomeRoute}
                      className='zaions__underline'
                      color='medium'
                    >
                      Acceptable Use Policy
                    </ZIonRouterLink>
                    .
                  </ZIonText>
                </div>
              </>
            )}
          </Formik>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZaionsLoginForm;
