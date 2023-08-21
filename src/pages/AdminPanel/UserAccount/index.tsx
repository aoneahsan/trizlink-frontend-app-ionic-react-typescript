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
import { useParams } from 'react-router';
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
	ZIonItem,
	ZIonList,
	ZIonRefresher,
	ZIonRefresherContent,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
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

const ZWSSettingTeamListTable = lazy(
	() =>
		import(
			'@/components/InPageComponents/ZaionsTable/Workspace/Settings/TeamListTable'
		)
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { AdminPanelSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';
import { WSSettingsPageSectTab } from '@/types/AdminPanel/workspace';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import CONSTANTS from '@/utils/constants';

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
const ZUserAccountSettings: React.FC = () => {
	// getting current workspace id form params.
	const { workspaceId, tab } = useParams<{
		workspaceId: string;
		tab: WSSettingsPageSectTab;
	}>();
	// #region Custom hooks.
	const { isSmScale } = useZMediaQueryScale();
	// #endregion

	// #region Recoils.
	// Recoil state that control the dashboard.
	const ZDashboardState = useRecoilValue(ZDashboardRState);
	// #endregion

	// #region APIS requests.

	// #endregion

	// #region Popovers & Modals.

	// #endregion

	// #region Functions.
	const invalidedQueries = async () => {
		try {
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

	return (
		<ZIonPage>
			<ZCan
				havePermissions={[permissionsEnum.viewAny_workspaceTeam]}
				returnPermissionDeniedView={true}
			>
				{/* Content */}
				<ZIonContent color='light'>
					{/* IonRefresher */}
					<ZIonRefresher onIonRefresh={(event) => void handleRefresh(event)}>
						<ZIonRefresherContent />
					</ZIonRefresher>

					{/* Grid-1 */}
					<ZIonGrid
						className={classNames({
							'h-screen ion-no-padding': true,
							'max-w-[200rem] mx-auto': true,
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
								<ZIonGrid className='h-full ion-no-padding'>
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
										<Suspense
											fallback={
												<ZIonCol className='h-full border-e-[1px] zaions-transition'>
													<ZFallbackIonSpinner2 />
												</ZIonCol>
											}
										>
											<ZWSSettingsMenu />
										</Suspense>

										{/* Col-2 Row-2 col-2 Table & filters etc. */}
										<ZIonCol
											className='h-full zaions-transition'
											sizeXl='9.2'
											sizeLg='9.2'
											sizeMd='12'
											sizeSm='12'
											sizeXs='12'
										>
											<ZCustomScrollable
												className='flex flex-col w-full h-full gap-10 px-3 pt-3'
												scrollY={true}
											>
												<div className='flex flex-col gap-8 ion-no-margin ion-no-padding'>
													<ZIonRow className='border rounded-lg zaions__bg_white ion-align-items-center ion-padding'>
														<ZIonCol>
															<ZIonTitle className='block text-2xl font-bold ion-no-padding'>
																Account
															</ZIonTitle>

															<ZIonText className='block mt-2'>
																Add team members & manage your team
															</ZIonText>
														</ZIonCol>

														<ZIonCol className='ion-text-end'>
															<ZIonButton
																color='primary'
																fill='solid'
																className='my-2'
																height='39px'
																expand={!isSmScale ? 'block' : undefined}
																testingSelector={
																	CONSTANTS.testingSelectors.WSSettings
																		.teamListPage.createTeamBtn
																}
															>
																Create new team
															</ZIonButton>
														</ZIonCol>
													</ZIonRow>

													{/* Shortlink Table */}
													<ZCan
														havePermissions={[
															permissionsEnum.view_workspaceTeam,
														]}
													>
														<Suspense
															fallback={
																<ZIonRow className='h-full'>
																	<ZFallbackIonSpinner2 />
																</ZIonRow>
															}
														>
															<ZWSSettingTeamListTable />
														</Suspense>
													</ZCan>
												</div>
											</ZCustomScrollable>
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>
							</ZIonCol>
						</ZIonRow>
					</ZIonGrid>
				</ZIonContent>
			</ZCan>
		</ZIonPage>
	);
};

export default ZUserAccountSettings;
