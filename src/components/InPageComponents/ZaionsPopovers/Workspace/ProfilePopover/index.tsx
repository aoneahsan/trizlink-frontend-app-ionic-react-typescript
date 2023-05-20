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
	addOutline,
	bulbOutline,
	cashOutline,
	chatboxEllipsesOutline,
	ellipse,
	giftOutline,
	helpCircleOutline,
	logoAndroid,
	logoApple,
	logOutOutline,
	notificationsOutline,
	settingsOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonAvatar,
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import { ProductLogo } from '@/assets/images';
import classNames from 'classnames';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

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

const ZWorkspaceProfilePopover: React.FC = () => {
	return (
		<>
			<ZIonRow className='ion-align-items-center pt-2'>
				<ZIonCol size='max-content'>
					<ZUserAvatarInfo
						className='w-[10px] h-[10px] me-1'
						userAvatar={ProductLogo}
						style={{ height: '39px', width: '39px' }}
					/>
				</ZIonCol>
				<ZIonCol>
					<ZIonLabel
						className={classNames({
							'text-sm font-bold flex': true,
						})}
					>
						Muhammad talha Irshad (you)
					</ZIonLabel>
					<ZIonLabel className='block text-sm' color='medium'>
						talhaarshaad5@gmail.com
					</ZIonLabel>
				</ZIonCol>
			</ZIonRow>

			<ZIonList lines='none'>
				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='32px'
					lines='full'
				>
					<ZIonIcon icon={settingsOutline} className='w-5 h-5 me-2' />
					<ZIonLabel className='pt-1'>Profile settings</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonIcon icon={notificationsOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Notification settings</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
					lines='full'
				>
					<ZIonIcon icon={logOutOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>Logout</ZIonLabel>
				</ZIonItem>

				<ZIonText
					className='mb-2 block mx-3 tracking-widest text-xs'
					color='medium'
				>
					COMPANY ACCOUNTS
				</ZIonText>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm'
					minHeight='40px'
				>
					<ZIonAvatar
						style={{ '--border-radius': '4px', width: '32px', height: '32px' }}
					>
						<ZIonImg src={getUiAvatarApiUrl({})} />
					</ZIonAvatar>
					<ZIonLabel className='ms-2 my-0'>
						<ZIonText className='block'>zaions</ZIonText>
						<ZIonText color='medium' className='text-sm'>
							Billing, members & usage
						</ZIonText>
					</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='ion-activatable ion-focusable zaions__cursor_pointer text-sm mt-1'
					minHeight='40px'
				>
					<ZIonIcon icon={addOutline} className='me-1 pe-1 w-5 h-5' />
					<ZIonLabel className='pt-1 my-0'>New company account</ZIonLabel>
				</ZIonItem>
			</ZIonList>
		</>
	);
};

export default ZWorkspaceProfilePopover;
