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
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';

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
import { placeholderImage, ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ViewSingleWorkspace: React.FC = () => {
	return (
		<ZaionsIonPage pageTitle='Zaions view single workspace page'>
			<ZIonHeader className='ion-padding-horizontal'>
				<ZIonGrid>
					{/* First row */}
					<ZIonRow className='ion-align-items-center'>
						{/* Go to workspaces button and Searchbar */}
						<ZIonCol size='4' className='flex items-center gap-2'>
							<ZIonButton expand='block' className='text-transform-initial'>
								Workspaces
							</ZIonButton>

							<div>
								<ZIonSearchbar
									animated
									showClearButton='focus'
									color='light'
									style={{ '--box-shadow': 'none' }}
								/>
							</div>
						</ZIonCol>

						{/* workspace name & edit button */}
						<ZIonCol
							size='5'
							className='flex items-center justify-center text-transform-initial'
						>
							<ZIonButton fill='default' className='fs-4'>
								MTI
							</ZIonButton>
						</ZIonCol>

						{/* Help Button, Notifications Button, and UserAvatarInfo */}
						<ZIonCol size='3' className='flex items-center justify-end gap-2'>
							<ZIonButton
								fill='default'
								className='ion-no-margin text-transform-initial'
							>
								<ZIonText>Help</ZIonText>
								<ZIonIcon icon={helpCircleOutline} className='w-6 h-6 ms-2' />
							</ZIonButton>

							<ZIonButton fill='default' className='ion-no-margin me-2'>
								<ZIonIcon icon={notificationsOutline} className='w-6 h-6' />
							</ZIonButton>

							<ZUserAvatarInfo />
						</ZIonCol>
					</ZIonRow>

					{/* Second row */}
					<ZIonRow className='ion-align-items-center'>
						{/* Users buttons */}
						<ZIonCol>
							<ZUserAvatarInfo
								className='w-[10px] h-[10px]'
								userAvatar={ProductLogo}
								style={{ height: '35px', width: '35px' }}
							/>

							{/* add user button */}
							<ZUserAvatarInfo
								className='ms-2'
								userAvatar={placeholderImage}
								style={{ height: '35px', width: '35px' }}
							/>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonHeader>
			<ZIonContent>view workspace</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ViewSingleWorkspace;
