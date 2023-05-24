// Core Imports
import React from 'react';

// Packages Import
import { linkOutline, warningOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';
import { ZIonButton } from '@/components/ZIonComponents';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
} from '@/components/ZIonComponents';
import ZIonTitle from '@/components/ZIonComponents/ZIonTitle';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const DeepLinking: React.FC = () => {
	return (
		<>
			<ZIonCol
				sizeXl='5.8'
				sizeLg='5.7'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='border py-3 zaions__bg_white'
			>
				<div className='flex ion-align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={linkOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Deep linking{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
					<RCSwitch
						className='ms-auto me-2'
						checked={false}
						checkedChildren='on'
						unCheckedChildren='off'
					/>
				</div>
				<div className='mt-4 block px-4'>
					<ZIonTitle
						className='border border-warning block py-2 px-3 rounded flex ion-align-items-center'
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
						className='ion-text-capitalize mt-3'
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
