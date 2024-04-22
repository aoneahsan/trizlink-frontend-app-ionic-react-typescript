/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { ellipsisHorizontalOutline, settingsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonIcon,
  ZIonItem,
  ZIonList,
  ZIonModal,
  ZIonText
} from '@/components/ZIonComponents';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';
import ZCan from '@/components/Can';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZWSTypeEum } from '@/utils/enums';
import { workspaceSettingsModalTabEnum } from '@/types/AdminPanel/workspace';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWSActionsButton: React.FC<{
  type: ZWSTypeEum;
  owned: boolean;
  workspaceId?: string;
}> = ({ type, owned, workspaceId }) => {
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<workspaceSettingsModalTabEnum>();

  // #region Custom hooks
  const { isSmScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  // #region Popovers & Modals
  const { presentZIonPopover: presentWorkspacesActionsPopover } =
    useZIonPopover(ZWorkspacesActionPopover, {
      workspaceId,
      owned,
      type
    }); // popover hook to show UserInfoPopover

  const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
    ZWorkspacesSettingModal,
    {
      Tab: modalTab,
      workspaceId
    }
  );
  // #endregion

  // #region Functions
  const closeSheetModal = useCallback(() => {
    setIsSheetModalOpen(() => false);
  }, []);
  // #endregion

  return (
    <>
      <ZIonButton
        minHeight='auto'
        expand={!isSmScale ? 'block' : undefined}
        fill={isSmScale ? 'clear' : 'outline'}
        className={classNames({
          'overflow-hidden normal-case h-6 ion-no-padding ion-no-margin': true,
          'w-6 rounded-full': isSmScale,
          'm-1 mt-2': !isSmScale
        })}
        color={isSmScale ? 'dark' : 'secondary'}
        onClick={(event: unknown) => {
          if (isMdScale) {
            presentWorkspacesActionsPopover({
              _event: event as Event,
              _cssClass: 'zaions_workspaces_actions_popover_size',
              _dismissOnSelect: false
            });
          } else {
            setIsSheetModalOpen(() => true);
          }
        }}
        // Testing attributes
        testingidselector={`${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
        }${workspaceId}`}
        testingselector={`${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
        }${
          CONSTANTS.testingSelectors.workspace.listPage
            .workspaceCardActionPopoverButton
        }-${workspaceId}`}
        testinglistselector={`${
          type === ZWSTypeEum.favoriteWorkspace
            ? 'favorite-'
            : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
        }${
          CONSTANTS.testingSelectors.workspace.listPage
            .workspaceCardActionPopoverButton
        }`}>
        <ZIonIcon icon={ellipsisHorizontalOutline} />
      </ZIonButton>

      {/* Sheet Modal shown below Md screen */}
      <ZIonModal
        isOpen={isSheetModalOpen}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className='z-ion-height-auto'
        onDidDismiss={() => {
          closeSheetModal();
        }}>
        <ZIonList lines='none'>
          {/* Settings */}
          <ZCan havePermissions={[permissionsEnum.update_workspace]}>
            <ZIonItem
              minHeight='2.3rem'
              className='cursor-pointer ion-activatable ion-focusable'
              testingidselector={`${
                type === ZWSTypeEum.favoriteWorkspace
                  ? 'favorite-'
                  : type === ZWSTypeEum.shareWorkspace
                    ? 'share-'
                    : 'owned-'
              }${workspaceId}`}
              testingselector={`${
                type === ZWSTypeEum.favoriteWorkspace
                  ? 'favorite-'
                  : type === ZWSTypeEum.shareWorkspace
                    ? 'share-'
                    : 'owned-'
              }${
                CONSTANTS.testingSelectors.workspace.actionsPopover.settings
              }-${workspaceId}`}
              testinglistselector={`${
                type === ZWSTypeEum.favoriteWorkspace
                  ? 'favorite-'
                  : type === ZWSTypeEum.shareWorkspace
                    ? 'share-'
                    : 'owned-'
              }${CONSTANTS.testingSelectors.workspace.actionsPopover.settings}`}
              onClick={() => {
                // setting the tab with should be active in modal
                setModalTab(workspaceSettingsModalTabEnum.settings);

                // presenting modal
                presentWorkspaceSettingModal({
                  _cssClass: 'workspace-setting-modal-size'
                });

                closeSheetModal();
              }}>
              <ZIonIcon
                icon={settingsOutline}
                className='w-5 h-5 me-2'
              />
              <ZIonText className={classNames('text-sm')}>Settings</ZIonText>
            </ZIonItem>
          </ZCan>
        </ZIonList>
      </ZIonModal>
    </>
  );
};

export default ZWSActionsButton;
