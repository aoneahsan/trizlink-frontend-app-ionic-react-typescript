/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import classNames from 'classnames';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  validateField,
  zStringify
} from '@/utils/helpers';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type workspaceInterface } from '@/types/AdminPanel/workspace';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { type FormikSetErrorsType } from '@/types/ZaionsFormik.type';

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
import { ProductFaviconSmall } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZAddNewWorkspaceModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
  // Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();

  // Create new workspace API.
  const { mutateAsync: createWorkspaceMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.workspace_create_list
  });

  // Formik submit handler
  const formikSubmitHandler = async (
    values: string,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      if (values?.trim()?.length > 0) {
        // Making an api call creating new workspace.
        const _response = await createWorkspaceMutate(values);

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== undefined) {
            // getting all the workspace from RQ cache.
            const _oldWorkspaces =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // Adding newly created workspace data.
            const updatedWorkspaces = [..._oldWorkspaces, _data];

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: updatedWorkspaces,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            showSuccessNotification(MESSAGES.WORKSPACE.CREATED);

            // After updating cache dismissing modal.
            dismissZIonModal(_data.id, 'success');
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['title', 'workspaceTimezone'],
          ['title', 'timezone'],
          _apiErrors
        );

        setErrors(_errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        reportCustomError(error);
      }
    }
  };

  return (
    <ZIonContent className='ion-padding'>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonButton
          className='ion-no-padding ion-no-margin'
          fill='clear'
          color='dark'
          testingselector={
            CONSTANTS.testingSelectors.workspace.createModal.closeButton
          }
          onClick={() => {
            dismissZIonModal();
          }}>
          <ZIonIcon
            icon={closeOutline}
            className='w-7 h-7'
          />
        </ZIonButton>
      </div>

      {/*  */}
      <div className='flex flex-col ion-justify-content-center'>
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFaviconSmall}
            className='w-10 h-10 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='block mt-3 text-lg font-bold ion-text-center'>
          Create a new Workspace
        </ZIonText>

        <Formik
          initialValues={{
            title: '',
            workspaceTimezone: CONSTANTS.DEFAULT_VALUES.TIMEZONE_DEFAULT
          }}
          validate={values => {
            const errors = {};
            validateField('title', values, errors);
            return errors;
          }}
          onSubmit={(values, { setErrors }) => {
            const zStringifyData = zStringify({
              title: values.title,
              timezone: values.workspaceTimezone
            });
            void formikSubmitHandler(zStringifyData, setErrors);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            submitForm
          }) => {
            return (
              <ZIonRow className='pt-2 mt-4'>
                {/* Workspace name */}
                <ZIonCol size='12'>
                  <ZIonInput
                    name='title'
                    label='Workspace Name'
                    minHeight='40px'
                    labelPlacement='stacked'
                    placeholder='Workspace Name'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values?.title}
                    errorText={
                      touched?.title === true ? errors?.title : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.workspace.createModal.nameInput
                    }
                    className={classNames({
                      'ion-touched': touched?.title === true,
                      'ion-invalid': touched?.title === true && errors.title,
                      'ion-valid':
                        touched?.title === true &&
                        (errors.title === null || errors.title === undefined)
                    })}
                  />
                </ZIonCol>

                {/* Workspace timezone */}
                <ZIonCol size='12'>
                  <ZTimezoneSelector
                    name='workspaceTimezone'
                    className='mt-2'
                    label='Workspace timezone (Optional)'
                    labelPlacement='stacked'
                    placeholder='Workspace timezone'
                    value={values.workspaceTimezone}
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    testingselector={
                      CONSTANTS.testingSelectors.workspace.createModal
                        .timezoneInput
                    }
                  />
                </ZIonCol>

                {/* create button */}
                <ZIonCol>
                  <div
                    className={classNames({
                      'w-full mt-4': true,
                      'cursor-not-allowed': !isValid
                    })}>
                    <ZIonButton
                      expand='block'
                      className='ion-no-margin'
                      onClick={() => {
                        void submitForm();
                      }}
                      disabled={!isValid}
                      testingselector={
                        CONSTANTS.testingSelectors.workspace.createModal
                          .createButton
                      }>
                      Create
                    </ZIonButton>
                  </div>
                </ZIonCol>
              </ZIonRow>
            );
          }}
        </Formik>
      </div>
    </ZIonContent>
  );
};

export default ZAddNewWorkspaceModal;
