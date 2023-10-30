/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  ellipsisHorizontalOutline,
  pencilOutline,
  trashBinOutline
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCreateWorkspaceBtn from '@/components/AdminPanelComponents/Workspace/ZCreateWorkspaceBtn';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';
import {
  ZIonIcon,
  ZIonItem,
  ZIonItemDivider,
  ZIonItemGroup,
  ZIonLabel,
  ZIonList,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZIonAlert,
  useZIonModal,
  useZIonPopover
} from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { createRedirectRoute, extractInnerData } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  workspaceInterface,
  workspaceSettingsModalTabEnum,
  wsShareInterface
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

const ZWorkspacesListPopover: React.FC<{
  workspaceId: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  dismissZIonPopover: (data: string, role: string) => void;
  zNavigatePushRoute: (_url: string) => void;
}> = ({
  workspaceId,
  shareWSMemberId,
  wsShareId,
  dismissZIonPopover,
  zNavigatePushRoute
}) => {
  // #region Comp state.
  const [compState, setCompState] = useState<{
    _workspaceId: string;
  }>({
    _workspaceId: ''
  });
  // #endregion

  // #region Custom hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  // #endregion

  // #region Popover.
  const { presentZIonPopover: presentZWorkspaceActionPopover } = useZIonPopover(
    ZWorkspaceActionPopover,
    {
      workspaceId: compState._workspaceId,
      _paramsWorkspaceId: workspaceId,
      _parentPopoverDismiss: dismissZIonPopover
    }
  );
  // #endregion

  const workspacesList =
    extractInnerData<workspaceInterface[]>(
      getRQCDataHandler<workspaceInterface[]>({
        key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
      }) as workspaceInterface[],
      extractInnerDataOptionsEnum.createRequestResponseItems
    ) || [];

  const sharedWorkspacesList =
    extractInnerData<wsShareInterface[]>(
      getRQCDataHandler<wsShareInterface[]>({
        key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
      }) as wsShareInterface[],
      extractInnerDataOptionsEnum.createRequestResponseItems
    ) || [];

  return (
    <div className='py-1'>
      <ZIonList lines='none'>
        <ZIonItemGroup>
          <ZIonItemDivider className='font-normal tracking-widest'>
            Owned workspaces
          </ZIonItemDivider>
          {workspacesList?.map(el => (
            <ZIonItem
              key={el.id}
              minHeight='2.2rem'
              className='cursor-pointer ion-activatable'
              color={workspaceId && workspaceId === el.id ? 'light' : undefined}
              testinglistselector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.singleWorkspace}-${el.id}`}
              testingselector={
                CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
                  .singleWorkspace
              }>
              <ZIonLabel
                className='w-full text-sm'
                onClick={() => {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.workspaceId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        el.id || '',
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ]
                    })
                  );
                  dismissZIonPopover('', '');
                }}>
                {el.workspaceName}
              </ZIonLabel>
              <ZIonIcon
                icon={ellipsisHorizontalOutline}
                className='cursor-pointer'
                onClick={(event: unknown) => {
                  if (el?.id) {
                    setCompState(oldValues => ({
                      ...oldValues,
                      _workspaceId: el.id!
                    }));

                    //
                    presentZWorkspaceActionPopover({
                      _event: event as Event,
                      _cssClass: 'zaions_present_folder_Action_popover_width',
                      _dismissOnSelect: false
                    });
                  }
                }}
              />
            </ZIonItem>
          ))}

          {workspacesList?.length === 0 && (
            <ZIonItem minHeight='2.2rem'>
              <ZCreateWorkspaceBtn
                className='w-full ion-no-margin'
                height='2rem'
              />
            </ZIonItem>
          )}
        </ZIonItemGroup>

        <ZIonItemGroup>
          <ZIonItemDivider className='font-normal tracking-widest'>
            Shared workspaces
          </ZIonItemDivider>

          {sharedWorkspacesList?.map(el => (
            <ZIonItem
              key={el.id}
              minHeight='2.2rem'
              className='cursor-pointer ion-activatable'
              color={
                wsShareId && wsShareId === el.workspaceId ? 'light' : undefined
              }
              testinglistselector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.singleWorkspace}-${el.id}`}
              testingselector={
                CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
                  .singleWorkspace
              }>
              <ZIonLabel
                className='w-full text-sm'
                onClick={() => {
                  zNavigatePushRoute(
                    createRedirectRoute({
                      url: ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main,
                      params: [
                        CONSTANTS.RouteParams.workspace.wsShareId,
                        CONSTANTS.RouteParams.workspace.shareWSMemberId,
                        CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio
                      ],
                      values: [
                        el.workspaceId!,
                        el.id!,
                        CONSTANTS.DEFAULT_VALUES.FOLDER_ROUTE
                      ]
                    })
                  );
                  dismissZIonPopover('', '');
                }}>
                {el.workspaceName}
              </ZIonLabel>
              <ZIonIcon
                icon={ellipsisHorizontalOutline}
                className='cursor-pointer'
                onClick={(event: unknown) => {
                  if (el?.id) {
                    setCompState(oldValues => ({
                      ...oldValues,
                      _workspaceId: el.id!
                    }));

                    //
                    presentZWorkspaceActionPopover({
                      _event: event as Event,
                      _cssClass: 'zaions_present_folder_Action_popover_width',
                      _dismissOnSelect: false
                    });
                  }
                }}
              />
            </ZIonItem>
          ))}

          {sharedWorkspacesList?.length === 0 && (
            <ZIonItem minHeight='2.2rem'>
              <ZIonText className='w-full text-sm'>
                No Share workspace found.
              </ZIonText>
            </ZIonItem>
          )}
        </ZIonItemGroup>
      </ZIonList>
    </div>
  );
};

