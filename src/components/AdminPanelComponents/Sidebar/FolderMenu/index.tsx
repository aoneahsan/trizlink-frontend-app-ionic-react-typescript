/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
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
	ZIonText,
} from '@/components/ZIonComponents';
import {
	AdminPanelMainSidebarMenuPageEnum,
	FormMode,
	ZDashboardFolderMenuInterface,
} from '@/types/AdminPanel/index.type';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceParams } from '@/utils/helpers';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import classNames from 'classnames';
import { appsOutline, ellipsisVertical } from 'ionicons/icons';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
/**
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
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

const ZDashboardFolderMenu: React.FC<ZDashboardFolderMenuInterface> = ({
	type,
	foldersData,
	showFoldersSaveReorderButton,
	handleFoldersReorder,
	addNewFolderButtonOnClickHandler,
	foldersSaveReorderButtonOnClickHandler,
	folderActionsButtonOnClickHandler,
}) => {
	// Custom Hooks
	const { zNavigatePushRoute } = useZNavigate();

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	//
	const setFolderFormState = useSetRecoilState(FolderFormState);

	return (
		<ZIonCol
			size={
				ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? '2' : '2.4'
			}
			className='ion-padding border-end zaions-transition'
		>
			<div className='ion-padding-top'>
				<ZIonList lines='none'>
					<ZIonItem className='zaions__cursor_pointer mb-2'>
						<h5 className='fw-bold m-0 p-0'>
							🔗 All{' '}
							{type === AdminPanelMainSidebarMenuPageEnum.shortLink
								? 'links'
								: type === AdminPanelMainSidebarMenuPageEnum.linkInBio
								? 'Link In Bios'
								: ''}
						</h5>
					</ZIonItem>
					<ZIonItem>
						<ZIonList lines='none' className='zaions__w100'>
							<ZIonItem className='ion-no-padding'>
								<ZIonText color='primary' className='fw-bold'>
									<h5 className='fw-bold d-block m-0 p-0'>📂 Folders</h5>
								</ZIonText>
							</ZIonItem>
							<ZIonItem
								className='zaions__cursor_pointer ms-2'
								onClick={() => {
									switch (type) {
										case AdminPanelMainSidebarMenuPageEnum.shortLink:
											zNavigatePushRoute(
												replaceParams(
													ZaionsRoutes.AdminPanel.ShortLinks.Main,
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
													'all'
												)
											);
											break;

										case AdminPanelMainSidebarMenuPageEnum.linkInBio:
											zNavigatePushRoute(
												replaceParams(
													ZaionsRoutes.AdminPanel.LinkInBio.Main,
													CONSTANTS.RouteParams
														.folderIdToGetShortLinksOrLinkInBio,
													'all'
												)
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
							{foldersData && foldersData.length ? (
								<ZIonReorderGroup
									disabled={false}
									onIonItemReorder={handleFoldersReorder}
								>
									{foldersData.map((el) => (
										<ZIonItem
											className={classNames({
												'zaions__cursor_pointer ': true,
												'zaions-short-link-folder':
													type === AdminPanelMainSidebarMenuPageEnum.shortLink,
												'zaions-link-in-bio-folder':
													type === AdminPanelMainSidebarMenuPageEnum.linkInBio,
											})}
											key={el.id}
											data-folder-id={el.id}
										>
											<ZIonLabel
												onClick={() => {
													switch (type) {
														case AdminPanelMainSidebarMenuPageEnum.shortLink:
															zNavigatePushRoute(
																replaceParams(
																	ZaionsRoutes.AdminPanel.ShortLinks.Main,
																	CONSTANTS.RouteParams
																		.folderIdToGetShortLinksOrLinkInBio,
																	el.id as string
																)
															);
															break;

														case AdminPanelMainSidebarMenuPageEnum.linkInBio:
															zNavigatePushRoute(
																replaceParams(
																	ZaionsRoutes.AdminPanel.LinkInBio.Main,
																	CONSTANTS.RouteParams
																		.folderIdToGetShortLinksOrLinkInBio,
																	el.id as string
																)
															);
															break;
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
							) : (
								''
							)}
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
						className='ion-text-capitalize ion-margin-horizontal position-absolute bottom-0'
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
