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
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZTimezoneInput, {
	ZTimezoneSelector,
} from '@/components/CustomComponents/ZTimezone';
import { eyeOffOutline } from 'ionicons/icons';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

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

const ZSettingsTab: React.FC = () => {
	return (
		<>
			<ZIonGrid className='mt-4 w-full'>
				<ZIonRow className='w-4/5. w-80 mx-auto'>
					<ZIonCol size='12'>
						<ZIonInput
							label='Workspace Name'
							labelPlacement='floating'
							placeholder='Workspace Name'
						/>
					</ZIonCol>

					<ZIonCol size='12' className='mt-4'>
						{/* <ZTimezoneInput className='ion-margin-top' /> */}
						<ZTimezoneSelector
							className='ion-margin-top'
							label='Workspace timezone'
							labelPlacement='floating'
						/>
					</ZIonCol>

					<ZIonCol size='12' className='pt-3 mt-4'>
						<ZIonRow className='ion-align-items-center'>
							<ZIonCol
								size='max-content'
								className='flex ion-align-items-center'
							>
								<ZIonIcon icon={eyeOffOutline} className='me-2' />
								<ZIonText>Create new posts as internal</ZIonText>
							</ZIonCol>

							<ZIonCol className='ion-text-end'>
								<ZRCSwitch />
							</ZIonCol>
						</ZIonRow>
					</ZIonCol>

					<ZIonCol size='12' className='mt-4'>
						<ZIonText className='block zaions__fs_14'>
							Remove workspace
						</ZIonText>
						<ZIonText className='block zaions__fs_14 text-muted'>
							Remove this workspace and erase all data (posts, comments, pages
							etc.). This action is irreversible.
						</ZIonText>

						<ZIonButton
							color='danger'
							fill='clear'
							className='mt-3 ion-no-padding text-transform-initial'
						>
							Remove this workspace
						</ZIonButton>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</>
	);
};

export default ZSettingsTab;
