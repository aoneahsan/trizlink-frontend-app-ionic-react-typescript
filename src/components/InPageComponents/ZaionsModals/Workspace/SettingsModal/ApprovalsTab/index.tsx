/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { lockClosedOutline, timeOutline } from 'ionicons/icons';
import classNames from 'classnames';

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
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZWorkspaceApprovalCards from '@/components/WorkspacesComponents/ApprovalCards';
import ZWorkspaceApprovalToggler from '@/components/WorkspacesComponents/ApprovalToggler';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';
import SupportOnPatreon from '@/components/SupportOnPatreon';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZApprovalTab: React.FC<{ workspaceId: string }> = ({ workspaceId }) => {
  // #region Custom hooks
  const { isSmScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  return (
    <div
      className={classNames({
        'w-full overflow-y-auto zaions_pretty_scrollbar': true,
        'h-[36.5rem]': isSmScale,
        'h-[44rem] pb-10': !isSmScale
      })}>
      <SupportOnPatreon />
      {/* Cards */}
      <ZWorkspaceApprovalCards workspaceId={workspaceId} />

      {/*  */}
      <ZIonRow className='mt-4 ion-justify-content-center'>
        <ZIonCol
          sizeXl='5'
          sizeLg='5'
          sizeMd='7'
          sizeSm='11'
          sizeXs='11.5'>
          <ZIonText
            className={classNames({
              'block text-xl': true,
              'ion-text-center': !isMdScale
            })}>
            Who can approve content?
          </ZIonText>

          <ZIonRow>
            <ZIonCol
              className='flex gap-2 ion-align-items-center ps-0'
              size='10'>
              <ZUserAvatarButton />
              <div>
                <ZIonText className='flex gap-1 ion-align-items-center'>
                  trizlink-user (you) <ZIonBadge>Team</ZIonBadge>
                </ZIonText>
                <ZIonText className='block text-[14px]'>
                  support@trizlink.com
                </ZIonText>
              </div>
            </ZIonCol>
            <ZIonCol className='ion-text-end'>
              <ZRCSwitch />
            </ZIonCol>
          </ZIonRow>

          {/* Schedule posts approval */}
          <ZWorkspaceApprovalToggler
            icon={timeOutline}
            workspaceId={workspaceId}
            text='Schedule posts automatically on approval'
            testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.schedulePostToggler}-${workspaceId}`}
            testinglistselector={
              CONSTANTS.testingSelectors.workspace.settingsModal.approvals
                .schedulePostToggler
            }
          />

          {/* Lock content approval */}
          <ZWorkspaceApprovalToggler
            icon={lockClosedOutline}
            workspaceId={workspaceId}
            text='Lock content after approval'
            testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.lockContent}-${workspaceId}`}
            testinglistselector={
              CONSTANTS.testingSelectors.workspace.settingsModal.approvals
                .lockContent
            }
          />
        </ZIonCol>
      </ZIonRow>
    </div>
  );
};

export default ZApprovalTab;
