/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { lazy, Suspense } from 'react';

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
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZWorkspacesCardSkeleton from '@/components/WorkspacesComponents/ListCard/index.skeleton';
import ZCan from '@/components/Can';
import ZAddNewWorkspaceModal from '@/components/InPageComponents/ZaionsModals/Workspace/CreateModal';
//
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';

const ZWorkspacesCard = lazy(
	() => import('@/components/WorkspacesComponents/ListCard')
);

// const ZUserProfileButton = lazy(
// 	() => import('@/components/AdminPanelComponents/UserProfileButton')
// );

const ZAdminPanelTopBar = lazy(
	() => import('@/components/AdminPanelComponents/TopBar')
);

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
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
import { Swiper, SwiperSlide } from 'swiper/react';

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
 * About: (Workspace list page.)
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
				<ZIonContent className='mb-5'>
					{/* Main grid */}
					<ZIonGrid className='h-full ion-no-padding'>
						{/* Top workspace menu */}
						{/* <ZIonRow className='pt-2'>
										{/*  invite buttons col * /}
										<ZIonCol>
											<ZIonButtons className='gap-3 ion-align-items-center'>
												{/* Invite button * /}
												<ZIonButton
													fill='solid'
													color='primary'
													disabled={isWorkspacesDataFetching}
													className='normal-case ion-no-margin'
													testingSelector={
														CONSTANTS.testingSelectors.workspace.listPage
															.inviteButton
													}
												>
													<ZIonIcon icon={addOutline} /> Invite
												</ZIonButton>
											</ZIonButtons>
										</ZIonCol>

										{/* new workspace button col * /}
										<ZIonCol className='flex gap-8 pe-3 ion-align-items-center ion-justify-content-end'>
											<ZCan
												havePermissions={[permissionsEnum.create_workspace]}
											>
												<ZIonButton
													className='normal-case ion-no-margin'
													color='secondary'
													disabled={isWorkspacesDataFetching}
													testingSelector={
														CONSTANTS.testingSelectors.workspace.listPage
															.createWorkspaceButton
													}
													onClick={() => {
														if (!isWorkspacesDataFetching)
															presentZWorkspaceCreateModal({
																_cssClass: 'create-workspace-modal-size',
															});
													}}
												>
													<ZIonIcon icon={addOutline} /> New workspace
												</ZIonButton>
											</ZCan>

											{/* User profile button * /}
											<Suspense
												fallback={
													<div className='w-[44px] h-[44px] rounded-full'></div>
												}
											>
												<ZUserProfileButton />
											</Suspense>
										</ZIonCol>
									</ZIonRow> */}
						<Suspense
							fallback={
								<ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
									<ZFallbackIonSpinner2 />
								</ZIonRow>
							}
						>
							<ZAdminPanelTopBar />
						</Suspense>

						{/* cards row */}
						<ZIonRow className='py-5 px-4'>
							<ZIonCol size='12' className='ps-3'>
								<ZIonTitle className='ion-no-padding font-bold'>
									Owned workspaces
								</ZIonTitle>
							</ZIonCol>
							{/* single card */}
							<Suspense fallback={<ZWorkspacesCardSkeleton />}>
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
							</Suspense>

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
												<ZIonSkeletonText width='20px' height='20px' />

												<ZIonText className='text-lg'>
													<ZIonSkeletonText width='120px' height='15px' />
												</ZIonText>
											</ZIonCardContent>
										</ZIonCard>
									)}
								</ZIonCol>
							</ZCan>
						</ZIonRow>
						{/*  */}
					</ZIonGrid>
				</ZIonContent>
			</ZCan>
		</ZIonPage>
	);
};

export default ZWorkspaceListPage;
