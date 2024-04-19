/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  checkmarkOutline,
  pricetagOutline,
  settingsOutline,
  timeOutline
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonText,
  ZIonSegment,
  ZIonSegmentButton,
  ZIonIcon,
  ZIonRow,
  ZIonContent
} from '@/components/ZIonComponents';
import ZTimetableTab from './TimetableTab';
import ZSettingsTab from './SettingsTab';
import ZApprovalTab from './ApprovalsTab';
import ZLabelsTab from './LabelsTab';
import ZCan from '@/components/Can';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZGetRQCacheData } from '@/ZaionsHooks/zreactquery-hooks';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { extractInnerData } from '@/utils/helpers';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type workspaceInterface,
  workspaceSettingsModalTabEnum
} from '@/types/AdminPanel/workspace';

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesSettingModal: React.FC<{
  Tab: workspaceSettingsModalTabEnum;
  workspaceId: string;
  wsShareId?: string; // if this is share workspace then pass the share workspace id
  wsShareMemberId?: string; // if this is share workspace then pass the member id
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute: (_url: string) => void;
}> = ({
  Tab,
  workspaceId,
  wsShareId,
  wsShareMemberId,
  dismissZIonModal,
  zNavigatePushRoute
}) => {
  // Component state
  const [compState, setCompState] = useState<{
    activeTab: workspaceSettingsModalTabEnum;
    workspace?: workspaceInterface;
  }>({
    activeTab: Tab
  });

  // #region Custom hooks
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { isSmScale, isMdScale, isLgScale } = useZMediaQueryScale();
  // #endregion

  // #region UseEffects
  useEffect(() => {
    try {
      // workspaceId pass when the user is owner.
      if (workspaceId !== undefined) {
        // if owner then it will work with the QUERIES_KEYS of that user.

        // getting all the workspace from RQ cache.
        const _allWorkspaces =
          extractInnerData<workspaceInterface[]>(
            getRQCDataHandler<workspaceInterface[]>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
            }) as workspaceInterface[],
            extractInnerDataOptionsEnum.createRequestResponseItems
          ) ?? [];

        const _currentWorkspace = _allWorkspaces.filter(
          el => el.id === workspaceId
        );

        setCompState(oldValues => ({
          ...oldValues,
          workspace: _currentWorkspace[0]
        }));
      } else if (wsShareId !== undefined) {
        //  workspaceId pass when the user is a member.

        // if member then it will work with the QUERIES_KEYS of that member.
        const _rqShareWSData = getRQCDataHandler<workspaceInterface>({
          key: [
            CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.SHARE_WS_INFO,
            wsShareId
          ]
        }) as workspaceInterface;

        if (_rqShareWSData !== undefined) {
          const _currentShareWorkspaces = extractInnerData<workspaceInterface>(
            _rqShareWSData,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          setCompState(oldValues => ({
            ...oldValues,
            workspace: _currentShareWorkspaces
          }));
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, wsShareId]);
  // #endregion

  return (
    <>
      {/* Content */}
      <div className='flex flex-col w-full h-full'>
        <div className='w-full zaions__bg_white'>
          <div className='w-full py-1 pt-3 mb-1 ion-text-center'>
            <ZIonText
              color='dark'
              className={classNames({
                'font-bold': true,
                'text-3xl': isMdScale,
                'text-xl': !isMdScale && isSmScale
              })}>
              {compState.workspace?.workspaceName}
            </ZIonText>
          </div>
          {isSmScale ? (
            <ZIonSegment
              scrollable={true}
              value={compState.activeTab}
              className={classNames({
                'h-[4rem] mx-auto': true,
                'w-[40%]': isLgScale,
                'w-full': !isLgScale
              })}>
              {/* Timetable */}
              <ZCan
                shareWSId={wsShareId}
                havePermissions={
                  wsShareId !== undefined
                    ? [shareWSPermissionEnum.viewAny_sws_timeSlot]
                    : [permissionsEnum.viewAny_timeSlot]
                }
                permissionType={
                  wsShareId !== undefined
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }>
                <ZIonSegmentButton
                  value={workspaceSettingsModalTabEnum.timetable}
                  className='normal-case ion-no-padding ion-text-center'
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.timetable}-${workspaceId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.tabs
                      .timetable
                  }
                  onClick={() => {
                    setCompState(oldValues => ({
                      ...oldValues,
                      activeTab: workspaceSettingsModalTabEnum.timetable
                    }));
                  }}>
                  <ZIonIcon
                    icon={timeOutline}
                    className='pt-1'
                  />
                  <ZIonText className='pb-3 mb-2'>Timetable</ZIonText>
                </ZIonSegmentButton>
              </ZCan>

              {/* Labels */}
              <ZCan
                shareWSId={wsShareId}
                havePermissions={
                  wsShareId !== undefined
                    ? [shareWSPermissionEnum.viewAny_sws_label]
                    : [permissionsEnum.viewAny_label]
                }
                permissionType={
                  wsShareId !== undefined
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }>
                <ZIonSegmentButton
                  value={workspaceSettingsModalTabEnum.labels}
                  className='normal-case ion-no-padding ion-text-center'
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.labels}-${workspaceId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.tabs
                      .labels
                  }
                  onClick={() => {
                    setCompState(oldValues => ({
                      ...oldValues,
                      activeTab: workspaceSettingsModalTabEnum.labels
                    }));
                  }}>
                  <ZIonIcon
                    icon={pricetagOutline}
                    className='pt-1'
                  />
                  <ZIonText className='pb-3 mb-2'>Labels</ZIonText>
                </ZIonSegmentButton>
              </ZCan>

              {/* Settings */}
              <ZCan
                shareWSId={wsShareId}
                havePermissions={
                  wsShareId !== undefined
                    ? [shareWSPermissionEnum.update_sws_workspace]
                    : [permissionsEnum.update_workspace]
                }
                permissionType={
                  wsShareId !== undefined
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }>
                <ZIonSegmentButton
                  value={workspaceSettingsModalTabEnum.settings}
                  className='normal-case ion-no-padding ion-text-center'
                  testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.settings}-${workspaceId}`}
                  testinglistselector={
                    CONSTANTS.testingSelectors.workspace.settingsModal.tabs
                      .settings
                  }
                  onClick={() => {
                    setCompState(oldValues => ({
                      ...oldValues,
                      activeTab: workspaceSettingsModalTabEnum.settings
                    }));
                  }}>
                  <ZIonIcon
                    icon={settingsOutline}
                    className='pt-1'
                  />
                  <ZIonText className='pb-3 mb-2'>Settings</ZIonText>
                </ZIonSegmentButton>
              </ZCan>

              {/* Approvals */}
              <ZIonSegmentButton
                value={workspaceSettingsModalTabEnum.approvals}
                className='normal-case ion-no-padding ion-text-center'
                testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.approvals}-${workspaceId}`}
                testinglistselector={
                  CONSTANTS.testingSelectors.workspace.settingsModal.tabs
                    .approvals
                }
                onClick={() => {
                  setCompState(oldValues => ({
                    ...oldValues,
                    activeTab: workspaceSettingsModalTabEnum.approvals
                  }));
                }}>
                <ZIonIcon
                  icon={checkmarkOutline}
                  className='pt-1'
                />
                <ZIonText className='pb-3 mb-2'>Approvals</ZIonText>
              </ZIonSegmentButton>
            </ZIonSegment>
          ) : null}
        </div>

        <ZIonRow className='h-full ion-align-items-center grow zaions__light_bg'>
          {compState.activeTab === workspaceSettingsModalTabEnum.timetable ? (
            <ZCan havePermissions={[permissionsEnum.viewAny_timeSlot]}>
              <ZTimetableTab
                workspaceId={workspaceId} // if owner then pass the workspaceId, that is how we are knowing that it is a owner
                wsShareMemberId={wsShareMemberId} // if member then pass the wsShareMemberId, that is how we are knowing that it is a member
                wsShareId={wsShareId}
              />
            </ZCan>
          ) : compState.activeTab === workspaceSettingsModalTabEnum.labels ? (
            <ZCan havePermissions={[permissionsEnum.viewAny_label]}>
              <ZLabelsTab
                workspaceId={workspaceId} // if owner then pass the workspaceId, that is how we are knowing that it is a owner
                wsShareMemberId={wsShareMemberId} // if member then pass the wsShareMemberId, that is how we are knowing that it is a member
                wsShareId={wsShareId}
              />
            </ZCan>
          ) : compState.activeTab === workspaceSettingsModalTabEnum.settings ? (
            <ZCan havePermissions={[permissionsEnum.update_workspace]}>
              <ZSettingsTab
                zNavigatePushRoute={zNavigatePushRoute}
                workspaceId={workspaceId} // if owner then pass the workspaceId, that is how we are knowing that it is a owner
                wsShareMemberId={wsShareMemberId} // if member then pass the wsShareMemberId, that is how we are knowing that it is a member
                wsShareId={wsShareId}
                dismissZIonModal={dismissZIonModal}
              />
            </ZCan>
          ) : compState.activeTab ===
            workspaceSettingsModalTabEnum.approvals ? (
            <ZApprovalTab workspaceId={workspaceId} />
          ) : (
            ''
          )}
        </ZIonRow>
      </div>
    </>
  );
};

export default ZWorkspacesSettingModal;
