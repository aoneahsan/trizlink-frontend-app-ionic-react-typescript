/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import classNames from 'classnames';

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
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonAlert, useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, validateField, zStringify } from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type workspaceInterface,
  type wsShareInterface
} from '@/types/AdminPanel/workspace';
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
  // #region Custom hooks.
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  // #endregion

  // #region APIS
  const { mutateAsync: updateWorkspaceMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.workspace_update_delete,
    _loaderMessage: MESSAGES.WORKSPACE.UPDATING_API
  });

  //
  const { mutateAsync: updateSWSMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.update_ws_share_info_data,
    _loaderMessage: MESSAGES.WORKSPACE.UPDATING_API
  });

  const { mutateAsync: leaveSWSMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.leave_share_ws,
    _loaderMessage: MESSAGES.WORKSPACE.LEAVING_WS_API
  });

  const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.workspace_update_delete,
    _loaderMessage: MESSAGES.WORKSPACE.DELETING_API
  });
  // #endregion

  // #region Functions.
  const formikSubmitHandler = async (values: string): Promise<void> => {
    try {
      if (values?.length > 0) {
        let _response;
        // Making an api call creating new workspace.
        if (
          workspaceId !== undefined &&
          workspaceId !== null &&
          workspaceId?.trim()?.length > 0
        ) {
          _response = await updateWorkspaceMutate({
            urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
            itemIds: [workspaceId],
            requestData: values
          });
        } else if (
          wsShareId !== undefined &&
          wsShareId !== null &&
          wsShareId?.trim()?.length > 0 &&
          wsShareMemberId !== undefined &&
          wsShareMemberId !== null &&
          wsShareMemberId?.trim()?.length > 0
        ) {
          _response = await updateSWSMutate({
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.shareWSId,
              CONSTANTS.RouteParams.workspace.shareWSMemberId
            ],
            itemIds: [wsShareId, wsShareMemberId],
            requestData: values
          });
        }

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<workspaceInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.id !== null) {
            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim()?.length > 0
            ) {
              // Updating current short link in cache in RQ cache.
              await updateRQCDataHandler<workspaceInterface | undefined>({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
                data: { ..._data },
                id: _data?.id ?? ''
              });
            } else if (
              wsShareId !== undefined &&
              wsShareId !== null &&
              wsShareId?.trim()?.length > 0 &&
              wsShareMemberId !== undefined &&
              wsShareMemberId !== null &&
              wsShareMemberId?.trim()?.length > 0
            ) {
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
  const deleteWorkspace = async (): Promise<void> => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
      ) {
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
  const removeWorkspace = async (): Promise<void> => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
      ) {
        const _response = await deleteWorkspaceMutate({
          itemIds: [workspaceId],
          urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId]
        });

        if (_response !== undefined) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            // getting all the shortLinks from RQ cache.
            const _oldShortLinks =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted shortLinks from cache.
            const _updatedShortLinks = _oldShortLinks.filter(
              el => el.id !== workspaceId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: _updatedShortLinks,
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
  const LeaveWorkspaceConfirmAlert = async (): Promise<void> => {
    try {
      if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        wsShareMemberId !== undefined &&
        wsShareMemberId !== null &&
        wsShareMemberId?.trim()?.length > 0
      ) {
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

  const leaveWorkspaceHandler = async (): Promise<void> => {
    try {
      if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        wsShareMemberId !== undefined &&
        wsShareMemberId !== null &&
        wsShareMemberId?.trim()?.length > 0
      ) {
        const _response = await leaveSWSMutate({
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSId,
            CONSTANTS.RouteParams.workspace.shareWSMemberId
          ],
          itemIds: [wsShareId, wsShareMemberId],
          requestData: ''
        });

        if (_response !== undefined) {
          // extracting data from _response.
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data?.success) {
            const getWSShareWorkspaceData =
              getRQCDataHandler({
                key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
              }) ?? [];

            const _oldData =
              extractInnerData<wsShareInterface[]>(
                getWSShareWorkspaceData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            const _updatedData = _oldData?.filter(
              el => el?.id !== wsShareMemberId
            );

            await updateRQCDataHandler({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN],
              data: _updatedData,
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
  // #endregion

  // #region useEffect.
  useEffect(() => {
    try {
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
      ) {
        // getting all the workspace from RQ cache.
        const _allWorkspaces =
          extractInnerData<workspaceInterface[]>(
            getRQCDataHandler<workspaceInterface[]>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
            }) as workspaceInterface[],
            extractInnerDataOptionsEnum.createRequestResponseItems
          ) ?? [];

        const _currentWorkspace = _allWorkspaces?.filter(
          el => el.id === workspaceId
        );

        setCompState(oldValues => ({
          ...oldValues,
          workspace: _currentWorkspace[0]
        }));
      } else if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0
      ) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);
  // #endregion

  return (
    <ZIonGrid className='w-full h-full pt-6'>
      <ZIonRow className='mx-auto w-[40%]'>
        <Formik
          initialValues={{
            workspaceName: compState?.workspace?.workspaceName ?? '',
            workspaceTimezone: compState?.workspace?.workspaceTimezone ?? '',
            internalPost: compState?.workspace?.internalPost ?? false
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
                    'ion-touched': touched?.workspaceName === true,
                    'ion-invalid':
                      touched?.workspaceName === true && errors?.workspaceName,
                    'ion-valid':
                      touched?.workspaceName === true &&
                      errors?.workspaceName === undefined &&
                      errors?.workspaceName === null
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
                    'ion-touched': touched?.workspaceTimezone === true,
                    'ion-invalid':
                      touched?.workspaceTimezone === true &&
                      errors?.workspaceTimezone,
                    'ion-valid':
                      touched?.workspaceTimezone === true &&
                      errors?.workspaceTimezone === undefined &&
                      errors?.workspaceTimezone === null
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
                      className='z-40'
                      content='New posts will be visible only for team members.'
                    />
                  </ZIonCol>

                  <ZIonCol className='ion-text-end'>
                    <ZRCSwitch
                      disabled={
                        wsShareId !== undefined &&
                        wsShareId !== null &&
                        wsShareId?.trim()?.length > 0 &&
                        wsShareMemberId !== undefined &&
                        wsShareMemberId !== null &&
                        wsShareMemberId?.trim()?.length > 0
                      }
                      testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.settings.internalPostToggler}-${workspaceId}`}
                      testinglistselector={
                        CONSTANTS.testingSelectors.workspace.settingsModal
                          .settings.internalPostToggler
                      }
                      onChange={value => {
                        void setFieldValue('internalPost', value, false);
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
            {workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim()?.length > 0
              ? 'Remove workspace'
              : wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                wsShareMemberId !== undefined &&
                wsShareMemberId !== null &&
                wsShareMemberId?.trim()?.length > 0
              ? 'Leave workspace'
              : null}
          </ZIonText>
          <ZIonText className='block text-sm text-muted'>
            {workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim()?.length > 0
              ? 'Remove this workspace and erase all data (posts, comments, pages etc.). This action is irreversible.'
              : wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                wsShareMemberId !== undefined &&
                wsShareMemberId !== null &&
                wsShareMemberId?.trim()?.length > 0
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
              if (
                workspaceId !== undefined &&
                workspaceId !== null &&
                workspaceId?.trim()?.length > 0
              ) {
                void deleteWorkspace();
              } else if (
                wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                wsShareMemberId !== undefined &&
                wsShareMemberId !== null &&
                wsShareMemberId?.trim()?.length > 0
              ) {
                void LeaveWorkspaceConfirmAlert();
              }
            }}>
            {workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim()?.length > 0
              ? 'Remove this workspace'
              : wsShareId !== undefined &&
                wsShareId !== null &&
                wsShareId?.trim()?.length > 0 &&
                wsShareMemberId !== undefined &&
                wsShareMemberId !== null &&
                wsShareMemberId?.trim()?.length > 0
              ? 'Leave this workspace'
              : null}
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZSettingsTab;
