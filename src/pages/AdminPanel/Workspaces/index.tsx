/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue } from 'recoil';
import { addOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonRow,
} from '@/components/ZIonComponents';
import AdminPanelMainSidebarMenu from '@/components/AdminPanelComponents/Sidebar/ExpendableMenu';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import ZUserInfoPopover from '@/components/InPageComponents/ZaionsPopovers/UserInfoPopover';
import ZWorkspacesCard from '@/components/WorkspacesComponents/ListCard';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelMainSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';

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
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { createRedirectRoute } from '@/utils/helpers';
import { workspaceFormTabEnum } from '@/types/AdminPanel/workspace';

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
	const ZDashboardState = useRecoilValue(ZDashboardRState);

	// Custom Hooks
	const { presentZIonPopover: presentUserInfoPopover } =
		useZIonPopover(ZUserInfoPopover); // popover hook to show UserInfoPopover

	return (
		<ZaionsIonPage pageTitle='Zaions workspaces list page'>
			<ZIonContent>
				{/* Main grid */}
				<ZIonGrid className='ion-no-padding zaions_h100'>
					{/*  */}
					<ZIonRow className='zaions_h100'>
						{/* Expendable Navigation in the left-hand side */}
						<AdminPanelMainSidebarMenu
							activePage={AdminPanelMainSidebarMenuPageEnum.workspaces}
						/>

						{/* Main Container */}
						<ZIonCol
							className='zaions-transition'
							sizeXl={
								ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
									? '10'
									: '11.2'
							}
							sizeLg={
								ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
									? '9'
									: '8.8'
							}
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonGrid className='px-4'>
								{/* Top workspace menu */}
								<ZIonRow className='pt-2'>
									{/* avatar and invite buttons col */}
									<ZIonCol>
										<ZIonButtons className='gap-3 ion-align-items-center'>
											{/* User avatar button */}
											<ZUserAvatarInfo
												onMouseEnter={(event: unknown) => {
													presentUserInfoPopover({
														_event: event as Event,
														_cssClass: 'zaions_user_info_popover_size',
													});
												}}
												userAvatar={ProductLogo}
											/>

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
									<ZIonCol className='ion-text-end'>
										<ZIonButton
											className='ion-no-margin text-transform-initial'
											color='secondary'
											// onClick={() => {
											// 	presentWorkspaceFormModal({
											// 		_cssClass: 'workspace-form-modal-size',
											// 	});
											// }}
											// createRedirectRoute({
											// 		url: ZaionsRoutes.AdminPanel.Workspaces.Create,
											// 		routeSearchParams: {
											// 			tab: workspaceFormTabEnum.workspaceDetailForm,
											// 		},
											// 	})
											routerLink={createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.Workspaces.Create,
												routeSearchParams: {
													tab: workspaceFormTabEnum.workspaceDetailForm,
												},
											})}
										>
											<ZIonIcon icon={addOutline} /> New workspace
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>

								{/* cards row */}
								<ZIonRow className='mt-5'>
									{/* single card */}
									<ZIonCol size='4'>
										<ZWorkspacesCard
											workspaceAvatar={ProductLogo}
											workspaceName='Zaions'
											workspacePagesCount='0'
											userAvatar={ProductLogo}
											lastActive='22h'
										/>
									</ZIonCol>
								</ZIonRow>

								{/*  */}
							</ZIonGrid>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZWorkspaceListPage;
