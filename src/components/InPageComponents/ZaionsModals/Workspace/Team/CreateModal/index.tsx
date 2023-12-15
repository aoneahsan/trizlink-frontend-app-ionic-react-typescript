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
  ZIonText,
  ZIonTextareaShort
} from '@/components/ZIonComponents';

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
import CONSTANTS from '@/utils/constants';
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  validateField,
  zStringify
} from '@/utils/helpers';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type workspaceTeamInterface } from '@/types/AdminPanel/workspace';
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
import { ProductFavicon } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (team create modal.)
 * @type {*}
 * */

const ZWSTeamCreateModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  workspaceId: string;
}> = ({ dismissZIonModal, workspaceId }) => {
  // #region Custom hooks.
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();
  // #endregion

  // #region APIs.
  // Create new team API.
  const { mutateAsync: createWSTeamMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.workspace_team_create_list,
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _itemsIds: [workspaceId],
    _queriesKeysToInvalidate: []
  });
  // #endregion

  // #region Functions.
  // Formik submit handler
  const formikSubmitHandler = async (
    values: string,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      if (values?.trim()?.length > 0) {
        // Making an api call creating new workspace.
        const _response = await createWSTeamMutate(values);

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceTeamInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.id !== null) {
            // getting all the workspace from RQ cache.
            const _oldWorkspaceTeams =
              extractInnerData<workspaceTeamInterface[]>(
                getRQCDataHandler<workspaceTeamInterface[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
                    workspaceId
                  ]
                }) as workspaceTeamInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // Adding newly created workspace data.
            const updatedWorkspaceTeams = [..._oldWorkspaceTeams, _data];

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceTeamInterface[] | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM,
                workspaceId
              ],
              data: updatedWorkspaceTeams,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            // After updating cache dismissing modal.
            dismissZIonModal(_data.id, 'success');
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _error = error.response?.data as {
          errors: ZGenericObject;
          status: number;
        };

        const _apiErrors = _error?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['title', 'description'],
          ['title', 'description'],
          _apiErrors
        );

        setErrors(_errors);
      } else if (error instanceof ZCustomError || error instanceof Error) {
        reportCustomError(error);
      }
    }
  };
  // #endregion

  // #region Comp Constant
  const formikInitialValues = {
    title: '',
    description: ''
  };
  // #endregion

  return (
    <ZIonContent className='ion-padding'>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonIcon
          icon={closeOutline}
          className='cursor-pointer w-7 h-7'
          onClick={() => {
            dismissZIonModal();
          }}
          testingselector={
            CONSTANTS.testingSelectors.WSSettings.createModal.closeButton
          }
        />
      </div>

      <div className='flex flex-col ion-justify-content-center'>
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFavicon}
            className='w-10 h-10 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='block mt-3 text-xl font-bold ion-text-center'>
          Create a new team
        </ZIonText>

        <Formik
          initialValues={formikInitialValues}
          validate={values => {
            const errors: {
              title?: string;
              description?: string;
            } = {};
            validateField('title', values, errors);

            if (values?.title?.length > 65) {
              errors.title =
                'The title field must not be greater than 65 characters.';
            }

            if (values?.description?.length > 250) {
              errors.description =
                'The description field must not be greater than 250 characters.';
            }

            return errors;
          }}
          onSubmit={(values, { setErrors }) => {
            const zStringifyData = zStringify({
              title: values.title,
              description: values.description
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
              <ZIonRow className='mt-5'>
                {/* Title */}
                <ZIonCol size='12'>
                  <ZIonInput
                    name='title'
                    label='Title*'
                    minHeight='40px'
                    labelPlacement='stacked'
                    placeholder='Title'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.title}
                    errorText={
                      touched?.title === true ? errors?.title : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.createModal
                        .titleInput
                    }
                    className={classNames({
                      'ion-touched': touched?.title === true,
                      'ion-invalid': touched?.title === true && errors?.title,
                      'ion-valid':
                        touched?.title === true &&
                        (errors?.title?.trim()?.length === 0 ||
                          errors?.title === undefined ||
                          errors?.title === null)
                    })}
                  />
                </ZIonCol>

                {/* Description */}
                <ZIonCol size='12'>
                  <ZIonTextareaShort
                    rows={3}
                    fill='outline'
                    name='description'
                    label='Description'
                    labelPlacement='stacked'
                    autoGrow={true}
                    placeholder='Description'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.description}
                    errorText={
                      touched?.description === true
                        ? errors.description
                        : undefined
                    }
                    className={classNames({
                      'mt-1': false,
                      'ion-touched': touched?.description === true,
                      'ion-invalid':
                        touched?.description === true && errors.description,
                      'ion-valid':
                        touched?.description === true &&
                        errors.description?.trim()?.length === 0
                    })}
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.createModal
                        .descriptionTextarea
                    }
                  />
                </ZIonCol>

                {/* create button */}
                <ZIonCol>
                  <ZIonButton
                    expand='block'
                    className='mt-4 '
                    onClick={() => {
                      void submitForm();
                    }}
                    disabled={!isValid}
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.createModal
                        .submitFormBtn
                    }>
                    Create
                  </ZIonButton>
                </ZIonCol>
              </ZIonRow>
            );
          }}
        </Formik>
      </div>
    </ZIonContent>
  );
};

export default ZWSTeamCreateModal;
