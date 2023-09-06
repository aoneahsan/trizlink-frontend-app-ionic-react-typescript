/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonMenu,
	ZIonText,
	ZIonReorder,
	ZIonReorderGroup,
	ZIonButton,
	ZIonHeader,
	ZIonTitle,
	ZIonMenuToggle,
	ZIonContent,
} from '@/components/ZIonComponents';
import { appsOutline, closeOutline, ellipsisVertical } from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { IonReorderGroupCustomEvent } from '@ionic/core';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { PAGE_MENU_SIDE } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { replaceParams, replaceRouteParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkFolderType } from '@/types/AdminPanel/linksType';
import { folderState, FormMode } from '@/types/AdminPanel/index.type';
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';
import { useSetRecoilState } from 'recoil';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface AdminPanelFoldersSidebarMenuInterface {
	menuSide?: PAGE_MENU_SIDE;
	contentId?: string;
	foldersData?: LinkFolderType[];
	state?: folderState;
	showSaveReorderButton?: boolean;
	handleReorderFn?: (
		event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
	) => void;
	menuId?: string;
	folderActionHandlerFn?: React.MouseEventHandler<HTMLIonButtonElement>;
	saveReorderButtonFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AdminPanelFoldersSidebarMenu: React.FC<
	AdminPanelFoldersSidebarMenuInterface
> = ({
	menuSide,
	contentId,
	foldersData,
	state,
	showSaveReorderButton,
	menuId,
	handleReorderFn,
	folderActionHandlerFn,
	saveReorderButtonFn,
}) => {
	// #region custom hooks.
	const { zNavigatePushRoute } = useZNavigate();
	const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
	// #endregion

	const setFolderFormState = useSetRecoilState(FolderFormState);

	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{
			state: state,
			workspaceId,
		}
	);

	return (
		<ZIonMenu contentId={contentId} side={menuSide || 'end'} menuId={menuId}>
			{/* Header */}
			<ZIonHeader className='flex px-3 border-b shadow-none ion-align-items-center ion-padding ion-justify-content-between'>
				<ZIonTitle
					className={classNames({
						'block font-semibold ion-no-padding': true,
						'text-xl': isLgScale,
						'text-lg': !isLgScale,
					})}
				>
					Short links folders
				</ZIonTitle>

				<ZIonMenuToggle>
					<ZIonIcon icon={closeOutline} className='w-6 h-6 cursor-pointer' />
				</ZIonMenuToggle>
			</ZIonHeader>

			{/* Content */}
			<ZIonContent className='ion-padding-top'>
				<ZIonList lines='none' className='w-full py-0'>
					<ZIonItem
						minHeight='40px'
						className='cursor-pointer ms-2'
						onClick={() => {
							zNavigatePushRoute(
								replaceRouteParams(
									ZaionsRoutes.AdminPanel.ShortLinks.Main,
									[
										CONSTANTS.RouteParams.workspace.workspaceId,
										CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
									],
									[workspaceId, 'all']
								)
							);
						}}
					>
						<ZIonText>Default</ZIonText>
					</ZIonItem>

					{foldersData && foldersData.length ? (
						<ZIonReorderGroup
							disabled={false}
							onIonItemReorder={handleReorderFn}
						>
							{foldersData.map((el) => (
								<ZIonItem
									className={`cursor-pointer zaions-short-link-folder-${
										state || ''
									}`}
									key={el.id}
									data-folder-id={el.id}
								>
									<ZIonLabel
										onClick={() => {
											zNavigatePushRoute(
												replaceRouteParams(
													ZaionsRoutes.AdminPanel.ShortLinks.Main,
													[
														CONSTANTS.RouteParams.workspace.workspaceId,
														CONSTANTS.RouteParams
															.folderIdToGetShortLinksOrLinkInBio,
													],
													[workspaceId, el.id!]
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
										onClick={(event) => {
											folderActionHandlerFn && folderActionHandlerFn(event);
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
										<ZIonIcon icon={appsOutline} />
									</ZIonReorder>
								</ZIonItem>
							))}
						</ZIonReorderGroup>
					) : (
						''
					)}
				</ZIonList>
				<ZIonButton
					className='mt-3 ion-text-capitalize ion-margin-horizontal'
					fill='outline'
					expand='block'
					onClick={() => {
						setFolderFormState((oldVal) => ({
							...oldVal,
							id: '',
							name: '',
							formMode: FormMode.ADD,
						}));
						presentFolderModal({
							_cssClass: 'link-in-bio-folder-modal',
						});
					}}
				>
					New Folder
				</ZIonButton>

				{showSaveReorderButton && (
					<ZIonButton
						className='absolute bottom-0 ion-text-capitalize ion-margin-horizontal'
						expand='block'
						onClick={(event) => {
							saveReorderButtonFn && void saveReorderButtonFn(event);
						}}
						style={{ width: '78%' }}
					>
						save reorder
					</ZIonButton>
				)}
			</ZIonContent>
		</ZIonMenu>
	);
};

export default AdminPanelFoldersSidebarMenu;
