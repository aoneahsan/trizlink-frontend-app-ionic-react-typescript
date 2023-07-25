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
import AdminPanelSidebarMenu from '@/components/AdminPanelComponents/Sidebar/ExpendableMenu';

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
import {
	AdminPanelSidebarMenuPageEnum,
	ZDashboardFolderMenuInterface,
} from '@/types/AdminPanel/index.type';
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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZDashboardSidebar: React.FC<{
	type: AdminPanelSidebarMenuPageEnum;
}> = ({ type }) => {
	return (
		<>
			{/* Expendable Navigation in the left-hand side */}
			<AdminPanelSidebarMenu activePage={type} />
		</>
	);
};

export default ZDashboardSidebar;
