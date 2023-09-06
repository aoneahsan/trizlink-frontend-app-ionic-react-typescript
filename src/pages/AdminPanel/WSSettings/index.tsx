/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { RefresherEventDetail } from '@ionic/react';
import { useParams, useRouteMatch } from 'react-router';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonMenu,
	ZIonMenuToggle,
	ZIonRefresher,
	ZIonRefresherContent,
	ZIonRow,
	ZIonText,
	ZIonTitle,
	ZIonToolbar,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZWSTeamCreateModal from '@/components/InPageComponents/ZaionsModals/Workspace/Team/CreateModal';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import ZCan from '@/components/Can';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
const AdminPanelSidebarMenu = lazy(
	() => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);
const ZAdminPanelTopBar = lazy(
	() => import('@/components/AdminPanelComponents/TopBar')
);
const ZWSSettingsMenu = lazy(
	() => import('@/components/AdminPanelComponents/Sidebar/WSSettingsMenu')
);
const ZWSSettingTeamsListPage = lazy(() => import('./Team'));

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';
import {
	workspaceTeamInterface,
	WSSettingsPageSectTab,
} from '@/types/AdminPanel/workspace';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import { replaceRouteParams } from '@/utils/helpers';
import { closeOutline } from 'ionicons/icons';

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
 * About: (User settings page)
 * @type {*}
 * */
