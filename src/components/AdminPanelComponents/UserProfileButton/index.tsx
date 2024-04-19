/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useMemo, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceProfilePopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ProfilePopover';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import {
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonModal
} from '@/components/ZIonComponents';
import { notificationsOutline, settingsOutline } from 'ionicons/icons';
import LogoutButton from '@/components/LogoutButton';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

const ZUserProfileButton: React.FC<{
  width?: string;
  height?: string;
}> = ({ width = '2.75rem', height = '2.75rem' }) => {
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  // #region Custom hooks.
  const { isMdScale } = useZMediaQueryScale();
  const { zNavigatePushRoute } = useZNavigate();
  // #endregion

  // #region Popovers.
  const { presentZIonPopover: presentWorkspaceProfilePopover } = useZIonPopover(
    ZWorkspaceProfilePopover
  ); // popover hook to show ZWorkspaceProfilePopover
  // #endregion

  // #region Recoil states.
  const zUserAccountStateAtom = useRecoilValue(ZaionsUserAccountRStateAtom);
  // #endregion

  // #region Comp constants
  const _style = useMemo(() => ({ height, width }), [height, width]);
  const userAvatarUi = useMemo(
    () => ({
      name: zUserAccountStateAtom?.username
    }),
    [zUserAccountStateAtom?.username]
  );
  // #endregion

  // #region Functions
  const closeSheetModal = useCallback(() => {
    setIsSheetModalOpen(() => false);
  }, []);
  // #endregion

  return (
    <>
      <ZUserAvatarButton
        userAvatar={zUserAccountStateAtom?.avatar}
        userAvatarUi={userAvatarUi}
        style={_style}
        onClick={(event: unknown) => {
          if (isMdScale) {
            presentWorkspaceProfilePopover({
              _event: event as Event,
              _cssClass: 'zaions_workspaces_profile_popover_size',
              _dismissOnSelect: false
            });
          } else {
            setIsSheetModalOpen(() => true);
          }
        }}
      />

      {/* Sheet Modal shown below Md screen */}
      <ZIonModal
        isOpen={isSheetModalOpen}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className='z-ion-height-auto'
        onDidDismiss={() => {
          closeSheetModal();
        }}>
        <div className='flex items-center gap-1 px-3 pt-4'>
          <ZUserAvatarButton
            className='w-[2.5rem] h-[2.5rem] me-1 ms-1 border'
            userAvatar={zUserAccountStateAtom?.avatar}
            userAvatarUi={userAvatarUi}
            testingselector={
              CONSTANTS.testingSelectors.user.profileSheetModal.avatar
            }
          />

          <div>
            <ZIonLabel
              testingselector={
                CONSTANTS.testingSelectors.user.profileSheetModal.displayName
              }
              className={classNames({
                'text-sm font-bold flex': true
              })}>
              {zUserAccountStateAtom?.username}
            </ZIonLabel>
            <ZIonLabel
              testingselector={
                CONSTANTS.testingSelectors.user.profileSheetModal.email
              }
              className='block text-sm'
              color='medium'>
              {zUserAccountStateAtom?.email}
            </ZIonLabel>
          </div>
        </div>

        <ZIonList lines='full'>
          <ZIonItem
            className='text-sm cursor-pointer ion-activatable ion-focusable'
            minHeight='32px'
            testingselector={
              CONSTANTS.testingSelectors.user.profileSheetModal.profileSettings
            }
            onClick={() => {
              zNavigatePushRoute(
                ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings
              );
              closeSheetModal();
            }}>
            <ZIonIcon
              icon={settingsOutline}
              className='w-5 h-5 me-2'
            />
            <ZIonLabel className='pt-1'>Profile settings</ZIonLabel>
          </ZIonItem>

          <ZIonItem
            className='text-sm cursor-pointer ion-activatable ion-focusable'
            minHeight='40px'
            testingselector={
              CONSTANTS.testingSelectors.user.profileSheetModal
                .notificationSettings
            }
            onClick={() => {
              zNavigatePushRoute(
                ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings
              );
              closeSheetModal();
            }}>
            <ZIonIcon
              icon={notificationsOutline}
              className='w-5 h-5 me-1 pe-1'
            />
            <ZIonLabel className='pt-1 my-0'>Notification settings</ZIonLabel>
          </ZIonItem>

          <LogoutButton />
        </ZIonList>
      </ZIonModal>
    </>
  );
};

export default ZUserProfileButton;
