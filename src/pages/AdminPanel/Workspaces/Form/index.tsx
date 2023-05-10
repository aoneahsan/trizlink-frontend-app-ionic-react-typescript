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
import routeQueryString from 'qs';

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
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspaceFormConnectPagesTab from '@/pages/AdminPanel/Workspaces/Form/ConnectPagesTab';
import ZaionsIonPage from '@/components/ZaionsIonPage';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { createRedirectRoute, validateField } from '@/utils/helpers';
import { VALIDATION_RULE } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormTabEnum,
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
} from '@/types/AdminPanel/workspace';
import { arrowForward } from 'ionicons/icons';
import ZWorkspaceFormInviteClientsTab from './InviteClientsTab';
import ZWorkspaceFormDetailTab from './DetailTab';
import classNames from 'classnames';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

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

const ZWorkspaceForm: React.FC = () => {
	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	console.log(routeQSearchParams.tab);

	// useZNavigate for redirection
	const { zNavigatePushRoute } = useZNavigate();

	return (
		<ZaionsIonPage pageTitle='Zaions Workspace Form Page'>
			<Formik
				initialValues={{
					workspaceName: 'MTI',
					workspaceTimezone: '',
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

					validateField(
						'workspaceName',
						values,
						errors,
						VALIDATION_RULE.string
					);

					return errors;
				}}
				onSubmit={() => {}}
			>
				{({ values, isValid }) => {
					return (
						<>
							<ZIonContent>
								<ZIonGrid className='pb-2 mx-0'>
									{/*  */}
									<ZIonRow className='pt-5 ion-justify-content-center ion-align-items-center'>
										{/*  */}
										<ZIonCol className='ion-text-center' size='11'>
											{/* Tab Title */}
											<ZIonText className='text-4xl d-block'>
												{routeQSearchParams.tab ===
												workspaceFormTabEnum.workspaceDetailForm
													? 'Create a workspace'
													: routeQSearchParams.tab ===
													  workspaceFormTabEnum.inviteClients
													? 'Invite your clients'
													: routeQSearchParams.tab ===
													  workspaceFormTabEnum.connectPages
													? `Connect ${values.workspaceName}'s pages`
													: ''}
											</ZIonText>

											{/* Tab sub title */}
											<ZIonText className='mt-3 text-muted d-block'>
												{routeQSearchParams.tab ===
												workspaceFormTabEnum.workspaceDetailForm
													? 'A workspace is a group of channels and collaborators, a place where you can organize your campaigns, workflows and assets.'
													: routeQSearchParams.tab ===
													  workspaceFormTabEnum.inviteClients
													? 'Working with a client? Invite them in the workspace so they can approve and leave feedback on content.'
													: routeQSearchParams.tab ===
													  workspaceFormTabEnum.connectPages
													? 'Add all your brands’ content channels. You can always add more later.'
													: ''}
											</ZIonText>
										</ZIonCol>

										{/* tab's content */}
										{routeQSearchParams.tab ===
										workspaceFormTabEnum.workspaceDetailForm ? (
											<ZWorkspaceFormDetailTab />
										) : routeQSearchParams.tab ===
										  workspaceFormTabEnum.inviteClients ? (
											<ZWorkspaceFormInviteClientsTab />
										) : routeQSearchParams.tab ===
										  workspaceFormTabEnum.connectPages ? (
											<ZWorkspaceFormConnectPagesTab />
										) : (
											''
										)}
									</ZIonRow>
								</ZIonGrid>
							</ZIonContent>

							{/* Footer */}
							<ZIonFooter
								className='flex py-3 align-items-center'
								collapse='fade'
							>
								<div className='w-4/12 mx-auto'>
									<ZIonRow
										className={classNames({
											'ion-justify-content-center':
												routeQSearchParams.tab ===
												workspaceFormTabEnum.workspaceDetailForm,
										})}
									>
										{routeQSearchParams.tab ===
										workspaceFormTabEnum.workspaceDetailForm ? (
											<ZIonCol size='6'>
												{/* Next button */}
												<ZIonButton
													expand='block'
													className='text-transform-initial'
													disabled={!isValid}
													onClick={() => {
														zNavigatePushRoute(
															createRedirectRoute({
																url: ZaionsRoutes.AdminPanel.Workspaces.Create,
																routeSearchParams: {
																	tab: workspaceFormTabEnum.inviteClients,
																},
															})
														);
													}}
												>
													Next <ZIonIcon className='ms-2' icon={arrowForward} />
												</ZIonButton>
											</ZIonCol>
										) : routeQSearchParams.tab ===
												workspaceFormTabEnum.inviteClients ||
										  routeQSearchParams.tab ===
												workspaceFormTabEnum.connectPages ? (
											<>
												{/* Go Back button */}
												<ZIonCol size='6'>
													<ZIonButton
														expand='block'
														fill='outline'
														className='text-transform-initial'
														onClick={() => {
															switch (routeQSearchParams.tab) {
																case workspaceFormTabEnum.inviteClients:
																	zNavigatePushRoute(
																		createRedirectRoute({
																			url: ZaionsRoutes.AdminPanel.Workspaces
																				.Create,
																			routeSearchParams: {
																				tab: workspaceFormTabEnum.workspaceDetailForm,
																			},
																		})
																	);
																	break;

																case workspaceFormTabEnum.connectPages:
																	zNavigatePushRoute(
																		createRedirectRoute({
																			url: ZaionsRoutes.AdminPanel.Workspaces
																				.Create,
																			routeSearchParams: {
																				tab: workspaceFormTabEnum.inviteClients,
																			},
																		})
																	);
																	break;
															}
														}}
													>
														Go Back
													</ZIonButton>
												</ZIonCol>

												{/* Invite/Connect Later button */}
												<ZIonCol size='6'>
													<ZIonButton
														expand='block'
														className='text-transform-initial'
														onClick={() => {
															switch (routeQSearchParams.tab) {
																case workspaceFormTabEnum.inviteClients:
																	zNavigatePushRoute(
																		createRedirectRoute({
																			url: ZaionsRoutes.AdminPanel.Workspaces
																				.Create,
																			routeSearchParams: {
																				tab: workspaceFormTabEnum.connectPages,
																			},
																		})
																	);
																	break;

																// case workspaceFormTabEnum.connectPages:

																// 	break;
															}
														}}
													>
														{routeQSearchParams.tab ===
														workspaceFormTabEnum.inviteClients
															? 'Invite'
															: routeQSearchParams.tab ===
															  workspaceFormTabEnum.connectPages
															? 'Connect'
															: ''}{' '}
														Later
													</ZIonButton>
												</ZIonCol>
											</>
										) : (
											''
										)}
									</ZIonRow>
									<ZIonRow className='gap-1 mt-3 ion-align-items-center'>
										<ZIonCol
											className={classNames({
												'h-2 p-0 m-0 rounded zaions-transition zaions__primary_bg':
													true,
											})}
										></ZIonCol>
										<ZIonCol
											className={classNames({
												'h-2 p-0 m-0 rounded zaions-transition': true,
												zaions__primary_bg:
													routeQSearchParams.tab ===
														workspaceFormTabEnum.inviteClients ||
													routeQSearchParams.tab ===
														workspaceFormTabEnum.connectPages,
												zaions__medium_bg:
													routeQSearchParams.tab ===
													workspaceFormTabEnum.workspaceDetailForm,
											})}
										></ZIonCol>
										<ZIonCol
											className={classNames({
												'h-2 p-0 m-0 rounded zaions-transition': true,
												zaions__primary_bg:
													routeQSearchParams.tab ===
													workspaceFormTabEnum.connectPages,
												zaions__medium_bg:
													routeQSearchParams.tab ===
														workspaceFormTabEnum.workspaceDetailForm ||
													routeQSearchParams.tab ===
														workspaceFormTabEnum.inviteClients,
											})}
										></ZIonCol>
									</ZIonRow>
								</div>
							</ZIonFooter>
						</>
					);
				}}
			</Formik>
		</ZaionsIonPage>
	);
};

export default ZWorkspaceForm;