const ZWorkspaceSettings: React.FC = () => {
	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();
	// #region Custom hooks.
	const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
	// #endregion

	// #region Recoils.
	// Recoil state that control the dashboard.
	const ZDashboardState = useRecoilValue(ZDashboardRState);
	// #endregion

	// #region APIS
	// Request for getting teams data.
	const { data: WSTeamsData, refetch: refetchWSTeamsData } = useZRQGetRequest<
		workspaceTeamInterface[]
	>({
		_url: API_URL_ENUM.workspace_team_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.TEAM, workspaceId],
		_itemsIds: [workspaceId],
		_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
	});

	// #endregion

	// #region Popovers & Modals.
	const { presentZIonModal: presentZWSTeamCreateModal } = useZIonModal(
		ZWSTeamCreateModal,
		{
			workspaceId: workspaceId,
		}
	);
	// #endregion

	// #region Functions.
	const invalidedQueries = async () => {
		try {
			await refetchWSTeamsData();
		} catch (error) {
			reportCustomError(error);
		}
	};

	const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
		try {
			await invalidedQueries();
			event.detail.complete();
		} catch (error) {
			reportCustomError(error);
		}
	};

	// #endregion

	// #region checking the route.
	const isTeamPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team
	)?.isExact;

	const isReferralProgramPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
	)?.isExact;

	const isBillingPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
	)?.isExact;

	const isUserPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
	)?.isExact;
	// #endregion

	return (
		<>
			{/* Menu to show in small screen. */}
			<ZIonMenu
				side='start'
				menuId={CONSTANTS.MENU_IDS.WS_SETTINGS_PAGE_MENU_ID}
				contentId={CONSTANTS.MENU_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID}
			>
				<ZIonHeader>
					<ZIonToolbar className='flex ion-align-items-center w-full'>
						{/* <ZIonTitle>First Menu</ZIonTitle> */}
						<ZIonMenuToggle slot='end' className='pt-1'>
							<ZIonIcon icon={closeOutline} className='w-7 h-7' />
						</ZIonMenuToggle>
					</ZIonToolbar>
				</ZIonHeader>
				<ZIonContent className='ion-padding'>
					{/* Account Settings */}
					<ZIonTitle className='ion-no-padding ion-text-center mt-2 font-semibold text-xl'>
						Account settings
					</ZIonTitle>
					<ZIonList lines='none'>
						{/* Team */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': isTeamPage,
							})}
							routerLink={replaceRouteParams(
								ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
								[CONSTANTS.RouteParams.workspace.workspaceId],
								[workspaceId]
							)}
						>
							Team
						</ZIonItem>

						{/* Referral program */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': isReferralProgramPage,
							})}
							testingselector={
								CONSTANTS.testingSelectors.WSSettings.menuBar.as.referralBtn
							}
							routerLink={replaceRouteParams(
								ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram,
								[CONSTANTS.RouteParams.workspace.workspaceId],
								[workspaceId]
							)}
						>
							Referral program
						</ZIonItem>

						{/* Billing */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': isBillingPage,
							})}
							testingselector={
								CONSTANTS.testingSelectors.WSSettings.menuBar.as.billingBtn
							}
							routerLink={replaceRouteParams(
								ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing,
								[CONSTANTS.RouteParams.workspace.workspaceId],
								[workspaceId]
							)}
						>
							Billing
						</ZIonItem>

						{/* User */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': isUserPage,
							})}
							testingselector={
								CONSTANTS.testingSelectors.WSSettings.menuBar.as.userBtn
							}
							routerLink={replaceRouteParams(
								ZaionsRoutes.AdminPanel.Setting.AccountSettings.User,
								[CONSTANTS.RouteParams.workspace.workspaceId],
								[workspaceId]
							)}
						>
							User
						</ZIonItem>
					</ZIonList>

					{/* Workspace settings */}
					<ZIonTitle className='ion-no-padding ion-text-center mt-1 font-semibold text-xl'>
						Workspace settings
					</ZIonTitle>
					<ZIonList lines='none'>
						{/* Pixels */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': false,
							})}
							// routerLink={replaceRouteParams(
							// 	ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
							// 	[CONSTANTS.RouteParams.workspace.workspaceId],
							// 	[workspaceId]
							// )}
						>
							Pixels
						</ZIonItem>

						{/* Utm tags */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': false,
							})}
							// routerLink={replaceRouteParams(
							// 	ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
							// 	[CONSTANTS.RouteParams.workspace.workspaceId],
							// 	[workspaceId]
							// )}
						>
							Utm tags
						</ZIonItem>

						{/* Embed widgets */}
						<ZIonItem
							minHeight='2rem'
							className={classNames({
								'mt-1 cursor-pointer': true,
								'zaions__light_bg font-normal': false,
							})}
							// routerLink={replaceRouteParams(
							// 	ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
							// 	[CONSTANTS.RouteParams.workspace.workspaceId],
							// 	[workspaceId]
							// )}
						>
							Embed widgets
						</ZIonItem>
					</ZIonList>
				</ZIonContent>
			</ZIonMenu>

			{/*  */}
			<ZIonPage
				pageTitle='Workspace settings page'
				id={
					!isMdScale
						? CONSTANTS.MENU_IDS.ADMIN_PANEL_WS_SETTING_PAGE_ID
						: undefined
				}
			>
				<ZCan
					havePermissions={[permissionsEnum.viewAny_workspaceTeam]}
					returnPermissionDeniedView={true}
				>
					{/* Content */}
					<ZIonContent>
						{/* IonRefresher */}
						<ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
							<ZIonRefresherContent />
						</ZIonRefresher>

						{/* Grid-1 */}
						<ZIonGrid
							className={classNames({
								'h-screen ion-no-padding': true,
								'max-w-[200rem] mx-auto': false,
							})}
						>
							{/* Row-1 */}
							<ZIonRow className='h-full'>
								{/* Col-1 Side bar */}
								<Suspense
									fallback={
										<ZIonCol
											size='.8'
											className='h-full zaions__medium_bg zaions-transition'
										>
											<ZFallbackIonSpinner2 />
										</ZIonCol>
									}
								>
									<AdminPanelSidebarMenu
										activePage={AdminPanelSidebarMenuPageEnum.settings}
									/>
								</Suspense>

								{/* Col-2 Right-side Main Container */}
								<ZIonCol
									sizeXl={
										ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
											? '10'
											: '11.2'
									}
									sizeLg={
										ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
											? '10'
											: '11.2'
									}
									sizeMd='12'
									sizeSm='12'
									sizeXs='12'
									className='h-screen zaions-transition'
								>
									<ZIonGrid
										className={classNames({
											'h-full ion-no-padding': true,
											'mt-2': !isLgScale,
										})}
									>
										{/* Col-2 Row-1 Top bar. */}
										<Suspense
											fallback={
												<ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
													<ZFallbackIonSpinner2 />
												</ZIonRow>
											}
										>
											<ZAdminPanelTopBar workspaceId={workspaceId} />
										</Suspense>

										{/* Col-2 Row-2 */}
										<ZIonRow style={{ height: 'calc(100% - 4rem)' }}>
											{/* Col-2 Row-2 col-1 Folder menu */}
											{isMdScale ? (
												<Suspense
													fallback={
														<ZIonCol className='h-full border-e-[1px] zaions-transition'>
															<ZFallbackIonSpinner2 />
														</ZIonCol>
													}
												>
													<ZWSSettingsMenu />
												</Suspense>
											) : null}

											{/* Col-2 Row-2 col-2 Table & filters etc. */}
											<ZIonCol
												className='h-full zaions-transition'
												sizeXl='9.2'
												sizeLg='9'
												sizeMd='9'
												sizeSm='12'
												sizeXs='12'
											>
												{!isSmScale ? (
													<ZInpageMainContent />
												) : (
													<ZCustomScrollable
														className={classNames({
															'flex flex-col w-full h-full px-3 pt-3': true,
															'gap-10': isMdScale,
															'gap-5': !isMdScale,
														})}
														scrollY={true}
													>
														<ZInpageMainContent />
													</ZCustomScrollable>
												)}
											</ZIonCol>
										</ZIonRow>
									</ZIonGrid>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					</ZIonContent>
				</ZCan>
			</ZIonPage>
		</>
	);
};

const ZInpageMainContent: React.FC = () => {
	// #region Custom hooks.
	const { isMdScale } = useZMediaQueryScale();
	// #endregion

	// #region checking the route.
	const isTeamPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team
	)?.isExact;

	const isReferralProgramPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
	)?.isExact;

	const isBillingPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
	)?.isExact;

	const isUserPage = useRouteMatch(
		ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
	)?.isExact;
	// #endregion

	return (
		<div
			className={classNames({
				'flex flex-col ion-no-margin ion-no-padding': true,
				'gap-8': isMdScale,
				'gap-3 py-3 px-2': !isMdScale,
			})}
		>
			<Suspense
				fallback={
					<ZIonCol className='h-full w-full'>
						<ZFallbackIonSpinner2 />
					</ZIonCol>
				}
			>
				{isTeamPage ? <ZWSSettingTeamsListPage /> : ''}
			</Suspense>
		</div>
	);
};

export default ZWorkspaceSettings;
