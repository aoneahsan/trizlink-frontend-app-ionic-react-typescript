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
import { replaceParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	AdminPanelMainSidebarMenuPageEnum,
	FormMode,
	ZDashboardFolderMenuInterface,
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import { API_URL_ENUM } from '@/utils/enums';

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

	// Request for getting short links folders.
	// const { data: shortLinksFoldersData } = useZRQGetRequest<LinkFolderType[]>({
	// 	_url: API_URL_ENUM.folders_create_list,
	// 	// _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN],
	// 	_key: ['make'],
	// });

	return (
		<ZIonCol
			size={
				ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? '2' : '2.4'
			}
			className='ion-padding border-e-[1px] zaions-transition'
		>
			<div className='ion-padding-top'>
				<ZIonList lines='none'>
					<ZIonItem className='p-0 mb-2 text-xl font-bold zaions__cursor_pointer'>
						🔗 All{' '}
						{type === AdminPanelMainSidebarMenuPageEnum.shortLink
							? 'links'
							: type === AdminPanelMainSidebarMenuPageEnum.linkInBio
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
										case AdminPanelMainSidebarMenuPageEnum.shortLink:
											zNavigatePushRoute(
												replaceParams(
													ZaionsRoutes.AdminPanel.ShortLinks.Main,
													CONSTANTS.RouteParams.folderIdToGetShortLinks,
													'all'
												)
											);
											break;

										case AdminPanelMainSidebarMenuPageEnum.linkInBio:
											zNavigatePushRoute(
												replaceParams(
													ZaionsRoutes.AdminPanel.LinkInBio.Main,
													CONSTANTS.RouteParams.folderIdToGetShortLinks,
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
																	CONSTANTS.RouteParams.folderIdToGetShortLinks,
																	el.id as string
																)
															);
															break;

														case AdminPanelMainSidebarMenuPageEnum.linkInBio:
															zNavigatePushRoute(
																replaceParams(
																	ZaionsRoutes.AdminPanel.LinkInBio.Main,
																	CONSTANTS.RouteParams.folderIdToGetShortLinks,
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
