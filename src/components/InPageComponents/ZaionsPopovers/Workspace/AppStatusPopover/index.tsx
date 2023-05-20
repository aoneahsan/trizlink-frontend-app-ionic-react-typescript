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
	bulbOutline,
	cashOutline,
	chatboxEllipsesOutline,
	ellipse,
	giftOutline,
	helpCircleOutline,
	logoAndroid,
	logoApple,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonButtons,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonText,
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

const ZWorkspaceAppStatusPopover: React.FC = () => {
	return (
		<>
			<ZIonText className='mt-2 block mx-3 tracking-widest text-xs'>
				APP STATUS
			</ZIonText>

			<ZIonList lines='none'>
				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='32px'
					lines='full'
				>
					<ZIonIcon icon={ellipse} color='success' className='w-3 h-3 me-2' />
					<ZIonLabel>All Systems Operational</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonIcon icon={giftOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Whats's new?</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonIcon icon={bulbOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Suggest an idea</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonIcon icon={helpCircleOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Help center</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonIcon icon={cashOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Pricing</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
					lines='full'
				>
					<ZIonIcon
						icon={chatboxEllipsesOutline}
						className='me-1 pe-1 w-5 h-5'
					/>
					<ZIonLabel className='pt-1 my-0'>Contact support</ZIonLabel>
				</ZIonItem>
			</ZIonList>

			<ZIonText className='mt-2 block mx-3 tracking-widest text-xs'>
				DOWNLOAD APPS
			</ZIonText>

			<ZIonButtons className='mx-4 flex my-2 ion-justify-content-between'>
				<ZIonButton className='text-xs text-transform-initial'>
					<ZIonIcon icon={logoApple} className='me-2' /> IOS
				</ZIonButton>
				<ZIonText>|</ZIonText>
				<ZIonButton className='text-xs text-transform-initial'>
					<ZIonIcon icon={logoAndroid} className='me-2' /> Android
				</ZIonButton>
			</ZIonButtons>
		</>
	);
};

export default ZWorkspaceAppStatusPopover;
