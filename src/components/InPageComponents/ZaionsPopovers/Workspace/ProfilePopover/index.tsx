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
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import { ProductLogo } from '@/assets/images';
import classNames from 'classnames';
import { reportCustomError } from '@/utils/customErrorType';
import { STORAGE, UserLogoutFn, zAxiosApiRequest } from '@/utils/helpers';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import { useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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
	// Custom hooks.
	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(); // hook to show loader

	const profileLogoutHandler = async () => {
		try {
			// Loading start...
			await presentZIonLoader('Logging out. please wait a second.');

			// logout user
			const __response = await zAxiosApiRequest<{
				data: { isSuccess: boolean };
			}>({
				_url: API_URL_ENUM.logout,
				_method: 'post',
				_isAuthenticatedRequest: false,
			});

			console.log(__response);

			if (__response?.data.isSuccess) {
				// clear User token.
				void STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
				// clear auth token.
				void STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

				// Dismiss the ion loader
				await dismissZIonLoader();

				// redirect to home
				window.location.replace(ZaionsRoutes.LoginRoute);
			} else {
				throw new Error('Something went wrong please try again!');
			}
		} catch (error) {
			// Dismiss the ion loader
			await dismissZIonLoader();

			reportCustomError(error);
		}
	};

	return (
		<>
			<ZIonRow className='pt-2 ion-align-items-center'>
				<ZIonCol size='max-content'>
					<ZUserAvatarButton
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
					className='text-sm ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='32px'
					lines='full'
				>
					<ZIonIcon icon={settingsOutline} className='w-5 h-5 me-2' />
					<ZIonLabel className='pt-1'>Profile settings</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='text-sm ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='40px'
				>
					<ZIonIcon icon={notificationsOutline} className='w-5 h-5 me-1 pe-1' />
					<ZIonLabel className='pt-1 my-0'>Notification settings</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='text-sm ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='40px'
					lines='full'
					onClick={() => void profileLogoutHandler()}
				>
					<ZIonIcon icon={logOutOutline} className='w-5 h-5 me-1 pe-1' />
					<ZIonLabel className='pt-1 my-0'>Logout</ZIonLabel>
				</ZIonItem>

				<ZIonText
					className='block mx-3 mb-2 text-xs tracking-widest'
					color='medium'
				>
					COMPANY ACCOUNTS
				</ZIonText>

				<ZIonItem
					className='text-sm ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='40px'
				>
					<ZIonAvatar
						style={{ '--border-radius': '4px', width: '32px', height: '32px' }}
					>
						<ZIonImg src={getUiAvatarApiUrl({})} />
					</ZIonAvatar>
					<ZIonLabel className='my-0 ms-2'>
						<ZIonText className='block'>zaions</ZIonText>
						<ZIonText color='medium' className='text-sm'>
							Billing, members & usage
						</ZIonText>
					</ZIonLabel>
				</ZIonItem>

				<ZIonItem
					className='mt-1 text-sm ion-activatable ion-focusable zaions__cursor_pointer'
					minHeight='40px'
				>
					<ZIonIcon icon={addOutline} className='w-5 h-5 me-1 pe-1' />
					<ZIonLabel className='pt-1 my-0'>New company account</ZIonLabel>
				</ZIonItem>
			</ZIonList>
		</>
	);
};

export default ZWorkspaceProfilePopover;
