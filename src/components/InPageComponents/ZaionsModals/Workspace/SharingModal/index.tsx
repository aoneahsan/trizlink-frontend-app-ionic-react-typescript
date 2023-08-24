/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	checkboxOutline,
	closeOutline,
	notificationsOutline,
	peopleOutline,
	personAddOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonText,
} from '@/components/ZIonComponents';
import ZInviteTab from './InviteTab';

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
import { WorkspaceSharingTabEnum } from '@/types/AdminPanel/workspace';
import ZMembersTab from './MembersTab';
import ZPermissionsTab from './PermissionsTab';
import ZNotificationTab from './NotificationTab';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

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

const ZWorkspacesSharingModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	Tab: WorkspaceSharingTabEnum;
	workspaceId: string;
	teamId: string;
}> = ({ dismissZIonModal, Tab, workspaceId, teamId }) => {
	// Component state
	const [compState, setCompState] = useState<{
		activeTab: WorkspaceSharingTabEnum;
	}>({
		activeTab: Tab,
	});

	const { isLgScale } = useZMediaQueryScale();

	return (
		<>
			{/* header  */}
			<ZIonHeader>
				<div className='w-full pt-1 ion-text-end pe-1'>
					<ZIonIcon
						slot='icon-only'
						icon={closeOutline}
						className='w-6 h-6 cursor-pointer'
						onClick={() => {
							dismissZIonModal();
						}}
					/>
				</div>
				<div className='pb-1 w-full ion-text-center mt-[-13px]'>
					<ZIonText className='text-2xl h-max'>Team sharing</ZIonText>
				</div>
				<ZIonSegment
					scrollable={true}
					value={compState.activeTab}
					className={classNames({
						'w-[85%] mx-auto': true,
						'w-full': !isLgScale,
					})}
				>
					{/* Timetable */}
					<ZIonSegmentButton
						value={WorkspaceSharingTabEnum.invite}
						className='normal-case ion-text-center ion-no-padding'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: WorkspaceSharingTabEnum.invite,
							}));
						}}
					>
						<ZIonIcon icon={personAddOutline} className='w-5 h-5 pt-1' />
						<ZIonText className='pb-3 text-sm'>Invite</ZIonText>
					</ZIonSegmentButton>

					{/* Labels */}
					<ZIonSegmentButton
						value={WorkspaceSharingTabEnum.members}
						className='normal-case ion-text-center ion-no-padding'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: WorkspaceSharingTabEnum.members,
							}));
						}}
					>
						<ZIonIcon icon={peopleOutline} className='w-5 h-5 pt-1' />
						<ZIonText className='pb-3 text-xs'>Members</ZIonText>
					</ZIonSegmentButton>

					{/* Settings */}
					<ZIonSegmentButton
						value={WorkspaceSharingTabEnum.permissions}
						className='normal-case ion-text-center ion-no-padding'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: WorkspaceSharingTabEnum.permissions,
							}));
						}}
					>
						<ZIonIcon icon={checkboxOutline} className='w-5 h-5 pt-1' />
						<ZIonText className='pb-3 text-xs'>Permissions</ZIonText>
					</ZIonSegmentButton>

					{/* Approvals */}
					<ZIonSegmentButton
						value={WorkspaceSharingTabEnum.notifications}
						className='normal-case ion-text-center ion-no-padding'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: WorkspaceSharingTabEnum.notifications,
							}));
						}}
					>
						<ZIonIcon icon={notificationsOutline} className='w-5 h-5 pt-1' />
						<ZIonText className='pb-3 text-xs'>Notifications</ZIonText>
					</ZIonSegmentButton>
				</ZIonSegment>
			</ZIonHeader>

			{/* Content */}
			<ZIonContent>
				<ZCustomScrollable scrollY={true} className='w-full h-full'>
					<ZIonGrid className='pb-3'>
						{compState.activeTab === WorkspaceSharingTabEnum.invite ? (
							<ZInviteTab
								workspaceId={workspaceId}
								teamId={teamId}
								dismissZIonModal={dismissZIonModal}
							/>
						) : compState.activeTab === WorkspaceSharingTabEnum.members ? (
							<ZMembersTab />
						) : compState.activeTab === WorkspaceSharingTabEnum.permissions ? (
							<ZPermissionsTab />
						) : compState.activeTab ===
						  WorkspaceSharingTabEnum.notifications ? (
							<ZNotificationTab />
						) : (
							''
						)}
					</ZIonGrid>
				</ZCustomScrollable>
			</ZIonContent>
		</>
	);
};

export default ZWorkspacesSharingModal;
