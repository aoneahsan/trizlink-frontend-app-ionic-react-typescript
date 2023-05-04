/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import ShortLinksFolderActionsPopoverContent from '@/components/InPageComponents/ZaionsPopovers/ShortLinkFoldersActionPopover';
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
} from '@/types/AdminPanel/index.type';
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceParams } from '@/utils/helpers';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import {
	IonReorderGroupCustomEvent,
	ItemReorderEventDetail,
} from '@ionic/core';
import classNames from 'classnames';
import { appsOutline, ellipsisVertical } from 'ionicons/icons';
import React from 'react';
import { useRecoilValue } from 'recoil';

/**
 * Packages Imports go down
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
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZDashboardFolderMenuInterface {
	type: AdminPanelMainSidebarMenuPageEnum;
	foldersData: LinkFolderType[];
	showFoldersSaveReorderButton?: boolean;
	handleFoldersReorder?: (
		event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
	) => void;
	addNewFolderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
	foldersSaveReorderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
}

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
}) => {
	// Custom Hooks
	const { zNavigatePushRoute } = useZNavigate();

	const ZDashboardState = useRecoilValue(ZDashboardRState);

	//
	const { presentZIonPopover: presentFolderActionIonPopover } = useZIonPopover(
		ShortLinksFolderActionsPopoverContent
	);

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
											className='zaions__cursor_pointer zaions-short-link-folder'
											key={el.id}
											data-folder-id={el.id}
										>
											<ZIonLabel
												onClick={() => {
													zNavigatePushRoute(
														replaceParams(
															ZaionsRoutes.AdminPanel.ShortLinks.Main,
															CONSTANTS.RouteParams
																.folderIdToGetShortLinksOrLinkInBio,
															el.id as string
														)
													);
												}}
											>
												{el.title}
											</ZIonLabel>
											<ZIonButton
												fill='clear'
												color='dark'
												size='small'
												value={el.id}
												onClick={(event: unknown) => {
													presentFolderActionIonPopover({
														_event: event as Event,
														_cssClass: classNames(
															classes.zaions_present_folder_Action_popover_width
														),
													});
													// setFolderFormState((oldVal) => ({
													// 	...oldVal,
													// 	id: el.id,
													// 	name: el.title,
													// 	formMode: FormMode.EDIT,
													// }));
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
