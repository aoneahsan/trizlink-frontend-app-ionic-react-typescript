/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	checkmarkOutline,
	pencilOutline,
	peopleOutline,
	pricetagOutline,
	settingsOutline,
	timeOutline,
	trashBinOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspacesSettingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal';
import ZWorkspacesSharingModal from '@/components/InPageComponents/ZaionsModals/Workspace/SharingModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceSettingsModalTabEnum,
	WorkspaceSharingTabEnum,
} from '@/types/AdminPanel/workspace';
import ZCan from '@/components/Can';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';

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

const ZWorkspacesActionPopover: React.FC<{
	deleteButtonOnClickHn?: (event?: unknown) => void;
	EditButtonOnClickHn?: (event?: unknown) => void;
	showDeleteWorkspaceOption?: boolean;
	showEditWorkspaceOption?: boolean;
	showManageUserOption?: boolean;
}> = ({
	deleteButtonOnClickHn,
	EditButtonOnClickHn,
	showDeleteWorkspaceOption = true,
	showEditWorkspaceOption = true,
	showManageUserOption = false,
}) => {
	//
	const [modalTab, setModalTab] = useState<workspaceSettingsModalTabEnum>();

	const { presentZIonModal: presentWorkspaceSettingModal } = useZIonModal(
		ZWorkspacesSettingModal,
		{
			Tab: modalTab,
		}
	);

	const { presentZIonModal: presentWorkspaceSharingModal } = useZIonModal(
		ZWorkspacesSharingModal,
		{
			Tab: WorkspaceSharingTabEnum.invite,
		}
	);

	return (
		<ZIonList lines='none'>
			{/*  */}
			<ZIonInput
				name='pageName'
				label=''
				// labelPlacement='floating'
				// errorText={errors.pageName}
				// placeholder={`${ZaionsInfo.name}`}
				// onIonChange={handleChange}
				// onIonBlur={handleBlur}
				// value={values.pageName}
				// className={classNames({
				// 	'ion-touched ion-invalid': touched.pageName && errors.pageName,
				// 	'ion-touched ion-valid': touched.pageName && !errors.pageName,
				// })}
				className='pt-2 px-3 text-xl pb-2 ion-text-center w-[90%] mx-auto'
				value='MTI'
				style={{
					minHeight: '30px',
				}}
			/>

			{/* Manage User */}
			{showManageUserOption && (
				<ZIonItem
					onClick={() => {
						presentWorkspaceSharingModal({
							_cssClass: 'workspace-sharing-modal-size',
						});
					}}
					className='ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='32px'
				>
					<ZIonIcon icon={peopleOutline} className='me-2' />
					<ZIonText className={classNames('text-sm')}>Manage users</ZIonText>
				</ZIonItem>
			)}

			{/* Configure timetable */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.timetable);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer '
				minHeight={'32px'}
			>
				<ZIonIcon icon={timeOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>
					Configure timetable
				</ZIonText>
			</ZIonItem>

			{/* Manage labels */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.labels);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={pricetagOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Manage labels</ZIonText>
			</ZIonItem>

			{/* Manage people */}
			{/* <ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.timetable);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={peopleOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Manage people</ZIonText>
			</ZIonItem> */}

			{/* Settings */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.settings);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={settingsOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>Settings</ZIonText>
			</ZIonItem>

			{/* Approvals settings */}
			<ZIonItem
				onClick={() => {
					// setting the tab with should be active in modal
					setModalTab(workspaceSettingsModalTabEnum.approvals);

					// presenting modal
					presentWorkspaceSettingModal({
						_cssClass: 'workspace-setting-modal-size',
					});
				}}
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight={'32px'}
			>
				<ZIonIcon icon={checkmarkOutline} className='me-2' />
				<ZIonText className={classNames('text-sm')}>
					Approvals settings
				</ZIonText>
			</ZIonItem>

			{/* Edit */}
			{showEditWorkspaceOption && (
				<ZCan havePermission={permissionsEnum.update_workspace}>
					<ZIonItem
						onClick={EditButtonOnClickHn}
						className='ion-activatable ion-focusable zaions__cursor_pointer'
						minHeight={'32px'}
					>
						<ZIonIcon icon={pencilOutline} className='me-2' />
						<ZIonText>Edit</ZIonText>
					</ZIonItem>
				</ZCan>
			)}

			{/* Delete */}
			{showDeleteWorkspaceOption && (
				<ZCan havePermission={permissionsEnum.delete_workspace}>
					<ZIonItem
						onClick={deleteButtonOnClickHn}
						className='ion-activatable ion-focusable zaions__cursor_pointer'
						minHeight={'32px'}
					>
						<ZIonIcon icon={trashBinOutline} className='me-2' color='danger' />
						<ZIonText color='danger'>Delete</ZIonText>
					</ZIonItem>
				</ZCan>
			)}
		</ZIonList>
	);
};

export default ZWorkspacesActionPopover;
