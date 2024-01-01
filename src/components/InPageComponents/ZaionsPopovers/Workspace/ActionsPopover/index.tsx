/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useMemo, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  checkmarkOutline,
  peopleOutline,
  pricetagOutline,
  settingsOutline,
  timeOutline,
  trashBinOutline
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonText
} from '@/components/ZIonComponents';
import ZCan from '@/components/Can';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonAlert, useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQDeleteRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/notification';
import {
  extractInnerData,
  replaceRouteParams,
  zComponentTestingSelectorMaker
} from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type workspaceInterface,
  workspaceSettingsModalTabEnum,
  WorkspaceSharingTabEnum
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

const ZWorkspacesActionPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
  showDeleteWorkspaceOption?: boolean;
  showEditWorkspaceOption?: boolean;
  showManageUserOption?: boolean;
  workspaceId?: string;
  owned?: boolean;
  type: ZWSTypeEum;
}> = ({
  showDeleteWorkspaceOption = true,
  showEditWorkspaceOption = true,
  showManageUserOption = false,
  workspaceId,
  type = ZWSTypeEum.personalWorkspace,
  owned = true,
  dismissZIonPopover,
  zNavigatePushRoute
}) => {
  // component states
  const [modalTab, setModalTab] = useState<workspaceSettingsModalTabEnum>();

  // Custom hooks
  const { presentZIonAlert } = useZIonAlert(); // hook to present alert.
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // Modals
  const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
    ZWorkspacesSettingModal,
    {
      Tab: modalTab,
      workspaceId
    }
  );
  const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
    ZWorkspacesSharingModal,
    {
      Tab: WorkspaceSharingTabEnum.invite
    }
  );

  // delete workspace api.
  const { mutateAsync: deleteWorkspaceMutate } = useZRQDeleteRequest({
    _url: API_URL_ENUM.workspace_update_delete
  });

  const {
    _testinglistselector: deleteBtnTestinglistselector,
    _testingSelector: deleteBtnTestingSelector,
    _idSelector: deleteBtnTestingIdselector
  } = useMemo(
    () =>
      zComponentTestingSelectorMaker({
        testingidselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }delete-${workspaceId}`,
        testinglistselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }${CONSTANTS.testingSelectors.workspace.listPage.modals.deleteBtn}`,
        testingselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }${
          CONSTANTS.testingSelectors.workspace.listPage.modals.deleteBtn
        }-${workspaceId}`
      }),
    [type, workspaceId]
  );

  const {
    _testinglistselector: cancelBtnTestinglistselector,
    _testingSelector: cancelBtnTestingSelector,
    _idSelector: cancelBtnTestingIdselector
  } = useMemo(
    () =>
      zComponentTestingSelectorMaker({
        testingidselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }cancel-${workspaceId}`,
        testinglistselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }${CONSTANTS.testingSelectors.workspace.listPage.modals.cancelBtn}`,
        testingselector: `${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
            ? 'share-'
            : 'owned-'
        }${
          CONSTANTS.testingSelectors.workspace.listPage.modals.cancelBtn
        }-${workspaceId}`
      }),
    [type, workspaceId]
  );

  // delete Workspace Confirm Modal.
  const deleteWorkspaceConfirmModal = async (): Promise<void> => {
    try {
      if (workspaceId !== undefined && workspaceId !== null) {
        await presentZIonAlert({
          header: MESSAGES.WORKSPACE.DELETE_ALERT.HEADER,
          subHeader: MESSAGES.WORKSPACE.DELETE_ALERT.SUB_HEADER,
          message: MESSAGES.WORKSPACE.DELETE_ALERT.MESSAGES,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              htmlAttributes: {
                ...cancelBtnTestinglistselector,
                ...cancelBtnTestingSelector,
                ...cancelBtnTestingIdselector
              }
            },
            {
              text: 'Delete',
              role: 'danger',
              cssClass: 'zaions_ion_color_danger',
              handler: () => {
                void removeWorkspace();
              },
              htmlAttributes: {
                ...deleteBtnTestinglistselector,
                ...deleteBtnTestingSelector,
                ...deleteBtnTestingIdselector
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
  const removeWorkspace = async (): Promise<void> => {
    try {
      if (workspaceId !== undefined) {
        // hitting the delete api.
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
            // getting all the workspace from RQ cache.
            const _oldWorkspaces =
              extractInnerData<workspaceInterface[]>(
                getRQCDataHandler<workspaceInterface[]>({
                  key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
                }) as workspaceInterface[],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // removing deleted workspace from cache.
            const _updatedWorkspaces = _oldWorkspaces.filter(
              el => el.id !== workspaceId
            );

            // Updating data in RQ cache.
            await updateRQCDataHandler<workspaceInterface[] | undefined>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
              data: _updatedWorkspaces,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            // show success message after deleting.
            showSuccessNotification(MESSAGES.WORKSPACE.DELETED);
          }
        } else {
          showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
        }

        // Dismiss popover.
        dismissZIonPopover();
      } else {
        showErrorNotification('Workspace id is undefined :(');
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonList lines='none'>
      {/* Manage Users */}
      {showManageUserOption && (
        <ZIonItem
          minHeight='2.3rem'
          className='cursor-pointer ion-activatable ion-focusable'
          testingselector={
            CONSTANTS.testingSelectors.workspace.actionsPopover.manageUsers
          }
          onClick={() => {
            presentWorkspaceSharingModal({
              _cssClass: 'workspace-sharing-modal-size'
            });
          }}>
          <ZIonIcon
            icon={peopleOutline}
            className='w-5 h-5 me-2'
          />
          <ZIonText className={classNames('text-sm')}>Manage users</ZIonText>
        </ZIonItem>
      )}

      {/* Configure timetable */}
      <ZCan havePermissions={[permissionsEnum.viewAny_timeSlot]}>
        <ZIonItem
          minHeight='2.3rem'
          className='cursor-pointer ion-activatable ion-focusable '
          testingselector={
            CONSTANTS.testingSelectors.workspace.actionsPopover
              .configureTimetable
          }
          onClick={() => {
            // setting the tab with should be active in modal
            setModalTab(workspaceSettingsModalTabEnum.timetable);

            // presenting modal
            presentWorkspaceSettingModal({
              _cssClass: 'workspace-setting-modal-size'
            });

            dismissZIonPopover();
          }}>
          <ZIonIcon
            icon={timeOutline}
            className='w-5 h-5 me-2'
          />
          <ZIonText className={classNames('text-sm')}>
            Configure timetable
          </ZIonText>
        </ZIonItem>
      </ZCan>

      {/* Manage labels */}
      <ZCan havePermissions={[permissionsEnum.viewAny_label]}>
        <ZIonItem
          className='cursor-pointer ion-activatable ion-focusable'
          minHeight='2.3rem'
          testingselector={
            CONSTANTS.testingSelectors.workspace.actionsPopover.manageLabels
          }
          onClick={() => {
            // setting the tab with should be active in modal
            setModalTab(workspaceSettingsModalTabEnum.labels);

            // presenting modal
            presentWorkspaceSettingModal({
              _cssClass: 'workspace-setting-modal-size'
            });

            dismissZIonPopover();
          }}>
          <ZIonIcon
            icon={pricetagOutline}
            className='w-5 h-5 me-2'
          />
          <ZIonText className={classNames('text-sm')}>Manage labels</ZIonText>
        </ZIonItem>
      </ZCan>

      {/* Invite members */}
      <ZIonItem
        minHeight='32px'
        className='cursor-pointer ion-activatable ion-focusable'
        onClick={() => {
          zNavigatePushRoute(
            replaceRouteParams(
              ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members,
              [CONSTANTS.RouteParams.workspace.workspaceId],
              [workspaceId ?? '']
            )
          );

          dismissZIonPopover('', '');
        }}>
        <ZIonIcon
          icon={peopleOutline}
          className='w-5 h-5 me-2'
        />
        <ZIonText className={classNames('text-sm')}>Invite members</ZIonText>
      </ZIonItem>

      {/* Settings */}
      <ZCan havePermissions={[permissionsEnum.update_workspace]}>
        <ZIonItem
          minHeight='2.3rem'
          className='cursor-pointer ion-activatable ion-focusable'
          testingselector={
            CONSTANTS.testingSelectors.workspace.actionsPopover.settings
          }
          onClick={() => {
            // setting the tab with should be active in modal
            setModalTab(workspaceSettingsModalTabEnum.settings);

            // presenting modal
            presentWorkspaceSettingModal({
              _cssClass: 'workspace-setting-modal-size'
            });

            dismissZIonPopover();
          }}>
          <ZIonIcon
            icon={settingsOutline}
            className='w-5 h-5 me-2'
          />
          <ZIonText className={classNames('text-sm')}>Settings</ZIonText>
        </ZIonItem>
      </ZCan>

      {/* Approvals settings */}
      <ZIonItem
        minHeight='2.3rem'
        className='cursor-pointer ion-activatable ion-focusable'
        testingselector={
          CONSTANTS.testingSelectors.workspace.actionsPopover.approvalSettings
        }
        onClick={() => {
          // setting the tab with should be active in modal
          setModalTab(workspaceSettingsModalTabEnum.approvals);

          // presenting modal
          presentWorkspaceSettingModal({
            _cssClass: 'workspace-setting-modal-size'
          });

          dismissZIonPopover();
        }}>
        <ZIonIcon
          icon={checkmarkOutline}
          className='w-5 h-5 me-2'
        />
        <ZIonText className={classNames('text-sm')}>
          Approvals settings
        </ZIonText>
      </ZIonItem>

      {/* Edit */}
      {/* {showEditWorkspaceOption && (
        <ZCan havePermissions={[permissionsEnum.update_workspace]}>
          <ZIonItem
            minHeight='2.3rem'
            className='cursor-pointer ion-activatable ion-focusable'
            testingselector={
              CONSTANTS.testingSelectors.workspace.actionsPopover.edit
            }
            onClick={() => {
              if (workspaceId !== undefined) {
                zNavigatePushRoute(
                  createRedirectRoute({
                    url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
                    params: [
                      CONSTANTS.RouteParams.workspace.editWorkspaceIdParam
                    ],
                    values: [workspaceId],
                    routeSearchParams: {
                      tab: workspaceFormTabEnum.inviteClients
                    }
                  })
                );

                dismissZIonPopover();
              }
            }}>
            <ZIonIcon
              icon={pencilOutline}
              className='w-5 h-5 me-2'
            />
            <ZIonText className='text-sm'>Edit</ZIonText>
          </ZIonItem>
        </ZCan>
      )} */}

      {/* Delete */}
      {showDeleteWorkspaceOption && (
        <ZCan havePermissions={[permissionsEnum.delete_workspace]}>
          <ZIonItem
            minHeight='2.3rem'
            className='cursor-pointer ion-activatable ion-focusable'
            testingselector={
              CONSTANTS.testingSelectors.workspace.actionsPopover.delete
            }
            onClick={() => {
              void deleteWorkspaceConfirmModal();
            }}>
            <ZIonIcon
              icon={trashBinOutline}
              className='w-5 h-5 me-2'
              color='danger'
            />
            <ZIonText
              color='danger'
              className='text-sm'>
              Delete
            </ZIonText>
          </ZIonItem>
        </ZCan>
      )}
    </ZIonList>
  );
};

export default ZWorkspacesActionPopover;
