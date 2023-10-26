/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

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
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';

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
import { UserAccountType } from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import dayjs from 'dayjs';

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
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZUserInfoPopover: React.FC<ZUserInfoPopoverInterface> = ({
  showBadges = false,
  user
}) => {
  return (
    <ZIonRow className='px-2 my-2 ion-align-items-center'>
      {/* User avatar col */}
      <ZIonCol size='max-content'>
        <ZUserAvatarButton
          className='w-[50px] h-[50px]'
          userAvatar={
            user?.avatar ||
            getUiAvatarApiUrl({
              name: user?.username
            })
          }
        />
      </ZIonCol>

      {/* User info col */}
      <ZIonCol>
        <ZIonText className='block text-[1rem]'>{user?.username}</ZIonText>
        <ZIonText className='block text-sm'>{user?.email}</ZIonText>
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
