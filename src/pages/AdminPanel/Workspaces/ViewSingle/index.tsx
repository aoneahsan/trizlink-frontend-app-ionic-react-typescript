/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	addCircleOutline,
	createOutline,
	ellipsisVerticalOutline,
	filterOutline,
	gridOutline,
	helpCircleOutline,
	imageOutline,
	logoFacebook,
	logoGoogle,
	logoInstagram,
	logoLinkedin,
	logoPinterest,
	logoTiktok,
	logoTwitter,
	logoYoutube,
	notificationsOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonMenuToggle,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonText,
} from '@/components/ZIonComponents';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';
import ZWorkspaceLinkedinPageLayout from '@/components/WorkspacesComponents/PagesLayout/Linkedin';
import ZWorkspaceFacebookPageLayout from '@/components/WorkspacesComponents/PagesLayout/Facebook';
import ZWorkspaceUniversalContentPageLayout from '@/components/WorkspacesComponents/PagesLayout/UniversalContent';
import ZWorkspacesActionPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ActionsPopover';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';
import ZWorkspaceAppStatusPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/AppStatusPopover';
import ZWorkspaceTiktokPageLayout from '@/components/WorkspacesComponents/PagesLayout/Tiktok';
import ZWorkspacePinterestPageLayout from '@/components/WorkspacesComponents/PagesLayout/Pinterest';
import ZWorkspaceYoutubePageLayout from '@/components/WorkspacesComponents/PagesLayout/Youtube';
import ZWorkspaceTwitterPageLayout from '@/components/WorkspacesComponents/PagesLayout/Twitter';
import ZWorkspaceInstagramPageLayout from '@/components/WorkspacesComponents/PagesLayout/Instagram';
import ZWorkspaceProfilePopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ProfilePopover';
import ZWorkspaceNotificationPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/NotificationsPopover';
import ZWorkspaceImportExportPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ImportExportPopover';
import { workspacePagesDomeData } from '@/data/UserDashboard/Workspace/index.data';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { PAGE_MENU } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesEnum,
	WorkspaceSharingTabEnum,
} from '@/types/AdminPanel/workspace';

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
import { addIcon, ProductLogo } from '@/assets/images';
import { useRecoilState } from 'recoil';
import { WorkspaceComposeModalRStateAtom } from '@/ZaionsStore/UserDashboard/Workspace/ZCompose/index.recoil';
import ZWorkspaceComposeModal from '@/components/InPageComponents/ZaionsModals/Workspace/ComposeModal';
import { getPlatformIcon } from '@/utils/helpers';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ViewSingleWorkspace: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	const {
		presentZIonPopover: presentWorkspacesActionsPopover,
		// dismissZIonPopover: dismissWorkspacesActionsPopover,
	} = useZIonPopover(ZWorkspacesActionPopover, {
		showDeleteWorkspaceOption: false,
		showEditWorkspaceOption: false,
		showManageUserOption: true,
	}); // popover hook to show UserInfoPopover

	const { presentZIonPopover: presentWorkspaceAppStatusPopover } =
		useZIonPopover(ZWorkspaceAppStatusPopover); // popover hook to show ZWorkspaceAppStatusPopover

	const { presentZIonPopover: presentWorkspaceProfilePopover } = useZIonPopover(
		ZWorkspaceProfilePopover
	); // popover hook to show ZWorkspaceProfilePopover

	const { presentZIonPopover: presentWorkspaceNotificationPopover } =
		useZIonPopover(ZWorkspaceNotificationPopover); // popover hook to show ZWorkspaceNotificationPopover

	const { presentZIonPopover: presentWorkspaceImportExportPopover } =
		useZIonPopover(ZWorkspaceImportExportPopover); // popover hook to show ZWorkspaceImportExportPopover

	const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
		ZWorkspacesSharingModal,
		{
			Tab: WorkspaceSharingTabEnum.invite,
		}
	);

	// Recoil state to manage ZWorkspaceComposeModal.
	const [workspaceComposeModalStateAtom, setWorkspaceComposeModalStateAtom] =
		useRecoilState(WorkspaceComposeModalRStateAtom);

	return (
		<ZaionsIonPage
			pageTitle='Zaions view single workspace page'
			menu={PAGE_MENU.ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU}
			id={CONSTANTS.MENU_IDS.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID}
		>
			<Formik
				initialValues={{
					pageId: '1',
					pageType: workspaceFormConnectPagesEnum.facebook,
				}}
				validate={() => {
					const errors = {};

					return errors;
				}}
				onSubmit={() => {}}
			>
				{({ values, setFieldValue }) => {
					return (
						<>
							<ZIonHeader
								className={classNames({
									'ion-padding-horizontal': true,
									'p-0': !isLgScale,
								})}
							>
								<ZIonGrid className='pb-0'>
									{/* First row */}
									<ZIonRow className='ion-align-items-center'>
										{/* Go to workspaces button and Searchbar */}
										<ZIonCol
											sizeXl='4'
											sizeLg='5'
											sizeMd='12'
											sizeSm='12'
											sizeXs='12'
											className={classNames({
												'flex items-center gap-2': true,
												'order-3': !isLgScale,
											})}
										>
											<ZIonButton
												expand='block'
												className={classNames({
													'text-transform-initial': true,
													'w-1/4': !isLgScale,
												})}
												routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}
											>
												Workspaces
											</ZIonButton>

											<div
												className={classNames({
													'w-3/4': !isLgScale,
												})}
											>
												<ZIonSearchbar
													animated
													showClearButton='focus'
													color='light'
													style={{ '--box-shadow': 'none' }}
												/>
											</div>
										</ZIonCol>

										{/* workspace name & edit button */}
										<ZIonCol
											sizeXl='5'
											sizeLg='4'
											sizeMd='6'
											sizeSm='6'
											sizeXs='4'
											className={classNames({
												'flex items-center justify-center text-transform-initial':
													true,
												'ion-justify-content-center': isXlScale,
												'ion-justify-content-start':
													isLgScale || isMdScale || isSmScale || isXsScale,
											})}
										>
											<ZIonButton
												fill='default'
												className='text-2xl'
												onClick={(event: unknown) => {
													presentWorkspacesActionsPopover({
														_event: event as Event,
														_cssClass: 'zaions_workspaces_actions_popover_size',
														_dismissOnSelect: false,
													});
												}}
											>
												MTI
											</ZIonButton>
										</ZIonCol>

										{/* Help Button, Notifications Button, and UserAvatarInfo */}
										<ZIonCol
											sizeXl='3'
											sizeLg='3'
											sizeMd='6'
											sizeSm='6'
											sizeXs='8'
											className='flex items-center justify-end gap-2'
										>
											{/* Menu */}
											<ZIonButton
												size='default'
												fill='default'
												// onClick={(event: unknown) => {
												// 	presentWorkspaceImportExportPopover({
												// 		_event: event as Event,
												// 		_cssClass:
												// 			'zaions_workspaces_import_export_popover_size',
												// 		_dismissOnSelect: false,
												// 	});
												// }}
												className='ion-no-padding ion-no-margin text-transform-initial'
												color='dark'
											>
												<ZIonIcon
													icon={addCircleOutline}
													className='w-6 h-6 me-1'
												/>
												<ZIonText>Add page</ZIonText>
											</ZIonButton>

											<ZIonButton
												fill='default'
												className='ion-no-margin text-transform-initial'
												onClick={(event: unknown) => {
													presentWorkspaceAppStatusPopover({
														_event: event as Event,
														_cssClass: 'zaions_workspaces_actions_popover_size',
														_dismissOnSelect: false,
													});
												}}
											>
												<ZIonText>Help</ZIonText>
												<ZIonIcon
													icon={helpCircleOutline}
													className='w-6 h-6 ms-2'
												/>
											</ZIonButton>

											<ZIonButton
												fill='default'
												className='ion-no-margin me-2'
												onClick={(event: unknown) => {
													presentWorkspaceNotificationPopover({
														_event: event as Event,
														_cssClass:
															'zaions_workspaces_notifications_popover_size',
														_dismissOnSelect: false,
													});
												}}
											>
												<ZIonIcon
													icon={notificationsOutline}
													className='w-6 h-6'
												/>
											</ZIonButton>

											<ZUserAvatarInfo
												style={{ height: '40px', width: '40px' }}
												onClick={(event: unknown) => {
													presentWorkspaceProfilePopover({
														_event: event as Event,
														_cssClass: 'zaions_workspaces_profile_popover_size',
														_dismissOnSelect: false,
													});
												}}
											/>
										</ZIonCol>
									</ZIonRow>

									{/* Second row */}
									<ZIonRow
										className={classNames({
											'ion-align-items-center pb-0': true,
											'mt-2': !isXlScale,
										})}
									>
										{/* Users buttons */}
										<ZIonCol
											className={classNames({
												'pb-0': true,
												'mb-2': !isXlScale,
											})}
											sizeXl='2.5'
											sizeLg='6'
											sizeMd='6'
											sizeSm='6'
											sizeXs='12'
										>
											<ZUserAvatarInfo
												className='w-[10px] h-[10px]'
												userAvatar={ProductLogo}
												style={{ height: '35px', width: '35px' }}
												onClick={() => {
													presentWorkspaceSharingModal({
														_cssClass: 'workspace-sharing-modal-size',
													});
												}}
											/>

											{/* add user button */}
											<ZUserAvatarInfo
												className='ms-2'
												userAvatar={addIcon}
												style={{ height: '35px', width: '35px' }}
												onClick={() => {
													presentWorkspaceSharingModal({
														_cssClass: 'workspace-sharing-modal-size',
													});
												}}
											/>
										</ZIonCol>

										{/* Pages */}
										<ZIonCol
											className={classNames({
												'pb-0': true,
												'order-2': isXlScale,
												'order-3': !isXlScale,
											})}
											sizeXl='6'
											sizeLg='12'
											sizeMd='12'
											sizeSm='12'
											sizeXs='12'
										>
											<ZIonSegment
												scrollable={true}
												value={values.pageId}
												className='zaions_pretty_scrollbar'
											>
												{workspacePagesDomeData.map((el, index) => (
													<ZIonSegmentButton
														className='text-transform-initial px-1'
														value={String(index)}
														onClick={() => {
															setFieldValue('pageType', el.type, false);
															setFieldValue('pageId', index, false);
														}}
														style={{
															'--padding-end': '9px',
															'--padding-start': '9px',
														}}
														key={index}
													>
														<ZIonIcon
															icon={getPlatformIcon(el.type)}
															className='w-7 h-7 mb-2'
														/>
														<ZIonText className='pb-2 text-xs'>
															{el.pageName}
														</ZIonText>
													</ZIonSegmentButton>
												))}
											</ZIonSegment>
										</ZIonCol>

										{/* Menu, filter, media, compose buttons */}
										<ZIonCol
											sizeXl='3.5'
											sizeLg='6'
											sizeMd='6'
											sizeSm='6'
											sizeXs='12'
											className={classNames({
												'pb-0 flex': true,
												'order-3': isXlScale,
												'order-2 mb-2': !isXlScale,
												'ion-justify-content-end': isSmScale,
												'ion-justify-content-start': !isSmScale,
											})}
										>
											{/*  */}
											<ZIonButtons
												className={classNames({
													'gap-2': true,
													'flex ion-justify-content-between w-full': !isSmScale,
												})}
											>
												{/* Menu */}
												<ZIonButton
													onClick={(event: unknown) => {
														presentWorkspaceImportExportPopover({
															_event: event as Event,
															_cssClass:
																'zaions_workspaces_import_export_popover_size',
															_dismissOnSelect: false,
														});
													}}
												>
													<ZIonIcon icon={ellipsisVerticalOutline} />
												</ZIonButton>

												{/* filter */}
												<ZIonMenuToggle
													autoHide={false}
													menu={
														CONSTANTS.MENU_IDS
															.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID
													}
												>
													<ZIonButton className='text-transform-initial'>
														<ZIonIcon icon={filterOutline} />
														<ZIonText className='ms-2'>Filter</ZIonText>
													</ZIonButton>
												</ZIonMenuToggle>

												{/* media */}
												<ZIonButton className='text-transform-initial'>
													<ZIonIcon icon={imageOutline} />
													<ZIonText className='ms-2'>Media</ZIonText>
												</ZIonButton>

												{/* compose */}
												<ZIonButton
													color='primary'
													fill='solid'
													onClick={() => {
														setWorkspaceComposeModalStateAtom((oldValues) => ({
															...oldValues,
															isOpen: true,
														}));
													}}
												>
													<ZIonIcon icon={createOutline} />
													<ZIonText className='ms-2'>Compose</ZIonText>
												</ZIonButton>
											</ZIonButtons>
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>
							</ZIonHeader>

							{/*  */}
							<ZIonContent color='light'>
								{values.pageType === workspaceFormConnectPagesEnum.facebook ? (
									<ZWorkspaceFacebookPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.instagram ? (
									<ZWorkspaceInstagramPageLayout />
								) : values.pageType === workspaceFormConnectPagesEnum.tiktok ? (
									<ZWorkspaceTiktokPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.twitter ? (
									<ZWorkspaceTwitterPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.linkedin ? (
									<ZWorkspaceLinkedinPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.googleBusiness ? (
									<ZWorkspaceFacebookPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.pinterest ? (
									<ZWorkspacePinterestPageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.youtube ? (
									<ZWorkspaceYoutubePageLayout />
								) : values.pageType ===
								  workspaceFormConnectPagesEnum.universalContent ? (
									<ZWorkspaceUniversalContentPageLayout />
								) : (
									''
								)}
							</ZIonContent>
						</>
					);
				}}
			</Formik>

			{/* Compose Modal */}
			<ZWorkspaceComposeModal />
		</ZaionsIonPage>
	);
};

export default ViewSingleWorkspace;
