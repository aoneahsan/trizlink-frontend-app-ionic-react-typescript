// Core Imports
import React from 'react';
// Packages Import
import { Form, Formik } from 'formik';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AxiosError } from 'axios';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonHeader,
  ZIonContent,
  ZIonFooter,
  ZIonInput,
  ZIonImg,
  ZIonButton,
  ZIonIcon
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';

// Custom hooks
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Global Constants
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  zStringify
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  ZWSTypeEum
} from '@/utils/enums';
import { showSuccessNotification } from '@/utils/notification';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

// Images
import { ProductFaviconSmall } from '@/assets/images';

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';

// Types
import {
  folderState,
  FormMode,
  planFeaturesEnum
} from '@/types/AdminPanel/index.type';
import {
  type FormikSetErrorsType,
  type resetFormType
} from '@/types/ZaionsFormik.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { type LinkFolderType } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { closeOutline } from 'ionicons/icons';
import { ZUserCurrentLimitsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import { errorCodes } from '@/utils/constants/apiConstants';
import ZReachedLimitModal from '@/components/InPageComponents/ZaionsModals/UpgradeModals/ReachedLimit';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

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
  // #region Custom Hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Recoil states.
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);
  const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);
  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );
  // #endregion

  // #region Modals & Popovers
  const { presentZIonModal: presentZReachedLimitModal } =
    useZIonModal(ZReachedLimitModal);
  // #endregion

  // #region APIS.
  // Create folder
  const { mutateAsync: createFolderAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.folders_create,
    // _itemsIds: [workspaceId],
    _itemsIds:
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
        ? [ZWSTypeEum.personalWorkspace, workspaceId]
        : wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          shareWSMemberId !== undefined &&
          shareWSMemberId !== null &&
          shareWSMemberId?.trim()?.length > 0
        ? [ZWSTypeEum.shareWorkspace, shareWSMemberId]
        : [],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId
    ],
    _showAlertOnError: false
  });

  // Update folder.
  const { mutateAsync: updateFolderAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.folders_get_update_delete
  });
  // #endregion

  /**
   * Handle Form Submission Function
   * add a new folder function
   *  */
  const handleFormSubmit = async (
    value: string,
    resetForm: resetFormType,
    setErrors: FormikSetErrorsType
  ): Promise<void> => {
    try {
      // ADD API Request to add this new Folder to user account in DB.
      if (folderFormState.formMode === FormMode.ADD) {
        const _response = await createFolderAsyncMutate(value);

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<LinkFolderType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null && _data?.id !== undefined) {
            let _oldFoldersData: LinkFolderType[] = [];

            if (
              workspaceId !== null &&
              workspaceId !== undefined &&
              workspaceId?.trim()?.length > 0
            ) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                    workspaceId,
                    state
                  ]
                }) as LinkFolderType[]) ?? [];
            } else if (
              wsShareId !== null &&
              wsShareId !== undefined &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== null &&
              shareWSMemberId !== undefined &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              _oldFoldersData =
                (getRQCDataHandler<LinkFolderType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                    wsShareId,
                    shareWSMemberId,
                    state
                  ]
                }) as LinkFolderType[]) ?? [];
            }

            const _oldShortLinks =
              extractInnerData<LinkFolderType[]>(
                _oldFoldersData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // added shortLink to all shortLinks data in cache.
            const _updatedFolders = [..._oldShortLinks, _data];

            // Updating all shortLinks data in RQ cache.
            if (
              workspaceId !== null &&
              workspaceId !== undefined &&
              workspaceId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                  workspaceId,
                  state
                ],
                data: _updatedFolders,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            } else if (
              wsShareId !== null &&
              wsShareId !== undefined &&
              wsShareId?.trim()?.length > 0 &&
              shareWSMemberId !== null &&
              shareWSMemberId !== undefined &&
              shareWSMemberId?.trim()?.length > 0
            ) {
              await updateRQCDataHandler<LinkFolderType[] | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                  wsShareId,
                  shareWSMemberId,
                  state
                ],
                data: _updatedFolders,
                id: '',
                extractType: ZRQGetRequestExtractEnum.extractItems,
                updateHoleData: true
              });
            }

            // updating limit recoil sate
            if (state === folderState.shortlink) {
              setZUserCurrentLimitsRState(oldValues => ({
                ...oldValues,
                [planFeaturesEnum.shortLinksFolder]: _updatedFolders?.length
              }));
            } else if (state === folderState.linkInBio) {
              setZUserCurrentLimitsRState(oldValues => ({
                ...oldValues,
                [planFeaturesEnum.linksInBioFolder]: _updatedFolders?.length
              }));
            }

            showSuccessNotification(
              MESSAGES.GENERAL.FOLDER.NEW_FOLDER_CREATED_SUCCEED_MESSAGE
            );
          }
        }
      } else if (folderFormState.formMode === FormMode.EDIT) {
        if (folderFormState?.id !== undefined && folderFormState?.id !== null) {
          const _response = await updateFolderAsyncMutate({
            itemIds:
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.personalWorkspace,
                    workspaceId,
                    folderFormState?.id
                  ]
                : wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ? [
                    ZWSTypeEum.shareWorkspace,
                    shareWSMemberId,
                    folderFormState?.id
                  ]
                : [],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.type,
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
            ],
            requestData: value
          });

          if (_response !== undefined && _response !== null) {
            const _data = extractInnerData<LinkFolderType>(
              _response,
              extractInnerDataOptionsEnum.createRequestResponseItem
            );

            if (_data?.id !== undefined && _data?.id !== null) {
              if (
                workspaceId !== null &&
                workspaceId !== undefined &&
                workspaceId?.trim()?.length > 0
              ) {
                // Updating current short link in cache in RQ cache.
                await updateRQCDataHandler<LinkFolderType | undefined>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN,
                    workspaceId,
                    state
                  ],
                  data: { ..._data },
                  id: _data?.id
                });
              } else if (
                wsShareId !== null &&
                wsShareId !== undefined &&
                wsShareId?.trim()?.length > 0 &&
                shareWSMemberId !== undefined &&
                shareWSMemberId !== null &&
                shareWSMemberId?.trim()?.length > 0
              ) {
                await updateRQCDataHandler<LinkFolderType | undefined>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.SWS_MAIN,
                    wsShareId,
                    shareWSMemberId,
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
      if (resetForm !== undefined) {
        resetForm();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrorsCode = error.response?.status;
        if (_apiErrorsCode === errorCodes.reachedLimit) {
          presentZReachedLimitModal({
            _cssClass: 'reached-limit-modal-size'
          });

          dismissZIonModal();
        }

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
        reportCustomError(error);
      }
    }
  };

  const SetDefaultFolderState = (): void => {
    // Reset to default
    setFolderFormState(oldVal => ({
      ...oldVal,
      formMode: FormMode.ADD,
      id: '',
      name: ''
    }));
  };

  // #region Comp Constants
  const formikInitialValues = {
    folderName: folderFormState?.name ?? ''
  };
  // #endregion

  // JSX Code
  return (
    <ZCan
      shareWSId={wsShareId}
      checkMode={permissionCheckModeEnum.any}
      permissionType={
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0
          ? permissionsTypeEnum.shareWSMemberPermissions
          : permissionsTypeEnum.loggedInUserPermissions
      }
      havePermissions={
        wsShareId !== null &&
        wsShareId !== undefined &&
        wsShareId?.trim()?.length > 0
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
        initialValues={formikInitialValues}
        enableReinitialize={true}
        validate={values => {
          const errors: {
            folderName?: string;
          } = {};

          if (values?.folderName.length === 0) {
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
              {appSettings?.appModalsSetting?.actions
                ?.showActionInModalHeader && (
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
                        {folderFormState?.formMode === FormMode.ADD
                          ? 'Create'
                          : folderFormState?.formMode === FormMode.EDIT
                          ? 'Update'
                          : ''}
                      </ZIonButton>
                    </ZIonCol>
                  </ZIonRow>
                  {/* </IonToolbar> */}
                </ZIonHeader>
              )}

              <ZIonContent className='ion-padding'>
                {/* Close modal button */}
                <div className='ion-text-end'>
                  <ZIonIcon
                    icon={closeOutline}
                    className='cursor-pointer w-7 h-7'
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formModal.closeBtn
                    }
                    onClick={() => {
                      dismissZIonModal();
                    }}
                  />
                </div>

                <div className='flex flex-col ion-text-center ion-justify-content-center'>
                  <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                    <ZIonImg
                      src={ProductFaviconSmall}
                      className={classNames({
                        'mx-auto': true,
                        'w-[4rem] h-[4rem]': isSmScale,
                        'w-[3rem] h-[3rem]': !isSmScale
                      })}
                    />
                  </div>

                  <ZIonText
                    color='dark'
                    className={classNames({
                      'block mt-3 font-normal ion-text-center': true,
                      'text-2xl': isSmScale,
                      'text-xl': !isSmScale
                    })}>
                    {folderFormState?.formMode === FormMode.ADD
                      ? 'Create a new folder'
                      : folderFormState?.formMode === FormMode.EDIT
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
                      touched?.folderName === true
                        ? errors?.folderName
                        : undefined
                    }
                    testingselector={
                      CONSTANTS.testingSelectors.folder.formModal.nameInput
                    }
                    className={classNames({
                      'mt-5': true,
                      'ion-touched': touched?.folderName,
                      'ion-invalid':
                        touched?.folderName === true && errors.folderName,
                      'ion-valid':
                        touched?.folderName === true &&
                        (errors.folderName === undefined ||
                          errors?.folderName === null)
                    })}
                  />
                </Form>
              </ZIonContent>

              {/**
               * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
               * default: true
               *  */}
              {appSettings?.appModalsSetting?.actions
                ?.showActionInModalFooter && (
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
                        onClick={() => {
                          void submitForm();
                        }}
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
