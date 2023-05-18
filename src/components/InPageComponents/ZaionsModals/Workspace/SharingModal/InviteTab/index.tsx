/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { chevronDownOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import {
	ZIonAvatar,
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
import { workspaceFormRoleEnum } from '@/types/AdminPanel/workspace';

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
	return (
		<ZIonRow className='mt-3 px-3'>
			<Formik
				initialValues={{
					role: workspaceFormRoleEnum.Approver,
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
							{/* Avatar */}
							<ZIonCol size='max-content'>
								<ZIonAvatar className='w-[30px] h-[30px] mt-1'>
									<ZIonImg src={ProductLogo} />
								</ZIonAvatar>
							</ZIonCol>

							{/* Fields */}
							<ZIonCol>
								<ZIonRow>
									<ZIonCol size='6'>
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

									<ZIonCol size='6'>
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
									<ZIonCol size='6'>
										<ZIonButton
											fill='outline'
											id='role-popover-index'
											className={classNames({
												'm-0 d-flex h-100 text-transform-initial ion-align-items-start':
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

									<ZIonCol size='6'>
										<ZIonButton
											fill='outline'
											id={`permission-popover-index`}
											className='m-0 d-flex h-100 text-transform-initial'
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
								</ZIonRow>
							</ZIonCol>
						</>
					);
				}}
			</Formik>
		</ZIonRow>
	);
};

export default ZInviteTab;
