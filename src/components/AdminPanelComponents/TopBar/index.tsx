/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { helpCircleOutline, notificationsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZHelpCenterPopover from '@/components/InPageComponents/ZaionsPopovers/HelpCenterPopover';
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
} from '@/components/ZIonComponents';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import ZUserProfileButton from '../UserProfileButton';

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
const ZAdminPanelTopBar: React.FC = () => {
	// #region popovers.
	const { presentZIonPopover: presentZHelpCenterPopover } =
		useZIonPopover(ZHelpCenterPopover);
	// #endregion

	return (
		<ZIonRow className='h-[4rem] px-3 zaions__light_bg '>
			<ZIonCol className='h-full bg-cyan-500'></ZIonCol>
			<ZIonCol className='h-full bg-indigo-500'></ZIonCol>
			<ZIonCol className='flex h-full gap-2 ion-align-items-center ion-justify-content-end'>
				{/* Upgrade button */}
				<ZIonButton color='secondary' height='2.3rem'>
					Upgrade
				</ZIonButton>

				{/* Help button */}
				<ZIonButton
					color='tertiary'
					size='small'
					height='2.3rem'
					onClick={(event: unknown) => {
						presentZHelpCenterPopover({
							_event: event as Event,
							_cssClass: 'z-help-center-popover-size',
							_dismissOnSelect: false,
						});
					}}
				>
					<ZIonIcon icon={helpCircleOutline} className='w-7 h-7' />
					{/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
				</ZIonButton>

				{/* Notification button */}
				<ZIonButton
					color='tertiary'
					size='small'
					className='me-3'
					height='2.3rem'
				>
					<ZIonIcon icon={notificationsOutline} className='w-6 h-6' />
					{/* <ZIonText className='mt-[2px]'>Help</ZIonText> */}
				</ZIonButton>

				{/* User profile button */}
				<ZUserProfileButton />
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZAdminPanelTopBar;
