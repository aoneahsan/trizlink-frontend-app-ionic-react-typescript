/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';

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
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormTabEnum,
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import { arrowForward } from 'ionicons/icons';
import ZWorkspaceFormInviteClientsTab from './InviteClientsTab';
import ZWorkspaceFormDetailTab from './DetailTab';
import classNames from 'classnames';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { useParams } from 'react-router';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import CONSTANTS from '@/utils/constants';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { AxiosError } from 'axios';
import { showErrorNotification } from '@/utils/notification';
import { reportCustomError } from '@/utils/customErrorType';
import { useRecoilState } from 'recoil';
import { WorkspaceRStateAtomFamily } from '@/ZaionsStore/UserDashboard/Workspace/index.recoil';

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

	// useZNavigate for redirection
	const { zNavigatePushRoute } = useZNavigate();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// Recoil State that hold workspaces.
	// const [workspaceState, setWorkspaceState] = useRecoilState(
	// 	WorkspaceRStateAtomFamily(editWorkspaceId)
	// );

	// fetching link-in-bio with the editWorkspaceId data from backend.
	const { data: selectedWorkspace, refetch: refetchSelectedWorkspace } =
		useZRQGetRequest<workspaceInterface>({
			_url: API_URL_ENUM.workspace_update_delete,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.GET],
			_authenticated: true,
			_itemsIds: [editWorkspaceId],
			_urlDynamicParts: [CONSTANTS.RouteParams.workspaceId],
			_shouldFetchWhenIdPassed: !editWorkspaceId ? true : false,
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	//
	const WorkspaceGetRequestFn = useCallback(async () => {
		await refetchSelectedWorkspace();
		// eslint-disable-next-line
	}, []);

	// Refetching if the editLinkInBioId changes and if the editLinkInBioId is undefined it will redirect user to link-in-bio page.
	useEffect(() => {
		try {
			if (editWorkspaceId) {
				void WorkspaceGetRequestFn();
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				zNavigatePushRoute(ZaionsRoutes.AdminPanel.LinkInBio.Main);
				showErrorNotification(error.message);
			} else {
				reportCustomError(error);
			}
		}
		// eslint-disable-next-line
	}, [editWorkspaceId]);

	// useEffect(() => {
	// 	try {
	// 		if (selectedWorkspace?.id) {
	// 			setWorkspaceState((prevState) => {
	// 				const newWorkspaceState = prevState.filter(
	// 					(workspace) => workspace.id !== editWorkspaceId
	// 				);
	// 				return [...newWorkspaceState, selectedWorkspace];
	// 			});
	// 		}
	// 	} catch (error) {
	// 		if (error instanceof AxiosError) {
	// 			zNavigatePushRoute(ZaionsRoutes.AdminPanel.LinkInBio.Main);
	// 			showErrorNotification(error.message);
	// 		} else {
	// 			reportCustomError(error);
	// 		}
	// 	}
	// 	// eslint-disable-next-line
	// }, [selectedWorkspace]);

	console.log({
		editWorkspaceId,
		selectedWorkspace,
	});

	if (!selectedWorkspace) return null;

	return (
		<ZaionsIonPage pageTitle='Zaions Workspace Form Page'>
			<Formik
				initialValues={{
					workspaceName: selectedWorkspace?.workspaceName,
					workspaceTimezone: selectedWorkspace?.workspaceTimezone,
					clients: [
						{
							email: '',
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
				{({ values }) => {
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
													disabled={values.workspaceName?.trim().length === 0}
													onClick={() => {
														zNavigatePushRoute(
															createRedirectRoute({
																url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
																params: [
																	CONSTANTS.RouteParams.editWorkspaceIdParam,
																],
																values: [editWorkspaceId],
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
																				.Edit,
																			params: [
																				CONSTANTS.RouteParams
																					.editWorkspaceIdParam,
																			],
																			values: [editWorkspaceId],
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
																				.Edit,
																			params: [
																				CONSTANTS.RouteParams
																					.editWorkspaceIdParam,
																			],
																			values: [editWorkspaceId],
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
																				.Edit,
																			params: [
																				CONSTANTS.RouteParams
																					.editWorkspaceIdParam,
																			],
																			values: [editWorkspaceId],
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
