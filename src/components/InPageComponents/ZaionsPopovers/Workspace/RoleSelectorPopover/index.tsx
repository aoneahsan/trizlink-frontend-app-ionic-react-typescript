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
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
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
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import { Formik } from 'formik';

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
	selectedRole: workspaceFormRoleEnum;
}> = ({ dismissZIonPopover, selectedRole }) => {
	return (
		<Formik
			initialValues={{
				role: selectedRole || workspaceFormRoleEnum.Approver,
			}}
			enableReinitialize={true}
			onSubmit={(values) => {
				dismissZIonPopover(values.role, values.role);
			}}
		>
			{({ values, initialValues, setFieldValue, submitForm }) => {
				return (
					<>
						<ZIonContent className='h-[17.2rem] ion-no-padding ion-no-margin overflow-hidden'>
							{/* <ZIonGrid className='h-[full] ion-no-padding'> */}
							<ZCustomScrollable className='w-full h-full' scrollY={true}>
								<ZIonRow>
									<ZIonCol size='12' className='px-3 mt-3'>
										<ZIonText className='block mb-2 text-lg font-bold'>
											Granted permissions
										</ZIonText>
										<ZIonRow>
											{/*  */}
											<ZIonCol
												size='6'
												className='flex gap-1 ion-align-items-center'
											>
												<ZIonIcon
													icon={checkmarkCircleOutline}
													color='success'
													className='w-5 h-5'
												/>
												<ZIonText>Comment on posts</ZIonText>
											</ZIonCol>

											{/*  */}
											<ZIonCol
												size='6'
												className='flex gap-1 ion-align-items-center '
											>
												<ZIonIcon
													icon={
														values.role === workspaceFormRoleEnum.Contributor ||
														values.role ===
															workspaceFormRoleEnum.Administrator ||
														values.role === workspaceFormRoleEnum.Writer
															? checkmarkCircleOutline
															: values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Approver
															? closeCircleOutline
															: ''
													}
													color={
														values.role === workspaceFormRoleEnum.Contributor ||
														values.role ===
															workspaceFormRoleEnum.Administrator ||
														values.role === workspaceFormRoleEnum.Writer
															? 'success'
															: values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Approver
															? 'danger'
															: undefined
													}
													className='w-5 h-5'
												/>
												<ZIonText>Create & edit posts</ZIonText>
											</ZIonCol>

											{/*  */}
											<ZIonCol
												size='6'
												className='flex gap-1 ion-align-items-center'
											>
												<ZIonIcon
													icon={
														values.role ===
															workspaceFormRoleEnum.Administrator ||
														values.role === workspaceFormRoleEnum.Approver
															? checkmarkCircleOutline
															: values.role ===
																	workspaceFormRoleEnum.Contributor ||
															  values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer
															? closeCircleOutline
															: ''
													}
													color={
														values.role ===
															workspaceFormRoleEnum.Administrator ||
														values.role === workspaceFormRoleEnum.Approver
															? 'success'
															: values.role ===
																	workspaceFormRoleEnum.Contributor ||
															  values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer
															? 'danger'
															: undefined
													}
													className='w-5 h-5'
												/>
												<ZIonText>Approve & disapprove</ZIonText>
											</ZIonCol>

											{/*  */}
											<ZIonCol
												size='6'
												className='flex gap-1 ion-align-items-center'
											>
												<ZIonIcon
													icon={
														values.role === workspaceFormRoleEnum.Contributor ||
														values.role === workspaceFormRoleEnum.Administrator
															? checkmarkCircleOutline
															: values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer ||
															  values.role === workspaceFormRoleEnum.Approver
															? closeCircleOutline
															: ''
													}
													color={
														values.role === workspaceFormRoleEnum.Contributor ||
														values.role === workspaceFormRoleEnum.Administrator
															? 'success'
															: values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer ||
															  values.role === workspaceFormRoleEnum.Approver
															? 'danger'
															: undefined
													}
													className='w-5 h-5'
												/>
												<ZIonText>Publish & schedule</ZIonText>
											</ZIonCol>

											{/*  */}
											<ZIonCol
												size='6'
												className='flex gap-1 ion-align-items-center'
											>
												<ZIonIcon
													icon={
														values.role === workspaceFormRoleEnum.Administrator
															? checkmarkCircleOutline
															: values.role ===
																	workspaceFormRoleEnum.Contributor ||
															  values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer ||
															  values.role === workspaceFormRoleEnum.Approver
															? closeCircleOutline
															: ''
													}
													color={
														values.role === workspaceFormRoleEnum.Administrator
															? 'success'
															: values.role ===
																	workspaceFormRoleEnum.Contributor ||
															  values.role === workspaceFormRoleEnum.Guest ||
															  values.role === workspaceFormRoleEnum.Writer ||
															  values.role === workspaceFormRoleEnum.Approver
															? 'danger'
															: undefined
													}
													className='w-5 h-5'
												/>
												<ZIonText>Manage users & pages</ZIonText>
											</ZIonCol>
										</ZIonRow>
									</ZIonCol>

									{/*  */}
									<ZIonCol size='12' className='ion-no-padding'>
										<ZIonList lines='full'>
											{/* Contributor */}
											<ZIonItem
												className='cursor-pointer ion-activatable'
												color={
													values.role === workspaceFormRoleEnum.Contributor
														? 'tertiary'
														: undefined
												}
												onClick={() => {
													setFieldValue(
														'role',
														workspaceFormRoleEnum.Contributor,
														false
													);
												}}
											>
												<ZIonLabel className='ion-text-wrap'>
													<ZIonText className='block font-bold'>
														Contributor
													</ZIonText>
													<ZIonText className='block mt-1 text-sm'>
														Can create & edit posts, comment and publish or
														schedule
													</ZIonText>
												</ZIonLabel>
											</ZIonItem>

											{/* Administrator */}
											<ZIonItem
												className='cursor-pointer ion-activatable'
												onClick={() => {
													setFieldValue(
														'role',
														workspaceFormRoleEnum.Administrator,
														false
													);
												}}
												color={
													values.role === workspaceFormRoleEnum.Administrator
														? 'tertiary'
														: undefined
												}
											>
												<ZIonLabel className='ion-text-wrap'>
													<ZIonText className='block font-bold'>
														Administrator
													</ZIonText>
													<ZIonText className='block mt-1 text-sm'>
														Has all permissions including managing users and
														adding new pages
													</ZIonText>
												</ZIonLabel>
											</ZIonItem>

											{/* Writer */}
											<ZIonItem
												className='cursor-pointer ion-activatable'
												onClick={() => {
													setFieldValue(
														'role',
														workspaceFormRoleEnum.Writer,
														false
													);
												}}
												color={
													values.role === workspaceFormRoleEnum.Writer
														? 'tertiary'
														: undefined
												}
											>
												<ZIonLabel className='ion-text-wrap'>
													<ZIonText className='block font-bold'>
														Writer
													</ZIonText>
													<ZIonText className='block mt-1 text-sm'>
														Can create, edit posts and comment
													</ZIonText>
												</ZIonLabel>
											</ZIonItem>

											{/* Approver */}
											<ZIonItem
												className='cursor-pointer ion-activatable'
												onClick={() => {
													setFieldValue(
														'role',
														workspaceFormRoleEnum.Approver,
														false
													);
												}}
												color={
													values.role === workspaceFormRoleEnum.Approver
														? 'tertiary'
														: undefined
												}
											>
												<ZIonLabel className='ion-text-wrap'>
													<ZIonText className='block font-bold'>
														Approver
													</ZIonText>
													<ZIonText className='block mt-1 text-sm'>
														Can approve posts and comment
													</ZIonText>
												</ZIonLabel>
											</ZIonItem>

											{/* Guest */}
											<ZIonItem
												lines='none'
												className='cursor-pointer ion-activatable'
												onClick={() => {
													setFieldValue(
														'role',
														workspaceFormRoleEnum.Guest,
														false
													);
												}}
												color={
													values.role === workspaceFormRoleEnum.Guest
														? 'tertiary'
														: undefined
												}
											>
												<ZIonLabel className='ion-text-wrap'>
													<ZIonText className='block font-bold'>Guest</ZIonText>
													<ZIonText className='block mt-1 text-sm'>
														Can view posts and comment
													</ZIonText>
												</ZIonLabel>
											</ZIonItem>
										</ZIonList>
									</ZIonCol>
								</ZIonRow>
							</ZCustomScrollable>
							{/* </ZIonGrid> */}
						</ZIonContent>
						<ZIonFooter collapse='fade' className='ion-text-end'>
							<ZIonButton
								onClick={submitForm}
								disabled={values.role === initialValues.role}
							>
								Save
							</ZIonButton>
							<ZIonButton
								fill='outline'
								onClick={() => {
									dismissZIonPopover(selectedRole, selectedRole);
								}}
							>
								Cancel
							</ZIonButton>
						</ZIonFooter>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceFormRoleSelectorPopover;
