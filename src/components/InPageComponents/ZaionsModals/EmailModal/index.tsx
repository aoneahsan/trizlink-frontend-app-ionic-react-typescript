/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import { closeOutline } from 'ionicons/icons';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonText,
  ZIonContent,
  ZIonIcon,
  ZIonFooter,
  ZIonInput,
  ZIonButton
} from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import MESSAGES from '@/utils/messages';
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import CONSTANTS from '@/utils/constants';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
 * */
import { EmailAddressInterface } from '@/types/UserAccount/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

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
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AddEmailModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
  // #region Custom hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  const { mutateAsync: addEmailAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.addEmail,
    _loaderMessage: 'Sending OTP (One-time-password)'
  });
  // #endregion

  // #region Functions.
  const ZAddEmailHandler = async (_data: string) => {
    try {
      if (_data) {
        const __response = await addEmailAsyncMutate(_data);

        if (__response) {
          const __data = extractInnerData<EmailAddressInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data?.id) {
            // getting all the emails from RQ cache.
            const _oldUserEmails =
              extractInnerData<EmailAddressInterface[]>(
                getRQCDataHandler<EmailAddressInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS]
                }) as EmailAddressInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // Adding newly created emails data.
            const updatedUserEmails = [..._oldUserEmails, __data];

            // Updating data in RQ cache.
            await updateRQCDataHandler<EmailAddressInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.EMAILS],
              data: updatedUserEmails as EmailAddressInterface[],
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            showSuccessNotification(MESSAGES.USER.ADD_EMAIL);

            // After updating cache dismissing modal.
            dismissZIonModal();
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrorObjects = error.response?.data as {
          errors: { item: string[] };
          status: number;
        };

        const __apiErrors = __apiErrorObjects?.errors?.item;
        const __apiErrorCode = __apiErrorObjects?.status;

        if (__apiErrorCode === ZErrorCodeEnum.badRequest) {
          showErrorNotification(__apiErrors[0]);
        }
      }
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors: {
            email?: string;
          } = {};

          validateField('email', values, errors, VALIDATION_RULE.email);

          return errors;
        }}
        onSubmit={values => {
          const __zStringifyData = zStringify({
            email: values.email
          });
          void ZAddEmailHandler(__zStringifyData);
        }}>
        {({
          values,
          errors,
          isValid,
          touched,
          handleChange,
          handleBlur,
          submitForm
        }) => (
          <>
            <ZIonContent className='ion-no-padding ion-padding-horizontal'>
              <div className='mt-5'>
                <div className='flex ion-align-items-start ion-justify-content-between'>
                  <ZIonTitle className='mb-3 font-semibold ion-no-padding ion-no-margin'>
                    Add a new email address
                  </ZIonTitle>

                  <ZIonIcon
                    icon={closeOutline}
                    className='w-6 h-6 cursor-pointer'
                    onClick={() => dismissZIonModal()}
                  />
                </div>

                <ZIonText className='block'>
                  A verification six digits <b>OTP</b> (One-time-password) will
                  be sent to this email address after clicking Save. New email
                  addresses cannot be designated as primary until they have been
                  verified.
                </ZIonText>
              </div>

              {/* Email input */}
              <ZIonInput
                name='email'
                label='Email'
                minHeight='2.3rem'
                labelPlacement='stacked'
                value={values.email}
                errorText={touched.email ? errors.email : undefined}
                onIonChange={handleChange}
                onIonBlur={handleBlur}
                className={classNames({
                  'mt-5': true,
                  'ion-touched': touched.email,
                  'ion-invalid': touched.email && errors.email,
                  'ion-valid': touched.email && !errors.email
                })}
              />
            </ZIonContent>

            <ZIonFooter className='py-1 ion-text-end'>
              <ZIonButton
                className='me-4'
                fill='outline'
                onClick={() => dismissZIonModal()}>
                Cancel
              </ZIonButton>
              <div
                className={classNames({
                  'inline-block': true,
                  'cursor-not-allowed': !isValid
                })}>
                <ZIonButton
                  className='me-4'
                  disabled={!isValid}
                  color='tertiary'
                  onClick={() => {
                    if (isValid) {
                      void submitForm();
                    }
                  }}>
                  Save
                </ZIonButton>
              </div>
            </ZIonFooter>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddEmailModal;
