/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import dayjs from 'dayjs';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonCol,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';

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
import { type UserAccountType } from '@/types/UserAccount/index.type';
import { ZWSTypeEum } from '@/utils/enums';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZUserInfoPopoverInterface {
  showBadges: boolean;
  user: UserAccountType;
  type: ZWSTypeEum;
  workspaceId?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZUserInfoPopover: React.FC<ZUserInfoPopoverInterface> = ({
  showBadges = false,
  user,
  type,
  workspaceId
}) => {
  return (
    <ZIonRow className='px-2 my-2 ion-align-items-center'>
      {/* User avatar col */}
      <ZIonCol size='max-content'>
        <ZUserAvatarButton
          className='w-[50px] h-[50px]'
          testingidselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${workspaceId}`}
          testinglistselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${CONSTANTS.testingSelectors.workspace.userPopover.userAvatar}`}
          testingselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${
            CONSTANTS.testingSelectors.workspace.userPopover.userAvatar
          }-${workspaceId}`}
          userAvatar={
            user?.avatar ??
            getUiAvatarApiUrl({
              name: user?.username
            })
          }
        />
      </ZIonCol>

      {/* User info col */}
      <ZIonCol>
        <ZIonText
          className='block text-[1rem]'
          testingidselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${workspaceId}`}
          testinglistselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${CONSTANTS.testingSelectors.workspace.userPopover.displayName}`}
          testingselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${
            CONSTANTS.testingSelectors.workspace.userPopover.displayName
          }-${workspaceId}`}>
          {user?.username}
        </ZIonText>
        <ZIonText
          className='block text-sm'
          testingidselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${workspaceId}`}
          testinglistselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${CONSTANTS.testingSelectors.workspace.userPopover.userEmail}`}
          testingselector={`${
            type === ZWSTypeEum.favoriteWorkspace
              ? 'favorite-'
              : type === ZWSTypeEum.shareWorkspace
              ? 'share-'
              : 'owned-'
          }${
            CONSTANTS.testingSelectors.workspace.userPopover.userEmail
          }-${workspaceId}`}>
          {user?.email}
        </ZIonText>
      </ZIonCol>

      {showBadges && (
        <ZIonCol
          size='12'
          className='flex gap-2 ps-5'>
          <ZIonBadge className='ms-4'>Team</ZIonBadge>
          <ZIonBadge color='secondary'>Company owner</ZIonBadge>
        </ZIonCol>
      )}

      <ZIonCol
        size='12'
        className='px-3 py-3 mt-2 border-top'>
        <ZIonText className='block text-sm'>
          last seen:
          <ZIonText
            className='font-semibold ms-1'
            color={
              dayjs(user?.lastSeenAt).isAfter(dayjs()) ? 'success' : 'tertiary'
            }>
            {dayjs(user?.lastSeenAt).isAfter(dayjs())
              ? 'Active'
              : user?.lastSeenAtFormatted}
          </ZIonText>
        </ZIonText>
      </ZIonCol>
    </ZIonRow>
  );
};

export default ZUserInfoPopover;
