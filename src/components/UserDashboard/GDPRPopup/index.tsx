// Core Imports
import React from 'react';

// Packages Import
import { shieldCheckmarkOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
} from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
// Global Constants

// Images

// Recoil States

// Types

// Styles

const GDPRPopup: React.FC = () => {
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
					<ZIonIcon icon={shieldCheckmarkOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							GDPR popup{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='mt-5	 block px-3 mb-4'>
					<ZIonText>
						You can't access this feature if you don't complete your{' '}
						<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
							privacy profile.
						</ZIonRouterLink>
					</ZIonText>
				</div>
			</ZIonCol>
		</>
	);
};

export default GDPRPopup;
