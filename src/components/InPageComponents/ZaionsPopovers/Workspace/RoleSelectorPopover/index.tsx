/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { zStringify } from '@/utils/helpers';
import { workspaceFormRoleEnum } from '@/types/AdminPanel/workspace';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZWorkspaceFormRoleSelectorPopover: React.FC<{
	dismissZIonPopover: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonPopover }) => {
	return (
		<ZIonRow>
			<ZIonCol size='12' className='mt-2'>
				<ZIonText className='mb-3 fw-bold d-block ms-2'>
					Granted permissions
				</ZIonText>
				<ZIonRow>
					{/*  */}
					<ZIonCol size='6' className='gap-1 d-flex ion-align-items-center'>
						<ZIonIcon
							icon={checkmarkCircleOutline}
							color='success'
							className='w-5 h-5'
						/>
						<ZIonText>Comment on posts</ZIonText>
					</ZIonCol>

					{/*  */}
					<ZIonCol size='6' className='gap-1 d-flex ion-align-items-center'>
						<ZIonIcon
							icon={checkmarkCircleOutline}
							color='success'
							className='w-5 h-5'
						/>
						<ZIonText>Create & edit posts</ZIonText>
					</ZIonCol>

					{/*  */}
					<ZIonCol size='6' className='gap-1 d-flex ion-align-items-center'>
						<ZIonIcon
							icon={closeCircleOutline}
							color='danger'
							className='w-5 h-5'
						/>
						<ZIonText>Approve & disapprove</ZIonText>
					</ZIonCol>

					{/*  */}
					<ZIonCol size='6' className='gap-1 d-flex ion-align-items-center'>
						<ZIonIcon
							icon={checkmarkCircleOutline}
							color='success'
							className='w-5 h-5'
						/>
						<ZIonText>Publish & schedule</ZIonText>
					</ZIonCol>

					{/*  */}
					<ZIonCol size='6' className='gap-1 d-flex ion-align-items-center'>
						<ZIonIcon
							icon={checkmarkCircleOutline}
							color='success'
							className='w-5 h-5'
						/>
						<ZIonText>Manage users & pages</ZIonText>
					</ZIonCol>
				</ZIonRow>
			</ZIonCol>
			<ZIonCol size='12'>
				<ZIonList lines='none'>
					{/* Contributor */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						color='primary'
						onClick={() => {
							dismissZIonPopover('', workspaceFormRoleEnum.Contributor);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Contributor</h2>
							<ZIonText>
								Can create & edit posts, comment and publish or schedule
							</ZIonText>
						</ZIonLabel>
					</ZIonItem>

					{/* Administrator */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						onClick={() => {
							dismissZIonPopover('', workspaceFormRoleEnum.Administrator);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Administrator</h2>
							<ZIonText>
								Has all permissions including managing users and adding new
								pages
							</ZIonText>
						</ZIonLabel>
					</ZIonItem>

					{/* Writer */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						onClick={() => {
							dismissZIonPopover('', workspaceFormRoleEnum.Writer);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Writer</h2>
							<ZIonText>Can create, edit posts and comment</ZIonText>
						</ZIonLabel>
					</ZIonItem>

					{/* Approver */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						onClick={() => {
							dismissZIonPopover('', workspaceFormRoleEnum.Approver);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Approver</h2>
							<ZIonText>Can approve posts and comment</ZIonText>
						</ZIonLabel>
					</ZIonItem>

					{/* Guest */}
					<ZIonItem
						className='ion-activatable zaions__cursor_pointer'
						onClick={() => {
							dismissZIonPopover('', workspaceFormRoleEnum.Guest);
						}}
					>
						<ZIonLabel className='ion-text-wrap'>
							<h2>Guest</h2>
							<ZIonText>Can view posts and comment</ZIonText>
						</ZIonLabel>
					</ZIonItem>
				</ZIonList>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceFormRoleSelectorPopover;
