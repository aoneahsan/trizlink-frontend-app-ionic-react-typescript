/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import {
	ZIonButton,
	ZIonButtons,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspacesCard, {
	ZWorkspacesCardSkeleton,
} from '@/components/WorkspacesComponents/ListCard';
import ZAddNewWorkspaceModal from '@/components/InPageComponents/ZaionsModals/Workspace/CreateModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import ZUserProfileButton from '@/components/AdminPanelComponents/UserProfileButton';
import ZCan from '@/components/Can';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

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
import { workspaceInterface } from '@/types/AdminPanel/workspace';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

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

const ZWorkspaceListPage: React.FC = () => {
	//
	const { presentZIonModal: presentZWorkspaceCreateModal } = useZIonModal(
		ZAddNewWorkspaceModal
	);

	// Get workspaces data from backend.
	const { data: WorkspacesData, isFetching: isWorkspacesDataFetching } =
		useZRQGetRequest<workspaceInterface[]>({
			_url: API_URL_ENUM.workspace_create_list,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
		});

	return (
		<ZIonPage pageTitle='Zaions workspaces list page'>
			<ZCan
				havePermissions={[permissionsEnum.viewAny_workspace]}
				returnPermissionDeniedView={true}
			>
				<ZIonContent>
					{/* Main grid */}
					<ZIonGrid className='h-full ion-no-padding'>
						{/*  */}
						<ZIonRow className='h-full'>
							{/* Expendable Navigation in the left-hand side */}
							{/* <AdminPanelSidebarMenu
							activePage={AdminPanelSidebarMenuPageEnum.workspaces}
						/> */}

							{/* Main Container */}
							<ZIonCol
								className='zaions-transition'
								sizeXl='12'
								sizeLg='12'
								sizeMd='12'
								sizeSm='12'
								sizeXs='12'
							>
								<ZIonGrid className='px-4'>
									{/* Top workspace menu */}
									<ZIonRow className='pt-2'>
										{/*  invite buttons col */}
										<ZIonCol>
											<ZIonButtons className='gap-3 ion-align-items-center'>
												{/* Invite button */}
												<ZIonButton
													fill='solid'
													color='primary'
													className='ion-no-margin normal-case'
													testingSelector={
														CONSTANTS.testingSelectors.workspace.listPage
															.inviteButton
													}
												>
													<ZIonIcon icon={addOutline} /> Invite
												</ZIonButton>
											</ZIonButtons>
										</ZIonCol>

										{/* new workspace button col */}
										<ZIonCol className='flex gap-8 pe-3 ion-align-items-center ion-justify-content-end'>
											<ZCan
												havePermissions={[permissionsEnum.create_workspace]}
											>
												{!isWorkspacesDataFetching && (
													<ZIonButton
														className='ion-no-margin normal-case'
														color='secondary'
														testingSelector={
															CONSTANTS.testingSelectors.workspace.listPage
																.createWorkspaceButton
														}
														onClick={() => {
															presentZWorkspaceCreateModal({
																_cssClass: 'create-workspace-modal-size',
																_onDidDismiss: (event) => {
																	if (
																		event.detail.data &&
																		event.detail.role === 'success'
																	) {
																		// after dismissing redirecting to edit workspace-page
																		// zNavigatePushRoute(
																		// 	createRedirectRoute({
																		// 		url: ZaionsRoutes.AdminPanel.Workspaces
																		// 			.Edit,
																		// 		params: [
																		// 			CONSTANTS.RouteParams.workspace
																		// 				.editWorkspaceIdParam,
																		// 		],
																		// 		values: [event.detail.data],
																		// 		routeSearchParams: {
																		// 			tab: workspaceFormTabEnum.inviteClients,
																		// 		},
																		// 	})
																		// );
																	}
																},
															});
														}}
													>
														<ZIonIcon icon={addOutline} /> New workspace
													</ZIonButton>
												)}

												{isWorkspacesDataFetching && (
													<ZIonButton
														className='ion-no-margin normal-case'
														color='secondary'
													>
														<ZIonSkeletonText
															animated={true}
															style={{ width: '20px', height: '20px' }}
														/>
														<ZIonText className='ms-2'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '100px', height: '17px' }}
															/>
														</ZIonText>
													</ZIonButton>
												)}
											</ZCan>

											{/* User profile button */}
											<ZUserProfileButton />
										</ZIonCol>
									</ZIonRow>

									{/* cards row */}
									<ZIonRow className='mt-5'>
										{/* single card */}
										{!isWorkspacesDataFetching &&
											WorkspacesData &&
											WorkspacesData.map((el) => (
												<ZIonCol
													sizeXl='4'
													sizeLg='6'
													sizeMd='6'
													sizeSm='6'
													sizeXs='12'
													key={el.id}
												>
													<ZWorkspacesCard
														workspaceImage={el.workspaceImage}
														workspaceName={el.workspaceName as string}
														user={el.user}
														id={el.id}
														createdAt={el.createdAt}
													/>
												</ZIonCol>
											))}

										{isWorkspacesDataFetching && <ZWorkspacesCardSkeleton />}

										{/* add a workspace card */}
										<ZCan havePermissions={[permissionsEnum.create_workspace]}>
											<ZIonCol
												sizeXl='4'
												sizeLg='6'
												sizeMd='6'
												sizeSm='6'
												sizeXs='12'
											>
												{!isWorkspacesDataFetching && (
													<ZIonCard
														className={classNames({
															'h-[13.4rem] cursor-pointer': true,
														})}
														testingSelector={
															CONSTANTS.testingSelectors.workspace.listPage
																.createWorkspaceCardButton
														}
														onClick={() => {
															presentZWorkspaceCreateModal({
																_cssClass: 'create-workspace-modal-size',
																_onDidDismiss: (event) => {
																	if (
																		event.detail.data &&
																		event.detail.role === 'success'
																	) {
																		// after dismissing redirecting to edit workspace-page
																		// zNavigatePushRoute(
																		// 	createRedirectRoute({
																		// 		url: ZaionsRoutes.AdminPanel.Workspaces
																		// 			.Edit,
																		// 		params: [
																		// 			CONSTANTS.RouteParams.workspace
																		// 				.editWorkspaceIdParam,
																		// 		],
																		// 		values: [event.detail.data],
																		// 		routeSearchParams: {
																		// 			tab: workspaceFormTabEnum.inviteClients,
																		// 		},
																		// 	})
																		// );
																	}
																},
															});
														}}
													>
														<ZIonCardContent className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
															<ZIonIcon icon={addOutline} size='large' />
															<ZIonText className='text-lg'>
																Create a workspace
															</ZIonText>
														</ZIonCardContent>
													</ZIonCard>
												)}

												{isWorkspacesDataFetching && (
													<ZIonCard
														className={classNames({
															'h-[13.4rem] cursor-pointer': true,
														})}
													>
														<ZIonCardContent className='flex flex-col h-full ion-align-items-center ion-justify-content-center'>
															<ZIonSkeletonText
																animated={true}
																style={{ width: '20px', height: '20px' }}
															></ZIonSkeletonText>
															<ZIonText className='text-lg'>
																<ZIonSkeletonText
																	animated={true}
																	style={{ width: '150px', height: '17px' }}
																></ZIonSkeletonText>
															</ZIonText>
														</ZIonCardContent>
													</ZIonCard>
												)}
											</ZIonCol>
										</ZCan>
									</ZIonRow>
									{/*  */}
								</ZIonGrid>
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				</ZIonContent>
			</ZCan>
		</ZIonPage>
	);
};

export default ZWorkspaceListPage;