const ZWorkspaceActionPopover: React.FC<{
  workspaceId: string;
  _paramsWorkspaceId: string;
  dismissZIonPopover: (data?: string, role?: string) => void;
  _parentPopoverDismiss: (data?: string, role?: string) => void;
  zNavigatePushRoute: (_url: string) => void;
}> = ({
  workspaceId,
  dismissZIonPopover,
  zNavigatePushRoute,
  _paramsWorkspaceId,
  _parentPopoverDismiss
}) => {
  // #region Custom hooks.
  const { presentZIonAlert } = useZIonAlert(); // hook to present alert.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #endregion

  // #region
  // delete workspace api.
  const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.workspace_update_delete
  });
  // #endregion

  // #region popovers & modals
  const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
    ZWorkspacesSettingModal,
    {
      Tab: workspaceSettingsModalTabEnum.settings,
      workspaceId: workspaceId
    }
  );

  // #endregion

  // #region Functions.
  // delete Workspace Confirm Modal.
  const deleteWorkspaceConfirmModal = async () => {
    try {
      if (workspaceId !== undefined) {
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
        showErrorNotification('Workspace id is undefined :(');
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // removeWorkspace will hit delete workspace folder api
  const removeWorkspace = async () => {
    try {
      if (workspaceId !== undefined) {
        // hitting the delete api.
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
            // getting all the workspace from RQ cache.
            const _oldWorkspaces =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) || [];

            // removing deleted workspace from cache.
            const _updatedWorkspaces = _oldWorkspaces.filter(
              el => el.id !== workspaceId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: _updatedWorkspaces as workspaceInterface[],
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            // show success message after deleting.
            showSuccessNotification(MESSAGES.WORKSPACE.DELETED);

            // Dismiss popover.
            dismissZIonPopover('redirect', 'redirect');

            // dismissing parent popover.
            _parentPopoverDismiss();

            if (_paramsWorkspaceId === workspaceId) {
              zNavigatePushRoute(ZaionsRoutes.AdminPanel.Workspaces.Main);
            }
          }
        } else {
          showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
        }

        // Dismiss popover.
        dismissZIonPopover('', '');
      } else {
        showErrorNotification('Workspace id is undefined :(');
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonList
      lines='full'
      className='ion-no-padding'>
      {/* Edit */}
      <ZIonItem
        minHeight='2.1rem'
        className='cursor-pointer ion-activatable'
        testingselector={
          CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
            .actionPopover.editWorkspace
        }
        testinglistselector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.actionPopover.editWorkspace}-${workspaceId}`}
        onClick={() => {
          // presenting modal
          presentWorkspaceSettingModal({
            _cssClass: 'workspace-setting-modal-size'
          });
          dismissZIonPopover();
        }}>
        <ZIonIcon
          icon={pencilOutline}
          className='w-5 h-5 me-2'
          color='secondary'
        />
        <ZIonText className='font-normal'>Edit</ZIonText>
      </ZIonItem>

      {/* Delete */}
      <ZIonItem
        minHeight='2.1rem'
        lines='none'
        className='cursor-pointer ion-activatable'
        testingselector={
          CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover
            .actionPopover.deleteWorkspace
        }
        testinglistselector={`${CONSTANTS.testingSelectors.topBar.workspaceSwitcherPopover.actionPopover.deleteWorkspace}-${workspaceId}`}
        onClick={() => {
          deleteWorkspaceConfirmModal();
        }}>
        <ZIonIcon
          icon={trashBinOutline}
          className='w-5 h-5 me-2'
          color='danger'
        />
        <ZIonText className='font-normal'>Delete</ZIonText>
      </ZIonItem>
    </ZIonList>
  );
};

export default ZWorkspacesListPopover;
