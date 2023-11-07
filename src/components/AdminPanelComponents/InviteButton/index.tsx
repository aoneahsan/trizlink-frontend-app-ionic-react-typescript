/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceRouteParams } from '@/utils/helpers';

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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface IZInviteButton {
  className?: string;
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZInviteButton: React.FC<IZInviteButton> = ({
  className,
  workspaceId,
  shareWSMemberId,
  wsShareId
}) => {
  const { isLgScale, isMdScale } = useZMediaQueryScale();

  return (
    <ZIonButton
      size={!isLgScale ? 'small' : undefined}
      height={isMdScale ? '2.3rem' : '1.9rem'}
      className={className}
      expand={isMdScale ? undefined : 'block'}
      testingselector={CONSTANTS.testingSelectors.topBar.teamInviteBtn}
      routerLink={
        workspaceId != null
          ? replaceRouteParams(
              ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members,
              [CONSTANTS.RouteParams.workspace.workspaceId],
              [workspaceId]
            )
          : wsShareId != null && shareWSMemberId != null
          ? replaceRouteParams(
              ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Members,
              [
                CONSTANTS.RouteParams.workspace.wsShareId,
                CONSTANTS.RouteParams.workspace.shareWSMemberId
              ],
              [wsShareId, shareWSMemberId]
            )
          : ''
      }>
      <ZIonIcon
        icon={addOutline}
        className='me-1'
      />
      Invite
    </ZIonButton>
  );
};

export default ZInviteButton;
