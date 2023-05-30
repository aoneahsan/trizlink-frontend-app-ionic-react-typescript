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
import AdminPanelMainSidebarMenu from '@/components/AdminPanelComponents/Sidebar/ExpendableMenu';

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
import { ZDashboardFolderMenuInterface } from '@/types/AdminPanel/index.type';
import ZDashboardFolderMenu from './FolderMenu';
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
interface ZDashboardSidebarInterface extends ZDashboardFolderMenuInterface {}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZDashboardSidebar: React.FC<ZDashboardSidebarInterface> = ({
	type,
	foldersData,
	showFoldersSaveReorderButton,
	handleFoldersReorder,
	addNewFolderButtonOnClickHandler,
	foldersSaveReorderButtonOnClickHandler,
	folderActionsButtonOnClickHandler,
}) => {
	const { isLgScale } = useZMediaQueryScale(); // media query hook.

	return (
		<>
			{/* Expendable Navigation in the left-hand side */}
			<AdminPanelMainSidebarMenu activePage={type} />

			{/* Folder menu after Expendable Navigation */}
			{isLgScale && (
				<ZDashboardFolderMenu
					type={type}
					foldersData={foldersData}
					showFoldersSaveReorderButton={showFoldersSaveReorderButton}
					handleFoldersReorder={handleFoldersReorder}
					addNewFolderButtonOnClickHandler={addNewFolderButtonOnClickHandler}
					foldersSaveReorderButtonOnClickHandler={
						foldersSaveReorderButtonOnClickHandler
					}
					folderActionsButtonOnClickHandler={folderActionsButtonOnClickHandler}
				/>
			)}
		</>
	);
};

export default ZDashboardSidebar;
