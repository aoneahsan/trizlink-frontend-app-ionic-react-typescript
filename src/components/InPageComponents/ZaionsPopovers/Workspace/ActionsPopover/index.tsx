/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	checkmarkOutline,
	peopleOutline,
	pricetagOutline,
	settingsOutline,
	timeOutline,
	trashBinOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';

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

const ZWorkspacesActionPopover: React.FC = () => {
	const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
		ZWorkspacesSettingModal
	);

	return (
		<ZIonList lines='none'>
			{/* Configure timetable */}
			<ZIonItem
				onClick={() => {
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={timeOutline} className='me-2' />{' '}
				<ZIonText>Configure timetable</ZIonText>
			</ZIonItem>

			{/* Manage labels */}
			<ZIonItem
				onClick={() => console.log('yes')}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={pricetagOutline} className='me-2' />{' '}
				<ZIonText>Manage labels</ZIonText>
			</ZIonItem>

			{/* Manage people */}
			<ZIonItem
				onClick={() => console.log('yes')}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={peopleOutline} className='me-2' />{' '}
				<ZIonText>Manage people</ZIonText>
			</ZIonItem>

			{/* Settings */}
			<ZIonItem
				onClick={() => console.log('yes')}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={settingsOutline} className='me-2' />{' '}
				<ZIonText>Settings</ZIonText>
			</ZIonItem>

			{/* Approvals settings */}
			<ZIonItem
				onClick={() => console.log('yes')}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={checkmarkOutline} className='me-2' />{' '}
				<ZIonText>Approvals settings</ZIonText>
			</ZIonItem>

			{/*  */}
			<ZIonItem
				onClick={() => console.log('yes')}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
			>
				<ZIonIcon icon={trashBinOutline} className='me-2' color='danger' />{' '}
				<ZIonText color='danger'>Delete</ZIonText>
			</ZIonItem>
		</ZIonList>
	);
};

export default ZWorkspacesActionPopover;
