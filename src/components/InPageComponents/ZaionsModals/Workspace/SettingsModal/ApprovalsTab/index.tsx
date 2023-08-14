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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonBadge,
	ZIonCol,
	ZIonGrid,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZWorkspaceApprovalCards from '@/components/WorkspacesComponents/ApprovalCards';
import ZWorkspaceApprovalToggler from '@/components/WorkspacesComponents/ApprovalToggler';
import CONSTANTS from '@/utils/constants';

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

const ZApprovalTab: React.FC<{ workspaceId: string }> = ({ workspaceId }) => {
	return (
		<ZIonGrid>
			{/* Cards */}
			<ZWorkspaceApprovalCards workspaceId={workspaceId} />

			{/*  */}
			<ZIonRow className='mt-4 ion-justify-content-center'>
				<ZIonCol size='5'>
					<ZIonText className='block text-xl'>
						Who can approve content?
					</ZIonText>
					<ZIonRow>
						<ZIonCol
							className='flex gap-2 ion-align-items-center ps-0'
							size='10'
						>
							<ZUserAvatarButton />
							<div>
								<ZIonText className='flex gap-1 ion-align-items-center'>
									Muhammad talha Irshad (you) <ZIonBadge>Team</ZIonBadge>
								</ZIonText>
								<ZIonText className='block text-[14px]'>
									talhaarshaad5@gmail.com
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
						testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.schedulePostToggler}-${workspaceId}`}
						testingListSelector={
							CONSTANTS.testingSelectors.workspace.settingsModal.approvals
								.schedulePostToggler
						}
					/>

					{/* Lock content approval */}
					<ZWorkspaceApprovalToggler
						icon={lockClosedOutline}
						workspaceId={workspaceId}
						text='Lock content after approval'
						testingSelector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.lockContent}-${workspaceId}`}
						testingListSelector={
							CONSTANTS.testingSelectors.workspace.settingsModal.approvals
								.lockContent
						}
					/>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZApprovalTab;
