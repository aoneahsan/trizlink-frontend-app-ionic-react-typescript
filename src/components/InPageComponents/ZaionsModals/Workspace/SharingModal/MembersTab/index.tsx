/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { ellipsisHorizontalOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonLabel,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import ZWorkspaceMemberActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/MemberActionPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

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
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZMembersTab: React.FC = () => {
  const { isLgScale, isSmScale } = useZMediaQueryScale();

  const { presentZIonPopover: presentWorkspaceMemberActionPopover } =
    useZIonPopover(ZWorkspaceMemberActionPopover); // popover hook to show ZWorkspaceMemberActionPopover

  return (
    <>
      <ZIonRow
        className={classNames({
          'mt-3 ion-align-items-center': true,
          'px-3': isLgScale,
          'px-1': !isLgScale
        })}>
        <ZIonCol
          sizeXl='7'
          sizeLg='7'
          sizeMd='7.5'
          sizeSm='7.5'
          sizeXs='7.5'
          className='flex ion-align-items-center'>
          {isSmScale && (
            <ZUserAvatarButton
              className='h-[35px] me-3 w-[35px]'
              userAvatar={ProductLogo}
            />
          )}

          <div className=''>
            <ZIonLabel
              className={classNames({
                'text-sm font-bold flex': true,
                'ion-align-items-center': isLgScale,
                'flex-col ion-align-items-start': !isLgScale
              })}>
              <ZIonText>Muhammad talha Irshad (you)</ZIonText>
              <ZIonBadge
                className={classNames({
                  'ms-2': isLgScale
                })}>
                TEAM
              </ZIonBadge>
            </ZIonLabel>
            <ZIonLabel
              className='block text-sm'
              color='medium'>
              talhaarshaad5@gmail.com
            </ZIonLabel>
          </div>
        </ZIonCol>
        <ZIonCol
          sizeXl='3'
          sizeLg='3'
          sizeMd='3.5'
          sizeSm='3.5'
          sizeXs='3.5'
          className={classNames({
            flex: true,
            'ion-justify-content-end': isLgScale,
            'ion-justify-content-start': !isLgScale
          })}>
          <ZIonBadge color='secondary'>Company Owner</ZIonBadge>
        </ZIonCol>
        <ZIonCol
          sizeXl='2'
          sizeLg='2'
          sizeMd='1'
          sizeSm='1'
          sizeXs='1'
          className='flex ion-justify-content-center'>
          <ZIonButton
            className='ion-no-padding ion-no-margin'
            fill='clear'
            onClick={(event: unknown) => {
              presentWorkspaceMemberActionPopover({
                _event: event as Event,
                _cssClass: 'zaions_workspaces_actions_popover_size',
                _dismissOnSelect: false
              });
            }}>
            <ZIonIcon icon={ellipsisHorizontalOutline} />
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZMembersTab;
