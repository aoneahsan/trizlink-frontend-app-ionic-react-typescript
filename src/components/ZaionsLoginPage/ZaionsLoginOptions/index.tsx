// Core Imports
import React from 'react';

// Packages Imports
import {
	logoApple,
	logoFacebook,
	logoGoogle,
	logoTwitter,
} from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonRow,
} from '@/components/ZIonComponents';

// Global Constants
import { BRACKPOINT_SM } from '@/utils/constants';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Style

const ZaionsLoginOptions: React.FC = () => {
	const isXsScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	return (
		<>
			<ZIonRow>
				<ZIonCol className='flex ion-justify-content-center'>
					<div className='ion-text-center w-full'>
						<ZIonText className='block ion-text-center text-2xl mb-3 font-bold'>
							Log in and start sharing
						</ZIonText>
						<ZIonText className='block'>
							<ZIonText>Don't have an account? </ZIonText>
							<ZIonRouterLink
								className='underline'
								routerLink={ZaionsRoutes.SignUpRoute}
							>
								Sign up
							</ZIonRouterLink>
						</ZIonText>
					</div>
					<div></div>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow>
				{/* <ZIonCol className="ion-text-center" size="3.6"> */}
				{/* </ZIonCol> */}
				<ZIonCol className='ion-text-center'>
					<ZIonText
						style={{ width: '100%', color: '#6c6d71', fontSize: '16px' }}
						className='block mt-2 mb-3'
					>
						Log in with:
					</ZIonText>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
					>
						<ZIonIcon icon={logoGoogle} className='me-1 font-bold '></ZIonIcon>{' '}
						Google
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
					>
						<ZIonIcon icon={logoTwitter} className='me-1 font-bold'></ZIonIcon>{' '}
						Twitter
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
					>
						<ZIonIcon icon={logoFacebook} className='me-1 font-bold'></ZIonIcon>{' '}
						Facebook
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
					>
						<ZIonIcon icon={logoApple} className='me-1 font-bold'></ZIonIcon>{' '}
						Apple
					</ZIonButton>
				</ZIonCol>
				{/* <ZIonCol className="ion-text-center" size="3.6"></ZIonCol> */}
			</ZIonRow>
		</>
	);
};

export default ZaionsLoginOptions;
