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
import { IonRadio, IonRadioGroup } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonContent,
  ZIonIcon,
  ZIonItem,
  ZIonFooter,
  ZIonList,
  ZIonButton,
  ZIonTitle,
  ZIonInput
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import CONSTANTS, { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { ZCustomError, reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { zAxiosApiRequest, zStringify } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsAuthToken } from '@/ZaionsStore/UserAccount/index.recoil';

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
 * ? Like if you have a type for props it should be placed Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const DeleteUserAccountModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute?: (_url: string) => void;
}> = ({ dismissZIonModal, zNavigatePushRoute }) => {
  const authToken = useRecoilValue(ZaionsAuthToken);

  const handleFormSubmit = async (values: {
    confirm: string;
    reason: string;
  }): Promise<void> => {
    try {
      await presentZIonLoader(MESSAGES.GENERAL.DELETING_ACCOUNT);
      if (authToken !== null || authToken !== undefined) {
        try {
          await zAxiosApiRequest({
            _url: API_URL_ENUM.delete,
            _method: 'post',
            _isAuthenticatedRequest: true,
            _data: zStringify({
              accountDeleteReason: values.reason
            })
          });
        } catch (_error) {
          throw new ZCustomError({ message: (_error as Error).message });
        }
      } else {
        throw new ZCustomError({ message: MESSAGES.GENERAL.INVALID_REQUEST });
      }

      await dismissZIonLoader();

      dismissZIonModal();

      showSuccessNotification(
        MESSAGES.GENERAL.USER_ACCOUNT_SUCCESS_DELETE_MESSAGE
      );

      zNavigatePushRoute !== undefined &&
        zNavigatePushRoute(ZaionsRoutes.HomeRoute);
    } catch (error) {
      reportCustomError({
        errorPlacement: 'From DeleteUserAccountModal - formik - onSubmit',
        error
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  // #region Comp Constants
  const formikInitialValues = { confirm: '', reason: '' };
  // #endregion

  return (
    <>
      <Formik
        initialValues={formikInitialValues}
        validate={values => {
          const errors: {
            confirm?: string;
            reason?: string;
          } = {};

          if (
            values?.confirm?.trim().length === 0 ||
            values?.confirm?.trim() !==
              CONSTANTS.USER_ACCOUNT_DELETE_CONFIRM_KEY
          ) {
            errors.confirm = MESSAGES.GENERAL.DELETE_USER_ACCOUNT_CONFIRM;
          }

          if (values?.reason?.length === 0) {
            errors.reason = MESSAGES.GENERAL.DELETE_USER_ACCOUNT_REASON;
          }
          return errors;
        }}
        onSubmit={async values => {
          await handleFormSubmit(values);
        }}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          submitForm,
          setFieldValue,
          isValid,
          touched
        }) => {
          return (
            <>
              <ZIonContent className='ion-padding-vertical'>
                <ZIonRow className='ion-no-padding ion-no-margin'>
                  <ZIonCol className='flex ion-justify-content-end ion-align-items-start ion-no-padding ion-no-margin'>
                    <ZIonButton
                      fill='clear'
                      className='ion-no-padding ion-no-margin me-2'
                      color='dark'
                      onClick={() => {
                        dismissZIonModal();
                      }}>
                      <ZIonIcon
                        icon={closeOutline}
                        size='large'
                      />
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
                <ZIonRow className='ion-no-padding'>
                  <ZIonCol className='flex flex-col px-4 pt-0 ion-justify-content-end ms-2'>
                    <ZIonTitle className='mb-3 ion-no-padding'>
                      <h3 className='font-bold'>Delete user account</h3>
                    </ZIonTitle>
                    <ZIonText className='block font-bold text-[16px]'>
                      How your account will be affected:
                    </ZIonText>
                    <ZIonList
                      lines='none'
                      className='ion-no-padding zaions__dotted_list'>
                      <ZIonItem className='ion-no-padding'>
                        Your login will be deactivated
                      </ZIonItem>
                      <ZIonItem className='ion-no-padding ion-align-items-start'>
                        All your personally identifiable information (PII) will
                        be permanently deleted from our servers
                      </ZIonItem>
                      <ZIonItem className='mt-2 ion-no-padding ion-align-items-start'>
                        Integrations using your user information, such as access
                        tokens, will be disconnected from {PRODUCT_NAME}
                      </ZIonItem>
                      <ZIonItem className='ion-no-padding'>
                        Any paid plan subscription will be canceled and billing
                        will stop
                      </ZIonItem>
                    </ZIonList>

                    <ZIonText className='block font-bold text-[16px] mt-3'>
                      How your links will be affected:
                    </ZIonText>
                    <ZIonList
                      lines='none'
                      className='ion-no-padding zaions__dotted_list'>
                      <ZIonItem className='ion-no-padding'>
                        Your links will not be deleted or deactivated
                      </ZIonItem>
                      <ZIonItem className='ion-no-padding'>
                        Links using the ${PRODUCT_DOMAIN} domain will continue
                        to function
                      </ZIonItem>
                      <ZIonItem className='mt-2 ion-no-padding ion-align-items-start'>
                        Links branded with a {PRODUCT_NAME} complimentary domain
                        will continue to function for one year from your sign up
                        date, and then they will lead to an error page
                      </ZIonItem>
                      <ZIonItem className='mt-2 ion-no-padding ion-align-items-start'>
                        Links branded with your own custom domain will continue
                        to function as long as the domain&apos;s DNS records
                        point to
                        {PRODUCT_NAME}&apos;s servers
                      </ZIonItem>
                      <ZIonItem className='ion-no-padding'>
                        Your name will not appear next to links you&apos;ve
                        created
                      </ZIonItem>

                      <ZIonText className='block font-bold text-[16px] mt-3'>
                        We&apos;re sad to see you go. Can you tell us why
                        you&apos;re leaving?
                      </ZIonText>
                    </ZIonList>
                    <ZIonList lines='none'>
                      <IonRadioGroup>
                        <ZIonItem>
                          <IonRadio
                            className='me-2'
                            onClick={() => {
                              void setFieldValue(
                                'reason',
                                `I have another ${PRODUCT_NAME} account`
                              );
                            }}
                          />
                          <ZIonText>
                            I have another {PRODUCT_NAME} account
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem>
                          <IonRadio
                            className='me-2'
                            onClick={() => {
                              void setFieldValue(
                                'reason',
                                `I have privacy concerns using ${PRODUCT_NAME}`
                              );
                            }}
                          />
                          <ZIonText>
                            I have privacy concerns using {PRODUCT_NAME}
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem>
                          <IonRadio
                            className='me-2'
                            onClick={() => {
                              void setFieldValue(
                                'reason',
                                `I no longer find  ${PRODUCT_NAME} useful`
                              );
                            }}
                          />
                          <ZIonText>
                            I no longer find {PRODUCT_NAME} useful
                          </ZIonText>
                        </ZIonItem>
                        <ZIonItem>
                          <IonRadio
                            className='me-2'
                            onClick={() => {
                              void setFieldValue('reason', 'Other');
                            }}
                          />
                          <ZIonText>Other</ZIonText>
                        </ZIonItem>
                        {values.reason === 'Other' && (
                          <ZIonInput
                            label='Specify reason'
                            labelPlacement='floating'
                            name='reason'
                            onIonChange={handleChange}
                            onIonBlur={handleBlur}
                            value={values.reason}
                            errorText={errors.reason}
                            type='text'
                            color='dark'
                            className={classNames({
                              'ion-margin-start mt-3': true,
                              'ion-touched': touched?.reason === true,
                              'ion-invalid':
                                touched?.reason === true && errors?.reason,
                              'ion-valid':
                                touched?.reason === true &&
                                (errors?.reason === null ||
                                  errors?.reason === undefined)
                            })}
                          />
                        )}
                      </IonRadioGroup>
                    </ZIonList>

                    <ZIonText className='font-bold text-[16px] mt-4'>
                      To permanently delete your account, enter &apos;
                      {CONSTANTS.USER_ACCOUNT_DELETE_CONFIRM_KEY}&apos; below,
                      and then select Delete account.
                    </ZIonText>

                    <ZIonInput
                      label='Enter Key'
                      labelPlacement='floating'
                      name='confirm'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.confirm}
                      errorText={errors.confirm}
                      type='text'
                      color='dark'
                      className={classNames({
                        'mt-3': true,
                        'ion-touched': touched?.confirm === true,
                        'ion-invalid':
                          touched?.confirm === true && errors.confirm,
                        'ion-valid':
                          touched?.confirm === true &&
                          (errors.confirm === null ||
                            errors.confirm === undefined)
                      })}
                    />
                  </ZIonCol>
                </ZIonRow>
              </ZIonContent>
              <ZIonFooter className='py-2 ion-text-end'>
                <ZIonButton
                  className='me-4'
                  fill='outline'
                  onClick={() => {
                    dismissZIonModal();
                  }}>
                  Cancel
                </ZIonButton>
                <ZIonButton
                  className='me-4'
                  color='danger'
                  onClick={() => {
                    if (isValid) {
                      void submitForm();
                    }
                  }}
                  disabled={!isValid}>
                  Delete account
                </ZIonButton>
              </ZIonFooter>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default DeleteUserAccountModal;
