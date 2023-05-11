/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, closeOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
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
		useZIonPopover(ZWorkspaceFormRoleSelectorPopover, { showBadges: true }); // popover hook to show ZWorkspaceFormRoleSelectorPopover

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
										<div className='w-4/5'>
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
										<div className='zaions_max__content ms-2'>
											<ZIonButton
												onClick={(event: unknown) => {
													presentWorkspaceFormRoleSelectorPopover({
														_event: event as Event,
														_cssClass: 'workspace_form_role_popover_size',
														_onDidDismiss: ({ detail }) => {
															setFieldValue(
																`clients.${index}.role`,
																workspaceFormRoleEnum[
																	detail.role as workspaceFormRoleEnum
																] !== undefined
																	? workspaceFormRoleEnum[
																			detail.role as workspaceFormRoleEnum
																	  ]
																	: values.clients &&
																			values.clients[index].role,
																false
															);
														},
														_dismissOnSelect: false,
													});
												}}
												fill='outline'
												className='m-0 d-flex h-100 text-transform-initial'
											>
												{values.clients && values.clients[index].role}
											</ZIonButton>
										</div>
									</div>
								</ZIonCol>

								{/*  */}
								<ZIonCol size='1.7'>
									<ZIonSelect
										fill='outline'
										label=''
										className='zaions_max__content'
										value={values.clients && values.clients[index].permission}
										interface='popover'
										name={`clients.${index}.permission`}
										onIonChange={handleChange}
										onIonBlur={handleBlur}
									>
										<ZIonSelectOption value={workspaceFormPermissionEnum.team}>
											Team
										</ZIonSelectOption>
										<ZIonSelectOption
											value={workspaceFormPermissionEnum.client}
										>
											Client
										</ZIonSelectOption>
									</ZIonSelect>
								</ZIonCol>

								{/*  */}
								<ZIonCol size='max-content'>
									<ZIonButton fill='clear' onClick={() => remove(index)}>
										<ZIonIcon icon={closeOutline} className='w-6 h-6 me-1' />
									</ZIonButton>
								</ZIonCol>
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
