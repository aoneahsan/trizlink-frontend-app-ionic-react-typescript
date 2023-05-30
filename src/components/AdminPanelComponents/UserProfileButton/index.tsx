/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ZWorkspaceProfilePopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ProfilePopover';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

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

const ZUserProfileButton: React.FC = () => {
	const { presentZIonPopover: presentWorkspaceProfilePopover } = useZIonPopover(
		ZWorkspaceProfilePopover
	); // popover hook to show ZWorkspaceProfilePopover

	return (
		<ZUserAvatarButton
			style={{ height: '40px', width: '40px' }}
			onClick={(event: unknown) => {
				presentWorkspaceProfilePopover({
					_event: event as Event,
					_cssClass: 'zaions_workspaces_profile_popover_size',
					_dismissOnSelect: false,
				});
			}}
		/>
	);
};

export default ZUserProfileButton;
