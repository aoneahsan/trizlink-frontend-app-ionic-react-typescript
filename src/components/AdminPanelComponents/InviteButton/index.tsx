/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZInviteInTeamModal from '@/components/InPageComponents/ZaionsModals/Workspace/Team/InviteInTeamModal';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { replaceRouteParams } from '@/utils/helpers';

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
interface IZInviteButton {
	className?: string;
	workspaceId?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZInviteButton: React.FC<IZInviteButton> = ({
	className,
	workspaceId,
}) => {
	const { presentZIonModal: presentZInviteInTeamModal } = useZIonModal(
		ZInviteInTeamModal,
		{
			workspaceId: workspaceId,
		}
	);
	return (
		<ZIonButton
			className={className}
			testingselector={CONSTANTS.testingSelectors.topBar.teamInviteBtn}
			// onClick={() => {
			// 	presentZInviteInTeamModal({
			// 		_cssClass: 'invite-member-in-team-modal-size',
			// 	});
			// }}
			routerLink={replaceRouteParams(
				ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
				[CONSTANTS.RouteParams.workspace.workspaceId],
				[workspaceId!]
			)}
		>
			<ZIonIcon icon={addOutline} className='me-1' />
			Invite
		</ZIonButton>
	);
};

export default ZInviteButton;
