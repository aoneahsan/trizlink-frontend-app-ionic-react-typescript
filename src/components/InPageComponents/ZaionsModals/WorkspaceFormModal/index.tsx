/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { validateField } from '@/utils/helpers';
import { VALIDATION_RULE } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormModalTabEnum,
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
} from '@/types/AdminPanel/workspace';
import ZWorkspaceFormDetailTab from './WorkspaceDetailTab';
import ZWorkspaceFormInviteClientsTab from './WorkspaceInviteClientsTab';
import { closeOutline } from 'ionicons/icons';

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

const ZWorkspaceFormModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	return (
		<Formik
			initialValues={{
				workspaceName: '',
				workspaceTimezone: '',
				CurrentTab: workspaceFormModalTabEnum.inviteClients,
				clients: [
					{
						email: 'test@zaions.com',
						role: workspaceFormRoleEnum.Approver,
						permission: workspaceFormPermissionEnum.team,
					},
				],
			}}
			validate={(values) => {
				const errors: {
					workspaceName?: string;
				} = {};

				validateField('workspaceName', values, errors, VALIDATION_RULE.string);

				return errors;
			}}
			onSubmit={() => {}}
		>
			{({ errors, values, touched, handleChange, handleBlur }) => {
				console.log(values);
				return (
					<ZIonGrid className='pb-2 overflow-y-scroll mx-0'>
						<ZIonRow className='ion-justify-content-end mb-2'>
							<ZIonCol size='max-content'>
								<ZIonButton
									fill='clear'
									onClick={() => {
										dismissZIonModal();
									}}
								>
									<ZIonIcon icon={closeOutline} className='w-8 h-8 ' />
								</ZIonButton>
							</ZIonCol>
						</ZIonRow>

						{/*  */}
						<ZIonRow className='ion-justify-content-center'>
							<ZIonCol className='ion-text-center' size='11'>
								{/* Tab Title */}
								<ZIonText className='text-4xl d-block'>
									{values.CurrentTab ===
									workspaceFormModalTabEnum.workspaceDetailForm
										? 'Create a workspace'
										: values.CurrentTab ===
										  workspaceFormModalTabEnum.inviteClients
										? 'Invite your clients'
										: values.CurrentTab ===
										  workspaceFormModalTabEnum.connectPages
										? `Connect ${values.workspaceName}'s pages`
										: ''}
								</ZIonText>

								{/* Tab sub title */}
								<ZIonText className='text-muted d-block mt-3'>
									{values.CurrentTab ===
									workspaceFormModalTabEnum.workspaceDetailForm
										? 'A workspace is a group of channels and collaborators, a place where you can organize your campaigns, workflows and assets.'
										: values.CurrentTab ===
										  workspaceFormModalTabEnum.inviteClients
										? 'Working with a client? Invite them in the workspace so they can approve and leave feedback on content.'
										: values.CurrentTab ===
										  workspaceFormModalTabEnum.connectPages
										? 'Add all your brands’ content channels. You can always add more later.'
										: ''}
								</ZIonText>
							</ZIonCol>

							{/* tab's content */}
							{/* <ZWorkspaceFormDetailTab /> */}

							<ZWorkspaceFormInviteClientsTab />
						</ZIonRow>
					</ZIonGrid>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceFormModal;
