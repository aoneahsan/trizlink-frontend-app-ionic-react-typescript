/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonIcon,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import ZaionsAddNewFolder from '@/components/InPageComponents/ZaionsModals/AddNewFolder';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import {
	useZIonAlert,
	useZIonErrorAlert,
	useZIonModal,
} from '@/ZaionsHooks/zionic-hooks';
import { useZRQDeleteRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { showSuccessNotification } from '@/utils/notification';
import { API_URL_ENUM } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { folderState, FormMode } from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { FolderFormState } from '@/ZaionsStore/FormStates/folderFormState.recoil';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const FolderActionsPopoverContent: React.FC<{
	workspaceId: string;
	state: folderState;
}> = ({ workspaceId, state }) => {
	/**
	 * hook to present folder form modal
	 */
	const { presentZIonModal: presentFolderModal } = useZIonModal(
		ZaionsAddNewFolder,
		{ state, workspaceId }
	);

	// Custom hooks.
	const { presentZIonAlert } = useZIonAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	/**
	 * recoil state which will hold the single folder data (for updating). when user click on edit button in action popover the data of that folder will storing in this state and present as initial value in the update folder form. here we are delete it folder by getting the id from folderFormState
	 *
	 */
	const [folderFormState, setFolderFormState] = useRecoilState(FolderFormState);

	/**
	 * delete short link folder api.
	 */
	const { mutateAsync: deleteFolderMutate } = useZRQDeleteRequest(
		API_URL_ENUM.folders_update_delete,
		[CONSTANTS.REACT_QUERY.QUERIES_KEYS.FOLDER.MAIN, workspaceId, state]
	);

	/**
	 * deleteFolderAccount will show the confirm alert before deleting short link folder.
	 */
	const deleteFolderAccount = async () => {
		try {
			if (folderFormState && folderFormState.id) {
				await presentZIonAlert({
					header: `Delete Folder "${
						folderFormState.name ? folderFormState.name : ''
					}"`,
					subHeader: 'Remove folder from user account.',
					message: 'Are you sure you want to delete this folder?',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
						{
							text: 'Delete',
							role: 'danger',
							handler: () => {
								void removeFolderAccount();
							},
						},
					],
				});
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};
	/**
	 * removeFolderAccount will hit delete short link folder api
	 */
	const removeFolderAccount = async () => {
		try {
			if (folderFormState.id) {
				// hitting the delete api
				await deleteFolderMutate({
					itemIds: [workspaceId, folderFormState.id],
					urlDynamicParts: [
						CONSTANTS.RouteParams.workspace.workspaceId,
						':folderId',
					],
				});

				// setting the folderFormState to initial state because the value of this recoil state is used as the initial values of the short link folder form, when we click on the delete button in popover it will store the value or that folder in this recoil state. because we need it in here for example the id to delete the folder.
				setFolderFormState((oldVal) => ({
					...oldVal,
					id: '',
					name: '',
					formMode: FormMode.ADD,
				}));

				// show success message after deleting
				showSuccessNotification(`Folder deleted successfully.`);
			} else {
				await presentZIonErrorAlert();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ZIonList lines='none'>
			<ZIonButton
				fill='clear'
				className='ion-no-padding ion-text-capitalize'
				expand='block'
				onClick={() => {
					presentFolderModal({
						_cssClass: 'folder-modal-size',
					});
				}}
			>
				<ZIonIcon icon={pencilOutline} className='me-2' />
				<ZIonText>Rename</ZIonText>
			</ZIonButton>
			<ZIonButton
				fill='clear'
				className='ion-no-padding ion-text-capitalize'
				expand='block'
				onClick={() => {
					void deleteFolderAccount();
				}}
			>
				<ZIonIcon icon={trashOutline} className='me-2' color='danger' />
				<ZIonText color='danger'>Delete</ZIonText>
			</ZIonButton>
		</ZIonList>
	);
};

export default FolderActionsPopoverContent;
