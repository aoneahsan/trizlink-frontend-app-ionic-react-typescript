/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, closeOutline, starOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonBadge,
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonPopover,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import ZInviteClientsPermissionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/InviteClientPermissionPopover';

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

const ZWorkspaceFormInviteClientsTab: React.FC = () => {
	// Custom Hooks
	const { presentZIonPopover: presentWorkspaceFormRoleSelectorPopover } =
		useZIonPopover(ZWorkspaceFormRoleSelectorPopover); // popover hook to show ZWorkspaceFormRoleSelectorPopover

	const { presentZIonPopover: presentInviteClientsPermissionPopover } =
		useZIonPopover(ZInviteClientsPermissionPopover); // popover hook to show ZInviteClientsPermissionPopover

	const { values, handleBlur, handleChange, setFieldValue } =
		useFormikContext<workspaceInterface>();

	return (
		<ZIonCol className='mt-4' size='11'>
			<FieldArray name='clients'>
				{({ remove, push }) => (
					<ZIonGrid>
						{values.clients?.map((el, index) => (
							<ZIonRow
								className='w-2/3 mx-auto mt-2 ion-align-items-center ion-justify-content-center'
								key={index}
							>
								<ZIonCol size='1'>
									<ZUserAvatarInfo userAvatar={el.avatar && el.avatar} />
								</ZIonCol>

								{/*  */}
								<ZIonCol>
									<div className='flex'>
										<div className='w-3/4'>
											<ZIonInput
												name={`clients.${index}.email`}
												label='name@example.com'
												labelPlacement='floating'
												placeholder='name@example.com'
												onIonChange={handleChange}
												onIonBlur={handleBlur}
												value={values.clients && values.clients[index].email}
											/>
										</div>
										<div className='gap-2 zaions_max__content ms-2 d-flex'>
											<ZIonButton
												id={`role-popover-index-${index}`}
												fill='outline'
												className='m-0 d-flex h-100 text-transform-initial'
											>
												{values.clients && values.clients[index].role}
											</ZIonButton>

											{/*  */}
											<ZIonButton
												fill='outline'
												id={`permission-popover-index-${index}`}
												className='m-0 d-flex h-100 text-transform-initial'
											>
												{values.clients && values.clients[index].permission}
											</ZIonButton>
										</div>
									</div>
								</ZIonCol>

								{/*  */}
								<ZIonCol size='max-content'>
									<ZIonButton fill='clear' onClick={() => remove(index)}>
										<ZIonIcon icon={closeOutline} className='w-6 h-6 me-1' />
									</ZIonButton>
								</ZIonCol>

								{/* Role popover */}
								<ZIonPopover
									trigger={`role-popover-index-${index}`}
									triggerAction='click'
									showBackdrop={false}
									backdropDismiss
									className='workspace_form_role_popover_size'
									side='bottom'
								>
									<ZWorkspaceFormRoleSelectorPopover
										dismissZIonPopover={(role) => {
											setFieldValue(
												`clients.${index}.role`,
												workspaceFormRoleEnum[role as workspaceFormRoleEnum] !==
													undefined
													? workspaceFormRoleEnum[role as workspaceFormRoleEnum]
													: values.clients && values.clients[index].role,
												false
											);
										}}
										selectedRole={
											(values.clients && values.clients[index].role) ||
											workspaceFormRoleEnum.Contributor
										}
									/>
								</ZIonPopover>

								{/* Permission popover */}
								<ZIonPopover
									trigger={`permission-popover-index-${index}`}
									triggerAction='click'
									showBackdrop={false}
									backdropDismiss
									className='workspace_form_permission_popover_size'
									side='bottom'
								>
									<ZInviteClientsPermissionPopover
										dismissZIonPopover={(permission) => {
											setFieldValue(
												`clients.${index}.permission`,
												workspaceFormPermissionEnum[
													permission as workspaceFormPermissionEnum
												] !== undefined
													? workspaceFormPermissionEnum[
															permission as workspaceFormPermissionEnum
													  ]
													: values.clients && values.clients[index].permission,
												false
											);
										}}
										selectedPermission={
											(values.clients && values.clients[index].permission) ||
											workspaceFormPermissionEnum.team
										}
									/>
								</ZIonPopover>
							</ZIonRow>
						))}
						<ZIonRow className='w-full mt-4 ion-justify-content-center ps-3'>
							<ZIonCol size='8.2'>
								<ZIonButton
									className='text-transform-initial'
									onClick={() =>
										push({
											role: workspaceFormRoleEnum.Approver,
											permission: workspaceFormPermissionEnum.team,
										})
									}
								>
									<ZIonIcon icon={addOutline} className='me-1' /> Add more
									collaborators
								</ZIonButton>
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				)}
			</FieldArray>
		</ZIonCol>
	);
};

export default ZWorkspaceFormInviteClientsTab;
