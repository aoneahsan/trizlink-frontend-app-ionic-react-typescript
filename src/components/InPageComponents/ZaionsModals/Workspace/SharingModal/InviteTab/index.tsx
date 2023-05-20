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
	chevronDownOutline,
	closeOutline,
	helpCircleOutline,
	linkOutline,
	mailOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import {
	ZIonAvatar,
	ZIonBadge,
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonPopover,
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
} from '@/types/AdminPanel/workspace';

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
import { ProductLogo } from '@/assets/images';
import { Formik } from 'formik';
import ZInviteClientsPermissionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/InviteClientPermissionPopover';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZInviteTab: React.FC = () => {
	const { isLgScale } = useZMediaQueryScale();

	return (
		<Formik
			initialValues={{
				role: workspaceFormRoleEnum.Approver,
				permission: workspaceFormPermissionEnum.team,
			}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{({ values, setFieldValue }) => {
				return (
					<>
						<ZIonRow
							className={classNames({
								'mt-3': true,
								'px-3': isLgScale,
								'px-1': !isLgScale,
							})}
						>
							{/* Avatar */}
							<ZIonCol size='max-content'>
								<ZIonAvatar className='w-[30px] h-[30px] mt-1'>
									<ZIonImg src={ProductLogo} />
								</ZIonAvatar>
							</ZIonCol>

							{/* Fields */}
							<ZIonCol>
								<ZIonRow>
									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonInput
											// name='pageName'
											label=''
											// labelPlacement='floating'
											// errorText={errors.pageName}
											placeholder='Type or search email'
											type='email'
											// onIonChange={handleChange}
											// onIonBlur={handleBlur}
											// value={values.pageName}
											// className={classNames({
											// 	'ion-touched ion-invalid': touched.pageName && errors.pageName,
											// 	'ion-touched ion-valid': touched.pageName && !errors.pageName,
											// })}
											className=''
											style={{
												minHeight: '30px',
											}}
										/>
									</ZIonCol>

									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonInput
											// name='pageName'
											label=''
											// labelPlacement='floating'
											// errorText={errors.pageName}
											placeholder='Name (Optional)'
											// onIonChange={handleChange}
											// onIonBlur={handleBlur}
											// value={values.pageName}
											// className={classNames({
											// 	'ion-touched ion-invalid': touched.pageName && errors.pageName,
											// 	'ion-touched ion-valid': touched.pageName && !errors.pageName,
											// })}
											className=''
											style={{
												minHeight: '30px',
												'--padding-start': '7px',
												'--padding-end': '7px',
											}}
										/>
									</ZIonCol>
								</ZIonRow>

								<ZIonRow className='mt-4 pt-2'>
									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonButton
											fill='outline'
											id='role-popover-index'
											className={classNames({
												'm-0 flex h-full text-transform-initial ion-align-items-start':
													true,
											})}
											size='small'
											color='medium'
											style={{
												minHeight: '30px',
												'--border-width': '1px',
											}}
										>
											<ZIonText className='flex me-auto'>Permission</ZIonText>
											<ZIonIcon
												icon={chevronDownOutline}
												className='flex ms-auto'
											/>
										</ZIonButton>
									</ZIonCol>
									<ZIonPopover
										trigger='role-popover-index'
										triggerAction='click'
										showBackdrop={false}
										backdropDismiss
										className='workspace_form_role_popover_size'
										side='bottom'
									>
										<ZWorkspaceFormRoleSelectorPopover
											dismissZIonPopover={(role) => {
												setFieldValue(
													'role',
													workspaceFormRoleEnum[
														role as workspaceFormRoleEnum
													] !== undefined
														? workspaceFormRoleEnum[
																role as workspaceFormRoleEnum
														  ]
														: values.role,
													false
												);
											}}
											selectedRole={values.role}
										/>
									</ZIonPopover>

									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonButton
											fill='outline'
											id='permission-popover-index'
											className='m-0 flex h-full text-transform-initial'
											size='small'
											color='medium'
											style={{
												minHeight: '30px',
												'--border-width': '1px',
											}}
										>
											<ZIonText className='flex me-auto'>Role</ZIonText>
											<ZIonIcon
												icon={chevronDownOutline}
												className='flex ms-auto'
											/>
										</ZIonButton>
									</ZIonCol>
									{/* Permission popover */}
									<ZIonPopover
										trigger='permission-popover-index'
										triggerAction='click'
										showBackdrop={false}
										backdropDismiss
										className='workspace_form_permission_popover_size'
										side='bottom'
									>
										<ZInviteClientsPermissionPopover
											dismissZIonPopover={(permission) => {
												setFieldValue(
													'permission',
													workspaceFormPermissionEnum[
														permission as workspaceFormPermissionEnum
													] !== undefined
														? workspaceFormPermissionEnum[
																permission as workspaceFormPermissionEnum
														  ]
														: values.permission,
													false
												);
											}}
											selectedPermission={values.permission}
										/>
									</ZIonPopover>
								</ZIonRow>

								<ZIonRow className='mt-4 pt-2'>
									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonButton
											fill='solid'
											id='role-popover-index'
											className={classNames({
												'm-0 flex h-full text-transform-initial ion-align-items-start':
													true,
											})}
											size='small'
											color='primary'
											style={{
												minHeight: '30px',
												'--border-width': '1px',
											}}
										>
											<ZIonIcon icon={mailOutline} className='me-2' />
											Send email invite
										</ZIonButton>
									</ZIonCol>

									<ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonButton
											fill='outline'
											id='role-popover-index'
											className={classNames({
												'm-0 flex h-full text-transform-initial ion-align-items-start':
													true,
											})}
											size='small'
											color='medium'
											style={{
												minHeight: '30px',
												'--border-width': '1px',
											}}
										>
											<ZIonIcon icon={linkOutline} className='me-2' />
											Create invite link
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonCol>
						</ZIonRow>

						<ZIonRow
							className={classNames({
								'mt-3 px-3': true,
								'ion-align-items-center': isLgScale,
								'ion-align-items-start': !isLgScale,
							})}
						>
							{/*  */}
							<ZIonCol
								size='12'
								className='flex ion-align-items-center ion-justify-content-center mt-2'
							>
								<ZIonText className='me-2'>Invite links</ZIonText>
								<ZIonIcon
									icon={helpCircleOutline}
									className='w-5 h-5 zaions__cursor_pointer'
								/>
							</ZIonCol>
							{/* Copy Invite link button */}
							<ZIonCol size='max-content'>
								<ZIonButton
									size='small'
									className='border-radius__50per m-0 mb-1'
									style={{
										'--padding-bottom': '16px',
										'--padding-top': '16px',
										'--padding-start': '6px',
										'--padding-end': '6px',
									}}
								>
									<ZIonIcon icon={linkOutline} className='w-6 h-6' />
								</ZIonButton>
							</ZIonCol>

							{/* Invite link */}
							<ZIonCol className=''>
								<ZIonRow
									className={classNames({
										'w-full  flex ion-align-items-center': true,
										'h-[35px]': isLgScale,
									})}
								>
									<ZIonCol
										className={classNames({
											'border rounded-l h-full px-2 ': true,
											'flex ion-align-items-center': isLgScale,
										})}
										sizeXl='10.5'
										sizeLg='10.5'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonText className='text-sm pt-1'>
											http://plnbl.io/ws/Yxugg59eLfj5
										</ZIonText>

										<div className='ms-auto flex ion-align-items-center gap-2'>
											<ZIonBadge className='text-sm' color='medium'>
												Contributor
											</ZIonBadge>
											<ZIonBadge className='text-sm'>Team</ZIonBadge>
										</div>
									</ZIonCol>

									<ZIonCol
										className={classNames({
											'border rounded-r h-full p-0 overflow-hidden': true,
											'mt-2': !isLgScale,
										})}
									>
										<ZIonButton className='h-[33px] m-0' expand='full'>
											{!isLgScale ? (
												'Delete link'
											) : (
												<ZIonIcon icon={closeOutline} />
											)}
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonCol>
						</ZIonRow>
					</>
				);
			}}
		</Formik>
	);
};

export default ZInviteTab;
