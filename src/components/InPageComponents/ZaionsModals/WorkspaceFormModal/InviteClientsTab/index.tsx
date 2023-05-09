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
	ZIonButton,
	ZIonCol,
	ZIonFooter,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarInfo from '@/components/WorkspacesComponents/userButton';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { FieldArray, useFormikContext } from 'formik';
import {
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
	workspaceInterface,
	workspaceInviteClientInterface,
} from '@/types/AdminPanel/workspace';
import { addOutline, closeOutline } from 'ionicons/icons';

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

const ZWorkspaceFormInviteClientsTab: React.FC = () => {
	// Custom Hooks
	const { presentZIonPopover: presentWorkspaceFormRoleSelectorPopover } =
		useZIonPopover(ZWorkspaceFormRoleSelectorPopover, { showBadges: true }); // popover hook to show ZWorkspaceFormRoleSelectorPopover

	const { values, handleBlur, handleChange, setFieldValue } =
		useFormikContext<workspaceInterface>();

	return (
		<>
			<ZIonCol className='mt-4' size='11'>
				<FieldArray name='clients'>
					{({ remove, push }) => (
						<ZIonGrid>
							{values.clients?.map((el, index) => (
								<ZIonRow
									className='w-2/3 ion-align-items-center ion-justify-content-center mx-auto mt-2'
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
													className='d-flex h-100 m-0 text-transform-initial'
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
											<ZIonSelectOption
												value={workspaceFormPermissionEnum.team}
											>
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
											<ZIonIcon icon={closeOutline} className='me-1 w-6 h-6' />
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							))}
							<ZIonRow className='w-full ion-justify-content-center mt-4 ps-3'>
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

			<ZIonFooter className='flex align-items-center mt-20 ' collapse='fade'>
				{/* Next button */}
				<ZIonCol size='12' className='mt-4 pt-3'>
					<div className='w-3/12 mx-auto'>
						<ZIonButton expand='block' className='text-transform-initial'>
							Invite Later
						</ZIonButton>

						<ZIonButton
							expand='block'
							fill='outline'
							className='text-transform-initial mt-3'
						>
							Go Back
						</ZIonButton>
					</div>
				</ZIonCol>
			</ZIonFooter>
		</>
	);
};

export default ZWorkspaceFormInviteClientsTab;
