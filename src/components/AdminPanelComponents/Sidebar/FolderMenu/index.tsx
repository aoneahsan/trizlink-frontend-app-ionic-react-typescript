/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
/**
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { appsOutline, ellipsisVertical } from 'ionicons/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonReorder,
	ZIonReorderGroup,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { createRedirectRoute, replaceParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	AdminPanelSidebarMenuPageEnum,
	FormMode,
	ZDashboardFolderMenuInterface,
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { useParams } from 'react-router';
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

const ZDashboardFolderMenu: React.FC<ZDashboardFolderMenuInterface> = ({
	type,
	foldersData,
	showFoldersSaveReorderButton,
	showSkeleton = false,
	handleFoldersReorder,
	addNewFolderButtonOnClickHandler,
	foldersSaveReorderButtonOnClickHandler,
	folderActionsButtonOnClickHandler,
}) => {
	// Custom Hooks
	const { zNavigatePushRoute } = useZNavigate();

	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	//
	const setFolderFormState = useSetRecoilState(FolderFormState);

	// Request for getting short links folders.
	// const { data: shortLinksFoldersData } = useZRQGetRequest<LinkFolderType[]>({
	// 	_url: API_URL_ENUM.folders_create_list,
	// 	// _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
	// 	_key: ['make'],
	// });

	return (
		<ZIonCol
			className='ion-padding border-e-[1px] zaions-transition h-screen zaions_pretty_scrollbar overflow-y-scroll'
			size={
				ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? '2' : '2.4'
			}
		>
			<div className='ion-padding-top'>
				<ZIonList lines='none'>
					<ZIonItem className='p-0 mb-2 text-xl font-bold zaions__cursor_pointer'>
						🔗 All{' '}
						{type === AdminPanelSidebarMenuPageEnum.shortLink
							? 'links'
							: type === AdminPanelSidebarMenuPageEnum.linkInBio
							? 'Link In Bios'
							: ''}
					</ZIonItem>
					<ZIonItem>
						<ZIonList lines='none' className='w-full'>
							<ZIonItem className='ion-no-padding'>
								<ZIonText color='primary' className='block text-xl font-bold'>
									📂 Folders
								</ZIonText>
							</ZIonItem>

							<ZIonItem
								className='zaions__cursor_pointer ms-2'
								onClick={() => {
									switch (type) {
										case AdminPanelSidebarMenuPageEnum.shortLink:
											zNavigatePushRoute(
												createRedirectRoute({
													url: ZaionsRoutes.AdminPanel.ShortLinks.Main,
													params: [
														CONSTANTS.RouteParams.workspace.workspaceId,
														CONSTANTS.RouteParams
															.folderIdToGetShortLinksOrLinkInBio,
													],
													values: [workspaceId, 'all'],
												})
											);
											break;

										case AdminPanelSidebarMenuPageEnum.linkInBio:
											zNavigatePushRoute(
												createRedirectRoute({
													url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
													params: [
														CONSTANTS.RouteParams.workspace.workspaceId,
														CONSTANTS.RouteParams
															.folderIdToGetShortLinksOrLinkInBio,
													],
													values: [workspaceId, 'all'],
												})
											);
											break;
									}
								}}
							>
								<ZIonLabel>Default</ZIonLabel>
								<ZIonReorder slot='start' className='me-3'>
									<ZIonIcon icon={appsOutline} />
								</ZIonReorder>
							</ZIonItem>

							{!showSkeleton && foldersData && foldersData.length ? (
								<ZIonReorderGroup
									disabled={false}
									onIonItemReorder={handleFoldersReorder}
								>
									{foldersData.map((el) => (
										<ZIonItem
											className={classNames({
												zaions__cursor_pointer: true,
												'zaions-short-link-folder':
													type === AdminPanelSidebarMenuPageEnum.shortLink,
												'zaions-link-in-bio-folder':
													type === AdminPanelSidebarMenuPageEnum.linkInBio,
											})}
											key={el.id}
											data-folder-id={el.id}
										>
											<ZIonLabel
												onClick={() => {
													if (el.id) {
														switch (type) {
															case AdminPanelSidebarMenuPageEnum.shortLink:
																zNavigatePushRoute(
																	createRedirectRoute({
																		url: ZaionsRoutes.AdminPanel.ShortLinks
																			.Main,
																		params: [
																			CONSTANTS.RouteParams.workspace
																				.workspaceId,
																			CONSTANTS.RouteParams
																				.folderIdToGetShortLinksOrLinkInBio,
																		],
																		values: [workspaceId, el.id],
																	})
																);
																break;

															case AdminPanelSidebarMenuPageEnum.linkInBio:
																zNavigatePushRoute(
																	createRedirectRoute({
																		url: ZaionsRoutes.AdminPanel.LinkInBio.Main,
																		params: [
																			CONSTANTS.RouteParams.workspace
																				.workspaceId,
																			CONSTANTS.RouteParams
																				.folderIdToGetShortLinksOrLinkInBio,
																		],
																		values: [workspaceId, el.id],
																	})
																);
																break;
														}
													}
												}}
											>
												{el.title}
											</ZIonLabel>
											<ZIonButton
												fill='clear'
												color='dark'
												size='small'
												value={el.id}
												onClick={(event) => {
													folderActionsButtonOnClickHandler &&
														folderActionsButtonOnClickHandler(event);

													setFolderFormState((oldVal) => ({
														...oldVal,
														id: el.id,
														name: el.title,
														formMode: FormMode.EDIT,
													}));
												}}
												className='ion-no-padding ms-auto'
											>
												<ZIonIcon icon={ellipsisVertical} />
											</ZIonButton>
											<ZIonReorder slot='start' className='me-3'>
												<ZIonIcon icon={appsOutline}></ZIonIcon>
											</ZIonReorder>
										</ZIonItem>
									))}
								</ZIonReorderGroup>
							) : null}

							{showSkeleton &&
								[1, 2, 3].map((el) => (
									<ZIonItem
										key={el}
										className={classNames({
											'zaions__cursor_pointer ': true,
											'zaions-short-link-folder':
												type === AdminPanelSidebarMenuPageEnum.shortLink,
											'zaions-link-in-bio-folder':
												type === AdminPanelSidebarMenuPageEnum.linkInBio,
										})}
									>
										<ZIonText slot='start' className='me-3'>
											<ZIonSkeletonText
												height='1rem'
												width='1rem'
												animated={true}
											/>
										</ZIonText>
										<ZIonLabel>
											<ZIonSkeletonText
												height='1rem'
												width='7rem'
												animated={true}
											/>
										</ZIonLabel>
										<ZIonButton
											fill='clear'
											color='dark'
											size='small'
											className='ion-no-padding ms-auto'
										>
											<ZIonSkeletonText
												height='1rem'
												width='1rem'
												animated={true}
											/>
										</ZIonButton>
									</ZIonItem>
								))}
						</ZIonList>
					</ZIonItem>
				</ZIonList>

				<ZIonButton
					className='ion-text-capitalize ion-margin-horizontal'
					fill='outline'
					expand='block'
					onClick={addNewFolderButtonOnClickHandler}
				>
					New Folder
				</ZIonButton>

				{showFoldersSaveReorderButton && (
					<ZIonButton
						className='absolute bottom-0 ion-text-capitalize ion-margin-horizontal'
						expand='block'
						onClick={foldersSaveReorderButtonOnClickHandler}
						style={{ width: '78%' }}
					>
						save reorder
					</ZIonButton>
				)}
			</div>
		</ZIonCol>
	);
};

export default ZDashboardFolderMenu;
