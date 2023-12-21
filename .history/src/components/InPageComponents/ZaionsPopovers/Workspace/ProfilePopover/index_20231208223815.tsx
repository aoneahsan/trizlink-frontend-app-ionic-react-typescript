/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  logOutOutline,
  notificationsOutline,
  settingsOutline
} from 'ionicons/icons';
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
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading
} from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { STORAGE, zAxiosApiRequest } from '@/utils/helpers';
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
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
import MESSAGES from '@/utils/messages';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';

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
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(); // hook to show loader
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();

  const zUserAccountStateAtom = useRecoilValue(ZaionsUserAccountRStateAtom);

  // logout confirm alert.
  const ZLogoutAlert = async (): Promise<void> => {
    try {
      await presentZIonAlert({
        header: MESSAGES.Logout.LOGOUT_ALERT.HEADER,
        subHeader: MESSAGES.Logout.LOGOUT_ALERT.SUB_HEADER,
        message: MESSAGES.Logout.LOGOUT_ALERT.MESSAGES,
        buttons: [
          {
            text: 'Close',
            role: 'cancel'
          },
          {
            text: 'Logout',
            cssClass: 'zaions_ion_color_danger',
            role: 'danger',
            handler: () => {
              void profileLogoutHandler();
            }
          }
        ]
      });
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  const profileLogoutHandler = async (): Promise<void> => {
    try {
      // Loading start...
      await presentZIonLoader('Logging out. please wait a second.');

      // logout user
      const _response = await zAxiosApiRequest<{
        data: { isSuccess: boolean };
      }>({
        _url: API_URL_ENUM.logout,
        _method: 'post',
        _isAuthenticatedRequest: false
      });

      if (_response?.data.isSuccess === true) {
        // clear User token.
        void STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
        // clear auth token.
        void STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

        // Dismiss the ion loader
        await dismissZIonLoader();

        // redirect to home
        window.location.replace(ZaionsRoutes.LoginRoute);
      } else {
        throw new Error('Something went wrong please try again!');
      }
    } catch (error) {
      // Dismiss the ion loader
      await dismissZIonLoader();

      reportCustomError(error);
    }
  };

  const _userAvatarUi = {
    name: zUserAccountStateAtom?.username
  };

  return (
    <>
      <ZIonRow className='pt-2 ion-align-items-center'>
        <ZIonCol size='max-content'>
          <ZUserAvatarButton
            className='w-[40px] h-[40px] me-1 ms-1 border'
            userAvatar={zUserAccountStateAtom?.avatar}
            userAvatarUi={_userAvatarUi}
          />
        </ZIonCol>
        <ZIonCol>
          <ZIonLabel
            className={classNames({
              'text-sm font-bold flex': true
            })}>
            {zUserAccountStateAtom?.username}
          </ZIonLabel>
          <ZIonLabel
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

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'
          lines='none'
          onClick={() => {
            void ZLogoutAlert();
          }}
          testingselector={
            CONSTANTS.testingSelectors.user.profilePopover.logout
          }>
          <ZIonIcon
            icon={logOutOutline}
            className='w-5 h-5 me-1 pe-1'
            color='danger'
          />
          <ZIonLabel className='pt-1 my-0'>Logout</ZIonLabel>
        </ZIonItem>
      </ZIonList>
    </>
  );
};

export default ZWorkspaceProfilePopover;
