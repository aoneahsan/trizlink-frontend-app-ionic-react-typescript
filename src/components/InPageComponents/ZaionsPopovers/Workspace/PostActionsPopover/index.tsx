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
	copyOutline,
	discOutline,
	eyeOffOutline,
	fileTrayFullOutline,
	linkOutline,
	pricetagOutline,
	star,
	syncOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
} from '@/components/ZIonComponents';

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

const ZWorkspacePostActionsPopover: React.FC = () => {
	return (
		<ZIonList lines='none'>
			{/* Manage labels */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={pricetagOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Manage labels</ZIonLabel>
			</ZIonItem>

			{/* Repost */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={syncOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Repost</ZIonLabel>
			</ZIonItem>

			{/* Hide from clients */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={eyeOffOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0 flex ion-align-items-center'>
					Hide from clients
					<ZIonIcon icon={star} className='ms-1 w-4 h-4' color='secondary' />
				</ZIonLabel>
			</ZIonItem>

			{/* Copy public share link */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={linkOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Copy public share link</ZIonLabel>
			</ZIonItem>

			{/* Copy to... */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={copyOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Copy to...</ZIonLabel>
			</ZIonItem>

			{/* Preferred audience */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
				lines='full'
			>
				<ZIonIcon icon={discOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Preferred audience</ZIonLabel>
			</ZIonItem>

			{/* Archive post */}
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
				minHeight='35px'
			>
				<ZIonIcon icon={fileTrayFullOutline} className='me-1 w-5 h-5' />
				<ZIonLabel className='m-0'>Archive post</ZIonLabel>
			</ZIonItem>
		</ZIonList>
	);
};

export default ZWorkspacePostActionsPopover;
