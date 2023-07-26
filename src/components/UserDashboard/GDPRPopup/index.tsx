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
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
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
				<div className='block px-3 mt-5 mb-4'>
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
