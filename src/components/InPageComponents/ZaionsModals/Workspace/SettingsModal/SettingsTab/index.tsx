/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';
import { alertCircleOutline, eyeOffOutline } from 'ionicons/icons';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { Formik } from 'formik';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import {
  workspaceInterface,
  wsShareInterface
} from '@/types/AdminPanel/workspace';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import classNames from 'classnames';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import MESSAGES from '@/utils/messages';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { useZIonAlert, useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZSettingsTab: React.FC<{
  workspaceId?: string; // if this is owned workspace then pass the workspaceId id so we will know its a owner
  wsShareMemberId?: string; // if this is share workspace then pass the member id so we will know its a member
  wsShareId?: string; // if this is share workspace then pass the share ws id so we will know its a member
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
}> = ({
  workspaceId,
  wsShareMemberId,
  wsShareId,
  dismissZIonModal,
  zNavigatePushRoute
}) => {
  const [compState, setCompState] = useState<{
    workspace?: workspaceInterface;
  }>({});
  //#region Custom hooks.
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  //#endregion

  //#region APIS
  const { mutateAsync: updateWorkspaceMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.workspace_update_delete,
    _queriesKeysToInvalidate: [],
    _loaderMessage: MESSAGES.WORKSPACE.UPDATING_API
  });

  //
  const { mutateAsync: updateSWSMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.update_ws_share_info_data,
    _queriesKeysToInvalidate: [],
    _loaderMessage: MESSAGES.WORKSPACE.UPDATING_API
  });

  const { mutateAsync: leaveSWSMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.leave_share_ws,
    _queriesKeysToInvalidate: [],
    _loaderMessage: MESSAGES.WORKSPACE.LEAVING_WS_API
  });

  const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.workspace_update_delete,
    _loaderMessage: MESSAGES.WORKSPACE.DELETING_API
  });
  // #endregion

  // #region Functions.
  const formikSubmitHandler = async (values: string) => {
    try {
      if (values) {
        let _response;
        // Making an api call creating new workspace.
        if (workspaceId) {
          _response = await updateWorkspaceMutate({
            urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
            itemIds: [workspaceId],
            requestData: values
          });
        } else if (wsShareId && wsShareMemberId) {
          _response = await updateSWSMutate({
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSId,
              CONSTANTS.RouteParams.workspace.shareWSMemberId
            ],
            itemIds: [wsShareId, wsShareMemberId],
            requestData: values
          });
        }

        if (_response) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data && _data.id) {
            if (workspaceId) {
              // Updating current short link in cache in RQ cache.
              await updateRQCDataHandler<workspaceInterface | undefined>({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
                data: { ..._data },
                id: _data.id
              });
            } else if (wsShareId && wsShareMemberId) {
              await updateRQCDataHandler<workspaceInterface | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
                  wsShareId
                ],
                data: { ..._data },
                updateHoleData: true,
                extractType: ZRQGetRequestExtractEnum.extractItem,
                id: ''
              });
            }

            setCompState(oldValues => ({
              ...oldValues,
              workspace: _data
            }));

            showSuccessNotification(MESSAGES.WORKSPACE.UPDATED);
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when user went to delete workspace and click on the delete button this function will fire and show the confirm alert.
  const deleteWorkspace = async () => {
    try {
      if (workspaceId) {
        await presentZIonAlert({
          header: MESSAGES.WORKSPACE.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.WORKSPACE.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.WORKSPACE.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void removeWorkspace();
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  // on the delete workspace confirm alert, when user click on delete button this function will firs which will trigger delete request and delete the workspace.
  const removeWorkspace = async () => {
    try {
      if (workspaceId) {
        const _response = await deleteWorkspaceMutate({
          itemIds: [workspaceId],
          urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
        });

        if (_response) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data && _data?.success) {
            // getting all the shortLinks from RQ cache.
            const _oldShortLinks =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // removing deleted shortLinks from cache.
            const _updatedShortLinks = _oldShortLinks.filter(
              el => el.id !== workspaceId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: _updatedShortLinks as workspaceInterface[],
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            showSuccessNotification(MESSAGES.WORKSPACE.DELETED);

            dismissZIonModal();
          } else {
            showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
          }
        }
      } else {
        void presentZIonErrorAlert();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // when member went to leave workspace and click on the leave button this function will fire and show the confirm alert.
  const LeaveWorkspaceConfirmAlert = async () => {
    try {
      if (wsShareId && wsShareMemberId) {
        await presentZIonAlert({
          header: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.HEADER,
          subHeader: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.SUB_HEADER,
          message: MESSAGES.WORKSPACE.LEAVE_WS_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Leave',
              cssClass: 'zaions_ion_color_danger',
              role: 'danger',
              handler: () => {
                void leaveWorkspaceHandler();
              }
            }
          ]
        });
      } else {
        await presentZIonErrorAlert();
      }
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  const leaveWorkspaceHandler = async () => {
    try {
      if (wsShareId && wsShareMemberId) {
        const _response = await leaveSWSMutate({
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSId,
            CONSTANTS.RouteParams.workspace.shareWSMemberId
          ],
          itemIds: [wsShareId, wsShareMemberId],
          requestData: ''
        });

        if (_response) {
          // extracting data from _response.
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.success) {
            const getWSShareWorkspaceData =
              getRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
              }) || [];

            const __oldData =
              extractInnerData<wsShareInterface[]>(
                getWSShareWorkspaceData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            const __updatedData = __oldData?.filter(
              el => el?.id !== wsShareMemberId
            );

            await updateRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
              data: __updatedData,
              id: '',
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItems
            });

            dismissZIonModal();

            zNavigatePushRoute(ZaionsRoutes.AdminPanel.Workspaces.Main);
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  //#endregion

  // #region useEffect.
  useEffect(() => {
    try {
      if (workspaceId) {
        // getting all the workspace from RQ cache.
        const _allWorkspaces =
          extractInnerData<workspaceInterface[]>(
            getRQCDataHandler<workspaceInterface[]>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
            }) as workspaceInterface[],
            extractInnerDataOptionsEnum.createRequestResponseItems
          ) || [];

        const _currentWorkspace = _allWorkspaces.filter(
          el => el.id === workspaceId
        );

        setCompState(oldValues => ({
          ...oldValues,
          workspace: _currentWorkspace[0]
        }));
      } else if (wsShareId && wsShareMemberId) {
        // getting all the workspace from RQ cache.
        const _currentShareWorkspace = extractInnerData<workspaceInterface>(
          getRQCDataHandler<workspaceInterface>({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
              wsShareId
            ]
          }) as workspaceInterface,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        setCompState(oldValues => ({
          ...oldValues,
          workspace: _currentShareWorkspace
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [workspaceId]);
  // #endregion

  return (
    <ZIonGrid className='w-full h-full pt-6'>
      <ZIonRow className='mx-auto w-[40%]'>
        <Formik
          initialValues={{
            workspaceName: compState.workspace?.workspaceName || '',
            workspaceTimezone: compState.workspace?.workspaceTimezone || '',
            internalPost: compState.workspace?.internalPost || false
          }}
          enableReinitialize={true}
          validate={values => {
            const errors = {};
            validateField('workspaceName', values, errors);
            return errors;
          }}
          onSubmit={async values => {
            try {
              const zStringifyData = zStringify({
                title: values.workspaceName,
                timezone: values.workspaceTimezone,
                internalPost: values.internalPost
              });
              await formikSubmitHandler(zStringifyData);
            } catch (error) {
              reportCustomError(error);
            }
          }}>
          {({
            values,
            errors,
            touched,
            initialValues,
            handleChange,
            handleBlur,
            setFieldValue,
            submitForm
          }) => {
            return (
              <ZIonCol size='12'>
                <ZIonInput
                  label='Workspace Name'
                  labelPlacement='stacked'
                  placeholder='Workspace Name'
                  minHeight='2.5rem'
                  name='workspaceName'
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  errorText={errors.workspaceName}
                  value={values.workspaceName}
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.workspaceNameInput}-${workspaceId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.settings
                      .workspaceNameInput
                  }
                  className={classNames({
                    z_ion_bg_white: true,
                    'ion-touched': touched.workspaceName,
                    'ion-invalid': errors.workspaceName,
                    'ion-valid': !errors.workspaceName
                  })}
                />

                <ZTimezoneSelector
                  labelPlacement='stacked'
                  label='Workspace timezone (Optional)'
                  placeholder='Workspace timezone'
                  name='workspaceTimezone'
                  value={values.workspaceTimezone}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.workspaceTimezoneInput}-${workspaceId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.settings
                      .workspaceTimezoneInput
                  }
                  className={classNames({
                    'pt-2 z_ion_bg_white ion-margin-top': true,
                    'ion-touched': touched.workspaceTimezone,
                    'ion-invalid': errors.workspaceTimezone,
                    'ion-valid': !errors.workspaceTimezone
                  })}
                />

                <ZIonRow className='pt-4 ion-align-items-center'>
                  <ZIonCol
                    size='max-content'
                    className='flex ion-align-items-center'>
                    <ZIonIcon
                      icon={eyeOffOutline}
                      className='w-6 h-6 me-2'
                    />
                    <ZIonText>Create new posts as internal</ZIonText>
                    <ZIonIcon
                      icon={alertCircleOutline}
                      className='w-6 h-6 cursor-pointer ms-2'
                      id='z-workspace-internal-post'
                      testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.internalPostInfoButton}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.settingsModal
                          .settings.internalPostInfoButton
                      }
                    />
                    <ZRTooltip
                      anchorSelect='#z-workspace-internal-post'
                      place='bottom'
                      className='z-40 bg-white'
                      content='New posts will be visible only for team members.'
                    />
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      disabled={wsShareId && wsShareMemberId ? true : false}
                      testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.internalPostToggler}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.settingsModal
                          .settings.internalPostToggler
                      }
                      onChange={value => {
                        setFieldValue('internalPost', value, false);
                      }}
                    />
                  </ZIonCol>
                </ZIonRow>

                <div className='flex w-full mt-2 ion-justify-content-end'>
                  <div
                    className={classNames({
                      'w-max': true,
                      'cursor-not-allowed':
                        values?.workspaceName?.trim()?.length === 0 ||
                        values?.workspaceTimezone?.trim()?.length === 0 ||
                        (values.workspaceName ===
                          compState.workspace?.workspaceName &&
                          values.workspaceTimezone ===
                            compState.workspace?.workspaceTimezone &&
                          values.internalPost === initialValues?.internalPost)
                    })}>
                    <ZIonButton
                      testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.updateButton}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.settingsModal
                          .settings.updateButton
                      }
                      disabled={
                        values?.workspaceName?.trim()?.length === 0 ||
                        values?.workspaceTimezone?.trim()?.length === 0 ||
                        (values.workspaceName ===
                          compState.workspace?.workspaceName &&
                          values.workspaceTimezone ===
                            compState.workspace?.workspaceTimezone &&
                          values.internalPost === initialValues?.internalPost)
                      }
                      onClick={() => {
                        if (
                          values?.workspaceName?.trim()?.length > 0 ||
                          values?.workspaceTimezone?.trim()?.length > 0 ||
                          (values.workspaceName !==
                            compState.workspace?.workspaceName &&
                            values.workspaceTimezone !==
                              compState.workspace?.workspaceTimezone &&
                            values.internalPost !== initialValues?.internalPost)
                        ) {
                          void submitForm();
                        }
                      }}>
                      Update
                    </ZIonButton>
                  </div>
                </div>
              </ZIonCol>
            );
          }}
        </Formik>

        <ZIonCol
          size='12'
          className='mt-2'>
          <ZIonText className='block text-lg'>
            {workspaceId
              ? 'Remove workspace'
              : wsShareId && wsShareMemberId
              ? 'Leave workspace'
              : null}
          </ZIonText>
          <ZIonText className='block text-sm text-muted'>
            {workspaceId
              ? 'Remove this workspace and erase all data (posts, comments, pages etc.). This action is irreversible.'
              : wsShareId && wsShareMemberId
              ? 'If you choose to leave this workspace you will lose access to all data (posts, comments, pages, etc.). You can regain your access in the future if someone else will invite you back in the workspace.'
              : null}
          </ZIonText>

          <ZIonButton
            color='danger'
            className='mt-2 normal-case ion-no-margin'
            testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.deleteButton}-${workspaceId}`}
            testinglistselector={
              CONSTANTS.testingSelectors.workspace.settingsModal.settings
                .deleteButton
            }
            onClick={() => {
              if (workspaceId) {
                void deleteWorkspace();
              } else if (wsShareId && wsShareMemberId) {
                void LeaveWorkspaceConfirmAlert();
              }
            }}>
            {workspaceId
              ? 'Remove this workspace'
              : wsShareId && wsShareMemberId
              ? 'Leave this workspace'
              : null}
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZSettingsTab;
