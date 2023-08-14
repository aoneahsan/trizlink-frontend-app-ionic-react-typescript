// Core Imports
import React from 'react';

// Packages Import
import { linkOutline, warningOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonTitle,
	ZIonButton,
} from '@/components/ZIonComponents';

// Global Constants
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types

// Styles

const DeepLinking: React.FC = () => {
	return (
		<>
			<ZIonCol
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={linkOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Deep linking
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
					<RCSwitch
						className='ms-auto me-2'
						checked={false}
						checkedChildren='on'
						unCheckedChildren='off'
					/>
				</div>
				<div className='block px-4 mt-4'>
					<ZIonTitle
						className='block px-3 py-2 border rounded border-warning ion-align-items-center'
						color={'warning'}
						size='small'
					>
						<ZIonIcon icon={warningOutline} className='pe-2'></ZIonIcon> Use
						your Deep link are not supported for this link 🤔
						<br />
						<ZIonRouterLink
							routerLink={ZaionsRoutes.HomeRoute}
							className='underline ion-padding-start ms-3'
							color={'warning'}
						>
							(Please check the list here)
						</ZIonRouterLink>
					</ZIonTitle>
					<ZIonButton
						fill='clear'
						className='mt-3 ion-text-capitalize'
						size='small'
					>
						Discover our Deep Links integration
					</ZIonButton>
				</div>
			</ZIonCol>
		</>
	);
};

export default DeepLinking;
