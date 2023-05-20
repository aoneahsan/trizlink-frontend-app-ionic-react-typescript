// Core Imports
import React from 'react';

// Packages Import
import { eyeOffOutline, warningOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const LinkCloaking: React.FC = () => {
	return (
		<>
			<ZIonCol
				sizeXl='5.7'
				sizeLg='5.6'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='border py-3 zaions__bg_white'
			>
				<div className='flex ion-align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={eyeOffOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Link cloaking{' '}
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
				<div className='mt-4 block px-4 mb-4'>
					<ZIonTitle
						className='border border-warning block py-2 px-3 rounded flex ion-align-items-center'
						color={'warning'}
						size='small'
					>
						<ZIonIcon icon={warningOutline} className='pe-2'></ZIonIcon> Use
						your Use your own domain to activate this option{' '}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.HomeRoute}
							className='underline'
							color={'warning'}
						>
							(learn more)
						</ZIonRouterLink>
					</ZIonTitle>
				</div>
			</ZIonCol>
		</>
	);
};

export default LinkCloaking;
