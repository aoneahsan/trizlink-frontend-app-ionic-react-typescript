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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonContent,
  ZIonHeader,
  ZIonText,
  ZIonSegment,
  ZIonSegmentButton,
  ZIonIcon,
  ZIonGrid,
  ZIonRow,
  ZIonCol
} from '@/components/ZIonComponents';
import ZTimetableTab from './TimetableTab';
import {
  workspaceInterface,
  workspaceSettingsModalTabEnum
} from '@/types/AdminPanel/workspace';
import ZSettingsTab from './SettingsTab';
import ZApprovalTab from './ApprovalsTab';
import { extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { extractInnerData } from '@/utils/helpers';
import { useZGetRQCacheData } from '@/ZaionsHooks/zreactquery-hooks';
import ZLabelsTab from './LabelsTab';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesSettingModal: React.FC<{
  Tab: workspaceSettingsModalTabEnum;
  workspaceId: string;
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ Tab, workspaceId, dismissZIonModal }) => {
  // Component state
  const [compState, setCompState] = useState<{
    activeTab: workspaceSettingsModalTabEnum;
    workspace?: workspaceInterface;
  }>({
    activeTab: Tab
  });

  const { getRQCDataHandler } = useZGetRQCacheData();

  useEffect(() => {
    try {
      if (workspaceId) {
        // getting all the workspace from RQ cache.
        const _allWorkspaces =
          extractInnerData<workspaceInterface[]>(
            getRQCDataHandler<workspaceInterface[]>({
              key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN]
            }) as workspaceInterface[],
            extractInnerDataOptionsEnum.createRequestResponseItems
          ) || [];

        const _currentWorkspace = _allWorkspaces.filter(
          el => el.id === workspaceId
        );

        setCompState(oldValues => ({
          ...oldValues,
          workspace: _currentWorkspace[0]
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [workspaceId]);

  return (
    <>
      {/* header  */}
      <ZIonHeader>
        <div className='w-full py-1 mt-3 mb-1 ion-text-center'>
          <ZIonText
            className='text-3xl font-bold'
            color='dark'>
            {compState.workspace?.workspaceName}
          </ZIonText>
        </div>
        <ZIonSegment
          scrollable={true}
          value={compState.activeTab}
          className='h-[4rem] w-[40%] mx-auto'>
          {/* Timetable */}
          <ZCan havePermissions={[permissionsEnum.viewAny_timeSlot]}>
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
          <ZCan havePermissions={[permissionsEnum.viewAny_label]}>
            <ZIonSegmentButton
              value={workspaceSettingsModalTabEnum.labels}
              className='normal-case ion-no-padding ion-text-center'
              testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.labels}-${workspaceId}`}
              testinglistselector={
                CONSTANTS.testingSelectors.workspace.settingsModal.tabs.labels
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
          <ZCan havePermissions={[permissionsEnum.update_workspace]}>
            <ZIonSegmentButton
              value={workspaceSettingsModalTabEnum.settings}
              className='normal-case ion-no-padding ion-text-center'
              testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.tabs.settings}-${workspaceId}`}
              testinglistselector={
                CONSTANTS.testingSelectors.workspace.settingsModal.tabs.settings
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
              CONSTANTS.testingSelectors.workspace.settingsModal.tabs.approvals
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
      </ZIonHeader>

      {/* Content */}
      <ZIonContent color='light'>
        <ZIonGrid className='h-full'>
          <ZIonRow className='h-full ion-align-items-center'>
            {compState.activeTab === workspaceSettingsModalTabEnum.timetable ? (
              <ZCan havePermissions={[permissionsEnum.viewAny_timeSlot]}>
                <ZTimetableTab workspaceId={workspaceId} />
              </ZCan>
            ) : compState.activeTab === workspaceSettingsModalTabEnum.labels ? (
              <ZCan havePermissions={[permissionsEnum.viewAny_label]}>
                <ZLabelsTab workspaceId={workspaceId} />
              </ZCan>
            ) : compState.activeTab ===
              workspaceSettingsModalTabEnum.settings ? (
              <ZCan havePermissions={[permissionsEnum.update_workspace]}>
                <ZSettingsTab
                  workspaceId={workspaceId}
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
        </ZIonGrid>
      </ZIonContent>
    </>
  );
};

export default ZWorkspacesSettingModal;
