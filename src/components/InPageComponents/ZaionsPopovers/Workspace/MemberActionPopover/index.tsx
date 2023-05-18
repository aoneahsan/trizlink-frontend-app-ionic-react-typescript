/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { ZIonItem, ZIonLabel, ZIonList } from '@/components/ZIonComponents';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZWorkspaceMemberActionPopover: React.FC = () => {
	return (
		<ZIonList lines='none'>
			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight='32px'
			>
				<ZIonLabel>Set as workspace owner...</ZIonLabel>
			</ZIonItem>

			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight='32px'
			>
				<ZIonLabel>Change permission...</ZIonLabel>
			</ZIonItem>

			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight='32px'
				lines='full'
			>
				<ZIonLabel>Convert to client member</ZIonLabel>
			</ZIonItem>

			<ZIonItem
				className='ion-activatable ion-focusable zaions__cursor_pointer'
				minHeight='32px'
			>
				<ZIonLabel color='danger'>Remove from workspace</ZIonLabel>
			</ZIonItem>
		</ZIonList>
	);
};

export default ZWorkspaceMemberActionPopover;
