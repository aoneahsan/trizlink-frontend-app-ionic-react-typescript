/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { notificationsOutline, settingsOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRow
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import LogoutButton from '@/components/LogoutButton';

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

const ZWorkspaceProfilePopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string) => void;
  zNavigatePushRoute: (_url: string) => void;
}> = ({ dismissZIonPopover, zNavigatePushRoute }) => {
  // Custom hooks.
  const zUserAccountStateAtom = useRecoilValue(ZaionsUserAccountRStateAtom);

  const _userAvatarUi = {
    name: zUserAccountStateAtom?.username
  };

  return (
    <>
      <ZIonRow className='pt-2 ion-align-items-center'>
        <ZIonCol size='max-content'>
          <ZUserAvatarButton
            testingselector={
              CONSTANTS.testingSelectors.user.profilePopover.avatar
            }
            className='w-[40px] h-[40px] me-1 ms-1 border'
            userAvatar={zUserAccountStateAtom?.avatar}
            userAvatarUi={_userAvatarUi}
          />
        </ZIonCol>
        <ZIonCol>
          <ZIonLabel
            testingselector={
              CONSTANTS.testingSelectors.user.profilePopover.displayName
            }
            className={classNames({
              'text-sm font-bold flex': true
            })}>
            {zUserAccountStateAtom?.username}
          </ZIonLabel>
          <ZIonLabel
            testingselector={
              CONSTANTS.testingSelectors.user.profilePopover.email
            }
            className='block text-sm'
            color='medium'>
            {zUserAccountStateAtom?.email}
          </ZIonLabel>
        </ZIonCol>
      </ZIonRow>

      <ZIonList
        lines='full'
        className='pb-0'>
        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='32px'
          testingselector={
            CONSTANTS.testingSelectors.user.profilePopover.profileSettings
          }
          onClick={() => {
            zNavigatePushRoute(
              ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings
            );
            dismissZIonPopover();
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
            CONSTANTS.testingSelectors.user.profilePopover.notificationSettings
          }
          onClick={() => {
            zNavigatePushRoute(
              ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings
            );
            dismissZIonPopover();
          }}>
          <ZIonIcon
            icon={notificationsOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Notification settings</ZIonLabel>
        </ZIonItem>

        <LogoutButton />
      </ZIonList>
    </>
  );
};

export default ZWorkspaceProfilePopover;
