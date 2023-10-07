// Core Imports
import React from 'react';
// Packages Import
import { Form, Formik } from 'formik';
import { documentTextOutline, toggleOutline } from 'ionicons/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonHeader,
  ZIonNote,
  ZIonContent,
  ZIonIcon,
  ZIonFooter,
  ZIonInput,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  zStringify
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

// Images

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

// Types
import { folderState, FormMode } from '@/types/AdminPanel/index.type';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { FormikSetErrorsType, resetFormType } from '@/types/ZaionsFormik.type';
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ZIonButton } from '@/components/ZIonComponents';
import { showSuccessNotification } from '@/utils/notification';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { AxiosError } from 'axios';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ProductFavicon } from '@/assets/images';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import ZCan from '@/components/Can';

// Styles

const ZaionsAddNewFolder: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  state: folderState;
  workspaceId: string;
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonModal,
  state = folderState.shortlink,
  workspaceId,
  shareWSMemberId,
  wsShareId
}) => {
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

  // Create folder in owned workspace.
  const { mutateAsync: createFolderAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.folders_create_list,
    _queriesKeysToInvalidate: [],
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
  });

  // Create folder in share workspace.
  const { mutateAsync: createSWSFolderAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.ws_share_folder_create,
    _queriesKeysToInvalidate: [],
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId]
  });

  // Update folder in owned workspace.
  const { mutateAsync: updateFolderAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.folders_update_delete,
    _queriesKeysToInvalidate: []
  });

  // Update folder in share workspace.
  const { mutateAsync: updateSWSFolderAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ws_share_folder_get_update_delete,
    _queriesKeysToInvalidate: []
  });

  /**
   * Handle Form Submission Function
   * add a new folder function
   *  */
  const handleFormSubmit = async (
    value: string,
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ) => {
    try {
      // ADD API Request to add this new Folder to user account in DB.
      if (folderFormState.formMode === FormMode.ADD) {
        let _response;

        if (workspaceId) {
          _response = await createFolderAsyncMutate(value);
        } else if (wsShareId) {
          _response = await createSWSFolderAsyncMutate(value);
        }

        if (_response) {
          const _data = extractInnerData<LinkFolderType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data && _data.id) {
            let _oldFoldersData: LinkFolderType[] = [];

            if (workspaceId) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                    workspaceId,
                    state
                  ]
                }) as LinkFolderType[]) || [];
            } else if (wsShareId) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                    wsShareId,
                    state
                  ]
                }) as LinkFolderType[]) || [];
            }

            const _oldShortLinks =
              extractInnerData<LinkFolderType[]>(
                _oldFoldersData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // added shortLink to all shortLinks data in cache.
            const _updatedFolders = [..._oldShortLinks, _data];

            // Updating all shortLinks data in RQ cache.
            if (workspaceId) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                  workspaceId,
                  state
                ],
                data: _updatedFolders as LinkFolderType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (wsShareId) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                  wsShareId,
                  state
                ],
                data: _updatedFolders as LinkFolderType[],
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            showSuccessNotification(
              MESSAGES.GENERAL.FOLDER.NEW_FOLDER_CREATED_SUCCEED_MESSAGE
            );
          }
        }
      } else if (folderFormState.formMode === FormMode.EDIT) {
        if (folderFormState.id) {
          let _response;

          if (workspaceId) {
            _response = await updateFolderAsyncMutate({
              itemIds: [workspaceId, folderFormState.id],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
              ],
              requestData: value
            });
          } else if (wsShareId) {
            _response = await updateSWSFolderAsyncMutate({
              itemIds: [shareWSMemberId, folderFormState?.id],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
              ],
              requestData: value
            });
          }

          if (_response) {
            const _data = extractInnerData<LinkFolderType>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data && _data.id) {
              if (workspaceId) {
                // Updating current short link in cache in RQ cache.
                await updateRQCDataHandler<LinkFolderType | undefined>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                    workspaceId,
                    state
                  ],
                  data: { ..._data },
                  id: _data.id
                });
              } else if (wsShareId) {
                await updateRQCDataHandler<LinkFolderType | undefined>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                    wsShareId,
                    state
                  ],
                  data: { ..._data },
                  id: _data.id
                });
              }
            }

            showSuccessNotification(
              MESSAGES.GENERAL.FOLDER.FOLDER_UPDATED_SUCCEED_MESSAGE
            );
          }
        } else {
          throw new ZCustomError({ message: 'Not a valid folder id!' });
        }
      }

      // Close modal after action.
      dismissZIonModal();

      // Reset to default
      SetDefaultFolderState();

      // this will reset form
      if (resetForm) {
        resetForm();
      }
    } catch (error) {
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
        reportCustomError(error);
      }
    }
  };

  const SetDefaultFolderState = () => {
    // Reset to default
    setFolderFormState(oldVal => ({
      ...oldVal,
      formMode: FormMode.ADD,
      id: '',
      name: ''
    }));
  };

  // JSX Code
  return (
    <ZCan
      shareWSId={wsShareId}
      checkMode={permissionCheckModeEnum.any}
      permissionType={
        wsShareId
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        wsShareId
          ? state === folderState.shortlink
            ? [
                shareWSPermissionEnum.create_sws_sl_folder,
                shareWSPermissionEnum.update_sws_sl_folder
              ]
            : state === folderState.linkInBio
            ? [
                shareWSPermissionEnum.create_sws_lib_folder,
                shareWSPermissionEnum.update_sws_lib_folder
              ]
            : []
          : state === folderState.shortlink
          ? [permissionsEnum.create_sl_folder, permissionsEnum.update_sl_folder]
          : state === folderState.linkInBio
          ? [
              permissionsEnum.create_lib_folder,
              permissionsEnum.update_lib_folder
            ]
          : []
      }>
      <Formik
        initialValues={{
          folderName: folderFormState.name || ''
        }}
        enableReinitialize={true}
        validate={values => {
          const errors: {
            folderName?: string;
          } = {};

          if (!values.folderName) {
            errors.folderName = MESSAGES.FORM_VALIDATIONS.LINK.REQUIRED_FOLDER;
          }

          return errors;
        }}
        onSubmit={(values, { resetForm, setErrors }) => {
          const stringifyValue = zStringify({
            title: values.folderName,
            folderForModel: state
          });
          void handleFormSubmit(stringifyValue, resetForm, setErrors);
        }}>
        {({
          submitForm,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
          isSubmitting,
          touched
        }) => {
          return (
            <>
              {/**
               * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
               * default: false
               *  */}
              {appSettings.appModalsSetting.actions.showActionInModalHeader && (
                <ZIonHeader>
                  <ZIonRow className='ion-align-items-center'>
                    <ZIonCol>
                      <ZIonButton
                        color='primary'
                        className='ion-text-capitalize'
                        fill='outline'
                        testingselector={
                          CONSTANTS.testingSelectors.folder.formModal
                            .closeModalBtn
                        }
                        onClick={() => {
                          // Close the Modal
                          dismissZIonModal();
                          SetDefaultFolderState();
                        }}>
                        Close
                      </ZIonButton>
                    </ZIonCol>

                    <ZIonCol className='ion-text-end'>
                      <ZIonButton
                        type='submit'
                        color='primary'
                        fill='solid'
                        className='ion-text-capitalize'
                        testingselector={
                          CONSTANTS.testingSelectors.folder.formModal
                            .submitFormBtn
                        }
                        onClick={() => {
                          void submitForm();
                        }}>
                        {folderFormState.formMode === FormMode.ADD
                          ? 'Create'
                          : folderFormState.formMode === FormMode.EDIT
                          ? 'Update'
                          : ''}
                      </ZIonButton>
                    </ZIonCol>
                  </ZIonRow>
                  {/* {!isValid && (
									<ZIonRow>
										<ZIonCol className='ion-text-center'>
											<ZIonNote color='danger'>
												{MESSAGES.GENERAL.FORM.INVALID}
											</ZIonNote>
										</ZIonCol>
									</ZIonRow>
								)} */}
                  {/* </IonToolbar> */}
                </ZIonHeader>
              )}

              <ZIonContent className='ion-padding'>
                <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
                  <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                    <ZIonImg
                      src={ProductFavicon}
                      className='w-10 h-10 mx-auto'
                    />
                  </div>

                  <ZIonText
                    color='dark'
                    className='block mt-3 text-xl font-bold ion-text-center'>
                    {folderFormState.formMode === FormMode.ADD
                      ? 'Create a new folder'
                      : folderFormState.formMode === FormMode.EDIT
                      ? 'Rename Folder'
                      : ''}
                    <ZIonRouterLink
                      routerLink={ZaionsRoutes.HomeRoute}
                      className='mx-1'>
                      (help)
                    </ZIonRouterLink>
                  </ZIonText>
                </div>
                <Form className='px-2 mt-2'>
                  <ZIonInput
                    label='Folder name*'
                    labelPlacement='stacked'
                    minHeight='2.3rem'
                    name='folderName'
                    onIonChange={handleChange}
                    onIonBlur={handleBlur}
                    value={values.folderName}
                    errorText={
                      touched.folderName ? errors.folderName : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.folder.formModal.nameInput
                    }
                    className={classNames({
                      'mt-5': true,
                      'ion-touched': touched.folderName,
                      'ion-invalid': touched.folderName && errors.folderName,
                      'ion-valid': touched.folderName && !errors.folderName
                    })}
                  />
                </Form>
              </ZIonContent>

              {/**
               * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
               * default: true
               *  */}
              {appSettings.appModalsSetting.actions.showActionInModalFooter && (
                <ZIonFooter>
                  <ZIonRow className='mx-3 mt-1 ion-justify-content-between ion-align-items-center'>
                    <ZIonCol>
                      <ZIonButton
                        fill='outline'
                        size='default'
                        className='ion-text-capitalize'
                        testingselector={
                          CONSTANTS.testingSelectors.folder.formModal
                            .closeModalBtn
                        }
                        onClick={() => {
                          // Close The Modal
                          dismissZIonModal();
                          SetDefaultFolderState();
                        }}>
                        Close
                      </ZIonButton>
                    </ZIonCol>

                    <ZIonCol className='ion-text-end'>
                      <ZIonButton
                        id='submit-button-info'
                        fill='solid'
                        size='default'
                        className='ion-text-capitalize'
                        type='submit'
                        disabled={isSubmitting || !isValid}
                        onClick={() => void submitForm()}
                        testingselector={
                          CONSTANTS.testingSelectors.folder.formModal
                            .submitFormBtn
                        }>
                        {folderFormState.formMode === FormMode.ADD
                          ? 'Create'
                          : folderFormState.formMode === FormMode.EDIT
                          ? 'Update'
                          : ''}
                      </ZIonButton>
                    </ZIonCol>
                  </ZIonRow>
                </ZIonFooter>
              )}
            </>
          );
        }}
      </Formik>
    </ZCan>
  );
};

export default ZaionsAddNewFolder;
