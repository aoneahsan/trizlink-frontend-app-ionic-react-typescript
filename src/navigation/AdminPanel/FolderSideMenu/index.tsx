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
} from '@/components/ZIonComponents';
import { appsOutline, ellipsisVertical } from 'ionicons/icons';
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
import { replaceParams } from '@/utils/helpers';
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
	foldersData,
	state,
	showSaveReorderButton,
	menuId,
	handleReorderFn,
	folderActionHandlerFn,
	saveReorderButtonFn,
}) => {
	const { zNavigatePushRoute } = useZNavigate();

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
		<ZIonMenu contentId={menuId} side={menuSide || 'end'} menuId={menuId}>
			<ZIonList
				lines='none'
				className='zaions_pretty_scrollbar overflow-y-scroll'
			>
				<ZIonItem className='zaions__cursor_pointer mb-2'>
					<h5 className='font-bold m-0 p-0'>🔗 All links</h5>
				</ZIonItem>

				<ZIonItem>
					<ZIonList lines='none' className='w-full'>
						<ZIonItem className='ion-no-padding'>
							<ZIonText color='primary' className='font-bold'>
								<h5 className='font-bold block m-0 p-0'>📂 Folders</h5>
							</ZIonText>
						</ZIonItem>

						<ZIonItem
							className='zaions__cursor_pointer ms-2'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										'all'
									)
								);
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
								onIonItemReorder={handleReorderFn}
							>
								{foldersData.map((el) => (
									<ZIonItem
										className={`zaions__cursor_pointer zaions-short-link-folder-${
											state || ''
										}`}
										key={el.id}
										data-folder-id={el.id}
									>
										<ZIonLabel
											onClick={() => {
												zNavigatePushRoute(
													replaceParams(
														ZaionsRoutes.AdminPanel.ShortLinks.Main,
														CONSTANTS.RouteParams.folderIdToGetShortLinks,
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
				</ZIonItem>
				<ZIonButton
					className='ion-text-capitalize ion-margin-horizontal mt-3'
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
			</ZIonList>

			{showSaveReorderButton && (
				<ZIonButton
					className='ion-text-capitalize ion-margin-horizontal absolute bottom-0'
					expand='block'
					onClick={(event) => {
						saveReorderButtonFn && void saveReorderButtonFn(event);
					}}
					style={{ width: '78%' }}
				>
					save reorder
				</ZIonButton>
			)}
		</ZIonMenu>
	);
};

export default AdminPanelFoldersSidebarMenu;
