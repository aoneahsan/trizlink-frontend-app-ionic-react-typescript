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
import CONSTANTS, { BRACKPOINT_SM } from '@/utils/constants';
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
					<div className='w-full ion-text-center'>
						<ZIonText className='block mb-3 text-2xl font-bold ion-text-center'>
							Log in and start sharing
						</ZIonText>
						<ZIonText className='block'>
							<ZIonText>Don't have an account? </ZIonText>
							<ZIonRouterLink
								className='underline'
								routerLink={ZaionsRoutes.SignUpRoute}
								testingselector={
									CONSTANTS.testingSelectors.loginPage.signupButton
								}
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
						testingselector={
							CONSTANTS.testingSelectors.loginPage.googleLoginButton
						}
					>
						<ZIonIcon icon={logoGoogle} className='font-bold me-1 '></ZIonIcon>{' '}
						Google
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
						testingselector={
							CONSTANTS.testingSelectors.loginPage.twitterLoginButton
						}
					>
						<ZIonIcon icon={logoTwitter} className='font-bold me-1'></ZIonIcon>{' '}
						Twitter
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
						testingselector={
							CONSTANTS.testingSelectors.loginPage.facebookLoginButton
						}
					>
						<ZIonIcon icon={logoFacebook} className='font-bold me-1'></ZIonIcon>{' '}
						Facebook
					</ZIonButton>
					<ZIonButton
						className='me-2 ion-text-capitalize'
						color='tertiary'
						expand={!isXsScale ? 'block' : undefined}
						testingselector={
							CONSTANTS.testingSelectors.loginPage.appleLoginButton
						}
					>
						<ZIonIcon icon={logoApple} className='font-bold me-1'></ZIonIcon>{' '}
						Apple
					</ZIonButton>
				</ZIonCol>
				{/* <ZIonCol className="ion-text-center" size="3.6"></ZIonCol> */}
			</ZIonRow>
		</>
	);
};

export default ZaionsLoginOptions;
