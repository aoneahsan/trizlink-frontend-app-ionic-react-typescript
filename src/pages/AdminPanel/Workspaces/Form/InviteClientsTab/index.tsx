/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, closeOutline } from 'ionicons/icons';
import { FieldArray, Formik } from 'formik';
import routeQueryString from 'qs';
import classNames from 'classnames';
import isEmail from 'validator/lib/isEmail';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonPopover,
	ZIonRow,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import ZWorkspaceFooterSteps from '@/components/WorkspacesComponents/FooterSteps';
import ZInviteClientsPermissionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/InviteClientPermissionPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
	workspaceFormTabEnum,
} from '@/types/AdminPanel/workspace';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return (
		<Formik
			initialValues={{
				clients: [
					{
						email: '',
						avatar: '',
						role: workspaceFormRoleEnum.Approver,
						permission: workspaceFormPermissionEnum.team,
					},
				],
			}}
			validate={() => {
				const errors: {} = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{({ values, handleBlur, handleChange, setFieldValue }) => {
				const shouldShowNextButton = values.clients?.some(
					(client) => client.email?.trim().length && isEmail(client.email)
				);
				return (
					<>
						<ZIonContent>
							<FieldArray name='clients'>
								{({ remove, push }) => (
									<ZIonGrid
										className={classNames({
											'mt-3': true,
											'mx-5': isXlScale,
											'mx-3': !isXlScale && isLgScale,
											'mx-2': !isLgScale && isMdScale,
											'mx-1': !isMdScale && isSmScale,
										})}
									>
										{values.clients?.map((el, index) => (
											<ZIonRow
												className={classNames({
													'mx-auto mt-2 ion-align-items-center ion-justify-content-center':
														true,
													'w-2/3': isXlScale,
													'w-[80%]': !isXlScale && isLgScale,
													'w-[90%]': !isLgScale && isMdScale,
													'w-full border-bottom py-3': !isMdScale && isSmScale,
													// 'w-full': !isSmScale,
												})}
												key={index}
											>
												{/* User avatar */}
												{isMdScale && (
													<ZIonCol
														sizeXl='1'
														sizeLg='1'
														sizeMd='1'
														sizeSm='2'
														sizeXs='2'
													>
														<ZUserAvatarButton
															userAvatar={el.avatar && el.avatar}
														/>
													</ZIonCol>
												)}

												{/* Inputs */}
												<ZIonCol
													sizeXl='9.8'
													sizeLg='9.8'
													sizeMd='9.5'
													sizeSm='12'
													sizeXs='12'
												>
													<div className='flex'>
														<div
															className={classNames({
																'w-3/4': isMdScale,
																'w-full': !isMdScale,
															})}
														>
															{/* Email input */}
															<ZIonInput
																name={`clients.${index}.email`}
																label='name@example.com'
																labelPlacement='floating'
																placeholder='name@example.com'
																onIonChange={handleChange}
																onIonBlur={handleBlur}
																value={
																	values.clients && values.clients[index].email
																}
															/>
														</div>

														{/* Role & permission buttons */}
														<div className='gap-2 zaions_max__content ms-2 flex'>
															{/* Role popover button */}
															<ZIonButton
																id={`role-popover-index-${index}`}
																fill='outline'
																className='m-0 flex h-full text-transform-initial'
															>
																{values.clients && values.clients[index].role}
															</ZIonButton>

															{/* permission popover */}
															<ZIonButton
																fill='outline'
																id={`permission-popover-index-${index}`}
																className='m-0 flex h-full text-transform-initial'
															>
																{values.clients &&
																	values.clients[index].permission}
															</ZIonButton>
														</div>
													</div>
												</ZIonCol>

												{/* Delete button */}
												<ZIonCol
													sizeXl='max-content'
													sizeLg='max-content'
													sizeMd='max-content'
													sizeSm='12'
													sizeXs='12'
													className={classNames({
														'ion-text-end': !isMdScale,
													})}
												>
													<ZIonButton
														fill={
															isMdScale
																? 'clear'
																: !isMdScale
																? 'solid'
																: 'default'
														}
														onClick={() => remove(index)}
														color={!isMdScale ? 'danger' : undefined}
														className='text-transform-initial'
														expand={!isMdScale ? 'block' : undefined}
													>
														{isMdScale && (
															<ZIonIcon
																icon={closeOutline}
																className='w-6 h-6 me-1'
															/>
														)}
														{!isMdScale && 'delete'}
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
																workspaceFormRoleEnum[
																	role as workspaceFormRoleEnum
																] !== undefined
																	? workspaceFormRoleEnum[
																			role as workspaceFormRoleEnum
																	  ]
																	: values.clients &&
																			values.clients[index].role,
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
																	: values.clients &&
																			values.clients[index].permission,
																false
															);
														}}
														selectedPermission={
															(values.clients &&
																values.clients[index].permission) ||
															workspaceFormPermissionEnum.team
														}
													/>
												</ZIonPopover>
											</ZIonRow>
										))}
										<ZIonRow
											className={classNames({
												'w-full mt-4 ion-justify-content-center': true,
												'ps-3': isXlScale,
												'ps-2': !isXlScale && isLgScale,
												'ps-1':
													(!isLgScale && isMdScale) ||
													(!isMdScale && isSmScale),
											})}
										>
											<ZIonCol
												sizeXl='8.2'
												sizeLg='8.2'
												sizeMd='9.2'
												sizeSm='12'
												sizeXs='12'
											>
												<ZIonButton
													className='text-transform-initial'
													onClick={() =>
														push({
															email: '',
															role: workspaceFormRoleEnum.Approver,
															permission: workspaceFormPermissionEnum.team,
														})
													}
													expand={!isMdScale ? 'block' : undefined}
												>
													<ZIonIcon icon={addOutline} className='me-1' /> Add
													more collaborators
												</ZIonButton>
											</ZIonCol>
										</ZIonRow>
									</ZIonGrid>
								)}
							</FieldArray>
						</ZIonContent>

						{/* Footer */}
						<ZIonFooter
							className='flex py-2 align-items-center'
							collapse='fade'
						>
							<div
								className={classNames({
									'mx-auto': true,
									'w-4/12': isXlScale,
									'w-5/12': !isXlScale && isLgScale,
									'w-6/12': !isLgScale && isMdScale,
									'w-7/12': !isMdScale && isSmScale,
									'w-full': !isSmScale,
								})}
							>
								<ZIonRow
									className={classNames({
										'ion-justify-content-center ion-align-items-center':
											routeQSearchParams.tab ===
											workspaceFormTabEnum.workspaceDetailForm,
									})}
								>
									{routeQSearchParams.tab ===
										workspaceFormTabEnum.inviteClients ||
									routeQSearchParams.tab ===
										workspaceFormTabEnum.connectPages ? (
										<>
											{/* Go Back button */}
											{/* <ZIonCol size='6'>
												<ZIonButton
													expand='block'
													fill='outline'
													className='text-transform-initial'
													routerLink={createRedirectRoute({
														url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
														params: [
															CONSTANTS.RouteParams.workspace.editWorkspaceIdParam,
														],
														values: [editWorkspaceId],
														routeSearchParams: {
															tab: workspaceFormTabEnum.workspaceDetailForm,
														},
													})}
												>
													Go Back
												</ZIonButton>
											</ZIonCol> */}

											{/* Invite Later button */}
											<ZIonCol
												sizeXl='6'
												sizeLg='6'
												sizeMd='6'
												sizeSm='6'
												sizeXs='12'
												className='mx-auto'
											>
												<ZIonButton
													expand='block'
													className='text-transform-initial'
													routerLink={createRedirectRoute({
														url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
														params: [
															CONSTANTS.RouteParams.workspace
																.editWorkspaceIdParam,
														],
														values: [editWorkspaceId],
														routeSearchParams: {
															tab: workspaceFormTabEnum.connectPages,
														},
													})}
													fill={shouldShowNextButton ? 'outline' : 'solid'}
												>
													Invite Later
												</ZIonButton>
											</ZIonCol>

											{/* If user have enter at least one email then this next button will shown */}
											{/* Next button */}
											{shouldShowNextButton && (
												<ZIonCol
													sizeXl='6'
													sizeLg='6'
													sizeMd='6'
													sizeSm='6'
													sizeXs='12'
													className='mx-auto'
												>
													<ZIonButton
														expand='block'
														className='text-transform-initial'
														routerLink={createRedirectRoute({
															url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
															params: [
																CONSTANTS.RouteParams.workspace
																	.editWorkspaceIdParam,
															],
															values: [editWorkspaceId],
															routeSearchParams: {
																tab: workspaceFormTabEnum.connectPages,
															},
														})}
													>
														Next
													</ZIonButton>
												</ZIonCol>
											)}
										</>
									) : (
										''
									)}
								</ZIonRow>

								{/*  */}
								<ZWorkspaceFooterSteps />
							</div>
						</ZIonFooter>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceFormInviteClientsTab;
