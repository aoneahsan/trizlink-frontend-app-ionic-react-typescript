/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue } from 'recoil';
import { addOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
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
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesCard from '@/components/WorkspacesComponents/ListCard';
import ZAddNewWorkspaceModal from '@/components/InPageComponents/ZaionsModals/Workspace/CreateModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import ZUserProfileButton from '@/components/AdminPanelComponents/UserProfileButton';
import ZCan from '@/components/Can';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { createRedirectRoute } from '@/utils/helpers';
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
import {
	workspaceFormTabEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo } from '@/assets/images';

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
	// const ZDashboardState = useRecoilValue(ZDashboardRState);

	// Recoil State that hold workspaces.
	// const [workspaceState, setWorkspaceState] = useRecoilState(
	// 	WorkspaceRStateAtomFamily('')
	// );

	// Custom Hooks
	const { presentZIonPopover: presentUserInfoPopover } =
		useZIonPopover(ZUserInfoPopover); // popover hook to show UserInfoPopover

	//
	const { presentZIonModal: presentZWorkspaceCreateModal } = useZIonModal(
		ZAddNewWorkspaceModal
	);
	const { zNavigatePushRoute } = useZNavigate();

	// Get workspace data from backend.
	const { data: WorkspacesData } = useZRQGetRequest<workspaceInterface[]>({
		_url: API_URL_ENUM.workspace_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
	});

	// Using this when save in recoil
	// useEffect(() => {
	// 	try {
	// 		if (getWorkspaceData) {
	// 			setWorkspaceState(getWorkspaceData);
	// 		}
	// 	} catch (error) {
	// 		reportCustomError(error);
	// 	}
	// }, [getWorkspaceData]);

	return (
		<ZaionsIonPage pageTitle='Zaions workspaces list page'>
			<ZIonContent>
				<ZCan havePermission={permissionsEnum.viewAny_workspace}>
					{/* Main grid */}
					<ZIonGrid className='ion-no-padding zaions_h100'>
						{/*  */}
						<ZIonRow className='zaions_h100'>
							{/* Expendable Navigation in the left-hand side */}
							{/* <AdminPanelMainSidebarMenu
							activePage={AdminPanelMainSidebarMenuPageEnum.workspaces}
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
													className='ion-no-margin text-transform-initial'
												>
													<ZIonIcon icon={addOutline} /> Invite
												</ZIonButton>
											</ZIonButtons>
										</ZIonCol>

										{/* new workspace button col */}
										<ZIonCol className='flex gap-8 pe-3 ion-align-items-center ion-justify-content-end'>
											<ZCan havePermission={permissionsEnum.create_workspace}>
												<ZIonButton
													className='ion-no-margin text-transform-initial'
													color='secondary'
													onClick={() => {
														presentZWorkspaceCreateModal({
															_cssClass: 'create-workspace-modal-size',
															_onDidDismiss: (event) => {
																if (
																	event.detail.data &&
																	event.detail.role === 'success'
																) {
																	// after dismissing redirecting to edit workspace-page
																	zNavigatePushRoute(
																		createRedirectRoute({
																			url: ZaionsRoutes.AdminPanel.ShortLinks
																				.Main,
																			params: [
																				CONSTANTS.RouteParams.workspace
																					.workspaceId,
																				CONSTANTS.RouteParams
																					.folderIdToGetShortLinks,
																			],
																			values: [event.detail.data, 'all'],
																		})
																	);
																}
															},
														});
													}}
												>
													<ZIonIcon icon={addOutline} /> New workspace
												</ZIonButton>
											</ZCan>

											{/* User profile button */}
											<ZUserProfileButton />
										</ZIonCol>
									</ZIonRow>

									{/* cards row */}
									<ZIonRow className='mt-5'>
										{/* single card */}
										{WorkspacesData &&
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
														workspaceAvatar={ProductLogo}
														workspaceName={el.workspaceName as string}
														workspacePagesCount='0'
														userAvatar={ProductLogo}
														lastActive='22h'
														id={el.id}
													/>
												</ZIonCol>
											))}

										{/* add a workspace card */}
										<ZCan havePermission={permissionsEnum.create_workspace}>
											<ZIonCol
												sizeXl='4'
												sizeLg='6'
												sizeMd='6'
												sizeSm='6'
												sizeXs='12'
											>
												<ZIonCard
													className={classNames({
														'h-[13.4rem] zaions__cursor_pointer': true,
													})}
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

																	zNavigatePushRoute(
																		createRedirectRoute({
																			url: ZaionsRoutes.AdminPanel.ShortLinks
																				.Main,
																			params: [
																				CONSTANTS.RouteParams.workspace
																					.workspaceId,
																				CONSTANTS.RouteParams
																					.folderIdToGetShortLinks,
																			],
																			values: [event.detail.data, 'all'],
																		})
																	);
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
											</ZIonCol>
										</ZCan>
									</ZIonRow>
									{/*  */}
								</ZIonGrid>
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				</ZCan>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZWorkspaceListPage;
