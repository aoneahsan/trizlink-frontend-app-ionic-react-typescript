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
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonPopover,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { starOutline } from 'ionicons/icons';
import { workspaceFormPermissionEnum } from '@/types/AdminPanel/workspace';

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

const ZInviteClientsPermissionPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
	selectedPermission: workspaceFormPermissionEnum;
}> = ({ dismissZIonPopover, selectedPermission }) => {
	return (
		<ZIonRow>
			<ZIonCol size='12'>
				<ZIonList lines='none'>
					{/* Term */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						color={
							selectedPermission === workspaceFormPermissionEnum.team
								? 'primary'
								: undefined
						}
						onClick={() => {
							dismissZIonPopover(
								workspaceFormPermissionEnum.team,
								workspaceFormPermissionEnum.team
							);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Term</h2>
							<ZIonText>Can view team only posts and commends</ZIonText>
						</ZIonLabel>
					</ZIonItem>

					{/* Client */}
					<ZIonItem
						color={
							selectedPermission === workspaceFormPermissionEnum.client
								? 'primary'
								: undefined
						}
						className='ion-activatable zaions__cursor_pointer'
						onClick={() => {
							dismissZIonPopover(
								workspaceFormPermissionEnum.client,
								workspaceFormPermissionEnum.client
							);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>
								<ZIonText>Client</ZIonText>
								<ZIonBadge className='ms-2'>
									<ZIonIcon icon={starOutline} /> Pro
								</ZIonBadge>
							</h2>
							<ZIonText>Cannot view private team post and notes</ZIonText>
						</ZIonLabel>
					</ZIonItem>
				</ZIonList>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZInviteClientsPermissionPopover;
